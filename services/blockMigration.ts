import { SpecialConsultItem, UniversalBlock } from '../types';

/**
 * Migrates an old system-style SpecialConsultItem to use the new universal blocks-based structure.
 * This guarantees 100% backward compatibility and seamless data conversion.
 */
export function migrateConsultItemToBlocks(consult: any): UniversalBlock[] {
  if (consult.blocos && consult.blocos.length > 0) {
    return consult.blocos;
  }

  const blocos: UniversalBlock[] = [];

  // Mapeamento: Tópico atual -> Bloco de Texto / Checklist

  // Subtítulo / Meta as a Text Block
  if (consult.subtitulo) {
    blocos.push({
      id: `migrated_subtitulo_${Math.random().toString(36).substring(2, 9)}`,
      tipo: 'texto',
      titulo: 'Meta e Subtítulo da Consulta',
      conteudo: consult.subtitulo
    });
  }

  // Anamnese -> Checklist
  if (consult.anamnese && consult.anamnese.length > 0) {
    blocos.push({
      id: `migrated_anamnese_${Math.random().toString(36).substring(2, 9)}`,
      tipo: 'checklist',
      titulo: consult.labels?.anamnese || 'Anamnese e Queixas Clínicas',
      itens: [...consult.anamnese]
    });
  }

  // Desenvolvimento / Marcos -> Checklist
  if (consult.desenvolvimento && consult.desenvolvimento.length > 0) {
    blocos.push({
      id: `migrated_desenvolvimento_${Math.random().toString(36).substring(2, 9)}`,
      tipo: 'checklist',
      titulo: consult.labels?.desenvolvimento || 'Exame Físico, Sinais e Marcos de Avaliação',
      itens: consult.desenvolvimento.map((d: any) => `[${d.categoria}] ${d.texto}`)
    });
  }

  // Triagens -> Checklist
  if (consult.triagens && consult.triagens.length > 0) {
    blocos.push({
      id: `migrated_triagens_${Math.random().toString(36).substring(2, 9)}`,
      tipo: 'checklist',
      titulo: consult.labels?.triagens || 'Exames & Triagens de Rotina',
      itens: consult.triagens.map((t: any) => typeof t === 'string' ? t : `[${t.categoria || 'Geral'}] ${t.texto}`)
    });
  }

  // Vacinas -> Checklist
  if (consult.vacinas && consult.vacinas.length > 0) {
    blocos.push({
      id: `migrated_vacinas_${Math.random().toString(36).substring(2, 9)}`,
      tipo: 'checklist',
      titulo: consult.labels?.vacinas || 'Profilaxia & Esquema Vacinal',
      itens: [...consult.vacinas]
    });
  }

  // Alertas -> Destaque (multi-alerts block)
  if (consult.alertas && consult.alertas.length > 0) {
    blocos.push({
      id: `migrated_alertas_${Math.random().toString(36).substring(2, 9)}`,
      tipo: 'destaque',
      titulo: 'Sinais de Alerta Críticos',
      alertas: consult.alertas.map((a: any) => ({
        texto: a.texto,
        gravidade: a.gravidade,
        conduta: a.conduta || ''
      }))
    } as any);
  }

  // Orientações -> Checklist
  if (consult.orientacoes && consult.orientacoes.length > 0) {
    blocos.push({
      id: `migrated_orientacoes_${Math.random().toString(36).substring(2, 9)}`,
      tipo: 'checklist',
      titulo: consult.labels?.orientacoes || 'Orientações Clínicas',
      itens: [...consult.orientacoes]
    });
  }

  // Próxima Recomendada -> Text Block
  if (consult.proxima) {
    blocos.push({
      id: `migrated_proxima_${Math.random().toString(36).substring(2, 9)}`,
      tipo: 'texto',
      titulo: 'Próxima Consulta Recomendada',
      conteudo: consult.proxima
    });
  }

  return blocos;
}

/**
 * Helper to migrate an array of consultations
 */
export function migrateConsultsArrayToBlocks(consults: SpecialConsultItem[]): SpecialConsultItem[] {
  if (!consults || !Array.isArray(consults)) return [];
  return consults.map(c => ({
    ...c,
    blocos: migrateConsultItemToBlocks(c)
  }));
}
