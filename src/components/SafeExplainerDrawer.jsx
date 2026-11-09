import React, { useState } from 'react';
import { X, Search, BookOpen, MessageSquare, Award, Lightbulb, ExternalLink } from 'lucide-react';
import { SAFE_GLOSSARY } from '../constants/safeData';
import { playSound } from '../utils/sound';

export default function SafeExplainerDrawer({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  if (!isOpen) return null;

  const tags = ['All', 'Organization', 'Cadence', 'Ceremony', 'Execution', 'Governance', 'Coordination', 'Commitment'];

  const filtered = SAFE_GLOSSARY.filter((item) => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortDef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.smTip.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All' || item.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity animate-fadeIn" 
      />

      {/* Slide-over Panel */}
      <aside className="relative w-full max-w-2xl h-full bg-[#0c1424] border-l border-white/10 shadow-2xl flex flex-col z-10 animate-slideInRight">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-xl">
              🎓
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>SAFe® 6.0 Interview Cheat Sheet</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Beginner Friendly
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Core concepts, ceremony scripts, and exact talking points for Scrum Masters
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-white/10 bg-black/20 space-y-2.5">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search concepts, interview tips, or ceremonies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-800/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  playSound('pop');
                  setSelectedTag(tag);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors ${
                  selectedTag === tag
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary & Interview Tips List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3 hover:border-amber-400/40 transition-colors shadow-lg"
            >
              {/* Title & Tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.icon}</span>
                  <h3 className="text-sm font-extrabold text-white">{item.term}</h3>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30 uppercase">
                  {item.tag}
                </span>
              </div>

              {/* Quick Definition */}
              <p className="text-xs text-amber-200 font-semibold leading-relaxed bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                {item.shortDef}
              </p>

              {/* Detailed Breakdown */}
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {item.details}
              </p>

              {/* Interview Talking Point */}
              <div className="pt-2 border-t border-white/10 flex items-start gap-2 text-xs text-emerald-300 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                <Lightbulb size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-white block text-[11px] uppercase tracking-wider mb-0.5">
                    How to say it in an interview:
                  </strong>
                  <span className="italic">{item.smTip}</span>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs">
              No matching SAFe concepts found for "{searchTerm}".
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="p-3.5 border-t border-white/10 bg-slate-950/80 text-[11px] text-slate-400 flex items-center justify-between">
          <span>SAFe® 6.0 Scrum Master Knowledge Base</span>
          <span className="text-emerald-400 font-mono font-bold">Verizon ART Certified</span>
        </div>
      </aside>
    </div>
  );
}
