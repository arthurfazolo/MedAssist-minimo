import React from 'react';
import { SpecialGuideView } from './SpecialGuideView';
import { PuericulturaWidgets } from '../guides/PuericulturaWidgets';
import { toSpecialGuideConsults } from '../utils/adaptPuericulturaConsults';
import { INITIAL_PUERICULTURA_CONSERTS } from '../data/checklistsData';
import { generatePuericulturaFromIA } from '../services/geminiService';

export const PuericulturaGuide: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const definition = {
    key: 'puericultura', // MESMA chave usada pela versão original
    titulo: 'Acompanhamento de Puericultura',
    itemLabel: 'Consulta',
    corTema: 'indigo',
    initialConsults: toSpecialGuideConsults(INITIAL_PUERICULTURA_CONSERTS),
    toSpecialFormat: toSpecialGuideConsults,
    ExtraWidgets: PuericulturaWidgets,
    aiGenerate: async (rotulo: string) => {
      const response = await generatePuericulturaFromIA(rotulo);
      return {
        subtitulo: response?.subtitulo || '',
        anamnese: response?.anamnese || [],
        triagens: (response?.triagens || []).map((t: string) => ({
          texto: t,
          categoria: 'Triagem',
        })),
        vacinas: response?.vacinas || [],
        alertas: [],
        orientacoes: response?.orientacoes || [],
        proxima: response?.proxima || '',
      };
    },
  };

  return (
    <SpecialGuideView
      definition={definition}
      onBack={onBack}
    />
  );
};
