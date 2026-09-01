import { MedicalDisease } from '../types';

/**
 * Intelligent Clinical Content Generator for Medical Diseases
 * Generates robust, evidence-based descriptions for all required clinical dimensions
 * if not manually filled by an administrator.
 */

export const getDiseaseCategoryName = (disease: MedicalDisease): string => {
  if (disease.categoria) return disease.categoria;
  const idLower = disease.id.toLowerCase();
  if (idLower.startsWith('i')) return 'Cardiologia';
  if (idLower.startsWith('j')) return 'Pneumologia';
  if (idLower.startsWith('g')) return 'Neurologia';
  if (idLower.startsWith('a') || idLower.startsWith('b')) return 'Infectologia';
  if (idLower.startsWith('k')) return 'Gastroenterologia';
  if (idLower.startsWith('n')) return 'Nefrologia e Urologia';
  if (idLower.startsWith('e')) return 'Endocrinologia';
  if (idLower.startsWith('m')) return 'Reumatologia';
  if (idLower.startsWith('l')) return 'Dermatologia';
  if (idLower.startsWith('f')) return 'Psiquiatria';
  if (idLower.startsWith('o')) return 'Ginecologia e Obstetrícia';
  if (idLower.startsWith('p')) return 'Pediatria / Neonatologia';
  return 'Clínica Médica';
};

export const getDiseaseDefinition = (dis: MedicalDisease): string => {
  if (dis.definition && dis.definition.trim().length > 10) {
    return dis.definition.trim();
  }
  const nome = dis.nome;
  const cat = getDiseaseCategoryName(dis);
  const sintomasPreview = (dis.sintomas || []).slice(0, 3).join(', ');

  const nomeLower = nome.toLowerCase();
  if (nomeLower.includes('hipertensão') || nomeLower.includes('has')) {
    return 'Condição clínica multifatorial caracterizada por elevação sustentada dos níveis pressóricos arteriais (PAS ≥ 140 mmHg e/ou PAD ≥ 90 mmHg), associada a alterações metabólicas, hormonais e fenômenos de remodelamento vascular que elevam o risco de eventos cardiovasculares maiores.';
  }
  if (nomeLower.includes('infarto') || nomeLower.includes('iam') || nomeLower.includes('coronariana')) {
    return 'Síndrome isquêmica miocárdica aguda decorrente da oclusão súbita e sustentada de uma artéria coronária epicárdica por ruptura de placa aterosclerótica e trombose sobreposta, culminando em necrose transmural ou subendocárdica do músculo cardíaco.';
  }
  if (nomeLower.includes('avc') || nomeLower.includes('vascular cerebral') || nomeLower.includes('derrame')) {
    return 'Episódio agudo de disfunção neurológica focal atribuível a uma lesão vascular do sistema nervoso central, provocada por isquemia crítica tecidual (AVCi - 85% dos casos) ou sangramento parenquimatoso/subaracnóideo espontâneo (AVCh - 15%).';
  }
  if (nomeLower.includes('pneumonia') || nomeLower.includes('pac')) {
    return 'Processo infeccioso e inflamatório agudo do parênquima pulmonar que acomete as unidades de troca gasosa (bronquíolos terminais, ductos alveolares e alvéolos), adquirido fora do ambiente hospitalar ou manifestado nas primeiras 48h de admissão.';
  }
  if (nomeLower.includes('asma')) {
    return 'Doença inflamatória crônica heterogênea das vias aéreas caracterizada por hiperresponsividade traqueobrônquica a múltiplos estímulos e limitação variável e reversível ao fluxo expiratório de ar.';
  }
  if (nomeLower.includes('diabetes') || nomeLower.includes('dm')) {
    return 'Distúrbio metabólico crônico de etiologia múltipla caracterizado por hiperglicemia persistente, resultante de defeitos na secreção de insulina, na ação periférica da insulina, ou em ambos os mecanismos.';
  }
  if (nomeLower.includes('dengue')) {
    return 'Doença febril infecciosa aguda sistêmica de etiologia viral transmitida por artrópodes do gênero Aedes, com amplo espectro clínico variando de formas autolimitadas a quadros graves com extravasamento plasmático e choque.';
  }
  if (nomeLower.includes('sepse')) {
    return 'Disfunção orgânica com risco iminente de morte causada por uma resposta desregulada e deletéria do hospedeiro a uma infecção bacteriana, fúngica ou viral, avaliada através de critérios clínicos e laboratoriais (escore SOFA).';
  }
  if (nomeLower.includes('apendicite')) {
    return 'Afecção inflamatória aguda do apêndice cecal decorrente de obstrução luminal mecânica, constituindo a causa mais frequente de abdome agudo cirúrgico inflamatório na população geral.';
  }
  if (nomeLower.includes('pancreatite')) {
    return 'Processo inflamatório agudo do parênquima pancreático desencadeado pela ativação prematura e intrapancreática de enzimas zimogênicas digestivas, com potencial de estender-se a tecidos peripancreáticos e provocar resposta inflamatória sistêmica.';
  }
  if (nomeLower.includes('insuficiência cardíaca') || nomeLower.includes('icc')) {
    return 'Síndrome clínica complexa na qual uma anormalidade estrutural ou funcional do coração compromete a capacidade ventricular de enchimento ou de ejeção sanguínea para atender às demandas metabólicas teciduais.';
  }

  return `${nome} é uma afecção clínica de relevância na área de ${cat}, manifestando-se predominantemente através de ${sintomasPreview || 'alterações clínicas características'}, demandando diagnóstico precoce e manejo terapêutico individualizado.`;
};

export const getDiseaseEpidemiology = (dis: MedicalDisease): string => {
  if (dis.epidemiology && dis.epidemiology.trim().length > 10) {
    return dis.epidemiology.trim();
  }
  const nomeLower = dis.nome.toLowerCase();
  if (nomeLower.includes('hipertensão') || nomeLower.includes('has')) {
    return 'Acomete mais de 32% da população adulta brasileira (>60% na faixa etária acima de 65 anos). Principal fator de risco modificável para doença coronariana, insuficiência cardíaca, acidente vascular cerebral e doença renal crônica terminal no mundo.';
  }
  if (nomeLower.includes('infarto') || nomeLower.includes('iam')) {
    return 'Principal causa isolada de óbito no Brasil e no mundo. Mais frequente no sexo masculino até a menopausa, com incidência progressivamente crescente após os 55 anos. Responsável por mais de 100.000 óbitos anuais no país.';
  }
  if (nomeLower.includes('avc') || nomeLower.includes('vascular cerebral')) {
    return 'Segunda causa de morte e primeira causa de incapacidade física e cognitiva permanente em adultos no Brasil. Cerca de 70% dos sobreviventes apresentam sequelas que restringem atividades laborais e da vida diária.';
  }
  if (nomeLower.includes('pneumonia') || nomeLower.includes('pac')) {
    return 'Principal causa infecciosa de hospitalização e morte em crianças menores de 5 anos e em idosos acima de 65 anos no Sistema Único de Saúde (SUS), com maior incidência nos meses de outono e inverno.';
  }
  if (nomeLower.includes('asma')) {
    return 'Estima-se que afete cerca de 10% a 20% das crianças e 5% a 10% dos adultos no Brasil. Responde por expressivo número de atendimentos em unidades de pronto atendimento e faltas escolares/laborais anuais.';
  }
  if (nomeLower.includes('dengue')) {
    return 'Endemia com surtos e epidemias cíclicas sazonais no Brasil durante o período chuvoso e quente. O país registra anualmente mais de 1 a 3 milhões de casos notificados com predomínio em áreas urbanas densamente povoadas.';
  }
  if (nomeLower.includes('sepse')) {
    return 'Acomete cerca de 400.000 a 500.000 pacientes por ano no Brasil em unidades hospitalares, com taxa de mortalidade em UTIs nacionais que atinge 50% a 60% dos casos de choque séptico.';
  }
  if (nomeLower.includes('apendicite')) {
    return 'Pico de incidência na segunda e terceira décadas de vida (10 a 30 anos), com discreto predomínio no sexo masculino (1,4:1). O risco cumulativo ao longo da vida é estimado em 8,6% para homens e 6,7% para mulheres.';
  }
  if (nomeLower.includes('cetoacidose') || nomeLower.includes('cad')) {
    return 'Ocorre em até 30% a 40% dos novos diagnósticos de Diabetes Mellitus tipo 1 em crianças e adolescentes. Em pacientes com diagnóstico prévio, está frequentemente associada à má adesão insulínica ou infecções intercorrentes.';
  }

  const cat = getDiseaseCategoryName(dis);
  return `Apresenta distribuição epidemiológica de destaque em atendimentos ambulatoriais e de urgência em ${cat}, com prevalência influenciada por faixa etária, fatores ambientais, hábitos de vida e comorbidades de base.`;
};

export const getDiseaseEtiology = (dis: MedicalDisease): string => {
  if (dis.etiology && dis.etiology.trim().length > 10) {
    return dis.etiology.trim();
  }
  const nomeLower = dis.nome.toLowerCase();
  const riscos = (dis.fatores_risco || []).slice(0, 4).join(', ');

  if (nomeLower.includes('pneumonia') || nomeLower.includes('pac')) {
    return 'Agentes etiológicos mais frequentes: Streptococcus pneumoniae (pneumococo - 30 a 50% dos casos bacterianos), Mycoplasma pneumoniae, Chlamydia pneumoniae, Haemophilus influenzae, Staphylococcus aureus, vírus respiratórios (Influenza, VSR, SARS-CoV-2) e bacilos gram-negativos em pacientes com comorbidades.';
  }
  if (nomeLower.includes('meningite')) {
    return 'Neisseria meningitidis (meningococo - sorogrupos B, C, W, Y), Streptococcus pneumoniae (pneumococo), Haemophilus influenzae tipo b em não vacinados, e Listeria monocytogenes em neonatos, gestantes e idosos. Causas virais incluem Enterovírus, HSV e Arbovírus.';
  }
  if (nomeLower.includes('pielonefrite') || nomeLower.includes('itu')) {
    return 'Escherichia coli uropatogênica (responsável por >75-85% das infecções), seguida por Klebsiella pneumoniae, Proteus mirabilis, Enterococcus faecalis e Staphylococcus saprophyticus.';
  }
  if (nomeLower.includes('infarto') || nomeLower.includes('iam') || nomeLower.includes('angina')) {
    return 'Aterosclerose coronariana com instabilização e fissura de capa fibrosa rica em lipídeos, ativando cascata trombogênica aguda. Causas não ateroscleróticas incluem vasoespasmo coronariano (Angina de Prinzmetal), dissecção coronária espontânea, embolia coronária e uso de substâncias simpatomiméticas (cocaína).';
  }
  if (nomeLower.includes('hipertensão') || nomeLower.includes('has')) {
    return 'Mais de 90-95% dos casos correspondem à Hipertensão Primária (Essencial), de herança poligênica associada a fatores ambientais (excesso de sódio, obesidade, sedentarismo, estresse). Hipertensão Secundária (5-10%) decorre de apneia do sono, estenose de artéria renal, feocromocitoma, hiperaldosteronismo ou nefropatias.';
  }
  if (nomeLower.includes('apendicite')) {
    return 'Obstrução luminal do apêndice cecal provocada por fecalito (apendicolito), hiperplasia de folículos linfoides submucosos (frequente em jovens pós-infecção viral), corpos estranhos, parasitas (Ascaris) ou raramente neoplasias (carcinoide).';
  }
  if (nomeLower.includes('pancreatite')) {
    return 'Litíase biliar (microlitíase e cálculos impactados na ampola de Vater - 40-50%) e etilismo agudo/crônico (30-35%). Outras causas incluem hipertrigliceridemia grave (>1000 mg/dL), pós-CPRE, hipercalcemia, drogas (azatioprina, tiazídicos) e etiologia idiopática/autoimune.';
  }
  if (nomeLower.includes('dengue')) {
    return 'Vírus Dengue (DENV-1, DENV-2, DENV-3 e DENV-4), vírus de RNA fita simples envelopado pertencente à família Flaviviridae, transmitido pela picada da fêmea do mosquito Aedes aegypti infectada.';
  }

  return `Etiologia multifatorial associada a fatores genéticos, ambientais, imunológicos ou infecciosos. Principais fatores determinantes e desencadeantes incluem: ${riscos || 'predisposição individual e exposição a estressores específicos'}.`;
};

export const getDiseasePathophysiology = (dis: MedicalDisease): string => {
  if (dis.pathophysiology && dis.pathophysiology.trim().length > 10) {
    return dis.pathophysiology.trim();
  }
  const nomeLower = dis.nome.toLowerCase();

  if (nomeLower.includes('hipertensão') || nomeLower.includes('has')) {
    return 'Desregulação do balanço entre resistência vascular periférica e débito cardíaco, impulsionada por hiperatividade simpática, ativação sustentada do sistema renina-angiotensina-aldosterona (SRAA), disfunção endotelial com redução de óxido nítrico, rigidez arterial progressiva e retenção renal inapropriada de sódio e água.';
  }
  if (nomeLower.includes('infarto') || nomeLower.includes('iam')) {
    return 'Ruptura ou erosão de placa aterosclerótica instável expõe material trombogênico subendotelial, provocando adesão, ativação e agregação plaquetária com formação de trombo oclusivo intraluminal. A interrupção abrupta da perfusão miocárdica gera isquemia celular em segundos, depleção de ATP, acidose intracelular e necrose de miócitos se não reperfundido precocemente.';
  }
  if (nomeLower.includes('avc') || nomeLower.includes('vascular cerebral')) {
    return 'Interrupção do fluxo sanguíneo arterial cerebral focal induz privação imediata de glicose e oxigênio no território afetado. Desenvolve-se um núcleo isquêmico irreversível cercado por uma área de penumbra isquêmica potencialmente salvável, onde a cascata excitotóxica (liberação maciça de glutamato, influxo de cálcio e radicais livres) leva à morte neuronal progressiva.';
  }
  if (nomeLower.includes('pneumonia') || nomeLower.includes('pac')) {
    return 'Inoculação e colonização do trato respiratório inferior por microaspiração ou inalação de aerossóis, superando as defesas do hospedeiro (clearance mucociliar e macrófagos alveolares). A proliferação do patógeno induz resposta inflamatória exuberante com exsudação de neutrófilos, fibrina e eritrócitos para os espaços alveolares, causando consolidação, alteração da relação ventilação/perfusão e hipoxemia.';
  }
  if (nomeLower.includes('asma')) {
    return 'Inflamação crônica mediada por linfócitos Th2, citocinas (IL-4, IL-5, IL-13), eosinófilos e mastócitos. A exposição a alérgenos e desencadeantes estimula a liberação de mediadores vasoativos (histamina, leucotrienos) causando broncoconstrição da musculatura lisa, edema de mucosa, hipersecreção de muco espesso e, a longo prazo, remodelamento irreversível das vias aéreas.';
  }
  if (nomeLower.includes('apendicite')) {
    return 'A oclusão da luz apendicular acarreta acúmulo contínuo de secreção mucosa, elevação da pressão intraluminal e compressão do retorno venoso e linfático. Isso gera isquemia parietal, proliferação bacteriana transmural, translocação, necrose gangrenosa e perfuração livre na cavidade peritoneal com peritonite.';
  }
  if (nomeLower.includes('dengue')) {
    return 'O vírus infecta monócitos e células dendríticas, induzindo tempestade de citocinas inflamatórias (TNF-alfa, IFN-gama, interleucinas) e ativação endotelial. Na forma grave, ocorre disfunção transitória do glicocálix endotelial e aumento da permeabilidade capilar, provocando extravasamento plasmático maciço para o terceiro espaço, hemoconcentração e choque circulatório.';
  }
  if (nomeLower.includes('sepse')) {
    return 'A resposta desregulada do hospedeiro à infecção desencadeia liberação sistêmica maciça de mediadores pró- e anti-inflamatórios, disfunção endotelial com perda de tônus vascular (vasodilatação patológica), aumento da permeabilidade capilar, microtrombose difusa e disfunção mitocondrial com hipóxia citopática tecidual celular.';
  }

  return `O mecanismo fisiopatológico decorre de lesão tecidual e celular desencadeada por processos inflamatórios, isquêmicos, metabólicos ou infecciosos, resultando em desequilíbrio homeostático, recrutamento leucocitário e manifestações clínicas sistêmicas e locais no órgão-alvo afetado.`;
};

export const getDiseaseTreatment = (dis: MedicalDisease): string => {
  if (dis.treatment && dis.treatment.trim().length > 10) {
    return dis.treatment.trim();
  }
  const nomeLower = dis.nome.toLowerCase();

  if (nomeLower.includes('hipertensão') || nomeLower.includes('has')) {
    return `1. Medidas Não Farmacológicas: Dieta DASH (rica em frutas, vegetais e grãos, restrição de sódio a <2g/dia ou <5g de sal de cozinha), cessação do tabagismo, perda ponderal e atividade física aeróbica regular (150 min/semana).
2. Terapia Farmacológica de Primeira Linha: Monoterapia para estágio 1 de baixo risco ou combinação precoce de duas drogas para estágios 2 e 3 ou alto risco cardiovascular:
   - Inibidores da ECA (Enalapril 10-40mg/dia) ou BRA (Losartana 50-100mg/dia).
   - Bloqueadores dos Canais de Cálcio (Anlodipino 2.5-10mg/dia).
   - Diuréticos Tiazídicos (Hidroclorotiazida 12.5-25mg/dia ou Clortalidona 12.5-25mg/dia).
3. Metas Terapêuticas: PA < 130/80 mmHg para a maioria dos adultos hipertensos, respeitando tolerabilidade em idosos frágeis.`;
  }
  if (nomeLower.includes('infarto') || nomeLower.includes('iam')) {
    return `1. Atendimento de Emergência Imediato (Protocolo MONAB/SCASST):
   - Monitorização contínua, oxigênio suplementar apenas se SatO2 < 90%, acesso venoso e ECG em < 10 minutos.
   - Nitrato sublingual (Isossorbida 5mg ou Nitroglicerina IV se dor refratária/congestão - contraindicado se hipotensão ou uso recente de inibidores da PDE-5).
   - Morfina 2-4mg IV titulada apenas se dor intensa refratária ao nitrato.
2. Terapia Antitrombótica Imediata:
   - Dupla Antiagregação Plaquetária: Ácido Acetilsalicílico (AAS dose de ataque 200-300mg mastigado) + Inibidor P2Y12 (Ticagrelor 180mg ataque, Clopidogrel 300-600mg ataque, ou Prasugrel 60mg se angioplastia planejada).
   - Anticoagulação Plena: Enoxaparina 1mg/kg SC 12/12h ou Heparina Não Fracionada IV.
3. Reperfusão Miocárdica de Urgência:
   - Angioplastia Coronária Primária (padrão-ouro - meta tempo porta-balão < 90 min) ou Trombólise com Tenecteplase/Alteplase (meta porta-agulha < 30 min se tempo estimado até hemodinâmica > 120 min).
4. Terapia de Manutenção a Longo Prazo: Estatina de alta potência (Atorvastatina 80mg), Betabloqueador (Carvedilol/Metoprolol), IECA/BRA e Espironolactona se disfunção ventricular.`;
  }
  if (nomeLower.includes('avc') || nomeLower.includes('vascular cerebral')) {
    return `1. Suporte Geral e Estabilização Inicial (Sala de Emergência / Unidade de AVC):
   - Controle glicêmico rigoroso (manter entre 140-180 mg/dL), normotermia e cabeceira elevada a 30°.
   - Manejo pressórico: Não reduzir PA bruscamente exceto se > 220/120 mmHg (ou > 185/110 mmHg se candidato a trombólise).
2. Terapia de Reperfusão Isquêmica Aguda (se AVCi em janela):
   - Trombólise Intravenosa: Alteplase (r-tPA) 0,9 mg/kg (máx 90mg - 10% em bólus e 90% em 1h) em janela de até 4,5 horas do ictus sem contraindicações.
   - Trombectomia Mecânica Endovascular: Indicada para oclusão de grande vaso da circulação anterior em janela de até 6 a 24 horas selecionada por imagem.
3. Profilaxia Secundária e Cuidados:
   - AAS 100-300mg/dia iniciado após 24h da trombólise (ou imediatamente se não trombolisado).
   - Estatina de alta potência (Atorvastatina 80mg).
   - Anticoagulação plena tardia com DOAC ou Varfarina apenas se etiologia cardioembólica (após afastar sangramento).`;
  }
  if (nomeLower.includes('pneumonia') || nomeLower.includes('pac')) {
    return `1. Estratificação de Risco e Local de Tratamento pelo Escore CURB-65 / CRB-65:
   - Escore 0-1: Tratamento ambulatorial seguro.
   - Escore 2: Considerar internação em enfermaria.
   - Escore ≥ 3: Internação hospitalar mandatória / considerar UTI se instabilidade hemodinâmica ou respiratória.
2. Esquemas Antibióticos Empíricos Recomendados (Diretriz SBPT):
   - Ambulatorial (sem comorbidades): Amoxicilina 500mg-1g 8/8h VO por 5-7 dias OU Azitromicina 500mg 1x/dia por 5 dias.
   - Ambulatorial (com comorbidades/idosos): Amoxicilina + Clavulanato 875/125mg 12/12h associado a Macrolídeo (Azitromicina 500mg/dia) OU Levofloxacino 750mg 1x/dia por 7 dias.
   - Hospitalar Enfermaria: Ceftriaxona 1-2g IV 1x/dia associada a Azitromicina 500mg IV/VO 1x/dia OU Levofloxacino 750mg IV.
   - Hospitalar UTI: Ceftriaxona 2g IV + Azitromicina 500mg IV + Oseltamivir se suspeita de influenza.
3. Medidas de Suporte: Hidratação venosa criteriosa, oxigenoterapia para manter SatO2 92-96% e fisioterapia respiratória.`;
  }
  if (nomeLower.includes('asma')) {
    return `1. Manejo da Crise Aguda (Pronto Atendimento):
   - Oxigenoterapia suplementar para alvo de SatO2 93-95% (94-98% em crianças).
   - Broncodilatador de Ação Rápida (SABA): Salbutamol spray 100mcg (4 a 10 jatos com espaçador a cada 20 min na primeira hora) ou nebulização com Fenoterol/Salbutamol.
   - Corticoide Sistêmico Precoce: Prednisona 40-50mg/dia VO por 5-7 dias ou Hidrocortisona/Metilprednisolona IV se via oral inviável.
   - Brometo de Ipratrópio associado nas crises moderadas a graves nas primeiras 3 doses.
   - Sulfato de Magnésio 2g IV em infusão de 20 min nas exacerbações graves refratárias.
2. Tratamento de Manutenção Crônica (Etapas GINA):
   - Corticoide inalatório (Budesonida/Fluticasona) em dose baixa a moderada associado a Formoterol (LABA) como terapia de alívio e manutenção preferencial.`;
  }
  if (nomeLower.includes('dengue')) {
    return `1. Classificação de Risco e Manejo Clínico (Ministério da Saúde):
   - Grupo A (Sem sinais de alarme, sem comorbidades): Hidratação oral vigorosa (60 ml/kg/dia, sendo 1/3 com SRO e 2/3 com líquidos caseiros), repouso, sintomáticos (Paracetamol ou Dipirona). CONTRAINDICADOS AAS e AINEs.
   - Grupo B (Sem sinais de alarme, mas com fatores de risco/comorbidades/sangramento espontâneo de pele): Hidratação oral supervisionada e hemograma obrigatório para avaliar hematócrito.
   - Grupo C (Presença de SINAIS DE ALARME): Internação imediata em leito de observação, hidratação venosa rápida com Cristaloides (10 ml/kg nas primeiras 2 horas), reavaliações clínicas frequentes e hematócrito seriado.
   - Grupo D (Dengue Grave / Sinais de Choque): Suporte em leito de UTI, ressuscitação volêmica imediata com cristaloides (20 ml/kg em 20 minutos, repetindo até 3 vezes se necessário), monitoramento hemodinâmico estrito.`;
  }
  if (nomeLower.includes('apendicite')) {
    return `1. Conduta Cirúrgica Definitiva:
   - Apendicectomia de urgência por via videolaparoscópica (preferencial) ou laparotomia aberta convencional.
2. Medidas Clínicas Pré-Operatórias Imediatas:
   - Jejum absoluto imediato, reposição volêmica com cristaloide isotônico (Ringer Lactato ou Soro Fisiológico).
   - Analgesia parenteral adequada e antieméticos.
   - Antibioticoprofilaxia intravenosa na indução anestésica cobrindo flora entérica gram-negativa e anaeróbios (ex: Cefoxitina 2g IV dose única ou Ceftriaxona 1-2g + Metronidazol 500mg IV).
3. Em casos perfurados com peritonite ou abscesso localizado: Manter antibioticoterapia terapêutica por 3 a 5 dias e drenagem se coleção organizada.`;
  }

  const cat = getDiseaseCategoryName(dis);
  return `1. Medidas Gerais e Suporte: Repouso relativo, monitorização de sinais vitais, adequação nutricional e hidratação hidroeletrolítica individualizada conforme a gravidade.
2. Terapia Medicamentosa Específica: Prescrição direcionada conforme protocolos clínicos de ${cat} e diretrizes médicas vigentes (ajustando doses por peso, função renal e hepática).
3. Critérios de Encaminhamento e Hospitalização: Presença de instabilidade hemodinâmica, hipoxemia, refratariedade ao tratamento ambulatorial ou sinais de alarme justifica admissão hospitalar imediata.`;
};

export const getDiseaseComplications = (dis: MedicalDisease): string => {
  if (dis.complications && dis.complications.trim().length > 10) {
    return dis.complications.trim();
  }
  const nomeLower = dis.nome.toLowerCase();

  if (nomeLower.includes('hipertensão') || nomeLower.includes('has')) {
    return 'Hipertrofia ventricular esquerda, insuficiência cardíaca congestiva (com fração de ejeção preservada ou reduzida), doença arterial coronariana e IAM, acidente vascular cerebral isquêmico e hemorrágico, demência vascular, retinopatia hipertensiva com perda visual, nefrosclerose hipertensiva e doença renal crônica terminal dialítica.';
  }
  if (nomeLower.includes('infarto') || nomeLower.includes('iam')) {
    return 'Choque cardiogênico, arritmias ventriculares malignas potencialmente fatais (taquicardia ventricular e fibrilação ventricular), insuficiência cardíaca aguda, parada cardiorrespiratória, complicações mecânicas (ruptura de músculo papilar com insuficiência mitral aguda, ruptura de septo interventricular, ruptura de parede livre com tamponamento cardíaco), pericardite pós-IAM (Síndrome de Dressler) e formação de aneurisma ventricular com trombo mural.';
  }
  if (nomeLower.includes('avc') || nomeLower.includes('vascular cerebral')) {
    return 'Edema cerebral com hipertensão intracraniana e herniação uncal/amigdalar, transformação hemorrágica secundária, crises convulsivas pós-AVC, pneumonia aspirativa, trombose venosa profunda (TVP) e tromboembolismo pulmonar (TEP), úlceras por pressão, espasticidade muscular, dor neuropática central, disfagia grave, afasia e depressão pós-AVC.';
  }
  if (nomeLower.includes('pneumonia') || nomeLower.includes('pac')) {
    return 'Derrame pleural parapneumônico e empiema pleural, abscesso pulmonar e necrose parenquimatosa cavitária, sepse e choque séptico com disfunção de múltiplos órgãos, insuficiência respiratória aguda hipoxêmica e síndrome do desconforto respiratório agudo (SDRA/SARA), descompensação de comorbidades prévias (ICC, DPOC, DM).';
  }
  if (nomeLower.includes('asma')) {
    return 'Insuficiência respiratória aguda hipercápnica com fadiga muscular respiratória, pneumotórax e pneumomediastino por barotrauma, necessidade de intubação orotraqueal e ventilação mecânica invasiva, atelectasias por tampão mucoso e remodelamento estrutural brônquico com obstrução fixa irreversível ao fluxo aéreo.';
  }
  if (nomeLower.includes('dengue')) {
    return 'Choque circulatório por extravasamento plasmático maciço, hemorragias graves (gastrointestinal, intracraniana), insuficiência hepática aguda com encefalopatia (hepatite por dengue), miocardite e arritmias, encefalite/encefalopatia viral, coagulação intravascular disseminada (CIVD) e óbito.';
  }
  if (nomeLower.includes('apendicite')) {
    return 'Perfuração apendicular livre com peritonite fecal generalizada, formação de abscesso periapendicular ou pélvico loculado, pileflebite (trombose séptica da veia porta com abscessos hepáticos bacterianos), sepse abdominal e choque séptico, fístulas estercoráceas e obstrução intestinal pós-operatória por bridas/aderências.';
  }

  return 'Evolução para instabilidade clínica sistêmica, lesão de órgãos-alvo, infecção secundária sobreposta, cronificação do quadro, perda de capacidade funcional e risco de reinternação hospitalar em casos graves não tratados precocemente.';
};

export const getDiseasePrognosis = (dis: MedicalDisease): string => {
  if (dis.prognosis && dis.prognosis.trim().length > 10) {
    return dis.prognosis.trim();
  }
  const nomeLower = dis.nome.toLowerCase();

  if (nomeLower.includes('hipertensão') || nomeLower.includes('has')) {
    return 'Excelente prognóstico quando diagnosticada e tratada precocemente com controle pressórico sustentado nas metas terapêuticas. A cada redução de 10 mmHg na PAS e 5 mmHg na PAD, observa-se uma redução relativa de 20% em eventos cardiovasculares maiores, 30% em AVC e 15% na mortalidade por todas as causas.';
  }
  if (nomeLower.includes('infarto') || nomeLower.includes('iam')) {
    return 'Altamente dependente da precocidade da terapia de reperfusão miocárdica (tempo porta-balão / porta-agulha), extensão do infarto e fração de ejeção ventricular esquerda residual. Mortalidade intra-hospitalar cai para < 3-5% com angioplastia primária precoce bem-sucedida, mas permanece elevada em pacientes que evoluem com choque cardiogênico (>40-50%).';
  }
  if (nomeLower.includes('avc') || nomeLower.includes('vascular cerebral')) {
    return 'Prognóstico funcional e de sobrevida estreitamente atrelado à gravidade inicial medida pelo escore NIHSS, idade do paciente, tempo para realização de trombólise/trombectomia e cuidados em Unidade de AVC especializada. Cerca de 40% a 50% dos pacientes tratados precocemente recuperam independência funcional completa em 90 dias.';
  }
  if (nomeLower.includes('pneumonia') || nomeLower.includes('pac')) {
    return 'Mortalidade < 1-2% em pacientes ambulatoriais jovens sem comorbidades, elevando-se para 8-15% em pacientes internados em enfermaria e ultrapassando 30-40% em pacientes graves admitidos em UTI com choque séptico. A maioria dos pacientes imunocompetentes apresenta resolução clínica completa em 7 a 14 dias.';
  }
  if (nomeLower.includes('dengue')) {
    return 'A taxa de letalidade é inferior a 1% quando o diagnóstico é oportuno e a hidratação venosa/oral adequada é iniciada prontamente antes da instalação do choque irreversível. Quadros de choque não reconhecido podem apresentar letalidade superior a 10-20%.';
  }
  if (nomeLower.includes('apendicite')) {
    return 'Excelente na apendicite não complicada tratada precocemente (mortalidade < 0,1% e recuperação completa em poucos dias). Em idosos ou casos de perfuração com peritonite generalizada e sepse, a morbimortalidade e o tempo de internação aumentam significativamente.';
  }

  return 'Favorável na grande maioria dos casos com adesão ao plano terapêutico e acompanhamento clínico periódico regular. Fatores que impactam negativamente o prognóstico incluem idade avançada, comorbidades múltiplas e atraso no início das condutas preconizadas.';
};

/**
 * Enriches a disease with all 5 clinical dimensions guaranteed
 */
export const ensureFullDiseaseData = (dis: MedicalDisease): MedicalDisease => {
  return {
    ...dis,
    categoria: getDiseaseCategoryName(dis),
    definition: getDiseaseDefinition(dis),
    epidemiology: getDiseaseEpidemiology(dis),
    etiology: getDiseaseEtiology(dis),
    pathophysiology: getDiseasePathophysiology(dis),
    treatment: getDiseaseTreatment(dis),
    complications: getDiseaseComplications(dis),
    prognosis: getDiseasePrognosis(dis),
    achados_exames: (dis.achados_exames && dis.achados_exames.length > 0) ? dis.achados_exames : [],
    criterios_diagnosticos: (dis.criterios_diagnosticos && dis.criterios_diagnosticos.length > 0) ? dis.criterios_diagnosticos : [],
    red_flags: (dis.red_flags && dis.red_flags.length > 0) ? dis.red_flags : [],
    sintomas: (dis.sintomas && dis.sintomas.length > 0) ? dis.sintomas : [],
    fatores_risco: (dis.fatores_risco && dis.fatores_risco.length > 0) ? dis.fatores_risco : [],
    diferenciais: (dis.diferenciais && dis.diferenciais.length > 0) ? dis.diferenciais : []
  };
};
