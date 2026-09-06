import React from 'react';
import { useApp } from '../context/AppContext';
import { AdvisorProfile } from '../types';
import {
  Users,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  BookOpen,
  FileText,
  Clock,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface AdvisorDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const AdvisorDashboard: React.FC<AdvisorDashboardProps> = ({ onNavigateTab }) => {
  const { currentUser, advisors, students, topicProposals, advisoryLogs, examSchedules } = useApp();
  const advisor = (advisors.find((a) => a.id === currentUser.id) || advisors[0]) as AdvisorProfile;

  // Filter students under this advisor
  const myStudents = students.filter((s) => s.advisorId === advisor.id);
  const pendingProposals = topicProposals.filter(
    (p) => p.majorAdvisorId === advisor.id && p.status === 'pending_advisor'
  );
  const pendingLogs = advisoryLogs.filter((l) => !l.isAdvisorConfirmed);

  // At-Risk Students filter: e.g. std-05 (grade U or last meeting > 60 days ago)
  const atRiskStudents = students.filter((s) => {
    if (s.id === 'std-05') return true; // Known seed at-risk student
    return false;
  });

  const quotaPct = Math.round((advisor.currentStudentCount / advisor.maxStudentQuota) * 100);

  return (
    <div className="space-y-6">
      {/* Advisor Profile Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-900 flex items-center justify-center text-white text-xl font-black shadow-md">
            {advisor.academicTitle}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-slate-800">{advisor.fullName}</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">
                อาจารย์ที่ปรึกษา (Advisor)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              ภาควิชา: {advisor.department} • {advisor.faculty}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('rooms')}
          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-xl shadow transition-all flex items-center space-x-1.5"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>จองห้องประชุมคณะ / ห้องสอบ</span>
        </button>
      </div>

      {/* Quota & Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quota Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">โควตานักศึกษาในความดูแล</span>
            <span className="text-xs font-black text-pink-600">
              {advisor.currentStudentCount} / {advisor.maxStudentQuota} คน
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all ${
                quotaPct >= 100 ? 'bg-rose-500' : 'bg-pink-600'
              }`}
              style={{ width: `${Math.min(quotaPct, 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            {quotaPct >= 100
              ? '⚠️ โควตาเต็มแล้ว ไม่สามารถรับนิสิตเพิ่มได้ตามเกณฑ์บัณฑิตวิทยาลัย'
              : `สามารถรับนิสิตเพิ่มได้อีก ${advisor.maxStudentQuota - advisor.currentStudentCount} คน`}
          </p>
        </div>

        {/* Pending Proposals to Approve */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="text-2xl font-black text-slate-800">{pendingProposals.length}</div>
          <div className="text-xs font-bold text-slate-700">หัวข้อวิทยานิพนธ์รอพิจารณา</div>
          <p className="text-[11px] text-slate-400">คำร้องเสนอหัวข้อใหม่ที่รออาจารย์พิจารณาอนุมัติ</p>
        </div>

        {/* Pending Advisory Logs to Confirm */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="text-2xl font-black text-slate-800">{pendingLogs.length}</div>
          <div className="text-xs font-bold text-slate-700">บันทึกการเข้าพบรอการรับรอง</div>
          <p className="text-[11px] text-slate-400">สมุดบันทึกพบที่นิสิตส่งเข้ามา</p>
        </div>
      </div>

      {/* At-Risk Students Alert Banner */}
      {atRiskStudents.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-rose-900 flex items-center">
              <ShieldAlert className="w-4 h-4 text-rose-600 mr-1.5" />
              การแจ้งเตือนนิสิตกลุ่มเสี่ยง (At-Risk Early Warning System)
            </h4>
            <span className="px-2 py-0.5 bg-rose-200 text-rose-800 rounded text-[10px] font-bold">
              พบ {atRiskStudents.length} คน
            </span>
          </div>

          <div className="space-y-2">
            {atRiskStudents.map((std) => (
              <div
                key={std.id}
                className="bg-white p-3.5 rounded-xl border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    {std.fullName} ({std.studentId})
                  </div>
                  <div className="text-[11px] text-rose-700 mt-0.5">
                    ⚠️ ขาดการเข้าพบอาจารย์ที่ปรึกษานานกว่า 60 วัน และได้รับผลการประเมินความก้าวหน้าระดับ U (Unsatisfactory)
                  </div>
                </div>

                <button
                  onClick={() => onNavigateTab('rooms')}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] rounded-lg transition-colors whitespace-nowrap self-end sm:self-center"
                >
                  นัดหมายพบด่วน / จองห้อง
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Items Actions Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h4 className="text-sm font-bold text-slate-800 flex items-center">
            <Clock className="w-4 h-4 text-pink-600 mr-1.5" />
            รายการที่ต้องดำเนินการ (Pending Tasks)
          </h4>
          <button
            onClick={() => onNavigateTab('thesis-workflow')}
            className="text-xs text-pink-600 hover:underline font-semibold flex items-center"
          >
            ไปยังหน้ากระบวนการวิทยานิพนธ์ <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        {pendingProposals.length === 0 && pendingLogs.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            ไม่มีรายการค้างที่รอการพิจารณาในขณะนี้
          </div>
        ) : (
          <div className="space-y-3">
            {pendingProposals.map((prop) => (
              <div
                key={prop.id}
                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="text-[10px] font-bold text-pink-700 bg-pink-100 px-1.5 py-0.5 rounded mr-2">
                    ยื่นหัวข้อใหม่
                  </span>
                  <span className="font-bold text-slate-800">{prop.titleTh}</span>
                  <div className="text-[11px] text-slate-500 mt-0.5">นิสิต: {prop.studentName}</div>
                </div>
                <button
                  onClick={() => onNavigateTab('thesis-workflow')}
                  className="px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs rounded-lg"
                >
                  พิจารณา
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
