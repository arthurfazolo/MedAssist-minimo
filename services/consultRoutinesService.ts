import { ConsultRoutine } from '../types';
import { db, auth, handleFirestoreError, OperationType, cleanUndefined, isUserAuthAdmin, syncCurrentAdminToFirestore } from './firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { getProtocols, saveProtocols } from './protocolsService';

const STORAGE_OVER_KEY = 'medassist_consult_routines_overrides_v1';

let firestoreConsultRoutines: ConsultRoutine[] = [];
let isSnapshotInitialized = false;

const getLocalState = (): { overrides: ConsultRoutine[]; deletedIds: string[] } => {
  try {
    const raw = localStorage.getItem(STORAGE_OVER_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading consult routines overrides:", e);
  }
  return { overrides: [], deletedIds: [] };
};

export const initConsultRoutinesSync = () => {
  if (isSnapshotInitialized) return;
  isSnapshotInitialized = true;

  onSnapshot(
    collection(db, 'consultRoutines'),
    (snapshot) => {
      const list: ConsultRoutine[] = [];
      snapshot.forEach((docSnap) => {
        list.push(docSnap.data() as ConsultRoutine);
      });
      firestoreConsultRoutines = list;
      window.dispatchEvent(new CustomEvent('medassist:consult-routines-updated'));
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, 'consultRoutines');
    }
  );
};

initConsultRoutinesSync();

export const mergeConsultRoutines = (
  initial: ConsultRoutine[],
  firestore: ConsultRoutine[],
  localOverrides: ConsultRoutine[],
  deletedIds: string[] = []
): ConsultRoutine[] => {
  const mergedMap = new Map<string, ConsultRoutine>();

  initial.forEach((r) => mergedMap.set(r.id, r));
  firestore.forEach((r) => mergedMap.set(r.id, r));
  localOverrides.forEach((r) => mergedMap.set(r.id, r));
  deletedIds.forEach((id) => mergedMap.delete(id));

  return Array.from(mergedMap.values());
};

let isMigrated = false;

const migrateLegacySpecialProtocols = () => {
  if (isMigrated) return;
  isMigrated = true;

  try {
    const allProtocols = getProtocols();
    const legacySpecials = allProtocols.filter(
      (p: any) => p.isSpecial === true || p.specialType === 'cronograma' || (p.consultas && p.consultas.length > 0)
    );

    if (legacySpecials.length > 0) {
      const { overrides } = getLocalState();
      const newRoutines: ConsultRoutine[] = [...overrides];
      let changed = false;

      legacySpecials.forEach((p: any) => {
        if (!newRoutines.some((r) => r.id === p.id)) {
          newRoutines.push({
            id: p.id,
            titulo: p.titulo,
            categoria: p.categoria || 'Acompanhamento',
            descricao: p.descricao || '',
            status: p.status || 'completo',
            consultas: p.consultas || [],
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
          });
          changed = true;
        }
      });

      if (changed) {
        saveConsultRoutines(newRoutines);
      }

      const remainingProtocols = allProtocols.filter(
        (p: any) => !(p.isSpecial === true || p.specialType === 'cronograma' || (p.consultas && p.consultas.length > 0))
      );
      if (remainingProtocols.length !== allProtocols.length) {
        saveProtocols(remainingProtocols);
      }
    }
  } catch (err) {
    console.error("Error migrating legacy special protocols to consult routines:", err);
  }
};

export const getConsultRoutines = (): ConsultRoutine[] => {
  migrateLegacySpecialProtocols();
  const { overrides, deletedIds } = getLocalState();
  return mergeConsultRoutines([], firestoreConsultRoutines, overrides, deletedIds);
};

export const saveConsultRoutines = async (routines: ConsultRoutine[]): Promise<void> => {
  const overrides: ConsultRoutine[] = [];
  const deletedIds: string[] = [];

  firestoreConsultRoutines.forEach((fsR) => {
    if (!routines.some((r) => r.id === fsR.id)) {
      deletedIds.push(fsR.id);
    }
  });

  routines.forEach((routine) => {
    const fsR = firestoreConsultRoutines.find((r) => r.id === routine.id);
    let isModified = false;
    if (fsR) {
      isModified = JSON.stringify(fsR) !== JSON.stringify(routine);
    } else {
      isModified = true;
    }

    if (isModified) {
      overrides.push(routine);
    }
  });

  localStorage.setItem(STORAGE_OVER_KEY, JSON.stringify({ overrides, deletedIds }));

  const currentUserRaw = localStorage.getItem('medassist_current_user');
  if (currentUserRaw && auth.currentUser) {
    try {
      const currentUser = JSON.parse(currentUserRaw);
      if (currentUser?.role === 'admin' && isUserAuthAdmin()) {
        await syncCurrentAdminToFirestore();

        for (const cached of firestoreConsultRoutines) {
          if (!routines.some((r) => r.id === cached.id)) {
            await deleteDoc(doc(db, 'consultRoutines', cached.id));
          }
        }

        for (const routine of routines) {
          const fsR = firestoreConsultRoutines.find((r) => r.id === routine.id);
          let needsUpdate = false;
          if (fsR) {
            needsUpdate = JSON.stringify(fsR) !== JSON.stringify(routine);
          } else {
            needsUpdate = true;
          }

          if (needsUpdate) {
            await setDoc(doc(db, 'consultRoutines', routine.id), cleanUndefined(routine));
          }
        }
      }
    } catch (e) {
      console.warn("Firestore cloud sync notice in consultRoutines (saved locally):", e);
    }
  }

  window.dispatchEvent(new CustomEvent('medassist:consult-routines-updated'));
};
