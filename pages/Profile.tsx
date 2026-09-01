import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User as UserIcon, Settings, Heart, Shield, LogOut, Check, Edit2, 
  Sun, Moon, Type, Trash2, ArrowRight, Activity, Pill, BookOpen, AlertCircle
} from 'lucide-react';
import { useAuth } from '../App';
import { authService } from '../services/authService';
import { preferencesService, UserPreferences } from '../services/preferencesService';
import { getCalculators } from '../services/calculatorService';
import { getMedications } from '../services/medicationsService';
import { getProtocols } from '../services/protocolsService';
import { Medication, Protocolo, CalculatorDefinition } from '../types';
import { ConfirmModal } from '../components/ui/Modal';
import { useConfirmModal } from '../hooks/useModal';

const Profile: React.FC = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const {
    isOpen: isConfirmOpen,
    title: confirmTitle,
    message: confirmMessage,
    variant: confirmVariant,
    requestConfirm,
    handleConfirm,
    handleCancel,
  } = useConfirmModal();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // --- LOCAL STATES ---
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    specialty: user?.specialty || '',
    crm: user?.crm || '',
    institution: user?.institution || ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [prefs, setPrefs] = useState<UserPreferences>(() => preferencesService.getPreferences(user?.id));
  
  // Feedback Messages
  const [infoMsg, setInfoMsg] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' });
  const [passMsg, setPassMsg] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' });

  // Last access tracking
  const [lastAccess, setLastAccess] = useState<string>('');

  // Loaded Catalogues for Favorites Resolution
  const calculators = useMemo(() => getCalculators(), []);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [protocols, setProtocols] = useState<Protocolo[]>([]);

  // --- INITIAL LOAD ---
  useEffect(() => {
    if (user) {
      setPersonalInfo({
        name: user.name || '',
        email: user.email || '',
        specialty: user.specialty || '',
        crm: user.crm || '',
        institution: user.institution || ''
      });

      // Load last access
      const accessKey = `medassist_last_access_${user.id}`;
      let last = localStorage.getItem(accessKey);
      if (!last) {
        // Fallback or seed
        const nowStr = new Date().toLocaleString('pt-BR');
        localStorage.setItem(accessKey, nowStr);
        last = nowStr;
      }
      setLastAccess(last);

      // Load current latest user-specific preferences
      const uPrefs = preferencesService.getPreferences(user.id);
      setPrefs(uPrefs);
    }

    // Medications & Protocols from services
    setMedications(getMedications());
    setProtocols(getProtocols());
  }, [user]);

  if (!user) {
    return null;
  }

  // --- ACTIONS ---

  // Preferences Change (Theme & Font Size)
  const handleThemeChange = (theme: 'light' | 'dark') => {
    const updated = { ...prefs, theme };
    setPrefs(updated);
    preferencesService.savePreferences(updated, user.id);
  };

  const handleFontSizeChange = (fontSize: 'small' | 'medium' | 'large') => {
    const updated = { ...prefs, fontSize };
    setPrefs(updated);
    preferencesService.savePreferences(updated, user.id);
  };

  // Personal Info Save
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personalInfo.name.trim()) {
      setInfoMsg({ text: 'O nome é obrigatório.', type: 'error' });
      return;
    }

    const updated = authService.updateUserProfile(user.id, {
      name: personalInfo.name.trim(),
      specialty: personalInfo.specialty.trim(),
      crm: personalInfo.crm.trim(),
      institution: personalInfo.institution.trim()
    });

    if (updated) {
      login(updated); // Update React context
      setIsEditing(false);
      setInfoMsg({ text: 'Informações salvas com sucesso!', type: 'success' });
      setTimeout(() => setInfoMsg({ text: '', type: '' }), 4000);
    } else {
      setInfoMsg({ text: 'Erro ao salvar informações.', type: 'error' });
    }
  };

  // Safe Password Change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPassMsg({ text: 'Todos os campos de senha são obrigatórios.', type: 'error' });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPassMsg({ text: 'A nova senha e a confirmação não coincidem.', type: 'error' });
      return;
    }

    if (newPassword.length < 6) {
      setPassMsg({ text: 'A senha deve possuir pelo menos 6 caracteres.', type: 'error' });
      return;
    }

    const result = authService.changePassword(user.id, currentPassword, newPassword);
    if (result.success) {
      setPassMsg({ text: result.message, type: 'success' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setTimeout(() => setPassMsg({ text: '', type: '' }), 4000);
    } else {
      setPassMsg({ text: result.message, type: 'error' });
    }
  };

  // Remove item from favorites lists
  const handleRemoveFavorite = (type: 'calculators' | 'medications' | 'protocols', itemId: string) => {
    preferencesService.toggleFavorite(type, itemId, user.id);
    const updatedPrefs = preferencesService.getPreferences(user.id);
    setPrefs(updatedPrefs);
  };

  // --- RESOLVE FAVORITES DETAILS ---
  const favoritedCalculators = calculators.filter(c => prefs.favorites.calculators.includes(c.id));
  const favoritedMedications = medications.filter(m => prefs.favorites.medications.includes(m.id));
  const favoritedProtocols = protocols.filter(p => prefs.favorites.protocols.includes(p.id));

  const totalFavoritesCount = favoritedCalculators.length + favoritedMedications.length + favoritedProtocols.length;

  const handleLogoutWithConfirm = async () => {
    const confirmed = await requestConfirm({
      title: 'Sair da Conta',
      message: 'Tem certeza que deseja sair de sua conta?',
      variant: 'warning'
    });
    if (confirmed) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Upper header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-medical-600 tracking-tight flex items-center gap-2 dark:text-medical-400">
            <UserIcon className="h-8 w-8 text-medical-600" />
            Meu Perfil
          </h1>
          <p className="mt-1 text-gray-500 text-sm">
            Gerencie seus dados pessoais, configurações de exibição clínica e itens favoritos.
          </p>
        </div>
        <button 
          onClick={handleLogoutWithConfirm}
          className="flex items-center gap-2 text-red-600 hover:text-white hover:bg-red-600 border border-red-200 bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm"
        >
          <LogOut className="h-4 w-4" /> Sair da Conta
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Personal Info & Security */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Card 1: Informações Pessoais */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4 flex justify-between items-center">
              <h2 className="font-bold text-medical-600 flex items-center gap-2 text-lg dark:text-medical-400">
                <UserIcon className="h-5 w-5 text-gray-400" /> Informações Pessoais
              </h2>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 text-xs text-medical-600 hover:text-medical-800 font-semibold bg-white border border-gray-200 px-3 py-1.5 rounded-md hover:border-medical-300 transition-colors"
                >
                  <Edit2 className="h-3 w-3" /> Editar Informações
                </button>
              )}
            </div>

            <div className="p-6">
              {infoMsg.text && (
                <div className={`p-4 rounded-lg mb-6 text-sm flex items-center gap-2 ${
                  infoMsg.type === 'success' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'
                }`}>
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{infoMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleSaveInfo} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Nome */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Nome Completo</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-medical-500 focus:outline-none focus:ring-1 focus:ring-medical-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:select-none transition-colors"
                      value={personalInfo.name}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    />
                  </div>

                  {/* Email (Disabled: Read-only Cadastrado) */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">E-mail Cadastrado</label>
                    <input
                      type="email"
                      disabled
                      className="block w-full rounded-md border border-gray-200 px-3 py-2 text-gray-400 bg-gray-50 shadow-sm focus:outline-none cursor-not-allowed select-none"
                      value={personalInfo.email}
                    />
                    <p className="mt-1 text-xs text-gray-400">O e-mail de acesso não pode ser alterado diretamente.</p>
                  </div>

                  {/* Especialidade */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Especialidade / Área de Atuação</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      placeholder="Ex: Cardiologia, Clínica Médica"
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-medical-500 focus:outline-none focus:ring-1 focus:ring-medical-500 disabled:bg-gray-50 disabled:placeholder-gray-300 disabled:text-gray-500 transition-colors"
                      value={personalInfo.specialty}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, specialty: e.target.value })}
                    />
                  </div>

                  {/* CRM */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">CRM (Número e UF)</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      placeholder="Ex: 123456-SP"
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-medical-500 focus:outline-none focus:ring-1 focus:ring-medical-500 disabled:bg-gray-50 disabled:placeholder-gray-300 disabled:text-gray-500 transition-colors"
                      value={personalInfo.crm}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, crm: e.target.value })}
                    />
                  </div>

                  {/* Instituição */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Instituição / Hospital de Vínculo</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      placeholder="Ex: Hospital das Clínicas"
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-medical-500 focus:outline-none focus:ring-1 focus:ring-medical-500 disabled:bg-gray-50 disabled:placeholder-gray-300 disabled:text-gray-500 transition-colors"
                      value={personalInfo.institution}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, institution: e.target.value })}
                    />
                  </div>

                </div>

                {isEditing && (
                  <div className="flex gap-2 justify-end pt-4 border-t border-gray-100 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setPersonalInfo({
                          name: user.name || '',
                          email: user.email || '',
                          specialty: user.specialty || '',
                          crm: user.crm || '',
                          institution: user.institution || ''
                        });
                        setIsEditing(false);
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md text-sm font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-medical-600 hover:bg-medical-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <Check className="h-4 w-4" /> Salvar Alterações
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Card 2: Segurança */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <h2 className="font-bold text-medical-600 flex items-center gap-2 text-lg dark:text-medical-400">
                <Shield className="h-5 w-5 text-gray-400" /> Segurança e Login
              </h2>
            </div>
            
            <div className="p-6">
              {passMsg.text && (
                <div className={`p-4 rounded-lg mb-6 text-sm flex items-center gap-2 ${
                  passMsg.type === 'success' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'
                }`}>
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{passMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Alterar Senha de Acesso</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Senha Atual</label>
                    <input
                      type="password"
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-medical-500 focus:outline-none focus:ring-1 focus:ring-medical-500 text-sm"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Nova Senha</label>
                    <input
                      type="password"
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-medical-500 focus:outline-none focus:ring-1 focus:ring-medical-500 text-sm"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Confirmar Nova Senha</label>
                    <input
                      type="password"
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-medical-500 focus:outline-none focus:ring-1 focus:ring-medical-500 text-sm"
                      value={passwordForm.confirmNewPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-gray-100 mt-6">
                  <div className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-600 block sm:inline">Último acesso ao sistema:</span>{' '}
                    <span className="font-mono">{lastAccess || 'Hoje'}</span>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md text-sm font-medium transition-colors shadow-sm self-end hover:shadow duration-150"
                  >
                    Alterar Senha
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Appearance and Favorites */}
        <div className="space-y-8">
          
          {/* Card 3: Aparência / Configurações */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <h2 className="font-bold text-medical-600 flex items-center gap-2 text-lg dark:text-medical-400">
                <Settings className="h-5 w-5 text-gray-400" /> Preferências e Aparência
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              
              {/* Tema Toggle */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Modo de Exibição</label>
                <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => handleThemeChange('light')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                      prefs.theme === 'light' 
                        ? 'bg-white text-gray-900 shadow-sm font-semibold' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <Sun className={`h-4 w-4 ${prefs.theme === 'light' ? 'text-amber-500' : ''}`} />
                    Claro
                  </button>
                  <button
                    type="button"
                    onClick={() => handleThemeChange('dark')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                      prefs.theme === 'dark' 
                        ? 'bg-gray-800 text-white shadow-sm font-semibold' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <Moon className={`h-4 w-4 ${prefs.theme === 'dark' ? 'text-blue-300' : ''}`} />
                    Escuro
                  </button>
                </div>
              </div>

              {/* Tamanho da Fonte */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Tamanho da Fonte (Global)</label>
                <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => handleFontSizeChange('small')}
                    className={`py-2 rounded-md text-xs font-medium transition-all ${
                      prefs.fontSize === 'small' 
                        ? 'bg-white text-gray-900 shadow-sm font-bold border border-gray-200' 
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Pequena
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFontSizeChange('medium')}
                    className={`py-2 rounded-md text-sm font-medium transition-all ${
                      prefs.fontSize === 'medium' 
                        ? 'bg-white text-gray-900 shadow-sm font-bold border border-gray-200' 
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Média (Padrão)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFontSizeChange('large')}
                    className={`py-2 rounded-md text-base font-medium transition-all ${
                      prefs.fontSize === 'large' 
                        ? 'bg-white text-gray-900 shadow-sm font-bold border border-gray-200' 
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Grande
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-400">Excelente para melhor leitura clínica em tablets ou durante plantões dinâmicos.</p>
              </div>

            </div>
          </div>

          {/* Card 4: Favoritos do Usuário */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4 flex justify-between items-center">
              <h2 className="font-bold text-medical-600 flex items-center gap-2 text-lg dark:text-medical-400">
                <Heart className="h-5 w-5 text-red-500 fill-red-500" /> Favoritos ({totalFavoritesCount})
              </h2>
            </div>
            
            <div className="p-6 space-y-4 max-h-[460px] overflow-y-auto">
              
              {totalFavoritesCount === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  <Heart className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Nenhum item marcado como favorito ainda.</p>
                  <p className="text-xs mt-1 text-gray-400">Favoreça calculadoras, medicações e algoritmos para acesso rápido aqui.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  
                  {/* Calculadoras */}
                  {favoritedCalculators.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-medical-600 mb-2 flex items-center gap-1">
                        <Activity className="h-3.5 w-3.5" /> Calculadoras ({favoritedCalculators.length})
                      </h3>
                      <ul className="space-y-2">
                        {favoritedCalculators.map(c => (
                          <li key={c.id} className="group flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all">
                            <Link to={`/calculators?id=${c.id}`} className="text-sm font-medium text-gray-700 hover:text-medical-600 truncate max-w-[140px] flex items-center gap-1 flex-1">
                              {c.name}
                              <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 float-right text-medical-500 transition-opacity" />
                            </Link>
                            <button 
                              onClick={() => handleRemoveFavorite('calculators', c.id)}
                              className="text-gray-300 hover:text-red-500 p-1 rounded-md transition-colors"
                              title="Remover"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Medicamentos */}
                  {favoritedMedications.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 flex items-center gap-1 pt-2">
                        <Pill className="h-3.5 w-3.5" /> Medicações ({favoritedMedications.length})
                      </h3>
                      <ul className="space-y-2">
                        {favoritedMedications.map(m => (
                          <li key={m.id} className="group flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all">
                            <Link to={`/medications?id=${m.id}`} className="text-sm font-medium text-gray-700 hover:text-emerald-600 truncate max-w-[140px] flex items-center gap-1 flex-1">
                              {m.genericName}
                              <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 float-right text-emerald-500 transition-opacity" />
                            </Link>
                            <button 
                              onClick={() => handleRemoveFavorite('medications', m.id)}
                              className="text-gray-300 hover:text-red-500 p-1 rounded-md transition-colors"
                              title="Remover"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Protocolos */}
                  {favoritedProtocols.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-2 flex items-center gap-1 pt-2">
                        <BookOpen className="h-3.5 w-3.5" /> Guia Clínico ({favoritedProtocols.length})
                      </h3>
                      <ul className="space-y-2">
                        {favoritedProtocols.map(p => (
                          <li key={p.id} className="group flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all">
                            <Link to={`/guide?id=${p.id}`} className="text-sm font-medium text-gray-700 hover:text-purple-600 truncate max-w-[140px] flex items-center gap-1 flex-1">
                              {p.titulo}
                              <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 float-right text-purple-500 transition-opacity" />
                            </Link>
                            <button 
                              onClick={() => handleRemoveFavorite('protocols', p.id)}
                              className="text-gray-300 hover:text-red-500 p-1 rounded-md transition-colors"
                              title="Remover"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        variant={confirmVariant}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Profile;
