import { MedicalDisease } from '../types';

// Resolving the placeholder declared due to long code structure to avoid transpiler errors
const K522_diferenciais_placeholder: string[] = [
  'Refluxo Gastroesofágico Fisiológico simples',
  'Enterocolite infecciosa bacteriana invasiva',
  'Intolerância primária à lactose neonatal'
];

export const PEDIATRIC_DISEASES: MedicalDisease[] = [
  {
    id: 'J21.9',
    nome: 'Bronquiolite Aguda',
    sintomas: [
      'Taquipneia de início recente precedida de coriza',
      'Tosse seca persistente que piora à noite',
      'Sibilância expiratória e estertores finos bilaterais',
      'Dificuldade para mamar por obstrução nasal'
    ],
    fatores_risco: [
      'Idade menor de 1 ano (principalmente abaixo de 6 meses)',
      'Prematuridade ou cardiopatia congênita',
      'Exposição ao tabagismo passivo domiciliar',
      'Frequentar creche ou ter irmãos em idade escolar'
    ],
    red_flags: [
      'Gemência espiratória, batimento de asa de nariz ou tiragem subcostal',
      'Episódios de apneia (frequente em lactentes jovens)',
      'Saturação de O2 menor que 92% em ar ambiente',
      'Letargia ou recusa total de ingestão de líquidos'
    ],
    diferenciais: [
      'Asma infantil / Primeiro episódio de sibilância',
      'Pneumonia bacteriana primária',
      'Aspiração de corpo estranho'
    ],
    achados_exames: [
      'Hiperinsuflação pulmonar com retificação de costelas ao raio-X',
      'Pesquisa de painel viral positiva para Vírus Sincicial Respiratório (VSR)',
      'Gasometria demonstrando acidose respiratória em casos muito graves'
    ],
    criterios_diagnosticos: [
      'Quadro essencialmente clínico em lactente abaixo de 24 meses com pródromo catarral seguido de taquipneia/sibilância',
      'Ausência de história prévia de asma ou atopia marcante'
    ]
  },
  {
    id: 'J05.0',
    nome: 'Crupe / Laringotraqueíte Viral Aguda',
    sintomas: [
      'Estridor laríngeo predominantemente inspiratório',
      'Tosse metálica característica ("tosse de cachorro")',
      'Rouquidão ou disfonia de início súbito',
      'Febre baixa e obstrução nasal prévia'
    ],
    fatores_risco: [
      'Idade entre 6 meses e 3 anos',
      'Sazonalidade (maior incidência no outono/inverno)',
      'Sexo masculino (maior suscetibilidade anatômica)'
    ],
    red_flags: [
      'Estridor em repouso associado a esforço respiratório acentuado',
      'Palidez cutânea progressiva ou cianose perioral',
      'Agitação psicomotora alternada com sonolência (hipóxia global)',
      'Sinal do lápis grave com estreitamento subglótico acentuado'
    ],
    diferenciais: [
      'Epiglotite aguda (emergência médica gravíssima)',
      'Traqueíte bacteriana',
      'Laringomalácia ou corpo estranho na glote'
    ],
    achados_exames: [
      'Sinal do "lápis" ou da "ogiva" (estreitamento da coluna de ar subglótica) na radiografia cervical posterior',
      'Ausência de leucocitose significativa no hemograma padrão'
    ],
    criterios_diagnosticos: [
      'Diagnóstico essencialmente clínico pela tríade clássica: tosse de cachorro, estridor inspiratório e rouquidão subaguda',
      'Avaliação de gravidade baseada no Escore de Westley'
    ]
  },
  {
    id: 'H66.0',
    nome: 'Otite Média Aguda (OMA)',
    sintomas: [
      'Dor de ouvido intensa (otalgia) demonstrada por choro inconsolável e manipulação ou puxões na orelha afetada',
      'Febre de início rápido e irritabilidade',
      'Diminuição temporária da audição (hipoacusia)',
      'Otorreia purulenta em caso de perfuração timpânica espontânea'
    ],
    fatores_risco: [
      'Uso prolongado de chupeta ou aleitamento em posição supina (deitado)',
      'Hipertrofia de adenoide crônica',
      'Exposição ao fumo passivo',
      'Histórico familiar de recorrência de infecções de ouvido'
    ],
    red_flags: [
      'Abaulamento e hiperemia retroauricular com apagamento do sulco (Mastoidite Aguda)',
      'Paralisia facial ipsilateral periférica recente',
      'Rigidez de nuca ou letargia severa'
    ],
    diferenciais: [
      'Otite Externa Aguda',
      'Disfunção temporomandibular infantil',
      'Dor referida por amigdalite aguda'
    ],
    achados_exames: [
      'Otoscopia evidenciando membrana timpânica opaca, hiperemiada, abaulada com perda irreversível dos pontos de referência anatômicos',
      'Mobilidade timpânica reduzida à otoscopia pneumática'
    ],
    criterios_diagnosticos: [
      'Abaulamento moderado a grave da membrana timpânica OU otorreia não secundária à otite externa',
      'Início recente (menor que 48 horas) de dor de ouvido associada a sinais de efusão na orelha média'
    ]
  },
  {
    id: 'J01.9',
    nome: 'Sinusite Bacteriana Aguda',
    sintomas: [
      'Secreção nasal espessa purulenta unilateral ou bilateral por mais de 10 dias',
      'Obstrução nasal incômoda acompanhada de tosse diurna e noturna',
      'Cefaleia ou dor de pressão facial que piora ao inclinar a cabeça',
      'Febre alta persistente associada por pelo menos 3 dias seguidos'
    ],
    fatores_risco: [
      'Quadro recente de resfriado comum viral mal curado',
      'Rinite alérgica crônica não controlada',
      'Hipertrofia de cornetos nasais ou desvio de septo'
    ],
    red_flags: [
      'Edema, dor ou eritema periorbitário unilateral (risco de celulite orbitária)',
      'Alteração da motilidade ocular ou dor intensa à movimentação do olho',
      'Cefaleia holocraniana excruciante refratária com vômitos em jato'
    ],
    diferenciais: [
      'Rinite viral simples ou resfriado comum prolongado',
      'Rinite alérgica exacerbada',
      'Corpo estranho nasal (especialmente se secreção for fétida e unilateral)'
    ],
    achados_exames: [
      'Leucocitose moderada com neutrofilia no sangue pericárdico',
      'Tomografia computadorizada de seios da face revelando espessamento de mucosa ou nível hidroaéreo (reservado para complicações)'
    ],
    criterios_diagnosticos: [
      'Persistência de sintomas de rinite aguda (tosse e secreção) por mais de 10 dias sem melhoria',
      'Apresentação grave inicial com febre alta associada à secreção purulenta por mais de 3 dias consecutivos'
    ]
  },
  {
    id: 'J03.0',
    nome: 'Amigdalite Estreptocócica',
    sintomas: [
      'Dor de garganta intensa de início súbito com dificuldade de engolir',
      'Febre alta de início abrupto e calafrios',
      'Presença de placas de pus (exsudato purulento) nas tonsilas',
      'Linfonodos cervicais anteriores dolorosos e aumentados de volume'
    ],
    fatores_risco: [
      'Idade escolar entre 5 e 15 anos',
      'Frequência a ambientes fechados com aglomeração (salas de aula)',
      'Contato próximo com pessoa diagnosticada recentemente'
    ],
    red_flags: [
      'Desvio de úvula para o lado oposto com trismo (Abscesso peritonsilar)',
      'Dificuldade grave para abrir a boca ou deglutir a própria saliva',
      'Rigidez de nuca ou rash áspero em lixa espalhado pelo corpo'
    ],
    diferenciais: [
      'Mononucleose Infecciosa (EBV)',
      'Faringite Herpética',
      'Herpangina ou Faringoamigdalite Adenoviral'
    ],
    achados_exames: [
      'Escore de Centor modificado de 3 ou mais pontos',
      'Teste rápido para estreptococo do grupo A (Strep A) positivo',
      'Cultura de swab de garganta com crescimento de Streptococcus pyogenes'
    ],
    criterios_diagnosticos: [
      'Associação de quadro clínico condizente (exsudato tonsilar e adenomegalia dolorosa) com teste rápido de antígeno positivo',
      'Isolamento microbiológico por cultura de swab posterior'
    ]
  },
  {
    id: 'J18.9',
    nome: 'Pneumonia Adquirida na Comunidade Pediátrica',
    sintomas: [
      'Tosse produtiva ou seca persistente',
      'Febre alta com calafrios que demoram a ceder com antipirético',
      'Taquipneia definida por faixa etária pediátrica',
      'Dor torácica de caráter pleurítico (choro ao respirar fundo)'
    ],
    fatores_risco: [
      'Esquema vacinal incompleto (pneumocócica conjugada e pentavalente)',
      'Histórico de desnutrição moderada a grave',
      'Presença de asma ou sibilância de repetição crônica'
    ],
    red_flags: [
      'Tiragem subcostal ou gemência constante em lactentes',
      'Cianose de mucosas ou saturação de oxigênio abaixo de 92%',
      'Recusa de alimentação e líquidos com desidratação clínica óbvia',
      'Sinais radiológicos de derrame pleural volumoso ou pneumatócele'
    ],
    diferenciais: [
      'Gripe / Influenza exacerbada',
      'Bronquiolite viral aguda',
      'Atelectasia pulmonar secundária'
    ],
    achados_exames: [
      'Radiografia de tórax demonstrando consolidação lobar ou broncopneumônica bem definida',
      'Leucocitose neutrofílica importante no hemograma (frequentemente com desvio à esquerda)',
      'Proteína C Reativa (PCR) significativamente elevada no soro'
    ],
    criterios_diagnosticos: [
      'Diagnóstico clínico de taquipneia associada a febre e esforço respiratório nas infâncias',
      'Presença de infiltrado pulmonar novo documentado radiograficamente'
    ]
  },
  {
    id: 'J45.9',
    nome: 'Asma na Infância / Crise Asmática',
    sintomas: [
      'Dispneia sibilante episódica recorrente',
      'Sensação de opressão ou aperto no peito referida pela criança',
      'Tosse seca que piora com o riso, choro ou esforço físico ativo',
      'Desconforto respiratório que melhora agudamente com broncodilatador'
    ],
    fatores_risco: [
      'História pessoal ou familiar próxima de atopia (Dermatite, rinite ou asma)',
      'Exposição domiciliar constante a ácaros, poeira, pelos de gato ou mofo',
      'Episódios frequentes de infecções respiratórias virais nos primeiros anos'
    ],
    red_flags: [
      'Fala entrecortada ou impossibilidade de verbalizar frases inteiras',
      'Tórax silencioso à ausculta pulmonar (broncoespasmo crítico sem fluxo de ar)',
      'Saturação de O2 menor que 90% refratária a oxigênio inicial',
      'Rebaixamento do nível de consciência ou fadiga extrema'
    ],
    diferenciais: [
      'Aspiração aguda de corpo estranho',
      'Laringotraqueíte viral crônica',
      'Traqueomalácia ou anel vascular'
    ],
    achados_exames: [
      'Eosinofilia discreta a moderada no hemograma',
      'Radiografia de tórax demonstrando hiperinsuflação (sem consolidações focais)',
      'Espirometria apresentando distúrbio ventilatório obstrutivo reversível pós-broncodilatador (em crianças maiores de 6 anos)'
    ],
    criterios_diagnosticos: [
      'Histórico de sibilância recorrente associada a fatores precipitantes típicos (alérgenos, infecções, riso ou exercícios)',
      'Resposta clínica nítida e reversibilidade após inalação de beta-2 agonista de curta duração'
    ]
  },
  {
    id: 'A09',
    nome: 'Gastroenterite Aguda Viral (GEA)',
    sintomas: [
      'Vômitos múltiplos iniciais seguidos de diarreia líquida profusa',
      'Cólica abdominal difusa intermitente que precede as evacuações',
      'Febre moderada e inapetência acentuada',
      'Náuseas constantes com recusa alimentar abrupta'
    ],
    fatores_risco: [
      'Frequentar creches ou escolas de educação infantil com fraldários',
      'Ingestão de água ou alimentos manipulados sem higiene adequada',
      'Esquema vacinal de Rotavírus incompleto ou ausente'
    ],
    red_flags: [
      'Olhos fundos, saliva ausente, choro sem lágrimas e turgor cutâneo diminuído (Desidratação Grave)',
      'Letargia acentuada ou incapacidade física de ingerir líquidos por via oral',
      'Piora crônica dos vômitos impedindo totalmente a hidratação oral',
      'Presença de sangue visível em fezes volumosas'
    ],
    diferenciais: [
      'Apendicite aguda precoce',
      'Intussuscepção intestinal',
      'Alergia alimentar aguda de manifestação gastrointestinal'
    ],
    achados_exames: [
      'Pesquisa laboratorial fecal de antígeno para Rotavírus, Adenovírus ou Norovírus positiva',
      'Hemograma típico com padrão predominantemente viral (leucócitos estáveis)'
    ],
    criterios_diagnosticos: [
      'Quadro clínico caracterizado por início agudo de evacuações líquidas recorrentes associado a vômitos e febre baixa',
      'Inexistência de sinais e sintomas sugestivos de infecção invasiva bacteriana (por ex: fezes com pus ou sangue)'
    ]
  },
  {
    id: 'N39.0',
    nome: 'Infecção do Trato Urinário (ITU) em Lactentes/Crianças',
    sintomas: [
      'Febre inexplicada sem foco pulmonar ou de vias aéreas superiores demarcada',
      'Choro persistente ou disúria ao urinar espontaneamente',
      'Urina turva de odor forte característico',
      'Vômitos esporádicos e baixo ganho ponderal ponderado em lactentes'
    ],
    fatores_risco: [
      'Malformações congênitas das vias urinárias (como refluxo vesicoureteral)',
      'Higiene perineal incorreta (limpeza de trás para frente em meninas)',
      'Fimose fisiológica ou patológica em meninos menores de 1 ano'
    ],
    red_flags: [
      'Febre persistente acima de 38,5°C associada a vômitos incoercíveis (Pielonefrite)',
      'Letargia excessiva ou mialgia cutânea sugerindo sepse urinária',
      'Massa palpável no flanco ou distensão abdominal súbita em lactente'
    ],
    diferenciais: [
      'Vulvovaginite fúngica ou química',
      'Oxiuríase com prurido uretral associado',
      'Apófise ou irritação por fralda local'
    ],
    achados_exames: [
      'Urina tipo I (EAS) demonstrando leucocitúria acentuada, nitrito positivo e esterase leucocitária reagente',
      'Crescimento bacteriano de mais de 100.000 UFC/ml na urocultura coletada via cateterismo ou jato médio',
      'Elevação de PCR no soro periférico nos casos de acometimento renal alto'
    ],
    criterios_diagnosticos: [
      'Urocultura positiva com crescimento de patógeno único associada a exame de urina de perfil inflamatório (EAS alterado)',
      'Quadro febril sem causa definida em lactente menor que 2 anos'
    ]
  },
  {
    id: 'J00',
    nome: 'Resfriado Comum / Rinofaringite Aguda',
    sintomas: [
      'Coriza hialina que progride para muco espesso ou amarelado',
      'Obstrução nasal constante levando a sono agitado e desconforto',
      'Tosse predominantemente seca e espirros constantes',
      'Febre baixa de curta duração acompanhada de irritabilidade'
    ],
    fatores_risco: [
      'Exposição diária e rotineira em creches ou pré-escolas',
      'Frequência a locais fechados nos meses de outono e inverno',
      'Ausência ou menor tempo de aleitamento materno exclusivo inicial'
    ],
    red_flags: [
      'Aumento súbito da frequência respiratória para limites de desconforto',
      'Febre alta ressurgindo após 3 a 4 dias de melhora parcial',
      'Recusa persistente de alimentação acompanhada de prostração severa'
    ],
    diferenciais: [
      'Rinite alérgica crônica exacerbada',
      'Sinusite bacteriana precoce',
      'Mononucleose clínica em fase inicial'
    ],
    achados_exames: [
      'Perfil laboratorial e hemograma perfeitamente normais',
      'Ausência de opacidades consolidadas na radiografia de seios (não indicada de rotina)'
    ],
    criterios_diagnosticos: [
      'Diagnóstico clínico caracterizado pela presença de sintomas nasais autolimitados e tosse leve sem comprometimento sistêmico grave',
      'Completa ausência de sinais de complicação bacteriana local ou pneumonia'
    ]
  },
  {
    id: 'J11.1',
    nome: 'Influenza na Infância',
    sintomas: [
      'Febre alta de início súbito acompanhada de calafrios',
      'Dor muscular (mialgia) intensa e prostração limitante',
      'Cefaleia marcante e dor de garganta em crianças maiores',
      'Tosse seca frequente e coriza abundante'
    ],
    fatores_risco: [
      'Vacinação anual contra Influenza ausente ou em atraso',
      'Doenças crônicas de base (asma, diabetes ou cardiopatia pediátrica)',
      'Idade menor de 5 anos (principalmente abaixo de 2 anos)'
    ],
    red_flags: [
      'Dispneia importante ou esforço respiratório com gemência',
      'Incapacidade de reter líquidos oralmente devido a vômitos reflexos',
      'Rebaixamento do nível de consciência, crises convulsivas ou confusão',
      'Febre recorrente que ultrapassa 5 dias de evolução ativa'
    ],
    diferenciais: [
      'COVID-19 ou outros vírus respiratórios agudos',
      'Pneumonia bacteriana atípica inicial',
      'Dengue em fase inicial'
    ],
    achados_exames: [
      'Leucopenia ou linfocitose moderada no hemograma sem neutrofilia',
      'Pesquisa positiva em swab nasofaríngeo por teste molecular ou rápido para Influenza A/B'
    ],
    criterios_diagnosticos: [
      'Quadro febril agudo acompanhado de sintomas respiratórios superiores e mialgia intensa em contexto de circulação do vírus na região',
      'Confirmação virológica específica por swab nasal rápido ou PCR'
    ]
  },
  {
    id: 'B01.9',
    nome: 'Varicela / Catapora',
    sintomas: [
      'Exantema polimórfico (presença simultânea de pápulas, vesículas, pústulas e crostas)',
      'Prurido cutâneo intenso e generalizado nas lesões',
      'Febre moderada concomitante com mal-estar',
      'Anorexia intermitente e prostração leve'
    ],
    fatores_risco: [
      'Crianças não vacinadas contra Varicela ou que receberam apenas 1 dose',
      'Frequentadoras de ambientes escolares sem isolamento de suspeitos',
      'Imunodeficiências congênitas ou adquiridas primárias'
    ],
    red_flags: [
      'Lesões dermatológicas com eritema periférico extenso, calor e pus (Infecção Bacteriana Secundária)',
      'Ataxia, perda de equilíbrio ou vômitos em jato (Cerebelite pós-varicela)',
      'Tosse seca rápida com dispneia progressiva (Pneumonite viral primária)',
      'Sonolência excessiva ou rebaixamento súbito do estado de alerta'
    ],
    diferenciais: [
      'Dermatite herpética infantil disseminada',
      'Prurigo estrófulo (reação a picadas de insetos)',
      'Impetigo bolhoso disseminado'
    ],
    achados_exames: [
      'Hemograma evidenciando leucopenia com linfocitose marginal',
      'Crescimento bacteriano em culturas de secreção de vesículas em caso de suspeita de infecção ativa'
    ],
    criterios_diagnosticos: [
      'Achado característico de lesões vesiculares transparentes em "gotas de orvalho" coexistindo em várias fases de evolução (polimorfismo)',
      'Quadro de prurido e febre sem outros estigmas crônicos'
    ]
  },
  {
    id: 'B08.2',
    nome: 'Roséola Infantil / Exantema Súbito',
    sintomas: [
      'Febre alta contínua com picos de até 39-40°C com duração de 3 a 5 dias que desaparece subitamente',
      'Surgimento súbito de exantema macular ou maculopapular róseo no tronco logo após a queda da febre',
      'Discreto edema palpebral e irritabilidade intensa na fase febril',
      'Linfadenopatia cervical posterior e retroauricular de volume discreto'
    ],
    fatores_risco: [
      'Lactentes e crianças entre 6 meses e 2 anos de idade',
      'Fase de perda dos anticorpos maternos transplacentários',
      'Ambientes de convívio social infantil compartilhado'
    ],
    red_flags: [
      'Crise convulsiva febril que ocorre durante a ascensão rápida da temperatura na fase inicial',
      'Exantema persistindo por mais de 4 dias sem desvanecer espontaneamente',
      'Letargia ou recusa total de deglutição pós-febril'
    ],
    diferenciais: [
      'Farampicilina rashes / Alergia medicamentosa a antibióticos prescritos empiricamente',
      'Rubéola ou sarampo leves',
      'Eritema infeccioso inicial'
    ],
    achados_exames: [
      'Leucopenia importante com linfocitose relativa na fase exantemática',
      'Exames de imagem e renais normais'
    ],
    criterios_diagnosticos: [
      'Clássica história de lactente febril alto que melhora drasticamente do estado geral e, nas horas seguintes ao fim da febre, desenvolve exantema maculopapular macio autolimitado',
      'Identificação etiológica do Herpesvírus Humano 6 (HHV-6) por PCR (raramente indicado)'
    ]
  },
  {
    id: 'B08.4',
    nome: 'Doença Mão-Pé-Boca',
    sintomas: [
      'Vesículas ovais cinzentas dolorosas com halo eritematoso em palmas das mãos e solas dos pés',
      'Lesões papulovesiculares dolorosas nas superfícies extensoras de nádegas e joelhos',
      'Lesões ulceradas dolorosas em mucosa oral anterior e língua (estomatite herpética)',
      'Febre de baixa intensidade e disfagia intensa'
    ],
    fatores_risco: [
      'Crianças menores de 5 anos de idade',
      'Infecção por enterovírus em períodos de verão e outono',
      'Higiene inadequada de superfícies de brinquedos compartilhados'
    ],
    red_flags: [
      'Tremores musculares excessivos ou mioclonias frequentes (risco de encefalomielite por EV-71)',
      'Desidratação devido à incapacidade dolorosa de deglutir líquidos',
      'Dispneia de início abrupto ou sinais clínicos de edema pulmonar neurogênico',
      'Hipotonia muscular flácida ou paralisia aguda de membro'
    ],
    diferenciais: [
      'Gengivoestomatite herpética primária',
      'Herpangina isolada',
      'Erupção por fármacos / Eritema multiforme'
    ],
    achados_exames: [
      'Detecção de vírus Coxsackie A16 ou Enterovírus 71 por PCR em fezes ou swab de mucosa',
      'Hemograma sem anormalidades específicas além de linfocitose flutuante'
    ],
    criterios_diagnosticos: [
      'Quadro tipicamente clínico baseado no achado patognomônico de vesículas em palmas, plantas de pés e boca/garganta em criança pequena febril',
      'Ausência de outros fatores que indiquem reação dermatológica medicamentosa'
    ]
  },
  {
    id: 'L01.0',
    nome: 'Impetigo Pediátrico',
    sintomas: [
      'Lesões cutâneas crostosas de coloração melicérica (semelhantes a mel)',
      'Presença inicial de pequenas vesículas ou pústulas em face (ao redor do nariz e boca)',
      'Prurido leve na região afetada levando a disseminação por coçadura (autoinoculação)',
      'Ausência habitual de dor local intensa ou febre alta inicial'
    ],
    fatores_risco: [
      'Presença de lesões pruriginosas prévias (como picadas de inseto, escabiose ou dermatite)',
      'Higiene corporal deficiente ou banhos pouco frequentes',
      'Clima quente e úmido tropical'
    ],
    red_flags: [
      'Surgimento de urina com cor de refrigerante ou escura semanas após (Glomerulonefrite Pós-Estreptocócica)',
      'Extensão rápida das lesões com formação de bolhas flácidas gigantes (Impetigo Bolhoso/SST-Estafilocócica)',
      'Presença de calor, febre e edema doloroso peri-lesão (Celulite bacteriana associada)'
    ],
    diferenciais: [
      'Herpes Simples Tipo I facial ulcerado',
      'Varicela com lesões restritas',
      'Dermatite atópica infectada secundariamente'
    ],
    achados_exames: [
      'Gram com identificação de cocos Gram-positivos em agrupamentos ou cadeias',
      'Cultura positiva para Staphylococcus aureus ou Streptococcus pyogenes das secreções das crostas',
      'Hematúria e proteinúria no sumário de urina se houver complicação renal'
    ],
    criterios_diagnosticos: [
      'Diagnóstico clínico caracterizado pelas típicas crostas amareladas melicéricas superficiais sobre base eritematosa na face ou extremidades',
      'Melhoria rápida após instituição de terapia antibiótica tópica ou sistêmica apropriada'
    ]
  },
  {
    id: 'L22',
    nome: 'Dermatite de Fraldas (Dermatite Amoniacal)',
    sintomas: [
      'Eritema brilhante confluente em áreas convexas expostas ao contato da fralda',
      'Pele áspera, dolorosa ao toque ou durante a higienização com lenço umedecido',
      'Pápalas ou pequenas erosões eritematosas localizadas',
      'Completa preservação dos sulcos e pregas cutâneas mais profundas'
    ],
    fatores_risco: [
      'Uso continuado prolongado de fraldas molhadas ou sujas por fezes',
      'Higienização agressiva utilizando produtos químicos irritantes ou álcool',
      'Episódios recentes de diarreia volumosa ácida'
    ],
    red_flags: [
      'Eritema intenso envolvendo pregas profundas com pápulas satélites puntiformes (Monilíase/Candidíase de Fraldas)',
      'Surgimento de pústulas ulceradas com crostas melicéricas sobrepostas (Infecção bacteriana secundária)',
      'Ausência completa de resposta após 3 a 5 dias de barreiras protetoras intensas'
    ],
    diferenciais: [
      'Candidíase perineal primária',
      'Psoríase na área de fraldas',
      'Histiocitose de células de Langerhans (raro, mimetiza seborreia crônica)'
    ],
    achados_exames: [
      'Diagnóstico essencialmente clínico dispensando qualquer investigação laboratorial complementar nas formas comuns'
    ],
    criterios_diagnosticos: [
      'Visualização de lesões puramente eritematosas poupando as pregas cutâneas sob a área de contato da fralda',
      'História de eliminação frequente de fezes ácidas ou desleixo na troca frequente'
    ]
  },
  {
    id: 'L20.9',
    nome: 'Dermatite Atópica Infantil',
    sintomas: [
      'Prurido cutâneo persistente severo que piora após banhos quentes',
      'Lesões eritematosas, descamativas, por vezes exsudativas nas bochechas e superfícies extensoras (em lactentes)',
      'Placas liquenificadas, secas nas dobras cubitais e poplíteas (em crianças maiores)',
      'Ressecamento cutâneo generalizado (xerose cutânea)'
    ],
    fatores_risco: [
      'Histórico familiar próximo de asma brônquica ou rinite alérgica crônica',
      'Uso diário frequente de sabonetes perfumados ou banhos longos e muito quentes',
      'Exposição precoce a alimentos altamente alergênicos sem barreira intestinal'
    ],
    red_flags: [
      'Visualização de vesículas agrupadas dolorosas sobre as placas secas (Eczema Herpético / Erupção de Kaposi)',
      'Presença de secreção amarelada purulenta e crostas indicando infecção estafilocócica secundária',
      'Eritrodermia esfoliativa cobrindo mais de 90% da superfície corporal afetada'
    ],
    diferenciais: [
      'Dermatite seborreica infantil crônica',
      'Alergia alimentar por hipersensibilidade imediata',
      'Escabiose atípica generalizada'
    ],
    achados_exames: [
      'Elevação marcante de IgE total sérica periférica',
      'Eosinofilia circulante moderada na análise do hemograma completo'
    ],
    criterios_diagnosticos: [
      'Presença constante de prurido intenso associado a pelo menos 3 critérios adicionais: envolvimento de flexuras, história de atopia pessoal ou familiar, xerose generalizada ou início das lesões antes dos 2 anos de idade (Critérios de Hanifin e Rajka)'
    ]
  },
  {
    id: 'B86',
    nome: 'Escabiose na Infância (Sarna)',
    sintomas: [
      'Prurido corporal generalizado de forte intensidade que se exacerba dramaticamente no período noturno',
      'Lesões papulomajoradas, pápulo-vesículas e túneis lineares na pele',
      'Acometimento cutâneo preferencial em espaços interdigitais, punhos, axilas, região periumbilical e genitália',
      'Nódulos eritematosos pruriginosos em axilas e bolsa escrotal (formas nodulares típicas em crianças)'
    ],
    fatores_risco: [
      'Hábito de coabitação em orfanatos, abrigos ou creches superlotadas',
      'Contato corporal íntimo ou compartilhamento de roupas de cama infectadas',
      'Falta de tratamento simultâneo de todos os contactantes domiciliares'
    ],
    red_flags: [
      'Eritrodermia com crostas espessas hiperqueratósicas generalizadas (Escabiose Crostosa ou Norueguesa em imunodeprimidos)',
      'Infecção secundária extensa com celulite bacteriana focal e febre associada',
      'Impetiginização maciça das lesões por coçadura impiedosa'
    ],
    diferenciais: [
      'Dermatite atópica ativa',
      'Prurigo estrófulo agudo',
      'Histiocitose cutânea ou foliculite generalizada'
    ],
    achados_exames: [
      'Visualização microscópica direta do ácaro Sarcoptes scabiei, ovos ou fezes (escíbalas) em raspado de lesão de túnel ativo',
      'Hemograma demonstrando eosinofilia secundária'
    ],
    criterios_diagnosticos: [
      'Prurido que piora à noite associado a lesões papulovesiculosas com distribuição anatômica típica em mãos, punhos e dobras corporais',
      'História residencial confirmada de prurido semelhante de outros parentes próximos'
    ]
  },
  {
    id: 'B27.9',
    nome: 'Mononucleose Infecciosa',
    sintomas: [
      'Febre persistente que pode durar mais de 10 dias seguidos',
      'Fadiga extrema limitante e astenia prolongada',
      'Faringite crônica recoberta de exsudato membranoso espesso cinza',
      'Linfadenopatia generalizada acentuada (preferencialmente cadeia cervical posterior)'
    ],
    fatores_risco: [
      'Idade escolar pré-adolescente ou adolescentes expostos',
      'Transmissão por gotículas através do contato com saliva'
    ],
    red_flags: [
      'Dor súbita excruciante em quadrante superior esquerdo (Ruptura Esplênica por esplenomegalia)',
      'Estridor laríngeo e dificuldade de engolir a própria saliva devido ao inchaço das amígdalas (Obstrução de VAS)',
      'Icterícia moderada a importante e colúria urinária'
    ],
    diferenciais: [
      'Faringoamigdalite bacteriana estreptocócica purulenta',
      'Infecção aguda pelo Toxoplasma gondii',
      'Infecção primária aguda pelo vírus HIV'
    ],
    achados_exames: [
      'Leucocitose importante com presença marcante de linfócitos atípicos (> 10%) no hemograma',
      'Elevação discreta a moderada de transaminases hepáticas (TGO e TGP)',
      'Sorologia para Epstein-Barr (IgM VCA) positiva ou anticorpos heterófilos reagentes (Monoteste)'
    ],
    criterios_diagnosticos: [
      'Presença de faringite, febre prolongada e linfadenopatia cervical posterior documentada',
      'Achado de linfocitose com atipia celular acentuada no esfregaço periférico'
    ]
  },
  {
    id: 'B26.9',
    nome: 'Caxumba / Parotidite Epidêmica',
    sintomas: [
      'Abaulamento e dor importante uni ou bilateral à palpação da glândula parótida',
      'Desconforto doloroso acentuado ao mastigar ou deglutir alimentos ácidos',
      'Febre de moderada intensidade e perda de apetite',
      'Cefaleia de leve intensidade e mialgia cervical discreta'
    ],
    fatores_risco: [
      'Ausência de vacinação protetora ou esquema incompleto da Tríplice Viral',
      'Contato íntimo recente com indivíduo infectado na escola ou lar',
      'Surtos sazonais na infância tardia'
    ],
    red_flags: [
      'Dor abdominal intensa, náuseas e vômitos persistentes (Pancreatite Aguda por Caxumba)',
      'Dor e edema agudo testicular unilateral em meninos pós-púberes (Orquiepididimite)',
      'Cefaleia holocraniana grave com vômitos e rigidez de nuca (Meningite asséptica)',
      'Ototoxicidade unilateral com perda auditiva neurosensorial aguda'
    ],
    diferenciais: [
      'Sialolitíase obstrutiva bacteriana local',
      'Linfadenite cervical de grande volume',
      'Parotidite supurativa bacteriana aguda'
    ],
    achados_exames: [
      'Amilase sérica marcadamente elevada no sangue periférico',
      'Sorologia IgM anti-Caxumba positiva por ELISA',
      'Hemograma de perfil predominantemente linfocítico viral'
    ],
    criterios_diagnosticos: [
      'Aumento agudo doloroso da glândula parótida sem outra causa mecânica ou bacteriana aparente',
      'Sorologia específica reagente ou isolamento por swab de saliva por PCR'
    ]
  },
  {
    id: 'A37.9',
    nome: 'Coqueluche / Tosse Comprida',
    sintomas: [
      'Tosse paroxística (acessos incontroláveis e sequenciais de tosse seca sem respirar entre eles)',
      'Guincho inspiratório (som agudo ao fim do acesso de paroxismo)',
      'Vômitos pós-tosse decorrentes de esforço mecânico respiratório',
      'Fase catarral inicial leve que progride para os paroxismos sem febre'
    ],
    fatores_risco: [
      'Falta de vacinação ou esquema incompleto da DTP-Pentavalente',
      'Lactentes menores de 6 meses expostos a adultos tosseiros crônicos não vacinados com dTpa'
    ],
    red_flags: [
      'Cerne azul ou cianose perioral importante durante os paroxismos de tosse',
      'Apneia prolongada ou crises de sufocação inexplicada (lactentes jovens)',
      'Instalação de convulsões pós-crise de tosse (Encefalopatia por Coqueluche)'
    ],
    diferenciais: [
      'Infecção por Mycoplasma pneumoniae ou Chlamydia/Chlamydophila',
      'Infecção aguda grave por Adenovírus respiratório',
      'Aspiração de corpo estranho nas vias aéreas altas'
    ],
    achados_exames: [
      'Leucocitose severa extrema no sangue periférico (> 20.000 a 50.000/mm³) com linfocitose absoluta marcante',
      'Pesquisa molecular por PCR positiva para Bordetella pertussis no swab nasofaríngeo',
      'Cultura favorável em meio de Bordet-Gengou positiva'
    ],
    criterios_diagnosticos: [
      'Quadro de tosse por pelo menos 14 dias caracterizado por paroxismos, guincho inspiratório típico ou vômitos pós-tosse sem outra causa definida',
      'Detecção por PCR positiva específica para B. pertussis'
    ]
  },
  {
    id: 'K52.2',
    nome: 'Alergia à Proteína do Leite de Vaca (APLV)',
    sintomas: [
      'Evacuação com estrias de sangue vermelho vivo misturadas ao muco em lactentes clinicamente bem (Proctocolite)',
      'Regurgitações frequentes e vômitos após as mamadas associados a irritabilidade e choro crônico',
      'Urticária aguda cutânea ou placas eritematosas após ingestão de fórmula baseada em leite',
      'Baixo ganho de peso progressivo inexplicado na vigência de fórmulas lácteas normais'
    ],
    fatores_risco: [
      'Introdução precoce desnecessária de leite de vaca ou fórmula na maternidade',
      'Historial de pai, mãe ou irmão com atopia de forte apresentação clínica',
      'Parto cesárea alterando colonização normal de microbiota neonatal'
    ],
    red_flags: [
      'Vômitos incoercíveis severos seguidos de letargia expressiva e hipotensão (Síndrome FPIES - Enterocolite induzida)',
      'Anafilaxia grave imediata com estridor expiratório ou colapso circulatório precoce',
      'Anemia por sangramento intestinal contínuo de perfil microcítico hipocrômico'
    ],
    diferenciais: K522_diferenciais_placeholder,
    achados_exames: [
      'Presença de eosinófilos e sangue oculto no exame de fezes',
      'Pesquisa de IgE específica sérica e teste cutâneo (Prick Test) positivos (apenas para formas IgE-mediadas)',
      'Hemoglobina marginalmente deprimida indicando perda oculta crônica'
    ],
    criterios_diagnosticos: [
      'Regressão completa dos sintomas intestinais ou dermatológicos após exclusão completa da PLV da dieta da mãe e lactente',
      'Recorrência documentada dos sintomas basais sob teste de provocação oral supervisionado'
    ]
  },
  {
    id: 'K21.9',
    nome: 'Refluxo Gastroesofágico Pediátrico',
    sintomas: [
      'Regurgitação frequente e indolor de alimentos contendo leite por várias vezes ao dia',
      'Sorrisos e ganho ponderal excelentes apesar das constantes golfadas ("Golfador feliz")',
      'Irritabilidade moderada pré ou pós-prandial curta',
      'Ausência de sintomas gerais como febre, diarreia ou má absorção'
    ],
    fatores_risco: [
      'Imaturidade anatômica normal do esfíncter esofágico inferior do recém-nascido',
      'Volume alimentar excessivo ofertado nas mamadas por via de mamadeira',
      'Manipulação inadequada pós-mamada mantendo o bebê na horizontal imediatamente'
    ],
    red_flags: [
      'Vômitos de coloração biliar (esverdeados) ou sanguinolenta (risco de estenose ou obstrução intestinal)',
      'Irritabilidade grave com arqueamento das costas durante as mamadas (Síndrome de Sandifer)',
      'Perda de peso progressiva ou estagnação da curva de crescimento',
      'Sintomas respiratórios de repetição como apneias, sibilância intratável ou pneumonias por broncoaspiração'
    ],
    diferenciais: [
      'Estenose hipertrófica do piloro (vômitos em jato em lactente jovem)',
      'Alergia à Proteína do Leite de Vaca (inflamatório)',
      'Malformações congênitas intestinais rotacionais'
    ],
    achados_exames: [
      'Exames complementares dispensáveis para o Refluxo Fisiológico',
      'pHmetria ou impedanciometria esofágica de 24h demonstrando episódios excessivos de refluxo ácido (indicado se suspeita de Doença do Refluxo)'
    ],
    criterios_diagnosticos: [
      'Lactente entre 3 e 12 meses saudável com histórico de regurgitação frequente (pelo menos duas vezes ao dia por mais de 3 semanas) sem sinais de desnutrição ou complicações respiratórias secundárias',
      'Ausência de estigmas sistêmicos infecciosos ou inflamatórios'
    ]
  },
  {
    id: 'K59.0',
    nome: 'Constipação Intestinal Funcional',
    sintomas: [
      'Menos de 2 evacuações por semana voluntárias',
      'Fezes excessivamente endurecidas, volumosas ou em formato de pequenas esferas ("cabrito")',
      'Dor importante e choro intenso durante a tentativa de evacuar',
      'Comportamento de retenção (criança cruza as pernas ou esconde-se nos cantos durante os espasmos intestinais)'
    ],
    fatores_risco: [
      'Treinamento inadequado de controle de esfíncteres ("desfralde") feito sob pressão excessiva',
      'Alimentação pobre em fibras, verduras e ingestão de líquidos deprimida',
      'Início recente da vida escolar (fuga do uso do vaso sanitário público)'
    ],
    red_flags: [
      'Atraso na eliminação de mecônio na maternidade (superior a 48 horas após nascimento)',
      'Fezes em formato estreito de fita associada a vômitos recorrentes e distensão marcante',
      'Hipotonia do esfíncter anal ou ausência de reflexo cutâneo local',
      'Desnutrição progressiva ou falha profunda no ganho de peso'
    ],
    diferenciais: [
      'Doença de Hirschsprung (Megacólon Congênito)',
      'Hipotireoidismo congênito ou adquirido na infância',
      'Estreitamento anal anatômico residual estenótico'
    ],
    achados_exames: [
      'Radiografia de abdome demonstrando grande quantidade de fezes retidas em ampola retal (indicado se exame físico difícil)',
      'Toque retal com ampola cheia de fezes macias nas formas funcionais (por oposição à vazia na Hirschsprung)'
    ],
    criterios_diagnosticos: [
      'Atendimento aos Critérios de Roma IV para constipação funcional com sintomas persistentes por pelo menos 1 mês em lactentes ou crianças maiores',
      'Descarte cuidadoso de todas as causas orgânicas ou anatômicas subjacentes'
    ]
  },
  {
    id: 'A38',
    nome: 'Escarlatina',
    sintomas: [
      'Exantema micropapular áspero que mimetiza uma lixa ao toque da pele',
      'Exantema vermelho-vivo que poupa a região ao redor da boca (sinal de Filatov)',
      'Língua com aspecto de morango inicialmente branco que evolui para morango vermelho intenso',
      'Febre alta de início abrupto e odinofagia intensa'
    ],
    fatores_risco: [
      'Crianças em idade de convívio escolar (principalmente dos 3 aos 12 anos)',
      'Histórico recente de amigdalite ou faringite estreptocócica sem tratamento adequado',
      'Período do ano correspondente ao inverno e primavera'
    ],
    red_flags: [
      'Pele descolando em grandes lâminas com dor intensa ou bolhas',
      'Febre que se recusa a declinar associada a dor torácica ou mialgia severa',
      'Plaquetose, vasculite ou dor articular grave pós-escarlatina'
    ],
    diferenciais: [
      'Doença de Kawasaki (apresentação clínica bocal/cutânea similar)',
      'Síndrome do choque tóxico estreptocócico ou estafilocócico',
      'Mononucleose com exantema induzido por amoxicilina'
    ],
    achados_exames: [
      'Crescimento de Streptococcus pyogenes no swab amigdaliano',
      'Leucocitose neutrofílica importante associada a elevação de reagentes de fase aguda',
      'Elevação de anticorpos anti-estreptolisina O (ASLO) em exames convalescentes'
    ],
    criterios_diagnosticos: [
      'Associação típica de faringotonsilite estreptocócica com exantema áspero em lixa de coloração vermelha brilhante',
      'Sinal de Pastia (linhas vermelhas acentuadas nas dobras cutâneas que não desaparecem à digitopressão)'
    ]
  },
  {
    id: 'D50.9',
    nome: 'Anemia Ferropriva na Infância',
    sintomas: [
      'Palidez cutâneo-mucosa progressiva',
      'Fadiga física inexplicada, desânimo ou falta de apetite',
      'Comportamento do apetite depravado ou pica (hábito de comer terra, giz ou gelo)',
      'Déficit cognitivo, falta de concentração e lentidão psicomotora'
    ],
    fatores_risco: [
      'Aleitamento materno não exclusivo com introdução precoce de leite de vaca integral',
      'Ausência ou falha na suplementação preventiva rotineira de ferro na infância',
      'Dieta monótona baseada estritamente em carboidratos e pobre em carnes e ferro hemínico'
    ],
    red_flags: [
      'Palidez de extrema gravidade com sonolência extrema ou letargia ao despertar',
      'Presença de taquicardia persistente no repouso ou sopro cardíaco sistêmico de alto débito',
      'Sinais clínicos de sangramento digestivo oculto ou visivelmente crônico'
    ],
    diferenciais: [
      'Traço Talassêmico Beta ou Alfa (anemia microcítica sem queda do ferro)',
      'Anemia de doença inflamatória crônica pediátrica',
      'Intoxicação crônica por chumbo (saturnismo)'
    ],
    achados_exames: [
      'Hemograma mostrando hemoglobina reduzida com microcitose acentuada (VGM muito baixo) e hipocromia marcante (CHGM reduzido)',
      'Índice de RDW de perfil tipicamente elevado (anisocitose marcada)',
      'Ferritina sérica depletada de níveis severamente reduzidos (< 12-15 mcg/L)'
    ],
    criterios_diagnosticos: [
      'Queda de hemoglobina abaixo do limite normal padrão para a idade geriátrica associada a parâmetros de estoque de ferro (Ferritina) diminuídos',
      'Melhora nítida documentada e elevação dos níveis reticulocitários em 1 a 2 semanas após reposição medicamentosa de ferro (terapêutica diagnóstica)'
    ]
  },
  {
    id: 'A07.1',
    nome: 'Parasitose por Giardíase',
    sintomas: [
      'Diarreia crônica ou intermitente com fezes volumosas de odor fétido e aparência gordurosa (esteatorreia)',
      'Distensão abdominal importante e eliminação excessiva de flatos',
      'Náuseas frequentes, episódios de vômitos matinais e anorexia',
      'Perda de peso progressiva ou déficit marcante no ganho ponderal da criança'
    ],
    fatores_risco: [
      'Consumo rotineiro de águas de poços ou córregos sem filtragem adequada',
      'Falta de lavagem correta de mãos e de frutas e verduras cruas de forma sistemática',
      'Frequentar creches ou abrigos coletivos com inadequada troca de fraldas'
    ],
    red_flags: [
      'Desnutrição profunda (síndrome de má absorção generalizada) com perda grave de massa muscular',
      'Desidratação refratária com distúrbios de eletrólitos associados',
      'Urticária persistente incomum ou artrite reativa ligada à infecção parasitária'
    ],
    diferenciais: [
      'Doença Celíaca pediátrica',
      'Intolerância adquirida irreversível à lactose',
      'Síndrome do Intestino Irritável pediátrica'
    ],
    achados_exames: [
      'Encontro de cistos ou trofozoítas de Giardia lamblia no exame protoparasitológico de fezes (método de coleta seriada aumenta positividade)',
      'Pesquisa laboratorial direta de antígeno de Giardia nas fezes positiva por ELISA de sensibilidade elevada'
    ],
    criterios_diagnosticos: [
      'Documentação laboratorial microscópica de cistos em exames coprológicos seriados',
      'Histórico de diarreia espumosa duradoura com esteatorreia e grande queixa de gases'
    ]
  },
  {
    id: 'R56.0',
    nome: 'Convulsão Febril Simples',
    sintomas: [
      'Crise convulsiva generalizada tônico-clônica de curta duração (menor que 15 minutos)',
      'Perda súbita da consciência associada a reviramento ocular e salivação imediata',
      'Ocorrência estrita durante episódios de febre rápida (> 38°C)',
      'Período pós-ictal de sonolência curto com rápida recuperação do estado geral básico'
    ],
    fatores_risco: [
      'Idade típica compreendida entre 6 meses e 5 anos',
      'História familiar direta na infância de crises convulsivas febris',
      'Ascensão vertiginosa da temperatura corporal em infecções agudas comuns'
    ],
    red_flags: [
      'Duração da crise convulsiva de forma contínua excedendo 15 minutos (Crise Complexa ou de Longo Cursor)',
      'Manifestação de crise de perfil focal (abalos rápidos restritos a apenas um lado do corpo)',
      'Déficit motor novo instalado após a resolução da crise (Paralisia de Todd)',
      'Mais de um episódio de crise ocorrendo no mesmo intervalo de 24 horas febris'
    ],
    diferenciais: [
      'Meningite bacteriana aguda infecciosa',
      'Encefalite primária viral ativa',
      'Epilepsia idiopática de manifestação precoce'
    ],
    achados_exames: [
      'Hemograma de perfil normal ou infeccioso conforme o foco original da febre',
      'Eletroencefalograma (EEG) e exames de imagem normais (não recomendados se crise simples)'
    ],
    criterios_diagnosticos: [
      'Crise convulsiva generalizada única com duração inferior a 15 minutos associada a quadro febril em criança de 6 a 60 meses',
      'Ausência de infecção neurológica central (sinais meníngeos negativos) ou distúrbios metabólicos sistêmicos graves demonstrando o quadro'
    ]
  },
  {
    id: 'M12.9',
    nome: 'Sinovite Transitória do Quadril',
    sintomas: [
      'Início súbito de claudicação inexplicada ("mancar") em criança previamente saudável',
      'Dor referida no quadril acometido ou na face anterior da coxa e joelho',
      'Restrição dolorosa da mobilidade do quadril (especialmente na rotação interna)',
      'Preservação do estado geral básico e febre ausente ou muito discreta'
    ],
    fatores_risco: [
      'Histórico recente de infecção de vias aéreas superiores viral em 1 a 2 semanas antes',
      'Idade preferencial compreendida entre 3 e 8 anos',
      'Atividades físicas normais ativas de corrida recentes'
    ],
    red_flags: [
      'Aparecimento de febre moderada a persistente associada à incapacidade absoluta de apoiar o pé no chão (Artrite Séptica)',
      'Dor que acorda a criança no meio da noite sugerindo processo neoplásico',
      'Acometimento articular persistente por mais de 10 dias seguidos de claudicação progresiva'
    ],
    diferenciais: [
      'Artrite Séptica bacteriana de quadril (emergência cirúrgica)',
      'Doença de Legg-Calvé-Perthes (Necrose avascular da cabeça de fêmur)',
      'Epifisiólise proximal do fêmur'
    ],
    achados_exames: [
      'Ultrassonografia de quadril revelando derrame articular mínimo de perfil anecoico',
      'Hemograma de contagem normal e marcadores inflamatórios (VHS e PCR) baixos ou normais'
    ],
    criterios_diagnosticos: [
      'Quadro de dor aguda e claudicação autolimitada em quadril sem manifestações de sepse celular',
      'Ultrassonografia evidenciando derrame de pequeno volume com rápida regressão sob uso de repouso e analgésico comum'
    ]
  },
  {
    id: 'H10.9',
    nome: 'Conjuntivite Bacteriana Pediátrica',
    sintomas: [
      'Hiperemia da conjuntiva escleral de início agudo',
      'Secreção ocular mucopurulenta espessa e amarelada abundante',
      'Palpebras "coladas" ao despertar pela manhã devido ao acúmulo de crostas',
      'Sensação moderada de corpo estranho, ardência ou prurido local'
    ],
    fatores_risco: [
      'Infecção respiratória superior concomitante ou recente',
      'Falta de lavagem de mãos adequada no ambiente de creches',
      'Obstrução congênita das vias lacrimais em lactentes menores de 6 meses'
    ],
    red_flags: [
      'Diminuição marcante e perceptível da acuidade visual ou pupilas anormais',
      'Edema periorbitário progressivo, dor intensa ao movimentar o globo ocular (Celulite orbitária)',
      'Secreção purulenta hiperaguda volumosa em recém-nascido (Ophthalmia neonatorum gonocócica)'
    ],
    diferenciais: [
      'Conjuntivite Viral por Adenovírus',
      'Conjuntivite Alérgica sazonal',
      'Corpo estranho corneano unilateral'
    ],
    achados_exames: [
      'Exame de cultura de swab de secreção conjuntival positivo (reservado para recidivas ou casos graves)',
      'Coloração de Gram do raspado de conjuntiva mostrando cocos ou bacilos bacterianos'
    ],
    criterios_diagnosticos: [
      'Presença de vermelhidão ocular bilateral ou unilateral associada à abundante secreção purulenta espessa amarelada de surgimento agudo',
      'Melhoria rápida do quadro geral após início de colírios antibióticos tópicos de largo espectro'
    ]
  },
  {
    id: 'J02.9',
    nome: 'Faringite Viral',
    sintomas: [
      'Dor de garganta de intensidade leve de instalação insidiosa',
      'Presença concomitante de tosses, espirros, coriza nasal ou rouquidão',
      'Eritema amigdaliano difuso e de mucosa faríngea sem placas de pus',
      'Febre de baixa intensidade e mal-estar'
    ],
    fatores_risco: [
      'Sazonalidade típica de outono e inverno',
      'Contato próximo com familiares que apresentam sintomas gripais',
      'Idade menor que 3 anos (amigdalite estreptocócica é incomum abaixo desta idade)'
    ],
    red_flags: [
      'Estridor laríngeo, letargia intensa ou dispneia',
      'Recusa completa de ingestão de líquidos de hidratação básica levando a sinais de desidratação clínica',
      'Febre severa persistente por mais de 5 dias sem foco'
    ],
    diferenciais: [
      'Faringoamigdalite estreptocócica bacteriana',
      'Mononucleose infecciosa clínica',
      'Herpangina fustigante'
    ],
    achados_exames: [
      'Ausência de leucocitose neutrofílica substancial no hemograma',
      'Teste rápido Strep A negativo nas tonsilas'
    ],
    criterios_diagnosticos: [
      'Quadro inflamatório de garganta associado a manifestações respiratórias virais óbvias (tosse, coriza ou obstrução nasal)',
      'Completa ausência de exsudato purulento em tonsilas e linfonodo satélite cervicais palpáveis dolorosos importantes'
    ]
  },
  {
    id: 'K12.0',
    nome: 'Estomatite Aftosa Recorrente',
    sintomas: [
      'Múltiplas úlceras mucosas orais amareladas redondas e rasas com halo eritematoso',
      'Dor intensa local que se agrava ao contato com alimentos ácidos ou salgados',
      'Dificuldade para mastigar ou deglutir alimentos normais, xerostomia e sialorreia',
      'Ausência completa de febre, prostração grave ou linfadenite cervical anterior'
    ],
    fatores_risco: [
      'Predisposição genética de história familiar recorrente',
      'Déficits de vitaminas do complexo B, ferro ou ácido fólico na dieta',
      'Pequenos traumatismos mecânicos orais causados por escovação agressiva'
    ],
    red_flags: [
      'Úlceras de diâmetro anormalmente gigante (> 1 cm) que demoram mais de 4 semanas para cicatrizar (formas major de Sutton)',
      'Presença concomitante de úlceras genitais ou oculares agudas (Doença de Behçet)',
      'Diante de febres recorrentes periódicas de início exato (Síndrome PFAPA)'
    ],
    diferenciais: [
      'Gengivoestomatite herpética primária (cursa com gengivite inflamatória e febre)',
      'Herpangina ou Doença Mão-Pé-Boca de manifestações restritas',
      'Pênfigo mucoso pediátrico crônico'
    ],
    achados_exames: [
      'Níveis normais de exames hematológicos rotineiros',
      'Pesquisas de anticorpos e sorologias negativas nas formas puras'
    ],
    criterios_diagnosticos: [
      'Aparecimento recorrente de úlceras orais típicas discretas autolimitadas (cicatrização em 7 a 10 dias) sem sintomas de manifestação sistêmica ou febres adicionais',
      'Exame odontológico e clínico compatíveis'
    ]
  },
  {
    id: 'J38.5',
    nome: 'Crupe Espasmódico (Laringite Estridulosa)',
    sintomas: [
      'Aparecimento abrupto de estridor inspiratório e tosse rouca metálica durante a noite',
      'Ausência completa de febre inicial ou pródromos catarrais gripais expressivos',
      'Criança acorda assustada, chorando com dispneia importante subitamente',
      'Melhoria rápida e expressiva dos sintomas ao entrar em contato com o ar frio externo'
    ],
    fatores_risco: [
      'Histórico pessoal próximo de atopia (rinite ou asma brônquica)',
      'Idade recorrente padrão entre 1 e 3 anos',
      'Presença de refluxo gastroesofágico associado que predispõe à irritação laríngea'
    ],
    red_flags: [
      'Persistência do estridor em repouso mesmo após inalações e corticoterapia',
      'Cianose perioral importante com rebaixamento e exaustão do esforço respiratório',
      'Manifestações respiratórias persistentes durante o período diurno subsequente'
    ],
    diferenciais: [
      'Laringotraqueíte viral aguda de perfil infecioso',
      'Aspiração de corpo estranho supraglótico',
      'Epiglotite aguda fulminante'
    ],
    achados_exames: [
      'Laringoscopia direta revelando apenas edema pálido de pregas vocais (raramente indicada de rotina)',
      'Exames de imagem cervical sem estenoses estruturais consolidadas'
    ],
    criterios_diagnosticos: [
      'História de crises noturnas rápidas e recorrentes de tosse metálica e estridor em criança sem quadro febril',
      'Rápida resolução do episódio inicial fustigante após exposição a névoas de vapor ou de ar úmido'
    ]
  },
  {
    id: 'N04.9',
    nome: 'Síndrome Nefrótica na Infância (Doença de Lesões Mínimas)',
    sintomas: [
      'Edema periorbitário importante ("olhos inchados") de predomínio matinal',
      'Edema progressivo de membros inferiores bilateral, ascite volumosa e anasarca',
      'Urina de aparência extremamente espumosa devido à perda de proteínas',
      'Ganho rápido de peso decorrente da retenção maciça de líquidos'
    ],
    fatores_risco: [
      'Idade típica de apresentação compreendida entre 2 e 6 anos',
      'Histórico de rinite crônica ou predisposição atópica associada',
      'Gênero masculino (maior prevalência na primeira infância)'
    ],
    red_flags: [
      'Dor abdominal difusa súbita acompanhada de febre alta (Peritonite Bacteriana Espontânea por pneumococo)',
      'Dispneia súbita com dor torácica aguda (Tromboembolismo Pulmonar por estado hipercoagulante)',
      'Oligoanúria severa refratária com uremia elevada'
    ],
    diferenciais: [
      'Síndrome Nefrítica Aguda (cursa com hematúria e hipertensão)',
      'Glomerulonefrite aguda pós-estreptocócica (GNPE)',
      'Insuficiência cardíaca ou hepática pediátrica'
    ],
    achados_exames: [
      'Presença de proteinúria maciça (relação proteína/creatinina urinária > 2 mg/mg em amostra única)',
      'Hipoalbuminemia importante no soro periférico (< 2,5 g/dL)',
      'Dislipidemia severa com elevação marcante do colesterol total e triglicerídeos'
    ],
    criterios_diagnosticos: [
      'Presença da tétrade clínica e laboratorial patognomônica: edema generalizado grave, proteinúria de faixa nefrótica confirmada, hipoalbuminemia e hiperlipidemia acentuada',
      'Completa ausência de estigmas sistêmicos de lúpus ou outras nefropatias secundárias'
    ]
  },
  {
    id: 'A36.2',
    nome: 'Crupe por Corynebacterium diphtheriae (Difteria)',
    sintomas: [
      'Placas pseudomembranosas cinza-azuladas aderentes fétidas em tonsilas e faringe',
      'Agressivo edema cervical periglandular conferindo aspecto de "pescoço de touro"',
      'Febre moderada a alta de início insidioso com prostração severa',
      'Tosse metálica progressiva com estridor inspiratório de difícil alívio'
    ],
    fatores_risco: [
      'Completa ausência de imunização contra Difteria (vacina Pentavalente/DTP em atraso)',
      'Habitar zonas de extrema vulnerabilidade social e superlotação residencial',
      'Contato próximo conhecido com caso ativo'
    ],
    red_flags: [
      'Obstrução de VAS aguda letal por deslocamento das membranas da faringe',
      'Miocardite tóxica precoce com arritmias graves e insuficiência cardíaca refratária',
      'Paralisia velofaringóidea com regurgitação nasal líquida (Neuropatia diftérica)'
    ],
    diferenciais: [
      'Faringoamigdalite estreptocócica grave',
      'Crupe viral comum severo',
      'Angina de Plaut-Vincent'
    ],
    achados_exames: [
      'Visualização microscópica de bacilos Gram-positivos pleomórficos em forma de clava ao Gram',
      'Cultura positiva com crescimento de C. diphtheriae em meio de Löeffler ou ágar Telurito de Potássio',
      'Eletrocardiograma (ECG) mostrando prolongamento de intervalo PR ou arritmias'
    ],
    criterios_diagnosticos: [
      'Presença de quadro clínico clássico de amigdalite membranosa aderente, estridor ou pescoço de touro em paciente vulnerável não vacinado',
      'Resultado de cultura específico confirmando o bacilo diftérico toxigênico'
    ]
  },
  {
    id: 'A87.9',
    nome: 'Meningite Viral na Infância',
    sintomas: [
      'Febre de surgimento agudo acompanhada de cefaleia holocraniana intensa',
      'Rigidez na movimentação cervical (nuca dolorosa) em crianças maiores',
      'Náuseas recorrentes acompanhadas de vômitos que aliviam pouco a dor',
      'Fotofobia ocular intensa acompanhada de mialgias generalizadas'
    ],
    fatores_risco: [
      'Lactentes e crianças no período de verão e outono',
      'Hospedeiro em contexto epidêmico de infecções por enterovírus',
      'Falha na lavagem de mãos após trocas de fraldas contaminadas'
    ],
    red_flags: [
      'Rebaixamento agudo do nível de consciência ou letargia excessiva refratária',
      'Aparecimento de convulsões repetitivas ou déficits focais novos',
      'Instalação rápida de petéquias ou sufusões hemorrágicas na pele'
    ],
    diferenciais: [
      'Meningite bacteriana purulenta (emergência clínica imediata)',
      'Encefalite herpética primária',
      'Hemofilia ou hemorragias subaracnóideas'
    ],
    achados_exames: [
      'Análise do líquido cefalorraquidiano (LCR) demonstrando pleocitose linfocítica (predomínio de células mononucleares), glicose líquorica normal e proteína ligeiramente deprimida',
      'PCR em amostra de líquor positiva para Enterovírus ou herpes vírus (HSV)',
      'Hemograma mostrando leucócitos estáveis ou discretamente linfocíticos'
    ],
    criterios_diagnosticos: [
      'LCR de perfil tipicamente inflamatório séptico-séptico (ausência de bactérias no Gram e glicose rigorosamente normal)',
      'Sintomas meníngeos clássicos de evolução benigna autolimitada sob repouso e analgesia sintomática'
    ]
  },
  {
    id: 'A39.0',
    nome: 'Meningococcemia / Meningite Meningocócica',
    sintomas: [
      'Febre alta abrupta severa com rápida prostração e calafrios intensos',
      'Petéquias puntiformes purpúreas de rápida progressão para sufusões equimóticas extensas',
      'Cefaleia excruciante acompanhada de rigidez de nuca precoce marcante',
      'Vômitos múltiplos em jato e irritabilidade extrema ao toque'
    ],
    fatores_risco: [
      'Esquema vacinal de Meningocócicas (A, C, W, Y ou B) em atraso ou ausente',
      'Idade crítica de risco abaixo dos 2 anos e adolescentes expostos',
      'Habitar ambientes escolares ou dormitórios fechados superlotados'
    ],
    red_flags: [
      'Instabilidade hemodinâmica crítica com choque distributivo inicial rápido',
      'Sufusões purpúricas em face ou tórax com gangrena periférica rápida (Purpura Fulminans)',
      'Rebaixamento do nível de consciência progredindo para o coma profundo precoce',
      'Sinal de Kernig e Brudzinski fortemente reagentes associados'
    ],
    diferenciais: [
      'Meningite viral asséptica bacterioide na infância',
      'Púrpura de Henoch-Schönlein (não cursa com febre alta e prostração severa)',
      'Febre Maculosa das Montanhas Rochosas'
    ],
    achados_exames: [
      'Análise de líquor (LCR) revelando pleocitose neutrofílica extrema (> 1.000/mm³), hiperproteinorquia severa e glicose líquorica consumida (< 20 mg/dL)',
      'Bacterioscopia do sedimento líquorico (Gram) revelando diplococos Gram-negativos intracelulares',
      'Hemocultura ou PCR específicas de sangue total reagentes para Neisseria meningitidis'
    ],
    criterios_diagnosticos: [
      'Quadro purpúrico febril clássico associado a meningite aguda bacterioide documentada',
      'Isolamento ou identificação molecular de N. meningitidis em amostras estéreis de sangue ou líquor'
    ]
  },
  {
    id: 'M30.3',
    nome: 'Doença de Kawasaki',
    sintomas: [
      'Febre persistente alta durando exatamente 5 dias ou mais sem outra causa óbvia',
      'Injeção conjuntival bilateral não purulenta ocular bilateral',
      'Alterações em cavidade oral (língua em morango vermelho, fissuras labiais)',
      'Alterações em extremidades (eritema ou edema de mãos e pés que descama tardiamente)'
    ],
    fatores_risco: [
      'Crianças descendentes de asiáticos ou menores de 5 anos',
      'Exposição imunológica a precipitante desconhecido'
    ],
    red_flags: [
      'Taquicardia excessiva desproporcional à febre indicando miocardite',
      'Abaulamento coronariano ou aneurisma de artéria coronária na ecocardiografia',
      'Irritabilidade extrema e choro inconsolável que persiste pós-febril'
    ],
    diferenciais: [
      'Escarlatina por Streptococcus',
      'Mononucleose infecciosa purulenta',
      'Síndrome Inflamatória Multissistêmica Pediátrica (SIM-P)'
    ],
    achados_exames: [
      'Elevação extrema e mantida de PCR e VHS séricos',
      'Plaquetose marcante reacional desenvolvida na segunda semana de evolução',
      'Ecocardiograma bidimensional demonstrando ectasias vasculares coronarianas'
    ],
    criterios_diagnosticos: [
      'Febre alta por no mínimo 5 dias acompanhada de pelo menos 4 dos 5 critérios clínicos clássicos (conjuntivite bilateral, alterações labio-orais, adenomegalia cervical, exantema polimórfico, descamação distal de extremidades)',
      'Ausência de outro diagnóstico que justifique as manifestações'
    ]
  },
  {
    id: 'B05.9',
    nome: 'Sarampo',
    sintomas: [
      'Tosse seca intensa acompanhada de coriza acentuada e conjuntivite fotofóbica (Tríade clássica)',
      'Pequenos pontos brancos na mucosa oral interna (Sinal de Koplik)',
      'Exantema maculopapular avermelhado confluente com início atrás das orelhas progredindo craniocaudal',
      'Febre alta contínua debilitante com prostração severa'
    ],
    fatores_risco: [
      'Ausência do esquema oportuno da vacina Tríplice Viral',
      'Zonas urbanas expostas a surtos pós-importação viral',
      'Viagem internacional recente sem comprovação imunitária'
    ],
    red_flags: [
      'Dispneia importante com taquipneia súbita (Pneumonia primária ou secundária letal)',
      'Diarreia volumosa crônica com desnutrição subsequente severa',
      'Sonolência extrema ou convulsões inexplicáveis (Encefalite por sarampo)'
    ],
    diferenciais: [
      'Rubéola clássica (exantema mais suave com linfonodos proeminentes)',
      'Escarlatina micropapular áspera',
      'Reação de hipersensibilidade alérgica medicamentosa'
    ],
    achados_exames: [
      'Leucopenia importante com plaquetopenia do sangue periférico',
      'Sorologia IgM específica para Sarampo positiva por método ELISA',
      'PCR em swab nasofaríngeo ou urina confirmando o genoma viral'
    ],
    criterios_diagnosticos: [
      'Presença de febre alta acompanhada da tríade catarral típica e exantema de progressão craniocaudal, associados ao Sinal de Koplik patognomônico',
      'Confirmação sorológica positiva de anticorpos específicos'
    ]
  },
  {
    id: 'B06.9',
    nome: 'Rubéola',
    sintomas: [
      'Exantema maculopapular róseo discreto não confluente iniciando em face e descendo rápido',
      'Linfadenopatia retroauricular, occipital e cervical posterior dolorosa característica',
      'Febre baixa concomitante e dor de garganta suave',
      'Mialgias sutis e discreta injeção ocular bilateral'
    ],
    fatores_risco: [
      'Uso incompleto ou recusa da vacina Tríplice Viral',
      'Idade escolar ou adolescentes expostos'
    ],
    red_flags: [
      'Surgimento em gestante (Morte fetal ou Síndrome da Rubéola Congênita gravíssima)',
      'Petéquias secundárias devido a trombocitopenia imune transitória pós-viral',
      'Artralgia ou artrite que dure semanas em meninas maiores'
    ],
    diferenciais: [
      'Sarampo em fases leves',
      'Exantema súbito (roséola) de evolução estrita',
      'Mononucleose exantemática'
    ],
    achados_exames: [
      'Resultados de hemograma normal ou leucopenia transitória',
      'Pesquisa de anticorpos específicos IgM anti-Rubéola reagente no soro'
    ],
    criterios_diagnosticos: [
      'Quadro exantemático de distribuição craniocaudal rápida associada a proeminentes linfadenopatias retroauriculares e occipitais dolorosas em paciente vulnerável',
      'Confirmação por marcador sorológico específico reagente'
    ]
  },
  {
    id: 'B08.3',
    nome: 'Eritema Infeccioso (Megaloeritema)',
    sintomas: [
      'Eritema brilhante nas bochechas poupando região perioral ("bochecha esbofeteada")',
      'Exantema rendilhado ou eritematoso em rendas localizado no tronco e superfícies extensoras',
      'Instabilidade do exantema (surgimento ou piora após banhos quentes ou calor local)',
      'Ausência habitual de febre ou sintomas respiratórios sistêmicos na fase exantemática'
    ],
    fatores_risco: [
      'Idade típica escolar compreendida entre 4 e 10 anos',
      'Infecção pelo Parvovírus B19 circulante na primavera'
    ],
    red_flags: [
      'Palidez inexplicada com fadiga extrema em portador de anemia falciforme (Crise Aplásica Grave)',
      'Artrite simétrica persistente em pequenas articulações em adolescentes expostas',
      'Gestante contactante cursando com risco de hidropisia fetal severa'
    ],
    diferenciais: [
      'Lupus Eritematoso Sistêmico (rash malar fotossensível)',
      'Dermatite de fricção mecânica localizada',
      'Urticária aguda de cursor curto'
    ],
    achados_exames: [
      'Queda severa de reticulócitos periféricos em exames se houver defeito hemolítico prévio',
      'Sorologia IgM sérica para Parvovírus B19 reagente'
    ],
    criterios_diagnosticos: [
      'Aparência característica de "bochechas esbofeteadas" unida ao exantema em padrão rendilhado autolimitado sem prurido excessivo ou prostração',
      'Sorologia de perfil específico confirmada laboratorialmente'
    ]
  },
  {
    id: 'B85.0',
    nome: 'Pediculose da Cabeça',
    sintomas: [
      'Prurido intenso constante localizado no couro cabeludo (especialmente regiões occipital e retroauricular)',
      'Presença visível de lendas (pequenos ovos brancos ovais presos firmemente ao fio de cabelo)',
      'Pápulas eritematosas inflamatórias decorrentes de picadas repetidas do inseto',
      'Escarificações e crostas secundárias decorrentes de coçadura intensa'
    ],
    fatores_risco: [
      'Crianças de idade escolar primária com cabelos longos',
      'Compartilhamento de escovas de cabelo, bonés, faixas ou travesseiros infectados',
      'Presença de caso ativo próximo sem tratamento conjunto'
    ],
    red_flags: [
      'Surgimento de adenopatia cervical dolorosa espessa com secreção purulenta no couro (Infecção Secundária / Impetigo)',
      'Áreas de alopecia traumática por coçadura obsessiva crônica'
    ],
    diferenciais: [
      'Dermatite seborreica crônica de couro (falsa lêndea fácil de destacar com o dedo)',
      'Infecção fúngica de couro cabeludo (Tinea capitis)',
      'Psoríase de couro cabeludo'
    ],
    achados_exames: [
      'Visualização direta de lêndeas viáveis ou do piolho adulto (Pediculus humanus capitis) sob pente fino',
      'Investigação laboratorial inteiramente dispensável'
    ],
    criterios_diagnosticos: [
      'Achado microscópico ou visual macroscópico de lêndeas ou parasitas vivos firmemente agarrados à haste capilar occipital',
      'Presença de prurido reacional típico sem anormalidades de descamação basal'
    ]
  },
  {
    id: 'L21.0',
    nome: 'Dermatite Seborreica do Lactente',
    sintomas: [
      'Crostas gordurosas amareladas aderentes espessas no couro cabeludo ("crosta láctea")',
      'Eritema descamativo suave poupando prurido extenso na região de face anterior e pregas auriculares',
      'Início das lesões nas primeiras semanas pós-nascimento',
      'Excelente estado geral básico e completa ausência de sofrimento por coceira'
    ],
    fatores_risco: [
      'Período neonatal e lactentes jovens abaixo dos 3 meses de vida',
      'Estimulação hormonal materna residual nas glândulas sebáceas do bebê'
    ],
    red_flags: [
      'Extensão maciça generalizada das lesões exsudativas com diarreia intratável (Síndrome de Leiner / Deficiência de C3)',
      'Presença de fissuras dolorosas infectadas que exsudam material purulento'
    ],
    diferenciais: [
      'Dermatite descamativa atópica precoce (cursa com prurido intenso)',
      'Psoríase infantil do lactente',
      'Histiocitose profunda'
    ],
    achados_exames: [
      'Investigação laboratorial inteiramente indesejada em quadros leves normais'
    ],
    criterios_diagnosticos: [
      'Instalação de crostas seborreicas untuosas amareladas em couro cabeludo e face de lactente jovem sem queixa de coceira importante',
      'Rápido alívio local com óleos minerais emolientes comuns e higiene suave de pontas'
    ]
  },
  {
    id: 'M00.9',
    nome: 'Artrite Séptica Pediátrica',
    sintomas: [
      'Dor articular intensa súbita com incapacidade absoluta de movimentar o membro afetado (pseudoparalisia)',
      'Articulação afetada edemaciada, intensamente quente, avermelhada com limitação de arco',
      'Febre alta de surgimento agudo com calafrios e tremores marcantes',
      'Irritabilidade extrema, choro forte ao menor toque na articulação'
    ],
    fatores_risco: [
      'Artrócito ou focos de infecção hematogênica bacteriana a distância',
      'Idade menor de 3 anos (gênero masculino preferencial)',
      'Histórico de trauma articular local leve recente'
    ],
    red_flags: [
      'Instalação em quadril ou joelho (destruição de cartilagem articular rápida em 24-48 horas)',
      'Sinais clínicos precoces de sepse sistêmica com instabilidade hemodinâmica distributiva',
      'Subluxação mecânica de quadril observada ao exame físico ou Rx de emergência'
    ],
    diferenciais: [
      'Sinovite transitória de quadril ou joelho de perfil viral',
      'Osteomielite aguda bacteriana metafisária adjacente',
      'Febre Reumática aguda poliarticular migratória'
    ],
    achados_exames: [
      'Ultrassonografia articular revelando derrame de moderado a grande volume com debris e espessamento sinovial',
      'Leucocitose importante com grande desvio à esquerda e marcadores de fase aguda (VHS/PCR) severamente elevados',
      'Análise de líquido sinovial (punção de emergência) mostrando celularidade > 50.000/mm³ com amplo predomínio de polimorfonucleares e Gram positivo'
    ],
    criterios_diagnosticos: [
      'Punção guiada positiva para material turvo ou purulento na cavidade articular associado à manifestações febris',
      'Cumprimento clínico de critérios de Kocher aplicados ao quadril'
    ]
  },
  {
    id: 'M86.9',
    nome: 'Osteomielite Aguda na Infância',
    sintomas: [
      'Dor óssea localizada contínua de forte intensidade focal que piora ao menor movimento',
      'Claudicação importante ou recusa absoluta de apoiar do peso na perna afetada',
      'Sensibilidade local severa e bem delimitada à palpação profunda óssea metafisária',
      'Febre alta constante, calafrios e prostração física proeminente'
    ],
    fatores_risco: [
      'Traumatismo ósseo rombo local recente predispõe a foco embólico hematogênico',
      'Focos de piodermite extensa bacteriana cutânea recente (impetigos ou furúnculos)',
      'Doença falciforme predispõe a infecção óssea frequente por Salmonella'
    ],
    red_flags: [
      'Disseminação de infecção para a articulação vizinha levando a artrite osteoarticular destrutiva',
      'Estágios tardios com flutuação local e fístula cutânea drenando líquido purulento',
      'Sinais clínicos de sepse bacterêmica generalizada'
    ],
    diferenciais: [
      'Artrite séptica bacteriana primária',
      'Dores de crescimento benignas',
      'Osteosarcoma ou sarcoma de Ewing (processos neoplásicos crônicos)'
    ],
    achados_exames: [
      'Hemoculturas colhidas de emergência positivas em mais de 50% dos casos',
      'Mielograma, ressonância magnética óssea (exame de alta escolha) revelando edema e abscesso subperiosteal inicial precoce',
      'Cintilografia óssea com tecnécio demonstrando hipercaptação focal metafisária'
    ],
    criterios_diagnosticos: [
      'Apresentação clínica de dor localizada metafisária óssea contínua associada a febre e alteração inflamatória importante local',
      'Identificação por ressonância magnética ou documentação de patógeno bacteriano via biópsia ou hemocultura'
    ]
  },
  {
    id: 'K35.8',
    nome: 'Apendicite Aguda na Infância',
    sintomas: [
      'Dor abdominal de início periumbilical ou epigástrico que migra para fossa ilíaca direita (FID)',
      'Vômitos subsequentes associados à anorexia e dor',
      'Febre de baixa intensidade que surge de forma tardia',
      'Dificuldade para andar, erguendo a perna direita ou mancando de dor'
    ],
    fatores_risco: [
      'Crianças em idade escolar tardia (rara abaixo dos 2 anos, mas com diagnóstico mais difícil e maior índice de ruptura nesta fase)',
      'Hiperplasia linfoide cecal reacional'
    ],
    red_flags: [
      'Dor súbita difusa intensa com abdome "em tábua" e descompressão positiva (Peritonite por Ruptura)',
      'Aparecimento de diarreia fétida volumosa com choque refratário sugerindo sepse peritoneal',
      'Placa ou massa palpável endurecida em fossa ilíaca direita (Plastrão apendicular)'
    ],
    diferenciais: [
      'Adenite mesentérica viral reacional (muito comum após IVAS)',
      'Gastroenterite aguda febril',
      'Cólica de ureter ou cisto de ovário torcido em meninas'
    ],
    achados_exames: [
      'Sinal de Blumberg, Rovsing e Psoas positivos ao detalhado exame físico abdominal em crianças maiores',
      'Ultrassonografia abdominal de emergência demonstrando apêndice de diâmetro > 6 mm, aperistáltico e com parede espessada',
      'Acentuada leucocitose neutrofílica com desvio à esquerda e PCR elevada'
    ],
    criterios_diagnosticos: [
      'Quadro doloroso progressivo abdominal sugestivo associado a sinais ultrassonográficos ou tomográficos inequívocos',
      'Utilização de escores clínicos pediátricos (Escore de Alvarado ou PAS) acima de 7 pontos com indicação cirúrgica'
    ]
  },
  {
    id: 'K56.1',
    nome: 'Intussuscepção Intestinal (Invaginação Intestinal)',
    sintomas: [
      'Dor abdominal em cólica intensa, súbita, intermitente (criança chora e encolhe as pernas por minutos, intercalada por episódios de calmaria e letargia)',
      'Vômitos recorrentes iniciais alimentares que evoluem para biliares esverdeados',
      'Fezes com muco e sangue com consistência de "geleia de amora" clássica',
      'Massa abdominal de formato tubular alongada ("em salsicha") palpável preferencialmente em hipocôndrio direito'
    ],
    fatores_risco: [
      'Lactentes entre 5 e 10 meses de vida (principalmente masculinos)',
      'Infecção gastrointestinal ou linfadenite mesentérica viral recente (servindo como ponto de partida mecânico)'
    ],
    red_flags: [
      'Abdome agudamente distendido com timpanismo difuso e dor ao toque (Peritonite / Isquemia intestinal)',
      'Letargia profunda alternando com estado de choque hemodinâmico distributivo-volêmico',
      'Sangramento anal volumoso incontrolável'
    ],
    diferenciais: [
      'Gastroenterite invasiva aguda bacteriana',
      'Apendicite aguda precoce',
      'Divertículo de Meckel sangrante'
    ],
    achados_exames: [
      'Ultrassonografia abdominal revelando imagem patognomônica em "alvo" no corte transversal e sinal do "pseudorrim" no longitudinal',
      'Radiografia de abdome mostrando sinal do menisco ou ausência de gás em fossa ilíaca direita'
    ],
    criterios_diagnosticos: [
      'Histórico clínico típico de cólicas paroxísticas severas intercaladas com sonolência associadas a fezes gelatinosas sanguinolentas',
      'Confirmação por ultrassonografia revelando intussuscepção reversível ou requerendo enema pneumático/hidrostático diagnóstico e terapêutico'
    ]
  },
  {
    id: 'Q40.0',
    nome: 'Estenose Hipertrófica do Piloro',
    sintomas: [
      'Vômitos em jato vigorosos, não-biliosos (claros ou leitosos), ocorrendo imediatamente pós-mamada',
      'Criança faminta logo após vomitar ("fome voraz" reiniciando a mamada)',
      'Perda de peso involuntária rápida de surgimento neonatal com desidratação',
      'Ondas peristálticas visíveis na parede abdominal superior em direção ao abdome distal pós-alimentação'
    ],
    fatores_risco: [
      'Lactentes jovens entre a 2ª e a 6ª semana de vida pós-natal',
      'Sexo masculino (proporção 4-5:1 com preferência em primogênitos)',
      'Exposição ao uso recente de macrolídeos (eritromicina) nas primeiras semanas'
    ],
    red_flags: [
      'Alcalose metabólica hipoclorêmica e hipocalêmica grave decorrente de vômitos gástricos incoercíveis',
      'Desidratação de perfil grave com letargia excessiva ou colapso circulatório neonatal',
      'Abaulamento gástrico visível importante com risco de aspiração de vômito em jato'
    ],
    diferenciais: [
      'Refluxo gastroesofágico fisiológico leve do lactente',
      'Erros inatos do metabolismo de apresentação neonatal',
      'Hiperplasia adrenal congênita com perda de sal'
    ],
    achados_exames: [
      'Palpação da parede abdominal revelando oliva pilórica (pequena massa firme em forma de azeitona em quadrante superior direito)',
      'Ultrassonografia abdominal revelando espessamento do canal pilórico (> 3-4 mm) e comprimento aumentado do canal (> 15-17 mm)',
      'Gasometria venosa com caracterização de alcalose metabólica severa'
    ],
    criterios_diagnosticos: [
      'Vômitos vigorosos sistemáticos em jato não-biliosos em lactente de 2 a 8 semanas',
      'Sinais ultrassonográficos típicos de espessamento e alongamento do músculo pilórico'
    ]
  },
  {
    id: 'Q43.1',
    nome: 'Megacólon Congênito (Doença de Hirschsprung)',
    sintomas: [
      'Atraso na eliminação do mecônio superior a 48 horas após nascimento na maternidade',
      'Distensão abdominal crônica e progressiva com timpanismo difuso',
      'Vômitos de repetição de conteúdo alimentar ou biliar verde',
      'Constipação obstinada extrema refratária de início muito precoce'
    ],
    fatores_risco: [
      'Histórico familiar positivo de Hirschsprung na infância',
      'Associação genética descrita com Síndrome de Down',
      'Gênero masculino (susceptibilidade clássica aumentada)'
    ],
    red_flags: [
      'Diarreia fétida explosiva acompanhada de febre e sepse (Enterocolite de Hirschsprung - risco letal alto)',
      'Distensão abdominal crítica dolorosa com perfuração cecal evidenciando pneumoperitônio',
      'Desnutrição profunda por má tolerância alimentar generalizada'
    ],
    diferenciais: [
      'Constipação intestinal funcional precoce',
      'Íleo meconial por fibrose cística',
      'Atresia ou estenose colônica anatômica'
    ],
    achados_exames: [
      'Enema opaco de cólon revelando zona de transição pilórica estreita com dilatação proximal proeminente do cólon',
      'Manometria anorretal mostrando ausência de relaxamento do reflexo inibitório retanal (RIRA)',
      'Biópsia retal por sucção de padrão-ouro revelando completa ausência de células ganglionares nos plexos neuronais mucosos'
    ],
    criterios_diagnosticos: [
      'Histórico de atraso meconial associado a obstrução crônica precoce e cólon sem reflexo normal',
      'Confirmação histológica patológica por biópsia demonstrando ausência de plexos de Meissner e Auerbach com aumento compensatório de fibras colinérgicas grossas'
    ]
  },
  {
    id: 'K40.9',
    nome: 'Hérnia Inguinal Encarcerada em Lactente',
    sintomas: [
      'Aparecimento de abaulamento tenso e endurecido doloroso na região inguinal ou escrotal',
      'Choro inconsolável súbito de forte intensidade associado a recusa de colo',
      'Náuseas frequentes que evoluem para vômitos recorrentes secundários',
      'Incapacidade mecânica de reduzir digitalmente o abaulamento de forma suave'
    ],
    fatores_risco: [
      'Idade de lactente jovem menor de 6 meses (janela de maior fragilidade herniária)',
      'Prematuridade com persistência do conduto peritônio-vaginal patente',
      'Gênero masculino com descida testicular recente'
    ],
    red_flags: [
      'Abaulamento com coloração arroxeada, hiperemiada ou edemaciada na virilha (Hérnia Estrangulada / Isquemia)',
      'Sinais clínicos de obstrução de alça intestinal com parada de eliminação de mecônio/gases',
      'Choque endotóxico secundário a necrose de alça de intestino'
    ],
    diferenciais: [
      'Pedículo de hidrocele volumosa simples não comunicante indolor',
      'Torção testicular aguda intra-escrotal',
      'Linfadenite inguinal supurada localizada'
    ],
    achados_exames: [
      'Ultrassonografia inguinal demonstrando a presença de alça intestinal ou conteúdo herniado com sinais de aprisionamento e ausência de fluxo arterial ao doppler',
      'Radiografia com níveis hidroaéreos obstrutivos se houver sofrimento prolongado'
    ],
    criterios_diagnosticos: [
      'Presença de abaulamento doloroso e irredutível ao exame clínico de emergência na virilha de recém-nascido',
      'Sinais clínicos de sofrimento de parede de alça de intestino na ultrassonografia'
    ]
  }
];
