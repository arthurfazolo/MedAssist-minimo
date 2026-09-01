import { CalculatorDefinition, CalculatorResult } from '../../types';

// 1. Bishop Score
export const bishop: CalculatorDefinition = {
  id: 'bishop',
  name: 'Escore de Bishop',
  description: 'Avalia a maturidade cervical do colo uterino para prever o sucesso da indução do parto vaginal.',
  category: 'Obstetrícia',
  inputs: [
    { id: 'dilation', label: '1. Dilatação do Colo Uterino', type: 'select', options: [
      { label: 'Fechado (0 pontos)', value: '0' },
      { label: '1 - 2 cm (1 ponto)', value: '1' },
      { label: '3 - 4 cm (2 pontos)', value: '2' },
      { label: '≥ 5 cm (3 pontos)', value: '3' }
    ], defaultValue: '0' },
    { id: 'effacement', label: '2. Apagamento (Encurtamento do colo)', type: 'select', options: [
      { label: '0 - 30% (Colo grosso) (0 pontos)', value: '0' },
      { label: '40 - 50% (1 ponto)', value: '1' },
      { label: '60 - 70% (2 pontos)', value: '2' },
      { label: '≥ 80% (Colo fino/completamente apagado) (3 pontos)', value: '3' }
    ], defaultValue: '0' },
    { id: 'consistency', label: '3. Consistência do Colo', type: 'select', options: [
      { label: 'Firme (como a ponta do nariz) (0 pontos)', value: '0' },
      { label: 'Média (como o lábio) (1 ponto)', value: '1' },
      { label: 'Macia (como o interior da bochecha) (2 pontos)', value: '2' }
    ], defaultValue: '0' },
    { id: 'position', label: '4. Posição do Colo Uterino', type: 'select', options: [
      { label: 'Posterior (0 pontos)', value: '0' },
      { label: 'Média (1 ponto)', value: '1' },
      { label: 'Anterior (2 pontos)', value: '2' }
    ], defaultValue: '0' },
    { id: 'station', label: '5. Altura do Apresentação (Estágios de De Lee)', type: 'select', options: [
      { label: '-3 cm (Plano móvel alto) (0 pontos)', value: '0' },
      { label: '-2 cm (1 ponto)', value: '1' },
      { label: '-1 ou 0 cm (Plano fixado/espinhas ciáticas) (2 pontos)', value: '2' },
      { label: '+1 ou +2 cm (Baixo e insinuado) (3 pontos)', value: '3' }
    ], defaultValue: '0' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    let score = 0;
    score += parseInt(values.dilation || '0', 10);
    score += parseInt(values.effacement || '0', 10);
    score += parseInt(values.consistency || '0', 10);
    score += parseInt(values.position || '0', 10);
    score += parseInt(values.station || '0', 10);

    let interpret = '';
    let recommendation = '';
    let severity: 'low' | 'medium' | 'high' = 'low';

    if (score >= 8) {
      interpret = `Escore ${score}: Colo Favorável / Maduro`;
      recommendation = 'Alta probabilidade de indução bem-sucedida de forma fisiológica. O método de escolha preferencial é Amniotomia associada à infusão intravenosa contínua de Ocitocina convencional.';
      severity = 'low';
    } else if (score >= 6) {
      interpret = `Escore ${score}: Colo Intermediário`;
      recommendation = 'Zona de transição. Individualizar conduta. Se parto não-urgente, pode-se tentar indução com Ocitocina direta ou iniciar maturação cervical prévia com foley/análogos da prostaglandina.';
      severity = 'medium';
    } else {
      interpret = `Escore ${score}: Colo Desfavorável / Imaturo`;
      recommendation = 'Baixa chance de parto vaginal direto por indução simples com ocitocina (risco de falha de indução e cesariana). Recomenda-se maturação cervical mecânica (sonda de Foley transcervical) ou maturação hormonal utilizando análogos de Prostaglandina (Misoprostol vaginal purificado, respeitando rigorosamente contraindicações como cicatriz uterina/cesárea prévia).';
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

// 2. Gestational Weight Gain (IOM)
export const gestationalWeight: CalculatorDefinition = {
  id: 'gestational-weight-gain',
  name: 'Ganho de Peso Gestacional (IOM)',
  description: 'Calcula o ganho de peso atual na gestação e compara com as recomendações de saúde do Institute of Medicine (IOM) com base no IMC pré-gestacional.',
  category: 'Obstetrícia',
  inputs: [
    { id: 'pre_pregnancy_weight', label: 'Peso Pré-Gestacional (kg)', type: 'number', min: 30, max: 200, defaultValue: 60, unit: 'kg' },
    { id: 'height', label: 'Altura da Gestante', type: 'number', min: 100, max: 220, defaultValue: 165, unit: 'cm' },
    { id: 'current_weight', label: 'Peso Atual do Atendimento (kg)', type: 'number', min: 30, max: 250, defaultValue: 67, unit: 'kg' },
    { id: 'weeks', label: 'Semanas de Gestação', type: 'number', min: 1, max: 42, defaultValue: 24, unit: 'semanas' }
  ],
  calculate: (values: Record<string, any>): CalculatorResult => {
    const preW = parseFloat(values.pre_pregnancy_weight);
    const heightCm = parseFloat(values.height);
    const curW = parseFloat(values.current_weight);
    const weeks = parseFloat(values.weeks);

    if (!preW || !heightCm || !curW || !weeks) {
      return { value: 0, interpretation: 'Aguardando dados...', recommendation: '', severity: 'low' };
    }

    const heightM = heightCm / 100;
    const preIomBmi = preW / (heightM * heightM);
    const roundedBmi = Math.round(preIomBmi * 10) / 10;
    const gain = curW - preW;
    const roundedGain = Math.round(gain * 10) / 10;

    let bmiCategory = '';
    let minGainExpected = 0;
    let maxGainExpected = 0;

    if (roundedBmi < 18.5) {
      bmiCategory = 'Baixo Peso';
      // IOM targets: 12.5 to 18 kg total gain.
      // Expected progression: ~0.51 kg/week after week 12 (assuming 1.5kg gain in trimester 1)
      minGainExpected = 1.5 + (Math.max(0, weeks - 12) * 0.44);
      maxGainExpected = 2.0 + (Math.max(0, weeks - 12) * 0.58);
    } else if (roundedBmi < 25.0) {
      bmiCategory = 'Peso Adequado';
      // IOM targets: 11.5 to 16 kg total gain.
      // Progression: ~0.42 kg/week after week 12
      minGainExpected = 1.0 + (Math.max(0, weeks - 12) * 0.35);
      maxGainExpected = 1.5 + (Math.max(0, weeks - 12) * 0.50);
    } else if (roundedBmi < 30.0) {
      bmiCategory = 'Sobrepeso';
      // IOM targets: 7.0 to 11.5 kg total gain.
      // Progression: ~0.28 kg/week after week 12
      minGainExpected = 0.8 + (Math.max(0, weeks - 12) * 0.23);
      maxGainExpected = 1.2 + (Math.max(0, weeks - 12) * 0.33);
    } else {
      bmiCategory = 'Obesidade';
      // IOM targets: 5.0 to 9.0 kg total gain.
      // Progression: ~0.22 kg/week after week 12
      minGainExpected = 0.5 + (Math.max(0, weeks - 12) * 0.17);
      maxGainExpected = 1.0 + (Math.max(0, weeks - 12) * 0.27);
    }

    let interpret = `IMC Pré-gestacional: ${roundedBmi} (${bmiCategory}). Ganho Atual: ${roundedGain} kg. `;
    let rec = '';
    let severity: 'low' | 'medium' = 'low';

    const minExp = Math.round(minGainExpected * 10) / 10;
    const maxExp = Math.round(maxGainExpected * 10) / 10;

    if (gain < minGainExpected) {
      interpret += `Abaixo do esperado (Faixa sugerida para a ${weeks}ª sem: ${minExp} a ${maxExp} kg).`;
      rec = 'Ganho de peso insuficiente para a idade gestacional. Indispensável detalhar aporte calórico dietético, descartar desnutrição crônica materna, vômitos severos incoercíveis (hiperêmese) e monitorar crescimento fetal ultrassonográfico (para excluir Restrição de Crescimento Intrauterino - RCIU).';
      severity = 'medium';
    } else if (gain > maxGainExpected) {
      interpret += `Acima do esperado (Faixa sugerida para a ${weeks}ª sem: ${minExp} a ${maxExp} kg).`;
      rec = 'Ganho de peso excessivo para a idade gestacional. Alerta para risco aumentado de macrossomia fetal, diabetes gestacional, distocia de ombros no parto e hipertensão/pré-eclampsia. Orientar controle glicêmico nutricional estrito, restrição de carboidratos simples e instituir atividade física se permitida.';
      severity = 'medium';
    } else {
      interpret += `Adequado (Faixa recomendada para a ${weeks}ª sem: ${minExp} a ${maxExp} kg).`;
      rec = 'Ganho de peso gestacional saudável e perfeitamente compatível com as diretrizes do IOM. Manter monitorização regular.';
      severity = 'low';
    }

    return {
      value: `${roundedGain} kg de ganho`,
      unit: 'kg',
      interpretation: interpret,
      recommendation: rec,
      severity
    };
  }
};
