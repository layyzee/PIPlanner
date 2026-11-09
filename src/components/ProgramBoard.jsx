import React, { useState, useEffect, useRef } from 'react';
import { 
  Link2, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Info, 
  ArrowRight,
  Filter,
  Eye,
  Plus
} from 'lucide-react';
import { INITIAL_TEAMS, SPRINTS } from '../constants/safeData';
import { playSound } from '../utils/sound';

export default function ProgramBoard({
  stories = [],
  dependencies = [],
  highlightCriticalPath = false,
  onSelectStory
}) {
  const [selectedDependency, setSelectedDependency] = useState(null);
  const [activeStoryHover, setActiveStoryHover] = useState(null);
  const [showDependencies, setShowDependencies] = useState(true);
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);

  // Recalculate SVG Bézier curves connecting dependency cards
  useEffect(() => {
    function computeLines() {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();

      const newLines = dependencies.map((dep) => {
        const fromEl = document.getElementById(`story-${dep.fromStoryId}`);
        const toEl = document.getElementById(`story-${dep.toStoryId}`);

        if (!fromEl || !toEl) return null;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        // Calculate relative coordinates
        const x1 = fromRect.right - containerRect.left;
        const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
        const x2 = toRect.left - containerRect.left;
        const y2 = toRect.top + toRect.height / 2 - containerRect.top;

        // Cubic Bézier control points
        const dx = Math.max(40, (x2 - x1) / 2);
        const pathData = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

        return {
          id: dep.id,
          dep,
          pathData,
          x1, y1, x2, y2,
          midX: (x1 + x2) / 2,
          midY: (y1 + y2) / 2
        };
      }).filter(Boolean);

      setLines(newLines);
    }

    computeLines();
    window.addEventListener('resize', computeLines);
    const timer = setTimeout(computeLines, 300);

    return () => {
      window.removeEventListener('resize', computeLines);
      clearTimeout(timer);
    };
  }, [dependencies, stories]);

  // Story click/hover handlers
  const handleStringClick = (dep) => {
    playSound('string_pluck');
    setSelectedDependency(dep);
  };

  return (
    <div className="flex-1 w-full flex flex-col overflow-hidden relative">
      {/* Board Top Control Ribbon */}
      <div className="h-11 px-4 sm:px-6 bg-[#09101d] border-b border-white/[0.06] flex items-center justify-between shrink-0 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SAFe Program Multi-Team Board</span>
          </span>
          <span className="hidden md:inline text-[11px] text-slate-500">
            • Red strings represent cross-squad dependencies
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playSound('pop');
              setShowDependencies(!showDependencies);
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              showDependencies
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                : 'bg-slate-800 border-white/10 text-slate-400'
            }`}
          >
            <Link2 size={13} className={showDependencies ? 'text-rose-400' : ''} />
            <span>{showDependencies ? 'Dependencies: ON' : 'Dependencies: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid Viewport */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-6 relative select-none scrollbar-thin"
      >
        <div className="min-w-[1000px] w-full flex flex-col relative pb-16">
          
          {/* Sprints Header Row */}
          <div className="grid grid-cols-[220px_repeat(5,1fr)] gap-3 mb-3 shrink-0">
            <div className="p-2.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Agile Squads</span>
              <span className="text-[10px] font-mono text-slate-500">{INITIAL_TEAMS.length} Teams</span>
            </div>

            {SPRINTS.map((sprint) => (
              <div
                key={sprint.id}
                className={`p-2.5 rounded-2xl border text-center transition-all ${
                  sprint.isIP
                    ? 'bg-gradient-to-b from-amber-500/15 to-amber-600/5 border-amber-500/40 text-amber-200'
                    : 'bg-slate-900/80 border-white/5 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-center gap-1 text-xs font-extrabold">
                  {sprint.isIP && <span>💡</span>}
                  <span>{sprint.name}</span>
                </div>
                <div className="text-[10px] font-mono opacity-70 mt-0.5">
                  {sprint.dates}
                </div>
              </div>
            ))}
          </div>

          {/* Teams Swimlanes */}
          <div className="space-y-3 relative">
            {INITIAL_TEAMS.map((team) => (
              <div 
                key={team.id}
                className="grid grid-cols-[220px_repeat(5,1fr)] gap-3 items-stretch"
              >
                {/* Team Sidebar Badge */}
                <div className="p-3.5 rounded-2xl bg-[#0e172a] border border-white/[0.08] shadow-md flex flex-col justify-between">
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl p-1.5 rounded-xl bg-black/40 border border-white/5">{team.avatar}</span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-extrabold text-white truncate">{team.name}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{team.role}</p>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="truncate">{team.lead}</span>
                  </div>
                </div>

                {/* Sprints 1 to 5 Columns for this Team */}
                {SPRINTS.map((sprint) => {
                  const cellStories = stories.filter(
                    (s) => s.teamId === team.id && s.sprintId === sprint.id
                  );

                  return (
                    <div
                      key={sprint.id}
                      className={`min-h-[110px] p-2 rounded-2xl border transition-colors flex flex-col gap-2 ${
                        sprint.isIP
                          ? 'bg-amber-950/10 border-amber-500/20'
                          : 'bg-slate-900/40 border-white/[0.04] hover:border-white/10'
                      }`}
                    >
                      {cellStories.map((story) => {
                        // Check if part of selected dependency
                        const isDepFrom = selectedDependency?.fromStoryId === story.id;
                        const isDepTo = selectedDependency?.toStoryId === story.id;
                        const isHighlighted = isDepFrom || isDepTo || highlightCriticalPath;

                        return (
                          <div
                            id={`story-${story.id}`}
                            key={story.id}
                            onClick={() => {
                              playSound('pop');
                              onSelectStory(story);
                            }}
                            onMouseEnter={() => setActiveStoryHover(story.id)}
                            onMouseLeave={() => setActiveStoryHover(null)}
                            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all duration-200 shadow-sm relative group ${
                              isHighlighted
                                ? 'bg-gradient-to-br from-indigo-950 to-slate-900 border-rose-500 ring-2 ring-rose-500/50 scale-[1.02] shadow-rose-950/50'
                                : 'bg-[#151f33] border-white/10 hover:border-blue-400/50 hover:bg-[#1a2740]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-[10px] font-extrabold text-blue-400">
                                {story.key}
                              </span>
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-md bg-white/5 text-slate-300 font-bold border border-white/10">
                                {story.points} pts
                              </span>
                            </div>

                            <p className="text-[11px] font-bold text-slate-100 line-clamp-2 leading-tight">
                              {story.title}
                            </p>

                            <div className="mt-2 flex items-center justify-between text-[9px] font-mono">
                              <span className={`px-1.5 py-0.2 rounded ${
                                story.type === 'enabler'
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                  : story.type === 'test'
                                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              }`}>
                                {story.type}
                              </span>

                              {dependencies.some(d => d.fromStoryId === story.id || d.toStoryId === story.id) && (
                                <span className="text-rose-400 flex items-center gap-0.5 font-bold">
                                  <Link2 size={10} /> Dep
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* SVG Overlay for Red Dependency String Lines */}
          {showDependencies && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
              <defs>
                <linearGradient id="redStringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="1" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {lines.map((line) => {
                const isSelected = selectedDependency?.id === line.id;
                const strokeColor = line.dep.type === 'critical' ? '#ef4444' : '#f43f5e';

                return (
                  <g key={line.id} className="pointer-events-auto cursor-pointer">
                    {/* Wider invisible stroke for easy clicking */}
                    <path
                      d={line.pathData}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="20"
                      onClick={() => handleStringClick(line.dep)}
                    />

                    {/* Outer Glow Line */}
                    <path
                      d={line.pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={isSelected ? "5" : "3"}
                      strokeDasharray={line.dep.status === 'warning' ? "6,4" : "none"}
                      filter="url(#glow)"
                      className="transition-all duration-300"
                    />

                    {/* Center Core Line */}
                    <path
                      d={line.pathData}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1.2"
                      opacity={isSelected ? "1" : "0.7"}
                    />

                    {/* Interactive Midpoint Pip with Click Target */}
                    <circle
                      cx={line.midX}
                      cy={line.midY}
                      r={isSelected ? "9" : "7"}
                      fill="#ef4444"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="transition-transform hover:scale-125"
                      onClick={() => handleStringClick(line.dep)}
                    />
                    <text
                      x={line.midX}
                      y={line.midY + 3}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      className="pointer-events-none font-mono"
                    >
                      🔗
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </div>
      </div>

      {/* Selected Dependency Modal Popup */}
      {selectedDependency && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 max-w-lg w-[90%] bg-slate-900/95 border border-rose-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-scaleIn">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-rose-400 font-extrabold text-xs">
              <Link2 size={14} />
              <span>Cross-Team Dependency Detected</span>
            </div>
            <button
              onClick={() => setSelectedDependency(null)}
              className="text-slate-400 hover:text-white text-xs font-mono"
            >
              ✕ Close
            </button>
          </div>

          <p className="text-xs text-white font-medium mb-3">
            {selectedDependency.description}
          </p>

          <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-300">
            <div>
              <span className="text-slate-500 block text-[9px] uppercase">Upstream Enabler</span>
              <strong className="text-blue-400">{selectedDependency.fromStoryId}</strong>
            </div>
            <ArrowRight size={14} className="text-rose-400" />
            <div className="text-right">
              <span className="text-slate-500 block text-[9px] uppercase">Downstream Blocker</span>
              <strong className="text-amber-400">{selectedDependency.toStoryId}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
