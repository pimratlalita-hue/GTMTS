import React from 'react';
import { CheckCircle2, Clock, Circle, ArrowRight } from 'lucide-react';

interface ProgressRoadmapProps {
  currentStageIndex: number; // 0 to 4
  percentage?: number;
}

export const ProgressRoadmap: React.FC<ProgressRoadmapProps> = ({
  currentStageIndex = 2,
  percentage = 65
}) => {
  const milestones = [
    { title: 'เสนอและอนุมัติหัวข้อ', subtitle: 'Topic & Advisor' },
    { title: 'สอบเค้าโครงวิทยานิพนธ์', subtitle: 'Proposal Defense' },
    { title: 'ทำวิจัย & รายงานความก้าวหน้า', subtitle: 'Research & Advisory' },
    { title: 'สอบปากเปล่าขั้นสุดท้าย', subtitle: 'Final Thesis Defense' },
    { title: 'ส่งเล่ม & คลังปัญญาสถาบัน', subtitle: 'Archive & IR' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-800">
            เส้นทางความก้าวหน้าวิทยานิพนธ์ (Thesis Milestone Roadmap)
          </h4>
          <p className="text-xs text-slate-500">
            ระยะปัจจุบัน: {milestones[currentStageIndex]?.title}
          </p>
        </div>
        <div className="text-right">
          <span className="text-lg font-black text-pink-600">{percentage}%</span>
          <span className="text-[11px] text-slate-400 block">ความคืบหน้าสะสม</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-pink-600 to-rose-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Steps Visual Pipeline */}
      <div className="grid grid-cols-5 gap-2 pt-2">
        {milestones.map((m, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;

          return (
            <div key={idx} className="flex flex-col items-center text-center space-y-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isDone
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : isCurrent
                    ? 'bg-pink-600 text-white ring-4 ring-pink-100 shadow'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>
              <div
                className={`text-[11px] font-semibold leading-tight ${
                  isCurrent ? 'text-pink-700' : isDone ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {m.title}
              </div>
              <div className="text-[9px] text-slate-400 hidden sm:block">{m.subtitle}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
