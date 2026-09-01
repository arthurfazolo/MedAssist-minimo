import { User, UserRole } from '../types';
import bcrypt from 'bcryptjs';

const USERS_KEY = 'medassist_users';
const CURRENT_USER_KEY = 'medassist_current_user';

// Helper to get users and migrate them to bcrypt if not already migrated
const getAndMigrateUsers = (): any[] => {
  const usersRaw = localStorage.getItem(USERS_KEY);
  if (!usersRaw) return [];
  try {
    const users = JSON.parse(usersRaw);
    let updated = false;
    const migratedUsers = users.map((user: any) => {
      if (user.password && !user.password.startsWith('$2b$')) {
        user.password = bcrypt.hashSync(user.password, 10);
        updated = true;
      }
      return user;
    });
    if (updated) {
      localStorage.setItem(USERS_KEY, JSON.stringify(migratedUsers));
    }
    return migratedUsers;
  } catch (e) {
    return [];
  }
};

// Seed initial users if empty
const seedUsers = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    const initialUsers = [
      { id: '1', email: 'admin@med.com', password: bcrypt.hashSync('123456', 10), name: 'Administrador', role: 'admin' },
      { id: '2', email: 'sub@med.com', password: bcrypt.hashSync('123456', 10), name: 'Dr. Assinante', role: 'subscriber' },
      { id: '3', email: 'user@med.com', password: bcrypt.hashSync('123456', 10), name: 'Dra. Usuária', role: 'user' },
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
  } else {
    // If users already exist, run a check to migrate any unhashed passwords
    getAndMigrateUsers();
  }
};

seedUsers();

export const authService = {
  login: (email: string, password: string): User | null => {
    const users = getAndMigrateUsers();
    const user = users.find((u: any) => u.email === email && bcrypt.compareSync(password, u.password));
    if (user) {
      if (['arthur.fazolo@gmail.com', 'medassist.sup@gmail.com'].includes(email.toLowerCase())) {
        user.role = 'admin';
      }
      const { password: _, ...userWithoutPass } = user;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPass));
      return userWithoutPass;
    }
    return null;
  },

  register: (email: string, password: string, name: string): User | string => {
    const users = getAndMigrateUsers();

    if (users.find((u: any) => u.email === email)) {
      return "E-mail já cadastrado.";
    }

    const isAdminEmail = ['arthur.fazolo@gmail.com', 'medassist.sup@gmail.com'].includes(email.toLowerCase());

    const newUser = {
      id: Date.now().toString(),
      email,
      password: bcrypt.hashSync(password, 10),
      name,
      role: isAdminEmail ? 'admin' : 'user' // Default role
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    const { password: p, ...userReturn } = newUser;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userReturn));
    return userReturn as User;
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser: (): User | null => {
    const userRaw = localStorage.getItem(CURRENT_USER_KEY);
    if (!userRaw) return null;
    try {
      const u = JSON.parse(userRaw);
      if (u && u.email && ['arthur.fazolo@gmail.com', 'medassist.sup@gmail.com'].includes(u.email.toLowerCase())) {
        if (u.role !== 'admin') {
          u.role = 'admin';
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(u));
        }
      }
      return u;
    } catch (e) {
      return null;
    }
  },

  // Admin functions
  getAllUsers: (): User[] => {
    const users = getAndMigrateUsers();
    return users.map((u: any) => {
      if (u.email && ['arthur.fazolo@gmail.com', 'medassist.sup@gmail.com'].includes(u.email.toLowerCase())) {
        u.role = 'admin';
      }
      const { password, ...rest } = u;
      return rest;
    });
  },

  updateUserRole: (userId: string, newRole: UserRole) => {
    const users = getAndMigrateUsers();
    const updatedUsers = users.map((u: any) => 
      u.id === userId ? { ...u, role: newRole } : u
    );
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    
    // If updating current user, update session too
    const currentUser = authService.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ ...currentUser, role: newRole }));
    }
  },

  updateUserProfile: (userId: string, updatedFields: Partial<User>): User | null => {
    const users = getAndMigrateUsers();
    
    let updatedUser: User | null = null;
    const updatedUsers = users.map((u: any) => {
      if (u.id === userId) {
        const merged = { ...u, ...updatedFields };
        const { password, ...rest } = merged;
        updatedUser = rest;
        return merged;
      }
      return u;
    });

    if (updatedUser) {
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
      
      const currentUser = authService.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ ...currentUser, ...updatedFields }));
      }
    }
    return updatedUser;
  },

  changePassword: (userId: string, currentPass: string, newPass: string): { success: boolean, message: string } => {
    const users = getAndMigrateUsers();

    const userIndex = users.findIndex((u: any) => u.id === userId);
    if (userIndex === -1) {
      return { success: false, message: 'Usuário não encontrado.' };
    }

    const user = users[userIndex];
    if (!bcrypt.compareSync(currentPass, user.password)) {
      return { success: false, message: 'Senha atual incorreta.' };
    }

    user.password = bcrypt.hashSync(newPass, 10);
    users[userIndex] = user;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return { success: true, message: 'Senha alterada com sucesso!' };
  }
};
