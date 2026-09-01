import { CalculatorDefinition, CalculatorResult } from '../../types';

// 1. Westley Score for Croup / Crupe
export const westley: CalculatorDefinition = {
  id: 'westley',
  name: 'Escore de Westley (Severidade do Crupe)',
  description: 'Avalia a gravidade da Laringotraqueobronquíte Aguda (Crupe) em pacientes pediátricos para embasamento de conduta.',
  category: 'Pediatria',
  inputs: [
    { id: 'stridor', label: '1. Estridor Inspiratório', type: 'select', options: [
      { label: '0 - Ausente', value: '0' },
      { label: '1 - Presente apenas com agitação / choro', value: '1' },
      { label: '2 - Presente em repouso', value: '2' }
    ], defaultValue: '0' },
    { id: 'retractions', label: '2. Retrações / Tiragens (Fúrcula e Intercostais)', type: 'select', options: [
      { label: '0 - Ausentes', value: '0' },
      { label: '1 - Leves', value: '1' },
      { label: '2 - Moderadas', value: '2' },
      { label: '3 - Graves', value: '3' }
    ], defaultValue: '0' },
    { id: 'air_entry', label: '3. Entrada de Ar / Murmúrio Vesicular', type: 'select', options: [
      { label: '0 - Normal', value: '0' },
      { label: '1 - Diminuída de forma leve a moderada', value: '1' },
      { label: '2 - Muito diminuída / Tórax silencioso', value: '2' }
    ], defaultValue: '0' },
    { id: 'cyanosis', label: '4. Cianose', type: 'select', options: [
      { label: '0 - Ausente', value: '0' },
      { label: '4 - Presente sob agitação / choro', value: '4' },
      { label: '5 - Presente em repouso', value: '5' }
    ], defaultValue: '0' },
    { id: 'consciousness', label: '5. Nível de Consciência', type: 'select', options: [
      { label: '0 - Normal / Alerta', value: '0' },
      { label: '5 - Sonolento / Sensório deprimido', value: '5' }
    ], defaultValue: '0' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    let score = 0;
    score += parseInt(values.stridor || '0', 10);
    score += parseInt(values.retractions || '0', 10);
    score += parseInt(values.air_entry || '0', 10);
    score += parseInt(values.cyanosis || '0', 10);
    score += parseInt(values.consciousness || '0', 10);

    let interpret = '';
    let recommendation = '';
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

    if (score <= 2) {
      interpret = `Escore ${score}: Crupe Leve`;
      recommendation = 'Tratamento ambulatorial seguro. Recomenda-se dose única de Dexametasona por via oral (0.15 a 0.6 mg/kg - máx 10-15 mg) e orientações de repouso, hidratação e retorno se houver piora.';
      severity = 'low';
    } else if (score <= 7) {
      interpret = `Escore ${score}: Crupe Moderado`;
      recommendation = 'Administrar Dexametasona por via oral ou intramuscular (0.6 mg/kg). Realizar nebulização complementar com Adrenalina comum (L-adrenalina ou adrenalina milesimal, 0.5 mL/kg até máx 5 mL, diluídos em SF). Manter em observação clínica por 2 a 4 horas. Se houver melhora consolidada e sem estridor em repouso, alta ambulatorial é cabível.';
      severity = 'medium';
    } else if (score <= 11) {
      interpret = `Escore ${score}: Crupe Grave`;
      recommendation = 'Necessário tratamento imediato com Adrenalina nebulizada (0.5 mL/kg - máx 5 mL) associado a Corticoesteroide sistêmico EV/IM. Oxigenoterapia para manter SatO₂ > 92%. Internação hospitalar mandatória para acompanhamento contínuo.';
      severity = 'high';
    } else {
      interpret = `Escore ${score}: Insuficiência Respiratória Iminente / Crítico`;
      recommendation = 'Sinal de obstrução extrema das vias superiores. Acionar apoio para intubação endotraqueal emergencial utilizando tubo de diâmetro menor do que o calculado para a idade. Transferência imediata para UTI pediátrica.';
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

// 2. Wood-Downes Score for Pediatric Asthma Crisis
export const woodDownes: CalculatorDefinition = {
  id: 'wood-downes',
  name: 'Escore de Wood-Downes (Sinalização na Crise Asmática Pediátrica)',
  description: 'Mede a intensidade da obstrução brônquica aguda em crianças de todas as idades, auxiliando no escalonamento terapêutico imediato.',
  category: 'Pediatria',
  inputs: [
    { id: 'wheezing', label: '1. Sibilância', type: 'select', options: [
      { label: '0 - Ausente', value: '0' },
      { label: '1 - Presente na expiração final sob ausculta', value: '1' },
      { label: '2 - Presente em toda a fase expiratória', value: '2' },
      { label: '3 - Presente na inspiração e expiração ou tórax sem sibilância por asfixia extrema', value: '3' }
    ], defaultValue: '0' },
    { id: 'retractions', label: '2. Uso de Musculatura Acessória (Tiragem)', type: 'select', options: [
      { label: '0 - Ausente', value: '0' },
      { label: '1 - Tiragem intercostal leve', value: '1' },
      { label: '2 - Tiragem intercostal e subcostal moderada', value: '2' },
      { label: '3 - Recrutamento supraesternal intenso, batimento de asa de nariz e gemência', value: '3' }
    ], defaultValue: '0' },
    { id: 'air_entry', label: '3. MV / Entrada de Ar', type: 'select', options: [
      { label: '0 - Simétrica e normal', value: '0' },
      { label: '1 - Simétrica levemente diminuída', value: '1' },
      { label: '2 - Muito diminuída de forma global', value: '2' },
      { label: '3 - Praticamente ausente (tórax silencioso por asfixia)', value: '3' }
    ], defaultValue: '0' },
    { id: 'cyanosis', label: '4. Cianose por Hipoxemia', type: 'select', options: [
      { label: '0 - Ausente / Perfusão de pele simétrica rosada', value: '0' },
      { label: '1 - Cianose perioral ou de extremidades com esforço', value: '1' },
      { label: '2 - Cianose central perceptível mesmo em repouso', value: '2' }
    ], defaultValue: '0' },
    { id: 'hr_120', label: '5. Frequência Cardíaca (Pediátrica)', type: 'select', options: [
      { label: '0 - Menor que 120 batimentos por minuto', value: '0' },
      { label: '1 - ≥ 120 batimentos por minuto', value: '1' }
    ], defaultValue: '0' },
    { id: 'rr_30', label: '6. Frequência Respiratória', type: 'select', options: [
      { label: '0 - Menor que 30 incursões por minuto', value: '0' },
      { label: '1 - ≥ 30 incursões respiratórias por minuto', value: '1' }
    ], defaultValue: '0' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    let score = 0;
    score += parseInt(values.wheezing || '0', 10);
    score += parseInt(values.retractions || '0', 10);
    score += parseInt(values.air_entry || '0', 10);
    score += parseInt(values.cyanosis || '0', 10);
    score += parseInt(values.hr_120 || '0', 10);
    score += parseInt(values.rr_30 || '0', 10);

    let interpret = '';
    let recommendation = '';
    let severity: 'low' | 'medium' | 'high' = 'low';

    if (score <= 3) {
      interpret = `Escore ${score}: Crise de Asma Leve`;
      recommendation = 'Inalação com broncodilatador de curta ação beta-2 agonista (Salbutamol 100 mcg, 2 a 4 jatos com espaçador de 20/20 min na primeira hora). Avaliar corticoesteroide oral (Prednisolona 1-2 mg/kg) se sem resposta inicial plena.';
      severity = 'low';
    } else if (score <= 7) {
      interpret = `Escore ${score}: Crise de Asma Moderada`;
      recommendation = 'Broncodilatador de ação rápida beta-2 (Salbutamol 4-8 jatos ou nebulização) associado a Brometo de Iparatrópio (250-500 mcg) corporativo a cada 20/20 minutos. Administrar Corticoesteroide sistêmico obrigatório oral ou venoso. Monitorar saturação de oxigênio.';
      severity = 'medium';
    } else {
      interpret = `Escore ${score}: Crise de Asma Grave / Muito Grave`;
      recommendation = 'Oxigênio sob máscara facial de alto fluxo/cateter para manter SatO₂ 93-95%. Inalações frequentes continuas. Considerar infusão EV de Sulfato de Magnésio (40-50 mg/kg - máx 2g) em infusão lenta de 20min. Solicitar gasometria arterial e transferir para ambiente de monitorização intensiva.';
      severity = 'high';
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

// 3. WHO Growth Percentile Approximation for Pediatrics
export const pediatricPercentiles: CalculatorDefinition = {
  id: 'pediatric-percentiles',
  name: 'Percentis Pediátricos (OMS)',
  description: 'Avalia se o peso e estatura estão adequados para a idade de acordo com curvas de crescimento de referência da OMS.',
  category: 'Pediatria',
  inputs: [
    { id: 'gender', label: 'Sexo da Criança', type: 'select', options: [{ label: 'Menino', value: 'male' }, { label: 'Menina', value: 'female' }], defaultValue: 'male' },
    { id: 'age_weeks', label: 'Idade da Criança (em meses)', type: 'number', min: 1, max: 60, defaultValue: 12, unit: 'meses' },
    { id: 'weight', label: 'Peso Atual (kg)', type: 'number', min: 1, max: 40, defaultValue: 10, unit: 'kg' },
    { id: 'height', label: 'Estatura / Comprimento (cm)', type: 'number', min: 40, max: 130, defaultValue: 75, unit: 'cm' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const isMale = (values.gender || 'male') === 'male';
    const ageMonths = parseFloat(values.age_weeks) || 12;
    const weight = parseFloat(values.weight) || 10;
    const height = parseFloat(values.height) || 75;

    // Standard simplified mathematical model of median values per CDC/WHO:
    // This allows real-time rendering of approximate percentiles.
    // Median expected weight and height for age (1 to 60 months)
    let expectedWeightMedian = 3.3 + (ageMonths * 0.5); // very rough linear
    if (ageMonths > 12) {
      expectedWeightMedian = 9.5 + ((ageMonths - 12) * 0.22);
    }
    let expectedHeightMedian = 50 + (ageMonths * 2); 
    if (ageMonths > 12) {
      expectedHeightMedian = 75 + ((ageMonths - 12) * 0.65);
    }

    // adjustments for gender
    if (!isMale) {
      expectedWeightMedian *= 0.95;
      expectedHeightMedian *= 0.98;
    }

    const weightRatio = weight / expectedWeightMedian;
    const heightRatio = height / expectedHeightMedian;

    let wPercentile = 50;
    if (weightRatio < 0.75) wPercentile = 3;
    else if (weightRatio < 0.88) wPercentile = 15;
    else if (weightRatio > 1.25) wPercentile = 97;
    else if (weightRatio > 1.12) wPercentile = 85;

    let hPercentile = 50;
    if (heightRatio < 0.90) hPercentile = 3;
    else if (heightRatio < 0.96) hPercentile = 15;
    else if (heightRatio > 1.08) hPercentile = 97;
    else if (heightRatio > 1.04) hPercentile = 85;

    let interpretation = `Peso p/${ageMonths}m: ~p${wPercentile} | Estatura p/${ageMonths}m: ~p${hPercentile}`;
    let rec = 'Crescimento e antropometria aparentemente adequados dentro da média populacional.';
    let severity: 'low' | 'medium' | 'high' = 'low';

    if (wPercentile <= 3 || hPercentile <= 3) {
      interpretation += ' (Atenção: Baixo Peso ou Baixo Crescimento)';
      rec = 'Antropometria abaixo do percentil 3. Recomenda-se investigar distúrbios de absorção alimentar, desnutrição, causas endocrinológicas ou desvio de curva de crescimento linear.';
      severity = 'high';
    } else if (wPercentile >= 97) {
      interpretation += ' (Atenção: Risco de Sobrepeso/Obesidade)';
      rec = 'Peso acima do percentil 97. Aconselhável orientação nutricional balanceada de hábitos familiares e avaliação de fatores metabólicos pediátricos.';
      severity = 'medium';
    }

    return {
      value: `p${wPercentile} para Peso, p${hPercentile} para Altura`,
      unit: 'percentil',
      interpretation,
      recommendation: rec,
      severity
    };
  }
};

// 4. Pediatric Drug Dosage calculation by Weight
export const pediatricDose: CalculatorDefinition = {
  id: 'pediatric-dose',
  name: 'Dosagem Pediátrica por Peso',
  description: 'Calcula a dosagem farmacológica total em miligramas e volume de suspensão líquida em mililitros com base no peso da criança.',
  category: 'Pediatria',
  inputs: [
    { id: 'weight', label: 'Peso da Criança', type: 'number', min: 1, max: 80, defaultValue: 10, unit: 'kg' },
    { id: 'dose_mg_kg', label: 'Dose Prescrita (Ex: 15 para Paracetamol, 10 para Ibuprofeno)', type: 'number', min: 0.1, max: 1000, defaultValue: 15, unit: 'mg/kg' },
    { id: 'conc_mg', label: 'Concentração do Frasco (Miligramas)', type: 'number', min: 0.1, max: 2000, defaultValue: 200, unit: 'mg' },
    { id: 'conc_ml', label: 'Volume no qual essa miligrama está diluída', type: 'number', min: 0.1, max: 200, defaultValue: 5, unit: 'mL' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const weight = parseFloat(values.weight);
    const doseMgKg = parseFloat(values.dose_mg_kg);
    const concMg = parseFloat(values.conc_mg);
    const concMl = parseFloat(values.conc_ml);

    if (!weight || !doseMgKg || !concMg || !concMl) {
      return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };
    }

    // Total required mg = weight * dose_mg_kg
    const totalRequiredMg = weight * doseMgKg;
    // Total required mL = (totalRequiredMg * concMl) / concMg
    const totalRequiredMl = (totalRequiredMg * concMl) / concMg;

    const roundedMg = Math.round(totalRequiredMg * 10) / 10;
    const roundedMl = Math.round(totalRequiredMl * 10) / 10;

    return {
      value: `${roundedMl} mL`,
      interpretation: `Dose única recomendada: ${roundedMg} mg por tomada (conduzir ao volume de ${roundedMl} mL).`,
      recommendation: `Certifique-se do tipo de dosador utilizado (copinho ou seringa graduada). Nunca exceda a dose máxima de segurança estipulada para adultos em tomadas únicas (ex: 1000mg de Paracetamol, 400mg de Ibuprofeno, etc.).`,
      severity: 'low'
    };
  }
};
