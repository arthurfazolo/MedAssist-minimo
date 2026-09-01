import { MedicalDisease } from '../types';

export const GYNECO_OBSTETRICS_DISEASES_BATCH2: MedicalDisease[] = [
  {
    id: 'O20.0',
    nome: 'Ameaça de Abortamento',
    sintomas: [
      'Sangramento vaginal discreto a moderado, vermelho vivo ou acastanhado, em gestação inicial (antes de 20-22 semanas)',
      'Leve cólica abdominal ou contrações dolorosas intermitentes na região do baixo ventre',
      'Ausência de eliminação de tecidos ou coágulos volumosos',
      'Manutenção de sintomas gravídicos habituais (náuseas, mastalgia)'
    ],
    fatores_risco: [
      'Idade materna avançada (> 35 anos) ou extrema juventude (< 18 anos)',
      'Histórico prévio de abortamento espontâneo espontâneo',
      'Tabagismo ativo ou consumo excessivo de cafeína/álcool',
      'Deficiências hormonais lúteas ou disfunção tireoidiana',
      'Presença de miomas uterinos distorcendo a cavidade',
      'Condições crônicas maternas descompensadas (DM, HAS)'
    ],
    red_flags: [
      'Sangramento vaginal volumoso com presença de coágulos de grande tamanho',
      'Dor abdominal de forte intensidade e descompressão dolorosa positiva',
      'Febre ou odor fétido no fluxo vaginal de sangramento (sinal de infecção intrauterina)',
      'Instabilidade hemodinâmica materna com hipotensão ou síncope'
    ],
    diferenciais: [
      'Preguiça de implantação/Nidagem simples fisiológica',
      'Abortamento inevitável ou incompleto',
      'Gravidez ectópica inicial',
      'Neoplasia trofoblástica gestacional'
    ],
    achados_exames: [
      'Ultrassonografia Pélvica Transvaginal: revela presença de saco gestacional normoposicionado, embrião com Batimentos Cardiofetais (BCF) presentes e rítmicos, e eventual área de descolamento de córion ou hematoma retrocoriônico pequeno.',
      'Beta-hCG quantitativo: mostra níveis sintonizados com a idade gestacional, idealmente dobrando a cada 48h em avaliações seriadas iniciais.',
      'Exame especular ginecológico: constatação de sangramento através do óstio cervical, colo uterino fechado sem apagamento.'
    ],
    criterios_diagnosticos: [
      'Presença de sangramento vaginal em gestante antes da 22ª semana de gravidez.',
      'Exame físico bimanual e especular indicando que o colo uterino apresenta-se impérvio (fechado) e apagado de forma ausente.',
      'Confirmação por ultrassonografia de vitalidade fetal ativa (presença de BCF documentado caso embrião > 7 mm de CCN).'
    ]
  },
  {
    id: 'O03.4',
    nome: 'Abortamento Incompleto',
    sintomas: [
      'Sangramento vaginal moderado a volumoso, vermelho vivo com coágulos e pedaços de tecidos ovulares',
      'Cólica abdominal de forte e progressiva intensidade em região suprapúbica',
      'Redução espontânea dos sintomas de gravidez de forma rápida',
      'Histórico de atraso menstrual compatível seguido de cólica aguda e expulsão parcial acompanhada de alívio parcial'
    ],
    fatores_risco: [
      'Causas cromossômicas embrionárias cromossômicas (principal fator etiológico em fases precoces)',
      'Insuficiência lútea ou de progesterona persistente',
      'Malformações uterinas estruturais ou incapacidade istmocervical',
      'Infecções sistêmicas ativas (Sífilis, Toxoplasmose)',
      'Uso de substâncias abortivas sem orientação'
    ],
    red_flags: [
      'Hemorragia vaginal torrencial com risco de choque hipovolêmico grave mimetizante',
      'Presença de febre elevada, calafrios, secreção vaginal purulenta e hálito cetônico (espeficativo de Abortamento Séptico endotóxico)',
      'Rigidez abdominal ou dor pélvica de rebote extrema'
    ],
    diferenciais: [
      'Abortamento completo (eliminação total com cessação do sangramento e colo fechado)',
      'Ameaça de abortamento com vitalidade preservada',
      'Gravidez ectópica rota em curso',
      'Doença Gestacional Trofoblástica ativa'
    ],
    achados_exames: [
      'Ultrassonografia Pélvica ou Transvaginal: útero com cavidade endometrial espessa (> 15 mm) e desorganizada devido a restos coriônicos amorfos, ausência de estrutura embrionária visível normoposicionada.',
      'Hemograma de controle: evidencia anemia normocítica e normocrômica aguda por perda volumétrica recente, plaquetopenia associável.',
      'Tipagem Sanguínea Materna com Rh: obrigatório para pesquisa de necessidade urgente de imunoglobulina anti-D.'
    ],
    criterios_diagnosticos: [
      'Histórico evidente de eliminação de resto ovular ou tecidos durante gestação precoce.',
      'Constatação ao exame físico vaginal bimanual de canal e colo cervical patulo ou entreaberto (permite a polpa digital).',
      'Confirmação por imagem de retenção persistente de resíduos de concepção (endométrio altamente espessado heterogêneo) à ultrassonografia.'
    ]
  },
  {
    id: 'O00.9',
    nome: 'Gravidez Ectópica Íntegra',
    sintomas: [
      'Atraso menstrual recente correspondente a gestação inicial',
      'Dor abdominal em baixo ventre de caráter intermitente unilateral ou difusa',
      'Sangramento vaginal escuro, discreto de fluxo espasmódico (sangramento em borra de café)',
      'Cansaço leve e sintomas de gestação habituais normais'
    ],
    fatores_risco: [
      'Histórico anterior pessoal de gravidez ectópica tratada',
      'Doença Inflamatória Pélvica prévia (causando sequelas e estenoses tubárias ciliares)',
      'Cirurgias tubárias prévias (laqueadura prévia ou reconstrução)',
      'Concepção obtida por fertilização in vitro (reprodução assistida)',
      'Uso crônico de DIU de cobre no momento da gravidez',
      'Tabagismo ativo materno'
    ],
    red_flags: [
      'Instalação súbita de dor abdominal com intensidade excruciante generalizada',
      'Instabilidade circulatória e desmaio súbito (lipotimia por ruptura e hemoperitônio)',
      'Dor referida no ombro (sinal de Lafond por irritação do nervo frênico)'
    ],
    diferenciais: [
      'Ameaça de abortamento de gravidez eutópica intrauterina',
      'Cisto de corpo lúteo roto simples',
      'Apendicite aguda',
      'Doença Inflamatória Pélvica unilateral inicial'
    ],
    achados_exames: [
      'Ultrassonografia Transvaginal: revela cavidade uterina vazia (sem saco gestacional visível) acompanhada de imagem anexial sugestiva de anel tubário ("sinal do duplo anel" ou anel de fogo ao Doppler) externa ao ovário unilateral, e ausência de líquido livre volumoso.',
      'Beta-hCG quantitativo sérico: valores de Beta-hCG acima da "zona de discriminação" (geralmente > 1.500 ou 2.000 mUI/mL) sem nenhuma evidência de saco gestacional intrauterino.',
      'Estudo de curva de Beta-hCG com platô (elevação menor de 35-50% em 48 horas).'
    ],
    criterios_diagnosticos: [
      'Beta-hCG sérico quantitativo positivo comprovando status gestacional ativo.',
      'Ultrassonografia transvaginal de alta definição constatando de forma categórica a ausência de gestação de localização intrauterina.',
      'Identificação simultânea de saco gestacional, vesícula vitelina com ou sem embrião vivo localizado na topografia tubária de forma íntegra sem evidência clínica de ruptura ativa.'
    ]
  },
  {
    id: 'O00.1',
    nome: 'Gravidez Ectópica Rota',
    sintomas: [
      'Dor abdominal e pélvica de início súbito, lancinante e generalizada de fortíssima intensidade',
      'Sangramento vaginal discreto a moderado de cor escura',
      'Hipotensão súbita, tontura severa na ortostase e síncope imediata',
      'Palidez cutâneo-mucosa proeminente com suores frios e taquicardia',
      'Distensão abdominal importante dolorosa'
    ],
    fatores_risco: [
      'Mesmos fatores da gravidez ectópica íntegra (DIP, cirurgias, ectópica prévia)',
      'Idade gestacional superior a 6-8 semanas sem acompanhamento em gravidez tubária',
      'Gestação ectópica localizada na porção istmo ou intersticial tubária (esta última rompe mais tardiamente gerando hemorragias dramáticas)'
    ],
    red_flags: [
      'Choque hemorrágico profundo refratário a expansão com cristaloides cristaloides',
      'Parada cardiorrespiratória iminente por hipovolemia severa',
      'Abdome rígido em tábua (peritonite hemorrágica severa)'
    ],
    diferenciais: [
      'Cisto ovariano roto hemorrágico de grande volume',
      'Torção de ovário com necrose',
      'Apendicite perfurada agudamente',
      'Perfuração de víscera oca ou úlcera péptica'
    ],
    achados_exames: [
      'Ultrassonografia Pélvica à Beira do Leito (FAST pélvico): evidencia volumoso fluido e sangue livre na pelve e recessos peritoneais (espaço de Morrison e fundo de saco de Douglas posterior), com útero vazio.',
      'Hemograma de urgência: anemia aguda com queda brutal e progressiva no hematócrito e hemoglobina global.',
      'Beta-hCG quantitativo: positivo rápido de urgência.',
      'Laparotomia ou laparoscopia exploradora imediata: confirma sangramento ativo maciço originado da trompa uterina dilacerada.'
    ],
    criterios_diagnosticos: [
      'Gestante confirmada de termo inicial que manifesta quadro clínico de choque hipovolêmico de início abrupto associado a peritonite generalizada dolorosa.',
      'Constatação à ultrassonografia de útero gravídico vazio acompanhado de volumoso hemoperitônio difuso em cavidade peritoneal.',
      'Evidência cirúrgica de ruptura da parede tubária ou anexial por gravidez ectópica anômala ativa.'
    ]
  },
  {
    id: 'O21.0',
    nome: 'Hiperêmese Gravídica',
    sintomas: [
      'Náuseas e vômitos persistentes e incoercíveis (sem cessação por via oral comum)',
      'Incapacidade total de tolerar qualquer ingesta de alimentos sólidos ou hídricos',
      'Perda de peso progressiva da gestante significativa (> 5% do peso pré-gestacional)',
      'Salivação excessiva (ptialismo)',
      'Sintomas óbvios de desidratação (boca seca, turgor diminuído, cianose ocular)',
      'Fraqueza severa extrema e letargia postural'
    ],
    fatores_risco: [
      'Primiparidade (primeira gestação ativa)',
      'Gestação múltipla (gemelaridade) ou gravidez molar (elevados picos de Beta-hCG circulante)',
      'Histórico de hiperêmese em gestações anteriores ou na linha familiar',
      'Transtornos alimentares pré-existentes ou ansiedade grave gestacional',
      'História de enxaqueca ou cinetose severa fora da gestação'
    ],
    red_flags: [
      'Surgimento de confusão mental aguda com instabilidade de marcha e nistagmo (sinal de Encefalopatia de Wernicke por deficiência aguda de vitamina B1 - tiamina)',
      'Presença de icterícia visível na pele e conjuntivas dolorosas',
      'Hipotensão severa com vômitos contendo laivos de sangue (síndrome de Mallory-Weiss por laceração de transição esofágica)'
    ],
    diferenciais: [
      'Gastrite aguda infecciosa',
      'Colecistite aguda mecânica ou colelitíase descompensada',
      'Apendicite em gestantes (com sintomas atípicos)',
      'Disfunção tireoidiana hormonal (tireotoxicose gestacional transitória)'
    ],
    achados_exames: [
      'Exame sérico de eletrólitos: revela hiponatremia, hipocalemia, hipocloremia proeminente secundárias a perdas digestivas abundantes, acidose metabólica.',
      'Pesquisa de corpos cetônicos urinários (cetonúria): fortemente positiva na urina de rotina (revelando catabolismo acentuado por jejum prolongado).',
      'Gasometria venosa: alcalose metabólica hipoclorêmica secundária à perda abundante de ácido clorídrico gástrico.',
      'Ultrassonografia Obstétrica: essencial para afastar gravidez gemelar múltipla ou mola hidatidiforme.'
    ],
    criterios_diagnosticos: [
      'Presença de vômitos incoercíveis em gestante no primeiro trimestre sem outra etiologia orgânica identificável.',
      'Sinais documentados de desidratação clínica ativa na paciente.',
      'Perda de peso comprovada e medida superior a 5% em relação ao peso corporal basal pré-gestacional, acompanhada de distúrbios eletrolíticos e cetonúria positiva.'
    ]
  },
  {
    id: 'O14.0',
    nome: 'Pré-eclâmpsia Leve / Moderada',
    sintomas: [
      'Elevação recorrente da pressão arterial (PAS ≥ 140 e/ou PAD ≥ 90 mmHg) após a 20ª semana em gestante previamente normotensa',
      'Cefaleia de caráter tensional leve ocasional',
      'Edema de membros inferiores progressivo moderadamente ao longo do dia',
      'Ausência de sintomas visuais ou dor abdominal grave no interrogatório'
    ],
    fatores_risco: [
      'Nuliparidade gestacional ativa',
      'Idade materna superior a 40 anos ou menor de 18 anos',
      'História familiar robusta de pré-eclâmpsia na família imediata',
      'Hipertensão Arterial Crônica (HAS crônica prévia) ou obesidade central',
      'Diabetes Mellitus pré-gestacional ou resistência insulínica',
      'Gestações multifetais ativos'
    ],
    red_flags: [
      'Pressão arterial ultrapassando a marca crítica de 160/110 mmHg sustentada',
      'Surgimento abrupto de perturbações visuais (escotomas cintilantes, diplopia, perda visual)',
      'Dor abdominal de forte intensidade em epigástrio ou hipocôndrio direito (dor em barra por distensão de cápsula hepática)',
      'Cefaleia frontal refratária persistente'
    ],
    diferenciais: [
      'Hipertensão Gestacional transitória simples (PA alta sem proteinúria ou disfunções)',
      'Hipertensão Arterial Crônica prévia coexistente',
      'Nefropatia crônica primária inicial na gravidez'
    ],
    achados_exames: [
      'Urina de 24 horas demonstrando Proteinúria clássica (presença de 300 mg ou mais de proteína na amostra acumulada).',
      'Relação Albumina/Creatinina em amostra única de urina (indivíduo): superior ou igual a 0.3 mg/mg.',
      'Laboratório metabólico conservador: plaquetas normais, função hepática (TGO/TGP) e renais normais.'
    ],
    criterios_diagnosticos: [
      'Desenvolvimento de Hipertensão Arterial (PAS ≥ 140 ou PAD ≥ 90 mmHg em duas ocasiões separadas por 4 horas) surgindo após a 20ª semana gestacional.',
      'Associado obrigatoriamente a Proteinúria significativa (≥ 300 mg/24h ou relação albumina/creatinina ≥ 0.3).',
      'Na ausência de proteinúria, o diagnóstico de pré-eclâmpsia pode ser fechado caso haja hipertensão de início recente acompanhada de plaquetopenia, disfunção renal, disfunção hepática, edema pulmonar ou sintomas cerebrais agudos.'
    ]
  },
  {
    id: 'O14.1',
    nome: 'Pré-eclâmpsia Grave',
    sintomas: [
      'Elevação severa da pressão arterial (PAS ≥ 160 mmHg e/ou PAD ≥ 110 mmHg)',
      'Cefaleia frontal ou holocraniana violenta e progressiva, refratária a analgésicos comuns',
      'Alterações visuais importantes: fotofobia, escotomas cintilantes (pontos brilhantes piscando), visão turva, diplopia ou amaurose transitória',
      'Dor abdominal em epigástrio ou hipocôndrio direito crônica dolorosa contínua (dor em barra de Chaussier)',
      'Dispneia importante com esforço respiratório leve',
      'Edema facial e de mãos grave e súbito de instalação aguda'
    ],
    fatores_risco: [
      'Mesmos fatores da pré-eclâmpsia leve, exacerbados',
      'Histórico cirúrgico de nefrolitíase ou nefropatias autoimunes',
      'Doenças reumatológicas ativas maternas (Lúpus Eritematoso, Síndrome Antifosfolípide - SAF)',
      'Doença vascular crônica prévia'
    ],
    red_flags: [
      'Instalação de crise convulsiva com tônico-clônica generalizada (Eclâmpsia)',
      'Presença de estertores crepitantes pulmonares até ápices de forma rápida (Edema Agudo de Pulmão materno)',
      'Plaquetopenia súbita em queda rápida (< 50.000) com evidência de hemólise bacteriana microangiopática'
    ],
    diferenciais: [
      'Hipertensão Arterial Crônica na gravidez descompensada por estresse',
      'Encefalopatia hipertensiva isolada',
      'Neuropatia lúpica ativa primária',
      'Cefaleia tensional grave'
    ],
    achados_exames: [
      'Laboratório de urgência de pré-eclâmpsia (Kit Pré-eclâmpsia):',
      '- Relação Albumina/Creatinina urinária ≥ 0.3 ou fita reagente com mais de 2+.',
      '- Hemograma completo de controle evidenciando queda de plaquetas (Plaquetopenia < 100.000/mm³) e hemoconcentração ou anemia.',
      '- Provas de Função Renal: creatinina sérica elevada (> 1.1 mg/dL) ou duplicada.',
      '- Provas de Função Hepática: transaminases (TGO e TGP) marcadamente elevadas, atingindo pelo menos o dobro dos limites de superioridade.',
      '- Lactato Desidrogenase (LDH) e Bilirrubinas: indireta sérica elevada indicando hemólise sistêmica.'
    ],
    criterios_diagnosticos: [
      'Atendimento aos critérios de pré-eclâmpsia basilar, acrescido de pelo menos um dos seguintes sinais de gravidade / disfunção orgânica severa:',
      '1. Pressão arterial sistólica ≥ 160 mmHg ou diastólica ≥ 110 mmHg em repouso deitado aferido por duas vezes.',
      '2. Sintomatologia neurológica cerebral ou visual proeminente de início recente.',
      '3. Dor epigástrica intensa resistente a antiácidos.',
      '4. Disfunção renal (Creatinina plasmática > 1.1 mg/dL).',
      '5. Insuficiência hepática (transaminases séricas elevadas com dobro do referencial superior).',
      '6. Trombocitopenia grave com plaquetas globais < 100.000/mm³.',
      '7. Edema agudo de pulmão evidenciado clinicamente.'
    ]
  },
  {
    id: 'O15.9',
    nome: 'Eclâmpsia',
    sintomas: [
      'Crises convulsivas generalizadas do tipo tônico-clônicas em gestante com diagnóstico ou suspeita de pré-eclâmpsia',
      'Período pós-ictal prolongado caracterizado por torpor, obnubilação, delírio ou coma',
      'Cefaleia excruciante frontal antecedendo imediatamente a crise de convulsão',
      'Amaurose temporária transitória (cegueira cortical por edema de lobo occipital)',
      'Respiração ruidosa, sibilante ou estertorosa pós-crise'
    ],
    fatores_risco: [
      'Falta de acompanhamento pré-natal regular adequado ou diagnóstico tardio de pré-eclâmpsia grave',
      'Idade extremamente jovem ou idosa na primeira gestação',
      'Perfil de pré-eclâmpsia grave sem manejo profilático ativo com sulfato de magnésio'
    ],
    red_flags: [
      'Edema cerebral grave com herniação cerebral iminente (Glasgow cadente)',
      'Parada cardiorrespiratória por hipóxia cerebral extrema ou aspiração traqueobrônquica de conteúdo salivar/gástrico',
      'Sinais de hemorragia cerebral focalizada stroke por crise hipertensiva refratária de pico'
    ],
    diferenciais: [
      'Crise epiléptica por Epilepsia primária gestacional descompensada',
      'Encefalite infecciosa viral ou meningite bacteriana aguda',
      'Hemorragia subaracnóidea por aneurisma roto na vigência de HAS',
      'Trombose Venosa Cerebral profunda peri-parto'
    ],
    achados_exames: [
      'Exame de urina tipo I de emergência (EAS): manifesta forte proteinúria com mais de 3+ na fita rápida.',
      'Gasometria arterial sérica pós-ictal: expressa acidose metabólica ou mista devido ao esforço tônico e hipoventilação celular convulsiva.',
      'Tomografia Computadorizada de Crânio (pós-crise estabilizada): indicada se sinais focais persistentes para afastar AVC hematogênico, evidenciando classicamente edema cerebral lóbulo-occipital (síndrome PRES - encefalopatia reversível).'
    ],
    criterios_diagnosticos: [
      'Surgimento de convulsões tônico-clônicas generalizadas de início recente em gestante após a 20ª semana ou no puerpério imediato (até 4 semanas).',
      'Ausência histórica comprovada de epilepsia ou de focos neurológicos expansivos alternativos no sistema nervoso central.',
      'Mecanicamente associado a sinais evidentes de toxicose gravídica hipertensiva / pré-eclâmpsia prévia.'
    ]
  },
  {
    id: 'O14.2',
    nome: 'Síndrome HELLP',
    sintomas: [
      'Dor abdominal intensa localizada no hipocôndrio direito ou epigástrio de caráter em aperto',
      'Náuseas e vômitos persistentes biliosos',
      'Mal-estar generalizado proeminente, adinamia súbita',
      'Pele e conjuntivas oculares com tonalidade amarelada (icterícia)',
      'Escurecimento gradual ou diminuição do volume na urina (colúria / oligúria)'
    ],
    fatores_risco: [
      'Idade materna avançada, multiparidade',
      'Histórico de pré-eclâmpsia em gestações anteriores na linha materna',
      'Síndrome antifosfolípide ativa conhecida na gestação'
    ],
    red_flags: [
      'Crescimento súbito de dor abdominal lancinante local com descompressão positiva de hipocôndrio e choque agudo (sugere rotura de hematoma subcapsular hepático)',
      'Sangramento espontâneo gengival, nasal ou por punções venosas (indicativo de Coagulação Intravascular Disseminada - CIVD)',
      'Insuficiência renal anúrica hipercalêmica'
    ],
    diferenciais: [
      'Hepatite viral fulminante aguda de gestante',
      'Hígado Gorduroso Agudo da Gestação (esteatose hepática aguda por mutação do metabolismo de ácidos graxos)',
      'Púrpura Trombocitopênica Trombótica (PTT) ou Síndrome Hemolítico-Urêmica',
      'Colecistite aguda com coledocolitíase obstrutiva biliar'
    ],
    achados_exames: [
      'Bacterioscopia de sangue periférico (esfregaço de sangue periférico): presença evidente de esquizócitos (hemácias fragmentadas mecânicas por lise microangiopática).',
      'Plaquetograma de urgência: plaquetopenia marcante (< 100.000/mm³, muitas vezes inferior a 50.000).',
      'Lactato Desidrogenase sérico (LDH): dramaticamente elevado (≥ 600 U/L) revelando hemólise sistêmica.',
      'Bilirrubinas séricas: bilirrubina indireta elevada (≥ 1.2 mg/dL) secundária à hemólise microangiopática.',
      'Transaminases Hepáticas: TGO / AST marcadamente elevadas (≥ 70 U/L), refletindo necrose hepatocitária segmentar.'
    ],
    criterios_diagnosticos: [
      'Tríade Bioquímica Laboratorial Consensual de Tennessee para fechamento de Síndrome HELLP completa:',
      '1. Hemólise: presença de esquizócitos no esfregaço periférico de sangue, LDH ≥ 600 U/L e bilirrubina indireta ≥ 1.2 mg/dL.',
      '2. Enzimas hepáticas elevadas: TGO / AST ≥ 70 U/L.',
      '3. Baixas Plaquetas: contagem global de plaquetas < 100.000/mm³.',
      'Presença parcial de critérios bioquímicos caracteriza a Síndrome HELLP incompleta.'
    ]
  },
  {
    id: 'O24.4',
    nome: 'Diabetes Mellitus Gestacional',
    sintomas: [
      'Quadro totalmente assintomático na grande maioria das gestantes (diagnóstico de rastreamento)',
      'Ganho ponderal excessivo materno ao longo do segundo trimestre gestacional',
      'Sede excessiva (polidipsia) e aumento anormal na diurese diária (poliúria) em casos graves'
    ],
    fatores_risco: [
      'Idade materna avançada (> 35 anos)',
      'Sobrepeso ou obesidade materna prévia à gestação ativa',
      'Histórico de Diabetes Gestacional em gravidez anterior',
      'Histórico familiar de Diabetes Mellitus tipo 2 em parentes diretos',
      'Histórico anterior de macrossomia fetal (nascimento de bebês > 4.0 kg)',
      'Histórico anterior de abortamentos ou óbito fetal inexplicável de terceiro trimestre'
    ],
    red_flags: [
      'Níveis de glicemia de jejum mantidos cronicamente acima de 130-140 mg/dL a despeito de dieta orientada',
      'Ultrassonografia com evidência de polidrâmnio acentuado e feto com peso estimado nos percentis mais altos para idade gestacional (> P90 - macrossomia)'
    ],
    diferenciais: [
      'Diabetes Mellitus tipo 2 pré-gestacional não diagnosticado préviamente',
      'Diabetes Mellitus tipo 1 de início agudo gestacional',
      'Glicosúria fisiológica benigna da gravidez por aumento do clearence renal'
    ],
    achados_exames: [
      'Glicemia de jejum inicial (realizada no 1º trimestre): igual ou superior a 92 mg/dL e inferior a 126 mg/dL.',
      'Teste Oral de Tolerância à Glicose (TOTG 75g) realizado entre a 24ª e 28ª semana gestacional: revela valores diagnósticos alterados:',
      '- Glicemia Jejum ≥ 92 mg/dL.',
      '- Glicemia 1 hora pós-carga de dextrosol ≥ 180 mg/dL.',
      '- Glicemia 2 horas pós-carga de dextrosol ≥ 153 mg/dL.',
      'Ultrassonografia sequencial obstétrica: monitora ecografia de crescimento fetal e líquido amniótico.'
    ],
    criterios_diagnosticos: [
      'Surgimento de intolerância a carboidratos de gravidade variável com início ou primeiro reconhecimento durante a atual gravidez ativa.',
      'Diagnóstico consolidado caso pelo menos uma das medições laboratoriais no TOTG de 75g (24-28 semanas) atinja ou ultrapasse os limites de referência (Jejum ≥ 92; 1h ≥ 180; 2h ≥ 153 mg/dL).',
      'Alternativamente, glicemia de jejum de primeiro trimestre em sangue venoso ≥ 92 mg/dL estabelece o diagnóstico de Diabetes Gestacional de imediato.'
    ]
  },
  {
    id: 'O45.9',
    nome: 'Descolamento Prematuro de Placenta',
    sintomas: [
      'Dor abdominal súbita, de forte intensidade e caráter contínuo na gestante (segunda metade da gravidez)',
      'Sangramento vaginal vermelho esbofeteado, de cor escura ou marrom, mas pode se apresentar em fluxo volumoso (pode ser ausente ou oculto em retenção em 20% dos casos)',
      'Tonicidade uterina excessivamente aumentada (hipertonia ou útero em tábua ao exame de palpação)',
      'Aceleração rápida ou desaceleração persistente nos batimentos cardiofetais (indicador clínico de sofrimento fetal agudo)'
    ],
    fatores_risco: [
      'Síndromes Hypertensivas (pré-eclâmpsia grave, hipertensão arterial crônica)',
      'Traumatismo abdominal grave direto (quedas, colisões automobilísticas)',
      'Uso agudo de cocaína ou tabagismo intenso na gravidez',
      'Descompressão uterina súbita (ex: após amniorrexe em grávida com polidrâmnio acentuado ou parto do primeiro gemelar)',
      'Histórico de descolamento prematuro de placenta em gravidez anterior',
      'Idade materna avançada e multiparidade ativa'
    ],
    red_flags: [
      'Ausência total de batimentos cardiofetais na triagem (óbito fetal em curso)',
      'Instalação de choque materno grave e taquicardia descompensada imotivada pelo sangramento externo (sugere sangramento oculto volumoso retroplacentário)',
      'Surgimento espontâneo de sangramentos de mucosas difusos (indica transição para Síndrome de Couvelaire e CIVD)'
    ],
    diferenciais: [
      'Placenta prévia com sangramento ativo indolor',
      'Rotura uterina aguda mecânica durante esforço de trabalho de parto',
      'Trabalho de parto normal em fase ativa dolorosa dolorosa',
      'Rotura de vaso de cordão umbilical (Vasa previa rota)'
    ],
    achados_exames: [
      'Cardiotocografia (CTG) de urgência: padrão inicial, revelando padrão de compressão placentária, taquicardia/bradicardia fetal sustentada, desacelerações de padrão tardio (DIP II) ou padrão sinusoidal, e hipertonia uterina contínua.',
      'Ultrassonografia Obstétrica de urgência: útil para verificar vitalidade fetal, porém possui baixa sensibilidade para descartar descolamento (apenas 20-50% das vezes exibe coágulo retroplacentário agudo).',
      'Coagulograma materno: monitora alargamento rápido de TAP e queda de plaquetas e fibrinogênio total.'
    ],
    criterios_diagnosticos: [
      'Se constitui como uma das emergências obstétricas mais graves, de diagnóstico eminentemente clínico e cirúrgico.',
      'Presença de dor abdominal súbita intensa, hipertonia uterina persistente e sofrimento/morte fetal confirmada após 20-22 semanas gestacionais.',
      'Confirmação visual definitiva e retrospectiva pós-parto imediato evidenciando coágulo retroplacentário recente comprimindo e deprimindo a face materna da placenta removida (disco placentário).'
    ]
  },
  {
    id: 'O44.1',
    nome: 'Placenta Prévia Sangrante',
    sintomas: [
      'Sangramento vaginal vermelho vivo, imotivado, indolor de início súbito no terceiro trimestre da gravidez',
      'Sangramento de caráter autolimitado e recorrente ao longo das semanas gestacionais',
      'Ausência total de dor abdominal difusa local ou contrações com hipertonia uterina',
      'Utero com tônus normal, flácido e indolor à palpação profunda',
      'Vitalidade fetal habitual preservada com batimentos rítmicos normais e ativos'
    ],
    fatores_risco: [
      'Histórico de cirurgias no útero ou cicatrizes uterinas anteriores (cesarianas prévias, curetagens)',
      'Multiparidade com gestações curtas sequenciais',
      'Gestações multifetais em curso ativo',
      'Idade materna superior a 35 anos',
      'Tabagismo ativo materno crônico'
    ],
    red_flags: [
      'Sangramento vaginal de volume catastrófico incoercível e contínuo',
      'Sinais agudos de sofrimento fetal ou parada de movimentos cardiofetais por hipofluxo sistêmico',
      'Hipotensão postural materna severa aguda com choque'
    ],
    diferenciais: [
      'Descolamento Prematuro de Placenta (DPP - cursa com forte dor e hipertonia)',
      'Rotura do seio marginal da placenta',
      'Lesões ginecológicas locais no trato genital inferior (pólipos ou carcinoma de colo)',
      'Rotura uterina de parede'
    ],
    achados_exames: [
      'Ultrassonografia Obstétrica abdominal ou transvaginal (esta última de padrão mais acurado): mostra borda placentária cobrindo parcial ou totalmente o óstio cervical interno (OCI) em gestação superior a 28 semanas.',
      'Hemograma de controle: avalia necessidade de transfusões imunológicas de urgência.',
      'Toque vaginal mecânico: expressamente proibido devido a altíssimo risco de estopim de sangramento torrencial fatal.'
    ],
    criterios_diagnosticos: [
      'Episódio característico de sangramento genital indolor e vermelho vivo no terceiro trimestre gravídico com útero flácido.',
      'Identificação exata por exame ultrassonográfico obstétrico de tecidos placentários inseridos na porção inferior do útero a uma distância menor que 2 cm do óstio interno ou cobrindo o óstio cervical uterino.',
      'Toque bimanual expressamente contraindicado pela clínica ginecológica.'
    ]
  },
  {
    id: 'O60.0',
    nome: 'Trabalho de Parto Prematuro',
    sintomas: [
      'Contrações uterinas dolorosas e regulares (pelo menos 4 contrações em 20 minutos ou 8 em 60 minutos) antes da 37ª semana gestacional',
      'Pressão pélvica persistente ou sensação de peso progressivo no baixo ventre',
      'Dor lombar surda e contínua nova',
      'Aumento do corrimento vaginal fluido ou mucoso claro rosado (eliminação de tampão mucoso)'
    ],
    fatores_risco: [
      'Histórico pessoal anterior de parto prematuro espontâneo',
      'Gestações múltiplas (gêmeos ou mais)',
      'Infecções sistêmicas ativas maternas ou ginecológicas subclínicas (vaginose bacteriana, ITU recorrente)',
      'Colo de útero curto mensurado anteriormente (< 25 mm na ecografia gestacional)',
      'Sangramento vaginal repetido no segundo trimestre gravídico',
      'Estresse psicossocial extremo e sobrecarga mecânica profissional'
    ],
    red_flags: [
      'Presença de febre materna elevada associada a sensibilidade uterina fétida dolorosa (corioamnionite)',
      'Sangramento vaginal ativo abundante com dores insuportáveis contínuas',
      'Sinais cardiotocográficos fetais anormais indicando urgência circulatória fetal'
    ],
    diferenciais: [
      'Contrações de Braxton-Hicks benignas (irregulares, indolores, que melhoram com hidratação e repouso)',
      'Infecção do trato urinário aguda simples (cistite simulando cólicas suprapúbicas)',
      'Apendicite aguda ou outras cólicas enterais intestinais'
    ],
    achados_exames: [
      'Ultrassonografia Transvaginal para Cervicometria: avaliação do comprimento cervical do útero (colo de útero < 20-25 mm possui alto valor preditivo para parto precoce).',
      'Teste de Fibronectina Fetal no corrimento vaginal posterior: se negativo entre 22-34 semanas, possui altíssimo valor preditivo negativo para parto em 7-14 dias.',
      'Exame Físico Ginecológico Dinâmico com Toque Unidigital: revela apagamento importante do canal cervical uterino acompanhado de dilatação cervical progressiva superior a 2 cm.'
    ],
    criterios_diagnosticos: [
      'Gestação confirmada viável com idade gestacional entre 22 e 37 semanas completas.',
      'Presença de contrações uterinas dolorosas, ritmadas, com frequência mínima de 4 contrações a cada 20 minutos de observação contínua.',
      'Evidência clínica de modificação ativa no colo do útero manifestada por apagamento cervical ≥ 80% ou dilatação do óstio uterino progressiva superior a 2.0-3.0 cm documentada.'
    ]
  },
  {
    id: 'O42.9',
    nome: 'Amniorrexe Prematura / RPMO',
    sintomas: [
      'Perda súbita de líquido transparente ou claro amarelado, abundante ("molhando as pernas ou colchão", caloroso)',
      'Perda contínua de fluido em gotejamento crônico e incontrolável pelo vaso genital inferior',
      'Odor característico da secreção vaginal líquida (semelhante a água de sanitário ou cloro)',
      'Ausência habitual de contrações dolorosas imediatas de trabalho de parto ativo'
    ],
    fatores_risco: [
      'Presença de infecção fúngica, bacteriana vaginal ou infecção urinária ativa persistente',
      'Histórico de amniorrexe prematura em gestações anteriores',
      'Colo curto uterino ou frouxidão istmocervical congênita',
      'Tabagismo ativo materno e nutrição de baixos resíduos',
      'Procedimento recente de amniocentese diagnóstica',
      'Polidrâmnio de alta tensão ou gestação múltipla gemelar'
    ],
    red_flags: [
      'Secreção líquida de tonalidade fétida associada a febre materna (> 38°C) e taquicardia (sinal inequívoco de infecção amniótica - Corioamnionite)',
      'Saída de secreção amarelada escura ou esverdeada (presença de mecônio espesso indício de sofrimento hipóxico fetal)',
      'Surgimento súbito de alça ou cordão umbilical visível no introito vaginal pós-bolsa rota (Prolapso de Cordão de emergência máxima)'
    ],
    diferenciais: [
      'Incontinência urinária de perda de esforço súbita involuntária',
      'Corrimento vaginal fisiológico abundante da gravidez (hidrorreia gravídica)',
      'Perda de tampão mucoso espesso liquefatório'
    ],
    achados_exames: [
      'Exame Físico Especular Estéril (Toque bimanual deve ser evitado): visualização direta de gotejamento macroscópico de líquido límpido pelo orifício do colo uterino sob manobra provocativa direcionada (Manobra de Valsalva ou compressão do fundo uterino).',
      'Teste do pH vaginal com papel de Nitrazina: o líquido amniótico alcaliniza o pH vaginal de ácido para alcalino, mudando a cor do papel para azul escuro (pH 7.0-7.5).',
      'Teste da Cristalização do muco vaginal (Exame da Folha de Samambaia na lâmina seca): visualização de padrão arboriforme nítido samambaia sob microscópio simples.',
      'Ultrassonografia Obstétrica: demonstra Índices de Líquido Amniótico muito baixos (oligoâmnio súbito).'
    ],
    criterios_diagnosticos: [
      'Histórico compatível e evidente de perda de líquido de volume acentuado antes do início de trabalho de parto ativo.',
      'Constatação direta de corrimento líquido límpido alcalino saindo pelo colo cervical no exame especular estéril.',
      'Confirmado em casos duvidosos por testes bioquímicos rápidos (Amnisure, detecção de PAMG-1 ou IGFBP-1 em secreção vaginal) ou imagem ecográfica evidenciando queda abrupta do bolsão de fluido amniótico.'
    ]
  },
  {
    id: 'O41.1',
    nome: 'Corioamnionite',
    sintomas: [
      'Febre materna elevada (> 38°C) de caráter persistente sustentado',
      'Taquicardia materna significativa (> 100 bpm) e taquicardia fetal marcante sustentada (> 160 bpm)',
      'Secreção vaginal purulenta ou líquido amniótico expelido com odor fétido desagradável',
      'Sensibilidade dolorosa uterina à palpação profunda (útero irritativo doloroso)',
      'Contrações uterinas indolores ou irregulares dolorosas reativas'
    ],
    fatores_risco: [
      'Ruptura Prematura de Membranas Ovulares com latência prolongada (> 18-24 horas sem manejo profilático)',
      'Múltiplos exames de toque vaginal vaginal realizados pós-ruptura de membranas',
      'Trabalho de parto excessivamente prolongado ou mecânica obstrutiva ativa',
      'Presença de infecções fúngicas or bacterianas locais não tratadas'
    ],
    red_flags: [
      'Instabilidade hemodinâmica materna de início rápido com hipotensão (indicador de Choque Séptico obstétrico)',
      'Atonia uterina de contração pós-parto imediata expressando hemorragia maciça refratária decorrente de infecção miometrial',
      'Acidose metabólica severa no cordão do recém-nascido e óbito fetal'
    ],
    diferenciais: [
      'Infecção de vias urinárias maternas / Pielonefrite aguda gestacional com febre',
      'Pneumonia comunitária de gestante no final da gravidez',
      'Apendicite aguda mimetizante'
    ],
    achados_exames: [
      'Cultura do líquido amniótico obtida por agulha ou swab de restos placentários após parto: identificação bacteriana polimicrobiana.',
      'Hemograma maternal completo: leucocitose pronunciada (tipicamente > 15.000 ou 18.000/mm³) com acentuado desvio à esquerda e neutrofilia.',
      'Proteína C Reativa (PCR): marcadamente elevada de padrão progressivo agudo.',
      'Cardiotocografia obstétrica: revela padrão de taquicardia fetal contínua sem acelerações ou variabilidade achatada por invasão bacterêmica.'
    ],
    criterios_diagnosticos: [
      'Critérios Clínicos Consensuais de Gibbs para diagnóstico de infecção fintrauterina amniótica:',
      'Presença obrigatória de Febre materna persistente ≥ 38.0°C nas medições clínicas.',
      'Associado obrigatoriamente a pelo menos duas das seguintes manifestações clínicas e laboratoriais:',
      '- Taquicardia fetal duradoura (> 160 bpm).',
      '- Taquicardia materna (> 100 bpm) em repouso.',
      '- Leucocitose materna residual (> 15.000/mm³).',
      '- Útero doloroso ou sensível à palpação profunda no exame clínico.',
      '- Líquido amniótico com viscosidade purulenta ou com odor putrefato fétido.'
    ]
  },
  {
    id: 'O36.0',
    nome: 'Doença Hemolítica Perinatal',
    sintomas: [
      'Quadro assintomático na gestante saudável e identificada por testes de rastreio sorológico imunoalérgicos',
      'Feto manifestando no final da gestação sinais de hidropisia fetal (edema generalizado difuso, ascite líquida, efusão pleural e pericárdica, insuficiência cardíaca fetal) nos casos graves'
    ],
    fatores_risco: [
      'Gestante portadora de grupo sanguíneo com Fator Rh negativo',
      'Feto concebido portando grupo sanguíneo de Fator Rh positivo herdado do pai',
      'Histórico de gestação prévia Rh positiva sem administração recomendada profilática de imunoglobulina anti-D',
      'Histórico pessoal anterior de hemotransfusões de sangue Rh incompatível',
      'Procedimentos de cirurgia ou trauma abdominal obstétrico recente (amnio, biópsia coriônica, queda síncope)'
    ],
    red_flags: [
      'Evidência ecocardiográfica fetal de hidropisia iminente com anemia fetal severa extrema',
      'Obito fetal intrauterino abrupto de terceiro trimestre gestacional',
      'Icterícia neonatal precoce severa com encefalopatia por bilirrubinas (Kernicterus) no momento pós-nascimento imediato'
    ],
    diferenciais: [
      'Anemia fetal por infecção por Parvovírus B19 na gravidez',
      'Hidropisia não imune decorrente de cardiopatias fetais congênitas complexas',
      'Anemia fetal por transfusão feto-fetal em gestação gemelar'
    ],
    achados_exames: [
      'Pesquisa de Anticorpos Irregulares na gestante (Coombs Indireto): positivo com titulações de anticorpos elevadas no plasma, ultrapassando o título crítico de diluição habitual (geralmente diluições ≥ 1:16).',
      'Ultrassonografia Obstétrica com Doppler da Artéria Cerebral Média Fetal (ACM): mensuração do Pico de velocidade sistólica (PVS-ACM) acima de 1.5 múltiplos da mediana (MoM) para a respectiva idade de maturidade gestacional, indicando anemia fetal de padrão moderado a grave.',
      'Cordocentese com dosagem de hemoglobina fetal se anemia severa no ecocardiograma Doppler.'
    ],
    criterios_diagnosticos: [
      'Gestante portadora documentada de Fator Rh negativo com Coombs Indireto sérico positivo em níveis críticos de diluição.',
      'Gestação viável de feto Rh positivo cursando com aloimunização hemolítica ativa primária.',
      'Confirmação por Doppler de vaso cerebral média demonstrando incremento em fluxo de PVS sugestivo de compensação hematológica fetal por anemia macroangiopática.'
    ]
  },
  {
    id: 'O36.5',
    nome: 'Restrição de Crescimento Fetal',
    sintomas: [
      'Quadro assintomático na gestante, percebido clinicamente pela discrepância da altura uterina (AU) menor que a esperada para a idade gestacional',
      'Percepção de redução moderada dos movimentos fetais regulares no final do dia'
    ],
    fatores_risco: [
      'Síndromes hipertensivas da gravidez (pré-eclâmpsia grave, hipertensão crônica maternas)',
      'Tabagismo materno intenso, dependência química ou alcoolismo na gestação',
      'Desnutrição severa materna acompanhada de baixo peso ao engravidar',
      'Infecções fetais crônicas congênitas do grupo TORCH (Sífilis, Toxoplasmose, CMV)',
      'Insuficiência uteroplacentária primária por aterose aguda vascular de artérias espiraladas',
      'Anomalias genéticas, trissomias cromossômicas embrionárias'
    ],
    red_flags: [
      'Cardiotocografia apresentando variabilidade severamente achatada (< 5 bpm) com desacelerações de padrão tardio',
      'Estudo Doppler com presença de diástole zero ou diástole reversa aguda na artéria umbilical (indício de disfunção placentária e acidose fetal severa iminente)',
      'Ausência total de movimentos respiratórios fetais ou óbito intrauterino'
    ],
    diferenciais: [
      'Feto Pequeno para a Idade Gestacional (PIG) constitucional / saudável (percentil abaixo de 10, porém com pais saudáveis pequenos e Doppler de fluxo rigorosamente normal)',
      'Idade gestacional incorretamente calculada por ultrassonografia tardia errada'
    ],
    achados_exames: [
      'Ultrassonografia Obstétrica com Biometria fetal: constata peso estimado fetal (FWE) localizado estatisticamente abaixo do Percentil 10 ou Percentil 3 para a respectiva semana gestacional.',
      'Estudo Doppler de Vasos Fetais (Dopplefluxometria):',
      '- Artérias Umbilicais: revela aumento drástico de resistência vascular periférica (IP elevado), progredindo para ausência de fluxo diastólico (diástole zero) ou inversão de fluxo (diástole reversa).',
      '- Artéria Cerebral Média: demonstra vasodilatação cerebral adaptativa reativa compensatória (centralização fetal com relação cérebro-placentária < 1.0).',
      '- Ducto Venoso: padrão de onda A reversa indicando falência cardíaca fetal ventricular progressiva.'
    ],
    criterios_diagnosticos: [
      'Peso fetal estimado à ultrassonografia localizado abaixo do Percentil de corte consorciado para a respectiva idade gestacional:',
      '- Peso fetal estimado < Percentil 3 da curva populacional estabelece diagnóstico direto de RCF severo.',
      '- Peso fetal estimado entre o Percentil 3 e 10, com a presença obrigatória de Doppler de vasos alterado (relação cérebro-placentária alterada ou IP de artérias uterinas bilaterais elevado).'
    ]
  },
  {
    id: 'O23.4',
    nome: 'Cistite na Gestação',
    sintomas: [
      'Ardência importante ou disúria miccional de início recente',
      'Aumento severo na frequência urinária (polaciúria) com urgência para urinar',
      'Dor ou sensação de peso suprapúbico no baixo ventre',
      'Urina de coloração turva acompanhada de odor forte anormal',
      'Ausência habitual de febre alta ou dor lombar na percussão de Giordano'
    ],
    fatores_risco: [
      'Aumento fisiológico da estase de urina na gestação pela progesterona que relaxa musculatura ureteral',
      'Compressão mecânica dos ureteres exercida pelo útero gravídico aumentado dextrorotado',
      'Higiene íntima deficiente ou atitudes sexuais frequentes na gestação',
      'Diabetes Gestacional descompensado facilitando proliferação bacteriana por glicosúria urinária'
    ],
    red_flags: [
      'Progressão rápida para febre materna elevada com dor lombar severa (indicação de subida da infecção em Pielonefrite Aguda)',
      'Hipotensão postural sistêmica ou prostração',
      'Aparecimento de contrações regulares indolores sugerindo ameaça de parto prematuro induzido'
    ],
    diferenciais: [
      'Bacteriúria Assintomática (urocultura com colônias elevadas, mas sem sintomas)',
      'Vulvovaginite fúngica por Candida (ardência e prurido superficial)',
      'Pielonefrite aguda obstrutiva de início'
    ],
    achados_exames: [
      'Exame de urina tipo I de emergência (EAS): revela forte contagem de piócitos / leucocitúria volumosa (> 10 por campo), nitrito positivo por bactérias Gram-negativas e hematúria microscópica eventual.',
      'Urocultura e Teste de Sensibilidade (Antibiograma): padrão-ouro confirmatório obrigatório em grávidas, devendo indicar contagem ≥ 10^5 Unidades Formadoras de Colônias (UFC/mL) do patógeno causal (comunmente Escherichia coli em > 80%).'
    ],
    criterios_diagnosticos: [
      'Presença de sintomas de irritação de bexiga (disúria, polaciúria, urgência) em gestante em curso ativo.',
      'Investigação laboratorial com análise de urina evidenciando inflamação do sedimento urinário ativo.',
      'Confirmado por contagem superior a 100.000 UFC/mL em urocultura de jato médio recente com isolamento de bactéria Gram-negativa ou patógeno equivalente.'
    ]
  },
  {
    id: 'O23.0',
    nome: 'Pielonefrite na Gestação',
    sintomas: [
      'Febre materna alta de início abrupto (38.5°C a 39.5°C) precedida de calafrios trementes',
      'Dor lombar profunda unilateral ou bilateral de forte intensidade',
      'Sinal de Giordano positivo (dor súbita severa à leve punho-percussão lombar física)',
      'Náuseas frequentes com episódios de vômitos alimentares e anorexia',
      'Fadiga pronunciada com prostração generalizada',
      'Podem ocorrer disúria e polaciúria prévios ou concomitantes'
    ],
    fatores_risco: [
      'Bacteriúria assintomática prévia na gestação sem detecção ou tratamento em pré-natal',
      'Diagnóstico anterior de refluxo vesicoureteral ou anomalias urinárias anatômicas estruturais',
      'Formação de litíase renal atual que obstrui o fluxo hídrico',
      'Anemia falciforme materna ativa'
    ],
    red_flags: [
      'Instabilidade circulatória sistêmica com colapso ou sepse grave (alto risco de Choque Séptico obstétrico)',
      'Dificuldade para respirar e SatO2 baixa (risco agudo de edema pulmonar e Síndrome do Desconforto Respiratório por liberação endotóxica de bactérias)',
      'Início súbito de dinâmica de contrações sustentadas com sofrimento fetal'
    ],
    diferenciais: [
      'Apendicite aguda de localização retrocecal atípica em gestante',
      'Cólica nefrética isolada com litíase ureteral pura',
      'Descolamento prematuro de placenta de face posterior silenciosa'
    ],
    achados_exames: [
      'Urinálise básica e Urocultura de jato médio: piúria volumosa densa, nitrito detectável e identificação de bactéria ativa ≥ 10^5 UFC/mL.',
      'Hemoculturas maternas periféricas: recomendadas em casos graves febris e tóxicos para rastrear bacteremia sistêmica.',
      'Hemograma maternal completo: expressa severa leucocitose com neutrofilia e desvio importante à esquerda, PCR sérica marcadamente elevada.',
      'Ultrassonografias de Rins e Vias Urinárias: indicada para avaliar hidronefrose obstrutiva ou abscesso peri-renal oculto.'
    ],
    criterios_diagnosticos: [
      'Indicação mandatória de internação hospitalar imediata em gestante.',
      'Presença consolidada de Febre alta materna acompanhado de dor lombar intensa focalizada na percussão física de Giordano.',
      'Achados laboratoriais de piúria acentuada no Eas, e urocultura/hemocultura sequencial positiva confirmando infecção do trato urinário alto.'
    ]
  },
  {
    id: 'O01.0',
    nome: 'Doença Gestacional Trofoblástica',
    sintomas: [
      'Sangramento vaginal flutuante constante no primeiro trimestre gestacional, vermelho vivo ou acastanhado purulento (sangramento em ameixa)',
      'Náuseas severas e vômitos extremamente precoces e intratáveis (hiperêmese induzida por níveis absurdos de hormônios)',
      'Aumento volumétrico uterino marcadamente desproporcional ao esperado para o tempo gestacional real',
      'Surgimento de manifestações hipertensivas severas (pré-eclâmpsia) precocemente em gestação inicial (antes de 20 semanas)'
    ],
    fatores_risco: [
      'Idade materna extrema (mulheres com idade anterior a 15-20 anos ou superior a 40 anos)',
      'Histórico de Doença Gestacional Trofoblástica (mola hidatidiforme) na história obstétrica pregressa',
      'Histórico persistente de abortamentos de repetição espontâneos',
      'Status nutricional deficiente materno (baixos níveis de vitamina A e carotenos)'
    ],
    red_flags: [
      'Sangramento vaginal de volume catastrófico incoercível e contínuo',
      'Eliminação traumática transvaginal de vesículas hídricas hidrópicas puras (aspecto de uvas/baba de quiabo)',
      'Dispneia súbita torácica com hemoptise indicativa de metástase coriocarcinomatosa pulmonar'
    ],
    diferenciais: [
      'Gravidez gemelar múltipla com altos níveis hormonais ordinários',
      'Abortamento retido simples ou incompleto de gestação eutópica',
      'Doença hepática ou gastroesofágica simulada com vômitos',
      'Cisto ovariano de teca-luteína roto'
    ],
    achados_exames: [
      'Ultrassonografia Transvaginal: revela cavidade uterina preenchida por ecogenicidade mista com múltiplas pequenas áreas anecoicas vesiculares de permeio, sem evidência de embrião ou saco gestacional normal (aspecto clássico de tempestade de neve ou flocos de aveia), associado a ovários contendo cistos teca-luteínicos bilaterais aumentados.',
      'Beta-hCG sérico quantitativo: valores extraordinariamente e patologicamente elevados, frequentemente ultrapassando faixas de 100.000 a 500.000 mUI/mL.',
      'Hemograma e TSH: rastreio de anemia severa e hipotireoidismo induzido por homologia molecular do hCG com TSH.'
    ],
    criterios_diagnosticos: [
      'Níveis de Beta-hCG quantitativo sérico patologicamente fora da faixa normal para a respectiva idade gestacional em curso.',
      'Ultrassonografia obstétrica demonstrando padrão intrauterino vesicular típico em flocos de neve sem saco gestacional.',
      'Exame Anatomopatológico definitivo baseado no tecido obtido por esvaziamento uterino (vácuo-aspiração): constatação cirúrgica de edema hidrópico de vilosidades coriônicas, proliferação anormal sincicial e ausência ou presença vestigial de vasos fetais (Mola Completa vs Mola Parcial).'
    ]
  },
  {
    id: 'O98.1',
    nome: 'Sífilis na Gestação',
    sintomas: [
      'Quadro assintomático na impressionante maioria das grávidas (diagnóstico de rastreamento prenatal)',
      'Histórico recente de úlcera genital única, indolor de bordas endurecidas que desapareceu espontaneamente sem deixar marcas (cancro duro sifilítico primário)',
      'Manchas vermelhas não pruriginosas nas palmas das mãos e solas dos pés (alérgica sifilítica secundária)'
    ],
    fatores_risco: [
      'Falta de acompanhamento pré-natal precoce ou adesão comprometida do casal',
      'Parceiro sexual com comportamento protetor ou profilático deficiente, não tratado',
      'Multiplicidade de parceiros ativos desprotegidos',
      'Histórico de outras Doenças Sexualmente Transmissíveis ativos'
    ],
    red_flags: [
      'Histórico ou ecografia ginecológica sugerindo restrição de crescimento fetal severa ou sinais de hidropisia fetal infecciosa',
      'Óbito fetal tardio inexplicado intraútero',
      'Nascimento recente de recém-nascido apresentando hepatoesplenomegalia, penfigoide e rinite serossanguinolenta (Sífilis Congênita precoce severa)'
    ],
    diferenciais: [
      'Dermatite ou eritema multiforme difuso da gravidez',
      'Herpes genital supurado de repetição',
      'Outras ISTs ulceradas (cancroide, linfogranuloma)'
    ],
    achados_exames: [
      'Testes Não Treponêmicos de Rastreio (VDRL ou RPR): positivo quantificável em títulos flutuantes (ex: 1:4, 1:16, 1:64). Utilizados para diagnóstico primário e controle de cura.',
      'Testes Treponêmicos Confirmatórios (FTA-ABS, Teste Rápido - TR ou ELISA): positivos de forma duradoura (cicatriz sorológica).',
      'Ultrassonografias Obstetras seriadas: para pesquisa de sinais fetais sugestivos adicionais (placentomegalia, ascite).'
    ],
    criterios_diagnosticos: [
      'Rastreamento sorológico positivo para infecção por Treponema pallidum na gestante:',
      'Terceirizada na vigência de teste rápido treponêmico positivo associado a teste não treponêmico (VDRL) positivo em qualquer titulação.',
      'Na ausência de documentação sorológica pretérita de tratamento completo adequado anterior, a gestante é considerada portadora ativa necessitando imediata terapia benzatínica com seu parceiro sexual concomitante.'
    ]
  },
  {
    id: 'O98.6',
    nome: 'Toxoplasmose na Gestação',
    sintomas: [
      'Fase de infecção aguda assintomática em mais de 90% das gestantes portadoras',
      'Sintomas gripais discretos de início agudo nas grávidas sintomáticas: febre baixa transitória, mialgia difusa e dor de garganta',
      'Surgimento de gânglios inflamatórios aumentados de volume dolorosos e bilaterais na região cervical lateral (linfadenopatia cervical)'
    ],
    fatores_risco: [
      'Ingestão frequente de carne vermelha crua, malpassada ou embutidos defumados crus',
      'Contato mecânico direto com fezes de gatos jovens domésticos ou manuseio de terra de jardim sem luva de proteção',
      'Consumo regular de água não tratada ou verduras e legumes crus lavados de forma ineficaz'
    ],
    red_flags: [
      'Sorologia de primeiro trimestre indicando conversão aguda de anticorpos IgM e IgG simultâneos com alto potencial de transmissão placentária',
      'Ultrassonografias obstétricas detalhadas demonstrando achados fetais patognomônicos (calcificações intracranianas dispersas de parênquima, dilatação ventricular cerebral / hidrocefalia e restrição de crescimento)'
    ],
    diferenciais: [
      'Mononucleose infecciosa por vírus de Epstein-Barr',
      'Citomegalovirose aguda ativa gestacional',
      'Faringoamigdalite bacteriana comum'
    ],
    achados_exames: [
      'Sorologia de Rastreio em Pré-Natal (Anticorpos IgG e IgM):',
      '- IgG negativo / IgM negativo: gestante suscetível (necessita triagem mensal).',
      '- IgG positivo / IgM negativo: infecção passada sedimentada com imunidade de salvaguarda.',
      '- IgG negativo / IgM positivo ou IgG positivo com IgM positivo recente: suspeita de infecção aguda ativa.',
      'Teste de Avidez de IgG: realizado em casos de IgG/IgM positivos antes de 16 semanas. Alta avidez indica infecção contraída há mais de 4 meses (exclui infecção aguda no início gravídico). Baixa avidez sugere infecção recente aguda.',
      'Reação de Cadeia de Polimerase (PCR) no líquido amniótico obtido por amniocentese (indicado após 18 semanas): padrão de certeza definitivo para rastrear infecção fetal por transmissão placentária.'
    ],
    criterios_diagnosticos: [
      'Soroconversão sorológica comprovada durante a atual gravidez ativa (mudança de anticorpos IgG negativos para positivos).',
      'Presença de anticorpos IgG e IgM contra Toxoplasma gondii simultâneos, associado a teste de avidez de IgG baixo documentado antes da 16ª semana gestacional.',
      'Alternativamente, confirmação de transmissão amniótica por técnica de PCR positiva detectada em fluido amniótico puncionado por agulha.'
    ]
  },
  {
    id: 'O34.3',
    nome: 'Insuficiência Istmocervical',
    sintomas: [
      'Ausência total de dor abdominal em baixo ventre ou contrações dolorosas antecedendo eventos de dilatação',
      'Sensação leve de peso ou pressão pélvica vaginal discreta',
      'Perda de muco vaginal transparente ou estrias de sangue discretas vaginal',
      'Dilatação cervical progressiva indolor com hérnia das membranas ovulares no canal vaginal em gestação de segundo trimestre (16-24 semanas)'
    ],
    fatores_risco: [
      'Histórico obstétrico anterior clássico de partos extremamente rápidos com expulsão de fetos imaturos indolores no segundo trimestre',
      'Histórico pessoal de cirurgias no colo uterino traumáticas (traquelectomia, conização mecânica cervical prévia ou conizações por NIC)',
      'Dilatação mecânica forçada do colo do útero em curetagens anteriores',
      'Malformações uterinas estruturais de fusão de ductos mullerianos',
      'Exposição prévia transuterina ao dietilestilbestrol (DES)'
    ],
    red_flags: [
      'Bolsa das águas com herniação extramembranosa inteira visível no exame de espelho direto na cavidade vulvar sem dinâmica dolorosa ativa',
      'Rutura prematura iminente de membranas ovulares rompidas',
      'Febre fetal ou corioamnionite associada ao colo aberto'
    ],
    diferenciais: [
      'Trabalho de parto prematuro precoce (cursa com contrações regulares dolorosas contínuas)',
      'Aborto inevitável por óbito fetal basal de causa cromossômica inicial'
    ],
    achados_exames: [
      'Exame Físico Ginecológico Especular: visualização direta do colo do útero dilatado passivamente de forma proeminente com saco amniótico hernoado se projetando no introito vaginal.',
      'Ultrassonografia Transvaginal seriada para Cervicometria (realizada entre 16-24 semanas em pacientes de risco): revela encurtamento do comprimento do colo uterino (< 25 mm) e sinal típico de "funilamento cervical" (abertura da porção istmo-cervical interna sob pressão fúndica manual).'
    ],
    criterios_diagnosticos: [
      'Histórico obstétrico pregressivo típico e definitivo de duas ou mais perdas fetais tardias gestacionais indolores expulsas de modo sequencial no segundo trimestre.',
      'Alternativamente, constatação ativa em gestante de risco de encurtamento progressivo indolor do colo do útero (< 25 mm) à ultrassonografia transvaginal, com funilamento mecânico evidente seletivo.',
      'Toque bimanual ou exame especular revelando dilatação de colo ≥ 2.0 cm na ausência total de contrações uterinas dolorosas.'
    ]
  },
  {
    id: 'O41.0',
    nome: 'Oligoâmnio',
    sintomas: [
      'Quadro assintomático na gestante saudável, que manifesta apenas altura uterina menor do que a curva populacional',
      'Percepção de redução global dos movimentos normais do bebê',
      'Sensação de palpação fácil de partes e estruturas fetais duras sob parede abdominal abdominal'
    ],
    fatores_risco: [
      'Insuficiência uteroplacentária crônica (restrição de crescimento fetal ativo)',
      'Ruptura prematura silenciosa de membranas ovulares (amniorrexe fístula oculta)',
      'Síndromes hipertensivas e pré-eclâmpsia gestacional da gravidez',
      'Síndrome de transfusão feto-fetal em gravidez gemelar monocoriônica',
      'Uso inadequado de fármacos na gravidez (ex: inibidores da ECA ou AINEs de uso prolongado no 3º trimestre)',
      'Malformações renais fetais estruturais (agenesia renal bilateral ou obstrução no trato de saída urinário)'
    ],
    red_flags: [
      'Estudo Doppler fetal demostrando centralização hemodinâmica cerebral com ducto venoso alterado ou onda a reversa',
      'Ausência total de detecção de bolsões de fluido amniótico no exame de rastreio contínuo',
      'Sofrimento agudo fetal traduzido por bradicardia cardiotocográfica persistente por provável compressão mecânica de cordão umbilical'
    ],
    diferenciais: [
      'Data de idade gestacional incorretamente calculada na ficha de pré-natal',
      'Ruptura prematura de bolsa (amniorrexe documentada clássica)',
      'Desidratação materna temporária reversível com reidratação'
    ],
    achados_exames: [
      'Ultrassonografia Obstétrica detalhada: padrão-ouro confirmatório que mede os compartimentos do fluido:',
      '- Índice de Líquido Amniótico (ILA) inferior a 5.0 cm (com soma de quadradinhos de quadrante).',
      '- Maior Bolsão Vertical (MBV) de líquido amniótico livre inferior a 2.0 cm.',
      'Ecocardiografia e ultrassom das vias urinárias fetais para pesquisa de rins e bexiga fetal.',
      'Exame especular estéril para afastar peremptoriamente fístula de bolsa rota.'
    ],
    criterios_diagnosticos: [
      'Presença de volume de fluido amniótico significativamente diminuído para o tempo do cronograma de semanas gestacionais.',
      'Confirmado por ecografia obstétrica demonstrando de forma quantitativa:',
      '- Maior bolsão vertical isolado livre < 2.0 cm brutos.',
      'Ou ILA acumulado de quatro quadrantes < 5.0 centímetros, após exclusão de desidratação materna aguda severa.'
    ]
  },
  {
    id: 'O40',
    nome: 'Polidrâmnio',
    sintomas: [
      'Aumento exagerado do volume abdominal materno incompatível com a idade gestacional real',
      'Discrepância na altura uterina acima do percentil limits para o tempo gestacional',
      'Dificuldade para respirar (dispneia) em decorrência da elevação excessiva do músculo diafragma',
      'Presença de edema de parede do abdome em baixo ventre e de membros inferiores membros',
      'Dificuldade para auscultar os batimentos fetais comuns (abafamento sonoro por excesso líquido)'
    ],
    fatores_risco: [
      'Diabetes Mellitus Gestacional ou pré-gestacional materno descompensado (poliúria fetal por hiperglicemia)',
      'Incompatibilidade sanguínea materno-fetal de fator Rh (Doença Hemolítica severa com hidropisia)',
      'Anomalias estruturais gastrointestinais fetais (atresia de esôfago ou de duodeno impedindo a deglutição do líquido)',
      'Gestação gemelar complexa (síndrome de transfusão feto-fetal em feto receptor)',
      'Infecções congênitas do parênquima ativo (Sífilis, Rubéola, Parvovirose B19)',
      'Anomalias cromossômicas complexas'
    ],
    red_flags: [
      'Amniorrexe prematura com descompressão uterina abrupta associando Prolapso de cordão de urgência obstétrica em decorrência do fluxo de líquido torrencial',
      'Trabalho de parto prematuro severo precipitado',
      'Atonia de miométrio pós-parto imediato por hiperdistensão de fibras musculares uterinas volumosas'
    ],
    diferenciais: [
      'Gestações multifetais não diagnosticadas na primeira consulta',
      'Massa abdominal ovariana volumosa concomitante (cisto de ovário gigante)',
      'Ascite materna isolada grave'
    ],
    achados_exames: [
      'Ultrassonografia Obstétrica detalhada: padrão confirmatório quantitativo que revela:',
      '- Maior Bolsão Vertical (MBV) de fluido amniótico superior ou igual a 8.0 cm.',
      '- Índice de Líquido Amniótico (ILA) superior a 24.0 ou 25.0 cm.',
      'Avaliação ecográfica anatômica minuciosa fetal dedicada a descartar atresias ou anomalias de face, SNC e coração de alta resolução.',
      'Curva glicêmica materna de triagem (TOTG 75g): obrigatória se polidrâmnio de início recente sem defeito anatômico visível.'
    ],
    criterios_diagnosticos: [
      'Excesso patológico quantitativo de líquido amniótico circundando o feto na ecografia obstétrica.',
      'Criterios para estabelecimento do diagnóstico de certeza:',
      '- Presença de Maior Bolsão Vertical de líquido isolado ≥ 8.0 cm de extensão.',
      'Ou ILA global de quatro compartimentos medido ≥ 24.0-25.0 cm lineares na ultrassonografia obstétrica.'
    ]
  }
];
