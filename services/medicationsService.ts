import { Medication } from '../types';
import { INITIAL_MEDICATIONS } from '../data/medicationsData';
import { db, auth, handleFirestoreError, OperationType, cleanUndefined, isUserAuthAdmin, syncCurrentAdminToFirestore } from './firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { migrateItemReviewFields } from './reviewService';

const STORAGE_KEY = 'medassist_medications_list';
const STORAGE_OVER_KEY = 'medassist_medications_overrides_v2';

let firestoreMedications: Medication[] = [];
let isSnapshotInitialized = false;

// Helper to get local overrides and deletedIds
const getLocalState = (): { overrides: Medication[], deletedIds: string[] } => {
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
      const oldList: Medication[] = JSON.parse(oldRaw);
      if (Array.isArray(oldList) && oldList.length > 0) {
        const overrides: Medication[] = [];
        const deletedIds: string[] = [];

        INITIAL_MEDICATIONS.forEach(initM => {
          if (!oldList.some(m => m.id === initM.id)) {
            deletedIds.push(initM.id);
          }
        });

        oldList.forEach(m => {
          const initM = INITIAL_MEDICATIONS.find(x => x.id === m.id);
          if (!initM || JSON.stringify(initM) !== JSON.stringify(m)) {
            overrides.push(m);
          }
        });

        const migrated = { overrides, deletedIds };
        localStorage.setItem(STORAGE_OVER_KEY, JSON.stringify(migrated));
        localStorage.removeItem(STORAGE_KEY);
        return migrated;
      }
    }
  } catch (err) {
    console.error("Migration error for medications:", err);
  }

  return { overrides: [], deletedIds: [] };
};

// Start real-time Firestore sync
export const initMedicationsSync = () => {
  if (isSnapshotInitialized) return;
  isSnapshotInitialized = true;

  onSnapshot(collection(db, 'medications'), (snapshot) => {
    const list: Medication[] = [];
    snapshot.forEach(doc => {
      list.push(doc.data() as Medication);
    });
    firestoreMedications = list;
    
    // Notify application to re-render
    window.dispatchEvent(new CustomEvent('medassist:medications-updated'));
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'medications');
  });
};

// Auto start sync callback
initMedicationsSync();

export const mergeMedications = (
  initial: Medication[],
  firestore: Medication[],
  localOverrides: Medication[],
  deletedIds: string[] = []
): Medication[] => {
  const mergedMap = new Map<string, Medication>();

  // 1. Initial/Predefined medications list
  initial.forEach(m => mergedMap.set(m.id, m));

  // 2. Firestore list from admins takes precedence over default list
  firestore.forEach(m => mergedMap.set(m.id, m));

  // 3. Local personal overrides: user edits/additions stored locally take final precedence
  localOverrides.forEach(m => {
    mergedMap.set(m.id, m);
  });

  // 4. Handle deletions
  deletedIds.forEach(id => {
    mergedMap.delete(id);
  });

  return Array.from(mergedMap.values());
};

export const getMedications = (): Medication[] => {
  const { overrides, deletedIds } = getLocalState();
  const list = mergeMedications(INITIAL_MEDICATIONS, firestoreMedications, overrides, deletedIds);
  return list.map(item => migrateItemReviewFields(item, 'medication'));
};

export const saveMedications = async (medications: Medication[]): Promise<void> => {
  // Compute local overrides and deletedIds based on baseline (Initial + Firestore)
  const overrides: Medication[] = [];
  const deletedIds: string[] = [];

  INITIAL_MEDICATIONS.forEach(initM => {
    if (!medications.some(m => m.id === initM.id)) {
      deletedIds.push(initM.id);
    }
  });

  firestoreMedications.forEach(fsM => {
    if (!medications.some(m => m.id === fsM.id)) {
      deletedIds.push(fsM.id);
    }
  });

  medications.forEach(med => {
    const initMed = INITIAL_MEDICATIONS.find(m => m.id === med.id);
    const fsMed = firestoreMedications.find(m => m.id === med.id);

    let isModified = false;
    if (initMed) {
      isModified = JSON.stringify(initMed) !== JSON.stringify(med);
    } else if (fsMed) {
      isModified = JSON.stringify(fsMed) !== JSON.stringify(med);
    } else {
      isModified = true;
    }

    if (isModified) {
      overrides.push(med);
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
        for (const cached of firestoreMedications) {
          if (!medications.some(m => m.id === cached.id)) {
            await deleteDoc(doc(db, 'medications', cached.id));
          }
        }

        // Find added or modified items
        for (const med of medications) {
          const initialMed = INITIAL_MEDICATIONS.find(m => m.id === med.id);
          const firestoreMed = firestoreMedications.find(m => m.id === med.id);

          let needsUpdate = false;
          if (initialMed) {
            needsUpdate = JSON.stringify(initialMed) !== JSON.stringify(med);
          } else if (firestoreMed) {
            needsUpdate = JSON.stringify(firestoreMed) !== JSON.stringify(med);
          } else {
            needsUpdate = true;
          }

          if (needsUpdate) {
            await setDoc(doc(db, 'medications', med.id), cleanUndefined(med));
          }
        }
      }
    } catch (e) {
      console.warn("Firestore cloud sync notice in medications (saved locally):", e);
    }
  }

  window.dispatchEvent(new CustomEvent('medassist:medications-updated'));
};
