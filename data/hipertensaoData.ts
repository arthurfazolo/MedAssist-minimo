export interface HipertensaoConsult {
  id: string;
  dominio: string;
  ordem: number;
  subtitulo: string;
  anamnese: string[];
  triagens: {
    texto: string;
    categoria: 'Diagnóstico' | 'Estratificação' | 'MEV' | 'Tratamento' | 'Monitoramento' | 'Geral';
  }[];
  vacinas: string[];
  alertas: { texto: string; gravidade: 'yellow' | 'red'; conduta?: string }[];
  orientacoes: string[];
  proxima: string;
  topicsOrder?: string[];
  topicTitles?: Record<string, string>;
  customChecklists?: { id: string; title: string; items: any[]; layout?: string }[];
  embeddedCalculators?: string[];
}

export const INITIAL_HIPERTENSAO_CONSULTS: HipertensaoConsult[] = [
  {
    id: 'h_diagnostico',
    dominio: '1. Diagnóstico e Classificação',
    ordem: 1,
    subtitulo: 'Confirmação diagnóstica e categorização dos níveis tensionais (SBC/SBD 2020)',
    anamnese: [
      'Aferição foi feita com paciente em silêncio, sentado, pernas descruzadas e bexiga vazia?',
      'Histórico familiar de hipertensão arterial sistêmica precoce (pais ou irmãos)?',
      'Presença de fatores estressores agudos, dor, privação de sono ou ansiedade no momento?',
      'Uso recente de estimulantes (café deitado, cigarro dentro de 30 min, termogênicos)?',
      'Suspeita de Hipertensão do Avental Branco ou Hipertensão Mascarada (divergência residência x consultório)?'
    ],
    triagens: [
      { texto: 'Confirmação do diagnóstico por pelo menos 2 aferições em ocasiões diferentes', categoria: 'Diagnóstico' },
      { texto: 'Indicação de MRPA (Monitorização Residencial) ou MAPA (24 horas) se suspeita de avental branco ou mascarada', categoria: 'Diagnóstico' },
      { texto: 'Verificação de técnica adequada utilizando manguito de tamanho correspondente ao braço', categoria: 'Diagnóstico' },
      { texto: 'Aferição em ambos os braços na primeira avaliação (considerar o maior valor)', categoria: 'Diagnóstico' }
    ],
    vacinas: [
      'Influenza (Dose anual recomendada para cardiopatas crônicos / hipertensos de alto risco)',
      'Pneumocócica 23-Valente (Se comorbidades adicionais como DM ou insuficiência cardíaca)',
      'COVID-19 (Esquema adaptado e doses de reforço para populações com risco cardiovascular)'
    ],
    alertas: [
      { texto: 'Pressão Arterial ≥ 180/110 mmHg em consultório na ausência de sintomas graves requer reavaliação imediata após repouso.', gravidade: 'yellow', conduta: 'Reavaliar após repouso calmo de 10 min. Se persistir sem sintomas complicados, classificar como Urgência e iniciar/ajustar medicação.' },
      { texto: 'Aferição de PAS/PAD limítrofe no consultório e normal em casa pode indicar hipertensão do avental branco.', gravidade: 'yellow', conduta: 'Solicitar MRPA ou MAPA antes de iniciar tratamento medicamentoso definitivo.' },
      { texto: 'Sintomas de cefaleia súbita intensa, dor torácica, dispneia ou déficit neurológico com PA elevada.', gravidade: 'red', conduta: 'Emergência Hipertensiva. Encaminhar imediatamente para Serviço de Pronto Atendimento em ambiente hospitalar.' }
    ],
    orientacoes: [
      'Orientar o paciente a adquirir ou tomar emprestado termômetro/aparelho de pressão digital automático de braço validado (Inmetro)',
      'Ensinar a técnica correta de repouso de 5 minutos antes da automonitorização em casa',
      'Explicar a importância de anotar as medições em um diário clínico para a próxima consulta'
    ],
    proxima: 'Em 1 a 2 semanas se estágio 3 ou estágio 2 de alto risco, ou em 1 mês para casos leves em investigação.'
  },
  {
    id: 'h_estratificacao',
    dominio: '2. Estratificação de Risco Cardiovascular',
    ordem: 2,
    subtitulo: 'Investigação de Fatores de Risco, Lesões de Órgãos-Alvo (LOA) e Doenças Associadas',
    anamnese: [
      'Apresenta histórico pessoal de infarto do miocárdio, revascularização ou derrame cerebral?',
      'Paciente fuma atualmente ou parou recentemente (último ano)?',
      'Diagnóstico conhecido de Diabetes Mellitus ou intolerância à glicose?',
      'Sintomas cardiovasculares ativos como dor no peito aos esforços (angina), palpitações ou falta de ar?',
      'Dislipidemia/colesterol alto conhecido em tratamento de controle alimentar ou farmacológico?'
    ],
    triagens: [
      { texto: 'Rastreamento de Hipertrofia Ventricular Esquerda (HVE) pelo ECG ou Ecocardiograma', categoria: 'Estratificação' },
      { texto: 'Pesquisa ativa de doença vascular periférica (presença de pulsos periféricos normais e simétricos)', categoria: 'Estratificação' },
      { texto: 'Rastreamento de doença renal crônica: taxa de filtração glomerular estimada (eTFG) e relação albumina/creatinina urinária', categoria: 'Estratificação' },
      { texto: 'Fundo de olho para rastreamento de retinopatia hipertensiva em pacientes estágio 2 ou 3', categoria: 'Estratificação' }
    ],
    vacinas: [
      'Certificar se as vacinas do paciente metabólico estão em dia (especialmente se diabético concomitante)'
    ],
    alertas: [
      { texto: 'Presença de Diabetes ou Lesão de Órgão-Alvo (LOA) estratifica o hipertenso como ALTO Risco CV, independentemente da pressão.', gravidade: 'red', conduta: 'Iniciar tratamento farmacológico farmacomediado dual imediato. Meta de controle exigente (< 130/80 mmHg).' },
      { texto: 'Presença de sopro carotídeo ou claudicação intermitente na marcha.', gravidade: 'yellow', conduta: 'Investigar insuficiência arterial/aterosclerose carotídea com Doppler e otimizar uso de estatinas + AAS se indicado.' },
      { texto: 'Histórico familiar prematuro de infarto ou morte cardiovascular em parentes de 1º grau (homem < 55 e mulher < 65 anos).', gravidade: 'yellow', conduta: 'Multiplica o risco basal. Exigir do paciente um perfil lipídico mais rigoroso.' }
    ],
    orientacoes: [
      'Explicar de forma clara que a hipertensão age silenciosamente, lesionando rim, cérebro e coração mesmo sem sintomas',
      'Abordar a importância de controlar o colesterol e o açúcar no sangue em conjunto com a pressão arterial'
    ],
    proxima: 'A cada 3 meses para acompanhamento próximo se risco alto, ou semestral se risco baixo.'
  },
  {
    id: 'h_mev',
    dominio: '3. Mudanças de Estilo de Vida (MEV)',
    ordem: 3,
    subtitulo: 'Metas não farmacológicas essenciais para o controle pressórico sustentável',
    anamnese: [
      'Nível de consumo diário estimado de sal de cozinha e produtos ultraprocessados?',
      'Frequência de atividade física aeróbica habitual (minutos totais por semana)?',
      'Grau de consumo semanal de bebidas alcoólicas (cerveja, vinho ou destilados)?',
      'Hábitos alimentares gerais (consumo de frutas, verduras, sementes e gorduras)?',
      'Evolução do peso corporal nos últimos meses? Dificuldades para redução?'
    ],
    triagens: [
      { texto: 'Verificação do IMC (Meta de peso ideal entre 18.5 e 24.9 kg/m² para redução de resistência periférica)', categoria: 'MEV' },
      { texto: 'Medição da Circunferência Abdominal (Meta < 94 cm para homens e < 80 cm para mulheres)', categoria: 'MEV' },
      { texto: 'Rastreamento de padrão de consumo de álcool (Audit-C simplificado ou questionário)', categoria: 'MEV' },
      { texto: 'Avaliação de barreiras para cessação do tabagismo se fumante', categoria: 'MEV' }
    ],
    vacinas: [
      'Reforçar importância geral de vacinas complementares contra vírus respiratórios'
    ],
    alertas: [
      { texto: 'Circunferência abdominal aumentada indica risco aumentado de síndrome metabólica associada.', gravidade: 'yellow', conduta: 'Foco prioritário em restrição calórica e aumento estruturado de gasto de energia diário.' },
      { texto: 'Consumo elevado de álcool (mais de 2 doses/dia para homens e 1 dose/dia para mulheres) eleva significativamente a pressão arterial.', gravidade: 'yellow', conduta: 'Reduzir gradualmente o consumo. O corte total ou severo do consumo excessivo pode reduzir a PAS em 4-5 mmHg.' }
    ],
    orientacoes: [
      'Prescrever a dieta DASH: rica em potássio, magnésio e cálcio (frutas, hortaliças, laticínios desnatados, cereais integrais)',
      'Meta de ingestão de Sódio: máximo de 2g de sódio por dia (equivalente a 5g de sal de cozinha ou 1 colher de chá rasa)',
      'Recomendar a prática de pelo menos 150 minutos semanais de atividade física aeróbica moderada (ex: caminhada rápida, natação, ciclismo)',
      'Frisar a perda de peso: cada 1 kg perdido de excesso de peso reduz em média 1 mmHg na PAS'
    ],
    proxima: 'A reavaliar metas no estilo de vida a cada 1 ou 2 meses.'
  },
  {
    id: 'h_farmaco',
    dominio: '4. Tratamento Farmacológico',
    ordem: 4,
    subtitulo: 'Indicação, Combinação de Classes e Adesão Terapêutica',
    anamnese: [
      'Usa corretamente as medicações todos os dias sem interrupções nos horários?',
      'Ocorrência de efeitos colaterais comuns (tosse seca com IECA, inchaço nas pernas com BCC, cãibras ou impotência)?',
      'Faz uso de anti-inflamatórios frequentes (Advil, Flanax, Voltaren) ou descongestionantes nasais (eleva a PA)?',
      'Dificuldade financeira para aquisição das medicações (Medicamento disponível na rede SUS/Farmácia Popular)?',
      'Gestante ou mulher com potencial de engravidar ativa (Contraindicação absoluta de IECA/BRA)?'
    ],
    triagens: [
      { texto: 'Avaliação clínica de adesão ao tratamento (Classificação de Morisky se necessário)', categoria: 'Tratamento' },
      { texto: 'Verificação clínica de edema de membros inferiores (efeito adverso recorrente do Anlodipino)', categoria: 'Tratamento' },
      { texto: 'Análise de indicação de terapia de combinação de 2 drogas (indicado para a maioria dos hipertensos estágios 1 moderado/alto ou estágios 2/3)', categoria: 'Tratamento' },
      { texto: 'Rastreio de interações medicamentosas com anti-inflamatórios ou corticoides de uso crônico', categoria: 'Tratamento' }
    ],
    vacinas: [
      'Nenhuma intervenção adicional'
    ],
    alertas: [
      { texto: 'Mulher grávida em uso de IECA (Enalapril/Captopril) ou BRA (Losartana/Valsartana) possui risco de toxicidade fetal grave.', gravidade: 'red', conduta: 'Mudar a medicação imediatamente para anti-hipertensivos seguros na gestação: Metildopa, Nifedipino retard ou Labetalol.' },
      { texto: 'Sintomas de hipotensão postural (tontura ao se levantar, escurecimento visual), especialmente nos idosos.', gravidade: 'yellow', conduta: 'Aferir a PA deitado e em pé após 3 minutos. Se queda de PAS > 20 mmHg ou PAD > 10 mmHg, moderar dose de vasodilatadores.' },
      { texto: 'Paciente com controle refratário mesmo usando 3 classes diferentes incluindo diurético (resistência hipertensiva).', gravidade: 'yellow', conduta: 'Hipertensão Resistente. Considerar adição de Espironolactona (25mg/dia) e afastar má adesão ou causas secundárias.' }
    ],
    orientacoes: [
      'Informar que os anti-hipertensivos devem ser tomados continuamente, mesmo que a pressão esteja normal',
      'Orientar a evitar a automedicação, especialmente anti-inflamatórios, que cortam o efeito dos remédios de pressão',
      'Apoiar o paciente fornecendo receitas claras com marcas comerciais e genéricos e orientações de horários (ex. diuréticos pela manhã para evitar noctúria)'
    ],
    proxima: 'Em 2 a 4 semanas para avaliar eficácia e segurança do esquema instituído.'
  },
  {
    id: 'h_exames',
    dominio: '5. Rotina de Exames e Metas',
    ordem: 5,
    subtitulo: 'Acompanhamento Laboratorial de Rotina Anual e Metas Clínicas',
    anamnese: [
      'Realizou a bateria de exames laboratoriais de rotina estruturada no último ano?',
      'Houve progressão ou piora de sintomas urinários, ganho de peso súbito (edema renal)?',
      'Manteve registros residenciais de pressão arterial compatíveis com as metas?'
    ],
    triagens: [
      { texto: 'Restauração e verificação das Metas Clínicas de PA: < 130/80 mmHg para a maioria dos pacientes de moderado/alto risco ou jovens, ou < 140/90 para idosos hígidos e controle geral', categoria: 'Monitoramento' },
      { texto: 'Solicitação ou checagem de Urina Tipo 1 (EAS) e creatinina para cálculo da TFG', categoria: 'Monitoramento' },
      { texto: 'Solicitação ou revisão anual do Potássio Sérico (atenção a diuréticos / IECA-BRA)', categoria: 'Monitoramento' },
      { texto: 'Solicitação de Glicemia de Jejum e Lipidograma completo de monitoração metabólica', categoria: 'Monitoramento' },
      { texto: 'Avaliação do Eletrocardiograma de repouso (procura de sobrecargas de câmaras esquerdas)', categoria: 'Monitoramento' }
    ],
    vacinas: [
      'Garantir atualização do cartão vacinal completo conforme calendário SBP/SBC'
    ],
    alertas: [
      { texto: 'Nível sérico de Potássio (K+) < 3.5 mEq/L aponta hipocalemia (comum com Hidroclorotiazida / Clortalidona).', gravidade: 'yellow', conduta: 'Repor potássio, orientar dieta rica em potássio ou associar diurético poupador de potássio (Espironolactona/Amilorida) ou IECA/BRA.' },
      { texto: 'Aumento agudo de Creatinina sérica > 30% após início de IECA ou BRA.', gravidade: 'red', conduta: 'Alerta para estenose de artéria renal bilateral ou desidratação grave. Suspender temporariamente a droga e investigar diagnóstico.' },
      { texto: 'Presença de microalbuminúria positiva ou macroproteinúria óbvia no EAS em paciente sem outra causa.', gravidade: 'yellow', conduta: 'Nefropatia Hipertensiva estabelecida. Preferência estrita de tratamento por IECA ou BRA devido ao seu efeito de nefroproteção.' }
    ],
    orientacoes: [
      'Entregar pedidos de exames periódicos devidamente justificados para prevenção de desfechos graves',
      'Esclarecer que a avaliação laboratorial anual ajuda a identificar problemas cardiovasculares de forma muito precoce',
      'Incentivar a manutenção de bons hábitos para poupar a saúde dos rins a longo prazo'
    ],
    proxima: 'A cada 6 meses se estável e controlado com as metas de consultório obtidas com sucesso.'
  }
];
