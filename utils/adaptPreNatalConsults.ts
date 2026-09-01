import { PreNatalConsult } from '../data/checklistsData';
import { SpecialGuideConsult } from '../types/specialGuide';

/**
 * Converts PreNatalConsult database objects into generic SpecialGuideConsult objects.
 * Maps exames to triagens with category 'Exame' so they are displayed correctly,
 * and packs obstetric exam and exam matrices into meta.
 */
export function toSpecialPreNatalConsults(items: PreNatalConsult[]): SpecialGuideConsult[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map(item => {
    const rawItem = item as any;
    
    // If it is already in generic SpecialGuideConsult format, return as is
    if (rawItem.rotulo && !rawItem.ig) {
      return item as unknown as SpecialGuideConsult;
    }

    // Map exames to triagens with category 'Exame'
    const mappedExames = (item.exames || []).map(ex => ({
      texto: ex,
      categoria: 'Exame',
    }));

    return {
      id: item.id,
      rotulo: item.ig || rawItem.rotulo || '', // Maps ig -> rotulo (e.g. "12 Semanas")
      subtitulo: item.subtitulo || '',
      anamnese: item.anamnese || [],
      triagens: mappedExames, // Maps exames to triagens
      vacinas: item.vacinas || [],
      alertas: (item.alertas || []).map(al => ({
        texto: al.texto || '',
        gravidade: al.gravidade || 'yellow',
      })),
      orientacoes: item.orientacoes || [],
      proxima: item.proxima || '',
      meta: {
        ...(rawItem.meta || {}),
        semanaMax: item.semanaMax,
        examination: rawItem.examination || {},
        examStatus: rawItem.examStatus || {},
        vaccineStatus: rawItem.vaccineStatus || {},
      },
    };
  });
}
