import React from 'react';
import { useApp } from '../context/AppContext';
import { ProgressRoadmap } from '../components/thesis/ProgressRoadmap';
import { StudentProfile } from '../types';
import {
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  BookOpen,
  Camera,
  ChevronRight
} from 'lucide-react';

interface StudentDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigateTab }) => {
  const { currentUser, topicProposals, examSchedules, prerequisites, advisoryLogs } = useApp();
  const student = currentUser as StudentProfile;

  const myProposal = topicProposals.find((p) => p.studentId === student.id) || topicProposals[0];
  const mySchedules = examSchedules.filter((s) => s.studentId === student.id || s.bookedBy.includes(student.fullName));
  const myPrereq = prerequisites.find((p) => p.studentId === student.id);
  const myLogs = advisoryLogs.filter((l) => l.studentId === student.id);

  // Stage calculation
  let currentStage = 0;
  let progressPct = 25;
  if (myProposal?.status === 'approved') {
    currentStage = 1;
    progressPct = 40;
  }
  if (myLogs.length >= 2) {
    currentStage = 2;
    progressPct = 65;
  }
  if (myPrereq?.isEligibleForDefense) {
    currentStage = 3;
    progressPct = 85;
  }

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center text-white text-xl font-black shadow-md shadow-pink-200">
            {student.fullName ? student.fullName.slice(0, 1) : 'S'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-slate-800">{student.fullName}</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-100 text-pink-700">
                {student.degreeLevel === 'doctoral' ? 'ปริญญาเอก (Ph.D.)' : 'ปริญญาโท (M.Eng.)'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              รหัสประจำตัว: {student.studentId} • สาขา: {student.major} • ปีที่เข้าศึกษา: {student.entryYear}
            </p>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateTab('rooms')}
            className="px-3.5 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>จองห้องประชุม/ห้องสอบ</span>
          </button>
          <button
            onClick={() => onNavigateTab('biometrics')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5"
          >
            <Camera className="w-3.5 h-3.5 text-pink-600" />
            <span>เช็คชื่อ/สแกนหน้า</span>
          </button>
        </div>
      </div>

      {/* Progress Roadmap */}
      <ProgressRoadmap currentStageIndex={currentStage} percentage={progressPct} />

      {/* 2-column Grid: Active Thesis Proposal & Next Bookings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Thesis Proposal Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-800 flex items-center">
              <FileText className="w-4 h-4 text-pink-600 mr-1.5" />
              หัวข้อวิทยานิพนธ์ของคุณ
            </h4>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                myProposal?.status === 'approved'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {myProposal?.status === 'approved' ? 'อนุมัติแล้ว' : 'อยู่ระหว่างเสนอ'}
            </span>
          </div>

          {myProposal ? (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-800 text-sm">{myProposal.titleTh}</div>
              <div className="text-slate-500 italic text-[11px]">{myProposal.titleEn}</div>
              <div className="text-slate-600 pt-1 leading-relaxed line-clamp-3">
                {myProposal.abstract}
              </div>
              <div className="pt-2 flex items-center justify-between text-slate-500 border-t border-slate-100 text-[11px]">
                <span>อาจารย์ที่ปรึกษา: {myProposal.majorAdvisorName}</span>
                <button
                  onClick={() => onNavigateTab('thesis-workflow')}
                  className="text-pink-600 hover:underline font-semibold flex items-center"
                >
                  ดูรายละเอียดสายอนุมัติ <ChevronRight className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-slate-400">
              ยังไม่ได้ยื่นเสนอหัวข้อวิทยานิพนธ์
            </div>
          )}
        </div>

        {/* Scheduled Exams & Room Bookings */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-800 flex items-center">
              <Calendar className="w-4 h-4 text-pink-600 mr-1.5" />
              การนัดหมายห้องสอบ / ห้องประชุมของคุณ
            </h4>
            <button
              onClick={() => onNavigateTab('rooms')}
              className="text-xs text-pink-600 hover:underline font-semibold"
            >
              ดูตารางห้องทั้งหมด
            </button>
          </div>

          {mySchedules.length > 0 ? (
            <div className="space-y-2.5">
              {mySchedules.map((sch) => (
                <div
                  key={sch.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs"
                >
                  <div className="font-bold text-slate-800">{sch.title}</div>
                  <div className="flex items-center space-x-3 text-slate-500 text-[11px]">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-pink-600" />
                      {sch.scheduledDate} ({sch.startTime} - {sch.endTime} น.)
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                      {sch.roomName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-slate-400">
              ยังไม่มีกำหนดการสอบหรือการจองห้องในขณะนี้
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
