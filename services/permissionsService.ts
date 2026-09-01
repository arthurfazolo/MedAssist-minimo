import { db, handleFirestoreError, OperationType, cleanUndefined } from './firebase';
import { collection, doc, getDocs, setDoc, onSnapshot, writeBatch } from 'firebase/firestore';
import { User, UserRole } from '../types';

export interface RolePermissions {
  dashboard: boolean;
  library: boolean;
  protocols: boolean;
  calculators: boolean;
  prescriptions: boolean;
  userManagement: boolean;
  admin: boolean;
  medications: boolean;
  fluxogramas: boolean;
}

export const PERMISSION_LABELS: Record<keyof RolePermissions, string> = {
  dashboard: 'Início / Dashboard',
  library: 'Biblioteca Clínica (Base de Doenças)',
  protocols: 'Protocolos Clínicos (Guia)',
  calculators: 'Calculadoras Médicas',
  prescriptions: 'Modelos de Prescrição',
  userManagement: 'Gestão de Usuários',
  admin: 'Gestão de Permissões (Painel Administrativo)',
  medications: 'Biblioteca de Medicamentos',
  fluxogramas: 'Fluxogramas Clínicos Interativos',
};

export const DEFAULT_PERMISSIONS: Record<string, RolePermissions> = {
  user: {
    dashboard: true,
    library: true,
    protocols: false,
    calculators: true,
    prescriptions: false,
    userManagement: false,
    admin: false,
    medications: true,
    fluxogramas: false,
  },
  subscriber: {
    dashboard: true,
    library: true,
    protocols: true,
    calculators: true,
    prescriptions: true,
    userManagement: false,
    admin: false,
    medications: true,
    fluxogramas: true,
  },
  admin: {
    dashboard: true,
    library: true,
    protocols: true,
    calculators: true,
    prescriptions: true,
    userManagement: true,
    admin: true,
    medications: true,
    fluxogramas: true,
  }
};

/**
 * Checks if a user is designated as a Super Admin in the system.
 */
export function isSuperAdmin(user: User | null | undefined): boolean {
  if (!user) return false;
  const superEmails = ['arthur.fazolo@gmail.com', 'medassist.sup@gmail.com'];
  return superEmails.includes(user.email.toLowerCase());
}

/**
 * Checks if a user profile holds a specific permission.
 */
export function hasPermission(
  user: User | null | undefined,
  permissionKey: keyof RolePermissions,
  allPermissions: Record<string, RolePermissions>
): boolean {
  // Super Admins ALWAYS have unlimited permissions
  if (isSuperAdmin(user)) {
    return true;
  }

  if (!user) {
    return false;
  }

  const role = user.role || 'user';
  const rolePerms = allPermissions[role];

  if (rolePerms) {
    return !!rolePerms[permissionKey];
  }

  // Fallback to standard user permissions if role config doesn't exist
  const fallback = allPermissions['user'] || DEFAULT_PERMISSIONS['user'];
  return !!fallback[permissionKey];
}

/**
 * Seed permissions in Firebase if collection is empty
 */
export async function seedPermissionsIfEmpty() {
  try {
    const querySnapshot = await getDocs(collection(db, 'permissions'));
    if (querySnapshot.empty) {
      console.log("No custom permissions found in Firestore. Seeding default roles...");
      const batch = writeBatch(db);
      for (const [roleName, perms] of Object.entries(DEFAULT_PERMISSIONS)) {
        const ref = doc(db, 'permissions', roleName);
        batch.set(ref, perms);
      }
      await batch.commit();
      console.log("Default permissions seeded successfully.");
    }
  } catch (error) {
    console.warn("Could not seed permissions collection automatically. This is expected if logged in as non-admin.", error);
  }
}

/**
 * Save updated permissions for a role/profile to Firestore
 */
export async function saveRolePermissions(role: string, permissions: RolePermissions): Promise<void> {
  // Safeguard: Ensure super admin cannot accidentally strip admin permissions or freeze themselves
  if (role === 'admin') {
    // Force admin role to have at least dashboard and admin/permission management so they never get locked out
    permissions.admin = true;
    permissions.dashboard = true;
  }

  try {
    const docRef = doc(db, 'permissions', role);
    await setDoc(docRef, cleanUndefined(permissions));
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `permissions/${role}`);
  }
}
