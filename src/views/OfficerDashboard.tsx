import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  TrendingUp,
  Award,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  BarChart2,
  ChevronRight
} from 'lucide-react';

interface OfficerDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const OfficerDashboard: React.FC<OfficerDashboardProps> = ({ onNavigateTab }) => {
  const { students, topicProposals, examSchedules, rooms } = useApp();

  const masterStudents = students.filter((s) => s.degreeLevel === 'master').length;
  const phdStudents = students.filter((s) => s.degreeLevel === 'doctoral').length;

  const approvedTopics = topicProposals.filter((p) => p.status === 'approved').length;
  const pendingTopics = topicProposals.filter((p) => p.status !== 'approved').length;

  // Active room bookings today
  const activeBookings = examSchedules.filter((s) => s.status === 'confirmed');

  return (
    <div className="space-y-6">
      {/* Officer Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-600 flex items-center justify-center text-white text-xl font-black shadow-md shadow-pink-200">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">
              ฝ่ายบริการวิชาการและบัณฑิตศึกษา (Graduate School Executive Cockpit)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              ศูนย์ควบคุมการบริหารจัดการกระบวนการวิทยานิพนธ์ และการจัดสรรห้องประชุมคณะ
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('rooms')}
          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-xl shadow transition-all flex items-center space-x-1.5"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>จัดการห้องประชุมและห้องสอบ</span>
        </button>
      </div>

      {/* 4 Key Executive KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            นิสิตระดับบัณฑิตศึกษา
          </div>
          <div className="text-2xl font-black text-slate-800">{students.length} คน</div>
          <p className="text-[10px] text-slate-400">
            ป.โท {masterStudents} คน • ป.เอก {phdStudents} คน
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            ระยะเวลาสำเร็จการศึกษาเฉลี่ย (Time-to-Degree)
          </div>
          <div className="text-2xl font-black text-pink-600">2.2 ปี</div>
          <p className="text-[10px] text-emerald-600 font-semibold">
            เร็วขึ้นกว่าเป้าหมาย 0.4 ปี (KPI ผ่านเกณฑ์)
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            หัวข้อผ่านการอนุมัติ
          </div>
          <div className="text-2xl font-black text-emerald-600">{approvedTopics} หัวข้อ</div>
          <p className="text-[10px] text-slate-400">
            รอการพิจารณาอีก {pendingTopics} หัวข้อ
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            การใช้ห้องประชุม/สอบ
          </div>
          <div className="text-2xl font-black text-purple-600">{activeBookings.length} นัดหมาย</div>
          <p className="text-[10px] text-slate-400">
            จากห้องทั้งหมด {rooms.length} ห้องในสังกัดคณะ
          </p>
        </div>
      </div>

      {/* Middle Section: QA / Accreditation & Room Schedule Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QA Compliance & Publications */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 flex items-center">
              <Award className="w-4 h-4 text-pink-600 mr-1.5" />
              ดัชนีประกันคุณภาพการศึกษา (QA & OBE Metrics)
            </h3>
            <span className="text-xs font-bold text-emerald-600">เกณฑ์ AUN-QA</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>อัตราการตีพิมพ์ในวารสารระดับนานาชาติ (Scopus/WoS)</span>
                <span className="text-pink-600 font-bold">88%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-pink-600 h-2 rounded-full w-[88%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>ความถูกต้องของกระบวนการอนุมัติ 4 ชั้น (Zero Paper Drop)</span>
                <span className="text-emerald-600 font-bold">100%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-2 rounded-full w-[100%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>อัตราการส่งออกเล่มสู่คลังปัญญา (IR Deposit) ตรงกำหนด</span>
                <span className="text-purple-600 font-bold">95%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-2 rounded-full w-[95%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Room Utilization & Quick Action */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 flex items-center">
              <Calendar className="w-4 h-4 text-pink-600 mr-1.5" />
              ภาพรวมการจองห้องประชุมและห้องสอบ
            </h3>
            <button
              onClick={() => onNavigateTab('rooms')}
              className="text-xs text-pink-600 hover:underline font-semibold"
            >
              ดูปฏิทินเต็ม
            </button>
          </div>

          <div className="space-y-2.5">
            {activeBookings.slice(0, 4).map((sch) => (
              <div
                key={sch.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-800">{sch.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {sch.scheduledDate} ({sch.startTime} - {sch.endTime} น.) • {sch.roomName}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
