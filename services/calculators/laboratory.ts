import { CalculatorDefinition, CalculatorResult } from '../../types';

// 1. Complete Arterial Blood Gas (ABG) Interpretation
export const bloodGas: CalculatorDefinition = {
  id: 'blood-gas',
  name: 'Interpretação de Gasometria Arterial',
  description: 'Análise automática passo a passo de distúrbios do equilíbrio ácido-base (pH, PaCO₂, HCO₃) e nível de oxigenação (Índice de Horowitz / PaO₂/FiO₂).',
  category: 'Laboratorial / Gasometria',
  inputs: [
    { id: 'ph', label: 'pH Arterial', type: 'number', min: 6.5, max: 8.0, defaultValue: 7.4, unit: '', step: 0.01 },
    { id: 'paco2', label: 'Pressão Parcial de CO₂ (PaCO₂)', type: 'number', min: 10, max: 150, defaultValue: 40, unit: 'mmHg' },
    { id: 'hco3', label: 'Bicarbonato sérico (HCO₃⁻)', type: 'number', min: 2, max: 60, defaultValue: 24, unit: 'mEq/L' },
    { id: 'pao2', label: 'Pressão Parcial de Oxigênio (PaO₂)', type: 'number', min: 20, max: 600, defaultValue: 90, unit: 'mmHg' },
    { id: 'fio2', label: 'Fração Inspirada de Oxigênio (FiO₂)', type: 'number', min: 21, max: 100, defaultValue: 21, unit: '% de O₂', step: 1 }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const ph = parseFloat(values.ph);
    const paco2 = parseFloat(values.paco2);
    const hco3 = parseFloat(values.hco3);
    const pao2 = parseFloat(values.pao2);
    const fio2 = parseFloat(values.fio2) || 21;

    if (!ph || !paco2 || !hco3 || !pao2) {
      return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };
    }

    let primaryDisorder = '';
    let compensationText = '';
    let oxygenationText = '';
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

    // 1. Check pH / Acidemia vs Alcalemia
    const isAcidemia = ph < 7.35;
    const isAlcalemia = ph > 7.45;
    const isNormalPh = !isAcidemia && !isAlcalemia;

    // 2. Identify Primary Disturbances
    if (isAcidemia) {
      severity = 'high';
      const metab = hco3 < 22;
      const resp = paco2 > 45;

      if (metab && resp) {
        primaryDisorder = 'ACIDOSE MISTA (Acidose Respiratória + Acidose Metabólica)';
        severity = 'critical';
      } else if (metab) {
        primaryDisorder = 'ACIDOSE METABÓLICA primária';
        // Compensation with Winter's formula
        const expectedPaco2 = (1.5 * hco3) + 8;
        const minPaco2 = expectedPaco2 - 2;
        const maxPaco2 = expectedPaco2 + 2;
        if (paco2 > maxPaco2) {
          compensationText = `Acidose Respiratória associada (PaCO₂ medida ${paco2} > esperada ${Math.round(expectedPaco2)}).`;
          severity = 'critical';
        } else if (paco2 < minPaco2) {
          compensationText = `Alcalose Respiratória compensatória/associada (PaCO₂ medida ${paco2} < esperada ${Math.round(expectedPaco2)}).`;
        } else {
          compensationText = `Acidose Metabólica adequadamente compensada (PaCO₂ esperada: ${Math.round(minPaco2)}-${Math.round(maxPaco2)}).`;
        }
      } else if (resp) {
        primaryDisorder = 'ACIDOSE RESPIRATÓRIA primária';
        compensationText = 'Avaliar cronicidade. Na acidose respiratória aguda, o bicarbonato aumenta ~1 mEq/L a cada 10 mmHg de aumento de PaCO₂. Na crônica, o aumento é de ~3.5 mEq/L.';
      } else {
        primaryDisorder = 'Acidemia Indeterminada';
      }
    } else if (isAlcalemia) {
      severity = 'high';
      const metab = hco3 > 26;
      const resp = paco2 < 35;

      if (metab && resp) {
        primaryDisorder = 'ALCALOSE MISTA (Alcalose Respiratória + Alcalose Metabólica)';
        severity = 'critical';
      } else if (metab) {
        primaryDisorder = 'ALCALOSE METABÓLICA primária';
        // Compensation expected Paco2 = hco3 + 15
        const expPaco2 = hco3 + 15;
        if (paco2 > expPaco2 + 2) {
          compensationText = `Acidose Respiratória associada (PaCO₂ medida ${paco2} > esperada ${Math.round(expPaco2)}).`;
          severity = 'critical';
        } else if (paco2 < expPaco2 - 2) {
          compensationText = `Alcalose Respiratória associada (PaCO₂ medida ${paco2} < esperada ${Math.round(expPaco2)}).`;
        } else {
          compensationText = `Alcalose Metabólica compensada (PaCO₂ esperada: ${Math.round(expPaco2 - 2)}-${Math.round(expPaco2 + 2)}).`;
        }
      } else if (resp) {
        primaryDisorder = 'ALCALOSE RESPIRATÓRIA primária';
        compensationText = 'Na alcalose respiratória aguda, o bicarbonato cai ~2 mEq/L a cada 10 mmHg de redução de PaCO₂. Na crônica, a queda esperada é de ~5 mEq/L.';
      } else {
        primaryDisorder = 'Alcalemia Indeterminada';
      }
    } else {
      // Normal pH with compensation/mixed.
      const hasMetabAcid = hco3 < 22;
      const hasMetabAlcal = hco3 > 26;
      const hasRespAcid = paco2 > 45;
      const hasRespAlcal = paco2 < 35;

      if (hasMetabAcid && hasRespAlcal) {
        primaryDisorder = 'DISTÚRBIO MISTO: Acidose Metabólica + Alcalose Respiratória Compensados';
        severity = 'medium';
      } else if (hasMetabAlcal && hasRespAcid) {
        primaryDisorder = 'DISTÚRBIO MISTO: Alcalose Metabólica + Acidose Respiratória Crônica Compensados';
        severity = 'medium';
      } else if (!hasMetabAcid && !hasMetabAlcal && !hasRespAcid && !hasRespAlcal) {
        primaryDisorder = 'EQUILÍBRIO ÁCIDO-BASE FISIOLÓGICO/NORMAL';
        severity = 'low';
      } else {
        primaryDisorder = 'Gasometria com distúrbios leves compensados';
        severity = 'low';
      }
    }

    // 3. Oxygenation (Ratio PaO2/FiO2)
    const horowitz = pao2 / (fio2 / 100);
    const roundedHorowitz = Math.round(horowitz);

    if (roundedHorowitz >= 400) {
      oxygenationText = `Índice PaO₂/FiO₂: ${roundedHorowitz} (Oxigenação Normal)`;
    } else if (roundedHorowitz >= 300) {
      oxygenationText = `Índice PaO₂/FiO₂: ${roundedHorowitz} (Hipoxemia leve)`;
      if (severity === 'low') severity = 'medium';
    } else if (roundedHorowitz >= 200) {
      oxygenationText = `Índice PaO₂/FiO₂: ${roundedHorowitz} (Hipoxemia Moderada / Lesão Pulmonar Aguda)`;
      severity = 'high';
    } else {
      oxygenationText = `Índice PaO₂/FiO₂: ${roundedHorowitz} (Hipoxemia Severa / SRAG)`;
      severity = 'critical';
    }

    const valueStr = `${ph} / ${paco2} / ${hco3}`;
    const fullInterpret = `${primaryDisorder}. ${compensationText} ${oxygenationText}`;

    let rec = 'Correlacionar sempre com a clínica, comorbidades e eletrólitos séricos.';
    if (severity === 'critical') {
      rec = 'Sinalização crítica! Corrigir e ventilar de forma protetora se em tubo orotraqueal. Avaliar distúrbios metabólicos profundos (lactato, cetonas, nefropatia) ou mecânica respiratória imediata.';
    } else if (severity === 'high') {
      rec = 'Distúrbio ácido-base ou oxigenação moderada a grave. Corrigir foco do problema orgânico de base.';
    }

    return {
      value: valueStr,
      unit: 'pH/PaCO2/HCO3',
      interpretation: fullInterpret,
      recommendation: rec,
      severity
    };
  }
};

// 2. Anion Gap and Delta Ratio / Delta-Delta
export const anionGap: CalculatorDefinition = {
  id: 'anion-gap',
  name: 'Ânion Gap e Delta-Delta',
  description: 'Avalia a presença de ânions não-medidos na acidose metabólica e identifica distúrbios metabólicos adicionais sobrepostos através do Delta Ratio.',
  category: 'Laboratorial / Gasometria',
  inputs: [
    { id: 'sodium', label: 'Sódio Sérico (Na⁺)', type: 'number', min: 100, max: 180, defaultValue: 140, unit: 'mEq/L' },
    { id: 'chloride', label: 'Cloro Sérico (Cl⁻)', type: 'number', min: 50, max: 150, defaultValue: 104, unit: 'mEq/L' },
    { id: 'bicarbonate', label: 'Bicarbonato (HCO₃⁻)', type: 'number', min: 2, max: 50, defaultValue: 15, unit: 'mEq/L' },
    { id: 'albumin', label: 'Albumina Sérica (Opcional - Corrige o AG)', type: 'number', min: 1.0, max: 6.0, defaultValue: 4.0, unit: 'g/dL', step: 0.1 }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const na = parseFloat(values.sodium);
    const cl = parseFloat(values.chloride);
    const hco3 = parseFloat(values.bicarbonate);
    const alb = parseFloat(values.albumin) || 4.0;

    if (!na || !cl || !hco3) {
      return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };
    }

    // AG = Na - (Cl + HCO3)
    let ag = na - (cl + hco3);
    
    // Correct for Albumin: AG corrected = AG + 2.5 * (4.0 - alb)
    let agCorr = ag + (2.5 * (4.0 - alb));
    
    const roundedAG = Math.round(ag * 10) / 10;
    const roundedAGCorr = Math.round(agCorr * 10) / 10;

    let interpret = `Ânion Gap: ${roundedAG} mEq/L (Corrigido pela Albumina: ${roundedAGCorr} mEq/L). `;
    let rec = '';
    let severity: 'low' | 'medium' | 'high' = 'low';

    // Normal AG is 8 to 12.
    if (roundedAGCorr > 12) {
      severity = 'high';
      interpret += 'Elevado (>12). ';
      
      // Calculate Delta Ratio = (AG_measured - 12) / (24 - HCO3)
      const deltaAG = roundedAGCorr - 12;
      const deltaHCO3 = 24 - hco3;
      
      if (deltaHCO3 > 0) {
        const deltaDelta = deltaAG / deltaHCO3;
        const roundedDelta = Math.round(deltaDelta * 100) / 100;
        
        interpret += `Delta-Delta: ${roundedDelta}. `;
        
        if (roundedDelta < 0.4) {
          interpret += '(Acidose metabólica hiperclorêmica de AG normal associada)';
          rec = 'Sugere acidose mista de AG elevado + AG normal (ex: acidose lática associada a perdas gastrintestinais de bicarbonato ou acidose tubular renal).';
        } else if (roundedDelta >= 0.4 && roundedDelta <= 0.8) {
          interpret += '(Acidose mista acidose metabólica de AG elevado + acidose metabólica normoclorêmica de AG normal)';
        } else if (roundedDelta > 0.8 && roundedDelta <= 1.25) {
          interpret += '(Acidose metabólica pura de Ânion Gap Elevado)';
          rec = 'Distúrbio típico purificado de AG elevado. Principais causas (MUDPILES): Uremia terminal, Cetoacidose (diabética, alcoólica, por jejum), Acidose lática (choque hipovolêmico/séptico), substâncias tóxicas (salicilatos, metanol, etilenoglicol).';
        } else if (roundedDelta > 1.25 && roundedDelta <= 2.0) {
          interpret += '(Alcalose metabólica associada ou acidose respiratória crônica compensada)';
          rec = 'Sugere retenção de bicarbonato pré-existente ou concomitante (ex: paciente com vômitos constantes ou em uso de diuréticos de alça).';
        } else {
          interpret += '(Alcalose metabólica expressiva associada)';
          rec = 'Aumento de bicarbonato concomitante muito expressivo.';
        }
      }
    } else {
      interpret += 'Normal (8 a 12 mEq/L). ';
      rec = 'Acidose metabólica com Ânion Gap Normal (também chamada de hiperclorêmica). Causas comuns incluem perdas digestivas abundantes de bicarbonato (diarreia) ou Acidose Tubular Renal (ATR).';
      severity = 'medium';
    }

    return {
      value: roundedAGCorr,
      unit: 'mEq/L',
      interpretation: interpret,
      recommendation: rec,
      severity
    };
  }
};

// 3. Sódio Corrigido pela Glicemia / Correção de Sódio
export const sodiumCorrection: CalculatorDefinition = {
  id: 'sodium-correction',
  name: 'Correção de Sódio pela Glicemia',
  description: 'Corrige o nível aferido de Sódio sérico na vigência de Hiperglicemia acentuada (Estado Mixado / Hiperosmolar).',
  category: 'Laboratorial / Gasometria',
  inputs: [
    { id: 'sodium', label: 'Sódio Sérico Medido', type: 'number', min: 100, max: 180, defaultValue: 130, unit: 'mEq/L' },
    { id: 'glucose', label: 'Glicemia medida', type: 'number', min: 50, max: 1500, defaultValue: 400, unit: 'mg/dL' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const na = parseFloat(values.sodium);
    const glc = parseFloat(values.glucose);

    if (!na || !glc) {
      return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };
    }

    if (glc <= 100) {
      return {
        value: na,
        unit: 'mEq/L',
        interpretation: `Sódio corrigido: ${na} mEq/L. Glicemia normal ou baixa não requer correção do sódio sérico.`,
        recommendation: '',
        severity: 'low'
      };
    }

    // Formula: Na corrected = Na + 1.6 * ((Glicemia - 100) / 100)
    // For glucose > 400 mg/dL some use 2.4, but standard 1.6 is universally accepted.
    const correctionFactor = 1.6;
    const finalNa = na + correctionFactor * ((glc - 100) / 100);
    const rounded = Math.round(finalNa * 10) / 10;

    return {
      value: rounded,
      unit: 'mEq/L',
      interpretation: `Sódio Corrigido real estimado: ${rounded} mEq/L`,
      recommendation: 'A hiperglicemia severa exerce força osmótica que desloca a água intracelular para fora, diluindo artificialmente o sódio plasmático (pseudohiponatremia). O valor corrigido reflete o real status da concentração iônica corporal do paciente.',
      severity: 'low'
    };
  }
};

// 4. Cálcio Corrigido pela Albumina
export const calciumCorrection: CalculatorDefinition = {
  id: 'calcium-correction',
  name: 'Correção de Cálcio pela Albumina',
  description: 'Calcula o valor real do Cálcio total fisiológico na vigência de hipoalbuminemia séria.',
  category: 'Laboratorial / Gasometria',
  inputs: [
    { id: 'calcium', label: 'Cálcio Total Medido', type: 'number', min: 4.0, max: 18.0, defaultValue: 7.5, unit: 'mg/dL', step: 0.1 },
    { id: 'albumin', label: 'Albumina Sérica', type: 'number', min: 1.0, max: 6.0, defaultValue: 2.5, unit: 'g/dL', step: 0.1 }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const ca = parseFloat(values.calcium);
    const alb = parseFloat(values.albumin);

    if (!ca || !alb) {
      return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };
    }

    if (alb >= 4.0) {
      return {
        value: ca,
        unit: 'mg/dL',
        interpretation: `Cálcio corrigido: ${ca} mg/dL (Albumina normal, sem necessidade de correção aritmética).`,
        recommendation: 'Valores normais de Cálcio Total estão na faixa entre 8.5 a 10.2 mg/dL.',
        severity: 'low'
      };
    }

    // Ca corrected = Ca measured + 0.8 * (4.0 - Albumin)
    const correctedCa = ca + (0.8 * (4.0 - alb));
    const rounded = Math.round(correctedCa * 10) / 10;

    let interpret = `Cálcio Corrigido: ${rounded} mg/dL. `;
    let recommendation = '';
    let severity: 'low' | 'medium' | 'high' = 'low';

    if (rounded < 8.5) {
      interpret += '(Hipocalcemia fisiológica persistente)';
      recommendation = 'Confirmar se há hipocalcemia verdadeira dosando o Cálcio Iônico livre (que não depende de carreadores proteicos). Investigar e repor deficiência de Vitamina D, hipoparatiroidismo ou repor gluconato de cálcio se sintomático (sinal de Chvostek/Trousseau positivo).';
      severity = 'medium';
    } else if (rounded > 10.2) {
      interpret += '(Hipercalcemia fisiológica real ocultada)';
      recommendation = 'Indica hipercalcemia verdadeira que estava mascarada pela hipoalbuminemia. Investigar causas como hiperparatiroidismo primário ou neoplasia oculta.';
      severity = 'high';
    } else {
      interpret += '(Cálcio livre na faixa da normalidade)';
      recommendation = 'O cálcio ionicamente ativo está adequado apesar da baixa geral do cálcio medido original. Nenhuma reposição de cálcio é requerida no momento.';
      severity = 'low';
    }

    return {
      value: rounded,
      unit: 'mg/dL',
      interpretation: interpret,
      recommendation,
      severity
    };
  }
};
