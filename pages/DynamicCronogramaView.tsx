import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Copy, AlertCircle, Plus
} from 'lucide-react';
import { ConsultRoutine, SpecialConsultItem } from '../types';
import { useAuth } from '../App';
import { generateCustomSpecialSectionFromIA } from '../services/geminiService';
import { BaseClinicalSection } from '../components/BaseClinicalSection';

interface DynamicCronogramaViewProps {
  routine: ConsultRoutine;
  onBack: () => void;
  onSave: (updated: ConsultRoutine) => void;
}

export const DynamicCronogramaView: React.FC<DynamicCronogramaViewProps> = ({ routine, onBack, onSave }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const consultas = routine.consultas || [];
  const [selectedId, setSelectedId] = useState<string>('');

  // Setup initial active consultation
  useEffect(() => {
    if (consultas.length > 0 && !selectedId) {
      setSelectedId(consultas[0].id);
    }
  }, [consultas, selectedId]);

  const activeConsult = consultas.find(c => c.id === selectedId) || consultas[0];

  // Map of ticked checkboxes for each consultation's subitems
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [copiedFeedback, setCopiedFeedback] = useState(false);

  // Helper getters safely falling back to arrays
  const getAnamnese = () => activeConsult?.anamnese || [];
  const getDesenvolvimento = () => activeConsult?.desenvolvimento || [];
  const getVacinas = () => activeConsult?.vacinas || [];
  const getTriagens = () => activeConsult?.triagens || [];
  const getOrientacoes = () => activeConsult?.orientacoes || [];

  // Evolution text summary reporter
  const generateReportText = (): string => {
    if (!activeConsult) return '';
    let text = `==================================================\n`;
    text += ` RELATÓRIO CLÍNICO DA CONSULTA PREVENTIVA\n`;
    text += ` PROGRAMA DE ACOMPANHAMENTO: ${routine.titulo.toUpperCase()}\n`;
    text += ` ETAPA / IDADE: ${activeConsult.idade.toUpperCase()}\n`;
    text += ` DATA DE EMISSÃO: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}\n`;
    text += `==================================================\n\n`;

    if (activeConsult.subtitulo) {
      text += `OBJETIVO DA ETAPA: ${activeConsult.subtitulo}\n\n`;
    }

    // Section 1: Anamnese
    if (getAnamnese().length > 0) {
      const anaDone = getAnamnese().filter((_, idx) => checkedState[`${activeConsult.id}_anamnese_${idx}`]);
      const anaPending = getAnamnese().filter((_, idx) => !checkedState[`${activeConsult.id}_anamnese_${idx}`]);

      text += `1. ${(activeConsult.labels?.anamnese || 'ANAMNESE & QUESTIONAMENTOS').toUpperCase()}:\n`;
      if (anaDone.length > 0) {
         text += ` [✓] Questionados e Confirmados Sem Queixas/Sintomatologia:\n`;
         text += anaDone.map(item => `   ✓ ${item}`).join('\n') + '\n';
      }
      if (anaPending.length > 0) {
         text += ` [ ] Não Questionado / Pendente ou com Alertas Identificados:\n`;
         text += anaPending.map(item => `   • ${item}`).join('\n') + '\n';
      }
      text += `\n`;
    }

    // Section 2: Desenvolvimento
    if (getDesenvolvimento().length > 0) {
      const devDone = getDesenvolvimento().filter((_, idx) => checkedState[`${activeConsult.id}_desenvolvimento_${idx}`]);
      const devPending = getDesenvolvimento().filter((_, idx) => !checkedState[`${activeConsult.id}_desenvolvimento_${idx}`]);

      text += `2. ${(activeConsult.labels?.desenvolvimento || 'EXAME FÍSICO & MARCOS').toUpperCase()}:\n`;
      if (devDone.length > 0) {
         text += ` [✓] Avaliados e Comprovados Dentro dos Limites de Normalidade:\n`;
         text += devDone.map(item => `   ✓ [${item.categoria}] ${item.texto}`).join('\n') + '\n';
      }
      if (devPending.length > 0) {
         text += ` [ ] Parâmetros Não Avalizados ou Com Alteração Notável:\n`;
         text += devPending.map(item => `   • [${item.categoria}] ${item.texto}`).join('\n') + '\n';
      }
      text += `\n`;
    }

    // Section 3: Vacinas
    if (getVacinas().length > 0) {
      const vacDone = getVacinas().filter((_, idx) => checkedState[`${activeConsult.id}_vacinas_${idx}`]);
      const vacPending = getVacinas().filter((_, idx) => !checkedState[`${activeConsult.id}_vacinas_${idx}`]);

      text += `3. ${(activeConsult.labels?.vacinas || 'DIRETRIZES PREVENTIVAS / VACINAS').toUpperCase()}:\n`;
      if (vacDone.length > 0) {
         text += ` [✓] Imunizações / Profilaxias em Dia ou Administradas Hoje:\n`;
         text += vacDone.map(item => `   ✓ ${item}`).join('\n') + '\n';
      }
      if (vacPending.length > 0) {
         text += ` [ ] Atraso Identificado / Prescrita Atualização Urgente:\n`;
         text += vacPending.map(item => `   • ${item}`).join('\n') + '\n';
      }
      text += `\n`;
    }

    // Section 4: Triagens
    if (getTriagens().length > 0) {
      const triDone = getTriagens().filter((_, idx) => checkedState[`${activeConsult.id}_triagens_${idx}`]);
      const triPending = getTriagens().filter((_, idx) => !checkedState[`${activeConsult.id}_triagens_${idx}`]);

      text += `4. ${(activeConsult.labels?.triagens || 'EXAMES E TRIAGENS CLÍNICAS').toUpperCase()}:\n`;
      if (triDone.length > 0) {
         text += ` [✓] Realizados e Avaliados com Regularidade:\n`;
         text += triDone.map(item => `   ✓ ${item}`).join('\n') + '\n';
      }
      if (triPending.length > 0) {
         text += ` [ ] Não Realizados / Encaminhado Pedido:\n`;
         text += triPending.map(item => `   • ${item}`).join('\n') + '\n';
      }
      text += `\n`;
    }

    // Section 5: Orientações
    if (getOrientacoes().length > 0) {
      const oriDone = getOrientacoes().filter((_, idx) => checkedState[`${activeConsult.id}_orientacoes_${idx}`]);
      text += `5. ${(activeConsult.labels?.orientacoes || 'ORIENTAÇÕES PREVENTIVAS FORNECIDAS').toUpperCase()}:\n`;
      if (oriDone.length > 0) {
         text += oriDone.map(item => `   ✓ ${item}`).join('\n') + '\n';
      } else {
         text += `   • Nenhuma diretriz preventiva específica selecionada.\n`;
      }
      text += `\n`;
    }

    // Section 6: Proxima
    if (activeConsult?.proxima) {
      text += `6. APONTAMENTO PARA PRÓXIMA ETAPA:\n`;
      text += `   → Recomenda-se agendamento em: ${activeConsult.proxima}\n\n`;
    }

    text += `--------------------------------------------------\n`;
    text += `Profissional de Saúde Responsável: _______________________\n`;
    text += `Registro Profissional (CRM/COREN): _______________________\n`;
    return text;
  };

  const copyToClipboard = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(generateReportText())
        .then(() => {
          setCopiedFeedback(true);
          setTimeout(() => setCopiedFeedback(false), 2000);
        })
        .catch(() => {});
    }
  };

  const handleCreateFirstConsult = () => {
    const firstConsult: SpecialConsultItem = {
      id: 'consult_' + Date.now().toString(36),
      idade: '1ª Consulta de Avaliação',
      subtitulo: 'Entrada no programa de acompanhamento',
      anamnese: ['Histórico clínico relevante do paciente', 'Uso atual de medicamentos e alergias'],
      triagens: ['Avaliação antropométrica geral (Peso, Estatura, IMC)'],
      vacinas: [],
      orientacoes: ['Orientações gerais sobre estilo de vida e controle de sintomas'],
      proxima: 'Em 30 dias.'
    };
    onSave({
      ...routine,
      consultas: [firstConsult]
    });
    setSelectedId(firstConsult.id);
  };

  if (consultas.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center text-slate-500 max-w-xl mx-auto space-y-4">
        <AlertCircle className="h-10 w-10 text-amber-500 mx-auto" />
        <h3 className="font-bold text-lg text-slate-800">Cronograma Sem Etapas</h3>
        <p className="text-sm text-slate-500 leading-normal">
          Este roteiro de consulta não possui nenhuma consulta configurada.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-slate-105 hover:bg-slate-200 font-bold rounded-lg text-slate-700 text-xs cursor-pointer inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar aos Roteiros
          </button>
          {isAdmin && (
            <button
              onClick={handleCreateFirstConsult}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 font-bold rounded-lg text-white text-xs cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Criar Primeira Consulta
            </button>
          )}
        </div>
      </div>
    );
  }

  // Adapter method to save changes safely to user routines DB
  const setConsultsWrapper = (newConsultsOrFn: any) => {
    const updatedConsults = typeof newConsultsOrFn === 'function' ? newConsultsOrFn(consultas) : newConsultsOrFn;
    onSave({
      ...routine,
      consultas: updatedConsults
    });
  };

  const renderReportCopyWidget = () => {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 dark:bg-slate-900/50 dark:border-slate-705 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left animate-fade-in select-none">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase text-indigo-650 leading-none">Relatório Evolutivo</span>
          <h4 className="font-extrabold text-slate-850 dark:text-slate-100 mt-0.5 text-xs">Sumário de Evolução da Consulta</h4>
          <p className="text-[10.5px] text-slate-400">Gere e copie as anotações condensadas estruturadas de todas as seções clínico-cronológicas preenchidas.</p>
        </div>
        
        <button
          type="button"
          onClick={copyToClipboard}
          className="w-full md:w-auto py-2 px-5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-extrabold cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-sm shrink-0"
        >
          <Copy className="h-4 w-4" /> {copiedFeedback ? 'Relatório Copiado!' : 'Copiar Prontuário Clínico'}
        </button>
      </div>
    );
  };

  return (
    <div className="px-1 md:px-4 max-w-7xl mx-auto space-y-6">
      <BaseClinicalSection
        title={routine.titulo}
        subtitle={routine.descricao || 'Roteiro de consulta dinâmico estruturado para acompanhamento.'}
        badge="Roteiro de Consulta"
        consults={consultas}
        setConsults={setConsultsWrapper}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        onBack={onBack}
        isAdmin={isAdmin}
        firestoreDocId={`consult_routine_${routine.id}`}
        localStorageKey={`medassist_consult_routine_${routine.id}`}
        checklistState={checkedState}
        setChecklistState={setCheckedState}
        generateFromAI={async (id, item) => generateCustomSpecialSectionFromIA(routine.titulo, item.idade)}
        renderMainBottom={renderReportCopyWidget}
      />
    </div>
  );
};
