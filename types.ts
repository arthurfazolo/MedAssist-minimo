import { SpecialGuideAlerta } from './types/specialGuide';

export interface ReviewHistoryEntry {
  id: string;
  date: string;
  reviewedBy: string;
  changesSummary: string;
  notes: string;
}

export interface PrescriptionModel {
  id: string;
  title: string;
  category: string;
  content: string; // The prescription text
  notes: string; // Contraindications, administration routes
  // Review Queue parameters
  lastReviewedAt?: string;
  nextReviewAt?: string;
  reviewStatus?: 'up_to_date' | 'review_due' | 'overdue' | 'under_review';
  reviewNotes?: string;
  reviewedBy?: string;
  reviewPriority?: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
  reviewHistory?: ReviewHistoryEntry[];
  customReviewIntervalMonths?: number;
}

export interface CalculatorResult {
  value: number | string;
  unit?: string;
  interpretation: string;
  recommendation: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select' | 'boolean';
  options?: { label: string; value: string | number }[]; // For select
  unit?: string;
  step?: number;
  min?: number;
  max?: number;
  defaultValue?: any;
}

export interface CalculatorDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  inputs: CalculatorInput[];
  calculate: (values: Record<string, any>) => CalculatorResult;
  formula?: string;
  // Review Queue parameters
  lastReviewedAt?: string;
  nextReviewAt?: string;
  reviewStatus?: 'up_to_date' | 'review_due' | 'overdue' | 'under_review';
  reviewNotes?: string;
  reviewedBy?: string;
  reviewPriority?: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
  reviewHistory?: ReviewHistoryEntry[];
  customReviewIntervalMonths?: number;
}

// AI Related Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// Auth Types
export type UserRole = 'admin' | 'subscriber' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  specialty?: string;
  crm?: string;
  institution?: string;
}

// Medication Types
export interface Medication {
  id: string;
  genericName: string;
  pharmacologicalClass: string;
  presentations: string[];
  usualDoses: {
    standard: string;
    max: string;
    frequency: string;
    route: string;
  };
  commercialNames: string[];
  susAvailability: boolean; // true if available in SUS (Sistema Único de Saúde)
  costIndicator: '$' | '$$' | '$$$';
  prescriptionType?: 'Comum' | 'Especial' | 'Antimicrobiano' | 'Alto Custo' | 'Receituário A' | 'Receituário B1' | 'Receituário B2';
  pregnancySafety?: {
    category: 'A' | 'B' | 'C' | 'D' | 'X' | 'Não classificado';
    lactationNotes?: string;
  };
  contraindications?: string[];
  drugInteractions?: string[];
  packageInsertUrl?: string; // URL da bula anexada pelo admin
  mainIndications?: {
    condition: string;       // Nome da doença/indicação
    prescriptionTitle?: string; // Título exato do modelo em Prescriptions, para linkar
  }[];
  // Review Queue parameters
  lastReviewedAt?: string;
  nextReviewAt?: string;
  reviewStatus?: 'up_to_date' | 'review_due' | 'overdue' | 'under_review';
  reviewNotes?: string;
  reviewedBy?: string;
  reviewPriority?: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
  reviewHistory?: ReviewHistoryEntry[];
  customReviewIntervalMonths?: number;
}

// Clinical Guide (Protocol) Types
export interface ProtocoloOpcao {
  label: string;
  proximo: string;
}

export interface ProtocoloChecklistItem {
  id: string;
  texto: string;
}

export interface ProtocoloNo {
  id: string;
  tipo: 'decisao' | 'conduta' | 'alerta' | 'checklist' | 'encaminhamento' | 'calculadora';
  texto: string;
  subtexto?: string;
  opcoes?: ProtocoloOpcao[];
  proximo?: string; // used for sequential flows when tipo !== 'decisao' or when non-conditional calculator
  checklistItems?: ProtocoloChecklistItem[];
  calculadoraId?: string; // identifier for internal prebuilt calculators (e.g., 'dengue', 'curb65', 'glasgow', 'dose_weight', 'wells_tep', 'cg_clearance')
  calculadoraConfig?: {
    inputs: CalculatorInput[];
    formula?: string;
    resultados_condicionais?: boolean;
  };
  condicoes?: { se: string; proximo: string }[];
}

export interface UniversalBlock {
  id: string;
  tipo: 'texto' | 'destaque' | 'checklist' | 'calculadora' | 'fluxograma' | 'tabela' | 'imagem' | 'link' | 'registro' | 'protocolo' | 'reutilizavel';
  conteudo?: string;
  titulo?: string;
  gravidade?: 'yellow' | 'red' | 'info';
  itens?: string[];
  calculadoraId?: string;
  protocoloId?: string;
  headers?: string[];
  rows?: string[][];
  url?: string;
  legenda?: string;
  linkUrl?: string;
  linkLabel?: string;
  placeholder?: string;
  registroValor?: string;
  multiline?: boolean;
}

export interface SpecialConsultItem {
  id: string;
  idade: string;
  subtitulo?: string;
  anamnese?: string[];
  desenvolvimento?: { texto: string; categoria: 'Grossa' | 'Fina' | 'Linguagem' | 'Social' | 'Geral' }[];
  vacinas?: string[];
  triagens?: string[]; // exames/triagens
  alertas?: SpecialGuideAlerta[];
  orientacoes?: string[];
  proxima?: string;
  labels?: {
    anamnese?: string;
    desenvolvimento?: string;
    vacinas?: string;
    triagens?: string;
    orientacoes?: string;
  };
  blocos?: UniversalBlock[];
}

export interface ConsultRoutine {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  status?: 'completo' | 'construcao';
  consultas: SpecialConsultItem[];
  // Review Queue parameters
  lastReviewedAt?: string;
  nextReviewAt?: string;
  reviewStatus?: 'up_to_date' | 'review_due' | 'overdue' | 'under_review';
  reviewNotes?: string;
  reviewedBy?: string;
  reviewPriority?: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
  reviewHistory?: ReviewHistoryEntry[];
  customReviewIntervalMonths?: number;
}

export interface Protocolo {
  id: string;
  titulo: string;
  category?: string; // mapping fallback if needed
  categoria: string;
  descricao: string;
  status: 'completo' | 'construcao';
  nos: ProtocoloNo[];
  // Review Queue parameters
  lastReviewedAt?: string;
  nextReviewAt?: string;
  reviewStatus?: 'up_to_date' | 'review_due' | 'overdue' | 'under_review';
  reviewNotes?: string;
  reviewedBy?: string;
  reviewPriority?: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
  reviewHistory?: ReviewHistoryEntry[];
  customReviewIntervalMonths?: number;
}

export interface MedicalDisease {
  id: string;
  nome: string;
  sintomas: string[];
  fatores_risco: string[];
  red_flags: string[];
  diferenciais: string[];
  achados_exames: string[];
  criterios_diagnosticos: string[];
  categoria?: string;
  inTrash?: boolean;
  definition?: string;
  epidemiology?: string;
  etiology?: string;
  pathophysiology?: string;
  treatment?: string;
  complications?: string;
  prognosis?: string;
  references?: string[];
  // Review Queue parameters
  lastReviewedAt?: string;
  nextReviewAt?: string;
  reviewStatus?: 'up_to_date' | 'review_due' | 'overdue' | 'under_review';
  reviewNotes?: string;
  reviewedBy?: string;
  reviewPriority?: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
  reviewHistory?: ReviewHistoryEntry[];
  customReviewIntervalMonths?: number;
}

