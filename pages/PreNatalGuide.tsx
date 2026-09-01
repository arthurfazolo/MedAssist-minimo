import React from 'react';
import { SpecialGuideView } from './SpecialGuideView';
import { PreNatalWidgets } from '../guides/PreNatalWidgets';
import { toSpecialPreNatalConsults } from '../utils/adaptPreNatalConsults';
import { INITIAL_PRENATAL_CONSERTS } from '../data/checklistsData';
import { generatePreNatalFromIA } from '../services/geminiService';

export const PreNatalGuide: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const definition = {
    key: 'prenatal', // MESMA chave do Firestore
    titulo: 'Acompanhamento Pré-Natal',
    itemLabel: 'Idade Gestacional',
    corTema: 'indigo' as const,
    initialConsults: toSpecialPreNatalConsults(INITIAL_PRENATAL_CONSERTS),
    toSpecialFormat: toSpecialPreNatalConsults,
    ExtraWidgets: PreNatalWidgets,
    aiGenerate: async (rotulo: string) => {
      const response = await generatePreNatalFromIA(rotulo);
      return {
        subtitulo: response?.subtitulo || '',
        anamnese: response?.anamnese || [],
        triagens: (response?.exames || response?.triagens || []).map((ex: any) => {
          const textVal = typeof ex === 'string' ? ex : ex.texto || '';
          return { texto: textVal, categoria: 'Exame' };
        }),
        vacinas: response?.vacinas || [],
        alertas: (response?.alertas || []).map((a: any) => ({
          texto: typeof a === 'string' ? a : a.texto || '',
          gravidade: typeof a === 'string' ? 'yellow' : a.gravidade || 'yellow',
        })),
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
