import { MedicalDisease } from '../types';

export const PSYCHIATRY_DISEASES: Omit<MedicalDisease, 'achados_exames' | 'criterios_diagnosticos'>[] = [
  {
    id: 'F32.9',
    nome: 'Transtorno Depressivo Maior, Episódio Único',
    sintomas: [
      'Humor deprimido ou tristeza persistente na maior parte do dia',
      'Anedonia ou perda marcante do interesse e prazer nas atividades cotidianas',
      'Fadiga acentuada ou perda de energia quase todos os dias',
      'Alterações marcantes do apetite ou peso (perda ou ganho sem dieta)',
      'Insônia de conciliação, manutenção ou hipersonia diária',
      'Agitação ou retardo psicomotor observável',
      'Sentimentos de inutilidade, autodesprezo ou culpa excessiva',
      'Dificuldade de concentração, tomada de decisão ou lentificação do pensamento',
      'Ideação suicida recorrente com ou sem planejamento estruturado'
    ],
    fatores_risco: [
      'Histórico familiar de depressão ou transtornos do humor',
      'Eventos estressores vitais significativos (perdas, divórcio, luto)',
      'Histórico de traumas na infância ou abuso físico/emocional',
      'Doenças crônicas limitantes ou dor crônica refratária',
      'Abuso de substâncias psicoativas (álcool, nicotina, ilícitas)',
      'Traços de personalidade com alto grau de neuroticismo'
    ],
    red_flags: [
      'Ideação suicida ativa com plano estruturado ou tentativa prévia recente',
      'Retardo psicomotor gravíssimo ou estupor depressivo (recusa alimentar/hídrica)',
      'Sintomas psicóticos congruentes ou incongruentes com o humor (delírios de ruína)',
      'Agitação psicomotora intensa com risco autoagressivo imediato',
      'Negligência grave com cuidados pessoais e de saúde básicos'
    ],
    diferenciais: [
      'Hipotireoidismo primário clínico ou subclínico',
      'Transtorno de Humor Induzido por Substâncias',
      'Transtorno Afetivo Bipolar (Episódio Depressivo atual)',
      'Luto normal ou reação de ajustamento'
    ]
  },
  {
    id: 'F33.9',
    nome: 'Transtorno Depressivo Recorrente',
    sintomas: [
      'Episódios depressivos maiores repetitivos e intermitentes',
      'Períodos de humor normal (eutimia) entre os episódios',
      'Piora progressiva do funcionamento social e ocupacional a cada episódio',
      'Sensação de desesperança crônica quanto ao futuro',
      'Ansiedade comórbida frequente',
      'Sintomatologia somática associada (dores crônicas sem base física)',
      'Prejuízos significativos na memória de trabalho e atenção integrada'
    ],
    fatores_risco: [
      'Início precoce do primeiro episódio depressivo (adolescência)',
      'Falta de suporte social adequado ou isolamento crônico',
      'Episódios prévios recorrentes e tratados de forma incompleta',
      'Comorbidades psiquiátricas ativas (ansiedade, transtornos de personalidade)'
    ],
    red_flags: [
      'Aumento súbito da desesperança ou ideação suicida ativa',
      'Histórico de tentativas de autoextermínio violentas no passado',
      'Isolamento social extremo com quebra de redes de apoio'
    ],
    diferenciais: [
      'Distimia ou Transtorno Depressivo Persistente',
      'Transtorno Afetivo Bipolar II com episódios depressivos frequentes',
      'Demência de início precoce (pseudodemência depressiva)'
    ]
  },
  {
    id: 'F41.1',
    nome: 'Transtorno de Ansiedade Generalizada (TAG)',
    sintomas: [
      'Ansiedade e preocupação excessivas e de difícil controle na maioria dos dias',
      'Inquietação física, sensação de nervosismo ou tensão mental',
      'Fadiga muscular decorrente de hipertensionamento',
      'Dificuldade de concentração ou sensação de "branco" na mente',
      'Irritabilidade exacerbada com pequenas contrariedades',
      'Tensão muscular crônica (especialmente cervical e interescapular)',
      'Perturbação marcante do sono (dificuldade para adormecer ou sono inquietante)',
      'Sintomas autonômicos (palpitações, sudorese, epigastralgia, náuseas)'
    ],
    fatores_risco: [
      'Temperamento evitativo ou excessivamente cauteloso na infância',
      'Estressores socioeconômicos ou pressões ocupacionais crônicas',
      'Histórico familiar positivo para transtornos de ansiedade',
      'Abuso crônico de estimulantes (cafeína, nicotina)'
    ],
    red_flags: [
      'Ataques de pânico graves sobrepostos debilitantes',
      'Ideação suicidária devido ao sofrimento mental intolerável',
      'Abuso impulsivo de benzodiazepínicos ou álcool para automedicação'
    ],
    diferenciais: [
      'Hipertireoidismo (tireotoxicoses)',
      'Feocromocitoma',
      'Arritmias cardíacas (ex: taquicardia supraventricular)',
      'Abuso de cafeína ou abstinência de depressores (benzodiazepínicos/álcool)'
    ]
  },
  {
    id: 'F41.0',
    nome: 'Transtorno de Pânico',
    sintomas: [
      'Ataques de pânico agudos de início súbito acompanhados de pavor extremo',
      'Palpitação intensa, taquicardia forte ou batimento cardíaco descompassado',
      'Sudorese fria profusa generalizada',
      'Tremores de extremidades ou sacudidelas musculares',
      'Sensação de falta de ar, dispneia ou sufocação iminente',
      'Sensação de asfixia ou aperto doloroso na garganta',
      'Dor, desconforto ou opressão no peito simulando infarto',
      'Parestesias ou formigamentos periféricos ou periorais',
      'Medo intenso de enlouquecer, perder o controle ou morrer'
    ],
    fatores_risco: [
      'Hipersensibilidade central ao dióxido de carbono',
      'Histórico recente de perdas interpessoais ou luto traumático',
      'Abuso de substâncias estimulantes ou maconha',
      'Transtornos de ansiedade na infância'
    ],
    red_flags: [
      'Abuso agudo de substâncias como mecanismo de escape instantâneo',
      'Ideação suicida secundária à agorafobia e isolamento doméstico total',
      'Automedicação abusiva com álcool ou sedativos'
    ],
    diferenciais: [
      'Infarto Agudo do Miocárdio (coronariografia normal)',
      'Tromboembolismo Pulmonar',
      'Prolapso de Válvula Mitral com extrassístoles',
      'Hipoglicemia ou insulinoma'
    ]
  },
  {
    id: 'F31.9',
    nome: 'Transtorno Afetivo Bipolar',
    sintomas: [
      'Flutuações cíclicas extremas entre mania, hipomania e episódios depressivos',
      'Episódio Maníaco: autoestima inflada, grandiosidade ou delírios de poder',
      'Redução drástica da necessidade de sono sem sensação de cansaço subsequente',
      'Logorreia ou pressão para falar continuamente',
      'Fuga de ideias ou pensamento em ritmo acelerado e caótico',
      'Distratibilidade extrema relatada pelo paciente ou observada',
      'Aumento da atividade dirigida a objetivos sociais, sexuais ou de trabalho',
      'Envolvimento excessivo em atividades de alto risco e consequências dolorosas',
      'Desinibição social excessiva e compras compulsivas'
    ],
    fatores_risco: [
      'Herdabilidade genética extremamente alta (parentes de 1º grau)',
      'Idade jovem no início dos sintomas (final da adolescência)',
      'Uso precoce de antidepressivos em pacientes predispostos (virada maníaca)',
      'Abuso concomitante de substâncias estimulantes'
    ],
    red_flags: [
      'Disforia maníaca com agitação intensa, hostilidade ou heteroagressividade',
      'Sintomas psicóticos proeminentes (delírios de grandeza ou persecutórios)',
      'Julgamento ético-crítico severamente prejudicado com alto risco pessoal',
      'Depressão bipolar mista com alta impulsividade sexual/financeira/suicida'
    ],
    diferenciais: [
      'Transtorno de Personalidade Borderline (oscilação ultra-rápida de humor)',
      'Uso de drogas adrenérgicas (cocaína, anfetaminas)',
      'Transtorno do Déficit de Atenção e Hiperatividade (TDAH)',
      'Esquizofrenia ou Transtorno Esquizoafetivo'
    ]
  },
  {
    id: 'F20.9',
    nome: 'Esquizofrenia',
    sintomas: [
      'Delírios bizarros de controle, perseguição ou inserção de pensamento',
      'Alucinações auditivas verbal-motoras comentadoras ou imperativas',
      'Desorganização marcante do pensamento com fala incompreensível (afrouxamento de nexos)',
      'Comportamento visivelmente desorganizado, inadequado ou bizarro',
      'Comportamento catatônico (estupor, flexibilidade cerácea ou agitação catatônica)',
      'Sintomas Negativos: embotamento afetivo acentuado, apatia extrema, isolamento social',
      'Alogia ou pobreza de conteúdo na fala espontânea',
      'Anedonia social acentuada e negligência higiênica progressiva'
    ],
    fatores_risco: [
      'Histórico familiar de primeiro grau positivo para esquizofrenia',
      'Complicações obstétricas e estresse pré-natal (infecções maternas flu)',
      'Uso pesado de cannabis na infância ou adolescência',
      'Crescimento em ambiente urbano denso / migrações difíceis'
    ],
    red_flags: [
      'Alucinações auditivas de comando imperativo ordenando autolesão/heterolesão',
      'Agitação catatônica grave ou estupor catatônico prolongado',
      'Sintomas depressivos intensos sobrepostos com altíssimo risco de suicídio',
      'Desnutrição importante por delírios paranoicos de envenenamento'
    ],
    diferenciais: [
      'Transtorno Psicótico Induzido por Substâncias (anfetaminas, PCP, cocaína)',
      'Demência com surto psicótico tardio',
      'Encefalite viral ou autoimune (ex: anti-NMDA)',
      'Transtorno Bipolar com características psicóticas incongruentes'
    ]
  },
  {
    id: 'F42.9',
    nome: 'Transtorno Obsessivo-Compulsivo (TOC)',
    sintomas: [
      'Obsessões recorrentes: pensamentos, impulsos ou imagens intrusivos e indesejados',
      'Tentativas constantes de ignorar, suprimir ou neutralizar as obsessões',
      'Compulsões: comportamentos repetitivos (lavar mãos, checar fechaduras) ou atos mentais',
      'Manifestações orientadas por regras rígidas que devem ser seguidas estritamente',
      'Compulsões destinadas a reduzir a ansiedade ou evitar uma catástrofe imaginada',
      'Desprendimento de tempo significativo (> 1 hora por dia dedicada às compulsões)',
      'Prejuízo ocupacional, acadêmico ou social devido ao ritualismo persistente'
    ],
    fatores_risco: [
      'Traços de personalidade perfeccionista e inibição comportamental precoce',
      'Estressores agudos na infância, histórico de abuso ou privação',
      'Histórico de infecções estreptocócicas recorrentes na infância (PANDAS)',
      'Herdabilidade familiar moderada a alta'
    ],
    red_flags: [
      'Lesões dermatológicas graves (fissuras, sangramentos) por lavagem compulsiva',
      'Comprometimento nutricional severo por rituais de contaminação e alimentação',
      'Ideação de automutilação ou desespero decorrente de obsessões blasfêmias ou violentas'
    ],
    diferenciais: [
      'Transtorno de Personalidade Obsessivo-Compulsiva (OCPD) que é egossintônico',
      'Fobia Social ou Transtorno Disfórico Corporal',
      'Tiques complexos ou Transtorno de Tourette',
      'Transtornos psicóticos com delírios de controle'
    ]
  },
  {
    id: 'F43.1',
    nome: 'Transtorno de Estresse Pós-Traumático (TEPT)',
    sintomas: [
      'Reexperiência intrusiva do trauma (flashbacks, pesadelos recorrentes)',
      'Evitação de estímulos associados ao evento traumático (lugares, pessoas)',
      'Hiperativação autonômica (sobressalto, insônia de alerta, vigília extrema)',
      'Alterações negativas cognitivas (incapacidade de lembrar do cerne do trauma)',
      'Crenças exacerbadamente negativas sobre si mesmo ou o mundo',
      'Estado emocional negativo persistente (culpa, vergonha ou medo irracional)',
      'Desapego e isolamento social de atividades outrora valorizadas',
      'Manifestações de desrealização ou despersonalização transitórias'
    ],
    fatores_risco: [
      'Exposição direta a combate militar, agressão sexual ou violência urbana',
      'Gravidade e proximidade física com a ameaça real de morte do evento anterior',
      'Presença de vulnerabilidades psiquiátricas prévias ou fragilidade biológica',
      'Falta de rede de apoio comunitário pós-trauma iminente'
    ],
    red_flags: [
      'Abuso abrupto de sedativos ou álcool para suprimir pensamentos intrusivos',
      'Ideação suicida ativa por desesperança severa e anedonia crônica',
      'Ataques súbitos de pânico com desrealização extrema e desintegração'
    ],
    diferenciais: [
      'Reação Aguda ao Estresse (sintomas < 30 dias de evolução)',
      'Transtorno de Ajustamento / Reação de Adaptação',
      'Simulação para fins periciais ou compensações cíveis/trabalhistas'
    ]
  },
  {
    id: 'F60.3',
    nome: 'Transtorno de Personalidade Borderline',
    sintomas: [
      'Esforços desesperados para evitar o abandono real ou puramente fictício',
      'Padrão de relacionamentos instáveis e intensos (clivagem: idealização/desvalorização)',
      'Perturbação acentuada da identidade e autoimagem flutuante instável',
      'Impulsividade nociva em pelo menos duas áreas (gastos, sexo, drogas, direção)',
      'Comportamento suicidário recorrente, gestos ou ameaças de automutilação',
      'Instabilidade afetiva pronunciada devido à reatividade acentuada do humor',
      'Sentimentos crônicos de vazio interno existencial e solidão extrema',
      'Raiva intensa, inadequada e de difícil controle episódico',
      'Ideação paranoide transitória ou sintomas dissociativos sob estresse extremo'
    ],
    fatores_risco: [
      'Histórico de abuso físico, sexual ou negligência severa na infância',
      'Invalidação emocional familiar frequente ou ambiente familiar caótico',
      'Disregulação congênita do sistema serotonérgico e do eixo HPA',
      'Abandono precoce por cuidadores ou morte dos pais'
    ],
    red_flags: [
      'Aumentos repentinos de automutilação (cortes repetidos, queimaduras)',
      'Tentativas impulsivas de autoextermínio de letalidade progressivamente perigosa',
      'Surto psicótico breve reativo ou despersonalização reentrante no pronto-socorro',
      'Conduta heteroagressiva explosiva sob ameaça de rejeição amorosa'
    ],
    diferenciais: [
      'Transtorno Bipolar Tipo II (oscilações humor biológicas, e não reativas)',
      'Transtorno de Estresse Pós-Traumático Complexo (TEPT-C)',
      'Transtorno de Personalidade Histriônica'
    ]
  },
  {
    id: 'F90.0',
    nome: 'Transtorno de Déficit de Atenção e Hiperatividade (TDAH)',
    sintomas: [
      'Desatenção crônica: falha em prestar atenção a detalhes, erros por descuido',
      'Dificuldade expressiva em manter o foco em tarefas longas ou monótonas',
      'Parece não escutar quando se fala diretamente com o indivíduo (sonhar acordado)',
      'Dificuldade acentuada na organização de tarefas domésticas, rotinas ou prazos',
      'Evitação de tarefas que exijam esforço mental intelectual contínuo',
      'Hiperatividade física: remexer pés e mãos, incapacidade de ficar sentado',
      'Inquietude interna persistente descrita em adolescentes ou adultos',
      'Impulsividade acentuada: fala sem pensar, interrompe conversas constantemente'
    ],
    fatores_risco: [
      'Herdabilidade elevada (> 75%) evidenciada por estudos com gêmeos',
      'Exposição fetal a tabaco, álcool ou drogas estimulantes',
      'Nascimento prematuro ou baixo peso extremo ao nascer',
      'Exposição na infância a metais pesados (p. ex., chumbo)'
    ],
    red_flags: [
      'Comorbidade grave com Transtorno de Conduta ou de Oposição na infância',
      'Uso precoce e impulsivo de substâncias psicoativas ilícitas estimulantes',
      'Acidentes automobilísticos frequentes e graves decorrentes de distração extrema'
    ],
    diferenciais: [
      'Episódio Depressivo Infantil (causando falta de concentração secundária)',
      'Transtorno de Ansiedade de Separação de base afetiva',
      'Transtorno do Espectro Autista com hiperfoco segmentar'
    ]
  },
  {
    id: 'F10.3',
    nome: 'Transtorno por Uso de Álcool - Estado de Abstinência',
    sintomas: [
      'Tremor fino ou grosseiro de mãos e língua após horas de cessação do álcool',
      'Sudorese profusa e calafrios matinais',
      'Taquicardia pronunciada (> 100 bpm) e elevação nítida da pressão arterial',
      'Insônia severa com pesadelos vívidos fragmentados',
      'Náuseas inexplicadas acompanhadas de emese gástrica incoercível',
      'Ansiedade severa e agitação psicomotora discreta a moderada',
      'Ilusões ou alucinações visuais transitórias (zoopsias: visão de pequenos insetos)',
      'Crises convulsivas generalizadas tônico-clônicas (crises de abstinência)'
    ],
    fatores_risco: [
      'Consumo crônico e pesado de álcool em bases diárias por anos',
      'Histórico de abstinências anteriores complicadas por delirium tremens',
      'Idade avançada, desnutrição grave ou comorbidades clínicas renais/hepáticas',
      'Surgimento após interrupções repentinas por internações cirúrgicas/médicas'
    ],
    red_flags: [
      'Instalação de Delirium Tremens (obnubilação, desorientação, hiperatividade)',
      'Status epilepticus ou crises convulsivas repetitivas sem recuperação rápida',
      'Instabilidade hemodinâmica grave (hipertermia, flutuação pressórica severa)',
      'Sinais clínicos de encefalopatia de Wernicke (ataxia, confusão mental, oftalmoplegia)'
    ],
    diferenciais: [
      'Abstinência de benzodiazepínicos (sintomatologia quase idêntica)',
      'Sepse de foco indeterminado com agitação associada',
      'Hemorragia Intracraniana (ex: hematoma subdural secundário a quedas)'
    ]
  },
  {
    id: 'F10.0',
    nome: 'Transtorno por Uso de Álcool - Intoxicação Aguda',
    sintomas: [
      'Marcha atáxica vacilante com evidente desequilíbrio e incoordenação motora',
      'Fala arrastada e de difícil articulação fonética (disartria temporária)',
      'Nistagmo horizontal nas provas de motilidade ocular extrínseca',
      'Desibinição comportamental com perda marcante da autocrítica e bom senso',
      'Labilidade emocional com crises de riso ou choro imotivados',
      'Rugor facial inexplicado acompanhado de hálito característico',
      'Diminuição dos reflexos protetores de vias aéreas superiores',
      'Lentificação do tempo de reação a estímulos externos'
    ],
    fatores_risco: [
      'Consumo rápido de grandes volumes de etanol (binge drinking)',
      'Indivíduos tolerantes com alta propensão a beber quantidades colossais',
      'Associação prejudicial com medicamentos sedativos ou calmantes'
    ],
    red_flags: [
      'Coma alcoólico com depressão respiratória importante',
      'Aspiração broncopulmonar de conteúdo gástrico por abolição de reflexo',
      'Hipotermia grave e flacidez muscular generalizada',
      'Trauma cranioencefálico oculto associado em vias públicas'
    ],
    diferenciais: [
      'Acidente Vascular Cerebral Agudo com ataxia cefálica',
      'Hipoglicemia severa em pacientes diabéticos usuários crônicos',
      'Traumatismo craniano com hematoma expansivo'
    ]
  },
  {
    id: 'F11.0',
    nome: 'Transtorno por Uso de Opioides - Intoxicação Aguda',
    sintomas: [
      'Miose pupilar puntiforme bilateral focal característica',
      'Sonolência acentuada evoluindo para torpor ou coma responsivo',
      'Depressão respiratória grave (< 12 incursões respiratórias por minuto)',
      'Bradicardia acentuada e hipotensão arterial progressiva',
      'Pele fria, pegajosa e cianose periférica em extremidades',
      'Diminuição evidente da motilidade intestinal com constipação imediata',
      'Flacidez muscular generalizada e ausência de reflexos profundos'
    ],
    fatores_risco: [
      'Acesso fácil a opióides potentes (médicos, enfermeiros, pacientes crônicos)',
      'Uso de drogas injetáveis ilícitas (heroína ou derivados)',
      'Retomada de uso após períodos de abstinência (perda temporária de tolerância)'
    ],
    red_flags: [
      'Parada respiratória iminente por abolição do drive respiratório central',
      'Edema pulmonar agudo não cardiogênico induzido por heroína',
      'Coma profundo não responsivo a estímulo doloroso'
    ],
    diferenciais: [
      'Intoxicação por clonidina ou fenotiazinas (também apresentam miose)',
      'Hemorragia ou infarto pontino cerebral',
      'Demais comas metabólicos agudos'
    ]
  },
  {
    id: 'F12.2',
    nome: 'Transtorno por Uso de Cannabis - Dependência',
    sintomas: [
      'Desejo incontrolável ou fissura crônica para o consumo de cannabis',
      'Tolerância acentuada com necessidade de doses maiores para obter o efeito',
      'Negligência progressiva com obrigações sociais, trabalhistas ou estudantis',
      'Persistência no uso mesmo diante de prejuízos cognitivos e intelectuais evidentes',
      'Sintomas amotivacionais marcantes: apatia, isolamento social, desinteresse acadêmico',
      'Déficit progressivo de memória de curto prazo e velocidade de processamento cerebral',
      'Sintomatologia depressiva ou episódios de ansiedade induzidos pelo uso reentrante'
    ],
    fatores_risco: [
      'Início do uso pesado de cannabis na infância ou puberdade (antes dos 15 anos)',
      'Predisposição genética para dependências em geral',
      'Uso de maconha de alto teor de THC (skunk, óleos com concentrados)'
    ],
    red_flags: [
      'Sintomas psicóticos floridos induzidos pela cannabis (delírios persecutórios)',
      'Crises de pânico graves com desespero intenso após o consumo recente',
      'Episódios hiperêmicos intratáveis (Síndrome de Hiperêmese Canábica)'
    ],
    diferenciais: [
      'Transtorno Depressivo Maior primário ou isolado',
      'Transtornos psicóticos primários pré-existentes exacerbados'
    ]
  },
  {
    id: 'F14.0',
    nome: 'Transtorno por Uso de Cocaína - Intoxicação Aguda',
    sintomas: [
      'Midríase pupilar bilateral reativa marcante acompanhada de olhar fixo',
      'Hipertensão arterial sistêmica súbita de moderada a grave',
      'Taquicardia acentuada ou arritmias cardíacas palpáveis',
      'Agitação psicomotora intensa e inquietação física irreprimível',
      'Hipertermia inexplicada e sudorese quente profusa',
      'Euforia extrema, grandiosidade, verborreia e exaltação do ego',
      'Alucinações táteis características (percepção de pequenos insetos sob a pele)',
      'Paranoia extrema, sentimentos de perseguição iminente e hostilidade verbal'
    ],
    fatores_risco: [
      'Consumo agudo de cocaína em pó, crack ou pasta base em quantidades vultosas',
      'Consumo de substâncias adulteradas agregando cafeína ou efedrina',
      'Usuários poliusuários concomitantes com bebidas energéticas energizantes'
    ],
    red_flags: [
      'Dor torácica típica sugestiva de infarto agudo do miocárdio por espasmo coronariano',
      'Arritmias ventriculares graves ou tempestades arrítmicas',
      'Acidente vascular cerebral ou crises convulsivas agudas reentrantes',
      'Hipertermia maligna extrema acompanhada de rabdomiólise fulminante',
      'Comportamento paranoico heteroagressivo extremo com risco à integridade alheia'
    ],
    diferenciais: [
      'Insuficiência Cardíaca aguda por coronariopatia clássica',
      'Feocromocitoma produtor de catecolaminas em crise refratária',
      'Crise de Mania disforia clássica no Transtorno Bipolar'
    ]
  },
  {
    id: 'F14.3',
    nome: 'Transtorno por Uso de Cocaína - Estado de Abstinência',
    sintomas: [
      'Fissura incontrolável (craving) intensa por consumo imediato da substância',
      'Fadiga física extrema com sonolência pesada diurna (hipersonia de crash)',
      'Aumento marcante do apetite (hiperfagia metabólica compensatória)',
      'Disforia significativa acompanhada de irritabilidade ou melancolia profunda',
      'Pesadelos desagradáveis intensivos crônicos contínuos',
      'Retardo psicomotor importante ou apatia profunda sem estímulos',
      'Ideação suicidária reativa forte decorrente da falta de dopamina central'
    ],
    fatores_risco: [
      'Uso severo de crack ou cocaína injetável de forma contínua nos dias anteriores',
      'Cessação súbita de binge-drinking e consumo de estimulantes múltiplos'
    ],
    red_flags: [
      'Planejamento suicida de alta letalidade decorrente do crash dopaminérgico',
      'Episódios impulsivos violentos voltados para obtenção da droga a qualquer custo'
    ],
    diferenciais: [
      'Episódio Depressivo Maior agudo primário',
      'Transtorno de Humor Induzido por Outras Substâncias'
    ]
  },
  {
    id: 'F15.0',
    nome: 'Intoxicação por Estimulantes (inclui Anfetaminas/Metanfetamina)',
    sintomas: [
      'Grandiosidade marcada acompanhada de sensação de hiperatividade intelectual',
      'Comportamento repetitivo estereotipado sem uma finalidade clara (punding)',
      'Tensão mandibular pronunciada, bruxismo marcante ou ranger de dentes',
      'Diminuição marcante do limiar de fadiga ou necessidade de sono por mais de 24h',
      'Sudorese intensa accompanied de calafrios',
      'Arritmia cardíaca perceptível ou dor precordial difusa',
      'Retardo miccional involuntário secundário à hiperestimulação simpática'
    ],
    fatores_risco: [
      'Consumo de metanfetamina, MDMA, ecstasy ou psicoestimulantes prescritos abusivos',
      'Uso no contexto recreativo (baladas, festas eletrônicas) ou profissionais estressantes'
    ],
    red_flags: [
      'Surgimento de Síndrome Serotoninérgica com rigidez muscular e mioclonias',
      'Dissecção de aorta precoce induzida por esforço hipertensivo extremo',
      'Colapso cardiovascular progressivo rápido com hipotensão terminal'
    ],
    diferenciais: [
      'Síndrome de Abstinência de Depressores',
      'Surto psicótico agudo paranóide ou bipolaridade clássica'
    ]
  },
  {
    id: 'F19.0',
    nome: 'Intoxicação por Múltiplas Substâncias Psicoativas',
    sintomas: [
      'Quadro imprevisível com sinais mistos de estimulantes e depressores',
      'Oscilações abruptas entre agitação psicomora e sonolência acentuada',
      'Disartria importante combinada com delírios de perseguição de início súbito',
      'Alterações autonômicas bizarras (p. ex., pupilas instáveis ou anisocóricas)',
      'Confusão mental associada a comportamento desorganizado imprevisível',
      'Prejuízo crítico global da capacidade de discernimento básico',
      'Instabilidade flutuante de temperatura corporal'
    ],
    fatores_risco: [
      'Poliabuso impulsivo de drogas em festas ou baladas (combinação intencional)',
      'Tentativa de autoextermínio consumindo medicamentos variados prescritos',
      'Consumo inconsciente de drogas com adulterantes múltiplos pesados sintéticos'
    ],
    red_flags: [
      'Depressão respiratória progressiva sobrepondo convulsões agudas',
      'Choque hemodinâmico de causa mista e difícil reversão metabólica',
      'Surgimento de convulsões agudas de difícil controle medicamentoso'
    ],
    diferenciais: [
      'Encefalopatia metabólica metabólica progressiva de origem clínica',
      'Hematoma intracraniano traumático não detectado'
    ]
  },
  {
    id: 'F05.9',
    nome: 'Delirium',
    sintomas: [
      'Perturbação da consciência de instalação rápida e flutuação nas 24h',
      'Comprometimento marcante da atenção sustentada e memória recente',
      'Dificuldade evidente de orientação espacial ou temporal',
      'Discurso desconexo, incoerente ou francamente disperso',
      'Flutuações de comportamento (Delirium hiperativo versus hipoativo)',
      'Inversão dramática do ciclo de sono-vigília habitual',
      'Labilidade emocional injustificada súbita acompanhada de alucinações visuais'
    ],
    fatores_risco: [
      'Idade muito avançada associada a demência primária de base',
      'Internações prolongadas em Unidades de Terapia Intensiva (UTI)',
      'Infecções bacterianas ou gerais ativas (frequentemente infecção urinária)',
      'Privação súbita de medicamentos habituais ou introdução de drogas anticolinérgicas'
    ],
    red_flags: [
      'Queda acentuada de nível de consciência (torpor/coma com hipoxemia)',
      'Conduta hiperativa explosiva arriscando saídas de leito ou remoção de acessos',
      'Hipotensão progressiva ou sepse mista causando o rebaixamento atual'
    ],
    diferenciais: [
      'Transtorno depressivo maior com pseudodemência idosa',
      'Esquizofrenia tardia ou mania senil'
    ]
  },
  {
    id: 'F45.0',
    nome: 'Transtorno de Somatização',
    sintomas: [
      'Múltiplos sintomas físicos que causam sofrimento e prejuízo ocupacional',
      'Histórico de dores gastrintestinais múltiplas sem substrato etiológico anatômico',
      'Queixas dermatológicas ou ginecológicas frequentes que persistem por anos',
      'Preocuções excessivas desproporcionais com a gravidade dos sintomas somáticos',
      'Nível de ansiedade extremamente elevado quanto à saúde individual',
      'Dispêndio exorbitante de tempo e energia buscando pronto-atendimento',
      'Sintomas sexuais ou neurológicos difusos recorrentes flutuantes'
    ],
    fatores_risco: [
      'Histórico de perdas precoces parentais ou negligências importantes',
      'Traços de personalidade acentuadamente ansiosos ou sensibilidade somestésica',
      'Exposição na infância a familiares cronicamente doentes obsessivos'
    ],
    red_flags: [
      'Iatrogenias repetitivas decorrentes de cirurgias exploratórias desnecessárias',
      'Desespero marcante e ideação suicida reativa à sensação de "desacreditação" médica'
    ],
    diferenciais: [
      'Esclerose Múltipla ou Lúpus Eritematoso Sistêmico em fase precoce',
      'Transtorno de Hipocondria ou fobia à morte com foco infeccioso'
    ]
  },
  {
    id: 'F44.9',
    nome: 'Transtornos Dissociativos / Conversão',
    sintomas: [
      'Pérda súbita ou alteração de funções físicas (motilidade ou sensibilidade)',
      'Paralisias flácidas ou espásticas impossibilitando deambulação funcional',
      'Tremores de extremidades esquisitos que pioram se observados diretamente',
      'Crises pseudoepilépticas conversivas (convulsões com preservação de consciência)',
      'Amortecimento ou perda sensorial em padrão bizarro (não dermatômico como em luva/meia)',
      'Abafo e cegueira psicogênica ou abolição total inexplicada de reflexos vocativos'
    ],
    fatores_risco: [
      'Conflitos emocionais interpessoais graves insolúveis geradores de estresse',
      'Co-ocorrência de Transtorno de Personalidade Histriônica ou Borderline',
      'Vivência recente de estresses intensos de ordem moral ou abuso'
    ],
    red_flags: [
      'Negligência com as funções motoras ou recusa alimentar de conversão',
      'Instalação de contraturas físicas articulares duradouras'
    ],
    diferenciais: [
      'Miastenia Gravis, Esclerose Lateral Amiotrófica (ELA) ou Guillain-Barré',
      'Epilepsia do Lobo Temporal real avaliada por EEGs continuados',
      'Simulação intencional de sintomas'
    ]
  },
  {
    id: 'F50.0',
    nome: 'Anorexia Nervosa',
    sintomas: [
      'Restrição drástica da ingestão calórica com perda ponderal dramática extrema',
      'Medo doentio e obsessivo de engordar mesmo em estado de subnutrição acentuado',
      'Distorção marcante da autoimagem corporal (negar magreza extrema atual)',
      'Comportamentos compensatórios ocultos agressivos (exercícios físicos exaustivos)',
      'Disfunção endócrina perceptível (amenorreia crônica em mulheres)',
      'Uso obsessivo de laxantes, diuréticos ou fórmulas emagrecedoras',
      'Fixação com tabelas calóricas e controle minucioso das porções alimentares'
    ],
    fatores_risco: [
      'Histórico familiar positivo para transtornos alimentares ou obesidade',
      'Traços de personalidade perfeccionistas compulsivos rígidos inflexíveis',
      'Pressão social estética ocupacional (ex: dançarinas, modelos, atletas)',
      'Mães com rigidez de controle alimentar estrito excessivo anterior'
    ],
    red_flags: [
      'Índice de Massa Corporal (IMC) extremamente baixo com desnutrição grave',
      'Sinais eletrocardiográficos perigosos por bradicardia grave e QT prolongado',
      'Distúrbios hidroeletrolíticos drásticos (hipocalemia indução de arritmia)',
      'Hipotensão crônica grave acompanhada de letargia extrema'
    ],
    diferenciais: [
      'Síndrome de má absorção crônica ou Doença Celíaca oculta',
      'Neoplasias ocultas avançadas com caquexia subjacente',
      'Tuberculose pulmonar sistêmica de evolução demorada'
    ]
  },
  {
    id: 'F50.2',
    nome: 'Bulimia Nervosa',
    sintomas: [
      'Episódios recorrentes de compulsão alimentar periódica (binge eating)',
      'Sensação extrema de perda de controle voluntário durante o episódio obsessivo',
      'Vômitos autoinduzidos repetidos após a alimentação (purgação dolorosa)',
      'Sinais físicos: calosidades no dorso das mãos por indução mecânica (Sinal de Russell)',
      'Erosão marcante do esmalte dentário decorrente da acidez gástrica repetitiva',
      'Aumento inexplicado das glândulas salivares (hipertrofia de parótidas)',
      'Humor flutuante depreciativo com sentimentos angustiantes de culpa crônica'
    ],
    fatores_risco: [
      'Baixa autoestima crônica acoplada a traços de impulsividade desregulada',
      'Histórico pessoal de bullying na infância focado na aparência física',
      'Transtornos de ansiedade ou depressão pregressos com má regulação emocional'
    ],
    red_flags: [
      'Surgimento de hipocalemia ou desidratação graves com instabilidade cardíaca',
      'Histórico de sangramento gastrointestinal de Mallory-Weiss por vômitos forçados',
      'Ideação de automutilação desencadeada pelas crises de purgação reincidentes'
    ],
    diferenciais: [
      'Anorexia do tipo purgativa (onde o baixo peso persistente é critério chave)',
      'Síndrome de Kleine-Levin crônica de base neurológica'
    ]
  },
  {
    id: 'F50.8',
    nome: 'Transtorno da Compulsão Alimentar',
    sintomas: [
      'Episódios frequentes de ingestão calórica colossal rápida sem fome física real',
      'Comer até se sentir desconfortavelmente cheio ou em sofrimento gástrico',
      'Comer sozinho ocultamente em segredo para esconder a vergonha do ato',
      'Sentimentos de extremo nojo de si mesmo, depressão ou culpa após o episódio',
      'Ausência total de condutas purgativas ou comportamentos compensatórios subsequentes',
      'Sobrepeso acentuado ou obesidade associados a sofrimento psíquico evidente',
      'Labilidade emocional severa associada a gatilhos alimentares obsessivos'
    ],
    fatores_risco: [
      'Histórico de tentativas frustradas de dietas severamente restritivas prévias',
      'Exposição crônica a estressores intrafamiliares geradores de ansiedade',
      'Regulação inadequada de impulsos dopaminérgicos de recompensa central'
    ],
    red_flags: [
      'Desenvolvimento de Diabetes Tipo II com complicações vasculares precoces',
      'Depressão refratária com ideação suicida decorrente de obesidade mórbida',
      'Pânicos agudos sobrepostos por insatisfação global íntima'
    ],
    diferenciais: [
      'Bulimia Nervosa (que obrigatoriamente envolve mecanismos de purgação)',
      'Transtorno Afetivo Bipolar descompensado (hiperfagia em fases atípicas)'
    ]
  },
  {
    id: 'F51.0',
    nome: 'Insônia Não Orgânica',
    sintomas: [
      'Dificuldade prolongada para iniciar o sono (insônia de conciliação)',
      'Despertares noturnos frequentes com dificuldade para readormecer (insônia de manutenção)',
      'Despertar matinal excessivamente precoce com sensação de cansaço agudo',
      'Funcionamento diurno prejudicado por cansaço, sonolência ou irritabilidade',
      'Ansiedade antecipatória crônica focada no ato de ir dormir ("fobia da cama")',
      'Cefaleia de tensão matinal ou queixas somáticas de cansaço extremo',
      'Alteração crônica de humor com labilidade adaptativa ocupacional'
    ],
    fatores_risco: [
      'Estilos de vida irregulares ou rotinas de trabalho em turnos noturnos alternados',
      'Higiene inadequada do sono (uso excessivo de telas brilhantes na cama)',
      'Traços de personalidade com traços hiperfocalizados ansiosos obsessivos',
      'Estressores interpessoais, financeiros ou profissionais crônicos'
    ],
    red_flags: [
      'Consumo abusivo perigoso de benzodiazepínicos e indutores de sono em altas doses',
      'Sintomas psicóticos incipientes que aparecem sob efeito de privações de sono severas',
      'Microcochilos involuntários durante operações de máquinas industriais ou direção'
    ],
    diferenciais: [
      'Síndrome da Apneia Obstrutiva do Sono (SAOS) com despertares asfíxicos',
      'Transtorno de Movimentos Periódicos de Pernas ou pernas inquietas',
      'Transtorno Depressivo com insônia terminal biológica primária'
    ]
  },
  {
    id: 'F40.1',
    nome: 'Fobia Social / Transtorno de Ansiedade Social',
    sintomas: [
      'Medo acentuado e persistente de situações sociais ou de desempenho público',
      'Ansiedade antecipatória excruciante dias antes de reuniões ou apresentações sociais',
      'Temor extremo de agir de uma forma que seja vista como humilhante ou ridícula',
      'Sintomas físicos: rubor facial, sudorese, tremores e disartria em interações',
      'Evitação sistemática de festas, reuniões sociais ou conversas com estranhos',
      'Autocrítica implacável após as interações ("fui inadequado", "me acharam tolo")',
      'Prejuízo acadêmico ou recusa a promoções ocupacionais que envolvam exposição'
    ],
    fatores_risco: [
      'Histórico de bullying escolar ou episódios humilhantes na infância',
      'Temperamento retraído tímido herdado geneticamente',
      'Modelagem comportamental em famílias isoladas socialmente protetoras'
    ],
    red_flags: [
      'Consumo crônico prévio de álcool ou benzodiazepínicos como lubrificante social',
      'Evasão escolar ou demissão profissional reativa de alta gravidade',
      'Isolamento extremo simulando quadros de depressão refratária psicótica'
    ],
    diferenciais: [
      'Transtorno de Personalidade Esquiva (em que o medo é global e egossintônico)',
      'Transtorno do Espectro Autista leve sem compreensão das regras pragmáticas'
    ]
  },
  {
    id: 'F40.0',
    nome: 'Agorafobia',
    sintomas: [
      'Medo acentuado de utilizar transportes públicos ou espaços abertos',
      'Ansiedade severa ao permanecer em filas extensas ou no meio de multidões',
      'Medo extremo de sair de casa sozinho sem um acompanhante de inteira confiança',
      'Sensação de que fugir desses locais seria extremamente difícil ou humilhante',
      'Crença assustadora de que a ajuda médica de emergência não estaria acessível',
      'Crises de ansiedade limitantes de caráter paralisante diante do portão de casa',
      'Modificação restritiva das rotinas de logística ou trabalho'
    ],
    fatores_risco: [
      'Ataques de pânico pretéritos não controlados de evolução demorada',
      'Percepção desregulada do ambiente externo como inerentemente hostil',
      'Vivência de incidentes agressores em vias públicas no passado recente'
    ],
    red_flags: [
      'Isolamento domiciliar completo crônico impossibilitando consultas necessárias',
      'Desenvolvimento de depressão melancólica secundária desestruturada',
      'Dependência financeira e interpessoal absoluta de cuidadores familiares'
    ],
    diferenciais: [
      'Transtorno do Pânico sem Agorafobia (fobia restrita a novos ataques)',
      'Fobia Social restrita à vergonha pública, e não ao isolamento espacial'
    ]
  },
  {
    id: 'F40.2',
    nome: 'Fobia Específica',
    sintomas: [
      'Medo marcante provocado pela presença ou proximidade de um objeto específico',
      'Exposição ao estímulo fóbico evoca instantaneamente crise aguda de pânico',
      'Reação de medo desproporcional ao perigo real que o estímulo possa apresentar',
      'Evitação intencional tenaz do objeto fóbico à custa de sofrimento diário',
      'Sintomas autonômicos de pânico diante dos disparos fóbicos (altura, insetos)',
      'Preocupação persistente de encontrar o objeto fóbico (hipervigilância defensiva)'
    ],
    fatores_risco: [
      'Condicionamento clássico originado por evento assustador anterior (ex. mordida)',
      'Herdabilidade de medos ancestrais evolutivos (animais peçonhentos, fendas)',
      'Modelagem fóbica por pais excessivamente reativos a perigos biológicos'
    ],
    red_flags: [
      'Crises hipertensivas de estresse agudo decorrentes de exposições forçadas',
      'Acidentes graves ao tentar fugir precipitadamente do estímulo fóbico'
    ],
    diferenciais: [
      'Transtorno de Pânico primário',
      'Esquizofrenia descompensada com delírios de perversão associados'
    ]
  },
  {
    id: 'F45.2',
    nome: 'Transtorno Hipocondríaco / Ansiedade de Doença',
    sintomas: [
      'Preocupação excessiva injustificada de ter ou contrair uma doença grave fatal',
      'Interpretação distorcida catastrofista de sintomas somáticos banais (ex: pinta na pele)',
      'Busca persistente e inútil por exames diagnósticos refinados reiteradamente normais',
      'Desconfiança sistemática crônica de diagnósticos médicos tranquilizadores',
      'Checagem obsessiva diária do corpo buscando linfonodos ou assimetrias anatômicas',
      'Ansiedade extremada e sensibilidade corporal a alterações fisiológicas normais',
      'Buscas obsessivas na internet (cibercondria) que exacerbam o pânico íntimo'
    ],
    fatores_risco: [
      'Presença de parente falecido na constância de sofrimento oncológico/cardíaco',
      'Falta de literácia médica integradora de dados de saúde normais',
      'Transtorno depressivo maior associado agravante'
    ],
    red_flags: [
      'Realização abusiva perigosa de exames de radiação cruzados contínuos',
      'Automutilação cirúrgica acidental buscando retirar partes do corpo consideradas doentes',
      'Isolamento hospitalar autoinduzido de longo prazo'
    ],
    diferenciais: [
      'Esclerose Múltipla inicial em fase subclínica de surtos transitórios',
      'Delírio Somático psicótico severo (como Síndrome de Cotard de ruína)'
    ]
  },
  {
    id: 'F34.0',
    nome: 'Ciclotimia',
    sintomas: [
      'Oscilações persistentes do humor por pelo menos dois anos contínuos',
      'Episódios de hipomania leve alternando com depressão leve crônica',
      'Sintomatologia que não atinge intensidade de episódio maníaco ou depressivo maior',
      'Períodos eutímicos que raramente duram mais que 2 meses sucessivos',
      'Instabilidade comportamental evidente relatada por amigos e familiares',
      'Comportamento impulsivo reativo seguido de períodos de evidente isolamento',
      'Labilidade laboral desestruturante com flutuações e ausência de constância'
    ],
    fatores_risco: [
      'Famílias com alta prevalência de Transtorno Afetivo Bipolar clássico',
      'Interações precoces disfuncionais com ambientes sociais imprevisíveis'
    ],
    red_flags: [
      'Evolução gradual de ciclotimia para Transtorno Afetivo Bipolar Tipo I',
      'Uso de substâncias psicoativas na tentativa de autorregular o humor instável'
    ],
    diferenciais: [
      'Transtorno de Personalidade Borderline (que tem oscilações de humor reativas ao afeto)',
      'Transtorno Bipolar clássico compensado'
    ]
  },
  {
    id: 'F34.1',
    nome: 'Distimia',
    sintomas: [
      'Humor deprimido crônico presente na maior parte do dia por pelo menos 2 anos',
      'Baixa autoestima crônica acoplada a sentimentos de inadequação global',
      'Sensação de desesperança de baixa intensidade contínua persistente',
      'Apetite reduzido ou compulsividade alimentar discreta na rotina diária',
      'Dificuldade constante de concentração ou na tomada de decisões rotineiras',
      'Falta crônica de iniciativa acompanhada de anedonia social habitual',
      'Pessimismo sistemático existencial encarado como "traço de gênio"'
    ],
    fatores_risco: [
      'Perda precoce de figuras afetivas primordiais na infância profunda',
      'Impedimentos socioeconômicos ou limitações físicas arrastadas crônicas',
      'Temperamento retraído com alto grau de neuroticismo congênito'
    ],
    red_flags: [
      'Depressão Dupla (episódio depressivo maior agudo sobreposto ao quadro distímico)',
      'Ideação suicidária passiva e desgaste grave de relações intrafamiliares sustentadas'
    ],
    diferenciais: [
      'Transtorno Depressivo Maior Recorrente em remissão incompleta',
      'Processo de luto prolongado insatisfatoriamente integrado'
    ]
  },
  {
    id: 'F60.0',
    nome: 'Transtorno de Personalidade Paranoide',
    sintomas: [
      'Desconfiança e suspeita globais injustificadas em relação aos outros',
      'Interpretação de intenções alheias como malévolas, exploradoras ou traidoras',
      'Preocupação obsessiva com dúvidas infundadas sobre a lealdade de amigos',
      'Reticência crônica em confiar em outrem por medo de conspirações ocultas',
      'Leitura de significados ocultos humilhantes em observações benignas de rotina',
      'Rancor persistente extremo (incapacidade de perdoar insultos ou desfeitas)',
      'Ciúme patológico delirante infundado recorrente de parceiros íntimos'
    ],
    fatores_risco: [
      'Ambientes infantis cercados de hostilidade agressiva e desconfiança extrema',
      'Experiências de segregação hostil na infância ou minoramento sistemático',
      'Parente de primeiro grau com transtornos do espectro da esquizofrenia'
    ],
    red_flags: [
      'Reações violentas "preventivas" contra supostos agressores ou conspiradores',
      'Processos judiciais litigiosos agressivos e repetitivos de caráter delirante',
      'Isolamento social e trancamento habitacional impetrado por medo externo'
    ],
    diferenciais: [
      'Esquizofrenia paranoide psicótica descompensada (com delírios de base bizarra)',
      'Transtorno Delirante Persistente'
    ]
  },
  {
    id: 'F60.1',
    nome: 'Transtorno de Personalidade Esquizoide',
    sintomas: [
      'Ausência total de desejo de intimidade ou de pertencer a relações próximas',
      'Escolha quase exclusiva por atividades solitárias e isoladas cotidianas',
      'Pouco ou nenhum interesse em ter experiências sexuais com parceiros',
      'Anedonia global em quase todas as atividades comuns divertidas',
      'Falta de amigos íntimos ou confidentes fora parentes de primeiro grau',
      'Indiferença perceptível marcante a elogios ou a críticas sociais de outrem',
      'Frieza emocional acentuada, distanciamento ou embotamento afetivo crônico'
    ],
    fatores_risco: [
      'Ambientes de criação gelados afetivamente ou de privação comunicativa',
      'Vulnerabilidade genética herdada do espectro esquizofrênico amplificado'
    ],
    red_flags: [
      'Isolamento extremo duradouro cursando com desnutrição ou negligência pessoal',
      'Evolução rara tardia para esquizofrenia de prognóstico reservado'
    ],
    diferenciais: [
      'Transtorno do Espectro Autista em adultos (Asperger com desejo de amigos frustrado)',
      'Fobia Social grave com evitação dolorosa, e não esquiva preferencial'
    ]
  },
  {
    id: 'F60.2',
    nome: 'Transtorno de Personalidade Antissocial',
    sintomas: [
      'Desrespeito e violação sistemáticos de normas legais e direitos sociais alheios',
      'Mentiras repetidas, uso de pseudônimos ou trapaças para ganho ou prazer pessoal',
      'Impulsividade acentuada ou fracasso em planejar o futuro financeiro e social',
      'Irritabilidade e agressividade extrema manifestadas em lutas corporais repetidas',
      'Desrespeito imprudente focado na segurança de si mesmo ou dos outros',
      'Irresponsabilidade consistente (ausência de fixação laboral ou adimplemento fiscal)',
      'Ausência total de remorso ou culpa após causar dano ou roubar outrem'
    ],
    fatores_risco: [
      'Presença de Transtorno de Conduta diagnosticado na infância (antes de 15 anos)',
      'Abuso intrafamiliar violento severo de cuidadores delinquentes',
      'Estressores de marginalização violenta e convivência precoce com gangues'
    ],
    red_flags: [
      'Condutas criminosas repetitivas associadas a crueldade física animal ou humana',
      'Heteroagressividade explosiva com uso de instrumentos letais diversos',
      'Incapacidade de adequação de conduta penal acarretando perigo comum público'
    ],
    diferenciais: [
      'Psicose aguda ativa delirante de comando violento',
      'Episódio Maníaco bipolar desfocado impulsivo temporário'
    ]
  },
  {
    id: 'F60.4',
    nome: 'Transtorno de Personalidade Histriônica',
    sintomas: [
      'Desconforto profundo em situações em que não é o centro das atenções',
      'Interação social caracterizada por comportamento sedutor ou provocativo atípico',
      'Flutuações emocionais rápidas acompanhadas de expressão afetiva superficial',
      'Uso sistemático marcante da aparência física para chamar atenção no ambiente',
      'Discurso excessivamente impressionista vago com impressionante carência de detalhes',
      'Dramatização extrema, teatralidade e expressividade emocional inflada',
      'Sugestionabilidade marcante (fácil influência por outros ou por circunstâncias)',
      'Consideração de relacionamentos interpessoais comuns como mais íntimos do que são'
    ],
    fatores_risco: [
      'Herdabilidade de traços de extroversão e instabilidade emocional autonômica',
      'Reforço na infância de representações dramáticas sedutoras para obter afeto'
    ],
    red_flags: [
      'Tentativas de suicídio teatrais com potencial risco fatal acidental real',
      'Conflitos românticos explosivos envolvendo agressões domésticas recorrentes'
    ],
    diferenciais: [
      'Transtorno de Personalidade Borderline (que apresenta sentimentos de vazio crônico)',
      'Transtorno de Personalidade Narcisista (que exige admiração por suposta superioridade)'
    ]
  },
  {
    id: 'F60.5',
    nome: 'Transtorno de Personalidade Anancástica / OCPD',
    sintomas: [
      'Preocupação excessiva crônica com detalhes, regras, listas, ordem e organização',
      'Perfeccionismo extremo que prejudica a conclusão de tarefas (paralisia descritiva)',
      'Devotamento excessivo irrazoável ao trabalho com exclusão do lazer e amizades',
      'Superconscienciosidade, escrupulosidade e inflexibilidade ética desmedidas',
      'Inabilidade acentuada em descartar objetos usados ou sem valor ("acumulação")',
      'Relutância crônica em delegar tarefas a menos que sigam seu método exato',
      'Rigidez e teimosia arraigadas inflexíveis em discussões cotidianas'
    ],
    fatores_risco: [
      'Ambientes biológicos propícios focados na obsessividade crônica de controle',
      'Criação familiar repressiva exigente focada em cobranças morais extremas'
    ],
    red_flags: [
      'Evolução para Transtorno Obsessivo-Compulsivo (TOC) agudo grave clínico',
      'Labilidade depressiva decorrente de perdas repentinas de controle logístico'
    ],
    diferenciais: [
      'Transtorno Obsessivo-Compulsivo (TOC) clássico que é egodistônico',
      'Esquizofrenia simples com isolamento progressivo'
    ]
  },
  {
    id: 'F60.6',
    nome: 'Transtorno de Personalidade Esquiva',
    sintomas: [
      'Evitação de atividades profissionais que envolvam contato interpessoal significativo',
      'Disposição relutente para envolver-se com pessoas a menos que tenha certeza de afeição',
      'Inibição de intimidades em relações íntimas por medo de humilhações',
      'Preocupação obsessiva com críticas e rejeições em situações sociais comuns',
      'Inibição evidente em novos cenários interpessoais devido a sentimentos de inadequação',
      'Visão depreciativa autoincurvada ("sou socialmente inepto, desinteressante")',
      'Relutância marcante em assumir riscos pessoais por medo de embaraços'
    ],
    fatores_risco: [
      'Histórico de bullying familiar ou exclusões de coletividades escolares primárias',
      'Traços de reatividade fisiológica autonômica à novidade (timidez inata)'
    ],
    red_flags: [
      'Isolamento socioafetivo total e reclusão residencial prolongada agravante',
      'Comorbidade com agorafobia restritiva extrema impossibilitando autocuidados'
    ],
    diferenciais: [
      'Transtorno de Personalidade Esquizoide (onde não há desejo por conexões)',
      'Fobia Social isolada episódica'
    ]
  },
  {
    id: 'F60.7',
    nome: 'Transtorno de Personalidade Dependente',
    sintomas: [
      'Necessidade excessiva e disseminada de ser cuidado pelos outros no cotidiano',
      'Dificuldade marcante em tomar decisões diárias sem conselhos abusivos de terceiros',
      'Necessidade de que outros assumam a responsabilidade pela maioria de suas áreas',
      'Dificuldade crônica em discordar de terceiros por medo de perda de apoio afetivo',
      'Dificuldade imensa em iniciar projetos de forma autônoma (falta de autoconfiança)',
      'Submissão voluntária voluntária para fazer tarefas desagradáveis para agradar outrem',
      'Angústia insuportável extrema frente a desfechos de solidão espacial'
    ],
    fatores_risco: [
      'Superproteção familiar asfixiante na infância impedindo a individuação',
      'Histórico de doenças graves infantis geradoras de fragilidade dependente habitual'
    ],
    red_flags: [
      'Permanência voluntária continuada em relacionamentos abusivos violentos físicos',
      'Crises de ansiedade generalizadas refratárias ao perder a figura tutelar'
    ],
    diferenciais: [
      'Transtorno de Personalidade Borderline (no Borderlines reagem com raiva ao abandono)',
      'Reação de adaptação depressiva aguda'
    ]
  },
  {
    id: 'F60.8',
    nome: 'Transtorno de Personalidade Narcisista',
    sintomas: [
      'Sensação grandiosa e infundada de autoimportância irreprimível (megalomania)',
      'Preocupação com fantasias de sucesso ilimitado, poder, beleza ou amor ideal',
      'Crença íntima profunda de ser "especial" e só poder ser compreendido por seus pares',
      'Exigência crônica desmedida de admiração excessiva de subordinados ou pares',
      'Sentimento de direito irrazoável (expectativas de tratamento favorável automático)',
      'Exploração interpessoal voluntária de terceiros para atingir seus próprios fins',
      'Ausência crônica de empatia ou identificação com sentimentos alheios',
      'Inveja contínua de terceiros ou crença de ser sumariamente invejado',
      'Comportamentos arrogantes, insolentes ou soberbos de forma habitual'
    ],
    fatores_risco: [
      'Criação indulgente sem limites de pais que supervalorizavam a criança falsamente',
      'Compensação de baixa auto-estima intrínseca dolorosa por rejeições afetivas de infância'
    ],
    red_flags: [
      'Crises coléricas explosivas homéricas (fúria narcísica) após invalidações sociais',
      'Depressão vazia colossal refratária com alta letalidade após falências ocupacionais'
    ],
    diferenciais: [
      'Episódio Maníaco bipolar (grandiosidade delirante episódica com taquicardia)',
      'Transtorno de Personalidade Antissocial (onde há delinquência e ilegalidade severa)'
    ]
  },
  {
    id: 'F21',
    nome: 'Transtorno Esquizotípico',
    sintomas: [
      'Ideias de referência persistentes (exclui delírios francificados)',
      'Crenças estranhas ou pensamento mágico marcando as condutas do dia a dia',
      'Experiências perceptivas incomuns (incluindo ilusões somáticas esquisitas)',
      'Discurso esquisito e idiossincrático (metafórico, obscuro ou estereotipado)',
      'Desconfiança infundada ou ideação paranoide persistente com vizinhos/colegas',
      'Afeto inadequado ou severamente restrito embotado nas interações sociais',
      'Aparência, vestimenta ou comportamentos visivelmente excêntricos e bizarros',
      'Ansiedade social extrema que não diminui com a familiaridade'
    ],
    fatores_risco: [
      'Parentesco genético próximo com indivíduos diagnosticados com esquizofrenia',
      'Histórico de traumas familiares complicados e instabilidade escolar'
    ],
    red_flags: [
      'Descompensação abrupta evoluindo para esquizofrenia paranoide psicótica clássica',
      'Negligência física severa originada por rituais rústicos ou crenças de purificação'
    ],
    diferenciais: [
      'Transtorno do Espectro Autista severo em adultos',
      'Transtorno de Personalidade Paranoide puro'
    ]
  },
  {
    id: 'F23.9',
    nome: 'Transtorno Psicótico Agudo e Transitório / Psicose Breve',
    sintomas: [
      'Instalação abrupta de sintomas psicóticos floridos (delírios ou alucinações)',
      'Duração dos sintomas psicóticos maior que 1 dia e estritamente menor que 1 mês',
      'Flutuações bizarras de humor, inquietação e perplexidade frente à realidade',
      'Delírios persecutórios ou de feitiçaria de início súbito estrondoso',
      'Alucinações auditivas ruidosas contínuas relatadas pelo paciente',
      'Retorno completo e integral ao nível de funcionamento eutímico prévio',
      'Confusão psicomotora inicial'
    ],
    fatores_risco: [
      'Presença de estressores vitais catastróficos desencadeantes imediatos (catástrofes)',
      'Privação severa e contínua de sono por longos períodos',
      'Predisposição familiar a curtos surtos psicóticos reativos'
    ],
    red_flags: [
      'Risco auto ou heteroagressivo extremamente agudo decorrente de alucinações de comando',
      'Estado confusional psicótico com desorganização motora nas vias urbanas',
      'Desidratação e estupor psicótico associados'
    ],
    diferenciais: [
      'Esquizofreniformidade (sintomas psicóticos durando de 1 a 6 meses)',
      'Transtorno Psicótico de Origem Autoimune ou Encefalite metabólica e infecciosa'
    ]
  },
  {
    id: 'F25.9',
    nome: 'Transtorno Esquizoafetivo',
    sintomas: [
      'Coexistência duradoura de sintomas psicóticos bizarros e episódios de humor',
      'Presença de delírios ou alucinações por pelo menos 2 semanas na ausência de humor',
      'Oscilações cíclicas marcadas de humor (tipo maníaco ou depressivo severo)',
      'Fuga de ideias durante as fases de exacerbação de humor bipolarizado',
      'Déficits progressivos de cognição integrada de longo prazo',
      'Prejuízos constantes na adaptação profissional e círculos afetivos',
      'Embotamento afetivo persistente intercrises'
    ],
    fatores_risco: [
      'Histórico familiar misto de esquizofrenia e Transtorno Afetivo Bipolar',
      'Uso precoce crônico de drogas alucinógenas ou estimulantes'
    ],
    red_flags: [
      'Tentativas de suicídio violentas induzidas por comandos alucinatórios ou depressões',
      'Furia maníaco-psicótica com heteroagressividade destructiva incontrolável',
      'Katatonia reentrante prolongada'
    ],
    diferenciais: [
      'Esquizofrenia com depressão pós-esquizofrênica episódica',
      'Transtorno Bipolar com características psicóticas floridas estritas em mania/depressão'
    ]
  },
  {
    id: 'F22.0',
    nome: 'Transtorno Delirante Persistente / Paranoia',
    sintomas: [
      'Delírios sistematizados crônicos, não bizarros, de longa duração (> 3 meses)',
      'Tipos comuns: delírio de ciúme, erotomania, grandeza ou inventivo',
      'Ausência total de alucinações auditivas verbal-motoras proeminentes',
      'Funcionamento mental e comportamento global perfeitamente preservados fora do foco do delírio',
      'Construção argumentativa hiperlógica e coerente de suas convicções delirantes',
      'Sofrimento interpessoal severo decorrente do monitoramento conspiratório',
      'Hostilidade verbal refinada direcionada aos supostos perseguidores'
    ],
    fatores_risco: [
      'Idade de início tardia (geralmente meia-idade ou idosos)',
      'Histórico de deficiências sensoriais severas (surdez profunda adquirida refratária)',
      'Traços de personalidade desconfiados e reclusos de longo prazo'
    ],
    red_flags: [
      'Agressões premeditadas lógicas e frias contra a pessoa foco do delírio',
      'Danos físicos causados em automóveis ou residência de terceiros investigados'
    ],
    diferenciais: [
      'Esquizofrenia (que apresenta delírios bizarros de inserção e sintomas negativos)',
      'Demência senil com início de ideias delirantes de roubo'
    ]
  },
  {
    id: 'F43.2',
    nome: 'Transtorno de Adaptação / Reação de Ajustamento',
    sintomas: [
      'Sintomas emocionais ou comportamentais significativos diante de um estressor identificado',
      'Início precoce dos sintomas dentro de 3 meses após a ocorrência do estressor',
      'Sofrimento marcante e flagrantemente desproporcional à intensidade do estressor',
      'Prejuízo ocupacional evidente com incapacidade de manter rituais laborais',
      'Sintomas de ansiedade, depressão de baixa intensidade, choro fácil e desespero',
      'Irritaçao fácil reativa a contratempos do estressor',
      'Duração limitada (sintomas cessam em até 6 meses após a resolução do estressor)'
    ],
    fatores_risco: [
      'Histórico pessoal de baixa resiliência a mudanção de vida ou adaptatibilidade',
      'Fragilidade financeira, desemprego súbito ou separação matrimonial inesperada',
      'Falta de suporte social imediato ou comunitário integrador'
    ],
    red_flags: [
      'Ideação de automutilação ou gestos suicidas reativos imediatos impulsivos',
      'Abuso súbito de álcool ou automedicado benzoadrenérgico'
    ],
    diferenciais: [
      'Transtorno Depressivo Maior (que exige critérios completos de anedonia e tempo)',
      'Luto normal e adaptado à perda afetiva existencial'
    ]
  },
  {
    id: 'F48.1',
    nome: 'Síndrome de Despersonalização-Desrealização',
    sintomas: [
      'Experiências de desapego ou de ser um observador externo de si mesmo (despersonalização)',
      'Sentimento de estar operando em "modo automático" ou em sonho contínuo',
      'Experiências de irrealidade ou distanciamento do mundo externo (desrealização)',
      'Pessoas ou objetos ao redor parecem irreais, planos, sem vida ou cartunescos',
      'Exame de realidade permanece integralmente preservado durante os episódios',
      'Ansiedade secundária intensa decorrente do medo de "estar enlouquecendo"',
      'Dificuldades na concentração integradora intelectual temporal'
    ],
    fatores_risco: [
      'Histórico de transtornos de pânico graves com hiperventilação severa anterior',
      'Grande fadiga física combinada a abuso recreativo de drogas (maconha, ecstasy)',
      'Abuso emocional ou privação de afeto grave intrafamiliar continuados'
    ],
    red_flags: [
      'Perigo de desestruturação reativa suicidária ante o desespero contínuo de irrealidade',
      'Abuso continuado de automedicação agressiva calmante'
    ],
    diferenciais: [
      'Crises Epilépticas Parciais Complexas de lobo temporal (com aura dissociativa)',
      'Anatomia neurológica tumoral em lobo parietal cerebral'
    ]
  },
  {
    id: 'F51.4',
    nome: 'Terror Noturno',
    sintomas: [
      'Episódios recorrentes de despertar abrupto do sono com grito de pânico',
      'Ansiedade intensa e sinais de ativação autonômica extrema (taquicardia, sudorese, dispneia)',
      'Incapacidade crônica de ser acalmado ou consolado por acompanhantes durante a crise',
      'Amnésia retrógrada quase completa do conteúdo do episódio na manhã seguinte',
      'Dificuldade expressiva em responder a estímulos externos do quarto de dormir',
      'Agitação motora brusca que pode gerar traumas mecânicos acidentais'
    ],
    fatores_risco: [
      'Início comum na infância com remissão espontânea subsequente habitual',
      'Privação prolongada de sono ou febre alta biológica atual infantil',
      'Abuso de medicamentos estimulantes ou cansaço muscular extremo'
    ],
    red_flags: [
      'Fraturas ou traumas mecânicos auto-infligidos em escapadas abruptas da cama',
      'Co-ocorrência em idosos sugerindo estágio prodromal de Parkinson (doença do sono REM)'
    ],
    diferenciais: [
      'Pesadelos vívidos clássicos (nos quais há despertar completo e lembrança do sonho)',
      'Epilepsia frontal noturna de caráter focal motor'
    ]
  },
  {
    id: 'F51.3',
    nome: 'Sonambulismo',
    sintomas: [
      'Episódios repetidos em que o indivíduo se levanta da cama e caminha adormecido',
      'Olhar vago, fixo, sem expressão facial típica durante a locomoção',
      'Incapacidade marcante de ser acordado por outras pessoas durante o evento',
      'Ao acordar, apresenta amnésia completa do episódio sem vestígios de lembranças',
      'Discurso incompreensível rústico se interpelado em andamento',
      'Retorno espontâneo ao leito ou adormecimento em outro cômodo'
    ],
    fatores_risco: [
      'Herdabilidade intrafamiliar acentuada documentada de sonambulismo',
      'Apneia obstrutiva do sono agindo como gatilho de excitação motora parcial',
      'Estresse agudo, fadiga extrema e privação prévia prolongada do sono'
    ],
    red_flags: [
      'Quedas graves da própria altura, janelas ou escadas de prédios habitacionais',
      'Ações motoras de perigo acidental manuseando facas de cozinha dormindo'
    ],
    diferenciais: [
      'Transtorno Comportamental do Sono REM (em que os sonhos violentos são atuados)',
      'Fugacidade dissociativa histérica'
    ]
  },
  {
    id: 'F51.1',
    nome: 'Hipersonia Não Orgânica',
    sintomas: [
      'Sonolência diurna excessiva injustificada apesar de sono noturno prolongado',
      'Dificuldade extrema para se manter acordado ao longo do dia em reuniões ou aulas',
      'Despertar matinal excessivo lento com "inebriação pelo sono" (desorientação, lentidão)',
      'Episódios de sono diurnos involuntários não reparadores duradouros',
      'Fadiga muscular e astenia intelectual habituais limitantes',
      'Prejuízo acadêmico marcante decorrente de ausências e sonolência'
    ],
    fatores_risco: [
      'Hipotireoidismo não detectado ou diabetes inicial descompensado',
      'Traços de depressão atípica oculta ou sofrimento afetivo negado',
      'Ansiedades somatizadas refratárias de evolução crônica'
    ],
    red_flags: [
      'Riscos severos ao dirigir automóveis ou manipular materiais cortantes fabris',
      'Desenvolvimento de depressão grave de base pela frustração de letargia'
    ],
    diferenciais: [
      'Narcolepsia clássica (que envolve cataplexia de queda física e paralisias do sono)',
      'Síndrome de Apneia do Sono grave instalada'
    ]
  },
  {
    id: 'F91.3',
    nome: 'Transtorno Opositor Desafiador (TOD)',
    sintomas: [
      'Padrão persistente de humor raivoso, irritável e comportamento desafiador',
      'Perda de controle emocional fácil com agressividade verbal intrafamiliares',
      'Resistência tenaz a regras impostas por figuras de autoridade (pais, professores)',
      'Incomoda deliberadamente as pessoas ao redor, culpando-as por seus próprios erros',
      'Sintomas vindicativos ou rancorosos recorrentes em curto prazo',
      'Discussões frequentes e hostis com adultos ou mentores de referência',
      'Dificuldade grave de socialização acadêmica duradoura'
    ],
    fatores_risco: [
      'Lares desestruturados com disciplina familiar inconstante, punitiva ou negligente',
      'Pais com transtorno depressivo ou personalidade antissocial ativa',
      'Déficits neurológicos de autorregulação executiva emocional frontal'
    ],
    red_flags: [
      'Evolução progressiva rápida para Transtornos de Conduta ou criminalidade juvenil',
      'Violência física direta em animais ou crianças menores do convívio',
      'Uso precoce de substâncias e abandono escolar secundário irremediável'
    ],
    diferenciais: [
      'Transtorno do Espectro Autista com crises de desorganização sensorial',
      'TDAH com alta impulsividade motora reativa'
    ]
  },
  {
    id: 'F93.0',
    nome: 'Transtorno de Ansiedade de Separação',
    sintomas: [
      'Sofrimento excessivo recorrente frente a desfechos de afastamento de figuras de apego',
      'Preocupação obsessiva irracional de perder a figura de apego por acidentes fatais',
      'Relutância persistente em ir para escola ou dormir sem a proximidade do guardião',
      'Pesadelos repetidos sobre processos traumáticos de separação ou abandono',
      'Sintomas físicos: cefaleia, vômitos, dores abdominais na iminência de se separar',
      'Choro convulso refratário ao ficar sozinho em novos ambientes desafiadores',
      'Apego excessivamente dependente espacial ao guardião'
    ],
    fatores_risco: [
      'Morte de um parente próximo ou animal de estimação amado anteriormente',
      'Mudança repentina de cidade, escola ou divórcio traumático dos pais',
      'Estilos maternos excessivamente ansiosos controladores indutores de dependência'
    ],
    red_flags: [
      'Fobia escolar absoluta crônica causando analfabetismo funcional adaptativo',
      'Desenvolvimento de mutismo seletivo reativo em outros ambientes sociais'
    ],
    diferenciais: [
      'Transtorno de Ansiedade Social de base tímida generalizada',
      'Transtorno Opositor Desafiador reativo puro'
    ]
  }
];
