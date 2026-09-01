import { MedicalDisease } from '../types';

export const PULMONOLOGY_DISEASES: Omit<MedicalDisease, 'achados_exames' | 'criterios_diagnosticos'>[] = [
  {
    id: 'J45.9',
    nome: 'Asma Brônquica',
    sintomas: ['Dispneia episódica com sibilância expiratória', 'Tosse seca crônica (piora à noite e início da manhã)', 'Sensação de opressão ou aperto torácico', 'Piora sintomática com esforço físico, frio ou alérgenos', 'Limitação variável do fluxo aéreo expiratório'],
    fatores_risco: ['Atopia pessoal ou familiar (rinite, dermatite atópica)', 'Exposição a alérgenos domiciliares (ácaros, fungos, pelos)', 'Tabagismo ativo ou exposição passiva à fumaça', 'Exposição ocupacional a irritantes químicos', 'Obesidade e refluxo gastroesofágico (DRGE)'],
    red_flags: ['Tórax silencioso à ausculta (broncoespasmo extremo)', 'Falar apenas em palavras isoladas por dispneia', 'Saturação de O2 < 90% em ar ambiente', 'Confusão mental, exaustão ou sonolência', 'Pico de fluxo expiratório (PFE) < 50% do valor teórico'],
    diferenciais: ['DPOC', 'Asma cardíaca (Insuficiência Cardíaca)', 'Disfunção de pregas vocais', 'Tromboembolismo pulmonar', 'Bronquiectasia']
  },
  {
    id: 'J43.9',
    nome: 'DPOC - Enfisema Pulmonar',
    sintomas: ['Dispneia progressiva aos esforços (padrão insidioso)', 'Tórax em tonel (aumento do diâmetro anteroposterior)', 'Expiração prolongada com lábios semicerrados', 'Perda de peso involuntária e caquexia nos estágios tardios', 'Ausculta com murmúrio vesicular globalmente diminuído'],
    fatores_risco: ['Tabagismo crônico de carga tabágica elevada (>20 anos-maço)', 'Exposição crônica a fumaça de queima de biomassa (fogão a lenha)', 'Deficiência hereditária de Alfa-1-antitripsina', 'Exposição ocupacional a poeiras minerais ou orgânicas', 'Idade avançada (geralmente > 40 anos)'],
    red_flags: ['Insuficiência respiratória aguda hipoxêmica ou hipercápnica', 'Uso acentuado de musculatura respiratória acessória', 'Taquipneia extrema (>30 irp) com instabilidade hemodinâmica', 'Cianose de extremidades ou rebaixamento sensorial', 'Cor pulmonale descompensado (edema de MMII + turgência jugular)'],
    diferenciais: ['Asma brônquica crônica', 'Insuficiência cardíaca congestiva', 'Tuberculose sequelar', 'Bronquiectasia difusa', 'Fibrose pulmonar']
  },
  {
    id: 'J42',
    nome: 'DPOC - Bronquite Crônica',
    sintomas: ['Tosse produtiva persistente por pelo menos 3 meses em 2 anos sucessivos', 'Expectoração mucoide ou mucopurulenta crônica', 'Sibilância recorrente associada a episódios infecciosos', 'Dispneia progressiva relacionada ao esforço', 'Fáceis congesta e cianose central ("blue bloater")'],
    fatores_risco: ['Tabagismo ativo ou passivo de longa data', 'Exposição prolongada a poluição atmosférica ou poeira industrial', 'Exposição persistente a fumaça de fogão a lenha', 'Infecções respiratórias recorrentes na infância', 'Hiperresponsividade brônquica subjacente'],
    red_flags: ['Escarro francamente hemóptico recorrente', 'Piora súbita da dispneia com expectoração purulenta abundante', 'Hipercapnia grave com acidose respiratória (pH < 7.30)', 'Arritmias cardíacas associadas a hipoxia alveolar', 'Sonolência diurna excessiva por retenção de CO2'],
    diferenciais: ['Bronquiectasia', 'Tuberculose pulmonar', 'Câncer de pulmão', 'Sinusite crônica com gotejamento pós-nasal', 'Asma']
  },
  {
    id: 'J18.9',
    nome: 'Pneumonia Adquirida na Comunidade (PAC)',
    sintomas: ['Febre alta de início súbito precedida por calafrios', 'Tosse produtiva com escarro mucopurulento ou "enferrujado"', 'Dor torácica tipo pleurítica (piora na inspiração profunda)', 'Dispneia e taquipneia de grau variável', 'Ausculta com estertores crepitantes localizados e broncofonia'],
    fatores_risco: ['Idades extremas (crianças < 2 anos e idosos > 65 anos)', 'Doenças crônicas subjacentes (DPOC, ICC, Diabetes, DRC)', 'Imunossupressão (uso de corticoides, quimioterapia, HIV)', 'Tabagismo ativo e etilismo crônico', 'Declínio cognitivo ou distúrbios da deglutição'],
    red_flags: ['Instabilidade hemodinâmica (PAS < 90 mmHg ou PAD < 60 mmHg)', 'Taquipneia acentuada (>30 irp) ou Saturação de O2 < 90%', 'Confusão mental aguda (Critério CURB-65)', 'Ureia plasmática > 50 mg/dL', 'Acometimento de mais de dois lobos radiologicamente'],
    diferenciais: ['Tromboembolismo pulmonar com infarto', 'Edema agudo de pulmão', 'Exacerbação aguda de DPOC ou Asma', 'Atelectasia lobar segmentar', 'Pneumonite por hipersensibilidade']
  },
  {
    id: 'J18.2',
    nome: 'Pneumonia Hospitalar / Nosocomial',
    sintomas: ['Infiltrado pulmonar novo ou progressivo após 48h de admissão hospitalar', 'Febre ressurgente ou hipotermia de difícil controle', 'Expectoração traqueal purulenta volumosa', 'Piora progressiva das trocas gasosas (hipoxemia)', 'Leucocitose ou leucopenia acentuada'],
    fatores_risco: ['Uso de ventilação mecânica invasiva (pneumonia associada à ventilação - PAV)', 'Permanência prolongada em unidade de terapia intensiva (UTI)', 'Uso prévio recente de antimicrobianos de amplo espectro', 'Aspiração crônica de secreções gástricas por sonda enteral', 'Imunossupressão ou desnutrição grave'],
    red_flags: ['Choque séptico refratário a ressuscitação volêmica', 'Necessidade de aumento rápido dos parâmetros de FiO2 e PEEP', 'Insuficiência renal aguda associada ao quadro séptico', 'Coagulação intravascular disseminada (CIVD)', 'Disfunção orgânica múltipla (escore SOFA elevado)'],
    diferenciais: ['Síndrome do desconforto respiratório agudo (SDRA)', 'Atelectasia pulmonar de decúbito', 'Tromboembolismo pulmonar', 'Hemorragia alveolar', 'Edema pulmonar hidrostático']
  },
  {
    id: 'A15.0',
    nome: 'Tuberculose Pulmonar Ativa',
    sintomas: ['Tosse crônica persistente por mais de 3 semanas', 'Febre vespertina diária de baixa intensidade', 'Sudorese noturna profusa e calafrios recorrentes', 'Emagrecimento progressivo involuntário e anorexia', 'Astenia e fadiga crônica limitante'],
    fatores_risco: ['Contato próximo e prolongado com caso índice bacilífero', 'Infecção por HIV / AIDS ou outra imunossupressão', 'População privada de liberdade ou em situação de rua', 'Uso de drogas injetáveis ou alcoolismo pesado', 'Diabetes mellitus descompensada'],
    red_flags: ['Hemoptise maciça (>300 mL de sangue em 24 horas)', 'Dispneia súbita com sinais de pneumotórax secundário', 'Sinais de disseminação extrapulmonar (meningite, miliar)', 'Insuficiência respiratória aguda no paciente cronicamente debilitado', 'Desnutrição grave grau III'],
    diferenciais: ['Câncer de pulmão', 'Micoses pulmonares sistêmicas (ex: paracoccidioidomicose)', 'Bronquiectasia infetada', 'Abscesso pulmonar', 'Sarcoidose']
  },
  {
    id: 'I26.9',
    nome: 'Tromboembolismo Pulmonar',
    sintomas: ['Dispneia súbita e inexplicável', 'Dor torácica anginosa ou de caráter pleurítico', 'Taquicardia sustentada e palpitações de início agudo', 'Tosse seca que pode evoluir com escarro hemóptico', 'Síncope ou pré-síncope inexplicada'],
    fatores_risco: ['Cirurgia de grande porte recente (ortopédica ou pélvica)', 'Imobilização prolongada ou acamamento por > 3 dias', 'Neoplasia ativa ou em tratamento quimioterápico', 'Histórico pessoal ou familiar de trombose venosa profunda (TVP)', 'Uso de contraceptivos orais combinados de alta dose ou gestação'],
    red_flags: ['Instabilidade circulatória ou choque obstrutivo (PAS < 90 mmHg)', 'Sinais de disfunção de ventrículo direito (turgência jugular, desvio de septo)', 'Saturação de O2 < 90% refratária a oxigenoterapia de rotina', 'Troponina ou BNP elevados associados a instabilidade clínica', 'Parada cardiorrespiratória em atividade elétrica sem pulso'],
    diferenciais: ['Infarto agudo do miocárdio', 'Pneumotórax espontâneo', 'Pneumonia ou pleurite infecciosa', 'Dissecção aguda de aorta', 'Ataque de pânico com hiperventilação']
  },
  {
    id: 'G47.3',
    nome: 'Síndrome da Apneia Obstrutiva do Sono',
    sintomas: ['Roncos altos e perturbadores intercalados com silêncios', 'Sufocamento reflexo ou despertares ofegantes durante a noite', 'Sonolência diurna excessiva incapacitante', 'Cefaleia matinal recorrente e fadiga persistente', 'Déficits cognitivos, desatenção e irritabilidade'],
    fatores_risco: ['Obesidade (especialmente circunferência cervical > 43cm em homens)', 'Sexo masculino e pós-menopausa em mulheres', 'Anomalias craniofaciais (micrognatia, retrognatia)', 'Consumo noturno de álcool ou sedativos musculares', 'Histórico familiar de apneia do sono'],
    red_flags: ['Saturação noturna prolongada < 80% confirmada na polissonografia', 'Arritmias cardíacas noturnas complexas (ex: bradi-taqui)', 'Hipertensão arterial pulmonar severa secundária', 'Hipertensão arterial sistêmica refratária a múltiplas drogas', 'Sonolência durante a condução de veículos de carga ou coletivos'],
    diferenciais: ['Sonolência fisiológica por privação de sono', 'Narcolepsia crônica', 'Hipotireoidismo clínico severo', 'Depressão maior recorrente', 'Síndrome de fadiga crônica']
  },
  {
    id: 'J85.2',
    nome: 'Abscesso Pulmonar',
    sintomas: ['Febre moderada a alta de caráter oscilante', 'Tosse produtiva persistente com escarro purulento e fétido', 'Vômica (eliminação maciça de pus esverdeado com odor pútrido)', 'Dor pleurítica localizada na área afetada', 'Perda ponderal progressiva e sudorese noturna'],
    fatores_risco: ['Histórico recente de rebaixamento de consciência ou convulsão', 'Doença periodontal grave ou cirurgias odontológicas recentes', 'Alcoolismo crônico com episódios de embriaguez profunda', 'Disfagia neuromuscular crônica (sequela de AVC, Parkinson)', 'Refluxo gastroesofágico com aspiração maciça ativa'],
    red_flags: ['Hemoptise volumosa de risco vital por erosão arteriolar', 'Rutura cavitária para o espaço pleural (fístula broncopleural com empiema)', 'Sepse grave de foco pulmonar com choque', 'Insuficiência respiratória por bloqueio alveolar secundário', 'Sinais de caquexia extrema de início rápido'],
    diferenciais: ['Câncer de pulmão cavitado', 'Tuberculose pulmonar cavitária', 'Cisto hidático pulmonar infectado', 'Coccidioidomicose pulmonar', 'Infarto pulmonar cavitado']
  },
  {
    id: 'J47',
    nome: 'Bronquiectasia',
    sintomas: ['Tosse crônica com expectoração mucoide ou purulenta volumosa', 'Hemoptises recorrentes de pequena a média quantidade', 'Estertores grossos persistentes e sibilos localizados', 'Baqueteamento digital (dedos em baqueta de tambor) em casos graves', 'Sinusite crônica e fadiga crônica associadas'],
    fatores_risco: ['Infecções pulmonares graves na infância (sarampo, coqueluche)', 'Imunodeficiências primárias (ex: hipogamaglobulinemia)', 'Discinesia ciliar primária (Síndrome de Kartagener)', 'Aspergilose broncopulmonar alérgica (ABPA) de longo curso', 'Doenças autoimunes ou aspiração de corpo estranho prolongada'],
    red_flags: ['Episódio de hemoptise maciça necessitando de embolização', 'Desenvolvimento de Cor Pulmonale decorrente de fibrose grave', 'Infecções de repetição por Pseudomonas aeruginosa multirresistente', 'Saturação de O2 < 88% estável justificando oxigenoterapia', 'Deterioração rápida da função pulmonar (VEF1 < 30% do previsto)'],
    diferenciais: ['Bronquite crônica linear', 'Tuberculose sequelar ativa', 'Asma persistente grave resistente', 'Abscesso pulmonar de lobo inferior', 'Mucoviscidose (Fibrose Cística)']
  },
  {
    id: 'J81',
    nome: 'Edema Agudo de Pulmão',
    sintomas: ['Dispneia extrema de instalação súbita e asfixiante', 'Ansiedade severa e sensação de morte iminente', 'Expectoração espumosa rosácea (padrão clássico aerado)', 'Ortopneia imeditada (necessidade de sentar para respirar)', 'Sudorese fria e pálida ou cianótica'],
    fatores_risco: ['Cardiopatia estrutural subjacente (insuficiência cardíaca, coronariopatia)', 'Infarto agudo do miocárdio concomitante ou recente', 'Crise hipertensiva sistêmica severa', 'Sobrecarga de volume intravascular intravenoso em cardiopatas', 'Estenose mitral ou aórtica acentuadas descompensadas'],
    red_flags: ['Sinais visíveis de choque cardiogênico (má perfusão periférica)', 'Bradicardia reflexa terminal com respiração agônica (gasping)', 'Rebaixamento rápido do nível de consciência', 'Necessidade imediata de suporte ventilatório invasivo ou VNI de resgate', 'Acidose metabólica por hipofluxo sistêmico'],
    diferenciais: ['Tromboembolismo pulmonar de grande porte', 'Asma aguda grave (mal asmático)', 'Pneumotórax hipertensivo agudo', 'Síndrome do desconforto respiratório agudo (SDRA)', 'Pneumonia comunitária lobar extensa com sepse'],
  },
  {
    id: 'E84.0',
    nome: 'Fibrose Cística do Adulto',
    sintomas: ['Tosse produtiva crônica de caráter viscoso persistente', 'Bronquiectasias de lobos superiores difusas', 'Diarreia crônica com esteatorreia (fezes gordurosas e brilhantes)', 'Desnutrição crônica com dificuldade extrema de manter peso', 'Pancreatite recorrente ou diabetes de início precoce'],
    fatores_risco: ['Anomalia no gene CFTR hereditária recessiva', 'Histórico familiar de fibrose cística ou morte súbita na infância', 'Ancestralidade caucasiana europeia', 'Baixo ganho ponderal crônico com sintomas intestinais precoces', 'Presença de azoospermia obstrutiva congênita nos homens'],
    red_flags: ['Colonização persistente por Pseudomonas aeruginosa ou Burkholderia cepacia', 'Derrame de hemoptise volumosa por rotura de ramos brônquicos', 'Pneumotórax secundário espontâneo por rutura de bolha apical', 'Insuficiência respiratória crônica hipercápnica terminal', 'Hipertensão portal com varizes esofágicas por cirrose biliar secundária'],
    diferenciais: ['Discinesia ciliar primária', 'Deficiência de Alfa-1-antitripsina', 'Síndrome de Kartagener', 'Imunodeficiência comum variável (IDCV)', 'Asma não responsiva severa']
  },
  {
    id: 'J90',
    nome: 'Derrame Pleural Exudativo',
    sintomas: ['Dor torácica pleurítica unilateral que se irradia para dorso', 'Dispneia progressiva proporcional ao volume acumulado', 'Tosse seca irritativa na mudança de decúbito corporal', 'Ausculta com abolição de murmúrio vesicular e frêmito tóraco-vocal', 'Submacicez à percussão da parede torácica posterior'],
    fatores_risco: ['Processos infecciosos pulmonares ativos (Pneumonia parapneumônica)', 'Neoplasias de pulmão, mama, linfoma ou metástases pleurais', 'Presença de colagenoses sistêmicas (Lúpus Eritematoso, Artrite Reumatoide)', 'Trauma torácico fechado ou pós-operatório cirúrgico recente', 'Pancreatite aguda complicada ou abscesso subfrênico'],
    red_flags: ['Aspecto purulento franco indicando empiema agudo ou pH < 7.20', 'Instabilidade hemodinâmica grave secundária a grande volume restritivo', 'Líquido pleural hemorrágico volumoso sem causa traumática clara', 'Presença de células neoplásicas na citologia pleural', 'Fístula broncopleural detectada ao borbulhamento dreno'],
    diferenciais: ['Derrame pleural transudativo (Insuficiência cardíaca, Cirrose, Nefrose)', 'Atelectasia pulmonar obstrutiva segmentar gigante', 'Elevação diafragmática acentuada por ascite volumosa', 'Condrossarcoma ou tumor primário da parede torácica', 'Pneumotórax de grande volume']
  },
  {
    id: 'J93.1',
    nome: 'Pneumotórax Espontâneo Primário',
    sintomas: ['Dor pleurítica ipsilateral de início agudo súbito no repouso', 'Dispneia leve a moderada proporcional ao grau de colapso', 'Tosse seca irritativa desencadeada por inspiração profunda', 'Abolição ou diminuição importante do murmúrio vesicular unilateral', 'Hipersonoridade ou timpanismo à percussão torácica unilateral'],
    fatores_risco: ['Idade jovem entre 15-30 anos', 'Biotipo longilíneo (indivíduos altos e magros)', 'Tabagismo atual ativo como principal desencadeador', 'Histórico anterior de pneumotórax ipsi ou contralateral', 'Presença de blebs subpleurais apicais congênitos'],
    red_flags: ['Evolução catastrófica para quadro de pneumotórax hipertensivo', 'Taquicardia severa sustentada com hipotensão ou tontura', 'Cianose ou saturação arterial de O2 < 88% persistente em ar', 'Pneumotórax bilateral simultâneo agudo', 'Persistência de escape aéreo pelo dreno (> 5 dias) por fístula'],
    diferenciais: ['Infarto agudo do miocárdio', 'Pericardite aguda', 'Tromboembolismo pulmonar', 'Rotura esofágica (Síndrome de Boerhaave)', 'Dores osteomusculares de parede torácica']
  },
  {
    id: 'J93.0',
    nome: 'Pneumotórax Hipertensivo',
    sintomas: ['Dispneia asfixiante extrema e agitação psicomotora franca', 'Dor torácica unilateral violenta lancinante', 'Sudorese fria profusa e palidez cutânea acentuada', 'Ausculta com murmúrio totalmente abolido e timpanismo importante', 'Turgência de veias jugulares à inspeção clínica estática'],
    fatores_risco: ['Ventilação mecânica ativa com pressões inspiratórias elevadas', 'Trauma torácico penetrante ou contuso de grande impacto', 'Punção venosa central de acesso subclávio ou jugular profunda', 'Rutura de bolha de enfisema gigante sob alta pressão intratorácica', 'Colocação de dreno de tórax ou biópsia pulmonar transbrônquica'],
    red_flags: ['Hipotensão arterial severa persistente configurando choque obstrutivo', 'Desvio visível da traqueia para o lado contralateral na fúrcula', 'Assemetria torácica grave com tórax afetado em expansão fixa', 'Parada cardiorrespiratória em atividade elétrica sem pulso', 'Cianose central severa refratária de rápida evolução'],
    diferenciais: ['Tamponamento cardíaco traumático', 'Tromboembolismo pulmonar maciço', 'Herniação diafragmática maciça aguda com choque', 'Edema agudo de pulmão unilateral e atípico', 'Infarto agudo com choque cardiogênico']
  },
  {
    id: 'I27.0',
    nome: 'Hipertensão Arterial Pulmonar',
    sintomas: ['Dispneia progressiva aos mínimos esforços de caráter inexplicado', 'Fadiga extrema limitadora de atividades diárias', 'Síncope ou pré-síncope desencadeada por esforço moderado', 'Dor torácica tipo anginosa ao exercício', 'Palpitações e sensação de batimentos cervicais visíveis'],
    fatores_risco: ['Doenças do tecido conjuntivo (esclerose sistêmica, lúpus)', 'Esquistossomose mansoni com acometimento intravascular crônico', 'Cardiopatias congênitas com shunt esquerda-direita (ex: CIA, CIV)', 'Hipertensão portal avançada ou infecção pelo HIV ativa', 'Histórico familiar forte de mutações no receptor BMPR2'],
    red_flags: ['Crise de falência aguda de ventrículo direito refratária', 'Episódios recorrentes de síncope em repouso', 'Hemoptise decorrente de rotura de ramos aneurismáticos pulmonares', 'Arritmias atriais instáveis (ex: Flutter atrial com choque)', 'Ascite volumosa com hepatomegalia congestiva extremamente dolorosa'],
    diferenciais: ['Insuficiência cardíaca esquerda diastólica ou sistólica', 'DPOC avançada ou fibrose pulmonar', 'Tromboembolismo pulmonar crônico hipertensivo', 'Asma persistente grave resistente', 'Anemia profunda de causa inexplicada']
  },
  {
    id: 'J62.8',
    nome: 'Silicose Pulmonar',
    sintomas: ['Dispneia aos esforços de instalação insidiosa e lenta e tosse seca', 'Expectoração mucoide escassa associada ao tabagismo', 'Dor e desconforto torácico difuso inespecífico', 'Fadiga crônica progressiva nas fases avançadas', 'Ausculta com estertores finos de distribuição posterior'],
    fatores_risco: ['Trabalho em mineração de subsolo de carvão ou ouro', 'Atividade de jateamento de areia ou fundições metalúrgicas', 'Ocupação em corte e polimento de pedras ou granito', 'Histórico de exposição prolongada à poeira de quartzo silica', 'Trabalho na fabricação de vidro e cerâmica industrial'],
    red_flags: ['Associação com Tuberculose ativa (Silicotuberculose com piora clínica)', 'Presença de massas conglomeradas bilaterais (Fibrose Massiva Progressiva)', 'Cor pulmonale secundário a destruição vascular progressiva', 'Perda ponderal maciça rápida inexplicada', 'Insuficiência respiratória crônica demandando oxigenoterapia'],
    diferenciais: ['Tuberculose pulmonar isolada cavitária', 'Sarcoidose pulmonar bilateral residual', 'Fibrose pulmonar idiopática', 'Doença reumatóide com acometimento pulmonar', 'Linfangite carcinomatosa pulmonar']
  },
  {
    id: 'J61',
    nome: 'Asbestose Pulmonar',
    sintomas: ['Dispneia de esforço de início tardio (décadas após exposição)', 'Tosse seca crônica persistente irritativa', 'Estertores do tipo "velcro" inspiratórios em bases pulmonares', 'Baqueteamento digital (dedos hipocráticos) de desenvolvimento lento', 'Restrição respiratória volumétrica progressiva'],
    fatores_risco: ['Trabalho na indústria de fibrocimento (caixas d\'água, telhas)', 'Atividade no setor de freios automotivos ou juntas de amianto', 'Ocupação na demolição de construções antigas revestidas por asbesto', 'Tempo de latência prolongada (exposição datada há mais de 20 anos)', 'Histórico familiar por lavagem de vestimentas com pó de amianto'],
    red_flags: ['Surgimento de nódulos ou massas sugerindo Câncer de Pulmão', 'Presença de derrame pleural hemorrágico (Mesotelioma Pleural)', 'Rápida perda de peso com dor torácica constante e contínua', 'Deterioração rápida da função restritiva em espirometria', 'Saturação arterial no repouso < 89% em ambiente doméstico'],
    diferenciais: ['Fibrose Pulmonar Idiopática (FPI)', 'Pneumonite por hipersensibilidade ao mofo', 'Artrite reumatoide pulmonar', 'Insuficiência cardíaca crônica congestiva', 'Sarcoidose fibrótica crônica']
  },
  {
    id: 'D86.2',
    nome: 'Sarcoidose Pulmonar Estádio III ou IV',
    sintomas: ['Dispneia progressiva aos menores esforços de repouso', 'Tosse seca persistente não responsiva a broncodilatadores', 'Artralgias em tornozelos e punhos com edema episódico', 'Fadiga sistêmica crônica incapacitante e prostração', 'Ausculta com estertores secos ou murmúrios reduzidos em bases'],
    fatores_risco: ['Etnia negra com padrão de evolução inflamatória mais agressivo', 'Idade entre 30 e 50 anos acometendo ambos os gêneros', 'Predisposição genética e presença de alelos HLA predisponentes', 'Exposição prévia prolongada a poeiras de metais reciclados ou mofos'],
    red_flags: ['Acometimento neurológico ativo (paralisias, neurites cranianas)', 'Acometimento cardíaco com dor torácica ou bloqueios de condução no ECG', 'Hipercalcemia grave em exames de rotina ou nefrocalcinose renal', 'Perda visual por uveíte anterior ativa ou granulomas de coróide', 'Padrão de fibrose massiva com cor pulmonale refratário'],
    diferenciais: ['Tuberculose pulmonar ativa ou disseminada', 'Linfoma de Hodgkin ou outras neoplasias linfáticas mediastinais', 'Fibrose pulmonar idiopática', 'Paracoccidioidomicose pulmonar crônica do adulto', 'Pneumonite de hipersensibilidade crônica']
  },
  {
    id: 'J84.1',
    nome: 'Fibrose Pulmonar Idiopática',
    sintomas: ['Dispneia de esforço progressiva ao longo de meses ou anos', 'Tosse seca crônica e profundamente irritativa persistente', 'Estertores inspiratórios finos tipo "velcro" em ambas as bases', 'Baqueteamento digital simétrico proeminente (unhas em vidro de relógio)', 'Astenia progressiva e limitação de mobilidade física diária'],
    fatores_risco: ['Idade superior a 60 anos com predominância no sexo masculino', 'Tabagismo de carga moderada ou alta pretérito ou ativo', 'Exposição ocupacional a poeira de metal, madeira ou minerais', 'História familiar de doença intersticial fibrótica congênita', 'Presença de microaspiração ácida crônica de refluxo silencioso'],
    red_flags: ['Exacerbação aguda da FPI (piora drástica de dispneia em < 30 dias)', 'Saturação de O2 < 85% com hipoxemia acentuada ao mínimo andar', 'Rotura pleural com pneumotórax secundário espontâneo agudo', 'Falência ventricular direita congestiva dolorosa retrógrada', 'Desenvolvimento súbito de infecção fúngica oportunista'],
    diferenciais: ['Pneumonite intersticial inespecífica (Nonspecific Interstitial Pneumonia)', 'Pneumoconiose por poeira inorgânica', 'Artrite Reumatoide ou Esclerose com acometimento pulmonar', 'Pneumonite por hipersensibilidade crônica avançada', 'Cardiopatia com congestão passiva de longa data']
  },
  {
    id: 'C34.9',
    nome: 'Câncer de Pulmão - Adenocarcinoma',
    sintomas: ['Tosse persistente de início recente que muda seu padrão usual', 'Escarro hemóptico de repetição em raias ou coágulos', 'Dor torácica de caráter surdo, contínuo ou localizado', 'Perda ponderal involuntária rápida e astenia severa', 'Dispneia progressiva decorrente de atelectasia ou derrame pleural'],
    fatores_risco: ['Tabagismo ativo ou passivo de longa data (relação direta)', 'Exposição domiciliar prolongada ao gás radônio silencioso', 'Exposição ocupacional a amianto, cromo, arsênico ou níquel', 'Histórico de DPOC, fibrose pulmonar ou cicatrizes de tuberculose', 'História familiar de neoplasias pulmonares precoces'],
    red_flags: ['Síndrome da Veia Cava Superior (pletora facial, edema em pescoço e braços)', 'Déficits neurológicos súbitos por metástases cerebrais agudas', 'Dor óssea localizada intensa que piora deitada (metástase óssea ou fratura)', 'Hipercalcemia tumoral sintomática com confusão mental e sede', 'Hemoptise volumosa com asfixia aguda por invasão de grande vaso'],
    diferenciais: ['Pneumonia comunitária de resolução lenta (pneumonia em organização)', 'Tuberculose pulmonar ativa bacilífera', 'Abscesso pulmonar de evolução crônica', 'Aspergiloma pulmonar residual em cavidade antiga', 'Sarcoidose nodular pseudotumoral']
  },
  {
    id: 'C34.1',
    nome: 'Câncer de Pulmão de Células Pequenas',
    sintomas: ['Dispneia progressiva acelerada em curto período de tempo de semanas', 'Tosse seca e rouquidão persistente (paralisia do nervo laríngeo recorrente)', 'Dor torácica retroesternal opressiva e lancinante', 'Astenia grave com perda de peso marcante e anorexia', 'Surgimento rápido de linfonodomegalias cervicais e supraclaviculares indolor'],
    fatores_risco: ['Associação quase exclusiva com tabagismo pesado (>40 anos-maço)', 'Exposição combinada ao tabaco e poeiras minerais metálicas', 'Exposição ao radônio e poluição industrial química expressiva', 'Idade idosa (geralmente entre 60 e 80 anos de idade)', 'Presença de distúrbios genéticos de suscetibilidade celular'],
    red_flags: ['Síndrome da Veia Cava Superior instalada de rápido desenvolvimento', 'Surgimento rápido de Síndrome Paraneoplásica de SIADH (hiponatremia grave)', 'Síndrome de Cushing paraneoplásica por produção ectópica de ACTH', 'Fraqueza muscular miastênica progressiva (Síndrome de Eaton-Lambert)', 'Sinais agudos de compressão medular dorsal por metástase extradural'],
    diferenciais: ['Adenocarcinoma de pulmão avançado ou carcinoma epidermoide', 'Linfoma não-Hodgkin mediastinal volumoso agressivo', 'Tuberculose ganglionar mediastinal extensa', 'Sarcoidose gigante mediastinal compressiva', 'Timoma maligno invasivo anterior']
  },
  {
    id: 'J86.9',
    nome: 'Empiema Pleural',
    sintomas: ['Febre vespertina ou diária persistente refratária a antitérmicos', 'Dor torácica tipo pleurítica aguda intensa unilateral de pontada', 'Tosse produtiva com escarro purulento ou dolorosa de mobilização', 'Dispneia progressiva limitando o ortostatismo corporal', 'Sudorese fria noturna abundante, calafrios recorrentes de calafrios'],
    fatores_risco: ['Pneumonia comunitária ou hospitalar tratada de forma inadequada', 'Cirurgia torácica invasiva recente ou inserção de dreno pleural', 'Traumatismo torácico contuso ou penetrante infectado', 'Alcoolismo crônico ou diabetes descompensado sistêmico', 'Histórico de episódios recorrentes de broncoaspiração'],
    red_flags: ['Presença de nível hidroaéreo no tórax indicando fístula broncopleural', 'Instabilidade hemodinâmica configurando quadro de choque séptico pleural', 'Dumping ventilatório por restrição elástica extrema (derrame pleural massivo)', 'Drenagem purulenta fétida espontânea através da pele (Empiema necessitans)', 'Acidose pleural expressiva (pH do líquido pleural < 7.10)'],
    diferenciais: ['Derrame pleural tuberculoso inflamatório', 'Derrame pleural neoplásico carcinomatoso', 'Infarto pulmonar complicado com efusão reativa', 'Abscesso subfrênico com efusão simpática reativa', 'Quilotórax complicado traumático']
  },
  {
    id: 'J63.2',
    nome: 'Beriliose Ocupacional',
    sintomas: ['Dispneia progressiva aos esforços físicos laborais e tosse seca', 'Dor torácica inespecífica simulando espasmo esofágico', 'Fadiga sustentada, astenia e cansaço fácil persistentes', 'Lesões cutâneas ulceradas ou granulomas na pele', 'Perda de peso progressiva e febre baixa episódica'],
    fatores_risco: ['Trabalho na indústria aeroespacial, eletrônica avançada ou telecomunicações', 'Manuseio ou processamento de ligas de berílio em fundições metalúrgicas', 'Exposição à poeira de cerâmica eletrônica ou manufatura de armas', 'Predisposição imunológica (teste de proliferação celular por berílio positivo)', 'Tempo mínimo de exposição variando de meses a anos no trabalho'],
    red_flags: ['Deterioração restritiva grave da espirometria de forma acelerada', 'Padrão histológico de fibrose generalizada com hipoxemia grave', 'Disfunção ventricular direita decorrente de cor pulmonale crônico', 'Derrame pleural refratário doloroso crônico', 'Associação com perda visual ou hipercalcemia secundária'],
    diferenciais: ['Sarcoidose pulmonar sistêmica clássica', 'Pneumonite por hipersensibilidade fúngica ou mofo', 'Tuberculose pulmonar disseminada ou atípica', 'Artrite reumatoide com acometimento pulmonar ativo', 'Fibrose pulmonar idiopática (FPI) avançada']
  },
  {
    id: 'J67.9',
    nome: 'Pneumonite por Hipersensibilidade',
    sintomas: ['Febre, calafrios, tosse seca e cansaço de início agudo pós-exposição', 'Dispneia progressiva ao longo de meses (na forma crônica)', 'Estertores crepitantes inspiratórios difusos bilaterais', 'Perda ponderal progressiva e perda de apetite incapacitante', 'Mialgia e cefaleia associadas nas crises agudas de inalação'],
    fatores_risco: ['Exposição doméstica ou profissional a fezes, penas e urina de aves', 'Trabalho na lavoura com feno úmido mofado (pulmão do fazendeiro)', 'Inalação frequente de fungos em ambientes com ar condicionado sujo', 'Trabalho na fabricação de queijos ou mofos alimentares industriais', 'Uso habitual de umidificadores de ar domésticos sem limpeza regular'],
    red_flags: ['Insuficiência respiratória aguda hipoxêmica severa nas formas agudas', 'Padrão tomográfico de fibrose pulmonar irreversível avançada', 'Saturação de O2 < 88% no repouso necessitando de oxigenoterapia fixa', 'Perda ponderal maciça simulando cachexia de neoplasias', 'Sinais ecocardiográficos de hipertensão pulmonar restritiva grave'],
    diferenciais: ['Asma brônquica crônica exacerbada', 'Pneumonia bacteriana atípica comunitária', 'Sarcoidose pulmonar isolada estádio I ou II', 'Fibrose pulmonar idiopática clássica', 'Micose pulmonar endêmica']
  },
  {
    id: 'J11.1',
    nome: 'Influenza com Complicações Pulmonares',
    sintomas: ['Febre alta súbita acompanhada de calafrios intensos', 'Tosse inicialmente seca e irritativa que evolui com secreção', 'Mialgias intensas, artralgias e fadiga extrema limitadoras', 'Dispneia de instalação rápida e desconforto torácico difuso', 'Coriza, espirros e dor de garganta intensa inicial'],
    fatores_risco: ['Idade avançada maior do que 60 anos ou gestantes de qualquer época', 'Portadores de comorbidades clínicas renais, cardíacas ou pulmonares', 'Pacientes transplantados ou sob quimioterapia ativa', 'Profissionais de saúde ou trabalhadores expostos a aglomerações', 'Ausência de vacinação contra a Influenza anual indicada'],
    red_flags: ['Evolução drástica para Síndrome do Desconforto Respiratório Agudo', 'Instabilidade circulatória ou hipotensão arterial no paciente febril', 'Confusão mental, agitação ou rebaixamento do nível sensorial', 'Saturação de O2 < 92% sob fluxo de oxigênio complementar habitual', 'Infecção bacteriana secundária sobreposta (ex: estafilocócica grave)'],
    diferenciais: ['Pneumonia bacteriana comunitária primária de início súbito', 'Infeção por COVID-19 ativa ou vírus sincicial respiratório', 'Pneumonite química por inalação ácida reativa', 'Tromboembolismo pulmonar atípico febril', 'Laringite crupal aguda viral']
  },
  {
    id: 'J80',
    nome: 'Síndrome do Desconforto Respiratório Agudo',
    sintomas: ['Dispneia extrema de início rápido e rápida deterioração clínica', 'Taquipneia acentuada severa e cianose central visível', 'Uso de musculatura acessória de forma exaustiva abdominal', 'Ansiedade severa com agitação psicomotora e prostração subsequente', 'Estertores finos bilaterais difusos à ausculta torácica de repouso'],
    fatores_risco: ['Sepse sistêmica ou choque séptico de qualquer foco de infecção', 'Pneumonia aspirativa ou pneumonia infecciosa extensa viral grave', 'Trauma torácico grave com contusão pulmonar unilateral ou bilateral', 'Transfusão maciça de hemoderivados (síndrome TRALI recorrente)', 'Pancreatite necro-hemorrágica aguda grave ativa'],
    red_flags: ['Relação PaO2/FiO2 < 100 mmHg sugerindo SDRA na forma grave', 'Hipercapnia permissiva mal tolerada com acidose grave (pH < 7.15)', 'Pressões de vias aéreas críticas em VM (platô > 30 cmH2O)', 'Instabilidade hemodinâmica severa com choque misto associado', 'Hemorragia alveolar com sangramento traqueal abundante activo'],
    diferenciais: ['Edema pulmonar hidrostático (insuficiência cardíaca descompensada)', 'Hemorragia alveolar difusa secundária a vasculites autoimunes', 'Pneumonia em organização eosinofílica aguda hiperaguda', 'Metástases linfangíticas carcinomatosas agudas bilaterais', 'Atelectasias extensas de decúbito em terapia intensiva']
  },
  {
    id: 'J44.8',
    nome: 'Bronquiolite Obliterante',
    sintomas: ['Dispneia de esforço progressiva e sibilância expiratória crônica', 'Tosse seca e sem resposta a broncodilatadores orais ou inalados', 'Limitação fixa e severa ao fluxo de ar em espirometria de rastreio', 'Fadiga crônica progressiva limitando mobilidade e reabilitação', 'Ausculta com murmúrios reduzidos globais e sibilos finos'],
    fatores_risco: ['Indivíduos submetidos a transplante de células tronco ou transplante pulmonar', 'Histórico de exposição inalatória a fumaças tóxicas ou diacetil (pipoca)', 'Sequela de infecção viral grave na infância (principalmente adenovírus)', 'Portadores de artrite reumatoide ou lúpus sistêmico ativos', 'Histórico anterior de síndrome de Stevens-Johnson de cicatrização'],
    red_flags: ['Queda acentuada irreversível do VEF1 para valores inferiores a 30%', 'Necessidade de oxigenoterapia de longa duração por hipoxemia crônica', 'Pneumotórax mecânico decorrente de aprisionamento aéreo grave', 'Cor pulmonale secundário decorrente de vasoconstrição crônica', 'Caquexia grave de evolução rápida em paciente cronicamente enfermo'],
    diferenciais: ['Asma brônquica crônica de remodelamento estrutural persistente', 'DPOC clássico de tabagismo ativo ou fumaça de biomassa', 'Tuberculose sequelar de grandes vias aéreas com estenose', 'Sarcoidose pulmonar estádio IV fibrótico avançada', 'Pneumonia intersticial descamativa por poeiras orgânicas']
  },
  {
    id: 'J04.2',
    nome: 'Laringotraqueobronquite Aguda / Crupe',
    sintomas: ['Tosse ladrante de início súbito ("tosse de cachorro")', 'Estridor inspiratório audível em repouso sem estetoscópio', 'Rouquidão acentuada ou afonia total nas crises agudas', 'Dispneia e desconforto respiratório de progressão noturna', 'Febre moderada, coriza e obstrução nasal prévias de dias'],
    fatores_risco: ['Idade pediátrica entre 6 meses e 3 anos (gênero masculino major)', 'Frequência regular a creches ou berçários no inverno', 'Histórico familiar de hiperresponsividade de via aérea superior', 'Presença de refluxo laringofaríngeo subclínico não tratado', 'Exposição domiciliar secundária à fumaça de cigarro atrativa'],
    red_flags: ['Estridor progressivo audível tanto em inspiração quanto expiração', 'Sinais de esgotamento ventilatório com batimento de asa de nariz', 'Cianose labial ou de extremidades sob ar ambiente doméstico', 'Letargia importante ou rebaixamento sensorial agudo da criança', 'Incapacidade total de deglutir saliva pura (risco de epiglotite)'],
    diferenciais: ['Epiglotite aguda bacteriana por Haemophilus influenzae', 'Aspiração de corpo estranho em árvore traqueal mecânica', 'Traqueíte bacteriana purulenta de rápida evolução clínica', 'Abscesso retrofaríngeo inflamatório obstrutivo súbito', 'Edema angioneurótico alérgico grave com choque anafilático']
  },
  {
    id: 'J04.1',
    nome: 'Traqueíte Bacteriana',
    sintomas: ['Febre alta refratária de início súbito no curso de infecção viral', 'Tosse produtiva dolorosa com eliminação de secreção espessa', 'Estridor inspiratório de rápida progressão e intensidade', 'Dispneia progressiva severa e uso de músculos respiratórios', 'Aparência de toxemia ou aparência de "criança severamente doente"'],
    fatores_risco: ['Idade pediátrica entre 3 e 8 anos preferencialmente', 'Histórico recente de infecção pelo vírus Influenza ou vírus sincicial', 'Condições domésticas desfavoráveis de ventilação mecânica', 'Portadores de fenda palatina ou refluxo crônico sem controle', 'Imunodeficiências globais ou desnutrição infantil moderada'],
    red_flags: ['Urgência respiratória iminente por obstrução mecânica por rolha de pus', 'Instabilidade hemodinâmica, sonolência ou estridor silencioso final', 'Incapacidade de deglutir acompanhada de sialorreia abundante', 'Instabilidade da via aérea superior necessitando de intubação em bloco cirúrgico', 'Sepse sistêmica acelerada com disfunção orgânica de foco respiratório'],
    diferenciais: ['Laringotraqueobronquite viral simples (Crupe de repetição)', 'Epiglotite bacteriana aguda de rápida evolução e toxemia', 'Abscesso periamigdaliano com trismo moderado a grave', 'Aspiração de corpo estranho com retenção mecânica traqueal', 'Difteria respiratória pseudomembranosa clássica']
  },
  {
    id: 'J44.1',
    nome: 'DPOC Exacerbado Agudo',
    sintomas: ['Aumento súbito da dispneia basal que limita tarefas simples', 'Aumento do volume da expectoração habitual do paciente', 'Mudança na cor do escarro usual, tornando-se francamente purulento', 'Sibilância perceptível em repouso e opressão torácica leve', 'Inquietação irritativa por leve hipoxemia aguda reversível'],
    fatores_risco: ['Exposição sazonal ao frio extremo ou poluição química urbana do ar', 'Infecções de vias aéreas superiores bacterianas ou virais ativa', 'Uso incorreto ou interrupção crônica da terapia inalada diária', 'Condições basais cardíacas limitadoras (ex: cardiopatia coronariana)', 'Histórico anterior de múltiplas internações por exacerbação aguda'],
    red_flags: ['Acidose respiratória aguda com pH < 7.25 em gasometria arterial', 'Uso contínuo e intenso de musculatura abdominal acessória em repouso', 'Arritmias cardíacas associadas descompensadas (ex: Fibrilação atrial)', 'Alteração do estado de consciência (sonolência profunda, asterixe)', 'Saturação de O2 estável < 85% persistente sob alto fluxo'],
    diferenciais: ['Insuficiência cardíaca descompensada hidrostática congestiva', 'Tromboembolismo pulmonar de início silencioso atípico', 'Pneumonia bacteriana comunitária extensa sobreposta', 'Pneumotórax espontâneo secundário por rotura de bolha', 'Infarto agudo do miocárdio silencioso do idoso']
  },
  {
    id: 'J46',
    nome: 'Asma Aguda Grave / Mal Asmático',
    sintomas: ['Dispneia asfixiante e sibilância generalizada expiratória contínua', 'Falar em frases curtas cortadas ou apenas palavras monossilábicas', 'Sudorese profusa induzida pelo esforço de respirar em repouso', 'Uso exaustivo de acessórios do pescoço (estendendo cabeça para respirar)', 'Taquipneia sustentada importante e taquicardia correspondente'],
    fatores_risco: ['Histórico anterior de ventilação mecânica por asma em UTI', 'Uso frequente (mais de um frasco por mês) de broncodilatador de curto', 'Não adesão crônica ao corticoide inalatório prescrito de forma correta', 'Fatores psicossociais desfavoráveis ou depressão clínica associada', 'Uso recente de beta-bloqueadores oculares ou sistêmicos contraindicados'],
    red_flags: ['Tórax silencioso com murmúrio abolido sugerindo obstrução mecânica total', 'Bradicardia terminal ou hipotensão indicativos de fadiga iminente', 'Sonolência extrema recessiva ou agitação psicomotora por hipóxia central', 'Saturação de O2 persistente < 90% sob alto fluxo de O2 disponível', 'Gasometria com PaCO2 normal ou elevada sugerindo retenção de CO2'],
    diferenciais: ['Edema agudo de pulmão hidrostático clássico', 'Tromboembolismo pulmonar hiperagudo', 'Aspiração de corpo estranho por obstrução alta laringotraqueal', 'Anafilaxia sistêmica com edema de glote obstrutivo agudo', 'Disfunção de pregas vocais aguda sob estresse emocional']
  },
  {
    id: 'A37.0',
    nome: 'Coqueluche / Pertussis',
    sintomas: ['Paroxismos intensos de tosse seca e incontrolável ("crise de tosse")', 'Guincho inspiratório no final da crise de tosse (característico)', 'Vômito pós-tosse decorrente de esforço mecânico epigástrico', 'Cianose visível transitória da face durante as crises de paroxismo', 'Fase catarral inicial leve simulando resfriado comum de semanas'],
    fatores_risco: ['Ausência ou esquema vacinal incompleto (especialmente DTP/dTpa)', 'Contato muito próximo com adultos portadores de tosse prolongada', 'Idade pediátrica menor do que 6 meses de vida (grupo mais vulnerável)', 'Ambientes fechados desfavoráveis ou creches superlotadas de inverno', 'Imunocomprometimento celular ou humoral subjacente de nascença'],
    red_flags: ['Apneia prolongada na infância pós-tosse com cianose', 'Encefalopatia coqueluchosa aguda (crises convulsivas repetitivas)', 'Desenvolvimento de pneumonia bacteriana secundária em lactentes', 'Hiperleucocitose severa (> 50.000) preditória de desfecho grave', 'Rutura alveolar traumática originando pneumomediastino agudo'],
    diferenciais: ['Infecção ativa pelo adenovírus ou vírus sincicial infantil', 'Asma brônquica manifestando-se apenas com tosse tosse variante', 'Fibrose cística com crises recorrentes devido ao muco', 'Aspiração mecânica silenciosa de corpo estranho alimentar', 'Tuberculose pulmonar linfonodal compressiva primária']
  },
  {
    id: 'B41.0',
    nome: 'Paracoccidioidomicose Pulmonar',
    sintomas: ['Dispneia de instalação lenta progressiva associada a tosse produtiva', 'Escarro mucopurulento que pode progredir com raias de sangue', 'Lesões ulceradas e dolorosas em mucosa oral ("estomatite moriforme")', 'Linfonodomegalias cervicais aumentadas que fistulizam e drenam pus', 'Astenia progressiva, prostração, febre baixa vespertina e emagrecimento'],
    fatores_risco: ['Atividade laboral rural agrícola prolongada (limpeza de cafezais)', 'Exposição constante à poeira de solo de regiões endêmicas', 'Sexo masculino predominante (relação aproximada de 10-15 para 1)', 'Histórico de tabagismo ativo ou etilismo moderado a crônico', 'Idade entre 30 e 50 anos de idade do trabalhador do campo'],
    red_flags: ['Fase aguda linfonodal disseminada juvenil de rápida evolução', 'Surgimento de roncos e estenose laringotraqueal cicatricial obstrutiva', 'Sinais radiológicos de fibrose pulmonar massiva com padrão asa de borboleta', 'Desenvolvimento súbito de insuficiência adrenal aguda por invasão', 'Disseminação neurológica com sinais de cefaleia ou meningite fúngica'],
    diferenciais: ['Tuberculose pulmonar ativa bacilífera crônica', 'Neoplasia de pulmão adenocarcinoma ou metástase carcinomatosa', 'Leishmaniose tegumentar com lesão em mucosa oral ulcerada', 'Sarcoidose granulomatosa sistêmica crônica pulmonar', 'Histoplasmose pulmonar crônica do adulto']
  },
  {
    id: 'B39.2',
    nome: 'Histoplasmose Pulmonar Aguda',
    sintomas: ['Febre moderada surgindo dias após exposição peculiar e marcante', 'Tosse seca irritativa persistente e dor torácica retroesternal', 'Cefaleia de moderada intensidade acompanhada de mialgia', 'Astenia e sensação de cansaço extremo limitantes', 'Ausculta torácica usualmente normal ou sibilância esporádica'],
    fatores_risco: ['Inalação de poeira de limpeza de galinheiros ou viveiros ativos', 'Exploração de cavernas ou grutas antigas habitadas por morcegos', 'Trabalho em demolição de prédios cobertos de fezes de pombos urbanos', 'Atividades de jardinagem intensa em solos adubados recentes', 'Idade jovem ou idosa com exposição massiva aguda ao fungo'],
    red_flags: ['Disseminação hematogênica rápida para fígado, baço em imunodeprimidos', 'Evolução restritiva pulmonar com hipoxemia e Saturação < 90%', 'Ocorrência de pericardite fúngica dolorosa com tamponamento rítmico', 'Linfonodomegalia mediastinal gigante compressiva comprimindo brônquios', 'Insuficiência adrenal aguda descompensada por infiltração ativa'],
    diferenciais: ['Tuberculose miliar disseminada aguda febril', 'PAC por agentes atípicos (Mycoplasma ou Chlamydia)', 'Influenza complicada ou suspeita inicial de COVID-19', 'Sarcoidose pulmonar aguda mediastinal (Síndrome de Löfgren)', 'Coccidioidomicose pulmonar aguda']
  },
  {
    id: 'B44.1',
    nome: 'Aspergilose Broncopulmonar Alérgica',
    sintomas: ['Asma bronquítica de difícil controle e sibilância resistente', 'Febre recorrente de baixa intensidade e mal-estar geral', 'Expectoração de rolhas mucoides espessas marrons ou escuras', 'Dispneia progressiva durante as crises de inalação', 'Infiltrados pulmonares migratórios visíveis em radiologia sequencial'],
    fatores_risco: ['Portadores asmáticos de longa data ou com Fibrose Cística', 'Exposição frequente a ambientes com umidade excessiva e mofados', 'Alergia prévia conhecida ou sensibilização cutânea ao Aspergillus', 'Presença de níveis extremamente elevados de IgE sérica total', 'Histórico anterior de rinossinusite crônica recidivante'],
    red_flags: ['Bronquiectasias centrais proeminentes associadas a crises repetidas', 'Padrão tomográfico de fibrose pulmonar irreversível progressiva', 'Necessidade de doses massivas e contínuas de corticoide oral', 'Queda severa e acentuada do VEF1 basal persistente nos exames', 'Hemoptise decorrente de infecção bacteriana secundária em cavidade'],
    diferenciais: ['Asma grave residual sem etiologia fúngica evidente', 'Fibrose Cística exacerbada simples primária', 'Tuberculose pulmonar crônica bacilífera resistente', 'Síndrome de Churg-Strauss com acometimento pulmonar importante', 'Pneumonia eosinofílica crônica de início idiopático']
  },
  {
    id: 'B44.0',
    nome: 'Aspergiloma Pulmonar',
    sintomas: ['Tosse seca crônica ou intermitente com expectoração escassa', 'Hemoptise recorrente de pequena quantidade ("raias de sangue")', 'Dor torácica inespecífica do tipo pleurítica localizada na base', 'Astenia e fadiga de leve intensidade associada à doença pulmonar de base', 'Geralmente assintomático, diagnosticado em imagem de rotina'],
    fatores_risco: ['Presença de cavidade pulmonar pré-existente (sequela de tuberculose importante)', 'Histórico de sarcoidose cavitária ou abscesso pulmonar cicatrizado', 'Doença bolhosa de enfisema pulmonar antiga de lobo superior', 'Imunossupressão leve ou moderada por uso crônico de corticoide', 'Exposição inalatória continuada a esporos Aspergillus'],
    red_flags: ['Hemoptise maciça com risco iminente de asfixia e instabilidade', 'Invasão fúngica direta da parede cavitária em imunossuprimidos', 'Infecção pulmonar mista com empiema pleural secundário', 'Invasão vascular local com infarto segmentar do parênquima', 'Espessamento pleural rápido ao redor da cavidade fúngica'],
    diferenciais: ['Câncer de pulmão cavitado com sangramento ativo', 'Tuberculose pulmonar ativa bacilífera em cavidade antiga', 'Abscesso pulmonar de lobo superior de caráter crônico', 'Cisto hidático pulmonar rompido com parede residual', 'Embolia pulmonar com infarto segmentar tardio']
  },
  {
    id: 'J98.1',
    nome: 'Atelectasia Pulmonar Lobar',
    sintomas: ['Dispneia de início agudo ou piora progressiva em acamados', 'Tosse seca irritativa na tentativa de mobilizar muco profundo', 'Dor torácica vaga ipsilateral de caráter opressivo localizado', 'Diminuição acentuada ou abolição do murmúrio no lobo afetado', 'Desvio da traqueia para o lado da lesão de forma compensatória'],
    fatores_risco: ['Pós-operatório de cirurgia torácica ou abdominal de grande porte', 'Presença de secreção brônquica espessa ou tampão de muco obstrutivo', 'Pacientes em ventilação mecânica prolongada sem aspiração regular', 'Aspiração de corpo estranho por crianças ou pacientes neurológicos', 'Compressão extrínseca por tumor de brônquio de grande calibre'],
    red_flags: ['Desvio mediastinal grave com comprometimento do retorno venoso cardíaco', 'Hipoxemia extrema refratária de rápida instalação', 'Febre alta recorrente sugerindo pneumonia obstrutiva pós-atelectasia', 'Atelectasia de pulmão inteiro à imagem (opacidade completa hemotórax)', 'Sinais de estresse respiratório agudo com taquipneia sustentada'],
    diferenciais: ['Pneumonia lobar comunitária densa infecciosa', 'Derrame pleural maciço compressivo contralateral', 'Pneumotórax espontâneo completo ipsilateral', 'Agenesia ou hipoplasia pulmonar atípica congênita', 'Parietectomia residual antiga cirúrgica']
  },
  {
    id: 'J84.0',
    nome: 'Proteinose Alveolar Pulmonar',
    sintomas: ['Dispneia de progressão lenta limitante ao caminhar leve', 'Tosse seca crônica improdutiva diária de meses', 'Fadiga crônica, astenia generalizada e emagrecimento leve', 'Baqueteamento digital proeminente tardio bilateral', 'Ausculta com estertores crepitantes finos e esparsos bilaterais'],
    fatores_risco: ['Idade adulta jovem de gênero masculino predominante no adulto', 'Presença de anticorpos séricos anti-GM-CSF (forma autoimune primária)', 'Exposição inalatória ocupacional pesada a poeiras minerais ou sílica', 'Linfomas ativos, leucemias mieloides ou imunossupressão grave', 'Histórico anterior de infecções fúngicas ou micobacterianas atípicas'],
    red_flags: ['Hipoxemia severa no repouso com saturação < 80% permanente', 'Sobreinfecção bacteriana secundária grave oportunista por nocardias', 'Evolução para insuficiência respiratória terminal irreversível', 'Padrão tomográfico de pavimentação em mosaico com fibrose associada', 'Incapacidade física completa por limitação de troca gasosa central'],
    diferenciais: ['Edema pulmonar hidrostático congestivo silencioso', 'Pneumonia intersticial inespecífica descompensada', 'Pneumocistose (Pneumonia por Pneumocystis jirovecii)', 'Metástase linfangítica celular carcinomatosa bilateral', 'Pneumonite por hipersensibilidade subaguda']
  },
  {
    id: 'K44.9',
    nome: 'Hérnia Diafragmática Crônica',
    sintomas: ['Dispneia postural de decúbito e plenitude pós-prandial incômoda', 'Dor torácica de caráter retroesternal mimetizando refluxo ou angina', 'Ruídos hidroaéreos audíveis em hemitórax esquerdo ao exame físico', 'Tosse irritativa seca após refeições copiosas em decúbito', 'Surgimento eventual de azia severa persistente imotivada'],
    fatores_risco: ['Histórico de trauma tóraco-abdominal fechado ou penetrante antigo', 'Idade idosa de flacidez muscular diafragmática progressiva', 'Obesidade importante gerando aumento persistente da pressão abdominal', 'Anomalias congênitas de fechamento diafragmático remanescentes', 'Multiparidade feminina gerando flacidez de parede muscular'],
    red_flags: ['Estrangulamento agudo de alça herniada com infarto e sepse gastrointestinal', 'Instabilidade hemodinâmica por compressão mediastinal por estômago gigante', 'Melena ou hematêmese severa decorrente de úlceras na alça herniada', 'Sinais francos de obstrução intestinal aguda associada', 'Dispneia asfixiante súbita incompatível com fonação do paciente'],
    diferenciais: ['Pneumotórax hipertensivo agudo ipsilateral', 'Derrame pleural volumoso à imagem torácica', 'Edema pulmonar unilateral atípico de face anterior', 'Atelectasia lobar esérgica pós-obstrutiva', 'Doença do refluxo gastroesofágico simples grave']
  },
  {
    id: 'J92.0',
    nome: 'Placas Pleurais de Asbesto',
    sintomas: ['Geralmente assintomática, com achado incidental na imagem de tórax', 'Leve dor torácica inespecífica ou vaga tipo pontada ocasional', 'Leve limitação restritiva documentada na espirometria de rastreio', 'Ausência de estertores ou baqueteamento digital (formas não fibróticas)', 'Sensação eventual de rigidez costal discreta na flexão lateral'],
    fatores_risco: ['Exposição ocupacional crônica com amianto há mais de 15-20 anos', 'Trabalho em minas de asbesto ou na tecelagem de calhas de amianto', 'Manuseio industrial de isolantes térmicos navais antigos de amianto', 'Exposição indireta habitando proximidades de indústrias de amianto', 'Co-exposição ao tabaco de longa data persistente'],
    red_flags: ['Espessamento pleural rápido localizado com dor torácica contínua', 'Surgimento de derrame pleural exudativo recorrente persistente', 'Desenvolvimento de Massas Pleurais sugerindo Mesotelioma Pleural Ativo', 'Padrão tomográfico de calcificação espessa progressiva mediastinal', 'Associação de tosse com hemoptise indicativa de neoplasia combinada'],
    diferenciais: ['Paquipleurite sequelar (sequela de empiema ou tuberculose pleural)', 'Placas pleurais inflamatórias secundárias a traumatismo torácico', 'Sarcoma de parede torácica ou infiltração maligna tumoral secundária', 'Derrame pleural transudativo em fase inicial de resolução', 'Calcificações pleurais simples pós-exposições tuberculínicas']
  },
  {
    id: 'C45.0',
    nome: 'Mesotelioma de Pleura',
    sintomas: ['Dor torácica contínua, do tipo surda e progressivamente lancinante', 'Dispneia progressiva severa limitando tarefas repousantes', 'Perda ponderal involuntária rápida e astenia profunda de repouso', 'Tosse seca irritativa persistente não responsiva a xaropes', 'Assimetria visível à expansibilidade do hemitórax afetado'],
    fatores_risco: ['Exposição prolongada ao amianto (asbesto) comprovada ou presumida', 'Período de latência longo excedendo 30 a 40 anos pós-exposição', 'Exposição ambiental domiciliar a fibras de asbesto em regiões endêmicas', 'Radioterapia pulmonar prévia de linfomas infantis antigos', 'Mutação associada no gene BAP1 de suscetibilidade oncológica'],
    red_flags: ['Invasão local cardíaca com arritmias graves ou tamponamento cardíaco', 'Surgimento de derrame pleural hemorrágico volumoso de rápido acúmulo', 'Fístula broncopleural exposta por necrose pleural tumoral', 'Compressão da traqueia com asfixia alta obstrutiva progressiva', 'Sinais neurológicos periféricos por invasão direta de plexo braquial'],
    diferenciais: ['Metástases pleurais secundárias de adenocarcinoma pulmonar ou mama', 'Derrame pleural parapneumônico complicado crônico empiemático', 'Tuberculose pleural exsudativa prolongada', 'Sarcoma primário do pulmão ou tumores fibrosos solitários', 'Paquipleurite inflamatória benigna de longa data']
  },
  {
    id: 'J69.0',
    nome: 'Pneumonia Aspirativa',
    sintomas: ['Febre moderada surgindo rapidamente e início agudo de tosse produtiva', 'Expectoração de escarro com odor fétido característico', 'Dispneia asfixiante e sibilância após episódio agudo de deglutição', 'Dor torácica pleurítica localizada na base pulmonar direita', 'Saturação de O2 < 90% em ar acompanhada de taquipneia acentuada'],
    fatores_risco: ['Deterioração cognitiva crônica por encefalopatia ou AVC sequelar', 'Uso habitual ou agudo de drogas com rebaixamento do nível de vigília', 'Acalásia crônica ou refluxo gastroesofágico com vômitos frequentes', 'Alcoolismo crônico ou distúrbios da alimentação mecânica', 'Portadores de sonda nasogástrica recebendo dieta excessiva deitada'],
    red_flags: ['Choque séptico urinário ou pulmonar de foco aspirativo ativo', 'Instabilidade hemodinâmica, sonolência profunda residual', 'Atelectasia obstrutiva volumosa por rolha alimentar purulenta', 'Rutura cavitária para espaço pleural originando empiema em dias', 'Insuficiência respiratória demandando ressuscitação ventilatória na UTI'],
    diferenciais: ['Broncoespasmo agudo induzido por fumaça ou microaspiração', 'PNE comunitária simples sem componente aspirativo direto', 'Tromboembolismo pulmonar de início febril', 'Síndrome do desconforto do adulto (SDRA) neonatal ou adulto', 'Pneumonite química simples de Mendelson pós-anestesia']
  },
  {
    id: 'I26.0',
    nome: 'Embolia Gordurosa Pulmonar',
    sintomas: ['Dispneia súbita e asfixiante acompanhada de taquipneia sustentada', 'Petéquias localizadas em conjuntiva, pescoço e cavidades axilares', 'Confusão mental progressiva, agitação ou coma de início súbito', 'Febre moderada inexplicada nas primeiras 24-48 horas de internação', 'Taquicardia sustentada severa desproporcional ao quadro clínico'],
    fatores_risco: ['Fratura recente de ossos longos (fervilhas fêmur e tíbia)', 'Politraumatismo torácico ou pélvico de grande impacto mecânico', 'Procedimento cirúrgico de artroplastia total de quadril ou joelho', 'Lipoaspiração de grande volume volumétrica estética invasiva', 'Pancreatite crônica ou queimaduras corporais extensas de 3º grau'],
    red_flags: ['Insuficiência respiratória severa por SDRA refratária de rápida evolução', 'Hipotensão e choque obstrutivo progressivo persistente', 'Alteração sensorial aguda induzindo coma em ventilação mecânica', 'Disseminação sistêmica com falência orgânica renal concomitante', 'Instabilidade eletrocardiográfica com fibrilação atrial aguda'],
    diferenciais: ['Tromboembolismo pulmonar clássico (clot venoso)', 'Pneumotórax traumático agudo em acamado', 'Pneumonia aspirativa de rápida instalação intra-hospitalar', 'Choque hipovolêmico por hemorragia oculta retroperitoneal', 'Derrame de empiema pós-traumático inicial']
  },
  {
    id: 'J84.8',
    nome: 'Hemosiderose Pulmonar Idiopática',
    sintomas: ['Tríade clássica: hemoptises recorrentes, anemia e infiltrados pulmonares', 'Dispneia progressiva e fadiga profunda imotivada', 'Tosse seca e rouquidão moderada após crises de hemoptise', 'Palidez cutâneo-mucosa acentuada e astenia crônica limitadora', 'Febre baixa recorrente e mal-estar inespecífico nas crises'],
    fatores_risco: ['Gênero infantil ou jovem abaixo dos 20 anos preferencialmente', 'Doenças intestinais autoimunes do tipo Doença Celíaca associada', 'Histórico anterior de alergia a proteínas do leite de vaca', 'Predisposição genética de autoimunidade orgânica desconhecida', 'Exposição secundária a vapores químicos industriais tóxicos'],
    red_flags: ['Hemoptise maciça asfixiante de rápido desenvolvimento circulatório', 'Anemia ferropriva aguda microcítica severa (Hb < 6 g/dL)', 'Insuficiência respiratória hipoxêmica demandando oxigênio inalatório crônico', 'Sinais de cor pulmonale secundária decorrente do dano vascular alvéolar', 'Necessidade de múltiplas transfusões globulares subsequentes'],
    diferenciais: ['Síndrome de Goodpasture (Anticorpo Anti-MBG)', 'Granulomatose com Poliangiite (GPA / Wegener)', 'Lúpus Eritematoso Sistêmico com pneumonite lúpica hemorrágica', 'Tuberculose pulmonar ativa bacilífera recorrente', 'Paracoccidioidomicose pulmonar disseminada hética']
  },
  {
    id: 'M31.0',
    nome: 'Síndrome de Goodpasture',
    sintomas: ['Hemoptises recorrentes de pequena a grande quantidade', 'Hematúria macroscópica ou microscópica recorrente escura', 'Dispneia de início subagudo progressivo acelerado', 'Fadiga extrema, astenia, náuseas e anorexia de início recente', 'Tosse irritativa improdutiva dolorosa intermitente'],
    fatores_risco: ['Idade jovem na faixa dos 20-30 anos preferencialmente masculino', 'Histórico de tabagismo pesado ativo como disparador alveolar', 'Inalação frequente recente de solventes industriais de hidrocarbonetos', 'Infecção respiratória viral prévia recente como gatilho imune', 'Predisposição genética documentada de antígenos HLA-DR15'],
    red_flags: ['Insuficiência renal anúrica rápida (Glomerulonefrite Crescendo rápido)', 'Hemorragia alveolar difusa maciça asfixiante e letal', 'Hipotensão e choque renal descompensado sistêmico concomitante', 'Saturação de O2 < 85% persistente refratária a oxigenoterapia de UTI', 'Ureia e Creatinina plasmáticas elevadas a níveis urêmicos críticos'],
    diferenciais: ['Granulomatose com Poliangiite (GPA)', 'Poliangiite Microscópica com síndrome rim-pulmão', 'Nefrite Lúpica grave com pneumonia lúpica concomitante', 'Tuberculose disseminada com nefrite tuberculosa atípica', 'Leptospirose grave com hemorragia pulmonar (Síndrome de Weil)']
  },
  {
    id: 'M31.3',
    nome: 'Granulomatose com Poliangiite',
    sintomas: ['Rinite crostosa purulenta severa com escarro de sangue e sinusite', 'Deformidade nasal característica em "sela de montaria" por necrose', 'Hemoptise recorrente acompanhada de dispneia de esforço', 'Otite de repetição dolorosa acompanhada de perda auditiva condutiva', 'Febre indeterminada prolongada, perda de peso involuntária e mialgias'],
    fatores_risco: ['Idade entre 40 e 60 anos no gênero de homens e mulheres igualmente', 'Presença de biópsia positiva de anticorpo ANCA-c (PR3) ativo', 'Exposição inalatória profissional prolongada a poeiras minerais ou sílica', 'Predisposição genética e histórico familiar de doenças vasculíticas', 'Frequência de infecções oportunistas crônicas colonizadoras respiratórias'],
    red_flags: ['Hemorragia alveolar difusa de rápida manifestação e letalidade', 'Glomerulonefrite rapidamente progressiva cursando com oligúria severa', 'Necrose de cartilagem orbitária ou esclera ocular dolorosa', 'Acometimento laríngeo subglótico obstrutivo gerando estridor', 'Crise hipertensiva e sepse secundária ao uso imunosupressor'],
    diferenciais: ['Poliangiite Microscópica clássica', 'Síndrome de Goodpasture de anticorpo específico', 'Lúpus Eritematoso Sistêmico clássico ativo', 'Tuberculose pulmonar e laríngea combinadas', 'Câncer de pulmão de lobo superior necrosado com fístula']
  },
  {
    id: 'M30.1',
    nome: 'Síndrome de Churg-Strauss',
    sintomas: ['Asma grave asfixiante de início recente resistente à corticoideterapia', 'Rinite alérgica crônica severa associada a polipose nasal volumosa', 'Eosinofilia plasmática expressiva persistente em hemogramas', 'Mononeurite múltipla dolorosa (pé caído, dor na perna simétrica)', 'Febre prolongada inexplicada acompanhada de perda de peso marcante'],
    fatores_risco: ['Idade entre 30 e 50 anos acometendo ambos os sexos', 'Histórico antigo de asma moderada de difícil controle terapêutico', 'Presença e detecção sérica do anticorpo ANCA-p (MPO) ativo', 'Uso prolongado de modificadores de leucotrienos contraindícios', 'Presença de atopia grave sistêmica sinusal crônica de repetição'],
    red_flags: ['Acometimento miocárdico inflamatório (Miocardite grave com arritmias cardíacas)', 'Vasculite mesentérica cursando com dor abdominal aguda severa e perfuração', 'Hemorragia alveolar com hipoxemia refratária imediata', 'Acidente vascular cerebral decorrente de vasculite do SNC', 'Glomerulonefrite necrosante urinária rápida anúrica'],
    diferenciais: ['Granulomatose de Wegener clássica de anticorpo ANCA-c', 'Síndrome Hipereosinofílica de caráter idiopático', 'Asma persistente grave resistente sem componentes de vasculite', 'Aspergilose Broncopulmonar Alérgica (ABPA) de lobo superior', 'Poliarterite Nodosa clássica sem asma brônquica']
  },
  {
    id: 'D48.1',
    nome: 'Linfangioleiomiomatose Pulmonar',
    sintomas: ['Dispneia aos esforços progressiva e sibilância episódica leve', 'Pneumotórax espontâneo de repetição (frequentemente bilateral)', 'Quilotórax volumoso recorrente (líquido pleural de aspecto leitoso)', 'Tosse seca crônica e hemoptise discreta recorrente', 'Surgimento eventual de dor abdominal vaga (angiólipomas renais)'],
    fatores_risco: ['Gênero feminino em idade fértil reprodutiva (relação com estrogênio)', 'Associação com a Síndrome do Esclerose Tuberosa congênita', 'Idade entre 20 e 40 anos de idade preferencialmente', 'Uso contínuo de contraceptivos hormonais contendo estrogênios', 'Doença cística hereditária renal documentada concomitante'],
    red_flags: ['Pneumotórax hipertensivo agudo de risco vital imediato', 'Queda severa e progressiva do VEF1 para valores < 25%', 'Insuficiência respiratória crônica exigindo múltiplos drenos recíprocos', 'Angiomiolipoma renal roto com choque hemorrágico retroperitoneal', 'Quilotórax massivo bilateral gerando colapso pulmonar total restritivo'],
    diferenciais: ['Histiocitose pulmonar de células de Langerhans tabágica', 'Enfisema pulmonar centrolobular em jovem fumante', 'Asma persistente não responsiva a broncodilatadores', 'Doença pulmonar policística de caráter congênito', 'Sarcoidose nodulocística avançada de bases']
  },
  {
    id: 'I28.0',
    nome: 'Fistula Arteriovenosa Pulmonar',
    sintomas: ['Dispneia aos esforços e cianose central permanente de repouso', 'Ortodeoxia (falta de ar ao sentar que melhora na posição deitada)', 'Platipneia (queda da saturação arterial de O2 na posição vertical)', 'Hemoptise intermitente de pequena a moderada quantidade', 'Sopro contínuo ou sistólico audível na ausculta da parede torácica'],
    fatores_risco: ['Presença de Síndrome de Rendu-Osler-Weber (Telangiectasia Hemorrágica)', 'Histórico familiar de fístulas arteriovenosas ou malformações vasculares', 'Presença de fístulas em outros órgãos corporais (fígado, cérebro)', 'Idade jovem adulta de gênero masculino ou feminino', 'Presença de telangiectasias visíveis em pontas de dedos e face'],
    red_flags: ['Acidente vascular cerebral isquêmico paradoxal (microêmbolo paradoxal)', 'Abscesso cerebral piogênico recorrente decorrente de shunt sem filtro', 'Hemoptise maciça de asfixia imediata por colapso da fístula pleural', 'Insuficiência cardíaca congestiva de alto débito irreversível', 'Aneurisma fistular roto com hemotórax maciço cirúrgico'],
    diferenciais: ['Hipertensão Arterial Pulmonar shunt arterial ativo', 'Cardiopatia congênita cianótica clássica (ex: tetralogia de Fallot)', 'Tromboembolismo pulmonar crônico hipertensivo segmentar', 'Metastasização tumoral hipervascularizada pulmonar', 'Enfisema pulmonar avançado hipoxêmico simétrico']
  },
  {
    id: 'J44.0',
    nome: 'Pneumonia Bacteriana Associada a DPOC',
    sintomas: ['Piora drástica da dispneia em comorbidade obstrutiva crônica', 'Expectoração de aspecto purulento espesso de coloração marrom ou cinza', 'Infiltrado pulmonar alveolar focado nas bases pulmonares na imagem', 'Febre persistente acompanhada de mialgia, cansaço e calafrios intensos', 'Sibilância refratária de rápida descompensação funcional respiratória'],
    fatores_risco: ['Diagnóstico antigo de DPOC moderada a grave sob corticoterapia inalada', 'Histórico de tabagismo pesado ativo de longa data (>40 anos-maço)', 'Idade idosa (geralmente > 65 anos de idade)', 'Colonização crônica pulmonar por Haemophilus influenzae ou Pseudomonas', 'Uso repetitivo prévio recente de antibióticos de amplo espectro'],
    red_flags: ['Agudização crônica do CO2 com acidose respiratória (pH < 7.20)', 'Uso contínuo de musculatura respiratória acessória em repouso absoluto', 'Cianose central de lábios acompanhada de Saturação arterial < 80%', 'Instabilidade circulatória sistêmica por sepse inicial', 'Asterixe perceptível sugerindo encefalopatia hipercápnica pulmonar'],
    diferenciais: ['PNE comunitária clássica sem alteração basal de vias aéreas', 'Exacerbação pura obstrutiva de DPOC aguda', 'Tromboembolismo pulmonar de início febril atípico', 'Insuficiência cardíaca congestiva ventricular residual', 'Infarcto pulmonar antigo segmentar doloroso']
  },
  {
    id: 'J04.0',
    nome: 'Laringite Aguda Obstrutiva',
    sintomas: ['Estridor inspiratório de rápida instalação e desenvolvimento', 'Rouquidão acentuada abrupta, afonia total com dor à deglutição', 'Dispneia progressiva severa necessitando de sentar ereto para respirar', 'Tosse seca irritativa frequente em acessos noturnos', 'Ansiedade severa e sensação subjetiva de asfixia iminente'],
    fatores_risco: ['Idade na primeira infância (com predileção de 1 a 4 anos)', 'Histórico de infecção viral de vias aéreas superiores nos dias anteriores', 'Exposição domiciliar ao tabagismo materno ou paterno ativo', 'Refluxo gastroesofágico crônico regurgitativo no laringe', 'Exposição recente ao clima frio e úmido no inverno sazonal'],
    red_flags: ['Acometimento respiratório extremo com cianose labial ou facial', 'Retração esternal proeminente com batimento ativo de asa nasal', 'Sialorreia abundante com incapacidade total de deglutir saliva pura', 'Sonolência extrema reativa ou tórax silencioso auscultado', 'Ausência de melhora após corticoterapia nebulizada em emergência'],
    diferenciais: ['Epiglotite aguda purulenta bacteriana toxêmica progressiva', 'Aspiração de corpo estranho laringotraqueal de emergência', 'Traqueíte bacteriana severa purulenta produtiva', 'Abscesso perifaríngeo ou retrofaríngeo inflamatório dolente', 'Anafilaxia sistêmica com edema alérgico de laringe obstrutivo']
  },
  {
    id: 'A15.4',
    nome: 'Tuberculose Ganglionar Mediastinal',
    sintomas: ['Tosse seca crônica irritativa e persistente por compressão traqueal', 'Febre vespertina moderada intermitente de semanas', 'Sudorese noturna abundante de caráter profuso recorrente', 'Emagrecimento progressivo involuntário com astenia limitante', 'Linfonodomegalias cervicais eventuais ou hilares volumosas na imagem'],
    fatores_risco: ['Contato domiciliar estreito com paciente bacilífero ativo antigo', 'Portadores de infecção pelo vírus HIV / AIDS ou quimioterapia', 'População jovem ou escolar de regiões endêmicas sem vacina BCG', 'População com imunodeficiências primárias ou secundárias celulares', 'Disfunção crônica renal de diálise avançada'],
    red_flags: ['Síndrome de veia cava superior por compressão de gânglio gigante', 'Fístula linfonodal para árvore brônquica (Disseminação brônquica súbita)', 'Atelectasia lobar segmentar completa por compressão externa mecânica', 'Sinais de tuberculose miliar disseminada generalizada febril', 'Disseminação meníngea com confusão mental ou paralisia de pares'],
    diferenciais: ['Linfoma de Hodgkin mediastinal em paciente jovem', 'Sarcoidose pulmonar e mediastinal estádio I ou II bilateral', 'Câncer de pulmão de pequenas células com gânglios hilares gigantes', 'Histoplasmose ganglionar mediastinal fúngica crônica', 'Metástase linfática mediastinal de adenocarcinoma gástrico ou tireóide']
  },
  {
    id: 'J39.8',
    nome: 'Disfunção de Pregas Vocais',
    sintomas: ['Dispneia de início súbito acompanhada de estridor inspiratório', 'Sensação de aperto ou sufocamento focada principalmente no pescoço', 'Tosse seca irritativa espasmódica de caráter paroxístico', 'Rouquidão súbita de curta duração reversível espontaneamente', 'Saturação de O2 geralmente preservada no repouso ou nas crises'],
    fatores_risco: ['Idade adolescente ou adulta de prevalência no sexo feminino', 'Atletas de alta performance sob estresse competitivo agudo', 'Presença de transtorno de pânico ou ansiedade severa generalizada', 'Doença do refluxo gastroesofágico laringite por microaspiração', 'Exposição inalatória profissional a irritantes glóticos agudos'],
    red_flags: ['Necessidade recorrente de internações e procedimentos invasivos (ex: intubação)', 'Episódios induzidos de estridor incapacitantes diários', 'Descompensação neurológica muscular glótica de base', 'Falta de resposta clínica absoluta a altas doses de broncodilatador', 'Laringoespasmo de fechamento glótico total transitório de risco vital'],
    diferenciais: ['Asma brônquica aguda grave de obstrução persistente', 'Anafilaxia sistêmica com edema laríngeo agudo', 'Paralisia de pregas vocais unilateral unilateral orgânica', 'Estenose traqueal pós-intubação antiga de repetição', 'Traqueomalácia flácida intratorácica compressiva']
  },
  {
    id: 'J94.8',
    nome: 'Quilotórax de Caráter Traumático',
    sintomas: ['Dispneia progressiva proporcional ao acúmulo de líquido pleural', 'Dor torácica pleural ou vaga opressiva unilateral hilares', 'Ausculta com abolição do murmúrio vesicular na base afetada', 'Ausência de febre ou dor inflamatória aguda severa (forma pura)', 'Surgimento gradual de emagrecimento severo por perda lipídica pleural'],
    fatores_risco: ['Histórico de cirurgia torácica recente (ressecação de esófago, aorta)', 'Traumatismo torácico penetrante ou contuso de grande impacto mecânico', 'Cateterização de veia subclávia esquerda de risco cirúrgico acentuado', 'Presença de linfonodomegalias mediastinais gigantes compressivas', 'Presença de linfangioleiomiomatose pulmonar congênita ou adquirida'],
    red_flags: ['Líquido pleural leitoroso de alto fluxo indicando rutura do ducto torácico', 'Desnutrição energético-proteica severa por perda calórica quilosa', 'Imunodeficiência celular aguda por perda continuada de linfócitos', 'Desvio mediastinal crítico com hipotensão por tamponamento elástico', 'Infecção fúngica do líquido de assepsia pleural difícil'],
    diferenciais: ['Pseudoquilotórax crônico e fibrose pleural de longa data', 'Derrame pleural tuberculoso exsudativo opalescente', 'Derrame pleural neoplásico carcinomatoso volumoso', 'Empiema pleural fétido turvo em fase inicial ou intermediária', 'Hemotórax agudo coagulado em fase inicial']
  },
  {
    id: 'B44.8',
    nome: 'Aspergilose Pulmonar Invasiva',
    sintomas: ['Febre persistente que não responde a antibióticos de amplo espectro', 'Dor torácica tipo pleurítica difusa ou localizada na parede torácica', 'Hemoptise de volume variável (pode anteceder hemorragia grave)', 'Tosse seca ou levemente produtiva persistente dolorosa', 'Dispneia progressiva de rápida evolução em imunocomprometidos'],
    fatores_risco: ['Neutropenia grave prolongada (< 500 neutrófilos por > 10 dias)', 'Transplantados de órgãos sólidos ou medula óssea sob imunosupressão', 'Uso crônico de corticosteroides em altas doses sistêmicas', 'Doença granulomatosa crônica genética congênita ou adquirida', 'HIV / AIDS ativa com contagem de linfócitos T CD4+ abaixo de 50'],
    red_flags: ['Hemoptise volumosa fatal por invasão fúngica de artéria brônquica', 'Surgimento do sinal radiológico do halo com necrose inflamatória rápida', 'Sinais de disseminação cerebral fúngica (cefaleia, crises convulsivas)', 'Insuficiência respiratória hipoxêmica grave catastrófica', 'Invasão cardíaca miocárdica direta detectada à ecocardiografia'],
    diferenciais: ['Pneumocistose grave associada a imunodeficiência celular', 'Pneumonia bacteriana comunitária necrosante por Pseudomonas', 'Tuberculose pulmonar cavitária ativa de rápido crescimento', 'Nocardiose pulmonar oportunista disseminada', 'Metástase necrosada de câncer renal ou pulmonar']
  },
  {
    id: 'J82',
    nome: 'Pneumonia Eosinofílica Crônica',
    sintomas: ['Febre moderada prolongada acompanhada de sudorese noturna', 'Tosse seca crônica persistente irritativa diária de meses', 'Dispneia progressiva moderada aos esforços habituais', 'Perda ponderal involuntária expressiva astenia e cansaço fácil', 'Sibilância episódica difusa e estertores finos ao exame físico'],
    fatores_risco: ['Idade adulta média (geralmente entre 30 e 50 anos)', 'Histórico de asma brônquica ou rinite alérgica antigas severas', 'Presença de eosinofilia plasmática expressiva persistente sérica', 'Início agudo pós-exposições medicamentosas desencadeantes', 'Presença de infiltrados periféricos em "negativo de edema agudo"'],
    red_flags: ['Insuficiência respiratória hipoxêmica exigindo internação ventilatória', 'Recaída clínica catastrófica após redução rápida de corticoide', 'Fibrose pulmonar restritiva decorrente de inflamação eosinofílica crônica', 'Rápido definhamento por caquexia inflamatória sistêmica severa', 'Associação com miocardite eosinofílica ativa dolorosa'],
    diferenciais: ['Aspergilose Broncopulmonar Alérgica (ABPA) de bases centrais', 'Síndrome de Churg-Strauss ou outras vasculites ANCA-positivas', 'Tuberculose pulmonar crônica bacilífera simulando infiltrados', 'Pneumonia comunitária de resolução lenta em idosos', 'Sarcoidose pulmonar nodulocística bilateral estádio III']
  },
  {
    id: 'J10.0',
    nome: 'Pneumonia por Influenza Aviária',
    sintomas: ['Febre alta refratária de início súbito acompanhada de delírio', 'Tosse produtiva inicial que evolui rapidamente para escarro hemóptico', 'Dispneia severa e taquipneia de rápida evolução de horas', 'Mialgias profundas, dor torácica opressiva, cefaleia e diarreia', 'Insuficiência respiratória hipoxêmica severa instalada rapidamente'],
    fatores_risco: ['Histórico de contato direto recente com aves de granja doentes ou mortas', 'Viagem recente para áreas de surtos ativos conhecidos globais', 'Trabalho em abatedouros industriais de aves ou comércio associado', 'Portadores de comorbidades renais, cardíacas ou pulmonares', 'Ausência de higiene ou uso inadequado de EPI em manipulação aviária'],
    red_flags: ['Síndrome do desconforto respiratório agudo (SDRA) letal em 48h', 'Choque séptico refratário e disfunção orgânica de múltiplos focos', 'Hemorragia alveolar generalizada maciça necessitando de intubação', 'Sinais ecocardiográficos de miocardite fulminante infecciosa aguda', 'Rebaixamento rápido da consciência com padrão de encefalite viral'],
    diferenciais: ['Infeção severa aguda por COVID-19 em fase inflamatória', 'Pneumonia bacteriana comunitária por Staphylococcus aureus mecânica', 'Tromboembolismo pulmonar de grande porte simulando descompensação', 'PNE por aspiração ácida maciça com pneumonia aspirativa de Mendelson', 'Histoplasmose pulmonar aguda mediastinal por poeira fúngica']
  },
  {
    id: 'J98.4',
    nome: 'Enfisema Lobar Congênito',
    sintomas: ['Dispneia grave de início neonatal ou na primeira infância', 'Assemetria torácica visível à inspeção de hemitórax afetado', 'Sibilância unilateral local recorrente que não responde a aerossol', 'Cianose episódica acompanhada de choro ou esforço alimentar', 'Diminuição acentuada do murmúrio vesicular no lobo acometido'],
    fatores_risco: ['Anomalias congênitas da cartilagem brônquica remanescentes', 'Gênero masculino preferencialmente afetado no nascimento', 'Presença de malformações congênitas cardíacas associadas', 'Diagnóstico nas primeiras semanas ou meses de vida do lactente', 'Gestações complicadas ou história familiar de malformações'],
    red_flags: ['Insuficiência respiratória aguda asfixiante na infância por compressão', 'Parada cardiorrespiratória por desvio mediastinal severo colapsante', 'Pneumotórax obstrutivo decorrente de rotura de lobo distendido', 'Cianose central permanente ao repouso na alimentação', 'Necessidade imediata de lobectomia de emergência de resgate'],
    diferenciais: ['Pneumotórax hipertensivo agudo espontâneo infantil', 'Atelectasia de lobo contralateral compressiva remanescente', 'Hérnia diafragmática congênita infantil com alça intestinal em tórax', 'Cisto broncogênico mediastinal compressivo de vias aéreas', 'Aspiração aguda de corpo estranho por obstrução mecânica unilateral']
  },
  {
    id: 'J84.9',
    nome: 'Pneumonite Intersticial Inespecífica',
    sintomas: ['Dispneia de esforço insidiosa progressiva ao longo de meses', 'Tosse seca crônica persistente irritativa e contínua', 'Fadiga crônica, mal-estar sistêmico e perda ponderal leve', 'Ausculta torácica com estertores crepitantes finos bilaterais de bases', 'Dores articulares ocasionais na presença de colagenoses'],
    fatores_risco: ['Gênero feminino predominantemente afetado na faixa de 40 a 50 anos', 'Presença de Esclerodermia, Lúpus ou Síndrome de Sjögren ativa', 'Uso prolongado de medicações amiodarona, metotrexato induzida', 'Predisposição genética de autoimunidade celular orgânica', 'Exposição prévia prolongada a poeiras minerais ou orgânicas industriais'],
    red_flags: ['Progressão rápida para fibrose pulmonar irreversível generalizada', 'Exacerbação aguda da pneumonite com hipoxemia refratária de repouso', 'Hipertensão pulmonar restritiva grave decorrente da destruição capilar', 'Perda ponderal progressiva rápida mimetizando neoplasia sólida', 'Infecção oportunista oportunística decorrente de corticoterapia crônica'],
    diferenciais: ['Fibrose Pulmonar Idiopática (FPI) padrão UIP clássico', 'Pneumonite por Hipersensibilidade crônica avançada de bases', 'Sarcoidose pulmonar fibrótica avançada estádio IV', 'Artrite Reumatoide com padrão intersticial UIP pulmonar', 'Tuberculose miliar disseminada subaguda']
  },
  {
    id: 'J95.2',
    nome: 'Lesão Pulmonar Pós-Radiação',
    sintomas: ['Febre de baixa intensidade surgindo semanas pós-radioterapia', 'Dispneia progressiva aos esforços de caráter inexplicável e tosse seca', 'Dor torácica tipo pleurítica localizada na área radiada', 'Expectoração de escarro com raias de sangue esporádicas decorrentes de tosse', 'Ausculta com estertores crepitantes localizados ou áreas de murmúrio reduzido'],
    fatores_risco: ['Histórico de radioterapia torácica recente contra câncer de pulmão ou mama', 'Dose total de radiação acumulada elevada em hemitórax (> 30-40 Gy)', 'Uso concomitante ou sequencial de quimioterapia (bleomicina, doxorrubicina)', 'Idade idosa gerando menor complacência alveolar celular tecidual', 'Portador de DPOC ou Fibrose pulmonar prévia de base limitadora'],
    red_flags: ['Pneumonite actínica aguda cobrindo áreas volumosas não radiadas', 'Fibrose pulmonar actínica irreversível de rápido desenvolvimento com hipoxemia', 'Hemorragia alveolar difusa aguda decorrente de capilarite por radiação', 'Derrame pleural exudativo volumoso bilateral compressivo restritivo', 'Saturação arterial no repouso < 88% demandando suporte de oxigênio'],
    diferenciais: ['Recorrência ou progressão do câncer primário tratado na imagem', 'Pneumonia bacteriana atípica ou oportunista (ex: fungos)', 'Pneumocistose pulmonar pós-quimioterapia atípica', 'Tromboembolismo pulmonar atípico segmentar febril', 'Linfangite carcinomatosa com infiltração tumoral']
  },
  {
    id: 'J98.6',
    nome: 'Paralisia Diafragmática Bilateral',
    sintomas: ['Dispneia grave limitante ao adotar decúbito horizontal (ortopneia extrema)', 'Respiração paradoxal (abdome se retrai durante a inspiração na inspeção)', 'Fadiga sustentada crônica e sonolência diurna excessiva', 'Surgimento de cefaleia matinal recorrente e insônia reativa noturna', 'Incapacidade funcional física generalizada para tarefas físicas básicas'],
    fatores_risco: ['Histórico de trauma cervical alto ou cirurgia de mediastino invasiva', 'Esclerose Lateral Amiotrófica (ELA) ou outra doença do neurônio motor', 'Síndrome de Guillain-Barré aguda de rápida evolução periférica ascendente', 'Paralisia por infiltração tumoral bilateral direta de ambos os nervos frênicos', 'Miopatias hereditárias ou distrofias musculares de cinturas progressivas'],
    red_flags: ['Insuficiência respiratória crônica hipercápnica severa (PaCO2 > 55 mmHg)', 'Apneia noturna hiperaguda requerendo suporte de ventilação mecânica invasiva', 'Invasão infecciosa secundária facilitada (Pneumonia por atelectasia basal)', 'Hipoventilação alveolar crônica grave induzindo acidose compensada', 'Instabilidade hemodinâmica por esgotamento vagal ventricular direito'],
    diferenciais: ['Síndrome da Apneia Obstrutiva do Sono (SAOS) grave sem paralisia', 'DPOC avançada com acentuado tórax em tonel hiperinsuflado', 'Fibrose pulmonar restritiva idiopática advanced residual', 'Obesidade extrema hipoventilação alveolar (Síndrome de Pickwick)', 'Miastenia Gravis descompensada (Crise miastênica obstrutiva respiratória)']
  },
  {
    id: 'J94.2',
    nome: 'Hemotórax não Traumático',
    sintomas: ['Instalação abrupta de dor torácica aguda unilateral facular', 'Dispneia progressiva severa proporcional ao volume de sangramento pleural', 'Ausculta com total abolição do murmúrio vesicular e maciez percussiva', 'Sinais de choque hipovolêmico de rápida instalação inexplicado', 'Ansiedade severa acompanhada de sudorese fria, palidez e tontura'],
    fatores_risco: ['Uso de terapia anticoagulante oral em doses elevadas descompensadas', 'Presença de aneurisma de aorta torácica ou ramos brônquicos roto', 'Diagnóstico de endotelioma ou mesotelioma pleural hipervascularizado ativo', 'Clivagem de fístula arteriovenosa pulmonar volumosa subglandular', 'Presença de metástases pleurais volumosas necróticas ativas'],
    red_flags: ['Acúmulo maciço de sangue pleural imediato (> 1500 mL em toracocentese)', 'Instabilidade hemodinâmica severa refratária com choque hipovolêmico letal', 'Desvio mediastinal crítico comprimindo veia cava e ventrículos', 'Parada cardiorrespiratória em atividade elétrica sem pulso em UTI', 'Escape contínuo de sangue de alto fluxo (> 200 mL/h em dreno pleural)'],
    diferenciais: ['Tromboembolismo pulmonar maciço obstrutivo sem hematócrito pleural', 'Pneumotórax hipertensivo agudo de desvio unilateral sem derrame', 'Derrame pleural exsudativo inflamatório hemorrágico leve', 'Dissecção aguda de aorta de direção posterior descendente', 'Atelectasia obstrutiva volumosa por tamponamento tumoral']
  },
  {
    id: 'J98.8',
    nome: 'Traqueomalácia Adquirida',
    sintomas: ['Estridor expiratório audível em repouso persistente sem estetoscópio', 'Tosse de caráter "latido" improdutiva dolorosa paroxística', 'Dispneia progressiva aos menores esforços físicos diários', 'Sensação de bloqueio de via aérea superior ou fechamento mecânico torácico', 'Infecções respiratórias baixas purulentas recorrentes de bases'],
    fatores_risco: ['Histórico de intubação endotraqueal prolongada antiga ou traqueostomia', 'Portadores de bócio gigante de tireoide exercendo compressão de décadas', 'Histórico de cirurgias reconstrutivas da via aérea crônica', 'Traumatismo traqueal contuso antigo ou infecções necrosantes', 'Presença de policondrite recidivante ativa destrutiva cartilaginosa'],
    red_flags: ['Colapso traqueal total expiatório (> 90%) em tomografia dinâmica', 'Asfixia mecânica aguda asfixiante necessitando re-intubação imediata', 'Necessidade recorrente de internações ventilatórias de terapia intensiva', 'Impedimento absoluto de fonação continuada no ortostatismo', 'Assemetria torácica restritiva com hipoxemia persistente letargia'],
    diferenciais: ['Asma brônquica crônica severa não responsiva', 'DPOC clássico enfisematoso de grandes vias aéreas', 'Disfunção de pregas vocais simulando espasmo laríngeo', 'Estenose traqueal cicatricial fixa pós-intubação mecânica', 'Câncer de traquéia obstrutivo primário ou bócio compressivo']
  }
];
