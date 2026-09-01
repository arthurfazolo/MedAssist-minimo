import { GeriatriaConsult } from '../data/checklistsData';
import { SpecialGuideConsult } from '../types/specialGuide';

/**
 * Converts the original GeriatriaConsult database schema to the generic SpecialGuideConsult schema.
 * All domain-specific fields are preserved inside `meta`.
 */
export function toSpecialGeriatriaConsults(items: GeriatriaConsult[]): SpecialGuideConsult[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map(item => {
    const rawItem = item as any;
    return {
      id: item.id,
      rotulo: item.dominio, // Maps dominio -> rotulo
      subtitulo: item.subtitulo || '',
      anamnese: item.anamnese || [],
      triagens: (item.triagens || []).map(t => ({
        texto: t.texto || '',
        categoria: t.categoria || 'Geral',
      })),
      vacinas: item.vacinas || [],
      alertas: (item.alertas || []).map(al => ({
        texto: al.texto || '',
        gravidade: al.gravidade || 'yellow',
      })),
      orientacoes: item.orientacoes || [],
      proxima: item.proxima || '',
      meta: {
        ...(rawItem.meta || {}),
        ordem: item.ordem,
        topicsOrder: item.topicsOrder,
        topicTitles: item.topicTitles,
        customChecklists: item.customChecklists,
        embeddedCalculators: item.embeddedCalculators,
      },
    };
  });
}
