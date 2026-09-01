import React from 'react';
import { UniversalBlock } from '../types';

export interface SpecialGuideAlerta {
  texto: string;
  gravidade: 'yellow' | 'red';
  conduta?: string;
}

export interface SpecialGuideTriagem {
  texto: string;
  categoria: string;
}

export interface SpecialGuideConsult {
  id: string;
  rotulo: string;           // ex: "Diretriz 1", "28 semanas", "6 meses"
  subtitulo?: string;
  anamnese: string[];
  triagens: SpecialGuideTriagem[];
  vacinas: string[];
  alertas: SpecialGuideAlerta[];
  orientacoes: string[];
  proxima: string;
  meta?: Record<string, any>;
  blocos?: UniversalBlock[];
}

export interface SpecialGuideDefinition {
  key: string;              // usado como chave de localStorage e caminho do Firestore
  titulo: string;
  itemLabel: string;        // ex: "Diretriz", "Consulta"
  corTema?: string;         // classe de cor base (ex: 'rose', 'violet', 'indigo')
  initialConsults: SpecialGuideConsult[];
  ExtraWidgets?: React.FC<{ 
    consult: SpecialGuideConsult; 
    selectedId: string;
    updateMeta: (meta: Record<string, any>) => void;
    isAdmin?: boolean;
    isEditing?: boolean;
  }>;
  aiGenerate?: (rotulo: string) => Promise<Partial<SpecialGuideConsult>>;
  onSave?: (consults: SpecialGuideConsult[]) => Promise<void>;
  toOriginalFormat?: (consults: SpecialGuideConsult[]) => any[];
  toSpecialFormat?: (original: any[]) => SpecialGuideConsult[];
}
