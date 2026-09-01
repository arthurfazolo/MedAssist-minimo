import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { db } from '../services/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { 
  RolePermissions, 
  PERMISSION_LABELS, 
  DEFAULT_PERMISSIONS, 
  saveRolePermissions, 
  isSuperAdmin 
} from '../services/permissionsService';
import { 
  Shield, 
  Plus, 
  Save, 
  RotateCcw, 
  Search, 
  Check, 
  X, 
  Filter, 
  Trash2, 
  Lock, 
  Settings,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

const AdminPermissions: React.FC = () => {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState<Record<string, RolePermissions>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileFilter, setProfileFilter] = useState('all');
  
  // Custom Role Creator State
  const [showNewRoleModal, setShowNewRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleTemplate, setNewRoleTemplate] = useState('user');
  const [newRoleError, setNewRoleError] = useState('');

  // Status/Feedback State
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  useEffect(() => {
    // Sincronização em tempo real das permissões de todos os perfis cadastrados no Firestore
    const unsubscribe = onSnapshot(
      collection(db, 'permissions'),
      (snapshot) => {
        const perms: Record<string, RolePermissions> = {};
        snapshot.forEach((doc) => {
          perms[doc.id] = doc.data() as RolePermissions;
        });
        
        // Se houver perfis padrão que não estejam no Firestore, mesclar com defaults locais
        const merged = { ...DEFAULT_PERMISSIONS, ...perms };
        setPermissions(merged);
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao escutar coleção 'permissions' no Firestore:", error);
        setPermissions(DEFAULT_PERMISSIONS);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleToggle = (role: string, permissionKey: keyof RolePermissions) => {
    // Proteção estrita do Super Administrador ou modificações proibidas
    if (role === 'admin' && (permissionKey === 'admin' || permissionKey === 'dashboard')) {
      showFeedback('error', 'O perfil Administrador não pode perder acesso ao Painel de Controle para evitar bloqueio permanente.');
      return;
    }

    const currentRolePerms = permissions[role] || { ...DEFAULT_PERMISSIONS.user };
    const updatedRolePerms = {
      ...currentRolePerms,
      [permissionKey]: !currentRolePerms[permissionKey]
    };

    setPermissions(prev => ({
      ...prev,
      [role]: updatedRolePerms
    }));
  };

  const handleSaveAll = async () => {
    setLoading(true);
    try {
      // Salvar todos os perfis em lote ou um a um
      for (const [role, perms] of Object.entries(permissions) as Array<[string, RolePermissions]>) {
        await saveRolePermissions(role, perms);
      }
      showFeedback('success', 'Todas as configurações de permissões foram gravadas com sucesso no Firebase!');
    } catch (err: any) {
      console.error(err);
      showFeedback('error', 'Ocorreu um erro ao salvar as permissões. Por favor, verifique suas regras de segurança.');
    } finally {
      setLoading(false);
    }
  };

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setSaveStatus({ type, message });
    setTimeout(() => {
      setSaveStatus({ type: null, message: '' });
    }, 4000);
  };

  // Bulk operation actions per profile
  const handleBulkToggle = (role: string, value: boolean) => {
    const currentRolePerms = permissions[role] || { ...DEFAULT_PERMISSIONS.user };
    const updated: RolePermissions = { ...currentRolePerms };
    
    (Object.keys(updated) as Array<keyof RolePermissions>).forEach(key => {
      // Impedir que admin seja bloqueado do painel ou do dashboard principal
      if (role === 'admin' && (key === 'admin' || key === 'dashboard')) {
        updated[key] = true;
      } else {
        updated[key] = value;
      }
    });

    setPermissions(prev => ({
      ...prev,
      [role]: updated
    }));
  };

  const handleResetToDefault = (role: string) => {
    const defaultValue = DEFAULT_PERMISSIONS[role];
    if (defaultValue) {
      setPermissions(prev => ({
        ...prev,
        [role]: { ...defaultValue }
      }));
      showFeedback('success', `Ajustes do perfil "${role}" reiniciados para os padrões originais.`);
    } else {
      // Para perfis customizados, limpar tudo
      const cleared: RolePermissions = {
        dashboard: false,
        library: false,
        protocols: false,
        calculators: false,
        prescriptions: false,
        userManagement: false,
        admin: false,
        medications: false,
        fluxogramas: false
      };
      setPermissions(prev => ({
        ...prev,
        [role]: cleared
      }));
    }
  };

  // Add Dynamic user profiles/roles
  const handleAddNewRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewRoleError('');
    
    // Simplificar e sanitizar o ID do nível (letras minúsculas e sem espaços)
    const normalizedRoleCode = newRoleName
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');

    if (!normalizedRoleCode) {
      setNewRoleError('Por favor, informe um nome de nível válido.');
      return;
    }

    if (permissions[normalizedRoleCode]) {
      setNewRoleError('Este perfil ou identificador já existe no sistema.');
      return;
    }

    // Copiar permissões do modelo gabarito selecionado
    const templatePerms = permissions[newRoleTemplate] || DEFAULT_PERMISSIONS.user;
    const newPermsObj: RolePermissions = { ...templatePerms };

    try {
      setLoading(true);
      await saveRolePermissions(normalizedRoleCode, newPermsObj);
      
      // Atualizar estado
      setPermissions(prev => ({
        ...prev,
        [normalizedRoleCode]: newPermsObj
      }));

      setShowNewRoleModal(false);
      setNewRoleName('');
      showFeedback('success', `Novo nível de acesso "${newRoleName}" criado com sucesso!`);
    } catch (err) {
      console.error(err);
      setNewRoleError('Erro ao gravar novo perfil no Firestore.');
    } finally {
      setLoading(false);
    }
  };

  // Excluir perfis de acesso criados dinamicamente
  const handleDeleteCustomRole = async (role: string) => {
    if (['admin', 'subscriber', 'user'].includes(role)) {
      showFeedback('error', 'Não é permitido desativar ou remover perfis de sistema padrão.');
      return;
    }

    if (!window.confirm(`Tem certeza que deseja excluir permanentemente o nível de acesso "${role}"? Essa operação não pode ser desfeita.`)) {
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(db, 'permissions', role);
      await deleteDoc(docRef);
      
      // Remover visualmente
      const copy = { ...permissions };
      delete copy[role];
      setPermissions(copy);
      
      showFeedback('success', `Perfil "${role}" deletado com sucesso.`);
    } catch (err) {
      console.error(err);
      showFeedback('error', 'Não foi possível excluir o documento do Firebase.');
    } finally {
      setLoading(false);
    }
  };

  // List permissions keys and filter by search query
  const filteredPermissionKeys = (Object.keys(PERMISSION_LABELS) as Array<keyof RolePermissions>).filter(key => {
    const label = PERMISSION_LABELS[key].toLowerCase();
    return label.includes(searchQuery.toLowerCase());
  });

  // Get active lists of columns/roles based on profile filter
  const activeRoles = Object.keys(permissions).filter(role => {
    if (profileFilter === 'all') return true;
    return role === profileFilter;
  });

  const getRoleDisplayName = (role: string): string => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'subscriber': return 'Assinante';
      case 'user': return 'Usuário';
      default: return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  return (
    <div className="px-4 sm:px-0">
      {/* Header and Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 dark:text-white">
            <Shield className="h-6 w-6 text-medical-600" />
            Gestão de Permissões
          </h2>
          <p className="text-sm text-gray-500">Configuração dinâmica de acessos por perfil de usuário. As regras entram em vigor imediatamente.</p>
        </div>
        
        {/* Actions bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowNewRoleModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 shadow-sm transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-700"
          >
            <Plus className="h-4 w-4 text-medical-600" />
            Novo Perfil
          </button>
          
          <button
            onClick={handleSaveAll}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-medical-600 rounded-xl text-white hover:bg-medical-700 shadow-sm transition-all disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            Salvar Tudo
          </button>
        </div>
      </div>

      {/* Alert status feedbacks */}
      {saveStatus.type && (
        <div className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
          saveStatus.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-800/30 dark:text-green-300' 
            : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950/20 dark:border-red-800/30 dark:text-red-300'
        }`}>
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <span className="text-sm font-medium">{saveStatus.message}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 mb-6 flex flex-col md:flex-row items-center gap-4 dark:bg-slate-900 dark:border-slate-800">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar página ou funcionalidade..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={profileFilter}
            onChange={(e) => setProfileFilter(e.target.value)}
            className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          >
            <option value="all">Todos os Perfis</option>
            {Object.keys(permissions).map(role => (
              <option key={role} value={role}>{getRoleDisplayName(role)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Matrix Board */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        {loading && Object.keys(permissions).length === 0 ? (
          <div className="p-12 text-center text-gray-500">Carregando permissões do banco em tempo real...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
              <thead className="bg-gray-50 dark:bg-slate-800/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Página / Funcionalidade ({filteredPermissionKeys.length} listadas)
                  </th>
                  
                  {activeRoles.map(role => (
                    <th key={role} scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[160px] dark:text-gray-400">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-gray-900 dark:text-white">{getRoleDisplayName(role)}</span>
                          {!['admin', 'subscriber', 'user'].includes(role) && (
                            <button
                              onClick={() => handleDeleteCustomRole(role)}
                              title="Excluir este perfil personalizado"
                              className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                        
                        {/* Quick action controls for single-column */}
                        <div className="flex items-center gap-1 mt-1">
                          <button
                            onClick={() => handleBulkToggle(role, true)}
                            title="Marcar todas as permissões deste perfil"
                            className="px-1.5 py-0.5 text-[10px] bg-green-100 text-green-800 rounded font-bold hover:bg-green-200 transition-colors dark:bg-green-950/40 dark:text-green-300"
                          >
                            Todos
                          </button>
                          <button
                            onClick={() => handleBulkToggle(role, false)}
                            title="Nenhuma permissão para este perfil"
                            className="px-1.5 py-0.5 text-[10px] bg-red-100 text-red-800 rounded font-bold hover:bg-red-200 transition-colors dark:bg-red-950/40 dark:text-red-300"
                          >
                            Nenhum
                          </button>
                          {DEFAULT_PERMISSIONS[role] && (
                            <button
                              onClick={() => handleResetToDefault(role)}
                              title="Restaurar valores de fábrica"
                              className="p-0.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors dark:bg-slate-800 dark:text-gray-300"
                            >
                              <RotateCcw className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-900 dark:divide-slate-800">
                {filteredPermissionKeys.map((key) => (
                  <tr key={key} className="hover:bg-slate-50/50 transition-colors dark:hover:bg-slate-800/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 dark:text-slate-200">{PERMISSION_LABELS[key]}</span>
                        <span className="text-xs text-gray-400 font-mono mt-0.5">{key}</span>
                      </div>
                    </td>
                    
                    {activeRoles.map(role => {
                      const isChecked = !!permissions[role]?.[key];
                      const isRestrictedAdminFlag = role === 'admin' && (key === 'admin' || key === 'dashboard');
                      
                      return (
                        <td key={role} className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            type="button"
                            disabled={isRestrictedAdminFlag}
                            onClick={() => handleToggle(role, key)}
                            className={`inline-flex items-center justify-center p-2 rounded-xl border transition-all duration-150 ${
                              isChecked 
                                ? 'bg-medical-50 border-medical-200 text-medical-600 ring-2 ring-medical-100 dark:bg-medical-950/20 dark:border-medical-800/45 dark:text-medical-400 dark:ring-0' 
                                : 'bg-gray-50 border-gray-200 text-gray-300 dark:bg-slate-800/50 dark:border-slate-700'
                            } ${isRestrictedAdminFlag ? 'opacity-85 cursor-not-allowed text-purple-600 border-purple-200 bg-purple-50 dark:bg-purple-950/30' : 'cursor-pointer hover:scale-105'}`}
                          >
                            {isRestrictedAdminFlag ? (
                              <Lock className="h-4 w-4" title="Proteção estrita. Não pode ser removida." />
                            ) : isChecked ? (
                              <Check className="h-4.5 w-4.5 stroke-[3]" />
                            ) : (
                              <X className="h-4.5 w-4.5 stroke-[2.5]" />
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                
                {filteredPermissionKeys.length === 0 && (
                  <tr>
                    <td colSpan={1 + activeRoles.length} className="p-12 text-center text-gray-500">
                      Nenhuma permissão correspondente à pesquisa encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-6 bg-purple-50/50 border-l-4 border-purple-500 rounded-r-xl p-4 dark:bg-slate-800/40 dark:border-purple-600">
        <div className="flex">
          <div className="flex-shrink-0">
            <Lock className="h-5 w-5 text-purple-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-bold text-purple-900 dark:text-purple-300">Super Administrador & Proteção de Segurança</h3>
            <div className="mt-1.5 text-xs sm:text-sm text-purple-800 dark:text-purple-200 leading-relaxed max-w-4xl font-medium">
              Contas de desenvolvedores fundadores (<code className="bg-purple-100 px-1 py-0.5 rounded text-purple-900 font-mono text-xs dark:bg-slate-800 dark:text-purple-300">arthur.fazolo@gmail.com</code> e <code className="bg-purple-100 px-1 py-0.5 rounded text-purple-900 font-mono text-xs dark:bg-slate-800 dark:text-purple-300">medassist.sup@gmail.com</code>) operam no nível de <strong>Super Administrador</strong> com acesso incondicional e à prova de travamentos acidentais.
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic role creation Modal */}
      {showNewRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-6 shadow-2xl dark:bg-slate-900 dark:border-slate-800">
            <div className="flex items-center justify-between border-b pb-4 mb-4 dark:border-slate-800">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 dark:text-white">
                <Settings className="w-5 h-5 text-medical-600" />
                Criar Novo Nível de Acesso
              </h3>
              <button 
                onClick={() => setShowNewRoleModal(false)}
                className="text-gray-400 hover:text-gray-600 rounded bg-slate-50 dark:hover:bg-slate-800 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewRole} className="space-y-4">
              {newRoleError && (
                <div className="p-3 bg-red-50 text-red-800 text-xs font-semibold rounded-lg border border-red-100 dark:bg-red-950/20 dark:border-red-900/10">
                  {newRoleError}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
                  Nome do Perfil de Acesso
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Professor, Residente, Premium..."
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />
                <span className="text-[11px] text-gray-400 font-medium leading-tight block mt-1">
                  O identificador interno será gerado automaticamente em letras minúsculas (ex: "professor").
                </span>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
                  Copiar Permissões de Modelo
                </label>
                <select
                  value={newRoleTemplate}
                  onChange={(e) => setNewRoleTemplate(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                >
                  <option value="user">Modelo Usuário (Mais restritivo)</option>
                  <option value="subscriber">Modelo Assinante (Mais funcional)</option>
                  <option value="admin">Modelo Administrador (Acesso completo)</option>
                </select>
                <span className="text-[11px] text-gray-400 font-medium leading-tight block mt-1">
                  O novo perfil começará com as permissões selecionadas habilitadas por padrão.
                </span>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewRoleModal(false)}
                  className="w-1/2 py-2 text-sm font-bold border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 py-2 text-sm font-bold bg-medical-600 rounded-xl text-white hover:bg-medical-700 text-center transition-all disabled:opacity-50"
                >
                  Criar Perfil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPermissions;
