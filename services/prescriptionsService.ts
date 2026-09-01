import { PrescriptionModel } from '../types';
import { INITIAL_PRESCRIPTIONS } from '../data/initialData';
import { db, auth, handleFirestoreError, OperationType, cleanUndefined, isUserAuthAdmin, syncCurrentAdminToFirestore } from './firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { migrateItemReviewFields } from './reviewService';

const STORAGE_KEY = 'prescriptions';
const STORAGE_OVER_KEY = 'medassist_prescriptions_overrides_v2';

let firestorePrescriptions: PrescriptionModel[] = [];
let isSnapshotInitialized = false;

// Helper to get local overrides and deletedIds
const getLocalState = (): { overrides: PrescriptionModel[], deletedIds: string[] } => {
  try {
    const raw = localStorage.getItem(STORAGE_OVER_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading prescriptions overrides:", e);
  }

  // Fallback and Migration from old complete-list storage to prevent losing user edits
  try {
    const oldRaw = localStorage.getItem(STORAGE_KEY);
    if (oldRaw) {
      const oldList: PrescriptionModel[] = JSON.parse(oldRaw);
      if (Array.isArray(oldList) && oldList.length > 0) {
        const overrides: PrescriptionModel[] = [];
        const deletedIds: string[] = [];

        INITIAL_PRESCRIPTIONS.forEach(initP => {
          if (!oldList.some(p => p.id === initP.id)) {
            deletedIds.push(initP.id);
          }
        });

        oldList.forEach(p => {
          const initP = INITIAL_PRESCRIPTIONS.find(x => x.id === p.id);
          if (!initP || JSON.stringify(initP) !== JSON.stringify(p)) {
            overrides.push(p);
          }
        });

        const migrated = { overrides, deletedIds };
        localStorage.setItem(STORAGE_OVER_KEY, JSON.stringify(migrated));
        localStorage.removeItem(STORAGE_KEY);
        return migrated;
      }
    }
  } catch (err) {
    console.error("Migration error for prescriptions:", err);
  }

  return { overrides: [], deletedIds: [] };
};

// Start real-time Firestore sync
export const initPrescriptionsSync = () => {
  if (isSnapshotInitialized) return;
  isSnapshotInitialized = true;

  onSnapshot(collection(db, 'prescriptions'), (snapshot) => {
    const list: PrescriptionModel[] = [];
    snapshot.forEach(doc => {
      list.push(doc.data() as PrescriptionModel);
    });
    firestorePrescriptions = list;
    
    // Notify application to re-render
    window.dispatchEvent(new CustomEvent('medassist:prescriptions-updated'));
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'prescriptions');
  });
};

// Auto start sync callback
initPrescriptionsSync();

export const mergePrescriptions = (
  initial: PrescriptionModel[],
  firestore: PrescriptionModel[],
  localOverrides: PrescriptionModel[],
  deletedIds: string[] = []
): PrescriptionModel[] => {
  const mergedMap = new Map<string, PrescriptionModel>();

  // 1. Initial/Predefined prescriptions list
  initial.forEach(p => mergedMap.set(p.id, p));

  // 2. Firestore list from admins takes precedence over default list
  firestore.forEach(p => mergedMap.set(p.id, p));

  // 3. Local personal overrides: user edits/additions stored locally take final precedence
  localOverrides.forEach(p => {
    mergedMap.set(p.id, p);
  });

  // 4. Handle deletions
  deletedIds.forEach(id => {
    mergedMap.delete(id);
  });

  return Array.from(mergedMap.values());
};

export const getPrescriptions = (): PrescriptionModel[] => {
  const { overrides, deletedIds } = getLocalState();
  const list = mergePrescriptions(INITIAL_PRESCRIPTIONS, firestorePrescriptions, overrides, deletedIds);
  return list.map(item => migrateItemReviewFields(item, 'prescription'));
};

export const savePrescriptions = async (prescriptions: PrescriptionModel[]): Promise<void> => {
  // Compute local overrides and deletedIds based on baseline (Initial + Firestore)
  const overrides: PrescriptionModel[] = [];
  const deletedIds: string[] = [];

  INITIAL_PRESCRIPTIONS.forEach(initP => {
    if (!prescriptions.some(p => p.id === initP.id)) {
      deletedIds.push(initP.id);
    }
  });

  firestorePrescriptions.forEach(fsP => {
    if (!prescriptions.some(p => p.id === fsP.id)) {
      deletedIds.push(fsP.id);
    }
  });

  prescriptions.forEach(item => {
    const initP = INITIAL_PRESCRIPTIONS.find(p => p.id === item.id);
    const fsP = firestorePrescriptions.find(p => p.id === item.id);

    let isModified = false;
    if (initP) {
      isModified = JSON.stringify(initP) !== JSON.stringify(item);
    } else if (fsP) {
      isModified = JSON.stringify(fsP) !== JSON.stringify(item);
    } else {
      isModified = true;
    }

    if (isModified) {
      overrides.push(item);
    }
  });

  // Save the state delta in localStorage
  localStorage.setItem(STORAGE_OVER_KEY, JSON.stringify({ overrides, deletedIds }));

  const currentUserRaw = localStorage.getItem('medassist_current_user');
  if (currentUserRaw && auth.currentUser) {
    try {
      const currentUser = JSON.parse(currentUserRaw);
      if (currentUser?.role === 'admin' && isUserAuthAdmin()) {
        await syncCurrentAdminToFirestore();

        // Find deleted items from firestore list
        for (const cached of firestorePrescriptions) {
          if (!prescriptions.some(p => p.id === cached.id)) {
            await deleteDoc(doc(db, 'prescriptions', cached.id));
          }
        }

        // Find added or modified items
        for (const item of prescriptions) {
          const initialItem = INITIAL_PRESCRIPTIONS.find(p => p.id === item.id);
          const firestoreItem = firestorePrescriptions.find(p => p.id === item.id);

          let needsUpdate = false;
          if (initialItem) {
            needsUpdate = JSON.stringify(initialItem) !== JSON.stringify(item);
          } else if (firestoreItem) {
            needsUpdate = JSON.stringify(firestoreItem) !== JSON.stringify(item);
          } else {
            needsUpdate = true;
          }

          if (needsUpdate) {
            await setDoc(doc(db, 'prescriptions', item.id), cleanUndefined(item));
          }
        }
      }
    } catch (e) {
      console.warn("Firestore cloud sync notice in prescriptions (saved locally):", e);
    }
  }

  window.dispatchEvent(new CustomEvent('medassist:prescriptions-updated'));
};
