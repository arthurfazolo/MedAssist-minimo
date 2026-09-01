import { CalculatorDefinition, CalculatorResult } from '../../types';

// 1. PSI/PORT (Pneumonia Severity Index)
export const psiPort: CalculatorDefinition = {
  id: 'psi-port',
  name: 'PSI/PORT (Escore de Severidade da Pneumonia)',
  description: 'Classifica pacientes com Pneumonia Adquirida na Comunidade (PAC) para melhor estratificação do local de tratamento (ambulatorial vs. internação).',
  category: 'Pneumologia / Emergência Respiratória',
  inputs: [
    { id: 'age', label: 'Idade', type: 'number', min: 1, max: 120, defaultValue: 60, unit: 'anos' },
    { id: 'gender', label: 'Sexo', type: 'select', options: [{ label: 'Masculino', value: 'male' }, { label: 'Feminino', value: 'female' }], defaultValue: 'male' },
    { id: 'nursing_home', label: 'Residente em asilo ou instituição de longa permanência? (+10)', type: 'boolean', defaultValue: false },
    // Comorbidities
    { id: 'cancer', label: 'Câncer / Doença Neoplásica ativa (+30)', type: 'boolean', defaultValue: false },
    { id: 'liver_disease', label: 'Doença hepática crônica (Cirrose, hepatite ativa) (+20)', type: 'boolean', defaultValue: false },
    { id: 'chf', label: 'Insuficiência cardíaca congestiva (+10)', type: 'boolean', defaultValue: false },
    { id: 'cerebrovascular', label: 'Doença cerebrovascular (AVC, AIT antecedente) (+10)', type: 'boolean', defaultValue: false },
    { id: 'renal_disease', label: 'Doença renal crônica (+10)', type: 'boolean', defaultValue: false },
    // Physical Examination
    { id: 'altered_mental', label: 'Estado mental alterado / Confusão mental recente (+20)', type: 'boolean', defaultValue: false },
    { id: 'rr_30', label: 'Frequência respiratória ≥ 30 irpm (+20)', type: 'boolean', defaultValue: false },
    { id: 'sbp_90', label: 'Pressão arterial sistólica < 90 mmHg (+20)', type: 'boolean', defaultValue: false },
    { id: 'temp_extremes', label: 'Temperatura corporal < 35°C ou ≥ 40°C (+15)', type: 'boolean', defaultValue: false },
    { id: 'hr_125', label: 'Frequência cardíaca ≥ 125 bpm (+10)', type: 'boolean', defaultValue: false },
    // Labs / Radiologic
    { id: 'ph_735', label: 'pH arterial < 7.35 (+30)', type: 'boolean', defaultValue: false },
    { id: 'un_64', label: 'Ureia sérica ≥ 64 mg/dL (ou BUN ≥ 30 mg/dL) (+20)', type: 'boolean', defaultValue: false },
    { id: 'na_130', label: 'Sódio sérico < 130 mEq/L (+20)', type: 'boolean', defaultValue: false },
    { id: 'glucose_250', label: 'Glicemia de jejum/admissão ≥ 250 mg/dL (+10)', type: 'boolean', defaultValue: false },
    { id: 'hct_30', label: 'Hematócrito < 30% (+10)', type: 'boolean', defaultValue: false },
    { id: 'pao2_60', label: 'PaO₂ < 60 mmHg ou saturação de oxigênio < 90% (+10)', type: 'boolean', defaultValue: false },
    { id: 'pleural_effusion', label: 'Derrame pleural evidenciado no raio-X de tórax (+10)', type: 'boolean', defaultValue: false }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const age = parseFloat(values.age) || 60;
    const gender = values.gender || 'male';
    const isMale = gender === 'male';

    // Fast check for Class I:
    // If age < 50 AND no comorbidities and no vital sign derangements, then Class I.
    const hasComorb = !!(values.cancer || values.liver_disease || values.chf || values.cerebrovascular || values.renal_disease || values.nursing_home);
    const hasPhysicalDerange = !!(values.altered_mental || values.rr_30 || values.sbp_90 || values.temp_extremes || values.hr_125);
    
    if (age < 50 && !hasComorb && !hasPhysicalDerange) {
      return {
        value: 'Classe I',
        interpretation: 'Classe de Risco I (Mortalidade estimada ~0.1%)',
        recommendation: 'Tratamento ambulatorial (em domicílio) seguro. Baixo risco de óbito.',
        severity: 'low'
      };
    }

    // Otherwise, sum points:
    let points = age;
    if (!isMale) points -= 10;
    if (values.nursing_home) points += 10;
    if (values.cancer) points += 30;
    if (values.liver_disease) points += 20;
    if (values.chf) points += 10;
    if (values.cerebrovascular) points += 10;
    if (values.renal_disease) points += 10;
    if (values.altered_mental) points += 20;
    if (values.rr_30) points += 20;
    if (values.sbp_90) points += 20;
    if (values.temp_extremes) points += 15;
    if (values.hr_125) points += 10;
    if (values.ph_735) points += 30;
    if (values.un_64) points += 20;
    if (values.na_130) points += 20;
    if (values.glucose_250) points += 10;
    if (values.hct_30) points += 10;
    if (values.pao2_60) points += 10;
    if (values.pleural_effusion) points += 10;

    let cls = '';
    let recommendation = '';
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
    let mort = '';

    if (points <= 70) {
      cls = 'Classe II';
      mort = '~0.6%';
      recommendation = 'Tratamento ambulatorial (em casa). Seguro e de baixo custo.';
      severity = 'low';
    } else if (points <= 90) {
      cls = 'Classe III';
      mort = '~0.9%';
      recommendation = 'Tratamento ambulatorial sob supervisão cuidadosa ou internação em leito de observação curto prazo (decisão clínica baseada em suporte social).';
      severity = 'medium';
    } else if (points <= 130) {
      cls = 'Classe IV';
      mort = '~9.3%';
      recommendation = 'Internação hospitalar recomendada em leito de enfermaria clínica geral.';
      severity = 'high';
    } else {
      cls = 'Classe V';
      mort = '~27.0%';
      recommendation = 'Internação hospitalar urgente. Considerar admissão em Unidade de Terapia Intensiva (UTI) devido a risco crítico de óbito.';
      severity = 'critical';
    }

    return {
      value: `${points} pts (${cls})`,
      unit: 'pontos',
      interpretation: `Classificação: ${cls} (Mortalidade estimada: ${mort})`,
      recommendation,
      severity
    };
  }
};

// 2. STOP-BANG Questionnaire (Obstructive Sleep Apnea)
export const stopBang: CalculatorDefinition = {
  id: 'stop-bang',
  name: 'STOP-BANG (Apneia Obstrutiva do Sono)',
  description: 'Triagem clínica simples para o risco de Apneia Obstrutiva do Sono (AOS).',
  category: 'Pneumologia / Emergência Respiratória',
  inputs: [
    { id: 'snoring', label: 'Ronco (Snoring): Você ronca alto (mais forte que a voz humana ou ouve-se através da porta fechada)?', type: 'boolean', defaultValue: false },
    { id: 'tired', label: 'Cansaço (Tired): Sente-se frequentemente cansado, fadigado ou com sono durante o dia?', type: 'boolean', defaultValue: false },
    { id: 'observed', label: 'Apneia Observada (Obstruction): Alguém já observou você parar de respirar ou engasgar enquanto dorme?', type: 'boolean', defaultValue: false },
    { id: 'pressure', label: 'Pressão (Pressure): Você trata ou foi diagnosticado com pressão arterial elevada?', type: 'boolean', defaultValue: false },
    { id: 'bmi_35', label: 'IMC anormal (BMI): Altura e peso indicam IMC > 35 kg/m²?', type: 'boolean', defaultValue: false },
    { id: 'age_50', label: 'Idade (Age): Tem mais de 50 anos de idade?', type: 'boolean', defaultValue: false },
    { id: 'neck_40', label: 'Pescoço (Neck): Circunferência do pescoço maior que 40 cm?', type: 'boolean', defaultValue: false },
    { id: 'gender_male', label: 'Sexo (Gender): É do sexo masculino?', type: 'boolean', defaultValue: false }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    let score = 0;
    if (values.snoring) score += 1;
    if (values.tired) score += 1;
    if (values.observed) score += 1;
    if (values.pressure) score += 1;
    if (values.bmi_35) score += 1;
    if (values.age_50) score += 1;
    if (values.neck_40) score += 1;
    if (values.gender_male) score += 1;

    let interpret = '';
    let recommendation = '';
    let severity: 'low' | 'medium' | 'high' = 'low';

    // Standard scoring criteria
    if (score >= 5) {
      interpret = `Risco Alto para Apneia Obstrutiva do Sono (${score} pontos)`;
      recommendation = 'Encaminhar o paciente para polissonografia diagnóstica e consulta especializada com otorrino/médico do sono.';
      severity = 'high';
    } else if (score >= 3) {
      interpret = `Risco Moderado para Apneia Obstrutiva do Sono (${score} pontos)`;
      recommendation = 'Avaliar comorbidades e sintomas individuais; considerar encaminhamento de acordo com a gravidade clínica subjetiva.';
      severity = 'medium';
    } else {
      interpret = `Risco Baixo para Apneia Obstrutiva do Sono (${score} pontos)`;
      recommendation = 'Baixa probabilidade de distúrbio grave do sono. Medidas de hábitos saudáveis e reavaliação se surgirem novos sintomas.';
      severity = 'low';
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

// 3. Wells Score for DVT / TVP
export const wellsDvt: CalculatorDefinition = {
  id: 'wells-dvt',
  name: 'Escore de Wells para TVP',
  description: 'Determina a probabilidade pré-teste de Trombose Venosa Profunda (TVP).',
  category: 'Pneumologia / Emergência Respiratória',
  inputs: [
    { id: 'cancer', label: 'Câncer ativo (em tratamento nos últimos 6 meses ou paliativo) (+1)', type: 'boolean', defaultValue: false },
    { id: 'paralysis', label: 'Paralisia, paresia ou imobilização com gesso recente de membros inferiores (+1)', type: 'boolean', defaultValue: false },
    { id: 'bedridden', label: 'Acamado recentemente > 3 dias ou cirurgia de grande porte nas últimas 12 semanas (+1)', type: 'boolean', defaultValue: false },
    { id: 'tenderness', label: 'Dor localizada na distribuição do sistema venoso profundo (+1)', type: 'boolean', defaultValue: false },
    { id: 'entire_leg_swollen', label: 'Todo o membro inferior afetado de forma difusa / edemaciado (+1)', type: 'boolean', defaultValue: false },
    { id: 'calf_swollen', label: 'Inchaço da panturrilha ≥ 3 cm em comparação com o lado assintomático (+1)', type: 'boolean', defaultValue: false },
    { id: 'pitting_edema', label: 'Edema depressível (cacifo) maior no membro sintomático (+1)', type: 'boolean', defaultValue: false },
    { id: 'veins', label: 'Veias colaterais superficiais não varicosas visíveis no membro sintomático (+1)', type: 'boolean', defaultValue: false },
    { id: 'prior_dvt', label: 'Histórico prévio documentado de TVP (+1)', type: 'boolean', defaultValue: false },
    { id: 'alternative_diagnosis', label: 'Diagnóstico alternativo ao de TVP pelo menos tão provável quanto (-2)', type: 'boolean', defaultValue: false }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    let score = 0;
    if (values.cancer) score += 1;
    if (values.paralysis) score += 1;
    if (values.bedridden) score += 1;
    if (values.tenderness) score += 1;
    if (values.entire_leg_swollen) score += 1;
    if (values.calf_swollen) score += 1;
    if (values.pitting_edema) score += 1;
    if (values.veins) score += 1;
    if (values.prior_dvt) score += 1;
    if (values.alternative_diagnosis) score -= 2;

    let interpretation = '';
    let recommendation = '';
    let severity: 'low' | 'medium' | 'high' = 'low';

    if (score >= 3) {
      interpretation = `Escore ${score}: ALTA Probabilidade de TVP`;
      recommendation = 'Indicado realizar exame de imagem (Ultrassonografia Doppler Compressiva de Membros Inferiores). Considerar tratamento anticoagulante empírico na indisponibilidade do exame imediato.';
      severity = 'high';
    } else if (score >= 1) {
      interpretation = `Escore ${score}: Moderada Probabilidade de TVP`;
      recommendation = 'Sugerido triagem com D-Dímero quantitativo de alta sensibilidade. Se positivo, realizar USG Doppler; se negativo, TVP é pouco provável.';
      severity = 'medium';
    } else {
      interpretation = `Escore ${score}: BAIXA Probabilidade de TVP`;
      recommendation = 'Realizar exame de D-Dímero. Se negativo, TVP está excluída sem necessidade de Doppler (alto valor preditivo negativo).';
      severity = 'low';
    }

    return {
      value: score,
      unit: 'pontos',
      interpretation,
      recommendation,
      severity
    };
  }
};
