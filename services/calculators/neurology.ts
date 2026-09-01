import { CalculatorDefinition, CalculatorResult } from '../../types';

// 1. NIHSS (National Institutes of Health Stroke Scale)
export const nihss: CalculatorDefinition = {
  id: 'nihss',
  name: 'Escore NIHSS (Escala de AVC)',
  description: 'Avaliação neurológica padronizada para quantificar déficits causados por Acidente Vascular Cerebral (AVC).',
  category: 'Neurologia',
  inputs: [
    { id: 'loc', label: '1a. Nível de Consciência', type: 'select', options: [
      { label: '0 - Alerta', value: '0' },
      { label: '1 - Sonolento (desperta com leve toque ou voz)', value: '1' },
      { label: '2 - Estuporoso (necessita estímulos repetidos ou dolorosos)', value: '2' },
      { label: '3 - Comatoso / Sem resposta', value: '3' }
    ], defaultValue: '0' },
    { id: 'loc_q', label: '1b. Perguntas do LOC (Mês atual e Idade)', type: 'select', options: [
      { label: '0 - Responde corretamente a ambas as perguntas', value: '0' },
      { label: '1 - Responde corretamente a apenas uma pergunta', value: '1' },
      { label: '2 - Erra ambas as perguntas ou não coopera', value: '2' }
    ], defaultValue: '0' },
    { id: 'loc_c', label: '1c. Comandos do LOC (Fechar os olhos e abrir/fechar a mão)', type: 'select', options: [
      { label: '0 - Executa ambos os comandos corretamente', value: '0' },
      { label: '1 - Executa apenas um comando corretamente', value: '1' },
      { label: '2 - Não executa nenhum comando corretamente', value: '2' }
    ], defaultValue: '0' },
    { id: 'gaze', label: '2. Olhar Conjugado Horizontal', type: 'select', options: [
      { label: '0 - Normal', value: '0' },
      { label: '1 - Paralisia parcial do olhar conjugado (pode ser vencida)', value: '1' },
      { label: '2 - Desvio fixo ou paralisia completa do olhar horizontal', value: '2' }
    ], defaultValue: '0' },
    { id: 'visual', label: '3. Campos Visuais (Hemianopsia)', type: 'select', options: [
      { label: '0 - Sem perda visual', value: '0' },
      { label: '1 - Hemianopsia parcial (quadrantanopsia)', value: '1' },
      { label: '2 - Hemianopsia completa', value: '2' },
      { label: '3 - Cegueira bilateral / Hemianopsia bilateral', value: '3' }
    ], defaultValue: '0' },
    { id: 'facial', label: '4. Paralisia Facial', type: 'select', options: [
      { label: '0 - Movimentação simétrica normal', value: '0' },
      { label: '1 - Assimetria leve ou apagamento do sulco nasolabial', value: '1' },
      { label: '2 - Paralisia parcial (paralisia da metade inferior da face)', value: '2' },
      { label: '3 - Paralisia completa de metade da face (metade superior e inferior)', value: '3' }
    ], defaultValue: '0' },
    { id: 'motor_arm_l', label: '5a. Motor - Membro Superior Esquerdo (Manter braço estendido)', type: 'select', options: [
      { label: '0 - Sem queda (mantém por 10s)', value: '0' },
      { label: '1 - Queda leve (desce, mas não toca no leito antes de 10s)', value: '1' },
      { label: '2 - Esforço contra gravidade (desce tocando no leito, faz algum esforço)', value: '2' },
      { label: '3 - Sem esforço contra gravidade (braço cai imediatamente, apenas esboça força)', value: '3' },
      { label: '4 - Ausência de movimento', value: '4' },
      { label: '9 - Membro amputado / Membro com contratura inviabilizante', value: '0' }
    ], defaultValue: '0' },
    { id: 'motor_arm_r', label: '5b. Motor - Membro Superior Direito (Manter braço estendido)', type: 'select', options: [
      { label: '0 - Sem queda (mantém por 10s)', value: '0' },
      { label: '1 - Queda leve (desce, mas não toca no leito antes de 10s)', value: '1' },
      { label: '2 - Esforço contra gravidade (desce tocando no leito, faz algum esforço)', value: '2' },
      { label: '3 - Sem esforço contra gravidade (braço cai imediatamente)', value: '3' },
      { label: '4 - Ausência de movimento', value: '4' },
      { label: '9 - Amputação / Inviabilizante', value: '0' }
    ], defaultValue: '0' },
    { id: 'motor_leg_l', label: '6a. Motor - Membro Inferior Esquerdo (Manter perna a 30° decúbito dorsal)', type: 'select', options: [
      { label: '0 - Sem queda (mantém por 5s)', value: '0' },
      { label: '1 - Queda leve (desce lentamente antes de 5s)', value: '1' },
      { label: '2 - Algum esforço contra gravidade, mas desce rápido', value: '2' },
      { label: '3 - Sem esforço contra gravidade (perna cai imediatamente)', value: '3' },
      { label: '4 - Sem movimentação', value: '4' },
      { label: '9 - Amputação / Inviabilizante', value: '0' }
    ], defaultValue: '0' },
    { id: 'motor_leg_r', label: '6b. Motor - Membro Inferior Direito (Manter perna a 30°)', type: 'select', options: [
      { label: '0 - Sem queda (mantém por 5s)', value: '0' },
      { label: '1 - Queda leve', value: '1' },
      { label: '2 - Algum esforço contra gravidade', value: '2' },
      { label: '3 - Sem esforço contra gravidade', value: '3' },
      { label: '4 - Sem movimentação', value: '4' },
      { label: '9 - Amputação / Inviabilizante', value: '0' }
    ], defaultValue: '0' },
    { id: 'ataxia', label: '7. Ataxia de Membros (Prova dedo-nariz/calcanhar-joelho)', type: 'select', options: [
      { label: '0 - Ausente (ou incapacidade de compreender/parlítico)', value: '0' },
      { label: '1 - Presente em um membro (superior ou inferior)', value: '1' },
      { label: '2 - Presente em dois ou mais membros', value: '2' }
    ], defaultValue: '0' },
    { id: 'sensory', label: '8. Sensibilidade (À picada de agulha simétrica)', type: 'select', options: [
      { label: '0 - Normal', value: '0' },
      { label: '1 - Perda sensitiva leve a moderada (diminuição da dor mas sente o toque)', value: '1' },
      { label: '2 - Anestesia total / Grave perda sensitiva unilateral', value: '2' }
    ], defaultValue: '0' },
    { id: 'language', label: '9. Melhor Linguagem (Nomear itens, descrever figura)', type: 'select', options: [
      { label: '0 - Normal / Sem afasia', value: '0' },
      { label: '1 - Afasia leve a moderada (perda menor de fluência ou compreensão)', value: '1' },
      { label: '2 - Afasia grave (comunicação reduzida a balbucios ou gestos)', value: '2' },
      { label: '3 - Muda / Afasia global / Sem cooperação útil', value: '3' }
    ], defaultValue: '0' },
    { id: 'dysarthria', label: '10. Disartria (Leitura de palavras da lista)', type: 'select', options: [
      { label: '0 - Normal / Sem fala arrastada', value: '0' },
      { label: '1 - Disartria leve a moderada (fala arrastada mas inteligível)', value: '1' },
      { label: '2 - Disartria grave (ininteligível, anartria) ou mudo/intubado', value: '2' }
    ], defaultValue: '0' },
    { id: 'extinction', label: '11. Extinção e Inatenção (Negligência sensorial)', type: 'select', options: [
      { label: '0 - Sem negligência / Normal', value: '0' },
      { label: '1 - Inatenção parcial (extinção táctil, visual ou auditiva apenas unilateral)', value: '1' },
      { label: '2 - Negligência espacial/corporal profunda unilateral', value: '2' }
    ], defaultValue: '0' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    let score = 0;
    
    // Sum up fields
    const keys = [
      'loc', 'loc_q', 'loc_c', 'gaze', 'visual', 'facial', 
      'motor_arm_l', 'motor_arm_r', 'motor_leg_l', 'motor_leg_r', 
      'ataxia', 'sensory', 'language', 'dysarthria', 'extinction'
    ];

    keys.forEach(k => {
      const v = parseInt(values[k] || '0', 10);
      score += v;
    });

    let interpret = '';
    let recommendation = '';
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

    if (score === 0) {
      interpret = 'Escore 0: Sem sintomas de AVC';
      recommendation = 'Investigar outros diagnósticos diferenciais (ex: paresia transitória, paralisia de Bell, enxaqueca com aura).';
      severity = 'low';
    } else if (score <= 4) {
      interpret = `Escore ${score}: AVC Leve`;
      recommendation = 'Avaliar indicação de trombólise endovenosa se o déficit for funcionalmente incapacitante. Avaliar janela de 4.5h.';
      severity = 'medium';
    } else if (score <= 15) {
      interpret = `Escore ${score}: AVC Moderado`;
      recommendation = 'Forte indicação de Trombólise Química (em janela de 4.5h) se não houver contraindicação absoluta. Encaminhar para TC de Crânio imediata e acionar Código AVC. Avaliar angiotomografia para trombectomia mecânica.';
      severity = 'high';
    } else if (score <= 20) {
      interpret = `Escore ${score}: AVC Moderadamente Grave`;
      recommendation = 'Grave déficit neurológico focal. Solicitar Angio-TC imediatamente para avaliar oclusão de grande vaso (passível de trombectomia mecânica se em janela de até 24h). Monitoramento rigoroso em unidade de AVC.';
      severity = 'high';
    } else {
      interpret = `Escore ${score}: AVC Grave (Déficit Extenso)`;
      recommendation = 'Alto risco de transformação hemorrágica e hipertensão intracraniana subsequente. Cuidados em UTI neurológica. Considerar indicação de craniectomia descompressiva precoce em caso de infartos extensos de ACM (artéria cerebral média).';
      severity = 'critical';
    }

    return {
      value: score,
      unit: 'pontos',
      interpretation: interpret,
      recommendation,
      severity
    };
  }
};

// 2. Ottawa Ankle Rules (Critérios de Ottawa para Tornozelo)
export const ottawaRule: CalculatorDefinition = {
  id: 'ottawa',
  name: 'Critérios de Ottawa para Tornozelo',
  description: 'Auxilia na decisão clínica de solicitar ou não radiografia (raio-X) em caso de trauma de tornozelo ou do mediopé.',
  category: 'Ortopedia / Reumatologia',
  inputs: [
    { id: 'malleolar_pain', label: 'O paciente apresenta dor na zona do maléolo?', type: 'boolean', defaultValue: false },
    { id: 'lateral_tenderness', label: 'Dor à palpação na borda posterior ou ponta do maléolo lateral (últimos 6 cm)?', type: 'boolean', defaultValue: false },
    { id: 'medial_tenderness', label: 'Dor à palpação na borda posterior ou ponta do maléolo medial (últimos 6 cm)?', type: 'boolean', defaultValue: false },
    { id: 'midfoot_pain', label: 'O paciente apresenta dor na zona do mediopé?', type: 'boolean', defaultValue: false },
    { id: 'fifth_tenderness', label: 'Dor à palpação na base do quinto metatarso?', type: 'boolean', defaultValue: false },
    { id: 'navicular_tenderness', label: 'Dor à palpação sobre o osso navicular?', type: 'boolean', defaultValue: false },
    { id: 'weight_bearing', label: 'Incapacidade de deambular por 4 passos (suportar peso) tanto imediatamente após o trauma quanto na consulta?', type: 'boolean', defaultValue: false }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const malleolarPain = !!values.malleolar_pain;
    const latTenderness = !!values.lateral_tenderness;
    const medTenderness = !!values.medial_tenderness;
    const midfootPain = !!values.midfoot_pain;
    const fifthTenderness = !!values.fifth_tenderness;
    const navTenderness = !!values.navicular_tenderness;
    const weightBearing = !!values.weight_bearing;

    const needsAnkleXray = malleolarPain && (latTenderness || medTenderness || weightBearing);
    const needsFootXray = midfootPain && (fifthTenderness || navTenderness || weightBearing);

    let interpret = '';
    let recommendation = '';
    let severity: 'low' | 'high' = 'low';

    if (needsAnkleXray || needsFootXray) {
      severity = 'high';
      let reason = [];
      if (needsAnkleXray) reason.push('Radiografia de Tornozelo indicada');
      if (needsFootXray) reason.push('Radiografia de Pé indicada');
      
      interpret = reason.join(' E ');
      recommendation = `Indicação formal baseada nos critérios clínicos de Ottawa de alta sensibilidade (~100%). Os exames radiográficos ajudam a descartar fraturas de maléolos, quinto metatarso ou osso navicular.`;
    } else {
      severity = 'low';
      interpret = 'Nenhuma radiografia indicada (Tornozelo ou Pé)';
      recommendation = 'O paciente não possui critérios indicativos de fratura óssea relevante sob as Regras de Ottawa. Com alta sensibilidade (~99.6%), fraturas clinicamente significativas podem ser descartadas com segurança. Recomenda-se tratamento conservador de entorse de tornozelo (repouso, compressa de gelo, compressão leve, elevação).';
    }

    return {
      value: needsAnkleXray || needsFootXray ? 'Raio-X Necessário' : 'Raio-X Dispensável',
      interpretation: interpret,
      recommendation,
      severity
    };
  }
};
