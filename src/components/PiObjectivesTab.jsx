import React, { useState } from 'react';
import { Target, CheckCircle2, AlertCircle, Sparkles, Award, Star, Info, Plus } from 'lucide-react';
import { INITIAL_TEAMS } from '../constants/safeData';
import { playSound } from '../utils/sound';
import confetti from 'canvas-confetti';

export default function PiObjectivesTab({
  objectives = [],
  confidenceScore = 4.4,
  onVoteConfidence
}) {
  const [selectedVote, setSelectedVote] = useState(4);
  const [hasVoted, setHasVoted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleCastVote = (score) => {
    playSound('vote');
    setSelectedVote(score);
    setHasVoted(true);
    onVoteConfidence(score);

    if (score >= 3) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  const committed = objectives.filter(o => !o.isUncommitted);
  const uncommitted = objectives.filter(o => o.isUncommitted);

  return (
    <div className="flex-1 w-full flex flex-col overflow-y-auto p-4 sm:p-6 bg-[#070e1b] space-y-6">
      
      {/* Top Banner: Confidence Vote (Fist of Five) */}
      <div className="max-w-5xl mx-auto w-full p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-950/80 via-indigo-950/80 to-slate-900 border border-blue-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px] font-extrabold uppercase border border-blue-500/30">
              PI Cadence Event
            </span>
            <span className="text-xs text-slate-400 font-mono">End of Day 2</span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            ART Confidence Vote (Fist of Five)
          </h2>
          <p className="text-xs text-slate-300 max-w-xl font-light">
            Every team member votes 1 to 5 on the feasibility of the overall PI plan. An average of <strong>3.0+</strong> commits the plan; anything below triggers immediate scope rework.
          </p>
        </div>

        {/* Voting Dial */}
        <div className="flex flex-col items-center gap-2 bg-slate-900/90 p-4 rounded-2xl border border-white/10 shrink-0 shadow-lg">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Current ART Average: <strong className="text-emerald-400 text-sm font-bold">{confidenceScore} / 5.0</strong>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => handleCastVote(num)}
                className={`w-9 h-11 sm:w-10 sm:h-12 rounded-xl flex flex-col items-center justify-center font-mono font-black text-sm transition-all duration-200 ${
                  selectedVote === num
                    ? 'bg-gradient-to-t from-emerald-500 to-teal-400 text-slate-950 scale-110 shadow-lg shadow-emerald-500/40 ring-2 ring-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
                title={`Vote ${num} Finger${num > 1 ? 's' : ''}`}
              >
                <span>{num}</span>
                <span className="text-[10px]">🖐️</span>
              </button>
            ))}
          </div>

          {hasVoted && (
            <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-1 font-bold">
              <CheckCircle2 size={12} /> Your Vote: {selectedVote} Stars Recorded
            </div>
          )}
        </div>
      </div>

      {/* Educational Callout: Committed vs. Uncommitted */}
      <div className="max-w-5xl mx-auto w-full p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-xs text-amber-200">
        <Info size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white block font-bold mb-0.5">
            SAFe Interview Key Concept: Committed vs. Uncommitted Objectives
          </strong>
          <span>
            "Uncommitted" does <strong>NOT</strong> mean extra work or overtime! They are planned items with high technical uncertainty or third-party risk. By marking them uncommitted, teams protect their predictability metrics while still prioritizing the business value.
          </span>
        </div>
      </div>

      {/* Objectives Sections */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Committed Objectives */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Committed PI Objectives ({committed.length})</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400 font-bold">
              High Confidence Scope
            </span>
          </div>

          <div className="space-y-2.5">
            {committed.map((obj) => {
              const team = INITIAL_TEAMS.find(t => t.id === obj.teamId);

              return (
                <div
                  key={obj.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2.5 shadow-md hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
                      <span>{team?.avatar}</span>
                      <span>{team?.name}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                      BV: {obj.businessValue}/10
                    </span>
                  </div>

                  <p className="text-xs font-bold text-white leading-snug">
                    {obj.title}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-white/5">
                    <span>Target: 100% Milestone Completion</span>
                    <span className="text-emerald-400 font-bold">Committed</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Uncommitted Objectives */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-400" />
              <span>Uncommitted Objectives ({uncommitted.length})</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400 font-bold">
              Variable / Experimental
            </span>
          </div>

          <div className="space-y-2.5">
            {uncommitted.map((obj) => {
              const team = INITIAL_TEAMS.find(t => t.id === obj.teamId);

              return (
                <div
                  key={obj.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-2.5 shadow-md hover:border-amber-400/60 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
                      <span>{team?.avatar}</span>
                      <span>{team?.name}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/30">
                      BV: {obj.businessValue}/10
                    </span>
                  </div>

                  <p className="text-xs font-bold text-white leading-snug">
                    {obj.title}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-white/5">
                    <span>Subject to API partner delivery</span>
                    <span className="text-amber-400 font-bold">Buffer Scope</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
