import { MedicalDisease } from '../types';

export const INFECTIOUS_DISEASES: MedicalDisease[] = [
  {
    id: 'A90',
    nome: 'Dengue',
    sintomas: [
      'Febre alta de início abrupto (39-40°C)',
      'Cefaleia e dor retroorbitária intensa',
      'Mialgia intensa e artralgia limitante',
      'Exantema maculopapular pruriginoso'
    ],
    fatores_risco: [
      'Residência ou viagem recente a área endêmica',
      'Presença de criadouros de Aedes aegypti',
      'Épocas quentes e chuvosas de alta infestação'
    ],
    red_flags: [
      'Dor abdominal intensa e contínua',
      'Vômitos persistentes e hipotensão postural',
      'Sangramentos de mucosas ou petéquias'
    ],
    diferenciais: [
      'Zika Vírus',
      'Chikungunya',
      'Leptospirose',
      'Malária'
    ],
    achados_exames: [
      'Plaquetopenia acentuada',
      'Leucopenia com linfocitose',
      'Hemoconcentração (elevação hematócrito)'
    ],
    criterios_diagnosticos: [
      'Sorologia IgM positiva ou PCR para Antígeno NS1',
      'Quadro clínico sugestivo associado a epidemiologia positiva'
    ]
  },
  {
    id: 'J11',
    nome: 'Influenza (Gripe)',
    sintomas: [
      'Febre alta com calafrios de início agudo',
      'Tosse seca e persistente',
      'Mialgia difusa e dor de garganta',
      'Fadiga extrema e coriza líquida'
    ],
    fatores_risco: [
      'Extremos de idade (idosos e lactentes)',
      'Presença de comorbidades crônicas cardiorrespiratórias',
      'Ausência de vacinação anual atualizada'
    ],
    red_flags: [
      'Dispneia e dessaturação de oxigênio (< 95%)',
      'Desconforto respiratório ou cianose',
      'Piora tardia após melhora inicial'
    ],
    diferenciais: [
      'Resfriado Comum',
      'Covid-19',
      'Pneumonia Adquirida na Comunidade'
    ],
    achados_exames: [
      'Rx de tórax com infiltrado intersticial bilateral',
      'Leucograma normal com linfopenia'
    ],
    criterios_diagnosticos: [
      'Painel viral positivo / Teste rápido de antígeno de Influenza',
      'Diagnóstico clínico-epidemiológico em período de sazonalidade'
    ]
  },
  {
    id: 'N30.0',
    nome: 'Cistite Aguda',
    sintomas: [
      'Disúria intensa e queimação miccional',
      'Polaciúria e urgência miccional',
      'Dor suprapúbica ou peso no baixo ventre',
      'Urina turva ou com odor fétido'
    ],
    fatores_risco: [
      'Sexo feminino e atividade sexual ativa',
      'Uso de diafragma ou espermicidas',
      'Higienização inadequada ou baixa ingesta hídrica'
    ],
    red_flags: [
      'Febre alta e calafrios (sinal de Pielonefrite)',
      'Dor lombar súbita com sinal de Giordano positivo',
      'Vômitos e instabilidade hemodinâmica'
    ],
    diferenciais: [
      'Uretrite por DST',
      'Vaginite aguda (candidíase/tricomoníase)',
      'Cistite Intersticial'
    ],
    achados_exames: [
      'Esterase leucocitária e nitrito positivo no EAS',
      'Leucocitúria acentuada e hematúria microscópica'
    ],
    criterios_diagnosticos: [
      'Urocultura positiva (> 10^5 UFC/mL) com identificação do patógeno',
      'Sintomas típicos de trato urinário inferior sem corrimento vaginal'
    ]
  },
  {
    id: 'J02.0',
    nome: 'Faringite Aguda Estreptocócica',
    sintomas: [
      'Dor de garganta súbita e odinofagia',
      'Febre alta moderada acompanhada de calafrios',
      'Amígdalas hiperemiadas com exsudato purulento',
      'Linfadenopatia cervical anterior dolorosa'
    ],
    fatores_risco: [
      'Faixa etária escolar (5 a 15 anos)',
      'Contato próximo em escolas, creches ou quartéis',
      'Exposição prévia a portadores assintomáticos'
    ],
    red_flags: [
      'Trismo e desvio de úvula (periamigdalite)',
      'Sialorreia com incapacidade de deglutir saliva',
      'Estridor ou dificuldade respiratória franca'
    ],
    diferenciais: [
      'Faringite Viral (Adenovírus, Rinovírus)',
      'Mononucleose Infecciosa',
      'Herpangina'
    ],
    achados_exames: [
      'Leucocitose com desvio à esquerda',
      'Elevação de Proteína C-Reativa (PCR)'
    ],
    criterios_diagnosticos: [
      'Teste rápido para estreptococo do grupo A (Streptest) positivo',
      'Cultura de swab de orofaringe positiva',
      'Escore de Centor modificado de alta probabilidade'
    ]
  },
  {
    id: 'A08',
    nome: 'Gastroenterite Aguda Viral',
    sintomas: [
      'Diarreia aquosa e profusa sem muco ou sangue',
      'Náuseas frequentes e vômitos repetitivos',
      'Cólica abdominal difusa leve a moderada',
      'Febre baixa associada a cefaleia leve'
    ],
    fatores_risco: [
      'Consumo de água ou alimentos contaminados',
      'Falta de saneamento ou higiene das mãos',
      'Contato com indivíduos que possuem diarreia'
    ],
    red_flags: [
      'Sinais de desidratação grave (oligúria, turgor diminuído)',
      'Evacuação com sangue vivo ou muco escarlate',
      'Letargia ou alteração do estado mental'
    ],
    diferenciais: [
      'Gastroenterite Bacteriana (Salmonella, Shigella)',
      'Parasitoses Intestinais',
      'Apendicite Aguda'
    ],
    achados_exames: [
      'Distúrbios hidroeletrolíticos (hipopotassemia/acidose)',
      'Aumento da ureia e creatinina por pré-renal'
    ],
    criterios_diagnosticos: [
      'Quadro epimiológico agudo autolimitado',
      'Pesquisa de Rotavírus ou Norovírus nas fezes em surtos'
    ]
  },
  {
    id: 'J18.9',
    nome: 'Pneumonia Adquirida na Comunidade',
    sintomas: [
      'Febre alta acompanhada de calafrios',
      'Tosse produtiva com escarro purulento ou ferruginoso',
      'Dispneia e dor torácica pleurítica que piora na inspiração',
      'Estertores crepitantes localizados à ausculta'
    ],
    fatores_risco: [
      'Idade maior de 65 anos ou tabagismo ativo',
      'DPOC, asma crônica ou insuficiência cardíaca',
      'Uso recente de imunossupressores'
    ],
    red_flags: [
      'Frequência respiratória maior que 30 ipm',
      'Confusão mental aguda (Critério CURB-65)',
      'Instabilidade hemodinâmica ou choque séptico'
    ],
    diferenciais: [
      'Tromboembolismo Pulmonar',
      'Insuficiência Cardíaca Descompensada',
      'Tuberculose Ativa'
    ],
    achados_exames: [
      'Radiografia de tórax com consolidação lobar ou broncopneumônica',
      'Leucocitose importante com desvio à esquerda'
    ],
    criterios_diagnosticos: [
      'Evidência radiológica de infiltrado pulmonar novo',
      'Presença de pelo menos dois sintomas respiratórios agudos'
    ]
  },
  {
    id: 'A15.0',
    nome: 'Tuberculose Pulmonar',
    sintomas: [
      'Tosse produtiva persistente por mais de 3 semanas',
      'Febre vespertina diária moderada (38°C)',
      'Sudorese noturna profusa e calafrios',
      'Emagrecimento involuntário marcante e anorexia'
    ],
    fatores_risco: [
      'Privação de liberdade, abrigos ou aglomerações',
      'Imunossupressão (coinfecção HIV/AIDS)',
      'Contato domiciliar próximo com caso ativo'
    ],
    red_flags: [
      'Hemoptise volumosa descompensadora',
      'Dispneia grave com insuficiência respiratória',
      'Rigidez nucal associada'
    ],
    diferenciais: [
      'Neoplasia Broncopulmonar',
      'Sarcoidose',
      'Micoses Pulmonares Profundas'
    ],
    achados_exames: [
      'Radiografia de tórax com cavitação em lobos superiores',
      'Anemia de doença crônica leve'
    ],
    criterios_diagnosticos: [
      'Pesquisa de BAAR no escarro positiva em duas amostras',
      'Teste Rápido Molecular para Tuberculose (TRM-TB) detectável',
      'Cultura para micobactéria em meio sólido/líquido'
    ]
  },
  {
    id: 'B01.9',
    nome: 'Varicela (Catapora)',
    sintomas: [
      'Exantema polimórfico maculopapular e vesiculoso',
      'Prurido cutâneo intenso e generalizado',
      'Febre moderada surgindo junto com o exantema',
      'Linfadenopatia generalizada bilateral'
    ],
    fatores_risco: [
      'Crianças em idade pré-escolar e escolar',
      'Ausência de vacinação específica de varicela',
      'Exposição domiciliar intra-familiar ativa'
    ],
    red_flags: [
      'Celulite ou abscesso secundário de pele',
      'Ataxia cerebelar, convulsão ou letargia (encefalite)',
      'Tosse persistente ou dispneia significando pneumonia'
    ],
    diferenciais: [
      'Varíola e Infecções por Coxsackievírus',
      'Farmacodermia Vesiculobolhosa',
      'Impétigo Bolhoso'
    ],
    achados_exames: [
      'Linfocitose atípica moderada',
      'PCR para Herpesvírus Varicella-Zoster em vesícula'
    ],
    criterios_diagnosticos: [
      'Quadro exantemático polimórfico clássico com vesículas umbilicadas',
      'Vínculo epidemiológico estabelecido com caso confirmado'
    ]
  },
  {
    id: 'H66.0',
    nome: 'Otite Média Aguda',
    sintomas: [
      'Otalgia supulsiva de início rápido e lancinante',
      'Febre moderada a alta acompanhada de irritabilidade',
      'Otorreia purulenta em caso de perfuração timpânica',
      'Sensação de hipoacusia ou plenitude auricular'
    ],
    fatores_risco: [
      'Idade pediátrica (especialmente menores de 2 anos)',
      'Frequentadores de creches ou hipertrofia de adenoide',
      'Exposição ao fumo passivo domiciliar'
    ],
    red_flags: [
      'Edema retroauricular com desvio de pavilhão (Mastoidite)',
      'Paralisia facial periférica ipsilateral',
      'Estrabismo convergente ou cefaleia difusa intensa'
    ],
    diferenciais: [
      'Otite Externa Difusa',
      'Disfunção Temporomandibular (DTM)',
      'Dentição infantil'
    ],
    achados_exames: [
      'Otoscopia com abaulamento importante da membrana timpânica',
      'Opacidade, hiperemia intensa e mobilidade reduzida do tímpano'
    ],
    criterios_diagnosticos: [
      'Abaulamento agudo moderado a grave da membrana timpânica',
      'Evidência de efusão em orelha média'
    ]
  },
  {
    id: 'J01.9',
    nome: 'Sinusite Bacteriana Aguda',
    sintomas: [
      'Congestão nasal e rinorreia anterior/posterior purulenta',
      'Dor ou pressão facial que piora ao inclinar a cabeça',
      'Cefaleia frontal ou maxilar unilateral',
      'Hiposmia ou perda parcial do olfato'
    ],
    fatores_risco: [
      'Quadro gripal viral ou rinite alérgica crônica',
      'Desvio de septo nasal ou obstrução mecânica',
      'Histórico de tabagismo ativo ou passivo'
    ],
    red_flags: [
      'Preenchimento ou edema palpebral com dor ocular extrema',
      'Diplopia, proptose ou diminuição da acuidade visual',
      'Rigidez nucal ou sinais focais neurológicos'
    ],
    diferenciais: [
      'Sinusite Viral Crônica',
      'Cefaleia Tensional',
      'Dor de Origem Dentária'
    ],
    achados_exames: [
      'Tomografia computadorizada mostrando opacificação dos seios nasais',
      'Rx de seios da face com nível hidroaéreo (pouco sensível)'
    ],
    criterios_diagnosticos: [
      'Sintomas persistentes por mais de 10 dias sem melhora',
      'Piora de sintomas após resfriado primário (dupla piora)'
    ]
  },
  {
    id: 'N10',
    nome: 'Pielonefrite Aguda',
    sintomas: [
      'Febre alta (> 38.5°C) acompanhada de calafrios intensos',
      'Dor lombar unilateral ou bilateral profunda',
      'Sinal de Giordano acentuadamente positivo à punção-percussão',
      'Disúria, náuseas e vômitos frequentes'
    ],
    fatores_risco: [
      'Histórico de infecção do trato urinário recorrente',
      'Refluxo vesicoureteral ou obstrução por cálculo',
      'Gravidez e diabetes mellitus descompensado'
    ],
    red_flags: [
      'Sinais de choque séptico ou hipotensão persistente',
      'Obstrução urinária concomitante com anúria unilateral',
      'Nefropatia crônica preexistente com perda funcional rápida'
    ],
    diferenciais: [
      'Apendicite Aguda',
      'Cólica Renoureteral Aguda',
      'Doença Inflamatória Pélvica'
    ],
    achados_exames: [
      'Urocultura com contagem de colônias > 10^5 UFC/mL',
      'Leucocitose com desvio à esquerda proeminente no sangue'
    ],
    criterios_diagnosticos: [
      'Sintomas clássicos de pielonefrite com urocultura positiva',
      'Demonstração de sofrimento renal agudo por imagem se recorrente'
    ]
  },
  {
    id: 'A27.9',
    nome: 'Leptospirose',
    sintomas: [
      'Febre abrupta acompanhada de mialgia extrema das panturrilhas',
      'Cefaleia holocraniana intensa',
      'Sufusão conjuntival típica (olhos hiperemiados sem pus)',
      'Náuseas, vômitos e diarreia leve'
    ],
    fatores_risco: [
      'Contato com água de enchente ou esgoto',
      'Presença de roedores domiciliares ou peri-domiciliares',
      'Trabalho em limpeza de bueiros ou agricultura úmida'
    ],
    red_flags: [
      'Icterícia rubínica marcante e oligúria súbita',
      'Manifestações hemorrágicas difusas (síndrome de Weil)',
      'Hemoptise ou desconforto respiratório agudo'
    ],
    diferenciais: [
      'Dengue Grave',
      'Febre Amarela',
      'Hepatites Virais Agudas',
      'Malária'
    ],
    achados_exames: [
      'Plaquetopenia importante combinada com leucocitose',
      'Aumento expressivo de transaminases e creatinina sérica',
      'CPK muito elevada e hipopotassemia paradoxal'
    ],
    criterios_diagnosticos: [
      'Soroaglutinação microscópica (MAT) reagente ou Elisa IgM',
      'Presença de quadro clínico-epidemiológico de inundação recente'
    ]
  },
  {
    id: 'A46',
    nome: 'Erisipela',
    sintomas: [
      'Placa eritematosa bem delimitada em membro inferior ou face',
      'Pele brilhosa, tensa, quente e dolorosa',
      'Febre alta de início súbito acompanhada de calafrios',
      'Bordas elevadas distintas que separam a área afetada'
    ],
    fatores_risco: [
      'Portas de entrada (tinea pedis, úlceras crônicas)',
      'Insuficiência venosa crônica ou linfedema',
      'Obesidade sistêmica ou diabetes mellitus'
    ],
    red_flags: [
      'Formação de bolhas volumosas hemorrágicas ou necrose focal',
      'Progressão acelerada da área eritrematosa',
      'Dor desproporcional à lesão visível (Suspeita de Fascite)'
    ],
    diferenciais: [
      'Celulite Bacteriana',
      'Trombose Venosa Profunda (TVP)',
      'Dermatite de Estase Agudizada'
    ],
    achados_exames: [
      'Marcadores inflamatórios proeminentes (PCR e VHS elevados)',
      'Leucocitose neutrofílica no sangue periférico'
    ],
    criterios_diagnosticos: [
      'Diagnóstico essencialmente clínico pela placa bem delimitada',
      'Cultura de aspirado de borda de lesão se necessário'
    ]
  },
  {
    id: 'A39.0',
    nome: 'Meningite Meningocócica',
    sintomas: [
      'Febre alta abrupta e cefaleia holocraniana lancinante',
      'Rigidez de nuca franca com limitação importante à flexão',
      'Sinal de meningismo positivo (Sinais de Brudzinski e Kern)',
      'Vômitos em jato sem náusea prévia'
    ],
    fatores_risco: [
      'Ausência de vacinação meningocócica',
      'Aglomerados populacionais fechados (quartéis, asilos)',
      'Deficiência congênita de frações de complemento'
    ],
    red_flags: [
      'Surgimento rápido de petéquias ou púrpura fulminante',
      'Alteração severa do nível de consciência ou coma',
      'Crise convulsiva generalizada e choque refratário'
    ],
    diferenciais: [
      'Meningite Viral',
      'Meningite Tuberculosa',
      'Hemorragia Subaracnoide'
    ],
    achados_exames: [
      'Líquido cefalorraquidiano turvo/purulento com neutrofilia',
      'Glicose no líquor muito baixa e proteínas muito elevadas'
    ],
    criterios_diagnosticos: [
      'Cultura de líquor ou PCR positiva para Neisseria meningitidis',
      'Bacterioscopia direta revelando diplococos Gram-negativos'
    ]
  },
  {
    id: 'B37.3',
    nome: 'Candidíase Vulvovaginal',
    sintomas: [
      'Prurido vulvar intenso e persistente',
      'Corrimento vaginal esbranquiçado em placas, grumoso (aspecto de nata)',
      'Disúria de preenchimento externo e dispareunia',
      'Hiperemia e fissuras vulvares dolorosas'
    ],
    fatores_risco: [
      'Uso recente de antibióticos de amplo espectro',
      'Diabetes mellitus mal controlado',
      'Uso de anticoncepcionais orais de alta dose de estrogênio'
    ],
    red_flags: [
      'Infecção recorrente (mais de 4 episódios ao ano)',
      'Extensão inflamatória ampla para região perineal e coxa'
    ],
    diferenciais: [
      'Vaginose Bacteriana (Gardnerella)',
      'Tricomoníase Vaginal',
      'Vaginite Citolítica'
    ],
    achados_exames: [
      'pH vaginal ácido (< 4.5)',
      'Presença de hifas ou pseudo-hifas em exame microscópico a fresco'
    ],
    criterios_diagnosticos: [
      'Sintomas pruríticos típicos com observação de fungo ao exame microscópico',
      'Cultura para Candida positiva se casos recorrentes rebeldes'
    ]
  },
  {
    id: 'B27.9',
    nome: 'Mononucleose Infecciosa',
    sintomas: [
      'Fadiga profunda limitante de longa duração',
      'Faringite exsudativa intensa com odinofagia',
      'Linfadenopatia cervical posterior bilateral simétrica',
      'Febre moderada prolongada (> 7 dias)'
    ],
    fatores_risco: [
      'Faixa etária adolescente ou adulto jovem',
      'Transmissão por saliva (compartilhamento de copos, beijo)',
      'Ambiente universitário ou de alta aglomeração'
    ],
    red_flags: [
      'Esplenomegalia com dor abdominal súbita QSE (Ruptura Esplênica)',
      'Obstrução de via aérea superior pela hipertrofia tonsilar',
      'Anemia hemolítica imune associada'
    ],
    diferenciais: [
      'Faringites Bacterianas Clássicas',
      'Infecção Aguda por HIV',
      'Toxoplasmose Aguda'
    ],
    achados_exames: [
      'Linfocitose importante (> 50%) com presença de atipia (> 10%)',
      'Elevação leve a moderada de transaminases hepáticas'
    ],
    criterios_diagnosticos: [
      'Presença de anticorpos heterófilos séricos positivos',
      'Sorologia específica reagente (Ac anti-capsídeo viral - VCA IgM)'
    ]
  },
  {
    id: 'A92.5',
    nome: 'Zika Vírus',
    sintomas: [
      'Exantema maculopapular avermelhado pruriginoso precoce',
      'Febre de baixa intensidade ou ausente',
      'Hiperemia conjuntival bilateral não purulenta',
      'Artralgia leve a moderada acompanhada de edema'
    ],
    fatores_risco: [
      'Região de alta incidência de Aedes aegypti',
      'Relações sexuais desprotegidas com parceiro sob risco'
    ],
    red_flags: [
      'Fraqueza muscular ascendente flácida (Síndrome de Guillain-Barré)',
      'Gestante exposta (risco severo de microcefalia fetal)',
      'Alteração de reflexos tendinosos profundos'
    ],
    diferenciais: [
      'Dengue',
      'Chikungunya',
      'Rubéola',
      'Sarampo'
    ],
    achados_exames: [
      'Hemograma habitualmente normal',
      'Detecção de RNA de Zika Vírus por técnica PCR-TR'
    ],
    criterios_diagnosticos: [
      'Detecção direta de RNA viral em sangue ou urina por RT-PCR',
      'Exame clínico caracterizado por exantema precoce e conjuntivite'
    ]
  },
  {
    id: 'A92.0',
    nome: 'Chikungunya',
    sintomas: [
      'Artralgia simétrica incapacitante severa (mãos e pés)',
      'Febre alta súbita acompanhada de cefaleia',
      'Edema articular bilateral sobre as articulações afetadas',
      'Exantema maculopapular distribuído no tronco e membros'
    ],
    fatores_risco: [
      'Baixo saneamento ou proximidade de focos de mosquito',
      'Idade avançada ou osteoartrite crônica preexistente'
    ],
    red_flags: [
      'Persistência prolongada de dor intensa há mais de 3 meses (Fase Crônica)',
      'Comprometimento neurológico com alteração cognitiva',
      'Instabilidade articular importante com incapacidade laboral'
    ],
    diferenciais: [
      'Artrite Reumatoide',
      'Dengue',
      'Gota Aguda'
    ],
    achados_exames: [
      'Marcadores inflamatórios agudos ligeiramente altos',
      'Leucopenia e plaquetopenia menos expressivas que na Dengue'
    ],
    criterios_diagnosticos: [
      'Sorologia IgM para Chikungunya positiva',
      'Quadro de artrite inflamatória intensa e epidemiologia positiva'
    ]
  },
  {
    id: 'A03.9',
    nome: 'Shigelose',
    sintomas: [
      'Diarreia muco-sanguinolenta franca de pequeno volume',
      'Tenesmo fecal acentuado e cólica intensa',
      'Febre alta acompanhada de calafrios',
      'Náuseas, anorexia e desidratação'
    ],
    fatores_risco: [
      'Falta de saneamento e precárias condições sócio-econômicas',
      'Contato próximo em creches ou asilos',
      'Sexo anal desprotegido'
    ],
    red_flags: [
      'Frequência evacuatória altíssima com colapso hemodinâmico',
      'Surgimento de convulsão ou encefalite primária',
      'Síndrome Hemolítico-Urémica ( anemia, plaquetopenia, lesão renal)'
    ],
    diferenciais: [
      'Amebíase Diarreica',
      'Gastroenterite por Salmonella',
      'Retocolite Ulcerativa'
    ],
    achados_exames: [
      'Presença abundante de leucócitos e hemácias nas fezes',
      'Leucocitose sistêmica acentuada'
    ],
    criterios_diagnosticos: [
      'Isolamento de Shigella spp. em coprocultura',
      'Análise clínica de disenteria febril epidêmica típica'
    ]
  },
  {
    id: 'A01.0',
    nome: 'Febre Tifoide',
    sintomas: [
      'Febre prolongada em degraus (progressiva)',
      'Dor abdominal difusa acompanhada de diarreia ou constipação',
      'Dissociação pulso-temperatura (Sinal de Faget)',
      'Exantema maculopapular pálido em tronco (Roséolas tificas)'
    ],
    fatores_risco: [
      'Consumo de alimentos crus preparados sem devida higiene',
      'Viagem recente a áreas hiper-endêmicas',
      'Inexistência de rede de esgoto e saneamento básico'
    ],
    red_flags: [
      'Dor abdominal súbita intensa com sinais de peritonite (Perfuração ileal)',
      'Hemorragia digestiva baixa volumosa e súbita',
      'Estado torporoso ou confusão mental'
    ],
    diferenciais: [
      'Leishmaniose Visceral',
      'Malária por P. falciparum',
      'Esquistossomose aguda'
    ],
    achados_exames: [
      'Anemia e leucopenia importantes com desvio à esquerda',
      'Aumento discreto a moderado de transaminases'
    ],
    criterios_diagnosticos: [
      'Isolamento de Salmonella enterica sorotipo Typhi em hemocultura',
      'Mielocultura (padrão-ouro mais sensível)'
    ]
  },
  {
    id: 'B54',
    nome: 'Malária',
    sintomas: [
      'Acessos febris paroxísticos antecedidos por calafrios intensos',
      'Sudorese profusa seguida de defervescência da febre',
      'Cefaleia de forte intensidade e mialgia generalizada',
      'Palidez mucocutânea e esplenomegalia franca'
    ],
    fatores_risco: [
      'Residência ou viagem recente à região da Amazônia Legal',
      'Contato recente com regiões ribeirinhas ou matas nativas',
      'Trabalho de campo desprotegido em florestas endêmicas'
    ],
    red_flags: [
      'Acometimento cerebral com coma ou convulsões (Malária Cerebral)',
      'Insuficiência renal aguda anúrica associada a icterícia',
      'Anemia grave (Hb < 7 g/dL) e hipoglicemia'
    ],
    diferenciais: [
      'Leptospirose',
      'Dengue',
      'Febre Amarela',
      'Hepatite Viral Aguda'
    ],
    achados_exames: [
      'Anemia normocítica normocrômica importante',
      'Hiperbilirrubinemia indireta proeminente por hemólise',
      'Plaquetopenia moderada a grave'
    ],
    criterios_diagnosticos: [
      'Visualização do parasita (Plasmodium) no exame de gota espessa de sangue',
      'Teste rápido imunocromatográfico de antígeno de Malária positivo'
    ]
  },
  {
    id: 'A38',
    nome: 'Escarlatina',
    sintomas: [
      'Exantema micropapular áspero ("pele em lixa")',
      'Febre alta de início abrupto e prostração',
      'Hiperemia de amígdalas acompanhada de exsudato',
      'Língua em framboesa (papilas hipertrofiadas)'
    ],
    fatores_risco: [
      'Contato prévio com amigdalite ou piodermite estreptocócica',
      'Crianças entre 5 e 15 anos de idade'
    ],
    red_flags: [
      'Sinais de choque séptico ou febre refratária persistente',
      'Dificuldade respiratória ou estridor laríngeo'
    ],
    diferenciais: [
      'Doença de Kawasaki',
      'Sarampo',
      'Farmacodermia Aguda'
    ],
    achados_exames: [
      'Leucocitose com desvio à esquerda proeminente',
      'Elevação tardia do título de ASLO (antiestreptolisina O)'
    ],
    criterios_diagnosticos: [
      'Sinal de Pastia (linhas avermelhadas nas dobras cutâneas)',
      'Sinal de Filatov (palidez perioral evidente)',
      'Isolamento de Streptococcus pyogenes por cultura/teste rápido de orofaringe'
    ]
  },
  {
    id: 'A37.9',
    nome: 'Coqueluche',
    sintomas: [
      'Tosse paroxística (crises incontroláveis de tosse rápida)',
      'Guincho inspiratório típico no final dos paroxismos',
      'Vômitos pós-tosse ou cianose perioral transitória',
      'Fase catarral inicial arrastada imitando resfriado'
    ],
    fatores_risco: [
      'Lactentes menores de 6 meses incompletamente vacinados',
      'Contato domiciliar próximo com tosse crônica não diagnosticada',
      'Gestante que não realizou a imunização com dTPa'
    ],
    red_flags: [
      'Episódios frequentes de apneia prolongada em lactentes',
      'Dispinéia grave contínua e hipóxia persistente',
      'Hiperleucocitose extrema no sangue (> 50.000 leucócitos)'
    ],
    diferenciais: [
      'Bronquiolite Viral Aguda',
      'Pneumonia por Chlamydia trachomatis',
      'Refluxo Gastroesofágico com aspiração'
    ],
    achados_exames: [
      'Leucocitose marcante com linfocitose absoluta importante',
      'Infiltrado perihilar ("coração felpudo") no Rx de tórax'
    ],
    criterios_diagnosticos: [
      'Isolamento de Bordetella pertussis por cultura de nasofaringe',
      'Reação de PCR positiva para B. pertussis em amostra de nasofaringe'
    ]
  },
  {
    id: 'B05.9',
    nome: 'Sarampo',
    sintomas: [
      'Exantema maculopapular morbiliforme confluente crânio-caudal',
      'Tosse seca intensa acompanhada de coriza persistente',
      'Conjuntivite marcante com fotofobia ocular real',
      'Sinal de Koplik (manchas cinzas-azuladas em mucosa oral)'
    ],
    fatores_risco: [
      'Falta de vacinação de tríplice viral (SCR)',
      'Viagem internacional para locais com surtos vigentes',
      'Idade pediátrica associada a desnutrição crônica'
    ],
    red_flags: [
      'Dispinéia marcante ou estridor (Pneumonia secundária)',
      'Lencefalite progressiva com confusão ou letargia severa',
      'Diarreia grave levando a desidratação crítica'
    ],
    diferenciais: [
      'Rubéola',
      'Zika',
      'Farmacodermia',
      'Escarlatina'
    ],
    achados_exames: [
      'Leucopenia e linfopenia',
      'Presença de células gigantes multinucleadas em raspado nasal'
    ],
    criterios_diagnosticos: [
      'Sorologia IgM específica contra Sarampo positiva',
      'Isolamento viral ou RT-PCR urinário ou de swab nasal positivo'
    ]
  },
  {
    id: 'A36.9',
    nome: 'Difteria',
    sintomas: [
      'Faringite com pseudomembrana cinza-azulada espessa aderente',
      'Sangramento fácil nas tentativas cirúrgicas de remoção da placa',
      'Febre moderada surgindo gradualmente',
      'Pescoço de touro devido a adenomegalia cervical imensa'
    ],
    fatores_risco: [
      'Esquema vacinal de pentavalente/DTP incompleto',
      'Baixo nível sócio-econômico e aglomeração'
    ],
    red_flags: [
      'Dificuldade para respirar e asfixia mecânica aguda',
      'Miocardite tóxica com arritmias graves no ECG',
      'Paralisia velopalatina (regurgitação de líquidos pelo nariz)'
    ],
    diferenciais: [
      'Faringoamigdalite bacteriana severa',
      'Mononucleose Infecciosa',
      'Angina de Ludwig'
    ],
    achados_exames: [
      'Eletrocardiograma mostrando distúrbios de condução atípicos',
      'Elevação de enzimas cardíacas agudizadas'
    ],
    criterios_diagnosticos: [
      'Isolamento de Corynebacterium diphtheriae em cultura de orofaringe',
      'Prova de toxigenicidade de Elek positiva para cepa isolada'
    ]
  },
  {
    id: 'B02.9',
    nome: 'Herpes Zóster',
    sintomas: [
      'Dor neuropática unilateral, queimação, parestesia no dermátomo',
      'Erupção cutânea vesicular agrupada em base eritematosa',
      'As vesicular seguem estritamente a linha média de um dermátomo',
      'Febre leve e linfadenopatia local concomitantes'
    ],
    fatores_risco: [
      'Idade igual ou superior a 50 anos',
      'Imunossupressão por quimioterapia, corticoide ou HIV',
      'Histórico clínico prévio de catapora primária na infância'
    ],
    red_flags: [
      'Acometimento de ramo oftálmico (Sinal de Hutchinson - Herpes Oftálmico)',
      'Paralisia facial periférica com otalgia (Síndrome de Ramsay Hunt)',
      'Mielite transversa com déficit motor agudo nos membros'
    ],
    diferenciais: [
      'Dermatite de Contato Aguda',
      'Neuralgia Intercostal de outras origens',
      'Celulite bacteriana focal'
    ],
    achados_exames: [
      'Citologia de Tzanck com células gigantes multinucleadas em base fresca',
      'Exame de PCR para Varicella-Zoster em raspado vesicular'
    ],
    criterios_diagnosticos: [
      'Apresentação típica dermatomérica unilateral clássica',
      'Confirmação molecular por PCR se manifestações atypicas'
    ]
  },
  {
    id: 'B00.9',
    nome: 'Herpes Simples Mucocutâneo',
    sintomas: [
      'Vesículas agrupadas em buquê de base eritematosa',
      'Sensação prévia de queimação, dor ou prurido local',
      'Evolução para ulcerações dolorosas superficiais circulares',
      'Linfadenopatia regional móvel e dolorosa'
    ],
    fatores_risco: [
      'Estresse psicológico intenso ou fadiga física proeminente',
      'Exposição excessiva a raios solares sem barreira',
      'Períodos peri-menstruais ou traumas cutâneos directos'
    ],
    red_flags: [
      'Envolvimento ocular com hiperemia e diminuição visual (Queratite)',
      'Crises frequentes crônicas severas (mais de 6 anuais)',
      'Sinais encefálicos agudos (morfologia de lobo temporal afetado)'
    ],
    diferenciais: [
      'Aftas Orais Recorrentes',
      'Sífilis Primária (Cancro Duro)',
      'Chancroide'
    ],
    achados_exames: [
      'Identificação de vírus por PCR em swab de lesão ativa',
      'Citodiagnóstico positivo para células gigantes multinucleadas'
    ],
    criterios_diagnosticos: [
      'Visualização das características das vesículas agrupadas típicas',
      'Cultura ou PCR das lesões ulcerativas ativo positivo'
    ]
  },
  {
    id: 'A54.9',
    nome: 'Gonorréia',
    sintomas: [
      'Corrimento uretral abundante, mucopurulento, amarelo-esverdeado',
      'Disúria intensa com sensação de queimação intrameato',
      'Edema e eritema do meato uretral externo',
      'Dor testicular unilateral leve a moderada (orquiepididimite)'
    ],
    fatores_risco: [
      'Múltiplos parceiros sexuais ativos simultâneos',
      'Prática de relação sexual desprotegida sem preservativo',
      'Histórico pessoal prévio recente de infecção urinária por DST'
    ],
    red_flags: [
      'Artrite purulenta aguda em grandes articulações (Disseminação)',
      'Lesões cutâneas necróticas papulopustulosas periféricas',
      'Dor pélvica crônica incapacitante em mulheres (DIP)'
    ],
    diferenciais: [
      'Uretrite Não Gonocócica (Chlamydia trachomatis)',
      'Prostatite Aguda Bacteriana',
      'Linfogranuloma Venéreo'
    ],
    achados_exames: [
      'Bacterioscopia direta revelando diplococos Gram-negativos intracelulares',
      'Cultura em meio Thayer-Martin de secreção uretral'
    ],
    criterios_diagnosticos: [
      'Pesquisa por biologia molecular (PCR) em urina ou swab uretral ativa',
      'Bacterioscopia positiva em amostras de secreção uretral masculina'
    ]
  },
  {
    id: 'A51.0',
    nome: 'Sífilis Primária',
    sintomas: [
      'Cancro duro (úlcera genital única, indolor, de base limpa)',
      'Bordas endurecidas e elevadas bem definidas da lesão',
      'Ausência total de secreção purulenta na ferida',
      'Linfadenopatia inguinal bilateral indolor que não fistuliza'
    ],
    fatores_risco: [
      'Relação sexual desprotegida recente com parceiro infectado',
      'Múltiplos parceiros de vida sexual ativa sem barreiras'
    ],
    red_flags: [
      'Presença de lesões exantemáticas em palmas e solas (Secundarismo)',
      'Comprometimento ocular ou perda visual súbita (Neurossífilis)',
      'Gestante portadora (alto risco de sífilis congênita deletéria)'
    ],
    diferenciais: [
      'Cancro Mole (Heamophilus ducreyi)',
      'Herpes Genital Ulcerativa',
      'Linfogranuloma Venéreo'
    ],
    achados_exames: [
      'Exame de imunofluorescência ou microscopia de campo escuro positiva',
      'VDRL reagente com titulações baixas iniciais ou negativas nas primeiras semanas'
    ],
    criterios_diagnosticos: [
      'Identificação direta de T. pallidum em material de lesão em campo escuro',
      'Teste rápido treponêmico reagente associado a lesão cancroide típico'
    ]
  },
  {
    id: 'A07.1',
    nome: 'Giardíase',
    sintomas: [
      'Diarreia crônica ou intermitente com esteatorreia',
      'Fezes volumosas, gordurosas, fétidas e flutuantes',
      'Distorções abdominais, flatulência fétida e cólicas',
      'Distúrbio de absorção com perda ponderal'
    ],
    fatores_risco: [
      'Ingestão de água de poço ou fontes naturais não tratadas',
      'Crianças menores em fase escolar ou creches'
    ],
    red_flags: [
      'Síndrome de má absorção severa com desnutrição importante',
      'Desidratação crônica com distúrbios de crescimento infantil'
    ],
    diferenciais: [
      'Doença Celíaca',
      'Síndrome do Intestino Irritável',
      'Criptosporidíase'
    ],
    achados_exames: [
      'Pesquisa de cistos ou trofozoítas de Giardia lamblia no EPF',
      'Hemograma habitualmente sem eosinofilia'
    ],
    criterios_diagnosticos: [
      'Visualização microscópica de Giardia lamblia em exame parasitológico fezes',
      'Detecção de antígenos fecais por Elisa específico'
    ]
  },
  {
    id: 'B86',
    nome: 'Escabiose (Sarna)',
    sintomas: [
      'Prurido corporal generalizado de forte intensidade, pior à noite',
      'Pápulas eritematosas, escoriações e túneis lineares na pele',
      'Predileção por dobras cutâneas, espaços interdigitais e axilas',
      'Poupa classicamente a região da cabeça e pescoço em adultos'
    ],
    fatores_risco: [
      'Habitabilidade compartilhada em ambientes com aglomerações',
      'Contato pele a pele próximo e íntimo com indivíduos afetados',
      'Partilha de roupas pessoais, lençóis ou toalhas infectadas'
    ],
    red_flags: [
      'Erupção crostosa generalizada extensa (Sarna Norueguesa no imunodeprimido)',
      'Infecção bacteriana secundária de fendas (Glomerulonefrite pós-estreptocócica)'
    ],
    diferenciais: [
      'Dermatite Atópica severa',
      'Urticária Crônica',
      'Prurido Senil'
    ],
    achados_exames: [
      'Pesquisa direta de ácaros (Sarcoptes scabiei) por raspado de pele',
      'Biópsia de pele mostrando infiltrado eosinofílico típico'
    ],
    criterios_diagnosticos: [
      'Visualização direta de Sarcoptes scabiei ou ovos ao microscópio',
      'Presença de lesões de túneis clássicos em locais de predileção típica'
    ]
  },
  {
    id: 'A06.0',
    nome: 'Amebíase Intestinal',
    sintomas: [
      'Diarreia crônica ou disenteria com fezes gelatinosas/sanguinolentas',
      'Dor abdominal intensa do tipo cólica difusa ou em QID',
      'Tenesmo retal associado a múltiplas evacuações de pequeno volume',
      'Anorexia acompanhada de emagrecimento gradual'
    ],
    fatores_risco: [
      'Consumo de hortaliças lavadas com águas poluídas',
      'Inexistência de rede de tratamento de dejetos e esgotamento'
    ],
    red_flags: [
      'Dor abdominal exacerbada localizada sugerindo megacólon tóxico',
      'Surgimento de abscesso hepático amebiano (dor QSD + febre)',
      'Perfuração intestinal com abdome agudo obstrutivo/inflamatório'
    ],
    diferenciais: [
      'Shigelose',
      'Retocolite Ulcerativa Ativa',
      'Câncer Colorretal Obstrutivo'
    ],
    achados_exames: [
      'Pesquisa de trofozoítas fagocitando hemácias em fezes frescas',
      'Leucocitose moderada no hemograma'
    ],
    criterios_diagnosticos: [
      'Demonstração microscópica de Entamoeba histolytica em fezes',
      'Sorologia (Elisa) para Amebíase positiva em quadros extra-intestinais'
    ]
  },
  {
    id: 'A30.9',
    nome: 'Hanseníase',
    sintomas: [
      'Manchas hipocrômicas ou avermelhadas na pele com perda de sensibilidade',
      'Ausência total ou parcial de suor na área das manchas cutâneas',
      'Parestesias ou queimação periférica em trajeto de nervos',
      'Alopecia localizada na área das placas de manchas'
    ],
    fatores_risco: [
      'Contato prolongado continuado intra-familiar com portador ativo',
      'Áreas geográficas de baixa cobertura de atenção básica'
    ],
    red_flags: [
      'Reações hansênicas agudas (tipo 1 ou tipo 2 - Eritema nodoso grave)',
      'Neuralgia aguda súbita incapacitante de nervos periféricos',
      'Instalação de incapacidades físicas progressivas em mãos ou pés'
    ],
    diferenciais: [
      'Vitiligo precoce',
      'Pitiríase Versicolor Fungoide',
      'Neuropatia Diabética Periférica'
    ],
    achados_exames: [
      'Baciloscoia por esfregaço de lobo auricular ou cotovelo positiva',
      'Biópsia de nervo periférico com processo inflamatório granulomatoso'
    ],
    criterios_diagnosticos: [
      'Presença de lesão cutânea com perda de sensibilidade térmica/dolorosa',
      'Espessamento palpável de troncos nervosos periféricos típicos'
    ]
  },
  {
    id: 'B26.9',
    nome: 'Caxumba (Parotidite Infecciosa)',
    sintomas: [
      'Abaulamento inflamatório doloroso unilateral/bilateral da parótida',
      'Trismo e dificuldade à mastigação de alimentos e deglutição',
      'Febre moderada associada a mialgia e cefaleia',
      'Dor referida no ouvido ipsilateral à parótida dilatada'
    ],
    fatores_risco: [
      'Idade escolar juvenil e juvenil-adulta',
      'Ausência de imunização completa da vacina tríplice viral'
    ],
    red_flags: [
      'Dor testicular súbita unilateral intensa com calor local (Orquite)',
      'Dor abdominal em andar superior com vômitos frequentes (Pancreatite)',
      'Rigidez nucal e sonolência profunda'
    ],
    diferenciais: [
      'Sialolitíase Obstrutiva',
      'Parotidite Bacteriana Aguda Supurada',
      'Linfadenite Cervical'
    ],
    achados_exames: [
      'Amilase sérica marcadamente elevada',
      'Sorologia IgM específica para vírus da Caxumba positiva'
    ],
    criterios_diagnosticos: [
      'Evidência clínica de parotidite não supurativa epidêmica típica',
      'Sorologia viral positiva ou PCR em amostra de saliva'
    ]
  },
  {
    id: 'B06.9',
    nome: 'Rubéola',
    sintomas: [
      'Exantema maculopapular róseo de início facial de dispersão rápida',
      'Linfadenopatia retroauricular, occipital e pós-cervical marcada',
      'Febre baixa concomitante e artralgia transitória leve',
      'Sinal de Forchheimer (petéquias em palato mole)'
    ],
    fatores_risco: [
      'Ausência de vacinação protetora',
      'Áreas geográficas com falhas na cobertura vacinal regional'
    ],
    red_flags: [
      'Gestante exposta em qualquer idade gestacional (Síndrome da Rubéola Congênita)',
      'Trombocitopenia aguda imune pós-exantemática'
    ],
    diferenciais: [
      'Sarampo',
      'Zika',
      'Eritema Infeccioso (Parvovírus B19)'
    ],
    achados_exames: [
      'Leucopenia com contagem plaquetária discretamente reduzida',
      'Anticorpos IgM contra Rubéola positivos por Elisa'
    ],
    criterios_diagnosticos: [
      'Detecção de anticorpos IgM específicos reagentes contra rubéola',
      'Vínculo epidemiológico estabelecido com caso confirmado na área'
    ]
  },
  {
    id: 'A35',
    nome: 'Tétano Acidental',
    sintomas: [
      'Hipertonia e espasmos musculares dolorosos generalizados',
      'Trismo franco e riso sardônico (espasmo muscular facial)',
      'Rigidez de musculatura paravertebral (posição de opistótono)',
      'Espasmos desencadeados por estímulos mínimos sonoros ou luminosos'
    ],
    fatores_risco: [
      'Ferimento penetrante contaminado com terra, fezes ou metal oxidado',
      'Inexistência ou desatualização da vacinação antitetânica (> 10 anos)',
      'Tratamento cirúrgico ou assepsia inadequada pós-ferimento'
    ],
    red_flags: [
      'Incapacidade de deglutir com disfagia importante',
      'Instabilidade autonômica grave (picos pressóricos, arritmias)',
      'Espasmo laringotraqueal silencioso levando a asfixia iminente'
    ],
    diferenciais: [
      'Intoxicação por Estricnina',
      'Reação Extrapiramidal a Metoclopramida',
      'Meningite Bacteriana em fase tardia'
    ],
    achados_exames: [
      'Diagnóstico puramente clínico-epidemiológico (exames normais)',
      'Culturas de swab de ferimento geralmente negativas (baixa utilidade)'
    ],
    criterios_diagnosticos: [
      'Presença de hipertonia contínua com espasmos no contexto de ferimento suspeito',
      'Ausência de confirmação laboratorial necessária para início do tratamento'
    ]
  },
  {
    id: 'B58.9',
    nome: 'Toxoplasmose Aguda',
    sintomas: [
      'Linfadenopatia generalizada bilateral não dolorosa simétrica',
      'Febre baixa ou moderada de caráter prolongado',
      'Mialgia moderada, adinamia e dor de garganta leve',
      'Cefaleia holocraniana contínua'
    ],
    fatores_risco: [
      'Ingestão de carnes cruas ou mal passadas',
      'Contato próximo com fezes de felinos jovens em quintal',
      'Uso de água não fervida bem como vegetais mal higienizados'
    ],
    red_flags: [
      'Acometimento oftálmico com visão embaçada (Coriorretinite retite)',
      'Gestante recém-infetada (risco de malformação congênita)',
      'Cefaleia progressiva severa em portador de HIV (Toxoplasmose cerebral)'
    ],
    diferenciais: [
      'Mononucleose Infecciosa',
      'Linfomas malignos',
      'Doença da Arranhadura do Gato'
    ],
    achados_exames: [
      'Linfocitose leve com raras células atípicas',
      'Sorologia Elisa IgM reagente acentuado com baixa avidez de IgG'
    ],
    criterios_diagnosticos: [
      'Soroconversão de IgG ou presença de anticorpos IgM associados a sintomas',
      'Biópsia linfonodal em casos duvidosos mostrando granulomas típicos'
    ]
  },
  {
    id: 'B57.1',
    nome: 'Doença de Chagas Aguda',
    sintomas: [
      'Febre prolongada diária persistente (> 15 dias)',
      'Sinal de Romaña (edema palpebral unilateral violáceo indolor)',
      'Chagoma de inoculação (lesão cutânea nodular hiperemiada)',
      'Hepatoesplenomegalia e mialgia generalizada'
    ],
    fatores_risco: [
      'Consumo de alimentos triturados sem pasteurização (açaí, cana)',
      'Residência em habitações precárias de taipa (presença de barbeiro)',
      'Histórico de picada ou contato com fezes de triatomíneos'
    ],
    red_flags: [
      'Miocardite aguda grave com insuficiência cardíaca congestiva',
      'Manifestações de meningoencefalite aguda',
      'Arritmias cardíacas severas no eletrocardiograma'
    ],
    diferenciais: [
      'Febre Tifoide',
      'Leishmaniose Visceral',
      'Mononucleose Infecciosa'
    ],
    achados_exames: [
      'Exame de sangue periférico a fresco mostrando Trypanosoma cruzi ativo',
      'Hemograma com linfocitose atípica expressiva'
    ],
    criterios_diagnosticos: [
      'Visualização direta de Trypanosoma cruzi em esfregaço de sangue ou gota espessa',
      'Sorologia IgM anti-T. cruzi reagente em ensaio de imunofluorescência'
    ]
  },
  {
    id: 'B15.9',
    nome: 'Hepatite A Aguda',
    sintomas: [
      'Icterícia de escleras e pele súbita proeminente',
      'Colúria (urina cor de refrigerante de cola)',
      'Acolia fecal (fezes esbranquiçadas pálidas)',
      'Febre súbita, náuseas, vômitos e dor abdominal em andar QSD'
    ],
    fatores_risco: [
      'Baixas condições de saneamento ou água de má qualidade',
      'Consumo de frutos do mar crus coletados de águas poluídas',
      'Creches ou escolas com surto ativo de icterícia'
    ],
    red_flags: [
      'Inotropia ou sangramentos espontâneos (Hepatite Fulminante)',
      'Confusão mental súbita ou encefalopatia hepática severa',
      'Prolongamento expressivo do RNI (> 1.5)'
    ],
    diferenciais: [
      'Hepatite B ou C Aguda',
      'Obstrução de Via Biliar por cálculo',
      'Hepatite Medicamentosa'
    ],
    achados_exames: [
      'Elevação maciça de transaminases (ALT/AST > 1000 U/L)',
      'Aumento expressivo de fosfatase alcalina e bilirrubina direta'
    ],
    criterios_diagnosticos: [
      'Presença de anticorpos IgH anti-HAV específicos reagentes',
      'Clínica de icterícia associada a transaminases muito elevadas'
    ]
  },
  {
    id: 'B16.9',
    nome: 'Hepatite B Aguda',
    sintomas: [
      'Fadiga física extrema prolongada e anorexia',
      'Icterícia de pele e mucosa gradual moderada',
      'Colúria e distensão abdominal leve dolorosa',
      'Artralgias e manifestações exantemáticas precoces papulares'
    ],
    fatores_risco: [
      'Relação sexual sem camisinha com múltiplos parceiros',
      'Compartilhamento de agulhas e seringas ou material cortante',
      'Transmissão perinatal de mãe portadora'
    ],
    red_flags: [
      'Insuficiência hepática aguda com coma hepático de início súbito',
      'Rápido encolhimento de parênquima hepático no ultrassom',
      'Ascite volumosa descompensadora'
    ],
    diferenciais: [
      'Hepatite A e C Agudas',
      'Lupus Eritematoso Sistêmico com acometimento hepático',
      'Febre Amarela'
    ],
    achados_exames: [
      'Presença de Antígeno de Superfície HBsAg detectável no soro comum',
      'Elevação maciça de ALT superior a AST'
    ],
    criterios_diagnosticos: [
      'Detecção simultânea de HBsAg e anticorpo anti-HBc IgM',
      'Histórico epidemiológico de exposição parenteral recente coerente'
    ]
  },
  {
    id: 'B17.1',
    nome: 'Hepatite C Aguda',
    sintomas: [
      'Apresentação clínica predominantemente assintomática (80%)',
      'Fadiga transitória leve e cefaleia ocasional',
      'Náuseas leves e desconforto abdominal discreto em QSD',
      'Icterícia visível apenas em minoria dos casos genéricos'
    ],
    fatores_risco: [
      'Uso de drogas injetáveis ilícitas com agulhas compartilhadas',
      'Tatuagem ou body piercing feitos com material não estéril',
      'Procedimentos cirúrgicos ou hemodiálise sem devida biossegurança'
    ],
    red_flags: [
      'Evolução insidiosa recorrente crônica para cirrose (80% cronificam)',
      'Associação com manifestações extra-hepáticas graves (Vasculite criopática)'
    ],
    diferenciais: [
      'NASH (Esteato-hepatite não alcoólica)',
      'Outras Hepatites Virais Agudas',
      'Doença de Wilson'
    ],
    achados_exames: [
      'Transaminases flutuantes ligeiramente elevadas ou normais',
      'Detecção ativa de RNA do HCV por PCR'
    ],
    criterios_diagnosticos: [
      'Presença de RNA de hepatite C no sangue ativo',
      'Pesquisa de anticorpo Anti-HCV reagente no soro sanguíneo'
    ]
  },
  {
    id: 'A95.9',
    nome: 'Febre Amarela',
    sintomas: [
      'Febre alta de início abrupto com calafrios proeminentes',
      'Cefaleia intensa geral e mialgias generalizadas de forte dor',
      'Sinal de Faget (piora de hipertermia com queda de pulso)',
      'Náuseas frequentes com vômitos alimentares e biliosos'
    ],
    fatores_risco: [
      'Trabalho florestal desprotegido em áreas sob recomendação vacinal',
      'Turistas vindos para ecoparques sem imunização recomendada'
    ],
    red_flags: [
      'Vômitos negros abundantes (por sangramento gástrico - "vômito negro")',
      'Icterícia intensa visível combinada com anúria ou oligúria severas',
      'Hemorragias importantes de múltiplos focos e choque'
    ],
    diferenciais: [
      'Leptospirose',
      'Malária Grave',
      'Dengue Hemorrágica'
    ],
    achados_exames: [
      'Plaquetopenia acentuada e prolongamento do tempo de protrombina',
      'Transaminases no sangue elevadas na casa dos milhares'
    ],
    criterios_diagnosticos: [
      'Sorologia IgM específica para vírus da Febre Amarela positiva',
      'Visualização molecular de RNA viral por técnica de RT-PCR'
    ]
  },
  {
    id: 'A77.0',
    nome: 'Febre Maculosa',
    sintomas: [
      'Febre alta súbita acompanhada de dores musculares intensas',
      'Exantema maculopapular avermelhado tardio que evolui para petéquias',
      'O exantema começa nos punhos e tornozelos e estende-se para o tronco',
      'Cefaleia frontal persistente e prostração severa'
    ],
    fatores_risco: [
      'Contato recente com capivaras ou cavalos em áreas de pastagem',
      'Frequentar parques florestais com presença do Carrapato Estrela',
      'Presença de carrapatos aderidos ao corpo por período prolongado'
    ],
    red_flags: [
      'Manifestações hemorrágicas difusas graves com necrose periférica',
      'Comprometimento neurológico com coma ou sinais focais severos',
      'Insuficiência respiratória aguda ou choque distributivo'
    ],
    diferenciais: [
      'Sepsis Meningocócica',
      'Leptospirose',
      'Dengue Clássica'
    ],
    achados_exames: [
      'Trombocitopenia grave progressiva',
      'Aumento de desidrogenase lática (DHL) e transaminases'
    ],
    criterios_diagnosticos: [
      'Sorologia específica de Rickettsia rickettsii positiva e pareada',
      'Biópsia de lesões cutâneas com imunohistoquímica demonstrando a bactéria'
    ]
  },
  {
    id: 'U07.1',
    nome: 'Covid-19',
    sintomas: [
      'Febre moderada associada a calafrios e fadiga corporal',
      'Tosse seca e dispneia leve a moderada',
      'Anosmia aguda (perda do olfato) e ageusia (perda do paladar)',
      'Cefaleia, dor de garganta intensa e diarreia'
    ],
    fatores_risco: [
      'Insuficiente cobertura de imunização de reforço',
      'Idade avançada superior a 60 anos ou obesidade grave',
      'Cardiopatias graves ou pneumopatias ativas crônicas'
    ],
    red_flags: [
      'Frequência respiratória acelerada (> 24 incursões por minuto)',
      'Saturação periférica de O2 menor ou igual a 93% em ar ambiente',
      'Dor ou pressão persistente na região central do peito'
    ],
    diferenciais: [
      'Gripe Influenza',
      'Resfriado Comum Rinovirus',
      'Pneumoconiose Crônica'
    ],
    achados_exames: [
      'Tomografia de tórax com padrão de vidro fosco periférico bilateral',
      'Linfopenia importante sem leucocitose'
    ],
    criterios_diagnosticos: [
      'Reação de RT-PCR para SARS-CoV-2 positiva em swab nasofaríngeo',
      'Teste rápido de antígeno específico de Covid-19 positivo'
    ]
  },
  {
    id: 'B56.9',
    nome: 'Tripanossomíase Africana (Doença do Sono)',
    sintomas: [
      'Febre intermitente acompanhada de cefaleia intensa',
      'Prurido persistente e linfadenopatia cervical posterior (Sinal de Winterbottom)',
      'Distúrbio progressivo do padrão do sono (sonolência diurna extrema)',
      'Alterações neurológicas de humor, apatia e tremores musculares'
    ],
    fatores_risco: [
      'Trabalho rural ou turismo em áreas de florestas da África Subsaariana',
      'Exposição ativa à picada da mosca Tsé-tsé'
    ],
    red_flags: [
      'Letargia profunda persistente evoluindo para coma definitivo',
      'Deterioração cognitiva severa de progressão rápida',
      'Convulsões motoras tônico-clônicas'
    ],
    diferenciais: [
      'Toxoplasmose cerebral',
      'Meningoencefalite Virótica',
      'Linfoma de hodgkin'
    ],
    achados_exames: [
      'Identificação de Trypanosoma brucei em cancro, líquor ou sangue',
      'Presença importante de plasmócitos no líquor espinhal'
    ],
    criterios_diagnosticos: [
      'Demonstração direta de parasitas em sangue, linfonodos ou líquido cefalorraquidiano',
      'Testes sorológicos de aglutinação de cartão pós-triagem positivos'
    ]
  },
  {
    id: 'B37.0',
    nome: 'Candidíase Oral (Monilíase)',
    sintomas: [
      'Placas brancas algodonosas removíveis em mucosa oral e língua',
      'Sensação de queimação, boca seca e dor à mastigação/deglutição',
      'Presença de fissuras dolorosas no canto da boca (queilite angular)',
      'Gosto metálico desagradável recorrente'
    ],
    fatores_risco: [
      'Uso regular de inaladores de corticoides sem enxágue posterior',
      'Uso prolongado recente de antibióticos orais potentes',
      'Extremo de imunossupressão ou portador de HIV/Aids crônico'
    ],
    red_flags: [
      'Progressão de lesões para região esofágica com disfagia severa',
      'Febre associada à neutropenia proeminente (múltiplos focos de candidíase)'
    ],
    diferenciais: [
      'Leucoplasia Olar Oral',
      'Líquen Plano Oral',
      'Queilite actínica'
    ],
    achados_exames: [
      'pH salivar neutro',
      'Análise de raspado de mucosa corado com KOH evidenciando hifas'
    ],
    criterios_diagnosticos: [
      'Placas brancas típicas friáveis que se desprendem à raspagem revelando base eritematosa',
      'Identificação microscópica de elementos fúngicos em raspado local'
    ]
  },
  {
    id: 'A59.0',
    nome: 'Tricomoníase Urogenital',
    sintomas: [
      'Corrimento vaginal amarelado ou esverdeado abundante e bolhoso',
      'Odor vaginal fétido desagradável ("cheiro de peixe")',
      'Urgência miccional de queimação acompanhada de prurido genital interno',
      'Presença de colo uterino eritematoso com aspecto de morango'
    ],
    fatores_risco: [
      'Histórico de infecções transmissíveis no casal ativo',
      'Práticas e relações sexuais sem utilização de barreiras de látex'
    ],
    red_flags: [
      'Dor pélvica difusa severa indicando infecção ascendente',
      'Associação com rotura prematura de membranas em gestantes'
    ],
    diferenciais: [
      'Vaginose por Gardnerella vaginalis',
      'Candidíase Vulvovaginal',
      'Cistite Aguda Intersticial'
    ],
    achados_exames: [
      'pH vaginal superior a 5.0 proeminente',
      'Presença de protozoários flagelados móveis em exame a fresco'
    ],
    criterios_diagnosticos: [
      'Detecção de Trichomonas vaginalis em microscopia direta recente',
      'Pesquisa em urina por amplificação de ácidos nucleicos positiva'
    ]
  },
  {
    id: 'B55.0',
    nome: 'Leishmaniose Visceral (Calazar)',
    sintomas: [
      'Febre persistente de longa evolução associada a calafrios',
      'Esplenomegalia e hepatomegalia maciças gerando abdômen globoso',
      'Emagrecimento com caquexia extrema e palidez marcante',
      'Hiperpigmentação cutânea difusa acinzentada em face e extremidades'
    ],
    fatores_risco: [
      'Residir em áreas periurbanas com saneamento deficiente e florestas próximas',
      'Presença próxima e abundante de canídeos com sinais clínicos da doença',
      'Alta proliferação peri-domiciliar do flebotomíneo (mosquito-palha)'
    ],
    red_flags: [
      'Hemorragias repetidas de gengivas ou epistaxe volumosa',
      'Febre de caráter refratário com prostração profunda',
      'Sepsis bacteriana secundária a neutropenia profunda'
    ],
    diferenciais: [
      'Esquistossomose Hepatoesplênica',
      'Leucemia Linfocítica Crônica',
      'Febre Tifoide prolongada'
    ],
    achados_exames: [
      'Pancitopenia com anemia, leucopenia e plaquetopenia simultâneas',
      'Inversão notável da relação albumina/globulina (hipergamaglobulinemia)'
    ],
    criterios_diagnosticos: [
      'Demonstração de formas amastigotas de Leishmania em aspirado de medula óssea',
      'Teste rápido imunocromatográfico de antígeno rK39 reagente'
    ]
  },
  {
    id: 'A55',
    nome: 'Linfogranuloma Venéreo',
    sintomas: [
      'Úlcera genital pequena efêmera que desaparece sem deixar cicatriz',
      'Adenoflegmão inguinal unilateral muito inflamatório e doloroso',
      'Fistulização em bico de regador com saída de pus espesso',
      'Proctite purulenta com dor retal marcante em casos de exposição anal'
    ],
    fatores_risco: [
      'Relação anal receptiva desprotegida',
      'Múltiplos parceiros sexuais casuais sem uso de barreira'
    ],
    red_flags: [
      'Estenose e fibrose retal irreversíveis levando a obstipação severa',
      'Elefantíase genital crônica (esciatite decorrente de obstrução linfática)'
    ],
    diferenciais: [
      'Dandrografia de cancroide mole',
      'Hernia inguinal estrangulada',
      'Sífilis Primária Inguinal'
    ],
    achados_exames: [
      'Presença de clamídia detectável em raspado do bulbo',
      'Leucocitose proeminente combinada com aumento de VHS agudo'
    ],
    criterios_diagnosticos: [
      'Pesquisa molecular por PCR positiva para Chlamydia trachomatis sorotipos L1, L2 ou L3',
      'Quadro de linfadenite inguinal supurativa típica e sorologia no soro reagente'
    ]
  },
  {
    id: 'B68.9',
    nome: 'Teníase (Solitária)',
    sintomas: [
      'Eliminação espontânea de proglótides na cueca ou nas fezes',
      'Desconforto epigástrico, náuseas ocasionais e distensão',
      'Alterações do apetite (polifagia intercalada com anorexia)',
      'Irritaçoes anais decorrentes do movimento das proglótides móveis'
    ],
    fatores_risco: [
      'Consumo regular de carne bovina ou suína crua ou mal cozida',
      'Inexistência de fiscalização sanitária em abatedouros locais',
      'Inexistência de rede adequada de tratamento de esgotos'
    ],
    red_flags: [
      'Cefaleia de forte intensidade persistente com convulsões unifocais (Cisticercose)',
      'Eliminação contínua abundante de múltiplos anéis'
    ],
    diferenciais: [
      'Ascaridíase Obstrutiva',
      'Síndrome Dispética Crônica Funcional',
      'Himenolepíase'
    ],
    achados_exames: [
      'Visualização de ovos de Taenia spp. em exame parasitológico de fezes',
      'Eosinofilia moderada a acentuada no hemograma comum'
    ],
    criterios_diagnosticos: [
      'Identificação parasitológica de proglótides gravidas de Taenia solium ou saginata nas fezes',
      'Presença de ovos típicos de tênia no raspado anal (método de fita adesiva)'
    ]
  }
];
