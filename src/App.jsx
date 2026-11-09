import React, { useState, useEffect } from 'react';
import PINavbar from './components/PINavbar';
import RecruiterSandboxDock from './components/RecruiterSandboxDock';
import ProgramBoard from './components/ProgramBoard';
import RoamRiskBoard from './components/RoamRiskBoard';
import PiObjectivesTab from './components/PiObjectivesTab';
import SafeExplainerDrawer from './components/SafeExplainerDrawer';
import { 
  INITIAL_STORIES, 
  INITIAL_DEPENDENCIES, 
  INITIAL_RISKS, 
  INITIAL_OBJECTIVES,
  INITIAL_TEAMS,
  SPRINTS 
} from './constants/safeData';
import { playSound } from './utils/sound';

export default function App() {
  const [activeTab, setActiveTab] = useState('program-board');
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);
  
  // Core SAFe state with localStorage persistence
  const [stories, setStories] = useState(() => {
    try {
      const saved = localStorage.getItem('piplanner_stories');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_STORIES;
  });

  const [dependencies, setDependencies] = useState(() => {
    try {
      const saved = localStorage.getItem('piplanner_dependencies');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_DEPENDENCIES;
  });

  const [risks, setRisks] = useState(() => {
    try {
      const saved = localStorage.getItem('piplanner_risks');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_RISKS;
  });

  const [objectives, setObjectives] = useState(() => {
    try {
      const saved = localStorage.getItem('piplanner_objectives');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_OBJECTIVES;
  });

  const [confidenceScore, setConfidenceScore] = useState(4.4);
  const [isCriticalPathActive, setIsCriticalPathActive] = useState(false);
  const [isConflictActive, setIsConflictActive] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);
  const [selectedStoryDetail, setSelectedStoryDetail] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('piplanner_stories', JSON.stringify(stories));
      localStorage.setItem('piplanner_dependencies', JSON.stringify(dependencies));
      localStorage.setItem('piplanner_risks', JSON.stringify(risks));
      localStorage.setItem('piplanner_objectives', JSON.stringify(objectives));
    } catch (e) {}
  }, [stories, dependencies, risks, objectives]);

  // Recruiter Simulation: Toggle Conflict
  const handleToggleConflict = () => {
    if (isConflictActive) {
      // Revert to original
      setStories(INITIAL_STORIES);
      setIsConflictActive(false);
    } else {
      // Move downstream MOB-103 into Sprint 1 (before upstream PAY-202 in Sprint 2) to demonstrate conflict!
      setStories(prev => prev.map(s => {
        if (s.id === 'MOB-103') {
          return { ...s, sprintId: 'sprint-1' };
        }
        return s;
      }));
      setIsConflictActive(true);
      setActiveTab('program-board');
    }
  };

  // Recruiter Simulation: Vote
  const handleSimulateVote = () => {
    setConfidenceScore(4.6);
  };

  // Export to Jira RFC 4180 CSV
  const handleExportCsv = () => {
    const headers = ['Issue Key', 'Summary', 'Team', 'Sprint', 'Story Points', 'Type', 'Status'];
    const rows = stories.map(s => {
      const team = INITIAL_TEAMS.find(t => t.id === s.teamId);
      const sprint = SPRINTS.find(sp => sp.id === s.sprintId);
      return [
        `"${s.key}"`,
        `"${s.title.replace(/"/g, '""')}"`,
        `"${team?.name || s.teamId}"`,
        `"${sprint?.name || s.sprintId}"`,
        s.points,
        `"${s.type}"`,
        `"${s.status}"`
      ];
    });

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Verizon-ART-PI-26.1-Plan-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Markdown Table for Confluence
  const handleCopyMarkdown = () => {
    let md = `# 🚂 Verizon 5G Enterprise Billing ART — PI 26.1 Plan\n\n`;
    md += `| Key | Summary | Team | Sprint | Points | Type |\n|---|---|---|---|---|---|\n`;
    stories.forEach(s => {
      const team = INITIAL_TEAMS.find(t => t.id === s.teamId);
      const sprint = SPRINTS.find(sp => sp.id === s.sprintId);
      md += `| **${s.key}** | ${s.title} | ${team?.name} | ${sprint?.name} | ${s.points} | \`${s.type}\` |\n`;
    });

    md += `\n### 🔗 Key Cross-Team Dependencies\n`;
    dependencies.forEach(d => {
      md += `- **${d.fromStoryId}** blocks **${d.toStoryId}**: ${d.description}\n`;
    });

    md += `\n### 🛡️ Program ROAM Risks (${risks.length} Total)\n`;
    risks.forEach(r => {
      md += `- **[${r.column.toUpperCase()}]** ${r.title} — *Owner: ${r.owner}* | ${r.mitigation}\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#070e1b] text-slate-100 overflow-hidden select-none">
      
      {/* Top Main Navigation Bar */}
      <PINavbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenExplainer={() => setIsExplainerOpen(true)}
        onOpenExport={handleExportCsv}
        confidenceScore={confidenceScore}
      />

      {/* Recruiter 1-Click Interactive Sandbox Dock */}
      <RecruiterSandboxDock
        onHighlightCriticalPath={() => setIsCriticalPathActive(!isCriticalPathActive)}
        isCriticalPathActive={isCriticalPathActive}
        onSimulateConflict={handleToggleConflict}
        isConflictActive={isConflictActive}
        onSimulateVote={handleSimulateVote}
        onExportCsv={handleExportCsv}
        onCopyMarkdown={handleCopyMarkdown}
        copiedMd={copiedMd}
      />

      {/* Main Body Content based on Active Tab */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {activeTab === 'program-board' && (
          <ProgramBoard
            stories={stories}
            dependencies={dependencies}
            highlightCriticalPath={isCriticalPathActive}
            onSelectStory={(story) => setSelectedStoryDetail(story)}
          />
        )}

        {activeTab === 'roam-matrix' && (
          <RoamRiskBoard
            risks={risks}
            onUpdateRisk={(updated) => {
              setRisks(prev => prev.map(r => r.id === updated.id ? updated : r));
            }}
            onAddRisk={(newRisk) => {
              setRisks(prev => [...prev, newRisk]);
            }}
          />
        )}

        {activeTab === 'objectives' && (
          <PiObjectivesTab
            objectives={objectives}
            confidenceScore={confidenceScore}
            onVoteConfidence={(score) => setConfidenceScore(score)}
          />
        )}
      </main>

      {/* SAFe 101 Beginner-Friendly Explainer Drawer */}
      <SafeExplainerDrawer
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
      />

      {/* Story Detail Modal */}
      {selectedStoryDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setSelectedStoryDetail(null)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs" 
          />
          <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl shadow-2xl p-6 z-10 space-y-4 animate-scaleIn">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-blue-400">
                {selectedStoryDetail.key}
              </span>
              <button 
                onClick={() => setSelectedStoryDetail(null)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>

            <h3 className="text-base font-extrabold text-white">
              {selectedStoryDetail.title}
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-black/40 p-3 rounded-2xl border border-white/5">
              <div>
                <span className="text-slate-500 block text-[10px]">Story Points</span>
                <strong className="text-emerald-400">{selectedStoryDetail.points} pts</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Type</span>
                <strong className="text-purple-300 uppercase">{selectedStoryDetail.type}</strong>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Part of Verizon 5G Enterprise Billing ART Program Increment 26.1 delivery plan.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
