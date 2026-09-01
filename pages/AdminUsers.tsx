import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { User, UserRole, MedicalDisease, Protocolo, Medication, PrescriptionModel, CalculatorDefinition } from '../types';
import { Users, Shield, Lock, Search, Filter, AlertCircle, Eye, Clipboard, List, Activity, BookOpen, Pill, FileText, CheckCircle, Settings } from 'lucide-react';
import { useAuth } from '../App';
import AdminPermissions from './AdminPermissions';

// Import reviews resources
import { getProtocols, saveProtocols } from '../services/protocolsService';
import { getMedications, saveMedications } from '../services/medicationsService';
import { getPrescriptions, savePrescriptions } from '../services/prescriptionsService';
import { getCalculators, saveCalculatorReviewAndSync } from '../services/calculatorService';
import { getAllDiseases, addCustomDisease } from '../services/knowledgeBaseService';
import { ModuleReviewQueue } from '../components/ModuleReviewQueue';
import { 
  getReviewRemainingDays,
  getGlobalReviewSettings,
  saveGlobalReviewSettings,
  addMonthsToDateString,
  computeReviewStatus,
  GlobalReviewIntervals
} from '../services/reviewService';
import { AlertModal, ConfirmModal } from '../components/ui/Modal';
import { useConfirmModal, useAlertModal } from '../hooks/useModal';

const AdminUsers: React.FC = () => {
  const { allPermissions, hasPermission, user: currentUser } = useAuth();
  
  // Tab-state: defaulted depending on which sections user has authorization for
  const canManagePermissions = hasPermission('admin');
  const canManageUsers = hasPermission('userManagement');
  const canManageReviews = currentUser?.role === 'admin';
  
  const [activeTab, setActiveTab] = useState<'users' | 'permissions' | 'reviews' | 'review_settings'>(
    canManageUsers ? 'users' : (canManagePermissions ? 'permissions' : 'reviews')
  );

  const { 
    isOpen: isConfirmOpen, 
    title: confirmTitle, 
    message: confirmMessage, 
    variant: confirmVariant, 
    requestConfirm, 
    handleConfirm, 
    handleCancel 
  } = useConfirmModal();

  const { 
    isOpen: isAlertOpen, 
    title: alertTitle, 
    message: alertMessage, 
    type: alertType, 
    showAlert, 
    handleClose: handleAlertClose 
  } = useAlertModal();

  const [globalSettings, setGlobalSettings] = useState<GlobalReviewIntervals>({
    protocol: 12,
    disease: 36,
    medication: 36,
    calculator: 12,
    prescription: 12
  });

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Review states
  const [diseasesList, setDiseasesList] = useState<MedicalDisease[]>([]);
  const [protocolsList, setProtocolsList] = useState<Protocolo[]>([]);
  const [medicationsList, setMedicationsList] = useState<Medication[]>([]);
  const [prescriptionsList, setPrescriptionsList] = useState<PrescriptionModel[]>([]);
  const [calculatorsList, setCalculatorsList] = useState<CalculatorDefinition[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [selectedReviewSubTab, setSelectedReviewSubTab] = useState<'disease' | 'protocol' | 'medication' | 'calculator' | 'prescription'>('disease');

  // Dynamic list of system roles fetched in real time from our permissions provider
  const availableRoles = Object.keys(allPermissions);

  useEffect(() => {
    if (canManageUsers) {
      loadUsers();
    }
  }, [canManageUsers]);

  // Load reviews whenever reviews/settings tab is clicked
  useEffect(() => {
    if ((activeTab === 'reviews' || activeTab === 'review_settings') && canManageReviews) {
      loadAllReviewData();
      refreshSettings();
    }
  }, [activeTab, canManageReviews]);

  const refreshSettings = async () => {
    try {
      const settings = await getGlobalReviewSettings();
      setGlobalSettings(settings);
    } catch (e) {
      console.error("Error loading global review settings:", e);
    }
  };

  const loadAllReviewData = async () => {
    setLoadingReviews(true);
    try {
      const diseases = await getAllDiseases(true);
      setDiseasesList(diseases);
      setProtocolsList(getProtocols());
      setMedicationsList(getMedications());
      setPrescriptionsList(getPrescriptions());
      setCalculatorsList(getCalculators());
    } catch (e) {
      console.error("Error loading consolidated review systems:", e);
    } finally {
      setLoadingReviews(false);
    }
  };

  const loadUsers = () => {
    const allUsers = authService.getAllUsers();
    setUsers(allUsers);
    setLoading(false);
  };

  const handleRoleChange = (userId: string, targetUserEmail: string, newRole: UserRole) => {
    // Impedir demissão de um Super Administrador (emails exclusivos)
    const superEmails = ['arthur.fazolo@gmail.com', 'medassist.sup@gmail.com'];
    if (superEmails.includes(targetUserEmail.toLowerCase()) && newRole !== 'admin') {
      alert('Segurança: O perfil do Super Administrador fundador não pode ser rebaixado.');
      return;
    }

    authService.updateUserRole(userId, newRole);
    loadUsers(); // Atualizar lista
  };

  const getRoleDisplayName = (role: string): string => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'subscriber': return 'Assinante';
      case 'user': return 'Usuário';
      default: return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin': 
        return <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300">Administrador</span>;
      case 'subscriber': 
        return <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300">Assinante</span>;
      case 'user': 
        return <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-slate-300">Usuário</span>;
      default:
        return <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300">{getRoleDisplayName(role)}</span>;
    }
  };

  // Filtragem e busca de usuários listados
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Consolidated alert notifications logic
  const getConsolidatedAlerts = () => {
    const alerts: { id: string; name: string; type: string; days: number; status: string }[] = [];
    
    const addAlertsFromList = (list: any[], typeLabel: string) => {
      list.forEach(item => {
        const name = item.nome || item.titulo || item.title || item.name;
        const status = item.reviewStatus;
        const days = getReviewRemainingDays(item.nextReviewAt || '');
        
        if (status === 'overdue') {
          alerts.push({ id: item.id, name, type: typeLabel, days, status: 'overdue' });
        } else if (status === 'review_due' || days <= 90) {
          alerts.push({ id: item.id, name, type: typeLabel, days, status: 'review_due' });
        }
      });
    };

    addAlertsFromList(diseasesList, 'Doença');
    addAlertsFromList(protocolsList, 'Protocolo');
    addAlertsFromList(medicationsList, 'Medicamento');
    addAlertsFromList(calculatorsList, 'Calculadora');
    addAlertsFromList(prescriptionsList, 'Modelo de Prescrição');

    return alerts.sort((a, b) => a.days - b.days).slice(0, 10); // Display top 10 most critical alerts
  };

  const expirationAlerts = getConsolidatedAlerts();

  // Content updaters for the queues
  const handleUpdateDisease = async (updated: any) => {
    await addCustomDisease(updated);
    await loadAllReviewData();
  };

  const handleUpdateProtocol = async (updated: any) => {
    const list = getProtocols();
    const idx = list.findIndex(x => x.id === updated.id);
    if (idx >= 0) {
      list[idx] = updated;
      await saveProtocols(list);
      await loadAllReviewData();
    }
  };

  const handleUpdateMedication = async (updated: any) => {
    const list = getMedications();
    const idx = list.findIndex(x => x.id === updated.id);
    if (idx >= 0) {
      list[idx] = updated;
      await saveMedications(list);
      await loadAllReviewData();
    }
  };

  const handleUpdatePrescription = async (updated: any) => {
    const list = getPrescriptions();
    const idx = list.findIndex(x => x.id === updated.id);
    if (idx >= 0) {
      list[idx] = updated;
      await savePrescriptions(list);
      await loadAllReviewData();
    }
  };

  const handleUpdateCalculator = async (updated: any) => {
    await saveCalculatorReviewAndSync(updated.id, updated);
    await loadAllReviewData();
  };

  const recalculateReviewDatesForCategory = async (type: 'disease' | 'protocol' | 'medication' | 'calculator' | 'prescription', newInterval: number) => {
    if (type === 'disease') {
      const list = await getAllDiseases(true);
      let count = 0;
      for (const item of list) {
        if (item.customReviewIntervalMonths === undefined || item.customReviewIntervalMonths === null) {
          const lastReviewed = item.lastReviewedAt || item.updatedAt || item.createdAt || new Date().toISOString();
          const nextReview = addMonthsToDateString(lastReviewed, newInterval);
          const nextStatus = computeReviewStatus(nextReview, item.reviewStatus);
          const updated = {
            ...item,
            nextReviewAt: nextReview,
            reviewStatus: nextStatus,
            updatedAt: new Date().toISOString()
          };
          await addCustomDisease(updated);
          count++;
        }
      }
      console.log(`Recalculated ${count} diseases`);
    } else if (type === 'protocol') {
      const list = getProtocols();
      let count = 0;
      const updatedList = list.map(item => {
        if (item.customReviewIntervalMonths === undefined || item.customReviewIntervalMonths === null) {
          const lastReviewed = item.lastReviewedAt || item.updatedAt || item.createdAt || new Date().toISOString();
          const nextReview = addMonthsToDateString(lastReviewed, newInterval);
          const nextStatus = computeReviewStatus(nextReview, item.reviewStatus);
          count++;
          return {
            ...item,
            nextReviewAt: nextReview,
            reviewStatus: nextStatus,
            updatedAt: new Date().toISOString()
          };
        }
        return item;
      });
      await saveProtocols(updatedList);
      console.log(`Recalculated ${count} protocols`);
    } else if (type === 'medication') {
      const list = getMedications();
      let count = 0;
      const updatedList = list.map(item => {
        if (item.customReviewIntervalMonths === undefined || item.customReviewIntervalMonths === null) {
          const lastReviewed = item.lastReviewedAt || item.updatedAt || item.createdAt || new Date().toISOString();
          const nextReview = addMonthsToDateString(lastReviewed, newInterval);
          const nextStatus = computeReviewStatus(nextReview, item.reviewStatus);
          count++;
          return {
            ...item,
            nextReviewAt: nextReview,
            reviewStatus: nextStatus,
            updatedAt: new Date().toISOString()
          };
        }
        return item;
      });
      await saveMedications(updatedList);
      console.log(`Recalculated ${count} medications`);
    } else if (type === 'prescription') {
      const list = getPrescriptions();
      let count = 0;
      const updatedList = list.map(item => {
        if (item.customReviewIntervalMonths === undefined || item.customReviewIntervalMonths === null) {
          const lastReviewed = item.lastReviewedAt || item.updatedAt || item.createdAt || new Date().toISOString();
          const nextReview = addMonthsToDateString(lastReviewed, newInterval);
          const nextStatus = computeReviewStatus(nextReview, item.reviewStatus);
          count++;
          return {
            ...item,
            nextReviewAt: nextReview,
            reviewStatus: nextStatus,
            updatedAt: new Date().toISOString()
          };
        }
        return item;
      });
      await savePrescriptions(updatedList);
      console.log(`Recalculated ${count} prescriptions`);
    } else if (type === 'calculator') {
      const list = getCalculators();
      let count = 0;
      for (const item of list) {
        if (item.customReviewIntervalMonths === undefined || item.customReviewIntervalMonths === null) {
          const lastReviewed = item.lastReviewedAt || item.updatedAt || item.createdAt || new Date().toISOString();
          const nextReview = addMonthsToDateString(lastReviewed, newInterval);
          const nextStatus = computeReviewStatus(nextReview, item.reviewStatus);
          const updated = {
            ...item,
            nextReviewAt: nextReview,
            reviewStatus: nextStatus,
            updatedAt: new Date().toISOString()
          };
          await saveCalculatorReviewAndSync(item.id, updated);
          count++;
        }
      }
      console.log(`Recalculated ${count} calculators`);
    }
  };

  const handleSaveSettings = async () => {
    const currentSettings = await getGlobalReviewSettings();
    const categoriesToRecalculate: ('disease' | 'protocol' | 'medication' | 'calculator' | 'prescription')[] = [];

    if (currentSettings.protocol !== globalSettings.protocol) categoriesToRecalculate.push('protocol');
    if (currentSettings.disease !== globalSettings.disease) categoriesToRecalculate.push('disease');
    if (currentSettings.medication !== globalSettings.medication) categoriesToRecalculate.push('medication');
    if (currentSettings.calculator !== globalSettings.calculator) categoriesToRecalculate.push('calculator');
    if (currentSettings.prescription !== globalSettings.prescription) categoriesToRecalculate.push('prescription');

    await saveGlobalReviewSettings(globalSettings);

    if (categoriesToRecalculate.length > 0) {
      const confirmed = await requestConfirm({
        title: 'Recalcular Prazos?',
        message: `As diretrizes de periodicidade de revisão de [${categoriesToRecalculate.map(c => c === 'disease' ? 'Doenças' : c === 'protocol' ? 'Protocolos' : c === 'medication' ? 'Medicamentos' : c === 'calculator' ? 'Calculadoras' : 'Prescrições').join(', ')}] foram alteradas. Deseja atualizar o prazo (Próxima Revisão) de TODOS os itens existentes destas categorias que usam o padrão da categoria?`,
        variant: 'default'
      });

      if (confirmed) {
        setLoadingReviews(true);
        try {
          for (const category of categoriesToRecalculate) {
            await recalculateReviewDatesForCategory(category, globalSettings[category]);
          }
          await loadAllReviewData();
          showAlert({
            title: 'Sucesso',
            message: 'O prazo de vigência foi recalculado com sucesso para os registros sem intervalo customizado.',
            type: 'success'
          });
        } catch (error) {
          console.error("Erro ao recalcular:", error);
          showAlert({
            title: 'Erro',
            message: 'Ocorreu um erro ao recalcular os registros de revisão.',
            type: 'error'
          });
        } finally {
          setLoadingReviews(false);
        }
      } else {
        showAlert({
          title: 'Configurações Salvas',
          message: 'As diretrizes globais foram guardadas com sucesso, mas os prazos antigos existentes não sofreram alterações.',
          type: 'success'
        });
      }
    } else {
      showAlert({
        title: 'Salvo com Sucesso',
        message: 'Configurações de periodicidade coletiva salvas com sucesso.',
        type: 'success'
      });
    }
  };

  return (
    <div className="px-4 sm:px-0 max-w-7xl mx-auto">
      {/* Title */}
      <div className="mb-6 text-left">
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
          Painel de Administração Geral
        </h1>
        <p className="text-sm text-slate-500">
          Gerenciamento de acesso dos médicos, privilégios de especialidades e filas de validade científica de conteúdos clínicos.
        </p>
      </div>

      {/* Tabs controllers */}
      <div className="flex border-b border-gray-200 mb-6 dark:border-slate-800">
        {canManageUsers && (
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-semibold text-sm transition-all focus:outline-none ${
              activeTab === 'users'
                ? 'border-medical-600 text-medical-600 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="h-4 w-4" />
            Gestão de Usuários
          </button>
        )}
        
        {canManagePermissions && (
          <button
            onClick={() => setActiveTab('permissions')}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-semibold text-sm transition-all focus:outline-none ${
              activeTab === 'permissions'
                ? 'border-medical-600 text-medical-600 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Shield className="h-4 w-4" />
            Gestão de Permissões
          </button>
        )}

        {canManageReviews && (
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-semibold text-sm transition-all focus:outline-none ${
              activeTab === 'reviews'
                ? 'border-medical-600 text-medical-600 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Clipboard className="h-4 w-4" />
            Central de Revisões Médicas
          </button>
        )}

        {canManageReviews && (
          <button
            onClick={() => setActiveTab('review_settings')}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-semibold text-sm transition-all focus:outline-none ${
              activeTab === 'review_settings'
                ? 'border-medical-600 text-medical-600 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Settings className="h-4 w-4" />
            Configurações de Revisão
          </button>
        )}
      </div>

      {/* Tab components display switcher */}
      {activeTab === 'users' && canManageUsers && (
        <div className="space-y-6">
          {/* Filters shelf */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col md:flex-row items-center gap-4 dark:bg-slate-900 dark:border-slate-800">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar por nome ou e-mail de médico..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              >
                <option value="all">Filtrar por Perfil</option>
                {availableRoles.map(role => (
                  <option key={role} value={role}>{getRoleDisplayName(role)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800 text-left">
            {loading ? (
              <div className="p-12 text-center text-gray-500">Carregando usuários cadastrados...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
                  <thead className="bg-gray-50 dark:bg-slate-800/40">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Médico / Correio Eletrônico
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        CRM / Especialidade
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Nível de Acesso Atual
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Ações de Modificação
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-900 dark:divide-slate-800">
                    {filteredUsers.map((u) => {
                      const isSuper = ['arthur.fazolo@gmail.com', 'medassist.sup@gmail.com'].includes(u.email.toLowerCase());
                      return (
                        <tr key={u.id} className="hover:bg-slate-50/50 transition-colors dark:hover:bg-slate-800/30">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-medical-50 border border-medical-200 text-medical-700 rounded-xl flex items-center justify-center font-bold dark:bg-slate-800 dark:border-slate-700 dark:text-medical-400 shadow-sm uppercase">
                                {u.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                                  {u.name}
                                  {isSuper && <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-md font-bold dark:bg-purple-950/50 dark:text-purple-300">Super</span>}
                                </div>
                                <div className="text-xs text-gray-400 font-medium">{u.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                              CRM: {u.crm || 'Não preenchido'}
                            </div>
                            <div className="text-xs text-gray-400">
                              Especialidade: {u.specialty || 'Não informado'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getRoleBadge(u.role)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {isSuper ? (
                              <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100 font-semibold dark:bg-slate-800 dark:border-amber-900/25 dark:text-amber-400">
                                <Lock className="h-3.5 w-3.5" />
                                Nível Bloqueado
                              </div>
                            ) : (
                              <select
                                value={u.role || 'user'}
                                onChange={(e) => handleRoleChange(u.id, u.email, e.target.value as UserRole)}
                                className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 rounded-xl dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                              >
                                {availableRoles.map(role => (
                                  <option key={role} value={role}>{getRoleDisplayName(role)}</option>
                                ))}
                              </select>
                            )}
                          </td>
                        </tr>
                      );
                    })}

                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-12 text-center text-gray-500">
                          Nenhum médico encontrado com as especificações atuais.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'permissions' && canManagePermissions && (
        <AdminPermissions />
      )}

      {activeTab === 'reviews' && canManageReviews && (
        <div className="space-y-6">
          {/* Static Alerts Section */}
          {expirationAlerts.length > 0 && (
            <div className="bg-red-50/45 rounded-3xl border border-red-200 p-5 text-left dark:bg-red-950/10 dark:border-red-950/30">
              <h3 className="text-sm font-bold text-red-800 flex items-center gap-2 mb-3 dark:text-red-400">
                <AlertCircle className="h-4.5 w-4.5" />
                Alertas Clínicos de Expiração e Desatualização ({expirationAlerts.length} itens necessitando atenção)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {expirationAlerts.map(alert => {
                  const isOverdue = alert.status === 'overdue';
                  const isCrit = alert.days <= 30;
                  return (
                    <div key={`${alert.type}-${alert.id}`} className={`p-3 rounded-2xl border text-xs flex flex-col justify-between shadow-xs ${
                      isOverdue 
                        ? 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950/20' 
                        : (isCrit ? 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/20' : 'bg-slate-50 border-slate-200 text-slate-705 dark:bg-slate-850 dark:border-slate-800')
                    }`}>
                      <div className="flex justify-between items-start gap-1">
                        <span className="font-extrabold text-xs">{alert.name}</span>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0">{alert.type}</span>
                      </div>
                      <div className="mt-2 text-[11px] font-bold">
                        {isOverdue 
                          ? `CRÍTICO: Expirado há ${Math.abs(alert.days)} dias` 
                          : (alert.days <= 0 ? 'STATUS: Expira hoje' : `Revisão necessária em ${alert.days} dias`)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sub-tabs content buttons switcher segment */}
          <div className="bg-slate-50 p-1.5 rounded-2xl border border-slate-200 flex flex-wrap gap-1 mb-6 dark:bg-slate-800/40 dark:border-slate-800">
            <button
              onClick={() => setSelectedReviewSubTab('disease')}
              className={`px-4 py-2 font-bold text-xs rounded-xl transition-all ${
                selectedReviewSubTab === 'disease'
                  ? 'bg-white text-slate-800 shadow-sm dark:bg-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Doenças ({diseasesList.length})
            </button>
            <button
              onClick={() => setSelectedReviewSubTab('protocol')}
              className={`px-4 py-2 font-bold text-xs rounded-xl transition-all ${
                selectedReviewSubTab === 'protocol'
                  ? 'bg-white text-slate-800 shadow-sm dark:bg-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-750'
              }`}
            >
              Protocolos ({protocolsList.length})
            </button>
            <button
              onClick={() => setSelectedReviewSubTab('medication')}
              className={`px-4 py-2 font-bold text-xs rounded-xl transition-all ${
                selectedReviewSubTab === 'medication'
                  ? 'bg-white text-slate-800 shadow-sm dark:bg-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-755'
              }`}
            >
              Medicamentos ({medicationsList.length})
            </button>
            <button
              onClick={() => setSelectedReviewSubTab('calculator')}
              className={`px-4 py-2 font-bold text-xs rounded-xl transition-all ${
                selectedReviewSubTab === 'calculator'
                  ? 'bg-white text-slate-800 shadow-sm dark:bg-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-755'
              }`}
            >
              Calculadoras ({calculatorsList.length})
            </button>
            <button
              onClick={() => setSelectedReviewSubTab('prescription')}
              className={`px-4 py-2 font-bold text-xs rounded-xl transition-all ${
                selectedReviewSubTab === 'prescription'
                  ? 'bg-white text-slate-800 shadow-sm dark:bg-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-750'
              }`}
            >
              Modelos de Prescrição ({prescriptionsList.length})
            </button>
          </div>

          {loadingReviews ? (
            <div className="p-12 text-center text-slate-500 text-sm">Carregando filas e estatísticas de revisões...</div>
          ) : (
            <>
              {selectedReviewSubTab === 'disease' && (
                <ModuleReviewQueue
                  type="disease"
                  items={diseasesList}
                  onUpdateItem={handleUpdateDisease}
                  currentUser={currentUser}
                />
              )}
              {selectedReviewSubTab === 'protocol' && (
                <ModuleReviewQueue
                  type="protocol"
                  items={protocolsList}
                  onUpdateItem={handleUpdateProtocol}
                  currentUser={currentUser}
                />
              )}
              {selectedReviewSubTab === 'medication' && (
                <ModuleReviewQueue
                  type="medication"
                  items={medicationsList}
                  onUpdateItem={handleUpdateMedication}
                  currentUser={currentUser}
                />
              )}
              {selectedReviewSubTab === 'calculator' && (
                <ModuleReviewQueue
                  type="calculator"
                  items={calculatorsList}
                  onUpdateItem={handleUpdateCalculator}
                  currentUser={currentUser}
                />
              )}
              {selectedReviewSubTab === 'prescription' && (
                <ModuleReviewQueue
                  type="prescription"
                  items={prescriptionsList}
                  onUpdateItem={handleUpdatePrescription}
                  currentUser={currentUser}
                />
              )}
            </>
          )}
        </div>
      )}

      {activeTab === 'review_settings' && canManageReviews && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200 dark:bg-slate-900 dark:border-slate-800 space-y-6 text-left">
          <div className="border-b border-gray-150 pb-4 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-850 dark:text-white flex items-center gap-2">
              <Settings className="h-5 w-5 text-medical-600" />
              Configurações Coletivas de Periodicidade de Revisão
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Defina os limites corporativos de validade para cada categoria de conteúdo. Esse intervalo determina de quanto em quanto tempo as fichas clínicas que não tenham prazos individualizados exigem a reavaliação de um médico administrador.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Protocolos Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between dark:bg-slate-850 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-indigo-500 tracking-wider">Protocolos</span>
                <p className="text-xs text-slate-400 mt-1">Prazos de diretrizes médicas e fluxagramas de cabeceira.</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-semibold text-slate-750 dark:text-slate-300">Tempo Limite:</span>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => setGlobalSettings(prev => ({ ...prev, protocol: Math.max(1, prev.protocol - 1) }))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold dark:bg-slate-900 dark:border-slate-700"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    className="w-14 text-center border rounded-lg py-1 text-sm font-bold bg-white text-slate-900 dark:bg-slate-900 dark:border-slate-750"
                    value={globalSettings.protocol}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 12;
                      setGlobalSettings(prev => ({ ...prev, protocol: Math.max(1, val) }));
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => setGlobalSettings(prev => ({ ...prev, protocol: prev.protocol + 1 }))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold dark:bg-slate-900 dark:border-slate-700"
                  >
                    +
                  </button>
                  <span className="text-xs font-semibold text-slate-500 font-mono">meses</span>
                </div>
              </div>
            </div>

            {/* Doenças Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between dark:bg-slate-850 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-teal-600 tracking-wider">Doenças / Patologias</span>
                <p className="text-xs text-slate-400 mt-1">Fichas técnicas das patologias do prontuário médico.</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-semibold text-slate-750 dark:text-slate-300">Tempo Limite:</span>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => setGlobalSettings(prev => ({ ...prev, disease: Math.max(1, prev.disease - 1) }))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold dark:bg-slate-900 dark:border-slate-700"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    className="w-14 text-center border rounded-lg py-1 text-sm font-bold bg-white text-slate-900 dark:bg-slate-900 dark:border-slate-755"
                    value={globalSettings.disease}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 36;
                      setGlobalSettings(prev => ({ ...prev, disease: Math.max(1, val) }));
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => setGlobalSettings(prev => ({ ...prev, disease: prev.disease + 1 }))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold dark:bg-slate-900 dark:border-slate-700"
                  >
                    +
                  </button>
                  <span className="text-xs font-semibold text-slate-500 font-mono">meses</span>
                </div>
              </div>
            </div>

            {/* Medicamentos Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between dark:bg-slate-850 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-emerald-600 tracking-wider">Medicamentos / Fármacos</span>
                <p className="text-xs text-slate-400 mt-1">Bulários, classes farmacológicas e posologias recomendadas.</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-semibold text-slate-750 dark:text-slate-300">Tempo Limite:</span>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => setGlobalSettings(prev => ({ ...prev, medication: Math.max(1, prev.medication - 1) }))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold dark:bg-slate-900 dark:border-slate-700"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    className="w-14 text-center border rounded-lg py-1 text-sm font-bold bg-white text-slate-900 dark:bg-slate-900 dark:border-slate-755"
                    value={globalSettings.medication}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 36;
                      setGlobalSettings(prev => ({ ...prev, medication: Math.max(1, val) }));
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => setGlobalSettings(prev => ({ ...prev, medication: prev.medication + 1 }))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold dark:bg-slate-900 dark:border-slate-700"
                  >
                    +
                  </button>
                  <span className="text-xs font-semibold text-slate-500 font-mono">meses</span>
                </div>
              </div>
            </div>

            {/* Calculadoras Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between dark:bg-slate-850 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-rose-500 tracking-wider">Calculadoras Dinâmicas</span>
                <p className="text-xs text-slate-400 mt-1">Escores, coeficientes de filtração e filtros preditivos.</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-semibold text-slate-750 dark:text-slate-300">Tempo Limite:</span>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => setGlobalSettings(prev => ({ ...prev, calculator: Math.max(1, prev.calculator - 1) }))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold dark:bg-slate-900 dark:border-slate-700"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    className="w-14 text-center border rounded-lg py-1 text-sm font-bold bg-white text-slate-900 dark:bg-slate-900 dark:border-slate-755"
                    value={globalSettings.calculator}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 12;
                      setGlobalSettings(prev => ({ ...prev, calculator: Math.max(1, val) }));
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => setGlobalSettings(prev => ({ ...prev, calculator: prev.calculator + 1 }))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold dark:bg-slate-900 dark:border-slate-700"
                  >
                    +
                  </button>
                  <span className="text-xs font-semibold text-slate-500 font-mono">meses</span>
                </div>
              </div>
            </div>

            {/* Prescrições Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between dark:bg-slate-850 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-indigo-600 tracking-wider">Modelos de Prescrição</span>
                <p className="text-xs text-slate-400 mt-1">Modelários e esquemas prontos de medicação.</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-semibold text-slate-750 dark:text-slate-300">Tempo Limite:</span>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => setGlobalSettings(prev => ({ ...prev, prescription: Math.max(1, prev.prescription - 1) }))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold dark:bg-slate-900 dark:border-slate-700"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    className="w-14 text-center border rounded-lg py-1 text-sm font-bold bg-white text-slate-900 dark:bg-slate-900 dark:border-slate-755"
                    value={globalSettings.prescription}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 12;
                      setGlobalSettings(prev => ({ ...prev, prescription: Math.max(1, val) }));
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => setGlobalSettings(prev => ({ ...prev, prescription: prev.prescription + 1 }))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold dark:bg-slate-900 dark:border-slate-700"
                  >
                    +
                  </button>
                  <span className="text-xs font-semibold text-slate-500 font-mono">meses</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-150 dark:border-slate-800">
            <button
              onClick={handleSaveSettings}
              className="px-6 py-2.5 bg-medical-600 hover:bg-medical-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all focus:outline-none cursor-pointer"
            >
              <CheckCircle className="h-4.5 w-4.5" />
              Salvar Diretrizes Globais
            </button>
          </div>
        </div>
      )}

      {/* Action Dialogs */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        variant={confirmVariant}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <AlertModal
        isOpen={isAlertOpen}
        title={alertTitle}
        message={alertMessage}
        type={alertType}
        onClose={handleAlertClose}
      />
    </div>
  );
};

export default AdminUsers;
