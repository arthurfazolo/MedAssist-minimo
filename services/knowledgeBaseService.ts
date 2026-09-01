import { MedicalDisease } from '../types';
import { migrateItemReviewFields } from './reviewService';
import { CARDIOLOGY_DISEASES } from './cardiologyDiseases';
import { CLINICAL_MEDICINE_DISEASES } from './clinicalMedicineDiseases';
import { PULMONOLOGY_DISEASES } from './pulmonologyDiseases';
import { DERMATOLOGY_DISEASES } from './dermatologyDiseases';
import { NEUROLOGY_DISEASES } from './neurologyDiseases';
import { INFECTIOUS_DISEASES } from './infectiousDiseases';
import { INFECTIOUS_DISEASES_BATCH2 } from './infectiousDiseasesBatch2';
import { PEDIATRIC_DISEASES } from './pediatricDiseases';
import { PEDIATRIC_DISEASES_BATCH2 } from './pediatricDiseasesBatch2';
import { GYNECO_OBSTETRICS_DISEASES } from './gynecoObstetricsDiseases';
import { GYNECO_OBSTETRICS_DISEASES_BATCH2 } from './gynecoObstetricsDiseasesBatch2';
import { PSYCHIATRY_DISEASES } from './psychiatryDiseases';

const DB_NAME = 'MedAssistKnowledgeDB';
const DB_VERSION = 1;
const STORE_NAME = 'diseases';

import { db, auth, handleFirestoreError, OperationType, cleanUndefined, isUserAuthAdmin, syncCurrentAdminToFirestore } from './firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

// Fallback client-side storage systems
let useInMemoryFallback = false;
let inMemoryDiseases: MedicalDisease[] = [];
let firestoreDiseases: MedicalDisease[] = [];
let isSnapshotInitialized = false;

export const getDiseaseByIdOnline = async (id: string): Promise<MedicalDisease | null> => {
  try {
    const docRef = doc(db, 'diseases', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as MedicalDisease;
    }
  } catch (error) {
    console.error('Falha ao obter doença do Firebase:', error);
  }
  return null;
};

export const initDiseasesSync = () => {
  if (isSnapshotInitialized) return;
  isSnapshotInitialized = true;

  onSnapshot(collection(db, 'diseases'), (snapshot) => {
    const list: MedicalDisease[] = [];
    snapshot.forEach(docSnap => {
      list.push(docSnap.data() as MedicalDisease);
    });
    firestoreDiseases = list;
    clearSearchCache();
    window.dispatchEvent(new CustomEvent('medassist:diseases-updated'));
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'diseases');
  });
};

initDiseasesSync();

let fallbackInitialized = false;

const initFallbackIfNeeded = () => {
  if (fallbackInitialized) return;
  try {
    const raw = localStorage.getItem('medassist_fallback_diseases');
    if (raw) {
      inMemoryDiseases = JSON.parse(raw);
    } else {
      inMemoryDiseases = [];
    }
  } catch (e) {
    console.warn('Failed to load fallback from localStorage, using memory storage only:', e);
    inMemoryDiseases = [];
  }
  fallbackInitialized = true;
};

const saveFallbackIfNeeded = () => {
  try {
    localStorage.setItem('medassist_fallback_diseases', JSON.stringify(inMemoryDiseases));
  } catch (e) {
    console.warn('Failed to save fallback to localStorage:', e);
  }
};

// Helper to open the IndexedDB connection
export const openKnowledgeDB = (): Promise<IDBDatabase | null> => {
  if (useInMemoryFallback) {
    return Promise.resolve(null);
  }

  if (typeof indexedDB === 'undefined') {
    console.warn('IndexedDB is not supported in this environment. Switching to memory/localStorage fallback.');
    useInMemoryFallback = true;
    initFallbackIfNeeded();
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) => {
        console.warn('IndexedDB open error, switching to memory/localStorage fallback:', event);
        useInMemoryFallback = true;
        initFallbackIfNeeded();
        resolve(null);
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          // Create indexes for efficient searching
          store.createIndex('nome_idx', 'nome', { unique: false });
          store.createIndex('sintomas_idx', 'sintomas', { unique: false, multiEntry: true });
          store.createIndex('fatores_risco_idx', 'fatores_risco', { unique: false, multiEntry: true });
        }
      };
    } catch (e) {
      console.warn('Exception opening IndexedDB, switching to memory/localStorage fallback:', e);
      useInMemoryFallback = true;
      initFallbackIfNeeded();
      resolve(null);
    }
  });
};

// Seed dataset of high-fidelity diseases in Portuguese
const MAIN_MANUAL_DISEASES: Omit<MedicalDisease, 'achados_exames' | 'criterios_diagnosticos'>[] = [
  {
    id: 'I63',
    nome: 'Acidente Vascular Cerebral Isquêmico (AVCi)',
    sintomas: ['Défice neurológico focal súbito', 'Hemiparesia ou hemiplegia', 'Assimetria facial', 'Dificuldade na fala ou afasia', 'Cefaleia de início agudo', 'Alteração visual unilateral'],
    fatores_risco: ['Hipertensão Arterial', 'Fibrilação Atrial (FA)', 'Tabagismo', 'Diabetes Mellitus', 'Idade avançada', 'Estenose de carótida'],
    red_flags: ['Instabilidade de vias aéreas', 'Composição neurológica flutuante/progressiva rápido', 'Crise convulsiva associada', 'Alteração súbita de nível de consciência / coma'],
    diferenciais: ['Hemorragia intracraniana', 'Hemiplegia pós-ictal de Todd', 'Crise de enxaqueca com aura hemiplégica', 'Hipoglicemia grave', 'Meningite/Encefalite']
  },
  {
    id: 'K35',
    nome: 'Apendicite Aguda',
    sintomas: ['Dor abdominal peri-umbilical epigástrica que migra para fossa ilíaca direita', 'Anorexia', 'Náuseas e vômitos', 'Febre baixa', 'Dor ao tossir', 'Constipação ou diarreia leve'],
    fatores_risco: ['Faixa etária jovem (10-30 anos)', 'Dieta de baixo resíduo nutricional', 'Sexo masculino (leve predominância)'],
    red_flags: ['Sinal de Blumberg positivo (descompressão dolorosa abrupta)', 'Peritonite generalizada', 'Febre alta com calafrios', 'Abdome rígido em tábua', 'Taquicardia progressiva'],
    diferenciais: ['Diverticulite de Meckel', 'Doença Inflamatória Pélvica (DIP)', 'Cisto ovariano roto ou torção', 'Cólica nefrética', 'Adenite mesentérica']
  },
  {
    id: 'J18',
    nome: 'Pneumonia Adquirida na Comunidade (PAC)',
    sintomas: ['Tosse produtiva com escarro purulento ou herruginoso', 'Febre alta', 'Estertores crepitantes auscultados', 'Dispneia', 'Dor torácica pleurítica', 'Calafrios'],
    fatores_risco: ['Tabagismo', 'Idade extrema (crianças e idosos)', 'Doença Pulmonar Obstrutiva Crônica (DPOC)', 'Alcoolismo', 'Imunossupressão'],
    red_flags: ['Confusão mental aguda', 'Ureia elevada (> 50 mg/dL)', 'Frequência respiratória ≥ 30 irpm', 'Hipotensão arterial (PAS < 90 ou PAD ≤ 60 mmHg)', 'Necessidade de oxigênio suplementar'],
    diferenciais: ['Insuficiência cardíaca descompensada', 'Tromboembolismo pulmonar', 'Tuberculose pulmonar', 'Bronquite aguda de causa viral', 'Pneumonite por hipersensibilidade']
  },
  {
    id: 'I26',
    nome: 'Tromboembolismo Pulmonar (TEP)',
    sintomas: ['Dispneia súbita', 'Dor torácica pleurítica', 'Taquipneia', 'Hemoptise', 'Cianose periférica', 'Tosse inexplicada', 'Taquicardia'],
    fatores_risco: ['Cirurgia recente ou imobilização prolongada', 'Câncer ativo', 'Uso de contraceptivos orais / estrogênio', 'Trombose venosa profunda (TVP) prévia', 'Obesidade', 'Trombofilias'],
    red_flags: ['Hipotensão arterial persistente (choque obstrutivo)', 'Sobrecarga de ventrículo direito verificada no ecocardiograma', 'Hipoxemia refratária', 'Síncope precoce'],
    diferenciais: ['Infarto agudo do miocárdio', 'Pneumotórax espontâneo', 'Pneumonia adquirida', 'Crise de pânico', 'Dissecção de aorta']
  },
  {
    id: 'J45',
    nome: 'Asma Aguda em Crise descompensada',
    sintomas: ['Sibilos inspiratórios e expiratórios', 'Dispneia ou cansaço aos esforços', 'Opressão torácica leve a moderada', 'Tosse seca irritativa pior à noite', 'Despertares noturnos com falta de ar'],
    fatores_risco: ['Atopia familiar ou rinite alérgica', 'Exposição a alérgenos (ácaros, pêlos)', 'Mudanças climáticas bruscas', 'Infecções de vias aéreas superiores', 'Estresse emocional'],
    red_flags: ['Tórax silencioso (ausência total de sibilos)', 'Nível de consciência alterado ou sonolência', 'Dificuldade para pronunciar frases completas', 'Fadiga respiratória com respiração paradoxal', 'SatO2 < 90% em ar ambiente'],
    diferenciais: ['Insuficiência respiratória aguda por DPOC exacerbada', 'Insuficiência ventricular esquerda', 'Aspiração de corpo estranho', 'Disfunção de cordas vocais']
  },
  {
    id: 'G00',
    nome: 'Meningite Bacteriana Aguda',
    sintomas: ['Cefaleia de forte intensidade', 'Rigidez de nuca com dor importante', 'Febre alta de início abrupto', 'Vômitos em jato', 'Fotofobia', 'Confusionismo mental', 'Sinal de Brudzinski e Kernig positivos'],
    fatores_risco: ['Idade pediátrica extrema ou idosos', 'Não vacinação contra meningopneumococo', 'Imunocomprometimento', 'Fístula liquórica orofaríngea', 'Sinusite ou otite média prévia'],
    red_flags: ['Petéquias ou púrpura palpável (sinal de meningococcemia)', 'Sinal neurológico focal', 'Crises convulsivas repetitivas', 'Glasgow menor que 10 / torpor rápido'],
    diferenciais: ['Meningite viral asséptica', 'Hemorragia subaracnoidea grave', 'Abscesso cerebral localizado', 'Meningoencefalite fúngica', 'Encefalopatia hepática']
  },
  {
    id: 'E10',
    nome: 'Cetoacidose Diabética (CAD)',
    sintomas: ['Poliúria importante', 'Polidipsia acentuada', 'Hálito cetônico característico de maçã podre', 'Dor abdominal difusa simulando abdome agudo', 'Náuseas e vômitos persistentes', 'Fadiga pronunciada', 'Perda de peso rápido'],
    fatores_risco: ['Diabetes Mellitus Tipo 1 diagnosticado ou inicial', 'Omissão de dose regular de insulina', 'Infecção desencadeante (ITU, PAC)', 'Uso de corticoides e outros fármacos hiperglicemiantes'],
    red_flags: ['Respiração profunda e rápida de Kussmaul', 'Obnubilação, delírio ou coma', 'Desidratação grave com choque hipovolêmico', 'Potássio sérico < 3.3 mEq/L que contraindica insulina imediata'],
    diferenciais: ['Estado Hiperosmolar Hiperglicêmico (EHH)', 'Gastroenterite aguda com desidratração', 'Acidose lática grave', 'Intoxicação por salicilatos ou álcool']
  },
  {
    id: 'K81',
    nome: 'Colecistite Aguda',
    sintomas: ['Dor em hipocôndrio direito de caráter cólico ou contínuo', 'Irradiação da dor para ombro direito ou escápula', 'Febre moderada acompanhada de calafrios', 'Sinal de Murphy positivo no exame', 'Náuseas e vômitos biliosos'],
    fatores_risco: ['Presença de colelitíase prévia (cálculos)', 'Sexo feminino', 'Idade superior a 40 anos', 'Obesidade ou perda de peso rápida (cirurgias bariátricas)', 'Multiparidade'],
    red_flags: ['Presença de icterícia marcante (sugere coledocolitíase/colangite)', 'Instabilidade circulatória ou choque asséptico', 'Dor generalizada severa (sugere perfuração colecística)', 'Massa palpável extremamente dolorosa'],
    diferenciais: ['Pancreatite de etiologia biliar', 'Úlcera péptica perfurada', 'Abscesso hepático amebiano ou bacteriano', 'Pneumonia de base direita', 'Hepatite aguda fulminante']
  },
  {
    id: 'A90',
    nome: 'Dengue Infecção',
    sintomas: ['Febre alta súbita', 'Cefaleia com dor retro-orbitária característica', 'Mialgia intensa (febre quebra-ossos)', 'Artralgia importante', 'Exantema maculopapular pruriginoso', 'Fadiga e adinamia profunda'],
    fatores_risco: ['Residência ou trânsito em área endêmica de surtos', 'Temporada de chuva / proliferação de vetores', 'Ausência de imunidade para o sorotipo em circulação'],
    red_flags: ['Dor abdominal intensa e contínua', 'Vômitos persistentes intratáveis', 'Acúmulo de líquidos observables (derrame pleural, ascite)', 'Sangramento de mucosas (epistaxe, gengivorragia)', 'Hipotensão postural / lipotimia', 'Aumento rápido do hematócrito'],
    diferenciais: ['Febre de Chikungunya', 'Zika vírus infecção', 'Leptospirose', 'Malária clássica', 'Febre amarela', 'Lupus eritematoso sistêmico']
  },
  {
    id: 'A41',
    nome: 'Sepse Humana',
    sintomas: ['Disfunção orgânica ameaçadora à vida', 'Taquicardia compensatória ou hipotensão', 'Taquipneia', 'Hipertermia ou hipotermia de início rápido', 'Confusão mental flutuante', 'Oligúria (redução do volume urinário)'],
    fatores_risco: ['Extremos de idade (idosos, neonatos)', 'Imunossupressão (quimioterapia, HIV, asplenia)', 'Internação hospitalar prolongada recente', 'Dispositivos invasivos (sondas, acessos centrais)', 'Presença de foco infeccioso não tratado'],
    red_flags: ['Necessidade de vasopressor para manter PAM ≥ 65 mmHg', 'Lactato sérico acima de 2 mmol/L (indica choque séptico)', 'Insuficiência renal aguda importante', 'Coagulação intravascular disseminada (CIVD) com plaquetopenia rápido'],
    diferenciais: ['Choque cardiogênico descompensado', 'Choque anafilático grave', 'Reação de Jarisch-Herxheimer extrema', 'Pancreatite necro-hemorrágica estéril', 'Insuficiência adrenal aguda']
  },
  {
    id: 'K85',
    nome: 'Pancreatite Aguda',
    sintomas: ['Dor abdominal intensa em andar superior e epigástrio', 'Dor em faixa com irradiação para o dorso (costas)', 'Náuseas e vômitos frequentes que não aliviam a dor', 'Distensão abdominal moderada', 'Melhora da dor com a flexão anterior do tronco'],
    fatores_risco: ['Colelitíase prévia (microcálculos biliares)', 'Etilismo pesado crônico ou agudo', 'Hipertrigliceridemia grave (> 1000 mg/dL)', 'Iatrogenia pós-CPRE', 'Hipercalcemia'],
    red_flags: ['Hipotensão resistente / choque hemodinâmico precoce', 'Taquipneia com síndrome de angústia respiratória (SARA)', 'Sinais de sangramento retroperitoneal (Grey-Turner ou Cullen)', 'Elevação acentuada de escórias acompanhada de anúria'],
    diferenciais: ['Úlcera péptica perfurada', 'Infarto entero-mesentérico agudo', 'Dissecção aórtica progressiva', 'Obstrução intestinal de alça fechada', 'Colangite aguda']
  },
  {
    id: 'I10.0',
    nome: 'Emergência Hipertensiva',
    sintomas: ['Cefaleia intensa occipital', 'Escotomas cintilantes ou turvação visual', 'Zumbido pulsátil no ouvido', 'Elevação severa da pressão arterial (PAS ≥ 180 ou PAD ≥ 120 mmHg)', 'Nervosismo excessivo ou dispneia'],
    fatores_risco: ['Hipertensão arterial sistêmica primária mal controlada', 'Omissão de drogas anti-hipertensivas de ação rápida', 'Uso concomitante de simpaticomiméticos (descongestionantes, energéticos)', 'Estresse físico agudo ou dor não aliviada', 'Insuficiência renal oculta crônica'],
    red_flags: ['Surgimento de Edema Agudo de Pulmão (esforço e SatO2 baixa)', 'Sinais de Encefalopatia Hipertensiva (confusão mental, convulsão)', 'Dor torácica típica sugestiva de coronariopatia ativa ou dissecção', 'Déficits na movimentação ou fala apontando para AVC agudo'],
    diferenciais: ['Urgência Hipertensiva (sem lesão de órgão-alvo aguda)', 'Pseudocrise hipertensiva (dor, ansiedade, pânico provocando alta de PA)', 'Feocromocitoma descompensado', 'Surgimento primário de hemorragia cerebral']
  },
  {
    id: 'A09',
    nome: 'Gastroenterite Aguda (GECA)',
    sintomas: ['Diarreia aquosa ou mucocutânea repetitiva', 'Vômitos frequentes e náuseas pós-alimentares', 'Cólica abdominal e cólicas espasmódicas', 'Febre baixa ou moderada acompanhada de calafrios', 'Tenesmo doloroso caso haja foco retal', 'Sede excessiva e boca seca'],
    fatores_risco: ['Ingestão de alimentos suspeitos ou água não tratada', 'Contato recente com pessoas com quadros de diarreia', 'Temporadas quentes facilitando proliferação bacteriana', 'Higiene de mãos deficiente habitual ou coletividade'],
    red_flags: ['Sinais visíveis de desidratação grave (olhos encovados, turgor diminuído)', 'Hipotensão postural com letargia ou confusão', 'Presença constante de sangue ou pus volumoso nas fezes', 'Impossibilidade total de hidratação por via oral (vômitos intratáveis)'],
    diferenciais: ['Apendicite aguda precoce', 'Colite ulcerativa ou Crohn descompensadas', 'Intoxicação alimentar com toxinas bacterianas prévias', 'Peritonite subaquosa bacteriana', 'Obstrução de alça intestinal parcial']
  },
  {
    id: 'N39',
    nome: 'Infecção do Trato Urinário Alto (Pielonefrite Aguda)',
    sintomas: ['Febre alta precedida por calafrios trementes', 'Dor lombar unilateral ou bilateral profunda', 'Sinal de Giordano positivo (punho-percussão dolorosa)', 'Disúria, polaciúria ou urgência micional (se associado a cistite)', 'Náuseas e vômitos alimentares', 'Urina turva de odor marcante'],
    fatores_risco: ['Presença de cálculo renal obstrutivo ou estenose', 'Sexo feminino devido a uretra curta', 'Gravidez em qualquer trimestre gestacional', 'Uso atual de cateter vesical de demora ou intermitente', 'Diabetes mellitus crônica ou imunossupressão', 'Hiperplasia prostática em homens idosos'],
    red_flags: ['Sinais sistêmicos de Choque Séptico / Urossepse eminente', 'Obstrução urinária grave diagnosticada associada a rim único', 'Progressão acelerada de Insuficiência Renal Aguda', 'Imunodeficiência severa associada ou transplante de órgãos'],
    diferenciais: ['Cólica nefrética com urolitíase isolada', 'Apendicite retrocecal', 'Abscesso perinefrético encapsulado', 'Doença inflamatória pélvica', 'Lumbago muscular agudo traumatático']
  },
  {
    id: 'E03',
    nome: 'Hipotireoidismo Clínico descompensado',
    sintomas: ['Fadiga excessiva constante e desânimo imotivado', 'Intolerância ao frio acentuada', 'Ganhos de peso sem aumento de ingesta calórica', 'Obstipação intestinal prolongada persistente', 'Pele seca, descamativa e cabelos finos quebradiços', 'Bradicardia leve, cansaço fácil', 'Derrame pleural subclínico ou rouquidão', 'Macroglossia em casos avançados'],
    fatores_risco: ['Tireoidite crônica autoimune de Hashimoto prévia', 'Cirurgia de tireoidectomia anterior unilateral ou total', 'Tratamentos prévios com radioiodo de Graves', 'Histórico familiar de tireoidites autoimunes', 'Gênero feminino e gestantes tardias', 'Deficiência nutricional persistente de iodo'],
    red_flags: ['Coma Mixedematoso (torpor acentuado com hipotermia severa)', 'Insuficiência respiratória por hipoventilação alveolar secundária', 'Bradicardia perigosa extrema associada a choque', 'Efusão pericárdica volumosa com descompensação clínica rápido'],
    diferenciais: ['Síndrome depressiva maior secundária', 'Anemia ferropriva crônica importante', 'Síndrome da fadiga crônica', 'Insuficiência renal crônica grave', 'Demência incipiente em idosos']
  },
  {
    id: 'M05',
    nome: 'Artrite Reumatoide',
    sintomas: ['Poliartrite simétrica persistente que afeta pequenas articulações', 'Rigidez matinal de longa duração (> 1 hora de rigidez)', 'Dor articular que melhora temporariamente com movimentos', 'Erosão óssea articular precoce visível em exames', 'Surgimento paulatino de nódulos reumatoides subcutâneos', 'Fadiga imotivada geral, febre baixa episódica'],
    fatores_risco: ['Predisposição genética comprovada de alelos específicos', 'Sexo feminino (proporção média de 3 para 1)', 'Tabagismo atual como forte fator disparador', 'Sedentarismo e obesidade central', 'Fatores infecciosos epiteliais ou periodontite habitual'],
    red_flags: ['Subluxação atlanto-axial perigosa com dor cervical severa', 'Neuropatia espinhal cervical precoce indicando urgência neurocirúrgica', 'Vasculite reumatoide ativa manifestando gangrena ou infartos na pele', 'Nódulo reumatoide pulmonar cavitado com hemoptise refratária'],
    diferenciais: ['Lupus Eritematoso Sistêmico clássico', 'Artrite Psoriática activa', 'Gota úrica crônica tofosa poliarticular', 'Osteoartrite nodular senil comum', 'Artrite reativa pó-infecciosa']
  }
];

export const getAchadosExamesComplementaresDefault = (id: string, nome: string, sintomas: string[]): string[] => {
  const nameLower = nome.toLowerCase();
  const idLower = id.toLowerCase();
  
  if (nameLower.includes('enxaqueca') || nameLower.includes('migrânea') || idLower.startsWith('g43')) {
    return [
      "Tomografia Computadorizada (TC) ou Ressonância Magnética (RM) de crânio: normais, indicadas para excluir causas secundárias de cefaleia se sinais de alerta presentes.",
      "Análise liquórica (LCR) e punção lombar: normais, indicadas apenas em cefaleias de início súbito (excluir hemorragia subaracnóidea) ou febre.",
      "Exames laboratoriais básicos (hemograma, PCR, função tireoidiana): normais, úteis para rastreio de diagnósticos sistêmicos diferenciais."
    ];
  }
  if (nameLower.includes('pneumonia') || nameLower.includes('pac') || idLower.startsWith('j18') || idLower.startsWith('j15')) {
    return [
      "Radiografia de tórax (PA e Perfil): presença de consolidação lobar ou segmentar, broncogramas aéreos ou infiltrado intersticial.",
      "Hemograma completo: leucocitose com desvio à esquerda proeminente.",
      "Proteína C Reativa (PCR) e Procalcitonina séricas: marcadamente elevadas, correlacionando-se com a gravidade da infecção.",
      "Exames microbiológicos (hemoculturas e cultura de escarro): indicados em pacientes hospitalizados graves para guiar antibioticoterapia direcionada."
    ];
  }
  if (nameLower.includes('hipertensão') || nameLower.includes('has') || idLower.startsWith('i10')) {
    return [
      "Ecocardiograma e Eletrocardiograma (ECG): avaliação de sobrecarga ventricular esquerda (HVE) e disfunção diastólica ativa.",
      "Fundoscopia ocular direta: pesquisa de retinopatia hipertensiva (pontes arteriovenosas ou cruzamentos patológicos de grau I a IV).",
      "Relação albumina/creatinina urinária ou microalbuminúria de 24h: positiva, evidenciando nefropatia hipertensiva inicial.",
      "Função renal (Creatinina e Ureia) e Taxa de Filtração Glomerular (TFG): avaliações essenciais para estadiamento de órgão-alvo renal."
    ];
  }
  if (nameLower.includes('vascular') || nameLower.includes('avc') || idLower.startsWith('i63') || idLower.startsWith('i61') || idLower.startsWith('i60')) {
    return [
      "Tomografia Computadorizada (TC) de crânio sem contraste imediatamente: padrão-ouro inicial para diferenciar AVC isquêmico (inicialmente normal) de hemorrágico.",
      "Ressonância Magnética (RM) de crânio com sequência de Difusão (DWI): alta sensibilidade para isquemia cerebral precoce (minutos do início do quadro).",
      "Duplex Scan de carótidas e artérias vertebrais: mensuração de estenose hemodinamicamente significativa e placas ateromatosas instáveis.",
      "Ecocardiograma e Eletrocardiograma (ECG): monitoramento de fontes cardioembólicas (ex: Fibrilação Atrial, trombos cavitários)."
    ];
  }
  if (nameLower.includes('apendicite') || idLower.startsWith('k35')) {
    return [
      "Ultrassonografia (USG) ou Tomografia Computadorizada (TC) de abdome total: apêndice cecal aperistáltico distendido (>6mm de diâmetro), espessamento parietal inflamatório e borramento da gordura periapendicular.",
      "Hemograma completo: leucocitose moderada com neutrofilia e desvio à esquerda.",
      "Proteína C Reativa (PCR): elevada na maioria dos quadros agudos inflamatórios."
    ];
  }
  if (nameLower.includes('tromboembolismo') || nameLower.includes('tep') || idLower.startsWith('i26')) {
    return [
      "Angiotomografia Computadorizada de Tórax (Protocolo TEP): falhas de enchimento vascular intraluminares em artérias pulmonares ou ramos segmentares.",
      "D-Dímero quantitativo no plasma: valor preditivo negativo extremamente alto (>95%) se níveis normais em pacientes de baixa probabilidade clínica.",
      "Ecocardiograma transtorácico: sobrecarga aguda de ventrículo direito, dilatação do VD e desvio de septo interventricular (Sinal de McConnell).",
      "Gasometria arterial: hipoxemia, normocapnia ou hipocapnia devido a hiperventilação compensatória."
    ];
  }
  if (nameLower.includes('asma') || idLower.startsWith('j45') || idLower.startsWith('j46')) {
    return [
      "Espirometria com prova broncodilatadora: distúrbio ventilatório obstrutivo reversível (incremento de VEF1 ≥ 12% e ≥ 200 ml após broncodilatador de ação rápida).",
      "Medida do Pico de Fluxo Expiratório (Peak Flow): variabilidade diurna acentuada nas taxas e obstrução dinâmica.",
      "Hemograma com contagem de eosinófilos e IgE sérica total: frequentemente elevados se fenótipo de asma alérgica/atópica presente."
    ];
  }
  if (nameLower.includes('meningite') || idLower.startsWith('g00') || idLower.startsWith('a87')) {
    return [
      "Análise do Líquido Cefalorraquidiano (LCR): pleocitose neutrofílica acentuada (>1.000 células/mm³), hiperproteinorraquia proeminente (>100 mg/dL) e hipoglicorraquia intensa (relação LCR/glicemia plasmática < 0.4).",
      "Gram e Culturas do líquor (LCR): identificação direta do patógeno bacteriano específico.",
      "PCR (Reação em Cadeia da Polimerase) multipainel liquórico: alta precisão para diagnóstico rápido de meningites virais, bacterianas e fúngicas."
    ];
  }
  if (nameLower.includes('cetoacidose') || nameLower.includes('cad') || idLower.startsWith('e10')) {
    return [
      "Gasometria arterial sérica: acidose metabólica evidente com pH arterial < 7.30 e bicarbonato (HCO3) < 18 mEq/L.",
      "Glicemia plasmática: valor acima de 250 mg/dL (pode ser menor em gestantes ou pacientes usando inibidores de SGLT2).",
      "Cetonemia (beta-hidroxibutirato > 3.0 mmol/L) ou pesquisa de corpos cetônicos urinários fortemente positivos.",
      "Determinação do Anion Gap elevado: valor caracteristicamente superior a 12 mEq/L."
    ];
  }
  if (nameLower.includes('colecistite') || idLower.startsWith('k81')) {
    return [
      "Ultrassonografia (USG) de abdome superior: presença de cálculos biliares, espessamento da parede vesicular (> 4mm), fluido pericolecístico livre e Sinal de Murphy ultrassonográfico positivo.",
      "Hemograma completo e Proteína C Reativa: leucocitose proeminente associada a atividade inflamatória aguda.",
      "Perfil enzimático hepático (TGO, TGP, Bilirrubinas, Fosfatase Alcalina, GGT): geralmente normais, valores elevados sugerem obstrução associada (coledocolitíase)."
    ];
  }
  if (nameLower.includes('dengue') || idLower.startsWith('a90')) {
    return [
      "Hemograma completo seriado: hemoconcentração (elevação súbita do hematócrito em 20% ou mais) associada a leucopenia característica.",
      "Contagem plaquetária: plaquetopenia progressiva moderada a grave (< 100.000/mm³).",
      "Antígeno viral NS1 (coletado até o 5º dia de febre) ou Sorologia com detecção de anticorpos IgM/IgG específicos para Dengue (após o 6º dia).",
      "Enzimas hepáticas (TGO/TGP) elevadas sinalizando hepatite por vírus da Dengue."
    ];
  }
  if (nameLower.includes('sepse') || idLower.startsWith('a41')) {
    return [
      "Lactato sérico arterial ou venoso: níveis aumentados (> 2.0 mmol/L) em decorrência de hipóxia celular e hipoperfusão sistêmica.",
      "Painel de culturas biológicas (duas amostras de hemocultura de sítios periféricos distintos, urocultura, culturas de secreções): identificação do agente etiopatogênico.",
      "Hemograma com leucocitose marcante ou leucopenia dramática com desvio à esquerda relevante.",
      "Marcadores de disfunção de órgãos: elevação rápida de creatinina, bilirrubinas séricas, coagulograma alterado (RNI > 1.5) e plaquetopenia aguda."
    ];
  }
  if (nameLower.includes('pancreatite') || idLower.startsWith('k85')) {
    return [
      "Amilase e Lipase séricas: elevação proeminente (pelo menos 3 a 5 vezes o limite superior da normalidade). A lipase possui maior especificidade.",
      "Tomografia Computadorizada (TC) de abdome com contraste (indicada preferencialmente após 72-96h do início dos sintomas): diagnóstico estrutural de focos de necrose pancreática e coleções líquidas peripancreáticas.",
      "Ultrassonografia abdominal inicial: recomendada para diagnóstico etiológico precoce (pesquisa de litíase biliar ou microcálculos)."
    ];
  }
  if (nameLower.includes('emergência hipertensiva') || nameLower.includes('urgência hipertensiva')) {
    return [
      "Eletrocardiograma (ECG): evidencia sobrecarga atrial/ventricular esquerda, sinais de sofrimento coronariano agudo ou arritmias induzidas por estresse.",
      "Exames séricos de função renal (creatinina e ureia) e urina tipo I (EAS): hematúria microscópica e proteinúria súbita refletindo nefropatia hipertensiva hiperaguda.",
      "Fundoscopia ocular (mapeamento de retina): hemorragias retinianas focais, exsudatos maculares ou papiledema agudo.",
      "Tomografia Computadorizada de crânio e radiografia/ecocardiograma de tórax: indicados para investigar eventos de AVC secundário ou congestão pulmonar."
    ];
  }
  if (nameLower.includes('gastroenterite') || nameLower.includes('geca') || idLower.startsWith('a09')) {
    return [
      "Dosagem sérica de eletrólitos (Sódio, Potássio, Bicarbonato): avaliação de distúrbios eletrolíticos reativos por perdas hídricas abundantes.",
      "Pesquisa de leucócitos e eritrócitos nas fezes e Coprocultura: indicados em fezes com sangue, muco ou febre elevada para diferenciar infecções invasivas.",
      "Função renal (Ureia e Creatinina): monitoramento de IRA pré-renal por desidratação volumétrica severa."
    ];
  }
  if (nameLower.includes('pielonefrite') || idLower.startsWith('n39') || idLower.startsWith('n10')) {
    return [
      "Urinálise básica (EAS/Urina I): presença consolidada de piúria volumosa, nitrito positivo, bacteriúria evidente e presença de cilindros leucocitários.",
      "Urocultura quantitativa com identificação bacteriana por antibiograma correspondente: essencial para confirmação diagnóstica e ajuste terapêutico (E. coli presente em >80% de casos).",
      "Hemograma completo de urgência e Proteína C Reativa: leucocitose acentuada com desvio e atividade inflamatória proeminente.",
      "Ultrassonografia ou Tomografia Computadorizada de rins e vias urinárias: recomendadas se febre persistente após 72h de antibioticoterapia para afastar abcessos renais ou obstrução."
    ];
  }
  if (nameLower.includes('hipotireoidismo') || idLower.startsWith('e03')) {
    return [
      "Hormônio Estimulante da Tireoide (TSH) sérico elevado: níveis tipicamente > 10.0 mUI/L no hipotireoidismo clínico primário.",
      "T4 Livre plasmático diminuído: hormônio circulante livre abaixo do valor referencial padrão.",
      "Anticorpos anti-tireoperoxidase (Anti-TPO) e anti-tireoglobulina séricos: altamente elevados em quadros de natureza autoimune (Tireoidite de Hashimoto)."
    ];
  }
  if (nameLower.includes('artrite reumatoide') || idLower.startsWith('m05') || idLower.startsWith('m06')) {
    return [
      "Pesquisa de autoanticorpos específicos: Fator Reumatoide (FR) sérico e Anticorpos contra Peptídeos Citrulinados Cíclicos (Anti-CCP, de alta especificidade).",
      "Provas de Atividade Inflamatória: VHS (Velocidade de Hemossedimentação) e Proteína C Reativa (PCR) significativamente aumentados durante fases ativas.",
      "Radiografia simples e Ultrassonografia articular de punhos, mãos e pés: identificação de edema de tecidos moles, osteopenia periarticular simétrica, redução de espaço articular e erosões marginais patognomônicas."
    ];
  }

  // General fallbacks by CID/system categories
  if (idLower.startsWith('i')) {
    return [
      "Eletrocardiograma (ECG) de 12 derivações padrão: avaliação minuciosa do ritmo, sobrecargas cavitárias ventriculares ou sinais isquêmicos focais.",
      "Ecocardiograma bidimensional com Doppler: estudo estrutural das dimensões cavitárias cardíacas, fração de ejeção global (FEVE) e competência valvar.",
      "Marcadores bioquímicos metabólicos e cardiovasculares: dosagem de Troponina cardíaca, de creatinoquinase molecular (CK-MB) ou fração NT-proBNP dependendo de suspeitas agudas.",
      "Rastreamento laboratorial geral: dosagem de eletrólitos séricos, função renal de controle, ácido úrico e painel lipídico."
    ];
  }
  if (idLower.startsWith('j')) {
    return [
      "Radiografia simples de Tórax em projeções PA e Perfil: rastreamento de opacidades alveolares parenquimatosas, consolidações difusas ou espessamentos pleurais.",
      "Espirometria computadorizada simples ou pré e pós-broncodilatador: análise volumétrica dinâmica avaliando limitação obstrutiva ou padrão restritivo.",
      "Gasometria arterial sistêmica: análise de pressão parcial de O2 (PaO2), retenção de CO2 (PaCO2) e balanço ácido-básico respiratório.",
      "Hemograma completo com dosagem de biomarcadores inflamatórios agudos ordinários de parênquima."
    ];
  }
  if (idLower.startsWith('g')) {
    return [
      "Ressonância Magnética (RM) ou Tomografia Computadorizada (TC) de crânio/coluna: identificação de lesões estruturais desmielinizantes, isquêmicas, inflamatórias ou compressivas agudas.",
      "Análise citotóxica e bioquímica do líquido cefalorraquidiano (LCR): punção lombar diagnóstica para pesquisa infecciosa, imunológica ou de barreira.",
      "Eletroneuromiografia (ENMG) de membros: útil para diferenciar quadros de acometimento de neurônio motor inferior, raízes nervosas, plexos, nervos periféricos ou musculares.",
      "Exames de triagem bioquímica metabólica geral séricos: dosagem de íons, dosagem de vitamina B12 sérica, homocisteína e exames inflamatórios."
    ];
  }
  if (idLower.startsWith('l') || idLower.startsWith('c')) {
    return [
      "Dermatoscopia óptica e digital avançada da lesão cutânea ativa: análise de microestruturas epidérmicas e vasculares superficiais não visíveis a olho nu.",
      "Biópsia de pele isolada soco (Punch) e exame anatomopatológico complementar: padrão-ouro confirmatório para diagnósticos inflamatórios crônicos e neoplasias.",
      "Estudos micológicos diretos, raspados epidérmicos para pesquisa parasitária ou culturas microbiológicas se houver suspeita infecciosa sobreposta.",
      "Rastreio laboratorial inflamatório e de autoanticorpos (Ex: FAN, fator reumatoide) se houver suspeita de correlação sistêmica."
    ];
  }

  // Ultimate fallback
  return [
    "Exame de hemograma de controle: monitoramento de alterações nas séries hematológicas vermelha, branca e plaquetária.",
    "Provas séricas inflamatórias gerais (PCR e VHS): determinação de indícios de resposta inflamatória aguda ou crônica.",
    "Avaliação de rastreamento bioquímico básico: dosagem de creatinina, eletrólitos urinários/séricos, enzimas hepáticas e curva glicêmica.",
    "Exame radiológico ou ultrassonográfico de imagem focalizado na topografia orgânica acometida pelo diagnóstico clínico."
  ];
};

export const getCriteriosDiagnosticosDefault = (id: string, nome: string, sintomas: string[]): string[] => {
  const nameLower = nome.toLowerCase();
  const idLower = id.toLowerCase();

  if (nameLower.includes('enxaqueca') || nameLower.includes('migrânea') || idLower.startsWith('g43')) {
    return [
      "Critérios da Classificação Internacional das Cefaleias (ICHD-3 / IHS).",
      "Pelo menos 5 crises com duração de 4 a 72 horas em adultos sem tratamento adequado.",
      "Dor unilateral com padrão pulsátil/latejante, intensidade moderada a forte, que piora com atividade física habitual.",
      "Presença de pelo menos uma manifestação característica durante a cefaleia: repulsa à luz e ruídos (fotofobia/fonofobia) ou náuseas intensas acompanhadas ou não de vômitos cíclicos.",
      "Exclusão completa de diagnósticos simuladores ou cefaleias secundárias por anamnese detalhada e propedêutica confirmatória."
    ];
  }
  if (nameLower.includes('pneumonia') || nameLower.includes('pac') || idLower.startsWith('j18') || idLower.startsWith('j15')) {
    return [
      "Diretrizes de Pneumonia Adquirida na Comunidade da Sociedade Brasileira de Pneumologia e Tisiologia (SBPT).",
      "Surgimento agudo de sintomas do trato respiratório inferior (tosse produtiva ou não, dispneia progressiva, dor torácica pleurítica).",
      "Presença de achados sistêmicos inflamatórios proeminentes (febre regulada ≥ 38°C ou hipotermia e calafrios intensos).",
      "Evidência radiológica de infiltração pulmonar lobar, intersticial ou segmentar nova na radiografia simples ou tomografia de tórax.",
      "Sinais auscultatórios típicos na área acometida (crepitações localizadas, frêmito tóraco-vocal aumentado ou sopro tubário)."
    ];
  }
  if (nameLower.includes('hipertensão') || nameLower.includes('has') || idLower.startsWith('i10')) {
    return [
      "Diretrizes Brasileiras de Hipertensão Arterial (SBC/SBH/SBN).",
      "Pressão arterial de consultório persistentemente elevada com valores de PAS ≥ 140 mmHg e/ou PAD ≥ 90 mmHg obtidos em pelo menos duas consultas clínicas distintas e técnicas de medição adequadas.",
      "Como alternativa, médias de PA ≥ 130/80 mmHg aferidas através da Monitorização Residencial da Pressão Arterial (MRPA) ou valores médios em 24h ≥ 130/80 mmHg observados na Monitorização Ambulatorial (MAPA).",
      "Aferição única ≥ 180/120 mmHg manifestando danos agudos de órgãos-alvo (Emergência Hipertensiva) estabelece diagnóstico definitivo."
    ];
  }
  if (nameLower.includes('vascular') || nameLower.includes('avc') || idLower.startsWith('i63') || idLower.startsWith('i61') || idLower.startsWith('i60')) {
    return [
      "Critérios Consolidados das Diretrizes da American Heart Association (AHA/ASA) e Sociedade Brasileira de Doenças Cerebrovasculares (SBDCV).",
      "Início súbito de déficit neurológico focal compatível com sofrimento ou isquemia de determinado território vascular encefálico.",
      "Exclusão inequívoca de hemorragia aguda ou lesões expansivas intracranianas compressivas através de exames neurodinâmicos de imagem (Tomografia de crânio ou Ressonância).",
      "Para AVC isquêmico agudo em janela trombolítica, os critérios de elegibilidade para terapia com r-tPA (janela de 4,5h) ou trombectomia mecânica devem ser criteriosamente calculados."
    ];
  }
  if (nameLower.includes('apendicite') || idLower.startsWith('k35')) {
    return [
      "Escore Clínico de Alvarado e Diretrizes do Consenso de Jerusalém (WSES).",
      "Cálculo de probabilidade clínica pelo Escore de Alvarado: Pontuação ≥ 7 pontos indica alta probabilidade clínica (orienta internação e cirurgia imediata). Componentes chaves: dor que migra para fossa ilíaca direita (1pt), anorexia (1pt), náuseas/vômitos (1pt), sensibilidade na FID (Sinal de McBurney - 2pt), descompressão dolorosa (Blumberg - 1pt), febre acima de 37.3°C (1pt), leucocitose (2pt) e desvio de neutrófilos (1pt).",
      "Confirmação por exames de imagem tomográficos ou ultrassonográficos em apresentações atípicas ou em grávidas/mulheres em idade fértil."
    ];
  }
  if (nameLower.includes('tromboembolismo') || nameLower.includes('tep') || idLower.startsWith('i26')) {
    return [
      "Critérios Clínico-Radiológicos das Diretrizes da European Society of Cardiology (ESC).",
      "Determinação da probabilidade clínica pré-teste através do Escore de Wells modificado ou Escore de Genebra simplificado.",
      "Em pacientes com alta probabilidade clínica pré-teste, o diagnóstico é confirmado diretamente por Angiotomografia (Angio-TC de tórax), Cintilografia de Ventilação/Perfusão pulmonar ou arteriografia demonstrando o trombo vascular obstrutivo.",
      "Em pacientes com probabilidade clínica intermediária ou baixa, a confirmação exige dosagem de D-Dímero elevada associada a exame de imagem confirmatório."
    ];
  }
  if (nameLower.includes('asma') || idLower.startsWith('j45') || idLower.startsWith('j46')) {
    return [
      "Diretrizes da Global Initiative for Asthma (GINA).",
      "Presença de sintomas de vias aéreas superiores e inferiores característicos que variam em tempo e intensidade (sibilos expiratórios, dispneia cíclica, dor no peito ou opressão torácica e tosse crônica persistentemente pior à noite).",
      "Documentação objetiva de limitação transitória e reversível do fluxo de ar expiratório (Demonstração de espirometria pré e pós uso de broncodilatador mostrando um incremento na taxa de VEF1 ≥ 12% do teórico basal e ≥ 200 mililitros brutos)."
    ];
  }
  if (nameLower.includes('meningite') || idLower.startsWith('g00') || idLower.startsWith('a87')) {
    return [
      "Critérios de Vigilância Epidemiológica Nacional e Diretrizes Clínicas de Infecções de SNC.",
      "Quadro de sintomas meningorradiculares característicos evidenciados por cefaleia holocraniana violenta, febre alta de instalação aguda, vômitos em jato sem náusea prévia e sinais de rigidez de nuca marcantes (Sinal de Kernig positivo e Sinal de Brudzinski positivo).",
      "Comprovação inflamatória de barreira por análise quantitativa citológica e bioquímica liquórica alterada através de punção lombar lombo-sacra diagnóstica."
    ];
  }
  if (nameLower.includes('cetoacidose') || nameLower.includes('cad') || idLower.startsWith('e10')) {
    return [
      "Consenso de Crises Hiperglicêmicas da American Diabetes Association (ADA).",
      "Presença estabelecida de Tríade Bioquímica Laboratorial definitiva: 1. Hiperglicemia plasmática (> 250 mg/dL ou histórico de DM tipo 1 ativo), 1. Acidose metabólica com anion gap alargado (pH arterial ≤ 7.30 e/ou bicarbonato sérico < 18 mEq/L), 3. Cetonemia patente (beta-hidroxibutirato sérico elevado > 3.0 mmol/L) ou cetonúria intensa classificada em urina isolada laboratorial."
    ];
  }
  if (nameLower.includes('colecistite') || idLower.startsWith('k81')) {
    return [
      "Diretrizes e Critérios Clínicos de Tóquio vigentes (Tokyo Guidelines - TG18).",
      "O diagnóstico exige a presença concomitante de critérios em três categorias principais: A. Sinais Locais de Inflamação: Sinal de Murphy positivo na compressão do hipocôndrio direito, ou massa/sensibilidade/dor local delimitada no HD. B. Sinais Sistêmicos Clínicos: presença de febre, calafrios proeminentes ou evidência laboratorial inflamatória proeminente (leucocitose importante ou PCR sérica elevada). C. Confirmação por exames de Imagem de apoio mostrando achados específicos de colecistite aguda ativa na vesícula biliar."
    ];
  }
  if (nameLower.includes('dengue') || idLower.startsWith('a90')) {
    return [
      "Critérios de Manejo Clínico do Ministério da Saúde do Brasil.",
      "Critério Clínico-Epidemiológico: indivíduo residente em área endêmica ou que transitou nos últimos 14 dias em focos epidêmicos ativos de Dengue que manifesta febre de início súbito (2 a 7 dias) associada a dois ou mais sintomas típicos (cefalite crônica, dor retro-orbitária, mialgias marcantes, artralgias severas, rash exantemático de pele, vômitos/náuseas episódicas).",
      "Auxílio de provas laboratoriais biológicas confirmatórias positivas (sorologia IgM/IgG ou detecção de NS1 por técnica Elisa/rápida)."
    ];
  }
  if (nameLower.includes('sepse') || idLower.startsWith('a41')) {
    return [
      "Consenso das Definições Internacionais para Sepse e Choque Séptico (Sepsis-3).",
      "Disfunção orgânica multissistêmica aguda com risco de vida, caracterizada pelo incremento agudo de pelo menos ≥ 2 pontos no escore Sequential Organ Failure Assessment (SOFA) motivada por um processo infeccioso suspeitado ou comprovado microbiologicamente.",
      "Fora da UTI, uma pontuação no escore simplificado Quick SOFA (qSOFA) ≥ 2 pontos indica alta suspeita clínica (critérios avaliados: frequência respiratória ≥ 22 irpm, Glasgow alterado < 15 e pressão arterial sistólica ≤ 100 mmHg)."
    ];
  }
  if (nameLower.includes('pancreatite') || idLower.startsWith('k85')) {
    return [
      "Critérios das Diretrizes de Atlanta Revisados.",
      "Para fechamento diagnóstico definitivo, o paciente deve obrigatoriamente preencher pelo menos dois dos três pilares clássicos: 1. Quadro de dor abdominal aguda severa com manifestação característica em barra epigástrica, com frequente irradiação tóraco-lombar crônica. 2. Elevação marcante na bioquímica sérica urinária das dosagens de amilase ou lipase em pelo menos ≥ 3 vezes o limite superior padrão normal. 3. Achados de imagem tomográfica computadorizada de abdome, ressonância ou ecografia altamente compatíveis com inflamação pancreática aguda severa."
    ];
  }
  if (nameLower.includes('emergência hipertensiva')) {
    return [
      "Diretrizes e Consensos de Cardiologia da Sociedade Brasileira de Cardiologia (SBC).",
      "Níveis de pressão arterial sistêmica nitidamente e criticamente elevados (valores basais medidos na triagem de PAS ≥ 180 mmHg e/ou PAD ≥ 120 mmHg de forma sustentada).",
      "Demonstração concomitante e irrefutável de deterioração rápida de órgãos-alvo (lesão encefálica severa, isquemia miocárdica em andamento, dissecção aórtica ativa, edema agudo de pulmão em vias aéreas ou insuficiência renal de instalação hiperaguda).",
      "Cenário que difere clinicamente de Urgências e Pseudocrises pelo iminente e severo risco de morte sem administração ou ajuste de vasodilatadores por via intravenosa contínua sob monitoração multiparamétrica em terapia de terapia intensiva."
    ];
  }
  if (nameLower.includes('gastroenterite') || nameLower.includes('geca') || idLower.startsWith('a09')) {
    return [
      "Consenso e Diretrizes de Manejo das Gastroenterites da Organização Mundial de Gastroenterologia (WGO).",
      "Alteração súbita no número e frequência evacuatória basal diária caracterizada por pelo menos ≥ 3 evacuações de fezes pastosas, amolecidas ou inteiramente líquidas em um intervalo máximo de 24 horas consecutivas, com ou sem a presença concomitante de episódios de vômitos, cólicas intestinais agudas de alívio pós-evacuatório ou febre reativa sistêmica moderada.",
      "Investigação laboratorial com análise fecal de leucócitos ou coprocultura indicada apenas em casos com suspeita de invasão mucosa enteral grave (presença abundante de sangue/pus nas fezes ou sepse)."
    ];
  }
  if (nameLower.includes('pielonefrite') || idLower.startsWith('n39') || idLower.startsWith('n10')) {
    return [
      "Diretrizes e Protocolos Clínicos de Infecções Urinárias e Nefrologia (SBU).",
      "Quadro clínico característico sugerindo infecção parenquimatosa do trato urinário alto: presença consolidada de dor lombar do lado afetado acompanhada de febre severa ≥ 38.5°C, calafrios trementes intensos, anorexia associada, náuseas frequentes com Giordano positivo na percussão lombar física.",
      "Auxiliado por evidência laboratorial urinária patológica (piúria maciça demonstrada no EAS/Urina I com nitrito positivo) e urocultura confirmatória demonstrando contagens bacterianas quantitativas ≥ 10^5 unidades formadoras de colônio por mililitro (UFC/ml)."
    ];
  }
  if (nameLower.includes('hipotireoidismo') || idLower.startsWith('e03')) {
    return [
      "Consenso e Diretrizes de Hipotireoidismo da Sociedade Brasileira de Endocrinologia e Metabologia (SBEM).",
      "Demonstração laboratorial sérica inequívoca de níveis aumentados do Hormônio Estimulante da Tireoide (TSH) acima do limite superior de referência estatística, associados diretamente a níveis sanguíneos de Tiroxina Livre (T4 Livre) diminuídos.",
      "Quadro clínico de desaceleração sistêmica com sintomas característicos (fadiga, mialgia, ganho ponderal, edema, pele descamativa, bradicardia) serve de apoio, mas as manifestações laboratoriais bioquímicas selam e delimitam estritamente o diagnóstico."
    ];
  }
  if (nameLower.includes('artrite reumatoide') || idLower.startsWith('m05') || idLower.startsWith('m06')) {
    return [
      "Critérios de Classificação da American College of Rheumatology e European League Against Rheumatism (ACR/EULAR 2010).",
      "Necessidade de pontuação ≥ 6 de 10 acumulados nos domínios: A. Envolvimento Articular: dependendo do número e tamanho de articulações inflamadas (0-5 pontos); B. Sorologia Imunológica: dosagens de Fator Reumatoide o Anti-CCP negativos ou positivos (0-3 pontos); C. Reagentes de Fase Aguda: níveis anormais de VHS ou atividade inflamatória PCR (0-1 ponto); D. Duração Clínica dos Sintomas: sinovite ativa persistente ≥ 6 semanas clínicas (0-1 ponto).",
      "Exclusão prévia de diagnósticos alternativos simuladores como Lúpus, Artrite Psoriática, Gota ou Osteoartrite grave."
    ];
  }

  // Generics fallbacks by CID/system categories
  if (idLower.startsWith('i')) {
    return [
      "Critérios e consensos da Sociedade Brasileira de Cardiologia.",
      "Associação entre sintomas clínicos cardiovasculares bem delineados, fatores de risco robustos e anomalias registradas em exames como ECG, Holter, MAPA ou Ecocardiograma.",
      "Ausência de diagnóstico alternativo que explique de forma mais fidedigna as queixas e sinais observados no paciente."
    ];
  }
  if (idLower.startsWith('j')) {
    return [
      "Consensos da Sociedade Brasileira de Pneumologia e Tisiologia.",
      "Quadro de comprometimento funcional ou mecânico respiratório documentado por espirometria de apoio, associado a infiltrados na radiologia simples de tórax ou sinais específicos.",
      "Histórico clínico consistente com a fisiopatologia da doença respiratória sob hipótese."
    ];
  }
  if (idLower.startsWith('g')) {
    return [
      "Critérios baseados na Academia Brasileira de Neurologia.",
      "Exame físico neurológico minucioso indicando déficit motor, sensitivo ou cognitivo anatômico correlacionado.",
      "Exclusão de etiologias extraneurológicas gerais imitando o quadro e confirmação de danos estruturais através de imagem (TC/RM) ou eletroneuromiografia."
    ];
  }
  if (idLower.startsWith('l') || idLower.startsWith('c')) {
    return [
      "Critérios diagnósticos dermatológicos consubstanciados pela Sociedade Brasileira de Dermatologia.",
      "Identificação visual detalhada das lesões morfológicas elementares da pele e anexos, correlacionadas com a história de evolução biológica e faixa de idade.",
      "Comprovação histológica (Biópsia de pele e exame anatomopatológico) reservada para casos de lesões suspeitas de malignidade ou apresentações atípicas refratárias."
    ];
  }

  // Ultimate fallback
  return [
    "Critérios gerais recomendados pela Associação Médica Brasileira (AMB) e consensos das especialidades correspondentes.",
    "Presença de sinais e sintomas clínicos típicos consistentes com a nosologia descrita.",
    "Comprovação de atividade laboratorial, biológica ou de imagem correspondente que valide a alteração patológica e afaste diagnósticos alternativos compatíveis."
  ];
};

export const enrichDisease = (disease: any): MedicalDisease => {
  return {
    ...disease,
    achados_exames: (disease.achados_exames && disease.achados_exames.length > 0)
      ? disease.achados_exames 
      : getAchadosExamesComplementaresDefault(disease.id, disease.nome, disease.sintomas || []),
    criterios_diagnosticos: (disease.criterios_diagnosticos && disease.criterios_diagnosticos.length > 0)
      ? disease.criterios_diagnosticos
      : getCriteriosDiagnosticosDefault(disease.id, disease.nome, disease.sintomas || [])
  };
};

export const SEED_DISEASES: MedicalDisease[] = (() => {
  const allRaw = [
    ...CARDIOLOGY_DISEASES.map(d => ({ ...d, categoria: 'Cardiologia' })),
    ...CLINICAL_MEDICINE_DISEASES.map(d => ({ ...d, categoria: 'Clínica Médica' })),
    ...PULMONOLOGY_DISEASES.map(d => ({ ...d, categoria: 'Pneumologia' })),
    ...DERMATOLOGY_DISEASES.map(d => ({ ...d, categoria: 'Dermatologia' })),
    ...NEUROLOGY_DISEASES.map(d => ({ ...d, categoria: 'Neurologia' })),
    ...INFECTIOUS_DISEASES.map(d => ({ ...d, categoria: 'Infectologia' })),
    ...INFECTIOUS_DISEASES_BATCH2.map(d => ({ ...d, categoria: 'Infectologia' })),
    ...PEDIATRIC_DISEASES.map(d => ({ ...d, categoria: 'Pediatria' })),
    ...PEDIATRIC_DISEASES_BATCH2.map(d => ({ ...d, categoria: 'Pediatria' })),
    ...GYNECO_OBSTETRICS_DISEASES.map(d => ({ ...d, categoria: 'Ginecologia e Obstetrícia' })),
    ...GYNECO_OBSTETRICS_DISEASES_BATCH2.map(d => ({ ...d, categoria: 'Ginecologia e Obstetrícia' })),
    ...PSYCHIATRY_DISEASES.map(d => ({ ...d, categoria: 'Psiquiatria' })),
    ...MAIN_MANUAL_DISEASES.map(d => ({ ...d, categoria: 'Clínica Médica' }))
  ];
  const map = new Map<string, MedicalDisease>();
  allRaw.forEach(item => {
    const key = item.id.toUpperCase().trim();
    if (!map.has(key)) {
      const enriched = enrichDisease(item);
      map.set(key, enriched);
    }
  });
  return Array.from(map.values());
})();

// Self-healing & dynamic clinical verification/migration routine
export const verifyAndSelfHealDatabase = async (): Promise<{ totalChecked: number; healedCount: number }> => {
  try {
    const db = await openKnowledgeDB();
    const all = await getAllDiseases();
    let healedCount = 0;
    const toSave: MedicalDisease[] = [];

    all.forEach((disease) => {
      let changed = false;
      let enriched = { ...disease };

      if (!disease.achados_exames || !Array.isArray(disease.achados_exames) || disease.achados_exames.length === 0) {
        enriched.achados_exames = getAchadosExamesComplementaresDefault(disease.id, disease.nome, disease.sintomas || []);
        changed = true;
      }
      if (!disease.criterios_diagnosticos || !Array.isArray(disease.criterios_diagnosticos) || disease.criterios_diagnosticos.length === 0) {
        enriched.criterios_diagnosticos = getCriteriosDiagnosticosDefault(disease.id, disease.nome, disease.sintomas || []);
        changed = true;
      }

      if (changed) {
        toSave.push(enriched);
        healedCount++;
      }
    });

    if (toSave.length > 0) {
      console.log(`Self-healing routine found ${healedCount} mismatched diseases in IndexedDB. Upgrading data structures...`);
      await saveDiseasesBatchIncremental(db, toSave);
    }

    return {
      totalChecked: all.length,
      healedCount
    };
  } catch (err) {
    console.warn("Falha ao executar rotina de autoverificação e cura IndexedDB, procedendo em memória:", err);
    // memory self-healing fallback
    let healedCount = 0;
    inMemoryDiseases = inMemoryDiseases.map((disease) => {
      let changed = false;
      let enriched = { ...disease };

      if (!disease.achados_exames || !Array.isArray(disease.achados_exames) || disease.achados_exames.length === 0) {
        enriched.achados_exames = getAchadosExamesComplementaresDefault(disease.id, disease.nome, disease.sintomas || []);
        changed = true;
      }
      if (!disease.criterios_diagnosticos || !Array.isArray(disease.criterios_diagnosticos) || disease.criterios_diagnosticos.length === 0) {
        enriched.criterios_diagnosticos = getCriteriosDiagnosticosDefault(disease.id, disease.nome, disease.sintomas || []);
        changed = true;
      }

      if (changed) {
        healedCount++;
      }
      return enriched;
    });
    if (healedCount > 0) {
      saveFallbackIfNeeded();
    }
    return {
      totalChecked: inMemoryDiseases.length,
      healedCount
    };
  }
};

// Initialize DB and write Seed Data if empty or missing elements (Self-healing pattern)
export const initializeKnowledgeBase = async (): Promise<boolean> => {
  try {
    const db = await openKnowledgeDB();
    if (useInMemoryFallback || !db) {
      initFallbackIfNeeded();
      
      let changed = false;
      if (inMemoryDiseases.length < SEED_DISEASES.length) {
        console.log(`Knowledge Base fallback is outdated (${inMemoryDiseases.length} < ${SEED_DISEASES.length}). Seeding/updating fallback memory...`);
        const merged = [...inMemoryDiseases];
        SEED_DISEASES.forEach((seedItem) => {
          if (!merged.some(x => x.id === seedItem.id)) {
            merged.push(seedItem);
          }
        });
        inMemoryDiseases = merged;
        changed = true;
      }

      // Automatically enforce field presence in the in-memory array on init
      const healRes = await verifyAndSelfHealDatabase();
      if (healRes.healedCount > 0 || changed) {
        saveFallbackIfNeeded();
        return true;
      }
      return false;
    }

    const count = await getDiseasesCount(db);
    let performedSeed = false;
    
    // Self-healing database pattern: if user has outdated catalog database, we seed new profiles
    if (count < SEED_DISEASES.length) {
      console.log(`Knowledge Base in IndexedDB is outdated (current count: ${count}, expected: ${SEED_DISEASES.length}). Seeding/updating diseases...`);
      await saveDiseasesBatchIncremental(db, SEED_DISEASES);
      performedSeed = true;
    }
    
    // Always trigger the post-init validation is self-contained
    const healRes = await verifyAndSelfHealDatabase();
    return performedSeed || healRes.healedCount > 0;
  } catch (err) {
    console.error('Falha ao inicializar banco de conhecimento, forcing fallback:', err);
    useInMemoryFallback = true;
    initFallbackIfNeeded();
    
    let changed = false;
    if (inMemoryDiseases.length < SEED_DISEASES.length) {
      const merged = [...inMemoryDiseases];
      SEED_DISEASES.forEach((seedItem) => {
        if (!merged.some(x => x.id === seedItem.id)) {
          merged.push(seedItem);
        }
      });
      inMemoryDiseases = merged;
      changed = true;
    }
    
    const healRes = await verifyAndSelfHealDatabase();
    if (healRes.healedCount > 0 || changed) {
      saveFallbackIfNeeded();
      return true;
    }
    return false;
  }
};

// Count diseases inside store
const getDiseasesCount = (db: IDBDatabase | null): Promise<number> => {
  if (useInMemoryFallback || !db) {
    initFallbackIfNeeded();
    return Promise.resolve(inMemoryDiseases.length);
  }
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.count();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(new Error('Erro ao contar elementos da base de dados local.'));
    };
  });
};

// Save a batch of diseases incrementally using a chunked scheduler to prevent blocking of main UI thread.
export const saveDiseasesBatchIncremental = (
  db: IDBDatabase | null,
  diseases: MedicalDisease[],
  onProgress?: (progress: number) => void
): Promise<void> => {
  clearSearchCache();
  if (useInMemoryFallback || !db) {
    initFallbackIfNeeded();
    const preparedList = diseases.map(item => ({
      id: item.id.toUpperCase().trim(),
      nome: item.nome.trim(),
      sintomas: (item.sintomas || []).map(s => s.trim()),
      fatores_risco: (item.fatores_risco || []).map(f => f.trim()),
      red_flags: (item.red_flags || []).map(rf => rf.trim()),
      diferenciais: (item.diferenciais || []).map(df => df.trim()),
      achados_exames: (item.achados_exames || []).map(ae => ae.trim()),
      criterios_diagnosticos: (item.criterios_diagnosticos || []).map(cd => cd.trim()),
      categoria: item.categoria,
      inTrash: item.inTrash || false,
      updatedAt: item.updatedAt || new Date().toISOString(),
      definition: item.definition || '',
      epidemiology: item.epidemiology || '',
      etiology: item.etiology || '',
      pathophysiology: item.pathophysiology || '',
      treatment: item.treatment || '',
      complications: item.complications || '',
      prognosis: item.prognosis || '',
      references: item.references || []
    }));

    preparedList.forEach(item => {
      const idx = inMemoryDiseases.findIndex(x => x.id === item.id);
      if (idx >= 0) {
        inMemoryDiseases[idx] = item;
      } else {
        inMemoryDiseases.push(item);
      }
    });

    saveFallbackIfNeeded();
    if (onProgress) onProgress(100);
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const total = diseases.length;
    let index = 0;
    const CHUNK_SIZE = 100;

    const writeChunk = () => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const limit = Math.min(index + CHUNK_SIZE, total);
      
      for (; index < limit; index++) {
        const item = diseases[index];
        const preparedItem: MedicalDisease = {
          id: item.id.toUpperCase().trim(),
          nome: item.nome.trim(),
          sintomas: (item.sintomas || []).map(s => s.trim()),
          fatores_risco: (item.fatores_risco || []).map(f => f.trim()),
          red_flags: (item.red_flags || []).map(rf => rf.trim()),
          diferenciais: (item.diferenciais || []).map(df => df.trim()),
          achados_exames: (item.achados_exames || []).map(ae => ae.trim()),
          criterios_diagnosticos: (item.criterios_diagnosticos || []).map(cd => cd.trim()),
          categoria: item.categoria,
          inTrash: item.inTrash || false,
          updatedAt: item.updatedAt || new Date().toISOString(),
          definition: item.definition || '',
          epidemiology: item.epidemiology || '',
          etiology: item.etiology || '',
          pathophysiology: item.pathophysiology || '',
          treatment: item.treatment || '',
          complications: item.complications || '',
          prognosis: item.prognosis || '',
          references: item.references || []
        };
        store.put(preparedItem);
      }

      transaction.oncomplete = () => {
        const progress = Math.round((index / total) * 100);
        if (onProgress) onProgress(progress);

        if (index < total) {
          setTimeout(writeChunk, 0);
        } else {
          resolve();
        }
      };

      transaction.onerror = (e) => {
        console.error('Error writing transaction chunk:', e);
        reject(new Error('Falha ao gravar lote de doenças no IndexedDB.'));
      };
    };

    writeChunk();
  });
};

// Fetch all diseases registered in IndexedDB
export const getAllDiseases = async (includeTrash: boolean = false): Promise<MedicalDisease[]> => {
  const db = await openKnowledgeDB();
  let list: MedicalDisease[] = [];
  if (useInMemoryFallback || !db) {
    initFallbackIfNeeded();
    list = [...inMemoryDiseases];
  } else {
    list = await new Promise<MedicalDisease[]>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        reject(new Error('Falha ao obter todas as doenças locais.'));
      };
    });
  }

  // Merge with Firestore diseases which hold global overrides/additions
  const mergedMap = new Map<string, MedicalDisease>();
  
  // 1. Local or predefined
  list.forEach(item => {
    mergedMap.set(item.id.toUpperCase().trim(), item);
  });

  // 2. Firestore global admin overrides/additions take precedence
  firestoreDiseases.forEach(item => {
    mergedMap.set(item.id.toUpperCase().trim(), item);
  });

  const mergedList = Array.from(mergedMap.values()).map(item => migrateItemReviewFields(item, 'disease'));

  if (!includeTrash) {
    return mergedList.filter(item => !item.inTrash);
  }
  return mergedList;
};

// --- SMART SEARCH ENGINE SUPPORT ---

// Dictionary of known synonyms, abbreviations, and clinical terminology
export const SYNONYMS_DICTIONARY: Record<string, string[]> = {
  'I63': ['avc', 'avci', 'derrame crebral', 'derrame cerebral', 'isquemia cerebral', 'infarto cerebral', 'acidente vascular cerebral isquêmico', 'stroke', 'icto'],
  'K35': ['apendicite', 'dor na fossa iliaca direita', 'inflamação do apêndice cecal'],
  'J18': ['pneumonia', 'pac', 'infecção pulmonar', 'pneumonia comunitária', 'pneumonia adquirida na comunidade'],
  'I26': ['tep', 'tromboembolismo pulmonar', 'embolia pulmonar', 'infarto pulmonar'],
  'J45': ['asma', 'bronquite asmática', 'chiado no peito', 'hiperresponsividade das vias aéreas', 'asma crônica', 'crise de asma'],
  'G00': ['meningite', 'meningite bacteriana', 'síndrome meníngea', 'infecção das meninges'],
  'E10': ['cad', 'cetoacidose diabética', 'cetoacidose', 'diabetes mellitus tipo 1 descompensada'],
  'K81': ['colecistite', 'inflamação da vesícula', 'cálculo na vesícula biliar inflamação'],
  'A90': ['dengue', 'dengue clássica', 'dengue hemorrágica', 'febre quebra ossos', 'arbovirose'],
  'A41': ['sepse', 'septicemia', 'infecção generalizada', 'choque séptico', 'síndrome de resposta inflamatória sistêmica', 'sirs'],
  'K85': ['pancreatite', 'pancreatite aguda', 'inflamação do pâncreas'],
  'I10.0': ['has', 'pressão alta', 'hipertensão arterial sistêmica', 'hipertensão', 'crise hipertensiva', 'emergência hipertensiva', 'urgência hipertensiva'],
  'A09': ['geca', 'gastroenterite aguda', 'virose intestinal', 'diarreia e vômitos', 'infecção intestinal'],
  'N39': ['pielonefrite', 'itu alta', 'infecção urinária alta', 'infecção nos rins', 'infecção renal'],
  'E03': ['hipotireoidismo', 'tireoidite de hashimoto', 'tireoide lenta'],
  'M05': ['artrite reumatoide', 'reumatismo', 'poliartrite crônica']
};

export const ACRONYM_MAP: Record<string, string> = {
  'iam': 'infarto agudo do miocardio',
  'sca': 'sindrome coronariana aguda',
  'dpoc': 'doenca pulmonar obstrutiva cronica',
  'has': 'hipertensao arterial sistemica',
  'dm': 'diabetes mellitus',
  'avc': 'acidente vascular cerebral',
  'avci': 'acidente vascular cerebral isquemico',
  'tep': 'tromboembolismo pulmonar',
  'cad': 'cetoacidose diabetica',
  'pac': 'pneumonia adquirida na comunidade',
  'geca': 'gastroenterite aguda',
  'itu': 'infeccao do trato urinario'
};

export const SYNDROME_MAP: Record<string, string[]> = {
  'sindrome febril': ['febre', 'calafrios', 'hipertermia', 'temperatura elevada'],
  'sindrome icterica': ['ictericia', 'coluria', 'acolia', 'bilirrubina', 'olhos amarelos', 'pele amarela'],
  'sindrome nefritica': ['hematuria', 'hipertensao', 'oliguria', 'glomerulo', 'nefrite', 'urina com sangue'],
  'sindrome nefrotica': ['proteinuria', 'edema', 'hipoalbuminemia', 'anasarca', 'perda de proteina na urina'],
  'sindrome coronariana aguda': ['dor toracica', 'opressao toracica', 'isquemia', 'angina', 'infarto', 'troponina elevada', 'dor no peito'],
  'sindrome meningea': ['rigidez de nuca', 'meningite', 'brudzinski', 'kernig', 'cefaleia holocraniana', 'fotofobia'],
  'sindrome consumptive': ['perda de peso', 'emagrecimento', 'anorexia', 'caquexia', 'sudorese noturna', 'tuberculose', 'perda de peso rapido']
};

export const SEMANTIC_CONCEPTS: { queries: string[]; matchedTerms: string[]; mappedCids?: string[] }[] = [
  {
    queries: ['dor no peito', 'dor toracica', 'dor retroesternal', 'dor no coracao', 'aperto no peito', 'peito apertado'],
    matchedTerms: ['dor torácica', 'opressão torácica', 'isquemia', 'coronariopatia', 'infarto', 'angina', 'pericardite', 'dissecção de aorta', 'tromboembolismo pulmonar', 'troponina elevada'],
    mappedCids: ['I21', 'I20', 'I22', 'I30', 'I26', 'I10.0', 'I50']
  },
  {
    queries: ['falta de ar', 'cansaco ao andar', 'folego curto', 'dificuldade para respirar', 'batedeira', 'dispneia', 'sofocamento', 'asfixia', 'sopro'],
    matchedTerms: ['dispneia', 'cansaço aos esforços', 'insuficiência respiratória', 'sibilância', 'asma', 'congestão pulmonar', 'edema agudo de pulmão', 'sobrecarga de ventrículo direito', 'taquipneia'],
    mappedCids: ['J45', 'J44', 'J18', 'I26', 'I50']
  },
  {
    queries: ['infeccao pulmonar', 'infeccao de pulmao', 'pulmao inflamado', 'inflamacao no pulmao', 'doenca do peito', 'catarro no pulmao', 'cataro no pulmao'],
    matchedTerms: ['pneumonia', 'pac', 'tuberculose pulmonar', 'aspergilose', 'consolidação lobar', 'infiltrado intersticial', 'broncograma aéreo', 'escarro purulento'],
    mappedCids: ['J18', 'J15', 'A15', 'J47']
  },
  {
    queries: ['dor de cabeca', 'enxaqueca', 'dor na cabeca', 'cabeca latejando', 'cabeca pesada', 'dor na nuca'],
    matchedTerms: ['cefaleia', 'migrânea', 'fotofobia', 'fonofobia', 'latejante', 'rigidez de nuca', 'vômitos em jato'],
    mappedCids: ['G43', 'G44', 'G00', 'I10.0']
  },
  {
    queries: ['marelo', 'amarelado', 'amarelao', 'olhos amarelos', 'pele amarela', 'pele amarelada', 'icterico', 'corpor amarelado'],
    matchedTerms: ['icterícia', 'bilirrubinas', 'bilioso', 'colúria', 'acolia', 'hepática', 'coledocolitíase', 'colangite', 'murphy positivo'],
    mappedCids: ['K81', 'K83', 'B16', 'B17', 'B18', 'A90']
  },
  {
    queries: ['mancha na pele', 'pele vermelha', 'coceira na pele', 'pelotas na pele', 'vermelhidao', 'alergia na pele', 'pele descascando', 'ferida na pele', 'coceira do corpo'],
    matchedTerms: ['exantema', 'prurido', 'lesão cutânea', 'placas eritemato-descamativas', 'dermatite', 'psoríase', 'eczema', 'dermatose'],
    mappedCids: ['L40', 'L20', 'A90', 'L30', 'L23']
  },
  {
    queries: ['urina escura', 'dor ao urinar', 'urina com sangue', 'mijo escuro', 'mijando sangue', 'sangue no mijo', 'urina turva'],
    matchedTerms: ['disúria', 'hematúria', 'infecção urinária', 'pielonefrite', 'urina turva', 'cistite', 'glomerulonefrite', 'proteinúria', 'oligúria', 'giordano positivo'],
    mappedCids: ['N39', 'N30', 'N10', 'N02']
  },
  {
    queries: ['desmaio', 'perda de consciencia', 'desfalecimento', 'apagao', 'tontura forte', 'sincope', 'tonturas'],
    matchedTerms: ['síncope', 'lipotimia', 'hipotensão postural', 'alteração de consciência', 'obnubilação', 'composição neurológica'],
    mappedCids: ['R55', 'I26', 'I95', 'G40']
  },
  {
    queries: ['dor de barriga', 'dor no estomago', 'dor no abdomen', 'dor abdominal', 'barriga inchada', 'dor na barriga', 'colica', 'dor nas tripas'],
    matchedTerms: ['dor abdominal', 'cólica abdominal', 'epigástrio', 'dor em hipocôndrio', 'dor na fossa ilíaca', 'sinal de murphy', 'sinal de blumberg', 'distensão abdominal'],
    mappedCids: ['K35', 'K81', 'K85', 'A09', 'K25']
  }
];

// Normalize text for search: removes accents, makes lowercase, collapses spaces, strips basic punctuation
export const normalizeText = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[\\\/\.\,\-\+\(\)\?\!\:\;\*]/g, ' ') // replace punctuation/plus sign with space
    .replace(/\s+/g, ' ') // collapse spacing
    .trim();
};

// Standard Levenshtein algorithm for fuzzy distance
export const getLevenshteinDistance = (a: string, b: string): number => {
  const tmp: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1, // deletion
        tmp[i][j - 1] + 1, // insertion
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1) // substitution
      );
    }
  }
  return tmp[a.length][b.length];
};

// Get clinical specialty/system from disease properties dynamically
export const getDiseaseSpecialty = (disease: MedicalDisease): string => {
  if (disease.categoria) return disease.categoria;
  const cid = disease.id.toUpperCase();
  const nome = disease.nome.toLowerCase();
  
  if (cid.startsWith('I')) return 'Cardiologia';
  if (cid.startsWith('J')) return 'Pneumologia';
  if (cid.startsWith('N')) return 'Nefrologia';
  if (cid.startsWith('G')) return 'Neurologia';
  if (cid.startsWith('K')) return 'Gastroenterologia';
  if (cid.startsWith('L') || cid.startsWith('C')) return 'Dermatologia';
  if (cid.startsWith('A') || cid.startsWith('B')) return 'Infectologia';
  if (cid.startsWith('E')) return 'Endocrinologia';
  if (cid.startsWith('M')) return 'Reumatologia';
  
  // Logical Name assignments
  if (nome.includes('artrite') || nome.includes('lupus') || nome.includes('reumato')) return 'Reumatologia';
  if (nome.includes('diabetes') || nome.includes('hipotireoidismo') || nome.includes('cetoacidose')) return 'Endocrinologia';
  if (nome.includes('meningite') || nome.includes('neurologia') || nome.includes('cefaleia') || nome.includes('enxaqueca')) return 'Neurologia';
  if (nome.includes('sepse') || nome.includes('dengue') || nome.includes('sífilis') || nome.includes('hiv') || nome.includes('tuberculose')) return 'Infectologia';
  if (nome.includes('gastro') || nome.includes('apendicite') || nome.includes('colecistite') || nome.includes('pancreatite')) return 'Gastroenterologia';
  if (nome.includes('renal') || nome.includes('urinária') || nome.includes('pielonefrite') || nome.includes('nefrit')) return 'Nefrologia';
  if (nome.includes('pneumo') || nome.includes('asma') || nome.includes('bronquite') || nome.includes('pulmonar')) return 'Pneumologia';
  if (nome.includes('hipertensão') || nome.includes('infarto') || nome.includes('coronário') || nome.includes('cardí')) return 'Cardiologia';
  
  return 'Clínica Médica';
};

// Gets known etiological agents associated with a disease
export const getDiseaseEtiology = (disease: MedicalDisease): string[] => {
  const cid = disease.id.toUpperCase();
  const nome = disease.nome.toLowerCase();
  const agents: string[] = [];
  
  if (nome.includes('pneumonia') || cid.startsWith('J18') || cid.startsWith('J15')) {
    agents.push('Streptococcus pneumoniae', 'Pneumococo', 'Haemophilus influenzae', 'Mycoplasma pneumoniae', 'Chlamydia pneumoniae', 'Staphylococcus aureus');
  }
  if (nome.includes('tuberculose') || cid.startsWith('A15')) {
    agents.push('Mycobacterium tuberculosis', 'Bacilo de Koch', 'BK');
  }
  if (nome.includes('meningite') || cid.startsWith('G00')) {
    agents.push('Neisseria meningitidis', 'Meningococo', 'Streptococcus pneumoniae', 'Pneumococo', 'Haemophilus influenzae');
  }
  if (nome.includes('dengue') || cid.startsWith('A90')) {
    agents.push('Aedes aegypti', 'Dengue vírus', 'Flavivírus', 'DENV-1', 'DENV-2', 'DENV-3', 'DENV-4');
  }
  if (nome.includes('sífilis') || cid.startsWith('A53') || cid.startsWith('A51')) {
    agents.push('Treponema pallidum');
  }
  if (nome.includes('aids') || nome.includes('hiv') || cid.startsWith('B20')) {
    agents.push('HIV', 'Vírus da Imunodeficiência Humana');
  }
  if (nome.includes('leishmania') || cid.startsWith('B55')) {
    agents.push('Leishmania spp.', 'Leishmania infantum', 'Leishmania braziliensis');
  }
  if (nome.includes('gastroenterite') || cid.startsWith('A09')) {
    agents.push('Rotavírus', 'Norovírus', 'Escherichia coli', 'Salmonella spp.', 'Shigella spp.', 'Campylobacter');
  }
  if (nome.includes('pielonefrite') || nome.includes('urinário') || cid.startsWith('N39')) {
    agents.push('Escherichia coli', 'E. coli', 'Klebsiella pneumoniae', 'Proteus mirabilis', 'Enterococcus faecalis');
  }
  if (nome.includes('sepse') || cid.startsWith('A41')) {
    agents.push('Staphylococcus aureus', 'Escherichia coli', 'Pseudomonas aeruginosa', 'Streptococcus pyogenes');
  }
  
  return agents;
};

// Automatic suggestions spelling finder
export const findSpellingSuggestion = (query: string, allDiseases: MedicalDisease[]): string | undefined => {
  const normQuery = normalizeText(query);
  if (normQuery.length < 3) return undefined;

  const candidates: string[] = [];
  allDiseases.forEach(d => {
    candidates.push(d.nome);
    d.nome.split(/\s+/).forEach(w => {
      const nw = w.replace(/[\(\)\,\.\-\+]/g, '').trim();
      if (nw.length > 3) candidates.push(nw);
    });
    d.sintomas.forEach(s => {
      candidates.push(s);
      s.split(/\s+/).forEach(w => {
        const nw = w.trim();
        if (nw.length > 3) candidates.push(nw);
      });
    });
  });

  const uniqueCandidates = Array.from(new Set(candidates.map(c => c.trim()))).filter(c => c.length > 3);
  
  let bestCandidate: string | undefined = undefined;
  let minDistance = 3; 
  let maxSimilarity = 0;

  for (const candidate of uniqueCandidates) {
    const normCand = normalizeText(candidate);
    if (Math.abs(normCand.length - normQuery.length) > 2) continue;
    
    const dist = getLevenshteinDistance(normQuery, normCand);
    if (dist < minDistance) {
      const similarity = 1 - dist / Math.max(normQuery.length, normCand.length);
      if (similarity > 0.65) {
        minDistance = dist;
        maxSimilarity = similarity;
        bestCandidate = candidate;
      }
    }
  }

  if (bestCandidate) {
    const matchingDisease = allDiseases.find(d => normalizeText(d.nome).includes(normalizeText(bestCandidate!)));
    if (matchingDisease) {
      return matchingDisease.nome;
    }
    return bestCandidate;
  }
  return undefined;
};

export interface AdvancedSearchOutput {
  results: MedicalDisease[];
  reasonsMap: Record<string, string[]>; // Map of ID -> reasons why it matched
  latencyMs: number;
  suggestion?: string;
  totalIndexed: number;
  fieldsIndexedCount: number;
}

// Caching layer for lightning-fast queries (<1ms)
const searchCache = new Map<string, AdvancedSearchOutput>();

export const clearSearchCache = () => {
  searchCache.clear();
};

// Master clinical database search implementation
export const searchMedicalDiseases = (
  diseasesList: MedicalDisease[],
  textQuery: string,
  selectedSymptoms: string[] = [],
  selectedRiskFactors: string[] = []
): AdvancedSearchOutput => {
  const start = performance.now();
  
  const trimQuery = textQuery.trim();
  const cacheKey = `${trimQuery || ''}_symptom:${selectedSymptoms.join(',')}_risk:${selectedRiskFactors.join(',')}_count:${diseasesList.length}`;
  
  if (searchCache.has(cacheKey)) {
    const cached = searchCache.get(cacheKey)!;
    const end = performance.now();
    cached.latencyMs = Math.round((end - start) * 105) / 100;
    return cached;
  }

  const normalizedQuery = normalizeText(trimQuery);
  
  // 1. Semantic query expansion
  const semanticCids = new Set<string>();
  const semanticTerms = new Set<string>();
  
  if (normalizedQuery) {
    SEMANTIC_CONCEPTS.forEach(concept => {
      const matchFound = concept.queries.some(q => {
        const normQ = normalizeText(q);
        return normalizedQuery.includes(normQ) || normQ.includes(normalizedQuery);
      });
      if (matchFound) {
        concept.mappedCids?.forEach(cid => semanticCids.add(cid.toUpperCase()));
        concept.matchedTerms.forEach(term => semanticTerms.add(normalizeText(term)));
      }
    });

    // 2. Syndrome query expansion
    Object.entries(SYNDROME_MAP).forEach(([syndrome, terms]) => {
      const normSynd = normalizeText(syndrome);
      if (normalizedQuery.includes(normSynd) || normSynd.includes(normalizedQuery)) {
        terms.forEach(term => {
          semanticTerms.add(normalizeText(term));
        });
      }
    });
  }

  // 3. Combined search parsing (splits query by '+')
  let subQueries: string[] = [];
  if (normalizedQuery) {
    if (trimQuery.includes('+')) {
      subQueries = trimQuery.split('+').map(p => normalizeText(p)).filter(Boolean);
    } else {
      subQueries = [normalizedQuery];
    }
  }

  const expandedSubQueries = subQueries.map(q => {
    const acronymExpanded = ACRONYM_MAP[q.toLowerCase()];
    if (acronymExpanded) {
      return { original: q, expanded: normalizeText(acronymExpanded) };
    }
    return { original: q, expanded: q };
  });

  const reasonsMap: Record<string, string[]> = {};

  const scoredResults = diseasesList.map((dis) => {
    let score = 0;
    const matchReasons: string[] = [];
    const idUpper = dis.id.toUpperCase();
    const idLower = dis.id.toLowerCase();
    const normName = normalizeText(dis.nome);
    const specialty = getDiseaseSpecialty(dis);
    const etiologicalAgents = getDiseaseEtiology(dis);
    
    // Especialidade search check
    if (normalizedQuery) {
      const normSpecialty = normalizeText(specialty);
      if (normSpecialty.includes(normalizedQuery) || normalizedQuery.includes(normSpecialty)) {
        score += 250;
        matchReasons.push(`Especialidade: ${specialty}`);
      }
      
      // Agente Etiológico search check
      etiologicalAgents.forEach(agent => {
        const normAgent = normalizeText(agent);
        if (normAgent.includes(normalizedQuery) || normalizedQuery.includes(normAgent)) {
          score += 200;
          matchReasons.push(`Etimologia: ${agent}`);
        }
      });
    }

    let queryMatchesCount = 0;
    
    expandedSubQueries.forEach(({ original: subQ, expanded: expandedQ }) => {
      let matchedInSubQuery = false;
      
      // A. ID/CID match
      if (idLower === subQ || idLower === expandedQ) {
        score += 1000;
        matchReasons.push(`Código CID-10 Exato`);
        matchedInSubQuery = true;
      } else if (idLower.startsWith(subQ) || idLower.startsWith(expandedQ)) {
        score += 400;
        matchReasons.push(`CID-10 Prefixo`);
        matchedInSubQuery = true;
      } else if (idLower.includes(subQ) || idLower.includes(expandedQ)) {
        score += 200;
        matchReasons.push(`CID-10 Parcial`);
        matchedInSubQuery = true;
      }

      // B. Nome match
      if (normName === subQ || normName === expandedQ) {
        score += 800;
        matchReasons.push(`Nome Correspondente`);
        matchedInSubQuery = true;
      } else if (normName.startsWith(subQ) || normName.startsWith(expandedQ)) {
        score += 400;
        matchReasons.push(`Prefixo do Nome`);
        matchedInSubQuery = true;
      } else if (normName.includes(subQ) || normName.includes(expandedQ)) {
        score += 300;
        matchReasons.push(`Nome Parcial`);
        matchedInSubQuery = true;
      } else {
        const nameTokens = normName.split(' ');
        const subTokens = subQ.split(' ');
        let wordMatches = 0;
        subTokens.forEach(st => {
          if (st.length > 2 && nameTokens.some(nt => nt.includes(st))) {
            wordMatches++;
          }
        });
        if (wordMatches > 0) {
          score += wordMatches * 80;
          matchReasons.push(`Termo no Nome`);
          matchedInSubQuery = true;
        }
      }

      // C. Synonyms
      const synonyms = SYNONYMS_DICTIONARY[dis.id] || [];
      synonyms.forEach(syn => {
        const normSyn = normalizeText(syn);
        if (normSyn === subQ || normSyn === expandedQ) {
          score += 400;
          matchReasons.push(`Sinonímia Exata: "${syn}"`);
          matchedInSubQuery = true;
        } else if (normSyn.includes(subQ) || normSyn.includes(expandedQ)) {
          score += 250;
          matchReasons.push(`Termo Correlato: "${syn}"`);
          matchedInSubQuery = true;
        }
      });

      // D. Sintomas
      let symptomMatchesCount = 0;
      dis.sintomas.forEach(sint => {
        const normSint = normalizeText(sint);
        if (normSint.includes(subQ) || normSint.includes(expandedQ)) {
          score += 150;
          symptomMatchesCount++;
          matchedInSubQuery = true;
        } else {
          const sintTokens = normSint.split(' ');
          const subTokens = subQ.split(' ');
          let matches = 0;
          subTokens.forEach(st => {
            if (st.length > 2 && sintTokens.some(stok => stok.includes(st))) {
              matches++;
            }
          });
          if (matches > 0) {
            score += matches * 50;
            symptomMatchesCount += 0.5;
            matchedInSubQuery = true;
          }
        }
      });
      if (symptomMatchesCount > 0) {
        matchReasons.push(`Sintoma Correspondente`);
      }

      // E. Fatores de Risco
      let riskMatchesCount = 0;
      dis.fatores_risco.forEach(risco => {
        const normRisco = normalizeText(risco);
        if (normRisco.includes(subQ) || normRisco.includes(expandedQ)) {
          score += 80;
          riskMatchesCount++;
          matchedInSubQuery = true;
        }
      });
      if (riskMatchesCount > 0) {
        matchReasons.push(`Fator de Risco Coincidente`);
      }

      // F. Sinais de Alerta (Red Flags)
      let redFlagsCount = 0;
      dis.red_flags.forEach(rf => {
        const normRf = normalizeText(rf);
        if (normRf.includes(subQ) || normRf.includes(expandedQ)) {
          score += 50;
          redFlagsCount++;
          matchedInSubQuery = true;
        }
      });
      if (redFlagsCount > 0) {
        matchReasons.push(`Sinal Alerta (Red Flag)`);
      }

      // G. Principais Achados nos Exames Complementares (achados_exames)
      let examesCount = 0;
      if (dis.achados_exames && Array.isArray(dis.achados_exames)) {
        dis.achados_exames.forEach(exm => {
          const normExm = normalizeText(exm);
          if (normExm.includes(subQ) || normExm.includes(expandedQ)) {
            score += 120;
            examesCount++;
            matchedInSubQuery = true;
          }
        });
      }
      if (examesCount > 0) {
        matchReasons.push(`Achado Exames Complementares`);
      }

      // H. Critérios Diagnósticos (criterios_diagnosticos)
      let critCount = 0;
      if (dis.criterios_diagnosticos && Array.isArray(dis.criterios_diagnosticos)) {
        dis.criterios_diagnosticos.forEach(crit => {
          const normCrit = normalizeText(crit);
          if (normCrit.includes(subQ) || normCrit.includes(expandedQ)) {
            score += 120;
            critCount++;
            matchedInSubQuery = true;
          }
        });
      }
      if (critCount > 0) {
        matchReasons.push(`Critério Diagnóstico`);
      }

      // I. Diagnósticos diferenciais
      let diffCount = 0;
      dis.diferenciais.forEach(diff => {
        const normDiff = normalizeText(diff);
        if (normDiff.includes(subQ) || normDiff.includes(expandedQ)) {
          score += 30;
          diffCount++;
          matchedInSubQuery = true;
        }
      });
      if (diffCount > 0) {
        matchReasons.push(`Foco Diferencial`);
      }

      if (matchedInSubQuery) {
        queryMatchesCount++;
      }
    });

    // Semantic concept weights
    let semanticMatches = 0;
    if (semanticCids.has(idUpper)) {
      score += 250;
      semanticMatches++;
    }
    semanticTerms.forEach(term => {
      const matchInName = normName.includes(term);
      const matchInSintomas = dis.sintomas.some(s => normalizeText(s).includes(term));
      const matchInExames = dis.achados_exames?.some(ex => normalizeText(ex).includes(term));
      
      if (matchInName || matchInSintomas || matchInExames) {
        score += 200;
        semanticMatches++;
      }
    });
    if (semanticMatches > 0) {
      matchReasons.push(`Correlação Semântica`);
    }

    // Intersectional multi-word combination bonus
    if (subQueries.length > 1 && queryMatchesCount > 0) {
      const matchRatio = queryMatchesCount / subQueries.length;
      score += Math.round(matchRatio * 500);
      if (queryMatchesCount === subQueries.length) {
        score += 300; 
        matchReasons.push(`Efeito Combinado de Filtros`);
      } else {
        matchReasons.push(`Coincidência Parcial de Filtros`);
      }
    }

    // Tie-breaker priority
    const highPriorityConditions = ['I21', 'I63', 'J18', 'A90', 'I10.0', 'E10'];
    if (highPriorityConditions.some(c => idUpper.startsWith(c))) {
      score += 30; 
    }

    // Tags filters constraints
    if (selectedSymptoms.length > 0) {
      const disSintomasLower = dis.sintomas.map(s => s.toLowerCase());
      let matchedFilterSymptoms = 0;
      selectedSymptoms.forEach(selS => {
        const normSelS = selS.toLowerCase();
        if (disSintomasLower.some(s => s.includes(normSelS) || normSelS.includes(s))) {
          matchedFilterSymptoms++;
        }
      });
      if (matchedFilterSymptoms > 0) {
        score += matchedFilterSymptoms * 300;
        if (matchedFilterSymptoms === selectedSymptoms.length) {
          score += 500;
        }
        matchReasons.push(`Tag Sintoma Ativo`);
      }
    }

    if (selectedRiskFactors.length > 0) {
      const disRiscosLower = dis.fatores_risco.map(f => f.toLowerCase());
      let matchedFilterRisks = 0;
      selectedRiskFactors.forEach(selR => {
        const normSelR = selR.toLowerCase();
        if (disRiscosLower.some(f => f.includes(normSelR) || normSelR.includes(f))) {
          matchedFilterRisks++;
        }
      });
      if (matchedFilterRisks > 0) {
        score += matchedFilterRisks * 200;
        if (matchedFilterRisks === selectedRiskFactors.length) {
          score += 400;
        }
        matchReasons.push(`Tag Risco Ativo`);
      }
    }

    const cleanReasons = Array.from(new Set(matchReasons));
    if (cleanReasons.length > 0) {
      reasonsMap[dis.id] = cleanReasons;
    }

    return {
      disease: dis,
      score,
      matchReasons: cleanReasons
    };
  });

  let finalResults = scoredResults;
  const filterIsActive = normalizedQuery || selectedSymptoms.length > 0 || selectedRiskFactors.length > 0;
  
  if (filterIsActive) {
    // Keep only matches
    finalResults = scoredResults.filter(r => r.score > 0);
  }

  // Sort descending by score, alphabetically secondary
  finalResults.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.disease.nome.localeCompare(b.disease.nome);
  });

  const sortedDiseasesList = finalResults.map(r => r.disease);

  // Typos spellcheck
  let spellingSuggestion: string | undefined = undefined;
  if (normalizedQuery && sortedDiseasesList.length === 0) {
    spellingSuggestion = findSpellingSuggestion(trimQuery, diseasesList);
  }

  const end = performance.now();
  const latencyMs = Math.round((end - start) * 100) / 100;

  const output: AdvancedSearchOutput = {
    results: sortedDiseasesList,
    reasonsMap,
    latencyMs,
    suggestion: spellingSuggestion,
    totalIndexed: diseasesList.length,
    fieldsIndexedCount: 12
  };

  if (cacheKey.length < 300) {
    searchCache.set(cacheKey, output);
  }

  return output;
};

// Backwards-compatible query wrapper for previous async implementations
export const queryDiseasesLocal = async (
  textQuery: string,
  selectedSymptoms: string[],
  selectedRiskFactors: string[]
): Promise<MedicalDisease[]> => {
  const all = await getAllDiseases();
  const searchOutput = searchMedicalDiseases(all, textQuery, selectedSymptoms, selectedRiskFactors);
  return searchOutput.results;
};

// Add interface for Admin action logs
export interface BaseActionLog {
  id: string;
  timestamp: string;
  action: string; 
  diseaseId: string;
  diseaseName: string;
  adminName: string;
  details?: string;
}

export const getAdminActionLogs = (): BaseActionLog[] => {
  try {
    const raw = localStorage.getItem('medassist_admin_action_logs');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const logAdminAction = (action: string, diseaseId: string, diseaseName: string, adminName: string = 'Administrador', details?: string): void => {
  try {
    const logs = getAdminActionLogs();
    const newLog: BaseActionLog = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      action,
      diseaseId,
      diseaseName,
      adminName,
      details
    };
    logs.unshift(newLog);
    localStorage.setItem('medassist_admin_action_logs', JSON.stringify(logs.slice(0, 500)));
  } catch (e) {
    console.error('Failed to save log:', e);
  }
};

// Add a single custom disease profile / update existing one
export const addCustomDisease = async (disease: MedicalDisease): Promise<void> => {
  clearSearchCache();
  const dbConnection = await openKnowledgeDB();
  
  const achados = (disease.achados_exames && disease.achados_exames.length > 0)
    ? disease.achados_exames.map(ae => ae.trim())
    : getAchadosExamesComplementaresDefault(disease.id, disease.nome, disease.sintomas || []);
    
  const criterios = (disease.criterios_diagnosticos && disease.criterios_diagnosticos.length > 0)
    ? disease.criterios_diagnosticos.map(cd => cd.trim())
    : getCriteriosDiagnosticosDefault(disease.id, disease.nome, disease.sintomas || []);

  const rawId = (disease.id || '').toUpperCase().trim() || `DIS_${Date.now()}`;
  const sanitizedId = rawId.replace(/[^a-zA-Z0-9_\-\.]/g, '_');

  const preparedItem: MedicalDisease = {
    id: sanitizedId,
    nome: disease.nome.trim(),
    sintomas: (disease.sintomas || []).map(s => s.trim()),
    fatores_risco: (disease.fatores_risco || []).map(f => f.trim()),
    red_flags: (disease.red_flags || []).map(rf => rf.trim()),
    diferenciais: (disease.diferenciais || []).map(df => df.trim()),
    achados_exames: achados,
    criterios_diagnosticos: criterios,
    categoria: disease.categoria,
    inTrash: disease.inTrash || false,
    updatedAt: disease.updatedAt || new Date().toISOString(),
    definition: disease.definition || '',
    epidemiology: disease.epidemiology || '',
    etiology: disease.etiology || '',
    pathophysiology: disease.pathophysiology || '',
    treatment: disease.treatment || '',
    complications: disease.complications || '',
    prognosis: disease.prognosis || '',
    references: disease.references || [],
    customReviewIntervalMonths: disease.customReviewIntervalMonths
  };

  if (useInMemoryFallback || !dbConnection) {
    initFallbackIfNeeded();
    const idx = inMemoryDiseases.findIndex(x => x.id === preparedItem.id);
    if (idx >= 0) {
      inMemoryDiseases[idx] = preparedItem;
    } else {
      inMemoryDiseases.push(preparedItem);
    }
    saveFallbackIfNeeded();
  } else {
    await new Promise<void>((resolve, reject) => {
      const transaction = dbConnection.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const request = store.put(preparedItem);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error('Erro ao adicionar doença personalizada no IndexedDB.'));
      };
    });
  }

  // Sync to Firestore if admin is authenticated
  const currentUserRaw = localStorage.getItem('medassist_current_user');
  if (currentUserRaw && auth.currentUser) {
    try {
      const currentUser = JSON.parse(currentUserRaw);
      if (currentUser?.role === 'admin' && isUserAuthAdmin()) {
        await syncCurrentAdminToFirestore();
        const docRef = doc(db, 'diseases', preparedItem.id);
        await setDoc(docRef, cleanUndefined(preparedItem));
      }
    } catch (e) {
      console.warn('Firestore cloud sync notice for disease (saved locally in IndexedDB):', e);
    }
  }
};

// Delete single disease by ID
export const deleteDiseaseById = async (id: string): Promise<void> => {
  clearSearchCache();
  const dbConnection = await openKnowledgeDB();
  const cleanId = id.toUpperCase().trim();

  if (useInMemoryFallback || !dbConnection) {
    initFallbackIfNeeded();
    inMemoryDiseases = inMemoryDiseases.filter(x => x.id !== cleanId);
    saveFallbackIfNeeded();
  } else {
    await new Promise<void>((resolve, reject) => {
      const transaction = dbConnection.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(cleanId);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error(`Falha ao excluir doença ${cleanId} da base de dados.`));
      };
    });
  }

  // Sync to Firestore if admin is authenticated
  const currentUserRaw = localStorage.getItem('medassist_current_user');
  if (currentUserRaw && auth.currentUser) {
    try {
      const currentUser = JSON.parse(currentUserRaw);
      if (currentUser?.role === 'admin' && isUserAuthAdmin()) {
        await syncCurrentAdminToFirestore();
        const docRef = doc(db, 'diseases', cleanId);
        await deleteDoc(docRef);
      }
    } catch (e) {
      console.warn('Firestore cloud sync notice for deleting disease (deleted locally):', e);
    }
  }
};

// Erase entire diseases store content
export const clearKnowledgeDatabase = async (): Promise<void> => {
  clearSearchCache();
  const db = await openKnowledgeDB();
  if (useInMemoryFallback || !db) {
    initFallbackIfNeeded();
    inMemoryDiseases = [];
    saveFallbackIfNeeded();
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(new Error('Erro ao limpar a base de dados de doenças IndexedDB.'));
    };
  });
};

// Load Stats (Total diseases / Available Symptoms listed)
export const getKnowledgeStats = async (): Promise<{ total: number; symptomsCount: number; riskCount: number }> => {
  const all = await getAllDiseases();
  
  const symptomsSet = new Set<string>();
  const riskSet = new Set<string>();

  all.forEach((dis) => {
    dis.sintomas.forEach(s => symptomsSet.add(s));
    dis.fatores_risco.forEach(f => riskSet.add(f));
  });

  return {
    total: all.length,
    symptomsCount: symptomsSet.size,
    riskCount: riskSet.size
  };
};

// Stress Testing Load Generator to verify up to 10,000 diseases scalability.
// Generates realistic mock diseases structure matching clinical criteria.
export const generateScaleLoadDiseases = async (
  onProgress?: (progress: number) => void
): Promise<number> => {
  const db = await openKnowledgeDB();
  
  const prefixes = [
    'Síndrome', 'Insuficiência', 'Artrite', 'Infeção por', 'Cardiopatia', 'Hepatite', 'Gastropatia', 
    'Faringite', 'Neoplasia de', 'Glomerulonefrite', 'Dermatite', 'Neuropatia', 'Miopatia', 'Vasculite'
  ];
  
  const subjects = [
    'Aguda Grau I', 'Infecciosa Grave', 'Autoimune Sistêmica', 'Herodescompressiva', 'Isquêmica Crônica', 
    'Micobacteriana Pulmonar', 'Recorrente Latente', 'Metabólica Congênita', 'Idiopática Familiar', 'Reativa Severa'
  ];

  const organP = [
    'Miopática', 'Renal Obstrutiva', 'Esplênica Súbita', 'Vascular Cerebral', 'Hepática Crônica', 'Pericárdica Estéril'
  ];

  const mockSintomasPool = [
    'Febre intermitente', 'Cefaleia de forte intensidade', 'Dor epigástrica persistente', 'Tosse irritativa', 
    'Exantema popular', 'Mialgia difusa', 'Artralgia simétrica', 'Astenia intensa', 'Prurido noturno', 
    'Diarreia aquosa', 'Vômitos pós-prandiais', 'Dispneia progressiva', 'Turgência de jugular bilateral', 
    'Tontura rotatória', 'Zumbido pulsátil', 'Oligúria', 'Calafrios trementes', 'Anorexia moderada', 'Alteração visual'
  ];

  const mockRiscosPool = [
    'Idade superior a 65 anos', 'Gênero masculino', 'Tabagismo de longa data', 'Diabetes Mellitus tipo 2', 
    'Hipertensão sistêmica', 'Obesidade Grau I', 'Dislipidemia severa', 'Histórico de cardiopatia na família', 
    'Exposição ocupacional continuada', 'Sedentarismo consolidado', 'Uso crônico de anti-inflamatórios'
  ];

  const mockRedFlagsPool = [
    'Síncope ao ortostatismo extremo', 'Instabilidade hemodinâmica imediata', 'Dispneia em repouso ao falar', 
    'SatO2 menor que 92% em ar ambiente', 'Confusão mental aguda perceptível', 'Febre refratária persistente por cinco dias'
  ];

  const mockDiferenciaisPool = [
    'Diagnóstico de exclusão simples', 'Síndrome correlativa benigna', 'Quadro inflamatório inespecífico', 
    'Investigar fibromialgia secundária', 'Reação psicossomática aguda', 'Distúrbio eletrolítico moderado'
  ];

  // Let's generate 4,000 simulated diseases (stress load testing is extremely quick to insert)
  const numToCreate = 4000;
  const listToInsert: MedicalDisease[] = [];

  for (let i = 1; i <= numToCreate; i++) {
    const cidNumber = `${100 + (i % 899)}.${i % 10}`;
    const cidCode = `X${cidNumber}`;
    
    const randomPref = prefixes[i % prefixes.length];
    const randomSub = subjects[(i * 3) % subjects.length];
    const randomOrg = organP[(i * 7) % organP.length];
    const nome = `${randomPref} ${randomSub} ${randomOrg} (Carga ${i})`;

    // Gather randomized symptoms / risks
    const sintomasFiltered: string[] = [];
    const riscosFiltered: string[] = [];
    const redFlagsFiltered: string[] = [];
    const diferenciaisFiltered: string[] = [];

    for (let s = 0; s < 4; s++) {
      sintomasFiltered.push(mockSintomasPool[(i + s * 3) % mockSintomasPool.length]);
    }
    for (let r = 0; r < 3; r++) {
      riscosFiltered.push(mockRiscosPool[(i * 2 + r * 5) % mockRiscosPool.length]);
    }
    for (let f = 0; f < 2; f++) {
      redFlagsFiltered.push(mockRedFlagsPool[(i + f * 4) % mockRedFlagsPool.length]);
    }
    for (let d = 0; d < 3; d++) {
      diferenciaisFiltered.push(mockDiferenciaisPool[(i * 3 + d * 4) % mockDiferenciaisPool.length]);
    }

    listToInsert.push({
      id: cidCode,
      nome,
      sintomas: Array.from(new Set(sintomasFiltered)),
      fatores_risco: Array.from(new Set(riscosFiltered)),
      red_flags: Array.from(new Set(redFlagsFiltered)),
      diferenciais: Array.from(new Set(diferenciaisFiltered)),
      achados_exames: getAchadosExamesComplementaresDefault(cidCode, nome, sintomasFiltered),
      criterios_diagnosticos: getCriteriosDiagnosticosDefault(cidCode, nome, sintomasFiltered)
    });
  }

  await saveDiseasesBatchIncremental(db, listToInsert, onProgress);
  return numToCreate;
};
