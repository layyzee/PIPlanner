import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  ShieldAlert, 
  Target, 
  Download, 
  Sparkles,
  Share2,
  Check,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { playSound } from '../utils/sound';

export default function PINavbar({
  activeTab,
  onSelectTab,
  onOpenExplainer,
  onOpenExport,
  confidenceScore
}) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    playSound('pop');
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <header className="h-16 px-4 sm:px-6 bg-[#0b1220]/95 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between shrink-0 z-30">
      
      {/* Brand & Train Metadata */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-xl shadow-lg shadow-blue-500/20 select-none">
          🚂
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span>PI Planner</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                SAFe® 6.0
              </span>
            </h1>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block font-mono">
            Verizon 5G Enterprise Billing ART • PI 26.1
          </p>
        </div>
      </div>

      {/* Center Tab Navigation */}
      <nav className="flex items-center bg-slate-900/80 p-1 rounded-2xl border border-white/10 shadow-inner">
        <button
          onClick={() => {
            playSound('pop');
            onSelectTab('program-board');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'program-board'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers size={13} />
          <span>Program Board</span>
        </button>

        <button
          onClick={() => {
            playSound('pop');
            onSelectTab('roam-matrix');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'roam-matrix'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldAlert size={13} />
          <span>ROAM Risks</span>
        </button>

        <button
          onClick={() => {
            playSound('pop');
            onSelectTab('objectives');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'objectives'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Target size={13} />
          <span>PI Objectives</span>
          {confidenceScore && (
            <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px] font-mono text-emerald-300">
              {confidenceScore} ★
            </span>
          )}
        </button>
      </nav>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-2">
        {/* SAFe 101 Explainer Trigger (Beginner Friendly) */}
        <button
          onClick={() => {
            playSound('pop');
            onOpenExplainer();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-extrabold transition-all shadow-xs"
          title="Open SAFe 6.0 Interview Cheat Sheet & Glossary"
        >
          <BookOpen size={14} className="text-amber-400" />
          <span className="hidden md:inline">SAFe 101 Guide</span>
          <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-[10px] text-amber-200 uppercase font-mono">
            Cheat Sheet
          </span>
        </button>

        {/* Export PI Plan */}
        <button
          onClick={() => {
            playSound('pop');
            onOpenExport();
          }}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-white/10 transition-colors flex items-center gap-1.5"
          title="Export Program Increment plan to CSV / Markdown"
        >
          <Download size={13} />
          <span className="hidden lg:inline">Export</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleCopyLink}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-white/10 transition-colors flex items-center gap-1.5"
          title="Copy Link"
        >
          {copiedLink ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
          <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
        </button>
      </div>
    </header>
  );
}
