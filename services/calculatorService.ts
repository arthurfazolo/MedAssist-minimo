import { CalculatorDefinition, CalculatorResult } from '../types';
import * as math from 'mathjs';
import { migrateItemReviewFields } from './reviewService';

// Modular calculators imports
import { framingham, cha2ds2vasc, hasbled, grace, pulsePressure } from './calculators/cardiology';
import { psiPort, stopBang, wellsDvt } from './calculators/respiratory';
import { nihss, ottawaRule } from './calculators/neurology';
import { fena, plasmOsm, sodiumDeficit, freeWaterDeficit, potassiumDeficit } from './calculators/nephrology';
import { qsofa, sofaScore, ranson, childPugh } from './calculators/infectology';
import { westley, woodDownes, pediatricPercentiles, pediatricDose } from './calculators/pediatric';
import { bishop, gestationalWeight } from './calculators/obstetrics';
import { harrisBenedict, idealWeight, bodySurfaceArea, burnsRule, bradenScale, ramsayScale } from './calculators/icu';
import { bloodGas, anionGap, sodiumCorrection, calciumCorrection } from './calculators/laboratory';

// --- EXISTING SPECIALIZED CALCULATORS LOGIC KEEPERS ---

// CKD-EPI (2021)
const calculateCKDEPI = (values: Record<string, any>): CalculatorResult => {
  const scr = parseFloat(values.creatinine);
  const age = parseFloat(values.age);
  const isFemale = values.gender === 'female';
  
  if (!scr || !age) return { value: 0, interpretation: 'Dados incompletos', recommendation: '', severity: 'low' };

  let k = isFemale ? 0.7 : 0.9;
  let alpha = isFemale ? -0.241 : -0.302;
  let genderFactor = isFemale ? 1.012 : 1;

  const part1 = Math.min(scr / k, 1) ** alpha;
  const part2 = Math.max(scr / k, 1) ** -1.200;
  const part3 = 0.9938 ** age;

  const gfr = 142 * part1 * part2 * part3 * genderFactor;
  const roundedGfr = Math.round(gfr * 10) / 10;

  let interpretation = '';
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

  if (roundedGfr >= 90) { interpretation = 'Estágio G1 - Normal ou elevado'; severity = 'low'; }
  else if (roundedGfr >= 60) { interpretation = 'Estágio G2 - Levemente diminuído'; severity = 'low'; }
  else if (roundedGfr >= 45) { interpretation = 'Estágio G3a - Leve a moderadamente diminuído'; severity = 'medium'; }
  else if (roundedGfr >= 30) { interpretation = 'Estágio G3b - Moderada a gravemente diminuído'; severity = 'high'; }
  else if (roundedGfr >= 15) { interpretation = 'Estágio G4 - Gravemente diminuído'; severity = 'high'; }
  else { interpretation = 'Estágio G5 - Falência renal'; severity = 'critical'; }

  return {
    value: roundedGfr,
    unit: 'mL/min/1.73m²',
    interpretation,
    recommendation: 'Ajustar doses de medicações de eliminação renal conforme necessário.',
    severity
  };
};

// MELD
const calculateMELD = (values: Record<string, any>): CalculatorResult => {
  const bili = Math.max(parseFloat(values.bilirubin), 1);
  const inr = Math.max(parseFloat(values.inr), 1);
  const cr = Math.max(parseFloat(values.creatinine), 1);

  const score = 3.78 * Math.log(bili) + 11.2 * Math.log(inr) + 9.57 * Math.log(cr) + 6.43;
  const rounded = Math.round(score);

  let mortality = '';
  if (rounded <= 9) mortality = '1.9% mortalidade em 3 meses';
  else if (rounded <= 19) mortality = '6.0% mortalidade em 3 meses';
  else if (rounded <= 29) mortality = '19.6% mortalidade em 3 meses';
  else if (rounded <= 39) mortality = '52.6% mortalidade em 3 meses';
  else mortality = '71.3% mortalidade em 3 meses';

  return {
    value: rounded,
    unit: 'pontos',
    interpretation: mortality,
    recommendation: 'Encaminhar para especialista em hepatologia/transplante se MELD > 15.',
    severity: rounded > 15 ? 'high' : 'medium'
  };
};

// IMC (BMI)
const calculateBMI = (values: Record<string, any>): CalculatorResult => {
  const weight = parseFloat(values.weight);
  const heightCm = parseFloat(values.height);

  if (!weight || !heightCm) return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  const rounded = Math.round(bmi * 10) / 10;

  let interpretation = '';
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

  if (rounded < 18.5) { interpretation = 'Abaixo do peso'; severity = 'medium'; }
  else if (rounded < 25) { interpretation = 'Peso normal'; severity = 'low'; }
  else if (rounded < 30) { interpretation = 'Sobrepeso'; severity = 'medium'; }
  else if (rounded < 35) { interpretation = 'Obesidade Grau I'; severity = 'high'; }
  else if (rounded < 40) { interpretation = 'Obesidade Grau II'; severity = 'high'; }
  else { interpretation = 'Obesidade Grau III (Mórbida)'; severity = 'critical'; }

  return {
    value: rounded,
    unit: 'kg/m²',
    interpretation,
    recommendation: 'Avaliar comorbidades e orientar estilo de vida.',
    severity
  };
};

// CURB-65 (Pneumonia)
const calculateCURB65 = (values: Record<string, any>): CalculatorResult => {
  let score = 0;
  if (values.confusion) score += 1;
  if (values.urea) score += 1;
  if (values.resp_rate) score += 1;
  if (values.bp) score += 1;
  if (parseFloat(values.age) >= 65) score += 1;

  let interpretation = '';
  let recommendation = '';
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

  if (score <= 1) {
    interpretation = 'Baixo risco (Mortalidade < 3%)';
    recommendation = 'Considerar tratamento ambulatorial.';
    severity = 'low';
  } else if (score === 2) {
    interpretation = 'Risco moderado (Mortalidade ~9%)';
    recommendation = 'Considerar internação hospitalar.';
    severity = 'medium';
  } else {
    interpretation = 'Alto risco (Mortalidade 15-40%)';
    recommendation = 'Considerar internação em UTI.';
    severity = 'critical';
  }

  return {
    value: score,
    unit: 'pontos',
    interpretation,
    recommendation,
    severity
  };
};

const calculateCardiovascularRisk = (values: Record<string, any>): number => {
  const age = parseFloat(values.age);
  const totalChol = parseFloat(values.total_chol);
  const hdl = parseFloat(values.hdl);
  const sbp = parseFloat(values.sbp);
  const isSmoker = values.smoker === true;
  const isDiabetic = values.diabetes === true;
  const isTreated = values.treated === true;
  const isFemale = values.gender === 'female';

  if (!age || !totalChol || !hdl || !sbp) {
    return 0;
  }

  const lnAge = Math.log(age);
  const lnTotalChol = Math.log(totalChol);
  const lnHdl = Math.log(hdl);
  const lnSbp = Math.log(sbp);

  let score = 0;
  let risk = 0;

  if (isFemale) {
    score = 2.32888 * lnAge
          + 1.20904 * lnTotalChol
          - 0.70833 * lnHdl
          + 2.76157 * lnSbp * (isTreated ? 1 : 0)
          + 2.82263 * lnSbp * (isTreated ? 0 : 1)
          + 0.52873 * (isSmoker ? 1 : 0)
          + 0.69154 * (isDiabetic ? 1 : 0)
          - 26.1931;
    risk = 100 * (1 - Math.pow(0.95012, Math.exp(score)));
  } else {
    score = 3.06117 * lnAge
          + 1.12370 * lnTotalChol
          - 0.93263 * lnHdl
          + 1.93303 * lnSbp * (isTreated ? 1 : 0)
          + 1.99881 * lnSbp * (isTreated ? 0 : 1)
          + 0.65451 * (isSmoker ? 1 : 0)
          + 0.57367 * (isDiabetic ? 1 : 0)
          - 23.9802;
    risk = 100 * (1 - Math.pow(0.88936, Math.exp(score)));
  }

  return risk;
};

const calculateSBCRisk = (values: Record<string, any>): CalculatorResult => {
  const age = parseFloat(values.age);
  const totalChol = parseFloat(values.total_chol);
  const hdl = parseFloat(values.hdl);
  const sbp = parseFloat(values.sbp);
  const isFemale = values.gender === 'female';

  if (!age || !totalChol || !hdl || !sbp) {
    return { value: 0, interpretation: 'Dados incompletos', recommendation: '', severity: 'low' };
  }

  const risk = calculateCardiovascularRisk(values);
  const riskPercent = parseFloat(risk.toFixed(1));
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
  let interpretation = '';
  let recommendation = '';

  if (riskPercent < 5) {
      severity = 'low';
      interpretation = `Risco Baixo (< 5%)`;
      recommendation = 'Manter estilo de vida saudável. Reavaliação periódica.';
  } else {
      if (isFemale) {
          if (riskPercent <= 10) {
              severity = 'medium';
              interpretation = `Risco Intermediário (5-10%)`;
              recommendation = 'Avaliar fatores agravantes (Ex: Histórico familiar, Sd. Metabólica) para possível reclassificação. Meta LDL-c < 100 mg/dL.';
          } else {
               severity = 'high';
               interpretation = `Risco Alto (> 10%)`;
               recommendation = 'Terapia com estatinas indicada. Meta LDL-c < 70 mg/dL.';
          }
      } else {
           if (riskPercent <= 20) {
               severity = 'medium';
               interpretation = `Risco Intermediário (5-20%)`;
               recommendation = 'Avaliar fatores agravantes (Ex: Histórico familiar, Sd. Metabólica) para possível reclassificação. Meta LDL-c < 100 mg/dL.';
           } else {
                severity = 'high';
                interpretation = `Risco Alto (> 20%)`;
                recommendation = 'Terapia com estatinas indicada. Meta LDL-c < 70 mg/dL.';
           }
      }
  }

  return {
    value: riskPercent,
    unit: '% (10 anos)',
    interpretation: interpretation,
    recommendation: recommendation,
    severity
  };
};

// STATIC CALCULATORS LIST
const STATIC_CALCULATORS: CalculatorDefinition[] = [
  // --- CARDIOLOGIA ---
  framingham,
  cha2ds2vasc,
  hasbled,
  grace,
  pulsePressure,
  {
    id: 'sbc-erg',
    name: 'Escore de Risco Global (SBC)',
    description: 'Estratificação de risco cardiovascular segundo diretrizes da Sociedade Brasileira de Cardiologia (ERG).',
    category: 'Cardiologia',
    inputs: [
      { id: 'gender', label: 'Sexo', type: 'select', options: [{ label: 'Masculino', value: 'male' }, { label: 'Feminino', value: 'female' }] },
      { id: 'age', label: 'Idade', type: 'number', unit: 'anos' },
      { id: 'total_chol', label: 'Colesterol Total', type: 'number', unit: 'mg/dL' },
      { id: 'hdl', label: 'HDL Colesterol', type: 'number', unit: 'mg/dL' },
      { id: 'sbp', label: 'Pressão Sistólica (PAS)', type: 'number', unit: 'mmHg' },
      { id: 'treated', label: 'Em tratamento para HAS?', type: 'boolean' },
      { id: 'smoker', label: 'Tabagista', type: 'boolean' },
      { id: 'diabetes', label: 'Diabético', type: 'boolean' },
    ],
    calculate: calculateSBCRisk
  },

  // --- RESPIRATORIA ---
  psiPort,
  stopBang,
  wellsDvt,
  {
    id: 'wells_tep',
    name: 'Escore de Wells para TEP',
    description: 'Escore preditivo para avaliação da probabilidade física de Embolia Pulmonar Aguda (TEP).',
    category: 'Pneumologia / Emergência Respiratória',
    inputs: [
      { id: 'sinais_tvp', label: 'Sinais ou sintomas clínicos de TVP (dor, edema)', type: 'boolean', defaultValue: false },
      { id: 'diagnostico_alternativo', label: 'Outro diagnóstico é menos provável do que TEP', type: 'boolean', defaultValue: false },
      { id: 'fc', label: 'Frequência Cardíaca > 100 bpm', type: 'boolean', defaultValue: false },
      { id: 'imobilizacao', label: 'Imobilização ≥ 3 dias ou cirurgia nos últimos 30 dias', type: 'boolean', defaultValue: false },
      { id: 'tvp_tep_previo', label: 'Diagnóstico prévio confirmado de TVP ou TEP', type: 'boolean', defaultValue: false },
      { id: 'hemoptise', label: 'Presença de hemoptise', type: 'boolean', defaultValue: false },
      { id: 'cancer', label: 'Câncer ativo ou em tratamento oncológico recente (últimos 6 meses)', type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      let score = 0;
      if (values.sinais_tvp) score += 3.0;
      if (values.diagnostico_alternativo) score += 3.0;
      if (values.fc) score += 1.5;
      if (values.imobilizacao) score += 1.5;
      if (values.tvp_tep_previo) score += 1.5;
      if (values.hemoptise) score += 1.0;
      if (values.cancer) score += 1.0;

      let interpretation = '';
      let recommendation = '';
      let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

      if (score < 2.0) {
        interpretation = `Baixa Probabilidade Clínica (${score} pontos)`;
        recommendation = 'Recomenda-se realizar o teste de D-Dímero de alta sensibilidade. Se negativo, a embolia pulmonar pode ser descartada com segurança.';
        severity = 'low';
      } else if (score >= 2.0 && score <= 6.0) {
        interpretation = `Moderada Probabilidade Clínica (${score} pontos)`;
        recommendation = 'Dosar o D-Dímero ou realizar Angio-TC pulmonar direta para confirmação de embolia pulmonar.';
        severity = 'medium';
      } else {
        interpretation = `Alta Probabilidade Clínica (${score} pontos)`;
        recommendation = 'Realizar Angio-TC de tórax imediata. Iniciar protocolo terapêutico de anticoagulação plena se não houver contraindicações absolutas.';
        severity = 'high';
      }

      return {
        value: score,
        unit: 'pontos',
        interpretation,
        recommendation,
        severity
      };
    }
  },
  {
    id: 'curb-65',
    name: 'CURB-65',
    description: 'Estratificação de gravidade para Pneumonia Adquirida na Comunidade.',
    category: 'Pneumologia / Emergência Respiratória',
    inputs: [
      { id: 'confusion', label: 'Confusão Mental', type: 'boolean' },
      { id: 'urea', label: 'Ureia > 50 mg/dL', type: 'boolean' },
      { id: 'resp_rate', label: 'Frequência Respiratória >= 30 irpm', type: 'boolean' },
      { id: 'bp', label: 'PAS < 90 ou PAD <= 60 mmHg', type: 'boolean' },
      { id: 'age', label: 'Idade', type: 'number', unit: 'anos' },
    ],
    calculate: calculateCURB65
  },

  // --- NEUROLOGIA ---
  nihss,
  ottawaRule,
  {
    id: 'glasgow',
    name: 'Escala de Coma de Glasgow',
    description: 'Avaliação do nível de consciência de pacientes neurológicos e vítimas de trauma.',
    category: 'Neurologia',
    inputs: [
      {
        id: 'abertura',
        label: 'Abertura Ocular',
        type: 'select',
        options: [
          { label: 'Espontânea (4)', value: 4 },
          { label: 'À estimulação verbal (3)', value: 3 },
          { label: 'À estimulação de pressão/dor (2)', value: 2 },
          { label: 'Ausente (1)', value: 1 }
        ],
        defaultValue: 4
      },
      {
        id: 'verbal',
        label: 'Resposta Verbal',
        type: 'select',
        options: [
          { label: 'Orientada (5)', value: 5 },
          { label: 'Confusa (4)', value: 4 },
          { label: 'Palavras inapropriadas (3)', value: 3 },
          { label: 'Sons incompreensíveis (2)', value: 2 },
          { label: 'Ausente (1)', value: 1 }
        ],
        defaultValue: 5
      },
      {
        id: 'motora',
        label: 'Resposta Motora',
        type: 'select',
        options: [
          { label: 'Obedece a comandos (6)', value: 6 },
          { label: 'Localiza o estímulo de dor (5)', value: 5 },
          { label: 'Flexão normal / Retirada à dor (4)', value: 4 },
          { label: 'Flexão anormal / Decorticação (3)', value: 3 },
          { label: 'Extensão anormal / Descerebração (2)', value: 2 },
          { label: 'Ausente (1)', value: 1 }
        ],
        defaultValue: 6
      }
    ],
    calculate: (values) => {
      const abertura = parseInt(values.abertura) || 4;
      const verbal = parseInt(values.verbal) || 5;
      const motora = parseInt(values.motora) || 6;
      const score = abertura + verbal + motora;

      let interpretation = '';
      let recommendation = '';
      let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

      if (score >= 13) {
        interpretation = 'Disfunção neurológica leve / TCE leve';
        recommendation = 'Monitorar o paciente continuamente. Observar sinais de alerta neurológico ou cefaleia progressiva.';
        severity = 'low';
      } else if (score >= 9) {
        interpretation = 'Disfunção neurológica moderada / TCE moderado';
        recommendation = 'Observação rigorosa. Solicitar exames de imagem complementar (TC de Crânio) e avaliação da neurocirurgia.';
        severity = 'medium';
      } else {
        interpretation = 'Disfunção neurológica grave / TCE grave (Coma)';
        recommendation = 'INDICAÇÃO FORMAL DE PROTOCOLO DE VIA AÉREA AVANÇADA (Intubação Orotraqueal). Monitorar pressão de perfusão cerebral, ventilação mecânica e acionar neurocirurgia urgente.';
        severity = 'critical';
      }

      return {
        value: score,
        unit: 'pontos (GCS)',
        interpretation,
        recommendation,
        severity
      };
    }
  },

  // --- NEFROLOGIA / ELETRÓLITOS ---
  {
    id: 'ckd-epi',
    name: 'CKD-EPI (2021)',
    description: 'Estima a Taxa de Filtração Glomerular (TFG) baseada na creatinina.',
    category: 'Nefrologia / Eletrólitos',
    inputs: [
      { id: 'gender', label: 'Sexo', type: 'select', options: [{ label: 'Masculino', value: 'male' }, { label: 'Feminino', value: 'female' }] },
      { id: 'age', label: 'Idade', type: 'number', unit: 'anos' },
      { id: 'creatinine', label: 'Creatinina Sérica', type: 'number', step: 0.1, unit: 'mg/dL' },
    ],
    calculate: calculateCKDEPI
  },
  fena,
  plasmOsm,
  sodiumDeficit,
  freeWaterDeficit,
  potassiumDeficit,
  {
    id: 'cg_clearance',
    name: 'Clearance de Creatinina (Cockcroft-Gault)',
    description: 'Estimação do ritmo de filtração glomerular renal para pacientes adultos.',
    category: 'Nefrologia / Eletrólitos',
    inputs: [
      { id: 'idade', label: 'Idade', type: 'number', unit: 'anos', min: 1, max: 120, defaultValue: 60 },
      { id: 'peso', label: 'Peso', type: 'number', unit: 'kg', min: 1, max: 250, defaultValue: 70 },
      { id: 'creatinina', label: 'Creatinina Sérica', type: 'number', unit: 'mg/dL', min: 0.1, max: 15.0, defaultValue: 1.0 },
      {
        id: 'sexo',
        label: 'Sexo Biológico',
        type: 'select',
        options: [
          { label: 'Masculino', value: 'masculino' },
          { label: 'Feminino', value: 'feminino' }
        ],
        defaultValue: 'masculino'
      }
    ],
    calculate: (values) => {
      const idade = parseFloat(values.idade) || 0;
      const peso = parseFloat(values.peso) || 0;
      const creatinina = parseFloat(values.creatinina) || 1.0;
      const sexo = values.sexo || 'masculino';

      if (creatinina <= 0 || peso <= 0 || idade <= 0) {
        return {
          value: '-',
          interpretation: 'Aguardando preenchimento dos dados do paciente.',
          recommendation: 'Preencha adequadamente os campos acima.',
          severity: 'low'
        };
      }

      let clCr = ((140 - idade) * peso) / (72 * creatinina);
      if (sexo === 'feminino') {
        clCr = clCr * 0.85;
      }

      const clRounded = Math.round(clCr * 10) / 10;
      let interpretation = '';
      let recommendation = '';
      let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

      if (clRounded >= 90) {
        interpretation = 'Classe I: Ritmo de Filtração Normal (>= 90 mL/min)';
        recommendation = 'Função de depuração glomerular preservada. Nenhuma conduta ou ajuste especial.';
        severity = 'low';
      } else if (clRounded >= 60) {
        interpretation = 'Classe II: Insuficiência Renal Leve (60 - 89 mL/min)';
        recommendation = 'Redução renal discreta. Fazer controle clínico regular e adequações preventivas em nefrotóxicas se necessário.';
        severity = 'low';
      } else if (clRounded >= 30) {
        interpretation = 'Classe III: Insuficiência Renal Moderada (30 - 59 mL/min)';
        recommendation = 'Redução de filtração renal significativa. Ajustar a posologia e intervalos de antibióticos, antivirais e outros fármacos de eliminação renal.';
        severity = 'medium';
      } else if (clRounded >= 15) {
        interpretation = 'Classe IV: Insuficiência Renal Grave (15 - 29 mL/min)';
        recommendation = 'Uso restrito. Evitar anti-inflamatórios e fármacos estritamente nefrotóxicos. Ajustes renais formais necessários.';
        severity = 'high';
      } else {
        interpretation = 'Classe V: Falência Renal (< 15 mL/min)';
        recommendation = 'Conduta crítica. Indicar consulta especializada nefrológica imediata. Atenção absoluta para sobrecarga hídrica e distúrbios de eletrólitos.';
        severity = 'critical';
      }

      return {
        value: clRounded,
        unit: 'mL/min',
        interpretation,
        recommendation,
        severity
      };
    }
  },

  // --- INFECTOLOGIA / SEPSE ---
  qsofa,
  sofaScore,
  ranson,
  childPugh,
  {
    id: 'dengue',
    name: 'Hidratação na Dengue (MS)',
    description: 'Protocolo de hidratação do Ministério da Saúde conforme o grupo clínico (A, B, C, D).',
    category: 'Infectologia / Sepse',
    inputs: [
      {
        id: 'peso',
        label: 'Peso do paciente',
        type: 'number',
        unit: 'kg',
        min: 1,
        max: 300,
        defaultValue: 70
      },
      {
        id: 'grupo',
        label: 'Grupo clínico da dengue',
        type: 'select',
        options: [
          { label: 'Grupo A', value: 'A' },
          { label: 'Grupo B', value: 'B' },
          { label: 'Grupo C', value: 'C' },
          { label: 'Grupo D', value: 'D' }
        ],
        defaultValue: 'A'
      }
    ],
    calculate: (values) => {
      const peso = parseFloat(values.peso) || 0;
      const grupo = values.grupo || 'A';

      if (peso <= 0) {
        return {
          value: '-',
          interpretation: 'Informe o peso do paciente.',
          recommendation: 'Preencha o campo peso para calcular o volume de hidratação.',
          severity: 'low'
        };
      }

      if (grupo === 'A') {
        const volume = Math.round(60 * peso);
        return {
          value: volume,
          unit: 'mL/dia',
          interpretation: `Volume total de hidratação oral recomendada: ${volume} mL/dia.`,
          recommendation: 'Tratamento domiciliar com hidratação oral abundante. Fracionar em porções frequentes. Retorno para reavaliação clínica em 24h.',
          severity: 'low'
        };
      } else if (grupo === 'B') {
        const volMin = Math.round(60 * peso);
        const volMax = Math.round(80 * peso);
        const ivRate = Math.round(10 * peso);
        return {
          value: `${volMin} - ${volMax}`,
          unit: 'mL (primeiras 4-6h)',
          interpretation: `Hidratação oral supervisionada: fornecer entre ${volMin} e ${volMax} mL nas primeiras 4 a 6 horas.`,
          recommendation: `Se o paciente apresentar intolerância oral (vômitos/náuseas), iniciar infusão intravenosa rápida com SF 0,9%: ${ivRate} mL/hora por 1 a 2 horas, seguido de reavaliação.`,
          severity: 'medium'
        };
      } else if (grupo === 'C') {
        const volumeExpansao = Math.round(20 * peso);
        return {
          value: volumeExpansao,
          unit: 'mL (em 20 min)',
          interpretation: `Fase de expansão rápida obrigatória: administrar ${volumeExpansao} mL de SF 0,9% IV em 20 minutos.`,
          recommendation: 'Internação hospitalar obrigatória. Repetir expansão rápida até 3 vezes se necessário, avaliando a resposta hemodinâmica após cada etapa. Se refratário, considerar UTI.',
          severity: 'high'
        };
      } else { // Grupo D
        const volumeExpansao = Math.round(20 * peso);
        return {
          value: volumeExpansao,
          unit: 'mL (em 20 min)',
          interpretation: `Expansão de emergência imediata: administrar ${volumeExpansao} mL de SF 0,9 ou Ringer Lactato IV em 20 minutos.`,
          recommendation: 'EMERGÊNCIA COM CHOQUE GRAVE. Repetir infusões rápidas conforme resposta clínica. Acionar leito de UTI e suporte avançado de vida imediatamente.',
          severity: 'critical'
        };
      }
    }
  },
  {
    id: 'meld',
    name: 'MELD Score',
    description: 'Model for End-Stage Liver Disease. Gravidade da doença hepática.',
    category: 'Infectologia / Sepse',
    inputs: [
      { id: 'bilirubin', label: 'Bilirrubina', type: 'number', step: 0.1, unit: 'mg/dL' },
      { id: 'inr', label: 'INR', type: 'number', step: 0.1 },
      { id: 'creatinine', label: 'Creatinina', type: 'number', step: 0.1, unit: 'mg/dL' },
    ],
    calculate: calculateMELD
  },

  // --- PEDIATRIA ---
  westley,
  woodDownes,
  pediatricPercentiles,
  pediatricDose,
  {
    id: 'dose_weight',
    name: 'Dose de Medicação por Peso',
    description: 'Cálculo personalizado de dosagem terapêutica em mg com base no peso e na dose mg/kg formulada.',
    category: 'Pediatria',
    inputs: [
      { id: 'peso', label: 'Peso do paciente', type: 'number', unit: 'kg', min: 1, max: 250, defaultValue: 70 },
      { id: 'dose_mg_kg', label: 'Dose recomendada', type: 'number', unit: 'mg/kg', min: 0.1, max: 500, defaultValue: 15 }
    ],
    calculate: (values) => {
      const peso = parseFloat(values.peso) || 0;
      const dose = parseFloat(values.dose_mg_kg) || 0;
      const total = Math.round(peso * dose * 100) / 100;

      return {
        value: total,
        unit: 'mg',
        interpretation: `Dose terapêutica prescrita ideal calculada em tempo real para um peso de ${peso} kg.`,
        recommendation: `Confirmar compatibilidade e toxicidade da dose de ${total} mg com a função hepática e renal do paciente.`,
        severity: 'low'
      };
    }
  },

  // --- OBSTETRÍCIA ---
  bishop,
  gestationalWeight,

  // --- CLÍNICA GERAL / UTI ---
  harrisBenedict,
  idealWeight,
  bodySurfaceArea,
  burnsRule,
  bradenScale,
  ramsayScale,
  {
    id: 'bmi',
    name: 'IMC (BMI)',
    description: 'Índice de Massa Corporal.',
    category: 'Clínica Geral / UTI',
    inputs: [
      { id: 'weight', label: 'Peso', type: 'number', step: 0.1, unit: 'kg' },
      { id: 'height', label: 'Altura', type: 'number', step: 1, unit: 'cm' },
    ],
    calculate: calculateBMI
  },

  // --- LABORATORIAL / GASOMETRIA ---
  bloodGas,
  anionGap,
  sodiumCorrection,
  calciumCorrection
];

// Cache em nível de módulo (fora de qualquer função)
let calculatorsCache: CalculatorDefinition[] | null = null;
let cacheTimestamp: number = 0;
export const CACHE_TTL_MS = 5000; // 5 segundos de TTL

// Função para invalidar o cache manualmente
export const invalidateCalculatorsCache = (): void => {
  calculatorsCache = null;
  cacheTimestamp = 0;
};

// Helper to save custom calculators
const LOCAL_STORAGE_KEY = 'custom_calculators';

import { db, auth, handleFirestoreError, OperationType, cleanUndefined, isUserAuthAdmin, syncCurrentAdminToFirestore } from './firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';

interface CustomCalcRaw {
  id: string;
  name: string;
  description: string;
  category: string;
  inputs: any[];
  formula?: string;
  lastReviewedAt?: string;
  nextReviewAt?: string;
  reviewStatus?: 'up_to_date' | 'review_due' | 'overdue' | 'under_review';
  reviewNotes?: string;
  reviewedBy?: string;
  reviewPriority?: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
  reviewHistory?: any[];
  customReviewIntervalMonths?: number;
}

let firestoreCalculators: CustomCalcRaw[] = [];
let firestoreCalculatorReviews: any[] = [];
let isSnapshotInitialized = false;

// Start real-time Firestore sync
export const initCalculatorsSync = () => {
  if (isSnapshotInitialized) return;
  isSnapshotInitialized = true;

  onSnapshot(collection(db, 'calculators'), (snapshot) => {
    const list: CustomCalcRaw[] = [];
    snapshot.forEach(doc => {
      list.push(doc.data() as CustomCalcRaw);
    });
    firestoreCalculators = list;
    
    invalidateCalculatorsCache();
    // Dispatch event to notify listeners
    window.dispatchEvent(new CustomEvent('medassist:calculators-updated'));
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'calculators');
  });

  // Snapshot listener for calculator reviews (including static calculators)
  onSnapshot(collection(db, 'calculator_reviews'), (snapshot) => {
    const list: any[] = [];
    snapshot.forEach(doc => {
      list.push(doc.data());
    });
    firestoreCalculatorReviews = list;
    
    invalidateCalculatorsCache();
    window.dispatchEvent(new CustomEvent('medassist:calculators-updated'));
  }, (error) => {
    console.error("Error syncing calculator reviews:", error);
  });
};

initCalculatorsSync();

const getCustomCalculatorsRaw = (): CustomCalcRaw[] => {
  let local: CustomCalcRaw[] = [];
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    local = stored ? JSON.parse(stored) : [];
  } catch (e) {
    local = [];
  }

  const mergedMap = new Map<string, CustomCalcRaw>();
  
  // Local custom calculators
  local.forEach(c => mergedMap.set(c.id, c));
  
  // Firestore sync admin calculators (overwrite matching)
  firestoreCalculators.forEach(c => mergedMap.set(c.id, c));

  return Array.from(mergedMap.values());
};

export const saveCustomCalculator = async (calc: Omit<CalculatorDefinition, 'calculate'> & { formula?: string }) => {
  // If was previously marked as deleted, remove from deleted list
  let deleted: string[] = [];
  try {
    const stored = localStorage.getItem('medassist_deleted_calculators');
    deleted = stored ? JSON.parse(stored) : [];
  } catch (e) {}
  if (deleted.includes(calc.id)) {
    deleted = deleted.filter(d => d !== calc.id);
    localStorage.setItem('medassist_deleted_calculators', JSON.stringify(deleted));
  }

  const existing = getCustomCalculatorsRaw().filter(c => c.id !== calc.id);
  existing.push(calc as CustomCalcRaw);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

  const currentUserRaw = localStorage.getItem('medassist_current_user');
  if (currentUserRaw && auth.currentUser) {
    try {
      const currentUser = JSON.parse(currentUserRaw);
      if (currentUser?.role === 'admin' && isUserAuthAdmin()) {
        await syncCurrentAdminToFirestore();
        await setDoc(doc(db, 'calculators', calc.id), cleanUndefined(calc));
      }
    } catch (e) {
      console.warn("Firestore cloud sync notice in calculators (saved locally):", e);
    }
  }

  invalidateCalculatorsCache();
  window.dispatchEvent(new CustomEvent('medassist:calculators-updated'));
};

export const deleteCalculator = async (id: string): Promise<void> => {
  // Remove from custom calculators
  const existing = getCustomCalculatorsRaw().filter(c => c.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

  // Add to deleted
  let deleted: string[] = [];
  try {
    const stored = localStorage.getItem('medassist_deleted_calculators');
    deleted = stored ? JSON.parse(stored) : [];
  } catch (e) {}
  if (!deleted.includes(id)) {
    deleted.push(id);
    localStorage.setItem('medassist_deleted_calculators', JSON.stringify(deleted));
  }

  // Delete from Firestore
  const currentUserRaw = localStorage.getItem('medassist_current_user');
  if (currentUserRaw && auth.currentUser) {
    try {
      const currentUser = JSON.parse(currentUserRaw);
      if (currentUser?.role === 'admin' && isUserAuthAdmin()) {
        await syncCurrentAdminToFirestore();
        await deleteDoc(doc(db, 'calculators', id));
      }
    } catch (e) {
      console.warn("Firestore cloud sync notice for deleting calculator:", e);
    }
  }

  invalidateCalculatorsCache();
  window.dispatchEvent(new CustomEvent('medassist:calculators-updated'));
};

export const resetCalculatorToDefault = async (id: string): Promise<void> => {
  // Remove from custom calculators
  const existing = getCustomCalculatorsRaw().filter(c => c.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

  let deleted: string[] = [];
  try {
    const stored = localStorage.getItem('medassist_deleted_calculators');
    deleted = stored ? JSON.parse(stored) : [];
  } catch (e) {}
  deleted = deleted.filter(d => d !== id);
  localStorage.setItem('medassist_deleted_calculators', JSON.stringify(deleted));

  // If in firestore, delete the custom override
  const currentUserRaw = localStorage.getItem('medassist_current_user');
  if (currentUserRaw && auth.currentUser) {
    try {
      const currentUser = JSON.parse(currentUserRaw);
      if (currentUser?.role === 'admin' && isUserAuthAdmin()) {
        await syncCurrentAdminToFirestore();
        await deleteDoc(doc(db, 'calculators', id));
      }
    } catch (e) {}
  }

  invalidateCalculatorsCache();
  window.dispatchEvent(new CustomEvent('medassist:calculators-updated'));
};

const CALCULATOR_REVIEWS_STORAGE_KEY = 'medassist_calculator_review_overrides';

// Save review for any calculator (static or custom)
export const saveCalculatorReviewAndSync = async (id: string, reviewedItem: any): Promise<void> => {
  let localReviews: Record<string, any> = {};
  try {
    const stored = localStorage.getItem(CALCULATOR_REVIEWS_STORAGE_KEY);
    localReviews = stored ? JSON.parse(stored) : {};
  } catch (e) {}

  // Extract review fields
  const reviewFields = {
    id,
    lastReviewedAt: reviewedItem.lastReviewedAt,
    nextReviewAt: reviewedItem.nextReviewAt,
    reviewStatus: reviewedItem.reviewStatus,
    reviewNotes: reviewedItem.reviewNotes,
    reviewedBy: reviewedItem.reviewedBy,
    reviewPriority: reviewedItem.reviewPriority,
    createdAt: reviewedItem.createdAt,
    updatedAt: reviewedItem.updatedAt,
    reviewHistory: reviewedItem.reviewHistory
  };

  localReviews[id] = reviewFields;
  localStorage.setItem(CALCULATOR_REVIEWS_STORAGE_KEY, JSON.stringify(localReviews));

  const currentUserRaw = localStorage.getItem('medassist_current_user');
  if (currentUserRaw && auth.currentUser) {
    try {
      const currentUser = JSON.parse(currentUserRaw);
      if (currentUser?.role === 'admin' && isUserAuthAdmin()) {
        await syncCurrentAdminToFirestore();
        const reviewRef = doc(db, 'calculator_reviews', id);
        await setDoc(reviewRef, cleanUndefined(reviewFields));
      }
    } catch (e) {
      console.warn("Firestore cloud sync notice in calculator review (saved locally):", e);
    }
  }

  invalidateCalculatorsCache();
  window.dispatchEvent(new CustomEvent('medassist:calculators-updated'));
};

// Merge function
export const getCalculators = (): CalculatorDefinition[] => {
  const now = Date.now();
  if (calculatorsCache && (now - cacheTimestamp) < CACHE_TTL_MS) {
    return calculatorsCache;
  }

  let deleted: string[] = [];
  try {
    const stored = localStorage.getItem('medassist_deleted_calculators');
    deleted = stored ? JSON.parse(stored) : [];
  } catch (e) {}

  const customRaw = getCustomCalculatorsRaw();
  const customProcessed: CalculatorDefinition[] = customRaw.map(raw => ({
    ...raw,
    calculate: (values: Record<string, any>) => {
      if (!raw.formula) {
        const staticMatch = STATIC_CALCULATORS.find(s => s.id === raw.id);
        if (staticMatch) {
          return staticMatch.calculate(values);
        }
      }
      try {
        const variablesObject: Record<string, number> = {};
        for (const [key, val] of Object.entries(values)) {
          if (typeof val === 'boolean') {
            variablesObject[key] = val ? 1 : 0;
          } else {
            const parsed = parseFloat(val);
            variablesObject[key] = isNaN(parsed) ? 0 : parsed;
          }
        }
        
        const result = math.evaluate(raw.formula || '0', variablesObject);
        const formattedValue = typeof result === 'number'
          ? (Number.isInteger(result) ? result.toString() : result.toFixed(2))
          : String(result);
        
        return {
          value: formattedValue,
          unit: 'pontos/unidade',
          interpretation: 'Calculadora Personalizada',
          recommendation: 'Interpretar conforme critério clínico.',
          severity: 'low'
        };
      } catch (e) {
        return {
          value: 'Erro',
          interpretation: 'Fórmula inválida',
          recommendation: 'Verifique a fórmula da calculadora.',
          severity: 'low'
        };
      }
    }
  }));

  // Fetch reviews merged values
  let localReviews: Record<string, any> = {};
  try {
    const rawLocal = localStorage.getItem(CALCULATOR_REVIEWS_STORAGE_KEY);
    localReviews = rawLocal ? JSON.parse(rawLocal) : {};
  } catch (e) {}

  const finalReviews = { ...localReviews };
  firestoreCalculatorReviews.forEach(fr => {
    finalReviews[fr.id] = fr;
  });

  const map = new Map<string, CalculatorDefinition>();
  STATIC_CALCULATORS.forEach(c => {
    map.set(c.id, c);
  });

  // Custom and overrides take precedence
  customProcessed.forEach(c => {
    const existingStatic = map.get(c.id);
    if (existingStatic && !c.formula) {
      map.set(c.id, {
        ...existingStatic,
        ...c,
        calculate: existingStatic.calculate
      });
    } else {
      map.set(c.id, c);
    }
  });

  const rawCalculatorsList = Array.from(map.values()).filter(c => !deleted.includes(c.id));
  
  calculatorsCache = rawCalculatorsList.map(item => {
    const reviewOverride = finalReviews[item.id] || {};
    const merged = {
      ...item,
      ...reviewOverride
    };
    return migrateItemReviewFields(merged, 'calculator');
  });

  cacheTimestamp = now;
  return calculatorsCache;
};

export const getCalculatorById = (id: string): CalculatorDefinition | undefined => {
  const list = getCalculators();
  let found = list.find(c => c.id === id);
  if (!found) {
    if (id === 'curb65') found = list.find(c => c.id === 'curb-65');
  }
  return found;
};

export const CALCULATORS = getCalculators(); // Initial load export
