import { CalculatorDefinition, CalculatorResult } from '../../types';

// 1. Framingham 10-Year CVD Risk Score (ATP III Points Based)
export const framingham: CalculatorDefinition = {
  id: 'framingham',
  name: 'Escore de Framingham (Risco Cardiovascular)',
  description: 'Calcula o risco de evento cardiovascular global (infarto, AVC, doença arterial coronariana, insuficiência cardíaca) em 10 anos.',
  category: 'Cardiologia',
  inputs: [
    { id: 'age', label: 'Idade', type: 'number', min: 20, max: 79, defaultValue: 45, unit: 'anos' },
    { id: 'gender', label: 'Sexo', type: 'select', options: [{ label: 'Masculino', value: 'male' }, { label: 'Feminino', value: 'female' }], defaultValue: 'male' },
    { id: 'total_chol', label: 'Colesterol Total', type: 'number', min: 100, max: 400, defaultValue: 200, unit: 'mg/dL' },
    { id: 'hdl_chol', label: 'Colesterol HDL', type: 'number', min: 10, max: 100, defaultValue: 50, unit: 'mg/dL' },
    { id: 'sbp', label: 'Pressão Arterial Sistólica (PAS)', type: 'number', min: 90, max: 200, defaultValue: 120, unit: 'mmHg' },
    { id: 'smoker', label: 'Tabagismo', type: 'boolean', defaultValue: false },
    { id: 'diabetes', label: 'Diabetes', type: 'boolean', defaultValue: false },
    { id: 'treated_bp', label: 'Pressão tratada com medicamentos?', type: 'boolean', defaultValue: false }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const age = parseFloat(values.age) || 45;
    const gender = values.gender || 'male';
    const totalChol = parseFloat(values.total_chol) || 200;
    const hdlChol = parseFloat(values.hdl_chol) || 45;
    const sbp = parseFloat(values.sbp) || 120;
    const smoker = !!values.smoker;
    const diabetes = !!values.diabetes;
    const treated = !!values.treated_bp;

    let points = 0;

    if (gender === 'male') {
      // Age points
      if (age >= 20 && age <= 34) points -= 9;
      else if (age >= 35 && age <= 39) points -= 4;
      else if (age >= 40 && age <= 44) points += 0;
      else if (age >= 45 && age <= 49) points += 3;
      else if (age >= 50 && age <= 54) points += 6;
      else if (age >= 55 && age <= 59) points += 8;
      else if (age >= 60 && age <= 64) points += 10;
      else if (age >= 65 && age <= 69) points += 11;
      else if (age >= 70 && age <= 74) points += 12;
      else if (age >= 75 && age <= 79) points += 13;

      // Colesterol points (depends on age)
      if (age >= 20 && age <= 39) {
        if (totalChol < 160) points += 0;
        else if (totalChol < 200) points += 4;
        else if (totalChol < 240) points += 7;
        else if (totalChol < 280) points += 9;
        else points += 11;
      } else if (age >= 40 && age <= 49) {
        if (totalChol < 160) points += 0;
        else if (totalChol < 200) points += 3;
        else if (totalChol < 240) points += 5;
        else if (totalChol < 280) points += 6;
        else points += 8;
      } else if (age >= 50 && age <= 59) {
        if (totalChol < 160) points += 0;
        else if (totalChol < 200) points += 2;
        else if (totalChol < 240) points += 3;
        else if (totalChol < 280) points += 4;
        else points += 5;
      } else if (age >= 60 && age <= 69) {
        if (totalChol < 160) points += 0;
        else if (totalChol < 200) points += 1;
        else if (totalChol < 240) points += 1;
        else if (totalChol < 280) points += 2;
        else points += 3;
      } else { // 70-79
        if (totalChol < 160) points += 0;
        else if (totalChol < 200) points += 0;
        else if (totalChol < 240) points += 0;
        else if (totalChol < 280) points += 1;
        else points += 1;
      }

      // Smoker points (depends on age)
      if (smoker) {
        if (age >= 20 && age <= 39) points += 8;
        else if (age >= 40 && age <= 49) points += 5;
        else if (age >= 50 && age <= 59) points += 3;
        else if (age >= 60 && age <= 69) points += 1;
        else points += 1;
      }

      // HDL points
      if (hdlChol >= 60) points -= 1;
      else if (hdlChol >= 50) points += 0;
      else if (hdlChol >= 40) points += 1;
      else points += 2; // < 40

      // Blood pressure points
      if (treated) {
        if (sbp < 120) points += 0;
        else if (sbp < 130) points += 1;
        else if (sbp < 140) points += 2;
        else if (sbp < 160) points += 2;
        else points += 3;
      } else {
        if (sbp < 120) points += 0;
        else if (sbp < 130) points += 0;
        else if (sbp < 140) points += 1;
        else if (sbp < 160) points += 1;
        else points += 2;
      }

      // Diabetes
      if (diabetes) points += 3;
    } else {
      // Female points
      if (age >= 20 && age <= 34) points -= 7;
      else if (age >= 35 && age <= 39) points -= 3;
      else if (age >= 40 && age <= 44) points += 0;
      else if (age >= 45 && age <= 49) points += 3;
      else if (age >= 50 && age <= 54) points += 6;
      else if (age >= 55 && age <= 59) points += 8;
      else if (age >= 60 && age <= 64) points += 10;
      else if (age >= 65 && age <= 69) points += 12;
      else if (age >= 70 && age <= 74) points += 14;
      else if (age >= 75 && age <= 79) points += 16;

      // Colesterol (female age groups)
      if (age >= 20 && age <= 39) {
        if (totalChol < 160) points += 0;
        else if (totalChol < 200) points += 4;
        else if (totalChol < 240) points += 8;
        else if (totalChol < 280) points += 11;
        else points += 13;
      } else if (age >= 40 && age <= 49) {
        if (totalChol < 160) points += 0;
        else if (totalChol < 200) points += 3;
        else if (totalChol < 240) points += 6;
        else if (totalChol < 280) points += 8;
        else points += 10;
      } else if (age >= 50 && age <= 59) {
        if (totalChol < 160) points += 0;
        else if (totalChol < 200) points += 2;
        else if (totalChol < 240) points += 4;
        else if (totalChol < 280) points += 5;
        else points += 7;
      } else if (age >= 60 && age <= 69) {
        if (totalChol < 160) points += 0;
        else if (totalChol < 200) points += 1;
        else if (totalChol < 240) points += 2;
        else if (totalChol < 280) points += 3;
        else points += 4;
      } else { // 70-79
        if (totalChol < 160) points += 0;
        else if (totalChol < 200) points += 1;
        else if (totalChol < 240) points += 1;
        else if (totalChol < 280) points += 2;
        else points += 2;
      }

      // Smoker (female)
      if (smoker) {
        if (age >= 20 && age <= 39) points += 9;
        else if (age >= 40 && age <= 49) points += 6;
        else if (age >= 50 && age <= 59) points += 4;
        else if (age >= 60 && age <= 69) points += 2;
        else points += 1;
      }

      // HDL
      if (hdlChol >= 60) points -= 1;
      else if (hdlChol >= 50) points += 0;
      else if (hdlChol >= 40) points += 1;
      else points += 2;

      // Blood pressure
      if (treated) {
        if (sbp < 120) points += 0;
        else if (sbp < 130) points += 3;
        else if (sbp < 140) points += 4;
        else if (sbp < 160) points += 5;
        else points += 6;
      } else {
        if (sbp < 120) points += 0;
        else if (sbp < 130) points += 1;
        else if (sbp < 140) points += 2;
        else if (sbp < 160) points += 3;
        else points += 4;
      }

      // Diabetes
      if (diabetes) points += 4;
    }

    // Estimate risk in %
    let risk = 0;
    if (gender === 'male') {
      if (points <= 0) risk = 1; // < 1%
      else if (points === 1 || points === 2) risk = 1;
      else if (points === 3 || points === 4) risk = 1;
      else if (points === 5) risk = 2;
      else if (points === 6) risk = 2;
      else if (points === 7) risk = 3;
      else if (points === 8) risk = 4;
      else if (points === 9) risk = 5;
      else if (points === 10) risk = 6;
      else if (points === 11) risk = 8;
      else if (points === 12) risk = 10;
      else if (points === 13) risk = 12;
      else if (points === 14) risk = 16;
      else if (points === 15) risk = 20;
      else if (points === 16) risk = 25;
      else risk = 30; // >=17
    } else {
      if (points < 9) risk = 1; // < 1%
      else if (points >= 9 && points <= 12) risk = 1; // 1%
      else if (points === 13 || points === 14) risk = 2;
      else if (points === 15) risk = 3;
      else if (points === 16) risk = 4;
      else if (points === 17) risk = 5;
      else if (points === 18) risk = 6;
      else if (points === 19) risk = 8;
      else if (points === 20) risk = 11;
      else if (points === 21) risk = 14;
      else if (points === 22) risk = 17;
      else if (points === 23) risk = 22;
      else if (points === 24) risk = 27;
      else risk = 30; // >=25
    }

    let interpretation = '';
    let severity: 'low' | 'medium' | 'high' = 'low';

    if (risk < 10) {
      interpretation = `Baixo Risco Cardiovascular (${risk === 30 ? '≥' : ''}${risk}% em 10 anos)`;
      severity = 'low';
    } else if (risk <= 20) {
      interpretation = `Risco Cardiovascular Intermediário (${risk === 30 ? '≥' : ''}${risk}% em 10 anos)`;
      severity = 'medium';
    } else {
      interpretation = `Alto Risco Cardiovascular (${risk === 30 ? '≥' : ''}${risk}% em 10 anos)`;
      severity = 'high';
    }

    return {
      value: risk,
      unit: '% de risco em 10 anos',
      interpretation,
      recommendation: risk > 20 
        ? 'Indica terapia intensiva de redução de lipídios (alvo LDL < 50-70 mg/dL) e controle estrito da PA.'
        : risk >= 10 
          ? 'Recomenda-se otimizar estilo de vida e considerar estatina conforme outras comorbidades.'
          : 'Manter estilo de vida saudável e reavaliação anual.',
      severity
    };
  }
};

// 2. CHA2DS2-VASc Screen Score
export const cha2ds2vasc: CalculatorDefinition = {
  id: 'cha2ds2-vasc',
  name: 'CHA₂DS₂-VASc (Risco de AVC na FA)',
  description: 'Estima o risco de AVC isquêmico para pacientes com Fibrilação Atrial não-valvar.',
  category: 'Cardiologia',
  inputs: [
    { id: 'age', label: 'Idade', type: 'number', min: 1, max: 120, defaultValue: 65, unit: 'anos' },
    { id: 'gender', label: 'Sexo', type: 'select', options: [{ label: 'Masculino', value: 'male' }, { label: 'Feminino', value: 'female' }], defaultValue: 'male' },
    { id: 'chf', label: 'Insuficiência Cardíaca Congestiva / Disfunção de VE', type: 'boolean', defaultValue: false },
    { id: 'hypertension', label: 'Hipertensão Arterial Sistêmica', type: 'boolean', defaultValue: false },
    { id: 'stroke', label: 'AVC, AIT ou Tromboembolismo prévio', type: 'boolean', defaultValue: false },
    { id: 'vascular', label: 'Doença Vascular (IM prévio, DAP ou placa na aorta)', type: 'boolean', defaultValue: false },
    { id: 'diabetes', label: 'Diabetes Mellitus', type: 'boolean', defaultValue: false }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    let score = 0;
    const age = parseFloat(values.age) || 0;
    if (age >= 65 && age < 75) score += 1;
    if (age >= 75) score += 2;
    if (values.gender === 'female') score += 1;
    if (values.chf) score += 1;
    if (values.hypertension) score += 1;
    if (values.stroke) score += 2;
    if (values.vascular) score += 1;
    if (values.diabetes) score += 1;

    let risk = '';
    let recommendation = '';
    let severity: 'low' | 'medium' | 'high' = 'low';

    // Annual stroke risk estimate
    const risks: Record<number, string> = {
      0: '0% de risco anual',
      1: '1.3% de risco anual',
      2: '2.2% de risco anual',
      3: '3.2% de risco anual',
      4: '4.0% de risco anual',
      5: '6.7% de risco anual',
      6: '9.8% de risco anual',
      7: '9.6% de risco anual',
      8: '6.7% de risco anual',
      9: '15.2% de risco anual'
    };

    const riskVal = risks[score] || 'Risco elevado';
    const interpret = `Escore: ${score} - ${riskVal}`;

    const isFemale = values.gender === 'female';
    const thresholdAnticoagulate = isFemale ? 3 : 2;
    const thresholdConsider = isFemale ? 2 : 1;

    if (score >= thresholdAnticoagulate) {
      recommendation = 'Anticoagulação oral recomendada (varfarina ou NOACs).';
      severity = 'high';
    } else if (score === thresholdConsider) {
      recommendation = 'Anticoagulação oral deve ser considerada (individualizar risco de sangramento).';
      severity = 'medium';
    } else {
      recommendation = 'Nenhuma terapia antitrombótica ou apenas antiagregação (individualizado).';
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

// 3. HAS-BLED Score
export const hasbled: CalculatorDefinition = {
  id: 'has-bled',
  name: 'HAS-BLED (Risco de Sangramento)',
  description: 'Avalia o risco de sangramento de grande monta para pacientes em uso de anticoagulantes por FA.',
  category: 'Cardiologia',
  inputs: [
    { id: 'hypertension', label: 'Hipertensão (PAS > 160 mmHg)', type: 'boolean', defaultValue: false },
    { id: 'renal', label: 'Disfunção Renal (Creatinina ≥ 2.3 mg/dL, transplante ou diálise)', type: 'boolean', defaultValue: false },
    { id: 'liver', label: 'Disfunção Hepática (Cirrose, Bilirrubina > 2x limite, TGO/TGP > 3x limite)', type: 'boolean', defaultValue: false },
    { id: 'stroke', label: 'AVC prévio', type: 'boolean', defaultValue: false },
    { id: 'bleeding', label: 'Histórico de sangramento ou predisposição (anemia grave, diátese)', type: 'boolean', defaultValue: false },
    { id: 'labile_inr', label: 'INR lábil (tempo em faixa terapêutica < 60% apenas para Varfarina)', type: 'boolean', defaultValue: false },
    { id: 'age', label: 'Idade > 65 anos', type: 'boolean', defaultValue: false },
    { id: 'drugs', label: 'Uso concomitante de Antiplaquetários ou AINEs', type: 'boolean', defaultValue: false },
    { id: 'alcohol', label: 'Consumo excessivo de álcool (≥ 8 doses/semana)', type: 'boolean', defaultValue: false }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    let score = 0;
    if (values.hypertension) score += 1;
    if (values.renal) score += 1;
    if (values.liver) score += 1;
    if (values.stroke) score += 1;
    if (values.bleeding) score += 1;
    if (values.labile_inr) score += 1;
    if (values.age) score += 1;
    if (values.drugs) score += 1;
    if (values.alcohol) score += 1;

    let interpretation = '';
    let rx = '';
    let severity: 'low' | 'medium' | 'high' = 'low';

    // Bleeds per 100 patient-years
    const riskMap: Record<number, string> = {
      0: '1.13 sangramentos / 100 pac-ano',
      1: '1.02 sangramentos / 100 pac-ano',
      2: '1.88 sangramentos / 100 pac-ano',
      3: '3.74 sangramentos / 100 pac-ano',
      4: '8.70 sangramentos / 100 pac-ano',
      5: '12.50 sangramentos / 100 pac-ano'
    };

    const riskLabel = riskMap[score] || 'Risco extremamente elevado';

    if (score >= 3) {
      interpretation = `Escore ${score}: ALTO risco de sangramento (${riskLabel})`;
      rx = 'Atenção redobrada, controle rígido do INR se em varfarina, correção de fatores reversíveis (PA Controlada) e retornos frequentes. Não contraindica a anticoagulação se houver benefício líquido.';
      severity = 'high';
    } else {
      interpretation = `Escore ${score}: Baixo/Moderado risco de sangramento (${riskLabel})`;
      rx = 'Continuar anticoagulação com vigilância regular.';
      severity = 'low';
    }

    return {
      value: score,
      unit: 'pontos',
      interpretation,
      recommendation: rx,
      severity
    };
  }
};

// 4. Escore GRACE (SCA)
export const grace: CalculatorDefinition = {
  id: 'grace',
  name: 'Escore de GRACE',
  description: 'Mortalidade intra-hospitalar e em 6 meses para Síndrome Coronariana Aguda (SCA).',
  category: 'Cardiologia',
  inputs: [
    { id: 'age', label: 'Idade', type: 'select', options: [
      { label: '<30 anos (0)', value: '0' },
      { label: '30-39 anos (0)', value: '0_old' },
      { label: '40-49 anos (18)', value: '18' },
      { label: '50-59 anos (36)', value: '36' },
      { label: '60-69 anos (55)', value: '55' },
      { label: '70-79 anos (73)', value: '73' },
      { label: '80-89 anos (91)', value: '91' },
      { label: '≥90 anos (100)', value: '100' }
    ], defaultValue: '0' },
    { id: 'heart_rate', label: 'Frequência Cardíaca (bpm)', type: 'select', options: [
      { label: '<50 bpm (0)', value: '0' },
      { label: '50-69 bpm (3)', value: '3' },
      { label: '70-89 bpm (9)', value: '9' },
      { label: '90-109 bpm (15)', value: '15' },
      { label: '110-149 bpm (24)', value: '24' },
      { label: '150-199 bpm (38)', value: '38' },
      { label: '≥200 bpm (46)', value: '46' }
    ], defaultValue: '0' },
    { id: 'sbp', label: 'Pressão Arterial Sistólica (PAS)', type: 'select', options: [
      { label: '<80 mmHg (58)', value: '58' },
      { label: '80-99 mmHg (53)', value: '53' },
      { label: '100-119 mmHg (43)', value: '43' },
      { label: '120-139 mmHg (34)', value: '34' },
      { label: '140-159 mmHg (24)', value: '24' },
      { label: '160-199 mmHg (10)', value: '10' },
      { label: '≥200 mmHg (0)', value: '0' }
    ], defaultValue: '0' },
    { id: 'creatinine', label: 'Creatinina Sérica (mg/dL)', type: 'select', options: [
      { label: '0.0 - 0.39 mg/dL (1)', value: '1' },
      { label: '0.40 - 0.79 mg/dL (3)', value: '3' },
      { label: '0.80 - 1.19 mg/dL (5)', value: '5' },
      { label: '1.20 - 1.59 mg/dL (7)', value: '7' },
      { label: '1.60 - 1.99 mg/dL (9)', value: '9' },
      { label: '2.00 - 3.99 mg/dL (15)', value: '15' },
      { label: '≥4.00 mg/dL (28)', value: '28' }
    ], defaultValue: '1' },
    { id: 'killip', label: 'Classe de Killip (Grau de Insuficiência Cardíaca)', type: 'select', options: [
      { label: 'Classe I - Sem sintomas de congestão (0)', value: '0' },
      { label: 'Classe II - Estertores, B3, turgência jugular (20)', value: '20' },
      { label: 'Classe III - Edema Agudo de Pulmão total (39)', value: '39' },
      { label: 'Classe IV - Choque cardiogênico (59)', value: '59' }
    ], defaultValue: '0' },
    { id: 'cardiac_arrest', label: 'Parada Cardíaca na Admissão (+39)', type: 'boolean', defaultValue: false },
    { id: 'st_deviation', label: 'Desvio do Segmento ST (+28)', type: 'boolean', defaultValue: false },
    { id: 'elevated_enzymes', label: 'Enzimas Cardíacas ou Troponina Elevadas (+14)', type: 'boolean', defaultValue: false }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    let score = 0;
    
    // Parse selector values
    const ageVal = values.age || '0';
    score += ageVal === '0_old' ? 0 : parseInt(ageVal, 10);
    score += parseInt(values.heart_rate || '0', 10);
    score += parseInt(values.sbp || '0', 10);
    score += parseInt(values.creatinine || '1', 10);
    score += parseInt(values.killip || '0', 10);

    if (values.cardiac_arrest) score += 39;
    if (values.st_deviation) score += 28;
    if (values.elevated_enzymes) score += 14;

    let mortalityInHosp = '';
    let riskLabel = '';
    let severity: 'low' | 'medium' | 'high' = 'low';

    // Classification (non-STEMI / STEMI boundaries but overall approximate GRACE targets)
    if (score <= 108) {
      mortalityInHosp = '<1% de óbito hospitalar';
      riskLabel = 'Baixo Risco';
      severity = 'low';
    } else if (score <= 140) {
      mortalityInHosp = '1% - 3% de óbito hospitalar';
      riskLabel = 'Risco Intermediário';
      severity = 'medium';
    } else {
      mortalityInHosp = '>3% de óbito hospitalar';
      riskLabel = 'Alto Risco';
      severity = 'high';
    }

    return {
      value: score,
      unit: 'pontos',
      interpretation: `${riskLabel} (Mortalidade intra-hospitalar: ${mortalityInHosp})`,
      recommendation: score > 140
        ? 'Estratégia invasiva de urgência recomendada (CATE em < 24h). Monitoramento contínuo em UTI.'
        : score >= 109
          ? 'Estratégia invasiva precoce recomendada (CATE em < 72h).'
          : 'Estratégia conservadora ou CATE eletivo conforme isquemia demonstrada em testes não invasivos.',
      severity
    };
  }
};

// 5. Pressão de Pulso (PP)
export const pulsePressure: CalculatorDefinition = {
  id: 'pulse-pressure',
  name: 'Pressão de Pulso',
  description: 'Calcula a diferença entre a pressão arterial sistólica (PAS) e diastólica (PAD), indicador de rigidez arterial e risco vascular.',
  category: 'Cardiologia',
  inputs: [
    { id: 'sbp', label: 'Pressão Arterial Sistólica (PAS)', type: 'number', min: 40, max: 260, defaultValue: 120, unit: 'mmHg' },
    { id: 'dbp', label: 'Pressão Arterial Diastólica (PAD)', type: 'number', min: 30, max: 180, defaultValue: 80, unit: 'mmHg' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const sbp = parseFloat(values.sbp);
    const dbp = parseFloat(values.dbp);

    if (!sbp || !dbp) {
      return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };
    }

    const pp = sbp - dbp;
    let interpretation = '';
    let recommendation = '';
    let severity: 'low' | 'medium' | 'high' = 'low';

    if (pp > 60) {
      interpretation = `Escore: ${pp} mmHg - Alargada / Elevada`;
      recommendation = 'Indica rigidez de grandes artérias (estresse pulsátil elevado). Comum em idosos com HAS sistólica isolada. Associado a maior risco de AVC e eventos coronários. Otimizar controle de PA sistólica sistêmica.';
      severity = 'high';
    } else if (pp < 30) {
      interpretation = `Escore: ${pp} mmHg - Reduzida / Comprimida`;
      recommendation = 'Atenção clínica. Pressão de pulso muito estreita pode indicar baixo volume de ejeção sistólico (estenose aórtica grave, insuficiência cardíaca grave, choque circulatório, tamponamento cardíaco).';
      severity = 'medium';
    } else {
      interpretation = `Escore: ${pp} mmHg - Fisiológica / Normal`;
      recommendation = 'Pressão de pulso dentro da variação normal esperada (30 a 50 mmHg). Manter acompanhamento de rotina.';
      severity = 'low';
    }

    return {
      value: pp,
      unit: 'mmHg',
      interpretation,
      recommendation,
      severity
    };
  }
};
