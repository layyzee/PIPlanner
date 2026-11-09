import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  AlertTriangle, 
  LifeBuoy, 
  Plus, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { playSound } from '../utils/sound';

export default function RoamRiskBoard({ risks = [], onUpdateRisk, onAddRisk }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Technical');
  const [newColumn, setNewColumn] = useState('owned');
  const [newOwner, setNewOwner] = useState('Bala Palani (Scrum Master)');
  const [newImpact, setNewImpact] = useState('High');
  const [newMitigation, setNewMitigation] = useState('');

  const COLUMNS = [
    {
      id: 'resolved',
      name: 'Resolved (R)',
      icon: <ShieldCheck size={16} className="text-emerald-400" />,
      color: 'emerald',
      bgClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200',
      description: 'Addressed and no longer a threat to the PI.'
    },
    {
      id: 'owned',
      name: 'Owned (O)',
      icon: <UserCheck size={16} className="text-indigo-400" />,
      color: 'indigo',
      bgClass: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-200',
      description: 'Assigned to a specific person to lead resolution.'
    },
    {
      id: 'accepted',
      name: 'Accepted (A)',
      icon: <AlertTriangle size={16} className="text-amber-400" />,
      color: 'amber',
      bgClass: 'bg-amber-500/10 border-amber-500/30 text-amber-200',
      description: 'Accepted as an unavoidable cost of doing business.'
    },
    {
      id: 'mitigated',
      name: 'Mitigated (M)',
      icon: <LifeBuoy size={16} className="text-purple-400" />,
      color: 'purple',
      bgClass: 'bg-purple-500/10 border-purple-500/30 text-purple-200',
      description: 'Contingency plan established to minimize impact.'
    }
  ];

  const handleMoveColumn = (risk, targetColumn) => {
    playSound(targetColumn === 'resolved' ? 'resolve' : 'pop');
    onUpdateRisk({ ...risk, column: targetColumn });
  };

  const handleCreateRisk = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    playSound('pop');
    const created = {
      id: `risk-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      column: newColumn,
      owner: newOwner.trim() || 'Bala Palani',
      impact: newImpact,
      mitigation: newMitigation.trim() || 'Monitoring via weekly Scrum of Scrums.'
    };

    onAddRisk(created);
    setNewTitle('');
    setNewMitigation('');
    setShowAddModal(false);
  };

  return (
    <div className="flex-1 w-full flex flex-col overflow-hidden bg-[#070e1b]">
      {/* Top Header Ribbon */}
      <div className="h-12 px-4 sm:px-6 bg-[#091222] border-b border-white/[0.08] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>🛡️ Program ROAM Risk Board</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              {risks.length} Program Risks
            </span>
          </span>
        </div>

        <button
          onClick={() => {
            playSound('pop');
            setShowAddModal(true);
          }}
          className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-colors flex items-center gap-1 shadow-md"
        >
          <Plus size={13} />
          <span>Add Program Risk</span>
        </button>
      </div>

      {/* 4 ROAM Columns */}
      <div className="flex-1 overflow-x-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[900px] h-full items-start">
          {COLUMNS.map((col) => {
            const colRisks = risks.filter((r) => r.column === col.id);

            return (
              <div
                key={col.id}
                className="flex flex-col h-full max-h-full rounded-3xl bg-slate-900/60 border border-white/10 p-4 space-y-3 shadow-xl"
              >
                {/* Column Header */}
                <div className={`p-3 rounded-2xl border ${col.bgClass} flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    {col.icon}
                    <h3 className="text-xs font-extrabold tracking-wide">{col.name}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-black/40 text-[10px] font-mono font-bold">
                    {colRisks.length}
                  </span>
                </div>

                <p className="text-[10px] text-slate-400 font-light px-1">
                  {col.description}
                </p>

                {/* Risk Cards */}
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
                  {colRisks.map((risk) => (
                    <div
                      key={risk.id}
                      className="p-3.5 rounded-2xl bg-[#131c2e] border border-white/10 hover:border-white/20 transition-all space-y-2.5 shadow-md group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-400 font-bold border border-white/5 uppercase">
                          {risk.category}
                        </span>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          risk.impact === 'Severe'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : risk.impact === 'High'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {risk.impact} Impact
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white leading-snug">
                        {risk.title}
                      </h4>

                      {/* Owner & Mitigation */}
                      <div className="text-[11px] space-y-1 bg-black/30 p-2.5 rounded-xl border border-white/5">
                        <div className="text-slate-400 text-[10px]">
                          Owner: <strong className="text-indigo-300">{risk.owner}</strong>
                        </div>
                        <div className="text-slate-300 text-[10px] leading-tight">
                          <span className="text-slate-500">Plan: </span>
                          {risk.mitigation}
                        </div>
                      </div>

                      {/* Quick Move Trigger Buttons */}
                      <div className="pt-1 flex items-center justify-between border-t border-white/5 text-[10px]">
                        <span className="text-slate-500 font-mono text-[9px]">Move:</span>
                        <div className="flex items-center gap-1">
                          {COLUMNS.filter(c => c.id !== col.id).map(target => (
                            <button
                              key={target.id}
                              onClick={() => handleMoveColumn(risk, target.id)}
                              className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-[9px] transition-colors"
                              title={`Move to ${target.name}`}
                            >
                              {target.id[0].toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {colRisks.length === 0 && (
                    <div className="p-6 text-center text-slate-600 text-xs italic">
                      No risks in this category.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Risk Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setShowAddModal(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs" 
          />
          <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl shadow-2xl p-6 z-10 space-y-4 animate-scaleIn">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white">Add Program Risk</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateRisk} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Risk Summary *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Third-Party Gateway API downtime during cutover"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white focus:outline-none"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="External">External Dependency</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">ROAM Status</label>
                  <select
                    value={newColumn}
                    onChange={(e) => setNewColumn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white focus:outline-none"
                  >
                    <option value="owned">Owned (O)</option>
                    <option value="mitigated">Mitigated (M)</option>
                    <option value="resolved">Resolved (R)</option>
                    <option value="accepted">Accepted (A)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Owner</label>
                  <input
                    type="text"
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Impact Level</label>
                  <select
                    value={newImpact}
                    onChange={(e) => setNewImpact(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white focus:outline-none"
                  >
                    <option value="Severe">Severe</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Mitigation Plan</label>
                <textarea
                  rows={2}
                  placeholder="Steps taken to minimize or eliminate this risk..."
                  value={newMitigation}
                  onChange={(e) => setNewMitigation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white placeholder-slate-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition-colors mt-2"
              >
                Add Risk to ROAM Board
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
