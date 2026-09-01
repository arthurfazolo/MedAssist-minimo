import { Protocolo } from '../types';

export const INITIAL_PROTOCOLS: Protocolo[] = [
  {
    id: 'crise-hipertensiva',
    titulo: 'Crise Hipertensiva',
    categoria: 'Pronto Socorro',
    descricao: 'Abordagem diagnóstica e condutas imediatas para diferenciar e tratar Urgências e Emergências Hipertensivas.',
    status: 'completo',
    nos: [
      {
        id: 'n1',
        tipo: 'decisao',
        texto: 'Aumento agudo relevante da PA (PA ≥ 180x120 mmHg) acompanhado de sintomas graves ou lesão de órgão-alvo em evolução (ex: cefaleia progressiva severa, dispneia súbita, dor torácica anginosa, alterações neurológicas)?',
        subtexto: 'Lesão de órgão-alvo agudo (LOA) inclui: Edema Agudo de Pulmão, Síndromes Coronarianas Agudas, Dissecção de Aorta, Encefalopatia Hipertensiva ou AVC em curso.',
        opcoes: [
          { label: 'Sim (Emergência Hipertensiva)', proximo: 'n_emerg_1' },
          { label: 'Não ou Sintomas Leves (Urgência Hipertensiva)', proximo: 'n_urg_1' }
        ]
      },
      {
        id: 'n_urg_1',
        tipo: 'conduta',
        texto: 'Urgência Hipertensiva categorizada. O objetivo clínico é reduzir gradualmente a PA de 20% a 25% em 24 a 48 horas.',
        subtexto: 'Reduções rápidas e bruscas de pressão em pacientes crônicos crônicos sem sintomas graves podem precipitar episódios de isquemia cerebral ou cardíaca reflexas.',
        proximo: 'n_urg_checklist'
      },
      {
        id: 'n_urg_checklist',
        tipo: 'checklist',
        texto: 'Estratégia terapêutica gradual via oral para Urgência:',
        subtexto: 'O tratamento preferido envolve medicações tópicas ou orais comuns de início gradual.',
        checklistItems: [
          { id: 'u1', texto: 'Repouso clínico: Colocar o paciente deitado em ambiente tranquilo por 30 minutos e reavaliar a PA antes de qualquer medicação.' },
          { id: 'u2', texto: 'Controle oral inicial: Considerar Captopril 25mg VO ou Clonidina 0,075mg a 0,15mg VO.' },
          { id: 'u3', texto: 'Controle de ansiedade/dor: Se houver forte fator álgico ou emocional associado, tratar esses sintomas antes (Analgésicos comuns ou ansiolíticos leves).' },
          { id: 'u4', texto: 'Manter em observação clínica por 4 a 6 horas para documentar tendência de queda sem hipotensão.' }
        ],
        proximo: 'n_urg_alerta'
      },
      {
        id: 'n_urg_alerta',
        tipo: 'alerta',
        texto: 'ATENÇÃO NUNCA FAÇA: Uso de Nifedipina sublingual de liberação rápida!',
        subtexto: 'A nifedipina sublingual está formalmente contraindicada na crise hipertensiva devido à queda rápida e imprevisível da pressão, que sabidamente induz AVC isquêmico e infarto do miocárdio por roubo de fluxo sanguíneo coronariano.',
        proximo: 'n_urg_fim'
      },
      {
        id: 'n_urg_fim',
        tipo: 'encaminhamento',
        texto: 'Alta Clínica Segura com Encaminhamento e Cuidados:',
        subtexto: 'Liberar paciente estável clinicamente. Prescrever retorno e manutenção das medicações habituais de uso diário orais. Orientar consulta de retorno em Unidade Básica de Saúde (UBS) dentro de 5 a 7 dias para monitoramento da PA crônica.'
      },
      {
        id: 'n_emerg_1',
        tipo: 'conduta',
        texto: 'Emergência Hipertensiva confirmada! Risco iminente de morte ou LOA progressiva.',
        subtexto: 'Encaminhar imediatamente para a Sala de Emergência/Sala Vermelha. Iniciar monitorização contínua multiparamétrica, garantir oxigenoterapia se saturação < 94% e instalar acesso venoso de bom calibre.',
        proximo: 'n_emerg_checklist'
      },
      {
        id: 'n_emerg_checklist',
        tipo: 'checklist',
        texto: 'Tratamento farmacológico intravenoso em bomba de infusão contínua (BIC):',
        subtexto: 'O controle precisa de precisão titulação contínua minuto a minuto.',
        checklistItems: [
          { id: 'e1', texto: 'Medicação prioritária padrão: Nitroprussiato de Sódio (Nitropress) 0,25 a 10 mcg/kg/min em infusão contínua, sempre protegido da luz.' },
          { id: 'e2', texto: 'Prefira Nitroglicerina (Tridil) se houver suspeita de doença coronariana aguda (angina, IAM) ou edema agudo de pulmão (dose inicial 5 mcg/min).' },
          { id: 'e3', texto: 'Meta de redução: Diminuir a PA Média (PAM) em no máximo 20-25% na primeira hora, e então buscar níveis de 160/100 mmHg nas 2 a 6 horas seguintes.' },
          { id: 'e4', texto: 'Solicitar exames urgentes: ECG, Troponina cardíaca, Creatinina, Eletrólitos, Ureia, Radiografia de tórax e Urina tipo 1.' }
        ],
        proximo: 'n_emerg_alerta'
      },
      {
        id: 'n_emerg_alerta',
        tipo: 'alerta',
        texto: 'Exceções fisiopatológicas raras onde a queda rápida da pressão é requerida:',
        subtexto: '1) Dissecção Aguda de Aorta: Reduzir imediatamente a PA Sistólica (PAS) para < 120 mmHg e a Frequência Cardíaca (FC) para < 60 bpm em até 20 minutos (use Metoprolol ou Esmolol EV associado a Nitroprussiato). 2) AVC Isquêmico candidato a trombólise: Manter PA rigorosamente abaixo de 185/110 mmHg.',
        proximo: 'n_emerg_fim'
      },
      {
        id: 'n_emerg_fim',
        tipo: 'encaminhamento',
        texto: 'Transferência prioritária para a Unidade de Terapia Intensiva (UTI):',
        subtexto: 'O paciente deve ser admitido em uma UTI com monitorização invasiva contínua através de linha arterial de pressão mecânica (PAM invasiva).'
      }
    ]
  },
  {
    id: 'sepse',
    titulo: 'Protocolo de Sepse Geriátrico/Adulto',
    categoria: 'Pronto Socorro',
    descricao: 'Alinhado com a Surviving Sepsis Campaign, focado em reconhecimento de falhas de perfusão e intervenção do pacote de 1 hora.',
    status: 'completo',
    nos: [
      {
        id: 's1',
        tipo: 'decisao',
        texto: 'Paciente com suspeita ou diagnóstico de processo infeccioso associado a um aumento agudo de disfunção orgânica (qSOFA ≥ 2 ou sintomas clínicos: alteração aguda do nível mental de consciência, taquipneia ≥ 22 irpm, PAS ≤ 100 mmHg)?',
        subtexto: 'Lembrete: Em idosos ou imunodeficientes, os sinais clássicos como febre podem estar ausentes. Confusão mental e quedas podem ser as únicas manifestações atípicas de infecção grave em andamento.',
        opcoes: [
          { label: 'Sim (Critérios de Sepse prováveis)', proximo: 's_combo_1' },
          { label: 'Não (Baixo risco hemodinâmico de infecção sistêmica)', proximo: 's_baixo_risco' }
        ]
      },
      {
        id: 's_baixo_risco',
        tipo: 'encaminhamento',
        texto: 'Manejo clínico padrão conservador de foco infeccioso local:',
        subtexto: 'Tratar a suspeita de infecção com terapêutica dirigida padrão e sintomáticos. Orientar o paciente quanto a sinais de gravidade / alerta clínicos (febre persistente, sonolência, dificuldade para urinar, falta de ar) e reavaliar de forma seriada caso o quadro progrida ou piore.'
      },
      {
        id: 's_combo_1',
        tipo: 'checklist',
        texto: 'PACOTE DE 1ª HORA (Inicie IMEDIATAMENTE as seguintes medidas em paralelo):',
        subtexto: 'O tempo de atuação é o determinante isolado central na sobrevida do paciente de alta gravidade infecciosa.',
        checklistItems: [
          { id: 'sc1', texto: 'Coletar lactato sérico venoso/arterial. Se o valor inicial for maior do que 2,0 mmol/L, repetir obrigatoriamente em 2 a 4 horas.' },
          { id: 'sc2', texto: 'Coletar pelo menos 2 conjuntos de hemoculturas (sítios venosos distintos) antes do início do primeiro antibiótico.' },
          { id: 'sc3', texto: 'Administrar antibiótico empírico de amplo espectro por via intravenosa adequado ao foco suspeito (ex: Tazocin ou Meropenem, ajustado à epidemiologia local).' },
          { id: 'sc4', texto: 'Expandir volemia com carga rápida de 30 mL/kg de solução de cristaloide (SF 0,9% ou Ringer Lactato) se o paciente apresentar hipotensão refratária (PAM < 65 mmHg) ou se o lactato inicial for ≥ 4 mmol/L.' }
        ],
        proximo: 's_reval_1'
      },
      {
        id: 's_reval_1',
        tipo: 'decisao',
        texto: 'Reavaliação de Alvos de Perfusão (Pós-reposição de cristaloide 30mL/kg): O paciente ainda persiste com sinais de hipotensão ativa (PAM < 65 mmHg) ou o lactato permanece persistentemente elevado?',
        subtexto: 'A persistência de hipotensão após hidratação qualifica o quadro como Choque Séptico, com elevada taxa de mortalidade.',
        opcoes: [
          { label: 'Sim (Choque Séptico Ativo)', proximo: 's_choque_norad' },
          { label: 'Não (Paciente Estabilizado e Responditivo)', proximo: 's_estabilizado' }
        ]
      },
      {
        id: 's_choque_norad',
        tipo: 'conduta',
        texto: 'Choque Séptico Instalado: Passo Terapêutico Central de Urgência!',
        subtexto: 'Deve-se iniciar infusão contínua de drogas vasoativas para restaurar o tônus arterial perfusional basal.',
        proximo: 's_choque_checklist'
      },
      {
        id: 's_choque_checklist',
        tipo: 'checklist',
        texto: 'Checklist de Condutas Clínicas Avançadas do Choque Séptico:',
        subtexto: 'Estabelecer vasopressores em bomba de forma ágil e segura.',
        checklistItems: [
          { id: 'sh1', texto: 'Iniciar NOREPINEFRINA (Noradrenalina) em bomba de infusão para manter a PAM ≥ 65 mmHg.' },
          { id: 'sh2', texto: 'Em emergências, pode-se infundir noradrenalina em acesso venoso periférico calibroso provisoriamente (preferencialmente na fossa cubital) enquanto se providencia acesso central.' },
          { id: 'sh3', texto: 'Pesquisar o controle mecânico imediato do foco infecioso (por exemplo, necessidade de drenagem cirúrgica de abscesso, desbridamento de partes moles ou retirada de cateter vascular antigo).' },
          { id: 'sh4', texto: 'Prescrever Hidrocortisona 200mg/dia EV fracionada em caso de persistência de choque requerendo doses altas de noradrenalina de forma refratária (> 0,25 mcg/kg/min).' }
        ],
        proximo: 's_choque_alerta'
      },
      {
        id: 's_choque_alerta',
        tipo: 'alerta',
        texto: 'ALERTA DE FLUIDOS: Monitore rigorosamente o surgimento de sobrecarga hídrica!',
        subtexto: 'A expansão agressiva irrestrita contínua de fluidos após a fase inicial de 1-3 horas pode aumentar a celularidade pulmonar, gerando edema agudo de pulmão e hipoxemia graves de difícil manejo clínico fora da UTI. Monitore perfusão periférica com o Tempo de Enchimento Capilar (TEC) e variação clínica.',
        proximo: 's_choque_fim'
      },
      {
        id: 's_choque_fim',
        tipo: 'encaminhamento',
        texto: 'Transferência Imediata de Vaga Zero para UTI:',
        subtexto: 'Pacientes em choque séptico necessitam de cuidado em unidade intensiva, com sonda vesical para débito urinário rigoroso de hora em hora e mensuração invasiva contínua.'
      },
      {
        id: 's_estabilizado',
        tipo: 'encaminhamento',
        texto: 'Encaminhamento para Enfermaria ou Monitoramento Semicrítico:',
        subtexto: 'Paciente hemodinamicamente estável no momento. Manter controle contínuo de sinais vitais de hora em hora. Aguardar resultados de culturas laboratoriais em andamento clínicas para propor o descalonamento inteligente de antibióticos empíricos para drogas de espectro focado.'
      }
    ]
  },
  {
    id: 'pcr',
    titulo: 'Parada Cardiorrespiratória (PCR — ACLS)',
    categoria: 'Pronto Socorro',
    descricao: 'Algoritmo de Suporte Avançado de Vida Cardiovascular (ACLS) para o manejo prático intra-hospitalar de ritmos chocáveis e não-chocáveis.',
    status: 'completo',
    nos: [
      {
        id: 'p1',
        tipo: 'checklist',
        texto: 'IMEDIATO: Reconhecimento de Parada Cardiorrespiratória (PCR)!',
        subtexto: 'Atrasos no reconhecimento reduzem drasticamente a chance de sucesso na reanimação e aumentam lesões cerebrais por hipóxia crônica.',
        checklistItems: [
          { id: 'pc1', texto: 'Confirmar ausência de responsividade, ausência de respiração normal (ou apenas gasping) e ausência de pulso central carotídeo detectável por 10 segundos.' },
          { id: 'pc2', texto: 'Chamar ajuda de emergência com urgência e solicitar o desfibrilador/carrinho de emergência de PCR.' },
          { id: 'pc3', texto: 'Iniciar compressões torácicas firmes e rápidas (100 a 120 compressões por minuto, com profundidade de 5 a 6 cm no tórax do paciente).' },
          { id: 'pc4', texto: 'Oferecer oxigenoterapia e ventilar na proporção clássica de 30 compressões para 2 ventilações usando Bolsa-Válvula-Máscara (Ambu) acoplada a oxigênio a 10-15 L/min.' },
          { id: 'pc5', texto: 'Assim que o monitor/desfibrilador chegar ao leito, conectar as pás e avaliar o ritmo cardíaco imediatamente.' }
        ],
        proximo: 'p_ritmo_decisao'
      },
      {
        id: 'p_ritmo_decisao',
        tipo: 'decisao',
        texto: 'Qual é o ritmo cardíaco exibido no monitor do desfibrilador?',
        subtexto: 'A decisão terapêutica inicial e todo o direcionamento de drogas dependem de identificar visualmente a presença de um ritmo passível de desfibrilação direta (chocável).',
        opcoes: [
          { label: 'FV / TV Sem Pulso', proximo: 'p_fv_chocavel' },
          { label: 'Assistolia ou AESP (Atividade Elétrica Sem Pulso)', proximo: 'p_aesp_nao_chocavel' }
        ]
      },
      {
        id: 'p_fv_chocavel',
        tipo: 'conduta',
        texto: 'RITMO CHOCÁVEL IDENTIFICADO! Aplicar Choque de Desfibrilação com Urgência!',
        subtexto: 'Carregue o desfibrilador (carga máxima recomendada: Bifásico 120-200J; ou Monofásico 360J). Ordene o afastamento imediato da equipe e proceda com o choque. Retome as compressões torácicas nos segundos seguintes, sem hesitação e por 2 minutos do ciclo.',
        proximo: 'p_fv_checklist_ciclo2'
      },
      {
        id: 'p_fv_checklist_ciclo2',
        tipo: 'checklist',
        texto: 'Passos Clínicos no 2º Ciclo (Chocável):',
        subtexto: 'Coordenar procedimentos simultâneos ao andamento da massagem torácica contínua.',
        checklistItems: [
          { id: 'pfc1', texto: 'Obter acesso endovenoso periférico estável ou optar por via Intraóssea (IO) se a veia for impossibilitada.' },
          { id: 'pfc2', texto: 'Manter a ressuscitação e preparar canulação de via aérea (se necessário, de forma que não interrompa a massagem).' },
          { id: 'pfc3', texto: 'Preparar com a equipe a primeira dose de Adrenalina 1mg e seringa de flush para uso imediato no momento oportuno.' }
        ],
        proximo: 'p_fv_ritmo_2'
      },
      {
        id: 'p_fv_ritmo_2',
        tipo: 'decisao',
        texto: 'Após 2 minutos de RCP: Qual é o ritmo demonstrado na leitura transitória do monitor?',
        subtexto: 'Parar momentaneamente as compressões por no máximo 10 segundos para leitura visual límpida do monitor.',
        opcoes: [
          { label: 'O ritmo continua Chocável (FV / TV)', proximo: 'p_fv_choque_2' },
          { label: 'Ritmo NÃO Chocável (Assistolia, AESP ou Organizado)', proximo: 'p_rce_verifica' }
        ]
      },
      {
        id: 'p_fv_choque_2',
        tipo: 'conduta',
        texto: 'Continua ritmo chocável! Aplicar 2º Choque e injetar Adrenalina!',
        subtexto: 'Disparar o choque e reiniciar compressões imediatamente por outro ciclo completo de 2 minutos. Administrar Adrenalina 1mg EV/IO em bólus, seguido por 20mL de soro para flush, elevando o braço do paciente para facilidade circulatória.',
        proximo: 'p_fv_checklist_ciclo3'
      },
      {
        id: 'p_fv_checklist_ciclo3',
        tipo: 'checklist',
        texto: 'Manejo no 3º Ciclo de PCR Chocável persistente:',
        subtexto: 'Introduzir medicação antiarrítmica para estabilização de membrana miocárdica irritável.',
        checklistItems: [
          { id: 'pfc3_1', texto: 'Preparar a primeira ampola de Amiodarona 300mg EV/IO (ou lidocaína 1 a 1,5mg/kg) para administração imediata após o próximo choque.' },
          { id: 'pfc3_2', texto: 'Discutir causas clínicas reversíveis associadas (Hipovolemia extrema, distúrbios de potássio, etc) com a equipe de apoio.' },
          { id: 'pfc3_3', texto: 'Ajustar o oxigênio para manter fluxo do ventilador manual ou mecânico constante e de alta pureza.' }
        ],
        proximo: 'p_fv_parada_refrataria'
      },
      {
        id: 'p_fv_parada_refrataria',
        tipo: 'alerta',
        texto: 'ALERTA DE REFRATARIEDADE: FV persistindo após múltiplos choques sequenciais comerciais:',
        subtexto: 'Verificar se o posicionamento das pás do desfibrilador está correto e se o acoplamento do gel está bom. Discutir causas tratáveis raras como infecção cardiogênica maciça, hemorragia interna abdominal silenciosa ou pneumotórax. Considerar o uso de Sulfato de Magnésio 1g a 2g EV se houver ritmo Torcendo de Pontas (Torsades de Pointes).',
        proximo: 'p_pcr_fim_geral'
      },
      {
        id: 'p_aesp_nao_chocavel',
        tipo: 'conduta',
        texto: 'RITMO NÃO CHOCÁVEL (AESP ou Assistolia) confirmado. Não choque!',
        subtexto: 'Administrar ADRENALINA 1mg EV/IO imediatamente (a prioridade máxima precoce em ritmos não-chocáveis). Iniciar ciclo completo de 2 minutos de compressões e ventilações de extrema qualidade.',
        proximo: 'p_aesp_checklist_ciclo1'
      },
      {
        id: 'p_aesp_checklist_ciclo1',
        tipo: 'checklist',
        texto: 'Checklist de Investigação Ativa nas Paradas Não-Chocáveis:',
        subtexto: 'O sucesso clínico depende quase que exclusivamente de identificar e reverter rapidamente a causa subjacente da PCR.',
        checklistItems: [
          { id: 'p5h1', texto: '1. Hipovolemia (Infundir carga rápida de fluidos isotônicos quentes e pesquisar focos de hemorragia ou sangramento).' },
          { id: 'p5h2', texto: '2. Hipóxia (Garantir que a via aérea está pérvia e oxigenada adequadamente, monitorando expansão e sons pulmonares).' },
          { id: 'p5h3', texto: '3. Hidrogênio / Acidose metabólica extrema (Se PCR for prolongada ou acidose severa preexistente, cogitar Bicarbonato de Sódio de forma individual).' },
          { id: 'p5h4', texto: '4. Hipo / Hipercalemia (Admnistrar Gluconato de Cálcio 10% se houver forte suspeita de hiperpotasemia em paciente renal em diálise).' },
          { id: 'p5h5', texto: '5. Hipotermia (Promover reaquecimento ativo do corpo).' },
          { id: 'p5t1', texto: '6. Trombose Coronária (Infarto do Miocárdio de altíssima gravidade).' },
          { id: 'p5t2', texto: '7. Trombose Pulmonar / TEP maciço (Considerar trombólise de urgência extrema na PCR em andamento).' },
          { id: 'p5t3', texto: '8. Toxinas (Intoxicações por betabloqueadores, digitálicos ou opiáceos; administrar antídotos específicos correspondentes).' },
          { id: 'p5t4', texto: '9. Tension Pneumothorax (Esvaziar tórax imediatamente por punção de agulha no 2º espaço intercostal / drenagem de urgência).' },
          { id: 'p5t5', texto: '10. Tamponamento Cardíaco (Proceder com punção de Marfan / pericardiocentese guiada por ultrassom de beira de leito).' }
        ],
        proximo: 'p_aesp_ritmo_2'
      },
      {
        id: 'p_aesp_ritmo_2',
        tipo: 'decisao',
        texto: 'Após 2 minutos de RCP em Assistolia/AESP. Qual o ritmo atual do monitor?',
        subtexto: 'Verificar ritmos organizados com verificação cuidadosa do pulso carotídeo central.',
        opcoes: [
          { label: 'Continua Assistolia ou AESP refratária', proximo: 'p_pcr_fim_geral' },
          { label: 'Mudou para ritmo passível de Choque (FV / TV)', proximo: 'p_fv_chocavel' },
          { label: 'Ritmo organizado visualizado + Pulso Central Presente', proximo: 'p_rce_verifica' }
        ]
      },
      {
        id: 'p_rce_verifica',
        tipo: 'decisao',
        texto: 'Paciente demonstra sinais nítidos de Retorno da Circulação Espontânea (RCE)?',
        subtexto: 'Os sinais principais incluem capnografia expiratória (PETCO2) que sobe agudamente acima de 40 mmHg de maneira abrupta, presença de pulso carotídeo firme ou movimentos respiratórios espontâneos estruturados.',
        opcoes: [
          { label: 'Sim, RCE Confirmada (Presença de Pulso palpável)', proximo: 'p_rce_cuidados' },
          { label: 'Não, continua sem pulso detectável central', proximo: 'p_ritmo_decisao' }
        ]
      },
      {
        id: 'p_rce_cuidados',
        tipo: 'conduta',
        texto: 'Cuidados Imediatos Pós-Parada Cardiorrespiratória:',
        subtexto: 'Foco em estabilizar e evitar novos episódios de PCR através de monitoramento agressivo multiparamétrico.',
        proximo: 'p_rce_fim'
      },
      {
        id: 'p_rce_fim',
        tipo: 'encaminhamento',
        texto: 'Transferência e Admissão em Unidade de Terapia Intensiva Cardiológica:',
        subtexto: 'Otimizar oxigenação (manter saturação O2 92-98% e PaCO2 35-45). Evitar hipotensão sistêmica grave estabilizando a pressão (PAM ≥ 65 mmHg) com doses baixas de noradrenalina em bomba de infusão contínua. Solicitar ECG de 12 derivações pós-parada imediato com busca atrativa de supra de ST cardíaco.'
      },
      {
        id: 'p_pcr_fim_geral',
        tipo: 'encaminhamento',
        texto: 'Controle de Esforços em Reanimação Prolongada Refratária:',
        subtexto: 'Na ausência de RCE mesmo após longos e exaustivos ciclos corretos de RCP, e corrigidas todas as causas clínicas reversíveis plausíveis de infecção ou mecânica, o médico líder do time deve coordenar junto à equipe a cessação controlada e ética dos esforços de ressuscitação e oficializar o óbito médico assistido.'
      }
    ]
  },
  {
    id: 'dor-toracica',
    titulo: 'Dor Torácica',
    categoria: 'Pronto Socorro',
    descricao: 'Avaliação sistemática na emergência para triagem de síndromes coronarianas agudas e diagnósticos ameaçadores à vida.',
    status: 'completo',
    nos: [
      {
        id: 'dt_n1',
        tipo: 'decisao',
        texto: 'Instabilidade hemodinâmica presente (ex: choque, hipotensão grave PAS < 90 mmHg, alteração do nível de consciência, congestão pulmonar)?',
        subtexto: 'A presença de instabilidade exige intervenção de emergência em sala vermelha simultânea à avaliação propedêutica e realização imediata de ECG.',
        opcoes: [
          { label: 'Sim', proximo: 'dt_emerg' },
          { label: 'Não', proximo: 'dt_n2' }
        ]
      },
      {
        id: 'dt_emerg',
        tipo: 'conduta',
        texto: 'Emergência médica! Paciente instável detectado.',
        subtexto: 'Mover o paciente imediatamente para a Sala Vermelha. Iniciar monitorização contínua, oxigenoterapia para manter SatO2 > 94% e prover acesso venoso de bom calibre.',
        proximo: 'dt_ecg_emerg_check'
      },
      {
        id: 'dt_ecg_emerg_check',
        tipo: 'checklist',
        texto: 'Condutas Clínicas Imediatas na Instabilidade:',
        subtexto: 'Realizar ações simultâneas sem atrasar a conduta clínica.',
        checklistItems: [
          { id: 'dtc1', texto: 'ECG imediato em até 10 minutos para avaliar Supra de ST.' },
          { id: 'dtc2', texto: 'Monitorização multiparamétrica de prontidão constante com desfibrilador ao lado do leito.' },
          { id: 'dtc3', texto: 'Garantir acesso venoso e colher exames laboratoriais rápidos, incluindo Troponina Ultrassensível.' },
          { id: 'dtc4', texto: 'Controles frequentes de sinais vitais e prontidão para suporte de oxigênio avançado se a respiração deteriorar.' }
        ],
        proximo: 'dt_n2'
      },
      {
        id: 'dt_n2',
        tipo: 'decisao',
        texto: 'Dor típica para síndrome coronariana aguda (dor retroesternal em aperto/opressiva, com irradiação para mandíbula, pescoço ou membro superior esquerdo, associada a náuseas e sudorese)?',
        subtexto: 'Lembre-se que idosos, mulheres e diabéticos podem apresentar sintomas atípicos (equivalentes anginosos), como dispneia súbita isolada ou epigastralgia.',
        opcoes: [
          { label: 'Sim', proximo: 'dt_ecg_10min' },
          { label: 'Não', proximo: 'dt_outras_causas' }
        ]
      },
      {
        id: 'dt_ecg_10min',
        tipo: 'conduta',
        texto: 'Realizar ECG de 12 derivações em até 10 minutos da chegada ao serviço!',
        subtexto: 'A rapidez na obtenção do ECG inicial é a meta central recomendada pelas diretrizes mundiais.',
        proximo: 'dt_ecg_alterado'
      },
      {
        id: 'dt_ecg_alterado',
        tipo: 'decisao',
        texto: 'ECG apresenta alteração sugestiva de isquemia aguda (Supra de ST ≥ 1 mm em 2 derivações contíguas ou novo Bloqueio de Ramo Esquerdo)?',
        subtexto: 'Avaliar atentamente o eletrocardiograma e comparar com traçados anteriores se disponíveis.',
        opcoes: [
          { label: 'Sim (Supra de ST)', proximo: 'dt_sca_supra' },
          { label: 'Não (Sem Supra de ST)', proximo: 'dt_troponina_flow' }
        ]
      },
      {
        id: 'dt_sca_supra',
        tipo: 'alerta',
        texto: 'SCA COM SUPRA DE ST: Tempo é Músculo!',
        subtexto: 'Acionar imediatamente o serviço de Hemodinâmica (ICP Primária). Meta de angioplastia em até 90 min (porta-balão) ou trombolítico em até 30 min (porta-agulha).',
        proximo: 'dt_condutas_sca'
      },
      {
        id: 'dt_condutas_sca',
        tipo: 'checklist',
        texto: 'Manejo Terapêutico Imediato na Emergência (SCA com ou sem supra):',
        subtexto: 'Prescrever antiagregantes e anticoagulantes de forma ágil.',
        checklistItems: [
          { id: 'dts1', texto: 'Aspirina (AAS) 200mg a 300mg VO mastigável.' },
          { id: 'dts2', texto: 'Segundo antiagregante plaquetário: Ticagrelor 180mg VO ou Clopidogrel 300-600mg VO.' },
          { id: 'dts3', texto: 'Nitrato sublingual se houver dor anginosa ativa persistente, exceto se houver hipotensão (PAS < 90 mmHg), uso recente de sildenafila ou suspeita de infarto de ventrículo direito.' },
          { id: 'dts4', texto: 'Prescrever anticoagulação terapêutica (ex: Enoxaparina 1mg/kg SC de 12/12h ou Heparina Não Fracionada EV).' }
        ],
        proximo: 'dt_fim_uti'
      },
      {
        id: 'dt_troponina_flow',
        tipo: 'decisao',
        texto: 'Resultado da Troponina Ultrassensível sérica veio elevado ou apresentou variação cinética diagnóstica típica?',
        subtexto: 'Se a troponina do tempo zero for normal em menos de 3h do início da dor, repetir exame após 1-3 horas (segundo protocolo local da instituição).',
        opcoes: [
          { label: 'Sim (Elevado / Alteração Dinâmica)', proximo: 'dt_condutas_sca' },
          { label: 'Não (Troponinas Normais Seriadas)', proximo: 'dt_outras_causas' }
        ]
      },
      {
        id: 'dt_outras_causas',
        tipo: 'checklist',
        texto: 'Investigar causas clínicas alternativas com atenção:',
        subtexto: 'A dor torácica pode representar outras condições de extrema gravidade clínica.',
        checklistItems: [
          { id: 'dto1', texto: 'Dissecção Aguda de Aorta: Dor torácica súbita, dilacerante, irradiada para o dorso, assimetria de pulsos radiais. Confirmar por AngioTC.' },
          { id: 'dto2', texto: 'Tromboembolismo Pulmonar (TEP): Dispneia súbita, taquicardia, hipoxemia de surgimento agudo de alto risco.' },
          { id: 'dto3', texto: 'Pericardite Aguda: Dor pleurítica que piora em decúbito dorsal e melhora com inclinação anterior do tórax.' },
          { id: 'dto4', texto: 'Pneumotórax Espontâneo: Dor pleurítica aguda unilateral acompanhada de diminuição acentuada do murmúrio vesicular do mesmo lado.' },
          { id: 'dto5', texto: 'Causas não graves (Espasmo esofágico, DRGE, dor osteomuscular / costocondrite palpável).' }
        ],
        proximo: 'dt_alerta_sinais'
      },
      {
        id: 'dt_alerta_sinais',
        tipo: 'alerta',
        texto: 'SINAIS DE ALERTA DO PACIENTE:',
        subtexto: 'Sempre monitorar o surgimento imediato de: Hipotensão arterial, Sudorese fria inexplicável, Dor irradiada com piora, Dessaturação de O2 e novas alterações no ECG de repetição.',
        proximo: 'dt_fim'
      },
      {
        id: 'dt_fim_uti',
        tipo: 'encaminhamento',
        texto: 'Encaminhamento prioritário para UTI Cardiológica ou Hemodinâmica:',
        subtexto: 'Pacientes com SCA (com ou sem supra) necessitam de internação em unidade de terapia intensiva coronariana para monitoramento contínuo.'
      },
      {
        id: 'dt_fim',
        tipo: 'encaminhamento',
        texto: 'Alta segura com encaminhamento ambulatorial ou observação clínica:',
        subtexto: 'Se a dor foi considerada de baixo risco, com ECGs normais e troponinas seriadas estritamente negativas, o paciente pode receber alta segura com prescrição de sintomáticos.'
      }
    ]
  },
  {
    id: 'dispneia',
    titulo: 'Dispneia',
    categoria: 'Pronto Socorro',
    descricao: 'Abordagem diagnóstica e condutas na insuficiência respiratória aguda e causas crônicas descompensadas.',
    status: 'completo',
    nos: [
      {
        id: 'dp_n1',
        tipo: 'decisao',
        texto: 'Saturação de Oxigênio (SatO2) < 90% na oximetria de pulso?',
        subtexto: 'A hipoxemia aguda requer intervenção de suporte rápida com oxigenoterapia terapêutica.',
        opcoes: [
          { label: 'Sim', proximo: 'dp_o2' },
          { label: 'Não', proximo: 'dp_n2' }
        ]
      },
      {
        id: 'dp_o2',
        tipo: 'conduta',
        texto: 'Instalar Oxigenoterapia Imediata!',
        subtexto: 'Administrar oxigênio suplementar por cateter nasal (1-5 L/min) ou máscara de Venturi focado em normalizar a SatO2 acima de 93-94% (ou 88-92% se o paciente for portador de DPOC).',
        proximo: 'dp_n2'
      },
      {
        id: 'dp_n2',
        tipo: 'decisao',
        texto: 'Paciente apresenta sinais clínicos agudos de Insuficiência Respiratória (tiragem intercostal/fúrcula, uso de musculatura acessória, fala entrecortada ou cianose)?',
        subtexto: 'O cansaço clínico indica possibilidade de exaustão muscular e necessidade de suporte respiratório.',
        opcoes: [
          { label: 'Sim', proximo: 'dp_emerg' },
          { label: 'Não', proximo: 'dp_n3' }
        ]
      },
      {
        id: 'dp_emerg',
        tipo: 'alerta',
        texto: 'EMERGÊNCIA RESPIRATÓRIA: Risco de Parada Respiratória!',
        subtexto: 'Monitorizar o paciente constantemente, solicitar gasometria arterial e Rx de tórax à beira do leito. Oferecer VNI rápida ou considerar Sequência Rápida de Intubação se fadiga extrema.',
        proximo: 'dp_n3'
      },
      {
        id: 'dp_n3',
        tipo: 'decisao',
        texto: 'Ausculta cardiopulmonar revela a presença de sibilos difusos?',
        subtexto: 'Sintomas obstrutivos brônquicos sugerem asma brônquica ou DPOC exacerbada.',
        opcoes: [
          { label: 'Sim', proximo: 'dp_asma_dpoc' },
          { label: 'Não', proximo: 'dp_n4' }
        ]
      },
      {
        id: 'dp_asma_dpoc',
        tipo: 'checklist',
        texto: 'Manejo Terapêutico para Crise Obstrutiva (Asma / DPOC):',
        subtexto: 'A base do tratamento é a redução imediata da resistência de vias aéreas.',
        checklistItems: [
          { id: 'dpad1', texto: 'Fenoterol/Salbutamol via aerosol 4-10 jatos associado a Brometo de Ipratrópio de 20/20 minutos na primeira hora.' },
          { id: 'dpad2', texto: 'Inicie Corticoterapia Sistêmica urgente: Metilprednisolona 40mg EV ou Prednisona 40mg VO.' },
          { id: 'dpad3', texto: 'Casos severos: Cogitar Sulfato de Magnésio 2g EV diluído em infusão lenta de 20 minutos.' },
          { id: 'dpad4', texto: 'Oxigênio terapêutico com foco nas metas de SatO2 adequadas: 93-95% (asma) ou 88-92% (DPOC).' }
        ],
        proximo: 'dp_fim_ambulatorio'
      },
      {
        id: 'dp_n4',
        tipo: 'decisao',
        texto: 'Há dor torácica aguda associada ao surgimento da falta de ar?',
        subtexto: 'A associação de dor torácica aponta forte correlação com doenças pleurais ou circulatórias pulmonares.',
        opcoes: [
          { label: 'Sim', proximo: 'dp_dor_toracica' },
          { label: 'Não', proximo: 'dp_n5' }
        ]
      },
      {
        id: 'dp_dor_toracica',
        tipo: 'alerta',
        texto: 'ALERTA DE CAUSAS AMEAÇADORAS: Suspete de TEP, SCA ou Pneumotórax!',
        subtexto: 'Estratificar escore de Wells (para TEP), colher ECG e troponinas. Realizar ultrassonografia beira-leito (POCUS) para exclusão de Pneumotórax Hipertensivo se houver silêncio auscultatório unilateral.',
        proximo: 'dp_fim_emerg_cardio'
      },
      {
        id: 'dp_n5',
        tipo: 'decisao',
        texto: 'Apresenta febre associada, tosse produtiva e/ou ausculta com estertores localizados?',
        subtexto: 'Quadro clínico clássico sugestivo de infecção do parênquima pulmonar.',
        opcoes: [
          { label: 'Sim', proximo: 'dp_pneumonia' },
          { label: 'Não', proximo: 'dp_outros' }
        ]
      },
      {
        id: 'dp_pneumonia',
        tipo: 'conduta',
        texto: 'Presunção Diagnóstica de Pneumonia Adquirida na Comunidade (PAC):',
        subtexto: 'Solicitar radiografia de tórax e exames inflamatórios. Empregar o score CURB-65 para decidir o local de tratamento (domicílio vs. enfermaria vs. UTI).',
        proximo: 'dp_fim_pneumo'
      },
      {
        id: 'dp_outros',
        tipo: 'checklist',
        texto: 'Considerar possíveis diagnósticos alternativos relevantes:',
        subtexto: 'Excluir outras etiologias em paciente sem sibilos, febre ou dor pulmonar típica.',
        checklistItems: [
          { id: 'dpo1', texto: 'Edema Agudo de Pulmão (EAP): Estertoração pulmonar bilateral, ortopneia, antecedente de cardiopatia. Tratar com Furosemida EV, Nitroglicerina e VNI urgente.' },
          { id: 'dpo2', texto: 'Tromboembolismo Pulmonar (TEP) subagudo: Dispneia inexplicada e súbita, com ausculta normal e Rx limpo.' },
          { id: 'dpo3', texto: 'Crise de Ansiedade / Hiperventilação: Diagnóstico de exclusão clínica após afastar organicidades.' }
        ],
        proximo: 'dp_fim_geral'
      },
      {
        id: 'dp_fim_ambulatorio',
        tipo: 'encaminhamento',
        texto: 'Seguimento pós-crise obstrutiva:',
        subtexto: 'Alta se eupneico com SatO2 estável. Prescrever corticoide de 5 dias e bombinha de resgate.'
      },
      {
        id: 'dp_fim_emerg_cardio',
        tipo: 'encaminhamento',
        texto: 'Encaminhamento urgente para internação / sala vermelha:',
        subtexto: 'Paciente deve prosseguir em área crítica para realização urgente de AngioTC de tórax e ECG seriado.'
      },
      {
        id: 'dp_fim_pneumo',
        tipo: 'encaminhamento',
        texto: 'Tratamento de Pneumonia direcionado por escore:',
        subtexto: 'Aplicar CURB-65. Se menor ou igual a 1, tratamento ambulatorial. Se maior ou igual a 2, internação em enfermaria.'
      },
      {
        id: 'dp_fim_geral',
        tipo: 'encaminhamento',
        texto: 'Observação sob acompanhamento:',
        subtexto: 'Manter em observação clínica em pronto socorro para revalidação do padrão respiratório.'
      }
    ]
  },
  {
    id: 'avc',
    titulo: 'AVC (Acidente Vascular Cerebral)',
    categoria: 'Pronto Socorro',
    descricao: 'Protocolo de AVC hiperagudo para reconhecimento ágil do déficit focal e tomada de decisão sobre trombólise química.',
    status: 'completo',
    nos: [
      {
        id: 'avc_n1',
        tipo: 'decisao',
        texto: 'Paciente apresenta sintomas agudos compatíveis com déficit neurológico focal (ex: fraqueza muscular unilateral, assimetria facial ou alteração brusca de linguagem)?',
        subtexto: 'A instalação súbita de déficit neurológico exige rapidez diagnóstica no serviço de emergência.',
        opcoes: [
          { label: 'Sim', proximo: 'avc_fast' },
          { label: 'Não', proximo: 'avc_diag_diferencial' }
        ]
      },
      {
        id: 'avc_diag_diferencial',
        tipo: 'conduta',
        texto: 'Investigar diagnósticos diferenciais alternativos (Stroke Mimics):',
        subtexto: 'Excluir com atenção: Hipoglicemia (sempre aferir glicemia capilar!), paralisia de Bell isolada, crise convulsiva pós-ictal (paralisia de Todd) ou crise de enxaqueca com aura complexa.',
        proximo: 'avc_fim_outros'
      },
      {
        id: 'avc_fast',
        tipo: 'checklist',
        texto: 'Aplicar os Critérios da Escala FAST com urgência:',
        subtexto: 'A presença de qualquer alteração confere alta probabilidade diagnóstica de acidente vascular cerebral.',
        checklistItems: [
          { id: 'avcf1', texto: 'Face (F): Peça para sorrir. Há desvio ou assimetria labial unilateral?' },
          { id: 'avcf2', texto: 'Arms/Braços (A): Peça para elevar os braços por 10s. Ocorre queda de um deles?' },
          { id: 'avcf3', texto: 'Speech/Fala (S): Peça para falar palavra/frase. Apresenta afasia, disartria ou fala arrastada?' },
          { id: 'avcf4', texto: 'Time/Tempo (T): Determinar rigidamente o horário de início exato das manifestações.' }
        ],
        proximo: 'avc_condutas_iniciais'
      },
      {
        id: 'avc_condutas_iniciais',
        tipo: 'checklist',
        texto: 'Abordagem Imediata na Sala de Emergência:',
        subtexto: 'Instalar condutas iniciais de suporte rápido e preparar exames de emergência.',
        checklistItems: [
          { id: 'avci1', texto: 'Dextro (Glicemia capilar) imediata para afastar hipoglicemia.' },
          { id: 'avci2', texto: 'Checar saturação e prover oxigênio se SatO2 < 94%.' },
          { id: 'avci3', texto: 'Dois acessos venosos calibrosos no membro superior não acometido.' },
          { id: 'avci4', texto: 'Solicitar Tomografia Computadorizada (TC) de crânio sem contraste imediatamente.' },
          { id: 'avci5', texto: 'Não reduzir PA na fase inicial, exceto se PA > 220x120 mmHg (ou > 185x110 mmHg se elegível para rtPA).' }
        ],
        proximo: 'avc_n2'
      },
      {
        id: 'avc_n2',
        tipo: 'decisao',
        texto: 'Tempo de início do déficit neurológico ocorreu há de menos de 4,5 horas?',
        subtexto: 'A janela de 4,5 horas representa o limiar consagrado pelas diretrizes para terapia fibrinolítica química com rtPA.',
        opcoes: [
          { label: 'Sim (Menos de 4,5h)', proximo: 'avc_trombolise_possivel' },
          { label: 'Não (Mais de 4,5h)', proximo: 'avc_janela_fechada' }
        ]
      },
      {
        id: 'avc_trombolise_possivel',
        tipo: 'alerta',
        texto: 'PACIENTE EM JANELA DE TROMBÓLISE QUÍMICA:',
        subtexto: 'Agilizar procedimentos! Meta de tempo Porta-TC < 25 min e Porta-Agulha < 60 min. Controlar rigorosamente PA abaixo de 185/110 mmHg para infusors.',
        proximo: 'avc_tc'
      },
      {
        id: 'avc_janela_fechada',
        tipo: 'conduta',
        texto: 'Janela terapêutica clássica escedida.',
        subtexto: 'Se sintomas iniciaram em menos de 24 horas, avaliar elegibilidade de intervenção intravascular de Trombectomia Mecânica em centro de referência.',
        proximo: 'avc_tc'
      },
      {
        id: 'avc_tc',
        tipo: 'decisao',
        texto: 'A Tomografia de Crânio revela sinais evidentes de hemorragia aguda (área hiperdensa intracraniana)?',
        subtexto: 'Descartar sangramento intracraniano agudo na imagem é requisito obrigatório antes de indicar rtPA.',
        opcoes: [
          { label: 'Sim (AVC Hemorrágico)', proximo: 'avc_hemorragico' },
          { label: 'Não (AVC Isquêmico presumido)', proximo: 'avc_isquemico' }
        ]
      },
      {
        id: 'avc_hemorragico',
        tipo: 'alerta',
        texto: 'AVC HEMORRÁGICO CONFIRMADO: Contraindicação absoluta a AAS e rtPA!',
        subtexto: 'Chamar a Neurocirurgia. Controle estrito e rápido da PA (alvo PAS de 140 mmHg), controlar a hipertensão intracraniana e monitorar alterações de coagulação.',
        proximo: 'avc_fim_uti_neuro'
      },
      {
        id: 'avc_isquemico',
        tipo: 'checklist',
        texto: 'Manejo do AVC Isquêmico (AVCi) Confirmado:',
        subtexto: 'Ações clínicas direcionadas pós-exclusão de hemorragia.',
        checklistItems: [
          { id: 'avci_t1', texto: 'Se em < 4,5h e sem contraindicações: Introduzir rtPA (Alteplase) na dose de 0,9 mg/kg EV (máximo 90mg) - sendo 10% em bólus inicial e o restante em bomba de infusão contínua em 1 hora.' },
          { id: 'avci_t2', texto: 'Se fora de janela clássica: Ministrar AAS 200mg VO e Atorvastatina 40-80mg VO.' },
          { id: 'avci_t3', texto: 'Monitorar sinais de rebaixamento neurológico de deterioração e manter controle glicêmico (meta HGT entre 140-180 mg/dL).' }
        ],
        proximo: 'avc_fim_uti_neuro'
      },
      {
        id: 'avc_fim_outros',
        tipo: 'encaminhamento',
        texto: 'Alta com investigação de diagnóstico secundário:',
        subtexto: 'Se o déficit foi transitório ou mimetizado por outras causas, proceder com seguimento seguro.'
      },
      {
        id: 'avc_fim_uti_neuro',
        tipo: 'encaminhamento',
        texto: 'Transferência Imediata para Unidade de AVC ou UTI:',
        subtexto: 'Necessária internação para vigilância neurológica estrita nas primeiras 24 horas pós-evento.'
      }
    ]
  },
  {
    id: 'anafilaxia',
    titulo: 'Anafilaxia',
    categoria: 'Pronto Socorro',
    descricao: 'Algoritmo de emergência para reconhecimento de reação alérgica sistêmica grave e uso imediato de adrenalina.',
    status: 'completo',
    nos: [
      {
        id: 'an_n1',
        tipo: 'decisao',
        texto: 'Paciente com história de exposição aguda apresenta manifestações cutaneomucosas severas (urticária difusa, eritema generalizado ou angioedema labial/palpebral)?',
        subtexto: 'Quadros dermatológicos agudos configuram o início mais comum e perceptível das reações alérgicas sistêmicas.',
        opcoes: [
          { label: 'Sim', proximo: 'an_n2' },
          { label: 'Não', proximo: 'an_baixa_prob' }
        ]
      },
      {
        id: 'an_baixa_prob',
        tipo: 'conduta',
        texto: 'Hipótese de Reação Alérgica Leve / Localizada:',
        subtexto: 'Administrar anti-histamínicos por via oral (ex: Loratadina 10mg) e manter observação por período breve para assegurar estabilidade.',
        proximo: 'an_fim_alta'
      },
      {
        id: 'an_n2',
        tipo: 'decisao',
        texto: 'Há acometimento de vias respiratórias (dispneia, sibilos, estridor de laringe, rouquidão súbita ou edema de glote)?',
        subtexto: 'O envolvimento respiratório caracteriza reação sistêmica de alta preocupação com risco de asfixia imediata.',
        opcoes: [
          { label: 'Sim', proximo: 'an_grave_confirmada' },
          { label: 'Não', proximo: 'an_n3' }
        ]
      },
      {
        id: 'an_n3',
        tipo: 'decisao',
        texto: 'Há sinais clínicos de instabilidade circulatória ou choque (hipotensão com PAS < 90 mmHg, síncope ou tonturas)?',
        subtexto: 'A repercussão hemodinâmica indica choque anafilático distributivo agudo.',
        opcoes: [
          { label: 'Sim', proximo: 'an_grave_confirmada' },
          { label: 'Não', proximo: 'an_alerta_sintomas' }
        ]
      },
      {
        id: 'an_alerta_sintomas',
        tipo: 'alerta',
        texto: 'SINAIS DE RISCO DE EVOLUÇÃO SISTÊMICA:',
        subtexto: 'A presença de manifestações de pele combinadas a sintomas gastrointestinais de cólicas intensas ou vômitos persistentes também indica anafilaxia severa na evolução. Prepare adrenalina ao leito imediata!',
        proximo: 'an_grave_confirmada'
      },
      {
        id: 'an_grave_confirmada',
        tipo: 'conduta',
        texto: 'ANAFILAXIA DE ALTO RISCO ESTABELECIDA! EMERGÊNCIA MÉDICA!',
        subtexto: 'O atraso na aplicação intramuscular de adrenalina representa o maior coeficiente de complicação neurológica e óbito.',
        proximo: 'an_doses_adrenalina'
      },
      {
        id: 'an_doses_adrenalina',
        tipo: 'alerta',
        texto: 'CONDUTA PRINCIPAL IMEDIATA: Adrenalina (Epinefrina) 1mg/mL IM Direta!',
        subtexto: 'Administrar intramuscular profunda no terço médio-lateral da coxa (Músculo Vasto Lateral) - absorção ultra-rápida. \nDoses e posologias:\n• ADULTO: 0,3 a 0,5 mg IM (0,3 a 0,5 mL puro).\n• CRIANÇA: 0,01 mg/kg IM (limite de 0,3 mL total por aplicação).',
        proximo: 'an_conduta_checklist'
      },
      {
        id: 'an_conduta_checklist',
        tipo: 'checklist',
        texto: 'Condutas Adicionais Paralelas e Suporte:',
        subtexto: 'Manejo clínico após estabelecimento imediato de epinefrina.',
        checklistItems: [
          { id: 'anc1', texto: 'No caso de persistência, repetir a adrenalina IM de 5 a 15 minutos.' },
          { id: 'anc2', texto: 'Mantenha o paciente em decúbito dorsal plano com membros inferiores elevados se hipotenso. Nunca levante o paciente.' },
          { id: 'anc3', texto: 'Administrar oxigênio suplementar sob máscara de oxigênio de alto fluxo.' },
          { id: 'anc4', texto: 'Instalar 2 acessos venosos calibrosos e infundir bólus rápido de 1 a 2L de cristaloide quente se houver hipotensão severa.' },
          { id: 'anc5', texto: 'Adjuvantes sistêmicos: Corticoides EV (Metilprednisolona 1-2 mg/kg ou Hidrocortisona 20mg) e antialérgicos parenterais.' }
        ],
        proximo: 'an_fim_obsv'
      },
      {
        id: 'an_fim_alta',
        tipo: 'encaminhamento',
        texto: 'Alta com prescrição ambulatorial e plano d\'ação:',
        subtexto: 'Se reação contida e assintomática por completo, prescrever sintomáticos e corticoides VO leves e encaminhar para alergologista clínico.'
      },
      {
        id: 'an_fim_obsv',
        tipo: 'encaminhamento',
        texto: 'Manter em Observação Rigorosa por 6 a 12 horas:',
        subtexto: 'Essencial resguardar o paciente sob vigilância por pelo menos 6-12 horas devido ao risco conhecido de Reação Bifásica tardia reincidente.'
      }
    ]
  },
  {
    id: 'dor-abdominal',
    titulo: 'Dor Abdominal Aguda',
    categoria: 'Pronto Socorro',
    descricao: 'Estratégia de abordagem clínica de queixas álgicas abdominais, triagem rápida de abdômen agudo cirúrgico e sinais de choque.',
    status: 'completo',
    nos: [
      {
        id: 'da_n1',
        tipo: 'decisao',
        texto: 'Instabilidade hemodinâmica presente (sinais de choque severo, pele fria e pegajosa, confusão mental ou PAS < 90 mmHg)?',
        subtexto: 'A presença de instabilidade associada a dor abdominal severa sugere ruptura de aneurisma vascular ou choques sépticos graves inflamatórios.',
        opcoes: [
          { label: 'Sim', proximo: 'da_cirurgia_urgencia' },
          { label: 'Não', proximo: 'da_n2' }
        ]
      },
      {
        id: 'da_cirurgia_urgencia',
        tipo: 'alerta',
        texto: 'ABDÔMEN AGUDO CIRÚRGICO / VASCULAR INSTÁVEL: Emergência prioritária extrema!',
        subtexto: 'Instalar jejum absoluto, colher tipagem sanguínea com prova cruzada de urgência, garantir 2 acessos de grosso calibre venoso periférico, iniciar infusão de cristaloides e contatar Cirurgiões com urgência.',
        proximo: 'da_n2'
      },
      {
        id: 'da_n2',
        tipo: 'decisao',
        texto: 'Exame de palpação abdominal com sinais nítidos de irritação peritoneal (defesa/rigidez abdominal reflexa ou Blumberg positivo)?',
        subtexto: 'Sinais clássicos confirmam irritação e apontam para perfurações intestinais ou processos inflamatórios severos em andamento.',
        opcoes: [
          { label: 'Sim', proximo: 'da_cirurgico' },
          { label: 'Não', proximo: 'da_localizacao' }
        ]
      },
      {
        id: 'da_cirurgico',
        tipo: 'conduta',
        texto: 'Condutas Iniciais de Abdômen Agudo de Origem Cirúrgica:',
        subtexto: 'Prescrever jejum completo, analgesia venosa sintomática, solicitar exames bioquímicos laboratoriais urgentes e exames de imagem confirmatórios rápida (Rx, USG ou TC).',
        proximo: 'da_localizacao'
      },
      {
        id: 'da_localizacao',
        tipo: 'decisao',
        texto: 'Qual é o principal quadrante ou local topográfico referido de maior dor?',
        subtexto: 'O mapeamento por quadrantes auxilia no estreitamento da etiologia.',
        opcoes: [
          { label: 'QSD ou Epigástrio', proximo: 'da_qsd' },
          { label: 'FID ou FIE', proximo: 'da_fid' },
          { label: 'Flancos ou Lombar', proximo: 'da_flancos' },
          { label: 'Difusa ou Periumbilical', proximo: 'da_difusa' }
        ]
      },
      {
        id: 'da_qsd',
        tipo: 'checklist',
        texto: 'Diferenciais de Quadrante Superior Direito (QSD) ou Epigástrio:',
        subtexto: 'Doenças focadas em estômago, vesícula, pâncreas ou infarto inferior.',
        checklistItems: [
          { id: 'daqc1', texto: 'Colecistite Aguda: Dor em QSD prolongada associada a Sinal de Murphy positivo na inspiração. USG abdominal.' },
          { id: 'daqc2', texto: 'Pancreatite Aguda: Dor contínua em andar superior do abdômen "em barra" com irradiação para o dorso. Amilase/Lipase.' },
          { id: 'daqc3', texto: 'Doença Ulcerosa Péptica / Espasmos: Dor e queimação controlada por alimentação ou antiácidos.' },
          { id: 'daqc4', texto: 'Infarto Agudo do Miocárdio: Dor epigástrica em queimação em idosos/diabéticos requer realização de ECG com rapidez!' }
        ],
        proximo: 'da_alerta_sinais'
      },
      {
        id: 'da_fid',
        tipo: 'checklist',
        texto: 'Diferenciais em Fossas Ilíacas (FID ou FIE):',
        subtexto: 'Doenças focadas em apêndice, cólons ou estruturas pélvico-uretrais.',
        checklistItems: [
          { id: 'dafc1', texto: 'Apendicite Aguda: Clássica dor que se inicia ao redor do umbigo e migra para FID (ponto de McBurney), associado a anorexia.' },
          { id: 'dafc2', texto: 'Diverticulite Aguda: Dor contínua em fossa ilíaca esquerda acompanhada de alterações de trânsito e febre.' },
          { id: 'dafc3', texto: 'Causas Ginecológicas / pélvicas: Cisto ovariano, Gravidez ectópica (solicitar Beta-hCG de rotina em idade fértil).' }
        ],
        proximo: 'da_alerta_sinais'
      },
      {
        id: 'da_flancos',
        tipo: 'checklist',
        texto: 'Diferenciais nos Flancos e Fossas Lombares:',
        subtexto: 'Acometimentos nefrolingais de coliche.',
        checklistItems: [
          { id: 'dalc1', texto: 'UROLITÍASE (Cólica Renal): Dor aguda lombar excruciante unilateral súbita irradiando para região inguinal com hematúria.' },
          { id: 'dalc2', texto: 'Pielonefrite Aguda: Febre elevada com calafrios, dor lombar contínua e punhopercussão lombar dolorosa (Giordano +).' }
        ],
        proximo: 'da_alerta_sinais'
      },
      {
        id: 'da_difusa',
        tipo: 'checklist',
        texto: 'Diferenciais em Dor Abdominal Difusa ou Periumbilical:',
        subtexto: 'Desordens obstrutivas alimentares vasculares.',
        checklistItems: [
          { id: 'dadc1', texto: 'Obstrução Intestinal Aguda: Dor em cólica severa generalizada, vômitos, distensão importante e ausência de flatus/fezes.' },
          { id: 'dadc2', texto: 'Isquemia Mesentérica: Dor severa grave paradoxalmente desproporcional ao exame abdominal inicial simples. Comum em cardiopatas.' }
        ],
        proximo: 'da_alerta_sinais'
      },
      {
        id: 'da_alerta_sinais',
        tipo: 'alerta',
        texto: 'SINAIS DE ALERTA NO SEGUIMENTO CLÍNICO:',
        subtexto: 'No acompanhamento de pacientes de baixa suspeita, vigiar surgimento de febre tiritante, vômitos refratários, tontura grave ou paralisia de trânsito.',
        proximo: 'da_fim'
      },
      {
        id: 'da_fim',
        tipo: 'encaminhamento',
        texto: 'Seguimento, conduta final e alta eventual:',
        subtexto: 'Pacientes em dor funcional ou cólica urológica de alta benignidade podem receber medicação e alta com exames. Casos graves persistem sob cuidados cirúrgicos.'
      }
    ]
  },
  {
    id: 'hipoglicemia',
    titulo: 'Hipoglicemia',
    categoria: 'Pronto Socorro',
    descricao: 'Manejo clínico agudo do paciente em estado hipoglicêmico, distinguindo apresentações conscientes e inconscientes e regras de reavaliação.',
    status: 'completo',
    nos: [
      {
        id: 'hg_n1',
        tipo: 'decisao',
        texto: 'Glicemia Capilar (Dextro) do paciente está abaixo de 70 mg/dL?',
        subtexto: 'Níveis de açúcar abaixo de 70 mg/dL requerem intervenção rápida para restabelecer os patamares saudáveis de glicose.',
        opcoes: [
          { label: 'Sim', proximo: 'hg_n2' },
          { label: 'Não', proximo: 'hg_fim_normal' }
        ]
      },
      {
        id: 'hg_fim_normal',
        tipo: 'encaminhamento',
        texto: 'Glicemia normalizada de segurança detectada:',
        subtexto: 'Interromper fluxo. Se o paciente persists com tonturas, palpitações ou sintomas semelhantes, avaliar causas neurológicas.'
      },
      {
        id: 'hg_n2',
        tipo: 'decisao',
        texto: 'Paciente encontra-se consciente, reativo e capaz de deglutir alimentos orais com segurança sem asfixia?',
        subtexto: 'A presença de reflexo protetor e de vigília decide a modalidade de reposição.',
        opcoes: [
          { label: 'Sim', proximo: 'hg_consciente_flow' },
          { label: 'Não', proximo: 'hg_inconsciente_flow' }
        ]
      },
      {
        id: 'hg_consciente_flow',
        tipo: 'conduta',
        texto: 'Iniciar Regra Terapêutica dos 15g de Carboidratos Rápidos por VO!',
        subtexto: 'O fornecimento rápido oral é a conduta padrão ouro de reversão imediata das crises de hipoglicemia leve.',
        proximo: 'hg_consciente_checklist'
      },
      {
        id: 'hg_consciente_checklist',
        tipo: 'checklist',
        texto: 'Passos da Correção por Via Oral:',
        subtexto: 'Controle de ingesta rápida de açúcares normais.',
        checklistItems: [
          { id: 'hgcc1', texto: 'Comer/beber exatamente 15g de glicose simples (ex: 1 colher de sopa de açúcar na água, ou 150ml de refrigerante comum).' },
          { id: 'hgcc2', texto: 'Repousar em calma por exatamente 15 minutos.' },
          { id: 'hgcc3', texto: 'Aferir novamente o Dextro capilar após os 15 minutos de repouso.' }
        ],
        proximo: 'hg_reval_consciente'
      },
      {
        id: 'hg_reval_consciente',
        tipo: 'decisao',
        texto: 'Reavaliação do Dextro após 15 minutos permanece abaixo de 70 mg/dL?',
        subtexto: 'A falha na elevação exige repetição sequencial da correção.',
        opcoes: [
          { label: 'Sim (Continua < 70mg/dL)', proximo: 'hg_consciente_flow' },
          { label: 'Não (Normalizou > 70mg/dL)', proximo: 'hg_consciente_estabilizado' }
        ]
      },
      {
        id: 'hg_consciente_estabilizado',
        tipo: 'conduta',
        texto: 'Nível glicêmico estabilizado com segurança!',
        subtexto: 'Fornecer imediatamente uma refeição de manutenção contendo carboidratos de lenta absorção e proteínas (ex: sanduíche ou lanche integral completo) para evitar queda de rebote tardia.',
        proximo: 'hg_investigar'
      },
      {
        id: 'hg_inconsciente_flow',
        tipo: 'conduta',
        texto: 'EMERGÊNCIA MÉDICA: Paciente torporoso, combativo ou em coma!',
        subtexto: 'Extremamente proibido uso de VO pela chance de asfixia/broncoaspiração. Iniciar correção parenteral.',
        proximo: 'hg_inconsciente_checklist'
      },
      {
        id: 'hg_inconsciente_checklist',
        tipo: 'checklist',
        texto: 'Rápida Reversão Parenteral Intravenosa:',
        subtexto: 'Reposição direta de alta densidade no sangue.',
        checklistItems: [
          { id: 'hgic1', texto: 'Prover acesso venoso periférico estável imediato.' },
          { id: 'hgic2', texto: 'Injetar 2 a 4 ampolas de Glicose Hipertônica a 50% EV de forma lenta direta (3 minutos).' },
          { id: 'hgic3', texto: 'Para acessos impossíveis no tempo: Aplicar 1mg de Glucagon por via Intramuscular (IM) ou Subcutânea (SC).' },
          { id: 'hgic4', texto: 'Infundir Soro Glicosado (SG 5% ou SG 10%) de manutenção contínua intravenosa.' }
        ],
        proximo: 'hg_reval_inconsciente'
      },
      {
        id: 'hg_reval_inconsciente',
        tipo: 'decisao',
        texto: 'O paciente de emergência restabeleceu níveis de dextro saudáveis e recuperou a consciência?',
        subtexto: 'Aferir dextro de 15 em 15 minutos até constatação clínica de melhora.',
        opcoes: [
          { label: 'Sim', proximo: 'hg_consciente_estabilizado' },
          { label: 'Não', proximo: 'hg_inconsciente_refratario' }
        ]
      },
      {
        id: 'hg_inconsciente_refratario',
        tipo: 'alerta',
        texto: 'HIPOGLICEMIA REFRATÁRIA OU COM COMPLICAÇÕES:',
        subtexto: 'Manter a infusão contínua de glicose e investigar se houve ingestão de sulfonilureias de longa ação (ex: Glibenclamida, Clorpropamida) ou insulinas de longa ação.',
        proximo: 'hg_criterios_internacao'
      },
      {
        id: 'hg_criterios_internacao',
        tipo: 'alerta',
        texto: 'CRITÉRIOS DE ADMISSÃO HOSPITALAR:',
        subtexto: 'Considerar admissão formal hospitalar por 24 horas para idosos frágeis, intoxicações intencionais com insulina de depósito, refratariedade bizarra ou déficit de aporte domiciliar.',
        proximo: 'hg_fim'
      },
      {
        id: 'hg_investigar',
        tipo: 'checklist',
        texto: 'Mapear causas prováveis do evento de choque glicêmico:',
        subtexto: 'Propor modificações preventivas e analisar conduta.',
        checklistItems: [
          { id: 'hgicc1', texto: 'Incompatibilidade entre a dose de insulina/hipoglicemiante e o padrão calórico alimentar.' },
          { id: 'hgicc2', texto: 'História recente de alto consumo de etanol (bloqueador natural de gliconeogênese).' },
          { id: 'hgicc3', texto: 'Investigar se há insuficiência hepática, renal ou adrenal concomitantes.' }
        ],
        proximo: 'hg_fim'
      },
      {
        id: 'hg_fim',
        tipo: 'encaminhamento',
        texto: 'Encaminhamento resolutivo pós-estabilização:',
        subtexto: 'Paciente alimentado por VO e com dextro estável pode receber alta. Casos graves e de sulfonilureias persistem sob cuidados em enfermaria clínica.'
      }
    ]
  },
  {
    id: 'sincope',
    titulo: 'Síncope',
    categoria: 'Pronto Socorro',
    descricao: 'Abordagem racional na síncope (perda transitória da consciência) e triagem sistemática de fatores de alto risco cardiovascular.',
    status: 'completo',
    nos: [
      {
        id: 'si_n1',
        tipo: 'decisao',
        texto: 'A perda transitória de consciência (PTC) do paciente caracteriza-se por início rápido, curta duração, perda completa de tônus com recuperação espontânea integral?',
        subtexto: 'Diferenciar a síncope real de outras perturbações de nível mental alterados.',
        opcoes: [
          { label: 'Sim (Síncope Real)', proximo: 'si_alto_risco' },
          { label: 'Não (Causas Alternativas)', proximo: 'si_outros' }
        ]
      },
      {
        id: 'si_outros',
        tipo: 'conduta',
        texto: 'Investigar Diferenciais de Perda de Consciência transitórios:',
        subtexto: 'Considerar: Crise convulsiva neuromuscular com sonolência duradoura pós-ictal, Traumatismo Cranioencefálico recente, síncope conversiva ou intoxicações severas.',
        proximo: 'si_fim_geral'
      },
      {
        id: 'si_alto_risco',
        tipo: 'decisao',
        texto: 'O paciente apresenta fatores de alto risco (dor palpável, síncope deitado ou durante exercício, cardiopatia prévia, ECG anormal, hipotensão PAS < 90 ou morte súbita familiar)?',
        subtexto: 'Determinar risco ajuda a afastar risco iminente de colapso circulatório grave por bloqueio ou arritmia.',
        opcoes: [
          { label: 'Sim', proximo: 'si_urgente' },
          { label: 'Não', proximo: 'si_baixo_risco' }
        ]
      },
      {
        id: 'si_urgente',
        tipo: 'alerta',
        texto: 'SÍNCOPE DE ALTO RISCO CARDIOVASCULAR: Monitoramento e internação!',
        subtexto: 'Alto risco de arritmias ou eventos adversos severos. Instale monitorização contínua, obtenha ECG de 12 derivações urgente, colha troponinas/eletrólitos e providencie vaga de internação.',
        proximo: 'si_classificar'
      },
      {
        id: 'si_baixo_risco',
        tipo: 'conduta',
        texto: 'Síncope de Baixo Risco (Etiologia Reflexa / Vasovagal provável):',
        subtexto: 'Mapear causas orogênicas e aplicar recomendações clínicas benéficas no leito.',
        proximo: 'si_classificar'
      },
      {
        id: 'si_classificar',
        tipo: 'checklist',
        texto: 'Classificar por provável mecanismo etiológico:',
        subtexto: 'Identificar gatilhos clínicos na anamnese pormenorizada.',
        checklistItems: [
          { id: 'sic1', texto: 'Reflexa / Vasovagal: Gatilho claro (visão de sangue, calor excessivo, susto) acompanhado de pródromos clássicos (palidez fria, sudorese, náuseas, turvação visual).' },
          { id: 'sic2', texto: 'Ortostática: Queda da PAS > 20 mmHg ao se levantar. Comum em idosos usuários de anti-hipertensivos ou estados de desidratação.' },
          { id: 'sic3', texto: 'Cardíaca: Síncope súbita na beira do leito ou deitado, sem pródromos, precedida por palpitações fortes. Sugere etiologia arrítmica ou estenose mecânica aguda.' }
        ],
        proximo: 'si_fim_direcionado'
      },
      {
        id: 'si_fim_direcionado',
        tipo: 'encaminhamento',
        texto: 'Recomendações e alta segura do pronto socorro:',
        subtexto: 'Tranquilizar o paciente sobre prognosis benigno. Ensinar manobras físicas de contra-pressão isométrica (cruzar pernas, flexionar músculos) nos pródromos, hidratação generosa e seguimento no cardiologista.'
      },
      {
        id: 'si_fim_geral',
        tipo: 'encaminhamento',
        texto: 'Seguimento direcionado por etiologia diferencial:',
        subtexto: 'Encaminhar para especialista de competência (Neurologia no caso de crises convulsivas recorrentes) com exames laboratoriais complementares.'
      }
    ]
  },
  {
    id: 'intoxicao-exogena',
    titulo: 'Intoxicações Exógenas',
    categoria: 'Pronto Socorro',
    descricao: 'Manejo inicial do paciente sob suspeita de envenenamento e intoxicação aguda, identificação de Toxidez e antídotos.',
    status: 'completo',
    nos: [
      {
        id: 'ix_n1',
        tipo: 'checklist',
        texto: 'Avaliação Primária pelo Protocolo ABCDE Toxicológico:',
        subtexto: 'As condutas priorizam a desobstrução e controle hemodinâmico antes de antídotos específicos.',
        checklistItems: [
          { id: 'ixc1', texto: 'A (Vias Aéreas): Garantir via aérea livre e aspirar secreções e vômitos para segurança.' },
          { id: 'ixc2', texto: 'B (Respiração): Ofertar oxigênio em SatO2 < 94%, vigiar apnéia e distorções mecânicas respiratórias.' },
          { id: 'ixc3', texto: 'C (Circulação): Prover 2 acessos venosos estáveis, colher testes e repor fluidos se hipotensão.' },
          { id: 'ixc4', texto: 'D (Déficit): Escala de coma de Glasgow dinâmica e colher Dextro venocapilar.' },
          { id: 'ixc5', texto: 'E (Exposição): Retirar vestimentas contaminadas no caso de agentes químicos e inspecionar dobras cutâneas.' }
        ],
        proximo: 'ix_instabilidade'
      },
      {
        id: 'ix_instabilidade',
        tipo: 'decisao',
        texto: 'Sintomas graves de instabilidade presentes (coma por Glasgow < 8, hipotensão refratária de choque, ou arritmia ventricular induzida)?',
        subtexto: 'A identificação de toxicidade severa demanda suporte clínico avançado de forma concorrente.',
        opcoes: [
          { label: 'Sim (Instável)', proximo: 'ix_suporte_avancado' },
          { label: 'Não (Estável)', proximo: 'ix_identificar_sindrome' }
        ]
      },
      {
        id: 'ix_suporte_avancado',
        tipo: 'alerta',
        texto: 'TOXICIDADE CRÍTICA: Oferecer Suporte Avançado de Vida!',
        subtexto: 'Realizar intubação orotraqueal se Glasgow < 8 para proteção pulmonar. Prontidão para cardioproteção ou bicarbonato de sódio se houver QRS alargado no ecocardiograma por tricíclicos.',
        proximo: 'ix_identificar_sindrome'
      },
      {
        id: 'ix_identificar_sindrome',
        tipo: 'decisao',
        texto: 'Sinais clínicos permitem reconhecer com segurança uma Síndrome Tóxica (Toxidrome) clássica?',
        subtexto: 'Determinar a toxidrome orienta o raciocínio terapêutico e escolha rápida de antídotos clínicos correspondentes.',
        opcoes: [
          { label: 'Sim', proximo: 'ix_síndromes_detalhes' },
          { label: 'Não', proximo: 'ix_sem_sindrome' }
        ]
      },
      {
        id: 'ix_síndromes_detalhes',
        tipo: 'checklist',
        texto: 'Toxidromes Clássicas e Quadro Clássico Clínico:',
        subtexto: 'Vincular sintomas das pupilas e pele aos possíveis toxinas correspondentes.',
        checklistItems: [
          { id: 'ixsc1', texto: 'Simpatomimética (Cocaína, Anfetamina): Taquicardia severa, febre, sudorese intensa, midríase pupilar extrema. Tratar com Benzodiazepínicos EV.' },
          { id: 'ixsc2', texto: 'Anticolinérgica (Tricíclicos, Atropina): Pele quente e seca extrema, retenção urinária aguda, midríase e psicose.' },
          { id: 'ixsc3', texto: 'Colinérgica (Organofosforados, Carbamatos): Miose pontiforme bilateral, sialorreia profusa, broncorreia, diarreia e fasciculações. Antídoto: ATROPINA EV.' },
          { id: 'ixsc4', texto: 'Sedativo-Hipnótica (Benzodiazepínicos, Álcool): Rebaixamento flácido do nível de vigília, funções estáveis. Antídoto: FLUMAZENIL.' },
          { id: 'ixsc5', texto: 'Opioide (Morfina, Heroína, Fentanil): Tríade clássica: Coma profundo, miose puntiforme bilateral extrema e depressão respiratória. Antídoto: NALOXONA EV.' }
        ],
        proximo: 'ix_medidas_descontaminacao'
      },
      {
        id: 'ix_sem_sindrome',
        tipo: 'conduta',
        texto: 'Acometimento desconhecido ou inespecífico do agente químico:',
        subtexto: 'Manter monitoramento criterioso de suporte. Realizar exames solicitados e ECG basais.',
        proximo: 'ix_medidas_descontaminacao'
      },
      {
        id: 'ix_medidas_descontaminacao',
        tipo: 'checklist',
        texto: 'Condutas Preventivas de Descontaminação Digestiva:',
        subtexto: 'Reduzir de forma ágil a reabsorção gástrica de compostos ingeridos.',
        checklistItems: [
          { id: 'ixdc1', texto: 'Lavagem Gástrica: Somente útil se iniciada dentro de 1 hora pós-ingesta de toxina potencialmente letal. Contraindicado em corrosivos ou hidrocarbonetos.' },
          { id: 'ixdc2', texto: 'Carvão Ativado: Dose única de 1g/kg (limite 50g) por via enteral. Máxima eficácia na absorção enteral se aplicado na primeira hora.' }
        ],
        proximo: 'ix_antidotos'
      },
      {
        id: 'ix_antidotos',
        tipo: 'checklist',
        texto: 'Uso Clínico Direcionado de Antídotos Específicos para Salvação:',
        subtexto: 'Ministrar com exatidão diagnóstica e sob monitorização contínua.',
        checklistItems: [
          { id: 'ixac1', texto: 'Naloxona: Antídoto de escolha para Opioides se houver depressão de respiração (0,4mg EV sequenciais).' },
          { id: 'ixac2', texto: 'Flumazenil: Utilizado para reverter Benzodiazepínicos em dose de 0,2mg EV.' },
          { id: 'ixac3', texto: 'Atropina: Para controlar broncorreia severa nas intoxicações por agrotóxicos organofosforados (Dose inicial 1-5mg EV).' },
          { id: 'ixac4', texto: 'N-Acetilcisteína: Protetor hepático para ingestão de alta carga de Paracetamol.' }
        ],
        proximo: 'ix_alerta_orientacao'
      },
      {
        id: 'ix_alerta_orientacao',
        tipo: 'alerta',
        texto: 'CONDUTA IMPRESCINDÍVEL: Contatar o CIATox imediato!',
        subtexto: 'Todo evento de intoxicação do pronto socorro deve ser reportado e monitorado junto ao Centro de Informação e Assistência Toxicológica (CIATox) regional para suporte farmacoterapêutico.',
        proximo: 'ix_fim'
      },
      {
        id: 'ix_fim',
        tipo: 'encaminhamento',
        texto: 'Follow-up e plano final do paciente toxicológico:',
        subtexto: 'Pacientes estáveis podem receber alta após 6-8 horas sem sintomas graves. Casos intencionais por autolesão exigem interconsulta na equipe de Saúde Mental/Psiquiatria da emergência antes de liberação.'
      }
    ]
  },
  {
    id: 'arboviroses',
    titulo: 'Manejo de Arboviroses (Dengue, Zika, Chikungunya)',
    categoria: 'Pronto Socorro',
    descricao: 'Protocolo clínico integrado focado no estadiamento, hidratação por grupos (A, B, C, D) e diagnóstico diferencial das arboviroses agudas conforme diretrizes do Ministério da Saúde.',
    status: 'completo',
    nos: [
      {
        id: 'arb_n1',
        tipo: 'decisao',
        texto: 'Paciente apresenta febre aguda (de início súbito, geralmente < 7 dias) associada a dois ou mais sintomas (cefaleia, mialgia, artralgia, dor retroorbitária, exantema, náuseas, vômitos) ou história recente de exposição epidemiológica?',
        subtexto: 'Em áreas endêmicas, a suspeição clínica precoce de arboviroses é fundamental para iniciar a reidratação antes dos resultados de exames laboratoriais.',
        opcoes: [
          { label: 'Sim (Suspeita Clínica Ativa)', proximo: 'arb_triagem' },
          { label: 'Não (Baixa probabilidade de Arbovirose)', proximo: 'arb_outras_causas' }
        ]
      },
      {
        id: 'arb_outras_causas',
        tipo: 'encaminhamento',
        texto: 'Investigar diagnósticos diferenciais alternativos:',
        subtexto: 'Pesquise focos localizados (Faringoamigdalite, Pneumonia, Meningite) ou outras doenças febris sistêmicas como Influenza, COVID-19, Leptospirose ou Malária (se área de trânsito endêmico).'
      },
      {
        id: 'arb_triagem',
        tipo: 'decisao',
        texto: 'O paciente apresenta algum sinal de alarme clínico ou instabilidade hemodinâmica?',
        subtexto: 'Os Sinais de Alarme incluem: dor abdominal intensa e contínua, vômitos persistentes, acúmulo de líquidos (ascite, derrame pleural, pericárdico), hipotensão postural ou ortostática, hepatomegalia > 2cm, letargia ou irritabilidade, sangramento de mucosa, ou aumento progressivo do hematócrito.',
        opcoes: [
          { label: 'Sim (Sinais de Alarme ou Gravidade)', proximo: 'arb_alarme_choque_decisao' },
          { label: 'Não (Sintomas Leves/Moderados)', proximo: 'arb_leve_moderado' }
        ]
      },
      {
        id: 'arb_alarme_choque_decisao',
        tipo: 'decisao',
        texto: 'O paciente exibe sinais de instabilidade hemodinâmica grave, choque, hipotensão grave (PAS < 90 mmHg ou hipotensão postural refratária), pulso rápido e filiforme ou tempo de enchimento capilar (TEC) > 2 segundos?',
        subtexto: 'A presença de choque ou sinais de disfunção de órgãos-alvo (como sangramentos graves pulmonares, gastrointestinais ou SNC, letargia grave) classifica o paciente como Grupo D (Dengue Grave).',
        opcoes: [
          { label: 'Sim (Sinais de Choque - Grupo D)', proximo: 'arb_grupo_d' },
          { label: 'Não ou Apenas Alarme Sem Choque (Grupo C)', proximo: 'arb_grupo_c' }
        ]
      },
      {
        id: 'arb_grupo_d',
        tipo: 'conduta',
        texto: 'GRUPO D: Emergência Médica - Choque / Dengue Grave!',
        subtexto: 'Encaminhar o paciente imediatamente para a Sala Vermelha ou UTI. Garantir monitorização multiparamétrica de prontidão e instalar dois acessos venosos calibrosos. Iniciar Expansão Rápida com Cristaloide (SF 0,9% ou Ringer Lactato) na dose de 20 mL/kg em 20 minutos.',
        proximo: 'arb_calc_grupo_d'
      },
      {
        id: 'arb_calc_grupo_d',
        tipo: 'calculadora',
        texto: 'Calcular Expansão Rápida Imediata (Grupo D):',
        subtexto: 'Calcule o volume exato do bólus inicial intravenoso necessário para a reanimação volêmica segundo o peso do paciente.',
        calculadoraId: 'dengue',
        proximo: 'arb_grupo_cd_checklist'
      },
      {
        id: 'arb_grupo_c',
        tipo: 'conduta',
        texto: 'GRUPO C: Arbovirose com Sinais de Alarme (Sinalizador de Gravidade):',
        subtexto: 'Proceder à admissão em leito de observação hospitalar. Iniciar hidratação intravenosa imediata com Cristaloide na dose de 10 mL/kg em 1 hora para estabilização hemodinâmica guiada.',
        proximo: 'arb_calc_grupo_c'
      },
      {
        id: 'arb_calc_grupo_c',
        tipo: 'calculadora',
        texto: 'Calcular Infusão Hidrossalina Inicial (Grupo C):',
        subtexto: 'Calcule o volume de cristaloide intravenoso inicial necessário para infundir na primeira hora conforme o peso corporal.',
        calculadoraId: 'dengue',
        proximo: 'arb_grupo_cd_checklist'
      },
      {
        id: 'arb_grupo_cd_checklist',
        tipo: 'checklist',
        texto: 'Checklist de Monitorização e Condutas de Internação (Grupos C e D):',
        subtexto: 'Coordenar exames e cuidados constantes com o paciente internado.',
        checklistItems: [
          { id: 'arcd1', texto: 'Solicitar exames laboratoriais imediatos: Hemograma Completo (avaliar hematócrito de hora em hora e plaquetopenia), Transaminases (TGO/TGP), Creatinina, Proteínas Totais, Frações e Sódio/Potássio.' },
          { id: 'arcd2', texto: 'Reavaliar padrão hemodinâmico de 30 em 30 minutos na fase de expansão ativa e de hora em hora após estabilização.' },
          { id: 'arcd3', texto: 'Instalar controle rigoroso do balanço hídrico físico com mensuração do débito urinário espontâneo ou de sonda vesical (meta terapêutica: diurese > 1 mL/kg/hora).' },
          { id: 'arcd4', texto: 'Evitar o uso de qualquer anti-inflamatório (Ibuprofeno, Nimesulida, Diclofenaco) e de ácido acetilsalicílico (AAS), que agravam expressivamente o risco de sangramentos.' },
          { id: 'arcd5', texto: 'Realizar Notificação Compulsória imediata sob ficha específica de arboviroses no SINAN.' }
        ],
        proximo: 'arb_alerta_gravidade_cd'
      },
      {
        id: 'arb_alerta_gravidade_cd',
        tipo: 'alerta',
        texto: 'ALERTA DE SEGURANÇA: Cuidado com a Congestão Hídrica e Queda de Plaquetas!',
        subtexto: 'O excesso de volume pode levar a Edema Pulmonar e insuficiência respiratória grave, especialmente na fase de hiperpermeabilidade capilar. Plaquetopenia isolada (< 50.000 ou 20.000) sem sangramentos graves NÃO é indicação de transfusão de plaquetas profilática.',
        proximo: 'arb_grupo_cd_fim'
      },
      {
        id: 'arb_grupo_cd_fim',
        tipo: 'encaminhamento',
        texto: 'Seguimento de Alta para Pacientes Hospitalizados (Grupos C/D):',
        subtexto: 'Critérios de Alta Hospitalar Segura: Estabilidade hemodinâmica por 48 horas (sem hidratação venosa), ausência de febre por 24 horas sem antitérmicos, melhora visível do exantema e prurido, hematócrito estabilizado nas últimas 24 horas e plaquetas em curva ascendente nítida (> 50.000).'
      },
      {
        id: 'arb_leve_moderado',
        tipo: 'decisao',
        texto: 'O paciente apresenta fatores de risco específicos, comorbidades (gestantes, idosos > 65 anos, portadores de hipertensão, diabetes, DPOC, asma, ICC, imunodeprimidos) ou sangramentos cutâneos espontâneos (petéquias, epistaxe leve, gengivorragia primária) / prova do laço positiva?',
        subtexto: 'A presença de riscos clínicos adicionais ou pequenos sangramentos na pele coloca o paciente na classificação Grupo B do Ministério da Saúde.',
        opcoes: [
          { label: 'Sim (Risco Clínico / Prova do Laço + - Grupo B)', proximo: 'arb_grupo_b' },
          { label: 'Não (Quadro Leve Clássico - Grupo A)', proximo: 'arb_grupo_a' }
        ]
      },
      {
        id: 'arb_grupo_b',
        tipo: 'conduta',
        texto: 'GRUPO B: Arbovirose com Comorbidades ou Sangramentos Cutâneos Espontâneos/Induzidos (Risco):',
        subtexto: 'Requer acompanhamento clínico e hidratação oral supervisionada em ambiente de observação rápida até resultado laboratorial básico (Hemograma obrigatório com resultado em até 4 horas).',
        proximo: 'arb_calc_grupo_b'
      },
      {
        id: 'arb_calc_grupo_b',
        tipo: 'calculadora',
        texto: 'Calcular Hidratação Supervisionada Inicial (Grupo B):',
        subtexto: 'Calcule a taxa hídrica inicial baseada no peso do paciente.',
        calculadoraId: 'dengue',
        proximo: 'arb_grupo_b_checklist'
      },
      {
        id: 'arb_grupo_b_checklist',
        tipo: 'checklist',
        texto: 'Checklist de Abordagem para o Grupo B:',
        subtexto: 'Manter vigilância em leito de observação transitória.',
        checklistItems: [
          { id: 'arb_bc1', texto: 'Realizar hemograma completo em caráter obrigatório urgente. Se houver elevação importante do hematócrito (hemoconcentração), reclassifique para o Grupo C de forma ágil.' },
          { id: 'arb_bc2', texto: 'Dispor Soro de Reidratação Oral (SRO) sistemático sob supervisão de enfermagem.' },
          { id: 'arb_bc3', texto: 'Controlar febre e cefaleia com Dipirona (até 1g de 6/6h) ou Paracetamol (até 750mg de 6/6h). Contraindicar AINEs/AAS.' }
        ],
        proximo: 'arb_grupo_b_fim'
      },
      {
        id: 'arb_grupo_b_fim',
        tipo: 'encaminhamento',
        texto: 'Seguimento de Alta e Monitoramento Seguro para Grupo B:',
        subtexto: 'Se hemograma/hematócrito estiverem normais e não houver surgimento de sinais de alerta após observação por 4 a 6 horas, o paciente pode receber alta para acompanhamento domiciliar. Entregar cartão da dengue e orientar retorno médico imediato.'
      },
      {
        id: 'arb_grupo_a',
        tipo: 'conduta',
        texto: 'GRUPO A: Suspeita de Arbovirose Leve sem Sinais de Alarme ou Comorbidades:',
        subtexto: 'Atendimento ambulatorial padrão com foco em orientação rigorosa e tratamento sintomático domiciliar de suporte hídrico.',
        proximo: 'arb_calc_grupo_a'
      },
      {
        id: 'arb_calc_grupo_a',
        tipo: 'calculadora',
        texto: 'Calcular Reposição Hídrica Domiciliar (Grupo A):',
        subtexto: 'Calcule o volume total diário recomendado de hidratação oral domiciliar abundante necessário para mitigar complicações perfusionais de desidratação secundária.',
        calculadoraId: 'dengue',
        proximo: 'arb_grupo_a_checklist'
      },
      {
        id: 'arb_grupo_a_checklist',
        tipo: 'checklist',
        texto: 'Checklist de Orientações Preventivas e Clínicas para o Grupo A:',
        subtexto: 'O tratamento bem delineado previne a evolução desfavorável em domicílio.',
        checklistItems: [
          { id: 'arb_ac1', texto: 'Orientar hidratação oral intensa (meta de 60 mL/kg/dia), sendo 1/3 do volume total por Soro de Reidratação Oral (SRO) de farmácia e o restante (2/3) com líquidos caseiros (água de coco, sucos, soros caseiros, chás).' },
          { id: 'arb_ac2', texto: 'Escrever no prontuário e receitar sintomáticos orais (Dipirona ou Paracetamol). Proibir terminantemente AAS e outros anti-inflamatórios!' },
          { id: 'arb_ac3', texto: 'Sinalizar detalhadamente os sinais de perigo por escrito (dor na barriga intensa, náusea incessante, tontura, mancha roxa na pele).' },
          { id: 'arb_ac4', texto: 'Anotar em cartão da dengue data obrigatória de retorno médico na fase pós-defervescência da febre (entre o 3º e 7º dia do início dos sintomas) para checar o hematócrito.' }
        ],
        proximo: 'arb_diferencial_sindromes'
      },
      {
        id: 'arb_diferencial_sindromes',
        tipo: 'checklist',
        texto: 'Diagnóstico Clínico Diferencial das Arboviroses Comuns:',
        subtexto: 'Diferenças clínicas basilares auxiliam o raciocínio diagnóstico e vigilância epidemiológica secundária.',
        checklistItems: [
          { id: 'db_df1', texto: 'DENGUE: Febre de início abrupto (39-40ºC), cefaleia intensa, dor retroorbital acentuada, mialgias generalizadas intensas, leucopenia/plaquetopenia marcantes com hematócrito flutuante, alto risco de choque hemorrágico.' },
          { id: 'db_df2', texto: 'ZIKA: Exantema maculopapular avermelhado intensamente pruriginoso surgindo precocemente (dia 1 ou 2), hiperemia conjuntival bilateral não purulenta, febre baixa ou ausente, mialgia/artralgia muito leve. Risco neurológico (Guillain-Barré, microcefalia congênita).' },
          { id: 'db_df3', texto: 'CHIKUNGUNYA: Febre alta abrupta acompanhada de poliartrite intensa, simétrica e incapacitante acometendo principalmente articulações de mãos, punhos e pés, acompanhada de edema doloroso importante. Risco evolutivo de artralgia por longos meses (fase crônica).' }
        ],
        proximo: 'arb_grupo_a_fim'
      },
      {
        id: 'arb_grupo_a_fim',
        tipo: 'encaminhamento',
        texto: 'Alta Médica com Monitoramento Epidemiológico Domiciliar:',
        subtexto: 'Encaminhar o paciente para repouso absoluto domiciliar. Emitir a notificação compulsória para controle de vetores municipal e orientar retorno médico imediato caso ocorra piora ou tonturas.'
      }
    ]
  }
];

