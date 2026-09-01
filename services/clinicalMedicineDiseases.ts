import { MedicalDisease } from '../types';

export const CLINICAL_MEDICINE_DISEASES: Omit<MedicalDisease, 'achados_exames' | 'criterios_diagnosticos'>[] = [
  {
    id: 'E11',
    nome: 'Diabetes Mellitus Tipo 2',
    sintomas: ['Poliúria compensadora', 'Polidipsia constante', 'Polifagia com perda ponderal atípica', 'Visão turva ou embaçamento visual', 'Fadiga crônica generalizada', 'Parestesias em bota/luva'],
    fatores_risco: ['Obesidade visceral', 'Sedentarismo', 'Histórico familiar de DM2', 'Idade superior a 45 anos', 'Síndrome Metabólica', 'Hipertensão Arterial'],
    red_flags: ['Hálito cetônico', 'Respiração de Kussmaul', 'Desidratação grave com letargia', 'Glicemia de jejum > 600 mg/dL (EHH)', 'Confusão mental progressiva'],
    diferenciais: ['Diabetes Mellitus Tipo 1', 'Diabetes Insipidus', 'Diabetes LADA', 'Hipertiroidismo', 'Diabetes Esteroidal']
  },
  {
    id: 'E10.9',
    nome: 'Diabetes Mellitus Tipo 1',
    sintomas: ['Poliúria intensa de início súbito', 'Polidipsia grave', 'Emagrecimento rápido inexplicável', 'Fome excessiva', 'Cansaço extremo', 'Câimbras musculares recorrentes'],
    fatores_risco: ['Predisposição genética HLA', 'Histórico familiar de autoimunidade', 'Infecções virais prévias (Enterovírus)', 'Origem étnica caucasiana'],
    red_flags: ['Cetoacidose diabética ativa', 'Náuseas e vômitos refratários', 'Dor abdominal aguda severa', 'Desidratação com turgor diminuído', 'Torpor ou coma'],
    diferenciais: ['Diabetes Mellitus Tipo 2', 'Diabetes Monogênico (MODY)', 'Insuficiência exócrina pancreática', 'Hipertiroidismo agudo']
  },
  {
    id: 'E03.9',
    nome: 'Hipotireoidismo Subclínico',
    sintomas: ['Fadiga leve ao esforço', 'Pele discretamente seca', 'Labilidade emocional', 'Leve intolerância ao frio', 'Obstipação intestinal sutil', 'Dificuldade de concentração'],
    fatores_risco: ['Sexo feminino', 'Idade avançada maior de 60 anos', 'Histórico familiar de tireoidite', 'Uso prévio de amiodarona ou lítio', 'Presença de autoanticorpos anti-TPO'],
    red_flags: ['Progressão rápida para mixedema', 'Derrames cavitários', 'TSH > 20 mIU/L persistente', 'Bradicardia extrema inexplicável'],
    diferenciais: ['Depressão reativa', 'Fadiga crônica de repouso', 'Anemia ferropriva crônica', 'Hipotireoidismo clínico franco']
  },
  {
    id: 'E05.9',
    nome: 'Hipertiroidismo (Doença de Graves)',
    sintomas: ['Taquicardia ou palpitações no peito', 'Tremores finos de extremidades', 'Insônia e irritabilidade severa', 'Perda de peso com apetite preservado', 'Exoftalmia (olhos arregalados)', 'Intolerância severa ao calor'],
    fatores_risco: ['Idade entre 20-40 anos', 'Sexo feminino', 'Genética de doenças autoimunes', 'Estresse emocional severo recente', 'Tabagismo ativo'],
    red_flags: ['Tempestade tireotóxica activa', 'Hipertermia severa', 'Delirium ou psicose de início súbito', 'Fibrilação atrial de alta resposta ventricular', 'Insuficiência cardíaca de alto débito'],
    diferenciais: ['Transtorno de ansiedade generalizada', 'Feocromocitoma', 'Abuso de estimulantes orais', 'Tireoidite subaguda (De Quervain)', 'Adenoma tóxico único']
  },
  {
    id: 'E06.3',
    nome: 'Tireoidite Crônica de Hashimoto',
    sintomas: ['Bócio indolor liso ou nodular', 'Fadiga progressiva', 'Ganho de peso moderado', 'Pele seca e fria', 'Parestesias por túnel do carpo', 'Cabelos finos com queda aumentada', 'Unhas frágeis'],
    fatores_risco: ['Anticorpo anti-TPO positivo', 'Sexo feminino', 'História familiar de autoimunidade', 'Consumo excessivo de iodo', 'Exposição prévia a radiação cervical'],
    red_flags: ['Encapsulamento por linfoma de tireoide', 'Coma mixedematoso agudo', 'Rouquidão súbita compressiva', 'Disfagia obstrutiva por bócio gigante'],
    diferenciais: ['Hipotireoidismo induzido por drogas', 'Bócio colide endêmico', 'Câncer de tireoide diferenciado', 'Síndrome de fadiga crônica']
  },
  {
    id: 'E66.9',
    nome: 'Obesidade Humana Grau I ou II',
    sintomas: ['Dispneia aos esforços moderados', 'Falta de ar noturna ao deitar', 'Dores articulares mecânicas', 'Apneia e roncos frequentes', 'Intolerância ao calor e sudorese aumentada', 'Acantose nigricans cervical'],
    fatores_risco: ['Dieta hipercalórica densa', 'Sedentarismo absoluto', 'História familiar de obesidade', 'Distúrbios do sono recorrentes', 'Ansiedade e compulsão alimentar', 'Uso de medicações que aumentam peso'],
    red_flags: ['Apneia obstrutiva grave com hipoxemia', 'Dor torácica de esforço associada', 'Insuficiência venosa profunda com TVP', 'Hipertensão intracraniana idiopática'],
    diferenciais: ['Síndrome de Cushing', 'Hipotireoidismo clínico severo', 'Retenção hídrica por síndrome nefrótica', 'Asma bronquítica mal controlada']
  },
  {
    id: 'E88.9',
    nome: 'Síndrome Metabólica',
    sintomas: ['Circunferência abdominal aumentada', 'Cansaço pós-prandial profundo', 'Hipertensão arterial limiar', 'Aumento dos níveis pressóricos capilares', 'Xantelasmas ou depósitos de gordura'],
    fatores_risco: ['Obesidade central persistente', 'Resistência à insulina demonstrada', 'Inatividade física continuada', 'Dieta rica em açúcares refinados', 'Predisposição genética familiar'],
    red_flags: ['Glicemia de jejum elevada com microalbuminúria', 'Eventos coronarianos prévios', 'Sopro em carótidas sugestivo de placa', 'Déficits cognitivos transitórios'],
    diferenciais: ['Síndrome de Cushing típica', 'Transtorno endócrino ovariano policístico (SOP)', 'Lipodistrofia congênita', 'Esteatose hepática isolada']
  },
  {
    id: 'E78.2',
    nome: 'Dislipidemia Mista',
    sintomas: ['Geralmente totalmente silenciosa', 'Xantomas eruptivos cutâneos (casos graves)', 'Dor em panturrilhas ao caminhar', 'Cansaço atípico inexplicável', 'Tonturas leves sem causa neurológica'],
    fatores_risco: ['Sedentarismo e dieta hiperlipídica', 'Consumo exagerado de álcool', 'Diabetes Mellitus insulinorresistente', 'Hipotireoidismo não controlado', 'Mutação familiar de apolipoproteínas'],
    red_flags: ['Placas ateroscleróticas ulceradas em exames vascular', 'Dor torácica anginosa ao esforço', 'Triglicerídeos > 1000 mg/dL (risco de pancreatite)', 'Xantelasma palpebral bilateral denso'],
    diferenciais: ['Hipercolesterolemia familiar isolada', 'Colestase crônica biliar', 'Síndrome nefrótica glomerular', 'Consumo abusivo recente de gordura saturada']
  },
  {
    id: 'E78.0',
    nome: 'Hipercolesterolemia Pura',
    sintomas: ['Assintomática com exames laboratoriais alterados', 'Surgimento de arco senil corneal precoce menos de 45 anos', 'Xantomas tendinosos de Aquiles', 'Xantomas palpebrais'],
    fatores_risco: ['Genética autossômica dominante LDLR', 'Dieta farta em gordura trans', 'Sedentarismo', 'Uso de ciclosporina ou diuréticos de alça', 'Menopausa precoce sem reposição'],
    red_flags: ['Níveis de LDL-c > 190 mg/dL persistente', 'Doença arterial obstrutiva periférica precoce', 'Infarto agudo do miocárdio em idade jovem (< 40 anos)', 'Histórico familiar de morte cardiovascular prematura'],
    diferenciais: ['Hipotireoidismo isolado', 'Colestase crônica intra-hepática', 'Síndrome nefrótica primária', 'Hipercolesterolemia poligênica leve']
  },
  {
    id: 'E78.1',
    nome: 'Hipertrigliceridemia Pura',
    sintomas: ['Geralmente silenciosa de evolução laboratorial', 'Xantomas eruptivos maculares amarelos', 'Hepatomegalia dolorosa por gordura infiltrada', 'Dor abdominal epigástrica transitória', 'Náuseas ocasionais pós-refeição gordurosa'],
    fatores_risco: ['Consumo acentuado de carboidratos refinados', 'Etilismo pesado crônico', 'Diabetes mellitus descontrolado', 'Obesidade e gordura visceral', 'Uso de antirretrovirais ou estrógenos orais'],
    red_flags: ['Triglicerídeos séricos > 500 mg/dL com dor abdominal contínua', 'Sinais clássicos de pancreatite aguda ativa', 'Lactescência do soro sanguíneo no tubo', 'Isquemia esplênica ou mesentérica aguda'],
    diferenciais: ['Dislipidemia mista secundária', 'Insuficiência renal dialítica', 'Consumo alcoólico agudo exacerbado', 'Gravidez avançada fisiológica']
  },
  {
    id: 'M10.0',
    nome: 'Gota Úrica Aguda',
    sintomas: ['Monoartrite com dor articular excruciante', 'Podagra (dor intensa no hálux do pé esquerdo/direito)', 'Eritema, calor e edema na articulação afetada', 'Dificuldade para deambular', 'Descamação cutânea local pós-crise'],
    fatores_risco: ['Consumo de carne vermelha e mariscos', 'Adição habitual de cerveja e bebidas destiladas', 'Uso continuado de diurético tiazídico', 'Doença renal crônica com uremia', 'Sexo masculino', 'Síndrome de lise tumoral'],
    red_flags: ['Febre alta associada a tremores (sugere artrite séptica)', 'Nefrolitíase por ácido úrico com anúria', 'Tofos gotosos múltiplos ulcerando', 'Perda rápida de função renal associada'],
    diferenciais: ['Artrite séptica bacteriana aguda', 'Pseudogota (pirofosfato de cálcio)', 'Celulite ou erisipela local', 'Traumatismo articular oculto', 'Artrite reativa infecciosa']
  },
  {
    id: 'M81.9',
    nome: 'Osteoporose Senil ou Pós-Menopausa',
    sintomas: ['Silenciosa até a ocorrência de fratura', 'Redução progressiva da estatura física', 'Cifose dorsal exuberante (corcunda)', 'Dor lombar crônica secundária a microfraturas vertebrais'],
    fatores_risco: ['Sexo feminino na menopausa', 'Idade avançada maior do que 65 anos', 'Etnia branca ou asiática', 'Tabagismo ativo e etilismo', 'Uso crônico de corticoide (> 3 meses)', 'Baixo peso ou IMC menor do que 19'],
    red_flags: ['Fratura patológica por queda da própria altura', 'Dor súbita lombar severa com colapso vertebral', 'Déficits neurológicos por compressão medular pós-fratura vertebral', 'Fratura de colo de fêmur espontânea'],
    diferenciais: ['Mieloma múltiplo', 'Metástase óssea lítica de próstata/mama', 'Osteomalácia por deficiência grave de Vitamina D', 'Hiperparatireoidismo primário severo']
  },
  {
    id: 'E55.9',
    nome: 'Deficiência Grave de Vitamina D',
    sintomas: ['Dores ósseas difusas e articulares', 'Fraqueza muscular proximal nas coxas', 'Fadiga e desânimo persistentes', 'Dificuldade para subir escadas', 'Espasmos musculares ou parestesias periféricas'],
    fatores_risco: ['Baixa exposição solar habitual diária', 'Idosos institucionalizados', 'Síndromes de má-absorção intestinal', 'Uso crônico de anticonvulsivantes', 'Insuficiência renal crônica', 'Trabalho contínuo em escritório (indoor)'],
    red_flags: ['Níveis de 25(OH)D < 10 ng/mL associados', 'Fraturas patológicas por microtraumatismos', 'Tetania por hipocalcemia aguda', 'Osteomalácia demonstrada em exames histológicos'],
    diferenciais: ['Fibromialgia primária', 'Polimialgia reumática', 'Síndrome de fadiga crônica', 'Hipotireoidismo clínico severo']
  },
  {
    id: 'E27.1',
    nome: 'Insuficiência Adrenal Crônica (Doença de Addison)',
    sintomas: ['Fadiga física e astenia profunda progressivas', 'Hiperpigmentação cutâneo-mucosa (pele "bronzeada")', 'Hipotensão postural com tonturas ao se levantar', 'Perda de peso acentuada e anorexia', 'Desejo excessivo de sal', 'Náuseas e diarreias intermitentes'],
    fatores_risco: ['Adrenalite autoimune preexistente', 'Histórico de Tuberculose peritoneal ou adrenal', 'Infecção por HIV avançada', 'Histórico familiar de autoimunidade glandular', 'Retirada abrupta de terapia prolongada de corticoide'],
    red_flags: ['Crise adrenal aguda catastrófica', 'Choque refratário a vasopressores', 'Hiponatremia grave associada a hipercalemia severa', 'Hipoglicemia de jejum com torpor e convulsões'],
    diferenciais: ['Transtorno depressivo maior grave', 'Neoplasia oculta consumativa', 'Disfunção hipofisária central', 'Anorexia nervosa', 'Gastroenterite crônica funcional']
  },
  {
    id: 'K21.9',
    nome: 'Doença do Refluxo Gastroesofágico (DRGE)',
    sintomas: ['Pirose retroesternal (queimação no peito)', 'Regurgitação ácida de repetição', 'Tosse seca noturna persistente', 'Disfonia ou rouquidão matinal', 'Globus faríngeo (sensação de bola na garganta)', 'Dor torácica atípica que simula angina'],
    fatores_risco: ['Obesidade e excesso de gordura visceral', 'Presença de hérnia de hiato esofágico', 'Gravidez ativa de segundo ou terceiro trimestre', 'Tabagismo ativo', 'Refeições volumosas logo antes do deitar', 'Consumo excessivo de café, álcool ou chocolate'],
    red_flags: ['Disfagia progressiva a alimentos sólidos', 'Odinofagia severa (dor ao engolir)', 'Perda de peso involuntária marcante', 'Hemorragia digestiva alta manifestada com melena', 'Anemia ferropriva refratária inexplicável'],
    diferenciais: ['Esofagite eosinofílica ativa', 'Angina estável coronariana', 'Acalásia de esófago distal', 'Gastrite e úlcera duodenal', 'Câncer de esôfago obstrutivo']
  },
  {
    id: 'K29.0',
    nome: 'Gastrite Aguda',
    sintomas: ['Dor ou desconforto em epigástrio agudo', 'Náuseas frequentes e vômitos ocasionais', 'Plenitude pós-prandial precoce', 'Eructações recorrentes', 'Hipoacidez ou queimação retroesternal leve'],
    fatores_risco: ['Uso frequente de anti-inflamatórios (AINEs)', 'Ingestão recente excessiva de álcool', 'Estresse físico severo (sepse, grandes queimados)', 'Ingestão de alimentos muito condimentados ou contaminados', 'Infecção aguda por H. pylori'],
    red_flags: ['Hematêmese (vômito com sangue vivo ou borra de café)', 'Presença de melena (fezes pretas de odor fétido)', 'Anemia microcítica inexplicável profunda', 'Dor epigástrica súbita intensa em tábua (sugere perfuração)'],
    diferenciais: ['Úlcera péptica perfurada ou sangrante', 'Pancreatite aguda de andar superior', 'Infarto agudo do miocárdio posterior/inferior', 'Cólica biliar por colelitíase', 'Doença do refluxo gastroesofágico']
  },
  {
    id: 'K29.5',
    nome: 'Gastrite Crônica por H. pylori',
    sintomas: ['Dispepsia persistente com desconforto epigástrico', 'Sensação de empachamento pós-prandial incômodo', 'Náuseas matinais recorrentes', 'Eructações excessivas', 'Perda de apetite discreta', 'Hálito de odor desagradável'],
    fatores_risco: ['Infeção de longo curso por Helicobacter pylori', 'Baixas condições de saneamento básico residencial', 'Dieta farta em embutidos e sal refinado', 'Histórico familiar de patologia péptica'],
    red_flags: ['Sinais clínicos de metaplasia intestinal e risco de adenocarcinoma', 'Hemorragia digestiva persistente subaquosa', 'Sinal de Sister Mary Joseph positivo sugerindo malignidade', 'Perda de peso maciça em doente com dispepsia crônica'],
    diferenciais: ['Dispepsia funcional idiopática', 'Doença celíaca ativa', 'Parasitose intestinal crônica (Giardíase)', 'Câncer gástrico em fase inicial']
  },
  {
    id: 'K27.9',
    nome: 'Úlcera Péptica Ativa Gastroduodenal',
    sintomas: ['Dor epigástrica em queimação ("dor de estômago")', 'Melhora clássica da dor com a alimentação (úlcera duodenal)', 'Piora da dor epigástrica logo após comer (úlcera gástrica)', 'Despertar noturno com dor em andar superior', 'Náuseas e plenitude dolorosa'],
    fatores_risco: ['Infecção crônica demonstrada por H. pylori', 'Uso repetido prolongado de AINEs', 'Tabagismo ativo persistente', 'Idade avançada maior do que 60 anos', 'Uso concomitante de corticoides ou anticoagulantes'],
    red_flags: ['Abdome em tábua imóvel com Blumberg generalizado (perfuração)', 'Vômito e hematêmese maciça incoercível', 'Instabilidade hemodinâmica por sangramento ativo', 'Obstrução de saída gástrica com vômitos alimentares tardios'],
    diferenciais: ['Pancreatite crônica reagudizada', 'Câncer de estômago avançado', 'Angina abdominal (isquemia mesentérica)', 'Dissecação de aorta abdominal', 'Cólica biliar']
  },
  {
    id: 'K58.9',
    nome: 'Síndrome do Intestino Irritável (SII)',
    sintomas: ['Dor abdominal em cólica aliviada após defecação', 'Alternância crônica entre diarreia e constipação', 'Distensão abdominal gasosa visível e flatulências', 'Presença eventual de muco nas fezes', 'Sensação de evacuação incompleta', 'Urgência evacuatória matinal'],
    fatores_risco: ['Doenças psiquiátricas ativas (TAG, depressão, pânico)', 'Sexo feminino (relação de 2 para 1)', 'Idade inferior a 45 anos', 'Gastroenterite infecciosa prévia (SII pós-infecciosa)', 'Histórico de abuso físico ou emocional precoce'],
    red_flags: ['Sintomas iniciando após os 50 anos de idade', 'Sangramento retal visível indolor', 'Perda de peso não intencional progressiva', 'Febre refratária de origem obscura', 'Sintomas diarreicos despertando o doente à noite'],
    diferenciais: ['Doença celíaca clássica ou atípica', 'Doença Inflamatória Pélvica', 'Câncer colorretal obstrutivo precoce', 'Intolerância à lactose grave', 'Hipertiroidismo']
  },
  {
    id: 'K51.9',
    nome: 'Retocolite Ulcerativa (RCU)',
    sintomas: ['Diarreia crônica sanguinolenta volumosa (> 4 semanas)', 'Tenesmo retal doloroso intermitente', 'Cólicas intensas no quadrante inferior esquerdo', 'Febre baixa recorrente e calafrios', 'Fadiga extrema por anemia grave', 'Artralgia migratória periférica associada'],
    fatores_risco: ['Idade entre 15-30 anos', 'Genética de suscetibilidade em parentes de primeiro grau', 'Não tabagista (tabagismo tem efeito de paradoxal proteção)', 'Uso frequente de anti-inflamatórios desencadeando crises'],
    red_flags: ['Megacólon tóxico com distensão e peritonite', 'Sangramento retal volumoso incoercível com anemia aguda', 'Idade avançada com colite grave', 'Sinais sistêmicos de choque séptico biliar'],
    diferenciais: ['Doença de Crohn de cólon', 'Colite infecciosa ativa por Clostridioides difficile', 'Colite isquêmica aguda', 'Diverticulite aguda complicada', 'Amebíase intestinal grave']
  },
  {
    id: 'K50.9',
    nome: 'Doença de Crohn',
    sintomas: ['Diarreia crônica sem sangue visível (frequentemente pastosa)', 'Dor ou cólica persistente em quadrante inferior direito', 'Perda de peso involuntária importante', 'Cansaço crônico e fadiga', 'Fístulas perinatais drenando secreção purulenta', 'Febre recorrente de semanas'],
    fatores_risco: ['Faixa etária jovem (15-35 anos)', 'Tabagismo ativo muito importante (piora as crises)', 'Histórico familiar de DII autoimune', 'Uso abusivo de AINEs', 'Dieta de padrão ocidental ultraprocessada'],
    red_flags: ['Progressiva obstrução intestinal por estenoses fibróticas', 'Artrite periférica severa deformante e uveíte ativa', 'Perfuração intestinal contida com abscesso intra-abdominal', 'Megacólon tóxico com choque séptico'],
    diferenciais: ['Tuberculose intestinal mímica', 'Apendicite aguda subaguda', 'Retocolite ulcerativa', 'Síndrome do intestino irritável', 'Doença celíaca com diarreia crônica']
  },
  {
    id: 'K80.8',
    nome: 'Colelitíase Sintomática',
    sintomas: ['Cólica biliar (dor lancinante em hipocôndrio direito)', 'Irradiação clássica da dor para o dorso e ombro direito', 'Náuseas e vômitos pós-alimentares persistentes', 'Eructações difíceis e plenitude epigástrica dolorosa', 'Surtos álgicos desencadeados por refeições de alto teor lipídico'],
    fatores_risco: ['Sexo feminino', 'Idade maior do que 40 anos ("4Fs": Female, Forty, Fat, Fertile)', 'Obesidade ou oscilações rápidas de peso', 'Uso recorrente de anticoncepcionais orais', 'Gestação ativa ou multiparidade', 'Diabetes mellitus'],
    red_flags: ['Icterícia marcante com colúria e acolia fecal (coledocolitíase)', 'Triáde de Charcot (Dor + Febre + Icterícia: Colangite)', 'Febre alta em calafrios trementes sugerindo colecistite aguda', 'Distensão de alças com vômitos fecaloides de íleo biliar'],
    diferenciais: ['Úlcera péptica ativa descompensada', 'Pancreatite aguda biliar', 'Apendicite aguda de localização atípica sub-hepática', 'Infarto agudo do miocárdio de parede inferior', 'Hepatite aguda inflamatória']
  },
  {
    id: 'K90.0',
    nome: 'Doença Celíaca',
    sintomas: ['Diarreia crônica com fezes gordurosas e flutuantes (esteatorreia)', 'Distensão abdominal crônica acentuada', 'Flatulência fétida volumosa', 'Perda de peso lenta progressiva acompanhada de desnutrição', 'Dermatite herpetiforme pruriginosa típica em cotovelos/joelhos', 'Aftas orais recorrentes dolorosas'],
    fatores_risco: ['Presença de genótipos HLA-DQ2/DQ8', 'Presença de outras doenças autoimunes (DM1, Hashimoto)', 'Síndrome de Down ou Turner', 'Historial familiar de intolerância extrema ao glúten'],
    red_flags: ['Desnutrição extrema com anasarca hipoalbuminêmica', 'Desenvolvimento de linfoma de células T associado a enteropatia', 'Crise celíaca com acidose e distúrbios eletrolíticos agudos', 'Anemia refratária de megacólica a ferro'],
    diferenciais: ['Síndrome do intestino irritável', 'Intolerância secundária grave à lactose', 'Pancreatite crônica com insuficiência exócrina', 'Supercrescimento bacteriano no intestino delgado (SIBO)', 'Doença de Crohn de delgado']
  },
  {
    id: 'K70.3',
    nome: 'Cirrose Hepática Alcoólica descompensada',
    sintomas: ['Icterícia cutâneo-mucosa com prurido generalizado', 'Ascite progressiva (acúmulo de líquido no abdome)', 'Edema de MMII mole e simétrico bilateral', 'Eritema palmar simétrico e ginecomastia', 'Surgimento de telangiectasias em "aranha" (spider angiomas)', 'Flapping ou asterixe'],
    fatores_risco: ['Consumo de etanol > 80g/dia por mais de 10 anos', 'Historial consolidado de alcoolismo pesado', 'Co-infecção concomitante por Hepatite B ou C', 'Presença de polimorfismo genético PNPLA3'],
    red_flags: ['Hemorragia digestiva maciça por rotura de varizes esofágicas', 'Sinal de encefalopatia hepática progressiva (confusão, sonolência)', 'Síndrome hepatorrenal com rápida anúria e elevação de creatinina', 'Peritonite bacteriana espontânea com Blumberg difuso leve'],
    diferenciais: ['Sarcoidose hepática progressiva', 'Cirrose biliar primária', 'Insuficiência cardíaca direita congestiva crônica', 'Hepatite autoimune descompensada', 'Esquistossomose portal pura']
  },
  {
    id: 'K76.0',
    nome: 'Esteatose Hepática Não Alcoólica (EHNA)',
    sintomas: ['Totalmente assintomática na sua maioria', 'Dor surda leve episódica em hipocôndrio direito', 'Fadiga crônica de repouso leve', 'Plenitude em flanco direito após alimentação curta'],
    fatores_risco: ['Obesidade visceral o abdominal', 'Resistência à insulina e Diabetes Mellitus Tipo 2', 'Sedentarismo de longo prazo', 'Dieta farta em frutose e produtos refinados', 'Dislipidemia e transaminases persistentemente limítrofes'],
    red_flags: ['Progressão rápida para cirrose de esteato-hepatite (NASH)', 'Elevação sustentada e progressiva de ALT/AST maior do que 3 vezes o limite normal', 'Esplenomegalia em exames de imagem sugerindo início de hipertensão portal', 'Nódulos hepáticos suspeitos em ultrassom (risco de CHC)'],
    diferenciais: ['Hepatite viral autoimune crónica', 'Doença de Wilson em doente jovem', 'Doença hepática alcoólica não referida', 'Hepatotoxicidade por ervas e chás ditoxificados']
  },
  {
    id: 'A08.4',
    nome: 'Gastroenterite Viral Aguda',
    sintomas: ['Diarreia aquosa explosiva sem sangue visível', 'Vômitos frequentes incoercíveis', 'Febre de baixa intensidade a moderada', 'Náuseas severas e dor em cólica difusa', 'Calafrios e mialgia generalizada de curta duração'],
    fatores_risco: ['Contato próximo recente com pessoas doentes', 'Ingestão de água ou alimentos contaminados em restaurante', 'Crianças menores do que 5 anos (Rotavírus)', 'Uso ausente de hábitos sanitários básicos', 'Temporadas escolares ou creches fechadas'],
    red_flags: ['Sinais visíveis obstétricos de desidratação grave', 'Hipotensão arterial postural de repouso', 'Anúria absoluta de 12 horas seguidas', 'Sonolência e letargia marcante', 'Hipocalemia grave com fraqueza muscular nas pernas'],
    diferenciais: ['Gastroenterite bacteriana invasiva (Shigella, Salmonella)', 'Intoxicação por toxina estafilocócica alimentar', 'Apendicite aguda de início simulado', 'Doença inflamatória intestinal descompensante']
  },
  {
    id: 'K57.9',
    nome: 'Doença Diverticular do Cólon',
    sintomas: ['Geralmente totalmente assintomática', 'Constipação intestinal crônica penosa', 'Flatulências e distensão gasosa dolorosa de andar inferior', 'Evacuação fragmentada de fezes endurecidas', 'Desconforto doloroso vago em fossa ilíaca esquerda'],
    fatores_risco: ['Dieta extremamente pobre em fibras alimentares', 'Sedentarismo e obesidade', 'Idade avançada maior do que 65 anos', 'Constipação intestinal crônica recalcitrante', 'Uso excessivo crônico de laxantes irritantes'],
    red_flags: ['Diverticulite aguda ativa (dor forte, febre, Blumberg)', 'Hemorragia digestiva baixa volumosa súbita indolor', 'Fezes de odor fétido acompanhadas de ar úrico (fístula colovesical)', 'Ar de pneumoperitônio livre abdominal, abdome agudo obstrutivo'],
    diferenciais: ['Câncer colorretal estenosante', 'Síndrome do intestino irritável', 'Diverticulite de Meckel', 'Doença inflamatória pélvica', 'Colite isquêmica vascular do idoso']
  },
  {
    id: 'K86.1',
    nome: 'Pancreatite Crônica',
    sintomas: ['Dor abdominal epigástrica intermitente irradiada para o dorso', 'Esteatorreia crônica fezes brilhantes fétidas', 'Emagrecimento consumativo desproporcional', 'Diabetes Mellitus secundário refratário instável', 'Flatulência e dispepsia importantes'],
    fatores_risco: ['Etilismo pesado de longa duração', 'Tabagismo ativo muito prolongado', 'Mutações genéticas autossômicas no gene PRSS1/SPINK1', 'Pancreatite aguda severa recidivante anterior', 'Desnutrição aguda crônica infância'],
    red_flags: ['Caquexia extrema com anasarca nutricional severa', 'Surgimento de icterícia por obstrução de colédoco distal por fibrose do pâncreas', 'Trombose de veia esplênica com varizes gástricas hemorrágicas', 'Pseudoaneurisma de artéria esplênica rompendo'],
    diferenciais: ['Adenocarcinoma de pâncreas exócrino', 'Doença celíaca do adulto', 'Úlcera péptica gástrica penetrante', 'Isquemia mesentérica crônica']
  },
  {
    id: 'B15.9',
    nome: 'Hepatite A Aguda',
    sintomas: ['Icterícia de início súbito cutâneo-mucosa', 'Febre moderada e dor de cabeça irritativa', 'Náuseas acentuadas, vômitos e anorexia marcante', 'Colúria (urina da cor de Coca-Cola)', 'Acolia fecal (fezes esbranquiçadas)', 'Dor em quadrante superior direito'],
    fatores_risco: ['Ausência de vacinação protetora infantil', 'Ingestão de ostras ou frutos do mar malcozidos em área endêmica', 'Contato com águas de enchente ou esgoto doméstico', 'Viagem recente para região hiperendêmica de saneamento precário'],
    red_flags: ['Hepatite Fulminante aguda com INR > 2.0', 'Encefalopatia hepática precoce', 'Sangramento espontâneo gengival ou epistaxe', 'Renovação demorada de prostrabilidade profunda sugerindo letargia'],
    diferenciais: ['Hepatite B ou C agudas', 'Leptospirose grave (Síndrome de Weil)', 'Hepatite autoimune em crise', 'Abscesso hepático piogênico biliar', 'Coledocolitíase obstrutiva calculosa']
  },
  {
    id: 'B18.1',
    nome: 'Hepatite B Crônica',
    sintomas: ['Assintomática em mais de 80% do tempo de curso', 'Fadiga crônica discreta ao entardecer', 'Dor muscular esporádica e artralgia leve', 'Múltiplas nodulações eritematosas dolorosas de periarterite nodosa', 'Desconforto sutil em hipocôndrio direito'],
    fatores_risco: ['Transmissão vertical materna durante o parto', 'Uso compartilhado de agulhas e seringas endovenosas', 'Relações sexuais desprotegidas multifatoriais', 'Procedimentos de tatuagem com agulha não estéril', 'Profissional de saúde exposto a material biológico'],
    red_flags: ['Surgimento novo de ascite ou icterícia (Cirrose avançada/descompensação)', 'Alfa-fetoproteína elevada com nódulo em fígado (sugere CHC)', 'Glomerulonefrite membranosa ativa com síndrome nefrótica grave'],
    diferenciais: ['Hepatite C crônica', 'Hepatite alcoólica de longa data', 'Esteatohepatite não alcoólica (NASH)', 'Hemocromatose por excesso de ferro', 'Insuficiência renal em diálise']
  },
  {
    id: 'B18.2',
    nome: 'Hepatite C Crônica',
    sintomas: ['Evolução longa e insidiosa assintomática', 'Fadiga crônica de repouso inexplicada', 'Artrite crônica simétrica leve com fator reumatoide positivo', 'Púrpura palpável em pernas por crioglobulinemia', 'Urticária recorrente e glomerulonefrite MPGN', 'Prurido cutâneo inexplicado', 'Liquen plano oral'],
    fatores_risco: ['Histórico de transfusão de sangue antes de 1993', 'Uso compartilhado de seringas de drogas endovenosas', 'Procedimentos cirúrgicos ou odontológicos antigos clandestinos', 'Profissional de saúde sem EPI com perfurocortantes'],
    red_flags: ['Carcinoma hepatocelular de crescimento rápido', 'Sinais francos de cirrose descompensada ativa', 'Plaquetopenia severa < 50.000 indicando hipertensão de baço', 'Insuficiência renal por nefropatia de crioglobulinas'],
    diferenciais: ['Lupus Eritematoso Sistêmico clássico', 'Franqueza de Hepatite B crônica', 'Artrite reumatoide de início tardio', 'Cirrose biliar primária', 'Hepatite medicamentosa']
  },
  {
    id: 'K75.4',
    nome: 'Hepatite Autoimune',
    sintomas: ['Icterícia flutuante cutâneo-mucosa recorrente', 'Astenia severa constante imotivada', 'Dores articulares migratórias de pequenas articulações', 'Amenorreia secundária inexplicable em mulheres jovens', 'Febre intermitente de baixa intensidade', 'Surgimento de acne e hirsutismo cutâneos'],
    fatores_risco: ['Sexo feminino na idade reprodutiva', 'Histórico pessoal de tireoidite autoimune, vitiligo ou celíaca', 'Uso recente de drogas herbais estimulantes de imunidade', 'Presença de autoanticorpos FAN e anti-músculo liso positivo'],
    red_flags: ['Falência hepática aguda fulminante pós-crise severa', 'Evolução veloz para cirrose macronodular hipertensiva', 'Epistaxe severa espontânea com INR alargado de 3.0'],
    diferenciais: ['Hepatite induzida por drogas de exclusão (DILI)', 'Doença de Wilson avançada', 'Esteatohepatite não alcoólica progressiva', 'Hepatite C crônica activa', 'Colangite esclerosante primária']
  },
  {
    id: 'N30.0',
    nome: 'Cistite Aguda Não Complicada',
    sintomas: ['Disúria persistente (dor e queimação ao urinar)', 'Polaciúria (aumento marcante da frequência urinária)', 'Urgência miccional súbita imperiosa', 'Dor suprapúbica em cólica que melhora pós-micção', 'Hematúria macroscópica visível rala', 'Urina turva de odor penetrante'],
    fatores_risco: ['Atividade sexual recente frequente (Cistite de lua de mel)', 'Higiene perineal incorreta de trás para frente', 'Uso inadequado recente de espermicidas orais', 'Menopausa ativa com atrofia epitelial vaginal', 'Retenção urinária voluntária por horas seguidas'],
    red_flags: ['Dor lombar unilateral persistente em Giordano (sugere Pielonefrite)', 'Febre alta em calafrios e tremores intensos', 'Instabilidade postural ou letargia em idosas', 'Presença de gravidez ativa (risco de parto prematuro)'],
    diferenciais: ['Uretrite infecciosa por clamídia ou gonococo', 'Vaginite fúngica por Candida albicans', 'Presença de nefrolitíase distal', 'Cistite intersticial crônica álgica', 'Bexiga hiperativa funcional']
  },
  {
    id: 'N20.0',
    nome: 'Litíase Renal (Cólica Nefrética)',
    sintomas: ['Dor lombar aguda em cólica lancinante unilateral', 'Irradiação clássica da dor para flanco e região inguinal ipsilateral', 'Náuseas intensas e vômitos refratários álgicos', 'Hematúria macroscópica ou microscópica presente', 'Disúria e estrangúria se cálculo em junção vesical'],
    fatores_risco: ['Ingestão hídrica diária insuficiente severa', 'Dieta de alto teor de sódio e proteína animal', 'Historial familiar de urolitíase de cálcio', 'Hipercalciúria idiopática', 'Gota úrica crônica', 'Climas secos e quentes expondo a desidratação'],
    red_flags: ['Febre associada a calafrios em cólica (sugere Rim Obstruído Infeccioso: emergência!)', 'Anúria absoluta com elevação rápida de creatinina (rim único ou cálculo bilateral)', 'Instabilidade circulatória ou hipotensão', 'Dificuldade ventilatória devido à dor extrema'],
    diferenciais: ['Apendicite aguda precoce ou retrocecal', 'Infarto renal agudo', 'Aneurisma de aorta abdominal em expansão', 'Gravidez ectópica rota em fossa ilíaca', 'Diverticulite aguda']
  },
  {
    id: 'N18.3',
    nome: 'Doença Renal Crônica Estágio 3',
    sintomas: ['Principalmente assintomática', 'Urina com espuma abundante frequente (indica proteinúria)', 'Noctúria (necessidade de urinar várias vezes à noite)', 'Cansaço atípico leve matinal', 'Pele seca e prurido discreto', 'Hipertensão arterial de difícil controle'],
    fatores_risco: ['Hipertensão Arterial Sistêmica de longo curso', 'Diabetes Mellitus Tipo 2 ou Tipo 1', 'Glomerulonefrites crônicas passadas', 'Uso abusivo continuado de AINEs de balcão', 'Histórico familiar de falência renal precoce', 'Idade superior a 60 anos'],
    red_flags: ['Proteinúria progressiva na faixa nefrótica (>3.5 g/24h)', 'Anemia normocítica progressiva por deficiência de eritropoetina', 'Hiperpotassemia > 5.5 mEq/L persistente', 'Acidose metabólica com bicarbonato sérico < 20 mEq/L'],
    diferenciais: ['Desidratação de agudo em crônico reversível', 'Insuficiência cardíaca congestiva isolada', 'Mieloma múltiplo induzindo nefropatia de cilindros', 'Nefropatia obstrutiva prostática reversível']
  },
  {
    id: 'N18.5',
    nome: 'Doença Renal Crônica Estágio Terminal G5',
    sintomas: ['Anorexia profunda com náuseas e vômitos matinais uremicos', 'Astenia extrema com palidez cutânea marcante (anemia grave)', 'Edema generalizado em pernas e face (anasarca por oligúria)', 'Hálito de odor urêmico característico (amônia)', 'Prurido cutâneo intolerável com escoriações múltiplas', 'Dispneia progressiva aos menores movimentos'],
    fatores_risco: ['Retardo no início do acompanhamento nefrológico', 'Hipertensão e diabetes refratários de anos', 'Doença renal policística autossômica dominante', 'Nefropatia obstrutiva não tratada', 'Infecções de repetição do trato urinário'],
    red_flags: ['Pericardite urêmica com abafamento de bulhas cardíacas', 'Encefalopatia urêmica manifestando confusão, flapping e convulsões', 'Hipercalemia extrema > 6.5 mEq/L com ECG alterado (Onda T tenda)', 'Congestão pulmonar refratária com edema agudo de pulmão hipervolêmico'],
    diferenciais: ['Insuficiência respiratória cardiogênica crônica', 'Cirrose hepática com síndrome hepatorrenal avançada', 'Glomerulonefrite aguda rapidamente progressiva (GNRP)', 'Mieloma com disfunção renal aguda severa']
  },
  {
    id: 'N40',
    nome: 'Hiperplasia Prostática Benigna (HPB)',
    sintomas: ['Hesitação miccional inicial penosa', 'Jato urinário fraco intermitente e bífido', 'Nictúria acentuada (despertar várias vezes à noite para urinar)', 'Polaciúria diurna irritativa constante', 'Sensação permanente de esvaziamento vesical incompleto', 'Gotejamento terminal prolongado de urina'],
    fatores_risco: ['Idade superior a 50 anos em progressão', 'Genética familiar predisponente', 'Obesidade e estilo de vida de padrão ocidental', 'Uso habitual de descongestionantes simpaticomiméticos restringindo a uretra'],
    red_flags: ['Retenção urinária aguda com distensão vesical dolorosa (bexigoma)', 'Insuficiência renal obstrutiva pós-renal severa silenciosa', 'Hematúria macroscópica volumosa com coágulos em jato', 'Febre com Giordano (sugere urossepse obstrutiva)'],
    diferenciais: ['Estreitamento de uretra (estenose por trauma anterior)', 'Câncer de próstata com invasão local estenosante', 'Bexiga neurogênica flácida ou espástica', 'Cistite bacteriana aguda irritativa']
  },
  {
    id: 'N00.9',
    nome: 'Glomerulonefrite Difusa Aguda (GNDA)',
    sintomas: ['Hematúria macroscópica visível ("urina cor de chá ou Coca-Cola")', 'Edema de início súbito peri-orbitário matinal intenso', 'Hipertensão arterial súbita flutuante', 'Oligúria moderada (volume menor que 400 mL/dia)', 'Cefaleia e mal-estar generalizado', 'Leve dor lombar bilateral sutil'],
    fatores_risco: ['Infecção de orofaringe pós-estreptocócica recente (1 a 3 semanas)', 'Infecção de pele de impetigo estreptocócico ou piodermite', 'Idade escolar jovem (predominantemente 2-12 anos)', 'Baixo nível socioeconômico doméstico', 'História prévia de reatividades glomerulares'],
    red_flags: ['Edema de pulmão agudo por hipervolemia severa repentina', 'Encefalopatia hipertensiva com convulsões tônico-clônicas', 'Insuficiência renal anúrica necessitando diálise urgente', 'Cardiomegalia de débito restrito bilateral'],
    diferenciais: ['Nefropatia por IgA ativa (Doença de Berger)', 'Lupus Eritematoso Sistêmico com nefrite lupus lítica', 'Pielonefrite aguda bacteriana bilateral', 'Síndrome nefrótica pura', 'Endocardite secundária glomerular']
  },
  {
    id: 'N04.9',
    nome: 'Síndrome Nefrótica Primária',
    sintomas: ['Edema generalizado volumoso (anasarca) e indolor', 'Fezes normais porém com oligúria concentrada', 'Urina com aspecto extremamente espumoso permanente', 'Aumento acentuado de peso em poucos dias por retenção hídrica', 'Fadiga extrema por fardo corporal e cansaço fácil'],
    fatores_risco: ['Idade jovem na Doença de Lesão Mínima', 'Gênero masculino (faixa pediátrica)', 'Diabetes de longa data em Glomeruloesclerose Segmentar e Focal (GESF)', 'Presença de autoanticorpos do receptor PLA2R', 'Uso abusivo crônico de AINEs em idosos'],
    red_flags: ['Trombose de veia renal mímica com dor lombar severa e hematúria súbita', 'Edema agudo de pulmão com insuficiência ventilatória restritiva', 'Sinais clássicos infecciosos de peritonite bacteriana espontânea por pneumococo', 'Instabilidade postural severa por choque hipovolêmico'],
    diferenciais: ['Insuficiência cardíaca descompensada congestiva', 'Cirrose com ascite e anasarca hepática', 'Hipotireoidismo clínico em mixedema severo', 'Desnutrição grave de padrão Kwashiorkor']
  },
  {
    id: 'F52.2',
    nome: 'Disfunção Erétil Vasculogênica ou Neurogênica',
    sintomas: ['Inabilidade persistente em obter ereção rígida', 'Incapacidade em manter a ereção de modo satisfatório para o coito', 'Diminuição gradual da tumescência peniana espontânea noturna', 'Ansiedade de desempenho durante o ato sexual', 'Redução do libido associada'],
    fatores_risco: ['Tabagismo pesado ativo e sedentarismo', 'Diabetes mellitus de longa duração associado a neuropatia', 'Hipertensão arterial crônica com DAOP concomitante', 'Hiperplasia prostática tratado com inibidores de 5-alfa redutase', 'Doença cardiovascular coronariana declarada', 'Uso diário de medicações como betabloqueadores ou antidepressivos'],
    red_flags: ['Ausência absoluta de ereção noturna com dores de repouso peniano', 'Sinais de isquemia ou claudicação glútea (Síndrome de Leriche)', 'Depressão psíquica severa com ideação suicida', 'Uso concomitante de nitratos que contraindica terminantemente inibidores da PDE5'],
    diferenciais: ['Hipogonadismo de início tardio por deficiência de testosterona', 'Disfunção erétil psicogênica pura com ereção matinal preservada', 'Disfunção por trauma ou cicatrizes na túnica de Peyronie', 'Neuropatia alcoólica autônoma periférica']
  },
  {
    id: 'J44.9',
    nome: 'Doença Pulmonar Obstrutiva Crônica (DPOC)',
    sintomas: ['Dispneia de caráter lento e insidioso progressivo aos esforços', 'Tosse produtiva crônica matinal ("tosse do fumante")', 'Expectorização de muco espesso transparente ou esbranquiçado', 'Sibilos expiratórios esporádicos à ausculta pulmonar', 'Tórax em tonel hiper-insuflado no DPOC enfisematoso', 'Corticodependência ou cansaço aos menores movimentos'],
    fatores_risco: ['Tabagismo pesado consolidado de longa data (> 20 maços-ano)', 'Exposição domiciliar prolongada a fumaça de fogão a lenha', 'Poeiras ocupacionais contínuas industriais (sílica, carvão)', 'Deficiência hereditária congênita de alfa-1 antitripsina', 'Historial consolidado de asma persistente do jovem'],
    red_flags: ['Uso marcante de musculatura respiratória acessória (fadiga eminente)', 'Sonoridade mental obnubilada por hipercapnia severa encubadora', 'Saturação arterial periférica abaixo de 88% em repouso', 'Surgimento agudo de cor pulmonale com edema e ingurgitamento de jugular'],
    diferenciais: ['Insuficiência cardíaca congestiva de alto grau', 'Asma de início tardio irritativa', 'Bronquiectasia difusa infetante', 'Tuberculose sequelar pulmonar', 'Carcinoma bronquogénico obstrutivo']
  },
  {
    id: 'J20.9',
    nome: 'Bronquite Aguda Infecciosa',
    sintomas: ['Tosse irritativa que evolui para copiosa durando 1 a 3 semanas', 'Escarro esbranquiçado ou levemente esverdeado inespecífico', 'Desconforto ou queimação retroesternal ao tossir', 'Febre baixa moderada de curta duração', 'Sibilos expiratórios esporádicos leves', 'Sintomas concomitantes de resfriado'],
    fatores_risco: ['Exposição recente a infecções virais em ambiente fechado', 'Tabagismo ativo ou passivo crônico', 'Inalação recente de poeira ou poluentes químicos industriais', 'Presença de asma subclínica ou rinite alérgica de base'],
    red_flags: ['Taquipneia > 24 irpm acompanhada de dispneia de repouso', 'Estertores crepitantes localizados auscultados (sugere pneumonia)', 'Febre persistente acima de 38.5°C por mais de 5 dias seguidos', 'Imunossupressão ou idade extremamente avançada'],
    diferenciais: ['Pneumonia adquirida na comunidade', 'Asma aguda descompensada leve', 'Coqueluche de ressurgimento tardio', 'Exacerbação de DPOC', 'Sinusite com gotejamento pós-nasal irritativo']
  },
  {
    id: 'G47.3',
    nome: 'Síndrome da Apneia Obstrutiva do Sono (SAOS)',
    sintomas: ['Roncos noturnos volumosos e disruptivos frequentes', 'Apneias testemunhadas pelo parceiro dormitório', 'Sonolência diurna excessiva incapacitante', 'Cefaleia irritativa de localização frontal ao acordar', 'Sensação persistente de sono não restaurador', 'Dificuldade crônica de memória e concentração de dia'],
    fatores_risco: ['Obesidade e IMC elevado com circunferência de pescoço > 40 cm', 'Sexo masculino', 'Idade de início acima de 50 anos', 'Presença de retrognatismo mandíbula ou hipertrofia tonsilar', 'Consumo exagerado de álcool ou sedativos logo antes de dormir'],
    red_flags: ['Acréscimo rápido de sonolência com micro-dormidas ao volante', 'Hipertensão arterial sistêmica refratária a 4 drogas anti-hipertensivas', 'Hipertensão pulmonar secundária documentada', 'Arritmias noturnas complexas como pausas sinusais severas'],
    diferenciais: ['Transtorno de insônia primária psicofisiológica', 'Narcolepsia idiopática clássica', 'Síndrome de fadiga crônica', 'Hipotireoidismo de repouso descompensado', 'Transtorno depressivo maior com hipersônia']
  },
  {
    id: 'A15.0',
    nome: 'Tuberculose Pulmonar Ativa',
    sintomas: ['Tosse persistente produtiva durando há mais de 3 semanas', 'Febre vespertina diária de baixa intensidade (febícula)', 'Sudorese noturna profusa que molha lençol', 'Emagrecimento marcante inexplicado involuntário', 'Fadiga crônica, adinamia e anorexia de semanas', 'Hemoptise (escarro com laivos de sangue vivo)'],
    fatores_risco: ['Situação de rua ou habitações coletivas superlotadas', 'Contatos próximos domiciliares com doente de TB ativa bacilífero', 'Imunossupressão por HIV ativa ou uso de imunobiológicos', 'Tabagismo pesado ou alcoolismo severo concomitantes', 'Profissionais do setor de saúde expostos'],
    red_flags: ['Dispneia súbita de repouso com assimetria pulmonar (pneumotórax sequelar)', 'Insuficiência respiratória com hipoxemia refratária severa', 'Sinais concomitantes de meningite tuberculosa (rigidez, confusão)', 'Hemoptise volumosa catastrófica com asfixia iminente'],
    diferenciais: ['Carcinoma bronquogênico pulmonar avançado', 'Pneumonia adquirida na comunidade (PAC)', 'Abscesso pulmonar bacteriano necrotizante', 'Broquectasia infetada recorrente', 'Mico-bacteriose não tuberculosa']
  },
  {
    id: 'J47',
    nome: 'Bronquiectasia Não Fibrocística',
    sintomas: ['Tosse crônica copiosa volumosa com expectoração purulenta', 'Escarro fétido estratificado de odor forte fétido', 'Pneumonias de repetição localizadas recorrentes', 'Hemoptises recorrentes de pequena à moderada quantidade', 'Sibilos e estertores crepitantes grosseiros na ausculta', 'Fadiga e emagrecimento nos surtos de exacerbação'],
    fatores_risco: ['Infecções respiratórias graves pregressas na infância (sarampo, coqueluche)', 'Sequela pulmonar consolidada de Tuberculose passada', 'Síndromes de imunodeficiência humoral de anticorpos', 'Discinesia ciliar primária ou Síndrome de Kartagener'],
    red_flags: ['Hemoptise maciça com necessidade de embolização arterial de urgência', 'Pneumotórax volumoso', 'Sinais clássicos infecciosos de choque séptico respiratório', 'Insuficiência pulmonar global com cor pulmonale refratário'],
    diferenciais: ['Fibrose cística idiopática em adultos jovens', 'Doença Pulmonar Obstrutiva Crônica (DPOC)', 'Asma brônquica de difícil controle', 'Tuberculose pulmonar ativa', 'Abscesso do pulmão']
  },
  {
    id: 'J90',
    nome: 'Derrame Pleural Exudativo',
    sintomas: ['Dor torácica pleurítica que piora com inspiração profunda', 'Dispneia progressiva proporcional ao volume do líquido', 'Tosse seca e incômoda exacerbada por mudança de posição', 'Fremito tóraco-vocal abolido e macicez à percussão localizada', 'Murmúrio vesicular abolido no local afetado'],
    fatores_risco: ['Pneumonia bacteriana bacteriológica ativa subaquosa (derrame parapneumônico)', 'Tuberculose pleural na exposição recente', 'Câncer de pulmão de crescimento invasivo ou metástases pleurais', 'Doenças reumatológicas como Lupus (LES) ou Artrite Reumatoide', 'Pancreatite aguda complicada em evolução'],
    red_flags: ['Empiema pleural espesso purulento (febre alta persistente, toxemia)', 'Desvio severo do mediastino oposto com choque hemodinâmico por compressão', 'Hipoxemia refratária necessitando drenagem torácica imediata'],
    diferenciais: ['Derrame pleural transudativo por insuficiência cardíaca', 'Embolia pulmonar com infarto pulmonar periférico', 'Pneumotórax pleurítico agudo', 'Abscesso subfrênico irritativo', 'Derrame pleural de cirrose (hidrotórax hepático)']
  },
  {
    id: 'J45.5',
    nome: 'Asma Grave Persistente Alérgica',
    sintomas: ['Surtos rotineiros recorrentes de falta de ar com sibilos auditivos', 'Dispneia com despertares noturnos seguidos na semana', 'Opressão torácica em aperto recorrente incômoda', 'Tosse seca irritativa de deflagração à poeira ou alteração climática', 'Uso repetido diário de broncodilatador de resgate para respirar'],
    fatores_risco: ['Histórico familiar forte de asma e atopia generalizada', 'Presença de rinite alérgica crônica e dermatite atópica severa', 'Sensibilização crônica a ácaros, fungos ou pelos de animais', 'Exposição ocupacional continuada a alérgenos químicos industriais', 'Uso de betabloqueadores oftálmicos ou sistêmicos contrários'],
    red_flags: ['Tórax silencioso com ausência completa de sibilos (obstrução quase total)', 'Saturação arterial periférica abaixo de 90% em ar ambiente', 'Confusão mental, sonolência ou agitação extrema progressiva', 'Dificuldade total para pronunciar monossílabos ou falar', 'Pulso paradoxal acentuado'],
    diferenciais: ['Broncoespasmo induzido por aspiração de corpo esofágico', 'Disfunção crônica de cordas vocais mímica', 'Insuficiência cardíaca esquerda (Asma Cardíaca)', 'Exacerbação aguda de DPOC enfisematosa']
  },
  {
    id: 'J11.1',
    nome: 'Influenza Sazonal (Gripe Comum)',
    sintomas: ['Febre alta de início abrupto que dura 3 a 4 dias', 'Mialgia generalizada severa e prostração profunda', 'Cefaleia holocraniana intensa constante', 'Tosse seca e rouquidão moderada', 'Dor de garganta e coriza serosa abundante', 'Calafrios intermitentes na febre'],
    fatores_risco: ['Idosos acima do que 60 anos ou lactentes pequenos', 'Gestantes em qualquer trimestre de gravidez ou puérperas', 'Doenças crônicas cardiorrespiratórias ou imunodepressão', 'Ausência de vacinação sazonal anual preventiva', 'Profissionais atuando em creches ou hospitais expostos'],
    red_flags: ['Dispneia de início súbito com taquipneia progressiva', 'Saturação periférica de oxigênio abaixo de 93% em ar ambiente', 'Surgimento de confusão mental delirante em idosos hígidos', 'Retorno de febre alta após desaparecimento progressivo inicial (sugere suprainfecção)'],
    diferenciais: ['COVID-19 moderada de início agudo', 'Resfriado comum viral benigno', 'Dengue clássica em fase febril inicial', 'Pneumonia bacteriana atípica (Mycoplasma)', 'Mononucleose infecciosa']
  },
  {
    id: 'U07.1',
    nome: 'COVID-19 Leve a Moderada',
    sintomas: ['Febre de intensidade variável persistente', 'Tosse seca irritativa ou discretamente produtiva', 'Anosmia súbita (perda total de olfato) e ageusia (perda de paladar)', 'Fadiga física extrema desproporcional e mialgias', 'Dor de garganta irritativa e coriza abundante', 'Diarreia pastosa associada e náuseas'],
    fatores_risco: ['Falta de esquema vacinal completo contra o vírus', 'Idade avançada maior do que 65 anos', 'Comorbidades como hipertensão, obesidade grau III ou diabetes', 'Imunossupressão ou transplantes renais/hepáticos', 'Exposição frequente prolongada a aglomerações fechadas'],
    red_flags: ['Instalação de falta de ar perceptível aos movimentos habituais', 'Saturação de oxigênio periférica ≤ 92% em ar ambiente', 'Frequência respiratória sustentada acima de 24 incursões por minuto', 'Sensação permanente de opressão torácica sufocante ao falar'],
    diferenciais: ['Influenza sazonal', 'Resfriado comum porrinovírus', 'Pneumonia adquirida na comunidade atípica', 'Dengue clássica fase precoce', 'Sinusite purulenta com gotejamento de vias superiores']
  },
  {
    id: 'A90.0',
    nome: 'Dengue Clássica Infecção',
    sintomas: ['Febre alta súbita que desaparece em 5 a 7 dias', 'Cefaleia com dor retro-orbitária característica que piora à movimentação dos olhos', 'Mialgias intensas espalhadas (febre quebra-ossos) e artralgias', 'Fadiga e adinamia profundas que dificultam o autocuidado', 'Exantema maculopapular pruriginoso tardio em tronco e membros', 'Anorexia e náuseas severas em doentes jovens'],
    fatores_risco: ['Moradia ou trânsito recente em área endêmica de infestações por Aedes', 'Surtos epidêmicos sazonais no verão pós-chuvas', 'Ausência de anticorpos preexistentes contra o sorotipo circulante', 'Ineficácia de barreiras mecânicas residenciais contra os mosquitos'],
    red_flags: ['Dor abdominal persistente intensa e contínua à palpação', 'Vômitos frequentes incoercíveis (> 3 episódios em poucas horas)', 'Sangramento espontâneo de mucosas (epistaxe ou gengivorragia volumosa)', 'Derrame cavitário demonstrado (pleural, ascítico por estase capilar)', 'Hematócrito em elevação rápida concomitante à queda veloz de plaquetas'],
    diferenciais: ['Febre de Chikungunya com dor articular deformante', 'Febre pelo vírus Zika (exantema exuberante com febre baixa)', 'Leptospirose anictérica severa', 'Malária por Plasmodium vivax', 'Febre amarela', 'Lupus eritematoso em surto agudo']
  },
  {
    id: 'A92.0',
    nome: 'Febre de Chikungunya',
    sintomas: ['Artrite debilitante de pequenas articulações bilateral e simétrica', 'Febre alta súbita acompanhada de calafrios persistentes', 'Mialgia moderada localizada nas extremidades dos membros', 'Exantema maculopapular precoce acompanhado de prurido leve', 'Fadiga física e adinamia acentuadas por causa de dor articular'],
    fatores_risco: ['Presença de vetor Aedes aegypti em circulação nas habitações', 'Estação quente e úmida típica de proliferação de vetores', 'Trânsito recente em bairros com epidemia documentada'],
    red_flags: ['Artralgia crônica que persiste por meses a anos (incapacitante)', 'Manifestações neurológicas raras como meningoencefalite em idosos', 'Comprometimento cardiovascular agudo com hipotensão postural'],
    diferenciais: ['Dengue vírus infecção clássica', 'Artrite Reumatoide de início agudo simulador', 'Lupus com poliartropatia no jovem', 'Febre reumatológica na infância', 'Infeção por Zika']
  },
  {
    id: 'A92.5',
    nome: 'Zika Vírus Infecção',
    sintomas: ['Exantema maculopapular intensamente pruriginoso disseminado', 'Febre baixa moderada ou ausência completa de febre', 'Hiperemia conjuntival bilateral não purulenta (olho vermelho indolor)', 'Artrite leve de tornozelos e punhos simétrica', 'Mialgia discreta e dor retro-orbitária sutil', 'Fadiga leve'],
    fatores_risco: ['Trânsito em área endêmica de picadas do vetor vector', 'Parceiro sexual infectado recentemente pelo vírus Zika', 'Ausência de saneamento e controle de focos habitacionais de larvas'],
    red_flags: ['Neuropatias agudas periféricas como Síndrome de Guillain-Barré', 'Gestante ativa em primeiro trimestre (risco de microcefalia fetal severa)', 'Trombocitopenia grave com sangramentos de pele'],
    diferenciais: ['Dengue clássica fase febril inicial', 'Parvovírus B19 com exantema facial reticulado', 'Mononucleose infecciosa', 'Reação alérgica farmacológica', 'Rubéola aguda']
  },
  {
    id: 'A27.9',
    nome: 'Leptospirose Anictérica',
    sintomas: ['Febre alta súbita de início abrupto que dura 4 a 7 dias', 'Dor lombar intensa acompanhada de mialgia marcante em panturrilhas', 'Sufusão conjuntival característica (eritema conjuntival ocular sem secreção)', 'Cefaleia frontal severa irritativa persistente', 'Náuseas e diarreias esporádicas', 'Surgimento eventual de exantema macular discreto'],
    fatores_risco: ['Contato direto de pele com águas ou lama de enchentes recentes', 'Contato com urina de roedores em depósitos ou porões fechados', 'Trabalho de risco de limpadores de bueiros ou coletores de lixo', 'Residência limítrofe a terrenos baldios infestados por roedores'],
    red_flags: ['Surgimento rápido de icterícia com insuficiência renal oligúrica (Weil)', 'Fenômenos hemorrágicos ou hemoptise maciça espontânea (hemorragia pulmonar)', 'Alteração do nível de alerta com confusão neurológica progressiva'],
    diferenciais: ['Dengue clássico fase febril tóxica', 'Dengue hemorrágico agudo', 'Hepatite A infecciosa aguda', 'Malária clássica por vivax', 'Sepsis bacteriana de origem desconhecida']
  },
  {
    id: 'Z21',
    nome: 'Infecção por HIV Assintomática',
    sintomas: ['Geralmente totalmente assintomática por anos de curso', 'Surgimento eventual de linfadenopatia generalizada indolor persistente', 'Podem ocorrer episódios discretos de candidíase oral transitória', 'Episódios isolados recorrentes de dermatite seborreica facial ou herpes', 'Fadiga leve eventual'],
    fatores_risco: ['Relações sexuais desprotegidas anais ou vaginais múltiplas', 'Compartilhamento de agulhas de aplicação endovenosa', 'Acidente perfurocortante ocupacional com material biológico positivo', 'Transmissão vertical materna sem terapia antirretroviral profilática'],
    red_flags: ['Rápido declínio do total de linfócitos T CD4+ abaixo de 200/mm³', 'Aparecimento de infecções fúngicas oportunistas (Pneumocistose)', 'Emagrecimento consumativo severo inexplicado sem causa (Wasting)', 'Criptococcose meníngea com rigidez de nuca e cefaleia'],
    diferenciais: ['Lupus Eritematoso Sistêmico', 'Mononucleose infecciosa crônica', 'Linfoma de Hodgkin oculto', 'Imunodeficiência comum variável (IDCV)']
  },
  {
    id: 'A87.9',
    nome: 'Meningite Viral Asséptica',
    sintomas: ['Cefaleia intensa holocraniana de início agudo', 'Rigidez de nuca leve a moderada dolorosa', 'Febre moderada e mal-estar de dias de evolução', 'Fotofobia (intolerância grave à luz)', 'Náuseas frequentes e vômitos ocasionais', 'Sintomas gripais concomitantes orofaringes'],
    fatores_risco: ['Temporada de verão/outono favorecendo infecção por Enterovírus', 'Exposição prévia a aglomerados escolares de crianças', 'Idade jovem infantil ou adulto jovem com contato familiar', 'Estilo de higiene inadequada de mãos pós-uso sanitário'],
    red_flags: ['Surgimento súbito de torpor, sonolência ou confusão mental (Encefalite)', 'Déficit focal de força ou desvio de comissura facial', 'Sinais de hipertensão intracraniana em edema de papila óptica', 'Crises convulsivas em andamento rápido'],
    diferenciais: ['Meningite bacteriana aguda purulenta', 'Meningite fúngica no imunocomprometido', 'Hemorragia subaracnoidea aguda', 'Meningoencefalite por herpes-vírus essencial']
  },
  {
    id: 'B58.9',
    nome: 'Toxoplasmose Ganglionar ou Ocular',
    sintomas: ['Surgimento de adenopatias cervicais indolores consistência elástica', 'Febre baixa moderada de semanas e noites de sudorese', 'Astenia e mialgia generalizadas prolongadas', 'Visão borrada unilateral unilateral dolorosa com moscas volantes', 'Hiperemia ocular viga dolorosa contralateral', 'Dor de garganta'],
    fatores_risco: ['Ingesto frequente de carne vermelha crua ou malcozida', 'Contato íntimo habitual com fezes de gatos filhotes em areia', 'Consumo de verduras cruas higienizadas de modo inadequado', 'Uso de água de poço não tratada em área endêmica', 'Trabalho diário em jardinagem sem luvas'],
    red_flags: ['Lesões cerebrais múltiplas com déficits motores (no HIV/Aids)', 'Rápida perda visual progressiva por neurorretinite macular', 'Febre persistente alta em gestante ativa com risco de transmissão fetal'],
    diferenciais: ['Mononucleose infecciosa por vírus EBV', 'Linfoma de não-Hodgkin em doentes jovens', 'Doença da arranhadura do gato (Bartonellose)', 'Citomegalovírus ganglionar']
  },
  {
    id: 'B02.9',
    nome: 'Herpes Zoster Crônico Reativivo',
    sintomas: ['Erupção cutânea vesicular unilateral dermatômica', 'Dor neuropática intensa em queimação ("dor em facada")', 'Parestesias e prurido agudos na região afetada pré/pós erupção', 'Presença de crostas pós-vesículas dolorosas', 'Febre baixa moderada de início agudo sutil', 'Cefaleia se acometimento oftálmico'],
    fatores_risco: ['Idade avançada maior do que 60 anos', 'Historial natural prévio de catapora (Varicela) na infância', 'Estado de imunossupressão ativa ou estresse físico agressor severo', 'Diabetes mellitus crônica descompensada', 'Uso atual de corticoides em altas doses'],
    red_flags: ['Acometimento de ramo oftálmico do trigêmeo (risco de cegueira corneana)', 'Surgimento de paralisia de hemiface periférica (Síndrome de Ramsay-Hunt)', 'Nevralgia pós-herpética crônica grave durando mais de 3 meses', 'Celulite bacteriana secundária com infecção sistêmica ativa'],
    diferenciais: ['Erisipela ou celulite bacteriana em placas', 'Dermatite de contato aguda vesicular', 'Impetigo bolhoso bacteriano por estafilococo', 'Infarto agudo do miocárdio de dor mímica anterior']
  },
  {
    id: 'A46',
    nome: 'Erisipela Aguda de Membros Inferiores',
    sintomas: ['Placa eritematosa bem delimitada em perna unilateral', 'Margens elevadas e nítidas na palpação da extremidade', 'Dor local lancinante acompanhada de calor importante e edema', 'Febre alta súbita acompanhada de calafrios trementes', 'Surgimento eventual de bolhas serosas na superfície', 'Linfonodo inguinal doloroso ipsilateral'],
    fatores_risco: ['Presença ativa de micose interdigital no pé (famosa frieira/porta de entrada)', 'Insuficiência venosa crônica com varizes e linfedema', 'Obesidade e dificuldade de retorno linfático', 'Diabetes mellitus descontrolado', 'Histórico anterior de episódios recorrentes de erisipela'],
    red_flags: ['Fasciíte necrotizante agressiva (dor intolerável, pele violácea, creptação ggasosa)', 'Instabilidade circulatória ou hipotensão persistente de sepse', 'Plaquetopenia severa e elevação rápida de lactato sérico', 'Progresso veloz da placa em poucas horas na marcação de caneta'],
    diferenciais: ['Celulite infecciosa profunda (margens mal delimitadas)', 'Trombose Venosa Profunda unilateral', 'Dermatite de estase alérgica descompensada', 'Picada de inseto peçonhento com reação inflamatória reativa']
  },
  {
    id: 'L03.1',
    nome: 'Celulite Infecciosa de Membros Inferiores',
    sintomas: ['Eritema difuso de margens mal delimitadas e irregulares', 'Dor intensa local profunda que piora à palpação', 'Calor cutâneo proeminente e edema elástico unilateral', 'Febre moderada a alta de início insidioso', 'Astenia e mal-estar generalizados', 'Linfangite superficial (trajetos avermelhados ascendentes na pele)'],
    fatores_risco: ['Soluções de continuidade na pele (traumas, escoriações, picadas)', 'Diabetes mellitus com úlceras neuropáticas em pés de risco', 'Insuficiência venosa profunda crônica obstrutiva', 'Uso de drogas injetáveis intravenosas clandestinas', 'Imunossupressão ou hipoalbuminemia importante'],
    red_flags: ['Sinais de fasciíte necrotizante (dor desproporcional ao aspecto, bolhas hemorrágicas)', 'Instabilidade hemodinâmica por choque séptico cutâneo em idosos', 'Necrose tecidual visível e anestesia local pós-dor extrema', 'Extensão proximal veloz para coxa ou quadrante pélvico'],
    diferenciais: ['Erisipela clássica (placa bem delimitada mais superficial)', 'Trombose Venosa Profunda de perna unilateral', 'Ruptura de cisto sinovial de Baker', 'Gota gotosa articular aguda com celulite satélite', 'Eczema de estase venosa crônica']
  },
  {
    id: 'B27.1',
    nome: 'Mononucleose Infecciosa (EBV)',
    sintomas: ['Febre moderada a alta durando 1 a 2 semanas', 'Faringite exsudativa dolorosa pseudomembranosa grave', 'Linfadenopatia simétrica proeminente principalmente em cadeia posterior cervical', 'Fadiga extrema prolongada durando semanas a meses', 'Esplenomegalia dolorosa (baço aumentado palpável)', 'Facies de exaustão e rash cutâneo após uso impróprio de amoxicilina'],
    fatores_risco: ['Faixa etária adolescente ou adulto jovem hígido (15-25 anos)', 'Contato íntimo transmissor por saliva ("doença do beijo")', 'Compartilhamento de copos ou talheres em ambientes universitários', 'Estresse físico e privação crônica de sono de estudantes'],
    red_flags: ['Ruptura espontânea ou traumática de baço com choque hipovolêmico', 'Obstrução de vias aéreas superiores por hipertrofia extrema de amígdalas', 'Surgimento novo de icterícia severa ou coagulopatia por hepatite viral', 'Anemia hemolítica autoimune com plaquetopenia extrema'],
    diferenciais: ['Faringotonsilite estreptocócica bacteriana pura', 'Infecção aguda primária por HIV (Soroconversão)', 'Toxoplasmose ganglionar aguda', 'Infecção aguda por Citomegalovírus (CMV)']
  },
  {
    id: 'B86',
    nome: 'Escabiose Humana (Sarna)',
    sintomas: ['Prurido intensamente intolerável que piora à noite no calor do leito', 'Lesões papulares eritematosas localizadas em túneis', 'Acometimento de dobras cutâneas (espaços interdigitais, axilas, aréolas, pênis)', 'Lesões de escoriação generalizadas secundárias ao ato de coçar', 'Surto de pápulas urticariformes reflexas disseminadas', 'Ausência de lesões faciais na maioria'],
    fatores_risco: ['Habitação em abrigos, asilos, quartéis ou cortiços aglomeradores', 'Contato físico pele com pele continuado com pessoa infectada', 'Partilha de toalhas de banho ou roupas de cama sem lavagem quente', 'Higiene de banho e troca de roupas deficiente regular'],
    red_flags: ['Escabiose Norueguesa ou Crostosa (infestação maciça hiperpapular em imunodeprimidos)', 'Suprainfecção bacteriana secundária desenvolvendo glomerulonefrite pós-estreptocócica', 'Sepse bacteriana a partir de escoriações infectadas em diabéticos'],
    diferenciais: ['Dermatite atópica clássica em surto pruriginoso', 'Urticária crônica idiopática', 'Prurigo estrófulo por picada de ectoparasitas', 'Dermatite de contato fétida', 'Psoríase vulgar palmoplantar']
  },
  {
    id: 'B35.3',
    nome: 'Tinea Pedis (Pé de Atleta)',
    sintomas: ['Prurido intenso e descamação esbranquiçada entre os dedos do pé', 'Macedação cutânea e fissuras dolorosas interdigitais', 'Eritema com bordas descamativas ativas na planta e bordas do pé', 'Odor fétido decorrente de colonização fúngico-bacteriana', 'Surgimento ocasional de vesículas pruriginosas dolorosas'],
    fatores_risco: ['Manutenção frequente de calçados fechados e úmidos por longos períodos', 'Uso compartilhado de banheiros ou vestiários públicos sem chinelos', 'Hiperidrose plantar acentuada (produção de suor excessivo)', 'Diabetes mellitus com alteração circulatoria periférica', 'Imunodeficiência celular ativa'],
    red_flags: ['Surgimento novo de erisipela de membros (Tinea interdigital é a principal porta de entrada para estreptococo)', 'Infestação fúngica associada a infecção bacteriana profunda com celulite', 'Úlceras neuropáticas infectadas com osteomielite em pé diabético'],
    diferenciais: ['Equizema disidrótico de pés vesicular', 'Psoríase palmoplantar descamativa', 'Dermatite de contato por calçados e borrachas', 'Queratólise esfoliativa simétrica']
  },
  {
    id: 'M17.9',
    nome: 'Osteoartrite de Joelhos (Gonartrose)',
    sintomas: ['Dor articular profunda descrita como mecânica que piora ao caminhar', 'Melhora típica da dor com repouso deitado', 'Rigidez matinal transitória de curta duração (< 30 minutos)', 'Crepitação audível ou palpável aos movimentos de flexo-extensão do joelho', 'Limitação progressiva da flexão articular total', 'Aumento de volume articular eventual'],
    fatores_risco: ['Idade avançada maior do que 50 anos em progressão', 'Obesidade e sobrecarga mecânica constante sobre as articulações', 'Histórico anterior de trauma articular grave ou cirurgia de menisco', 'Sexo feminino após a menopausa', 'Atividades ocupacionais com agachamento repetido e carga'],
    red_flags: ['Derrame articular volumoso sob tensão doloroso (derrame em "clam")', 'Bloqueio mecânico abruto da articulação do joelho ao tentar caminhar', 'Instabilidade postural severa com quedas frequentes por falha no joelho', 'Sinais clássicos inflamatórios de pioartrite ou infecção sinovial ativa'],
    diferenciais: ['Artrite por depósito de cristais de pirofosfato (Pseudogota)', 'Lesão meniscal rotura crônica dolorosa', 'Artrite Reumatoide monoarticular inicial', 'Tendinite de pata de ganso ou anserina', 'Necrose avascular de côndilo femoral']
  },
  {
    id: 'M06.9',
    nome: 'Artrite Reumatoide Ativa',
    sintomas: ['Poliartrite simétrica envolvendo dedos e mãos (MTC, IFP)', 'Rigidez matinal de longa duração (> 1 hora até flexibilidade)', 'Dor articular profunda contínua que melhora temporariamente com o movimento', 'Edema articular macio e calor persistente nas articulações afetadas', 'Fadiga generalizada adinamia e perda de peso leve', 'Deformidades típicas tardias (dedos em pescoço de cisne/botoeira)'],
    fatores_risco: ['Sexo feminino (proporção média de 3 para 1)', 'Idade de início mais comum entre 35-55 anos', 'Tabagismo ativo muito nocivo (forte elo com anticorpo anti-CCP)', 'Predisposição genética e presença de HLA-DR4', 'Presença de doença periodontal crônica ativa'],
    red_flags: ['Subluxação atlanto-axial com compressão de medula (dor cervical e paraparesia súbita)', 'Vasculite reumatoide sistêmica com infartos digitais na pele', 'Derrame pericárdico volumoso compressivo ou pleurite exsudativa', 'Surgimento súbito de olho vermelho extremamente doloroso (Esclerite necrotizante)'],
    diferenciais: ['Osteoartrite nodular senil de mãos', 'Lupus Eritematoso Sistêmico articular', 'Artrite Psoriática simétrica sem lesões cutâneas visíveis', 'Gota poliarticular crônica com tofos', 'Artrite viral paroxística por Parvovírus']
  },
  {
    id: 'M32.9',
    nome: 'Lupus Eritematoso Sistêmico (LES)',
    sintomas: ['Erupção esparsa eritematosa malar (asa de borboleta de pouca pálpebra)', 'Poliartrite não erosiva simétrica migratória de articulações', 'Alopécia em clareira difusa persistente', 'Fadiga generalizada profunda limitante e febre baixa episódica', 'Fenômeno de Raynaud (palidez de dedos com frio)', 'Úlceras orais dolorosas recorrentes sem causa', 'Fotosensibilidade cutânea'],
    fatores_risco: ['Gênero feminino idade jovem reprodutiva (9 para 1 em relação a homens)', 'Etnia afrodescendente americana ou hispânica com quadros graves', 'Exposição continuada a radiação UVB solar protetores de baixo fator', 'Presença de FAN em títulos elevados maiores do que 1:80 homogêneo'],
    red_flags: ['Nefrite Lúpica ativa com urina escura edema generalizado e hipertensão', 'Neurolúpus manifestando psicose, convulsões ou AVC novo', 'Plaquetopenia severa autoimune ou anemia hemolítica aguda de anticorpos', 'Endocardite lúpica de Libman-Sacks com sopro novo e embolias catastróficas'],
    diferenciais: ['Artrite Reumatoide clássica', 'Síndrome de Sjögren isolada profunda', 'Síndrome de Fadiga Crônica idiopática', 'Reação de hipersensibilidade a drogas', 'Esclerose sistêmica precoce']
  },
  {
    id: 'M79.7',
    nome: 'Fibromialgia Primária',
    sintomas: ['Diferente dor musculoesquelética difusa crônica durando > 3 meses', 'Presença de múltiplos pontos dolorosos sensíveis à palpação (Tender points)', 'Distúrbios crônicos do sono (sono não restaurador, despertares)', 'Fadiga física e mental extrema crônica limitante', 'Alterações cognitivas sutis de memória e atenção ("nevoeiro mental")', 'Cefaleias tencionais recorrentes associadas', 'Colon irritável'],
    fatores_risco: ['Gênero feminino', 'Histórico pessoal de transtornos psiquiátricos (depressão, ansiedade)', 'Idade média entre 25-50 anos', 'Vivências passadas de traumas físicos graves ou abusos crônicos', 'Sedentarismo e privação de sono habitual cumulativa'],
    red_flags: ['Depressão reativa maior grave associada a ideação suicida', 'Progressiva perda de autonomia funcional por isolamento social severo', 'Sinais de dores atípicas que encobrem outras patologias reumatológicas ocultas'],
    diferenciais: ['Polimialgia Reumática frontal de idosos', 'Hipotireoidismo clínico severo subdiagnosticado', 'Miopatias inflamatórias ou autoimunes recorrentes', 'Espondiloartrite inflamatória de início jovem', 'Deficiência muscular extrema de Vitamina D']
  },
  {
    id: 'M45',
    nome: 'Espondilite Anquilosante',
    sintomas: ['Dor lombar crônica de padrão inflamatório de meses', 'Dor que melhora com movimentação e piora com repouso prolongado', 'Rigidez matinal severa da coluna lombar durando mais que 45 minutos', 'Limitação progressiva da mobilidade espinhal e expansibilidade torácica', 'Dor em nádegas alternante de sacroileíte', 'Entesite de tendão de Aquiles persistente bilateral'],
    fatores_risco: ['Faixa etária jovem masculina (< 40 anos de idade)', 'Presença definitiva do gene antígeno HLA-B27 positivo', 'História familiar de espondiloartropatias autoimunes', 'Presença de psoríase ou Doença Inflamatória Intestinal concomitante'],
    red_flags: ['Ocorrência súbita de olho vermelho extremamente doloroso (Uveíte anterior)', 'Fratura de coluna após trauma menor por rigidez espinhal (coluna em bambu)', 'Insuficiência aórtica por aortite ascendente associada', 'Síndrome de cauda equina por estenose severa de canal vertebral'],
    diferenciais: ['Lombalgia mecânica comum de hérnia discal', 'Hiperostose esquelética idiopática difusa (DISH)', 'Sacroileíte infecciosa piogênica unilateral', 'Doença de Paget óssea']
  },
  {
    id: 'M35.0',
    nome: 'Síndrome de Sjögren Primária',
    sintomas: ['Xerostomia extrema (sensação de boca seca crônica incômoda)', 'Necessidade imperiosa de beber líquidos para engolir comida seca', 'Xeroftalmia (olho seco com dor tipo areia persistente no globo)', 'Surgimento recorrente de cáries dentárias múltiplas agressivas', 'Aumento bilateral intermitente e indolor das glândulas parótidas', 'Fadiga e artralgia simétrica leve nos dedos'],
    fatores_risco: ['Gênero feminino idade média (proporção de 9 para 1)', 'Presença de autoanticorpos anti-Ro (SSA) ou anti-La (SSB) positivos', 'Presença concomitante de Artrite Reumatoide ou Lupus Eritematoso', 'Genética de doenças autoimunes familiares registradas'],
    red_flags: ['Desenvolvimento tardio perigoso de Linfoma não-Hodgkin de glândula parótida', 'Surgimento de vasculite crioglobulinêmica com púrpuras em MMII', 'Acidose tubular renal distal com hipocalemia severa e paralisia', 'Pneumonite intersticial linfoide ou fibrose pulmonar'],
    diferenciais: ['Uso continuado de medicações anti-colinérgicas (antidepressivos)', 'Infiltração glandular por hepatite C ou HIV crônicos', 'Radioterapia cervical prévia extensa por câncer', 'Sarcoidose bilar de glândulas salivares']
  },
  {
    id: 'M35.3',
    nome: 'Polimialgia Reumática (PMR)',
    sintomas: ['Dor inflamatória crônica bilateral e rigidez de ombros e cintura pélvica', 'Rigidez matinal proeminente durando mais do que 1 hora', 'Dificuldade extrema para elevar os braços acima da linha dos ombros', 'Dificuldade para se levantar de cadeiras baixas sem apoiar', 'Perda de peso inexplicada e fadiga musculoesquelética', 'Febre baixa moderada'],
    fatores_risco: ['Idade de início estritamente superior a 50 anos', 'Elevação dramática de VHS (> 50 mm/h) e PCR no soro', 'Sexo feminino (proporção média de 2 para 1 em idosos)', 'Etnia branca ou descendência do norte europeu'],
    red_flags: ['Associação com Arterite de Células Gigantes (cefaleia de têmpora e perda de visão aguda)', 'Claudicação de mandíbula muito dolorosa ao mastigar alimentos sólidos', 'Aneurisma de aorta torácica silente gigante associado a grandes vvasos'],
    diferenciais: ['Artrite reumatoide ativa senil de grandes articulações', 'Polimiosite progressiva autoimune', 'Miopatia induzida pelo uso prolongado de estatinas', 'Fibromialgia de início tardio senil', 'Metástase carcinomatosa óssea']
  },
  {
    id: 'M34.0',
    nome: 'Esclerose Sistêmica (Esclerodermia)',
    sintomas: ['Fenofeno de Raynaud de início súbito agressivo multifásico', 'Espessamento simétrico da pele das mãos e dedos (esclerodactilia)', 'Facies inexpressiva clássica por esclerose facial com microstomia', 'Disfagia esofágica progressiva de terço médio por hipomobilidade', 'Sensação permanente de pele endurecida tencionada incômoda', 'Telangiectasias múltiplas em face e palmas das mãos', 'Dispneia progressiva', 'Calcinose subcutânea dolorosa'],
    fatores_risco: ['Sexo feminino idade de 30-50 anos', 'Presença de autoanticorpos específicos como anti-centrômero (SSc limitada)', 'Presença de anti-Scl70 positivo (SSc difusa de pior prognóstico)', 'Exposição ocupacional continuada a solventes químicos ou sílica'],
    red_flags: ['Crise renal do escleroderma (hipertensão arterial súbita maligna e anúria)', 'Hipertensão arterial pulmonar refratária de rápida instalação', 'Pneumopatia intersticial fibrosante com redução grave de capacidade pulmonar', 'Sub-oclusão de alças intestinais por fibrose da submucosa'],
    diferenciais: ['Síndrome de eosinofilia-mialgia de L-triptofano', 'Miopatia inflamatória idiopática severa com escleroderma associado', 'Dermatite crônica por estase venosa crônica endurecida', 'Amiloidose cutânea infiltrativa infiltrada']
  },
  {
    id: 'D50.9',
    nome: 'Anemia Ferropriva Crônica',
    sintomas: ['Cansaço crônico progressivo, adinamia e fraqueza', 'Palidez cutâneo-mucosa proeminente (nas escleras de olhos)', 'Cefaleia e tonturas posturais esporádicas leves', 'Pica ou desejo excessivo de Comer coisas esdrúxulas (gelo, terra)', 'Unha em colher (coiloníquia) frágeis descamativas', 'Glossite dolorosa com perda de papilas da língua', 'Queda de cabelos'],
    fatores_risco: ['Sangramento menstrual excessivo de longa data (menorragia)', 'Hemorragias ocultas crônicas do trato digestivo (câncer colorretal)', 'Dieta de padrão vegetariano estrito com baixa ingestão de ferro heme', 'Gestação ativa com suplementação ausente de via oral', 'Procedimento prévio de cirurgia bariátrica de técnica de bypass'],
    red_flags: ['Angina do peito instável de demanda provocada por anemia grave', 'Hipotensão postural com síncope recorrente em idosos', 'Insuficiência cardíaca descompensada de alto débito biventricular', 'Disfunção cognitiva severa flutuante em crianças e idosos'],
    diferenciais: ['Anemia de doença inflamatória crônica (ferro normal ou alto)', 'Beta-talassemia menor (microcitose mímica com ferro normal)', 'Anemia sideroblástica', 'Síndrome mielodisplásica em idosos de medula hipoplásica']
  },
  {
    id: 'D51.9',
    nome: 'Anemia Megaloblástica por Deficiência de B12',
    sintomas: ['Astenia crônica limitante e palidez cutânea com tom amarelado sutil', 'Parestesias em extremidades (formigamentos simétricos em pés)', 'Perda de sensibilidade vibratória e posicional profunda de pernas', 'Dificuldade marcante para caminhar e de equilíbrio (marcha tabética)', 'Glossite de Hunter (língua lisa vermelha extremamente dolorosa)', 'Alterações cognitivas flutuantes e demência (demência megaloblástica)'],
    fatores_risco: ['Dieta vegetariana ou vegana estrita prolongada sem suplementos', 'Anemia Perniciosa por autoanticorpos contra fator intrínseco', 'Histórico anterior de gastrectomia total ou parcial', 'Doença de Crohn de íleo distal (local de absorção de B12)', 'Uso crônico de metformina ou inibidores de bomba de prótons'],
    red_flags: ['Rápido declínio do estado neurológico por degeneração combinada subaguda de medula', 'Fraqueza em membros de padrão paraparético progressivo', 'Psicose delirante aguda delirante ativa (loucura megaloblástica)', 'Pancitopenia com risco de sangramentos e infecções oportunistas'],
    diferenciais: ['Neuropatia diabética simétrica distal', 'Esclerose múltipla medular', 'Mieloma múltiplo', 'Anemia aplásica primária', 'Hipotireoidismo de longa data senil']
  },
  {
    id: 'D63.8',
    nome: 'Anemia por Doença Crônica',
    sintomas: ['Cansaço crônico de intensidade moderada e adinamia', 'Palidez cutânea crônica leve flutuante', 'Falta de ar leve apenas aos grandes esforços', 'Outros sintomas que decorrem da doença inflamatória de base'],
    fatores_risco: ['Infeções crônicas ativas (tuberculose, osteomielite, HIV)', 'Doenças autoimunes ativas (Artrite Reumatoide, Lupus, DII)', 'Neoplasias sólidas ocultas em adiantado estágio de curso', 'Doença renal crônica estágio moderado a grave'],
    red_flags: ['Necessidade crônica persistente de transfusão com hemoglobina abaixo de 7 g/dL', 'Rápido declínio funcional limitando o tratamento de quimioterapia', 'Falha renal associada que magnifica as descompensações celulares'],
    diferenciais: ['Anemia ferropriva pura (ferritina muito baixa, ferro baixo)', 'Anemia por intoxicação crônica de chumbo (Saturnismo)', 'Beta-talassemia trait leve', 'Hipotireoidismo e insuficiência de medula gástrica']
  },
  {
    id: 'D57.0',
    nome: 'Anemia Falciforme com Crise Dolorosa Vasoclusiva',
    sintomas: ['Crises de dores ósseas súbitas lancinantes em fêmur ou coluna', 'Dactilite dolorosa (síndrome mão-pé em crianças pequenas)', 'Icterícia crônica persistente escleral com tom de mel', 'Dores abdominais difusas simulando abdome agudo', 'Presença de úlceras de pernas de cicatrização extremamente lenta', 'Esplenomegalia em crianças que evolui para asplenia funcional'],
    fatores_risco: ['Herança homozigótica HBSS (fração mutada da hemoglobina humana)', 'Exposição repentina a desidratação, frio extremo ou infecções', 'Hipóxia por altitude ou voos em cabines despressurizadas', 'Atividade física extenuante exaustiva sem pausas hídricas'],
    red_flags: ['Síndrome Torácica Aguda catastrófica (dispneia, dor, infiltrado novo chest)', 'Sequestro esplênico agudo volumoso com hipotensão e queda de HB', 'Acidente vascular cerebral isquêmico ou hemorrágico em jovem', 'Priapismo persistente doloroso necessitando drenagem urológica de eurgência'],
    diferenciais: ['Artrite séptica bacteriana de coxa/quadril', 'Apendicite aguda ou colite biliar biliar em evolução', 'Osteomielite purulenta por Salmonella ou estafilococo', 'Necrose asséptica primária da cabeça do fêmur']
  },
  {
    id: 'I82.9-TVP',
    nome: 'Trombose Venosa Profunda do Membro Inferior',
    sintomas: ['Edema assimétrico acentuado em perna unilateral afetada', 'Dor localizada de forte intensidade na panturrilha profunda', 'Aumento da temperatura cutânea local e eritema em queimação', 'Aparecimento eventual de rede venosa colateral visível', 'Sinal de Homans positivo (dor intensa à dorsiflexão plantar)'],
    fatores_risco: ['Cirurgia de grande porte recente pélvica ou ortopédica de quadril', 'Imobilização prolongada no leito ou viagens aéreas longas (> 6h)', 'Gravidez ativa de último trimestre ou puerpério domiciliar', 'Neoplasias ocultas ativas e estado de hipercoagulabilidade humoral', 'Uso diário de pílulas anticoncepcionais orais contendo estrógeno'],
    red_flags: ['Surgimento repentino de falta de ar profunda com taquipneia (TEP de de curso)', 'Phlegmasia cerulea dolens (cianose profunda periférica por perda total de refluxo venoso e isquemia do membro)', 'Dor torácica de caráter pleurítico unilateral súbita'],
    diferenciais: ['Ruptura de cisto sinovial poplíteo de Baker', 'Celulite bacteriana aguda inflamada', 'Erisipela do membro inferior unilateral em placas', 'Distensão de gêmeo de panturrilha por estiramento muscular', 'Eczema crônico de estase venosa crônica descompensada']
  },
  {
    id: 'D69.3',
    nome: 'Plaquetopenia Imune Primária (PTI)',
    sintomas: ['Surgimento súbito de petéquias múltiplas puntiformes em pele', 'Equimoses cutâneas excessivas sem trauma de relevância', 'Epistaxe espontânea abundante de difícil controle nasal', 'Gengivorragia (sangramento de gengivas ao escovar dentes)', 'Menorragia volumosa com cólicas intensas', 'Urina com presença de microfração de sangue'],
    fatores_risco: ['Infecção viral precedente de vias aéreas superiores (em crianças)', 'Genética ou autoimunidade mista sistêmica (LES, tireoidites)', 'Vacinação viral recente nos últimos 30 dias', 'Idade jovem reprodutiva no gênero de mulheres'],
    red_flags: ['Plaquetas séricas abaixo de 10.000/mm³ de curso de risco agudo', 'Sangramentos ativos em mucosas (epistaxe ou gengivorragia penosas)', 'Cefaleia súbita de forte intensidade com rebaixamento (sugere AVC hemorrágico intracraniano)', 'Sangramento gastrointestinal volumoso manifesto por melena ou vômitos'],
    diferenciais: ['Leucemia Mieloide Aguda (LMA) ou Linfocítica (LLA)', 'Anemia aplásica primária medular', 'Púrpura Trombocitopênica Trombótica (PTT) com esquizócitos', 'Coagulação Intravascular Disseminada (CIVD) séptica', 'Nefropatia urêmica plaquetopênica']
  },
  {
    id: 'G43.9',
    nome: 'Enxaqueca Clássica (Migrânea)',
    sintomas: ['Cefaleia unilateral de caráter estritamente pulsátil lancinante', 'Intolerância extrema à luz direta (fotofobia) e ruídos (fonofobia)', 'Febre nula associada à náuseas frequentes e vômitos reativos', 'Dor de forte intensidade que piora com atividade física comum', 'Duração típica do episódio doloroso entre 4 a 72 horas', 'Presença eventual de aura visual (escotomas cintilantes anteriores)'],
    fatores_risco: ['Gênero feminino idade jovem ou média fértil (relação de 3 para 1)', 'Privação cumulativa de sono de dias ou distúrbios crônicos', 'Trigonação alimentar por queijo maturado, chocolate, vinho tinto', 'Estresse emocional ou períodos pós-estresse ("cefaleia do fim de semana")', 'Uso regular excessivo de anticoncepcionais orais estrogênicos'],
    red_flags: ['Mudança súbita radical no padrão de dor em doente crônico (dor de "trovão")', 'Cefaleia associada a sinal neurológico focal persistente pós-aura', 'Início tardio inexplicado de enxaqueca após os 50 anos de idade', 'Rigidez de nuca com febre alta associada'],
    diferenciais: ['Cefaleia tensional comum simétrica bilateral', 'Cefaleia em salvas unilateral extremamente dolorosa peri-ocular', 'Hemorragia subaracnoidea por aneurisma roto agudo', 'Tumor cerebral expansivo ou abscesso intracraniano', 'Sinusite purulenta']
  },
  {
    id: 'G44.2',
    nome: 'Cefaleia Tensional de Repetição',
    sintomas: ['Dor de localização bilateral simétrica em padrão de "capacete" ou aperto', 'Dor tipo compressiva de intensidade leve a moderada', 'Ausência de náuseas importantes ou vômitos associados', 'Não piora com atividade física habitual cotidiana', 'Ligeira sensibilidade à palpação de musculatura pericraniana e cervical', 'Sensibilidade leve a ruídos ou luz flutuantes'],
    fatores_risco: ['Transtornos de ansiedade ativos ou estresse ocupacional continuado', 'Postura de pescoço inadequada no terminal de computador por horas', 'Distúrbio de articulação temporomandibular (ATM) ou bruxismo', 'Falta Crônica de sono e repouso de noites', 'Sedentarismo e restrição de exercícios aeróbicos'],
    red_flags: ['Cefaleia refratária de crescimento progressivo contínuo que desperta do sono', 'Perda visual transitória ou dor ao pentear cabelo em idosos (Arterite)', 'Edema de papila óptica verificado ao exame oftálmico', 'Presença de febre alta concomitante'],
    diferenciais: ['Enxaqueca clássica unilateral pulsátil sem causa respiratória', 'Cefaleia por abuso de analgésicos comuns (mecanismo rebote)', 'Hipertensão intracraniana idiopática', 'Glaucoma agudo de ângulo fechado']
  },
  {
    id: 'G20',
    nome: 'Doença de Parkinson Inicial',
    sintomas: ['Tremor de repouso unilateral característico de mãos ("contar moedas")', 'Rigidez muscular de padrão em "roda denteada" nos punhos', 'Bradicinesia marcada (lentidão extrema nos movimentos habituais)', 'Instabilidade postural sutil ao tentar se virar rápido', 'Micrografia (tamanho das letras escritas diminui progressivamente)', 'Facies inexpressiva em máscara de olhar fixo hipomimia', 'Marcha festinante a passos curtos arrastados', 'Constipação e hiposmia (olfato diminuído) acompanhando'],
    fatores_risco: ['Idade superior a 60 anos na grande maioria', 'Histórico familiar positivo de Doença de Parkinson', 'Exposição continuada a pesticidas industriais ou metais pesados', 'Histórico consolidado de concussões cerebrais repetidas de atletas'],
    red_flags: ['Surgimento veloz de quedas frequentes graves e lesões traumáticas', 'Disfonias e disfagia importantes com asfixia e pneumonia aspirativa', 'Demência parkinsoniana estabelecida com alucinações visuais graves', 'Hipotensão postural intensa e disautonomia simpática refratária'],
    diferenciais: ['Tremor essencial bilateral simétrico de ação que melhora com álcool', 'Parkinsonismo induzido por drogas neurolépticas (Antidopaminérgicos)', 'Paralisia Supranuclear Progressiva (PSP) com queda de olhar', 'Demência por corpos de Lewy inicial']
  },
  {
    id: 'G30.9',
    nome: 'Doença de Alzheimer de Progressão Moderada',
    sintomas: ['Apraxia progressiva (esquecimento de como realizar tarefas cotidianas)', 'Afasia sutil com dificuldade para nomear objetos simples', 'Desorientação espacial e temporal frequente na vizinhança', 'Alterações marcantes do humor e comportamento (irritabilidade, apatia)', 'Perda grave de memória recente com preservação de memórias antigas', 'Delírios persecutórios de que está sendo roubado por familiares'],
    fatores_risco: ['Idade avançada superior a 70 anos em forte ascensão', 'Presença confirmada do alelo APOE epsilon 4 genético', 'Hipertensão, diabetes e aterosclerose em meia-idade', 'Baixa escolaridade cumulativa e estímulo intelectual reduzido', 'Sedentarismo e perda de audição não corrigida de idosos'],
    red_flags: ['Delirium agudo hiperativo devido a infecção oculta (ITU, pneumonia)', 'Surtos de agressividade violenta incontrolável em domicílio', 'Vandalisme alimentar ou perdas na rua por perambulação não supervisionada', 'Sinais de disfagia persistente com tosse e risco de aspiração pulmonar'],
    diferenciais: ['Demência Vascular com progressão em degraus e deficit focal', 'Hidrocefalia de Pressão Normal (HPN) (demência, marcha e incontinência)', 'Transtorno depressivo maior simulador (Pseudodemência no idoso)', 'Hipotireoidismo severo reversível', 'Deficiência de vitamina B12']
  },
  {
    id: 'G40.9',
    nome: 'Epilepsia Focal de Crises de Repetição',
    sintomas: ['Crises paroxísticas motoras localizadas em um membro unilateral', 'Surgimento súbito de aura epiléptica ou epigástrica ascendente', 'Período pós-ictal de torpor sonolência ou confusão mental aguda', 'Presença eventual de automatismos motores (mastigação, gestos repetidos)', 'Paralisia pós-ictal de Todd transitória de força muscular unilateral', 'Mordedura lateral de língua durante a crise', 'Perda súbita de consciência intermitente'],
    fatores_risco: ['Sequela cicatricial de acidente vascular cerebral antigo', 'Histórico anterior de traumatismo cranioencefálico com contusão', 'Malformações corticais congênitas do desenvolvimento cerebral', 'Infecção prévia do SNC de neurocisticercose calcificada ou meningite', 'Histórico na infância de crises convulsivas febris prolongadas'],
    red_flags: ['Estado de Mal Epiléptico em evolução (> 5 min de crise sem recuperação ou crises sucessivas)', 'Apneia prolongada com hipoxemia e cianose profunda nas crises', 'Quedas traumáticas com hematoma subdural cerebral agudo', 'Arritmia cardíaca grave induzida por descarga adrenérgica ictal (SUDEP)'],
    diferenciais: ['Síncope vasovagal de ortostatismo com abalos mioclônicos reativos', 'Crises não-epilépticas psicogênicas puras de padrão fletor', 'Ataque Isquêmico Transitório (AIT) de deficit focal', 'Distúrbio do sono de terror noturno motor', 'Crise de pânico aguda']
  },
  {
    id: 'G62.9-ND',
    nome: 'Dor Neuropática Diabética Simétrica Distal',
    sintomas: ['Dor intensa em queimação simétrica em pés e artelhos ("pés queimando")', 'Sensação de "choques elétricos", formigamento ou agulhadas dolorosas', 'Hiperalgesia acentuada (dor extrema a estímulos levemente dolorosos)', 'Alodinia (dor insuportável ao toque leve de lençóis nas pernas)', 'Parestesias persistentes com sensação de dormência permanente em bota', 'Diminuição progressiva de reflexos aquileus em pernas', 'Perda de sensibilidade térmica e táctil distal em pés'],
    fatores_risco: ['Diabetes mellitus descontrolada de longa duração (> 10 anos)', 'Presença concomitante de microalbuminúria e retinopatia diabética', 'Tabagismo pesado ativo agravando hipóxia de nervos periféricos', 'Sobrepeso com dislipidemia mista de longo curso', 'Deficiência de vitaminas do complexo B induzida por drogas'],
    red_flags: ['Surgimento de úlceras plantares indolores de atrito (Mal Perfurante Plantar)', 'Desenvolvimento de Artropatia de Charcot (pé deformado inchado calor indolor)', 'Neuropatia autonômica cardiovascular com hipotensão postural severa', 'Infecção bacteriana profunda de ferida em pé diabético com osteomielite'],
    diferenciais: ['Insuficiência arterial crônica obstrutiva (claudicação periférica)', 'Estenose de canal lombar vertebral compressiva', 'Neuropatia alcoólica simétrica em bota de extremidades', 'Deficiência grave de Vitamina B12 medular']
  },
  {
    id: 'G35',
    nome: 'Esclerose Múltipla Recorrente-Remitente',
    sintomas: ['Episódios agudos de perda de força ou paralisia em um membro unilateral', 'Neurite óptica aguda (perda de acuidade visual dolorosa unilateral)', 'Fadiga crônica de intensidade avassaladora injustificada', 'Sinal de Lhermitte positivo (sensação de choque espinhal ao fletir pescoço)', 'Dificuldade de marcha e instabilidade do equilíbrio por ataxia cerebelar', 'Disartria e alteração súbita no controle urinário', 'Diplopia transitória dolorosa'],
    fatores_risco: ['Sexo feminino (proporção média de 3 para 1)', 'Idade jovem de início entre 20-40 anos de vida', 'Etnia branca ou descendência do norte europeu', 'Ausência de exposição solar diária e níveis muito baixos de vitamina D', 'Infecção antiga pelo vírus EBV documentada no soro'],
    red_flags: ['Neurite óptica bilateral simultânea com risco de amaurose irreversível', 'Disautonomia cardiovascular severa instável de repouso', 'Urgência urinária persistente desenvolvendo pielonefrite de repetição', 'Depressão psíquica maior com ideação suicida recorrente'],
    diferenciais: ['Neuromielite Óptica (NMO) clássica anti-AQP4', 'Lupus Eritematoso Sistêmico com lesões cerebrais associadas', 'Linfoma primário do SNC mímico multifocal', 'Deficiência de vitamina B12 em bota', 'Meningoencefalite fúngica crônica de início vago']
  },
  {
    id: 'G70.0',
    nome: 'Miastenia Gravis Ocular ou Sistêmica',
    sintomas: ['Ptose palpebral unilateral ou bilateral que piora ao entardecer', 'Fadiga muscular que se acentua ao uso repetido e melhora com repouso', 'Diplopia flutuante (visão dupla ao fixar olhar em tela por tempo)', 'Dificuldade crônica para mastigar ou falar sem descansar intermitente', 'Voz anasalada e flacidez de hemiface distal facial', 'Fraqueza proximal de membros superiores e pernas', 'Dificuldade para deglutir sólidos ao fim das refeições'],
    fatores_risco: ['Idades de início bimodais (mulheres jovens 20-30 anos e idosos homens 60-70 anos)', 'Histórico coincidente de hiperplasia tímica ou Timoma de mediastino', 'Autoanticorpos anti-AChR positivos ou anti-MuSK séricos', 'Uso acidental de antibióticos aminoglicosídeos piorando o quadro neuromuscular'],
    red_flags: ['Crise Miastênica fulminante com insuficiência respiratória por fadiga diafragmática', 'Disfagia grave com aspiração maciça de conteúdo alimentar purulento', 'Instabilidade postural severa com quedas de trauma craniano', 'Taquicardia ou hipotensão em falência muscular respiratória'],
    diferenciais: ['Síndrome de Lambert-Eaton (força do músculo melhora ligeiramente ao exercício continuado)', 'Esclerose Lateral Amiotrófica (ELA) progressiva fasciculata', 'Síndrome de Guillain-Barré periférica', 'Botulismo infeccioso alimentar', 'Paralisia por hipocalemia flácida']
  },
  {
    id: 'L20.9',
    nome: 'Dermatite Atópica Moderada',
    sintomas: ['Prurido extremamente intenso generalizado em surtos', 'Lesões eczematosas eritematosas em áreas de dobras (fossa cubital/poplítea)', 'Pele seca e áspera crônica generalizada (xerose cutânea)', 'Liquenificação secundária da pele em áreas de coçadura contínua', 'Exsudação serosa e crostas de lesões escoriadas', 'Descamação fina facial e de pálpebras bilaterais'],
    fatores_risco: ['Histórico pessoal ou familiar forte de atopia (asma, rinite, alergia)', 'Disfunção na proteína barreira epitelial de filagrina', 'Uso repetido de sabonetes industriais abrasivos e banhos quentes', 'Exposição a tecidos sintéticos, lãs e produtos perfumados', 'Estresse emocional ou alterações bruscas de umidade do clima'],
    red_flags: ['Eczema Herpético (infecção por HSV mista disseminada ultra-dolorosa vesicular)', 'Infecção secundária maciça por Staphylococcus aureus purulento (impetiginização)', 'Eritrodermia esfoliativa generalizada cobrindo >90% da superfície', 'Prurido crônico intratável levando a transtornos de ansiedade e insônia grave'],
    diferenciais: ['Dermatite seborreica facial e tronco', 'Dermatite de contato alérgica tardia', 'Escabiose infecciosa generalizada', 'Psoríase vulgar em placas atípicas', 'Micose de pele disseminada (Tinea corporis)']
  },
  {
    id: 'L40.0',
    nome: 'Psoríase Vulgar em Placas',
    sintomas: ['Placas eritematosas bem delimitadas cobertas por escamas prateadas', 'Localização clássica em superfícies extensoras (cotovelos e joelhos)', 'Acometimento de couro cabeludo com descamação abundante esbranquiçada', 'Sinal de Auspitz positivo (orvalho sangrento ao destacar escama)', 'Urticabilidade ou prurido leve a moderado em placas extensas', 'Alterações ungueais como depressões cupuliformes (pittings/unha em dedal) ou manchas de óleo'],
    fatores_risco: ['Predisposição genética e presença de alelo HLA-Cw6', 'Estresse emocional severo na indução e piora crônica', 'Climas secos e frios que reduzem a umidade da pele', 'Uso sistêmico de corticoide (risco de psoríase pustulosa rebote)', 'Consumo exagerado de álcool e tabagismo ativo pesado'],
    red_flags: ['Evolução para Psoríase Pustulosa generalizada (Von Zumbusch) com choque', 'Psoríase Eritrodérmica generalizada infecciosa necessitando internação', 'Associação à Artrite Psoriática mutilante e grave de articulações', 'Rápido surgimento de lesões exsudativas com febre alta e calafrios'],
    diferenciais: ['Dermatite Seborreica do couro cabeludo', 'Líquen Plano de placas hipertróficas violáceas', 'Tinea Corporis de bordas descamativas ativas', 'Pitiríase Rósea de Gilbert de medalhão inicial', 'Eczema numular pruriginoso de braços']
  },
  {
    id: 'L70.0',
    nome: 'Acne Vulgar Grau II ou III',
    sintomas: ['Comedões abertos e fechados abundantes (cravos pretos/brancos na face)', 'Pápulas inflamadas eritematosas dolorosas', 'Pústulas com halo inflamatório purulento em bochechas e testa', 'Evolução tardia das lesões purulentas para cicatrizes deprimidas', 'Pele severamente seborreica extremamente oleosa e brilhante', 'Lesões nodulares flutuantes sob pele dolorosa (Grau III)'],
    fatores_risco: ['Idade na puberdade adolescente (ação de andrógenos na pele)', 'Histórico familiar importante de acne severa cicatricial', 'Consumo excessivo de alimentos hiperglicêmicos de leite e derivados', 'Uso incorreto continuado de cosméticos comedogênicos oleosos', 'Transtornos endócrinos como SOP o Síndrome de Cushing'],
    red_flags: ['Acne Fulminans (surgimento súbito de pápulas necróticas purulentas generalizadas, febre alta, dores ósseas e sepse)', 'Cicatrizes graves deprimidas permanentes em face com grande impacto na autoimagem e ideação suicida', 'Infecção mista secundária por Staphylococcus aureus com celulite facial de risco orbital'],
    diferenciais: ['Rosácea inflamatória eritemato-pápulopustulosa (sem comedões)', 'Dermatite perioral papular fétida', 'Foliculite bacteriana por estafilococo', 'Erupção acneiforme induzida por corticoide oral ou suplementos']
  },
  {
    id: 'L71.8',
    nome: 'Rosácea Subtipo Eritematotelangiectásica',
    sintomas: ['Estímulo de rubor facial temporário súbito transitório (flushing)', 'Eritema centrofacial persistente simétrico', 'Telangiectasias visíveis nas bochechas e nariz', 'Sensação local frequente de queimação ou pinicação facial', 'Pele facial extremamente sensível a cosméticos comuns'],
    fatores_risco: ['Etnia branca ou descendência europeia', 'Exposição habitual à luz solar ou ventos fortes', 'Consumo frequente de bebidas quentes, álcool ou comidas condimentadas', 'Idade entre 30-50 anos no gênero de mulheres'],
    red_flags: ['Ocorrência de acometimento inflamatório ocular (Rosácea Ocular com blefarite e ceratite dolorosa)', 'Rinofima exuberante (espessamento lobulado nasal por hipertrofia sebácea)', 'Plaquetopenia ocular concomitante ao glaucoma de ângulo'],
    diferenciais: ['Lupus Eritematoso Sistêmico (asa de borboleta sem telangiectasia)', 'Acne vulgar inflamatória clássica', 'Dermatite de contato alérgica facial', 'Dermatite seborreica facial']
  },
  {
    id: 'L21',
    nome: 'Dermatite Seborreica do Couro Cabeludo',
    sintomas: ['Descamação fina esbranquiçada ou amarelada oleosa (caspa)', 'Prurido no couro cabeludo que piora com suor ou estresse', 'Placas eritematosas cobertas por escamas gordurosas em glabela', 'Localização clássica em sulco nasogeniano, sobrancelhas e retroauricular'],
    fatores_risco: ['Histórico de hiperatividade de glândulas sebáceas', 'Proliferação local acentuada do fungo Malassezia', 'Estresse psíquico severo ou privação crônica de sono', 'Condições neurológicas como Doença de Parkinson', 'Imunossupressão ou infecção por HIV ativa'],
    red_flags: ['Eritrodermia seborreica generalizada (doença de Leiner em lactentes)', 'Infecção fúngico-bacteriana secundária com pústulas e celulite', 'Alopecia cicatricial secundária a inflamação folicular severa'],
    diferenciais: ['Psoríase de couro cabeludo (placas muito espessas prateadas)', 'Tinea capitis microbiana', 'Dermatite atópica de fase facial', 'Dermatite de contato a cosméticos capilares']
  },
  {
    id: 'L63',
    nome: 'Alopecia Areata',
    sintomas: ['Perda súbita de pelos corporais em placas circulares lisas', 'Presença de pelos na periferia do "patch" em ponto de exclamação', 'Surgimento eventual de covinhas na lâmina ungueal (traquioníquia)', 'Ausência de sinais inflamatórios exuberantes ou cicatrizantes locais', 'Prurido ou ardência discretos na área afetada antes da queda'],
    fatores_risco: ['Histórico pessoal de vitiligo, tireoidite de Hashimoto ou celíaca', 'Predisposição genética e presença de alelos HLA específicos', 'Estresse emocional severo recente ou luto familiar', 'Idade jovem infantil ou jovem adulto inferior a 30 anos'],
    red_flags: ['Progressão rápida para Alopecia Totalis (perda de todos os pelos do couro cabeludo)', 'Evolução para Alopecia Universalis (perda total de todos os pelos do corpo)', 'Depressão maior grave ou ideação suicida por grande impacto psicossocial'],
    diferenciais: ['Tricotilomania (arrancamento compulsivo com pelos de comprimentos variáveis)', 'Tinea capitis fúngica descamativa', 'Eflúvio telógeno agudo pós-infeccioso', 'Alopecia cicatricial de líquen plano pilar']
  },
  {
    id: 'I87.2',
    nome: 'Insuficiência Venosa Crônica (IVC)',
    sintomas: ['Sensação de peso e cansaço em pernas que piora ao fim do dia', 'Edema de membros inferiores bilateral que melhora com elevação', 'Presença de varizes calibrosas e microtelangiectasias reticulares', 'Dermatite de estase (pele acastanhada na região maleolar por hemossiderina)', 'Prurido cutâneo em pernas e queimação persistente'],
    fatores_risco: ['Sexo feminino e histórico de multiparidade ou gravidez', 'Trabalho profissional de pé ou sentado por longas horas sem andar', 'Obesidade e sobrecarga mecânica abdominal', 'Idade avançada maior do que 50 anos', 'Histórico anterior de Trombose Venosa Profunda (síndrome pós-trombótica)'],
    red_flags: ['Surgimento de úlcera varicosa maleolar dolorosa ativa aberta', 'Hemorragia externa aguda de veia varicosa rota (Varicoflebite/Varicorragia)', 'Celulite ou erisipela de repetição devido a linfedema secundário'],
    diferenciais: ['Linfedema primário duro indolor unilateral', 'Insuficiência cardíaca congestiva de alto grau', 'Trombose Venosa Profunda aguda de instalação súbita', 'Insuficiência renal crônica anasarca']
  },
  {
    id: 'F41.1',
    nome: 'Transtorno de Ansiedade Generalizada (TAG)',
    sintomas: ['Preocupação excessiva crônica injustificada sobre eventos cotidianos', 'Irritabilidade frequente e dificuldade pronunciada de relaxamento', 'Tensão muscular dolorosa constante em pescoço e ombros', 'Distúrbios de início e manutenção de sono (insônia de conciliação)', 'Sintomas somáticos como palpitações, epigastralgia e tremores', 'Fadiga física e mental precoce limitante no trabalho'],
    fatores_risco: ['Sexo feminino (relação de 2 para 1 em relação a homens)', 'Histórico familiar de outros transtornos de ansiedade ou depressão', 'Experiências traumáticas acumulativas ou abusos na infância', 'Presença de estressores psicossociais crônicos vigentes', 'Abuso silencioso de cafeína ou estimulantes de emagrecimento'],
    red_flags: ['Ideação suicida reativa secundária a sofrimento mental crônico', 'Uso nocivo de benzodiazepínicos ou álcool para auto-tratamento', 'Sintomas somáticos simulando doenças graves que impedem o autocuidado'],
    diferenciais: ['Hipertiroidismo primário de Graves', 'Feocromocitoma produtor de catecolaminas', 'Transtorno do pânico recorrente', 'Transtorno obsessivo-compulsivo', 'Abuso crônico de cocaína']
  },
  {
    id: 'F32.9',
    nome: 'Transtorno Depressivo Maior Recorrente',
    sintomas: ['Humor deprimido persistente na maior parte do dia por > 2 semanas', 'Anedonia severa (perda total do interesse ou prazer nas atividades)', 'Insônia grave ou hipersônia diurna persistente', 'Alteração marcante involuntária de peso e apetite', 'Sensação permanente de inutilidade, culpa excessiva e autodesvalorização', 'Dificuldade para se concentrar ou tomar pequenas decisões', 'Fadiga extrema sem causa orgânica funcional'],
    fatores_risco: ['Sexo feminino e idade jovem adulta reprodutiva', 'Histórico familiar de depressão maior ou suicídio na família', 'Presença de dor crônica ou doença clínica incapacitante limitadora', 'Perda recente de cônjuge, emprego ou luto familiar severo', 'Privação crônica de sono de noites acumuladas'],
    red_flags: ['Ideação suicida com planejamento planejado ou tentativa prévia', 'Sintomas psicóticos congruentes com humor (alucinações ou delírios lúgubres)', 'Isolamento social absoluto com recusa de alimentação e hidratação', 'Negligência grave no cuidado médico de outras comorbidades graves'],
    diferenciais: ['Hipotireoidismo de longa data severo', 'Transtorno bipolar em fase de depressão cicladora', 'Demência incipiente em idosos de início vago', 'Luto normal adaptativo sem autodesvalorização extrema']
  },
  {
    id: 'F41.0',
    nome: 'Transtorno do Pânico',
    sintomas: ['Ataques de pânico súbitos inesperados de medo excruciante extremo', 'Sensação iminente de morte ou perda total de controle mental', 'Opressão torácica em aperto e sensação sufocante de asfixia', 'Taquicardia severa palpitações sudorese fria profusa e tremores', 'Parestesias periorais ou em mãos por hiperventilação compensadora', 'Medo persistente de sofrer novos ataques (ansiedade antecipatória)', 'Esquiva agorafóbica de locais cheios sem saída'],
    fatores_risco: ['Idade adolescente ou adulto jovem com história de traumas', 'Abuso na infância de privação afetiva parental', 'Presença de asma, doença do refluxo ou prolapso mitral concomitantes', 'Consumo exagerado de psicoestimulantes café ou derivados'],
    red_flags: ['Pensamentos suicidas reativos por fardo emocional', 'Isolamento domiciliar completo crônico limitador de rotina', 'Abuso secundário de automedicação sedativa alcoólica crônica'],
    diferenciais: ['Infarto agudo do miocárdio coronariano', 'Fibrilação atrial de resposta rápida em surto', 'Tromboembolismo pulmonar agudo', 'Hipoglicemia grave medicamentosa', 'Feocromocitoma produtor']
  },
  {
    id: 'F20.0',
    nome: 'Esquizofrenia Paranoide',
    sintomas: ['Delírios persecutórios bizarros de que está sendo espionado', 'Alucinações auditivas ricas ("vozes que comentam seus atos")', 'Desorganização leve do pensamento e discurso incoerente', 'Apatia e embotamento afetivo (expressão emocional nula)', 'Retraimento social progressivo com perda de autocuidado sanitário', 'Comportamento catatônico sutil episódico'],
    fatores_risco: ['Gênero masculino com início precoce de sintomas (15-25 anos)', 'Histórico familiar de esquizofrenia ou transtorno esquizoafetivo', 'Consumo regular de cannabis sintética ou maconha na adolescência', 'Complicações obstétricas maternas durante a gestação ou parto'],
    red_flags: ['Comportamento agressivo reativo sob instrução das alucinações ("comando auditivo")', 'Suicídio impulsivo reativo ao terror provocado pelos delírios', 'Negligência total alimentar e higiênica voluntária perigosa'],
    diferenciais: ['Psicose induzida pelo consumo agudo de anfetaminas ou cocaína', 'Encefalite anti-NMDA autoimune com psicose florida', 'Transtorno bipolar de humor fase maníaca com sintomas psicóticos', 'Delirium tóxico agudo secundário']
  },
  {
    id: 'F30.9',
    nome: 'Transtorno Bipolar Fase Maníaca',
    sintomas: ['Autoestima inflada ou sentimentos de grandiosidade bizarros', 'Redução drástica da necessidade de sono para se sentir descansado', 'Pressão para falar em demasia (logorreia) ininterrupta', 'Fuga de ideias com pensamento hiper-acelerado disperso', 'Distratividade extrema na realização de tarefas simultâneas', 'Engajamento imprudente em atividades prazerosas de alto risco', 'Agitação psicomotora importante constante'],
    fatores_risco: ['Histórico familiar positivo forte de Transtorno Bipolar', 'Uso recente de antidepressivos sem estabilizador de humor (virada maníaca)', 'Idade de início usual jovem entre 18-35 anos de idade', 'Estresse agudo de privação de sono por 48 horas seguidas'],
    red_flags: ['Comportamento financeiro ruinosa ou hipersexualidade de risco extremo', 'Sintomas psicóticos de grandiosidade bizarros interferindo com terceiros', 'Suicídio impulsivo subsequente a esgotamento mental na virada rápida', 'Desidratação e rabdomiólise por agitação psicomotora incoercível de dias'],
    diferenciais: ['Esquizofrenia paranoide activa de início súbito', 'Intoxicação aguda por cocaína ou ecstasy', 'Hipertiroidismo grave descompensado em surto', 'Transtorno de personalidade borderline de impulsividade reactiva']
  },
  {
    id: 'E24.9',
    nome: 'Síndrome de Cushing',
    sintomas: ['Ganho ponderal rápido concentrado em tronco e abdome', 'Facies em "lua cheia" (rosto arredondado avermelhado)', 'Gordura acumulada na região supraclavicular ("giba de búfalo")', 'Estrias violáceas largas (> 1cm) em abdome e coxas', 'Pele fina frágil com equimoses espontâneas múltiplas', 'Fraqueza muscular proximal acentuada em pernas ao subir escada', 'Hirsutismo facial progressivo e cefaleias frequentes'],
    fatores_risco: ['Uso prolongado de corticoide exógeno oral ou injetável de balcão', 'Adenoma produtor de ACTH hipofisário (Doença de Cushing)', 'Tumor adrenal unilateral produtor de cortisol autônomo', 'Síndrome de ACTH ectópico (carcinoma de pequenas células de pulmão)'],
    red_flags: ['Hipotensão postural com sepse (risco de insuficiência adrenal aguda por supressão de eixo)', 'Diabetes mellitus tipo 2 rebelde e hipertensão severa descompensadas', 'Paraparesia por osteoporose acelerada com múltiplas fraturas vertebrais', 'Infecções fúngicas oportunistas sistêmicas'],
    diferenciais: ['Obesidade simples exógena de padrão metabólico', 'Síndrome dos ovários policísticos típica', 'Hipotireoidismo clínico em mixedema', 'Depressão maior reativa com ganho de peso']
  },
  {
    id: 'E21.0',
    nome: 'Hiperparatireoidismo Primário',
    sintomas: ['Hipercalcemia assintomática detectada em exames rotina', 'Dores ósseas generalizadas profundas e dores musculares', 'Cólica nefrética recorrente por nefrolitíase de oxalato de cálcio', 'Constipação intestinal crônica e náuseas moderadas', 'Fadiga crônica, prostração e desânimo persistentes', 'Dificuldade crônica de concentração e lapsos de memória'],
    fatores_risco: ['Idade avançada maior do que 55 anos', 'Gênero feminino (mulheres na pós-menopausa mais afetadas)', 'Histórico familiar de neoplasia endócrina múltipla NEM-1 ou NEM-2A', 'Exposição cervical prévia a tratamento com radiação na infância'],
    red_flags: ['Crise hipercalcêmica aguda (cálcio > 14 mg/dL com anúria e arritmias cardíacas)', 'Insuficiência renal obstrutiva por nefocalcinose bilateral', 'Pancreatite aguda induzida por hipercalcemia extrema', 'Fraturas espontâneas múltiplas (osteíte fibrosa cística)'],
    diferenciais: ['Hipercalcemia de malignidade (câncer de mama, mieloma múltiplo)', 'Sarcoidose granulomatosa ativa hipersensibilidade à vitamina D', 'Uso habitual continuado de diurético tiazídico', 'Síndrome leite-álcali por consumo de antiácidos de cálcio']
  },
  {
    id: 'D86.0',
    nome: 'Sarcoidose Pulmonar Estadio I ou II',
    sintomas: ['Adenopatia hilar bilateral simétrica indolor assintomática', 'Tosse seca crônica irritativa persistente de meses', 'Dispneia progressiva leve apenas aos esforços moderados', 'Eritema nodoso (nódulos eritematosos extremamente dolorosos em canelas)', 'Artralgias simétricas bilaterais em tornozelos e punhos', 'Sudorese noturna discreta e perda de peso leve'],
    fatores_risco: ['Idade jovem entre 20-45 anos de idade', 'Sexo feminino e etnia afrodescendente (quadros de pior prognóstico)', 'Histórico familiar de sarcoidose ou granulomatoses pulmonares', 'Exposição ocupacional continuada a mofo ou poeiras de berílio'],
    red_flags: ['Uveíte anterior aguda dolorosa com fotofobia de amaurose', 'Bloqueio Atrioventricular (BAV) total ou arritmias ventriculares (Sarcoidose Cardíaca)', 'Paralisia de par craniano facial bilateral facial (Síndrome de Heerfordt)', 'Pneumopatia intersticial difusa de evolução rápida para fibrose pulmonar'],
    diferenciais: ['Tuberculose pulmonar ganglionar mímica bilateral', 'Linfoma de Hodgkin mediastinal em jovem', 'Histoplasmose ou Paracoccidioidomicose ativas', 'Silicose ocupacional grosseira pulmonar', 'Metástase pulmonar de câncer sólido']
  },
  {
    id: 'N10',
    nome: 'Pielonefrite Aguda Não Complicada',
    sintomas: ['Febre alta súbita (>38.5°C) precedida de calafrios intensos', 'Dor lombar unilateral ou bilateral profunda e contínua', 'Sinal de Giordano positivo unilateral (dor importante ao punho-percussão)', 'Náuseas frequentes com vômitos gastrointestinais reativos', 'Sintomas de cistite prévios como urgência, disúria e polaciúria', 'Prostração marcante e adinamia aguda de dias de evolução'],
    fatores_risco: ['Sexo feminino devido a anatomia uretral curta e próxima', 'Atividade sexual exuberante sem esvaziamento de bexiga pós-coito', 'Refluxo vesicoureteral não corrigido ou bexiga de resíduo', 'Diabetes mellitus crônica descompensada ou imunossupressão', 'Presença de gravidez ativa em qualquer trimestre de gestação'],
    red_flags: ['Instabilidade circulatória ou sinais severos de choque séptico urinário (Urossepse)', 'Anuria relativa ou progressão acelerada para insuficiência renal de rim único', 'Rim obstrutivo subjacente verificado por cálculo calicinal impactado', 'Evolução local para abscesso perinefrético purulento flutuante'],
    diferenciais: ['Litíase ureteral isolada (dor em cólica sem febre ou calafrios)', 'Apendicite aguda retrocecal', 'Abscesso retroperitoneal', 'Doença Inflamatória Pélvica severa', 'Colecistite aguda dolorosa']
  }
];
