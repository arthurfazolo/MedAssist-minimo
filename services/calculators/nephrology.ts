import { CalculatorDefinition, CalculatorResult } from '../../types';

// 1. FENa (Fração de Excreção de Sódio)
export const fena: CalculatorDefinition = {
  id: 'fena',
  name: 'FENa (Fração de Excreção de Sódio)',
  description: 'Diferencia causas pré-renais e renais intrínsecas de Lesão Renal Aguda (LRA) em pacientes com oligúria.',
  category: 'Nefrologia / Eletrólitos',
  inputs: [
    { id: 'urinary_na', label: 'Sódio Urinário (uNa)', type: 'number', min: 0, max: 200, defaultValue: 40, unit: 'mEq/L' },
    { id: 'serum_na', label: 'Sódio Sérico (sNa)', type: 'number', min: 100, max: 180, defaultValue: 140, unit: 'mEq/L' },
    { id: 'urinary_creatinine', label: 'Creatinina Urinária (uCr)', type: 'number', min: 10, max: 500, defaultValue: 100, unit: 'mg/dL' },
    { id: 'serum_creatinine', label: 'Creatinina Sérica (sCr)', type: 'number', min: 0.1, max: 20, defaultValue: 1.5, unit: 'mg/dL' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const uNa = parseFloat(values.urinary_na);
    const sNa = parseFloat(values.serum_na);
    const uCr = parseFloat(values.urinary_creatinine);
    const sCr = parseFloat(values.serum_creatinine);

    if (!uNa || !sNa || !uCr || !sCr) {
      return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };
    }

    // FENa (%) = ((uNa * sCr) / (sNa * uCr)) * 100
    const fenaVal = ((uNa * sCr) / (sNa * uCr)) * 100;
    const rounded = Math.round(fenaVal * 100) / 100;

    let interpret = '';
    let recommendation = '';
    let severity: 'low' | 'medium' | 'high' = 'low';

    if (rounded < 1) {
      interpret = `FENa: ${rounded}% - Causa Pré-Renal (Hipovolemia / Desidratação)`;
      recommendation = 'Sugere hipoperfusão renal (rim retém sódio avidamente para reidratar). Considerar reposição volêmica ou melhoria da hemodinâmica renal. Atenção: pode ser <1% na nefropatia por contraste, LRA por pigmentos rhabdomiólise e glomerulonefrite aguda.';
      severity = 'medium';
    } else if (rounded >= 1 && rounded <= 2) {
      interpret = `FENa: ${rounded}% - Causa Indeterminada`;
      recommendation = 'Zona cinzenta clínica. Avaliar com outros parâmetros como ureia/creatinina sérica, sedimento urinário ou fração de excreção de ureia (FEUreia), que é mais útil em pacientes usando diuréticos.';
      severity = 'low';
    } else {
      interpret = `FENa: ${rounded}% - Causa Renal Intrínseca (Necrose Tubular Aguda)`;
      recommendation = 'Sugere disfunção tubular renal crônica ou aguda (incapacidade de reabsorver sódio). Provável Necrose Tubular Aguda (NTA), nefrite intersticial ou obstrução renal estabelecida. Indispensável ajustar doses de nefrotóxicos e manter hidratação fisiológica controlada.';
      severity = 'high';
    }

    return {
      value: rounded,
      unit: '%',
      interpretation: interpret,
      recommendation,
      severity
    };
  }
};

// 2. Osmolaridade Plasmática e Gap Osmolar
export const plasmOsm: CalculatorDefinition = {
  id: 'plasmatic-osmolarity',
  name: 'Osmolaridade Plasmática e Gap Osmolar',
  description: 'Calcula a osmolaridade plasmática calculada e avalia a presença de substâncias osmoticamente ativas não-medidas (Gap Osmolar) no sangue.',
  category: 'Nefrologia / Eletrólitos',
  inputs: [
    { id: 'serum_na', label: 'Sódio Sérico (Na⁺)', type: 'number', min: 100, max: 180, defaultValue: 140, unit: 'mEq/L' },
    { id: 'glucose', label: 'Glicemia', type: 'number', min: 10, max: 1200, defaultValue: 90, unit: 'mg/dL' },
    { id: 'urea', label: 'Ureia Séria', type: 'number', min: 5, max: 400, defaultValue: 30, unit: 'mg/dL' },
    { id: 'ethanol', label: 'Etanol Sérico (Opcional)', type: 'number', min: 0, max: 500, defaultValue: 0, unit: 'mg/dL' },
    { id: 'measured_osm', label: 'Osmolaridade Medida em laboratório (Opcional)', type: 'number', min: 0, max: 500, defaultValue: 0, unit: 'mOsm/kg' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const na = parseFloat(values.serum_na);
    const glc = parseFloat(values.glucose);
    const urea = parseFloat(values.urea);
    const eth = parseFloat(values.ethanol) || 0;
    const measured = parseFloat(values.measured_osm) || 0;

    if (!na || !glc || !urea) {
      return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };
    }

    // Formula: Osm = (2 * Na) + (Glicose / 18) + (Ureia / 6) [+ Etanol / 4.6 se fornecido em mg/dL]
    let calculated = (2 * na) + (glc / 18) + (urea / 6);
    if (eth > 0) {
      calculated += (eth / 4.6);
    }
    const roundedCalculated = Math.round(calculated * 10) / 10;

    let interpret = `Osmolaridade calculada: ${roundedCalculated} mOsm/kg.`;
    let rec = 'Valores normais de referência da osmolaridade plasmática são de ~275 a 295 mOsm/kg.';
    let severity: 'low' | 'medium' | 'high' = 'low';

    if (measured > 0) {
      const gap = measured - roundedCalculated;
      const roundedGap = Math.round(gap * 10) / 10;
      
      interpret += ` Gap Osmolar: ${roundedGap} mOsm/kg.`;
      
      if (roundedGap > 10) {
        interpret += ` (ELEVADO > 10)`;
        rec = 'Presença provável de solventes / osmois não-medidos na amostra sanguínea, como Metanol, Etilenoglicol, Isopropanol ou intoxicação severa por Etanol. Requer investigação toxicológica emergencial e tratamento de apoio.';
        severity = 'high';
      } else {
        interpret += ` (Normal ≤ 10)`;
        rec = 'Gap osmolar dentro do fisiológico esperado. Sem suspeita analítica de intoxicação por álcoois não-identificados.';
        severity = 'low';
      }
    }

    return {
      value: roundedCalculated,
      unit: 'mOsm/kg',
      interpretation: interpret,
      recommendation: rec,
      severity
    };
  }
};

// 3. Déficit de Sódio (Hiponatremia)
export const sodiumDeficit: CalculatorDefinition = {
  id: 'sodium-deficit',
  name: 'Déficit de Sódio (Hiponatremia)',
  description: 'Calcula o déficit absoluto de sódio total (mEq) e o volume necessário para a taxa inicial sugerida de reposição (com solução hipertônica NaCl 3%).',
  category: 'Nefrologia / Eletrólitos',
  inputs: [
    { id: 'current_na', label: 'Sódio Sérico Atual (mEq/L)', type: 'number', min: 90, max: 140, defaultValue: 120, unit: 'mEq/L' },
    { id: 'target_na', label: 'Sódio Sérico Alvo desejado (mEq/L)', type: 'number', min: 100, max: 145, defaultValue: 128, unit: 'mEq/L' },
    { id: 'weight', label: 'Peso Atual do Paciente', type: 'number', min: 10, max: 200, defaultValue: 70, unit: 'kg' },
    { id: 'patient_type', label: 'Perfil de Idade/Sexo (Água Corporal)', type: 'select', options: [
      { label: 'Homem Jovem (Fator ACT 0.60)', value: '0.6' },
      { label: 'Homem Idoso (Fator ACT 0.50)', value: '0.5_m' },
      { label: 'Mulher Jovem (Fator ACT 0.50)', value: '0.5_f' },
      { label: 'Mulher Idosa (Fator ACT 0.45)', value: '0.45' }
    ], defaultValue: '0.6' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const curNa = parseFloat(values.current_na);
    const tarNa = parseFloat(values.target_na);
    const weight = parseFloat(values.weight);
    const typeStr = values.patient_type || '0.6';

    if (!curNa || !tarNa || !weight) {
      return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };
    }

    let factor = 0.6;
    if (typeStr === '0.6') factor = 0.6;
    else if (typeStr === '0.5_m' || typeStr === '0.5_f') factor = 0.5;
    else if (typeStr === '0.45') factor = 0.45;

    if (tarNa <= curNa) {
      return {
        value: 0,
        interpretation: 'O sódio alvo deve ser superior ao sódio atual para haver cálculo de reposição corretivo.',
        recommendation: '',
        severity: 'low'
      };
    }

    const diff = tarNa - curNa;
    if (diff > 10) {
      // Warn user: limit rate of correction in 24h
    }

    // ACT = peso * factor
    const act = weight * factor;
    // Deficit = ACT * (target - current)
    const deficitAndmEq = act * diff;
    const roundedDeficit = Math.round(deficitAndmEq);

    // mL of NaCl 3% (NaCl 3% has 513 mEq Sódio por Litro => 0.513 mEq/mL)
    const nacl3percentVolumeMl = Math.round(deficitAndmEq / 0.513);

    let interpret = `Déficit calculado: ~${roundedDeficit} mEq de Sódio.`;
    let rec = `Requer aproximadamente ${nacl3percentVolumeMl} mL de NaCl a 3% para repor. `;

    if (diff > 8) {
      rec += ' CUIDADO: Evitar elevação do sódio acima de 8 a 10 mEq/L em 24h (para prevenir a Síndrome de Desmielinização Osmótica - mielinólise pontina). Considerar repor apenas parte desta quantidade nas primeiras 24h.';
    } else {
      rec += ' Reposição deve ser feita sob monitoramento rigoroso em ambiente hospitalar, controlando eletrólitos de 4/4h ou de 6/6h.';
    }

    return {
      value: roundedDeficit,
      unit: 'mEq de Sódio',
      interpretation: interpret,
      recommendation: rec,
      severity: diff > 8 ? 'high' : 'medium'
    };
  }
};

// 4. Déficit de Água Livre (Hipernatremia)
export const freeWaterDeficit: CalculatorDefinition = {
  id: 'free-water-deficit',
  name: 'Déficit de Água Livre (Hipernatremia)',
  description: 'Calcula o volume absoluto de água livre (em Litros) necessários para corrigir hipernatremia com segurança.',
  category: 'Nefrologia / Eletrólitos',
  inputs: [
    { id: 'current_na', label: 'Sódio Sérico Atual (mEq/L)', type: 'number', min: 140, max: 200, defaultValue: 160, unit: 'mEq/L' },
    { id: 'target_na', label: 'Sódio Sérico Alvo desejado (mEq/L)', type: 'number', min: 135, max: 155, defaultValue: 140, unit: 'mEq/L' },
    { id: 'weight', label: 'Peso Atual do Paciente', type: 'number', min: 10, max: 200, defaultValue: 70, unit: 'kg' },
    { id: 'patient_type', label: 'Perfil de Idade/Sexo (ACT)', type: 'select', options: [
      { label: 'Homem Jovem (Fator ACT 0.60)', value: '0.6' },
      { label: 'Homem Idoso (Fator ACT 0.50)', value: '0.5_m' },
      { label: 'Mulher Jovem (Fator ACT 0.50)', value: '0.5_f' },
      { label: 'Mulher Idosa (Fator ACT 0.45)', value: '0.45' }
    ], defaultValue: '0.6' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const curNa = parseFloat(values.current_na);
    const tarNa = parseFloat(values.target_na);
    const weight = parseFloat(values.weight);
    const typeStr = values.patient_type || '0.6';

    if (!curNa || !tarNa || !weight) {
      return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };
    }

    if (tarNa >= curNa) {
      return { value: 0, interpretation: 'O sódio alvo deve ser menor que o sódio atual na hipernatremia.', recommendation: '', severity: 'low' };
    }

    let factor = 0.6;
    if (typeStr === '0.6') factor = 0.6;
    else if (typeStr === '0.5_m' || typeStr === '0.5_f') factor = 0.5;
    else if (typeStr === '0.45') factor = 0.45;

    const act = weight * factor;
    // Formula: Deficit Agua = ACT * ((sNa / Na_Alvo) - 1)
    const deficitLitres = act * ((curNa / tarNa) - 1);
    const roundedLitres = Math.round(deficitLitres * 100) / 100;

    const speed = (curNa - tarNa) > 10 ? 'Reduzir sódio no máximo 10 mEq/L nas primeiras 24 horas.' : 'Correção em 24-48 horas.';

    return {
      value: roundedLitres,
      unit: 'Litros de Água Livre',
      interpretation: `Déficit de água livre estimado: ~${roundedLitres} Litros.`,
      recommendation: `Repor volume calculado por via enteral (água livre via sonda nasogástrica) ou por via endovenosa utilizando Soro Glicosado (SG) 5%. Alerta: ${speed} Redução rápida pode acarretar edema cerebral severo e convulsões.`,
      severity: (curNa - tarNa) > 10 ? 'high' : 'medium'
    };
  }
};

// 5. Déficit de Potássio
export const potassiumDeficit: CalculatorDefinition = {
  id: 'potassium-deficit',
  name: 'Déficit de Potássio',
  description: 'Estima o déficit aproximado do estoque corporal e exibe orientações para a taxa segura de infusão mineral.',
  category: 'Nefrologia / Eletrólitos',
  inputs: [
    { id: 'current_k', label: 'Potássio Sérico Atual (mEq/L)', type: 'number', min: 1.0, max: 4.5, defaultValue: 3.0, unit: 'mEq/L', step: 0.1 },
    { id: 'target_k', label: 'Potássio Sérico Alvo desejado (mEq/L)', type: 'number', min: 3.0, max: 5.5, defaultValue: 4.0, unit: 'mEq/L', step: 0.1 },
    { id: 'weight', label: 'Peso Atual do Paciente (kg)', type: 'number', min: 10, max: 200, defaultValue: 70, unit: 'kg' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const curK = parseFloat(values.current_k);
    const tarK = parseFloat(values.target_k);
    const weight = parseFloat(values.weight);

    if (!curK || !tarK || !weight) {
      return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };
    }

    if (tarK <= curK) {
      return { value: 0, interpretation: 'Potássio alvo deve ser maior que o potássio atual.', recommendation: '', severity: 'low' };
    }

    // Standard clinical approximation: deficit K = (K_target - K_current) * weight * 0.4
    const deficitValue = (tarK - curK) * weight * 0.4;
    const roundedDeficit = Math.round(deficitValue);

    let interpret = `Déficit estimado de Potássio: ~${roundedDeficit} mEq corporal total.`;
    let severity: 'low' | 'medium' | 'high' = 'low';
    let recommendation = '';

    if (curK < 2.5) {
      severity = 'high';
      recommendation = `Hipocalemia grave! Reposição preferencialmente por via endovenosa contínua com monitoramento ECG constante. Velocidade máx: 10-20 mEq/hora. Evitar diluições superiores a 40 mEq/L em veias periféricas (dor/flebite). Utilizar acesso venoso profundo.`;
    } else if (curK < 3.5) {
      severity = 'medium';
      recommendation = `Hipocalemia leve a moderada. Preferir reposição por via oral (cloreto de potássio xarope ou comprimidos), que é clinicamente mais segura. Se reposição EV necessária, limitar velocidade a 10 mEq/h.`;
    } else {
      severity = 'low';
      recommendation = `Nível limítrofe adequado. Reposição rápida dispensável. Aconselhável incremento dietético ou manutenção fisiológica leve se necessário.`;
    }

    return {
      value: roundedDeficit,
      unit: 'mEq de Potássio',
      interpretation: interpret,
      recommendation,
      severity
    };
  }
};
