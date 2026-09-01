import { Protocolo } from '../types';
import { INITIAL_PROTOCOLS } from '../data/protocolsData';
import { db, auth, handleFirestoreError, OperationType, cleanUndefined, isUserAuthAdmin, syncCurrentAdminToFirestore } from './firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { migrateItemReviewFields } from './reviewService';

const STORAGE_KEY = 'medassist_clinical_protocols';
const STORAGE_OVER_KEY = 'medassist_clinical_protocols_overrides_v2';

let firestoreProtocols: Protocolo[] = [];
let isSnapshotInitialized = false;

// Helper to get local overrides and deletedIds
const getLocalState = (): { overrides: Protocolo[], deletedIds: string[] } => {
  try {
    const raw = localStorage.getItem(STORAGE_OVER_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading overrides:", e);
  }

  // Fallback and Migration from old complete-list storage to prevent losing user edits
  try {
    const oldRaw = localStorage.getItem(STORAGE_KEY);
    if (oldRaw) {
      const oldList: Protocolo[] = JSON.parse(oldRaw);
      if (Array.isArray(oldList) && oldList.length > 0) {
        const overrides: Protocolo[] = [];
        const deletedIds: string[] = [];

        INITIAL_PROTOCOLS.forEach(initP => {
          if (!oldList.some(p => p.id === initP.id)) {
            deletedIds.push(initP.id);
          }
        });

        oldList.forEach(p => {
          const initP = INITIAL_PROTOCOLS.find(x => x.id === p.id);
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
    console.error("Migration error for protocols:", err);
  }

  return { overrides: [], deletedIds: [] };
};

// Initialize real-time synchronization
export const initProtocolsSync = () => {
  if (isSnapshotInitialized) return;
  isSnapshotInitialized = true;

  onSnapshot(collection(db, 'protocols'), (snapshot) => {
    const list: Protocolo[] = [];
    snapshot.forEach(doc => {
      list.push(doc.data() as Protocolo);
    });
    firestoreProtocols = list;
    
    // Dispatch event to notify listeners
    window.dispatchEvent(new CustomEvent('medassist:protocols-updated'));
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'protocols');
  });
};

// Auto start sync
initProtocolsSync();

export const mergeProtocols = (
  initial: Protocolo[],
  firestore: Protocolo[],
  localOverrides: Protocolo[],
  deletedIds: string[] = []
): Protocolo[] => {
  const mergedMap = new Map<string, Protocolo>();

  // 1. Initial/Predefined list
  initial.forEach(p => mergedMap.set(p.id, p));

  // 2. Firestore list from admins
  firestore.forEach(p => mergedMap.set(p.id, p));

  // 3. Local personal overrides - local storage entries take final priority
  localOverrides.forEach(p => {
    mergedMap.set(p.id, p);
  });

  // 4. Handle deletions
  deletedIds.forEach(id => {
    mergedMap.delete(id);
  });

  return Array.from(mergedMap.values());
};

export const getProtocols = (): Protocolo[] => {
  const { overrides, deletedIds } = getLocalState();
  const list = mergeProtocols(INITIAL_PROTOCOLS, firestoreProtocols, overrides, deletedIds);
  return list.map(item => migrateItemReviewFields(item, 'protocol'));
};

export const saveProtocols = async (protocols: Protocolo[]): Promise<void> => {
  // Compute local overrides and deletedIds based on baseline (Initial + Firestore)
  const overrides: Protocolo[] = [];
  const deletedIds: string[] = [];

  INITIAL_PROTOCOLS.forEach(initP => {
    if (!protocols.some(p => p.id === initP.id)) {
      deletedIds.push(initP.id);
    }
  });

  firestoreProtocols.forEach(fsP => {
    if (!protocols.some(p => p.id === fsP.id)) {
      deletedIds.push(fsP.id);
    }
  });

  protocols.forEach(proto => {
    const initProto = INITIAL_PROTOCOLS.find(p => p.id === proto.id);
    const fsProto = firestoreProtocols.find(p => p.id === proto.id);

    let isModified = false;
    if (initProto) {
      isModified = JSON.stringify(initProto) !== JSON.stringify(proto);
    } else if (fsProto) {
      isModified = JSON.stringify(fsProto) !== JSON.stringify(proto);
    } else {
      isModified = true;
    }

    if (isModified) {
      overrides.push(proto);
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
        for (const cached of firestoreProtocols) {
          if (!protocols.some(p => p.id === cached.id)) {
            await deleteDoc(doc(db, 'protocols', cached.id));
          }
        }

        // Find added or modified items
        for (const proto of protocols) {
          const initialProto = INITIAL_PROTOCOLS.find(p => p.id === proto.id);
          const firestoreProto = firestoreProtocols.find(p => p.id === proto.id);

          let needsUpdate = false;
          if (initialProto) {
            needsUpdate = JSON.stringify(initialProto) !== JSON.stringify(proto);
          } else if (firestoreProto) {
            needsUpdate = JSON.stringify(firestoreProto) !== JSON.stringify(proto);
          } else {
            needsUpdate = true;
          }

          if (needsUpdate) {
            await setDoc(doc(db, 'protocols', proto.id), cleanUndefined(proto));
          }
        }
      }
    } catch (e) {
      console.warn("Firestore cloud sync notice in protocols (saved locally):", e);
    }
  }

  window.dispatchEvent(new CustomEvent('medassist:protocols-updated'));
};
