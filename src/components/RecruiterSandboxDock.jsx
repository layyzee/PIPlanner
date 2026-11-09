import React from 'react';
import { Sparkles, Dices, AlertOctagon, Award, Download, FileSpreadsheet, Copy, Check } from 'lucide-react';
import { playSound } from '../utils/sound';
import confetti from 'canvas-confetti';

export default function RecruiterSandboxDock({
  onHighlightCriticalPath,
  isCriticalPathActive,
  onSimulateConflict,
  isConflictActive,
  onSimulateVote,
  onExportCsv,
  onCopyMarkdown,
  copiedMd
}) {
  return (
    <div className="w-full bg-[#080f1e]/95 border-b border-blue-500/30 px-4 py-2 flex flex-wrap items-center justify-between gap-2 z-20 shrink-0 backdrop-blur-md">
      {/* Left Badge */}
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-blue-500/30">
          <Sparkles size={11} className="text-blue-400" /> Recruiter Sandbox
        </span>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Test SAFe 6.0 PI Planning in 1 click
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => {
            playSound('string_pluck');
            onHighlightCriticalPath();
          }}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 ${
            isCriticalPathActive
              ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-900/50'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10'
          }`}
          title="Highlight cross-squad blocking dependency path"
        >
          <Dices size={13} className="text-rose-400" />
          <span>{isCriticalPathActive ? 'Critical Path: Active' : 'Highlight Critical Path'}</span>
        </button>

        <button
          onClick={() => {
            playSound('alert');
            onSimulateConflict();
          }}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 ${
            isConflictActive
              ? 'bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/50'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10'
          }`}
          title="Simulate upstream dependency scheduling conflict"
        >
          <AlertOctagon size={13} className="text-amber-400" />
          <span>{isConflictActive ? 'Conflict Highlighted' : 'Simulate Conflict'}</span>
        </button>

        <button
          onClick={() => {
            playSound('vote');
            onSimulateVote();
            confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
          }}
          className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-white/10 transition-colors flex items-center gap-1"
          title="Simulate full ART Fist of Five vote"
        >
          <Award size={13} className="text-emerald-400" />
          <span>Simulate Vote (4.6 ★)</span>
        </button>

        <div className="h-4 w-[1px] bg-white/10 hidden sm:block mx-1" />

        {/* 1-Click Export Tools */}
        <button
          onClick={() => {
            playSound('pop');
            onExportCsv();
          }}
          className="p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-white/10 transition-colors flex items-center gap-1"
          title="Download RFC 4180 Jira CSV Plan"
        >
          <FileSpreadsheet size={13} className="text-emerald-400" />
          <span className="hidden md:inline">Jira CSV</span>
        </button>

        <button
          onClick={() => {
            playSound('pop');
            onCopyMarkdown();
          }}
          className="p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-white/10 transition-colors flex items-center gap-1"
          title="Copy Markdown PI Table for Confluence"
        >
          {copiedMd ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} className="text-blue-400" />}
          <span className="hidden md:inline">{copiedMd ? 'Copied!' : 'Copy MD'}</span>
        </button>
      </div>
    </div>
  );
}
