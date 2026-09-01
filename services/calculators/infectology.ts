import { CalculatorDefinition, CalculatorResult } from '../../types';

// 1. qSOFA (Quick SOFA)
export const qsofa: CalculatorDefinition = {
  id: 'qsofa',
  name: 'qSOFA (Quick SOFA / Sepse rápida)',
  description: 'Identificação rápida de pacientes com suspeita de infecção e alto risco de mortalidade hospitalar fora da UTI.',
  category: 'Infectologia / Sepse',
  inputs: [
    { id: 'altered_loc', label: '1. Alteração do Nível de Consciência (Glasgow < 15 ou sonolência aguda)? (+1)', type: 'boolean', defaultValue: false },
    { id: 'rr_22', label: '2. Taquipneia / Frequência Respiratória ≥ 22 irpm? (+1)', type: 'boolean', defaultValue: false },
    { id: 'sbp_100', label: '3. Hipotensão / Pressão Arterial Sistólica (PAS) ≤ 100 mmHg? (+1)', type: 'boolean', defaultValue: false }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    let score = 0;
    if (values.altered_loc) score += 1;
    if (values.rr_22) score += 1;
    if (values.sbp_100) score += 1;

    let interpret = '';
    let recommendation = '';
    let severity: 'low' | 'high' = 'low';

    if (score >= 2) {
      interpret = `Escore ${score}: ALTO risco de evolução desfavorável / Sepse`;
      recommendation = 'Investigar disfunções orgânicas completas (solicitar gasometria com lactato arterial, exames laboratoriais). Monitorizar de perto, colher culturas (hemocultura, urocultura), iniciar antibioticoterapia de amplo espectro na primeira hora e avaliar necessidade de terapia intensiva.';
      severity = 'high';
    } else {
      interpret = `Escore ${score}: Baixo risco de disfunção orgânica severa`;
      recommendation = 'Continuar acompanhamento clínico e do foco infeccioso primário. Repetir avaliação se houver qualquer piora do estado geral.';
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

// 2. SOFA (Sequential Organ Failure Assessment) Score
export const sofaScore: CalculatorDefinition = {
  id: 'sofa-score',
  name: 'SOFA Score',
  description: 'Mede o grau de disfunção / falência orgânica em 6 sistemas vitais para triagem e prognóstico de Sepse.',
  category: 'Infectologia / Sepse',
  inputs: [
    { id: 'resp', label: 'Sistema Respiratório (PaO₂ / FiO₂)', type: 'select', options: [
      { label: '≥ 400 (0 pontos)', value: '0' },
      { label: '< 400 (1 ponto)', value: '1' },
      { label: '< 300 (2 pontos)', value: '2' },
      { label: '< 200 com suporte ventilatório (3 pontos)', value: '3' },
      { label: '< 100 com suporte ventilatório (4 pontos)', value: '4' }
    ], defaultValue: '0' },
    { id: 'coag', label: 'Sistema de Coagulação (Plaquetas)', type: 'select', options: [
      { label: '≥ 150.000 /mm³ (0 pontos)', value: '0' },
      { label: '< 150.000 /mm³ (1 ponto)', value: '1' },
      { label: '< 100.000 /mm³ (2 pontos)', value: '2' },
      { label: '< 50.000 /mm³ (3 pontos)', value: '3' },
      { label: '< 20.000 /mm³ (4 pontos)', value: '4' }
    ], defaultValue: '0' },
    { id: 'liver', label: 'Função Hepática (Bilirrubina Total)', type: 'select', options: [
      { label: '< 1.2 mg/dL (0 pontos)', value: '0' },
      { label: '1.2 - 1.9 mg/dL (1 ponto)', value: '1' },
      { label: '2.0 - 5.9 mg/dL (2 pontos)', value: '2' },
      { label: '6.0 - 11.9 mg/dL (3 pontos)', value: '3' },
      { label: '≥ 12.0 mg/dL (4 pontos)', value: '4' }
    ], defaultValue: '0' },
    { id: 'cardio', label: 'Cardiovascular (PAM / Vasopressores)', type: 'select', options: [
      { label: 'Sem hipotensão (0 pontos)', value: '0' },
      { label: 'PAM < 70 mmHg (1 ponto)', value: '1' },
      { label: 'Dopamina ≤ 5 mcg/kg/min ou Dobutamina (qualquer dose) (2 pontos)', value: '2' },
      { label: 'Dopamina > 5 ou Noradrenalina ≤ 0.1 ou Adrenalina ≤ 0.1 mcg/kg/min (3 pontos)', value: '3' },
      { label: 'Dopamina > 15 ou Noradrenalina > 0.1 ou Adrenalina > 0.1 mcg/kg/min (4 pontos)', value: '4' }
    ], defaultValue: '0' },
    { id: 'cns', label: 'Sistema Nervoso Central (Escala de Glasgow)', type: 'select', options: [
      { label: 'Glasgow 15 (0 pontos)', value: '0' },
      { label: 'Glasgow 13 - 14 (1 ponto)', value: '1' },
      { label: 'Glasgow 10 - 12 (2 pontos)', value: '2' },
      { label: 'Glasgow 6 - 9 (3 pontos)', value: '3' },
      { label: 'Glasgow < 6 (4 pontos)', value: '4' }
    ], defaultValue: '0' },
    { id: 'renal', label: 'Função Renal (Creatinina ou Débito Urinário)', type: 'select', options: [
      { label: '< 1.2 mg/dL (0 pontos)', value: '0' },
      { label: '1.2 - 1.9 mg/dL (1 ponto)', value: '1' },
      { label: '2.0 - 3.4 mg/dL (2 pontos)', value: '2' },
      { label: '3.5 - 4.9 mg/dL ou debito urinário < 500 mL/dia (3 pontos)', value: '3' },
      { label: '≥ 5.0 mg/dL ou debito urinário < 200 mL/dia (4 pontos)', value: '4' }
    ], defaultValue: '0' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    let score = 0;
    score += parseInt(values.resp || '0', 10);
    score += parseInt(values.coag || '0', 10);
    score += parseInt(values.liver || '0', 10);
    score += parseInt(values.cardio || '0', 10);
    score += parseInt(values.cns || '0', 10);
    score += parseInt(values.renal || '0', 10);

    let interpret = `Escore SOFA Total: ${score} - `;
    let recommendation = '';
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

    if (score >= 12) {
      interpret += 'Mortalidade estimada > 50-95%';
      recommendation = 'Disfunção multiorgânica gravíssima. Monitorização intensiva imediata, suporte hemodinâmico e ventilatório otimizado. Avaliar terapia agressiva em UTI.';
      severity = 'critical';
    } else if (score >= 6) {
      interpret += 'Mortalidade estimada ~15-30%';
      recommendation = 'Falência orgânica moderada a acentuada. Otimizar perfusão tecidual e condutas conforme diretriz de sepse (Surviving Sepsis Campaign).';
      severity = 'high';
    } else if (score >= 2) {
      interpret += 'Mortalidade estimada ~10%';
      recommendation = 'Disfunção orgânica diagnosticada (critério clínico de sepse se houve aumento ≥ 2 pontos em relação à basal). Foco total no tratamento do agente infeccioso primário.';
      severity = 'medium';
    } else {
      interpret += 'Mortalidade estimada < 5%';
      recommendation = 'Baixo grau de disfunção vital. Vigilância de rotina.';
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

// 3. Critérios de Ranson (Pancreatite Aguda)
export const ranson: CalculatorDefinition = {
  id: 'ranson',
  name: 'Escore de Ranson (Severidade na Pancreatite)',
  description: 'Estratifica a gravidade clínica e o risco de mortalidade em pacientes com Pancreatite Aguda não biliar.',
  category: 'Infectologia / Sepse',
  inputs: [
    // Class admission
    { id: 'age_55', label: 'Admissão: Idade > 55 anos?', type: 'boolean', defaultValue: false },
    { id: 'wbc_16', label: 'Admissão: Leucócitos > 16.000 /mm³?', type: 'boolean', defaultValue: false },
    { id: 'gl_200', label: 'Admissão: Glicemia > 200 mg/dL?', type: 'boolean', defaultValue: false },
    { id: 'ldh_350', label: 'Admissão: LDH sérico > 350 UI/L?', type: 'boolean', defaultValue: false },
    { id: 'ast_250', label: 'Admissão: AST/TGO sérica > 250 UI/L?', type: 'boolean', defaultValue: false },
    // First 48h
    { id: 'hct_10', label: '48 Horas: Queda do hematócrito > 10%?', type: 'boolean', defaultValue: false },
    { id: 'bun_5', label: '48 Horas: Elevação da Ureia / BUN > 5 mg/dL?', type: 'boolean', defaultValue: false },
    { id: 'ca_8', label: '48 Horas: Cálcio sérico < 8.0 mg/dL?', type: 'boolean', defaultValue: false },
    { id: 'pao2_60', label: '48 Horas: PaO₂ arterial < 60 mmHg?', type: 'boolean', defaultValue: false },
    { id: 'base_4', label: '48 Horas: Déficit de bases > 4 mEq/L?', type: 'boolean', defaultValue: false },
    { id: 'fluid_6', label: '48 Horas: Sequestro estimado de fluidos > 6 Litros?', type: 'boolean', defaultValue: false }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    let score = 0;
    const keys = ['age_55', 'wbc_16', 'gl_200', 'ldh_350', 'ast_250', 'hct_10', 'bun_5', 'ca_8', 'pao2_60', 'base_4', 'fluid_6'];
    keys.forEach(k => {
      if (values[k]) score += 1;
    });

    let interpret = '';
    let recommendation = '';
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

    if (score < 3) {
      interpret = `Escore ${score}: Pancreatite Aguda Leve (Mortalidade estimada ~0.9%)`;
      recommendation = 'Tratamento em enfermaria geral. Jejum, hidratação rápida, controle de dor e analgesia.';
      severity = 'low';
    } else if (score <= 5) {
      interpret = `Escore ${score}: Pancreatite Moderadamente Grave (Mortalidade estimada ~15%)`;
      recommendation = 'Monitorização cuidadosa em enfermaria ou observação intensiva. Atenção para sinais de insuficiência de sistemas vitais.';
      severity = 'medium';
    } else if (score <= 6) {
      interpret = `Escore ${score}: Pancreatite Grave (Mortalidade estimada ~40%)`;
      recommendation = 'Internação preferencial em Unidade de Terapia Intensiva (UTI) nosológica. Alto risco de Síndrome de Resposta Inflamatória Sistêmica (SIRS) e necrose pancreática infecciosa.';
      severity = 'high';
    } else {
      interpret = `Escore ${score}: Pancreatite Gravíssima / Crítica (Mortalidade de ~100%)`;
      recommendation = 'Monitoramento vital estrito em UTI. Complicações locais e sistêmicas extremas induzidos por necrose severa.';
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

// 4. Child-Pugh Score (Hepatic Function)
export const childPugh: CalculatorDefinition = {
  id: 'child-pugh',
  name: 'Escore de Child-Pugh',
  description: 'Estratifica a gravidade funcional da insuficiência hepática e estima a taxa de sobrevida de pacientes com cirrose.',
  category: 'Infectologia / Sepse',
  inputs: [
    { id: 'encephalopathy', label: 'Encefalopatia Porto-Sistêmica', type: 'select', options: [
      { label: 'Ausente (1 ponto)', value: '1' },
      { label: 'Grau I - II: Leve confusão, sono perturbado, lentidão (2 pontos)', value: '2' },
      { label: 'Grau III - IV: Sonolência acentuada, coma (3 pontos)', value: '3' }
    ], defaultValue: '1' },
    { id: 'ascites', label: 'Presença de Ascite', type: 'select', options: [
      { label: 'Ausente (1 ponto)', value: '1' },
      { label: 'Leve (responde facilmente a diuréticos) (2 pontos)', value: '2' },
      { label: 'Moderada / Grave (tensa ou refratária a diuréticos) (3 pontos)', value: '3' }
    ], defaultValue: '1' },
    { id: 'bilirubin', label: 'Bilirrubina total (mg/dL)', type: 'select', options: [
      { label: '< 2.0 mg/dL (1 ponto)', value: '1' },
      { label: '2.0 - 3.0 mg/dL (2 pontos)', value: '2' },
      { label: ' > 3.0 mg/dL (3 pontos)', value: '3' }
    ], defaultValue: '1' },
    { id: 'albumin', label: 'Albumina Sérica (g/dL)', type: 'select', options: [
      { label: '> 3.5 g/dL (1 ponto)', value: '1' },
      { label: '2.8 - 3.5 g/dL (2 pontos)', value: '2' },
      { label: '< 2.8 g/dL (3 pontos)', value: '3' }
    ], defaultValue: '1' },
    { id: 'inr', label: 'INR (ou Prolongamento de TP)', type: 'select', options: [
      { label: 'INR < 1.7 / Protrombina prolongada < 4.0 segundos (1 ponto)', value: '1' },
      { label: 'INR 1.7 - 2.3 / Protrombina prolongada 4.0 - 6.0 segundos (2 pontos)', value: '2' },
      { label: 'INR > 2.3 / Protrombina prolongada > 6.0 segundos (3 pontos)', value: '3' }
    ], defaultValue: '1' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    let score = 0;
    score += parseInt(values.encephalopathy || '1', 10);
    score += parseInt(values.ascites || '1', 10);
    score += parseInt(values.bilirubin || '1', 10);
    score += parseInt(values.albumin || '1', 10);
    score += parseInt(values.inr || '1', 10);

    let cls = '';
    let surv1 = '';
    let surv2 = '';
    let severity: 'low' | 'medium' | 'high' = 'low';

    if (score <= 6) {
      cls = 'Classe A (Doença Hepatocelular Compensada)';
      surv1 = '100%';
      surv2 = '85%';
      severity = 'low';
    } else if (score <= 9) {
      cls = 'Classe B (Disfunção Hepática Moderada / Grave)';
      surv1 = '80%';
      surv2 = '60%';
      severity = 'medium';
    } else {
      cls = 'Classe C (Insuficiência Hepática Avançada / Descompensada)';
      surv1 = '45%';
      surv2 = '35%';
      severity = 'high';
    }

    return {
      value: `${score} pts`,
      unit: 'pontos',
      interpretation: `Classe ${cls}. Estimativa de sobrevida: 1 ano: ${surv1} | 2 anos: ${surv2}`,
      recommendation: score >= 10 
        ? 'Elegibilidade clínica crítica para transplante de fígado. Encaminhamento imediato e avaliação conjunta do MELD.'
        : score >= 7
          ? 'Avaliar cuidadosamente a função hepática prévia para cirurgias eletivas. Risco anestésico moderado a elevado.'
          : 'Função metabólica global compensada. Acompanhamento clínico ambulatorial sem indicação ativa de transplante.',
      severity
    };
  }
};
