import React from 'react';
import { SpecialGuideView } from './SpecialGuideView';
import { GeriatriaWidgets } from '../guides/GeriatriaWidgets';
import { toSpecialGeriatriaConsults } from '../utils/adaptGeriatriaConsults';
import { INITIAL_GERIATRIA_CONSULTS } from '../data/checklistsData';
import { generateGeriatriaFromIA } from '../services/geminiService';

export const GeriatriaGuide: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const definition = {
    key: 'geriatria', // MESMA chave usada pela versão original
    titulo: 'Acompanhamento de Geriatria',
    itemLabel: 'Domínio',
    corTema: 'violet' as const,
    initialConsults: toSpecialGeriatriaConsults(INITIAL_GERIATRIA_CONSULTS),
    toSpecialFormat: toSpecialGeriatriaConsults,
    ExtraWidgets: GeriatriaWidgets,
    aiGenerate: async (rotulo: string) => {
      const response = await generateGeriatriaFromIA(rotulo);
      return {
        subtitulo: response?.subtitulo || '',
        anamnese: response?.anamnese || [],
        triagens: (response?.triagens || []).map((t: any) => {
          const textVal = typeof t === 'string' ? t : t.texto || '';
          const catVal = typeof t === 'string' ? 'Geral' : t.categoria || 'Geral';
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
