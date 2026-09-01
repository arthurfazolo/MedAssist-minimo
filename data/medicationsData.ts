import { Medication } from '../types';

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'med-losartana',
    genericName: 'Losartana Potássica',
    pharmacologicalClass: 'Anti-hipertensivo / Bloqueador dos Receptores de Angiotensina (BRA)',
    presentations: [
      'Comprimido revestido 50mg',
      'Comprimido revestido 100mg'
    ],
    usualDoses: {
      standard: '50mg uma vez ao dia',
      max: '100mg ao dia',
      frequency: 'De 12 em 12 horas ou de 24 em 24 horas',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Aradois', 'Torlós', 'Cozaar', 'Corus'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'D',
      lactationNotes: 'Contraindicada durante a amamentação. Usar alternativas mais seguras como metildopa ou nifedipina.'
    },
    contraindications: [
      'Hipersensibilidade à losartana ou qualquer componente da fórmula',
      'Segundo e terceiro trimestres da gestação',
      'Uso concomitante com alisquireno em pacientes diabéticos ou com insuficiência renal (TFG < 60 mL/min)',
      'Histórico de angioedema relacionado a BRA ou IECA'
    ],
    drugInteractions: [
      'Aumenta risco de hipercalemia com espironolactona, amilorida ou suplementos de potássio',
      'AINEs (ibuprofeno, diclofenaco) reduzem o efeito anti-hipertensivo e aumentam risco de lesão renal',
      'Lítio: BRAs aumentam os níveis séricos de lítio com risco de toxicidade',
      'Fluconazol inibe o metabolismo da losartana aumentando seus níveis plasmáticos'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Hipertensão Arterial Sistêmica', prescriptionTitle: 'Hipertensão Leve (Início)' },
      { condition: 'Insuficiência Cardíaca', prescriptionTitle: '' },
      { condition: 'Nefropatia Diabética', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-amoxicilina-clav',
    genericName: 'Amoxicilina + Clavulanato de Potássio',
    pharmacologicalClass: 'Antibiótico / Penicilina associada a inibidor de beta-lactamase',
    presentations: [
      'Comprimido revestido 875mg + 125mg',
      'Suspensão oral 400mg + 57mg/5mL',
      'Pó para solução injetável 1g + 200mg (Frasco-ampola)'
    ],
    usualDoses: {
      standard: '875mg + 125mg de 12 em 12 horas',
      max: '2g de Amoxicilina ao dia (para VO)',
      frequency: 'De 12 em 12 horas (apresentações BD) ou de 8 em 8 horas (apresentações tradicionais)',
      route: 'Via Oral (VO) / Via Intravenosa (EV)'
    },
    commercialNames: ['Clavulin', 'Novamox', 'Sigma Clav', 'Amoxiclav'],
    susAvailability: true,
    costIndicator: '$$',
    prescriptionType: 'Antimicrobiano',
    pregnancySafety: {
      category: 'B',
      lactationNotes: 'Compatível com a amamentação. Pode causar diarreia e candidíase no lactente. Monitorar.'
    },
    contraindications: [
      'Hipersensibilidade a penicilinas, cefalosporinas ou inibidores de beta-lactamase',
      'Histórico de icterícia colestática ou disfunção hepática associada ao uso de amoxicilina/clavulanato',
      'Insuficiência renal grave sem ajuste de dose (ClCr < 30 mL/min para formulações BD)'
    ],
    drugInteractions: [
      'Varfarina: pode potencializar o efeito anticoagulante, monitorar INR',
      'Metotrexato: amoxicilina reduz a excreção renal do metotrexato aumentando sua toxicidade',
      'Anticoncepcional oral: redução discreta da eficácia (orientar método de barreira)',
      'Alopurinol: aumenta risco de rash cutâneo'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Pneumonia Adquirida na Comunidade', prescriptionTitle: 'Pneumonia Adquirida na Comunidade (PAC) — Tratamento Oral' },
      { condition: 'Sinusite Bacteriana', prescriptionTitle: '' },
      { condition: 'Infecção do Trato Urinário Complicada', prescriptionTitle: '' },
      { condition: 'Diverticulite Aguda', prescriptionTitle: 'Diverticulite Aguda Não Complicada — Ambulatorial' }
    ]
  },
  {
    id: 'med-ibuprofeno',
    genericName: 'Ibuprofeno',
    pharmacologicalClass: 'Analgésico, Antitérmico e Anti-inflamatório Não Esteroidal (AINE)',
    presentations: [
      'Comprimido 400mg',
      'Comprimido 600mg',
      'Suspensão gotas 50mg/mL',
      'Suspensão gotas 100mg/mL'
    ],
    usualDoses: {
      standard: '400mg de 6 em 6 horas ou de 8 em 8 horas',
      max: '2400mg ao dia (para anti-inflamação)',
      frequency: 'De 6 em 6 horas ou de 8 em 8 horas se necessário',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Alivium', 'Advil', 'Ibuflex', 'Dalsy'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Compatível com amamentação em doses habituais e por curto período. É o AINE de escolha durante a lactação.'
    },
    contraindications: [
      'Hipersensibilidade ao ibuprofeno ou outros AINEs',
      'Histórico de broncoespasmo, urticária ou rinite alérgica desencadeados por AAS ou outros AINEs',
      'Úlcera péptica ativa ou sangramento gastrointestinal',
      'Insuficiência renal grave (ClCr < 30 mL/min)',
      'Insuficiência hepática grave',
      'Insuficiência cardíaca grave',
      'Terceiro trimestre da gestação',
      'Crianças menores de 6 meses'
    ],
    drugInteractions: [
      'AAS: uso concomitante aumenta risco de sangramento gastrointestinal',
      'Varfarina e anticoagulantes: risco elevado de sangramento',
      'Lítio: AINEs aumentam os níveis séricos de lítio',
      'Anti-hipertensivos (IECAs, BRAs, diuréticos): redução do efeito e risco de lesão renal aguda',
      'Corticosteroides: risco aumentado de úlcera e sangramento gastrointestinal',
      'Metotrexato: reduz excreção renal do metotrexato aumentando toxicidade'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Dor Aguda Leve a Moderada', prescriptionTitle: '' },
      { condition: 'Febre', prescriptionTitle: '' },
      { condition: 'Lombalgia Aguda', prescriptionTitle: 'Lombalgia Aguda' },
      { condition: 'Crise Asmática Leve', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-atorvastatina',
    genericName: 'Atorvastatina Cálcica',
    pharmacologicalClass: 'Hipolipemiante / Estatina (Inibidor da HMG-CoA redutase)',
    presentations: [
      'Comprimido revestido 10mg',
      'Comprimido revestido 20mg',
      'Comprimido revestido 40mg',
      'Comprimido revestido 80mg'
    ],
    usualDoses: {
      standard: '10mg a 40mg uma vez ao dia',
      max: '80mg uma vez ao dia',
      frequency: 'Uma vez ao dia (a qualquer hora do dia)',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Lipitor', 'Citalor', 'Lipistat', 'Atorvaster'],
    susAvailability: true,
    costIndicator: '$$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'X',
      lactationNotes: 'Contraindicada durante a amamentação. Suspender antes de engravidar ou amamentar.'
    },
    contraindications: [
      'Hipersensibilidade à atorvastatina ou qualquer componente da fórmula',
      'Doença hepática ativa ou elevação persistente e inexplicável das transaminases',
      'Gestação e lactação',
      'Uso concomitante com inibidores potentes do CYP3A4 (ex: cetoconazol, itraconazol, claritromicina) em doses altas'
    ],
    drugInteractions: [
      'Fibratos (genfibrozila): risco elevado de miopatia e rabdomiólise',
      'Claritromicina, eritromicina e azólicos antifúngicos: inibem CYP3A4 aumentando níveis de atorvastatina',
      'Ciclosporina: aumenta significativamente os níveis plasmáticos da atorvastatina',
      'Amiodarona: aumenta risco de miopatia',
      'Suco de toranja (grapefruit): inibe CYP3A4 e pode aumentar a concentração da atorvastatina'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Dislipidemia', prescriptionTitle: '' },
      { condition: 'Prevenção Cardiovascular Primária e Secundária', prescriptionTitle: '' },
      { condition: 'Síndrome Coronariana Agudo', prescriptionTitle: 'Síndrome Coronariana Aguda — Manejo Inicial (SCA)' }
    ]
  },
  {
    id: 'med-rivaroxabana',
    genericName: 'Rivaroxabana',
    pharmacologicalClass: 'Anticoagulante / Inibidor direto do Fator Xa',
    presentations: [
      'Comprimido revestido 10mg',
      'Comprimido revestido 15mg',
      'Comprimido revestido 20mg'
    ],
    usualDoses: {
      standard: '15mg ou 20mg uma vez ao dia',
      max: '30mg ao ao dia (dividido em 15mg de 12/12h na fase inicial de TVP)',
      frequency: 'Uma vez ao dia',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Xarelto', 'Roxar', 'Varox', 'River'],
    susAvailability: false,
    costIndicator: '$$$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Contraindicada durante a amamentação. Não há dados suficientes de segurança em humanos.'
    },
    contraindications: [
      'Hipersensibilidade à rivaroxabana',
      'Sangramento ativo clinicamente significativo',
      'Lesão ou condição com risco elevado de sangramento maior',
      'Gestação e lactação',
      'Insuficiência hepática grave associada a coagulopatia (Child-Pugh C)',
      'Uso concomitante com outros anticoagulantes sem indicação de transição'
    ],
    drugInteractions: [
      'Azólicos antifúngicos (cetoconazol, itraconazol) e inibidores de protease do HIV: aumentam significativamente os níveis de rivaroxabana',
      'Rifampicina, fenitoína, carbamazepina: reduzem os níveis plasmáticos da rivaroxabana por indução de CYP3A4',
      'AAS e AINEs: aumentam risco de sangramento quando combinados',
      'Outros anticoagulantes and antiplaquetários: risco aditivo de sangramento'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Fibrilação Atrial Não Valvar', prescriptionTitle: 'Fibrilação Atrial / Flutter — Cardioversão Química e Controle de Frequência' },
      { condition: 'Trombose Venosa Profunda (TVP)', prescriptionTitle: '' },
      { condition: 'Tromboembolismo Pulmonar (TEP)', prescriptionTitle: '' },
      { condition: 'Prevenção de AVC', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-empagliflozina',
    genericName: 'Empagliflozina',
    pharmacologicalClass: 'Antidiabético Oral / Inibidor do SGLT2 (Cotransportador de Sódio-Glicose 2)',
    presentations: [
      'Comprimido revestido 10mg',
      'Comprimido revestido 25mg'
    ],
    usualDoses: {
      standard: '10mg uma vez ao dia',
      max: '25mg uma vez ao dia',
      frequency: 'Uma vez ao dia',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Jardiance'],
    susAvailability: false,
    costIndicator: '$$$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Contraindicada durante a amamentação. Dados insuficientes de segurança em humanos.'
    },
    contraindications: [
      'Hipersensibilidade à empagliflozina',
      'Diabetes Mellitus Tipo 1',
      'Cetoacidose diabética',
      'Insuficiência renal grave ou dialítica (TFG < 30 mL/min) para indicação glicêmica',
      'Infecções genitais fúngicas recorrentes não tratadas',
      'Gestação e lactação'
    ],
    drugInteractions: [
      'Insulina e sulfonilureias: risco aumentado de hipoglicemia quando combinados',
      'Diuréticos de alça: risco de depleção volêmica e hipotensão, especialmente em idosos',
      'Lítio: inibidores de SGLT2 podem reduzir a excreção renal do lítio',
      'AINEs: podem antagonizar o efeito diurético e aumentar risco renal'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Diabetes Mellitus Tipo 2', prescriptionTitle: '' },
      { condition: 'Insuficiência Cardíaca com Fração de Ejeção Reduzida', prescriptionTitle: '' },
      { condition: 'Doença Renal Crônica', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-dipirona',
    genericName: 'Dipirona Monoidratada',
    pharmacologicalClass: 'Analgésico e Antitérmico',
    presentations: [
      'Comprimido 500mg',
      'Comprimido 1g',
      'Solução gotas 500mg/mL',
      'Solução injetável 500mg/mL (ampola 2mL)'
    ],
    usualDoses: {
      standard: '500mg a 1g por dose',
      max: '4g ao dia',
      frequency: 'De 6 em 6 horas ou de 4 em 4 horas se necessário',
      route: 'Via Oral (VO), Via Intravenosa (EV) ou Via Intramuscular (IM)'
    },
    commercialNames: ['Novalgina', 'Anador', 'Dorflex (associado)', 'Magnopyrol'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Evitar o uso durante a amamentação ou suspender por 48 horas após a dose, devido à excreção de metabólitos ativos no leite materno.'
    },
    contraindications: [
      'Hipersensibilidade à dipirona ou a derivados pirazolônicos',
      'Porfirias hepáticas agudas ou deficiência congênita de glicose-6-fosfato desidrogenase (G6PD)',
      'Função da medula óssea prejudicada ou doenças do sistema hematopoiético',
      'Asma induzida por analgésicos ou intolerância a analgésicos',
      'Terceiro trimestre de gestação'
    ],
    drugInteractions: [
      'Ciclosporina: reduz os níveis séricos de ciclosporina, monitorar níveis plasmáticos',
      'Metotrexato: pode aumentar a toxicidade hematológica do metotrexato',
      'Ácido Acetilsalicílico (AAS): dipirona pode reduzir o efeito antiplaquetário do AAS se tomados concomitantes',
      'Álcool: pode potencializar os efeitos do álcool'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Febre', prescriptionTitle: '' },
      { condition: 'Dor Aguda Leve a Moderada', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-paracetamol',
    genericName: 'Paracetamol',
    pharmacologicalClass: 'Analgésico e Antitérmico',
    presentations: [
      'Comprimido 500mg',
      'Comprimido 750mg',
      'Solução gotas 200mg/mL',
      'Suspensão oral 32mg/mL'
    ],
    usualDoses: {
      standard: '500mg a 750mg por dose',
      max: '4g ao dia',
      frequency: 'De 6 em 6 horas ou de 4 em 4 horas se necessário',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Tylenol', 'Parador', 'Aasol', 'Vick Pyrena'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'B',
      lactationNotes: 'Compatível com a amamentação. É considerado o analgésico de escolha durante o aleitamento materno em doses terapêuticas de curto prazo.'
    },
    contraindications: [
      'Hipersensibilidade ao paracetamol ou qualquer componente da fórmula',
      'Insuficiência hepática grave ou hepatopatia ativa'
    ],
    drugInteractions: [
      'Álcool: o consumo crônico aumenta o risco de hepatotoxicidade por acúmulo de metabólito tóxico (NAPQI)',
      'Anticoagulantes orais (Varfarina): o uso crônico e prolongado de altas doses de paracetamol pode potencializar o efeito anticoagulante',
      'Anticonvulsivantes (Fenitoína, Carbamazepina, Fenobarbital): podem acelerar o metabolismo e aumentar o risco de toxicidade hepática'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Febre', prescriptionTitle: '' },
      { condition: 'Dor Aguda Leve a Moderada', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-diclofenaco',
    genericName: 'Diclofenaco de Sódio / Potássio',
    pharmacologicalClass: 'Anti-inflamatório Não Esteroidal (AINE)',
    presentations: [
      'Comprimido 50mg',
      'Comprimido de liberação prolongada (Retard) 100mg',
      'Solução injetável 75mg/3mL (Ampola)',
      'Gel dermatológico 10mg/g (1%)'
    ],
    usualDoses: {
      standard: '50mg a 75mg por dose',
      max: '150mg ao dia',
      frequency: 'De 8 em 8 horas ou de 12 em 12 horas',
      route: 'Via Oral (VO) ou Via Intramuscular (IM)'
    },
    commercialNames: ['Voltaren', 'Cataflam', 'Biofenac', 'Diclofen'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Compatível. Embora excretado em pequenas quantidades, o uso por períodos curtos não traz riscos demonstrados.'
    },
    contraindications: [
      'Hipersensibilidade ao diclofenaco, AAS ou outros AINEs',
      'Úlcera péptica ou sangramento gastrointestinal ativo',
      'Insuficiência cardíaca congestiva estabelecida (NYHA II-IV), doença cardíaca isquêmica ou doença arterial periférica',
      'Insuficiência renal grave (ClCr < 30 mL/min) ou hepática grave',
      'Último trimestre de gestação'
    ],
    drugInteractions: [
      'Varfarina e outros anticoagulantes: aumenta o risco de hemorragias gastrointestinais',
      'Lítio e Digoxina: pode aumentar a concentração plasmática destas substâncias',
      'Diuréticos e anti-hipertensivos: reduz o efeito terapêutico e eleva o risco de nefrotoxicidade',
      'Inibidores seletivos da recaptação de serotonina (ISRS): elevam o risco de sangramento digestivo'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Processos Inflamatórios Dolorosos', prescriptionTitle: '' },
      { condition: 'Artrite Reumatoide e Osteoartrite', prescriptionTitle: '' },
      { condition: 'Dor pós-operatória', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-nimesulida',
    genericName: 'Nimesulida',
    pharmacologicalClass: 'Anti-inflamatório Não Esteroidal (AINE) seletivo COX-2 secundário',
    presentations: [
      'Comprimido 100mg',
      'Suspensão gotas 50mg/mL'
    ],
    usualDoses: {
      standard: '100mg de 12 em 12 horas',
      max: '200mg ao dia (tratamento limitado a no máximo 15 dias)',
      frequency: 'De 12 em 12 horas',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Nisulid', 'Scaflam', 'Cis antipax', 'Nimesil'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Contraindicado devido a dados insuficientes de segurança.'
    },
    contraindications: [
      'Histórico de reações de hipersensibilidade ao AAS ou à nimesulida',
      'Histórico de reações hepatotóxicas graves à nimesulida',
      'Insuficiência hepática ou uso concomitante de drogas hepatotóxicas',
      'Úlcera péptica ativa ou hemorragias recorrentes',
      'Insuficiência renal grave (ClCr < 30 mL/min)',
      'Insuficiência cardíaca grave',
      'Febre ou sintomas gripais concomitantemente (risco de Síndrome de Reye ou mascaramento)'
    ],
    drugInteractions: [
      'Outras drogas hepatotóxicas: aumentam expressivamente o risco de lesão hepática grave',
      'Lítio: elevação dos níveis de lítio e risco de toxicidade',
      'Anticoagulantes (Varfarina, Heparina): aumento progressivo do risco de sangramentos'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Dor Aguda e Estados Inflamatórios Sistêmicos', prescriptionTitle: '' },
      { condition: 'Dismenorreia Primária', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-cetoprofeno',
    genericName: 'Cetoprofeno',
    pharmacologicalClass: 'Anti-inflamatório Não Esteroidal (AINE)',
    presentations: [
      'Comprimido 50mg',
      'Comprimido 100mg',
      'Comprimido de liberação prolongada 200mg',
      'Solução injetável 100mg/2mL (Ampola)',
      'Gotas pediátricas 20mg/mL'
    ],
    usualDoses: {
      standard: '100mg a 200mg ao dia',
      max: '200mg ao dia',
      frequency: 'De 8 em 8 horas ou de 12 em 12 horas (ou 24/24h na de 200mg)',
      route: 'Via Oral (VO) ou Via Intramuscular (IM) / Intravenosa (EV)'
    },
    commercialNames: ['Profenid', 'Ketofene', 'Artrosil', 'Artril'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Evitar o uso. Não é recomendado devido a informações de segurança insuficientes.'
    },
    contraindications: [
      'Hipersensibilidade ao cetoprofeno, outros AINEs ou AAS',
      'Úlcera gastrointestinal ativa ou histórico de hemorragias',
      'Insuficiência cardíaca grave, renal grave ou hepática grave',
      'Último trimestre de gestação'
    ],
    drugInteractions: [
      'Outros AINEs ou AAS: aumenta significativamente a incidência de sangramentos corporais',
      'Metotrexato: risco extremo de toxicidade hematológica por eliminação renal diminuída',
      'Anticoagulantes: inibição planetária adicionada e irritabilidade mucosa gastroduodenal'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Inflamação e dor musculoesquelética', prescriptionTitle: '' },
      { condition: 'Artrite, Tendinite e Bursite', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-naproxeno',
    genericName: 'Naproxeno',
    pharmacologicalClass: 'Anti-inflamatório Não Esteroidal (AINE)',
    presentations: [
      'Comprimido 250mg',
      'Comprimido 500mg',
      'Comprimido 550mg (Sódico)'
    ],
    usualDoses: {
      standard: '250mg a 500mg por dose',
      max: '1100mg ou 1500mg ao dia',
      frequency: 'De 12 em 12 horas ou de 24 em 24 horas',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Flanax', 'Naxotec', 'Naprosyn', 'Invel'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Evitar se possível. Naproxeno é excretado no leite materno e possui meia-vida longa, podendo perturbar a integridade cardiovascular do recém-nascido.'
    },
    contraindications: [
      'Hipersensibilidade ao naproxeno ou outros antitérmicos',
      'Glomerulonefrite ou insuficiência renal avançada',
      'Úlcera péptica ativa ou histórico de sangramento',
      'Terceiro trimestre de gravidez'
    ],
    drugInteractions: [
      'Ciclosporina: risco aumentado de nefrotoxicidade',
      'Probenecida: prolonga e aumenta níveis sérios de naproxeno',
      'AAS e Anticoagulantes: risco de lesão e hemorragia gastrintestinal'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Estados inflamatórios articulares', prescriptionTitle: '' },
      { condition: 'Enxaqueca (tratamento da crise)', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-meloxicam',
    genericName: 'Meloxicam',
    pharmacologicalClass: 'Anti-inflamatório Não Esteroidal (AINE) com preferência relativa por COX-2',
    presentations: [
      'Comprimido 7.5mg',
      'Comprimido 15mg',
      'Solução injetável 15mg/1.5mL (Ampola)'
    ],
    usualDoses: {
      standard: '7.5mg a 15mg uma vez ao dia',
      max: '15mg ao dia (7.5mg em idosos ou nefropatas crônicos)',
      frequency: 'Uma vez ao dia (de 24 em 24 horas)',
      route: 'Via Oral (VO) ou Via Intramuscular profunda (IM)'
    },
    commercialNames: ['Movatec', 'Meloxgron', 'Inicox', 'Loxonin'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Evitar o uso durante a amamentação. Falta de dados científicos completos de excreção humana.'
    },
    contraindications: [
      'Hipersensibilidade ao meloxicam ou outros AINEs/AAS',
      'Úlcera gastroduodenal ativa ou propensão hemorrágica',
      'Insuficiência renal grave não dialítica',
      'Insuficiência cardíaca congestiva descompensada'
    ],
    drugInteractions: [
      'Diuréticos: reduz o efeito e propicia desidratação renal severa',
      'Outros AINEs e ISRS: aumentam o potencial de escaras gastrointestinais'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Osteoartrite e Artrose dolorosa', prescriptionTitle: '' },
      { condition: 'Espondilite Anquilosante', prescriptionTitle: '' },
      { condition: 'Artrite Reumatoide', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-piroxicam',
    genericName: 'Piroxicam',
    pharmacologicalClass: 'Anti-inflamatório Não Esteroidal (AINE) classe Oxicans',
    presentations: [
      'Cápsula 15mg',
      'Cápsula 20mg',
      'Comprimido Solúvel 20mg',
      'Gel dermatológico 0.5% (5mg/g)'
    ],
    usualDoses: {
      standard: '20mg uma vez ao dia',
      max: '40mg ao dia (em crises agudas de gota, nos primeiros 2 dias)',
      frequency: 'Uma vez ao dia (diariamente)',
      route: 'Via Oral (VO) ou Tópica'
    },
    commercialNames: ['Feldene', 'Inflene', 'Pirox', 'Clinadol'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Possui excreção reduzida, mas devido à longa meia-vida plasmática (>50 horas), recomenda-se estrita cautela ou preferir AINEs de via mais curta.'
    },
    contraindications: [
      'Disfunção hepática ou renal estabelecidas',
      'Pacientes idosos frágeis (risco elevadíssimo de hemorragia de mucosa gastroduodenal crônica)',
      'Histórico de pólipos nasais ou asma por aspirina'
    ],
    drugInteractions: [
      'Varfarina/Anticoagulantes de Alça Oral: interação gravíssima com risco expansivo de sangramento digestivo',
      'Lítio: excreção prejudicada levando à toxicidade cumulativa'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Cervicobraquialgia e Lombalgia crônicas', prescriptionTitle: '' },
      { condition: 'Artrite Reumatoide Aguda', prescriptionTitle: '' },
      { condition: 'Gota Úrica Aguda', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-celecoxibe',
    genericName: 'Celecoxibe',
    pharmacologicalClass: 'Anti-inflamatório Não Esteroidal (AINE) - Inibidor Altamente Seletivo da COX-2',
    presentations: [
      'Cápsula 100mg',
      'Cápsula 200mg'
    ],
    usualDoses: {
      standard: '100mg a 200mg uma vez ao dia, ou fracionado',
      max: '450mg ao dia',
      frequency: 'De 12 em 12 horas ou de 24 em 24 horas',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Celebra', 'Coxtral', 'Eurocox', 'Celemax'],
    susAvailability: false,
    costIndicator: '$$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Evitar. Dados escassos sobre a segurança na amamentação em seres humanos.'
    },
    contraindications: [
      'Hipersensibilidade ao celecoxibe, a sulfonamidas (contém anel sulfonamídico) ou a outros AINEs',
      'Histórico de asma, urticária ou reações alérgicas após uso de AAS ou AINEs',
      'Doença arterial coronariana ativa ou cirurgia de revascularização miocárdica recente',
      'Insuficiência cardíaca congestiva severa (classes NYHA II-IV)',
      'Disfunção renal grave (TFG < 30 mL/min)'
    ],
    drugInteractions: [
      'Fluconazol: inibe CYP2C9 duplicando a exposição ao celecoxibe',
      'Níveis de Lítio: celecoxibe inibe eliminação do lítio aumentando em até 17% a concentração sérica desse elemento',
      'Varfarina: monitorar rigorosamente o tempo de protrombina (RNI) na fase de introdução do tratamento'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Osteoartrite e Artrite Reumatoide', prescriptionTitle: '' },
      { condition: 'Dismenorreia Primária e Dor Aguda Pós-operatória', prescriptionTitle: '' },
      { condition: 'Dor crônica musculoesquelética', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-etoricoxibe',
    genericName: 'Etoricoxibe',
    pharmacologicalClass: 'Anti-inflamatório Não Esteroidal (AINE) - Inibidor seletivo da COX-2 de segunda geração',
    presentations: [
      'Comprimido revestido 60mg',
      'Comprimido revestido 90mg',
      'Comprimido revestido 120mg'
    ],
    usualDoses: {
      standard: '60mg a 90mg uma vez ao dia',
      max: '120mg uma vez ao dia (limitado a 8 dias para artrite gotosa aguda)',
      frequency: 'Uma vez ao dia (de 24 em 24 horas)',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Arcoxia', 'Eurocoxib', 'Vectra', 'Exxiv'],
    susAvailability: false,
    costIndicator: '$$$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Contraindicado no período de amamentação.'
    },
    contraindications: [
      'Hipersensibilidade ao etoricoxibe ou a outros inibidores de COX-2',
      'Insuficiência cardíaca congestiva estabelecida (classes II-IV da NYHA)',
      'Hipertensão arterial sistêmica descompensada (pressão arterial persistentemente acima de 140/90 mmHg)',
      'Cardiopatia isquêmica, doença arterial periférica e/ou doença cerebrovascular estabelecidas',
      'Úlcera gastrintestinal ativa'
    ],
    drugInteractions: [
      'Anticoagulantes orais: risco acrescido de sangramento, monitorar o INR sistematicamente',
      'Diuréticos e inibidores da ECA: etoricoxibe diminui o efeito anti-hipertensivo das medicações e agrava descompensações cardiorrenais',
      'Rifampicina: forte indutor do metabolismo que reduz o nível sérico de etoricoxibe em 65%'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Dor Musculoesquelética Aguda e Crônica', prescriptionTitle: '' },
      { condition: 'Artrite Gotosa Aguda', prescriptionTitle: '' },
      { condition: 'Espondilite Anquilosante', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-aas',
    genericName: 'Ácido Acetilsalicílico',
    pharmacologicalClass: 'Antiplaquetário, Analgésico, Antitérmico e AINE',
    presentations: [
      'Comprimido infantil 100mg',
      'Comprimido adulto 500mg',
      'Comprimido tamponado / gastro-resistente 100mg (cardioprotetor)'
    ],
    usualDoses: {
      standard: '100mg ao dia (antiplaquetário) ou 500mg a 1g de 6/6h (analgésico)',
      max: '4g ao dia em indicações inflamatórias adultas',
      frequency: 'De 24 em 24 horas (antiplaquetário) ou 6 em 6 horas (analgésico)',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Aspirina', 'AAS', 'Somalgina Card', 'Bufferin'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'D',
      lactationNotes: 'Evitar o uso. Pode induzir problemas de coagulação sanguínea ou acidose metabólica no lactente (Síndrome de Reye descrita raramente).'
    },
    contraindications: [
      'Hipersensibilidade a salicilatos ou salicilismo crônico',
      'Úlcera gastroduodenal recorrente ativa',
      'Diátese hemorrágica, hemofilia ou outras discrasias hemorrágicas',
      'Crianças menores de 12 anos cursando febre gripal (risco de Síndrome de Reye)',
      'Insuficiência renal, hepática ou cardíaca graves'
    ],
    drugInteractions: [
      'Outros anticoagulantes (Varfarina, DOACs): elevação dramática de sangramentos severos',
      'AINEs (concomitantes): reduzem o potencial da inibição antiplaquetária irreversível mediada por AAS'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Prevenção de Eventos Tromboembólicos (Cardioproteção)', prescriptionTitle: '' },
      { condition: 'Dor Leve a Moderada / Febre', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-tramadol',
    genericName: 'Cloridrato de Tramadol',
    pharmacologicalClass: 'Analgésico Opioide sintético de ação central',
    presentations: [
      'Cápsula 50mg',
      'Solução gotas 100mg/mL (1 gota = 2,5mg)',
      'Solução injetável 50mg/mL (Ampola 1 e 2mL)',
      'Comprimido de liberação prolongada 100mg'
    ],
    usualDoses: {
      standard: '50mg a 100mg por dose',
      max: '400mg ao dia (ou 300mg/dia em idosos)',
      frequency: 'De 6 em 6 horas ou de 8 em 8 horas se necessário',
      route: 'Via Oral (VO) ou Via Intravenosa lenta (EV) / Intramuscular (IM)'
    },
    commercialNames: ['Sylador', 'Tramal', 'Revtram', 'Paco (associado ao Paracetamol)'],
    susAvailability: true,
    costIndicator: '$$',
    prescriptionType: 'Receituário A',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Não recomendado. Pequenas quantidades passam para o leite materno; monitorar para sonolência, constipação ou dificuldades respiratórias.'
    },
    contraindications: [
      'Hipersensibilidade ao tramadol ou a outros opioides',
      'Intoxicação aguda por depressores do sistema nervoso central, álcool ou psicotrópicos',
      'Uso concomitante ou recente (últimos 14 dias) de inibidores de MAO',
      'Insuficiência respiratória grave',
      'Epilepsia não controlada pelo tratamento farmacológico'
    ],
    drugInteractions: [
      'Antidepressivos ISRS, ISRSN e Tricíclicos: risco elevado de Síndrome Serotoninérgica perigosa e convulsões',
      'Benzodiazepínicos e outros depressores do SNC: profunda sonolência e risco de depressão respiratória',
      'Carbamazepina: induz o metabolismo de tramadol exigindo maiores doses analgésicas'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Dor Moderada a Grave Aguda e Crônica', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-codeina',
    genericName: 'Fosfato de Codeína',
    pharmacologicalClass: 'Analgésico Opioide e Antitussígeno',
    presentations: [
      'Comprimido 30mg',
      'Comprimido 60mg',
      'Associação Fosfato de Codeína + Paracetamol 30mg + 500mg'
    ],
    usualDoses: {
      standard: '30mg a 60mg por dose',
      max: '240mg ao dia',
      frequency: 'De 4 em 4 horas ou de 6 em 6 horas se necessário',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Codaten', 'Tylex', 'Cofalene', 'Vicodin'],
    susAvailability: true,
    costIndicator: '$$',
    prescriptionType: 'Receituário A',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Evitar o uso. Os metabolizadores ultra-rápidos do CYP2D6 da mãe produzem altos níveis de morfina livre no leite materno, apresentando sério risco de overdose sistêmica'
    },
    contraindications: [
      'Hipersensibilidade a opioides ou codeína',
      'Incapacidade de clivagem hepática (metabolismo ultra-lento)',
      'Submetidos a mastectomia pulmonar secundária, asma crônica ativa, ou diarreia por toxina bacteriana',
      'Insuficiência renal terminal'
    ],
    drugInteractions: [
      'Bloqueadores neuromusculares: efeito paralisante acentuado e fadiga reflexiva',
      'Inibidores de CYP2D6 (ex: fluoxetina, duloxetina): deprimem a conversão em morfina, bloqueando o efeito'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Dor Moderada (Degrau 2 da OMS)', prescriptionTitle: '' },
      { condition: 'Tosse Seca e Irritativa persistente', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-morfina',
    genericName: 'Sulfato de Morfina',
    pharmacologicalClass: 'Analgésico Opioide e Agonista do Receptor Mu-Opioide',
    presentations: [
      'Comprimido de liberação imediata 10mg',
      'Comprimido de liberação imediata 30mg',
      'Comprimido de liberação prolongada 30mg (LC)',
      'Solução injetável 0.2mg/mL (Ampola 1mL ou 2mL para via epidural)',
      'Solução injetável 10mg/mL (Ampola 1mL para uso subcutâneo/intravenoso)'
    ],
    usualDoses: {
      standard: '5mg a 10mg de 4/4h (oral de liberação imediata) ou 2mg a 5mg EV lento',
      max: 'Individualizada em cuidados paliativos (sem limite rígido superior, baseada em tolerância)',
      frequency: 'De 4 em 4 horas se liberação imediata ou 12 em 12 horas se prolongada',
      route: 'Via Oral (VO), Subcutânea (SC), Intravenosa (EV) ou Intratecal/Epidural'
    },
    commercialNames: ['Dimorf', 'Dolo-M', 'Morfisur'],
    susAvailability: true,
    costIndicator: '$$',
    prescriptionType: 'Receituário A',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Excretada no leite. Uso ocasional em doses terapêuticas baixas é aceitável sob supervisão médica estreita do reflexo respiratório do lactente.'
    },
    contraindications: [
      'Depressão respiratória grave ou hipercapnia crônica sem assistência',
      'Crise asmática aguda ativa ou bradicardia cardíaca acentuada',
      'Instabilidade da barreira cranioencefálica / elevação crítica da pressão intracraniana',
      'Íleo paralítico suspeitado ou confirmado',
      'Abdômen agudo de etiologia cirúrgica desconhecida'
    ],
    drugInteractions: [
      'Benzodiazepínicos e sedativos: risco letal de profunda sonolência e apneia ventilatória',
      'Álcool ou antipsicóticos: sedação reforçada perigosamente',
      'Rifampicina: acelera metabolização da morfina diminuindo sua eficácia'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Dor crônica intensa refratária (maligna ou oncológica)', prescriptionTitle: '' },
      { condition: 'Dor Do Infarto Agudo Do Miocárdio', prescriptionTitle: 'Síndrome Coronariana Aguda — Manejo Inicial (SCA)' },
      { condition: 'Alívio da dispneia em cuidados paliativos e edema agudo de pulmão', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-oxicodona',
    genericName: 'Cloridrato de Oxicodona',
    pharmacologicalClass: 'Analgésico Opioide Semissintético',
    presentations: [
      'Comprimido de liberação prolongada 10mg',
      'Comprimido de liberação prolongada 20mg',
      'Comprimido de liberação imediata 5mg'
    ],
    usualDoses: {
      standard: '10mg de 12 em 12 horas (liberação prolongada)',
      max: 'Individualizado segundo necessidade clínica',
      frequency: 'De 12 em 12 horas ou de 4 em 4 horas (se imediata)',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['OxyContin', 'Oxyneo', 'Onyx'],
    susAvailability: false,
    costIndicator: '$$$',
    prescriptionType: 'Receituário A',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Não recomendado. Pode acarretar depressão respiratória nos recém-nascidos.'
    },
    contraindications: [
      'Insuficiência pulmonar obstrutiva grave ou apneia central',
      'Estreitamento luminal esofageal ou obstrução digestiva mecânica',
      'Hipersensibilidade grave a opioides'
    ],
    drugInteractions: [
      'Inibidores do CYP3A4 (ex: cetoconazol, claritromicina): diminuem eliminação e elevam toxicidade da oxicodona',
      'Agonistas/Antagonistas mistos de opioides (ex: buprenorfina): precipitam sintomas de abstinência abruptos'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Dor severa de origem osteoarticular ou neuropática crônica', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-fentanil',
    genericName: 'Citrato de Fentanila',
    pharmacologicalClass: 'Analgésico Opioide sintético potente e Anestésico de ação rápida',
    presentations: [
      'Adesivo transdérmico 12mcg/h',
      'Adesivo transdérmico 25mcg/h',
      'Adesivo transdérmico 50mcg/h',
      'Solução injetável 50mcg/mL (Frasco Ampola 2mL, 5mL ou 10mL)'
    ],
    usualDoses: {
      standard: '1 adesivo transdérmico trocado a cada 72 horas para via ambulatorial',
      max: 'Ajustada individualmente para controle álgico contínuo',
      frequency: 'Uso contínuo (troca de adesivo a cada 72h) ou infusão intravenosa contínua assistida',
      route: 'Uso Transdérmico (adesivo) ou Via Intravenosa direta (EV)'
    },
    commercialNames: ['Durogesic', 'Fentanest', 'Fentaron'],
    susAvailability: true,
    costIndicator: '$$$',
    prescriptionType: 'Receituário A',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Uso transdérmico de longo período não é indicado durante a lactação. Em anestesias rápidas evite a amamentação por 24 horas.'
    },
    contraindications: [
      'Depressão respiratória desassistida ou doença obstrutiva grave pulmonar crônica',
      'Intolerância a adesivos ou dermatoses excorativas inflamatórias amplas',
      'Disfunção respiratória periférica primária'
    ],
    drugInteractions: [
      'Inibidores potentes de CYP3A4: prolongam drasticamente a meia-vida sérica da fentanila instigando apneias refratárias',
      'Inibidores de MAO: choque hemodinâmico, febre maligna ou coma neurovegetativo'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Dor oncológica contínua persistente resistente', prescriptionTitle: '' },
      { condition: 'Anestesia cirúrgica e indução de coma em intubação orotraqueal', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-colchicina',
    genericName: 'Colchicina',
    pharmacologicalClass: 'Agente antigotoso / Inibidor da mitose celular inflamatória',
    presentations: [
      'Comprimido 0.5mg',
      'Comprimido 1mg'
    ],
    usualDoses: {
      standard: '0.5mg de 1 a 3 vezes ao dia',
      max: '1.5mg a 2mg ao dia em crises de gota',
      frequency: 'De 8 em 8 horas ou de 12 em 12 horas na crise inicial',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Colchis', 'Gout', 'Colchicina Lando', 'Colchimax'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Excretada no leite de forma detectável. Considerar alternativas se uso prolongado for impositivo.'
    },
    contraindications: [
      'Hipersensibilidade à colchicina',
      'Insuficiência renal grave (ClCr < 30 mL/min) ou hepática grave concomitantes a inibidores de glicoproteína P ou do CYP3A4',
      'Doenças hematológicas proliferativas e hipoplasia medular'
    ],
    drugInteractions: [
      'Claritromicina ou Cetoconazol (CYP3A4): grave toxicidade sistêmica por acúmulo da colchicina',
      'Estatinas: risco agudo de miopatia'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Crise de Artrite Gotosa Aguda', prescriptionTitle: '' },
      { condition: 'Pericardite Aguda Recorrente', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-prednisona',
    genericName: 'Prednisona',
    pharmacologicalClass: 'Glucocorticoide sistêmico / Anti-inflamatório e Imunossupressor',
    presentations: [
      'Comprimido 5mg',
      'Comprimido 20mg'
    ],
    usualDoses: {
      standard: '5mg a 60mg ao dia (dose matinal preferencialmente)',
      max: '80mg ao dia em quadros imunossupressores graves',
      frequency: 'Uma vez ao dia pela manhã',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Meticorten', 'Predrison', 'Prelone'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Especialmente segura se doses moderadas forem administradas; aguardar 4 horas após a dose antes de amamentar.'
    },
    contraindications: [
      'Micoses sistêmicas não tratadas',
      'Hipersensibilidade aos corticoides sistêmicos',
      'Uso de vacinas de vírus vivos'
    ],
    drugInteractions: [
      'Hipocalemia agravada por anfotericina B ou diuréticos',
      'Reduz efeito de hipoglicemiantes orais e insulinas'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Asma Brôquica Moderada-Grave descompensada', prescriptionTitle: 'Crise Asmática Leve a Moderada' },
      { condition: 'Doenças Autoimunes Sistêmicas (Lúpus, Vasculite, Artrite)', prescriptionTitle: '' },
      { condition: 'Reações alérgicas severas', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-prednisolona',
    genericName: 'Prednisolona',
    pharmacologicalClass: 'Glucocorticoide sistêmico / Metabólito ativo da Prednisona',
    presentations: [
      'Solução oral 3mg/mL',
      'Comprimido dispersível 20mg'
    ],
    usualDoses: {
      standard: '1mg/kg/dia para pediatria, ou 5mg a 60mg/dia para adultos',
      max: '60mg ao dia',
      frequency: 'Uma vez ao dia ou fracionada em até 2 vezes',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Prelone', 'Predsingot', 'Prednis'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Compatível. Utilizado rotineiramente em pediatria.'
    },
    contraindications: [
      'Infecção fúngica ativa incontrolável',
      'Hipersensibilidade'
    ],
    drugInteractions: [
      'Indutores hepáticos CYP3A4 (Fenitoína, Rifampicina) reduzem os níveis séricos do corticoide'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Surtos asmáticos em pediatria', prescriptionTitle: '' },
      { condition: 'Reumatologia pediátrica aguda', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-dexametasona',
    genericName: 'Dexametasona',
    pharmacologicalClass: 'Glucocorticoide sistêmico potente e de longa ação',
    presentations: [
      'Comprimido 4mg',
      'Elixir 0.1mg/mL',
      'Solução injetável 4mg/mL (Ampola 1mL e 2.5mL)',
      'Creme dermatológico 1mg/g (0.1%)'
    ],
    usualDoses: {
      standard: '0.75mg a 9mg ao dia',
      max: '16mg ao dia em edema cerebral agudo',
      frequency: 'De 12 em 12 horas ou uma vez ao dia pela manhã',
      route: 'Via Oral (VO), Via Intravenosa (EV), Via Intramuscular (IM) ou Tópica'
    },
    commercialNames: ['Decadron', 'Cortidex', 'Dexacol'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Evitar se uso prolongado; compatível em curtos prazos.'
    },
    contraindications: [
      'Infeções fúngicas sistêmicas descontroladas',
      'Hipersensibilidade'
    ],
    drugInteractions: [
      'Ciclosporina: metabolização mútua reduzida, instigando hiperatividade e crises convulsivas'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Edema Cerebral Associado a Tumores', prescriptionTitle: '' },
      { condition: 'Insuficiência adrenal primária', prescriptionTitle: '' },
      { condition: 'Prevenção de náuseas induzidas por quimioterapia', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-betametasona',
    genericName: 'Betametasona',
    pharmacologicalClass: 'Glucocorticoide sistêmico potente de longa duração',
    presentations: [
      'Comprimido 0.5mg',
      'Comprimido 2mg',
      'Injetável de liberação lenta (Solução Depot) 5mg/mL + 2mg/mL'
    ],
    usualDoses: {
      standard: '0.5mg a 6mg ao dia por via oral, ou 1 a 2mL injetável local IM Depot',
      max: '9mg ao dia',
      frequency: 'Oral de 24 em 24h ou Injeção local espaçada quinzenal ou mensalmente',
      route: 'Via Oral (VO), Via Intramuscular profunda (IM) ou Tópica'
    },
    commercialNames: ['Celestone', 'Diprospan', 'Beta-long'],
    susAvailability: true,
    costIndicator: '$$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Usar com cautela extremada em lactantes.'
    },
    contraindications: [
      'Glaucoma agudo descompensado',
      'Dermatites infecciosas ativas perto da área tópica'
    ],
    drugInteractions: [
      'Antidiabéticos orais: diminui o efeito devido ao estresse hiperglicêmico cortical',
      'Diuréticos tiazídicos: espoliação exacerbada de potássio'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Maturação pulmonar fetal em gestações pré-termo', prescriptionTitle: '' },
      { condition: 'Dermatite Atópica grave e Psoríase', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-hidrocortisona',
    genericName: 'Succinato Sódico de Hidrocortisona',
    pharmacologicalClass: 'Glucocorticoide de curta ação idêntico ao cortisol endógeno',
    presentations: [
      'Pó para solução injetável 100mg (Frasco-ampola)',
      'Pó para solução injetável 500mg (Frasco-ampola)',
      'Creme dermatológico 10mg/g (1%)'
    ],
    usualDoses: {
      standard: '100mg a 500mg por dose intravenosa lenta',
      max: '2g ao dia',
      frequency: 'De 6 em 6 horas ou de 8 em 8 horas conforme gravidade',
      route: 'Via Intravenosa (EV), Via Intramuscular (IM) ou Tópica'
    },
    commercialNames: ['Solu-Cortef', 'Flebocortid', 'Berlison'],
    susAvailability: true,
    costIndicator: '$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Seguro para uso dermatológico local. Injetável prolongado exige avaliação de supressão adrenal no recém-nascido.'
    },
    contraindications: [
      'Micoses sistêmicas não controladas',
      'Hipersensibilidade grave'
    ],
    drugInteractions: [
      'AINEs: severo risco aditivo de sangramento ou úlcera gastrointestinal',
      'Varfarina: altera tempos pro-coagulantes'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Crise de Insuficiência Adrenal Aguda', prescriptionTitle: '' },
      { condition: 'Choque Séptico Refratário a Vasopressores', prescriptionTitle: '' },
      { condition: 'Tratamento de dermatites inflamatórias responsivas a corticoides', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-metilprednisolona',
    genericName: 'Succinato Sódico de Metilprednisolona',
    pharmacologicalClass: 'Glucocorticoide sistêmico de potência intermediária',
    presentations: [
      'Solução injetável 40mg (Frasco-ampola)',
      'Solução injetável 125mg (Frasco-ampola)',
      'Solução injetável 500mg (Frasco-ampola)',
      'Pó para suspensão de depósito 40mg/1mL (Depot)'
    ],
    usualDoses: {
      standard: '20mg a 125mg endovenoso lento',
      max: '1g ao dia em pulsoterapia aguda imunossupressora contínua por 3 dias',
      frequency: 'De 6 em 6 horas ou dose única diária em pulsoterapia',
      route: 'Via Intravenosa (EV) ou Via Intramuscular profunda (IM)'
    },
    commercialNames: ['Solu-Medrol', 'Depo-Medrol', 'Cortimed'],
    susAvailability: true,
    costIndicator: '$$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Cautela devido à falta de dados definitivos de segurança.'
    },
    contraindications: [
      'Infeções micóticas ou bacterianas sistêmicas sem tratamento antimicrobiano adequado',
      'Hipersensibilidade grave'
    ],
    drugInteractions: [
      'Ciclosporina: inibição de eliminação recíproca agrava convulsões e tonturas graves'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Pulsoterapia para crises graves de Lúpus ou Esclerose Múltipla', prescriptionTitle: '' },
      { condition: 'Rejeição de Transplantes', prescriptionTitle: '' }
    ]
  },
  {
    id: 'med-deflazacorte',
    genericName: 'Deflazacorte',
    pharmacologicalClass: 'Glucocorticoide sistêmico com reduzida interferência óssea',
    presentations: [
      'Comprimido 6mg',
      'Comprimido 30mg',
      'Suspensão oral 22.75mg/mL'
    ],
    usualDoses: {
      standard: '6mg a 90mg ao dia',
      max: '120mg ao dia',
      frequency: 'Uma vez ao dia pela manhã',
      route: 'Via Oral (VO)'
    },
    commercialNames: ['Calcort', 'Deflanil', 'Deflazac', 'Flazacor'],
    susAvailability: false,
    costIndicator: '$$$',
    prescriptionType: 'Comum',
    pregnancySafety: {
      category: 'C',
      lactationNotes: 'Uso aceitável por curtos períodos com monitoramento clínico.'
    },
    contraindications: [
      'Infecção oftálmica viral de herpes atenuada ou infecções bacterianas graves descontroladas',
      'Hipersensibilidade ao deflazacorte'
    ],
    drugInteractions: [
      'Bloqueadores de canal de cálcio (ex: Verapamil): podem intensificar efeitos secundários cardíacos',
      'Indutores CYP3A4 diminuem a atividade terapêutica'
    ],
    packageInsertUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
    mainIndications: [
      { condition: 'Doenças reumáticas inflamatórias', prescriptionTitle: '' },
      { condition: 'Distrofia Muscular de Duchenne', prescriptionTitle: '' }
    ]
  }
];
