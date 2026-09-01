import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Activity, Pill, BookOpen, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getCalculators } from '../services/calculatorService';
import { getMedications } from '../services/medicationsService';
import { getProtocols } from '../services/protocolsService';
import { INITIAL_PRESCRIPTIONS } from '../data/initialData';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'calculator' | 'medication' | 'protocol' | 'prescription';
}

interface GroupedResults {
  calculators: SearchResultItem[];
  medications: SearchResultItem[];
  protocols: SearchResultItem[];
  prescriptions: SearchResultItem[];
}

interface GlobalSearchProps {
  onNavigate?: () => void;
  onFocusChange?: (focused: boolean) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ onNavigate, onFocusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<GroupedResults>({
    calculators: [],
    medications: [],
    protocols: [],
    prescriptions: [],
  });

  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        const activeEl = document.activeElement;
        if (activeEl) {
          const tagName = activeEl.tagName.toLowerCase();
          if (
            tagName === 'input' ||
            tagName === 'textarea' ||
            activeEl.hasAttribute('contenteditable')
          ) {
            return;
          }
        }
        e.preventDefault();
        setIsExpanded(true);
        setTimeout(() => inputRef.current?.focus(), 150);
        onFocusChange?.(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onFocusChange]);

  // Click outside to close standard dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (query.trim() === '') {
          setIsExpanded(false);
        }
        onFocusChange?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onFocusChange]);

  // Search logic
  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length < 2) {
      setResults({
        calculators: [],
        medications: [],
        protocols: [],
        prescriptions: [],
      });
      setIsOpen(false);
      return;
    }

    // 1. Calculators (name, description, category)
    const calculators = getCalculators()
      .filter((c) =>
        c.name.toLowerCase().includes(trimmed) ||
        c.description.toLowerCase().includes(trimmed) ||
        c.category.toLowerCase().includes(trimmed)
      )
      .slice(0, 3)
      .map((c) => ({
        id: c.id,
        title: c.name,
        subtitle: c.category,
        type: 'calculator' as const,
      }));

    // 2. Medications (genericName, pharmacologicalClass, commercialNames)
    const medications = getMedications()
      .filter((m) =>
        m.genericName.toLowerCase().includes(trimmed) ||
        m.pharmacologicalClass.toLowerCase().includes(trimmed) ||
        m.commercialNames.some((n) => n.toLowerCase().includes(trimmed))
      )
      .slice(0, 3)
      .map((m) => ({
        id: m.id,
        title: m.genericName,
        subtitle: `${m.pharmacologicalClass} | ${m.commercialNames.join(', ')}`,
        type: 'medication' as const,
      }));

    // 3. Clinical Guide (titulo, descricao, categoria)
    const protocols = getProtocols()
      .filter((p) =>
        p.titulo.toLowerCase().includes(trimmed) ||
        p.descricao.toLowerCase().includes(trimmed) ||
        p.categoria.toLowerCase().includes(trimmed)
      )
      .slice(0, 3)
      .map((p) => ({
        id: p.id,
        title: p.titulo,
        subtitle: p.categoria,
        type: 'protocol' as const,
      }));

    // 4. Prescriptions (title, content, category)
    const prescriptions = INITIAL_PRESCRIPTIONS
      .filter((p) =>
        p.title.toLowerCase().includes(trimmed) ||
        p.content.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed)
      )
      .slice(0, 3)
      .map((p) => ({
        id: p.id,
        title: p.title,
        subtitle: p.category,
        type: 'prescription' as const,
      }));

    setResults({ calculators, medications, protocols, prescriptions });
    setIsOpen(true);
  }, [query]);

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    setIsExpanded(false);
    onFocusChange?.(false);
    inputRef.current?.blur();
  };

  const handleItemSelect = (item: SearchResultItem) => {
    setQuery('');
    setIsOpen(false);
    setIsExpanded(false);
    onFocusChange?.(false);
    if (onNavigate) {
      onNavigate();
    }

    switch (item.type) {
      case 'calculator':
        navigate(`/calculators?id=${item.id}`);
        break;
      case 'medication':
        navigate(`/medications?id=${item.id}`);
        break;
      case 'protocol':
        navigate(`/guide?id=${item.id}`);
        break;
      case 'prescription':
        navigate(`/prescriptions`);
        break;
    }
  };

  const totalResults =
    results.calculators.length +
    results.medications.length +
    results.protocols.length +
    results.prescriptions.length;

  const renderIcon = (type: string) => {
    switch (type) {
      case 'calculator':
        return <Activity className="h-4 w-4 text-medical-600 dark:text-medical-400" />;
      case 'medication':
        return <Pill className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case 'protocol':
        return <BookOpen className="h-4 w-4 text-sky-600 dark:text-sky-400" />;
      case 'prescription':
        return <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />;
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="relative z-50">
      <div 
        className={`flex items-center transition-all duration-300 ease-out h-10 rounded-xl ${
          isExpanded 
            ? "w-64 border border-slate-205 bg-slate-50 px-2.5 dark:border-slate-700 dark:bg-slate-800" 
            : "w-10 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer text-slate-600 dark:text-slate-300 hover:text-medical-600 dark:hover:text-medical-400"
        }`}
      >
        <button
          onClick={() => {
            if (isExpanded) {
              if (query.trim() === '') {
                setIsExpanded(false);
                onFocusChange?.(false);
              } else {
                setQuery('');
                setIsOpen(false);
                setIsExpanded(false);
                onFocusChange?.(false);
              }
            } else {
              setIsExpanded(true);
              onFocusChange?.(true);
              setTimeout(() => inputRef.current?.focus(), 150);
            }
          }}
          type="button"
          aria-label="Buscar"
          title="Buscar"
          className={`flex items-center justify-center shrink-0 w-6 h-6 rounded-lg transition-colors ${
            isExpanded
              ? "text-slate-400 dark:text-slate-500"
              : "text-slate-600 hover:text-medical-600 dark:text-slate-300 dark:hover:text-medical-400"
          }`}
        >
          <Search className="h-4 w-4" />
        </button>

        {isExpanded && (
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (query.trim().length >= 2) {
                setIsOpen(true);
              }
              onFocusChange?.(true);
            }}
            onBlur={() => {
              // Automatically collapse if empty on blur
              setTimeout(() => {
                if (query.trim() === '') {
                  setIsExpanded(false);
                  onFocusChange?.(false);
                }
              }, 200);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                inputRef.current?.blur();
                setIsOpen(false);
                setIsExpanded(false);
                onFocusChange?.(false);
              }
            }}
            placeholder="Busca..."
            className="w-full pl-2 bg-transparent text-xs font-semibold text-slate-900 border-none outline-none focus:ring-0 focus:outline-none dark:text-slate-200"
          />
        )}

        {isExpanded && query && (
          <button
            onClick={handleClear}
            className="text-slate-400 hover:text-slate-650 dark:hover:text-slate-300 shrink-0 ml-1"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && isOpen && query.trim().length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto dark:bg-slate-800 dark:border-slate-700"
          >
            {totalResults === 0 ? (
              <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                Nenhum resultado encontrado para &quot;{query}&quot;
              </div>
            ) : (
              <div className="py-2.5">
                {/* Calculators Group */}
                {results.calculators.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3.5 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                      Calculadoras
                    </div>
                    {results.calculators.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleItemSelect(item)}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-start gap-3 transition-colors dark:hover:bg-slate-700"
                      >
                        <div className="mt-0.5 flex-shrink-0">{renderIcon(item.type)}</div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[240px]">
                            {item.subtitle}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Medications Group */}
                {results.medications.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3.5 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                      Medicações
                    </div>
                    {results.medications.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleItemSelect(item)}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-start gap-3 transition-colors dark:hover:bg-slate-700"
                      >
                        <div className="mt-0.5 flex-shrink-0">{renderIcon(item.type)}</div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Clinical Guide Group */}
                {results.protocols.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3.5 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                      Guia Clínico
                    </div>
                    {results.protocols.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleItemSelect(item)}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-start gap-3 transition-colors dark:hover:bg-slate-700"
                      >
                        <div className="mt-0.5 flex-shrink-0">{renderIcon(item.type)}</div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[240px]">
                            {item.subtitle}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Prescriptions Group */}
                {results.prescriptions.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3.5 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                      Prescrições
                    </div>
                    {results.prescriptions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleItemSelect(item)}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-start gap-3 transition-colors dark:hover:bg-slate-700"
                      >
                        <div className="mt-0.5 flex-shrink-0">{renderIcon(item.type)}</div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[240px]">
                            {item.subtitle}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
