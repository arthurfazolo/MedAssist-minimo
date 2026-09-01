import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Activity, Pill, Stethoscope, Menu, X, LogIn, Shield, Users, BookOpen, WifiOff, Database, Home as HomeIcon, FileText, Layers } from 'lucide-react';
import Home from './pages/Home';
import Calculators from './pages/Calculators';
import Prescriptions from './pages/Prescriptions';
import Login from './pages/Login';
import AdminUsers from './pages/AdminUsers';
import Medications from './pages/Medications';
import ClinicalGuide from './pages/ClinicalGuide';
import ProtocolsHub from './pages/ProtocolsHub';
import SpecialSectionsHub from './pages/SpecialSectionsHub';
import Profile from './pages/Profile';
import KnowledgeBase from './pages/KnowledgeBase';
import { authService } from './services/authService';
import { preferencesService } from './services/preferencesService';
import { User, UserRole } from './types';
import { RolePermissions, DEFAULT_PERMISSIONS, hasPermission as checkUserPermission, seedPermissionsIfEmpty } from './services/permissionsService';
import { GlobalSearch } from './components/GlobalSearch';
import { db, auth, handleFirestoreError, OperationType } from './services/firebase';
import { doc, setDoc, onSnapshot, collection } from 'firebase/firestore';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// --- AUTH CONTEXT ---
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
  hasPermission: (permissionKey: keyof RolePermissions) => boolean;
  allPermissions: Record<string, RolePermissions>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Route Guard Component
const ProtectedRoute = ({ children, permission }: { children?: React.ReactNode, permission?: keyof RolePermissions }) => {
  const { user, hasPermission } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (permission && !hasPermission(permission)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Shield className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900">Acesso Não Autorizado</h2>
        <p className="text-gray-500 mt-2 max-w-md font-medium text-sm">
          Seu perfil de acesso atual não possui permissão para visualizar este conteúdo.
        </p>
        <Link to="/" className="mt-4 text-medical-600 hover:text-medical-700 font-semibold text-sm">
          Voltar ao Início
        </Link>
      </div>
    );
  }

  return <>{children}</>;
};

// Custom Tooltip-expandable NavButton for single-line navigation
interface NavButtonProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ to, icon: Icon, label, isActive }) => {
  return (
    <Link
      to={to}
      aria-label={label}
      title={label}
      className={`group relative flex items-center h-10 px-3 rounded-xl transition-all duration-300 ease-out shrink-0 select-none ${
        isActive
          ? "bg-medical-50 text-medical-700 font-semibold dark:bg-slate-800 dark:text-medical-500"
          : "text-slate-600 hover:text-medical-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-medical-500"
      }`}
      style={{
        transition: 'width 0.2s ease, padding 0.2s ease, background-color 0.2s ease'
      }}
    >
      <Icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
      <span className="max-w-0 opacity-0 group-hover:opacity-100 group-hover:max-w-[150px] group-hover:ml-2.5 overflow-hidden transition-all duration-250 ease-out whitespace-nowrap text-xs font-semibold">
        {label}
      </span>
    </Link>
  );
};

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const location = useLocation();
  const { user, logout, hasRole, hasPermission } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50 dark:bg-slate-900 dark:border-slate-800 w-full max-w-full box-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full box-border">
        <div className="flex items-center justify-between min-h-[4rem] w-full max-w-full box-border">
          
          {/* Logo + Compact Navigation Links (Row layout) */}
          <div className="flex items-center gap-4 shrink-0">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2.5">
              <div className="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center shadow-sm">
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <span className="font-display font-bold text-slate-900 text-lg tracking-tight dark:text-white">
                Med<span className="text-medical-600">Assist</span>
              </span>
            </Link>

            <div className="hidden md:block">
              <div className="flex items-center gap-1">
                {hasPermission('dashboard') && (
                  <NavButton to="/" icon={HomeIcon} label="Início" isActive={location.pathname === '/'} />
                )}
                {hasPermission('calculators') && (
                  <NavButton to="/calculators" icon={Activity} label="Calculadoras" isActive={location.pathname === '/calculators'} />
                )}
                {hasPermission('medications') && (
                  <NavButton to="/medications" icon={Pill} label="Medicações" isActive={location.pathname === '/medications'} />
                )}
                {hasPermission('library') && (
                  <NavButton to="/knowledge" icon={Database} label="Base de Doenças" isActive={location.pathname === '/knowledge'} />
                )}
                {hasPermission('protocols') && (
                  <>
                    <NavButton to="/special" icon={Layers} label="Roteiros de Consultas" isActive={location.pathname === '/special'} />
                    <NavButton to="/guide" icon={BookOpen} label="Protocolos Clínicos" isActive={location.pathname === '/guide'} />
                  </>
                )}
                
                {user && hasPermission('prescriptions') && (
                   <NavButton to="/prescriptions" icon={FileText} label="Prescrições" isActive={location.pathname === '/prescriptions'} />
                )}

                {(hasPermission('admin') || hasPermission('userManagement')) && (
                  <NavButton to="/admin" icon={Users} label="Gestão" isActive={location.pathname === '/admin'} />
                )}
              </div>
            </div>
          </div>
          
          {/* Right Actions: Expanding Search + User Profile */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <GlobalSearch onFocusChange={setIsSearchFocused} />
            
            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors dark:hover:bg-slate-800"
                >
                  <div className="w-8 h-8 rounded-full bg-medical-600 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm ring-2 ring-medical-100 dark:ring-slate-700">
                    {user.name.slice(0, 2)}
                  </div>
                  <span className="text-sm font-medium text-slate-700 hidden lg:inline dark:text-slate-200">
                    Dr(a). {user.name.split(' ')[0]}
                  </span>
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-white px-4 py-2 rounded-xl text-sm font-semibold bg-medical-600 hover:bg-medical-700 shadow-sm transition-all"
              >
                <LogIn className="h-4 w-4" /> Entrar
              </Link>
            )}
          </div>

          {/* Mobile Hambúrguer menu trigger */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800">
          <div className="px-3 pt-2 pb-3 space-y-1">
            {hasPermission('dashboard') && <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-700 hover:bg-slate-50 hover:text-medical-600 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors dark:text-slate-300">Início</Link>}
            {hasPermission('calculators') && <Link to="/calculators" onClick={() => setIsOpen(false)} className="text-slate-700 hover:bg-slate-50 hover:text-medical-600 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors dark:text-slate-300">Calculadoras</Link>}
            {hasPermission('medications') && <Link to="/medications" onClick={() => setIsOpen(false)} className="text-slate-700 hover:bg-slate-50 hover:text-medical-600 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors dark:text-slate-300">Medicações</Link>}
            {hasPermission('library') && <Link to="/knowledge" onClick={() => setIsOpen(false)} className="text-slate-700 hover:bg-slate-50 hover:text-medical-600 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors dark:text-slate-300">Base de Doenças</Link>}
            {hasPermission('protocols') && (
              <>
                <Link to="/special" onClick={() => setIsOpen(false)} className="text-slate-700 hover:bg-slate-50 hover:text-medical-600 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors dark:text-slate-300">Roteiros de Consultas</Link>
                <Link to="/guide" onClick={() => setIsOpen(false)} className="text-slate-700 hover:bg-slate-50 hover:text-medical-600 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors dark:text-slate-300">Protocolos Clínicos</Link>
              </>
            )}
            
            {user && hasPermission('prescriptions') && (
              <Link to="/prescriptions" onClick={() => setIsOpen(false)} className="text-slate-700 hover:bg-slate-50 hover:text-medical-600 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors dark:text-slate-300">Prescrições</Link>
            )}
            
            {user && (
              <Link to="/profile" onClick={() => setIsOpen(false)} className="text-slate-700 hover:bg-slate-50 hover:text-medical-600 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors dark:text-slate-300">Meu Perfil</Link>
            )}

            {(hasPermission('admin') || hasPermission('userManagement')) && (
              <Link to="/admin" onClick={() => setIsOpen(false)} className="text-slate-700 hover:bg-slate-50 hover:text-medical-600 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors dark:text-slate-300">Gestão</Link>
            )}

            {/* Buscador Global (Mobile) */}
            <div className="px-3 py-2 border-t border-slate-100 dark:border-slate-800 mt-2">
              <GlobalSearch onNavigate={() => setIsOpen(false)} />
            </div>

            {!user && (
              <div className="border-t border-slate-100 dark:border-slate-800 pt-2 mt-2">
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-slate-700 hover:bg-slate-50 hover:text-medical-600 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors dark:text-slate-300">Entrar</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const AppWrapper: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [allPermissions, setAllPermissions] = useState<Record<string, RolePermissions>>(DEFAULT_PERMISSIONS);

  useEffect(() => {
    // Seed default permissions if Firestore collection is empty
    seedPermissionsIfEmpty();

    // Subscribe to real-time changes in permissions collection
    const unsubscribePerms = onSnapshot(
      collection(db, 'permissions'),
      (snapshot) => {
        const permsMap: Record<string, RolePermissions> = {};
        snapshot.forEach((doc) => {
          permsMap[doc.id] = doc.data() as RolePermissions;
        });
        
        // Ensure standard keys at least have defaults
        const mergedPerms = {
          ...DEFAULT_PERMISSIONS,
          ...permsMap
        };
        setAllPermissions(mergedPerms);
      },
      (error) => {
        console.error("Error subscribing to permissions in Firestore, accessing local defaults:", error);
      }
    );

    return () => unsubscribePerms();
  }, []);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      try {
        const uPrefs = preferencesService.getPreferences(currentUser.id);
        preferencesService.applyPreferencesDOM(uPrefs);
      } catch (e) {}
    }
  }, []);

  // Sync admin state with Firebase security collection
  useEffect(() => {
    if (!user) return;
    
    const syncAdminDoc = async (fbUser: any) => {
      if (fbUser && user.role === 'admin') {
        try {
          const adminDocRef = doc(db, 'admins', fbUser.uid);
          await setDoc(adminDocRef, {
            isAdmin: true,
            email: user.email || fbUser.email || 'admin@medassist.com',
            updatedAt: new Date().toISOString()
          });
          console.log("Admin security credentials registered in system database.");
        } catch (e) {
          console.warn("Notice: Admin credentials will continue in offline/local storage mode.");
        }
      }
    };

    if (auth.currentUser && user.role === 'admin') {
      syncAdminDoc(auth.currentUser);
    }

    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      syncAdminDoc(fbUser);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    try {
      const uPrefs = preferencesService.getPreferences(userData.id);
      preferencesService.applyPreferencesDOM(uPrefs);
    } catch (e) {}
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const fbUser = result.user;
    
    if (fbUser && fbUser.email) {
      const email = fbUser.email;
      const name = fbUser.displayName || email.split('@')[0];
      
      const isAdminEmail = ['arthur.fazolo@gmail.com', 'medassist.sup@gmail.com'].includes(email.toLowerCase());
      const role: UserRole = isAdminEmail ? 'admin' : 'user';
      
      const USERS_KEY = 'medassist_users';
      const usersRaw = localStorage.getItem(USERS_KEY);
      let users: any[] = [];
      if (usersRaw) {
        try {
          users = JSON.parse(usersRaw);
        } catch (e) {}
      }
      
      const existingUserIdx = users.findIndex((u: any) => u.email === email);
      let finalUser: User;
      
      if (existingUserIdx >= 0) {
        const existing = users[existingUserIdx];
        const updatedRole: UserRole = isAdminEmail ? 'admin' : existing.role;
        users[existingUserIdx] = {
          ...existing,
          name: existing.name || name,
          role: updatedRole,
        };
        finalUser = {
          id: existing.id,
          email: existing.email,
          name: existing.name || name,
          role: updatedRole,
          specialty: existing.specialty,
          crm: existing.crm,
          institution: existing.institution,
        };
      } else {
        const newUser: User = {
          id: fbUser.uid,
          email,
          name,
          role,
        };
        users.push(newUser);
        finalUser = newUser;
      }
      
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem('medassist_current_user', JSON.stringify(finalUser));
      setUser(finalUser);
      
      try {
        const uPrefs = preferencesService.getPreferences(finalUser.id);
        preferencesService.applyPreferencesDOM(uPrefs);
      } catch (e) {}
      
      const accessKey = `medassist_last_access_${finalUser.id}`;
      localStorage.setItem(accessKey, new Date().toLocaleString('pt-BR'));
    }
  };

  const logout = () => {
    authService.logout();
    auth.signOut().catch((e) => console.error("Error signing out of Firebase Auth:", e));
    setUser(null);
    // Apply default light on logout
    try {
      preferencesService.applyPreferencesDOM({
        theme: 'light',
        fontSize: 'medium',
        favorites: { calculators: [], medications: [], protocols: [] }
      });
    } catch (e) {}
  };

  const hasRole = (roles: UserRole[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const checkPermission = (key: keyof RolePermissions): boolean => {
    return checkUserPermission(user, key, allPermissions);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, logout, hasRole, hasPermission: checkPermission, allPermissions }}>
      <Router>
        <div className="min-h-screen bg-[var(--bg-secondary)] flex flex-col font-sans">
          <NavBar />
          {isOffline && (
            <div className="bg-amber-600 text-white px-4 py-2.5 text-center flex items-center justify-center gap-2 text-sm font-semibold shadow-sm z-50 sticky top-16 transition-all duration-300 border-b border-amber-700 dark:bg-amber-700 dark:border-amber-800">
              <WifiOff className="h-4 w-4 shrink-0" />
              <span>Modo Offline Ativo. O MedAssist continua funcionando com recursos e dados locais salvos.</span>
            </div>
          )}
          <main className="flex-grow">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Routes>
                {/* General Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                {/* Routes Protected by Permissions */}
                <Route 
                  path="/calculators" 
                  element={
                    <ProtectedRoute permission="calculators">
                      <Calculators />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/medications" 
                  element={
                    <ProtectedRoute permission="medications">
                      <Medications />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/knowledge" 
                  element={
                    <ProtectedRoute permission="library">
                      <KnowledgeBase />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/special" 
                  element={
                    <ProtectedRoute permission="protocols">
                      <SpecialSectionsHub />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/guide" 
                  element={
                    <ProtectedRoute permission="protocols">
                      <ProtocolsHub />
                    </ProtectedRoute>
                  } 
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route 
                  path="/prescriptions" 
                  element={
                    <ProtectedRoute permission="prescriptions">
                      <Prescriptions />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute permission="admin">
                      <AdminUsers />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
          </main>
          <footer className="bg-slate-900 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

                {/* Logo */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-medical-600 rounded-lg flex items-center justify-center">
                    <Stethoscope className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-display font-bold text-white text-sm">
                    Med<span className="text-medical-400">Assist</span>
                  </span>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-slate-400 text-center max-w-md leading-relaxed">
                  Ferramenta de apoio clínico exclusiva para profissionais de saúde.
                  Não substitui o julgamento médico nem a relação médico-paciente.
                </p>

                {/* Copyright */}
                <p className="text-xs text-slate-500 shrink-0">
                  © {new Date().getFullYear()} MedAssist
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default AppWrapper;