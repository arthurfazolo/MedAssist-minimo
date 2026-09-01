import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Heart, HeartPulse, BookOpen, Activity, Plus, Trash2 } from 'lucide-react';
import { PuericulturaGuide } from './PuericulturaGuide';
import { PreNatalGuide } from './PreNatalGuide';
import { GeriatriaGuide } from './GeriatriaGuide';
import { HipertensaoGuide } from './HipertensaoGuide';
import { SpecialGuideView } from './SpecialGuideView';
import { motion } from 'motion/react';
import ClinicalDisclaimer from './ClinicalDisclaimer';
import { getConsultRoutines, saveConsultRoutines } from '../services/consultRoutinesService';
import { ConsultRoutine } from '../types';
import { SpecialGuideDefinition, SpecialGuideConsult } from '../types/specialGuide';
import { adaptSpecialConsultItems } from '../utils/adaptSpecialConsultItems';
import { useAuth } from '../App';
import { useConfirmModal } from '../hooks/useModal';
import { ConfirmModal } from '../components/ui/Modal';

const SpecialSectionsHub: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [controlMode, setControlMode] = useState<'list' | 'puericultura' | 'prenatal' | 'geriatria' | 'hipertensao' | 'custom'>('list');

  const {
    isOpen: isConfirmOpen,
    title: confirmTitle,
    message: confirmMessage,
    variant: confirmVariant,
    requestConfirm,
    handleConfirm,
    handleCancel,
  } = useConfirmModal();

  const handleDeleteCustomSection = async (e: React.MouseEvent, sectionId: string, title: string) => {
    e.stopPropagation();
    if (!isAdmin) return;
    const confirmed = await requestConfirm({
      title: 'Excluir Roteiro de Consulta',
      message: `Tem certeza que deseja excluir permanentemente o roteiro de consulta "${title}"? Esta ação removerá o cronograma e não pode ser desfeita.`,
      variant: 'danger'
    });
    if (confirmed) {
      const updated = routines.filter(r => r.id !== sectionId);
      await saveConsultRoutines(updated);
      setRoutines(updated);
    }
  };
  const [selectedCustomRoutine, setSelectedCustomRoutine] = useState<ConsultRoutine | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [routines, setRoutines] = useState<ConsultRoutine[]>([]);

  // States for creating a new consult routine
  const [isCreatingSection, setIsCreatingSection] = useState(false);
  const [newSectionForm, setNewSectionForm] = useState({
    titulo: '',
    categoria: '',
    descricao: ''
  });
  const [validationError, setValidationError] = useState('');

  const handleCreateSpecialSection = async () => {
    if (!isAdmin) {
      setValidationError('Apenas administradores podem criar roteiros de consultas.');
      return;
    }

    if (!newSectionForm.titulo.trim()) {
      setValidationError('O título do roteiro de consulta é obrigatório.');
      return;
    }

    const newRoutine: ConsultRoutine = {
      id: `consult_routine_${Date.now()}`,
      titulo: newSectionForm.titulo.trim(),
      categoria: newSectionForm.categoria.trim() || 'Acompanhamento',
      descricao: newSectionForm.descricao.trim() || 'Cronograma de acompanhamento clínico estruturado.',
      status: 'completo',
      consultas: [
        {
          id: 'consulta-inicial',
          idade: 'Primeira Consulta',
          subtitulo: 'Acolhimento, investigação inicial e rastreamento básico',
          anamnese: [
            'Quais os principais sintomas ou queixas relatados pelo paciente?',
            'Há fatores desencadeantes, de risco ou agravantes identificados?',
            'Qual o histórico familiar e pessoal relevante?'
          ],
          vacinas: [],
          triagens: [
            'Avaliação detalhada dos sinais vitais e parâmetros de triagem'
          ],
          alertas: [
            {
              texto: 'Presença de sinais de gravidade específicos ou red flags',
              gravidade: 'red',
              conduta: 'Encaminhamento imediato para avaliação em regime de urgência/emergência.'
            }
          ],
          orientacoes: [
            'Explicar tratamento proposto, riscos de piora e sinais de alerta',
            'Agendar retorno ou seguimento conforme evolução clínica.'
          ],
          proxima: 'Sob critério clínico.'
        }
      ]
    };

    const updatedRoutines = [...routines, newRoutine];
    await saveConsultRoutines(updatedRoutines);

    // Automatically select the newly created routine and open it
    setSelectedCustomRoutine(newRoutine);
    setControlMode('custom');
    
    // Reset form and close modal
    setIsCreatingSection(false);
    setNewSectionForm({ titulo: '', categoria: '', descricao: '' });
    setValidationError('');
  };

  // Fetch consult routines and listen to real-time updates
  useEffect(() => {
    const fetchRoutines = () => {
      const all = getConsultRoutines();
      setRoutines(all);
    };

    fetchRoutines();

    // Event listener for real-time consult routines synchronization
    window.addEventListener('medassist:consult-routines-updated', fetchRoutines);
    return () => {
      window.removeEventListener('medassist:consult-routines-updated', fetchRoutines);
    };
  }, []);

  // If we open a custom consult routine
  if (controlMode === 'custom' && selectedCustomRoutine) {
    const routine = selectedCustomRoutine;
    
    // Construct the SpecialGuideDefinition for the active routine
    const customDefinition: SpecialGuideDefinition = {
      key: routine.id,
      titulo: routine.titulo,
      itemLabel: 'Consulta',
      corTema: routine.categoria === 'Urgência / Pronto Socorro' ? 'rose' :
                routine.categoria === 'Ambulatório' ? 'emerald' : 'indigo',
      initialConsults: adaptSpecialConsultItems(routine.consultas || []),
      onSave: async (updatedConsults: SpecialGuideConsult[]) => {
        const mappedConsults = updatedConsults.map(c => ({
          id: c.id,
          idade: c.rotulo,
          subtitulo: c.subtitulo,
          anamnese: c.anamnese,
          vacinas: c.vacinas,
          triagens: (c.triagens || []).map(t => t.texto),
          alertas: c.alertas,
          orientacoes: c.orientacoes,
          proxima: c.proxima,
          desenvolvimento: []
        }));

        const latestAll = getConsultRoutines();
        const updatedAll = latestAll.map(r => {
          if (r.id === routine.id) {
            return {
              ...r,
              consultas: mappedConsults
            };
          }
          return r;
        });

        await saveConsultRoutines(updatedAll);
      }
    };

    return (
      <SpecialGuideView 
        definition={customDefinition} 
        onBack={() => {
          setControlMode('list');
          setSelectedCustomRoutine(null);
        }} 
      />
    );
  }

  if (controlMode === 'puericultura') {
    return <PuericulturaGuide onBack={() => setControlMode('list')} />;
  }

  if (controlMode === 'prenatal') {
    return <PreNatalGuide onBack={() => setControlMode('list')} />;
  }

  if (controlMode === 'geriatria') {
    return <GeriatriaGuide onBack={() => setControlMode('list')} />;
  }

  if (controlMode === 'hipertensao') {
    return <HipertensaoGuide onBack={() => setControlMode('list')} />;
  }

  // Native cards filters
  const showPuericultura = searchTerm === '' || 
    'puericultura'.includes(searchTerm.toLowerCase()) || 
    'pediatria'.includes(searchTerm.toLowerCase()) || 
    'marcos'.includes(searchTerm.toLowerCase()) || 
    'criança'.includes(searchTerm.toLowerCase());

  const showPrenatal = searchTerm === '' || 
    'prenatal'.includes(searchTerm.toLowerCase()) || 
    'pré-natal'.includes(searchTerm.toLowerCase()) || 
    'gestante'.includes(searchTerm.toLowerCase()) || 
    'dpp'.includes(searchTerm.toLowerCase()) || 
    'dum'.includes(searchTerm.toLowerCase());

  const showGeriatria = searchTerm === '' || 
    'geriatria'.includes(searchTerm.toLowerCase()) || 
    'idoso'.includes(searchTerm.toLowerCase()) || 
    'acompanhamento'.includes(searchTerm.toLowerCase()) || 
    'escala'.includes(searchTerm.toLowerCase()) || 
    'katz'.includes(searchTerm.toLowerCase()) || 
    'lawton'.includes(searchTerm.toLowerCase());

  const showHipertensao = searchTerm === '' || 
    'hipertensao'.includes(searchTerm.toLowerCase()) || 
    'has'.includes(searchTerm.toLowerCase()) || 
    'pressao'.includes(searchTerm.toLowerCase()) || 
    'cardiovascular'.includes(searchTerm.toLowerCase()) || 
    'sbc'.includes(searchTerm.toLowerCase()) || 
    'coracao'.includes(searchTerm.toLowerCase());

  // Filter custom consult routines based on search term
  const filteredCustomRoutines = routines.filter(r => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      r.titulo.toLowerCase().includes(q) ||
      r.descricao.toLowerCase().includes(q) ||
      (r.categoria && r.categoria.toLowerCase().includes(q))
    );
  });

  const totalVisible = 
    [showPuericultura, showPrenatal, showGeriatria, showHipertensao].filter(Boolean).length + 
    filteredCustomRoutines.length;

  return (
    <div className="px-4 py-8 sm:px-0">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 text-left">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-medical-600" />
            <h1 className="text-2xl font-bold text-medical-600 dark:text-medical-400 font-sans tracking-tight">
              Roteiros de Consultas
            </h1>
          </div>
          <p className="mt-2 text-sm text-slate-500 max-w-2xl dark:text-slate-400 leading-relaxed">
            Acompanhamento clínico estruturado e preventivo por ciclos de vida e condições crônicas de saúde.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              setValidationError('');
              setIsCreatingSection(true);
            }}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            <Plus className="h-4 w-4" />
            Novo Roteiro de Consulta
          </button>
        )}
      </div>

      {/* SEARCH BOX */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-8 flex flex-col md:flex-row gap-4 items-stretch dark:bg-slate-800 dark:border-slate-700 text-left">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            id="search-special-sections"
            type="text"
            placeholder="Buscar por roteiro de consulta, palavras-chave, escalas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-medical-600 focus:border-medical-600 outline-none text-slate-700 placeholder-slate-400 text-sm transition-all dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-medical-500 dark:focus:border-medical-500"
          />
        </div>
      </div>

      {/* SECTIONS GRID */}
      {totalVisible === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-md mx-auto shadow-sm dark:bg-slate-800 dark:border-slate-700">
          <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-2" />
          <p className="font-semibold text-slate-700 dark:text-slate-200">Nenhum roteiro encontrado</p>
          <p className="text-slate-400 text-xs mt-1 dark:text-slate-400">Refine seus critérios de busca ou digite outras palavras-chave.</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-4 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 p-2 py-1 px-3 text-sm font-semibold rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
          >
            Limpar Busca
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left" id="special-sections-grid">
          
          {/* SPECIAL PUERICULTURA MULTI-CHECKLIST CARD */}
          {showPuericultura && (
            <motion.div
              key="special-puericultura"
              id="special-card-puericultura"
              onClick={() => setControlMode('puericultura')}
              className="bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)] cursor-pointer overflow-hidden text-left flex flex-col justify-between group h-full dark:bg-slate-800 dark:border-slate-700"
            >
              <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-400" />
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    Pediatria Preventiva
                  </span>
                  <span className="bg-indigo-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                    Roteiro de Consulta
                  </span>
                </div>
                
                <h3 className="font-display text-lg font-semibold text-indigo-600 transition-colors tracking-tight flex items-center gap-1.5 dark:text-indigo-400">
                  <Heart className="h-4.5 w-4.5 text-indigo-500 fill-indigo-50" /> Acompanhamento de Puericultura
                </h3>
                
                <p className="text-xs text-slate-500 mt-2 leading-relaxed dark:text-slate-400">
                  Painel interativo horizontal estruturado por stages da 1ª semana até os 2 anos. Rastreamento de vacinação SBP, alertas, cálculo automático de IMC infantil e marcos do desenvolvimento do neurodesenvolvimento de Denver II.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center group-hover:bg-indigo-50 transition-all dark:bg-slate-900/50 dark:border-slate-800 dark:group-hover:bg-indigo-950/25">
                <span className="text-[11px] text-slate-500 font-bold uppercase group-hover:text-indigo-600 transition-colors dark:text-slate-400 dark:group-hover:text-indigo-400">
                  Acessar Linha de Checklists
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all dark:text-indigo-400" />
              </div>
            </motion.div>
          )}

          {/* SPECIAL PRENATAL MULTI-CHECKLIST CARD */}
          {showPrenatal && (
            <motion.div
              key="special-prenatal"
              id="special-card-prenatal"
              onClick={() => setControlMode('prenatal')}
              className="bg-white rounded-2xl border border-slate-100 hover:border-rose-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)] cursor-pointer overflow-hidden text-left flex flex-col justify-between group h-full dark:bg-slate-800 dark:border-slate-700"
            >
              <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-400" />
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    Obstetrícia Direcionada
                  </span>
                  <span className="bg-rose-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                    Roteiro de Consulta
                  </span>
                </div>
                
                <h3 className="font-display text-lg font-semibold text-rose-600 transition-colors tracking-tight flex items-center gap-1.5 dark:text-rose-400">
                  <Heart className="h-4.5 w-4.5 text-rose-500 fill-rose-50" /> Rotina de Pré-Natal Gestacional
                </h3>
                
                <p className="text-xs text-slate-500 mt-2 leading-relaxed dark:text-slate-400">
                  Acompanhamento gestacional com calculadora de Idade Gestacional (DUM/USG) e DPP, curva de altura uterina, alertas sonoros/visuais para PA ≥ 140/90 mmHg, calendário de vacinas e matriz obstétrica trimestral.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center group-hover:bg-rose-50 transition-all dark:bg-slate-900/50 dark:border-slate-800 dark:group-hover:bg-rose-950/25">
                <span className="text-[11px] text-slate-500 font-bold uppercase group-hover:text-rose-600 transition-colors dark:text-slate-400 dark:group-hover:text-rose-400">
                  Acessar Painel Gestante
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all dark:text-rose-400" />
              </div>
            </motion.div>
          )}

          {/* SPECIAL GERIATRIA MULTI-CHECKLIST CARD */}
          {showGeriatria && (
            <motion.div
              key="special-geriatria"
              id="special-card-geriatria"
              onClick={() => setControlMode('geriatria')}
              className="bg-white rounded-2xl border border-slate-100 hover:border-violet-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)] cursor-pointer overflow-hidden text-left flex flex-col justify-between group h-full dark:bg-slate-800 dark:border-slate-700"
            >
              <div className="h-1 bg-gradient-to-r from-violet-500 to-indigo-400" />
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    Saúde do Idoso
                  </span>
                  <span className="bg-violet-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                    Roteiro de Consulta
                  </span>
                </div>
                
                <h3 className="font-display text-lg font-semibold text-violet-600 transition-colors tracking-tight flex items-center gap-1.5 dark:text-violet-400">
                  <Heart className="h-4.5 w-4.5 text-violet-500 fill-violet-50" /> Acompanhamento de Geriatria
                </h3>
                
                <p className="text-xs text-slate-500 mt-2 leading-relaxed dark:text-slate-400">
                  Avaliação Geriátrica Ampla (AGA) interativa com calculadoras do Índice de Katz (AVDs Básicas) e Escala de Lawton (AVDs Instrumentais). Rastreamento cognitivo (MEEM, GDS-15), risco de quedas (TUG), perda muscular e vacinação preconizada pelo calendário SBIm.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center group-hover:bg-violet-50 transition-all dark:bg-slate-900/50 dark:border-slate-800 dark:group-hover:bg-violet-950/25">
                <span className="text-[11px] text-slate-500 font-bold uppercase group-hover:text-violet-600 transition-colors dark:text-slate-400 dark:group-hover:text-violet-400">
                  Acessar Linha de Checklists
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all dark:text-violet-400" />
              </div>
            </motion.div>
          )}

          {/* SPECIAL HIPERTENSAO MULTI-CHECKLIST CARD */}
          {showHipertensao && (
            <motion.div
              key="special-hipertensao"
              id="special-card-hipertensao"
              onClick={() => setControlMode('hipertensao')}
              className="bg-white rounded-2xl border border-slate-100 hover:border-rose-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)] cursor-pointer overflow-hidden text-left flex flex-col justify-between group h-full dark:bg-slate-800 dark:border-slate-700"
            >
              <div className="h-1 bg-gradient-to-r from-rose-500 to-red-400" />
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    Hipertensão & Cardiovigilância
                  </span>
                  <span className="bg-rose-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                    Roteiro de Consulta
                  </span>
                </div>
                
                <h2 className="font-display text-lg font-semibold text-rose-600 transition-colors tracking-tight flex items-center gap-1.5 dark:text-rose-400">
                  <HeartPulse className="h-4.5 w-4.5 text-rose-500 fill-rose-50 animate-pulse" /> Guia de Hipertensão Arterial
                </h2>
                
                <p className="text-xs text-slate-500 mt-2 leading-relaxed dark:text-slate-400">
                  Painel interativo estruturado por domínios de acompanhamento (Diagnóstico, Risco Cardiovascular Global SBC, Estilo de Vida, Farmacoterapia e Exames Anuais). Rastreio clínico e calculadoras automáticas integradas.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center group-hover:bg-rose-50 transition-all dark:bg-slate-900/50 dark:border-slate-800 dark:group-hover:bg-rose-950/25">
                <span className="text-[11px] text-slate-500 font-bold uppercase group-hover:text-rose-650 transition-colors dark:text-slate-400 dark:group-hover:text-rose-400">
                  Acessar Linha de Checklists
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all dark:text-rose-400" />
              </div>
            </motion.div>
          )}

          {/* DYNAMIC REGISTERED SPECIAL CONSULT ROUTINE CARDS */}
          {filteredCustomRoutines.map((r, rIdx) => {
            const colors: ('rose' | 'violet' | 'indigo' | 'emerald')[] = ['indigo', 'emerald', 'violet', 'rose'];
            const corTema = r.categoria === 'Urgência / Pronto Socorro' ? 'rose' :
                            r.categoria === 'Ambulatório' ? 'emerald' : 
                            colors[rIdx % colors.length];

            const borderClass = corTema === 'rose' ? 'hover:border-rose-200' :
                                corTema === 'emerald' ? 'hover:border-emerald-200' :
                                corTema === 'violet' ? 'hover:border-violet-200' :
                                'hover:border-indigo-200';

            const bgBarClass = corTema === 'rose' ? 'bg-gradient-to-r from-rose-500 to-pink-400' :
                               corTema === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                               corTema === 'violet' ? 'bg-gradient-to-r from-violet-500 to-purple-400' :
                               'bg-gradient-to-r from-indigo-500 to-violet-400';

            const titleColorClass = corTema === 'rose' ? 'text-rose-600 dark:text-rose-400' :
                                    corTema === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                                    corTema === 'violet' ? 'text-violet-600 dark:text-violet-400' :
                                    'text-indigo-600 dark:text-indigo-400';

            const footerHoverClass = corTema === 'rose' ? 'group-hover:bg-rose-50 dark:group-hover:bg-rose-950/25' :
                                     corTema === 'emerald' ? 'group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/25' :
                                     corTema === 'violet' ? 'group-hover:bg-violet-50 dark:group-hover:bg-violet-950/25' :
                                     'group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/25';

            const footerTextHoverClass = corTema === 'rose' ? 'group-hover:text-rose-600 dark:group-hover:text-rose-400' :
                                         corTema === 'emerald' ? 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400' :
                                         corTema === 'violet' ? 'group-hover:text-violet-600 dark:group-hover:text-violet-400' :
                                         'group-hover:text-indigo-600 dark:group-hover:text-indigo-400';

            return (
              <motion.div
                key={r.id}
                onClick={() => {
                  setSelectedCustomRoutine(r);
                  setControlMode('custom');
                }}
                className={`bg-white rounded-2xl border border-slate-100 ${borderClass} hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)] cursor-pointer overflow-hidden text-left flex flex-col justify-between group h-full dark:bg-slate-800 dark:border-slate-700`}
              >
                <div className={`h-1 ${bgBarClass}`} />
                <div className="p-5 flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 truncate max-w-[140px]">
                      {r.categoria || 'Geral'}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="bg-indigo-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                        Roteiro de Consulta
                      </span>
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={(e) => handleDeleteCustomSection(e, r.id, r.titulo)}
                          className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition cursor-pointer"
                          title="Excluir Roteiro de Consulta"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <h3 className={`font-display text-lg font-semibold ${titleColorClass} transition-colors tracking-tight flex items-center gap-1.5`}>
                    <Activity className="h-4.5 w-4.5" /> {r.titulo}
                  </h3>
                  
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed dark:text-slate-400">
                    {r.descricao || 'Nenhuma descrição detalhada fornecida para este roteiro de consulta.'}
                  </p>
                </div>

                <div className={`p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center ${footerHoverClass} transition-all dark:bg-slate-900/50 dark:border-slate-800`}>
                  <span className={`text-[11px] text-slate-500 font-bold uppercase ${footerTextHoverClass} transition-colors`}>
                    Acessar Linha de Checklists
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.div>
            );
          })}

        </div>
      )}

      <ClinicalDisclaimer type="guide" />

      {/* MODAL PARA CRIAÇÃO DE NOVO ROTEIRO DE CONSULTA */}
      {isCreatingSection && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-left space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="h-5 w-5 text-indigo-500" />
              Novo Roteiro de Consulta
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Crie um novo roteiro de consulta com cronograma de acompanhamento personalizado. Um roteiro inicial com a primeira consulta será estruturado automaticamente para você.
            </p>
            
            {validationError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-semibold dark:bg-rose-950/20 dark:border-rose-900/50 dark:text-rose-400">
                {validationError}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500">Título / Nome do Roteiro (Obrigatório)*</label>
                <input
                  type="text"
                  placeholder="Ex: Acompanhamento de Diabetes, Gestação de Alto Risco"
                  value={newSectionForm.titulo}
                  onChange={e => {
                    setValidationError('');
                    setNewSectionForm({ ...newSectionForm, titulo: e.target.value });
                  }}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-950 dark:border-slate-800 text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500">Categoria (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: Endocrinologia, Cardiologia, Geral"
                  value={newSectionForm.categoria}
                  onChange={e => setNewSectionForm({ ...newSectionForm, categoria: e.target.value })}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-950 dark:border-slate-800 text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500">Descrição (Opcional)</label>
                <textarea
                  placeholder="Ex: Acompanhamento clínico estruturado e preventivo para otimização do controle glicêmico..."
                  value={newSectionForm.descricao}
                  onChange={e => setNewSectionForm({ ...newSectionForm, descricao: e.target.value })}
                  rows={3}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-950 dark:border-slate-800 text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => {
                  setIsCreatingSection(false);
                  setNewSectionForm({ titulo: '', categoria: '', descricao: '' });
                  setValidationError('');
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateSpecialSection}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-750 text-white font-extrabold text-xs rounded-xl shadow transition cursor-pointer dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Criar Roteiro
              </button>
            </div>
          </div>
        </div>
      )}

      <ClinicalDisclaimer type="guide" />

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

export default SpecialSectionsHub;
