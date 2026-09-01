import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  HelpCircle, 
  AlertCircle, 
  CheckSquare, 
  ArrowRight, 
  RefreshCw, 
  ChevronRight, 
  UserCheck, 
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import { Protocolo, ProtocoloNo } from '../types';

interface ProtocolFlowchartProps {
  protocol: Pick<Protocolo, 'id' | 'titulo' | 'nos'>;
  currentNodeId?: string | null;
  pathTaken?: string[];
  onNodeClick?: (nodeId: string) => void;
  height?: string | number;
}

export const ProtocolFlowchart: React.FC<ProtocolFlowchartProps> = ({
  protocol,
  currentNodeId = null,
  pathTaken = [],
  onNodeClick,
  height = '500px'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Transform State for Zoom and Pan
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.85 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Touch handlers state
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchDistance, setTouchDistance] = useState<number | null>(null);

  const { nos } = protocol;

  // 1. Core visual card sizes
  const CARD_WIDTH = 240;
  const CARD_HEIGHT = 120;
  const LAYER_HEIGHT = 180;
  const HORIZONTAL_SPACING = 300;

  // 2. Compute dynamic layout using an topological/BFS layering heuristic
  const positions = useMemo(() => {
    if (!nos || nos.length === 0) return {};

    const nodeMap = new Map<string, ProtocoloNo>();
    nos.forEach(no => nodeMap.set(no.id, no));

    // Construct adjacency representation
    const incoming: Record<string, string[]> = {};
    const outgoing: Record<string, string[]> = {};

    nos.forEach(no => {
      incoming[no.id] = [];
      outgoing[no.id] = [];
    });

    nos.forEach(no => {
      let targets: string[] = [];
      if (no.proximo) targets.push(no.proximo);
      if (no.opcoes) {
        no.opcoes.forEach(o => {
          if (o.proximo) targets.push(o.proximo);
        });
      }
      if (no.condicoes) {
        no.condicoes.forEach(c => {
          if (c.proximo) targets.push(c.proximo);
        });
      }

      // Filter to existing nodes in this protocol
      targets = targets.filter(t => nodeMap.has(t));
      outgoing[no.id] = targets;

      targets.forEach(t => {
        if (!incoming[t].includes(no.id)) {
          incoming[t].push(no.id);
        }
      });
    });

    // Determine Y Layers using BFS
    const layers: Record<string, number> = {};
    const roots = nos.filter(no => incoming[no.id].length === 0);

    // Fallback if there is a cycle and no true root
    if (roots.length === 0 && nos.length > 0) {
      roots.push(nos[0]);
    }

    const queue: { id: string; depth: number }[] = [];
    roots.forEach(root => {
      queue.push({ id: root.id, depth: 0 });
      layers[root.id] = 0;
    });

    const visitCount: Record<string, number> = {};

    while (queue.length > 0) {
      const { id, depth } = queue.shift()!;
      visitCount[id] = (visitCount[id] || 0) + 1;
      
      // Limit recursion in case of cyclic references
      if (visitCount[id] > 20) continue;

      const targets = outgoing[id] || [];
      targets.forEach(targetId => {
        const targetDepth = layers[targetId] ?? -1;
        // Assign the deepest layer possible to optimize layout hierarchy
        if (depth + 1 > targetDepth) {
          layers[targetId] = depth + 1;
          queue.push({ id: targetId, depth: depth + 1 });
        }
      });
    }

    // Assign any floating unconnected nodes to depth 0
    nos.forEach(no => {
      if (layers[no.id] === undefined) {
        layers[no.id] = 0;
      }
    });

    // Group items by assigned layer
    const nodesByLayer: Record<number, string[]> = {};
    nos.forEach(no => {
      const layer = layers[no.id];
      if (!nodesByLayer[layer]) {
        nodesByLayer[layer] = [];
      }
      nodesByLayer[layer].push(no.id);
    });

    const activeLayers = Object.keys(nodesByLayer).map(Number).sort((a, b) => a - b);
    const calculatedPositions: Record<string, { x: number; y: number; layer: number }> = {};

    // Position each node horizontally inside its layer
    activeLayers.forEach(layer => {
      const layerNodes = nodesByLayer[layer];

      // Heuristic sorting: sort nodes by their parent's average X coordinate
      // to reduce edge crossings and keep paths straighter
      if (layer > 0) {
        layerNodes.sort((a, b) => {
          const parentsA = incoming[a] || [];
          const parentsB = incoming[b] || [];
          const avgParentX_A = parentsA.reduce((sum, pId) => sum + (calculatedPositions[pId]?.x || 0), 0) / (parentsA.length || 1);
          const avgParentX_B = parentsB.reduce((sum, pId) => sum + (calculatedPositions[pId]?.x || 0), 0) / (parentsB.length || 1);
          return avgParentX_A - avgParentX_B;
        });
      }

      const totalNodes = layerNodes.length;
      layerNodes.forEach((id, index) => {
        // Balanced spacing relative to the center origin (0)
        let x = (index - (totalNodes - 1) / 2) * HORIZONTAL_SPACING;
        
        // Prevent layout collision when layers are extremely dense
        if (totalNodes > 3) {
          x = (index - (totalNodes - 1) / 2) * (HORIZONTAL_SPACING * 0.95);
        }

        const y = layer * LAYER_HEIGHT;
        calculatedPositions[id] = { x, y, layer };
      });
    });

    return calculatedPositions;
  }, [nos]);

  // 3. Define block visual style types (Início, Ação/Conduta, Decisão, Encaminhamento, Fim)
  const getNodeTypeInfo = (no: ProtocoloNo) => {
    const isBeginning = nos.length > 0 && no.id === nos[0].id;
    
    // Check if it's a leaf node/terminal point (excluding loopbacks)
    const nextIds: string[] = [];
    if (no.proximo) nextIds.push(no.proximo);
    if (no.opcoes) no.opcoes.forEach(o => { if (o.proximo) nextIds.push(o.proximo); });
    if (no.condicoes) no.condicoes.forEach(c => { if (c.proximo) nextIds.push(c.proximo); });
    const isEnding = nextIds.length === 0;

    if (isBeginning) {
      return {
        label: 'Início',
        borderColorClass: 'border-emerald-500 dark:border-emerald-800',
        bgClass: 'bg-emerald-50 dark:bg-emerald-950/40',
        textColorClass: 'text-emerald-800 dark:text-emerald-300',
        badgeColorClass: 'bg-emerald-600 text-white',
        icon: <Sparkles className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
      };
    }

    if (no.tipo === 'decisao') {
      return {
        label: 'Decisão',
        borderColorClass: 'border-sky-500 dark:border-sky-800',
        bgClass: 'bg-sky-50 dark:bg-sky-950/40',
        textColorClass: 'text-sky-800 dark:text-sky-300',
        badgeColorClass: 'bg-sky-600 text-white',
        icon: <HelpCircle className="h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
      };
    }

    if (no.tipo === 'encaminhamento') {
      return {
        label: 'Encaminhamento',
        borderColorClass: 'border-indigo-400 dark:border-indigo-800',
        bgClass: 'bg-indigo-50 dark:bg-indigo-950/40',
        textColorClass: 'text-indigo-800 dark:text-indigo-300',
        badgeColorClass: 'bg-indigo-600 text-white',
        icon: <ArrowRight className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
      };
    }

    if (isEnding) {
      return {
        label: 'Término',
        borderColorClass: 'border-rose-500 dark:border-rose-800',
        bgClass: 'bg-rose-50 dark:bg-rose-950/40',
        textColorClass: 'text-rose-800 dark:text-rose-300',
        badgeColorClass: 'bg-rose-600 text-white',
        icon: <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
      };
    }

    // Default action/conduct styles
    let defaultIcon = <CheckSquare className="h-4 w-4 shrink-0 text-slate-500" />;
    let conductBg = 'bg-slate-50 dark:bg-slate-800';
    let label = 'Ação Clínica';
    let border = 'border-slate-300 dark:border-slate-700';

    if (no.tipo === 'alerta') {
      defaultIcon = <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />;
      conductBg = 'bg-amber-50/20 dark:bg-amber-950/20';
      label = 'Alerta Crítico';
      border = 'border-amber-400 dark:border-amber-800';
    } else if (no.tipo === 'checklist') {
      label = 'Checklist';
      border = 'border-purple-300 dark:border-purple-800';
    } else if (no.tipo === 'calculadora') {
      label = 'Escore Técnico';
      border = 'border-cyan-300 dark:border-cyan-800';
    }

    return {
      label,
      borderColorClass: border,
      bgClass: conductBg,
      textColorClass: 'text-slate-700 dark:text-slate-200',
      badgeColorClass: 'bg-slate-500 text-white',
      icon: defaultIcon
    };
  };

  // 4. Extract all edges for connection rendering
  const connections = useMemo(() => {
    const list: { 
      fromId: string; 
      toId: string; 
      label?: string; 
      colorClass?: string 
    }[] = [];

    if (!nos || Object.keys(positions).length === 0) return [];

    nos.forEach(no => {
      const fromPos = positions[no.id];
      if (!fromPos) return;

      // Type 1: sequential transition
      if (no.proximo && positions[no.proximo]) {
        list.push({
          fromId: no.id,
          toId: no.proximo,
          colorClass: 'stroke-slate-400 dark:stroke-slate-600'
        });
      }

      // Type 2: branches with labels (decisão)
      if (no.opcoes) {
        no.opcoes.forEach(op => {
          if (op.proximo && positions[op.proximo]) {
            list.push({
              fromId: no.id,
              toId: op.proximo,
              label: op.label,
              colorClass: 'stroke-sky-500 dark:stroke-sky-600'
            });
          }
        });
      }

      // Type 3: conditional paths (calculadora results/conditions)
      if (no.condicoes) {
        no.condicoes.forEach(c => {
          if (c.proximo && positions[c.proximo]) {
            list.push({
              fromId: no.id,
              toId: c.proximo,
              label: c.se,
              colorClass: 'stroke-purple-500 dark:stroke-purple-600'
            });
          }
        });
      }
    });

    return list;
  }, [nos, positions]);

  // 5. Automatic Centering Implementation
  const handleAutoCenter = () => {
    if (!containerRef.current || Object.keys(positions).length === 0) return;

    const ids = Object.keys(positions);
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    ids.forEach(id => {
      const pos = positions[id];
      if (pos.x < minX) minX = pos.x;
      if (pos.x > maxX) maxX = pos.x;
      if (pos.y < minY) minY = pos.y;
      if (pos.y > maxY) maxY = pos.y;
    });

    // Padding parameters to match bounding boxes correctly
    const paddingX = CARD_WIDTH / 2 + 60;
    const paddingY = CARD_HEIGHT / 2 + 50;

    const graphWidth = (maxX - minX) + paddingX * 2;
    const graphHeight = (maxY - minY) + paddingY * 2;

    const containerWidth = containerRef.current.clientWidth || 800;
    const containerHeight = containerRef.current.clientHeight || 500;

    // Scale calculation to fit both X and Y perfectly
    const scaleX = containerWidth / graphWidth;
    const scaleY = containerHeight / graphHeight;
    const calculatedScale = Math.min(Math.min(scaleX, scaleY), 1.05); // max initial scale 1.05x
    const finalScale = Math.max(calculatedScale, 0.45); // min initial scale 0.45x

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    const transformX = containerWidth / 2 - centerX * finalScale;
    const transformY = containerHeight / 2 - centerY * finalScale;

    setTransform({
      x: transformX,
      y: transformY,
      scale: finalScale
    });
  };

  // Fit view automatically on mount or protocol change
  useEffect(() => {
    const timer = setTimeout(() => {
      handleAutoCenter();
    }, 100);
    return () => clearTimeout(timer);
  }, [protocol.id, nos]);

  // 6. Navigation Control Helpers
  const handleZoom = (factor: number) => {
    setTransform(prev => {
      const nextScale = Math.min(Math.max(prev.scale * factor, 0.25), 2.5);
      return { ...prev, scale: nextScale };
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Only zoom if dragging area is active
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
    handleZoom(factor);
  };

  // 7. Mouse dragging (Panning) handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Left click only
    // Skip drag if user clicked an interactive button or card node
    if ((e.target as HTMLElement).closest('.interactive-node') || (e.target as HTMLElement).closest('.nav-btn')) {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTransform(prev => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    }));
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // 8. Custom Touch Gestures for Smartphones and Tablets (Dragging & Pinching)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      if ((e.target as HTMLElement).closest('.interactive-node') || (e.target as HTMLElement).closest('.nav-btn')) return;
      setIsDragging(true);
      setTouchStart({ x: e.touches[0].clientX - transform.x, y: e.touches[0].clientY - transform.y });
      setTouchDistance(null);
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchDistance(dist);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setTransform(prev => ({
        ...prev,
        x: e.touches[0].clientX - touchStart.x,
        y: e.touches[0].clientY - touchStart.y
      }));
    } else if (e.touches.length === 2 && touchDistance !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = dist / touchDistance;
      setTouchDistance(dist);
      setTransform(prev => {
        const nextScale = Math.min(Math.max(prev.scale * ratio, 0.25), 2.5);
        return { ...prev, scale: nextScale };
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchDistance(null);
  };

  return (
    <div className="relative w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden select-none">
      
      {/* 🧭 Navigator Controls Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 shadow-sm">
        <button
          onClick={() => handleZoom(1.2)}
          className="nav-btn p-2 bg-white hover:bg-slate-50 text-slate-700 rounded-t-xl border border-slate-200 transition-colors flex items-center justify-center cursor-pointer dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:border-slate-700"
          title="Aumentar Zoom (In)"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={() => handleZoom(1 / 1.2)}
          className="nav-btn p-2 bg-white hover:bg-slate-50 text-slate-700 border-x border-b border-slate-200 transition-colors flex items-center justify-center cursor-pointer dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:border-slate-700"
          title="Diminuir Zoom (Out)"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          onClick={handleAutoCenter}
          className="nav-btn p-2 bg-white hover:bg-slate-50 text-slate-700 rounded-b-xl border border-x border-b border-slate-200 transition-colors flex items-center justify-center cursor-pointer dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:border-slate-700"
          title="Centralizar e Enquadrar"
        >
          <Maximize className="h-4 w-4" />
        </button>
      </div>

      {/* Helper User Guide Hint Overlay */}
      <div className="absolute top-4 right-4 z-10 bg-black/60 dark:bg-black/80 px-3 py-1 rounded-full text-white text-[10px] sm:text-xs font-semibold select-none flex items-center gap-1.5 backdrop-blur-sm">
        <Layers className="h-3.5 w-3.5 text-medical-400" />
        <span className="hidden sm:inline">Pressione e arraste para navegar • Pitada ou Scroll para Zoom</span>
        <span className="sm:hidden">Puxe e afaste para Zoom • Arraste para navegar</span>
      </div>

      {/* 🎨 Active Stage indicator legend */}
      {currentNodeId && (
        <div className="absolute bottom-4 left-4 z-10 bg-white/95 dark:bg-slate-800/95 p-2 rounded-xl text-[10px] text-slate-500 flex flex-col gap-1 shadow border border-slate-150 backdrop-blur-sm dark:border-slate-700">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-medical-500 border border-white animate-pulse" />
            <span className="font-bold text-slate-800 dark:text-slate-200">Etapa Ativa</span>
          </div>
          <p className="max-w-[140px] text-[9px] leading-tight text-slate-400 dark:text-slate-400">
            Clique em qualquer ficha do desenho para navegar diretamente para ela.
          </p>
        </div>
      )}

      {/* 🔮 Interactive Workplane Canvas Container */}
      <div
        ref={containerRef}
        className={`relative w-full outline-none overflow-hidden transition-all duration-75 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ height }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Dynamic Zooming and Panning transformation layer */}
        <div
          className="absolute origin-center select-none"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            width: '1px',
            height: '1px',
            top: '50%',
            left: '50%'
          }}
        >
          {nos.length === 0 ? (
            <div className="text-slate-400 dark:text-slate-600 text-sm font-semibold whitespace-nowrap transform -translate-x-1/2">
              Nenhuma etapa clínica inserida.
            </div>
          ) : (
            <>
              {/* 🔌 Dynamic Connections SVG Layer (Lines and Seta Indicators) */}
              <svg className="absolute overflow-visible pointer-events-none" style={{ left: 0, top: 0 }}>
                {/* Custom definitions for indicators under SVG */}
                <defs>
                  <marker
                    id="flow-arrow-head"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                  </marker>
                  <marker
                    id="flow-arrow-head-active"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
                  </marker>
                </defs>

                {connections.map((edge, idx) => {
                  const fromPos = positions[edge.fromId];
                  const toPos = positions[edge.toId];
                  if (!fromPos || !toPos) return null;

                  // Connect from Bottom center of Parent to Top center of Child
                  const startX = fromPos.x;
                  const startY = fromPos.y + CARD_HEIGHT / 2;
                  
                  const endX = toPos.x;
                  const endY = toPos.y - CARD_HEIGHT / 2;

                  // Draw elegant Bezier curves that map clean orthodiagonal pipelines
                  const deltaY = endY - startY;
                  const cpY1 = startY + Math.max(deltaY * 0.45, 30);
                  const cpY2 = endY - Math.max(deltaY * 0.45, 30);
                  
                  const pathD = `M ${startX},${startY} C ${startX},${cpY1} ${endX},${cpY2} ${endX},${endY}`;

                  const isEdgeActive = pathTaken.includes(edge.fromId) && pathTaken.includes(edge.toId);

                  return (
                    <g key={idx}>
                      {/* Connection Line */}
                      <path
                        d={pathD}
                        fill="none"
                        className={`transition-all duration-300 ${
                          isEdgeActive 
                            ? 'stroke-medical-500 stroke-2 dark:stroke-medical-400' 
                            : 'stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]'
                        }`}
                        style={{
                          strokeDasharray: isEdgeActive ? 'none' : '3 3'
                        }}
                        markerEnd={`url(#${isEdgeActive ? 'flow-arrow-head-active' : 'flow-arrow-head'})`}
                      />

                      {/* Decisive label badge centered vertically on the connection */}
                      {edge.label && (
                        <foreignObject
                          x={(startX + endX) / 2 - 80}
                          y={startY + deltaY * 0.42 - 12}
                          width="160"
                          height="35"
                          className="overflow-visible pointer-events-none select-none"
                        >
                          <div className="flex justify-center items-center h-full">
                            <span className="px-2 py-0.5 rounded-full border border-slate-150 bg-white/95 text-[9px] font-bold text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 shadow-sm whitespace-nowrap">
                              {edge.label}
                            </span>
                          </div>
                        </foreignObject>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* 📇 Interactive HTML Content Layer (Individual styled Node Cards) */}
              <div className="absolute pointer-events-auto" style={{ left: 0, top: 0 }}>
                {nos.map(no => {
                  const pos = positions[no.id];
                  if (!pos) return null;

                  const isNodeActive = currentNodeId === no.id;
                  const isNodeVisited = pathTaken.includes(no.id);
                  const typeInfo = getNodeTypeInfo(no);

                  return (
                    <div
                      key={no.id}
                      onClick={() => onNodeClick?.(no.id)}
                      className={`interactive-node absolute group bg-white dark:bg-slate-800 border p-3.5 rounded-2xl flex flex-col justify-between transition-all duration-200 cursor-pointer text-left overflow-hidden select-none hover:shadow-md hover:-translate-y-0.5 active:scale-95 ${
                        typeInfo.borderColorClass
                      } ${
                        isNodeActive 
                          ? 'ring-4 ring-medical-500/20 border-medical-500 dark:border-medical-400 shadow-lg scale-[1.03]' 
                          : isNodeVisited 
                            ? 'opacity-95 shadow-sm' 
                            : 'opacity-75 hover:opacity-100 border-slate-200 dark:border-slate-700 shadow-sm'
                      }`}
                      style={{
                        width: `${CARD_WIDTH}px`,
                        height: `${CARD_HEIGHT}px`,
                        left: `${pos.x - CARD_WIDTH / 2}px`,
                        top: `${pos.y - CARD_HEIGHT / 2}px`
                      }}
                    >
                      {/* Active pulsing glow overlay */}
                      {isNodeActive && (
                        <div className="absolute top-0 right-0 h-1.5 w-full bg-medical-500 dark:bg-medical-400 animate-pulse" />
                      )}

                      {/* Header row with pill type & ID */}
                      <div className="flex justify-between items-center mb-1">
                        <div className={`p-1 px-2.5 rounded-full text-[8.5px] font-extrabold uppercase tracking-wider flex items-center gap-1 leading-none ${typeInfo.badgeColorClass}`}>
                          {typeInfo.label}
                        </div>
                        <span className="font-mono text-[8.5px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-900/60 font-bold px-1.5 py-0.5 rounded uppercase max-w-[80px] truncate leading-none">
                          {no.id}
                        </span>
                      </div>

                      {/* Main Node Text summary */}
                      <div className="flex-grow flex items-start gap-1.5 mt-1.5 scrollbar-thin overflow-y-auto max-h-[55px]">
                        {typeInfo.icon}
                        <div className="flex-grow min-w-0">
                          <p className={`text-[11.5px] leading-[1.3] font-bold tracking-tight line-clamp-2 ${
                            isNodeActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                          }`}>
                            {no.texto}
                          </p>
                          {no.subtexto && (
                            <p className="text-[9.5px]/tight text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">
                              {no.subtexto}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Status indicator row / triggers */}
                      <div className="flex justify-between items-center text-[8.5px] border-t border-slate-100 dark:border-slate-700/60 pt-1.5 mt-1">
                        {no.tipo === 'calculadora' ? (
                          <div className="text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-0.5">
                            <RefreshCw className="h-2.5 w-2.5 shrink-0" />
                            Calcula Score
                          </div>
                        ) : no.tipo === 'checklist' ? (
                          <div className="text-purple-600 dark:text-purple-400 font-bold flex items-center gap-0.5">
                            <CheckSquare className="h-2.5 w-2.5 shrink-0" />
                            {(no.checklistItems || []).length} Tarefas
                          </div>
                        ) : isNodeActive ? (
                          <span className="text-medical-600 dark:text-medical-400 font-bold animate-pulse">
                            Paciente Nesta Etapa
                          </span>
                        ) : isNodeVisited ? (
                          <span className="text-emerald-500 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                            <UserCheck className="h-2.5 w-2.5 shrink-0" /> Evaluado
                          </span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 leading-none">
                            Não percorrido
                          </span>
                        )}

                        <span className="text-slate-400 group-hover:text-medical-500 transition-colors flex items-center font-semibold gap-0.5 leading-none">
                          Inspecionar <ChevronRight className="h-2.5 w-2.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
