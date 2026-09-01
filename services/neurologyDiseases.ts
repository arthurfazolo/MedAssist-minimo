import { MedicalDisease } from '../types';

export const NEUROLOGY_DISEASES: Omit<MedicalDisease, 'achados_exames' | 'criterios_diagnosticos'>[] = [
  {
    id: 'G43.0',
    nome: 'Enxaqueca sem Aura (Migrânea)',
    sintomas: [
      'Cefaleia unilateral, pulsátil, de moderada a forte intensidade',
      'Náuseas e/ou vômitos associados',
      'Fotofobia e fonofobia intensas durante as crises',
      'Piora com atividades físicas rotineiras'
    ],
    fatores_risco: [
      'Histórico familiar positivo de migrânea',
      'Privação de sono ou excesso de sono',
      'Flutuações hormonais (período menstrual)',
      'Estresse emocional e jejum prolongado'
    ],
    red_flags: [
      'Cefaleia de início abrupto (cefaleia em trovão)',
      'Surgimento em maiores de 50 anos ou imunossuprimidos',
      'Presença de febre ou rigidez de nuca associada'
    ],
    diferenciais: [
      'Cefaleia tensional',
      'Cefaleia em salvas',
      'Cefaleia secundária a sinusite',
      'Hemorragia subaracnoide'
    ]
  },
  {
    id: 'G43.1',
    nome: 'Enxaqueca com Aura',
    sintomas: [
      'Escotomas cintilantes ou perda de visão temporária antes da dor',
      'Parestesias ou dormências unilaterais de progressão lenta',
      'Dificuldade transitória para falar (disartria/afasia)',
      'Cefaleia pulsante que se desenvolve após os sintomas visuais'
    ],
    fatores_risco: [
      'Histórico familiar de enxaqueca com aura',
      'Uso de anticoncepcionais orais contendo estrogênio',
      'Tabagismo ativo',
      'Estresse psicológico elevado'
    ],
    red_flags: [
      'Aura com duração superior a 1 hora (aura prolongada)',
      'Déficits motores proeminentes (considerar migrânea hemiplégica ou AVC)',
      'Primeiro episódio de aura em uso de anticoncepcional oral'
    ],
    diferenciais: [
      'Ataque isquêmico transitório (AIT)',
      'Crise epiléptica focal sensorial',
      'Trombose venosa cerebral',
      'Dissecação de artéria carótida ou vertebral'
    ]
  },
  {
    id: 'G44.2',
    nome: 'Cefaleia Tensional',
    sintomas: [
      'Dor opressiva, em aperto, bilateral (tipo capacete/banda)',
      'Intensidade leve a moderada',
      'Ausência de náuseas ou vômitos',
      'Sem piora com atividades físicas diárias'
    ],
    fatores_risco: [
      'Estresse psicossocial, ansiedade ou depressão',
      'Tensão muscular cervical ou de ombros',
      'Postura inadequada no trabalho (computador)',
      'Fadiga muscular e cansaço visual'
    ],
    red_flags: [
      'Mudança drástica no padrão habitual da dor',
      'Associação com perda de peso ou sintomas sistêmicos',
      'Papiledema ao exame de fundo de olho'
    ],
    diferenciais: [
      'Enxaqueca leve',
      'Cefaleia cervicogênica',
      'Artropatia temporomandibular (disfunção da ATM)',
      'Cefaleia por abuso de analgésicos'
    ]
  },
  {
    id: 'G44.0',
    nome: 'Cefaleia em Salvas (Cluster Headache)',
    sintomas: [
      'Dor unilateral orbitária ou temporal extremamente excruciante',
      'Lacrimejamento e injeção conjuntival ipsilateral',
      'Congestão nasal e rinorreia do mesmo lado da dor',
      'Sudorese facial e miose/ptose ipsilaterais (síndrome de Horner transitória)'
    ],
    fatores_risco: [
      'Sexo masculino (proporção maior que feminino)',
      'Tabagismo crônico pesado',
      'Consumo de bebidas alcoólicas (forte gatilho de crise)',
      'Histórico familiar de cefaleia trigêmino-autonômica'
    ],
    red_flags: [
      'Início recente sem histórico prévio de crises semelhantes',
      'Associação com déficits neurológicos persistentes',
      'Febre ou rigidez de nuca'
    ],
    diferenciais: [
      'Neuralgia do trigêmeo',
      'Hemicrania paroxística',
      'Cefaleia neuralgiforme unilateral de curta duração (SUNCT)',
      'Glaucoma agudo de ângulo fechado'
    ]
  },
  {
    id: 'G44.8',
    nome: 'Cefaleia por Abuso de Medicamentos',
    sintomas: [
      'Cefaleia diária ou quase diária refratária',
      'Dependência de analgésicos comuns, triptanos ou opioides',
      'Dor que se exacerba ao acordar ou logo após o efeito do medicamento passar',
      'Irritabilidade, náuseas e cansaço de caráter crônico'
    ],
    fatores_risco: [
      'Diagnóstico de base de enxaqueca ou cefaleia tensional',
      'Uso de analgésicos por mais de 10 a 15 dias por mês por meses',
      'Ansiedade e transtornos de humor crônicos',
      'Automedicação não supervisionada'
    ],
    red_flags: [
      'Nova dor de cabeça progressiva de forte intensidade',
      'Déficit focal associado ou alterações comportamentais agudas',
      'Sinais de hipertensão intracraniana (dor ao tossir ou deitar)'
    ],
    diferenciais: [
      'Cefaleia tensional crônica',
      'Enxaqueca crônica',
      'Hipertensão intracraniana idiopática',
      'Tumor intracraniano'
    ]
  },
  {
    id: 'I63.9',
    nome: 'Acidente Vascular Cerebral Isquêmico (AVCI)',
    sintomas: [
      'Déficit neurológico focal de início súbito (perda de força unilateral)',
      'Assimetria facial (desvio da rima bucal)',
      'Dificuldade aguda na fala ou na compreensão (afasia/disartria)',
      'Perda visual ou alteração de equilíbrio súbitas'
    ],
    fatores_risco: [
      'Hipertensão arterial sistêmica, Diabetes mellitus e dislipidemia',
      'Fibrilação atrial ou outras arritmias emboligênicas',
      'Tabagismo ativo, sedentarismo e obesidade',
      'Idade avançada e histórico de estenose carotídea'
    ],
    red_flags: [
      'Instalação hiperaguda nos limites de janela trombolítica (4,5h) ou de trombectomia mecânica',
      'Rebaixamento do nível de consciência crônico associado (edema cerebral extenso)',
      'Associação com dor cervical ou torácica súbitas (dissecação arterial)'
    ],
    diferenciais: [
      'Ataque isquêmico transitório (AIT)',
      'Paralisia de Todd pós-crise epiléptica',
      'Enxaqueca hemiplégica',
      'Hipoglicemia grave simetrizante'
    ]
  },
  {
    id: 'I61.9',
    nome: 'Acidente Vascular Cerebral Hemorrágico (AVCH)',
    sintomas: [
      'Instalação abrupta de déficit neurológico focal',
      'Cefaleia de forte intensidade de início súbito com vômitos',
      'Níveis transfusionais tensionais marcadamente elevados em minutos',
      'Deterioração rápida do nível de consciência (torpor ou coma)'
    ],
    fatores_risco: [
      'Hipertensão arterial não controlada crônica (causa principal microaneurismas de Charcot-Bouchard)',
      'Uso de anticoagulantes orais ou antiagregantes plaquetários',
      'Angiopatia amiloide cerebral (em idosos, usualmente lobar)',
      'Uso de drogas ilícitas simpaticomiméticas (cocaína, anfetaminas)'
    ],
    red_flags: [
      'Sinais de herniação cerebral (anisocoria, bradicardia + hipertensão - tríade de Cushing)',
      'Escala de Coma de Glasgow menor que 8 demandando via aérea definitiva',
      'Extensão para sistema ventricular com hidrocefalia aguda'
    ],
    diferenciais: [
      'AVC Isquêmico',
      'Encefalopatia hipertensiva',
      'Hematoma subdural agudo pós-traumático',
      'Meningite aguda purulenta'
    ]
  },
  {
    id: 'I60.9',
    nome: 'Hemorragia Subaracnoide (HSA)',
    sintomas: [
      'Cefaleia de início explosivo, instantânea (Thunderclap - pior dor da vida)',
      'Vômitos precoces em jato e fotofobia severa',
      'Sinais meníngeos (rigidez de nuca, sinais de Brudzinski e Kernig)',
      'Perda transitória da consciência no início do sangramento'
    ],
    fatores_risco: [
      'Presença de aneurismas saculares cerebrais congênitos',
      'Hipertensão arterial e tabagismo ativo crônico',
      'Alcoolismo pesado',
      'Histórico familiar de ruptura de aneurisma ou doença renal policística'
    ],
    red_flags: [
      'Sinais focais (como midríase unilateral por compressão do III par craniano por aneurisma de comunicante posterior)',
      'Ressegramento precoce agudo com colapso respiratório',
      'Crises convulsivas iniciais de difícil controle'
    ],
    diferenciais: [
      'Cefaleia em salvas trigeminal',
      'Meningite bacteriana aguda',
      'Cefaleia primária da atividade sexual',
      'Síndrome de vasoconstrição cerebral reversível (SVCR)'
    ]
  },
  {
    id: 'G45.9',
    nome: 'Ataque Isquêmico Transitório (AIT)',
    sintomas: [
      'Déficit neurológico focal súbito idêntico ao AVC com reversão completa em menos de 24 horas (geralmente < 1 hora)',
      'Alteração transitória de força ou sensibilidade de um hemicorpo',
      'Amaurose fugaz unilateral transitória ou dislalia episódica',
      'Ausência de infarto agudo demonstrável em exames de imagem de urgência'
    ],
    fatores_risco: [
      'Estenose de artérias carótidas ou vertebrais de alto grau',
      'Cardiopatia emboligênica (fibrilação atrial)',
      'Presença de fatores clássicos: hipertensão, diabetes, tabagismo',
      'Idade de risco elevada (calculada pelo escore ABCD2)'
    ],
    red_flags: [
      'Episódios recorrentes e frequentes (AIT em crescendo - risco altíssimo de AVC iminente)',
      'Escore ABCD2 maior ou igual a 4 sugerindo internação hospitalar de urgência',
      'Sopro carotídeo ipsilateral audível significante'
    ],
    diferenciais: [
      'Migrânea com aura sem cefaleia (equivalente enxaquecoso)',
      'Crise epiléptica focal com paralisia de Todd curta',
      'Labirintite ou neurite vestibular aguda',
      'Distúrbio eletrolítico ou hipoglicemia transitória'
    ]
  },
  {
    id: 'G40.9',
    nome: 'Crise Epiléptica Tônico-Clônica Generalizada',
    sintomas: [
      'Perda súbita de consciência com queda ao solo se em pé',
      'Fase tônica de rigidez generalizada seguida de abalos clônicos simétricos',
      'Sialorreia (salivação espumosa), mordedura lateral de língua e incontinência urinária',
      'Período pós-ictal de sonolência profunda, confusão mental e cefaleia difusa'
    ],
    fatores_risco: [
      'Epilepsia pré-existente ou histórico familiar de crises convulsivas',
      'Privação de sono severa estrutural recente',
      'Uso de substâncias pró-convulsivantes ou abstinência de álcool/benzodiazepínicos',
      'Lesão estrutural prévia (cicatriz de AVC, TCE, malformações)'
    ],
    red_flags: [
      'Duração da atividade convulsiva motora maior que 5 minutos ou sem recuperação de consciência entre crises (Estado de Mal Epiléptico)',
      'Presença de febre alta associada em adultos sem causa óbvia (sinal de neuroinfecção)',
      'Déficit neurológico focal novo duradouro no pós-ictal'
    ],
    diferenciais: [
      'Síncope vasovagal com abalos mioclônicos curtos',
      'Crise não epiléptica psicogênica (CNEP)',
      'Crises de pânico graves hiperventilantes',
      'Ataque isquêmico transitório do território vertebrobasilar'
    ]
  },
  {
    id: 'G40.5',
    nome: 'Estado de Mal Epiléptico (Status Epilepticus)',
    sintomas: [
      'Atividade convulsiva contínua prolongada por mais de 5 minutos',
      'Ocorrência de duas ou mais crises consecutivas sem recuperação do nível de consciência no intervalo',
      'Pode apresentar crises motoras francas ou apenas sutis (crises subclínicas, abalos oculares ou rítmicos distais)',
      'Rebaixamento do nível de consciência persistente, estupor ou coma instável'
    ],
    fatores_risco: [
      'Abandono ou redução inadequada de medicamentos antiepilépticos de uso crônico',
      'Acidente vascular cerebral recente, infecção do sistema nervoso central ou trauma craniano',
      'Distúrbios metabólicos severos (hiponatremia, hipocalcemia ou uremia)',
      'Intoxicação aguda por medicamentos (ex. antidepressivos tricíclicos, teofilina)'
    ],
    red_flags: [
      'Necessidade iminente de intubação orotraqueal por insuficiência ventilatória orgânica ou hipóxia',
      'Rabdomiólise macroscópica com insuficiência renal aguda devido a contrações prolongadas',
      'Instabilidade hemodinâmica acelerada decorrente de hiperatividade simpática contínua'
    ],
    diferenciais: [
      'Estado de mal psicogênico (pseudo-status psicogênico não epiléptico)',
      'Movimentos involuntários coreicos ou mioclônicos generalizados graves',
      'Encefalopatia metabólica flutuante agressiva',
      'Síndrome neuroléptica maligna'
    ]
  },
  {
    id: 'R56.0',
    nome: 'Crise Convulsiva Febril na Infância',
    sintomas: [
      'Crise convulsiva generalizada de curta duração (menos de 15 minutos) em vigência de febre',
      'Geralmente ocorre no primeiro dia de elevação térmica da temperatura corporal',
      'Recuperação rápida e completa da consciência após a crise',
      'Acomete crianças pequenas tipicamente entre 6 meses e 5 anos de idade'
    ],
    fatores_risco: [
      'Histórico familiar positivo de crises febris na infância',
      'Infecções virais frequentes das vias aéreas superiores ou gastroenterites agudas',
      'Ascensão térmica muito rápida da temperatura corporal basal'
    ],
    red_flags: [
      'Crise febril dita complexa: duração > 15 minutos, padrão focal ou recidiva em menos de 24 horas',
      'Presença de sinais de irritação meníngea (abaulamento de fontanela em lactentes)',
      'Presença de letargia ou sonolência patológica prolongada pós-crise'
    ],
    diferenciais: [
      'Meningite bacteriana ou viral aguda infantil',
      'Encefalite por vírus herpes simples',
      'Calafrios febris intensos simulando abalos clônicos',
      'Primeira crise de epilepsia geneticamente determinada desencadeada por febre'
    ]
  },
  {
    id: 'G20',
    nome: 'Doença de Parkinson',
    sintomas: [
      'Tremor de repouso assimétrico clássico (tipo "contar moedas")',
      'Rigidez muscular plástica (sinal da roda dentada ao exame físico)',
      'Bradicinesia marcante (lentificação motora fina e de marcha)',
      'Instabilidade postural crônica com passos curtos e perda de reflexo de retropulsão'
    ],
    fatores_risco: [
      'Idade avançada (acima de 60 anos)',
      'Exposição ocupacional a pesticidas ou metais pesados históricos',
      'Histórico familiar da doença',
      'Transtorno comportamental do sono REM anos antes dos sintomas motores'
    ],
    red_flags: [
      'Quedas frequentes e precoces no primeiro ano de evolução (aponta para Paralisia Supranuclear Progressiva)',
      'Disfunção autonômica grave precoce com hipotensão ortostática debilitante (Atrofia de Múltiplos Sistemas)',
      'Demência precoce ou alucinações visuais estruturadas agudas'
    ],
    diferenciais: [
      'Tremor essencial benigno',
      'Parkinsonismo secundário induzido por drogas neurolépticas (bloqueadores dopaminérgicos)',
      'Paralisia Supranuclear Progressiva (PSP)',
      'Hidrocefalia de pressão normal'
    ]
  },
  {
    id: 'G25.0',
    nome: 'Tremor Essencial',
    sintomas: [
      'Tremor cinético ou postural bilateral simétrico nas mãos e antebraços',
      'Ausência de tremor de repouso significativo',
      'Piora visível com estresse, fadiga física ou tarefas de precisão',
      'Melhora temporária característica após ingestão de pequenas doses de álcool'
    ],
    fatores_risco: [
      'Hereditariedade forte de herança autossômica dominante',
      'Idade madura ou idoneidade (início em jovens ou em idosos)',
      'Uso excessivo de estimulantes como cafeína'
    ],
    red_flags: [
      'Instalação abrupta recente ou progressão rápida de sintomas em poucos meses',
      'Associação com assimetria severa do tremor ou rigidez e bradicinesia de membro',
      'Presença de disartria concomitante ou alteração persistente de marcha'
    ],
    diferenciais: [
      'Tremor parkinsoniano',
      'Hipertiroidismo (tremor fisiológico exacerbado)',
      'Tremor cerebelar intencional (disfunção cerebelar)',
      'Tremor induzido por carbonato de lítio ou amiodarona'
    ]
  },
  {
    id: 'G30.9',
    nome: 'Doença de Alzheimer',
    sintomas: [
      'Déficit progressivo de memória recente de fixação',
      'Desorientação espaço-temporal frequente no dia-a-dia',
      'Dificuldades progressivas de linguagem (anomia ou hesitação verbal)',
      'Perda de autonomia para realização de atividades da vida diária'
    ],
    fatores_risco: [
      'Idade avançada (principal fator de risco não modificável)',
      'Histórico familiar de demência precoce',
      'Baixo nível de escolaridade formal e inatividade cognitiva',
      'Fatores de risco cardiovascular não controlados na meia-idade (has, diabetes)'
    ],
    red_flags: [
      'Declínio cognitivo extremamente rápido em semanas ou meses (suspeitar de etiologia priônica ou autoimune)',
      'Surgimento precoce de mioclonias ou crises epilépticas focais',
      'Sintomas psiquiátricos agudos graves com agitação refratária colocando em risco o paciente'
    ],
    diferenciais: [
      'Déficit cognitivo leve ou depressão geriátrica (pseudodemência)',
      'Hipotireoidismo severo ou deficiência grave de vitamina B12',
      'Demência vascular cortical',
      'Hidrocefalia de pressão normal'
    ]
  },
  {
    id: 'F01.9',
    nome: 'Demência Vascular',
    sintomas: [
      'Declínio cognitivo com padrão em degraus (piora após eventos isquêmicos evidentes)',
      'Flutuação cognitiva associada a déficits neurológicos focais permanentes',
      'Disfunção executiva proeminente desproporcional à perda de memória pura',
      'Sintomas motores precoces de marcha (marcha senil de passos curtos/apraxica)'
    ],
    fatores_risco: [
      'Histórico documentado de múltiplos acidentes vasculares cerebrais',
      'Hipertensão arterial sistêmica crônica descontrolada',
      'Tabagismo prolongado e aterosclerose de grandes vasos',
      'Diabetes mellitus de longa data com lesões microvasculares'
    ],
    red_flags: [
      'Episódios agudos repetitivos de deterioração sem causa local esclarecida',
      'Acúmulo de infartos lacunares múltiplos em áreas críticas (tálamo ou giro do cíngulo)',
      'Sintomas pseudobulbares agudos (choro/riso incontidos, disfagia grave)'
    ],
    diferenciais: [
      'Doença de Alzheimer pura',
      'Demência por Corpos de Lewy',
      'Hipertensão intracraniana',
      'Encefalopatia urêmica crônica'
    ]
  },
  {
    id: 'G31.0',
    nome: 'Demência Frontotemporal (DFT)',
    sintomas: [
      'Alteração profunda de personalidade com desinibição social severa precoce',
      'Apatia acentuada ou perda de empatia interpessoal marcante',
      'Comportamentos perseverativos silenciosos ou rituais estereotipados compulsivos',
      'Dificuldade progressiva de fala (afasia progressiva primária)'
    ],
    fatores_risco: [
      'Histórico familiar direto de DFT ou esclerose lateral amiotrófica (correlação genética C9orf72)',
      'Idade de acometimento precoce (frequentemente entre 45 e 65 anos)',
      'Mutações genéticas conhecidas nos genes MAPT ou GRN'
    ],
    red_flags: [
      'Associação com sinais de neurônio motor inferior/superior (morfologia de SLA associada à DFT)',
      'Disfagia mecânica progressiva com alto risco de broncoaspiração de saliva ou alimentos',
      'Surtos psicóticos com agressividade incontrolável'
    ],
    diferenciais: [
      'Esquizofrenia de início tardio ou transtorno bipolar de humor refratário',
      'Doença de Alzheimer variante frontal',
      'Depressão grave refratária de meia-idade',
      'Paralisia supranuclear progressiva'
    ]
  },
  {
    id: 'G31.8',
    nome: 'Demência por Corpos de Lewy',
    sintomas: [
      'Déficit cognitivo progressivo com marcantes flutuações de atenção ao longo do dia',
      'Alucinações visuais recorrentes muito bem estruturadas e precoces',
      'Parkinsonismo extrapiramidal espontâneo sem exposição prévia a neurolépticos',
      'Transtorno comportamental do sono REM exuberante e quedas repetitivas'
    ],
    fatores_risco: [
      'Idade avançada maior do que 65 anos',
      'Sexo masculino discreta preferência',
      'Histórico de transtorno do humor prévio crônico'
    ],
    red_flags: [
      'Hipersensibilidade extrema aos medicamentos neurolépticos (crise extrapiramidal grave ou choque pós-dose)',
      'Hipotensão ortostática grave levando a síncopes traumáticas recorrentes',
      'Instabilidade hemodinâmica inexplicável por flutuação autonômica central'
    ],
    diferenciais: [
      'Doença de Parkinson com demência tardia',
      'Doença de Alzheimer associada a quadro psicótico',
      'Delirium agudo sobreposto por infecção subjacente',
      'Demência vascular'
    ]
  },
  {
    id: 'G91.2',
    nome: 'Hidrocefalia de Pressão Normal (HPN)',
    sintomas: [
      'Tríade clássica de Hakim-Adams: apraxia de marcha (pés grudados ao chão)',
      'Incontinência urinária de início precoce',
      'Deterioração cognitiva subcortical progressiva em meses',
      'Melhora transitória visível da marcha após punção lombar de alívio (Tap Test)'
    ],
    fatores_risco: [
      'Idade superior a 60 anos',
      'Histórico remoto de hemorragia subaracnoide, traumatismo cranioencefálico ou meningite',
      'Estenose congênita leve do aqueduto de Sylvius'
    ],
    red_flags: [
      'Cefaleia matinal acompanhada de vômitos incoercíveis (sinal de evolução para padrão hipertensivo)',
      'Surgimento de papiledema ou restrição do olhar conjugado superior',
      'Rápido rebaixamento mental inexplicado por distúrbios de eletrólitos'
    ],
    diferenciais: [
      'Doença de Parkinson idiopática',
      'Demência multi-infarto subcortical',
      'Espondilose cervical compressiva com mielopatia cervical',
      'Paralisia supranuclear progressiva'
    ]
  },
  {
    id: 'G35',
    nome: 'Esclerose Múltipla',
    sintomas: [
      'Surtos neurológicos disseminados no tempo e espaço anatômico',
      'Neurite óptica unilateral dolorosa com perda visual temporária clássica',
      'Mielite transversa segmentar com parestesia e alteração de força de nível sensitivo',
      'Parestesias recorrentes ou fenômeno de Lhermitte (sensação de choque no pescoço ao flecti-lo)'
    ],
    fatores_risco: [
      'Adulto jovem, sexo feminino (proporção 3:1)',
      'Baixa exposição solar crônica habitual e deficiência de Vitamina D',
      'Infecção remota documentada pelo vírus Epstein-Barr (EBV)',
      'Habitar regiões geográficas de alta latitude na infância'
    ],
    red_flags: [
      'Insuficiência ventilatória aguda por mielite cervical alta compressiva',
      'Surgimento de convulsões ou sinais encefalopáticos generalizados difusos',
      'Surto agudo refratário a pulsoterapia com metilprednisolona e instabilidade autonômica'
    ],
    diferenciais: [
      'Neuromielite óptica (NMO - anticorpo anti-AQP4 positivo)',
      'Doença associada ao MOG (MOGAD)',
      'Lúpus eritematoso sistêmico com acometimento do SNC',
      'Neurossífilis meningovascular'
    ]
  },
  {
    id: 'G51.0',
    nome: 'Paralisia Facial de Bell (Paralisia Periférica)',
    sintomas: [
      'Fraqueza muscular flácida unilateral completa de todo o hemicorpo facial',
      'Impossibilidade de ocluir o olho do lado afetado (sinal de Bell positivo ao tentar)',
      'Perda ou alteração do paladar nos dois terços anteriores da língua (disgeusia)',
      'Hiperacusia ipsilateral (sensibilidade dolorosa a sons fortes) e dor retroauricular'
    ],
    fatores_risco: [
      'Infecção ou reativação do Herpes Simples Vírus tipo 1 ou Varicela-Zoster',
      'Diabetes mellitus gestacional ou gravidez no terceiro trimestre',
      'Exposição direta a rajadas de vento frio ou estresse agudo físico'
    ],
    red_flags: [
      'Acometimento exclusivo dos músculos da metade inferior da face (sinal de paralisia central - AVC)',
      'Erupção de vesículas dolorosas em conduto auditivo externo (Síndrome de Ramsay Hunt)',
      'Ausência de melhora após 3 meses de tratamento correto'
    ],
    diferenciais: [
      'Acidente vascular cerebral cortical acometendo área motora (paralisia facial central)',
      'Neoplasia de glândula parótida invadindo trajetos do nervo facial',
      'Meningite de base crônica associada (tuberculose ou sarcoidose)',
      'Mononeurite múltipla por vasculite ativa'
    ]
  },
  {
    id: 'G50.0',
    nome: 'Neuralgia do Trigêmeo',
    sintomas: [
      'Dor repentina em paroxismos lancinantes, tipo choque ou facada elétrica',
      'Localização em derme de território ipsilateral correspondente aos ramos maxilar (V2) ou mandibular (V3)',
      'Duração de segundos a 2 minutos com períodos refratários',
      'Desencadeamento por gatilhos leves: escovar dentes, barbear-se, vento na cara ou mastigar'
    ],
    fatores_risco: [
      'Compressão neurovascular crônica por alça da artéria cerebelar superior',
      'Esclerose múltipla com placas desmielinizantes no tronco cerebral',
      'Idade avançada maior de 50 anos de idade'
    ],
    red_flags: [
      'Presença de déficits neurológicos sensitivos fixos objetiváveis na face (parestesia persistente)',
      'Acometimento exclusivo do ramo oftálmico (V1) inexplicado sem dor típica',
      'Dor bilateral síncrona sugerindo fortemente esclerose múltipla idiopática'
    ],
    diferenciais: [
      'Cefaleia em salvas',
      'Disfunção dolorosa da articulação temporomandibular (ATM)',
      'Pulpite dentária aguda não diagnosticada',
      'Arterite de células gigantes temporal'
    ]
  },
  {
    id: 'G56.0',
    nome: 'Síndrome do Túnel do Carpo',
    sintomas: [
      'Parestesia e dormência dolorosa na face palmar dos três primeiros dedos da mão',
      'Piora noturna exuberante que acorda o paciente ou de manhã cedo',
      'Melhora temporária ao sacudir vigorosamente as mãos (sinal do sacudir de mãos)',
      'Atrofia tenar tardia e dor irradiada para o antebraço à compressão regional'
    ],
    fatores_risco: [
      'Atividade ocupacional com movimentos repetitivos de flexo-extensão do punho',
      'Hipotireoidismo de longa data ou amiloidose sistêmica',
      'Diabetes mellitus e obesidade moderada a severa',
      'Gravidez (retenção de líquidos canaliculares)'
    ],
    red_flags: [
      'Déficit motor grave de oponência do polegar com incapacidade funcional motora de pinça',
      'Início bimanual simultâneo rápido agudo (investigar doenças inflamatórias)',
      'Dor intratável que não responde a repouso noturno ou tala de punho'
    ],
    diferenciais: [
      'Radiculopatia cervical C6 compressiva',
      'Síndrome do pronador redondo',
      'Artrite reumatoide do punho',
      'Polineuropatia diabética simétrica inicial'
    ]
  },
  {
    id: 'G61.0',
    nome: 'Síndrome de Guillain-Barré',
    sintomas: [
      'Fraqueza muscular flácida ascendente rapidamente progressiva em dias',
      'Parestesias ou dormências distais nas extremidades dos membros',
      'Arreflexia ou hiporreflexia global profunda precoce ao exame físico',
      'Disfunção autonômica importante (flutuação de pressão, taquiarritmia, constipação)'
    ],
    fatores_risco: [
      'Histórico recente de gastroenterite aguda por Campylobacter jejuni (1 a 4 semanas antes)',
      'Infecção respiratória viral aguda prévia (influenza, vírus Epstein-Barr, Zika)',
      'Cirurgias de grande porte recentes'
    ],
    red_flags: [
      'Progressão acelerada de fraqueza com queda da capacidade ventilatória forçada (insuficiência respiratória)',
      'Disfagiana com paralisia bulbar aguda facilitando broncoaspiração mecânica',
      'Parada cardíaca súbita decorrente de disautonomia cardíaca severa'
    ],
    diferenciais: [
      'Mielite transversa aguda',
      'Botulismo alimentar',
      'Paralisia hipocalêmica periódica metabólica',
      'Miopatia inflamatória aguda'
    ]
  },
  {
    id: 'G70.0',
    nome: 'Miastenia Gravis',
    sintomas: [
      'Fraqueza muscular sem alteração de sensibilidade de caráter flutuante',
      'Fatigabilidade patológica (piora ao longo da repetição motora do dia e melhora com repouso)',
      'Ptose palpebral flutuante e diplopia (visão dupla) assimétrica',
      'Fraqueza proeminente de músculos retrobulbares com fonação anasalada e mastigação difícil'
    ],
    fatores_risco: [
      'Presença de hiperplasia tímica ou tumor tímico (timoma associado)',
      'Histórico familiar ou pessoal de outras doenças autoimunes de tireoide',
      'Uso inadvertido de medicações contraindicadas (beta-bloqueadores, aminoglicosídeos)'
    ],
    red_flags: [
      'Crise miastênica aguda com colapso respiratório ou incapacidade total de deglutir saliva',
      'Infecção respiratória bacteriana sobreposta que atua como potente gatilho de crise generalizada',
      'Diplopia fixa completa sem resposta rápida à piridostigmina'
    ],
    diferenciais: [
      'Síndrome de Lambert-Eaton (neuromuscular paraneoplásica)',
      'Paralisia bulbar progressiva por ELA',
      'Neurite óptica bilateral inflamatória',
      'Miopatia mitocondrial crônica'
    ]
  },
  {
    id: 'G12.2',
    nome: 'Esclerose Lateral Amiotrófica (ELA)',
    sintomas: [
      'Fraqueza motora assimétrica progressiva de evolução insidiosa e proximal',
      'Associação concomitante de sinais de neurônio motor superior (espasticidade, hiperreflexia, frouxidão plantar extensora)',
      'Associação concomitante de sinais de neurônio motor inferior (atrofia muscular progressiva de interósseos, fasciculações)',
      'Presença frequente de labilidade emocional de caráter pseudobulbar (choro desproporcional)'
    ],
    fatores_risco: [
      'Faixa etária entre 50 e 70 anos de idade',
      'Mutação genética hereditária familiar clássica no gene SOD1 ou mutação C9orf72',
      'Exposição crônica militar ou a toxinas ambientais em plantações agrícolas'
    ],
    red_flags: [
      'Dificuldade sustentada de manter oxigenação por fraqueza diafragmática (ortopneia precoce)',
      'Disfagia mecânica progressiva com sialorreia crônica severa e episódios frequentes de asfixia',
      'Fasciculações generalizadas difusas de língua em repouso precoce'
    ],
    diferenciais: [
      'Mielopatia cervical compressiva severa degenerativa',
      'Síndrome pós-pólio tardia',
      'Neuropatia motora multifocal com bloqueio de condução (NMM)',
      'Miopatia crônica por corpos de inclusão'
    ]
  },
  {
    id: 'E51.2',
    nome: 'Encefalopatia de Wernicke',
    sintomas: [
      'Tríade clássica aguda: confusão mental/delirium flutuante',
      'Oftalmoplegia ocular externa ou nistagmo multidirecional',
      'Ataxia de marcha proeminente de base alargada com desequilíbrio e quedas',
      'Melhora hiperaguda dos achados oculares após administração precoce de tiamina endovenosa'
    ],
    fatores_risco: [
      'Alcoolismo crônico pesado com desnutrição calórico-proteica grave',
      'Hiperêmese gravídica crônica refratária não suplementada com tiamina',
      'Cirurgia bariátrica ou ressecções gastrointestinais extensas sem suporte vitamínico',
      'Nutrição parenteral prolongada sem infusão de complexo vitamínico solúvel'
    ],
    red_flags: [
      'Infusão rápida inadvertida de soluções de glicose hipertônica sem tiamina prévia (gatilho para precipitar a síndrome)',
      'Evolução crônica para Síndrome de Korsakoff (amnésia anterógrada lacunária profunda irreversível com confabulações)',
      'Coma prolongado com hipotermia ou hipotensão central grave'
    ],
    diferenciais: [
      'Acidente vascular cerebral isquêmico do território vertebrobasilar',
      'Encefalite por vírus herpes simples tipo 1',
      'Delirium tremens por abstinência alcoólica',
      'Meningite asséptica ou bacteriana subaguda'
    ]
  },
  {
    id: 'G00.9',
    nome: 'Meningite Bacteriana Aguda',
    sintomas: [
      'Tríade clássica: febre alta de início súbito, rigidez de nuca persistente',
      'Alteração do nível de consciência variando de confusão a coma profundo',
      'Cefaleia holocraniana intensa acompanhada de fotofobia e vômitos',
      'Presença de rigidez meníngea exuberante demonstrada por sinal de Kernig e Brudzinski'
    ],
    fatores_risco: [
      'Exposição comunitária a surtos virais ou bacterianos em quartéis ou escolas',
      'Pacientes asplênicos anatômicos ou funcionais ou imunodeficiência humoral',
      'Presença de fístula liquórica por fratura basilar de crânio remota ou sinusites agudas'
    ],
    red_flags: [
      'Presença de lesões purpúricas ou petéquias cutâneas disseminadas (sinal de meningococcemia fulminante)',
      'Crises epilépticas focais intratáveis acompanhando herniação cerebral',
      'Choque séptico distributivo refratário com falência múltipla de órgãos'
    ],
    diferenciais: [
      'Meningite viral asséptica leve',
      'Hemorragia subaracnoide catastrófica',
      'Encefalite herpética profunda',
      'Abscesso cerebral bacteriano'
    ]
  },
  {
    id: 'G04.9',
    nome: 'Encefalite Viral Aguda',
    sintomas: [
      'Febre aguda acompanhada de cefaleia progressiva severa',
      'Alterações marcantes do comportamento, alucinações e estados de agitação psicomotora',
      'Déficits de memória de início agudo ou crises epilépticas focais intratáveis',
      'Deterioração rápida do sensório com sonolência extrema ou coma'
    ],
    fatores_risco: [
      'Imunocomprometimento grave ou pacientes idosos suscetíveis a neurovírus',
      'Histórico ou ausência de vacinação apropriada contra raiva ou arbovírus regionais',
      'Infecção concomitante ativa por vírus Herpes Simples tipo 1 ou Varicela-Zoster'
    ],
    red_flags: [
      'Comportamento psicótico abrupto com afasia motora por acometimento bitemporal (clássico de Herpes simplex tipo 1)',
      'Crises repetitivas no estado de mal epiléptico refratário necessitando de UTI',
      'Achados de hipertensão intracraniana descompensada com risco de colapso respiratório'
    ],
    diferenciais: [
      'Meningite bacteriana aguda sem invasão parenquimatosa pura',
      'Encefalite autoimune límbica (anticorpos anti-NMDA)',
      'Psicose funcional aguda inicial (esquizofrenia)',
      'Encefalopatia metabólica flutuante agressiva'
    ]
  },
  {
    id: 'G93.2',
    nome: 'Hipertensão Intracraniana Idiopática (Pseudotumor Cerebral)',
    sintomas: [
      'Cefaleia holocraniana diária que piora ao deitar ou realizar manobra de Valsalva',
      'Turvação visual transitória associada a movimentos de cabeça ou espasmo ocular',
      'Zumbido síncrono com a pulsação cardíaca (zumbido pulsátil)',
      'Presença de papiledema bilateral documentado ao exame de fundo de olho'
    ],
    fatores_risco: [
      'Sexo feminino em idade reprodutiva',
      'Obesidade e ganho ponderal rápido recente marcante',
      'Uso prolongado de medicamentos sistêmicos: tetraciclinas, hormônio de crescimento, retinoides',
      'Presença de apneia obstrutiva do sono severa acompanhante'
    ],
    red_flags: [
      'Restrição progressiva do campo visual periférico irreversível por lesão do nervo óptico',
      'Paralisia unilateral ou bilateral do sexto par craniano (nervo abducente) causando diplopia horizontal fixa',
      'Cefaleia intratável grave com impossibilidade de deitar reta na cama'
    ],
    diferenciais: [
      'Trombose venosa cerebral estrutural',
      'Tumores cerebrais volumosos obstrutivos',
      'Meningite crônica infecciosa (tuberculose ou criptocócica)',
      'Estenose congênita do aqueduto compensada'
    ]
  },
  {
    id: 'H81.1',
    nome: 'Vertigem Posicional Paroxística Benigna (VPPB)',
    sintomas: [
      'Sensação de tontura rotatória intensa (vertigem) desencadeada por mudanças de posição da cabeça',
      'Crises de vertigem curtas que duram menos de 1 minuto em repouso',
      'Presença de nistagmo posicional fatigável provocado pela manobra de Dix-Hallpike ao exame',
      'Sintomas neurovegetativos associados (náuseas intensas, sudorese) sem alterações auditivas'
    ],
    fatores_risco: [
      'Idade média avançada ou histórico de traumatismo cranioencefálico leve prévio',
      'Desprendimento idiopático de otocônias das máculas utriculares e migração para canais semicirculares',
      'Inatividade prolongada no leito ou cirurgias odontológicas traumáticas duradouras'
    ],
    red_flags: [
      'Nistagmo de características centrais puras (vertical puro, não fatigável, sem tontura correspondente)',
      'Associação com outros sinais neurológicos agudos (disartria, disfagia ou ataxia cerebelar na marcha)',
      'Perda auditiva unilateral de início súbito acompanhando'
    ],
    diferenciais: [
      'Neurite vestibular aguda (vertigem persistente por dias)',
      'Acidente vascular cerebral isquêmico cerebelar ou de tronco cerebral',
      'Doença de Meniere clássica',
      'Vertigem de origem central secundária'
    ]
  },
  {
    id: 'H81.0',
    nome: 'Doença de Meniere',
    sintomas: [
      'Episódios espontâneos recorrentes de vertigem intensa com duração de 20 minutos a várias horas',
      'Perda auditiva neurossensorial flutuante unilateral, tipicamente focada em frequências baixas',
      'Presença de zumbido persistente ipsilateral de baixa tonalidade (como rugido)',
      'Sensação subjetiva de plenitude auricular (ouvido cheio/pressão local)'
    ],
    fatores_risco: [
      'Histórico familiar de distúrbio endolinfático',
      'Doenças autoimunes sistêmicas sistêmicotípicas concomitantes',
      'Fatores de estresse pessoal e consumo calórico excessivo de sódio alimentar'
    ],
    red_flags: [
      'Crises de queda vertiginosas súbitas sem perda de consciência (catástrofes otolíticas de Tumarkin)',
      'Instalação de perda auditiva neurossensorial profunda bilateral rápida simétrica',
      'Vertigem com ataxia permanente irreversível de tronco'
    ],
    diferenciais: [
      'Ataque isquêmico transitório da artéria auditiva interna',
      'Schwannoma vestibular unilateral (Neuroma do acústico)',
      'Neurite vestibular viral aguda',
      'Vertigem posicional paroxística benigna'
    ]
  },
  {
    id: 'G62.9',
    nome: 'Polineuropatia Periférica Distal Simétrica',
    sintomas: [
      'Parestesias, formigamentos e dormências bilaterais simétricas em botas e luvas',
      'Queimação noturna dolorosa persistente nas plantas dos pés de caráter crônico',
      'Perda progressiva da sensibilidade vibratória e dolorosa periférica distal',
      'Diminuição ou abolição do reflexo aquileu bilateral ao exame físico'
    ],
    fatores_risco: [
      'Diabetes mellitus de longa duração com mau controle metabólico contínuo',
      'Alcoolismo crônico com deficiência secundária de Vitaminas do complexo B',
      'Uso de agentes quimioterápicos neurotóxicos (taxanos, platinas)',
      'Doença renal crônica terminal não dialisada adequadamente (neuropatia urêmica)'
    ],
    red_flags: [
      'Evolução aguda acelerada com fraqueza proximal de membros em poucos dias ou semanas (suspeitar de polineuropatia desmielinizante inflamatória aguda ou crônica)',
      'Acometimento de padrão assimétrico focal isolado (mononeuropatia múltipla vasculítica ativa)',
      'Instalação de fístulas ou úlceras plantares indolores infectadas profundas (pé diabético complicado)'
    ],
    diferenciais: [
      'Estenose do canal lombar baixo compressiva',
      'Neuropatia hereditária de Charcot-Marie-Tooth de início tardio',
      'Deficiência crônica de Vitamina B12 (mieloneuropatia combinada por degeneração do cordão posterior)',
      'Vasculite periférica sistêmica'
    ]
  },
  {
    id: 'M54.1',
    nome: 'Radiculopatia Lombossacra (Lombociatalgia)',
    sintomas: [
      'Dor lombar grave que irradia pelo trajeto dermatômico correspondente ao membro inferior (especialmente faces lateral e posterior)',
      'Parestesias ou formigamentos no dermátomo de raiz acometida (comumente L5 ou S1)',
      'Dor com exacerbação súbita sob elevação reta do membro inferior estendido (sinal de Lasègue positivo ao exame físico)',
      'Fraqueza focal discreta para dorsiflexão do pé (L5) ou flexão plantar (S1)'
    ],
    fatores_risco: [
      'Processos degenerativos osteodiscais severos com herniação de disco intervertebral',
      'Trabalho físico extenuante com levantamento inadequado e contínuo de cargas pesadas',
      'Sedentarismo acentuado associado a sobrepeso e obesidade classe elevada'
    ],
    red_flags: [
      'Perda aguda de controle esfincteriano anal ou vesical acompanhada de anestesia em sela (Síndrome da Cauda Equina - emergência cirúrgica)',
      'Pé caído flácido agudo com incapacidade motora permanente refratária de dorsiflexão do tornozelo',
      'Presença de febre inexplicada acompanhante em paciente usuário de drogas endovenosas (suspeitar de abscesso epidural ou discite)'
    ],
    diferenciais: [
      'Síndrome dolorosa miofascial crônica do piriforme',
      'Artrose acentuada coxofemoral ipsilateral degenerativa',
      'Estreitamento degenerativo de canal lombar',
      'Trombose venosa profunda de membro inferior'
    ]
  },
  {
    id: 'G25.8',
    nome: 'Síndrome das Pernas Inquietas (SPI)',
    sintomas: [
      'Necessidade imperiosa de mover os membros inferiores estimulada por desconfortos profundos inexplicáveis',
      'Parestesias internas desconfortáveis nas panturrilhas em repouso no final da tarde',
      'Piora marcante noturna que atrasa ou obstrui diretamente a indução normal do sono',
      'Alívio imediato e completo dos desconfortos sob caminhada rápida ou massagem profunda local'
    ],
    fatores_risco: [
      'Deficiência sistêmica latente de ferro sérico (estoques baixos de ferritina medular < 50-75 ng/mL)',
      'Insuficiência renal crônica dialítica ou não dialítica em progressão',
      'Gravidez no terceiro trimestre por flutuação hormonal e ferropenia'
    ],
    red_flags: [
      'Acometimento bimanual doloroso severo associado que impede por completo o repouso geriátrico',
      'Piora aguda dramática após introdução inadvertida de bloqueadores de dopamina ou antidepressivos serotonérgicos'
    ],
    diferenciais: [
      'Insuficiência venosa profunda dolorosa noturna periférica',
      'Polineuropatia periférica dolorosa em botas',
      'Acatisia induzida por neurolépticos farmacológicos',
      'Mialgia miofascial persistente'
    ]
  },
  {
    id: 'G24.3',
    nome: 'Distonia Cervical (Torcicolo Espasmódico)',
    sintomas: [
      'Contrações musculares involuntárias espasmódicas focadas no pescoço levando a desvio ou rotação sustentada da cabeça (torcicolo)',
      'Dor mecânica contínua significativa nos músculos cervicais ipsilaterais hipertrofiados',
      'Presença frequente de truques sensoriais (sensory tricks, como tocar no queixo para reverter a contração distônica)',
      'Início comumente insidioso na idade jovem adulta flutuante'
    ],
    fatores_risco: [
      'Histórico familiar positivo de distonia idiopática focal',
      'Exposição continuada a agentes bloqueadores de receptores de dopamina',
      'Trauma físico local prévio em pescoço ou coluna cervical proximal'
    ],
    red_flags: [
      'Instalação abrupta recente explosiva em idosos sugerindo etiologia metabólica ou medicamentosa grave',
      'Progressão do espasmo com disfagia grave ou compressão persistente de medula cervical',
      'Ausência total de melhora ou resposta a truques táticos estruturados'
    ],
    diferenciais: [
      'Torcicolo muscular congênito residual',
      'Subluxação rotatória atlantoaxial mecânica ortopédica',
      'Discinesia tardia complexa induzida por antipsicóticos',
      'Artrite degenerativa de coluna cervical severa'
    ]
  },
  {
    id: 'G51.3',
    nome: 'Espasmo Hemifacial',
    sintomas: [
      'Contrações motoras involuntárias espasmódicas progressivas tônicas ou clônicas unilaterais dos músculos da hemiface',
      'Início clássico localizado no músculo orbicular do olho se espalhando gradualmente para toda a hemiface',
      'Freqüência aumentada das crises desencadeada por estresse pessoal ou movimentos normais do rosto',
      'Ausência de dor facial pura, mas prejuízo mecânico visual significativo no fechamento do olho'
    ],
    fatores_risco: [
      'Compressão do nervo facial (NC VII) na zona de transição de saída do tronco cerebral por alças de artérias ectásicas',
      'Sequela remota tardia de paralisia de Bell idiomática mal recuperada',
      'Idade avançada superior a 50 anos'
    ],
    red_flags: [
      'Instalação de fraqueza motora facial progressiva simétrica irreversível persistente concomitante',
      'Alteração simultânea de audição de início súbito ipsilateral no mesmo hemisfério',
      'Presença de dor lancinante trigeminal severa mista'
    ],
    diferenciais: [
      'Blefaroespasmo bilateral idiopático focal',
      'Discinesia facial tardia pós-antipsicóticos',
      'Mioquimia facial leve transitória por privação de sono',
      'Paralisia facial incompleta'
    ]
  },
  {
    id: 'G62.6',
    nome: 'Neuropatia Diabética Dolorosa',
    sintomas: [
      'Dor neuropática contínua em queimação profunda iniciada nas pontas dos dedos e plantas dos pés',
      'Marcada alodinia mecânica (sensação de intensa dor sob estímulo de toque leve de lençóis)',
      'Parestesia, queimação e dormência que pioram significativamente à noite',
      'Lenta evolução em botas que ascende de forma simétrica ao longo de anos'
    ],
    fatores_risco: [
      'Diabetes mellitus tipo 1 ou tipo 2 com longa data de história clínica',
      'Altas taxas de hemoglobina glicada mantidas descompensadas persistentemente',
      'Presença de nefropatia e retinopatia diabéticas microvasculares associadas',
      'Tabagismo ativo concomitante e aterosclerose periférica'
    ],
    red_flags: [
      'Perda de força muscular distal de membros inferiores súbita com incapacidade iminente de elevação de pé',
      'Disfunção autonômica cardiovascular sintomática grave (taquicardia em repouso e hipotensão desfavorável)',
      'Presença de artropatia de Charcot articular local crônica com deformação destrutiva óssea'
    ],
    diferenciais: [
      'Polineuropatia inflamatória desmielinizante crônica (CIDP)',
      'Mielopatia por deficiência de Vitamina B12',
      'Isquemia crítica por oclusão de vasos periféricos arteriais',
      'Neuropatia hereditária hereditária'
    ]
  },
  {
    id: 'G56.3',
    nome: 'Paralisia do Nervo Radial',
    sintomas: [
      'Incapacidade de realizar a dorsiflexão do punho e dedos ("mão caída")',
      'Dificuldade de extensão de cotovelo se o acometimento for proximal da axila',
      'Parestesia e dormência no território dorsal do primeiro espaço interdigital espalmador',
      'Instalação rápida clássica após sonolência pesada induzida por álcool repousando braço sobre cadeira ("paralisia do sábado à noite")'
    ],
    fatores_risco: [
      'Uso inadequado prolongado de muletas axilares compressionando trajetos proximais',
      'Traumatismo ou fratura proximal diafisária do úmero por cicatrização óssea',
      'Sono prolongado profundo sobre braço fletido apoiado sob superfícies duras'
    ],
    red_flags: [
      'Ausência completa de resposta neuromotora após 4 semanas de reabilitação e condutas de suporte',
      'Instalação rápida sem histórico de compressão remota ou trauma ósseo esclarecido'
    ],
    diferenciais: [
      'Radiculopatia cervical compressiva C7 lateralizada',
      'Acidente vascular cerebral isquêmico cortical focal isolado',
      'Mielopatia transversa segmentar alta',
      'Mononeurite múltipla inflamatória por vasculite'
    ]
  },
  {
    id: 'G57.3',
    nome: 'Paralisia do Nervo Fibular Comum',
    sintomas: [
      'Incapacidade de realizar a extensão (dorsiflexão) e eversão do tornozelo ("pé caído")',
      'Marcha escarvante (elevação compensatória aumentada do joelho ipsilateral para evitar tropeçar)',
      'Sensação de dormência e parestesia na face anterior e lateral inferior da panturrilha e dorso do pé',
      'Exame de reflexo patelar normal correspondente comparado bilateralmente'
    ],
    fatores_risco: [
      'Hábito repetitivo persistente de sentar de pernas cruzadas por extensos intervalos cotidianos',
      'Uso de gesso ortopédico compressivo refratário ou botas longas excessivamente apertadas',
      'Perda de peso maciça acelerada com atrofia de tecidos de amortecimento peri-cabeça de fíbula'
    ],
    red_flags: [
      'Déficit motor que evolui para fraqueza proximal de quadril e adução simultâneas (indica radiculopatia L4/L5 mista)',
      'Instalação após trauma direto penetrante de fossa poplítea com sangramento ativo',
      'Progressão bilateral simétrica rápida'
    ],
    diferenciais: [
      'Radiculopatia compressiva de raiz de L5 lombar',
      'Plexopatia lombossacra infiltrativa neoplásica',
      'Mononeuropatia múltipla por poliarterite nodosa',
      'Acidente vascular cerebral de córtex motor somatotópico de pé'
    ]
  },
  {
    id: 'G52.1',
    nome: 'Paralisia de Nervos Cranianos (Paralisia do Sexto Par - NC Abducente)',
    sintomas: [
      'Diplopia horizontal (visão dupla) acentuada ao olhar para o lado ipsilateral do olho paralisado',
      'Incapacidade ou limitação marcante de abdução de globo ocular correspondente externamente',
      'Estrabismo convergente evidente do olho doente em face anterior em repouso',
      'Cefaleia discreta acompanhante que se desenvolve pela fadiga ocular'
    ],
    fatores_risco: [
      'Isquemia de vasos finos de abastecimento do nervo (microangiopatia diabética ou hipertensiva)',
      'Hipertensão intracraniana descompensada do cérebro atuando como falso sinal focal compressivo cranial',
      'Trauma cranioencefálico de base de crânio com fratura local focada'
    ],
    red_flags: [
      'Instalação simultânea de midríase ocular fixa com alteração de motilidade completa (paralisia do terceiro par craniano)',
      'Cefaleia violenta súbita acompanhada de papiledema bilateral ou paresias ipsilaterais múltiplas',
      'Déficit auditivo associado do mesmo hemisfério ou dormência sensitiva trigeminal facial'
    ],
    diferenciais: [
      'Oftalmopatia infiltrativa inflamatória da Doença de Graves',
      'Miastenia Grais ocular pura',
      'Acidente vascular cerebral de tronco cerebral focado de par craniano',
      'Fístula carotídeo-cavernosa de alto fluxo'
    ]
  },
  {
    id: 'G54.0',
    nome: 'Plexopatia Braquial',
    sintomas: [
      'Dor severa inicial inexplicada em ombro e membro superior que se irradia para mãos',
      'Fraqueza muscular flácida multifocal em múltiplos dermátomos não correspondentes a uma única raiz ou nervo isolado',
      'Parestesias e dormências que cobrem grandes porções não sistematizadas do braço',
      'Hipotrofia rápida de cintura escapular ou tenar no curso de semanas subsequentes'
    ],
    fatores_risco: [
      'Traumatismo por tração severa de membro superior em quedas de moto (lesão de plexo)',
      'Infiltração metastática neoplásica local (comum em tumores de cume pulmonar - Síndrome de Pancoast)',
      'Neurite inflamatória do plexo braquial pós-viral transitória (Síndrome de Parsonage-Turner)'
    ],
    red_flags: [
      'Presença de Síndrome de Horner ipsilateral acompanhante (miose, ptose, anidrose indicando tração proximal de raiz de T1 posterior)',
      'Massa palpável dura na fossa supraclavicular ou axilar progressiva inexplicada',
      'Perda completa de força e tônus muscular em todo o membro superior flácido acompanhado de dor intratável'
    ],
    diferenciais: [
      'Mononeuropatia compressiva isolada (radial ou ulnar proximal)',
      'Radiculopatia cervical C6/C7 compressiva severa discovertebral',
      'Síndrome do desfiladeiro torácico mecânica',
      'Ombro doloroso osteomiofascial agudo (artrite crônica glenoumeral)'
    ]
  },
  {
    id: 'A81.0',
    nome: 'Doença de Creutzfeldt-Jakob',
    sintomas: [
      'Declínio cognitivo extremamente rápido, devastador, que avança em poucas semanas a meses',
      'Presença marcante de mioclonias generalizadas de forte amplitude disparadas por estímulos sonoros súbitos (startle myoclonus)',
      'Sinais cerebelares progressivos rápidos como ataxia marcada verbal e de marcha cambaleante',
      'Presença frequente de sinais extrapiramidais e mutismo acinético na fase tardia terminal'
    ],
    fatores_risco: [
      'Transmissão esporádica inexplicada idiopática (variante principal mais comum > 85%)',
      'Mutações hereditárias genéticas raras familiares com autossômica dominante no gene PRNP',
      'Histórico de transplante cirúrgico de córnea ou uso remanescente de hormônio de crescimento de origem cadáver humano'
    ],
    red_flags: [
      'Instalação de mutismo acinético precoce com disfagia impossibilitante de deglutir saliva pura',
      'Desenvolvimento de demência profunda terminal em menos de 6 meses acompanhada de traçado eletroencefalográfico com complexos periódicos pontiagudos'
    ],
    diferenciais: [
      'Encefalite autoimune anti-NMDA ou paraneoplásica progressiva rápida',
      'Demência de Alzheimer de evolução atipicamente agressiva',
      'Meningite criptocócica crônica assintomática',
      'Encefalopatia metabólica severa refratária de base'
    ]
  },
  {
    id: 'G90.5',
    nome: 'Síndrome de Dor Regional Complexa (SDRC)',
    sintomas: [
      'Dor severa contínua e queimação persistente desproporcional à lesão tecidual inicial em um membro',
      'Hiperalgesia acentuada e alodinia no membro doloroso afetado',
      'Importante flutuação na temperatura da derme local e coloração avermelhada e cianótica',
      'Edema crônico persistente e atrofia tardia de anexos capilares e unhas cutâneas'
    ],
    fatores_risco: [
      'Histórico de fraturas traumáticas de osso periférico com imobilização prolongada gessada',
      'Entorses severas ou procedimentos cirúrgicos locais invasivos em extremidades',
      'Presença de fatores psicossociais crônicos associados não gerenciados'
    ],
    red_flags: [
      'Atrofia muscular e osteoporose refratária rápida por desuso severo de membro traumatizado',
      'Contraturas fibrosas permanentes das articulações da mão doente inviabilizando reabilitação futuramente',
      'Flictenas e ulcerações na derme sem cicatrização do membro devida à extrema disfunção microvascular'
    ],
    diferenciais: [
      'Mononeuropatia dolorosa compressiva persistente focal',
      'Trombose venosa profunda de membro inferior recorrente',
      'Artrite reumatoide ativa de extremidades',
      'Fasceíte plantar crônica ortopédica'
    ]
  },
  {
    id: 'G47.0',
    nome: 'Insônia Crônica',
    sintomas: [
      'Dificuldade persistente de início de indução de sono (atraso para adormecer > 30 minutos)',
      'Dificuldade de manutenção de sono com múltiplos despertares no decurso noturno',
      'Acordar muito cedo matinal inexplicado com cansaço severo durante o dia',
      'Distúrbios de humor, irritabilidade ou falta de rendimento profissional diurno'
    ],
    fatores_risco: [
      'Presença de ansiedade de desempenho e transtornos do humor crônicos não tratados',
      'Hábitos pálidos de higiene do sono inadequados (uso persistente de telas luminosas à noite)',
      'Uso abusivo de estimulantes ou álcool perto do horário de repouso'
    ],
    red_flags: [
      'Piora de sintomas psiquiátricos com ideação suicida latente secundária à privação crônica',
      'Associação com parassonias violentas motoras noturnas complexas',
      'Desenvolvimento de dependência mecânica forte a moduladores gabatérgicos/benzo'
    ],
    diferenciais: [
      'Síndrome do atraso de fase circadiana do ritmo normal',
      'Apneia obstrutiva do sono obstrutiva obvia',
      'Síndrome das pernas inquietas noturnas'
    ]
  },
  {
    id: 'G47.3',
    nome: 'Apneia Obstrutiva do Sono',
    sintomas: [
      'Ronco alto habitual perturbador noturno de caráter explosivo',
      'Despertares abruptos súbitos referidos com sensação de sufocamento ou engasgo',
      'Sonolência diurna excessiva incapacitante que compromete dirigir e trabalhar',
      'Cefaleia matinal frequente e fadiga difusa ao levantar'
    ],
    fatores_risco: [
      'Obesidade sistêmica persistente e índice de massa corporal elevado',
      'Circunferência do pescoço aumentada (> 40-42 cm)',
      'Anatomia de vias aéreas estreitas (escala de Mallampati III ou IV)'
    ],
    red_flags: [
      'Sonolência catastrófica ao volante com histórico de acidentes automobilísticos repetitivos',
      'Desenvolvimento de hipertensão pulmonar refratária com insuficiência cardíaca direita secundária',
      'Arritmias cardíacas noturnas complexas sustentadas associadas a dessaturações profundas'
    ],
    diferenciais: [
      'Hipotireoidismo descompensado sistêmico severo',
      'Narcolepsia de base clássica (cataplexia sobreposta)',
      'Síndrome de hipoventilação alveolar primária central'
    ]
  },
  {
    id: 'G40.3',
    nome: 'Epilepsia Mioclônica Juvenil (EMJ)',
    sintomas: [
      'Abalos mioclônicos (solavancos musculares) involuntários rápidos e sem perda de consciência',
      'Acometimento preferencial simétrico de ombros e braços pela manhã após acordar',
      'Facilidade extrema de derrubar objetos da mão de manhã devido aos abalos rápidos',
      'Associação frequente com crises tônico-clônicas de início na adolescência'
    ],
    fatores_risco: [
      'Herdabilidade de herança genética complexa poligênica',
      'Idade de surgimento típica na transição da puberdade/fase juvenil (12 a 18 anos de idade)',
      'Episódios disparados fortemente por privação de sono noturno anterior'
    ],
    red_flags: [
      'Surtos contínuos de mioclonias matinais generalizadas evoluindo para crise tônico-clônica franca',
      'Estado de mal mioclônico refratário incapacitando alimentação',
      'Crises recidivantes por fotossensibilidade extrema gerando acidentes domésticos'
    ],
    diferenciais: [
      'Mioclonias fisiológicas do sono normal benignas',
      'Tremor essencial juvenil bilateral das mãos',
      'Tiques motores rítmicos psicogênicos da infância'
    ]
  },
  {
    id: 'G43.3',
    nome: 'Estado de Mal Enxaquecoso (Status Migrânoso)',
    sintomas: [
      'Crise clássica de migrânea ininterrupta com dor incapacitante que ultrapassa 72 horas de duração contínua',
      'Vômitos persistentes severos que impedem hidratação oral ou uso de comprimidos',
      'Desidratação física visível com hipotensão postural postural acompanhante',
      'Prostração intensa, fotofobia e intolerância sonora extrema'
    ],
    fatores_risco: [
      'Automutilação farmacológica ou abuso persistente de analgésicos e triptanos',
      'Estresse psicológico catastrófico de grande vulto recente',
      'Introdução rápida ou flutuações de estrogênio exógeno oral'
    ],
    red_flags: [
      'Instalação de infarto cerebral isquêmico secundário ao vasoespasmo prolongado (enxaqueca com infarto cerebral secundário)',
      'Perda de força motora unilateral ou alteração de equilíbrio fixa na crises',
      'Distúrbio eletrolítico grave secundário aos vômitos repetidos e insuficiência renal aguda'
    ],
    diferenciais: [
      'Hemorragia subaracnoide clássica insidiosa',
      'Trombose venosa cerebral estrutural oclusiva',
      'Meningite viral ou fúngica subaguda',
      'Dissecação de artérias cervicais arteromigranosa de base'
    ]
  },
  {
    id: 'G44.3',
    nome: 'Cefaleia Pós-Traumática',
    sintomas: [
      'Cefaleia diária crônica desenvolvida em até 7 dias após um traumatismo cranioencefálico leve ou moderado',
      'Dor com características mistas que mimetizam migrânea ou cefaleia tensional simétrica',
      'Associação com tontura leve, distúrbios de concentração de memória e irritabilidade (síndrome pós-concussional)',
      'Exames de imagem estrutural de crânio normais sem lesões hemorrágicas agudas'
    ],
    fatores_risco: [
      'Histórico clínico prévio conhecido de cefaleias recorrentes na vida',
      'Ocorrência de concussão cerebral traumática isolada',
      'Lítio e ansiedade concomitante agindo como amplificadores desordenados da dor'
    ],
    red_flags: [
      'Piora progressiva de dor nas semanas subsequentes acompanhada de vômitos matinais (sinal de hematoma subdural crônico progressivo)',
      'Déficit neurológico focal novo tardio ou alteração persistente de comportamento mental',
      'Crises epilépticas focais ou generalizadas novas de aparecimento tardio pós-trauma'
    ],
    diferenciais: [
      'Hematoma subdural crônico compressivo cerebral',
      'Cefaleia cervicogênica secundária a chicoteamento cervical de coluna',
      'Fístula liquórica por fratura basilar de crânio'
    ]
  },
  {
    id: 'G93.0',
    nome: 'Cisto Aracnoideo Cerebral Sintomático',
    sintomas: [
      'Cefaleia crônica localizada ipsilateral persistente, que piora com esforços mecânicos corporais',
      'Déficits focais neurológicos progressivos lentos por compressão extrínseca parenquimatosa local',
      'Crises convulsivas focais refratárias de difícil controle de acordo com a área do cérebro afetada pelo cisto',
      'Exame de tomografia de crânio mostrando lesão cística preenchida de líquor sem captação de contraste periférico'
    ],
    fatores_risco: [
      'Malformações congênitas do desenvolvimento meningocelular da aracnoide',
      'Crescimento valvular progressivo paulatino do cisto em idade infanto-juvenil',
      'Acúmulo localizado de líquor intracraniano por trauma prévio'
    ],
    red_flags: [
      'Ruptura súbita traumática do cisto gerando efusão subdural hemorrágica ou higroma agudo',
      'Sinais agudos de herniação e rebaixamento cognitivo inexplicado',
      'Acometimento obstrutivo de sistema ventricular provocando hidrocefalia não compensativa'
    ],
    diferenciais: [
      'Cisto epidermoide cerebral',
      'Cisticercose cerebral inflamatória (neurocisticercose cística)',
      'Megacisterna magna (variante anatômica benigna não compressiva)',
      'Hematoma subdural crônico'
    ]
  },
  {
    id: 'G51.4',
    nome: 'Mioquimia Facial',
    sintomas: [
      'Fasciculações e ondulações finas contínuas ou intermitentes dos músculos da face (sensação de "tremer a pálpebra")',
      'Envolvimento preferencial do músculo orbicular do olho ipsilateral unilateral',
      'Prejuízo estritamente limitado à cosmética facial sem dores ou assimetrias de tônus musculares musculares',
      'Evolução autolimitada em dias a semanas na quase totalidade das ocorrências'
    ],
    fatores_risco: [
      'Fadiga muscular severa e exaustão física sistêmica recente',
      'Consumo usual excessivo diário de café ou estimulantes pré-treino químicos',
      'Estresse psicológico elevado persistente e privação crônica profunda de sono'
    ],
    red_flags: [
      'Disseminação contínua irreversível persistente para músculos mastigatórios ou língua (considerar infiltração de tronco)',
      'Ocorrência de fraqueza facial motora associada progressiva',
      'Persistência por mais de 3 meses inexplicável de dor na face'
    ],
    diferenciais: [
      'Espasmo hemifacial mecânico inicial',
      'Tique motor simples da infância ou juventude',
      'Fasciculações motoras benignas sistêmicas'
    ]
  },
  {
    id: 'G47.4',
    nome: 'Narcolepsia',
    sintomas: [
      'Ataques irresistíveis de sonolência diurna com cochilos involuntários diários em locais impróprios',
      'Cataplexia: perda súbita do tônus muscular bilateral desencadeada por emoções fortes (risadas ou surpresas)',
      'Alucinações hipnagógicas ou hipnopómpicas vívidas ao adormecer ou acordar',
      'Paralisia do sono assustadora de corpo inteiro na transição sono-vigília'
    ],
    fatores_risco: [
      'Perda autoimune crônica e seletiva de neurônios produtores de hipocretina no hipotálamo lateral',
      'Faixa etária típica de início entre a segunda e terceira décadas de vida',
      'Presença de fatores HLA específicos predisponentes (HLA-DQB1*06:02)'
    ],
    red_flags: [
      'Crises de cataplexia completas persistentes que resultam em quedas ao solo e traumatismos importantes',
      'Sonolência catastrófica ao volante com grave e iminente risco de acidentes automobilísticos',
      'Disfunção psicossocial profissional profunda com perda de emprego de rotina'
    ],
    diferenciais: [
      'Apneia obstrutiva do sono severa descompensada',
      'Privação crônica grave de sono voluntária',
      'Hiperidrose e hipotireoidismo grave'
    ]
  },
  {
    id: 'G57.0',
    nome: 'Meralgia Parestésica',
    sintomas: [
      'Dormência, queimação e parestesia localizada na face anterolateral externa da coxa',
      'Piora marcante da queimação sob longos períodos ortostáticos (em pé) ou caminhadas planas',
      'Completa ausência de dor lombar associada ou perda de força de extensão de joelho',
      'Exame de reflexo patelar perfeitamente mantido bilateralmente comparado'
    ],
    fatores_risco: [
      'Uso continuado de calças jeans e cintos excessivamente apertados que comprimem a crista ilíaca anterior',
      'Obesidade e ganho ponderal rápido ou gestações em andamento',
      'Neuropatia focada mecânica do nervo cutâneo femoral lateral'
    ],
    red_flags: [
      'Desenvolvimento de fraqueza motora distal correspondente em quadríceps (sinal de neuropatia motora de nervo femoral)',
      'Presença de lesão ou dor lombar grave que mimetiza radiculopatia L3/L4 compressiva discovertebral'
    ],
    diferenciais: [
      'Radiculopatia lombar compressiva de raiz de L3',
      'Neuropatia motora femoral proximal unilateral',
      'Disfunção traumática articular crônica de quadril'
    ]
  },
  {
    id: 'G21.1',
    nome: 'Parkinsonismo Secundário a Neurolépticos',
    sintomas: [
      'Tremor de repouso simétrico bilateral em mãos que se desenvolve após dose medicamentosa',
      'Rigidez muscular bilateral com sinal de roda dentada de início simétrico rápido',
      'Marcada instabilidade motora de marcha lenta com passos curtos simétricos',
      'Fácies inexpressiva de aspecto amímico e sialorreia crônica mecânica'
    ],
    fatores_risco: [
      'Uso crônico de antipsicóticos típicos de alta potência (haloperidol, flufenazina)',
      'Uso continuado de bloqueadores de dopamina periféricos de uso gastrointestinal (metoclopramida, bromoprida)',
      'Geriátricos e faixa etária idosa suscetível a depleção central de dopamina'
    ],
    red_flags: [
      'Surgimento concomitante de rigidez do tipo "cano de chumbo", febre alta inexplicada e instabilidade autonômica (Síndrome Neuroléptica Maligna - emergência médica UTI)',
      'Discinesias agudas severas das cordas vocais com estridor agudo respiratório e risco de asfixia mecânica'
    ],
    diferenciais: [
      'Doença de Parkinson idiopática',
      'Paralisia supranuclear progressiva de tronco',
      'Tremor essencial geriátrico'
    ]
  },
  {
    id: 'G50.1',
    nome: 'Dor Facial Atípica (Dor Facial Idiopática Persistente)',
    sintomas: [
      'Dor facial contínua de caráter profundo, tipo queimação ou peso surdo por meses',
      'Ausência de episódios paroxísticos tipo choque lancinante e ausência de zonas de gatilhos na derme',
      'Acometimento de grandes porções faciais difusas unilaterais que ultrapassam territórios trigeminais',
      'Ausência de déficits sensitivos objetivos ou deformações em exames de imagem cranial estrutural'
    ],
    fatores_risco: [
      'Idade média superior, predominantemente em mulheres',
      'Histórico persistente de depressão e transtorno somatoforme de dor crônica',
      'Procedimentos invasivos dentários ou sinusais traumáticos repetitivos prévios'
    ],
    red_flags: [
      'Progressão de sintomas com parestesia facial objetiva fixada',
      'Aparecimento de perda de peso acentuada ou febre reativa',
      'Rápido rebaixamento visual ou diplopia persistente'
    ],
    diferenciais: [
      'Neuralgia do trigêmeo clássica paroxística',
      'Sinusite esfenoidal crônica',
      'Arterite de células gigantes temporal'
    ]
  },
  {
    id: 'G43.8',
    nome: 'Enxaqueca Basilar (Migrânea com Sintomas de Tronco")',
    sintomas: [
      'Aura clássica que compreende dois ou mais sintomas neurológicos de tronco cerebral: disartria, vertigem, zumbido',
      'Visualização de alterações visuais bilaterais simultâneas em ambos os campos de visão',
      'Cefaleia de forte intensidade occipital pulsante subsequente à aura',
      'Instabilidade de marcha intensa transitória de caráter reversível'
    ],
    fatores_risco: [
      'Adultos jovens e adolescentes jovens, sexo feminino preferência',
      'Uso de anticoncepcionais orais de carga estrogênica elevada',
      'Gatilhos usuais de migrânea como estresse e privação de sono'
    ],
    red_flags: [
      'Ocorrência de síncope ou coma de início súbito inexplicável pós-reversão',
      'Instalação de déficits de tronco cerebral fixados (AVC de território vertebrobasilar)',
      'Trombose aguda da artéria basilar mista'
    ],
    diferenciais: [
      'AVC isquêmico agudo do território vertebrobasilar',
      'Insuficiência vertebrobasilar crônica',
      'Neuromielite óptica (NMO)'
    ]
  },
  {
    id: 'M54.81',
    nome: 'Cefaleia Cervicogênica',
    sintomas: [
      'Cefaleia unilateral persistente originária de coluna cervical espalhada para região frontal anterior',
      'Piora nítida com movimentos mecânicos específicos do pescoço ou palpação profunda local occipital',
      'Redução da amplitude mecânica normal de rotação do pescoço bilateral',
      'Ausência de fonofobia ou náuseas agudas associadas'
    ],
    fatores_risco: [
      'Discopatia ou osteoartrite cervical crônica degenerativa',
      'Histórico remanso de contratura mecânica traumática (chicoteamento de carro)',
      'Má postura crônica no ambiente laboral de digitação'
    ],
    red_flags: [
      'Surgimento concomitante de mielopatia com hiperreflexia e espasticidade de membros inferiores',
      'Instalação de instabilidade cervical mecânica aguda pós-impacto traumático',
      'Dor cervical excruciante que irradia sob trajeto dermatômico fixador'
    ],
    diferenciais: [
      'Migrânea sem aura pura',
      'Neuralgia occipital (Neuralgia de Arnold)',
      'Cefaleia de tensão muscular'
    ]
  },
  {
    id: 'G44.81',
    nome: 'Cefaleia Hípnica',
    sintomas: [
      'Cefaleia que desperta o paciente idoso rigorosamente na mesma hora da noite ("cefaleia despertador")',
      'Acomete de forma bilateral ou unilateral de leve a moderada intensidade por semanas',
      'Duração transitória da dor em vigília de 30 a 180 minutos sem náuseas',
      'Alívio clássico rápido com consumo noturno de cafeína antes de repousar'
    ],
    fatores_risco: [
      'Faixa etária geriátrica geriátrica acima de 50 a 60 anos de idade',
      'Sexo feminino preferencial',
      'Distúrbio latente de modulação circadiana de dor central'
    ],
    red_flags: [
      'Acordar noturno repentino por cefaleia progressiva de forte intensidade inexplicada secundária a efeito de massa (tumor cerebral)',
      'Aparecimento de déficits motores focais ou rebaixamento cognitivo geriátrico'
    ],
    diferenciais: [
      'Cefaleia em salvas (dor é orbitária lancinante insuportável unilateral)',
      'Apneia obstrutiva do sono obstrutiva severa noturna',
      'Hipertensão arterial descompensada com crises de despertar noturno'
    ]
  },
  {
    id: 'G50.8',
    nome: 'Neuralgia Occipital (Neuralgia de Arnold)',
    sintomas: [
      'Dor lancinante, em choque ou queimação originária da nuca e irradiada para couro cabeludo frontal',
      'Sensibilidade e dor exacerbadas à palpação profunda ou percussão sobre trajetos do nervo occipital maior',
      'Presença frequente de hipersensibilidade mecânica dolorosa ao escovar ou pentear cabelos locais',
      'Evolução intermitente de crises curtas'
    ],
    fatores_risco: [
      'Tensão prolongada crônica de musculatura paravertebral e suboccipital proximal',
      'Artrose ou subluxação articular degenerativa da articulação C1-C2 de coluna',
      'Traumatismos cervicais leves repetitivos em esportes'
    ],
    red_flags: [
      'Dormência fixa ou perda de força generalizada cervical progressiva',
      'Dor retro-nucal intensa contínua refratária de início abrupto inexplicável (investigar dissecação de artéria vertebral)',
      'Fístula liquórica oculta concomitante'
    ],
    diferenciais: [
      'Cefaleia cervicogênica unilateral em placas',
      'Arterite de células gigantes temporal',
      'Enxaqueca occipital espasmódica'
    ]
  },
  {
    id: 'G24.1',
    nome: 'Distonia Generalizada',
    sintomas: [
      'Contrações musculares involuntárias generalizadas que forçam posturas anormais e torções de tronco',
      'Flutuação mecânica diurna inicial com piora sob cansaço físico exaustivo',
      'Dificuldade marcante motora de marcha distônica com passos girados ("marcha dromedária")',
      'Evolução progressiva na infância e preservação completa da inteligência'
    ],
    fatores_risco: [
      'Mutações hereditárias genéticas específicas autossômicas dominantes do gene DYT1',
      'Idade de aparecimento precoce típica infanto-juvenil',
      'Uso precoce prolongado de medicamentos neurolépticos farmacológicos'
    ],
    red_flags: [
      'Crise distônica aguda (Status Dystonicus) com contraturas massivas incapacitantes generalizadas, febre alta e risco severo de rabdomiólise traumática e insuficiência renal aguda',
      'Incapacidade aguda respiratória por compressão espástica tônica cervicofaríngea'
    ],
    diferenciais: [
      'Paralisia cerebral progressiva',
      'Coréia sistêmica hereditária de Huntington',
      'Disfunção miofascial funcional somatoforme severa'
    ]
  },
  {
    id: 'G25.3',
    nome: 'Mioclonia Facial e de Tronco',
    sintomas: [
      'Solavancos musculares involuntários, bruscos, curtos e arrítmicos de extremidades',
      'Ausência de perda de consciência ou alterações pós-ictais mentais',
      'Flutuação diurna que se agrava sob ansiedade de desempenho mecânico ou tarefas agudas',
      'Presença de abalos generalizados simétricos ou assimétricos'
    ],
    fatores_risco: [
      'Distúrbio eletrolítico ou encefalopatia metabólica flutuante (uremia prolongada, insuficiência hepática severa)',
      'Histórico de paragem cardíaca prolongada pós-ressuscitação com sequela anóxica cerebral (Síndrome de Lance-Adams)',
      'Uso de medicamentos miorrelaxantes ou lítio'
    ],
    red_flags: [
      'Desenvolvimento de mioclonias com rápida e profunda demência subcorrente rápida (Doença de Creutzfeldt-Jakob)',
      'Acometimento de músculos bulbares impedindo por completo a deglutição segura de alimentos'
    ],
    diferenciais: [
      'Mioclonias fisiológicas saudáveis da transição de indução de sono',
      'Crises convulsivas focais motoras de reflexo cortical',
      'Tremor essencial cinético'
    ]
  },
  {
    id: 'G56.1',
    nome: 'Disfunção do Nervo Ulnar (Neuropatia Cubital)',
    sintomas: [
      'Parestesia e dormência dolorosa selectiva na metade ulnar do 4º e todo o 5º dedos da mão',
      'Fraqueza severa tardia para adução/abdução de dedos com atrofia visível interóssea',
      'Presença de "mão em garra" ulnar crônica pela paralisia muscular correspondente',
      'Pior noturna clássica induzida por adormecer com cotovelos em fletidos apertados'
    ],
    fatores_risco: [
      'Histórico de repousar e apoiar cotovelos sustentadamente sobre mesas rígidas de digitação',
      'Fratura prévia mecânica ou deformação óssea degenerativa de canal cubital no cotovelo',
      'Diabetes mellitus com maior sensibilidade a compressões focais de derme'
    ],
    red_flags: [
      'Progressão de atrofia muscular destrutiva de mão de caráter assimétrico sem remissões',
      'Incapacidade aguda permanente de adução de pinça com polegar (sinal de Froment positivo ao exame físico)'
    ],
    diferenciais: [
      'Radiculopatia cervical compressiva unilateral de C8/T1 discovertebral',
      'Síndrome do túnel do carpo mista',
      'Plexopatia braquial inferior neoplásica infiltrativa'
    ]
  },
  {
    id: 'G99.0',
    nome: 'Disautonomia Primária (Síndrome de Riley-Day ou Idiopática)',
    sintomas: [
      'Hipotensão ortostática grave imediata com quedas de pressão severas ao levantar',
      'Marcada instabilidade autonômica com palpitações cardíacas, síncopes súbitas e tonturas persistentes',
      'Prejuízos digestivos severos com gastroparesia inexplicada crônica',
      'Ausência total de sudorese ou hiperidrose focal involuntária em crises'
    ],
    fatores_risco: [
      'Herança autossômica recessiva ou etiologia degenerativa idiopática central (Atrofia de Múltiplos Sistemas)',
      'Idade média superior ou idosos suscetíveis a neuropatias autonômicas de base'
    ],
    red_flags: [
      'Síncopes cardiogênicas secundárias a parada sinusal profunda na disautonomia severa',
      'Instalação de choque refratário sob desidratações leves',
      'Instabilidade de termorregulação grave levando a hipertermia sem causa de infecção de derme'
    ],
    diferenciais: [
      'Insuficiência adrenal crônica (Doença de Addison)',
      'Neuropatia diabética puramente autonômica periférica',
      'Hipotensão postural mecânica por depleção de volume por medicação'
    ]
  },
  {
    id: 'G35.8',
    nome: 'Neuromielite Óptica (Doença de Devic)',
    sintomas: [
      'Neurite óptica bilateral grave e dolorosa de repetição com perda visual profunda súbita',
      'Mielite transversa longitudinalmente extensa que cobre > 3 segmentos de medula ao exame de ressonância',
      'Presença frequente de crises de soluços intratáveis ou vômitos incoercíveis por acometimento de área postrema de tronco',
      'Presença de anticorpo antiaquaporina-4 (anti-AQP4) sérico marcadamente positivo ao exame'
    ],
    fatores_risco: [
      'Sexo feminino em idade reprodutiva',
      'Presença de doenças autoimunes sistêmicas conhecidas (lúpus ou tireoidite de Hashimoto)',
      'Descendência afro-latina ou asiática'
    ],
    red_flags: [
      'Amaurose definitiva (cegueira bilateral) rápida irreversível sem resposta a imunoterapia precoce',
      'Tetraplegia flácida súbita com parada ventilatória diafragmática necessitando de intubação orotraqueal em UTI'
    ],
    diferenciais: [
      'Esclerose Múltipla clássica (surtos visuais usualmente unilaterais)',
      'Doença associada ao MOG (MOGAD)',
      'Meningofaringomeningite infecciosa crônica',
      'Mielite isquêmica vascular de medula'
    ]
  },
  {
    id: 'G11.4',
    nome: 'Ataxia Espástica Hereditária',
    sintomas: [
      'Incoordenação motora crônica progressiva generalizada (ataxia cerebelar de passos)',
      'Acometimento de motilidade verbal profunda de caráter disartrico prolongado',
      'Rigidez espástica e hiperreflexia global difusa em membros inferiores ao exame',
      'Associação com perda de reflexos de sensibilidade vibratória posterior'
    ],
    fatores_risco: [
      'Mutações hereditárias genéticas com história familiar direta de consanguinidade',
      'Herdabilidade recessiva ou autossômica dominante correspondente'
    ],
    red_flags: [
      'Degeneração do tônus miocárdico com insuficiência cardíaca crônica grave por cardiomiopatia (comum na Ataxia de Friedreich)',
      'Incapacidade de digerir alimentos por disfagia bulbar profunda progressiva',
      'Quedas repetitivas traumáticas em terreno plano com fraturas ósseas múltiplas'
    ],
    diferenciais: [
      'Mielopatia por deficiência grave de Vitamina B12',
      'Esclerose múltipla variante progressiva primária',
      'Hidrocefalia de pressão normal'
    ]
  },
  {
    id: 'G24.4',
    nome: 'Discinesia Tardia Complexa',
    sintomas: [
      'Movimentos involuntários repetitivos oro-faciais (mastigação contínua de boca aberta, protrusão espasmódica de língua e caretas)',
      'Complexos abalos coreiformes de extremidades periféricas flutuantes',
      'Piora sob ansiedade psicológica ou atividade motora central de atenção externa',
      'Ocorrência após exposição continuada e prolongada a antipsicóticos de uso crônico'
    ],
    fatores_risco: [
      'Idade idosa e sexo feminino na terapia antipsicótica prolongada',
      'Histórico de longos períodos de uso inadequado de bloqueadores de dopamina',
      'Esquizofrenia crônica hospitalizada'
    ],
    red_flags: [
      'Disfunção respiratória e asfixia mecânica por acometimento distônico orofaríngeo',
      'Incapacidade absoluta de ingerir líquidos ou alimentos devido a movimentos contínuos de língua e mandíbula'
    ],
    diferenciais: [
      'Doença de Parkinson clássica tremulante',
      'Coréia sistêmica de Huntington',
      'Tremor essencial facial senil senil'
    ]
  },
  {
    id: 'G43.C',
    nome: 'Enxaqueca Hemiplégica',
    sintomas: [
      'Aura que obrigatoriamente compreende paralisia motora (fraqueza) unilateral transitória revertível',
      'Parestesia e dormência que se espalham de forma gradual por um hemicorpo',
      'Cefaleia de moderada a severa intensidade pulsante subsequente',
      'Dificuldade de fala (afasia expressiva transitória reversível de aura)'
    ],
    fatores_risco: [
      'Histórico familiar positivo documentado de Enxaqueca Hemiplégica Familiar (mutações CACNA1A, ATP1A2, SCN1A)',
      'Uso inadequado de estrogênios exógenos orais combinados'
    ],
    red_flags: [
      'Persistência prolongada de paralisia unilateral motora por mais de 24-48 horas ou sequela fixa (AVC isquêmico mimetizador)',
      'Surgimento de coma repentino ou crises convulsivas generalizadas durante o surto'
    ],
    diferenciais: [
      'Acidente vascular cerebral isquêmico (cortical ou subcortical)',
      'Ataque isquêmico transitório (AIT) em crescendo',
      'Crise convulsiva focal sensorial pós-ictal'
    ]
  },
  {
    id: 'G93.4',
    nome: 'Encefalopatia Metabólica Flutuante',
    sintomas: [
      'Delirium flutuante agudo com episódios de agitação psicomotora seguidos por torpor profundo',
      'Presença de flapping (tremor de flutuação de punhos ao esticar os braços - asterixe)',
      'Mioclonias espontâneas multifocais erráticas e flutuações de nível atencional',
      'Ocorrência concomitante de distúrbio de eletrólitos agudos, uremia elevada ou infecção sistólica'
    ],
    fatores_risco: [
      'Insuficiência renal crônica dialítica terminal ou cirrose hepática descompensada (encefalopatia hepática)',
      'Idade idosa frágil geriátrica sobreposta a infecções de trato urinário aguda'
    ],
    red_flags: [
      'Estupor profundo ou coma de progressão rápida refratária de base com Glasgow < 8',
      'Crise tônico-clônica generalizada metabólica de difícil reversão',
      'Severo edema de derme cerebral difuso'
    ],
    diferenciais: [
      'Encefalite viral aguda herpética',
      'Hematoma subdural agudo pós-traumático',
      'Deterioração cognitiva primária por demência cortical rápida'
    ]
  }
];
