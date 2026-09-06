import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  Sparkles,
  Users,
  ChevronDown,
  ShieldCheck,
  Building2,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { ProjectorModeToggle } from './ProjectorModeToggle';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiAssistant
}) => {
  const { currentRole, currentUser, switchRole, students, advisors } = useApp();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const rolesList: { role: UserRole; title: string; subtitle: string; icon: any }[] = [
    { role: 'student', title: 'นิสิต (Student)', subtitle: 'ยื่นหัวข้อ, จองห้องสอบ, บันทึกการพบ', icon: GraduationCap },
    { role: 'advisor', title: 'อาจารย์ที่ปรึกษา (Advisor)', subtitle: 'ตรวจโควตา, อนุมัติหัวข้อ, จองห้องประชุม', icon: Users },
    { role: 'committee', title: 'กรรมการสอบ (Committee)', subtitle: 'ประเมินผลสอบเค้าโครง/ปากเปล่า', icon: FileCheck },
    { role: 'officer', title: 'เจ้าหน้าที่บัณฑิตวิทยาลัย (Officer)', subtitle: 'จัดสรรห้อง, ตรวจสอบคุณสมบัติ, สถิติ', icon: Building2 },
    { role: 'admin', title: 'ผู้ดูแลระบบ (Admin)', subtitle: 'จัดการข้อมูล, สำรอง/กู้คืน JSON, รีเซ็ตระบบ', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Bar */}
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-600 to-rose-700 flex items-center justify-center text-white shadow-md shadow-pink-200">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-rose-600">
                GTMTS
              </span>
              <span className="text-xs px-2 py-0.5 font-semibold bg-pink-100 text-pink-700 rounded-full">
                Faculty Room & Thesis OS
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              ระบบบริหารวิทยานิพนธ์ & จองห้องประชุมคณะ
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5">
          {/* Gemini AI Assistant Button */}
          <button
            onClick={onOpenAiAssistant}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all transform active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span className="hidden sm:inline">Gemini AI Assistant</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Projector Toggle */}
          <ProjectorModeToggle />

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-lg text-xs font-semibold text-slate-700 transition-colors border border-slate-200"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{rolesList.find(r => r.role === currentRole)?.title}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  สลับบทบาทจำลอง (RBAC Simulation)
                </div>
                {rolesList.map((item) => {
                  const Icon = item.icon;
                  const isCurrent = item.role === currentRole;
                  return (
                    <button
                      key={item.role}
                      onClick={() => {
                        switchRole(item.role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 flex items-start space-x-2.5 transition-colors ${
                        isCurrent ? 'bg-pink-50 text-pink-900 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mt-0.5 ${isCurrent ? 'text-pink-600' : 'text-slate-400'}`} />
                      <div>
                        <div className="text-xs font-medium">{item.title}</div>
                        <div className="text-[10px] text-slate-500">{item.subtitle}</div>
                      </div>
                    </button>
                  );
                })}

                {/* Switch specific student/advisor if currentRole matches */}
                {currentRole === 'student' && (
                  <div className="mt-2 pt-2 border-t border-slate-100 px-3">
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">
                      เลือกจำลองนิสิตคนอื่น:
                    </label>
                    <select
                      value={currentUser.id}
                      onChange={(e) => switchRole('student', e.target.value)}
                      className="w-full text-xs p-1.5 border border-slate-200 rounded-md bg-slate-50 text-slate-700"
                    >
                      {students.map((std) => (
                        <option key={std.id} value={std.id}>
                          {std.fullName} ({std.studentId})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {currentRole === 'advisor' && (
                  <div className="mt-2 pt-2 border-t border-slate-100 px-3">
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">
                      เลือกจำลองอาจารย์ท่านอื่น:
                    </label>
                    <select
                      value={currentUser.id}
                      onChange={(e) => switchRole('advisor', e.target.value)}
                      className="w-full text-xs p-1.5 border border-slate-200 rounded-md bg-slate-50 text-slate-700"
                    >
                      {advisors.map((adv) => (
                        <option key={adv.id} value={adv.id}>
                          {adv.fullName} (โควตา: {adv.currentStudentCount}/{adv.maxStudentQuota})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="max-w-5xl mx-auto px-4 border-t border-slate-100">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-1.5 text-xs font-medium text-slate-600 no-scrollbar">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-pink-600 text-white font-semibold shadow-sm'
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            แดชบอร์ด ({currentRole})
          </button>

          {/* Unified Meeting & Exam Room Reservation Tab */}
          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'rooms'
                ? 'bg-pink-600 text-white font-semibold shadow-sm'
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>ระบบจองห้องประชุมและห้องสอบคณะ</span>
          </button>

          {/* Biometrics & Attendance Tab */}
          <button
            onClick={() => setActiveTab('biometrics')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'biometrics'
                ? 'bg-pink-600 text-white font-semibold shadow-sm'
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>สแกนใบหน้า & เช็คชื่อ (PDPA)</span>
          </button>

          {/* Thesis Workflow Tab */}
          <button
            onClick={() => setActiveTab('thesis-workflow')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'thesis-workflow'
                ? 'bg-pink-600 text-white font-semibold shadow-sm'
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>กระบวนการวิทยานิพนธ์</span>
          </button>

          {/* Admin / System Management */}
          <button
            onClick={() => setActiveTab('system-admin')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'system-admin'
                ? 'bg-pink-600 text-white font-semibold shadow-sm'
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>สำรองข้อมูล & รีเซ็ตระบบ</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
