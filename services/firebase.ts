import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);

// Test connection on boot as specified in the Firebase guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration or network connection.");
    }
  }
}
testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function cleanUndefined<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map(cleanUndefined) as unknown as T;
  }
  if (typeof obj === 'object') {
    const cleaned: any = {};
    for (const [key, val] of Object.entries(obj)) {
      if (val !== undefined) {
        cleaned[key] = cleanUndefined(val);
      }
    }
    return cleaned as T;
  }
  return obj;
}

export function isUserAuthAdmin(): boolean {
  const adminEmails = ['arthur.fazolo@gmail.com', 'medassist.sup@gmail.com', 'admin@med.com', 'admin@medassist.com'];
  const fbEmail = auth.currentUser?.email?.toLowerCase();
  const currentUserRaw = typeof localStorage !== 'undefined' ? localStorage.getItem('medassist_current_user') : null;
  let isLocalAdmin = false;
  if (currentUserRaw) {
    try {
      const cu = JSON.parse(currentUserRaw);
      if (cu?.role === 'admin') isLocalAdmin = true;
    } catch (e) {}
  }
  return isLocalAdmin || !!(fbEmail && adminEmails.includes(fbEmail));
}

export async function syncCurrentAdminToFirestore(): Promise<boolean> {
  if (!auth.currentUser) return false;
  if (!isUserAuthAdmin()) return false;
  
  try {
    const { doc, setDoc } = await import('firebase/firestore');
    const adminDocRef = doc(db, 'admins', auth.currentUser.uid);
    const currentUserRaw = typeof localStorage !== 'undefined' ? localStorage.getItem('medassist_current_user') : null;
    let email = auth.currentUser.email || 'admin@medassist.com';
    if (currentUserRaw) {
      try {
        const cu = JSON.parse(currentUserRaw);
        if (cu?.email) email = cu.email;
      } catch (e) {}
    }
    await setDoc(adminDocRef, {
      isAdmin: true,
      email,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (err) {
    console.warn('Unable to sync admin document to Firestore (will continue with local storage):', err);
    return false;
  }
}

