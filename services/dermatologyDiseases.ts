import { MedicalDisease } from '../types';

export const DERMATOLOGY_DISEASES: Omit<MedicalDisease, 'achados_exames' | 'criterios_diagnosticos'>[] = [
  {
    id: 'L70.0',
    nome: 'Acne Vulgar',
    sintomas: [
      'Comedões abertos (pontos pretos) e fechados (pontos brancos)',
      'Pápulas inflamatórias eritematosas e dolorosas',
      'Pústulas localizadas no folículo',
      'Nódulos e cistos profundos dolorosos em casos graves',
      'Pele acentuadamente seborreica no rosto, colo e dorso'
    ],
    fatores_risco: [
      'Faixa etária juvenil / puberdade e adolescência',
      'Flutuações hormonais (ciclo menstrual, síndrome do ovário policístico)',
      'Dieta de alto índice glicêmico ou alto consumo de lácteos',
      'Uso continuado de corticoides orais ou tópicos de alta potência',
      'Estresse psicológico e episódios de privação de sono'
    ],
    red_flags: [
      'Acne fulminans com sintomas sistêmicos agudos (febre, poliartrite)',
      'Cicatrizes profundas retráteis em rápida evolução desfigurante',
      'Sinais rápidos de virilização em mulheres (hirsutismo severo, alopecia, alteração vocal)'
    ],
    diferenciais: [
      'Rosácea pápulo-pustulosa',
      'Foliculite por Malassezia (fúngica)',
      'Dermatite perioral',
      'Erupção acneiforme induzida por medicamentos'
    ]
  },
  {
    id: 'L20.9',
    nome: 'Dermatite Atópica',
    sintomas: [
      'Prurido intenso, muitas vezes espasmódico e noturno',
      'Placas eritemato-descamativas em áreas flexurais (dobras antecubitais, poplíteas e cervicais)',
      'Xerose cutânea (pele intensamente ressecada de caráter crônico)',
      'Liquenificação da pele por ato crônico de coçadura',
      'Dermatite facial no lactente com acometimento proeminente das bochechas'
    ],
    fatores_risco: [
      'Histórico familiar ou pessoal de atopia (asma brônquica, rinite alérgica)',
      'Mutações hereditárias no gene da filagrina (disfunção na barreira)',
      'Clima seco e frio com baixa umidade relativa do ar',
      'Uso excessivo de sabonetes detergentes e banhos quentes demorados'
    ],
    red_flags: [
      'Eczema herpético (infecção secundária pelo vírus herpes simples disseminada)',
      'Impetiginização secundária generalizada (crostas melicéricas e purulentas extensas)',
      'Eritrodermia esfoliativa cobrindo mais de 90% da superfície corpórea com instabilidade térmica'
    ],
    diferenciais: [
      'Dermatite seborreica severa',
      'Dermatite de contato alérgica',
      'Escabiose',
      'Linfoma cutâneo de células T (micose fungoide precoce)'
    ]
  },
  {
    id: 'L23.9',
    nome: 'Dermatite de Contato Alérgica',
    sintomas: [
      'Eritema, edema e prurido intenso na área diretamente exposta',
      'Formação de vesículas ou bolhas locorregionais e quebra-se fácil',
      'Sensação de ardência ou queimação local',
      'Padrão geométrico ou linear correspondente ao objeto causador'
    ],
    fatores_risco: [
      'Exposição ocupacional a agentes sensibilizantes (cabeleireiros, construção civil)',
      'Uso frequente de joias contendo níquel ou cobalto',
      'Aplicação de cosméticos com fragrâncias e conservantes artificiais',
      'Sensibilização anterior a plantas alergênicas ou medicamentos tópicos'
    ],
    red_flags: [
      'Disseminação generalizada lesional (autoeczematização)',
      'Infecção bacteriana secundária severa (erisipela ou celulite associadas em MMII)',
      'Acometimento de mucosa ocular, bucal ou genital com dor grave'
    ],
    diferenciais: [
      'Dermatite atópica',
      'Fitofotodermatite',
      'Erisipela inicial',
      'Dermatite de contato irritativa primária'
    ]
  },
  {
    id: 'L21.9',
    nome: 'Dermatite Seborreica',
    sintomas: [
      'Placas eritematosas com descamação amarelada gordurosa/oleosa',
      'Acometimento clássico do couro cabeludo (caspa ou falsa tinha)',
      'Acometimento facial simétrico (sulco nasogeniano, sobrancelhas, glabela)',
      'Região retroauricular e conduto auditivo externo descamativos',
      'Prurido leve a moderado exacerbado com calor ou transpiração'
    ],
    fatores_risco: [
      'Estresse psicológico e fadiga física marcantes',
      'Variação climática, com piora expressiva nos meses de inverno',
      'Disfunções neurológicas como Doença de Parkinson e paralisia facial',
      'Imunossupressão profunda (portadores de HIV/Aids)',
      'Presença e proliferação do fungo comensal Malassezia'
    ],
    red_flags: [
      'Eritrodermia seborreica infantil com diarreia crônica (Doença de Leiner)',
      'Aparecimento abrupto e de extrema gravidade em adultos (considere teste de HIV)',
      'Infecção secundária fúngica ou bacteriana destrutiva com dor local forte'
    ],
    diferenciais: [
      'Psoríase do couro cabeludo',
      'Dermatite de contato',
      'Ptiríase versicolor facial',
      'Tinea capitis'
    ]
  },
  {
    id: 'L40.0',
    nome: 'Psoríase Vulgar',
    sintomas: [
      'Placas eritematosas bem delimitadas e descamação prateada brilhante',
      'Distribuição simétrica nas superfícies extensoras (cotovelos e joelhos)',
      'Acometimento do couro cabeludo com placas descamativas espessas e aderentes',
      'Presença de pequenas depressões cupuliformes (pitting ungueal) ou manchas de óleo',
      'Prurido de intensidade leve a moderada'
    ],
    fatores_risco: [
      'Predisposição genética forte (presença de HLA-Cw6)',
      'Tabagismo ativo crônico e etilismo regular moderado a pesado',
      'Estresse psicossomático intenso agindo como gatilho central',
      'Uso de beta-bloqueadores, lítio ou antimaláricos orais',
      'Infecções de vias aéreas por estreptococo (gatilho clássico da forma gutata)'
    ],
    red_flags: [
      'Psoríase pustulosa generalizada de Von Zumbusch com febre alta e sepse',
      'Psoríase eritrodérmica com comprometimento de termorregulação e perda hidroeletrolítica',
      'Artrite psoriática acoplada de caráter mutilante / progressivo rápido'
    ],
    diferenciais: [
      'Dermatite seborreica severa',
      'Líquen plano',
      'Pitiríase rósea',
      'Eczema numular num padrão crônico'
    ]
  },
  {
    id: 'B86',
    nome: 'Escabiose (Sarna)',
    sintomas: [
      'Prurido generalizado noturno extremamente intenso',
      'Pápulas eritematosas pequenas, escoriadas e crostosas',
      'Sulcos lineares esbranquiçados clássicos (espaços interdigitais, punhos)',
      'Lesões em região periumbilical, axilas, aréolas mamárias e genitais',
      'Prurido familiar simultâneo (todos os membros da casa coçando)'
    ],
    fatores_risco: [
      'Ambientes altamente aglomerados como asilos, creches, prisões',
      'Contato direto estreito pele a pele com pessoa infestada',
      'Condições socioeconômicas e falta de acesso a saneamento básico'
    ],
    red_flags: [
      'Escabiose crostosa / norueguesa (hiperinfestação com placas psoriasiformes em imunossuprimidos)',
      'Infecção bacteriana secundária com glomérulonefrite aguda pós-estreptocócica (GNDA)',
      'Celulite bacteriana em membros inferiores por invasão secundária'
    ],
    diferenciais: [
      'Dermatite atópica',
      'Prurigo nodular',
      'Farmacodermia',
      'Picadas de insetos múltiplas (estrófulo)'
    ]
  },
  {
    id: 'L01.0',
    nome: 'Impetigo',
    sintomas: [
      'Pequenas vesículas que rompem rápido originando crostas melicéricas',
      'Localização preferencial periorificial (nariz, boca) e membros',
      'Eritema subjacente discreto, lesões tipicamente superficiais',
      'Prurido leve a moderado local facilitando autoinoculação ativa',
      'Disseminação local rápida em poucas horas'
    ],
    fatores_risco: [
      'Idade pediátrica pré-escolar (2 a 5 anos de idade)',
      'Clima úmido e quente com excesso de sudorese local',
      'Pequenos traumas prévios na pele (picadas de insetos, escoriações, herpes simples)',
      'Higiene pessoal precária ou condições favoráveis de contatos intergrupais'
    ],
    red_flags: [
      'Urina cor de chá/refrigerante indicando glomerulonefrite aguda pós-estreptocócica',
      'Penumonia hematogênica ou sepse sistêmica bacteriana por Staphylococcus aureus',
      'Ectima (forma profunda ulcerada que progride rápida com cicatriz)'
    ],
    diferenciais: [
      'Herpes simples labial',
      'Dermatite de contato aguda vesicular mista',
      'Varicela atípica inicial',
      'Picadas de mosquitos infectadas pelo coçar'
    ]
  },
  {
    id: 'A46',
    nome: 'Erisipela',
    sintomas: [
      'Placa eritematosa viva, brilhante, intensamente dolorosa, edemaciada, quente',
      'Bordas da placa elevadas e nitidamente delimitadas da pele normal',
      'Febre de início abrupto (38-40ºC) precedida de calafrios trementes',
      'Linfangite difusa acompanhando em direção aos linfonodos regionais',
      'Cefaleia, astenia e mal-estar agudos acompanhantes'
    ],
    fatores_risco: [
      'Linfedema crônico (membro superior pós-esvaziamento ou MMII)',
      'Presença de porta de entrada clássica ativa (tinea pedis, úlceras crônicas, traumas)',
      'Insuficiência venosa crônica periferia',
      'Diabetes mellitus descompensado e obesidade classe II ou superior'
    ],
    red_flags: [
      'Áreas violáceas com formação de bolhas hemorrágicas ou necrose focal',
      'Progresso de dor desproporcional ao eritema (sinal de fasceíte necrosante de Fournier/Membro)',
      'Choque séptico refratário a reposição com instabilidade de pressão'
    ],
    diferenciais: [
      'Celulite infecciosa',
      'Trombose venosa profunda (TVP)',
      'Dermatite de estase alérgica aguda',
      'Picada de aranha com reação necrótica de loxoscelismo'
    ]
  },
  {
    id: 'L03.9',
    nome: 'Celulite Infecciosa',
    sintomas: [
      'Eritema de bordas imprecisas, planas e mal delimitadas da pele sadia',
      'Infiltração profunda e endurecimento da derme e hipoderme',
      'Calor local exacerbado e dor significativa à palpação estática',
      'Pode haver linfonodomegalia regional dolorosa reativa',
      'Evolução gradual em dias, diferentemente da erisipela'
    ],
    fatores_risco: [
      'Diabetes mellitus com neuropatia ou vasculopatia periférica',
      'Histórico de cirurgias vasculares em MMII (safenectomia)',
      'Linfedema congênito ou adquirido permanente',
      'Traumas de derme ou queimaduras térmicas não tratadas'
    ],
    red_flags: [
      'Flutuação ou crepitação na palpação profunda (abscesso oculto ou gás tecidual)',
      'Progressão relâmpago de eritema sob demarcação prévia por caneta',
      'Instabilidade hemodinâmica severa orquestrada por choque séptico profundo',
      'Derrame periférico hemorrágico com áreas frias ou azuladas'
    ],
    diferenciais: [
      'Erisipela aguda',
      'Trombose venosa profunda de membro inferior',
      'Fasceíte necrosante',
      'Dermatite de estase estéril descompensada'
    ]
  },
  {
    id: 'B35.3',
    nome: 'Tinea Pedis (Pé de Atleta)',
    sintomas: [
      'Descamação e maceração esbranquiçada dolorosa nos espaços interdigitais',
      'Fissuras profundas e dolorosas entre os dedos do pé (principalmente 4º e 5º dedos)',
      'Eritema e descamação seca difusa na planta e laterais ("padrão em mocassim")',
      'Prurido intenso que piora significativamente após retirar calçados fechados',
      'Odor característico desagradável fétido local'
    ],
    fatores_risco: [
      'Uso continuado de calçados fechados e sintéticos não ventilados',
      'Hábito de frequentar descalço vestiários, banheiros públicos e piscinas',
      'Obesidade e sudorese plantar excessiva (hiperidrose)',
      'Imunocomprometimento celular latente ou diabetes mellitus'
    ],
    red_flags: [
      'Erisipela decorrente da quebra de barreira (tinea pedis é a principal porta)',
      'Ulceração crônica infectada por Staphylococcus aureus resistente em diabéticos',
      'Formação de ides (reações de hipersensibilidade vesicular em mãos)'
    ],
    diferenciais: [
      'Disidrose bolhosa plantar',
      'Psoríase plantar',
      'Dermatite de contato por borrachas de calçados',
      'Eritrasma interdigital'
    ]
  },
  {
    id: 'B35.4',
    nome: 'Tinea Corporis (Impigem)',
    sintomas: [
      'Placas eritemato-descamativas circulares (anulares) únicas ou múltiplas',
      'Bordas ativas inflamatórias elevadas e descamativas bem nítidas',
      'Centro da lesão com clareamento central progressivo de aspecto normal',
      'Prurido cutâneo de intensidade moderada a grave',
      'Crescimento centrífugo paulatino ao longo de semanas'
    ],
    fatores_risco: [
      'Clima tropical extremamente quente e úmido habitual',
      'Contato próximo corporal com pessoa contaminada ou animais de estimação (cães/gatos)',
      'Prática de esportes de contato físico íntimo (Lutas, Jiu-jitsu)',
      'Uso de roupas úmidas ou compartilhamento de toalhas'
    ],
    red_flags: [
      'Tinea incognita (lesões perdem o padrão ativo típico e tornam-se violáceas devido ao uso de corticoide tópico)',
      'Disseminação invasiva profunda (Granuloma de Majocchi) em folículos'
    ],
    diferenciais: [
      'Pitiríase rósea',
      'Eczema numular',
      'Psoríase gutata',
      'Lúpus eritematoso subagudo cutâneo'
    ]
  },
  {
    id: 'B35.0',
    nome: 'Tinea Capitis',
    sintomas: [
      'Áreas de alopecia circular descamativa única ou múltipla no couro',
      'Cabelos fraturados rentes à pele que dão aspecto de pequenos pontos',
      'Placa com descamação esbranquiçada e eritema subjacente discreto',
      'Prurido frequente local que induz coçadura e escoriação secundária',
      'Dificuldade de fixação dos fios locais ao redor da placa'
    ],
    fatores_risco: [
      'Idade pediátrica escolar em creches e coletividades infantis',
      'Contato próximo com filhotes de cães ou gatos infectados (transmissão zoofílica)',
      'Uso compartilhado de aparelhos de cabelo, pentes, bonés ou toalhas'
    ],
    red_flags: [
      'Kerion celsi (placa volumosa inflamada, dolorosa que drena pus, risco de alopecia cicatricial definitiva)',
      'Linfonodomegalia suboccipital ou retroauricular inflamatória massiva'
    ],
    diferenciais: [
      'Alopecia areata súbita',
      'Dermatite seborreica crônica de couro cabeludo',
      'Tricotilomania',
      'Psoríase de couro cabeludo'
    ]
  },
  {
    id: 'B36.0',
    nome: 'Ptiríase Versicolor',
    sintomas: [
      'Múltiplas máculas descamativas hiper ou hipopigmentadas no tronco superior',
      'Descamação fina do tipo farelácea evidenciada ao esticar a pele (Sinal de Zunido)',
      'Lesões de cores variáveis: brancas, rosadas, acastanhadas ou avermelhadas',
      'Incapacidade de bronzeamento local nas áreas afetadas após tomar sol',
      'Prurido discreto que surge apenas quando o corpo aquece'
    ],
    fatores_risco: [
      'Excesso de sudorese corporal (hiperidrose) em climas quentes',
      'Pele geneticamente oleosa ou aplicação de cremes corporais gordurosos',
      'Imunidade celular deprimida, desnutrição ou gravidez ativa'
    ],
    red_flags: [
      'Recidivas mensais severas de difícil controle, sugerindo síndrome metabólica oculta'
    ],
    diferenciais: [
      'Vitiligo verdadeiro',
      'Pitiríase alba descamativa',
      'Hanseníase indeterminada precoce',
      'Leucodermia gutata senil'
    ]
  },
  {
    id: 'B37.2',
    nome: 'Candidíase Cutânea',
    sintomas: [
      'Placa vermelha viva, brilhante, úmida e macerada em dobras flexurais',
      'Presença de pápulas e pústulas satélites arredondadas nas margens',
      'Sensação dolorosa de fissuração, queimação local intensa e prurido',
      'Acometimento de mucosa perianal ou vulvovaginal simultâneos'
    ],
    fatores_risco: [
      'Diabetes mellitus com padrão descontrolado e glicemias elevadas',
      'Obesidade extrema gerando dobras profundas e fricção contínua',
      'Uso prolongado de antibióticos sistêmicos ou corticoides injetáveis',
      'Uso prolongado de fraldas em crianças pequenas ou idosos acamados'
    ],
    red_flags: [
      'Fissuras sangrantes infectadas por germes Gram-negativos em diabéticos',
      'Candidíase mucocutânea crônica sugerindo defeito imunológico congênito'
    ],
    diferenciais: [
      'Eritrasma',
      'Psoríase invertida',
      'Intertrigo por atrito mecânico simples',
      'Dermatite seborreica intertriginosa'
    ]
  },
  {
    id: 'B00.1',
    nome: 'Herpes Simples Labial',
    sintomas: [
      'Pródromo de parestesia, ardência, prurido ou dor localizada na mucosa labial',
      'Surgimento em poucas horas de vesículas agrupadas em buquê',
      'Evolução para pequenas erosões e formação de crostas secas',
      'Adenomegalia mandibular inflamatória dolorosa leve reativa',
      'Resolução espontânea sem cicatrizes definitivas em 7 a 10 dias'
    ],
    fatores_risco: [
      'Exposição solar aguda sem protetor ou filtros labiais',
      'Estresse psicológico extremo recente ou episódios de privação de sono',
      'Infecção respiratória febril concomitante de qualquer natureza'
    ],
    red_flags: [
      'Ceratite herpética grave por autoinoculação conjuntival com risco de cegueira',
      'Eczema herpético generalizado na pele atópica infectada',
      'Múltiplos episódios mensais persistentes justificando terapia supressiva'
    ],
    diferenciais: [
      'Afta simples labial',
      'Queilite angular infecciosa',
      'Impetigo circinado',
      'Sífilis primária (cancro duro oral)'
    ]
  },
  {
    id: 'B02.9',
    nome: 'Herpes Zoster',
    sintomas: [
      'Dor neuropática intensa, queimação, pontadas ou hipersensibilidade unilateral',
      'Erupção unifocal dermatômica de vesículas agrupadas sobre pele vermelha',
      'Progressão para pústulas e crostas que podem deixar cicatrizes hipercromáticas',
      'Febre de baixa intensidade, cefaleia e astenia na fase inicial',
      'Acometimento exclusivo unilateral que respeita rigorosamente a linha média'
    ],
    fatores_risco: [
      'Idade avançada superior a 50 anos (principal fator por imunossenescência)',
      'Imunossupressão celular induzida por neoplasias, HIV, imunobiológicos ou quimio',
      'Histórico de varicela na infância (vírus reativa dos gânglios sensitivos)'
    ],
    red_flags: [
      'Acometimento oftálmico (ramo oftálmico trigêmeo - Sinal de Hutchinson na ponta nasal)',
      'Síndrome de Ramsay Hunt com otalgia, surdez e paralisia facial periférica severa',
      'Neuralgia pós-herpética severa incapacitante com crises de dor por meses'
    ],
    diferenciais: [
      'Infarto agudo do miocárdio (fase de dor pré-eruptiva no dermátomo T2-T4)',
      'Dermatite de contato linear fitogênica',
      'Loxoscelismo cutâneo',
      'Dor de compressão radicular medular'
    ]
  },
  {
    id: 'B07',
    nome: 'Verruga Vulgar',
    sintomas: [
      'Pápula ou nódulo exofítico hiperceratósico de superfície áspera/rugosa',
      'Presença de pontilhados pretos centrais (capilares dérmicos trombosados)',
      'Localização comum em extremidades superiores (dedos, ao redor das unhas)',
      'Ausência completa de dor à palpação lateral simples',
      'Lesões por vezes pediculadas na face ou pescoço (verruga filiforme)'
    ],
    fatores_risco: [
      'Microtraumatismos constantes na barreira de pele (roer unhas e cutículas)',
      'Frequentar sem sapatos ambientes comunitários úmidos como piscinas',
      'Imunodeficiência celular congênita ou adquirida'
    ],
    red_flags: [
      'Lesões gigantes persistentes ou múltiplas sugerindo imunossupressão profunda',
      'Crescimento rápido com sangramento espontâneo oculto (considere displasia)'
    ],
    diferenciais: [
      'Ceratose seborreica verrucosa',
      'Carcinoma espinocelular vegetante',
      'Ceratose actínica hipertrófica',
      'Calo cutâneo simples plantar'
    ]
  },
  {
    id: 'B08.1',
    nome: 'Molusco Contagioso',
    sintomas: [
      'Pápulas peroladas, brilhantes e firmes com diâmetro de 1 a 5 mm',
      'Presença constante de umbilicação central característica em cúpula',
      'Pápulas geralmente agrupadas, indolores e não pruriginosas',
      'Drenagem de massa esbranquiçada pastosa sob espremimento ("corpo do molusco")',
      'Acometimento preferencial do tronco, abdômen e dobras flexurais em crianças'
    ],
    fatores_risco: [
      'Idade pediátrica de lactentes a escolares primários',
      'Dermatite atópica pré-existente (facilita autoinoculação do vírus poxvírus)',
      'Clima quente e uso partilhado de brinquedos e toalhas'
    ],
    red_flags: [
      'Dezenas de lesões gigantes faciais em adultos (sinal clássico de infecção avançada por HIV)'
    ],
    diferenciais: [
      'Verruga vulgar em fase inicial',
      'Siringomas múltiplos faciais',
      'Criptococose cutânea na vigência de aids',
      'Foliculite'
    ]
  },
  {
    id: 'L71.9',
    nome: 'Rosácea',
    sintomas: [
      'Eritema facial central persistente, fixo e simétrico',
      'Episódios recorrentes de flushing facial desencadeados por calor/estresse',
      'Presença de abundantes telangiectasias visíveis em bochechas e nariz',
      'Pápulas e pústulas inflamatórias que mimetizam acne sem comedões',
      'Sensação frequente de ardência cutânea e hipersensibilidade a cosméticos'
    ],
    fatores_risco: [
      'Pele clara de fototipo I ou II (ascendência europeia setentrional)',
      'Consumo usual de bebidas alcoólicas, café quente ou alimentos condimentados',
      'Exposição contínua solar sem fotoproteção física adequada',
      'Idade adulta entre os 30 e 50 anos de idade'
    ],
    red_flags: [
      'Rinofima (hiperplasia das glândulas sebáceas que deforma o nariz de forma fixa)',
      'Rosácea ocular ativa com sensação de corpo estranho, blefarite e risco de ceratite/cegueira',
      'Instalação de edema facial persistente indurado permanente (Linfedema de Morbihan)'
    ],
    diferenciais: [
      'Acne vulgar (presença obrigatória de comedões)',
      'Dermatite seborreica facial',
      'Lúpus eritematoso sistêmico (exantema em asa de borboleta sem pápulas/pústulas)',
      'Dermatite perioral'
    ]
  },
  {
    id: 'L81.1',
    nome: 'Melasma',
    sintomas: [
      'Máculas e placas hipercrômicas (acastanhadas) de limites bem nítidos',
      'Lesões com distribuição tipicamente simétrica nas bochechas, testa e buço',
      'Bordas geográficas irregulares que se misturam à pele sadia',
      'Piora visível e escurecimento após breves minutos de exposição solar',
      'Completa ausência de descamação, prurido ou dores locais'
    ],
    fatores_risco: [
      'Exposição cumulativa à radiação ultravioleta natural e luz visível azul artificial',
      'Gravidez em andamento induzindo cloasma gravídico pelas alterações de hormônio',
      'Uso continuado de pílulas anticoncepcionais combinadas orais',
      'Ancestralidade hispânica ou asiática de pele fototipo III ou IV'
    ],
    red_flags: [
      'Hiperpigmentação por infiltração de metais pesados por depósito secundário de medicamentos (amiodarona, minociclina)'
    ],
    diferenciais: [
      'Hiperpigmentação pós-inflamatória secundária',
      'Efélides simples (sardas solares)',
      'Dermatite de Berloque (reação a cítricos e perfumes seguida de sol)',
      'Pigmentação argírica'
    ]
  },
  {
    id: 'L63.9',
    nome: 'Alopecia Areata',
    sintomas: [
      'Perda de cabelo rápida originando placas redondas ou ovais lisas',
      'Couro cabeludo subjacente de aspecto normal (sem descamação ou cicatrizes)',
      'Presença de cabelos em ponto de exclamação nas bordas ativas da placa',
      'Textura macia ao toque no nível da área afetada',
      'Surgimento em couro cabeludo, barba, sobrancelhas e cílios'
    ],
    fatores_risco: [
      'Histórico familiar positivo de alopecia areata de início precoce',
      'Portadores de doenças imunológicas crônicas (Tireoidite de Hashimoto, do vitiligo)',
      'Gatilhos de estresse psicológico agudo ou trauma sistêmico prévios'
    ],
    red_flags: [
      'Alopecia areata universal (perda total de pelos do corpo incluindo corporal)',
      'Poliose aguda (embranquecimento explosivo rápido na borda da lesão)',
      'Presença de alterações ungueais severas como traquioníquia ou distrofia de unhas'
    ],
    diferenciais: [
      'Tinea capitis microsporosa',
      'Sífilis secundária (alopecia em "roído de traça")',
      'Tricotilomania',
      'Alopecia frontal fibrosante inicial'
    ]
  },
  {
    id: 'L50.0',
    nome: 'Urticária Aguda',
    sintomas: [
      'Surgimento abrupto de pápulas e placas edemaciadas eritematosas (urticas)',
      'Prurido cutâneo extremamente intenso, móvel e flutuante',
      'Evolução transitória: lesões individuais resolvem ou mudam de local em < 24h',
      'Eritema ao redor da placa induzido por fricção ou coçadura'
    ],
    fatores_risco: [
      'Introdução recente de novos medicamentos sistêmicos (AINEs, antibióticos)',
      'Infecções virais agudas (ex: hepatite viral aguda precoce, resfriados)',
      'Picadas de insetos provocando reações igE mediadas rápidas',
      'Ingestão recente de alimentos com alta liberação direta de histamina'
    ],
    red_flags: [
      'Sinais clássicos de anafilaxia sistêmica (dispneia, estridor, hipotensão, sialorreia)',
      'Urticária vasculite com lesões fixas que duram mais de 24h e deixam mancha'
    ],
    diferenciais: [
      'Vasculite urticariforme',
      'Eritema multiforme menor',
      'Dermatite de contato aguda disseminada',
      'Síndrome de Sweet'
    ]
  },
  {
    id: 'L57.0',
    nome: 'Ceratose Actínica',
    sintomas: [
      'Pápula eritematosa ou acastanhada áspera de textura semelhante a lixa',
      'Presença de descamação hiperceratósica seca firmemente aderida',
      'Localização exclusiva em áreas fotoexpostas (face, orelhas, couro calvo, dorso de mãos)',
      'Sensação de repuxamento ou dor discreta ao passar o dedo sobre a lesão'
    ],
    fatores_risco: [
      'Exposição ao sol cumulativa de longa data sem proteção física ou química',
      'Pele muito clara fototipo I ou II (ruivos e loiros de olhos claros)',
      'Trabalho rural ao ar livre de caráter crônico histórico',
      'Imunossupressão prolongada pós-transplantes de órgãos sólidos'
    ],
    red_flags: [
      'Induração firme na base da placa cutânea com dor local espontânea (fortíssimo sinal de transformação para Carcinoma Espinocelular)'
    ],
    diferenciais: [
      'Ceratose seborreica verrucosa',
      'Carcinoma basocelular inicial',
      'Lúpus eritematoso discoide',
      'Verruga vulgar senil'
    ]
  },
  {
    id: 'C44.9',
    nome: 'Carcinoma Basocelular',
    sintomas: [
      'Nódulo brilhante de aspecto translúcido ou perolado',
      'Presença de telangiectasias finas arboriformes correndo a superfície',
      'Bordas com aspecto de pequenas pérolas enfileiradas palpáveis',
      'Ulceração central recorrente que sangra fácil e cicatriza de forma parcial',
      'Localização predominante no terço esférico superior da face'
    ],
    fatores_risco: [
      'Queimaduras solares episódicas intensas na infância/juventude',
      'Pele de baixa resposta ao sol (fototipos extremamente baixos)',
      'Histórico familiar direto de neoplasias epiteliais malignas',
      'Uso prévio de radioterapia ou exposição ao arsênico'
    ],
    red_flags: [
      'Infiltração profunda e silenciosa em sulco nasolabial ou ângulo interno do olho com destruição óssea local (variante esclerosante/infiltrativa agressiva)'
    ],
    diferenciais: [
      'Nevos melanocíticos benignos intradérmicos',
      'Ceratose seborreica clonal pigmentada',
      'Carcinoma espinocelular infiltrativo',
      'Hiperplasia sebácea senil'
    ]
  },
  {
    id: 'C44.91',
    nome: 'Carcinoma Espinocelular',
    sintomas: [
      'Placa ou nódulo eritematoso endurecido e nitidamente infiltrado',
      'Superfície verrucosa hiperceratósica ou coberta de crosta espessa',
      'Ulceração profunda persistente com bordas induradas e evertidas',
      'Tendência a sangramento fácil sob pequenos traumas mecânicos',
      'Surgimento comum sobre áreas com danos actinicos prévios'
    ],
    fatores_risco: [
      'Exposição ao solar cumulativa pesada ao longo de décadas laborais',
      'Presença de cicatrizes antigas de queimaduras extensas (Úlcera de Marjolin)',
      'Úlceras venosas de membros inferiores crônicas sem cicatrização por anos',
      'Tabagismo pesado e infecções por papilomavírus humano (HPV)'
    ],
    red_flags: [
      'Presença de linfonodomegalias regionais induradas sugerindo metástase precoce',
      'Tumores com invasão perineural manifestando parestesia local progressiva'
    ],
    diferenciais: [
      'Queratoacantoma de crescimento rápido',
      'Ceratose actínica hipertrófica',
      'Carcinoma basocelular pigmentado',
      'Úlcera de perna estéril inflamatória'
    ]
  },
  {
    id: 'C43.9',
    nome: 'Melanoma Cutâneo',
    sintomas: [
      'Lesão pigmentada assimétrica crônica (metade não condiz com a outra)',
      'Bordas irregulares com denteamentos, chanfraduras ou limites imprecisos',
      'Coloração variada no mesmo nevo: preto, castanho, azul, rosa, branco',
      'Diâmetro lesional geralmente superior a 6 milímetros de extensão',
      'Evolução recente: pinta antiga que coça, dói, cresce ou sangra espontaneamente'
    ],
    fatores_risco: [
      'Presença de múltiplos nevos melanocíticos simples (mais de 50 a 100 pintas)',
      'História de melanoma anterior pessoal ou herança familiar direta',
      'Histórico de queimaduras solares agudas dolorosas com formação de bolhas'
    ],
    red_flags: [
      'Nevos nodulares pretos homogêneos que crescem verticalmente de forma repentina',
      'Melanoma lentiginoso acral (lesões pigmentadas em palmas, plantas ou subungueais sem trauma)'
    ],
    diferenciais: [
      'Nevo melanocítico juncional ou composto benigno',
      'Ceratose seborreica pigmentada untuosa',
      'Hemorraria subungueal pós-traumática',
      'Carcinoma basocelular pigmentado'
    ]
  },
  {
    id: 'L73.2',
    nome: 'Hidradenite Supurativa',
    sintomas: [
      'Nódulos inflamatórios dolorosos, recorrentes em axilas e virilhas',
      'Abscessos profundos que rompem espontaneamente eliminando serosidade purulenta fétida',
      'Presença de comedões em "ponte" característicos bilaterais',
      'Fístulas persistentes subcutâneas de drenagem constante dolorosa',
      'Instalação de cicatrizes retráteis fibróticas que limitam a abdução dos braços'
    ],
    fatores_risco: [
      'Hábito de tabagismo persistente',
      'Obesidade e sobrepeso acentuados (fricção vigorosa de pele com pele)',
      'Histórico familiar da doença autoimune folicular',
      'Sexo feminino (maior acometimento inguinal)'
    ],
    red_flags: [
      'Fístulas volumosas de interconexão difusa com infecções bacterianas sobrepostas profundas (Hurley III)',
      'Carcinoma espinocelular sobreposto a cicatrizes crônicas de hidradenite anogenital'
    ],
    diferenciais: [
      'Furunculose recorrente',
      'Doença de Crohn metastática cutânea perineal',
      'Cisto epidermoide infectado recorrente',
      'Abscesso de glândula de Bartholin'
    ]
  },
  {
    id: 'L43.9',
    nome: 'Líquen Plano',
    sintomas: [
      'Pápulas poligonais planos com cor violácea típica brilhante',
      'Prurido extremamente intenso, por vezes refratário a anti-histamínicos',
      'Estrias esbranquiçadas rendilhadas na superfície da pápula (Estrias de Wickham)',
      'Presença do fenômeno de Koebner (lesões que surgem em linhas de trauma mecânico)',
      'Placas esbranquiçadas reticulares em mucosa oral indolor'
    ],
    fatores_risco: [
      'Associação direta conhecida com infecção crônica pelo vírus da Hepatite C',
      'Histórico de exposição a certos medicamentos (ouro, antimaláricos, diuréticos)',
      'Estados de estresse emocional agudo desencadeador'
    ],
    red_flags: [
      'Variante de líquen plano oral do tipo erosivo ulcerado crônico, com risco aumentado latente de desenvolvimento de carcinoma espinocelular de boca'
    ],
    diferenciais: [
      'Psoríase gutata residual',
      'Pitiríase rósea de Gilbert',
      'Sifilide papulosa secundária',
      'Líquen simples crônico localizado'
    ]
  },
  {
    id: 'L42',
    nome: 'Ptiríase Rósea de Gilbert',
    sintomas: [
      'Início clássico com uma placa eritematosa descamativa ovalada única (Medalhão ou Placa heráldica)',
      'Erupção simétrica subsequente de múltiplas placas menores no tronco em 1 a 2 semanas',
      'Distribuição das lesões nas costas seguindo as linhas de tensão (Padrão de árvore de natal)',
      'Gola descamativa interna na borda que poupa extremidades livres',
      'Prurido de intensidade leve a moderada, tolerável'
    ],
    fatores_risco: [
      'Reativação local espontânea de herpesvírus humanos tipos 6 e 7',
      'Fototipos de pele baixos em idades entre 10 e 35 anos',
      'Sazonalidade típica de períodos frios de inverno'
    ],
    red_flags: [
      'Exantema no primeiro trimestre de gestação ativa (risco de morte fetal ou abortamento prematuro por viremia)',
      'Fase de erupção com coceira excruciante atípica'
    ],
    diferenciais: [
      'Sífilis secundária (considere VDRL obrigatório para descartar)',
      'Tinea corporis disseminada',
      'Eczema numular agudo',
      'Psoríase gutata inicial'
    ]
  },
  {
    id: 'L80',
    nome: 'Vitiligo',
    sintomas: [
      'Máculas e placas totalmente acrômicas (brancas em leite de giz)',
      'Limites de demarcação extremamente precisos com hiperpigmentação marginal discreta',
      'Distribuição simétrica bilateral proeminente (mãos, face, joelhos, tornozelos)',
      'Ausência completa de descamação, prurido ou dores associadas',
      'Poliose (descoloramento ou branqueamento de fios de cabelo do interior da placa)'
    ],
    fatores_risco: [
      'Histórico genético familiar forte de aparecimento precoce da doença',
      'Associação a outras doenças sistêmicas autoimunes de tireoide, pâncreas ou adrenal',
      'Episódios disparadores traumáticos físicos (fenômeno de Koebner)'
    ],
    red_flags: [
      'Descoloração rápida corporal generalizada sugerindo perda em mosaico severa',
      'Disfunção na acuidade visual ou uveítes bilaterais associadas a perda de melanócitos oculares'
    ],
    diferenciais: [
      'Ptiríase versicolor estéril',
      'Hanseníase indeterminada precoce',
      'Hipomelanose de Ito',
      'Leucoderma gutata senil'
    ]
  },
  {
    id: 'B87.9',
    nome: 'Miíase Cutânea',
    sintomas: [
      'Nódulo eritematoso inflamatório edemaciado simulando furúnculo',
      'Presença constante de um orifício central que elimina líquido soropurulento',
      'Sensação nítida e dolorosa de movimentação ou ferroada sob a lesão',
      'Prurido e queimação local intensa e intermitente'
    ],
    fatores_risco: [
      'Feridas cutâneas expostas, sem curativo lavável apropriado',
      'Higiene corporal deficiente no ambiente doméstico rural',
      'Convívio próximo no cuidado de animais pecuários de campo'
    ],
    red_flags: [
      'Acometimento de mucosa ocular, auditiva ou nasal com rápida invasão celular destrutiva profunda',
      'Sinais de infecção por Pseudomonas aeruginosa associada'
    ],
    diferenciais: [
      'Furúnculo por Staphylococcus aureus',
      'Tungíase complicada profunda',
      'Abscesso de pele localizado',
      'Picada de artrópode com nódulo remanescente'
    ]
  },
  {
    id: 'B85.0',
    nome: 'Pediculose do Couro Cabeludo',
    sintomas: [
      'Prurido intenso no couro cabeludo, pior na nuca e atrás das orelhas',
      'Pápulas urticadas inflamatórias de coçadura na região occipital',
      'Visualização de lêndeas (ovos esbranquiçados ovais firmemente aderidos aos fios)',
      'Visualização de piolhos vivos ativos na base da raiz sob inspeção iluminada',
      'Presença de escoriações puntiformes e crostas de coçar dolorosas'
    ],
    fatores_risco: [
      'Contato próximo interpessoal na idade pediátrica escolar primária',
      'Compartilhamento de utensílios capilares como pentes, escovas, bonés ou laços',
      'Aglomeração habitual em creches fechadas de inverno'
    ],
    red_flags: [
      'Impetiginização secundária massiva com adenomegalia suboccipital gigante extremamente dolorosa e febre alta',
      'Plica polônica (emaranhado massivo de cabelo sob secreção purulenta)'
    ],
    diferenciais: [
      'Caspa (dermatite seborreica) - destaca-se facilmente do fio e não adere',
      'Tinea capitis',
      'Foliculite bacteriana'
    ]
  },
  {
    id: 'B88.1',
    nome: 'Tungíase',
    sintomas: [
      'Pápula ou nódulo esbranquiçado circular com um ponto preto central',
      'Sensação dolorosa de queimação, pontada local e prurido associado',
      'Localização comum em regiões plantares, calcanhares, espaços interdigitais ou periungueais',
      'Evolução para eliminação de ovos pelo ponto preto central',
      'Pode haver edema perilocal doloroso discreto'
    ],
    fatores_risco: [
      'Hábito de caminhar descalço ou com calçados abertos em solo de terra ou areia seca',
      'Instalações domiciliares precárias com criação inadequada de cães, gatos ou porcos',
      'Populações carentes rurais ou em situação de marginalidade urbana'
    ],
    red_flags: [
      'Infecção secundária grave por anaeróbios (risco iminente de tétano em pacientes não vacinados)',
      'Múltiplas infestações maciças mamilares ou plantares inviabilizando locomoção'
    ],
    diferenciais: [
      'Verruga plantar profunda (olho de peixe)',
      'Corpo estranho penetrado sob a derme',
      'Calosidade de pressão'
    ]
  },
  {
    id: 'B76.9',
    nome: 'Larva Migrans Cutânea',
    sintomas: [
      'Lesão eritematosa linear, elevada, tortuosa e sinuosa (aspecto de cordão serpiginoso)',
      'Prurido local excruciante, incontrolável que se exacerba grandemente à noite',
      'Progressão linear lesional de milímetros a centímetros por dia',
      'Formação de pápulas ou vesículas ao longo do trajeto da migração',
      'Localização comum em pés, pernas, nádegas e mãos'
    ],
    fatores_risco: [
      'Contato direto da pele nua com areia ou terra úmidas frequentadas por cães e gatos',
      'Frequentar praias que permitem pets livres ou caixas de areia recreativas infantis desprotegidas',
      'Trabalho de encanador, jardineiro ou construção civil sob contato de solo'
    ],
    red_flags: [
      'Celulite infiltrativa bacteriana ascendente acompanhada de febre severa',
      'Síndrome de Löffler (pneumonite por migração linfática de antígenos inflamatórios)'
    ],
    diferenciais: [
      'Escabiose de sulcos interdigitais planos',
      'Fitodermatite por plantas',
      'Dermatite de contato alérgica linear',
      'Tinea corporis de expansão anular rápida'
    ]
  },
  {
    id: 'K13.0',
    nome: 'Queilite Angular',
    sintomas: [
      'Eritema, fissura e ulceração dolorosa nas comissuras (cantos) labiais',
      'Maceração fissurada central esbranquiçada no ângulo da boca',
      'Dor significativa ao abrir a boca para mastigar, falar ou deglutir',
      'Sangramento discreto sob estiramento ou risadas'
    ],
    fatores_risco: [
      'Perda da dimensão vertical oclusal (idantes idosos devido à ausência de dentes)',
      'Próteses dentárias parciais ou totais mal higienizadas ou desadaptadas',
      'Hábito repetitivo de lamber os lábios ou sialorreia crônica noturna',
      'Deficiências nutricionais acentuadas (vitamina B, riboflavina, ferro)'
    ],
    red_flags: [
      'Candidíase oral pseudomembranosa confluente e disfagia no adulto (considere severa imunodeficiência subjacente)'
    ],
    diferenciais: [
      'Cancro duro sifilítico inicial no lábio',
      'Herpes simples labial na comissura',
      'Queilite actínica com risco de transformação maligna'
    ]
  },
  {
    id: 'L73.9',
    nome: 'Foliculite',
    sintomas: [
      'Pápula eritematosa perifolicular encimada por uma pequena pústula central',
      'Localização centrada ao redor do folículo piloso',
      'Presença de pelo emergente no centro da lesão purulenta',
      'Dor ou prurido local de leve intensidade',
      'Localização frequente na barba, coxas, nádegas, axilas e couro cabeludo'
    ],
    fatores_risco: [
      'Microtraumatismo de fricção (depilação, barbear com lâmina contra o pelo)',
      'Uso continuado de roupas apertadas de lycra ou tecidos sintéticos que obstruem',
      'Uso prolongado de banheiras de hidromassagem mal cloradas (foliculite por Pseudomonas)',
      'Oclusão crônica por óleos de massagem ou hidratantes espessos'
    ],
    red_flags: [
      'Confluência para furunculose disseminada grave',
      'Foliculite de face média com dor ocular progressiva (risco de tromboflebite de seio cavernoso sinus)'
    ],
    diferenciais: [
      'Acne vulgar clássica',
      'Pseudofoliculite da barba',
      'Foliculite por Malassezia (fúngica)',
      'Queratose pilar inflamatória'
    ]
  },
  {
    id: 'L02.9',
    nome: 'Furúnculo',
    sintomas: [
      'Nódulo eritematoso inflamatório doloroso de início agudo e profundo',
      'Formação rápida de flutuação central purulenta',
      'Presença de orifício central com eliminação do tecido necrótico (carnegão)',
      'Calor local acentuado, dor pulsante local importante e edema marginal',
      'Resolução após drenagem do rolha de pus central deixando cicatriz plana'
    ],
    fatores_risco: [
      'Diabetes mellitus descompensado ou nefropatias crônicas',
      'Obesidade e sudorese excessiva em dobras cutâneas profundas',
      'Colonização das fossas nasais por Staphylococcus aureus resistente',
      'Imunocomprometimento de neutrófilos ou humoral'
    ],
    red_flags: [
      'Antraz / Carbúnculo (confluência de múltiplos furúnculos com fístulas, febre alta e sepse)',
      'Dor facial intensa simulando celulite profunda em face central peri-nasal'
    ],
    diferenciais: [
      'Foliculite pustulosa benigna',
      'Abscesso cutâneo por corpo estranho',
      'Cisto epidermoide inflamado',
      'Hidradenite supurativa profunda'
    ]
  },
  {
    id: 'L30.4',
    nome: 'Intertrigo Candidíásico',
    sintomas: [
      'Placa eritematosa vermelho-brilhante, úmida e friável em grandes dobras',
      'Presença de múltiplas pápulas e pústulas satélites arredondadas nas margens',
      'Descamação colarete fina contornando o limite da dobra cutânea',
      'Sensação constante de fissura dolorosa, ardência ou queimação ao atrito físico',
      'Acometimento de região inframamária, inguinal ou umbilical'
    ],
    fatores_risco: [
      'Diabetes mellitus insulino-dependente com controle glicêmico desfavorável',
      'Obesidade grau I ou superior com atrito mecânico constante interdobras',
      'Imunossupressão sistêmica ou uso de quimioterápicos',
      'Incontinência urinária ou uso de fraldas descartáveis'
    ],
    red_flags: [
      'Áreas cinzentas ou pretas na dobra sugerindo infecção necrosante de tecidos moles ou gangrena fúngica profunda (diabéticos idosos)'
    ],
    diferenciais: [
      'Eritrasma bacteriano',
      'Psoríase invertida (sem pústulas satélites)',
      'Dermatite de contato alérgica por cosméticos íntimos'
    ]
  },
  {
    id: 'L30.0',
    nome: 'Eczema Numular',
    sintomas: [
      'Placas eritematosas, circulares em formato de moeda ("numular") bem demarcadas',
      'Superfície descamativa, pruriginosa ou vesicular com secreção e crosta',
      'Prurido cutâneo violento de difícil controle farmacológico',
      'Localização preferencial na face extensora de membros inferiores e tronco',
      'Resolução com hiperpigmentação pós-inflamatória'
    ],
    fatores_risco: [
      'Pele geneticamente seca e desidratada de idosos (xerose intensa)',
      'Banhos demorados com água muito quente e uso abusivo de buchas abrasivas',
      'Clima frio do outono e inverno'
    ],
    red_flags: [
      'Generalização explosiva das lesões configurando quadro de eritrodermia',
      'Aderência de infecção estafilocócica secundária severa (impetiginização em placas)'
    ],
    diferenciais: [
      'Tinea corporis de borda ativa',
      'Psoríase vulgar em placas pequenas',
      'Dermatite de contato irritativa crônica',
      'Pitiríase rósea'
    ]
  },
  {
    id: 'L24.5',
    nome: 'Fitofotodermatite',
    sintomas: [
      'Eritema e ardência localizada em áreas expostas ao sol',
      'Formação rápida de vesículas e bolhas lineares sobre pele vermelha',
      'Surgimento característico de manchas hiperpigmentadas acastanhadas lineares ou com desenho de dedos',
      'Sensação de queimação local intensa, dolorosa ao toque',
      'Ausência de prurido excessivo inicial, sobrepujado pela ardência'
    ],
    fatores_risco: [
      'Manuseio direto de limão, figo, tangerina, laranja ou seiva de plantas seguidos por exposição ao sol',
      'Prática de lazer ao ar livre (churrascos, praia, jardinagem) sem lavagem imediata de mãos com sabão'
    ],
    red_flags: [
      'Formação de bolhas volumosas gigantes purulentas com necrose superficial epidérmica demandando internação ou curativos de queimadura'
    ],
    diferenciais: [
      'Dermatite de contato alérgica',
      'Queimadura térmica superficial de 2º grau',
      'Herpes zoster de fase bolhosa inicial',
      'Celulite superficial inicial'
    ]
  },
  {
    id: 'L52',
    nome: 'Eritema Nodoso',
    sintomas: [
      'Nódulos subcutâneos inflamatórios bilaterais localizados na face anterior das pernas',
      'Lesões dolorosas à palpação, edemaciadas, vermelhas que mudam de cor como hematoma (esverdeado, roxo)',
      'Febre de baixa intensidade acompanhada de artralgias ou artrite transitória de tornozelos',
      'Presença de adenopatia hilar bilateral visível em radiografia',
      'Evolução autolimitada em 3 a 6 semanas sem deixar cicatrizes'
    ],
    fatores_risco: [
      'Uso continuado de anticoncepcionais combinados de alta dosagem estrogênica',
      'Infecção estreptocócica de via aérea superior ou pneumonia recente (1 a 3 semanas)',
      'Doença inflamatória intestinal ativa (Crohn / Retocolite)',
      'Tuberculose pulmonar ativa ou sarcoidose pulmonar de início agudo'
    ],
    red_flags: [
      'Recorrência contínua dos surtos de nódulos acompanhados de letargia, emagrecimento severo e dores abdominais crônicas (investigar linfoma)'
    ],
    diferenciais: [
      'Tromboflebite superficial de derme',
      'Celulite bacteriana em placas',
      'Paniculite de Weber-Christian',
      'Vasculite nodular'
    ]
  },
  {
    id: 'L03.0',
    nome: 'Paroníquia Aguda',
    sintomas: [
      'Vermelhidão viva, edema tenso e dor pulsante contínua nas dobras laterais da unha',
      'Presença de secreção purulenta acumulada visível sob a prega ungueal',
      'Hipersensibilidade tátil local exacerbada sob o mínimo toque físico',
      'Desprendimento ou desvio da lâmina ungueal em casos prolongados'
    ],
    fatores_risco: [
      'Hábito de roer unhas periungueais ou arrancar cutículas provocando microtraumas',
      'Manicures traumáticas ou uso de instrumentos sem higienização adequada de corte',
      'Contato persistente das mãos em contato de água e produtos de limpeza domésticos',
      'Diabetes mellitus sistêmica controle regular'
    ],
    red_flags: [
      'Disseminação da infecção profunda para espaço de inserção do tendão palmar (tenossinovite de mão)',
      'Surgimento de necrose na prega ungueal'
    ],
    diferenciais: [
      'Paroníquia crônica (etiologia fúngica associada por Candida, indolor)',
      'Panarício herpético vesicular',
      'Melanoma subungueal (faixa preta na unha residual)'
    ]
  },
  {
    id: 'L85.3',
    nome: 'Xerose Cutânea (Pele Seca)',
    sintomas: [
      'Pele de textura áspera, opaca e sem brilho natural ao toque',
      'Descamação fina do tipo farelácea difusa em membros inferiores e superiores',
      'Sensação de repuxamento da pele após o banho, que incomoda o paciente',
      'Prurido generalizado incapacitante que piora à noite no leito',
      'Presença de linhas e fissuras superficiais lineares finas'
    ],
    fatores_risco: [
      'Idade senil (redução natural da atividade de glândulas sebáceas após 60 anos)',
      'Banhos de chuveiro muito quentes, demorados com uso excessivo de sabão alcalino',
      'Residência ou estadia prolongada em climas de baixa umidade e invernos frios',
      'Desidratação sistêmica ou carências nutricionais lipídicas'
    ],
    red_flags: [
      'Coçadura violenta com feridas e fissuras profundas infectadas por estreptococos em MMII',
      'Ictiose adquirida súbita em adultos jovens (considere rastrear neoplasias internas)'
    ],
    diferenciais: [
      'Dermatite atópica',
      'Ictiose vulgar hereditária',
      'Hipotireoidismo clínico severo',
      'Micose fúngica'
    ]
  },
  {
    id: 'L74.3',
    nome: 'Miliária Rubra (Brotoeja)',
    sintomas: [
      'Surgimento súbito de pápulas eritematosas inflamatórias milimétricas múltiplas',
      'Sensação acentuada de pinicação, coceira ou formigamento cutâneo',
      'Localização típica em tronco superior, pescoço, nuca, abdômen e dobras flexurais',
      'Pele local de aspecto quente, eritematoso difuso'
    ],
    fatores_risco: [
      'Idade pediátrica (lactentes agasalhados excessivamente com muitas camadas de roupas)',
      'Condições de clima muito quente, abafado e úmido sazonal',
      'Prática de atividades esportivas fatigantes com vestimentas que não evaporam o suor',
      'Oclusão de glândulas sudoríparas écrinas por pomadas hidratantes oleosas inapropriadas'
    ],
    red_flags: [
      'Miliária profunda com anidrose local difusa e exaustão por calor corporal',
      'Pustulização secundária massiva por infecção bacteriana reativa oportunista'
    ],
    diferenciais: [
      'Foliculite bacteriana superficial',
      'Exantema viral febril em fase inicial',
      'Farmacodermia papulosa leve',
      'Prurigo por picada de ectoparasita'
    ]
  },
  {
    id: 'L28.1',
    nome: 'Prurigo Nodular de Hyde',
    sintomas: [
      'Nódulos hiperceratósicos, firmes, elevados de cor acastanhada ou violácea',
      'Centro do nódulo frequentemente ulcerado, escoriado e coberto por crosta seca',
      'Prurido recorrente violento e incapacitante direcionado exclusivamente ao nódulo',
      'Distribuição principal simétrica em faces extensoras de braços, coxas e pernas',
      'Pele entre os nódulos tipicamente normal'
    ],
    fatores_risco: [
      'Histórico de dermatite atópica moderada a grave',
      'Pacientes sob estados de estresse psicossomático ou ansiedade crônica severa',
      'Doenças renais crônicas terminais (Prurido urêmico)',
      'Hepatopatias obstrutivas ou diabetes mellitus avançado'
    ],
    red_flags: [
      'Feridas abertas extensas nodulares colonizadas por microrganismos multirresistentes',
      'Surgimento de novos nódulos de consistência pétrea sugerindo diferenciação tumoral'
    ],
    diferenciais: [
      'Líquen simples crônico localizado amplo',
      'Sarna nodular persistente escabiótica',
      'Carcinoma espinocelular do tipo queratoacantoma'
    ]
  },
  {
    id: 'L27.0',
    nome: 'Farmacodermia Exantemática Leve',
    sintomas: [
      'Exantema maculopapular avermelhado simétrico que mimetiza o sarampo (morbiliforme)',
      'Prurido cutâneo de intensidade moderada a grave generalizado',
      'Surgimento em tronco que se dissemina rapidamente para membros',
      'Febre baixa concomitante na fase inicial de aparecimento clínico'
    ],
    fatores_risco: [
      'Introdução de um novo medicamento profilático ou terapêutico entre 7 a 21 dias antes',
      'Uso recente de antibióticos beta-lactâmicos, anticonvulsivantes ou alopurinol',
      'Fatores virais concomitantes ativos (ex: infecção aguda por EBV)'
    ],
    red_flags: [
      'Urgência Dermatológica: Acometimento de mucosas coradas (boca, olhos, genitais), descolamento epidérmico espontâneo com Sinal de Nikolsky positivo ou febre alta constante com dor de pele (sinais de Síndrome de Stevens-Johnson / NET)'
    ],
    diferenciais: [
      'Exantema viral agudo primário do adulto',
      'Sífilis secundária florida (Roséola sifilítica)',
      'Reação de hipersensibilidade alimentar imediata',
      'Dermatite atópica em exacerbação súbita'
    ]
  },
  {
    id: 'L82',
    nome: 'Ceratose Seborreica',
    sintomas: [
      'Placa ou pápula ceratósica de cor castanha, preta ou acinzentada untuosa',
      'Aparência característica de "colada sobre a pele" (bem superficial)',
      'Superfície de aspecto verrucoso com presença de tampões córneos',
      'Lesões totalmente indolores e assintomáticas (salvo se sofrerem atrito mecânico)',
      'Multiplicidade crônica com o decorrer dos anos em tronco superior e têmporas'
    ],
    fatores_risco: [
      'Idade de maturação biológica superior a 50 anos',
      'Predisposição hereditária direta familiar para múltiplas ceratoses',
      'Exposição ao sol cumulativa histórica prévia nas áreas afetadas'
    ],
    red_flags: [
      'Sinal de Leser-Trélat (erupção súbita, explosiva de centenas de ceratoses seborreicas pruriginosas, associada a neoplasia interna digestiva ou gástrica)'
    ],
    diferenciais: [
      'Melanoma nodular ou disseminado superficial',
      'Carcinoma basocelular pigmentado',
      'Nevo melanocítico atípico pigmentado',
      'Lentigo solar simples'
    ]
  },
  {
    id: 'L08.1',
    nome: 'Eritrasma',
    sintomas: [
      'Mancha marrom-avermelhada de limites nítidos e descamação superficial fina',
      'Acometimento de grandes dobras corporais (axila, região inguinal, inframamária)',
      'Geralmente assintomático, ou apresenta leve prurido tolerável local',
      'Ausência completa de vesículas ou pústulas periféricas',
      'Fluorescência vermelho-coral típica sob iluminação diagnóstica da Luz de Wood'
    ],
    fatores_risco: [
      'Condições climáticas sazonais tropicais quentes e úmidas constantes',
      'Obesidade e sudorese intertriginosa crônica exacerbada',
      'Diabetes mellitus descompensado tipo II ou imunossupressão crônica',
      'Proximidade microrganismo causador (Corynebacterium minutissimum)'
    ],
    red_flags: [
      'Celulite ou linfangite secundária sobreposta à dobra inguinal indurada em idosos diabéticos'
    ],
    diferenciais: [
      'Intertrigo candidiásico purulento',
      'Tinea cruris de margem ativa descamativa',
      'Psoríase invertida de placas vermelhas'
    ]
  },
  {
    id: 'L30.5',
    nome: 'Ptiríase Alba',
    sintomas: [
      'Máculas e placas hipopigmentadas (esbranquiçadas) arredondadas de limites imprecisos',
      'Presença constante de uma descamação fina, seca do tipo farelácea sobre a mancha',
      'Acometimento preferencial simétrico no rosto (bochechas), ombros e glabela',
      'Lesões completamente assintomáticas e indolores',
      'Torna-se mais visível após exposição ao sol de verão (pele ao redor bronzeia)'
    ],
    fatores_risco: [
      'Histórico pessoal ou familiar íntimo de dermatite atópica',
      'Exposição à radiação solar intensa sem o uso protetor físico/químico',
      'Tendência constitucional a pele seca ou xerótica na infância'
    ],
    red_flags: [
      'Eczema atópico disseminado agudo refratário a hidratantes dermatológicos'
    ],
    diferenciais: [
      'Vitiligo em fase inicial (manchas de vitiligo são totalmente acrômicas e sem descamação)',
      'Ptiríase versicolor fúngica',
      'Hanseníase indeterminada precoce de hipoestesia ou anestesia local'
    ]
  }
];
