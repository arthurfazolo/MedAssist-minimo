import { CalculatorDefinition, CalculatorResult } from '../../types';

// 1. Basal Metabolic Rate (Harris-Benedict)
export const harrisBenedict: CalculatorDefinition = {
  id: 'harris-benedict',
  name: 'Taxa Metabólica Basal (Harris-Benedict)',
  description: 'Calcula a taxa de metabolismo energético basal (TMB) e estima a necessidade calórica adaptada diária.',
  category: 'Clínica Geral / UTI',
  inputs: [
    { id: 'weight', label: 'Peso Corporal Atual (kg)', type: 'number', min: 10, max: 250, defaultValue: 70, unit: 'kg' },
    { id: 'height', label: 'Altura Corporal (cm)', type: 'number', min: 100, max: 230, defaultValue: 170, unit: 'cm' },
    { id: 'age', label: 'Idade', type: 'number', min: 1, max: 120, defaultValue: 40, unit: 'anos' },
    { id: 'gender', label: 'Sexo Biológico', type: 'select', options: [{ label: 'Masculino', value: 'male' }, { label: 'Feminino', value: 'female' }], defaultValue: 'male' },
    { id: 'activity', label: 'Fator de Atividade Física Diária', type: 'select', options: [
      { label: 'Sedentário (pouco ou nenhum exercício) (1.2)', value: '1.2' },
      { label: 'Leve (exercício de 1 a 3 dias/semana) (1.375)', value: '1.375' },
      { label: 'Moderado (exercício de 3 a 5 dias/semana) (1.55)', value: '1.55' },
      { label: 'Ativo (exercício pesado de 6 a 7 dias/semana) (1.725)', value: '1.725' },
      { label: 'Muito Ativo (atividade física intensa profissional) (1.9)', value: '1.9' }
    ], defaultValue: '1.2' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const weight = parseFloat(values.weight);
    const height = parseFloat(values.height);
    const age = parseFloat(values.age);
    const gender = values.gender || 'male';
    const actFactor = parseFloat(values.activity) || 1.2;

    if (!weight || !height || !age) {
      return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };
    }

    let tmb = 0;
    if (gender === 'male') {
      // Men: TMB = 66.47 + (13.75 * W) + (5.003 * H) - (6.755 * Age)
      tmb = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
    } else {
      // Women: TMB = 655.1 + (9.563 * W) + (1.85 * H) - (4.676 * Age)
      tmb = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
    }

    const roundedTmb = Math.round(tmb);
    const getEnerg = Math.round(tmb * actFactor);

    return {
      value: `${roundedTmb} kcal/dia`,
      unit: 'kcal TMB',
      interpretation: `Gasto Energético de Repouso (TMB): ~${roundedTmb} kcal/dia. Necessidade Calórica Total Diária Estimada: ~${getEnerg} kcal/dia.`,
      recommendation: 'Este cálculo estabelece a base para planejamento dietético ou nutrição enteral/parenteral clínica. Ajustar frações de proteína, lipídios e carboidratos de acordo com o estado metabólico individual.',
      severity: 'low'
    };
  }
};

// 2. Ideal and Adjusted Weight
export const idealWeight: CalculatorDefinition = {
  id: 'ideal-weight',
  name: 'Peso Ideal e Peso Ajustado',
  description: 'Calcula o peso ideal (Devine 1974) e o peso ajustado para pacientes obesos. Crucial para dosagem de drogas e ventilação mecânica.',
  category: 'Clínica Geral / UTI',
  inputs: [
    { id: 'height', label: 'Altura (cm)', type: 'number', min: 100, max: 230, defaultValue: 175, unit: 'cm' },
    { id: 'weight', label: 'Peso Atual do Paciente (kg)', type: 'number', min: 10, max: 260, defaultValue: 95, unit: 'kg' },
    { id: 'gender', label: 'Sexo', type: 'select', options: [{ label: 'Masculino', value: 'male' }, { label: 'Feminino', value: 'female' }], defaultValue: 'male' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const height = parseFloat(values.height);
    const weight = parseFloat(values.weight);
    const gender = values.gender || 'male';

    if (!height || !weight) {
      return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };
    }

    const heightInches = height / 2.54;
    const inchesOver60 = Math.max(0, heightInches - 60);

    // Devine formula
    let ideal = 0;
    if (gender === 'male') {
      ideal = 50.0 + (2.3 * inchesOver60);
    } else {
      ideal = 45.5 + (2.3 * inchesOver60);
    }

    const roundedIdeal = Math.round(ideal * 10) / 10;
    let adjusted = roundedIdeal;
    const needsAdjusted = weight > (roundedIdeal * 1.2);

    if (needsAdjusted) {
      // Weight adjusted = Ideal + 0.4 * (Weight_Current - Ideal)
      adjusted = roundedIdeal + 0.4 * (weight - roundedIdeal);
    }
    const roundedAdjusted = Math.round(adjusted * 10) / 10;

    let interpret = `Peso Ideal (Devine): ${roundedIdeal} kg. `;
    let rec = '';
    
    if (needsAdjusted) {
      interpret += `Peso Ajustado (para obesidade > 20% do ideal): ${roundedAdjusted} kg.`;
      rec = 'O Peso Ideal deve ser rigorosamente empregado para calcular o volume corrente protetor do ventilador mecânico (6 mL/kg de peso ideal). O Peso Ajustado deve ser utilizado para o cálculo de clearance de creatinina (Cockcroft-Gault) e dosagem de certos medicamentos lipofóbicos em obesos (como aminoglicosídeos).';
    } else {
      interpret += 'O paciente está abaixo de 120% de sua estimativa de peso ideal corporal.';
      rec = 'Empregar o Peso Ideal para programação ventilatória e ajuste de amostragem de drogas hidrossolúveis padrão.';
    }

    return {
      value: `${roundedIdeal} kg (Ideal)`,
      unit: 'kg',
      interpretation: interpret,
      recommendation: rec,
      severity: 'low'
    };
  }
};

// 3. Body Surface Area (Mosteller)
export const bodySurfaceArea: CalculatorDefinition = {
  id: 'mosteller',
  name: 'Superfície Corporal (Mosteller)',
  description: 'Calcula a Superfície Corporal (SC) em metros quadrados utilizando a fórmula unificada de Mosteller.',
  category: 'Clínica Geral / UTI',
  inputs: [
    { id: 'weight', label: 'Peso Corporal (kg)', type: 'number', min: 1, max: 250, defaultValue: 70, unit: 'kg' },
    { id: 'height', label: 'Altura (cm)', type: 'number', min: 40, max: 230, defaultValue: 170, unit: 'cm' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const weight = parseFloat(values.weight);
    const height = parseFloat(values.height);

    if (!weight || !height) {
      return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };
    }

    // SC = sqrt((peso * altura) / 3600)
    const sc = Math.sqrt((weight * height) / 3600);
    const rounded = Math.round(sc * 100) / 100;

    return {
      value: rounded,
      unit: 'm²',
      interpretation: `Superfície Corporal calculada: ${rounded} m²`,
      recommendation: 'A Superfície Corporal é a unidade padrão para indexação de drogas quimioterápicas oncológicas, dosagem de imunossupressores, índice cardíaco ecocardiográfico e taxas de depuração urinária renal.',
      severity: 'low'
    };
  }
};

// 4. Burns Rule of Nines & Parkland Formula
export const burnsRule: CalculatorDefinition = {
  id: 'burns',
  name: 'Regra dos 9 e Fórmula de Parkland',
  description: 'Calcula a porcentagem da Superfície Corporal Queimada (SCQ) e determina o volume de reposição hidreletrolítica com Ringer Lactato.',
  category: 'Clínica Geral / UTI',
  inputs: [
    { id: 'weight', label: 'Peso do Paciente (kg)', type: 'number', min: 10, max: 200, defaultValue: 70, unit: 'kg' },
    // Interactive checklist mapped as inputs for easy form layout inside the standard service, 
    // although the UI can build a beautiful dedicated diagram!
    { id: 'head_ant', label: 'Cabeça Anterior (4.5%)', type: 'boolean', defaultValue: false },
    { id: 'head_post', label: 'Cabeça Posterior (4.5%)', type: 'boolean', defaultValue: false },
    { id: 'chest', label: 'Tórax / Tórax Anterior (9%)', type: 'boolean', defaultValue: false },
    { id: 'abdomen', label: 'Abdomen Anterior (9%)', type: 'boolean', defaultValue: false },
    { id: 'back_upper', label: 'Dorso Superior Posterior (9%)', type: 'boolean', defaultValue: false },
    { id: 'back_lower', label: 'Dorso Inferior / Lombar Posterior (9%)', type: 'boolean', defaultValue: false },
    { id: 'arm_l_ant', label: 'Braço Esquerdo Anterior (4.5%)', type: 'boolean', defaultValue: false },
    { id: 'arm_l_post', label: 'Braço Esquerdo Posterior (4.5%)', type: 'boolean', defaultValue: false },
    { id: 'arm_r_ant', label: 'Braço Direito Anterior (4.5%)', type: 'boolean', defaultValue: false },
    { id: 'arm_r_post', label: 'Braço Direito Posterior (4.5%)', type: 'boolean', defaultValue: false },
    { id: 'leg_l_ant', label: 'Perna Esquerda Anterior (9%)', type: 'boolean', defaultValue: false },
    { id: 'leg_l_post', label: 'Perna Esquerda Posterior (9%)', type: 'boolean', defaultValue: false },
    { id: 'leg_r_ant', label: 'Perna Direita Anterior (9%)', type: 'boolean', defaultValue: false },
    { id: 'leg_r_post', label: 'Perna Direita Posterior (9%)', type: 'boolean', defaultValue: false },
    { id: 'perineum', label: 'Períneo (1%)', type: 'boolean', defaultValue: false }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const weight = parseFloat(values.weight) || 70;
    
    let scq = 0;
    if (values.head_ant) scq += 4.5;
    if (values.head_post) scq += 4.5;
    if (values.chest) scq += 9;
    if (values.abdomen) scq += 9;
    if (values.back_upper) scq += 9;
    if (values.back_lower) scq += 9;
    if (values.arm_l_ant) scq += 4.5;
    if (values.arm_l_post) scq += 4.5;
    if (values.arm_r_ant) scq += 4.5;
    if (values.arm_r_post) scq += 4.5;
    if (values.leg_l_ant) scq += 9;
    if (values.leg_l_post) scq += 9;
    if (values.leg_r_ant) scq += 9;
    if (values.leg_r_post) scq += 9;
    if (values.perineum) scq += 1;

    let interpret = `Superfície Corporal Queimada (SCQ): ${scq}%. `;
    let recommendation = '';
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

    if (scq === 0) {
      return { value: 0, interpretation: 'Selecione as partes queimadas no corpo para calcular o escore.', recommendation: '', severity: 'low' };
    }

    // Parkland Formula = 4 * weight * scq (in mL)
    const totalVolumeMl = 4 * weight * scq;
    const halfVolumeMl = totalVolumeMl / 2;

    interpret += `Fórmula de Parkland sugere reposição de: ${totalVolumeMl} mL de Ringer Lactato nas primeiras 24 horas.`;
    
    if (scq > 20) {
      severity = 'critical';
      recommendation = `Grande Queimado (SCQ > 20%)! Infundir as primeiras 8 horas: ${halfVolumeMl} mL (vazão de ~${Math.round(halfVolumeMl / 8)} mL/h). Infundir o restante (${halfVolumeMl} mL) nas 16 horas seguintes. Alerta: Monitorar rigorosamente o débito urinário do paciente por sonda foley (alvo de 0.5 a 1.0 mL/kg/h em adultos).`;
    } else if (scq > 10) {
      severity = 'high';
      recommendation = `Queimadura Moderada. Administrar as primeiras 8h: ${halfVolumeMl} mL de Ringer Lactato. Avaliar manejo de vias aéreas se queimaduras faciais estivessem envolvidas.`;
    } else {
      severity = 'medium';
      recommendation = `Pequena Queimadura. Administrar líquidos corporais normais; a hidratação agressiva do Parkland pode não ser necessária, mas manter infusão básica recomendada. Limpeza local e curativos tópicos adequados.`;
    }

    return {
      value: `${scq}% SCQ`,
      unit: '% de SCQ',
      interpretation: interpret,
      recommendation,
      severity
    };
  }
};

// 5. Braden Scale (Pressure Sore Risk)
export const bradenScale: CalculatorDefinition = {
  id: 'braden',
  name: 'Escore de Braden (Risco de Lesão por Pressão)',
  description: 'Avalia o risco de desenvolvimento de Lesão por Pressão (LPP / escaras) em pacientes acamados ou debilitados.',
  category: 'Clínica Geral / UTI',
  inputs: [
    { id: 'sensory', label: 'Percepção Sensorial (Habilidade em responder ao desconforto)', type: 'select', options: [
      { label: '1 - Totalmente Limitado / Responsividade deprimida', value: '1' },
      { label: '2 - Muito Limitado (responde apenas a estimulação dolorosa)', value: '2' },
      { label: '3 - Levemente Limitado (responde a comandos verbais, mas sente dor em partes)', value: '3' },
      { label: '4 - Nenhuma Limitação', value: '4' }
    ], defaultValue: '4' },
    { id: 'moisture', label: 'Umidade (Grau de exposição da pele à umidade / suor)', type: 'select', options: [
      { label: '1 - Constantemente Úmida (suor, urina, fezes constantes)', value: '1' },
      { label: '2 - Muitas Vezes Úmida (requer troca de lençol frequente)', value: '2' },
      { label: '3 - Ocasionalmente Úmida (requer troca extra diária)', value: '3' },
      { label: '4 - Raramente Úmida / Pele limpa e seca habitual', value: '4' }
    ], defaultValue: '4' },
    { id: 'activity', label: 'Atividade Corporal (Grau de atividade física ativa)', type: 'select', options: [
      { label: '1 - Acamado / Restrito ao leito clínico', value: '1' },
      { label: '2 - Confinado à Cadeira (não deambula)', value: '2' },
      { label: '3 - Deambula Ocasionalmente (curtas distâncias c/ ajuda)', value: '3' },
      { label: '4 - Deambula Frequentemente (duas ou mais vezes ao dia)', value: '4' }
    ], defaultValue: '4' },
    { id: 'mobility', label: 'Mobilidade (Controle e mudança da posição no leito)', type: 'select', options: [
      { label: '1 - Totalmente Imóvel (sem ajuda não altera a posição)', value: '1' },
      { label: '2 - Muito Limitado (pequenas mudanças espasmódicas sozinho)', value: '2' },
      { label: '3 - Levemente Limitado (ajusta corpos coordenado de forma regular)', value: '3' },
      { label: '4 - Nenhuma Limitação / Altera posições com flexibilidade', value: '4' }
    ], defaultValue: '4' },
    { id: 'nutrition', label: 'Nutrição (Padrão usual de ingestão alimentar)', type: 'select', options: [
      { label: '1 - Muito Pobre (não come refeições completas / recusa)', value: '1' },
      { label: '2 - Provavelmente Inadequada (refeições pequenas ou suplementos parciais)', value: '2' },
      { label: '3 - Adequada (ingere a maioria das refeições diárias)', value: '3' },
      { label: '4 - Excelente (completa todas as refeições com alto aporte)', value: '4' }
    ], defaultValue: '4' },
    { id: 'friction', label: 'Fricção e Cisalhamento (Apoio deslizante em transfers)', type: 'select', options: [
      { label: '1 - Problema (requer muita ajuda para movimentar, escorrega frequentemente)', value: '1' },
      { label: '2 - Problema Potencial (movimenta de forma moderada, escorregamento mínimo)', value: '2' },
      { label: '3 - Sem Problema Aparente (força muscular para mover por si só de forma ágil)', value: '3' }
    ], defaultValue: '3' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    let score = 0;
    score += parseInt(values.sensory || '4', 10);
    score += parseInt(values.moisture || '4', 10);
    score += parseInt(values.activity || '4', 10);
    score += parseInt(values.mobility || '4', 10);
    score += parseInt(values.nutrition || '4', 10);
    score += parseInt(values.friction || '3', 10);

    let interpret = `Escore ${score}: `;
    let rec = '';
    let severity: 'low' | 'medium' | 'high' = 'low';

    if (score >= 19) {
      interpret += 'Sem Risco';
      rec = 'Manter rotina padrão de higiene e vigilância geral da pele.';
      severity = 'low';
    } else if (score >= 15) {
      interpret += 'Risco Leve';
      rec = 'Implementar protocolo preventivo de rotina: mobilização e reposicionamento regular no leito, hidratação ativa da pele com óleos (AGE), colchão piramidal (casca de ovo) protector corporal.';
      severity = 'low';
    } else if (score >= 13) {
      interpret += 'Risco Moderado';
      rec = 'Acrescentar medidas ativas: mudança de decúbito com agendamento rigoroso de 2 em 2 horas. Protetores hidrocoloides em proeminências ósseas de maior fricção (sacro e calcâneos) e otimizar aporte nutricional protéico.';
      severity = 'medium';
    } else if (score >= 10) {
      interpret += 'Risco Alto';
      rec = 'Uso obrigatório de colchão pneumático articulado. Atenção diária às fraldas por umidade, hidratação profusa. Manter elevação da cabeceira limitada a máximo 30° se viável para evitar forças de cisalhamento de sacro.';
      severity = 'high';
    } else {
      interpret += 'Risco Altíssimo / Severo';
      rec = 'Cuidados intensivos de enfermagem. Monitorar pele constantemente e empregar todas as medidas de barreira físicas imagináveis, além de reestruturação nutritiva intensiva.';
      severity = 'high';
    }

    return {
      value: score,
      unit: 'pontos',
      interpretation: interpret,
      recommendation: rec,
      severity
    };
  }
};

// 6. Ramsay Sedation Scale
export const ramsayScale: CalculatorDefinition = {
  id: 'ramsay',
  name: 'Escala de Ramsay (Nível de Sedação)',
  description: 'Mede o nível de sedação de pacientes em UTI, auxiliando no manejo ideal de sedativos e analgesia.',
  category: 'Clínica Geral / UTI',
  inputs: [
    { id: 'ramsay_level', label: 'Selecione o estado clínico observado no paciente', type: 'select', options: [
      { label: 'Ramsay 1 - Ansioso, agitado, inquieto', value: '1' },
      { label: 'Ramsay 2 - Cooperativo, orientado, tranquilo', value: '2' },
      { label: 'Ramsay 3 - Responde apenas a comandos verbais simples', value: '3' },
      { label: 'Ramsay 4 - Dormindo, mas responde rápido a toque leve ou estímulo auditivo', value: '4' },
      { label: 'Ramsay 5 - Dormindo, resposta lenta a estímulo tátil vigoroso ou auditivo alto', value: '5' },
      { label: 'Ramsay 6 - Dormindo, sem qualquer resposta (sedação profunda)', value: '6' }
    ], defaultValue: '2' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const level = parseInt(values.ramsay_level || '2', 10);

    let interpret = `Nível Ramsay: ${level} - `;
    let rec = '';
    let severity: 'low' | 'medium' | 'high' = 'low';

    if (level === 1) {
      interpret += 'Sedação Insuficiente / Agitação';
      rec = 'Paciente desconfortável ou com dor. Avaliar necessidade de analgesia de resgate ou aumento controlado do sedativo infundido.';
      severity = 'medium';
    } else if (level === 2 || level === 3) {
      interpret += 'Nível Ideal / Sedação Adequada';
      rec = 'Estado perfeito para a imensa maioria dos pacientes ventilados em desmame ou estáveis em UTI. Facilita o manejo, avaliação neurológica rápida e reduz tempo total de ventilação mecânica.';
      severity = 'low';
    } else if (level === 4 || level === 5) {
      interpret += 'Sedação Moderada a Profunda';
      rec = 'Adequado para pacientes sob ventilação mecânica invasiva em fase aguda, acoplamento respiratório ou uso de bloqueadores neuromusculares.';
      severity = 'medium';
    } else {
      interpret += 'Sedação Excessiva / Profunda';
      rec = 'Alerta para superdosagem ou acúmulo de sedativos se não houver indicação específica (como hipertensão intracraniana grave ou crise convulsiva refratária). Considerar realizar o "Despertar Diário" (interrupção temporária diária da sedação).';
      severity = 'high';
    }

    return {
      value: level,
      unit: 'Ramsay',
      interpretation: interpret,
      recommendation: rec,
      severity
    };
  }
};
