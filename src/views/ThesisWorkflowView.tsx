import React, { useState } from 'react';
import { TopicProposalForm } from '../components/thesis/TopicProposalForm';
import { ApprovalChainView } from '../components/thesis/ApprovalChainView';
import { AdvisoryMeetingLogView } from '../components/thesis/AdvisoryMeetingLog';
import { FinalDefenseSection } from '../components/thesis/FinalDefenseModal';
import { PlagiarismSignatureView } from '../components/thesis/PlagiarismSignature';
import { FileText, UserCheck, BookOpen, Award, CheckSquare, Sparkles } from 'lucide-react';

interface ThesisWorkflowViewProps {
  onOpenAiHelper: (th: string, en: string, abs: string) => void;
  onNavigateToRooms: () => void;
}

export const ThesisWorkflowView: React.FC<ThesisWorkflowViewProps> = ({
  onOpenAiHelper,
  onNavigateToRooms
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'proposals' | 'approvals' | 'advisory' | 'defense' | 'archive'
  >('proposals');

  return (
    <div className="space-y-6">
      {/* Sub-tab Pill Navigation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
        <div className="flex flex-wrap gap-1 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('proposals')}
            className={`px-3.5 py-2 rounded-xl transition-colors flex items-center space-x-1.5 ${
              activeSubTab === 'proposals'
                ? 'bg-pink-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1. เสนอหัวข้อ & โควตา</span>
          </button>

          <button
            onClick={() => setActiveSubTab('approvals')}
            className={`px-3.5 py-2 rounded-xl transition-colors flex items-center space-x-1.5 ${
              activeSubTab === 'approvals'
                ? 'bg-pink-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>2. สายการอนุมัติ 4 ชั้น</span>
          </button>

          <button
            onClick={() => setActiveSubTab('advisory')}
            className={`px-3.5 py-2 rounded-xl transition-colors flex items-center space-x-1.5 ${
              activeSubTab === 'advisory'
                ? 'bg-pink-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>3. บันทึกพบที่ปรึกษา</span>
          </button>

          <button
            onClick={() => setActiveSubTab('defense')}
            className={`px-3.5 py-2 rounded-xl transition-colors flex items-center space-x-1.5 ${
              activeSubTab === 'defense'
                ? 'bg-pink-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>4. ตรวจสอบก่อนสอบจบ</span>
          </button>

          <button
            onClick={() => setActiveSubTab('archive')}
            className={`px-3.5 py-2 rounded-xl transition-colors flex items-center space-x-1.5 ${
              activeSubTab === 'archive'
                ? 'bg-pink-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>5. เล่มสมบูรณ์ & คลังปัญญา</span>
          </button>
        </div>
      </div>

      {/* Sub-tab Contents */}
      {activeSubTab === 'proposals' && (
        <TopicProposalForm onOpenAiHelper={onOpenAiHelper} />
      )}

      {activeSubTab === 'approvals' && <ApprovalChainView />}

      {activeSubTab === 'advisory' && <AdvisoryMeetingLogView />}

      {activeSubTab === 'defense' && (
        <FinalDefenseSection onScheduleDefenseClick={onNavigateToRooms} />
      )}

      {activeSubTab === 'archive' && <PlagiarismSignatureView />}
    </div>
  );
};
