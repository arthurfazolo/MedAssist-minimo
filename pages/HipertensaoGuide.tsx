import React from 'react';
import { SpecialGuideView } from './SpecialGuideView';
import { HipertensaoWidgets } from '../guides/HipertensaoWidgets';
import { toSpecialHipertensaoConsults } from '../utils/adaptHipertensaoConsults';
import { INITIAL_HIPERTENSAO_CONSULTS } from '../data/hipertensaoData';
import { generateHipertensaoFromIA } from '../services/geminiService';

export const HipertensaoGuide: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const definition = {
    key: 'hipertensao', // MESMA chave do Firestore
    titulo: 'Diretrizes de Hipertensão Arterial',
    itemLabel: 'Eixo de Abordagem',
    corTema: 'rose' as const,
    initialConsults: toSpecialHipertensaoConsults(INITIAL_HIPERTENSAO_CONSULTS),
    toSpecialFormat: toSpecialHipertensaoConsults,
    ExtraWidgets: HipertensaoWidgets,
    aiGenerate: async (rotulo: string) => {
      const response = await generateHipertensaoFromIA(rotulo);
      return {
        subtitulo: response?.subtitulo || '',
        anamnese: response?.anamnese || [],
        triagens: (response?.triagens || []).map((tr: any) => {
          const textVal = typeof tr === 'string' ? tr : tr.texto || '';
          const catVal = typeof tr === 'string' ? 'Geral' : tr.categoria || 'Geral';
          return { texto: textVal, categoria: catVal };
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
