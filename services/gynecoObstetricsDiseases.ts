import { MedicalDisease } from '../types';

export const GYNECO_OBSTETRICS_DISEASES: MedicalDisease[] = [
  {
    id: 'B37.3',
    nome: 'Candidíase Vulvovaginal',
    sintomas: [
      'Prurido vulvar intenso e constante',
      'Corrimento vaginal esbranquiçado, grumoso (aspecto de nata de leite)',
      'Ardência ou disúria terminal',
      'Dispareunia de introito',
      'Hiperemia e edema de vulva e vagina',
      'Fissuras vulvares dolorosas'
    ],
    fatores_risco: [
      'Uso recente de antibióticos de amplo espectro',
      'Diabetes Mellitus descompensado',
      'Habito de usar roupas íntimas úmidas ou sintéticas por tempo prolongado',
      'Uso de corticoides ou imunossupressores',
      'Gestação',
      'Elevados níveis de estrogênio (anticoncepcionais hormonais)'
    ],
    red_flags: [
      'Sintomas recorrentes com mais de 4 episódios ao ano',
      'Presença de celulite perineal ou abscesso vulvar',
      'Disseminação bacteriana secundária por escoriações intensas',
      'Acometimento extenso em pacientes gravemente imunocomprometidas (ex: HIV positivo com baixa contagem de CD4)'
    ],
    diferenciais: [
      'Vaginose bacteriana',
      'Vaginose citolítica (lactobacilose)',
      'Tricomoníase vaginal',
      'Dermatite de contato vulvar alergogênica'
    ],
    achados_exames: [
      'Exame microscópico a fresco com solução salina ou KOH a 10%: visualização de hifas, pseudo-hifas e esporos/leveduras.',
      'pH vaginal medido por fita reativa: tipicamente ácido, menor que 4.5.',
      'Cultura para fungos em meio Sabouraud: indicada principalmente em casos recidivantes ou refratários ao tratamento empírico habitual.'
    ],
    criterios_diagnosticos: [
      'Presença de quadro clínico compatível com prurido vulvovaginal característico.',
      'Confirmado por visualização microscópica direta a fresco das hifas/leveduras ou pH vaginal ácido (≤ 4.5).',
      'Em casos complicados ou recidivantes, cultura fúngica positiva com identificação de espécie (ex: Candida non-albicans).'
    ]
  },
  {
    id: 'N76.0',
    nome: 'Vaginose Bacteriana',
    sintomas: [
      'Corrimento vaginal fluido homogêneo, acinzentado ou branco-amarelado',
      'Odor vaginal fétido desagradável (semelhante a peixe podre), pior após coito ou menstruação',
      'Prurido vulvar leve ou ausente',
      'Irritação local discreta'
    ],
    fatores_risco: [
      'Duchas vaginais frequentes ou uso excessivo de sabonetes íntimos',
      'Multiplicidade de parceiros sexuais ou novos parceiros',
      'Tabagismo ativo',
      'Relação sexual desprotegida',
      'Uso recente de DIU de cobre'
    ],
    red_flags: [
      'Associação com gestação (risco aumentado de parto prematuro ou amniorrexe)',
      'Associação com sangramento persistente bizarro pós-coito',
      'Sintomas pélvicos profundos sugerindo progressão para DIP'
    ],
    diferenciais: [
      'Tricomoníase vaginal',
      'Candidíase vulvovaginal',
      'Vaginite aeróbica',
      'Vaginite descamativa inflamatória'
    ],
    achados_exames: [
      'Exame microscópico a fresco com salina: identificação de células-alvo ou "Clue cells" (células epiteliais cobertas por cocobacilos com bordas borradas).',
      'Teste do Olfato (Whiff Test) com adição de KOH 10%: liberação de aminas voláteis voláteis fétidas.',
      'pH vaginal medido por fita: elevado, tipicamente maior que 4.5.'
    ],
    criterios_diagnosticos: [
      'Critérios Clínicos de Amsel (requer pelo menos 3 de 4 critérios presentes):',
      '1. Corrimento vaginal cinza-esbranquiçado, fluido e homogêneo.',
      '2. pH vaginal > 4.5.',
      '3. Whiff test (teste de liberação de aminas com KOH 10%) positivo.',
      '4. Presença de "Clue Cells" na microscopia direta (mais de 20% das células epiteliais visíveis).',
      'Alternativamente, Escore de Nugent na bacterioscopia corada pelo Gram superior a 7.'
    ]
  },
  {
    id: 'A59.0',
    nome: 'Tricomoníase Vaginal',
    sintomas: [
      'Corrimento vaginal abundante, fluido, bolhoso, de cor amarelo-esverdeada',
      'Odor genital desagradável',
      'Prurido e queimação vulvovaginal',
      'Disúria e polaciúria',
      'Dispareunia profunda',
      'Sinusorragia (sangramento pós-coito)'
    ],
    fatores_risco: [
      'Relações sexuais desprotegidas sem preservativo',
      'Múltiplos parceiros sexuais ativos',
      'Histórico pessoal de outras infecções sexualmente transmissíveis (ISTs)',
      'Baixo nível socioeconômico ou acesso reduzido à saúde'
    ],
    red_flags: [
      'Associação em gestantes (induz parto prematuro, ruptura prematura de membranas e recém-nascido de baixo peso)',
      'Corrimento hemorrágico ou purulento abundante com febre',
      'Associação a infecções graves do trato reprodutor superior (DIP)'
    ],
    diferenciais: [
      'Vaginose bacteriana',
      'Cervicite mucopurulenta por clamídia ou gonococo',
      'Candidíase vulvovaginal',
      'Vaginite descamativa inflamatória'
    ],
    achados_exames: [
      'Exame microscópico a fresco com solução salina imediata: visualização do protozoário flagelado móvel oval (Trichomonas vaginalis).',
      'Exame especular: colo uterino com aspecto de framboesa (colpite focal ou máculas eritematosas em morango).',
      'pH vaginal medido por fita: significativamente elevado (> 5.0).',
      'Testes de Amplificação de Ácido Nucleico (NAAT): alta sensibilidade e especificidade, padrão de referência.'
    ],
    criterios_diagnosticos: [
      'Detecção do Trichomonas vaginalis no corrimento por exame microscópico direto a fresco (móvel, flagelado).',
      'Alternativamente, teste NAAT ou cultura em meio Diamond positivos.',
      'Achado típico de colpite maculopapular (colo em morango) no exame físico com pH vaginal elevado (> 5.0).'
    ]
  },
  {
    id: 'N73.9',
    nome: 'Doença Inflamatória Pélvica',
    sintomas: [
      'Dor abdominal infraumbilical ou pélvica bilateral contínua',
      'Dispareunia profunda de início recente',
      'Corrimento vaginal ou cervical purulento e espesso',
      'Febre ou calafrios eventuais',
      'Sangramento uterino anormal (sinusorragia ou sangramento intermenstrual)'
    ],
    fatores_risco: [
      'Idade jovem (menor de 25 anos)',
      'Múltiplos parceiros sexuais',
      'Inserção recente de Dispositivo Intrauterino (DIU), principalmente nos primeiros 20 dias',
      'Histórico de Doença Inflamatória Pélvica prévia',
      'Não uso de preservativos'
    ],
    red_flags: [
      'Presença de instabilidade hemodinâmica, taquicardia ou choque séptico',
      'Sinais de irritação peritoneal difusa (sinal de Blumberg positivo em fossas ilíacas ou abdome total)',
      'Náuseas e vômitos persistentes com incapacidade de manter via oral',
      'Suspeita de Abscesso Tubo-ovariano por palpação de massa pélvica muito dolorosa',
      'Gestação concomitante',
      'Piora clínica acentuada após início de antibioticoterapia oral de 72h'
    ],
    diferenciais: [
      'Apendicite aguda',
      'Gravidez ectópica',
      'Torção anexial / de ovário',
      'Endometriose exacerbada',
      'Cisto ovariano roto com hemoperitônio'
    ],
    achados_exames: [
      'Ultrassonografia Pélvica Transvaginal: espessamento de trompas uterinas com acúmulo interno de fluido (hidrossalpinge/piossalpinge), líquido livre na pelve ou massa anexial complexa.',
      'Hemograma completo e Provas de Atividade Inflamatória: leucocitose marcante com neutrofilia, PCR e VHS marcadamente elevados.',
      'Pesquisa molecular por NAAT ou cultura cervical para Neisseria gonorrhoeae e Chlamydia trachomatis: frequentemente positiva.'
    ],
    criterios_diagnosticos: [
      'Critérios Clínicos do Ministério da Saúde / CDC (requer a presença de pelo menos dois critérios maiores e um critério menor ou um critério elaborado):',
      'Critérios Maiores:',
      '- Dor à palpação do abdome inferior / pelve.',
      '- Dor à mobilização do colo uterino ao toque vaginal.',
      '- Dor à palpação anexial bilateral.',
      'Critérios Menores:',
      '- Temperatura oral > 38.3°C ou axiliar > 38°C.',
      '- Corrimento vaginal ou cervical purulento anormal.',
      '- Elevação de PCR ou VHS.',
      '- Identificação laboratorial de gonococo ou clamídia em esfregaço cervical.',
      'Critérios Elaborados:',
      '- Evidência histológica de endometrite na biópsia.',
      '- Ultrassonografia pélvica transvaginal demonstrando trompas espessadas com líquido ou abscesso tubo-ovariano.'
    ]
  },
  {
    id: 'E28.2',
    nome: 'Síndrome dos Ovários Policísticos',
    sintomas: [
      'Irregularidade menstrual com oligomenorreia ou amenorreia secundária',
      'Hirsutismo (excesso de pelos em áreas androgênicas como queixo, buço e tórax)',
      'Acne vulgar resistente de padrão androgênico',
      'Alopécia de padrão masculino',
      'Ganho de peso de difícil controle',
      'Presença de acantose nigricans (pescoço e axilas)'
    ],
    fatores_risco: [
      'Histórico familiar de SOP',
      'Diabetes Mellitus tipo 2 ou intolerância à glicose na família',
      'Obesidade central ou sobrepeso',
      'Sedentarismo habitual ou estilo de vida inadequado'
    ],
    red_flags: [
      'Sangramento uterino disfuncional grave com instabilidade hematológica',
      'Espessura endometrial > 15 mm na ultrassonografia na pós-menopausa ou em ciclos anovulatórios crônicos prolongados (risco de câncer endometrial)'
    ],
    diferenciais: [
      'Hiperplasia adrenal congênita de início tardio (forma não clássica)',
      'Hiperprolactinemia primária',
      'Disrelação tireoidiana (hipo ou hipertireoidismo)',
      'Tumor ovariano ou adrenal produtor de androgênios'
    ],
    achados_exames: [
      'Ultrassonografia Pélvica ou Transvaginal: ovários aumentados de volume (> 10 cm³) contendo 12 ou mais folículos medindo de 2 a 9 mm de diâmetro dispostos na periferia (aspecto em colar de pérolas).',
      'Dosagem hormonal (coletada na fase folicular precoce): Testosterona total e livre elevadas, relação LH/FSH alterada de 2:1 ou superior, SHBG diminuído.',
      'Perfil metabólico: Curva glicêmica (TOTG 75g) e curva de insulina mostrando resistência insulínica, perfil lipídico alterado.'
    ],
    criterios_diagnosticos: [
      'Critérios Consensuais de Rotterdam (requer pelo menos 2 de 3 critérios após exclusão de outras etiologias):',
      '1. Oligo-anovulação ou anovulação crônica (irregularidade menstrual).',
      '2. Sinais clínicos (hirsutismo, acne) ou bioquímicos (elevação sérica de androgênios) de hiperandrogenismo.',
      '3. Imagem ultrassonográfica ovariana policística típica (12 ou mais folículos em colar de pérolas de 2-9mm e/ou volume ovariano aumentado > 10 mL).'
    ]
  },
  {
    id: 'N80.9',
    nome: 'Endometriose',
    sintomas: [
      'Dismenorreia secundária importante que piora progressivamente',
      'Dor pélvica crônica não cíclica (duração maior que 6 meses)',
      'Dispareunia profunda de forte intensidade',
      'Infertilidade conjugal primária ou secundária',
      'Sintomas urinários cíclicos (disúria, hematúria na menstruação)',
      'Sintomas intestinais cíclicos (dor ao evacuar, tenesmo, diarreia na menstruação)'
    ],
    fatores_risco: [
      'Histórico familiar em parentes de primeiro grau',
      'Menarca precoce (antes dos 11 anos)',
      'Ciclos menstruais curtos (< 27 dias)',
      'Fluxo menstrual abundante com longa duração',
      'Nuliparidade',
      'Malformações uterinas obstrutivas'
    ],
    red_flags: [
      'Obstrução ureteral progressiva silenciosa com risco de perda da função renal',
      'Hemorragia intestinal cíclica indicando infiltração profunda da mucosa retossigmoide',
      'Ruptura aguda de endometrioma ovariano manifestando abdome agudo cirúrgico'
    ],
    diferenciais: [
      'Doença Inflamatória Pélvica crônica',
      'Síndrome do Intestino Irritável',
      'Adenomiose uterina',
      'Cistite intersticial',
      'Aderências pélvicas pós-operatórias'
    ],
    achados_exames: [
      'Ressonância Magnética (RM) da Pelve com protocolo para endometriose profunda: identificação de focos e placas espessas infiltrativas em compartimento anterior e posterior, endometriomas ovarianos.',
      'Ultrassonografia Transvaginal com preparo intestinal prévio: alta acurácia para mapeamento de endometriose profunda acometendo retossigmoide, septo retovaginal e ligamentos uterossacros.',
      'Marcador sérico CA 125: pode apresentar elevação moderada, porém possui baixa especificidade diagnóstica isoladamente.'
    ],
    criterios_diagnosticos: [
      'Mapeamento clínico-radiológico definitivo compatível por RM de alta resolução ou USG com preparo intestinal específico.',
      'Confirmação por visualização de lesões laparoscópicas típicas (lesões em "queimadura de pólvora" ou endometriomas).',
      'Diagnóstico definitivo de certeza obtido através do exame histopatológico de biópsia da lesão mostrando glândulas e estroma endometrial ectópicos.'
    ]
  },
  {
    id: 'D25.9',
    nome: 'Miomatose Uterina',
    sintomas: [
      'Menorragia (fluxo menstrual excessivo) e sangramento uterino prolongado',
      'Dor pélvica crônica, sensação de peso ou pressão no baixo ventre',
      'Aumento volumétrico do abdome mimetizando gestação',
      'Infertilidade ou abortos de repetição',
      'Sintomas de compressão vesical (polaciúria ou retenção urinária)',
      'Constipação intestinal crônica por compressão retal'
    ],
    fatores_risco: [
      'Idade fértil de transição (entre 35 e 50 anos)',
      'História familiar positiva em primeiro grau',
      'Nuliparidade',
      'Raça negra (três vezes maior prevalência)',
      'Menarca precoce',
      'Obesidade e dieta rica em carne vermelha'
    ],
    red_flags: [
      'Anemia ferropriva grave refratária necessitando de transfusão sanguínea',
      'Necrose ou degeneração aguda de mioma (subseroso pediculado) mimetizando abdome agudo com dor intratável',
      'Crescimento rápido do tumor na pós-menopausa (sugere leiomiossarcoma uterino)'
    ],
    diferenciais: [
      'Adenomiose uterina',
      'Hiperplasia endometrial',
      'Pólipos endometriais',
      'Neoplasia endometrial (câncer de endométrio)',
      'Sarcomas uterinos'
    ],
    achados_exames: [
      'Ultrassonografia Pélvica Transvaginal: útero de volume aumentado com contornos nodulares distorcidos por nódulos hipoecoicos bem delimitados, sombras acústicas posteriores características.',
      'Histerossonografia ou Histeroscopia diagnóstica: identificação e mapeamento preciso de miomas submucosos proeminentes na cavidade uterina.',
      'Ressonância Magnética Pélvica: mapeamento exato de múltiplos miomas (localização submucosa, intramural e subserosa) para planejamento cirúrgico (miomectomia).'
    ],
    criterios_diagnosticos: [
      'Confirmado por exame físico palpatório (útero aumentado, multinodular) associado a exame de imagem ultrassonográfico pélvico demonstrando nódulos compatíveis.',
      'Histopatológico confirmatório após cirurgia (miomectomia ou histerectomia) evidenciando proliferação benigna de células musculares lisas entremeadas por colágeno.'
    ]
  },
  {
    id: 'N93.9',
    nome: 'Sangramento Uterino Anormal',
    sintomas: [
      'Aumento do volume sanguíneo menstrual (perda de mais de 80 mL)',
      'Aumento na duração do fluxo menstrual (menstruação > 8 dias)',
      'Sangramento de escape de caráter intermenstrual',
      'Ciclos menstruais curtos com alta frequência (< 24 dias)',
      'Fadiga acentuada e palidez decorrentes de anemia secundária'
    ],
    fatores_risco: [
      'Ciclos anovulatórios persistentes na adolescência precoce e perimenopausa',
      'Uso inadequado de hormônios ou pílulas anticoncepcionais de emergência',
      'Presença de patologias uterinas estruturais (miomas, pólipos, adenomiose)',
      'Distúrbios de coagulação sistêmicos (ex: Doença de von Willebrand)',
      'Obesidade importante e sedentarismo'
    ],
    red_flags: [
      'Instabilidade hemodinâmica, palpitações, hipotensão severa aguda por sangramento torrencial',
      'Evidência ultra-sonográfica de espessamento endometrial focal em mulher na pós-menopausa (rastreio de câncer)',
      'Associação com febre e forte dor pélvica profunda (endometrite aguda)'
    ],
    diferenciais: [
      'Gravidez inicial e complicações de gestação (ameaça de abortamento, ectópica)',
      'Pólipo endometrial ou cervical',
      'Coagulopatias sistêmicas não diagnosticadas',
      'Câncer de colo de útero ou endométrio'
    ],
    achados_exames: [
      'Hemograma completo de urgência com plaquetograma, ferritina sérica e exames de coagulação (TAP, TTPA).',
      'Teste de gravidez (Beta-hCG quantitativo): obrigatório em toda paciente em idade fértil.',
      'Ultrassonografia Transvaginal: avaliação de espessamento endometrial anormal, presença de miomas submucosos ou intramurais.',
      'Biópsia endometrial aspirativa (Pipelle de Cornier) ou histeroscopia com biópsia direta, se espessamento ou idade > 45 anos.'
    ],
    criterios_diagnosticos: [
      'Investigação diagnóstica padronizada pelo sistema PALM-COEIN da Federação Internacional de Ginecologia e Obstetrícia (FIGO):',
      'Causas Estruturais (PALM): Pólipo (P), Adenomiose (A), Leiomioma (L), Malignidade / Hiperplasia (M).',
      'Causas Não Estruturais (COEIN): Coagulopatia (C), Disfunção Ovulatória (O), Endometrial (E), Iatrogênica (I), Não classificada de outra forma (N).',
      'Fechamento diagnóstico pela exclusão de gestação e caracterização das etiologias do sistema PALM-COEIN por imagem e laboratório.'
    ]
  },
  {
    id: 'O91.2',
    nome: 'Mastite Puerperal Lactacional',
    sintomas: [
      'Dor mamária intensa localizada unilateral',
      'Presença de área endurecida, quente, vermelha e brilhante na mama afetada',
      'Febre alta de início súbito (> 38.5°C) e calafrios intensos',
      'Fadiga proeminente, mialgia generalizada (sintomas gripais)',
      'Presença de fissuras mamilares dolorosas por problemas de pega do lactente'
    ],
    fatores_risco: [
      'Pega inadequada do bebê e técnica incorreta de amamentação',
      'Esvaziamento mamário incompleto ou pular mamadas',
      'Hiperlactação mamária secundária a uso de bombas',
      'Cansaço materno extremo e estresse emocional do pós-parto',
      'Uso de sutiãs apertados que bloqueiam dutos mamários',
      'Histórico de mastite em gestações anteriores'
    ],
    red_flags: [
      'Presença de área de flutuação palpável dolorosa (sugere Abscesso Mamário estabelecido)',
      'Necrose de pele subjacente ou drenagem espontânea de pus',
      'Sinais de sepse sistêmica (taquipneia, taquicardia severa, hipotensão)',
      'Ausência total de melhora clínica nas primeiras 48 horas de uso de antibiótico adequado'
    ],
    diferenciais: [
      'Ingurgitamento mamário simples (febre baixa, acometimento tipicamente bilateral sem sinais flogísticos focais severos)',
      'Abscesso mamário encapsulado',
      'Duto lactífero obstruído simples (ausência de febre alta ou sintomas sistêmicos)',
      'Carcinoma inflamatório de mama (raro, mimetiza sinais de mastite crônica)'
    ],
    achados_exames: [
      'Diagnóstico essencialmente clínico, baseado na anamnese e exames de inspeção e palpação das mamas.',
      'Cultura do leite materno extraído manualmente de forma asséptica: indicada em infecções graves, refratárias ao tratamento, ou de origem hospitalar.',
      'Ultrassonografia Mamária: indicada para confirmar ou afastar abscesso mamário profundo em casos de suspeita de coleções líquidas complexas.'
    ],
    criterios_diagnosticos: [
      'Diagnóstico clínico firmado na presença de sinais inflamatórios mamários focais em lactante (dor, calor, rubor, edema/endurecimento).',
      'Associado obrigatoriamente a febre materna (> 38°C) ou manifestações sistêmicas gripais proeminentes (mialgia, calafrios).',
      'Se houver dúvida de abscesso associado, diagnóstico de exclusão confirmado por US mamária com aspiração positiva.'
    ]
  },
  {
    id: 'N75.1',
    nome: 'Bartholinite Aguda',
    sintomas: [
      'Dor vulvar unilateral severa e progressiva que piora ao sentar e andar',
      'Inchaço acentuado e abaulamento na metade inferior do grande lábio vulvar',
      'Surgimento de nódulo/massa extremamente dolorosa no introito vaginal',
      'Presença de calor local, endurecimento e eritema intenso na vulva afetada',
      'Febre ou mal-estar em casos volumosos'
    ],
    fatores_risco: [
      'Presença de cisto assintomático da glândula de Bartholin prévio',
      'Comportamento sexual desprotegido facilitando infecção bacteriana',
      'Traumatismo vulvar local persistente',
      'Infecções prévias por germes de contaminação fecal (Enterobacteriaceae)'
    ],
    red_flags: [
      'Extensão do abscesso para espaço perirretal ou tecidos fasciais profundos',
      'Necrose perilesional ou surgimento de sinais de fascite necrotizante vulvar',
      'Sepse de foco de partes moles',
      'Mulheres idosas ou na pós-menopausa com bartholinite refratária (necessidade urgente de excluir Adenocarcinoma de glândula de Bartholin por biópsia após drenagem)'
    ],
    diferenciais: [
      'Cisto de inclusão epidérmica simples infectado',
      'Abscesso de glândula de Skene',
      'Hidradenite supurativa genital',
      'Hérnia inguinal/labial direta'
    ],
    achados_exames: [
      'Exame Físico Ginecológico detalhado: inspeção vulvar mostrando tumoração assimétrica com flutuação evidente na porção posterior do grande lábio.',
      'Cultura do fluido purulento obtido por aspiração ou drenagem espontânea: recomendado para identificação de agentes aeróbicos/anaeróbicos e guidar antibioticoterapia.',
      'Painel de patógenos sexuais (NAAT) para detecção de Neisseria gonorrhoeae e Chlamydia trachomatis, que estão associados.'
    ],
    criterios_diagnosticos: [
      'Diagnóstico puramente clínico pela constatação visual de tumoração edemaciada, eritematosa na extremidade correspondente da fenda vulvar posterior (posição de 4 ou 8 horas de relógio).',
      'Associado a quadro de dor genital aguda severa, com ponto de flutuação que confirma a formação de abscesso secundário de glândula de Bartholin.'
    ]
  },
  {
    id: 'N94.4',
    nome: 'Dismenorreia Primária',
    sintomas: [
      'Cólica abdominal em baixo ventre que se inicia com ou pouco antes do fluxo menstrual',
      'Irradiação da dor lombar ou em coxas bilaterais de padrão espasmódico',
      'Náuseas e vômitos reativos à intensidade dolorosa',
      'Diarreia funcional transitória concomitante',
      'Cefaleia e tontura leve',
      'Fadiga e irritabilidade episódicas durante o primeiro e segundo dia de fluxo'
    ],
    fatores_risco: [
      'Idade jovem (adolescentes precoce e adultas jovens menores de 25 anos)',
      'Menarca precoce (antes dos 11 anos)',
      'Fluxo menstrual volumoso ou de longa duração',
      'Tabagismo ativo ou exposição regular',
      'Baixo índice de massa corporal (mulheres magras)',
      'Histórico familiar de dismenorreia crônica'
    ],
    red_flags: [
      'Início tardio da dismenorreia após os 25 anos de idade (fortemente indicativo de dismenorreia secundária)',
      'Piora progressiva contínua ano a ano da intensidade da dor menstrual',
      'Associada a dispareunia profunda incapacitante de forma estável',
      'Ausência total de melhora clínica com uso combinado de anti-inflamatórios adequados e contraceptivos'
    ],
    diferenciais: [
      'Dismenorreia secundária por Endometriose profunda',
      'Dismenorreia por Adenomiose uterina',
      'Estreitamento ou estenose do canal cervical uterino',
      'Doença Inflamatória Pélvica subclínica crônica'
    ],
    achados_exames: [
      'Ultrassonografia Transvaginal ou Pélvica detalhada: exame de imagem ideal para descartar causas estruturais secundárias, devendo se mostrar rigorosamente normal em dismenorreia primária pura.',
      'Exames laboratoriais básicos (hemograma, PCR, EAS e exames de ISTs): normais e indicados apenas se suspeita de infeccioso.'
    ],
    criterios_diagnosticos: [
      'Diagnóstico clínico eminentemente clínico baseado na história e ciclo reprodutivo.',
      'Presença de dor pélvica espasmódica típica restrita apenas aos dias regulados de sangramento menstrual.',
      'Exclusão sistemática de quaisquer anormalidades anatômicas, pélvicas ou uterinas através do exame ginecológico especular e toque bimanual normais, em conjunto com ultrassonografia abdominal/pélvica normal.'
    ]
  },
  {
    id: 'N91.1',
    nome: 'Amenorreia Secundária',
    sintomas: [
      'Ausência completa de menstruação por pelo menos 3 meses em mulheres com ciclos regulares prévios',
      'Ausência de sangramento por 6 meses ou mais em pacientes com ciclos irregulares de base',
      'Sintomas associados à etiologia específica (ondas de calor, galactorreia, cefaleia, alterações no campo visual, hirsutismo)'
    ],
    fatores_risco: [
      'Restrição dietética extrema, perda rápida de peso corporal ou desnutrição severa',
      'Exercício físico extenuante de alta performance (atratividade ou atletas de elite)',
      'Alto nível de estresse psicossocial contínuo',
      'Uso de drogas psicotrópicas que causem hiperprolactinemia primária',
      'Histórico pessoal de quimioterapia ou radioterapia intrapélvica'
    ],
    red_flags: [
      'Ausência de sangramento acompanhado de cefaleia súbita ou persistente com hemianopsia bitemporal (sugere tumor de hipófise como macroadenoma)',
      'Desenvolvimento rápido de ascite, dor pélvica de início rápido em paciente idosa (rastreio de neoplasia de ovário secreta)',
      'Presença de virilização severa de início súbito (clitoromegalia extrema, voz rouca, calvície temporal)'
    ],
    diferenciais: [
      'Gravidez em curso (causa mais prevalente disparada em idade fértil)',
      'Síndrome dos Ovários Policísticos',
      'Falência Ovariana Prematura (Menopausa precoce)',
      'Adenoma de Hipófise produtor de prolactina (Prolactinoma)',
      'Síndrome de Asherman (aderências na cavidade endometrial pós-curetagens)'
    ],
    achados_exames: [
      'Teste de Gravidez (Beta-hCG sérico ou urinário): o primeiro exame mandatório absoluto antes de qualquer investigação.',
      'Perfil hormonal sérico completo: prolactina basal, TSH, FSH, LH, Estradiol e hormônios androgênicos se sinais de virilização.',
      'Teste de Provocação com Progesterona (ex: acetato de medroxiprogesterona 10 mg por 7-10 dias): avalia competência endometrial e canal de saída vaginal.',
      'RM de Sela Túrcica: indicada se hiperprolactinemia persistente confirmada ou manifestações clínicas visuais/neurológicas sérias.'
    ],
    criterios_diagnosticos: [
      'Ausência prolongada documentada de fluxos menstruais ciclílicos por tempo igual ou superior a 3 ciclos habituais ou 6 meses sequenciais.',
      'Exclusão inicial rigorosa de gestação atual pelo Beta-hCG negativo.',
      'Localização etiológica definitiva baseada nos níveis de marcadores hormonais (hipogonadismo hipogonadotrófico vs hipergonadotrófico) e exames de imagem da pelve/crânio correspondentes.'
    ]
  },
  {
    id: 'N83.2',
    nome: 'Cisto Ovariano Roto',
    sintomas: [
      'Dor pélvica súbita, intensa, tipicamente unilateral, pós-coito, exercício ou trauma mecânico leve',
      'Surgimento de tontura ou fraqueza logo após o início da crise de dor',
      'Náuseas ou vômitos ocasionais decorrentes de irritação peritoneal',
      'Podem ocorrer pontadas dolorosas referidas no topo do ombro correspondente (sinal de Lafond por hemoperitônio)'
    ],
    fatores_risco: [
      'Presença prévia conhecida de cistos foliculares simples ou lúteos volumosos de ovário (> 4-5 cm)',
      'Uso de indutores de ovulação (clomifeno ou gonadofinas)',
      'Histórico de rotura de cisto ovariano prévia',
      'Atividades de impacto físico extenuantes'
    ],
    red_flags: [
      'Sinais óbvios de choque hemorrágico grave (palidez cutâneo-mucosa proeminente, sudorese, taquicardia > 120 bpm, PAS < 90 mmHg)',
      'Sinais de abdome agudo hemorrágico com peritonite generalizada e rigidez de parede abdominal',
      'Saturação de O2 em queda ou queda rápida de hematócrito/hemoglobina séricos nas mensurações sequenciais'
    ],
    diferenciais: [
      'Gravidez ectópica rota',
      'Torção de ovário / anexo',
      'Apendicite aguda',
      'Doença Inflamatória Pélvica com abscesso roto',
      'Rotura de cisto endometriótico (endometrioma)'
    ],
    achados_exames: [
      'Ultrassonografia Pélvica Transvaginal: útero normal e ovário unilateral apresentando perda de contorção definida, associado a moderada ou grande quantidade de líquido livre na cavidade peritoneal posterior (fundo de saco de Douglas) com ecogenicidade / debris (sugestivo de sangue).',
      'Hemograma seriado: monitora decréscimo agudo nos valores de hematócrito e hemoglobina indicando hemorragia volumosa ativa.',
      'Beta-hCG quantitativo negativo para exclusão inabalável de gravidez ectópica ou gestação inicial.'
    ],
    criterios_diagnosticos: [
      'Quadro clínico clássico característico de dor pélvica severa e aguda unilateral surgindo após relação sexual ou impacto físico.',
      'Identificação à ultrassonografia de imagem ovariana compatível com rotura e presença de fluido livre na pelve em fundo de saco.',
      'Exclusão de etiologia gestacional por mensuração de Beta-hCG rigorosamente negativo no plasma.'
    ]
  },
  {
    id: 'N83.5',
    nome: 'Torção de Ovário',
    sintomas: [
      'Dor pélvica unilateral súbita, excruciante e cólica progressiva',
      'Náuseas e vômitos refratários e persistentes (coincidindo quase imediatamente com a dor)',
      'Podem ocorrer picos de febre baixa a moderada decorrente de isquemia ou necrose',
      'Presença de massa pélvica/anexial palpável extremamente dolorosa ao toque íntimo bimanual'
    ],
    fatores_risco: [
      'Presença de massa ovariana ou cística (geralmente superior a 5 cm, como cistoadenoma ou teratoma benigno)',
      'Ovários aumentados por hiperestimulação hormonal medicamentosa recente',
      'Ligamentos ovarianos longos congênitos ou alta mobilidade tubária',
      'Gravidez em curso (principalmente no primeiro trimestre devido a corpo lúteo grande)'
    ],
    red_flags: [
      'Dor abdominal persistente insuportável acompanhada de febre alta progressiva com calafrios (indício de necrose extensa com peritonite)',
      'Sinais de choque séptico de foco peritoneal por gangrena anexial',
      'Hipotensão postural e prostração extrema tardia'
    ],
    diferenciais: [
      'Cisto ovariano roto simples ou hemorrágico',
      'Apendicite aguda obstrutiva',
      'Gravidez ectópica',
      'DIP com abscesso tubo-ovariano doloroso'
    ],
    achados_exames: [
      'Laparoscopia diagnóstica de emergência: padrão-ouro confirmatório definitivo, permitindo visualizar o anexo torcido, edemaciado com congestão hemorrágica violácea crônica.',
      'Ultrassonografia Pélvica Transvaginal com Doppler colorido: mostra ovário aumentado de volume com estroma hiperecogênico e edema, múltiplos pequenos folículos periféricos deslocados e ausência ou assimetria drástica de fluxo arterial/venoso nos vasos centrais ovarianos (sinal do redemoinho / Whirlpool sign).',
      'Hemograma e Proteína C Reativa: leucocitose moderada com neutrofilia indicando necrose de tecidos ou isquemia em andamento.'
    ],
    criterios_diagnosticos: [
      'Suspeita baseada em quadro clínico altamente agudo de dor unilateral pélvica severa iniciada de forma abrupta e associada a náuseas marcantes com vômitos frequentes.',
      'Exame de imagem Ultrassonografia transvaginal com Doppler mostrando ovário edemaciado volumoso unilateral com padrão do Doppler sugestivo de parada circulatória.',
      'Confirmação de certeza e tratamento cirúrgico definitivo de urgência por via laparoscópica direta comprovando torção mecânica parcial ou completa de pedículo anexo.'
    ]
  },
  {
    id: 'N95.3',
    nome: 'Vulvovaginite Atrófica',
    sintomas: [
      'Secura vaginal persistente marcante',
      'Queimação vulvovaginal e prurido local constante doloroso',
      'Dispareunia de introito de forte intensidade (dor durante relações por falta de lubrificação)',
      'Sangramento de escape vaginal discreto (microfissuras traumáticas pós-coitais)',
      'Ardência ao urinar (disúria/urgência) e episódios de cistite de repetição por fragilidade uretral'
    ],
    fatores_risco: [
      'Estado fisiológico de Pós-Menopausa instalada espontânea ou induzida cirurgicamente',
      'Ooferectomia bilateral prévia (retirada cirúrgica dos ovários)',
      'Período prolongado de lactação ativa exclusiva',
      'Uso crônico de agonistas do GnRH ou moduladores de receptores estrogênicos (como tamoxifeno para câncer de mama)',
      'Mulheres em tratamento recente com quimioterapia ou radioterapia pélvica'
    ],
    red_flags: [
      'Sangramento vaginal volumoso bizarro inexplicável na pós-menopausa (indica rastreio de câncer endometrial na primeira consulta)',
      'Fissuras localizadas dolorosas recalcitrantes com suspeita de lesões pré-neoplásicas (Líquen escleroso ou neoplasia vulvar necessitando de biópsia direcionada)'
    ],
    diferenciais: [
      'Candidíase vulvovaginal recidivante senil',
      'Líquen escleroso vulvar',
      'Vaginite inflamatória descamativa',
      'Dermatite liquenoide vulvar'
    ],
    achados_exames: [
      'Exame Físico Especular: mucosa vaginal de coloração pálida, adelgaçada, com perda completa de rugosidades, presença de petéquias ou sangramento fácil sob leve raspado.',
      'pH vaginal medido por fita: manifesta elevação marcante, tipicamente em faixa alcalina de 5.5 a 7.0 devido à perda de lactobacilos.',
      'Esfregaço Citopatológico Cervico-Vaginal: revela predomínio absoluto de células epiteliais parabasais e basais, com completa ausência ou escassez de células superficiais (padrão de atrofia pura).'
    ],
    criterios_diagnosticos: [
      'Diagnóstico clínico firmado em mulher na pós-menopausa ou com status de hipoestrogenismo óbvio crônico documental.',
      'Presença de sintomas marcantes de secura vaginal, dispareunia e queimação associados a exame ginecológico típico demonstrando mucosa vaginal pálida, adelgaçada com perda das rugas fisiológicas.',
      'Exclusão de focos fúngicos ou bacterianos e pH vaginal alcalinizado (> 5.0).'
    ]
  },
  {
    id: 'N85.0',
    nome: 'Hiperplasia Endometrial',
    sintomas: [
      'Sangramento uterino anormal persistente na pós-menopausa',
      'Sangramento menstrual abundante de caráter mofado com coágulos na transição para menopausa',
      'Sangramento intermenstrual recorrente de volume variado',
      'Corrimento vaginal amarelado ou rosado de odor neutro'
    ],
    fatores_risco: [
      'Terapia de reposição hormonal com estrogênio isolado sem progesterona',
      'Anovulação crônica prolongada (como em mulheres com SOP sem tratamento)',
      'Obesidade e sobrepeso (conversão periférica de androgênios em estrogênio pela aromatase adiposa)',
      'Nuliparidade',
      'Presença de diabetes mellitus crônica e hipertensão arterial',
      'Uso de tamoxifeno para tratamento oncológico de mama'
    ],
    red_flags: [
      'Sangramento vaginal ativo torrencial na menopausa',
      'Ultrassonografia transvaginal revelando eco endometrial de espessura extremamente aumentada (> 15 mm na pré-menopausa ou > 4-5 mm na pós-menopausa)',
      'Identificação histológica de Atipias Celulares Severas na biópsia inicial (risco altíssimo de coexistência ou progressão para adenocarcinoma endometrial)'
    ],
    diferenciais: [
      'Adenocarcinoma de endométrio (câncer endometrial)',
      'Pólipos endometriais benignos focalizados',
      'Atrofia endometrial senil hemorrágica simples',
      'Leiomioma uterino de parede submucosa'
    ],
    achados_exames: [
      'Ultrassonografia Transvaginal: exame de triagem ideal que mimetiza o padrão-ouro de avaliação, medindo com precisão a espessura da linha endometrial e detectando irregularidades focais.',
      'Histeroscopia diagnóstica direta de consultório comercializada com biopsia dirigida endometrial direta: padrão excelente para visibilidade da cavidade uterina.',
      'Exame Histopatológico (da biopsia por curetagem fracionada, biópsia por Pipelle de Cornier ou ressecção histeroscópica): laudo definitivo que diferencia Hiperplasia Sem Atipias de Hiperplasia Com Atipias (atualmente classificadas pela OMS).'
    ],
    criterios_diagnosticos: [
      'Baseado fundamentalmente na análise histopatológica de amostras teciduais de endométrio uterino obtidas por biópsia dirigida ou curetagem.',
      'Classificação segundo as normas da Organização Mundial da Saúde (OMS):',
      '- Hiperplasia Endometrial Benigna (sem atipias): proliferação excessiva de glândulas com arquitetura irregular mas sem características nucleares malignas.',
      '- Hiperplasia Endometrial Atípica (Neoplasia Intraepitelial Endometrial - NIE): glândulas superlotadas com atipia citológica, mimetizando lesão precursora direta de câncer.'
    ]
  },
  {
    id: 'N94.8',
    nome: 'Dor Pélvica Crônica',
    sintomas: [
      'Dor constante ou intermitente na pelve/baixo ventre de duração igual ou superior a 6 meses',
      'Dor sem correlação exclusiva com o ciclo menstrual menstrual',
      'Sensação de peso pélvico interno incapacitante ao realizar esforços físicos leves',
      'Insônia e sintomas de cunho depressivo secundários ao desgaste doloroso doloroso',
      'Impacto severo na atividade laboral, sexual e de lazer da paciente'
    ],
    fatores_risco: [
      'Presença conhecida de patologias como endometriose ou adenomiose prévias',
      'Histórico de infecções pélvicas intensas recorrentes ou DIP não tratada devidamente',
      'Cirurgias pélvicas abdominais ou cesarianas prévias acumuladas (gerando aderências de tecido pélvico)',
      'Antecedente pessoal de abuso físico ou sexual (alta correlação com hipersensibilização pélvica dolorosa)',
      'Presença de cistite intersticial ou fibromialgia sistêmica'
    ],
    red_flags: [
      'Perda de peso progressiva inexplicável associada à dor de início recente',
      'Sangramento vaginal espontâneo anormal na pós-menopausa',
      'Desenvolvimento súbito de ascite volumosa palpável',
      'Massa pélvica de crescimento rápido com endurecimento fixo no toque vaginal bimanual'
    ],
    diferenciais: [
      'Endometriose profunda infiltrativa silenciosa',
      'Síndrome do Intestino Irritável com dor em andares baixos',
      'Síndrome da Congestão Pélvica (varizes pélvicas periuterinas)',
      'Neuropatia do plexo hipogástrico ou aprisionamento de nervo perineal'
    ],
    achados_exames: [
      'Ultrassonografia Transvaginal detalhada ou Ressonância Magnética (RM) da Pelve: para pesquisa exaustiva e exclusão de causas orgânicas claras estruturais.',
      'Videolaparoscopia diagnóstica: padrão para visualizar diretamente micropatologias como focos de endometriose peritoneal peritoneal, aderências fibróticas intrapélvicas densas e coletivas.',
      'Cistoscopia urinária ou colonoscopia diagnóstica: de indicação se houver sintomas miccionais ou intestinais cíclicos preponderantes.'
    ],
    criterios_diagnosticos: [
      'Dor localizada e restrita na topografia da pelve, parede abdominal infraumbilical ou nádegas com duração documentada de pelo menos 6 meses consecutivos.',
      'Intensidade suficiente para causar comprometimento funcional ou absenteísmo regular.',
      'Diagnóstico de exclusão sindrômica ou confirmado por achados cirúrgicos/imagens de patologias específicas que fundamentem a cronicidade álgica dolorosa.'
    ]
  },
  {
    id: 'N94.3',
    nome: 'Síndrome da Tensão Pré-Menstrual',
    sintomas: [
      'Irritabilidade extrema, labilidade emocional flutuante ou crises de choro fácil',
      'Tristeza, ansiedade ou humor deprimido nos dias que antecedem a menstruação',
      'Distensão abdominal dolorosa subjetiva e retenção hídrica com edema de extremidades',
      'Mastalgia simétrica importante (dor e sensibilidade mamária bilateral)',
      'Cefaleia de forte intensidade pulsátil',
      'Fadiga e cansaço incapacitante, alteração do padrão de sono (insônia)',
      'Cefaleias alimentares (desejo ansioso por doces, chocolates)'
    ],
    fatores_risco: [
      'Mulheres em idade reprodutiva ativa (alta oscilação de progesterona e estrogênio)',
      'Histórico de transtornos de humor ou depressão pós-parto',
      'Elevados níveis de estresse emocional e profissional habitual',
      'Consumo excessivo de cafeína, sal ou álcool na dieta',
      'Sedentarismo'
    ],
    red_flags: [
      'Planejamento ideativo suicida, hostilidade física a familiares ou tentativas de autoagressão nos episódios agudos (sinal de TDPM - Transtorno Disfórico Pré-Menstrual Grave)',
      'Surto psicótico ou agitação motora perigosa restrita à fase lútea tardia'
    ],
    diferenciais: [
      'Transtorno Depressivo Maior unipolar ou Bipolar não diagnosticados',
      'Hipotireoidismo clínico inicial exacerbado',
      'Transtorno de Ansiedade Generalizada (TAG) flutuante',
      'Disfunção perimenopáusica induzida'
    ],
    achados_exames: [
      'Análise de Diário de Sintomas (ex: preenchimento diário do escore COPE ou DRSP por dois ciclos menstruais consecutivos): essencial para fechar o padrão cíclico.',
      'Exames laboratoriais gerais de exclusão (TSH, Prolactina, Hemograma, Glicemia): indicados para descartar desordens metabólicas sistêmicas simuladoras.'
    ],
    criterios_diagnosticos: [
      'Critérios Clínicos da American College of Obstetricians and Gynecologists (ACOG):',
      'Surgimento de pelo menos 1 sintoma afetivo (ex: labilidade, irritabilidade, ansiedade, depressão, isolamento) e/ou 1 sintoma físico (mastalgia, distensão, dor articular, dor de cabeça de padrão tensionador) durante os 5 dias anteriores ao fluxo menstrual.',
      'Alívio completo e espontâneo dos sintomas até o 4º dia do início do fluxo menstrual, com ausência de queixas até o dia 12 do ciclo.',
      'Confirmação prospectiva da ciclicidade dos sintomas por registro diário por no mínimo 2 ciclos consecutivos.'
    ]
  },
  {
    id: 'N81.3',
    nome: 'Prolapso Uterino',
    sintomas: [
      'Sensação subjetiva de "bola saindo da vagina" ou peso pélvico mecânico',
      'Visualização direta de massa de tecido mucoso que protrui através do introito vulvar',
      'Dificuldade para evacuar ou esvaziar a bexiga adequadamente',
      'Dificuldade ou dor durante o coito vaginal (dispareunia de barreira)',
      'Dor lombar difusa de caráter postural que melhora ao deitar'
    ],
    fatores_risco: [
      'Multiparidade com histórico de múltiplos partos vaginais espontâneos',
      'Parto vaginal instrumentado (fórceps) traumático na história gestacional ativa',
      'Hipoestrogenismo crônico (pós-menopausa) induzindo atrofia e flacidez de ligamentos uterinos',
      'Aumento persistente da pressão intra-abdominal crônica (tosse crônica, constipação severa, obesidade importante)',
      'Histórico familiar de fraqueza hereditária do tecido conjuntivo (síndromes de hipermobilidade)',
      'Idade avançada senil'
    ],
    red_flags: [
      'Incarceramento agudo do útero prolapsado com estrangulamento vascular mecânico e isquemia local',
      'Ulceração hemorrágica purulenta da mucosa vaginal extrusa refratária a tratamentos simples',
      'Retenção urinária aguda com hidronefrose obstrutiva bilateral e elevação de escórias renais'
    ],
    diferenciais: [
      'Cisto de parede vaginal simples localizado (ex: cisto de Gartner)',
      'Prolapso de cúpula vaginal pós-histerectomia anterior',
      'Uretero-cistocele proeminente',
      'Mioma uterino parido (mioma submucoso que se exterioriza pelo colo uterino)'
    ],
    achados_exames: [
      'Exame Físico Ginecológico estrutural em posição ginecológica e ortostática realizando a Manobra de Valsalva dirigida: essencial para graduação e estadiamento.',
      'Graduação pelo sistema POP-Q (Pelvic Organ Prolapse Quantification system): mede distâncias anatômicas padronizadas em centímetros em relação ao hímen vaginal vaginal para graduar do Estágio I ao Estágio IV.',
      'Ultrassonografias da Pelve ou RM dinâmica pélvica: para quantificar prolapsos multicompartimentais associados (cistocele, retocele, enterocele).'
    ],
    criterios_diagnosticos: [
      'Constatação evidente durante o exame ginecológico e bimanual de descida mecânica do útero e colo uterino através do canal vaginal abaixo de sua localização anatômica habitual.',
      'Estadiamento conforme o sistema POP-Q do grau do deslizamento:',
      '- Estágio I: colo do útero a mais de 1 cm acima do nível do hímen vaginal.',
      '- Estágio II: colo uterino localizado entre 1 cm acima e 1 cm abaixo do hímen vaginal.',
      '- Estágio III: colo projetando-se a mais de 1 cm abaixo do hímen, mas sem eversão uterina total.',
      '- Estágio IV: eversão uterina completa extramembranosa fora da vulva.'
    ]
  },
  {
    id: 'N39.3',
    nome: 'Incontinência Urinária de Esforço',
    sintomas: [
      'Perda involuntária de urina ao tossir, espirrar, rir, pular ou correr',
      'Perda de gotas ou jatos urinários ao levantar pesos ou realizar esforço físico leve',
      'Ausência habitual de urgência miccional ou contração dolorosa súbita da bexiga antecedendo a perda'
    ],
    fatores_risco: [
      'Histórico de gestações e partos vaginais sequenciais (enfraquecimento do assoalho pélvico)',
      'Obesidade e ganho ponderal rápido na fase reprodutiva',
      'Menopausa instalada com atrofia urogenital hipoestrogênica e perda de colágeno',
      'Cirurgia pélvica ginecológica anterior na uretra ou reto',
      'Doenças respiratórias crônicas que cursam com tosse de repetição (DPOC, asma crônica)'
    ],
    red_flags: [
      'Incontinência urinária associada a perda súbita de força em MMII ou anestesia em sela (sugere compressão medular / Síndrome da Cauda Equina)',
      'Incontinência de início recente pós-parto traumático com fórceps concomitante a fístula urinária de canal vaginal'
    ],
    diferenciais: [
      'Incontinência Urinária de Urgência (bexiga hiperativa por contrações involuntárias do músculo detrusor)',
      'Incontinência urinária mista (associação de esforço e urgência miccional)',
      'Fístula vesicovaginal ou uretro-vaginal pós-cirúrgica ou pós-radioterapia',
      'Incontinência por transbordamento (bexiga neurogênica hipotônica ou obstrução infravesical)'
    ],
    achados_exames: [
      'Teste do Esforço Físico Dirigido (Stress Test): visualização direta de perda urinária ao tossir ou fazer força com bexiga cheia em posição ginecológica.',
      'Estudo Urodinâmico Completo: padrão-ouro confirmatório. Revela perda involuntária de urina na ausência de contração do músculo detrusor durante a fase de enchimento vesical sob aumento da pressão abdominal, com Pressão de Perda sob Esforço (PPE) mensurável.',
      'Exame de urina tipo I (EAS) e Urocultura: obrigatórios para excluir infecção urinária ativa que mimetiza urgência/perda.'
    ],
    criterios_diagnosticos: [
      'Relato inequívoco clássico e documentado de perda involuntária urinária puramente associada a impacto ou manobras físicas de esforço abdominal.',
      'Constatação incontestável de perda de fluido com manobra provocativa direta no exame físico ou confirmação mecânica objetiva por Estudo Urodinâmico provando incompetência esfincteriana ou hipermobilidade do colo vesical.'
    ]
  },
  {
    id: 'N94.1',
    nome: 'Dispareunia',
    sintomas: [
      'Dor genital persistente ou recorrente associada à tentativa ou penetração vaginal efetiva',
      'Dor de introito vaginal superficial durante as fases iniciais do coito',
      'Dor pélvica profunda e intensa provocada por batidas penianas profundas',
      'Queimação vulvar ou espasmo involuntário protetor muscular vaginal (vaginismo reativo)'
    ],
    fatores_risco: [
      'Status pós-menopáusico com secura e fragilidade epitelial marcada',
      'Presença de patologias como endometriose peritoneal/profunda ou adenomiose',
      'Transtornos psicológicos genitais, ansiedade forte, depressão ou histórico traumático',
      'Infecções vulvovaginais fúngicas or bacterianas agudas recorrentes',
      'Cirurgia reconstrutiva pélvica prévia (colpoperineoplastias colaterais cicatriciais)',
      'Radioterapia para neoplasia pélvica na história'
    ],
    red_flags: [
      'Sinusorragia severa (sangramento vaginal abundante pós-coito indicando tumor invasivo ou cervicite)',
      'Presença de ulceração vulvovaginal ou corrimento de odor fétido com febre',
      'Fixação rígida ovariana pélvica com toque vaginal excruciante'
    ],
    diferenciais: [
      'Vaginismo primário (espasmo involuntário muscular pélvico reflexo sem lesão orgânica)',
      'Vulvovaginite atrófica hipoestrogênica',
      'Endometriose retrocervical ou abscesso tubo-ovariano crônico',
      'Vestibulodinia ou vestibulite vulvar inflamatória localizada'
    ],
    achados_exames: [
      'Exame Ginecológico Minucioso Especular e Toque Vaginal Bimanual: avaliação sistemática para diferenciar dor superficial (introito/vestíbulo) de dor profunda (colo de útero, fundo de saco posterior, anexos).',
      'Ultrassonografia Transvaginal ou RM Pélvica: rastreamento de endometriose retrocervical, adenomiose, miomas uterinos ou doença inflamatória.',
      'pH vaginal e bacterioscopia a fresco: indicados para afastar vulvovaginites subclínicas infecciosas provocadoras.'
    ],
    criterios_diagnosticos: [
      'Queixa persistente documentada de dor ou desconforto físico acentuado em qualquer momento da relação com penetração vaginal.',
      'Identificação clínica sistemática da topografia dolorosa (superficial vs profunda) para direcionar o fechamento etiológico estrutural (atrofia, infecção, estenose) ou orgânico pélvico (endometriose, DIP, aderências).'
    ]
  },
  {
    id: 'N95.1',
    nome: 'Climatério e Menopausa',
    sintomas: [
      'Fogachos ou ondas de calor súbitas no tronco superior e pescoço',
      'Sudorese noturna abundante acompanhada de despertares frequentes (insônia)',
      'Labilidade emocional com irritabilidade marcante, crises de ansiedade ou depressão leve',
      'Secura vaginal e dor nas relações sexuais (dispareunia)',
      'Diminuição progressiva da libido e tonturas ocasionais',
      'Ciclos menstruais cada vez mais longos ou esporádicos até a cessação completa'
    ],
    fatores_risco: [
      'Idade média entre 45 e 55 anos',
      'Tabagismo ativo (pode antecipar a idade da menopausa natural em 1 a 2 anos)',
      'Estilo de vida sedentário, estresse psíquico crônico',
      'Cirurgia ovariana prévia ou terapia gonadotrópica na juventude'
    ],
    red_flags: [
      'Sangramento vaginal de qualquer volume após 1 ano completo de ausência de menstruação (metrorragia da pós-menopausa obrigando rastreamento de câncer)',
      'Depressão grave refratária com ideação autoagressiva',
      'Perda de densidade mineral óssea rápida manifestando fraturas por fragilidade sob baixo impacto (osteoporose grave instalada)'
    ],
    diferenciais: [
      'Disfunção tireoidiana de início recente (hipertireoidismo simulando fogachos/sudorese)',
      'Transtorno de pânico com espasmos adrenérgicos recorrentes',
      'Feocromocitoma produtor de catecolaminas (raro)',
      'Neoplasia oculta (linfoma de Hodgkin manifestando sudorese noturna inexplicável)'
    ],
    achados_exames: [
      'Avaliação Clínica baseada na cronologia do ciclo menstrual e sintomatologia relatada.',
      'Hormônio Folículo-Estimulante (FSH) plasmático: consistentemente elevado (> 30-40 mUI/mL em coletas separadas).',
      'Estradiol plasmático: marcadamente diminuído, frequentemente inferior a 20-30 pg/mL.',
      'Densitometria Óssea de quadril e coluna lombar: indicada na pós-menopausa para avaliação preventiva de osteopenia ou osteoporose.',
      'Mamografia e Ultrassonografia transvaginal periódicas: essenciais antes de propor Terapia de Reposição Hormonal (TRH).'
    ],
    criterios_diagnosticos: [
      'Menopausa: fenômeno retrospectivo caracterizado pela ausência espontânea e consecutiva de menstruação por 12 meses completos em mulher em faixa etária compatível.',
      'Climatério: fase peri-menopáusica de transição que cursa com irregularidade do ciclo e flutuações hormonais associadas a sintomas vasomotores e neurovegetativos típicos.',
      'Confirmação laboratorial com FSH elevado (> 40 mUI/mL) é útil se houver dúvida etiológica (ex: menopausa precoce antes dos 40 anos ou em uso de contraceptivo).'
    ]
  },
  {
    id: 'N80.0',
    nome: 'Adenomiose',
    sintomas: [
      'Dismenorreia secundária dolorosa grave que progressivamente piora cíclica',
      'Menorragia severa com fluxo uterino volumoso e prolongado',
      'Útero de consistência amolecida, globalmente aumentado de volume (útero globoso)',
      'Dispareunia profunda',
      'Dor pélvica crônica incapacitante persistente'
    ],
    fatores_risco: [
      'Histórico de gestação prévia e multiparidade',
      'Cirurgias uterinas traumatizantes anteriores (curetagem, parto cesárea, miomectomias)',
      'Idade tardia fértil (idade superior a 35-40 anos)',
      'Menarca precoce na infância precoce'
    ],
    red_flags: [
      'Hemorragia aguda refratária com necessidade de tamponamento intrauterino ou histerectomia de urgência por choque',
      'Anemia ferropriva limítrofe refratária necessitando reposição endovenosa constante de ferro'
    ],
    diferenciais: [
      'Leiomiomatose intramural de útero',
      'Endometriose profunda pélvica concomitante',
      'Hiperplasia de endométrio com sangramento anormal',
      'Pólipos endometriais cavitários'
    ],
    achados_exames: [
      'Ultrassonografia Transvaginal de alta definição: revela útero de volume aumentado com assimetria de paredes (parede posterior tipicamente mais espessa), miométrio heterogêneo com pequenas lacunas anecoicas espalhadas (cistos miometrais) e estrias subendometriais lineares radiadas.',
      'Ressonância Magnética de Pelve: padrão-ouro não invasivo. Evidencia espessamento acentuado da zona de transição miometrial, medindo classicamente mais de 12 mm em sua seção longitudinal mais proeminente.',
      'Cariologia após biópsia miometrial por agulha ou histopatológico cirúrgico.'
    ],
    criterios_diagnosticos: [
      'Sintomas clínicos em mulher multípara na terceira ou quarta década de vida que cursa com dismenorreia e hipermenorreia progressivos.',
      'Evidência em exame de Ressonância Magnética demonstrando espessamento simétrico/assimétrico da zona juncional miometrial com diâmetro ≥ 12 mm.',
      'Diagnóstico de certeza de caráter histopatológico (pós-histerectomia) evidenciando presença de ninhos funcionais de glândulas e estroma endometrial ectópicos profundamente infiltrados no corpo miometrial uterino (> 2.5 mm de profundidade de infiltração).'
    ]
  },
  {
    id: 'N76.8',
    nome: 'Vaginose Citolítica',
    sintomas: [
      'Corrimento vaginal abundante, pastoso ou esbranquiçado (aspecto de nata, mimetizando candidíase)',
      'Prurido vulvar e vaginal persistente e refratário a antifúngicos comuns de farmácia',
      'Ardência urinária importante miccional (disúria)',
      'Dispareunia dolorosa profunda e superficial profunda',
      'Acentuação cíclica dos sintomas na fase lútea tardia, poucas semanas antes da data menstrual'
    ],
    fatores_risco: [
      'Uso abusivo prévio crônico e desnecessário de antifúngicos tópicos ou sistêmicos para falsas crises de candidíase',
      'Excesso de carboidratos livres ou glicose local que facilita a proliferação excessiva de Lactobacillus',
      'Higiene íntima excessiva ácida'
    ],
    red_flags: [
      'Fissuras genitais severas decorrente de coçadura intensa estimulada pelo prurido',
      'Disfunção psicosexual crônica e depressão reativa pelo diagnóstico errôneo e tratamentos infrutíferos insistidos'
    ],
    diferenciais: [
      'Candidíase vulvovaginal recidivante (principal diagnóstico errôneo imposto)',
      'Vaginose bacteriana com pH neutro',
      'Tricomoníase atípica inicial',
      'Vaginite aeróbica bacteriana'
    ],
    achados_exames: [
      'Exame especular ginecológico: corrimento característico encorpado, sem odor fétido associado, e mucosa vaginal levemente avermelhada ou normal.',
      'pH vaginal medido por fita reativa de precisão: tipicamente hiperácido, variando rigorosamente entre 3.5 e 4.0.',
      'Bacterioscopia corada por Gram ou exame a fresco: revela abundância severa de lactobacilos (flora tipo I pura), fragmentos ou restos celulares epiteliais nucleares destruídos por lise celular (citólise), e ausência total ou rara de leveduras fúngicas/hifas de Candida ou clue cells.'
    ],
    criterios_diagnosticos: [
      'Para fechamento diagnóstico definitivo, a paciente deve preencher rigorosamente todos os seguintes critérios clínico-laboratoriais:',
      '1. Presença de sintomas marcantes de corrimento natiforme e prurido vulvovaginal.',
      '2. Exame a fresco ou bacterioscopia demonstrando lise de células de pavimentação vaginal com presença rica de núcleos espalhados livres.',
      '3. Marcado aumento populacional de Lactobacilos de Döderlein na microscopia.',
      '4. Medição de pH vaginal consistentemente hiperácido (entre 3.5 e 4.0).',
      '5. Ausência absoluta de fungos, leveduras, Trichomonas ou Vaginose bacteriana e falha terapêutica documentada a tratamentos antifúngicos prévios.'
    ]
  },
  {
    id: 'N84.0',
    nome: 'Pólipo Endometrial',
    sintomas: [
      'Sangramento de escape de caráter intermenstrual (gotejamento entre fluxos normais)',
      'Menorragia (sangramento prolongado ou excessivo)',
      'Infertilidade conjugal inexplicável em idade de maturidade reprodutiva',
      'Quadro assintomático na maioria e descoberto incidentalmente em exames de imagem preventivos'
    ],
    fatores_risco: [
      'Hiperestrogenismo absoluto crônico ou desrelação progestacional',
      'Uso de tamoxifeno para tratamento oncológico mamário preventivo',
      'Uso continuado de reposição hormonal sem progestágenos de salvaguarda',
      'Obesidade sistêmica, hipertensão crônica na maturidade e senescência'
    ],
    red_flags: [
      'Sangramento vaginal abundante de repetição na pós-menopausa associado a pólipo volumoso (> 1.5 cm) com alto potencial de transformação maligna',
      'Identificação histológica de atipias celulares de adenocarcinoma sobrejacentes'
    ],
    diferenciais: [
      'Hiperplasia endometrial focal',
      'Leiomiomatose uterina submucosa focalizada',
      'Pólipo endocervical (visível no colo uterino no exame especular)',
      'Câncer de endométrio exofítico inicial'
    ],
    achados_exames: [
      'Ultrassonografia Transvaginal basilar: revela uma área hiperecogênica no interior do canal endometrial ou cavidade uterina com halo hipoecoico bem definido ao seu redor.',
      'Ultrassonografia com Doppler Colorido: evidencia classicamente a presença de um vaso único e proeminente alimentador de fluxo arterial nutrindo o pólipo cavitário (sinal do vaso nutridor).',
      'Histerossonografia ou Histeroscopia diagnóstica: permite visibilidade mecânica direta tridimensional da estrutura nodular pediculada lisa ou séssil, permitindo biopsia de segurança ou exerese dirigida (polictomia).'
    ],
    criterios_diagnosticos: [
      'Evidência ultra-sonográfica ou histeroscópica direta da tumoração ou projeção mucosa pediculada protruindo do assoalho endometrial para o interior do lúmen cavitário uterino.',
      'Diagnóstico definitivo de certeza obtido através do exame histopatológico de espécime ressecado contendo estroma endometrial fibroso maduro densamente celularizado, glândulas dilatadas anormais com arquitetura benigna e vasos de paredes espessas característicos.'
    ]
  }
];
