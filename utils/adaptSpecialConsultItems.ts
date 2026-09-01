import { SpecialConsultItem } from '../types';
import { SpecialGuideConsult } from '../types/specialGuide';

export function adaptSpecialConsultItems(items: SpecialConsultItem[] | undefined): SpecialGuideConsult[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map(item => ({
    id: item.id,
    rotulo: item.idade, // mapeia idade -> rotulo
    subtitulo: item.subtitulo || '',
    anamnese: item.anamnese || [],
    triagens: (item.triagens || []).map(t => ({
      texto: t,
      categoria: 'Geral'
    })),
    vacinas: item.vacinas || [],
    alertas: (item.alertas || []).map(alerta => ({
      texto: alerta.texto || '',
      gravidade: alerta.gravidade || 'yellow',
      conduta: alerta.conduta || ''
    })),
    orientacoes: item.orientacoes || [],
    proxima: item.proxima || ''
  }));
}
