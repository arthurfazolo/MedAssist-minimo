import { MedicalDisease } from '../types';

export const INFECTIOUS_DISEASES_BATCH2: MedicalDisease[] = [
  {
    id: 'A06.4',
    nome: 'Abscesso Hepático Amebiano',
    sintomas: [
      'Dor intensa e constante em quadrante superior direito (QSD)',
      'Febre alta diária de início recente com calafrios',
      'Dor referida no ombro direito espontânea',
      'Hepatomegalia dolorosa à palpação profunda'
    ],
    fatores_risco: [
      'Histórico de diarreia muco-sanguinolenta recente ou remota',
      'Viagem para áreas tropicais com saneamento precário',
      'Sexo anal ativo receptivo desprotegido'
    ],
    red_flags: [
      'Surgimento abrupto de dor abdominal difusa (Ruptura em peritônio)',
      'Dispneia súbita com derrame pleural ipsilateral (Ruptura transdiafragmática)',
      'Icterícia obstrutiva progressiva'
    ],
    diferenciais: [
      'Abscesso Hepático Piogênico',
      'Colecistite Aguda Líquida',
      'Câncer de Vias Biliares'
    ],
    achados_exames: [
      'Leucocitose neutrofílica importante no sangue',
      'Elevação marcante de Fosfatase Alimentar e Gama-GT',
      'Imagem ultrassonográfica demonstrando cavidade oval com parede fina'
    ],
    criterios_diagnosticos: [
      'Diagnóstico por imagem de lesão focal hepática associado a sorologia positiva',
      'Melhoria rápida drástica com terapêutica empírica com metronidazol'
    ]
  },
  {
    id: 'A07.2',
    nome: 'Criptosporidíase',
    sintomas: [
      'Diarreia aquosa volumosa e muito frequente',
      'Cólica abdominal periumbilical de moderada intensidade',
      'Perda de peso involuntária rápida devido a má absorção',
      'Febre baixa concomitante acompanhada de náuseas'
    ],
    fatores_risco: [
      'Uso de piscinas públicas ou parques aquáticos contaminados',
      'Privação imune grave ou coinfecção por HIV com CD4 < 200',
      'Exposição ocupacional ou rotineira a animais domésticos jovens'
    ],
    red_flags: [
      'Diarreia crônica em imunocomprometido durando mais de 30 dias',
      'Desidratação refratária com distúrbios de eletrólitos potencialmente letais',
      'Acometimento de vias biliares com colangite aguda'
    ],
    diferenciais: [
      'Gastroenterite Viral',
      'Microsporidiose Intestinal',
      'Isosporíase'
    ],
    achados_exames: [
      'Detecção de oocistos globulares em pesquisa de fezes pelo método Ziehl-Neelsen modificado',
      'Hemograma de perfil normal'
    ],
    criterios_diagnosticos: [
      'Identificação microscópica ou PCR positiva para oocistos de Cryptosporidium',
      'Pesquisa imunológica direta de antígeno fecal positivo'
    ]
  },
  {
    id: 'B78.9',
    nome: 'Estrongiloidíase',
    sintomas: [
      'Dor abdominal em queimação epigástrica que remete à úlcera',
      'Diarreia intermitente com episódios de constipação',
      'Urticária recorrente em nádegas e tronco (larva currens)',
      'Tosse seca episódica com sibilância (síndrome de Loeffler)'
    ],
    fatores_risco: [
      'Andar descalço habitualmente sobre solo arenoso úmido cultivado',
      'Trabalho de lavoura ou mineração sem uso de botas e proteção',
      'Uso continuado crônico de corticosteroides imunossupressores'
    ],
    red_flags: [
      'Síndrome de hiperinfecção grave com sepse secundária por translocação bacteriana',
      'Peritonite ou hemorragia alveolar massiva',
      'Obstrução intestinal mecânica suboclusiva'
    ],
    diferenciais: [
      'Doença Úlcerosa Péptica',
      'Síndrome do Intestino Irritável',
      'Eosinofilia Pulmonar Tropical'
    ],
    achados_exames: [
      'Eosinofilia periférica acentuada persistente (> 20%)',
      'Visualização das larvas rabditoides no método parasitológico de Baermann-Moraes'
    ],
    criterios_diagnosticos: [
      'Identificação direta de larvas de Strongyloides stercoralis nas fezes ou escarro',
      'Sorologia Elisa para estrongiloidíase reagente'
    ]
  },
  {
    id: 'B76.9',
    nome: 'Ancilostomíase',
    sintomas: [
      'Prurido intenso nas solas dos pés com lesão papuloeritematosa (coceira-da-terra)',
      'Anemia ferropriva crônica profunda com palidez marcante',
      'Fadiga desproporcional ao esforço e palpitações de repouso',
      'Dor epigástrica exacerbada com empachamento pós-prandial'
    ],
    fatores_risco: [
      'Andar sem calçados em solos úmidos contaminados por fezes humanas',
      'Hábito de defumação ou eliminação sanitária inadequada ao ar livre',
      'Deficiência nutricional pré-existente associada'
    ],
    red_flags: [
      'Palidez de extrema palidez cutânea com dispneia e sopro sistêmico',
      'Insuficiência cardíaca de alto débito decorrente de anemia crítica',
      'Hematoquezia moderada em crianças desnutridas'
    ],
    diferenciais: [
      'Anemia Ferropriva Nutricional Pura',
      'Doença Celíaca',
      'Esofagite de Refluxo'
    ],
    achados_exames: [
      'Anemia microcítica e hipocrômica grave',
      'Eosinofilia moderada a alta no hemograma',
      'Pesquisa de sangue oculto nas fezes persistentemente positiva'
    ],
    criterios_diagnosticos: [
      'Visualização microscópica de ovos de Ancylostoma duodenale ou Necator americanus nas fezes',
      'Associação entre anemia ferropriva refratária e hábitos higiênicos sob risco'
    ]
  },
  {
    id: 'B77.9',
    nome: 'Ascaridíase',
    sintomas: [
      'Cólica abdominal periumbilical vaga ou desconforto epigástrico',
      'Distensão abdominal moderada com ruídos hidroaéreos audíveis',
      'Tosse seca de início súbito acompanhada de sibilância e febre baixa',
      'Anorexia intermitente com perda moderada de peso corporal'
    ],
    fatores_risco: [
      'Consumo de saladas de folhas cruas lavadas em águas não tratadas',
      'Falta de hábitos rotineiros de lavagem de mãos antes das refeições',
      'Uso de dejetos humanos residenciais não tratados como adubo de horta'
    ],
    red_flags: [
      'Vômitos intensos fecaloides com parada de eliminação de mecônio/gases (Suboclusão)',
      'Dor súbita em cólica biliar acentuada com icterícia (Migração para colédoco)',
      'Sinais clínicos de apendicite aguda por intrusão do parasita no apêndice'
    ],
    diferenciais: [
      'Apendicite Aguda',
      'Asma Brônquica Atópica',
      'Obstrução Intestinal Funcional'
    ],
    achados_exames: [
      'Eosinofilia marcante durante a fase de trânsito pulmonar larval',
      'Visualização de imagem de múltiplos vermes com sinal de "miolo de pão" na radiografia abdominal'
    ],
    criterios_diagnosticos: [
      'Detecção de ovos férteis ou inférteis típicos de Ascaris lumbricoides no EPF',
      'Visualização direta de espécimes adultos eliminados espontaneamente pela boca ou fezes'
    ]
  },
  {
    id: 'B80',
    nome: 'Enterobíase (Oxiuríase)',
    sintomas: [
      'Prurido anal noturno intenso e de difícil repouso',
      'Inquietação comportamental e irritabilidade noturna em crianças',
      'Prurido vulvar acompanhado de corrimento vaginal em meninas',
      'Escarificações perilobulares anais decorrentes de prurido contínuo'
    ],
    fatores_risco: [
      'Frequentar creches de cuidado infantil compartilhado',
      'Presença de portador contaminado compartilhando a mesma cama',
      'Onicofagia e inadequada lavagem rotineira de unhas'
    ],
    red_flags: [
      'Apendicite aguda obstrutiva secundária à migração maciça de vermes',
      'Salpingite aguda por migração larval ascendente vaginal'
    ],
    diferenciais: [
      'Dermatite de Contato Perianal',
      'Fissura Anal Intestinal',
      'Candidíase Perianal'
    ],
    achados_exames: [
      'Ovos alongados típicos com "forma de D" na análise microscópica',
      'Hemograma completo sem alterações relevantes'
    ],
    criterios_diagnosticos: [
      'Coleta positiva de ovos via método da fita adesiva transparente de Graham',
      'Visualização de fêmeas na região perianal visualizadas à noite pelo cuidador'
    ]
  },
  {
    id: 'B74.9',
    nome: 'Filariose Linfática (Elefantíase)',
    sintomas: [
      'Febre de caráter recorrente com dores musculares (Linfangite retrógrada)',
      'Edema elástico e mole de membros inferiores de início em dorso do pé',
      'Hipertrofia espessa e endurecimento da pele do membro afetado (Fase Crônica)',
      'Presença de hidrocele volumosa indolor unilateral ou bilateral'
    ],
    fatores_risco: [
      'Morar em regiões metropolitanas endêmicas sem tratamento (ex: Grande Recife)',
      'Picadas frequentes sofridas pelo mosquito Culex quinquefasciatus',
      'Inexistência de telas ou repelentes em habitação periurbana'
    ],
    red_flags: [
      'Urina cor de leite ou esbranquiçada (Presença de Quilotúria)',
      'Celulite ou linfangite bacteriana secundária grave com choque séptico',
      'Déficit de locomoção grave decorrente do peso excessivo do membro'
    ],
    diferenciais: [
      'Linfedema Congênito (Doença de Milroy)',
      'Insuficiência Venosa Crônica Graves',
      'Insuficiência Cardíaca Avançada'
    ],
    achados_exames: [
      'Leucocitose atípica eosinofílica marcante no sangue',
      'Presença de microfilárias móveis na pesquisa direta de sangue coletado à noite'
    ],
    criterios_diagnosticos: [
      'Identificação de microfilárias de Wuchereria bancrofti em sangue periférico colhido entre 22h e 02h',
      'Visualização do sinal "dança das filárias" ao ultrassom de bolsa escrotal'
    ]
  },
  {
    id: 'B65.1',
    nome: 'Esquistossomose Mansônica',
    sintomas: [
      'Prurido intenso no local de entrada da larva (Dermatite cercariana)',
      'Febre abrupta acompanhada de calafrios, tosse e cefaleia (Febre de Katayama)',
      'Heptomegalia proeminente dolorosa associada a esplenomegalia tardia',
      'Diarreia muco-sanguinolenta intermitente com dor abdominal em cólica'
    ],
    fatores_risco: [
      'Banho de rio, lagoa ou poço com presença confirmada de caramujos Biomphalaria',
      'Saneamento básico inexistente com deposição fecal em águas correntes',
      'Trabalho de pesca ou lavoura sem botas de proteção especial'
    ],
    red_flags: [
      'Ascite volumosa associada a varizes de esôfago calibrosas (Hipertensão Portal)',
      'Mielite esquistossomótica (dor lombar focal, retenção urinária e paraplegia súbita)',
      'Hemoptise devido à hipertensão pulmonar crônica'
    ],
    diferenciais: [
      'Cirrose Hepática Alcoólica ou por Hepatite',
      'Leucemia Mieloide Crônica',
      'Meningite de outras etiologias'
    ],
    achados_exames: [
      'Eosinofilia periférica acentuada na fase aguda de Katayama',
      'Biopsia retal positiva para ovos característicos nas criptas mucosas',
      'Ultrassonografia com padrão de fibrose portal periportal de Symmers'
    ],
    criterios_diagnosticos: [
      'Encontro de ovos viáveis de Schistosoma mansoni com espículo lateral no EPF (método Kato-Katz)',
      'Biópsia retal positiva associada a quadro clínico-epidemiológico condizente'
    ]
  },
  {
    id: 'B33.4',
    nome: 'Síndrome Cardiopulmonar por Hantavírus',
    sintomas: [
      'Febre de surgimento agudo acompanhada de mialgia severa no dorso/coxas',
      'Tosse seca de progressão rápida para dispneia extrema',
      'Cefaleia holocraniana intensa acompanhada de calafrios e astenia',
      'Náuseas e diarreia mimetizando quadro abdominal agudo inicial'
    ],
    fatores_risco: [
      'Pessoas que limpam galpões fechados ou silos agrícolas abandonados',
      'Inspiração de aerossóis contendo fezes frescas ou urina de roedores silvestres',
      'Atividades de ecoturismo desprotegidas em áreas rurais fechadas'
    ],
    red_flags: [
      'Taquipneia intensa com hipoxemia refratária rápida e cianose periférica',
      'Instabilidade hemodinâmica súbita mimetizando choque cardiogênico',
      'Derrame pleural bilateral massivo de progressão em horas'
    ],
    diferenciais: [
      'Pneumonia Viral por Influenza ou Covid-19',
      'Embolia Pulmonar Aguda',
      'Infarto Agudo do Miocárdio'
    ],
    achados_exames: [
      'Plaquetopenia importante combinada com leucocitose com desvio à esquerda',
      'Presença de imunoblastos ou atipia no leucograma periférico',
      'Radiografia com infiltrado alveolar difuso bilateral simétrico precoce'
    ],
    criterios_diagnosticos: [
      'Detecção de sorologia IgM para Hantavírus ativa',
      'Confirmação por biologia molecular (RT-PCR) no tecido pulmonar ou sangue'
    ]
  },
  {
    id: 'A96.7',
    nome: 'Febre Hemorrágica por Arenavírus',
    sintomas: [
      'Febre de progressão insidiosa com calafrios de repetição',
      'Exantema maculopapular avermelhado no peito e dorso',
      'Conjuntive com injeção escleral proeminente dolorosa',
      'Faringite eritematosa ulcerada dolorosa'
    ],
    fatores_risco: [
      'Exposição ao pó ou aerossóis provenientes de fezes de roedores silvestres específicos',
      'Trabalhadores rurais rurais em áreas sob monitoramento'
    ],
    red_flags: [
      'Sangramento espontâneo em mucosas, feridas cirúrgicas ou punções',
      'Instabilidade hemodinâmica crítica com choque distributivo refratário',
      'Encefalopatia aguda com tremores musculares finos e crises'
    ],
    diferenciais: [
      'Febre Amarela Crítica',
      'Dengue com Choque Grave',
      'Meningococcemia'
    ],
    achados_exames: [
      'Trombocitopenia grave associada a leucopenia extrema',
      'Alargamento severo do tempo de tromboplastina ativada (TTPa)'
    ],
    criterios_diagnosticos: [
      'Detecção de genoma viral por RT-PCR em amostras sanguíneas precoces',
      'Sorologia IgM isolada em pareamento de amostras convalescentes'
    ]
  },
  {
    id: 'A20.0',
    nome: 'Peste Bubônica',
    sintomas: [
      'Bubão (linfonodo inguinal ou axilar doloroso, edemaciado e hiperemiado)',
      'Febre abrupta severa com calafrios e tremores intensos',
      'Cefaleia holocraniana intensa acompanhada de prostração severa',
      'Mialgias importantes e adinamia limitante'
    ],
    fatores_risco: [
      'Picada de pulga de roedores urbanos contaminados (Xenopsylla cheopis)',
      'Frequentar áreas florestais ou focos silvestres endêmicos conhecidos',
      'Manipulação inadequada de animais silvestres sob risco de contaminação'
    ],
    red_flags: [
      'Hemoptise e dispneia (Evolução para Peste Pneumônica Altamente Letal)',
      'Surgimento de petéquias e gangrena escura periférica nas pontas dos dedos',
      'Colapso cardiovascular agudo e coma'
    ],
    diferenciais: [
      'Linfogranuloma Venéreo Inguinal',
      'Tularemia Glandular',
      'Hernia Inguinal com Encarceramento Súbito'
    ],
    achados_exames: [
      'Leucocitose neutrofílica extrema no sangue periférico',
      'Visualização direta de bacilos Gram-negativos em aspirado de bubão (bipolar de "alfinete")'
    ],
    criterios_diagnosticos: [
      'Isolamento e cultivo de Yersinia pestis em sangue, escarro ou aspirado de bubão',
      'Detecção de anticorpos específicos por ensaio sorológico positivo ou PCR'
    ]
  },
  {
    id: 'A23.9',
    nome: 'Brucelose',
    sintomas: [
      'Febre ondulante prolongada (picos à tarde com sudorese profusa noturna)',
      'Dor articular imensa com mialgia intermitente no dorso e quadril',
      'Fadiga física acentuada acompanhada de anorexia e emagrecimento',
      'Linfadenopatia generalizada moderada e hepatoesplenomegalia'
    ],
    fatores_risco: [
      'Consumo de queijos, leite ou derivados lácteos crus não pasteurizados',
      'Trabalhadores de frigoríficos, veterinários ou tratadores de gado bovino',
      'Manipulação de carcaças ou restos placentários animais sem uso de EPI'
    ],
    red_flags: [
      'Instalação de dor lombar excruciante indicando espondilodiscites severas',
      'Insuflação ou sopros novos de valvas cardíacas (Endocardite bacteriana)',
      'Orquiepididimite inflamatória aguda destruidora'
    ],
    diferenciais: [
      'Tuberculose Extrapulmonar',
      'Lupus Eritematoso Sistêmico',
      'Febre Tifoide de evolução insidiosa'
    ],
    achados_exames: [
      'Linfocitose relativa sem leucocitose marcante no sangue',
      'Marcadores inflamatórios cronicamente discretos'
    ],
    criterios_diagnosticos: [
      'Cultura de medula óssea ou hemocultura positiva em meio especial de Castaneda',
      'Reação de soroaglutinação de Wright reagente com títulos elevados (> 1:160)'
    ]
  },
  {
    id: 'A22.9',
    nome: 'Carbúnculo (Antraz)',
    sintomas: [
      'Pápula pruriginosa indolor que evolui para vesícula negra central',
      'Surgimento posterior de escara necrótica cutânea escura típica (pústula maligna)',
      'Edema circunjacente indolor de consistência gelatinosa na pele',
      'Linfadenopatia regional moderada e dolorosa'
    ],
    fatores_risco: [
      'Artesãos que trabalham com couro ou lã importados de áreas endêmicas',
      'Peões e tratadores de gado em regiões agrícolas de alta prevalência',
      'Inalação de poeiras industriais de produtos animais no processamento'
    ],
    red_flags: [
      'Dispneia extrema e dor torácica indicando alargamento de mediastino (Antraz Inalatório)',
      'Diarreia sanguinolenta maciça acompanhada de vômitos intensos (Antraz Gastrointestinal)',
      'Cefaleia holocraniana intensa indicando meningoencefalites hemorrágicas'
    ],
    diferenciais: [
      'Ectima Gangrenoso',
      'Picada de Aranha-Marrom (Loxoscelismo)',
      'Celulite Cutânea Clássica'
    ],
    achados_exames: [
      'Gram de raspado de lesão revelando grandes bacilos Gram-positivos encapsulated',
      'Alargamento mediastinal observado na tomografia ou Rx de tórax'
    ],
    criterios_diagnosticos: [
      'Cultura positiva com isolamento de Bacillus anthracis',
      'PCR específico positivo em sangue total ou exsudatos cutâneos'
    ]
  },
  {
    id: 'A32.9',
    nome: 'Listeriose',
    sintomas: [
      'Febre de progressão aguda acompanhada de tremores e calafrios',
      'Cefaleia holocraniana intensa acompanhada de rigidez nucal leve',
      'Mialgia difusa acompanhada de náuseas ou diarreia moderada',
      'Letargia ou episódios convulsivos unifocais'
    ],
    fatores_risco: [
      'Consumo de queijos macios não curados ou frios industriais fatiados',
      'Gestante exposta (risco altíssimo de abortamento espontâneo tardio)',
      'Idade maior que 65 anos ou portadores de neoplasias em quimio'
    ],
    red_flags: [
      'Instalação súbita de paralisia de nervos cranianos ou ataxia (Romboencefalite)',
      'Crise convulsiva generalizada e rebaixamento do nível de consciência',
      'Sinais de sepse refratária com falência orgânica múltipla'
    ],
    diferenciais: [
      'Meningite Pneumocócica',
      'Meningoencefalite por Herpes Simples',
      'Abscesso Cerebral Focal'
    ],
    achados_exames: [
      'Líquido cefalorraquidiano com pleocitose neutrofílica ou linfocitica com glicose normal/baixa',
      'Bacterioscopia revelando pequenos bacilos ou cocobacilos Gram-positivos'
    ],
    criterios_diagnosticos: [
      'Isolamento e cultura positiva de Listeria monocytogenes em líquor ou sangue',
      'Hemocultura positiva em gestante febril sem outra causa explicável'
    ]
  },
  {
    id: 'A42.9',
    nome: 'Actinomicose',
    sintomas: [
      'Tumoração de consistência endurecida (aspecto lenhoso) em mandíbula',
      'Drenagem contínua através de fístulas múltiplas que perfuram a pele',
      'Presença de "grânulos de enxofre" amarelados no pus drenado',
      'Febre de baixa intensidade acompanhada de dor mandibular e trismo'
    ],
    fatores_risco: [
      'Higiene bucal precária com presença crônica de periodontite severa',
      'Procedimento de extração dentária recente com manipulação óssea',
      'Uso prolongado de dispositivo intrauterino (DIU) (causa actinomicose pélvica)'
    ],
    red_flags: [
      'Progressão para região de pescoço posterior com limitação ventilatória',
      'Acometimento de mucosa retal ou oclusão intestinal em tumorações pélvicas',
      'Sinais de fístula broncopulmonar com hemoptise refratária'
    ],
    diferenciais: [
      'Osteomielite Mandibular Clássica',
      'Abscesso de dente de evolução aguda',
      'Câncer de Cabeça e Pescoço'
    ],
    achados_exames: [
      'Histopatológico do pus revelando grânulos basofílicos recobertos por clavas (esplendor)',
      'Bacterioscopia revelando filamentos ramificados Gram-positivos e anaeróbios'
    ],
    criterios_diagnosticos: [
      'Isolamento de Actinomyces israelii em cultura de biópsia ou pus sob anaerobiose',
      'Constatação histopatológica típica de fungos bacterianos em grânulos de enxofre'
    ]
  },
  {
    id: 'A43.9',
    nome: 'Nocardiose',
    sintomas: [
      'Tosse produtiva de evolução insidiosa com escarro purulento e por vezes raias de sangue',
      'Febre de caráter vespertino prolongada com sudorese noturna',
      'Nódulos ou abscessos subcutâneos múltiplos dolorosos na pele',
      'Cefaleia de forte intensidade focal que piora ao deitar'
    ],
    fatores_risco: [
      'Uso continuado de corticoide pós-transplante ou quimioterapia agressiva',
      'Portador de proteinose alveolar crônica',
      'Exposição ocupacional a jardinagem ou manipulação de solos em imunodeprimido'
    ],
    red_flags: [
      'Hemoptise franca volumosa indicando cavitação no parênquima pulmonar',
      'Crise convulsiva ou déficit focal súbito indicando abscesso cerebral associado',
      'Insuficiência ventilatória aguda descompensadora'
    ],
    diferenciais: [
      'Tuberculose Pulmonar Ativa',
      'Histoplasmose Pulmonar Crônica',
      'Metástases Pulmonares Múltiplas'
    ],
    achados_exames: [
      'Radiografia com infiltrados nodulares múltiplos cavitados',
      'Coloração de Kinyoun (BAAR modificado) positiva revelando bastonetes ramificados'
    ],
    criterios_diagnosticos: [
      'Cultura e isolamento positivo do complexo Nocardia asteroides',
      'Identificação histológica com coloração argentofílica em parênquima ativa'
    ]
  },
  {
    id: 'B42.1',
    nome: 'Esporotricose Cutânea',
    sintomas: [
      'Chancro de inoculação (lesão nodular avermelhada que ulcera no local do trauma)',
      'Nódulos subcutâneos que sobem em trajeto linfático linear (linfático-nodular)',
      'Dor local moderada e sem secreção purulenta evidente',
      'Os linfonodos regionais podem aumentar moderadamente de volume'
    ],
    fatores_risco: [
      'Ter contato com felinos infectados (arranhadura ou mordedura de gato doméstico)',
      'Hábito de jardinagem, manejo de terra úmida ou roseiras com espinhos',
      'Trabalho florestal, manejo de feno sem uso de luvas de proteção'
    ],
    red_flags: [
      'Disseminação de lesões pelo corpo em imunodeprimidos ou portadores de HIV',
      'Comprometimento ocular severo ou artrite fúngica descompensadora'
    ],
    diferenciais: [
      'Leishmaniose Tegumentar Americana',
      'Cromomicose de pele',
      'Linfangite bacteroide linear por micobactéria'
    ],
    achados_exames: [
      'Pesquisa direta de leveduras pleomórficas com morfologia de "charuto" no exsudato',
      'Cultura para fungos positiva em ágar Sabouraud'
    ],
    criterios_diagnosticos: [
      'Isolamento de Sporothrix schenckii a partir de exsudato de lesão ou fragmento em cultura',
      'Demonstração em exame anatomopatológico de granulomas específicos associados a leveduras'
    ]
  },
  {
    id: 'B41.9',
    nome: 'Paracoccidioidomicose',
    sintomas: [
      'Lesões ulceradas rasas com pontilhado hemorrágico em mucosa oral (estomatite moriforme)',
      'Linfadenomegalia cervical de grande volume de evolução lenta indolor',
      'Tosse seca de caráter arrastado associada a dispneia aos esforços',
      'Emagrecimento progressivo acompanhado de anorexia e fadiga crônica'
    ],
    fatores_risco: [
      'Trabalhadores agrícolas rurais que passaram décadas revolvendo poeiras de solos',
      'Habitação prolongada em área rural úmida endêmica do Brasil',
      'Histórico de tabagismo ativo crônico'
    ],
    red_flags: [
      'Insuficiência adrenal grave descompensada (Doença de Addison por infiltração)',
      'Dispneia importante de repouso por fibrose pulmonar progressiva (imagem de "asa de borboleta")',
      'Ulcerações orais ou faríngeas causando impossibilidade total de deglutir'
    ],
    diferenciais: [
      'Tuberculose Ganglionar',
      'Câncer de Boca e Laringe',
      'Linfoma Não-Hodgkin'
    ],
    achados_exames: [
      'Identificação de leveduras volumosas multinucleadas em "roda de leme" no raspado de lesão',
      'Radiografia com infiltrado intersticial simétrico bilateral "asa de borboleta"'
    ],
    criterios_diagnosticos: [
      'Visualização direta do Paracoccidioides brasiliensis em raspado, biopsia ou escarro',
      'Isolamento e cultura do fungo em meio ágar Sabouraud a 25°C'
    ]
  },
  {
    id: 'B39.2',
    nome: 'Histoplasmose Pulmonar',
    sintomas: [
      'Febre de início insidioso, cefaleia moderada e calafrios recorrentes',
      'Tosse inicialmente seca e dor torácica retroesternal opressiva',
      'Fadiga física acentuada acompanhada de mialgias e prostração',
      'Perda de peso moderada contínua acompanhada de sudorese'
    ],
    fatores_risco: [
      'Entrar em cavernas escuras úmidas repletas de morcegos',
      'Limpar sótãos, galpões ou galinheiros antigos acumulando fezes de aves',
      'Uso continuado de imunossupressores ou portador de HIV avançado'
    ],
    red_flags: [
      'Disseminação fúngica grave com sangramentos digestivos em imunodeprimido',
      'Dispneia intensa com insuficiência respiratória grave bilateral',
      'Esplenomegalia maciça com pancitopenia importante'
    ],
    diferenciais: [
      'Tuberculose Pulmonar Fibrocavitária',
      'Coccidioidomicose Pulmonar',
      'Pneumonite por Hipersensibilidade'
    ],
    achados_exames: [
      'Coloração especial (Grocott ou PAS) positiva evidenciando leveduras intracelulares pequenas',
      'Radiografia de tórax com múltiplos micronódulos ou linfadenopatia hilar bilateral'
    ],
    criterios_diagnosticos: [
      'Visualização das leveduras de Histoplasma capsulatum dentro de macrófagos em aspirado ou escarro',
      'Pesquisa de antígeno urinário de histoplasma por Elisa de alta fidelidade positivo'
    ]
  },
  {
    id: 'B44.1',
    nome: 'Aspergilose Broncopulmonar Alérgica',
    sintomas: [
      'Crises de sibilância recorrente graves que respondem mal a broncodilatadores',
      'Tosse produtiva com eliminação de tampões mucosos espessos marrons',
      'Febre baixa recorrente acompanhada de mal-estar geral imenso',
      'Dispneia de intensidade variável com dor torácica vaga'
    ],
    fatores_risco: [
      'Diagnóstico prévio consolidado de Asma Brônquica Atópica ou Fibrose Cística',
      'Habitar ambientes severamente mofados ou expostos à umidade persistente'
    ],
    red_flags: [
      'Hemoptise de grande volume devido ao desenvolvimento de aspergiloma intracavitário',
      'Deterioração funcional pulmonar crônica rápida irreversível'
    ],
    diferenciais: [
      'Asma Brônquica Exacerbada Simples',
      'Tuberculose com Cavidade Ativa',
      'Pneumonite Eosinofílica Crônica'
    ],
    achados_exames: [
      'Eosinofilia proeminente no leucograma (> 1000/mm³)',
      'Elevação maciça de imunoglobulina IgE total sérica (> 1000 UI/mL)',
      'Tomografia computadorizada revelando bronquiectasias centrais cilíndricas clássicas'
    ],
    criterios_diagnosticos: [
      'Sorologia específica positiva de anticorpos precipitantes anti-Aspergillus fumigatus',
      'Presença de bronquiectasias centrais associadas a asma refratária e IgE muito alta'
    ]
  },
  {
    id: 'B45.1',
    nome: 'Criptococose Meníngea',
    sintomas: [
      'Cefaleia holocraniana de caráter progressivo subagudo e de forte intensidade',
      'Febre moderada intermitente de início arrastado',
      'Náuseas frequentes com vômitos eventuais sem náuseas prévias',
      'Sinais de irritação meníngea (rigidez de nuca) que surgem tardiamente'
    ],
    fatores_risco: [
      'Soropositividade para HIV (Aids) com contagem de CD4 < 100 células',
      'Histórico de imunossupressão por quimioterapia ou transplante de órgãos',
      'Contato crônico próximo com pombas urbanas em sótãos ou praças'
    ],
    red_flags: [
      'Perda súbita de acuidade auditiva ou visual por hipertensão intracraniana',
      'Paralisia súbita de par craniano (especialmente sexto par - nervo abducente)',
      'Anisocoria e rebaixamento súbito do nível de consciência'
    ],
    diferenciais: [
      'Meningite Tuberculosa',
      'Meningite Viral Subaguda',
      'Neurotoxoplasmose'
    ],
    achados_exames: [
      'Microscopia do líquor com coloração de tinta da China (Nanquim) positiva revelando leveduras encapsuladas',
      'Líquior com pressão de abertura extremamente aumentada e linfocitose moderada'
    ],
    criterios_diagnosticos: [
      'Pesquisa de antígeno criptocócico (Crag) positiva em líquor ou sangue',
      'Cultura de líquor positiva para o gênero Cryptococcus spp.'
    ]
  },
  {
    id: 'M72.6',
    nome: 'Fascite Necrosante',
    sintomas: [
      'Dor excruciante desproporcional aos achados visuais iniciais na pele',
      'Edema tenso difuso acompanhado de calor local importante',
      'progressão ultra-rápida do eritema para placas arroxeadas / bolhas hemorrágicas',
      'Febre alta súbita acompanhada de calafrios, prostração extrema e confusão'
    ],
    fatores_risco: [
      'Presença de ferida, punção ou cirurgia recente na região afetada',
      'Diabetes mellitus de longa data descompensado ou nefropatias crônicas',
      'Imunossupressão ou uso crônico ativo de anti-inflamatórios'
    ],
    red_flags: [
      'Presença de crepitação gasosa na palpação da pele afetada (Gás tecidual)',
      'Anestesia local cutânea focal por destruição de ramos nervosos',
      'Sinais precoces de choque sético distributivo com hipotensão refratária'
    ],
    diferenciais: [
      'Celulite Bacteriana Comum',
      'Miosite Infecciosa Aguda',
      'Erisipela Bolhosa'
    ],
    achados_exames: [
      'Hiponatremia acentuada combinada com leucocitose neutrofílica extrema',
      'Imagem tomográfica ou radiográfica demonstrando gás no interior do plano fascial subcutâneo'
    ],
    criterios_diagnosticos: [
      'Análise visual direta de necrose fascial acinzentada durante exploração cirúrgica precoce (Padrão-ouro)',
      'Pontuação alta no escore LRINEC (Laboratory Risk Indicator for Necrotizing Fasciitis)'
    ]
  },
  {
    id: 'B00.2',
    nome: 'Gengivoestomatite Herpética Aguda',
    sintomas: [
      'Múltiplas microvesículas dolorosas difusas em mucosa oral e gengiva',
      'Febre alta de início abrupto e prostração expressiva',
      'Gengivas intensamente inflamadas, sangrantes e edemaciadas ao toque',
      'Dificuldade severa para mastigação ou deglutição com sialorreia abundante'
    ],
    fatores_risco: [
      'Primeira infância (especialmente crianças entre 1 e 5 anos)',
      'Inexistência de anticorpos prévios contra vírus do Herpes Simples-1 (HSV-1)'
    ],
    red_flags: [
      'Incapacidade e recusa total de ingesta líquida levando a desidratação crítica',
      'Envolvimento herpético ocular concomitante bilateral',
      'Auto-inoculação em dedos das mãos (Painço herpético)'
    ],
    diferenciais: [
      'Herpangina Coaxsackie',
      'Estomatite Aftosa Recorrente',
      'Síndrome de Stevens-Johnson precoce'
    ],
    achados_exames: [
      'Bacterioscopia normal sem germes patogênicos',
      'Leucograma evidenciando linfocitose moderada'
    ],
    criterios_diagnosticos: [
      'Diagnóstico clínico estabelecido pelas lesões gengivais eritemato-ulceradas agudizadas típicas',
      'Sorologia IgM reagente ou detecção por swab de PCR positiva se apresentações graves'
    ]
  },
  {
    id: 'B30.0',
    nome: 'Ceratoconjuntivite Epidêmica Adenoviral',
    sintomas: [
      'Hiperemia conjuntival bilateral de início rápido acompanhada de secreção aquosa/serosa',
      'Sensação dolorosa de corpo estranho ou areia nos olhos',
      'Edema palpebral e quemose conjuntival proeminente',
      'Fotofobia ocular intensa acompanhada de lacrimejamento de difícil controle'
    ],
    fatores_risco: [
      'Contato direto com indivíduo infectado na mesma habitação',
      'Compartilhamento de toalhas faciais ou colírios comuns',
      'Exposição prévia a exames oftalmológicos com tonometria não esterilizada'
    ],
    red_flags: [
      'Diminuição marcante e súbita da acuidade visual (Infiltrados subepiteliais de córnea)',
      'Formação de pseudomembranas espessas purulentas na conjuntiva palpebral',
      'Ulceração de córnea visível à coloração de fluoresceína'
    ],
    diferenciais: [
      'Conjuntivite Bacteriana Aguda purulenta',
      'Glaucoma de ângulo fechado agudo unilateral',
      'Celulite Orbitária'
    ],
    achados_exames: [
      'Visualização de múltiplos agregados linfoides conjuntivais em lâmpada de fenda',
      'Teste rápido imunocromatográfico de antígeno adenoviral em lágrima positivo'
    ],
    criterios_diagnosticos: [
      'Sintomatologia tipicamente bilateral epidêmica com secreção predominantemente aquosa',
      'Confirmação por PCR de secreção ocular ou swab conjuntival'
    ]
  },
  {
    id: 'B08.5',
    nome: 'Herpangina',
    sintomas: [
      'Microvesículas e ulcerações dolorosas em palato mole, úvula e tonsilas',
      'Odinofagia intensa súbita acompanhada de recusa alimentar em crianças',
      'Febre alta de início abrupto associada a calafrios',
      'Cefaleia de moderada intensidade e coriza anterior leve'
    ],
    fatores_risco: [
      'Crianças menores de 10 anos em período de creche durante primavera/verão',
      'Inexistência habitual de lavagem de mãos em ambientes de lazer infantil'
    ],
    red_flags: [
      'Sintomas neurológicos graves como sonolência severa ou mioclonias (Risco de Encefalite)',
      'Desidratação por recusa total de deglutir fluidos líquidos básicos',
      'Persistência de pânicos noturnos agudos ou irritabilidade extrema'
    ],
    diferenciais: [
      'Gengivoestomatite Herpética Viral',
      'Faringoamigdalite bacteriana clássica',
      'Febre Aftose Humana'
    ],
    achados_exames: [
      'Leucocitose moderada com neutrofilia precoce',
      'PCR para enterovírus nas fezes ou saliva positivo'
    ],
    criterios_diagnosticos: [
      'Visualização das vesículas ou úlceras isoladas clássicas restritas à porção posterior da cavidade oral',
      'Cenário epidemiológico sazonal com múltiplos doentes na mesma creche'
    ]
  }
];
