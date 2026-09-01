import { MedicalDisease } from '../types';

export const PEDIATRIC_DISEASES_BATCH2: MedicalDisease[] = [
  {
    id: 'H60.3',
    nome: 'Otite Externa Aguda',
    sintomas: [
      'Dor de ouvido intensa (otalgia) que piora muito à tração do pavilhão auricular ou pressão no trago',
      'Prurido incômodo no conduto auditivo externo',
      'Sensação de ouvido tampado (plenitude auricular)',
      'Secreção purulenta escassa e edema do conduto auditivo'
    ],
    fatores_risco: [
      'Histórico recente de natação ou banhos frequentes de piscina/mar (ouvido úmido)',
      'Hábito de limpar ou introduzir hastes flexíveis (hastes de algodão) ou outros objetos no ouvido',
      'Dermatite seborreica ou eczema que acometem o pavilhão auricular'
    ],
    red_flags: [
      'Febre moderada a alta associada a eritema e edema retroauricular (Mastoidite ou Celulite local)',
      'Paralisia de nervo facial ipsilateral periférica ou dor insuportável refratária',
      'Paralisia de nervos cranianos inferiores em pacientes diabéticos ou imunocomprometidos'
    ],
    diferenciais: [
      'Otite Média Aguda com perfuração timpânica',
      'Corpo estranho retido no conduto auditivo com infecção',
      'Disfunção da articulação temporomandibular (DTM) infantil'
    ],
    achados_exames: [
      'Otoscopia demonstrando conduto auditivo externo extremamente edemaciado, hiperemiado, por vezes ocluso por detritos purulentos',
      'Membrana timpânica de aspecto normal e móvel (quando visível entre o edema)'
    ],
    criterios_diagnosticos: [
      'Início rápido (menos de 48h) de otalgia intensa associada a sinais de inflamação do conduto (edema, dor ao toque no trago)',
      'Ausência de envolvimento sistemático do ouvido médio (timpanometria normal)'
    ]
  },
  {
    id: 'J20.9',
    nome: 'Bronquite Aguda Infantil',
    sintomas: [
      'Tosse produtiva ou seca persistente que dura de 1 a 3 semanas',
      'Febre de baixa intensidade ou ausente após os primeiros dias',
      'Roncos e estertores grossos dispersos na ausculta pulmonar',
      'Dor torácica retroesternal associada à tosse persistente'
    ],
    fatores_risco: [
      'Infecção prévia recente das vias aéreas superiores (resfriado ou gripe)',
      'Exposição ao fumo passivo residencial ou poluição do ar',
      'Histórico de hiperreatividade brônquica ou asma atópica leve'
    ],
    red_flags: [
      'Presença de taquipneia acentuada persistente ou cansaço muscular inspiratório',
      'Saturação de oxigênio depletada abaixo de 92% em ar ambiente',
      'Febre alta persistente por mais de 5 a 7 dias orientando pneumonia'
    ],
    diferenciais: [
      'Pneumonia bacteriana adquirida na comunidade (PAC)',
      'Crise de Asma brônquica infantil',
      'Tosse ferina / Coqueluche na fase paroxística'
    ],
    achados_exames: [
      'Radiografia de tórax limpa, sem consolidações alveolares (apenas acentuação da trama broncovascular)',
      'Hemograma completo normal ou demonstrando perfil discretamente viral'
    ],
    criterios_diagnosticos: [
      'Diagnóstico essencialmente clínico caracterizado por tosse prolongada (geralmente produtiva) após quadro gripal, sem febre duradoura',
      'Completo descarte de sinais localizados de consolidação pulmonar ou broncoespasmo tratável'
    ]
  },
  {
    id: 'B35.0',
    nome: 'Micose do Couro Cabeludo (Tinea Capitis)',
    sintomas: [
      'Uma ou mais placas descamativas circulares de alopecia (perda de cabelo) no couro cabeludo',
      'Presença de fios de cabelo "cortados rente" ou quebradiços na borda da placa',
      'Prurido local de intensidade variável no couro cabeludo',
      'Placa inflamatória dolorosa e purulenta coberta de crostas (Kerion Celsi)'
    ],
    fatores_risco: [
      'Contato próximo com animais domésticos (especialmente filhotes de cães ou gatos infectados por Microsporum canis)',
      'Compartilhamento de escovas, pentes, bonés ou travesseiros com pessoa infectada',
      'Frequentar creches ou escolas de educação infantil'
    ],
    red_flags: [
      'Kerion Celsi com flutuação dolorosa e adenomegalia cervical volumosa dolorosa associada',
      'Surgimento de infecção bacteriana secundária difusa com celulite e febre',
      'Alopecia cicatricial permanente tardia residual se não tratada precocemente'
    ],
    diferenciais: [
      'Alopecia areata (placa lisa, sem descamação ou inflamação)',
      'Dermatite seborreica grave do couro cabeludo',
      'Psoríase capilar'
    ],
    achados_exames: [
      'Exame micológico direto (morfologia de esporos endotrix ou ectotrix) positivo',
      'Cultura fúngica em meio Sabouraud positiva identificando o dermatófito causador (Trichophyton ou Microsporum)',
      'Fluorescência esverdeada clássica sob exame com lâmpada de Wood (específica de M. canis)'
    ],
    criterios_diagnosticos: [
      'Quadro clínico característico de placa descamativa associada a cotos de cabelo e alopecia irregular',
      'Confirmação microbiológica direta por pesquisa de leveduras e fungos ou cultura fúngica positiva'
    ]
  },
  {
    id: 'B35.4',
    nome: 'Tinea Corporis na Infância (Micose de Pele)',
    sintomas: [
      'Lesões anulares (em forma de anel) eritematosas, descamativas, com bordas elevadas e centro mais claro',
      'Crescimento centrífugo gradual da lesão na pele',
      'Prurido de intensidade leve a moderada na área periférica ativa',
      'Presença ocasional de pequenas vesículas na borda da lesão'
    ],
    fatores_risco: [
      'Contato com animais domésticos infectados ou terra úmida',
      'Clima quente, úmido tropical que favorece a proliferação fúngica',
      'Compartilhamento de toalhas de banho ou roupas corporativas'
    ],
    red_flags: [
      'Extensão maciça e generalizada das lesões em todo o corpo',
      'Infecção bacteriana secundária por coçadura com celulite ou erisipela regional',
      'Uso inadvertido de corticoide tópico de alta potência mascarando o quadro (Tinea incognita)'
    ],
    diferenciais: [
      'Pitiríase rósea de Gilbert (placa mãe e distribuição em árvore de natal)',
      'Psoríase vulgar em placas',
      'Eczema numular / Dermatite seca'
    ],
    achados_exames: [
      'Exame micológico direto positivo revelando hifas septadas ramificadas diagnósticas'
    ],
    criterios_diagnosticos: [
      'Aspecto dermatológico clássico de placa anular eritemato-descomativa de progressão centrífuga e bordas vesiculosas ativas',
      'Melhoria total da lesão após tratamento antifúngico tópico adequado'
    ]
  },
  {
    id: 'B35.3',
    nome: 'Tinea Pedis (Frieira)',
    sintomas: [
      'Descamação e maceração esbranquiçada e dolorosa na pele entre os dedos dos pés (interdigital)',
      'Prurido intenso que piora ao retirar os calçados fechados',
      'Eritema, fissuras dolorosas e descamação fina na planta do pé (padrão em "mocassim")',
      'Odor característico fétido decorrente da maceração tecidual'
    ],
    fatores_risco: [
      'Andar descalço em pisos úmidos de vestiários, banheiros públicos e piscinas',
      'Uso prolongado de calçados fechados, apertados de material sintético (suor excessivo)',
      'Má secagem dos pés após banhos diários'
    ],
    red_flags: [
      'Fissuras profundas dolorosas com exsudação purulenta (Celulite ou linfangite bacteriana ascendente)',
      'Disseminação inflamatória aguda vesicular pelo pé (reação "ide" ou dermatofitide)',
      'Extensão do processo inflamatório para as unhas (onicomicose severa)'
    ],
    diferenciais: [
      'Dermatite de contato por calçado (poupe espaços interdigitais profundos)',
      'Dermatose plantar juvenil',
      'Psoríase plantar descamativa'
    ],
    achados_exames: [
      'Pesquisa direta de fungos do raspado interdigital positiva revelando hifas hialinas'
    ],
    criterios_diagnosticos: [
      'Sintomas típicos interdigitais de prurido marcante com pele descamativa macerada',
      'Confirmação clínica auxiliada por exame micológico direto quando necessário'
    ]
  },
  {
    id: 'B36.0',
    nome: 'Pitiríase Versicolor (Pano Branco)',
    sintomas: [
      'Múltiplas máculas (manchas) finas descamativas, de coloração variável (hipocrômicas, róseas ou acastanhadas)',
      'Sinal do "Zileri" positivo (descamação fina ao esticar a pele lesada)',
      'Distribuição preferencial no tronco, pescoço e porção proximal dos braços',
      'Discreto prurido local que piora com o calor corporal ou sudorese'
    ],
    fatores_risco: [
      'Clima tropical extremamente quente e úmido associado',
      'Uso continuado de óleos corporais e bronzeadores oclusivos',
      'Predisposição genética dermatológica e produção excessiva de sebo'
    ],
    red_flags: [
      'Extensão maciça cobrindo quase a totalidade do corpo em adolescente',
      'Plaquetas e áreas inflamatórias secundárias por uso desmedido de pomadas com corticoides'
    ],
    diferenciais: [
      'Vitiligo (hipocromia acentuada em "giz", sem descamação)',
      'Pitiríase alba (comum em crianças atópicas em bochechas e braços)',
      'Hanseníase indeterminada precoce'
    ],
    achados_exames: [
      'Micológico direto positivo revelando hifas curtas e esporos agrupados (imagem de "espaguete com almôndegas")',
      'Fluorescência amarelada-pálida ou dourada característica sob a lâmpada de Wood'
    ],
    criterios_diagnosticos: [
      'Diagnóstico clínico consagrado pelas manchas de coloração diversa com Sinal de Zileri (estiramento) e Sinal de Besnier (unhada) positivos',
      'Visualização das características estruturas leveduriformes no exame micológico direto'
    ]
  },
  {
    id: 'B08.1',
    nome: 'Molusco Contagioso na Infância',
    sintomas: [
      'Múltiplas pápulas firmes, da cor da pele ou brilhantes translúcidas, com umbilicação central',
      'Tamanho variável entre 2 e 5 milímetros',
      'Distribuição preferencial no tronco, axilas e dobras cutâneas flexurais',
      'Ausência habitual de dor local (discreto prurido pode ocorrer)'
    ],
    fatores_risco: [
      'Crianças com diagnóstico ativo de dermatite atópica (barreira cutânea deficiente)',
      'Frequentar piscinas de natação ou banheiras compartilhadas',
      'Compartilhamento de esponjas de banho, toalhas ou brinquedos de praia'
    ],
    red_flags: [
      'Centenas de lesões espalhadas pelo corpo ou acometimento labial/palpebral difuso (Imunodeficiência severa)',
      'Eczema perilesional severo ("molusco induzido") com coçadura violenta',
      'Infecção bacteriana secundária purulenta com celulite local'
    ],
    diferenciais: [
      'Verruga plantar ou filiforme vulgar',
      'Mílios queratínicos simples na face do lactente',
      'Varicela atípica persistente'
    ],
    achados_exames: [
      'Diagnóstico clínico visual marcante, dispensando investigações rotineiras',
      'Citológico do material espremido revelando corpúsculos de inclusão intracitoplasmáticos elipsoides de Henderson-Paterson'
    ],
    criterios_diagnosticos: [
      'Constatação visual típica de múltiplas pápulas ceratóticas firmes peroladas com umbilicação central característica das infecções por Poxvírus',
      'Histórico de persistência assintomática das lesões por semanas a meses'
    ]
  },
  {
    id: 'B07',
    nome: 'Verruga Viral Comum (Verruga Vulgar)',
    sintomas: [
      'Nódulos ou pápulas ceratóticas hiperqueratósicas de superfície áspera e irregular',
      'Presença de minúsculos pontos negros na lesão (alças capilares trombosadas)',
      'Localização preferencial em dorso das mãos, dedos e dobras periungueais',
      'Ausência completa de dor (verrugas plantares profundas podem doer à pressão lateral)'
    ],
    fatores_risco: [
      'Hábito de onicofagia (roer unhas) destruindo a pele periungueal',
      'Uso frequente de banheiros e chuveiros públicos descalço (parasitose plantar)',
      'Pequenas escoriações ou feridas cutâneas locais recorrentes'
    ],
    red_flags: [
      'Lesões gigantes deformantes confluentes sugerindo imunodeficiência celular grave',
      'Sangramento fácil persistente ou deformações estruturais de unhas satélites'
    ],
    diferenciais: [
      'Molusco contagioso umbilicado',
      'Calosidades ou ceratoses actínicas',
      'Líquen plano verrucoso'
    ],
    achados_exames: [
      'Investigação puramente diagnóstica clínica visual sem necessidade de exames complementares'
    ],
    criterios_diagnosticos: [
      'Diagnóstico essencialmente visual por inspeção física de lesões papulonodulares hiperqueratósicas espessas com pontos negros superficiais causadas pelo HPV',
      'Ausência de outros estigmas dermatológicos inflamatórios'
    ]
  },
  {
    id: 'L28.2',
    nome: 'Prurigo Estrófulo (Alergia a Picada de Inseto)',
    sintomas: [
      'Múltiplas pápulas eritematosas, firmes, centradas por pequena vesícula transparente (seropápulas)',
      'Prurido extremamente intenso refratário a repouso',
      'Distribuição simétrica nas áreas expostas corporalmente (membros inferiores, braços, tronco)',
      'Crostas e pequenas cicatrizes escuras secundárias à coçadura intensa'
    ],
    fatores_risco: [
      'Lactentes e crianças pequenas entre as idades de 2 e 7 anos',
      'Exposição frequente a mosquitos (pernilongos), pulgas ou percevejos rurais',
      'Histórico de dermatite atópica ou sensibilização imunitária prévia'
    ],
    red_flags: [
      'Pústula purulenta dolorosa espessa indicando impetiginização secundária maciça',
      'Choque anafilático respiratório (muito raro em estrófulo clássico, mas passível com picadas de himenópteros)',
      'Eritrodermia por prurigo reacional refratário'
    ],
    diferenciais: [
      'Varicela (exantema com vesículas difusas, febre e envolvimento de mucosa oral)',
      'Escabiose simétrica bilateral profunda',
      'Dermatite herpética infantil'
    ],
    achados_exames: [
      'Discreta ou moderada eosinofilia relatada no leucograma periférico',
      'Exame coprológico fecal normal (por vezes suspeita-se de parasitoses induzindo prurigo)'
    ],
    criterios_diagnosticos: [
      'Clínico dermatológico baseado na presença de múltiplas seropápulas recorrentes pruriginosas agrupadas em extremidades corporais expostas',
      'História sugestiva de exposição a insetos e resolução espontânea de lesões antigas deixando máculas hiperocrômicas residuais'
    ]
  },
  {
    id: 'L50.0',
    nome: 'Urticária Aguda na Infância',
    sintomas: [
      'Placas eritemato-edematosas de tamanhos variáveis (urticárias/urtigas) que migram de local na pele',
      'Prurido corporal insuportável de caráter urgente',
      'Sumiço completo das placas individuais em menos de 24 horas sem deixar qualquer marca residual',
      'Sensação de queimação local nas áreas acometidas secundariamente'
    ],
    fatores_risco: [
      'Infecção viral recente das vias aéreas superiores ou gastroenterite (causa em > 80% das crianças)',
      'Uso de medicamentos novos recentes (antibióticos ou anti-inflamatórios)',
      'Ingestão recente de alimentos altamente alergênicos (ovo, peixes, corantes, frutos do mar)'
    ],
    red_flags: [
      'Inchaço proeminente de lábios, pálpebras, língua ou genitália (Angioedema)',
      'Voz rouca, estridor inspiratório ou tosse metálica (risco iminente de Edema de Glote)',
      'Dispneia importante com sibilância (Broncoespasmo na Anafilaxia)',
      'Hipotensão arterial, tontura severa ou desmaio súbito'
    ],
    diferenciais: [
      'Eritema multiforme agudo (lesões em alvo fixas que duram dias)',
      'Púrpura de Henoch-Schönlein inicial',
      'Vasculite urticariforme de curso prolongado'
    ],
    achados_exames: [
      'Hemograma de perfil normal, com eventual elevação de leucócitos se infecção associada',
      'Exames específicos de IgE alérgica não recomendáveis na fase aguda incômoda'
    ],
    criterios_diagnosticos: [
      'Aparecimento repentino de urtigas pruriginosas e evanescentes de migração constante',
      'Instalação de curso autolimitado inferior a 6 semanas de duração nas formas agudas'
    ]
  },
  {
    id: 'B37.0',
    nome: 'Estomatite por Candidíase Oral ("Sapinho")',
    sintomas: [
      'Placas brancas algodonosas aderentes na língua, mucosa jugal (bochecha interna) e palato',
      'Dor ou desconforto moderado ao sugar o peito ou mamadeira',
      'Irritabilidade moderada e recusa de alimentação em lactente jovem',
      'Completa incapacidade de remover as placas brancas com gaze sem sangramento da mucosa por baixo'
    ],
    fatores_risco: [
      'Lactentes jovens abaixo de 6 meses de vida (recém-nascidos imaturos)',
      'Uso recente ou prolongado de antibióticos de amplo espectro na criança ou mãe',
      'Inalação rotineira de corticoide (como fluticasona) para asma sem enxágue oral',
      'Inadequada higienização de chupetas e bicos de mamadeiras'
    ],
    red_flags: [
      'Extensão progressiva do sapinho para a esôfago provocando disfagia e dor intensa à deglutição (Candidíase esofágica)',
      'Perda de peso substancial progressiva por recusa de mamadas',
      'Surgimento em lactente maior de 1 ano sem fator de risco clássico (sugere Imunodeficiência/HIV)'
    ],
    diferenciais: [
      'Resíduos normais de leite coalhado retidos na língua (removidos facilmente com gaze umedecida)',
      'Gengivoestomatite herpética primária ulcerada',
      'Estomatite aftosa múltipla'
    ],
    achados_exames: [
      'Exame microscópico direto do raspado da mucosa revelando pseudo-hifas e leveduras em brotamento de Candida albicans'
    ],
    criterios_diagnosticos: [
      'Presença clássica de placas brancas cremosas friáveis e aderentes em mucosa oral do lactente',
      'Resposta excelente após aplicação tópica de nistatina ou antifúngico de escolha'
    ]
  },
  {
    id: 'A06.0',
    nome: 'Amebíase Intestinal Pediátrica',
    sintomas: [
      'Diarreia crônica ou aguda contendo muco e abundantes estrias de sangue vermelho vivo (disenteria amebiana)',
      'Dor abdominal em cólica intensa, flatulência e tenesmo (dor ao tentar evacuar)',
      'Febre moderada e inapetência dolorosa',
      'Perda de peso ponderal rápida e letargia física'
    ],
    fatores_risco: [
      'Consumo de águas superficiais ou de poços sem fervura/cloração em áreas endêmicas',
      'Contato próximo ou ingestão de alimentos higienizados incorretamente',
      'Saneamento básico urbano precário ou deposição inadequada de dejetos'
    ],
    red_flags: [
      'Dor súbita abdominal generalizada com defesa e descompressão dolorosa (Perfuração / Megacólon Tóxico)',
      'Presença de febre alta, calafrios e dor em quadrante superior direito (Abscesso Hepático Amebiano)',
      'Desidratação com choque grave'
    ],
    diferenciais: [
      'Gastroenterite bacteriana invasiva (Shigella, Salmonella, Campylobacter)',
      'Retocolite Ulcerativa ou Doença de Crohn pediátrica',
      'Alergia à Proteína do Leite de Vaca (forma proctocolite)'
    ],
    achados_exames: [
      'Exame parasitológico de fezes (EPF) demonstrando trofozoítas viáveis de Entamoeba histolytica fagocitando hemácias (diagnóstico de infecção ativa invasiva)',
      'Coproantígeno de Entamoeba histolytica por ELISA positivo',
      'Hemograma mostrando leucocitose neutrofílica'
    ],
    criterios_diagnosticos: [
      'Demonstração microscópica de trofozoítas hematófagos ou cistos em fezes disentéricas frescas',
      'Sorologia sérica ou ensaio imunológico intestinal reagente para E. histolytica'
    ]
  },
  {
    id: 'B71.0',
    nome: 'Himenolepíase Pediátrica',
    sintomas: [
      'Dor abdominal em queimação ou cólica periumbilical vaga',
      'Diarreia de curso crônico com episódios flutuantes de fezes pastosas',
      'Prurido anal ou nasal reacional intenso na infância',
      'Irritabilidade comportamental, sono de má qualidade e astenia'
    ],
    fatores_risco: [
      'Higiene precária de mãos em crianças com onicofagia (autoinfecção por ovos)',
      'Contaminação de alimentos por insetos de grãos (carunchos) contendo larvas cisticercoides',
      'Moradia em condições precárias de superlotação infantil'
    ],
    red_flags: [
      'Infecção maciça com obstrução intestinal suboclusiva em menor de 3 anos',
      'Desnutrição instalada refratária com perda de força e massa muscular',
      'Manifestações convulsivas reflexas raras associadas à carga parasitária'
    ],
    diferenciais: [
      'Oxiuríase com prurido anal exclusivo',
      'Giardíase crônica de má absorção',
      'Síndrome do intestino irritável'
    ],
    achados_exames: [
      'Encontro de ovos típicos pequenos de casca dupla de Hymenolepis nana no exame parasitológico de fezes'
    ],
    criterios_diagnosticos: [
      'Documentação laboratorial microscópica de ovos de H. nana em exames de EPF de rotina',
      'Histórico clínico de dor periumbilical recorrente e prurido anal reacioanal'
    ]
  },
  {
    id: 'B68.9',
    nome: 'Teníase Pediátrica',
    sintomas: [
      'Dor abdominal vaga com náuseas ocasionais e distensão abdominal leve',
      'Eliminação espontânea anal de fragmentos planos esbranquiçados de vermes (proglotes) nas fezes ou roupas',
      'Alterações marcantes do apetite (bulimia alternada com anorexia)',
      'Perda ponderal modesta e cefaleia esporádica leve'
    ],
    fatores_risco: [
      'Histórico de consumo de carne bovina ou suína mal cozida ou crua pela criança',
      'Saneamento básico ausente permitindo o contágio dos rebanhos por fezes humanas',
      'Falta de inspeção sanitária de carne no local de abatimento'
    ],
    red_flags: [
      'Aparecimento de convulsões, cefaleia intensa ou crises focais neurológicas (Cisticercose por ingestão de ovos de Taenia solium)',
      'Dificuldade de locomoção ou distúrbios cognitivos progressivos em escolares',
      'Instalação de abdome agudo obstrutivo secundário à carga de vermes'
    ],
    diferenciais: [
      'Parasitose por Ascaris lumbricoides',
      'Disfunção motora de intestino',
      'Apófise linfática ou pancreatite discreta'
    ],
    achados_exames: [
      'Visualização direta microscópica de ovos de Taenia spp. em exame parasitológico de fezes',
      'Pesquisa e identificação anatômica de proglotes eliminadas (método tamisagem) para diferenciação de espécie (solium vs saginata)',
      'Tomografia cerebral mostrando focos calcificados se houver manifestações de neurocisticercose'
    ],
    criterios_diagnosticos: [
      'Confirmação laboratorial microscópica por encontro de ovos ou proglotes características de Taenia nas fezes coletadas',
      'História sugestiva de alimentação com carnes rurais não fiscalizadas'
    ]
  },
  {
    id: 'L56.2',
    nome: 'Fitofotodermatite ("Queimadura de Limão")',
    sintomas: [
      'Surgimento de máculas hipercrômicas (manchas escuras amarronzadas) de formato irregular na pele',
      'Erupções vesiculosas ou bolhosas dolorosas na fase aguda inflamatória',
      'Localização restrita às áreas expostas que tiveram contato com plantas ou sucos (frequentemente mãos, boca ou colo)',
      'Desenho bizarro das lesões (em respingos, estrias pontilhadas ou marcas de dedos)'
    ],
    fatores_risco: [
      'Atividades ao ar livre sob sol forte (praia, piscina ou piqueniques)',
      'Manipulação de frutas cítricas (limão, laranja, tangerina) ou plantas fototóxicas (figo, arruda)',
      'Ausência de lavagem mecânica imediata da pele com sabão após contato'
    ],
    red_flags: [
      'Formação de bolhas gigantes tensas cobrindo grande parte do membro (queimadura química severa de 2º grau)',
      'Infecção bacteriana secundária das bolhas rompidas por coçadura com febre e dor',
      'Necrose epidérmica residual desfigurante crônica'
    ],
    diferenciais: [
      'Impedigo bolhoso agudo',
      'Dermatite de contato alérgica severa',
      'Abuso infantil / Maus-tratos (pelo desenho linear das marcas de dedos)'
    ],
    achados_exames: [
      'Diagnóstico puramente clínico baseado no padrão das manchas escuras e história de manuseio solar frutífero'
    ],
    criterios_diagnosticos: [
      'Visualização dermatológica de máculas hipercrômicas bizarras delimitadas em áreas de contato pós-exposição solar e cítrica',
      'Completa ausência de outros fatores que orientem distúrbios sistêmicos crônicos pigmentares'
    ]
  },
  {
    id: 'L55.9',
    nome: 'Queimadura Solar Infantil',
    sintomas: [
      'Eritema brilhante doloroso de toda a pele exposta à radiação solar',
      'Sensação de calor radiante e queimação insuportável ao toque das roupas',
      'Edema moderado do tecido celular subcutâneo facial ou dos membros',
      'Febre de baixa intensidade, calafrios e cefaleia discreta concomitantes'
    ],
    fatores_risco: [
      'Exposição ao sol sem protetor solar adequado em horários críticos (10h às 16h)',
      'Pele muito clara (fototipos baixos I e II de Fitzpatrick)',
      'Atividades prolongadas em áreas com alta reflexão de radiação (areia ou água)'
    ],
    red_flags: [
      'Surgimento de múltiplas bolhas flácidas contendo líquido transparente (Queimadura de 2º Grau)',
      'Febre alta persistente, vômitos abundantes, desidratação severa e delírios (Insolação)',
      'Prostração extrema inexplicada e oligúria urinária'
    ],
    diferenciais: [
      'Fotodermatoses sistêmicas por fármacos',
      'Eritema multiforme generalizado precoce',
      'Lupus agudo de pele por fotossensibilidade'
    ],
    achados_exames: [
      'Investigação diagnóstica laboratorial contraindicada nos casos comuns leves, reservando para exames eletrolíticos se choque por calor'
    ],
    criterios_diagnosticos: [
      'Diagnóstico clínico consagrado baseado na associação temporal de exposição solar prolongada desprotegida e eritema doloroso delimitado à área exposta',
      'Resolução espontânea com descamação subsequente e hiperpigmentação de trânsito'
    ]
  },
  {
    id: 'T30.0',
    nome: 'Queimadura Térmica na Criança',
    sintomas: [
      'Dor extrema excruciante localizada no local de contato do calor',
      'Eritema brilhante localizado sem bolhas (Queimadura de 1º Grau)',
      'Presença de bolhas íntegras ou rotas sobre pele avermelhada e úmida (Queimadura de 2º Grau)',
      'Pele de aspecto esbranquiçado, endurecido, indolor ao toque (Queimadura de 3º Grau - destruição nervosa)'
    ],
    fatores_risco: [
      'Acidentes domésticos em cozinha (escaldadura por água quente, sopas, cafés)',
      'Manuseio ou proximidade de ferro de passar quente, fogueiras ou fogos de artifício',
      'Falta de supervisão contínua por adultos em ambiente residencial'
    ],
    red_flags: [
      'Queimadura envolvendo face, pescoço, mãos, pés, períneo ou articulações importantes (Áreas Críticas de Internação)',
      'Queimadura cobrindo mais de 10% da superfície corporal total na criança (risco de choque volêmico por translocação)',
      'Tosse com fuligem, estridor inspiratório ou rouquidão subsequente (Lesão de Vias Aéreas por Inalação)',
      'Pele circumferential com perda de perfusão distal (Síndrome compartimentada)'
    ],
    diferenciais: [
      'Queimadura premeditada / Maus-tratos (padrões de luva, bota ou marcas de cigarro)',
      'Necrólise Epidérmica Tóxica farmacogênica',
      'Síndrome da pele escaldada estafilocócica'
    ],
    achados_exames: [
      'Investigações básicas: Hemograma completo, eletrólitos (Sódio e Potássio escassos), função renal periférica (Ureia e Creatinina elevated se choque renal)',
      'Presença de mioglobinúria se queimaduras musculares profundas extensas'
    ],
    criterios_diagnosticos: [
      'Histórico clínico de contato térmico acidental imediato unida à lesão de aspecto compatível (eritema, bolhas ou necrose local)',
      'Estimativa de extensão corporal via Regra de Lund-Browder para pediatria'
    ]
  },
  {
    id: 'T65.9',
    nome: 'Intoxicação Exógena por Produto de Limpeza',
    sintomas: [
      'Surgimento repentino de sialorreia abundante (salivação extrema) e vômitos espontâneos',
      'Sufocação, tosse súbita com sibilância expiratória pós-exposição',
      'Dor intensa em boca, garganta ou abdome superior acompanhada de recusa alimentar',
      'Sonolência súbita inespecífica ou hálito com odor químico esquisito'
    ],
    fatores_risco: [
      'Hábito de armazenar produtos de limpeza (água sanitária, desinfetantes, soda cáustica) em garrafas de refrigerante ao alcance do chão',
      'Crianças na fase oral exploratória entre 1 e 4 anos de idade',
      'Ausência de travas de segurança em armários residenciais baixos'
    ],
    red_flags: [
      'Incapacidade total de deglutir saliva com estridor inspiratório (Lesão Cáustica de Laringe/Esôfago grave)',
      'Rebaixamento profundo do nível de consciência, agitação psicomotora intensa ou convulsões agudas',
      'Perda de expansão torácica com saturação de oxigênio depletada abaixo de 90%'
    ],
    diferenciais: [
      'Gastroenterite aguda infecciosa',
      'Aspiração aguda primária de corpo estranho respiratório',
      'Cetoacidose diabética inaugural'
    ],
    achados_exames: [
      'Investigação inicial: Endoscopia Digestiva Alta de urgência (indicada se ingestão de cáusticos forte, como soda cáustica, realizada entre 12-24 horas pós-evento)',
      'Hemograma, gasometria arterial avaliando estado ácido-básico, função renal'
    ],
    criterios_diagnosticos: [
      'Histórica confirmada de ingestão acidental ou propositada de insumos químicos associada a início súbito de sintomas orais, gástricos ou neurológicos',
      'Ausência de outros estigmas infeciosos febris primários'
    ]
  },
  {
    id: 'T16',
    nome: 'Corpo Estranho no Ouvido',
    sintomas: [
      'Dor de ouvido unilateral incômoda de surgimento rápido',
      'Sensação de movimentação, zumbido ou ruído dentro do canal do ouvido (especialmente se inseto retido)',
      'Diminuição abrupta da audição (hipoacusia) na orelha afetada',
      'Otorreia purulenta, sanguinolenta de odor fétido tardia se não detectado rápido'
    ],
    fatores_risco: [
      'Atividades recreativas brincando com pequenos objetos roliços (grãos, miçangas, peças de brinquedo, pilhas de botão)',
      'Idade de lactente exploratório entre os 2 e 5 anos'
    ],
    red_flags: [
      'Corpo estranho do tipo pilha tipo botão (risco gravíssimo de necrose química por liquefação e mediastinite em horas)',
      'Otorragia volumosa significando perfuração da membrana timpânica por trauma',
      'Edema retroauricular exacerbado ou paralisia de musculatura facial periférica'
    ],
    diferenciais: [
      'Otite Externa Aguda com detritos',
      'Otite Média Aguda clássica dolorosa',
      'Miringite bolhosa'
    ],
    achados_exames: [
      'Otoscopia de emergência revelando de forma inequívoca o objeto estranho (grão de feijão, inseto, plástico, pilha) impactado no canal auditivo externo'
    ],
    criterios_diagnosticos: [
      'Visualização otoscópica direta do corpo estranho bloqueando parcial ou totalmente o conduto auditivo',
      'Indicação de remoção mecânica imediata sob equipe treinada em urgência'
    ]
  },
  {
    id: 'T17.1',
    nome: 'Corpo Estranho Nasal',
    sintomas: [
      'Rinorreia purulenta, unilateral persistente de odor fétido crônica',
      'Obstrução nasal constante de apenas um lado do nariz',
      'Epistaxe (sangramento de pequena monta unilateral)',
      'Espirros de repetição e prurido nasal restrito'
    ],
    fatores_risco: [
      'Crianças de idade pré-escolar na faixa de 2 a 5 anos',
      'Acesso facilitado a sementes, grãos alimentares, miçangas ou pequenos brinquedos desmontáveis'
    ],
    red_flags: [
      'Pilha de bocal (bateria tipo botão) retida no septo nasal (causa perfuração septal permanente em poucas horas)',
      'Aspiração súbita de objeto com desconforto respiratório (estridor ou sibilância unilateral)',
      'Sangramento nasal profuso e incontrolável'
    ],
    diferenciais: [
      'Sinusite bacteriana crônica unilateral',
      'Rinite alérgica assimétrica exasperada',
      'Desvio de septo agudo congênito'
    ],
    achados_exames: [
      'Renoscopia anterior (visualização direta assistida) revelando o corpo estranho impactado nas fossas nasais ou cornetos anteriores'
    ],
    criterios_diagnosticos: [
      'Detecção visual inequívoca de material não-anatômico retido em narina unilateral de criança com secreção de cheiro ruim crônico',
      'Rápido clívio dos sintomas obstrutivos e fétidos após extração mecânica assistida do corpo'
    ]
  },
  {
    id: 'E86',
    nome: 'Desidratação Isotônica Pediátrica',
    sintomas: [
      'Sede excessiva manifestada por avidez na aceitação de líquidos por copo',
      'Diminuição expressiva ou completa de diurese (fraldas secas por horas)',
      'Olhos discretamente fundos com choro apresentando escassas lágrimas',
      'Boca de aspecto seco com saliva espessa aderente'
    ],
    fatores_risco: [
      'Quadro de gastroenterite hiperaguda (diarreias ou vômitos volumosos recorrentes)',
      'Elevada temperatura ambiental em dias muito quentes sem hidratação contínua',
      'Fezes volumosas ou febre alta constante acelerando perdas insensíveis'
    ],
    red_flags: [
      'Tempo de enchimento capilar (TEC) prolongado superior a 3 segundos com pele fria e marmorizada (Choque Hipovolêmico)',
      'Letargia profunda com incapacidade física de despertar ou coma',
      'Turgor cutâneo nulo (sinal do prego persistente na pele do abdome)',
      'Frequência cardíaca de repouso anormalmente elevada (taquicardia limiar)'
    ],
    diferenciais: [
      'Desidratação de perfil Hipertônico (cursa com muita sede e irritabilidade severa)',
      'Desidratação Hipotônica (cursa com extrema letargia precoce)',
      'Insuficiência renal intrínseca de cursor oligúrico'
    ],
    achados_exames: [
      'Eletrólitos: Sódio sérico normal (valores entre 135 e 145 mEq/L indicando desidratação isotônica)',
      'Elevação modesta de ureia e creatinina séricas por depleção pré-renal',
      'Gasometria demonstrando discreta acidose metabólica bicarbonatada reacional'
    ],
    criterios_diagnosticos: [
      'Histórico de perdas fluidas abundantes associada à tríade de desidratação moderada a grave ao exame físico detalhado',
      'Redução ponderal mensurada se disponível de até 5-10% do peso corpóreo anterior em lactentes'
    ]
  },
  {
    id: 'E10.1',
    nome: 'Cetoacidose Diabética na Infância',
    sintomas: [
      'Desidratação clinicamente evidente sem perdas diarréicas prévias explicáveis',
      'Respiração rápida profunda e trabalhada de ritmo anormal (padrão de Kussmaul)',
      'Hálito com odor adocicado característico (odor cetônico de maçã podre)',
      'Poliúria importante (urinar em grandes volumes mesmo já desidratado) e perda ponderal rápida'
    ],
    fatores_risco: [
      'Estreia / Inauguração de quadro de Diabetes Mellitus Tipo 1 (DM1) na infância',
      'Suspensão ou omissão na aplicação diária de doses recomendadas de insulina de base',
      'Infecção sistêmica aguda (pneumonias, rinites severas) descompensando doente crônico'
    ],
    red_flags: [
      'Rebaixamento agudo do nível de consciência, letargia profunda ou cefaleia grave abrupta (Edema Cerebral - complicação letal principal)',
      'Vômitos múltiplos incoercíveis com dor abdominal difusa simulando abdome agudo cirúrgico',
      'Gasometria arterial revelando pH < 7,10 com bicarbonato extremamente consumido (< 10 mEq/L)',
      'Hipotensão postural com choque metabólico'
    ],
    diferenciais: [
      'Abdome agudo cirúrgico inflamatório (apendicites graves)',
      'Intoxicação exógena cáustica ou com salicilatos',
      'Gastroenterite com acidose clássica de diarreia'
    ],
    achados_exames: [
      'Glicemia sérica elevada (geralmente > 250-300 mg/dL)',
      'Acidose metabólica com hiato anômalo elevado (anion gap alargado)',
      'Cetonúria de nível acentuado no exame urinário de EAS ou cetonemia positiva (> 3,0 mmol/L)'
    ],
    criterios_diagnosticos: [
      'Tríade clássica laboratorial definida: hiperglicemia (> 200 mg/dL), acidose metabólica venosa (pH < 7,3 ou HCO3 < 15 mEq/L) e cetonemia/cetonúria persistente',
      'Contexto clínico sugestivo de emagrecimento prévio polidípsico'
    ]
  },
  {
    id: 'G40.3',
    nome: 'Crise de Ausência Infantil',
    sintomas: [
      'Episódios rápidos (5 a 15 segundos) de "desconexão" ou "olhar fixo" intermitentes',
      'Criança interrompe bruscamente a atividade em curso retomando logo em seguida',
      'Presença ocasional de discretos tremores repetitivos de pálpebras (mioclonias palpebrais)',
      'Ocorrência de dezenas a centenas de episódios semelhantes ao longo de um mesmo dia escolar'
    ],
    fatores_risco: [
      'Idade de estreia compreendida preferencialmente dos 4 aos 8 anos',
      'Predisposição genética de história familiar de crises generalizadas',
      'Suscetibilidade cerebral reativa facilitada pela respiração acelerada voluntária (hiperventilação)'
    ],
    red_flags: [
      'Déficit cognitivo profundo progressivo ou baixo rendimento escolar súbito',
      'Associação com episódios convulsivos tônico-clônicos generalizados na evolução',
      'Persistência das crises excedendo 30 segundos com queda da própria altura'
    ],
    diferenciais: [
      'Déficit de atenção com hiperatividade - TDAH (criança no TDAH atende ao chamado físico)',
      'Crises parciais complexas de origem temporal de cursor mais longo pós-ictal',
      'Devaneio ou distração mental normal infantil'
    ],
    achados_exames: [
      'Eletroencefalograma (EEG) de padrão patognomônico revelando complexos ponta-onda lenta rítmicos generalizados de exata frequência de 3 Hz, facilmente deflagrado por hiperventilação de 3 minutos',
      'Ressonância magnética cerebral de perfil perfeitamente normal estrutural'
    ],
    criterios_diagnosticos: [
      'Histórico clínico típico de breves interrupções da atividade consciente diária sem cansaço pós-ictal associado',
      'EEG característico documentando as descargas síncronas de 3 Hz generalizadas'
    ]
  },
  {
    id: 'G44.2',
    nome: 'Cefaleia Tensional Pediátrica',
    sintomas: [
      'Dor de cabeça de caráter opressivo ("em aperto ou faixa") de distribuição tipicamente bilateral',
      'Intensidade de dor leve a moderada que não impede as atividades físicas escolares habituais',
      'Ausência habitual de náuseas graves, vômitos ou fotofobia ocular proeminente',
      'Dor com duração de horas com piora ao fim do dia letivo'
    ],
    fatores_risco: [
      'Privação crônica de sono de qualidade ou horas excessivas em telas de celulares/computadores',
      'Problemas ou estresse emocional no ambiente familiar ou escolar (bullying)',
      'Má alimentação ou jejum prolongado nas atividades diárias'
    ],
    red_flags: [
      'Dor de cabeça que acorda a criança no meio da noite ou que piora agudamente ao tossir/espirrar (Sinais de Hipertensão Intracraniana)',
      'Presença concomitante de febre inexplicada com rigidez meníngea nucal',
      'Déficit focal neurológico agudo ou alteração persistente da visão (papiledema)',
      'Cefaleia de início abrupto, explosivo em menor de 5 anos'
    ],
    diferenciais: [
      'Enxaqueca / Migrânea pediátrica clássica',
      'Cefaleia secundária a erros de refração ocular (necessidade de óculos)',
      'Processo expansivo encefálico tumoral focal'
    ],
    achados_exames: [
      'Exames laboratoriais e tomográficos dispensáveis nas formas tensionais típicas sem comemorativos de alarme neurológico'
    ],
    criterios_diagnosticos: [
      'Atendimento aos critérios de cefaleia episódica tensional (dor bilateral, em aperto, não pulsátil que poupa vômitos e não impede de ambular)',
      'Resolução definitiva com uso criterioso de analgésicos comuns leves e controle de gatilhos psicológicos'
    ]
  },
  {
    id: 'I88.0',
    nome: 'Adenite Mesentérica Aguda',
    sintomas: [
      'Dor abdominal de intensidade moderada localizada preferencialmente em quadrante inferior direito',
      'Presença concomitante de história recente de infecção de vias aéreas (amigdalite ou resfriado)',
      'Febre de baixa intensidade e episódios esporádicos de vômitos ou náuseas',
      'Diarréia discreta ou evacuações pastosas associadas'
    ],
    fatores_risco: [
      'Crianças em idade escolar pré-adolescente abaixo dos 15 anos de idade',
      'Infecção viral ativa respiratória recente por adenovírus ou enterovírus'
    ],
    red_flags: [
      'Dor que se exacerba rapidamente com rigidez abdominal e sinal de Blumberg francamente positivo (Apendicite Aguda com Ruptura)',
      'Febre muito alta persistente com prostração severa e choque infeccioso',
      'Ascite ou suboclusão de alças com vômitos persistentes de fezes'
    ],
    diferenciais: [
      'Apendicite Aguda cirúrgica (diagnóstico diferencial mais crítico e difícil na emergência pediátrica)',
      'Divertículo de Meckel infectado ou inflamado',
      'Linfoma MALT abdominal ou outras neoplasias linfoides'
    ],
    achados_exames: [
      'Ultrassonografia abdominal de emergência revelando múltiplos linfonodos mesenteriais aumentados de volume (> 8-10 mm de diâmetro curto) em quadrante inferior direito, com apêndice cecal de aspecto rigorosamente normal de paredes finas e móveis',
      'Leucocitose discreta sem desvio acentuado do leucograma'
    ],
    criterios_diagnosticos: [
      'Quadros abdominais dolorosos agudos em fossa ilíaca direita associados a linfonodos mesentéricos comprovadamente aumentados e apêndice livre de qualquer inflamação à imagem',
      'Rápida remissão espontânea autolimitada das cólicas sem procedimentos operacionais'
    ]
  },
  {
    id: 'H05.0',
    nome: 'Celulite Periorbitária (Pré-Septal)',
    sintomas: [
      'Edema acentuado e eritema (vermelhidão escarlate) confinados estritamente às pálpebras',
      'Calor local e hipersensibilidade à palpação da região palpebral afetada',
      'Completa preservação da acuidade visual e motilidade do globo ocular',
      'Ausência habitual de dor à movimentação mecânica dos olhos'
    ],
    fatores_risco: [
      'Histórico próximo de lesão de pele facial (arranhadura, picada de inseto local infectada)',
      'Presença de hordéolo (terçol) ou calázio infectados na borda ciliar',
      'Infecção sinusal leve ou rinite recente na infância'
    ],
    red_flags: [
      'Proptose ocular (globo empurrado para frente) ou dor intolerável ao tentar mover o olho (Celulite Orbitária)',
      'Diminuição marcante da acuidade visual bilateral ou diplopia recente',
      'Edema conjuntival gelatinoso intenso (quemose proeminente)',
      'Surgimento de convulsões agudas ou letargia severa indicando trombose de seio cavernoso'
    ],
    diferenciais: [
      'Celulite Orbitária pós-septal (infecção profunda grave)',
      'Edema bipalpebral reacional alérgico (indolor, com prurido e ausência de calor)',
      'Picada de bicho de fita ou inseto localizada com eritema reativo'
    ],
    achados_exames: [
      'Hemograma completo evidenciando leucocitose de perfil neutrofílico moderado',
      'Tomografia computadorizada de órbitas e seios da face demonstrando edema restrito ao plano anterior ao septo orbitário (ausência de infiltrações orbitárias profundas)'
    ],
    criterios_diagnosticos: [
      'Quadro de eritema e edema palpebral agudo unilateral sem qualquer alteração oftalmológica profunda associada (visão normal, mobilidade sem dor e ausência de proptose)',
      'Excelente resposta subsequente com antibióticos orais apropriados em curso ambulatorial'
    ]
  },
  {
    id: 'D69.0',
    nome: 'Púrpura de Henoch-Schönlein (Púrpura Alérgica)',
    sintomas: [
      'Púrpura palpável simétrica de distribuição eletiva em membros inferiores e nádegas, na ausência de plaquetopenia',
      'Dor articular importante (artralgia ou artrite transitória) acometendo principalmente joelhos e tornozelos',
      'Cólicas abdominais difusas associadas a episódios esporádicos de náuseas',
      'Surgimento de edema doloroso de tecidos moles subcutâneos em couro cabeludo e dorso de mãos/pés'
    ],
    fatores_risco: [
      'Idade pediátrica entre os 3 e os 10 anos (principalmente do sexo masculino)',
      'Infecção precedente de vias aéreas superiores viral em 1 a 3 semanas antes do surgimento',
      'Exposição ao clima frio sazonal do outono/inverno'
    ],
    red_flags: [
      'Surgimento de hematúria macroscópica ("urina escura vermelha") ou hipertensão arterial recente (Nefrite por Henoch-Schönlein)',
      'Presença de dor abdominal excruciante refratária com sangue nas fezes (Vólvulo/Intussuscepção secundária)',
      'Edema escrotal agudo doloroso volumoso simulando torção de testículo'
    ],
    diferenciais: [
      'Meningococcemia com choque purpúrico (doente em Henoch-Schönlein mantém bom estado geral)',
      'Púrpura Trombocitopênica Imunológica (PTI - cursa com plaquetopenia extrema)',
      'Lupus Eritematoso Sistêmico agudo'
    ],
    achados_exames: [
      'Hemograma demonstrando contagem de plaquetas estritamente normal ou elevada (reacional)',
      'Sumário de urina (EAS) evidenciando hematúria e proteinúria flutuantes em casos de acometimento glomerular',
      'Marcadores inflamatórios discretamente elevados e função renal inicialmente preservada'
    ],
    criterios_diagnosticos: [
      'Diagnóstico formulado sob os critérios de consenso internacional (EULAR/PRINTO): púrpura palpável de extremidades inferiores mais pelo menos um critério adicional (dor abdominal recorrente, artrite/artralgia aguda, histopatologia com depósito de IgA neonatal ou comprometimento renal ativo)'
    ]
  }
];
