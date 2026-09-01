import { MedicalDisease } from '../types';

export const CARDIOLOGY_DISEASES: Omit<MedicalDisease, 'achados_exames' | 'criterios_diagnosticos'>[] = [
  {
    id: 'I10',
    nome: 'Hipertensão Arterial Sistêmica',
    sintomas: [
      'Cefaleia occipital em região posterior',
      'Tontura persistente',
      'Zumbido no ouvido ou tinido pulsátil',
      'Escotomas cintilantes e embaçamento visual',
      'Visão turva episódica',
      'Fadiga muscular atípica'
    ],
    fatores_risco: [
      'Idade avançada',
      'Sedentarismo crônico',
      'Obesidade abdominal',
      'Consumo excessivo de sódio na dieta',
      'Histórico familiar de hipertensão precoce',
      'Tabagismo ativo ou passivo'
    ],
    red_flags: [
      'Cefaleia refratária persistente de início súbito',
      'Dor torácica de caráter opressivo',
      'Déficit neurológico focal (hemiparesia ou disartria)',
      'Dispneia de início súbito',
      'Sinais evidentes de edema agudo de pulmão (estertores aéreos)'
    ],
    diferenciais: [
      'Transtorno de ansiedade com crises adrenérgicas',
      'Estenose de artéria renal hemodinamicamente significativa',
      'Feocromocitoma produtor de catecolaminas',
      'Aldosteronismo primário',
      'Síndrome da apneia obstrutiva do sono'
    ]
  },
  {
    id: 'I20.9',
    nome: 'Angina Estável (Insuficiência Coronariana Crônica)',
    sintomas: [
      'Dor retroesternal em aperto desencadeada por esforço físico',
      'Irradiação da dor para membro superior esquerdo',
      'Alívio completo da dor com repouso de 3-5 minutos',
      'Alívio rápido após uso de nitrato via sublingual',
      'Dispneia de esforço equivalente anginoso'
    ],
    fatores_risco: [
      'Hipertensão Arterial crônica de longo curso',
      'Diabetes Mellitus tipo 2 ou tipo 1',
      'Dislipidemia (elevação de LDL-c e triglicerídeos)',
      'Tabagismo ativo ou histórico de carga tabágica',
      'Histórico familiar de doença arterial coronariana precoce',
      'Sedentarismo habitual'
    ],
    red_flags: [
      'Dor durando mesmo em repouso físico',
      'Aumento súbito da frequência ou intensidade das crises de angústia',
      'Duração do desconforto precordial superior a 20 minutos',
      'Associação com síncope prévia ou lipotimia'
    ],
    diferenciais: [
      'Espasmo esofágico difuso secundário',
      'Doença do refluxo gastroesofágico (DRGE)',
      'Custo-condrite crônica (Síndrome de Tietze)',
      'Pericardite aguda de etiologia variada',
      'Transtorno de ansiedade secundário ou pânico'
    ]
  },
  {
    id: 'I20.0',
    nome: 'Angina Instável',
    sintomas: [
      'Dor precordial opressiva ocorrendo em repouso',
      'Angina de início recente ou piora progressiva de padrão prévio',
      'Irradiação para mandíbula, dorso ou ombros',
      'Anorexia e náuseas severas associadas',
      'Sudorese fria discreta'
    ],
    fatores_risco: [
      'Doença arterial coronariana já diagnosticada anteriormente',
      'Diabetes Mellitus de longa data',
      'Tabagismo de repetição',
      'Dislipidemia mista crônica',
      'Sedentarismo acentuado'
    ],
    red_flags: [
      'Instabilidade hemodinâmica nítida (hipotensão ou choque)',
      'Evidência de congestão pulmonar bilateral',
      'Infradesnivelamento dinâmico de segmento ST no eletrocardiograma',
      'Inversão simétrica profunda de onda T'
    ],
    diferenciais: [
      'Infarto agudo do miocárdio sem supradesnivelamento de ST',
      'Pericardite aguda isolada',
      'Tromboembolismo pulmonar agudo (TEP)',
      'Dissecção aguda de aorta',
      'Espasmo esofágico severo com esofagite'
    ]
  },
  {
    id: 'I21.0',
    nome: 'Infarto Agudo do Miocárdio com Supra de ST',
    sintomas: [
      'Dor retroesternal opressiva intensa em aperto',
      'Irradiação para membro superior esquerdo ou mandíbula bilateral',
      'Duração do quadro álgico superior a 20 minutos',
      'Sudorese fria profusa associada',
      'Dispneia moderada a grave',
      'Sensação vívida de morte iminente'
    ],
    fatores_risco: [
      'Hipertensão Arterial Sistêmica não tratada',
      'Diabetes Mellitus sem compensação glicêmica',
      'Tabagismo ativo crônico',
      'Dislipidemia grave familiar',
      'Obesidade central pronunciada',
      'História familiar de infarto agudo prematuro'
    ],
    red_flags: [
      'Supradesnivelamento de segmento ST mensurado no ECG em duas derivações contíguas',
      'Carga obstrutiva promovendo choque cardiogênico secundário',
      'Edema agudo de pulmão com necessidade de oxigenoterapia',
      'Parada cardiorrespiratória súbita',
      'Arritmias ventriculares instáveis ou malignas (TV/FV)'
    ],
    diferenciais: [
      'Dissecção de aorta ascendente (Stanford A)',
      'Tromboembolismo pulmonar obstrutivo maciço',
      'Pericardite aguda infecciosa',
      'Pneumotórax espontâneo hipertensivo',
      'Rotura traumática de víscera esofágica'
    ]
  },
  {
    id: 'I21.4',
    nome: 'Infarto Agudo do Miocárdio sem Supra de ST',
    sintomas: [
      'Dor precordial em aperto de forte intensidade prolongada',
      'Sudorese profusa em faces',
      'Náuseas frequentes e sialorreia',
      'Falta de ar aguda incômoda',
      'Apresentação clínica atípica com dor epigástrica e fadiga isolada'
    ],
    fatores_risco: [
      'Diabetes Mellitus severo',
      'Idade avançada superior a 75 anos',
      'Doença coronariana multiarterial preexistente',
      'Hipertensão sistêmica de longo prazo',
      'Dislipidemia grave ativa'
    ],
    red_flags: [
      'Elevação e curva típica de Troponina ultrassensível',
      'Hipotensão persistente não responsiva a volume',
      'Infradesnivelamento persistente do segmento ST',
      'Onda T simétrica e pontiaguda invertida em derivações anteriores'
    ],
    diferenciais: [
      'Angina instável persistente de alto risco',
      'Miocardite viral aguda',
      'Miocardiopatia de Takotsubo induzida por estresse',
      'Exacerbação de úlcera péptica ou gastrite',
      'Pericardite serofibrinosa'
    ]
  },
  {
    id: 'I50.9',
    nome: 'Insuficiência Cardíaca de Fração de Ejeção Reduzida (ICFER)',
    sintomas: [
      'Dispneia progressiva aos mínimos esforços',
      'Ortopneia pronunciada (necessidade de elevar a cabeceira)',
      'Dispneia paroxística noturna (DPN) despertando o doente',
      'Fadiga muscular periférica precoce',
      'Edema de membros inferiores bilateral que piora à tarde',
      'Tosse seca persistente na posição supina'
    ],
    fatores_risco: [
      'Hipertensão Arterial Sistêmica não compensada',
      'Infarto agudo do miocárdio prévio',
      'Valvopatias aórtica ou mitral crônicas graves',
      'Miocardite aguda preexistente',
      'Histórico de etilismo severo ou uso de quimioterápicos cardiotóxicos'
    ],
    red_flags: [
      'Estertores pulmonares crepitantes bilaterais',
      'Saturação arterial periférica de oxigênio abaixo de 90%',
      'presença de terceira bulha (B3) audível com galope ventricular',
      'Hipotensão com sinais clínicos de choque cardiogênico',
      'Oligúria progressiva com retenção de escórias'
    ],
    diferenciais: [
      'Doença Pulmonar Obstrutiva Crônica (DPOC) exacerbada',
      'Insuficiência Renal Crônica descompensada',
      'Cirrose hepática com ascite e anasarca',
      'Tromboembolismo pulmonar de repetição',
      'Síndrome nefrótica idiopática'
    ]
  },
  {
    id: 'I50.1',
    nome: 'Insuficiência Cardíaca de Fração de Ejeção Preservada (ICFEP)',
    sintomas: [
      'Falta de ar progressiva de intensidade variável aos esforços',
      'Fadiga generalizada matinal',
      'Intolerância grave a esforços que realizava sem restrição',
      'Edema de tornozelos persistente',
      'Aumento repentino de massa ponderal por acúmulo hídrico'
    ],
    fatores_risco: [
      'Idade avançada senil',
      'Gênero feminino',
      'Obesidade mórbida grau II ou III',
      'Hipertensão Arterial de longa data em idosos',
      'Fibrilação Atrial crônica',
      'Diabetes e síndrome metabólica ativa'
    ],
    red_flags: [
      'Ortopneia de repouso severa',
      'Exacerbação aguda com sinais clínicos de congestão pulmonar rápida',
      'Fibrilação atrial de resposta ventricular rápida associada'
    ],
    diferenciais: [
      'Pneumopatia intersticial difusa crônica',
      'Anemia severa multifatorial',
      'Hipotireoidismo de longa data descompensado',
      'Insuficiência venosa crônica bissegmetar',
      'Asma de início senil hiper-reativa'
    ]
  },
  {
    id: 'I48.0',
    nome: 'Fibrilação Atrial Paroxística',
    sintomas: [
      'Palpitações rápidas e essencialmente irregulares',
      'Tontura flutuante associada à palpitação',
      'Dispneia de caráter agudo e repouso',
      'Cansaço atípico',
      'Opressão precordial leve',
      'Síncope de repouso temporária'
    ],
    fatores_risco: [
      'Hipertensão Arterial Sistêmica',
      'Apneia obstrutiva do sono mecânica',
      'Valvopatia mitral crônica (reumática ou prolapso)',
      'Idade senil acima de 65 anos',
      'Consumo copioso de bebidas alcoólicas agudo',
      'Tireotoxicose ou hipertireoidismo'
    ],
    red_flags: [
      'Frequência ventricular superior a 150 batimentos por minuto',
      'Hipotensão arterial sistêmica descompensadora',
      'congestão pulmonar aguda e desconforto respiratório severo',
      'Início de déficit neurológico súbito indicativo de AVC emboligênico'
    ],
    diferenciais: [
      'Taquicardia supraventricular por reentrada nodal (TRN)',
      'Extrassístoles atriais multifocais pareadas',
      'Flutter atrial de condução irregular',
      'Transtorno de pânico agudo',
      'Taquicardia sinusal adrenérgica'
    ]
  },
  {
    id: 'I48.2',
    nome: 'Fibrilação Atrial Crônica (Persistente/Permanente)',
    sintomas: [
      'Palpitações irregulares persistentes',
      'Fadiga muscular progressiva aos esforços comuns',
      'Intolerância crônica à atividade aeróbica',
      'Falta de ar intermitente recorrente',
      'Astenia e fadiga aos esforços'
    ],
    fatores_risco: [
      'Cardiopatia estrutural de base dilatada ou hipertensiva',
      'Hipertensão Arterial crônica severa',
      'Idade avançada maior de 75 anos',
      'Diabetes Mellitus associado',
      'Síndrome de apneia obstrutiva de moderada a grave'
    ],
    red_flags: [
      'Início súbito de paralisia de hemiface ou membros (AVC embólico)',
      'Estenose valvar mitral moderada a grave associada',
      'Isquemia arterial aguda grave de extremidade distal'
    ],
    diferenciais: [
      'Flutter atrial estrutural com bloqueio variável',
      'Taquicardia atrial multifocal associada a DPOC',
      'Ritmo juncional juncional de escape de resposta intermediária'
    ]
  },
  {
    id: 'I48.9',
    nome: 'Flutter Atrial',
    sintomas: [
      'Palpitações rápidas de ritmo regular',
      'Tontura flutuante sem escurecimento visual',
      'Dispneia de intensidade média aos esforços comuns',
      'Sensação de palpitação ou agitação rítmica no tórax'
    ],
    fatores_risco: [
      'Doença Pulmonar Obstrutiva Crônica (DPOC) com cor pulmonale',
      'Doença cardíaca congênita pré-operatória ou cicatriz atrial',
      'Hipertensão sistêmica vascular',
      'Pós-operatório imediato de revascularização miocárdica'
    ],
    red_flags: [
      'Condução AV 1:1 rápida promovendo colapso funcional agudo',
      'Instabilidade hemodinâmica nítida sistêmica',
      'Angina de alta demanda associada no coronariopata'
    ],
    diferenciais: [
      'Taquicardia sinusal com resposta fixa',
      'Taquicardia por reentrada nodal (TRN)',
      'Taquicardia atrial com foco ectópico único',
      'Fibrilação atrial de ritmo regularizado por via lenta'
    ]
  },
  {
    id: 'B57.2',
    nome: 'Cardiopatia Chagásica Crônica',
    sintomas: [
      'Palpitações frequentes ou batimentos ectópicos perceptíveis',
      'Tonturas esporádicas e instabilidade ao caminhar',
      'Dispneia aos esforços de caráter lento e progressivo',
      'Edema de membros inferiores elástico bilateral',
      'Dor torácica de características atípicas'
    ],
    fatores_risco: [
      'Procedência de área rural endêmica em habitações precárias',
      'Contato prévio conhecido com inseto "barbeiro" (Triatómeos)',
      'Histórico familiar de implante de marcapasso ou morte súbita'
    ],
    red_flags: [
      'Achados de Bloqueio de Ramo Direito + Hemibloqueio Anterior Esquerdo no ECG",',
      'Síncope de causa indeterminada',
      'Episódios documentados de Taquicardia Ventricular não sustentada',
      'Tromboembolismo de repetição pulmonar ou cerebral'
    ],
    diferenciais: [
      'Miocardiopatia dilatada idiopática clássica',
      'Cardiopatia isquêmica aterosclerótica avançada',
      'Miocardiopatia induzida por toxicidade farmacológica'
    ]
  },
  {
    id: 'I42.0',
    nome: 'Miocardiopatia Dilatada',
    sintomas: [
      'Dispneia progressiva aos esforços comuns',
      'Tosse seca persistente ao repousar deitado',
      'Inchaço ou edema de membros inferiores macio bilateral',
      'Prostração intensa e cansaço fácil',
      'plenitude pós-prandial dolorosa e empachamento por estase visceral'
    ],
    fatores_risco: [
      'Abuso habitual prolongado de etanol (bebida alcoólica)',
      'Histórico familiar positivo de dilatação miocárdica sem causa',
      'Tratamento prévio com quimioterápicos cardiotóxicos (Doxorrubicina, etc.)',
      'Deficiência prolongada de tiamina na nutrição',
      'Miocardite crônica subsequente à infecção viral'
    ],
    red_flags: [
      'Registro eletrocardiográfico de taquicardia ventricular sustentada',
      'Choque cardiogênico primário agudo',
      'Anasarca refratária ao uso de diurético em domicílio',
      'Síncope arritmogênica de repouso'
    ],
    diferenciais: [
      'Cardiopatia isquêmica difusa (Miocardiopatia Isquêmica)',
      'Insuficiência cardíaca direita isolada',
      'Disfunção miocárdica reversível induzida por hipotireoidismo grave'
    ]
  },
  {
    id: 'I42.1',
    nome: 'Miocardiopatia Hipertrófica',
    sintomas: [
      'Dispneia importante aos esforços comuns',
      'Dor torácica tipo angina desencadeada por estresse ou esforço',
      'Síncope abrupta relacionada com o esforço físico vigoroso',
      'Palpitações arrítmicas rápidas no peito'
    ],
    fatores_risco: [
      'Mutação genética hereditária familiar autossômica dominante',
      'Histórico na família de morte súbita inexplicável de jovens',
      'Doença cardíaca congênita de base no lactente'
    ],
    red_flags: [
      'Episódio de síncope transitória relacionada com o esforço físico',
      'Espessamento e hipertrofia extrema do septo interventricular (>30mm no ECO)',
      'Parada cardíaca abortada ressuscitada em jovem'
    ],
    diferenciais: [
      'Estenose aórtica calcificada senil de alto grau',
      'Hipertrofia cardíaca secundária fisiológica (Coração de Atleta)',
      'Amiloidose cardíaca infiltrativa com espessamento'
    ]
  },
  {
    id: 'I42.5',
    nome: 'Miocardiopatia Restritiva',
    sintomas: [
      'Sintomas típicos acentuados de insuficiência cardíaca direita',
      'Falta de ar progressiva aos esforços de repouso',
      'Ascite volumosa com abaulamento de flancos progressivo',
      'Edema progressivo ascendente de extremidades inferiores',
      'Fadiga muscular de instalação lenta'
    ],
    fatores_risco: [
      'Diagnóstico conhecido de Amiloidose primária ou secundária',
      'Doença granulomatosa de Sarcoidose',
      'Esclerodermia sistêmica difusa',
      'Hemocromatose por sobrecarga de ferro tecidual',
      'Radioterapia torácica prévia extensa por linfoma/neoplasia'
    ],
    red_flags: [
      'Surgimento progressivo de bloqueios atrioventriculares de alto grau',
      'Fenômenos de tromboembolismo pulmonar ou periférico de repetição',
      'Hipotensão arterial marcante abrupta refratária'
    ],
    diferenciais: [
      'Pericardite constritiva compressiva crônica (necessita diferenciar por eco/RMN)',
      'Disfunção hepática crônica terminal por cirrose primária',
      'Insuficiência renal terminal urêmica'
    ]
  },
  {
    id: 'I40',
    nome: 'Miocardite Aguda',
    sintomas: [
      'Dor torácica central simulando perfeitamente infarto agudo',
      'Dispneia de instalação rápida e repouso de dias',
      'Fadiga muscular generalizada e astenia profunda',
      'Palpitações arrítmicas aceleradas em precórdio',
      'Historial de sintoma gripal recente (febre, coriza, mialgias, diarreia)'
    ],
    fatores_risco: [
      'Infecção viral recente por Coxsackie, Parvovírus B19 ou COVID-19',
      'Tratamento atual com inibidores de checkpoint imunológico (imunoterapia)',
      'Consumo crônico ou agudo de cocaína e anfetaminas',
      'Exposição ocupacional continuada a metais pesados'
    ],
    red_flags: [
      'Elevação maciça e persistente de Troponina ultrassensível',
      'Choque cardiogênico ou insuficiência cardíaca fulminante imediata',
      'Bloqueio AV avançado ou total de início súbito',
      'Instabilidade hemodinâmica por taquicardia ventricular'
    ],
    diferenciais: [
      'Infarto agudo do miocárdio coronariano obstrutivo',
      'Pericardite aguda isolada não complicada',
      'Miocardiopatia induzida por estresse de Takotsubo'
    ]
  },
  {
    id: 'I30',
    nome: 'Pericardite Aguda',
    sintomas: [
      'Dor torácica de início agudo e pleurítica (piora com inspiração)',
      'Piora importante da dor precordial na posição de decúbito dorsal',
      'Melhora típica ao inclinar-se para frente (posição em prece maometana)',
      'Atrito pericárdico audível no foco paraesternal esquerdo',
      'Febre de baixa intensidade persistente'
    ],
    fatores_risco: [
      'Infeções de vias aéreas superiores de provável etiologia viral',
      'Urêmicos por nefropatia crônica dialítica',
      'Síndrome de Dressler tardia pós-infarto do miocárdio',
      'Tuberculose pulmonar ativa',
      'Neoplasias ocultas avançadas'
    ],
    red_flags: [
      'Anormalidades compressivas com hipotensão sistêmica grave',
      'Tríade de Beck (hipotensão + turgência jugular + abafamento de bulhas)',
      'Presença demonstrada de pulso paradoxal mensurável',
      'Eletrocardiograma com supradesnivelamento difuso do segmento ST côncavo'
    ],
    diferenciais: [
      'Infarto agudo do miocárdio com supra de ST',
      'Dissecção aguda de aorta em evolução',
      'Tromboembolismo pulmonar unilateral',
      'Rotura esporádica de esôfago distal'
    ]
  },
  {
    id: 'I34.2',
    nome: 'Estenose Mitral',
    sintomas: [
      'Falta de ar progressiva de anos aos esforços comuns',
      'Falta de ar ao deitar (ortopneia) necessitando travesseiros',
      'Hemoptise franca aos esforços por congestão pulmonar',
      'Palpitações nítidas e duradouras',
      'Surgimento de facies mitral (cianose em bochechas e orelhas)'
    ],
    fatores_risco: [
      'Febre reumática pregressa de repetição na infância',
      'Sexo feminino (predominância acentuada em mais de 75% dos casos)',
      'Calcificação senil do anel mitral em idosos de alta renda'
    ],
    red_flags: [
      'Fibrilação atrial de início agudo desencadeada por estenose',
      'Eventos de embolização sistêmica ou acidente vascular cerebral',
      'Área valvar mitral menor que 1,5cm² no ecocardiograma',
      'Sopro diastólico com estalido de abertura audível e proeminente'
    ],
    diferenciais: [
      'Mixoma intracavitário de átrio esquerdo mímico',
      'Insuficiência cardíaca isquêmica congestiva biventricular',
      'Insuficiência venosa profunda'
    ]
  },
  {
    id: 'I34.0',
    nome: 'Insuficiência Mitral Crônica',
    sintomas: [
      'Dispneia crônica progressiva aos esforços de anos de evolução',
      'Fadiga muscular de início rápido aos exercícios comuns',
      'Ortopneia episódica nas fases agudas de descompensação',
      'Inchaço ou edema de membros inferiores bilaterais progressivo'
    ],
    fatores_risco: [
      'Prolapso crônico de valva mitral familiar ou isolado',
      'Histopatologia de Febre Reumática anterior',
      'Infarto do miocárdio anterior com disfunção ou ruptura de papilar',
      'Cardiopatia estrutural dilatada de base'
    ],
    red_flags: [
      'Sopro holossistólico regurgitativo áspero auscultável em foco mitral',
      'Presença proeminente de terceira bulha (B3)',
      'Ecocardiograma com fração de ejeção do VE abaixo de 60% ou diâmetro sistólico final >40mm" '
    ],
    diferenciais: [
      'Insuficiência valvar aórtica severa de refluxo amplo',
      'Comunicação interventricular sintomática',
      'Insuficiência cardíaca sistólica refratária de origem idiopática'
    ]
  },
  {
    id: 'I35.0',
    nome: 'Estenose Aórtica Calcificada',
    sintomas: [
      'Angina torácica clássica desencadeada exclusivamente ao esforço',
      'Dispneia progressiva limitante de instalação de meses',
      'Síncope súbita na vigência de esforço físico prolongado',
      'Tríade clássica do paciente sintomático limitante'
    ],
    fatores_risco: [
      'Idade senil superior a 65 anos',
      'Presença de valva aórtica bicúspide congênita',
      'Dislipidemia avançada aterosclerótica de artérias centrais',
      'Insuficiência renal crônica grave dialítica'
    ],
    red_flags: [
      'Aparecimento de qualquer sintoma da tríade limitante',
      'Sopro sistólico crescendo-decrescendo foco aórtico com irradiação para carótidas',
      'Desdobramento paradoxal ou abafamento importante de segunda bulha (B2)'
    ],
    diferenciais: [
      'Estenose aórtica subvalvar ou anel membranoso de saída',
      'Cardiomiopatia hipertrófica de padrão obstrutivo apical',
      'Insuficiência valvar mitral isolada'
    ]
  },
  {
    id: 'I35.1',
    nome: 'Insuficiência Aórtica Crônica',
    sintomas: [
      'Dispneia progressiva aos mínimos esforços de anos de evolução',
      'Palpitações nítidas com sensação de latejamento em pescoço e membros',
      'Latejamento ou latejar de cabeça e artérias carótidas',
      'Fadiga física e cansaço fácil precoce',
      'Desconforto precordial ou dor anginosa noturna de repouso'
    ],
    fatores_risco: [
      'Histórico de Febre Reumática infantil',
      'Doenças conjuntivas de Síndrome de Marfan ou Ehlers-Danlos',
      'Estenose e valva aórtica bicúspide isolada',
      'Dilatação progressiva aneurismática da raiz de aorta',
      'Aortite sifilítica ou inflamatória crônica'
    ],
    red_flags: [
      'Pressão arterial diastólica muito baixa com pulso alargado (pressão divergente)',
      'Ecocardiograma revelando diâmetro sistólico final VE > 50mm ou fração de ejeção instável',
      'Presença documentada de múltiplos sinais físicos periféricos hiperdinâmicos (Musset, Corrigan, Quincke)'
    ],
    diferenciais: [
      'Persistência do canal arterial calibroso de grande fluxo',
      'Fístula arteriovenosa periférica calitativa',
      'Insuficiência mitral de regurgitação severa'
    ]
  },
  {
    id: 'I36.1',
    nome: 'Insuficiência Tricúspide Grave',
    sintomas: [
      'Inchaço ou edema de membros inferiores volumosos e de longa duração',
      'Ingurgitamento jugular bilateral visível mesmo a 45 graus',
      'Desconforto doloroso no quadrante abdominal superior direito',
      'ascite e ascite tensa volumosa recorrente',
      'Fadiga muscular periférica importante aos menores movimentos'
    ],
    fatores_risco: [
      'Presença conhecida de Hipertensão arterial pulmonar crônica de base',
      'Uso atual ou pregressivo de drogas venosas ilícitas (causa de endocardite tricuspídea)',
      'Diagnóstico congênito de Anomalia de Ebstein',
      'Implante anterior de marpacasso ou cardiodesfibrilhador'
    ],
    red_flags: [
      'Hepatomegalia pulsátil dolorosa com disfunção hepática cirrótica congestiva',
      'Arritmias supraventriculares de díficil tratamento sobrecarregadas',
      'Retenção hídrica generalizada extrema refratária a diuréticos'
    ],
    diferenciais: [
      'Cirrose hepática primária sem comprometimento cardíaco biventricular',
      'Pericardite constritiva pericárdica',
      'Insuficiência cardíaca esquerda isolada precoce'
    ]
  },
  {
    id: 'I33.0',
    nome: 'Endocardite Infecciosa Aguda',
    sintomas: [
      'Febre de forte intensidade acompanhada de calafrios intensos',
      'Quadro tóxico de prostração e emagrecimento rápido inexplicado',
      'Defeito ou surgimento recente de sopro auscultatório cardíaco',
      'Fadiga e mialgias generalizadas intensas',
      'Sudorese noturna importante profusa'
    ],
    fatores_risco: [
      'Uso de drogas injetáveis intravenosas com agulhas reutilizadas',
      'Presença definitiva de prótese valvar cardíaca metálica ou biológica',
      'procedimento invasivo recente de cavidade oral (extração) sem profilaxia',
      'lesão valvar reumática preexistente sem tratamento'
    ],
    red_flags: [
      'Manifestações tromboembólicas sistêmicas com déficits em membros ou AVC',
      'Lesões de Janeway eritematosas indolores nas palmas das mãos ou pés',
      'Nódulos de Osler extremamente dolorosos e violáceos nas pontas dos dedos',
      'Hemorragias lineares subungueais persistentes nas mãos',
      'Manchas de Roth visualizadas no exame de fundo de olho'
    ],
    diferenciais: [
      'Glomerulonefrite aguda de pós-estreptócico',
      'Endocardite não bacteriana de Libman-Sacks (Lupus Sistêmico)',
      'Quadro de Febre Reumática inflamatória aguda',
      'Síndrome infecciosa sistêmica por riquetioses ou leptospirose'
    ]
  },
  {
    id: 'I27.0',
    nome: 'Hipertensão Arterial Pulmonar Secundária',
    sintomas: [
      'Falta de ar progressiva aos mínimos movimentos físicos cotidianos',
      'Síncope de repouso induzida exclusivamente pelo esforço',
      'Fadiga generalizada muscular proeminente',
      'Dor torácica atípica sem relação com as refeições',
      'Tosse seca unilateral irritativa de meses',
      'Alteração ou perda de timbre de voz (rouquidão por Síndrome de Ortner)'
    ],
    fatores_risco: [
      'Doenças de tecido conjuntivo autoimunes estabelecidas (Esclerodermia)',
      'Histórico na família nuclear de hipertensão pulmonar primária',
      'Esquistossomose mansoni com acometimento portal conhecido',
      'Consumo anterior ou continuado de anorexígenos adrenérgicos',
      'Historial de TEP silencioso'
    ],
    red_flags: [
      'Insuficiência ventricular direita de instalação abrupta precordial',
      'Cateterismo cardíaco evidenciando pressão de artéria pulmonar média > 25 mmHg',
      'Surto recorrente de taquicardia ventricular não-sustentada'
    ],
    diferenciais: [
      'Disfunção sistólica esquerda ou valvopatias de refluxo esquerdo',
      'Tromboembolismo pulmonar crônico na sua forma de micro-embolias',
      'Pneumopatia obstrutiva intersticial crónica'
    ]
  },
  {
    id: 'R55',
    nome: 'Síncope Vasovagal (Síncope Neurocardiogênica)',
    sintomas: [
      'Perda transitória completa da consciência autolimitada',
      'Presença típica de pródromos clássicos (náuseas, sudorese, palidez)',
      'Visão turva em "túnel" ou "escurecimento visual" antes do desmaio',
      'Recuperação rápida e integral do nível alerta sem déficits focais'
    ],
    fatores_risco: [
      'Faixa etária jovem (idade pediátrica ou adultos jovens ativos)',
      'Manutenção prolongada de ortostatismo de pé imóvel em locais públicos',
      'Exposição repentina a calor excessivo ou ambientes abafados',
      'Estado nítido de desidratação leve por jejum ou atividade',
      'Estressores de forte dor periférica ou fobia'
    ],
    red_flags: [
      'Ausência total de qualquer pródromo antes do colapso',
      'Episódio decorrido exclusivamente na posição de deitado',
      'Ocorrência imediata após ou durante atividade física de carga',
      'Dano físico crônico ou contusão craniana significativa pós-evento'
    ],
    diferenciais: [
      'Crise convulsiva tônico-clônica generalizada',
      'Bloqueio cardíaco funcional profundo (BAVT de Stokes-Adams)',
      'Acidente vascular cerebral transitório ou permanente',
      'Hipoglicemia severa em paciente diabético insulinizado'
    ]
  },
  {
    id: 'I82.9',
    nome: 'Trombose Venosa Profunda (TVP)',
    sintomas: [
      'Dor localizada de forte intensidade unilateral na panturrilha',
      'Edema assimétrico acentuado em perna afetada unilateral',
      'Aumento da temperatura local eritematoso e avermelhado',
      'Sinal de Homans positivo (dor intensa à dorsiflexão do pé contra resistência)'
    ],
    fatores_risco: [
      'Imobilidade de leito prolongada ou cirurgia pélvica/ortopédica recente',
      'Gestações ativas no terceiro trimestre ou puerpério imediato',
      'Uso regular de pílula contraceptiva oral base estrogênio',
      'Neoplasias ocultas sólidas ativas na bacia',
      'Historial pregresso de tromboses ou TVP anterior'
    ],
    red_flags: [
      'Falta de ar ou taquipneia súbitas associadas (Embolia Pulmonar)',
      'Phlegmasia cerulea dolens (cianose distal profunda com perda de pulsos)',
      'Desconforto ventilatório pleural agudo'
    ],
    diferenciais: [
      'Ruptura súbita de Cisto Sinovial de Baker em face poplítea',
      'Erisipela ou celulite de perna unilateral bacteriana',
      'Ruptura ou estiramento muscular de gêmeos de panturrilha',
      'Insuficiência venosa vascular comum de veias varicosas'
    ]
  },
  {
    id: 'I73.9',
    nome: 'Doença Arterial Obstrutiva Periférica (DAOP)',
    sintomas: [
      'Claudicação intermitente na panturrilha delimitada por distância',
      'Diferença térmica fria unilateral na perna e coxa envolvida',
      'Palidez de elevação do membro e rubor de declive característicos',
      'Secura de anexos da pele com diminuição pilosa em coxas/panturrilhas',
      'Pulsos tibial posterior e pedioso abolidos ou francamente lentos'
    ],
    fatores_risco: [
      'Tabagismo pesado consolidado de longa data',
      'Diabetes Mellitus cronicamente mal assistido e descontrolado',
      'Aterosclerose multissistêmica documentada',
      'Hipertensão Arterial com controle inadequado',
      'Idade de início acima de 55 anos'
    ],
    red_flags: [
      'Dor na panturrilha ou pé ocorrendo continuamente em repouso noturno',
      'Presença definitiva de úlcera isquêmica dolorosa sem cicatrização',
      'Quadro de isquemia aguda com frieza, dor intolerável e motricidade prejudicada'
    ],
    diferenciais: [
      'Estenose lombar canal vertebral induzindo claudicação neurogênica',
      'Neuropatia sensitiva periférica simétrica distal por diabetes',
      'Insuficiência venosa profunda com hipertensão venosa grave',
      'Cisto de Baker poplíteo expansivo'
    ]
  },
  {
    id: 'I49.3',
    nome: 'Extrassístoles Ventriculares',
    sintomas: [
      'Sensação subjetiva de "pausa" ou "falha" em pulso regular',
      'Sentimento precordial de pancada forte isolada no peito',
      'Palpitações isoladas pontuais persistentes no precórdio',
      'Sensação leve de tontura durante episódios frequentes e pareados'
    ],
    fatores_risco: [
      'Idade senil ou envelhecimento cardiovascular',
      'Doença cardíaca estrutural coronariana ou hipertensiva subjacente',
      'Ansiedade severa ou estresse psíquico agudo reiterado',
      'Uso em demasia de café, energéticos, tabaco ou álcool',
      'Hipotireoidismo ou tireotoxicose',
      'Alteração sérica hidroeletrolítica ativa (de potássio ou magnésio)'
    ],
    red_flags: [
      'Presença no exame Holter de alta densidade de extrassístoles (>10% do total)',
      'Fenômeno de R sobre T característico documentado no traçado ECG',
      'Instabilidade de perfusão associada de caráter sincopal',
      'Histórico forte na família de morte súbita precoce inexplicada'
    ],
    diferenciais: [
      'Extrassístoles supraventriculares com aberrância de condução periférica',
      'Fibrilação atrial de resposta esporádica e intermitente',
      'extrassístoles de foco atrial monomórficas',
      'Artefatos e distorções mecânicas de traçados de Holter'
    ]
  },
  {
    id: 'I47.1',
    nome: 'Taquicardia Supraventricular (TSV)',
    sintomas: [
      'Palpitações de ritmo regular e início extremamente súbito',
      'Sensação marcante de latejar ritmado em pescoço vago (Sinal de sapo)',
      'Tontura discreta transitória sem escurecimento de vista',
      'Dispneia e cansaço transientes',
      'Poliúria ou eliminação abundante de urina clara pós-crise'
    ],
    fatores_risco: [
      'Idosos de ambos os sexos e mulheres sem cardiopatias funcionais',
      'Presença de feixe de reentrada nodal acessório congênito',
      'Altas doses de café ou suplementação de cafeína pura',
      'Insônia severa de dias com exaustão mental'
    ],
    red_flags: [
      'Hipotensão profunda documentada com sinais de choque circulatório',
      'Falta de ar com dor inspiratória típica e congestão pulmonar',
      'Angina torácica decorrente de alta FC limitando a perfusão de demanda',
      'síncope imediata de decúbito na transição do ritmo'
    ],
    diferenciais: [
      'Taquicardia atrial monomórfica de foco alto',
      'Flutter atrial de ritmo regular conduzido 2:1',
      'Fibrilação atrial aceleradora',
      'Taquicardia sinusal severa por choque compensatório'
    ]
  },
  {
    id: 'I47.2',
    nome: 'Taquicardia Ventricular Sustentada',
    sintomas: [
      'Palpitações aceleradoras graves em precórdio',
      'Pré-síncope ou perda de equilíbrio corporal aguda',
      'Dispneia obstrutiva que dificulta falar frases curtas',
      'Sentimento opressivo severo em porção central de tórax',
      'Tonturas acentuadas e instabilidade geral'
    ],
    fatores_risco: [
      'Histórico de infarto miocárdio prévio com fibrose cicatricial ativa',
      'Insuficiência cardíaca grave sistólica crônica',
      'Cardiomiopatia hipertrófica obstrutiva grave',
      'Canalopatias conhecidas como QT longo ou Síndrome de Brugada'
    ],
    red_flags: [
      'Duração ininterrupta do episódio superior a 30 segundos',
      'Choque hemodinâmico com hipotensão irresponsiva a volume',
      'Perda de pulso radial palpável em extremidades pediosas',
      'Edema agudo de pulmão imediato que restringe a expansão alveolar'
    ],
    diferenciais: [
      'Taquicardia supraventricular aberrante por bloqueio de ramo prévio',
      'Taquicardia supraventricular por pré-excitação via feixe de Kent'
    ]
  },
  {
    id: 'I44.2',
    nome: 'Bloqueio Atrioventricular de Terceiro Grau (Bloqueio AV Total - BAVT)',
    sintomas: [
      'Bradicardia acentuada persistente (FC < 40 bpm) fixa',
      'Tontura constante ao se levantar ou desequilíbrio corporal',
      'frieza e cansaço excessivo aos mínimos movimentos e fala',
      'Dispneia progressiva aos menores esforços de dias',
      'Surtos súbitos de desmaio caracterizando Crises de Adams-Stokes'
    ],
    fatores_risco: [
      'calcificação degenerativa crônica em idosos (Moléstia de Lenègre)',
      'Infarto do miocárdio de parede inferior envolvendo artéria de nó AV',
      'Uso cumulativo de doses excessivas de medicação nodal (Bloqueador AV)',
      'Acometimento de condução por doença de Chagas crônica invasiva'
    ],
    red_flags: [
      'Ocorrência documentada de pausas com assistolia maiores de 3s',
      'Instabilidade circulatória severa com sinais clínicos de choque sistêmico',
      'Edema de pulmão agudo consequente à falha de bomba bradicárdica',
      'Quedas traumáticas frequentes com perda do tônus muscular'
    ],
    diferenciais: [
      'Bloqueio AV de segundo grau Mobitz II avançado',
      'Dissociação sincrónica atrioventricular isquêmica benígna',
      'Bradicardia sinusal patológica refratária extrema'
    ]
  },
  {
    id: 'I44.7',
    nome: 'Bloqueio de Ramo Esquerdo (BRE)',
    sintomas: [
      'Geralmente totalmente assintomático em repouso no BRE isolado',
      'Pode causar fadiga ou cansaço fácil aos esforços se associado a miocardiopatia',
      'Palpitações discretas esporádicas'
    ],
    fatores_risco: [
      'Hipertensão arterial sistêmica crônica de longo curso',
      'Cardiopatia isquêmica ou infarto prévio',
      'Cardiomiopatia dilatada funcional',
      'Idade senil com esclerose degenerativa das vias de condução'
    ],
    red_flags: [
      'BRE de surgimento novo na presença de dor torácica típica (equivalente a IAM com supra de ST)',
      'Disfunção sistólica esquerda acentuada documentada',
      'Associação com síncope de esforço ou tonturas severas'
    ],
    diferenciais: [
      'Eletroestimulação por marcapasso de ventrículo direito',
      'Síndrome de pré-excitação de Wolff-Parkinson-White',
      'Bloqueio intraventricular inespecífico'
    ]
  },
  {
    id: 'I45.1',
    nome: 'Bloqueio de Ramo Direito (BRD)',
    sintomas: [
      'Totalmente assintomático na grande maioria das vezes',
      'Frequentemente detectado como achado casual em ECG de rotina'
    ],
    fatores_risco: [
      'Prática regular e prolongada de esportes de alta endurance (fisiológico)',
      'Cardiopatia chagásica crônica ativa',
      'Doença pulmonar obstrutiva crônica (DPOC) com sobrecarga de VD',
      'Comunicação interatrial (CIA) volumosa congênita'
    ],
    red_flags: [
      'Associação com hemibloqueio anterior esquerdo (HAE) e sintomas de tontura (risco de BAVT)',
      'BRD agudo associado à dispneia e dor torácica súbita (sugere TEP)'
    ],
    diferenciais: [
      'Bloqueio incompleto de ramo direito fisiológico',
      'Síndrome de Brugada (padrão típico em V1-V2)'
    ]
  },
  {
    id: 'R00.1',
    nome: 'Bradicardia Sinusal Fisiológica ou Patológica',
    sintomas: [
      'Frequência cardíaca abaixo de 50 batimentos por minuto em repouso',
      'Perfeitamente assintomático em atletas e jovens hígidos',
      'Tontura leve com sensação de instabilidade',
      'Astenia física acentuada e intolerância ao esforço se patológico'
    ],
    fatores_risco: [
      'Treino aeróbico de alta performance (corredores, nadadores)',
      'Hipotireoidismo de longa data',
      'Uso diário de betabloqueadores ou amiodarona',
      'Envelhecimento cronológico natural do tecido nodal'
    ],
    red_flags: [
      'Frequência cardíaca de repouso inferior a 35 bpm',
      'Associação com síncope de repouso recorrente de causa desconhecida',
      'Sinais evidentes de hipoperfusão orgânica periférica ou cerebral'
    ],
    diferenciais: [
      'Bloqueio AV de segundo ou terceiro grau (Mobitz I ou II)',
      'Disfunção crônica intrínseca do nó sinusal',
      'Bloqueio sinoatrial agudo'
    ]
  },
  {
    id: 'R00.0',
    nome: 'Taquicardia Sinusal Reativa',
    sintomas: [
      'Frequência cardíaca acima de 100 bpm com ritmo regular e sinusal',
      'Palpitações precoridiais e em região de pescoço',
      'Ansiedade reativa concomitante',
      'Dispneia leve de esforço',
      'Tremores finos de extremidades distais'
    ],
    fatores_risco: [
      'Processos febris sistêmicos ativos (elevação de 10-15 bpm por °C de febre)',
      'Hipovolemia por desidratação crônica ou sangramento oculto',
      'Consumo exagerado de cafeína, nicotina ou aminofilina',
      'Anemia severa com hemoglobina baixa',
      'Hipertireoidismo primário em atividade tireotóxica'
    ],
    red_flags: [
      'Hipotensão arterial séria secundária à taquicardia constante',
      'Isquemia coronariana de demanda acentuada no paciente idoso'
    ],
    diferenciais: [
      'Taquicardia atrial monomórfica de foco alto',
      'Fibrilação atrial de resposta intermediária regularizada',
      'Taquicardia supraventricular por reentrada nodal'
    ]
  },
  {
    id: 'I71.2',
    nome: 'Aneurisma da Aorta Torácica',
    sintomas: [
      'Totalmente assintomático na maioria com evolução lenta em anos',
      'Dor torácica ou dorsal surda, profunda e persistente',
      'Disfagia por compressão mecânica de via esofágica',
      'Rouquidão progressiva (compressão de laríngeo recorrente)',
      'Tosse seca unilateral irritativa persistente'
    ],
    fatores_risco: [
      'Aterosclerose avançada sistêmica de artérias centrais',
      'Tabagismo ativo ou carga tabágica pregressa importante',
      'Hipertensão Arterial de longa data em descontrole',
      'Colagenoses congênitas de Síndrome de Marfan ou Ehlers-Danlos',
      'Histórico familiar de aneurismas de grandes vasos'
    ],
    red_flags: [
      'Dor torácica ou interescapular súbita e excruciante (sugere rotura)',
      'Diferença importante de pulsos em MMSS ou assimetria pressórica bilateral >20 mmHg',
      'Sopro novo diastólico aórtico exuberante'
    ],
    diferenciais: [
      'Infarto agudo do miocárdio coronariano obstrutivo',
      'Dissecção de aorta ascendente catastrófica',
      'Espasmo esofágico difuso severo',
      'Tromboembolismo pulmonar central maciço'
    ]
  },
  {
    id: 'I71.4',
    nome: 'Aneurisma da Aorta Abdominal (AAA)',
    sintomas: [
      'Grande maioria silenciosa até rotura catastrófica',
      'Sensação permanente de pulsação abdominal ao repousar deitado',
      'Dor lombar ou em flancos constante e moderada'
    ],
    fatores_risco: [
      'Tabagismo prolongado (fator etiológico ambiental prioritário)',
      'Sexo masculino (relação média de 5 para 1)',
      'Idade de instalação acima de 65 anos',
      'Aterosclerose de membros inferiores concomitante',
      'Histórico de ectasia arterial familiar'
    ],
    red_flags: [
      'Massa pulsátil abdominal extremamente dolorosa à palpação média',
      'Dor lombar intensa súbita com síncope ou hipotensão inexplicada (rotura)',
      'Microembolias periféricas gerando dedos azuis dolorosos em MMII'
    ],
    diferenciais: [
      'Cólica nefrética por cálculo renal agudo',
      'Lumbago mecânico agudo ou hérnia discal herniada',
      'Abscesso inflamatório do psoas',
      'Diverticulite aguda intestinal complicada'
    ]
  },
  {
    id: 'Q25.1',
    nome: 'Coarctação da Aorta',
    sintomas: [
      'Cefaleia de repetição resistente a analgésicos comuns',
      'Instabilidade ao deambular ou tonturas ocasionais',
      'Claudicação de membros inferiores ao caminhar curto',
      'Extremidades frias e dolorosas de forma recorrente em MMII',
      'Marcante diferença pressórica MMSS x MMII'
    ],
    fatores_risco: [
      'Cardiopatia congênita com anomalia fetal isolada',
      'Membro do espectro da Síndrome de Turner (35% nestas pacientes)',
      'Valva aórtica bicúspide associada em cerca de 50%'
    ],
    red_flags: [
      'Insuficiência cardíaca grave logo na primeira infância',
      'Hipertensão crônica severa resistente em membros superiores',
      'Cefaleia explosiva com perda de força típica (ruptura de aneurisma)'
    ],
    diferenciais: [
      'Hipertensão arterial essencial primária do jovem',
      'Estenose bilateral de artérias renais com hiper-reninismo',
      'Arterite de Takayasu envolvendo grandes vasos centrais'
    ]
  },
  {
    id: 'Q25.0',
    nome: 'Persistência do Canal Arterial (PCA)',
    sintomas: [
      'Totalmente assintomático na infância se o defeito for diminuto',
      'Dificuldade respiratória ou taquipneia em lactentes durante as mamadas',
      'Sudorese excessiva fétida aos menores esforços corporais',
      'Dificuldade importante de ganho ponderal e infecção pulmonar recorrente'
    ],
    fatores_risco: [
      'Nascimento prematuro extremo (peso <1.500g)',
      'Rubéola congênita materna ocorrida no primeiro trimestre',
      'Nascimento em altitudes geográficas elevadas crônicas'
    ],
    red_flags: [
      'Presença de sopro contínuo áspero em maquinária infraclavicular ("sopro de Gibson")',
      'Surgimento de Síndrome de Eisenmenger com reversão do shunt e cianose em membros inferiores'
    ],
    diferenciais: [
      'Comunicação interventricular ampla de alta pressão',
      'Fístula arteriovenosa pulmonar congênita calitativa',
      'Janela aortopulmonar'
    ]
  },
  {
    id: 'Q21.1',
    nome: 'Comunicação Interatrial (CIA)',
    sintomas: [
      'Assintomático durante décadas de infância e adolescência',
      'Falta de ar progressiva aos esforços comuns na juventude',
      'Palpitações repetitivas por arritmias supraventriculares',
      'Infecções de repetição de vias respiratórias baixas'
    ],
    fatores_risco: [
      'Malformação isolada inexplicada na embriogênese',
      'Histórico de interatrial de base familiar',
      'Trissomia do cromossomo 21 (Síndrome de Down)'
    ],
    red_flags: [
      'Desdobramento fixo e amplo de segunda bulha (B2)',
      'AVC isquêmico do jovem por embolia paradoxal trans-septal',
      'Hipertensão pulmonar grave com reversão de shunt'
    ],
    diferenciais: [
      'Estenose pulmonar congênita leve',
      'Comunicação interventricular restritiva',
      'Prolapso de valva mitral com sopro sistólico'
    ]
  },
  {
    id: 'Q21.0',
    nome: 'Comunicação Interventricular (CIV)',
    sintomas: [
      'Falta de ar ou taquipneia em lactentes durante amamentação',
      'Fadiga extrema ao mamar obrigando a pausas reguladores',
      'Grave atraso de desenvolvimento de peso e percentil',
      'Sopro holossistólico áspero de grande intensidade em borda esternal correspondente'
    ],
    fatores_risco: [
      'Associação íntima com trissomias cromossômicas (Down, Edwards)',
      'Quadro viral agudo gestacional no início do desenvolvimento organogênico',
      'Exposição fetal a álcool ou anticonvulsivantes'
    ],
    red_flags: [
      'Surgimento precoce de hipertensão arterial pulmonar severa irreversível',
      'IC congestiva intratável de repetição com atraso de desenvolvimento físico'
    ],
    diferenciais: [
      'Persistência de canal arterial com fluxo esquerdo-direito',
      'Insuficiência mitral congênita obstrutiva',
      'Estenose subvalvar aórtica membranosa'
    ]
  },
  {
    id: 'Q21.3',
    nome: 'Tetralogia de Fallot',
    sintomas: [
      'Cianose central progressiva visível em mucosas e pontas dos dedos',
      'Crises hipercianóticas repentinas desencadeadas por irritação ou choro',
      'Agachamento intuitivo adotado pela criança para alívio da falta de ar ("Squatting")',
      'Dificuldade severa de ganho de peso corporal',
      'Baqueteamento digital exuberante'
    ],
    fatores_risco: [
      'Microdeleção do cromossomo 22q11 (Síndrome de DiGeorge)',
      'Idade da mãe superior a 40 anos no ciclo gravídico',
      'Diabetes mellitus pré-gestacional materno em descontrole'
    ],
    red_flags: [
      'Crise hipercianótica severa com taquipneia e obnubilação progressiva',
      'Surtos recorrentes de perda de consciência por hipóxia cerebral'
    ],
    diferenciais: [
      'Transposição das grandes artérias isolada ou mista',
      'Conexão anômala total das veias pulmonares correspondentes',
      'Atresia da valva tricúspide com shunt'
    ]
  },
  {
    id: 'I09.9',
    nome: 'Cardiopatia Reumática Crônica',
    sintomas: [
      'Falta de ar progressiva aos esforços cotidianos comuns',
      'Fadiga muscular esquelética desproporcional ao repouso',
      'Falta de ar ao deitarsupina (ortopneia)',
      'Estenoses ou refluxos associados poli-valvares múltiplos'
    ],
    fatores_risco: [
      'Faringoamigdalite bacteriana estreptocócica sem antibioticoterapia adequada',
      'Episódios sequenciais clínicos de Febre Reumática na infância',
      'Ambientes de alta vulnerabilidade social ou aglomerações'
    ],
    red_flags: [
      'Presença de múltiplos sopros graves (dupla lesão mitral + dupla lesão aórtica)',
      'Fibrilação atrial persistente em átrio esquerdo maciçamente dilatado',
      'Descompensações de IC classe funcional IV'
    ],
    diferenciais: [
      'Doença valvar senil degenerativa calcificada idiopática',
      'Doença cardíaca congênita de etiologia multifatorial',
      'Comprometimento fibrosante secundário a endocardite infecciosa curada'
    ]
  },
  {
    id: 'I27.9',
    nome: 'Cor Pulmonale Crônico',
    sintomas: [
      'Dispneia crônica progressiva e persistente limitando a marcha curta',
      'Tosse seca ou produtiva de longa data matinal',
      'Turgência visível de veias jugulares bilaterais ao sentar',
      'Inchaço ou edema elástico indolor de membros inferiores de longa data',
      'Cianose crônica de extremidades ou bochechas'
    ],
    fatores_risco: [
      'Doença Pulmonar Obstrutiva Crônica (DPOC) por tabagismo pesado',
      'Fibrose pulmonar idiopática avançada restritiva',
      'Tromboembolismo pulmonar de repetição crônico periférico',
      'Cifoescoliose severa com hipoventilação alveolar correspondente'
    ],
    red_flags: [
      'Asfixia de repouso severa necessitando de oxigenoterapia intermitente ou contínua',
      'Ascite de grande volume dolorosa associada a hepatomegalia de estase',
      'Paroxismos de Taquicardia Atrial Multifocal secundária'
    ],
    diferenciais: [
      'Insuficiência cardíaca sistólica ou diastólica esquerda biventricular',
      'Tromboembolismo pulmonar central agudo e obstrutivo',
      'Pericardite constritiva pericárdica com hiperpressão venosa'
    ]
  },
  {
    id: 'I34.1',
    nome: 'Prolapso de Válvula Mitral',
    sintomas: [
      'Maioria assintomática durante toda a vida produtiva',
      'Dor torácica atípica pontual, aguda e intermitente em precórdio',
      'Palpitações esporádicas incômodas sob situações de estresse',
      'Ansiedade, fadiga física crônica inexplicada e episódios de tontura'
    ],
    fatores_risco: [
      'Predisposição genética autossômica dominante familiar',
      'Concomitância de doenças do colágeno (Marfan, osteogênese imperfeita)',
      'Gênero feminino magro com hábito astênico alongado'
    ],
    red_flags: [
      'Sopro holossistólico regurgitativo de nova instalação indicando ruptura de cordoalha',
      'Fibrilação atrial paroxística ou crônica com elevado risco de embolismo',
      'Achado de extrassístoles ventriculares pareadas complexas frequentes'
    ],
    diferenciais: [
      'Coronariopatia obstrutiva isquêmica (Angina estável)',
      'Transtorno de ansiedade generalizada com manifestações somáticas',
      'Distonia autonômica cardiovascular isolada'
    ]
  },
  {
    id: 'Q23.1',
    nome: 'Válvula Aórtica Bicúspide',
    sintomas: [
      'Silencioso por décadas até a transição estrutural da valva',
      'Quadro marcante de estenose ou insuficiência aórtica no jovem adulto',
      'Sopro de ejeção sistólico áspero audível em foco correspondente'
    ],
    fatores_risco: [
      'Malformação congênita isolada mais comum do aparelho valvular',
      'Sexo masculino (aproximadamente 3 para 1)',
      'Associação com coarctação de aorta ou dilatação de aorta ascendente'
    ],
    red_flags: [
      'Estenose aórtica severa sintomática com síncope induzida por esforço',
      'Aneurisma de aorta ascendente com diâmetro progressivo >50mm'
    ],
    diferenciais: [
      'Estenose aórtica senil calcificada tricúspide degenerativa',
      'Cardiopatia reumática cicatricial com acometimento valvar'
    ]
  },
  {
    id: 'I97.0',
    nome: 'Síndrome Pós-Pericardiotomia',
    sintomas: [
      'Febre moderada contínua surgindo semanas pós- esternotomia',
      'Dor torácica inspiratória que se agrava sobremaneira ao tossir',
      'Atrito pericárdico proeminente detectável em ausculta',
      'Mialgia geral difusa acompanhada de indisposição e fadiga'
    ],
    fatores_risco: [
      'Pós-operatório tardio de revascularização ou troca valvar aberta',
      'Resposta inflamatória sistêmica dirigida contra antígenos do pericárdio lesado',
      'Ausência do uso preventivo padrão de colchicina pós-operatória'
    ],
    red_flags: [
      'Ecocardiograma demonstrando derrame pericárdico volumoso compressivo',
      'Instalação súbita de Tríade de Beck indicando tamponamento tardio',
      'Insuficiência de trocas gasosas por derrame pleural volumoso'
    ],
    diferenciais: [
      'Mediastinite pós-operatória profunda de ferida esternal',
      'Tromboembolismo pulmonar no período pós-operatório cirúrgico',
      'Pneumonia nosocomial adquirida'
    ]
  },
  {
    id: 'I49.5',
    nome: 'Síndrome do Nó Sinusal Doente (Sindrome Bradi-Taqui)',
    sintomas: [
      'Tonturas persistentes e episódios frequentes de quase desmaio',
      'Síncope na vigência de pausas ou paradas sinusais transientes',
      'Palpitações rápidas que cessam abruptamente e dão lugar a bradicardia grave',
      'Fadiga física e cansaço fácil aos menores movimentos cotidianos'
    ],
    fatores_risco: [
      'Idade senil com degeneração fibrosclerótica do marcapasso sinusal natural',
      'Cardiopatia isquêmica crônica por oclusão de artéria coronária direita',
      'Doenças infiltrativas miocárdicas (amiloidose, sarcoidose)'
    ],
    red_flags: [
      'Pausas sinusais severas registradas em Holter superiores a 3 segundos',
      'Bradicardia profunda sintomática que restringe tratamento de arritmias associadas'
    ],
    diferenciais: [
      'Síncope vasovagal reflexa neuromediada comum',
      'Bloqueio AV de segundo grau Mobitz I com pausas transitórias',
      'Intoxicação farmacológica por digital ou bloqueador de canal de canais'
    ]
  },
  {
    id: 'I45.6',
    nome: 'Síndrome de Wolff-Parkinson-White (Pre-excitação Atrioventricular)',
    sintomas: [
      'Palpitações de ritmo rápido, regular e início súbito',
      'Tonturas intensas contemporâneas à palpitação',
      'Sensação de falta de ar e ansiedade extrema duradoura',
      'Dor torácica leve tipo pontada, acompanhada de cansaço extremo',
      'Intervalo PR curto com onda delta característica em ECG de repouso'
    ],
    fatores_risco: [
      'Anomalia congênita por preservação de via acessória (feixe de Kent)',
      'Histórico na família de primeiro grau com vias acessórias de pré-excitação',
      'Ligeira predominância no sexo masculino'
    ],
    red_flags: [
      'Fibrilação atrial conduzida com altíssima frequência por via acessória (alto risco de FV)',
      'Síncope abrupta do jovem relacionada à palpitação de início abrupto'
    ],
    diferenciais: [
      'Taquicardia supraventricular por TRN sem pré-excitação',
      'Bloqueio de ramo esquerdo preexistente funcional ou fixo',
      'Taquicardia ventricular idiopática do jovem'
    ]
  },
  {
    id: 'I42.8',
    nome: 'Cardiomiopatia de Takotsubo (Síndrome do Coração Partido)',
    sintomas: [
      'Dor torácica retroesternal opressiva súbita indistinguível de um IAM',
      'Falta de ar aguda e agitação psicomotora',
      'Sudorese fria em fronte acompanhada de náuseas e vômitos',
      'Palpitações arrítmicas rápidas e persistentes'
    ],
    fatores_risco: [
      'Estressor emocional ou físico agudo devastador (luto, susto, cirurgia de grande porte)',
      'Mulheres idosas em fase de pós-menopausa tardia (mais de 90% dos casos)',
      'História de transtornos psiquiátricos crônicos ou distúrbios neurológicos'
    ],
    red_flags: [
      'Balonamento apical característico do ventrículo esquerdo em ecocardiograma ou cinefisiologia',
      'Sinais inequívocos de choque cardiogênico refratário',
      'Edema agudo de pulmão precoce com esforço respiratório severo'
    ],
    diferenciais: [
      'Infarto agudo do miocárdio coronariano aterotrombótico clássico',
      'Miocardite aguda severa viral ou imunomediada',
      'Espasmo coronariano primário (Angina vasoespástica de Prinzmetal)'
    ]
  },
  {
    id: 'I31.4',
    nome: 'Tamponamento Cardíaco',
    sintomas: [
      'Falta de ar progressiva e extrema com sensação de sufocamento (asfixia)',
      'Taquicardia acelerada compensatória',
      'Hipotensão arterial marcante persistente com extremidades frias',
      'Dor torácica surda opressiva constante central',
      'Turgência proeminente de veias jugulares ao sentar'
    ],
    fatores_risco: [
      'Pericardite aguda em evolução complicadora',
      'Neoplasia torácica metastática infiltrando tecido pericárdico',
      'Histórico recente de trauma torácico contuso ou penetrante',
      'Pós-operatório de cirurgia de via aberta intracardíaca recente'
    ],
    red_flags: [
      'Tríade de Beck (hipotensão profunda + veias jugulares turgidas + abafamento importante de bulhas)',
      'Pulso paradoxal mensurável (queda de PAS superior a 10 mmHg na inspiração)',
      'Alternância de amplitude das ondas elétricas (alternância elétrica) no ECG'
    ],
    diferenciais: [
      'Tromboembolismo pulmonar obstrutivo maciço com choque de VD',
      'Infarto agudo de ventrículo direito com colapso hemodinâmico',
      'Choque séptico ou anafilático grave e refratário',
      'Pneumotórax hipertensivo compressivo compressão do átrio'
    ]
  }
];

