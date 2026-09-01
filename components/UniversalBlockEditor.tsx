import React, { useState } from 'react';
import { 
  UniversalBlock, 
  Protocolo 
} from '../types';
import { 
  Type, AlertTriangle, CheckSquare, Calculator, Layers, Grid, Image, Link as LinkIcon, 
  FileText, Activity, Compass, ArrowUp, ArrowDown, Trash2, Plus, Info, Check, Eye
} from 'lucide-react';
import { getCalculators } from '../services/calculatorService';

interface UniversalBlockEditorProps {
  blocks: UniversalBlock[];
  onChange: (updatedBlocks: UniversalBlock[]) => void;
  availableProtocols?: Protocolo[];
}

export const UniversalBlockEditor: React.FC<UniversalBlockEditorProps> = ({
  blocks = [],
  onChange,
  availableProtocols = []
}) => {
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(null);
  const calculators = getCalculators();

  // Helper to generate IDs
  const generateId = () => Math.random().toString(36).substring(2, 9);

  // Add block helper
  const handleAddBlock = (tipo: UniversalBlock['tipo']) => {
    const newBlock: UniversalBlock = {
      id: `${tipo}_${generateId()}`,
      tipo,
      titulo: getBlockDefaultTitle(tipo),
      conteudo: '',
      itens: tipo === 'checklist' ? ['Anotar relato do paciente', 'Checar adesão ao plano terapêutico'] : undefined,
      gravidade: tipo === 'destaque' ? 'info' : undefined,
      headers: tipo === 'tabela' ? ['Parâmetro', 'Referência', 'Resultado'] : undefined,
      rows: tipo === 'tabela' ? [['', '', '']] : undefined,
      placeholder: tipo === 'registro' ? 'Digite as anotações clínicas aqui...' : undefined,
      multiline: tipo === 'registro' ? true : undefined,
    };
    
    const newBlocks = [...blocks, newBlock];
    onChange(newBlocks);
    setExpandedBlockId(newBlock.id);
  };

  const getBlockDefaultTitle = (tipo: UniversalBlock['tipo']): string => {
    switch (tipo) {
      case 'texto': return 'Texto Informativo';
      case 'destaque': return 'Destaque e Alerta';
      case 'checklist': return 'Protocolo de Checklist';
      case 'calculadora': return 'Calculadora Embutida';
      case 'fluxograma': return 'Visualizar Fluxograma';
      case 'tabela': return 'Tabela de Parâmetros';
      case 'imagem': return 'Ilustração do Procedimento';
      case 'link': return 'Diretrizes e Referências Externas';
      case 'registro': return 'Campo de Registro Médico';
      case 'protocolo': return 'Protocolo Clínico Embutido';
      case 'reutilizavel': return 'Componente Reutilizável de Suporte';
      default: return 'Novo Bloco';
    }
  };

  const handleUpdateBlock = (id: string, updatedFields: Partial<UniversalBlock>) => {
    const updated = blocks.map(b => b.id === id ? { ...b, ...updatedFields } : b);
    onChange(updated);
  };

  const handleDeleteBlock = (id: string) => {
    const filtered = blocks.filter(b => b.id !== id);
    onChange(filtered);
    if (expandedBlockId === id) setExpandedBlockId(null);
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const copy = [...blocks];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onChange(copy);
  };

  // Helper renderers for block creation controls
  const blockTypesMeta: { tipo: UniversalBlock['tipo']; label: string; desc: string; icon: any; color: string }[] = [
    { tipo: 'texto', label: 'Texto', desc: 'Conteúdo descritivo/diretrizes', icon: Type, color: 'text-slate-600 bg-slate-50 border-slate-200' },
    { tipo: 'destaque', label: 'Destaque', desc: 'Alertas e notas de atenção', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { tipo: 'checklist', label: 'Checklist', desc: 'Itens com validação interativa', icon: CheckSquare, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { tipo: 'calculadora', label: 'Calculadora', desc: 'Ferramenta de cálculo integrada', icon: Calculator, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { tipo: 'fluxograma', label: 'Fluxograma', desc: 'Passo a passo gráfico', icon: Layers, color: 'text-sky-600 bg-sky-50 border-sky-200' },
    { tipo: 'tabela', label: 'Tabela', desc: 'Linhas e colunas de dados', icon: Grid, color: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200' },
    { tipo: 'imagem', label: 'Imagem', desc: 'Visualização científica de suporte', icon: Image, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { tipo: 'link', label: 'Link Externo', desc: 'Encaminhamento para referências', icon: LinkIcon, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
    { tipo: 'registro', label: 'Registro', desc: 'Entrada de dados / digitação médica', icon: FileText, color: 'text-violet-600 bg-violet-50 border-violet-200' },
    { tipo: 'protocolo', label: 'Proto. Embutido', desc: 'Sub-protocolo navegável', icon: Activity, color: 'text-teal-600 bg-teal-50 border-teal-200' },
    { tipo: 'reutilizavel', label: 'Reutilizável', desc: 'Componente fixo ou modular', icon: Compass, color: 'text-blue-600 bg-blue-50 border-blue-200' }
  ];

  return (
    <div className="space-y-6">
      {/* Dynamic Blocks Header */}
      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200/80 dark:bg-slate-900/40 dark:border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-500" />
            Blocos da Consulta ({blocks.length})
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Arranje, configure e remova componentes clicando para abrir o editor do bloco.</p>
        </div>
      </div>

      {blocks.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-slate-200 rounded-2xl bg-slate-50/20 dark:border-slate-800 dark:bg-slate-900/10">
          <Layers className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <p className="text-xs font-semibold text-slate-500">Nenhum bloco de conteúdo nesta consulta.</p>
          <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">Selecione uma das opções abaixo para incluir textos, checklists, calculadoras e mais.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {blocks.map((block, idx) => {
            const isExpanded = expandedBlockId === block.id;
            const meta = blockTypesMeta.find(m => m.tipo === block.tipo) || {
              icon: Type, color: 'text-slate-600 bg-slate-200', label: 'Bloco'
            };
            const BlockIcon = meta.icon;

            return (
              <div 
                key={block.id} 
                className={`border rounded-2xl bg-white shadow-sm transition-all duration-200 dark:bg-slate-850 dark:border-slate-750 ${
                  isExpanded ? 'ring-2 ring-indigo-500 border-transparent shadow' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Block Header Toolbar */}
                <div 
                  onClick={() => setExpandedBlockId(isExpanded ? null : block.id)}
                  className="p-3.5 flex items-center justify-between gap-3 cursor-pointer user-select-none select-none"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-1.5 rounded-lg border ${meta.color} flex items-center justify-center shrink-0`}>
                      <BlockIcon className="h-4 w-4" />
                    </div>
                    <div className="truncate text-left">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest dark:text-indigo-400">
                        {meta.label}
                      </span>
                      <h5 className="text-xs font-bold text-slate-700 truncate dark:text-slate-300">
                        {block.titulo || getBlockDefaultTitle(block.tipo)}
                      </h5>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                    <button 
                      type="button"
                      onClick={() => handleMoveBlock(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 rounded text-slate-400"
                      title="Mover para Cima"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleMoveBlock(idx, 'down')}
                      disabled={idx === blocks.length - 1}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 rounded text-slate-400"
                      title="Mover para Baixo"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleDeleteBlock(block.id)}
                      className="p-1 hover:bg-rose-50 text-rose-550 rounded dark:hover:bg-rose-950/25"
                      title="Excluir Bloco"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Block Editor Content */}
                {isExpanded && (
                  <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-4 rounded-b-2xl text-left dark:bg-slate-900/20 dark:border-slate-800">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Título do Bloco</label>
                      <input 
                        type="text"
                        value={block.titulo || ''}
                        onChange={e => handleUpdateBlock(block.id, { titulo: e.target.value })}
                        placeholder="Ex: Histórico da Queixa Principal"
                        className="w-full text-xs font-semibold p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                      />
                    </div>

                    {/* RENDER EDITORS BY BLOCK TYPE */}
                    {block.tipo === 'texto' && (
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Conteúdo Clínico (Markdown suportado)</label>
                        <textarea
                          rows={4}
                          value={block.conteudo || ''}
                          onChange={e => handleUpdateBlock(block.id, { conteudo: e.target.value })}
                          placeholder="Digite as instruções e considerações clínicas..."
                          className="w-full text-xs font-medium p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 font-sans"
                        />
                      </div>
                    )}

                    {block.tipo === 'destaque' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-1">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Gravidade / Ícone</label>
                          <select
                            value={block.gravidade || 'info'}
                            onChange={e => handleUpdateBlock(block.id, { gravidade: e.target.value as any })}
                            className="w-full text-xs font-bold p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-850 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
                          >
                            <option value="info">💡 Informativo / Azul</option>
                            <option value="yellow">⚠️ Atenção / Amarelo</option>
                            <option value="red">🚨 Crítico (Red Flag) / Vermelho</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mensagem de Destaque</label>
                          <input
                            type="text"
                            value={block.conteudo || ''}
                            onChange={e => handleUpdateBlock(block.id, { conteudo: e.target.value })}
                            placeholder="Atenção especial para diurese < 6 trocas ao dia..."
                            className="w-full text-xs font-semibold p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                          />
                        </div>
                      </div>
                    )}

                    {block.tipo === 'checklist' && (
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Itens do Checklist</label>
                        <div className="space-y-2">
                          {(block.itens || []).map((item, idxItem) => (
                            <div key={idxItem} className="flex gap-2 items-center">
                              <span className="text-xs font-bold text-slate-400 shrink-0">{idxItem + 1}.</span>
                              <input 
                                type="text"
                                value={item}
                                onChange={e => {
                                  const copy = [...(block.itens || [])];
                                  copy[idxItem] = e.target.value;
                                  handleUpdateBlock(block.id, { itens: copy });
                                }}
                                className="w-full text-xs font-medium p-1.5 bg-white border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const copy = (block.itens || []).filter((_, i) => i !== idxItem);
                                  handleUpdateBlock(block.id, { itens: copy });
                                }}
                                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg dark:hover:bg-rose-950/20"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const copy = [...(block.itens || []), ''];
                            handleUpdateBlock(block.id, { itens: copy });
                          }}
                          className="mt-2 text-xs font-bold text-indigo-650 hover:text-indigo-750 flex items-center gap-1 dark:text-indigo-400"
                        >
                          <Plus className="h-3 w-3" /> Adicionar Item ao Checklist
                        </button>
                      </div>
                    )}

                    {block.tipo === 'calculadora' && (
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Escolher Calculadora Clínica</label>
                        <select
                          value={block.calculadoraId || ''}
                          onChange={e => handleUpdateBlock(block.id, { calculadoraId: e.target.value })}
                          className="w-full text-xs font-bold p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                        >
                          <option value="">-- Selecione uma calculadora disponível --</option>
                          {calculators.map(calc => (
                            <option key={calc.id} value={calc.id}>{calc.name} ({calc.category})</option>
                          ))}
                        </select>
                        <p className="text-[10px] text-slate-400 mt-1">A calculadora correspondente será renderizada diretamente neste bloco do roteiro clínico.</p>
                      </div>
                    )}

                    {block.tipo === 'tabela' && (
                      <div className="space-y-3">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Colunas da Tabela</label>
                        <div className="flex gap-2 flex-wrap">
                          {(block.headers || []).map((h, colIdx) => (
                            <div key={colIdx} className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
                              <input 
                                type="text"
                                value={h}
                                onChange={e => {
                                  const copy = [...(block.headers || [])];
                                  copy[colIdx] = e.target.value;
                                  handleUpdateBlock(block.id, { headers: copy });
                                }}
                                className="text-[10px] font-bold text-slate-700 uppercase outline-none w-20 dark:bg-slate-800 dark:text-slate-200"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if ((block.headers || []).length <= 1) return;
                                  const headersCopy = (block.headers || []).filter((_, cI) => cI !== colIdx);
                                  const rowsCopy = (block.rows || []).map(r => r.filter((_, cI) => cI !== colIdx));
                                  handleUpdateBlock(block.id, { headers: headersCopy, rows: rowsCopy });
                                }}
                                className="text-rose-500 hover:bg-slate-100 p-0.5 rounded"
                              >
                                <Trash2 className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const headersCopy = [...(block.headers || []), 'Coluna'];
                              const rowsCopy = (block.rows || []).map(r => [...r, '']);
                              handleUpdateBlock(block.id, { headers: headersCopy, rows: rowsCopy });
                            }}
                            className="px-2 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-bold rounded-lg hover:bg-indigo-100"
                          >
                            + Add Coluna
                          </button>
                        </div>

                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Linhas da Tabela</label>
                        <div className="space-y-2 max-h-40 overflow-y-auto bg-white p-2 border border-slate-200 rounded-lg dark:bg-slate-800 dark:border-slate-750">
                          {(block.rows || []).map((row, rowIdx) => (
                            <div key={rowIdx} className="flex gap-1.5 items-center">
                              {row.map((cell, colIdx) => (
                                <input 
                                  key={colIdx}
                                  type="text"
                                  value={cell}
                                  onChange={e => {
                                    const copy = [...(block.rows || [])].map((r, rId) => {
                                      if (rId === rowIdx) {
                                        const rCopy = [...r];
                                        rCopy[colIdx] = e.target.value;
                                        return rCopy;
                                      }
                                      return r;
                                    });
                                    handleUpdateBlock(block.id, { rows: copy });
                                  }}
                                  placeholder="Dado"
                                  className="w-full text-xs font-semibold p-1 border border-slate-150 rounded outline-none text-slate-755 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900"
                                />
                              ))}
                              <button
                                type="button"
                                onClick={() => {
                                  const copy = (block.rows || []).filter((_, rI) => rI !== rowIdx);
                                  handleUpdateBlock(block.id, { rows: copy });
                                }}
                                className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newRow = Array((block.headers || []).length).fill('');
                            const copy = [...(block.rows || []), newRow];
                            handleUpdateBlock(block.id, { rows: copy });
                          }}
                          className="text-[10px] font-extrabold text-indigo-650 hover:text-indigo-750 flex items-center gap-0.5"
                        >
                          + Adicionar Linha à Tabela
                        </button>
                      </div>
                    )}

                    {block.tipo === 'imagem' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">URL de Imagem / SVG</label>
                            <input
                              type="text"
                              value={block.url || ''}
                              onChange={e => handleUpdateBlock(block.id, { url: e.target.value })}
                              placeholder="https://exemplo.com/grafico-has.png"
                              className="w-full text-xs font-semibold p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-800 dark:bg-slate-800 dark:border-slate-700"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Legenda Técnica</label>
                            <input
                              type="text"
                              value={block.legenda || ''}
                              onChange={e => handleUpdateBlock(block.id, { legenda: e.target.value })}
                              placeholder="Relação de curva do IMC para idade..."
                              className="w-full text-xs font-semibold p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-800 dark:bg-slate-800 dark:border-slate-700"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {block.tipo === 'link' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Endereço Web (Link URL)</label>
                          <input
                            type="text"
                            value={block.linkUrl || ''}
                            onChange={e => handleUpdateBlock(block.id, { linkUrl: e.target.value })}
                            placeholder="https://diretrizes.br/sbp"
                            className="w-full text-xs font-semibold p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-800 dark:bg-slate-800 dark:border-slate-700"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Texto Amigável do Link (Label)</label>
                          <input
                            type="text"
                            value={block.linkLabel || ''}
                            onChange={e => handleUpdateBlock(block.id, { linkLabel: e.target.value })}
                            placeholder="Acessar Manual de Puericultura Oficial SBP"
                            className="w-full text-xs font-semibold p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-800 dark:bg-slate-800 dark:border-slate-700"
                          />
                        </div>
                      </div>
                    )}

                    {block.tipo === 'registro' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Instruções para o Médico / Placeholder</label>
                            <input
                              type="text"
                              value={block.placeholder || ''}
                              onChange={e => handleUpdateBlock(block.id, { placeholder: e.target.value })}
                              placeholder="Ex: Registre as impressões cardiológicas do recém-nascido..."
                              className="w-full text-xs font-semibold p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-800 dark:bg-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tipo de Campo</label>
                            <select
                              value={block.multiline ? 'true' : 'false'}
                              onChange={e => handleUpdateBlock(block.id, { multiline: e.target.value === 'true' })}
                              className="w-full text-xs font-bold p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-800 dark:bg-slate-800"
                            >
                              <option value="false">Texto de Linha Única (input)</option>
                              <option value="true">Área de Anotação Ampla (textarea)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {block.tipo === 'protocolo' && (
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Acoplar Fluxograma / Protocolo Equivalente</label>
                        <select
                          value={block.protocoloId || ''}
                          onChange={e => handleUpdateBlock(block.id, { protocoloId: e.target.value })}
                          className="w-full text-xs font-bold p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-800 dark:bg-slate-805"
                        >
                          <option value="">-- Selecione o Protocolo a Vincular --</option>
                          {availableProtocols.map(p => (
                            <option key={p.id} value={p.id}>{p.titulo} ({p.categoria})</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {block.tipo === 'fluxograma' && (
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Explicar Árvore Multidecisional do Fluxograma</label>
                        <input
                          type="text"
                          value={block.conteudo || ''}
                          onChange={e => handleUpdateBlock(block.id, { conteudo: e.target.value })}
                          placeholder="Ex: Fluxo do Rastreio de Dislipidemia na Infância..."
                          className="w-full text-xs font-semibold p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-800 dark:bg-slate-800"
                        />
                      </div>
                    )}

                    {block.tipo === 'reutilizavel' && (
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Identificador de Componente Reutilizável de Suporte</label>
                        <input
                          type="text"
                          value={block.conteudo || ''}
                          onChange={e => handleUpdateBlock(block.id, { conteudo: e.target.value })}
                          placeholder="Ex: widget_calendario_vacinal"
                          className="w-full text-xs font-semibold p-2 bg-white border border-slate-200 rounded-xl outline-none"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Block selection Palette */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 dark:bg-slate-900/20 dark:border-slate-800">
        <h5 className="text-xs font-extrabold text-slate-655 mb-3 uppercase tracking-wider text-left flex items-center gap-1.5 justify-start">
          <Plus className="h-4 w-4 text-emerald-500" />
          Inserir novo bloco de conteúdo
        </h5>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {blockTypesMeta.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.tipo}
                type="button"
                onClick={() => handleAddBlock(item.tipo)}
                className="flex flex-col items-center justify-center p-3 border border-slate-150 rounded-xl bg-white hover:bg-indigo-50 hover:border-indigo-300 hover:ring-1 hover:ring-indigo-200 transition-all text-center group cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-750"
              >
                <div className={`p-1.5 rounded-lg border ${item.color} mb-1.5 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.label}</span>
                <span className="text-[9px] text-slate-400 mt-0.5 block line-clamp-1">{item.desc}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
