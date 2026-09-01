import { PuericulturaConsult } from '../data/checklistsData';
import { SpecialGuideConsult } from '../types/specialGuide';

/**
 * Converts legacy PuericulturaConsult data or existing generic SpecialGuideConsult data 
 * into the canonical SpecialGuideConsult format.
 * All custom and domain-specific attributes (anthropometry, milestones) are stored safely under `meta`.
 */
export function toSpecialGuideConsults(items: any[]): SpecialGuideConsult[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map(item => {
    // If it's already in the canonical SpecialGuideConsult format, return as is
    if (item.rotulo && !item.idade) {
      return item as SpecialGuideConsult;
    }

    // Otherwise, adapt from legacy PuericulturaConsult schema
    const rawItem = item as any;
    return {
      id: item.id,
      rotulo: item.idade || rawItem.rotulo || '',
      subtitulo: item.subtitulo || '',
      anamnese: item.anamnese || [],
      triagens: (item.triagens || []).map((t: any) => {
        if (typeof t === 'string') {
          return { texto: t, categoria: 'Triagem' };
        }
        return { texto: t.texto || '', categoria: t.categoria || 'Triagem' };
      }),
      vacinas: item.vacinas || [],
      alertas: (rawItem.alertas || []).map((al: any) => ({
        texto: al.texto || '',
        gravidade: al.gravidade || 'yellow',
        conduta: al.conduta || '',
      })),
      orientacoes: item.orientacoes || [],
      proxima: item.proxima || '',
      meta: {
        ...(rawItem.meta || {}),
        idadeMinimaMeses: item.idadeMinimaMeses,
        desenvolvimento: item.desenvolvimento || [],
        topicsOrder: item.topicsOrder,
        topicTitles: item.topicTitles,
        customChecklists: item.customChecklists,
        embeddedCalculators: item.embeddedCalculators,
      },
    };
  });
}
