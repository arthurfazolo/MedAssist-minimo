import { HipertensaoConsult } from '../data/hipertensaoData';
import { SpecialGuideConsult } from '../types/specialGuide';

/**
 * Converts HipertensaoConsult objects into generic SpecialGuideConsult objects.
 * Maps dominio -> rotulo and preserves cardiometabolic risk parameters in meta.
 */
export function toSpecialHipertensaoConsults(items: HipertensaoConsult[]): SpecialGuideConsult[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map(item => {
    const rawItem = item as any;
    
    // Map alerts to uniform format
    const alertsList = (item.alertas || []).map(al => ({
      texto: typeof al === 'string' ? al : al.texto || '',
      gravidade: typeof al === 'string' ? 'yellow' : al.gravidade || 'yellow',
    }));

    return {
      id: item.id,
      rotulo: item.dominio || rawItem.rotulo || '', // Maps dominio -> rotulo
      subtitulo: item.subtitulo || '',
      anamnese: item.anamnese || [],
      triagens: (item.triagens || []).map((tr: any) => {
        if (typeof tr === 'string') {
          return { texto: tr, categoria: 'Geral' };
        }
        return {
          texto: tr.texto || '',
          categoria: tr.categoria || 'Geral',
        };
      }),
      vacinas: item.vacinas || [],
      alertas: alertsList,
      orientacoes: item.orientacoes || [],
      proxima: item.proxima || '',
      meta: {
        ...(rawItem.meta || {}),
        pasVal: rawItem.pasVal,
        padVal: rawItem.padVal,
        saltGrams: rawItem.saltGrams,
        riskAge: rawItem.riskAge,
        riskTabaco: rawItem.riskTabaco,
        riskDiabetes: rawItem.riskDiabetes,
        riskCholesterol: rawItem.riskCholesterol,
        riskFamily: rawItem.riskFamily,
        riskLOA: rawItem.riskLOA,
        riskDCV: rawItem.riskDCV,
      },
    };
  });
}
