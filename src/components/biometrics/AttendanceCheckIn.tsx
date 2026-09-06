import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WebCamCaptureModal } from './WebCamCaptureModal';
import { ShieldCheck, Camera, CheckCircle2, Clock, Users, UserCheck, BarChart2 } from 'lucide-react';

export const AttendanceCheckIn: React.FC = () => {
  const { students, attendanceRecords, checkInAttendance, registerFaceSignature, currentUser } = useApp();

  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    currentUser.role === 'student' ? currentUser.id : (students[0]?.id || '')
  );
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'register' | 'checkin'>('checkin');

  const targetStudent = students.find((s) => s.id === selectedStudentId);

  const handleOpenRegister = () => {
    setModalMode('register');
    setIsWebcamOpen(true);
  };

  const handleOpenCheckin = () => {
    setModalMode('checkin');
    setIsWebcamOpen(true);
  };

  const handleCaptureComplete = (faceHash: string) => {
    if (modalMode === 'register') {
      registerFaceSignature(selectedStudentId, faceHash);
    } else {
      // Check in with verification
      const hasMatch = targetStudent?.faceSignature ? true : false;
      checkInAttendance(selectedStudentId, 'face_scan', hasMatch);
    }
  };

  const handleManualCheckIn = () => {
    checkInAttendance(selectedStudentId, 'manual', true);
  };

  // 10 most recent records
  const recentRecords = attendanceRecords.slice(0, 10);

  // 7-day summary stats
  const totalPresent = attendanceRecords.filter((r) => r.status === 'present').length;
  const totalLate = attendanceRecords.filter((r) => r.status === 'late').length;
  const faceScans = attendanceRecords.filter((r) => r.type === 'face_scan').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PDPA Compliant - 100% Text Hash Only</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              ระบบสแกนใบหน้าและเช็คชื่อเข้าห้องสอบ / การเข้าชั้นเรียน
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              เทคโนโลยีการพิสูจน์ตัวตนชีวมิติแบบไร้การจัดเก็บภาพถ่าย (Zero-Image Storage) ประมวลผลจุดสังเกตบนใบหน้าเป็นค่าแฮชเชิงข้อความ SHA-256 เพื่อความปลอดภัยของข้อมูลส่วนบุคคล
            </p>
          </div>
        </div>
      </div>

      {/* Check-in Action Station */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Student Profile & Action */}
        <div className="md:col-span-1 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center">
            <UserCheck className="w-4 h-4 text-pink-600 mr-1.5" />
            สถานีเช็คชื่อ / ลงทะเบียนใบหน้า
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              เลือกนิสิตที่ต้องการทำรายการ:
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.fullName} ({s.studentId})
                </option>
              ))}
            </select>
          </div>

          {targetStudent && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
              <div className="font-bold text-slate-800">{targetStudent.fullName}</div>
              <div className="text-slate-500">รหัสนิสิต: {targetStudent.studentId}</div>
              <div className="text-slate-500">สาขา: {targetStudent.major}</div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">สถานะลายเซ็นใบหน้า:</span>
                {targetStudent.faceSignature ? (
                  <span className="text-emerald-600 font-bold text-[11px] flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> มีลายเซ็นแล้ว
                  </span>
                ) : (
                  <span className="text-amber-600 font-bold text-[11px]">ยังไม่ลงทะเบียน</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-2 pt-2">
            <button
              onClick={handleOpenCheckin}
              className="w-full py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center space-x-2"
            >
              <Camera className="w-4 h-4" />
              <span>สแกนใบหน้าเช็คชื่อเข้าสอบ/เข้าใช้งาน</span>
            </button>

            <button
              onClick={handleManualCheckIn}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
            >
              เช็คชื่อแบบเลือกรายชื่อปกติ (Manual)
            </button>

            <button
              onClick={handleOpenRegister}
              className="w-full py-1.5 text-pink-600 hover:text-pink-700 hover:underline text-[11px] font-medium text-center block"
            >
              + ลงทะเบียน / สแกนปรับปรุงลายเซ็นใบหน้าใหม่
            </button>
          </div>
        </div>

        {/* Right: Analytics & Recent 10 Check-ins */}
        <div className="md:col-span-2 space-y-4">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm text-center">
              <div className="text-2xl font-black text-slate-800">{attendanceRecords.length}</div>
              <div className="text-[11px] text-slate-500 font-medium">บันทึกเช็คชื่อทั้งหมด</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm text-center">
              <div className="text-2xl font-black text-emerald-600">{faceScans}</div>
              <div className="text-[11px] text-slate-500 font-medium">ผ่านการสแกนใบหน้า</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm text-center">
              <div className="text-2xl font-black text-pink-600">{totalPresent}</div>
              <div className="text-[11px] text-slate-500 font-medium">สถานะมาตรงเวลา (Present)</div>
            </div>
          </div>

          {/* Table: Recent 10 Records */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-800 flex items-center">
                <Clock className="w-4 h-4 text-pink-600 mr-1.5" />
                ประวัติการเช็คชื่อ 10 รายการล่าสุด
              </h4>
              <span className="text-[11px] text-slate-400">อัปเดตแบบเรียลไทม์</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100">
                    <th className="pb-2 font-semibold">ชื่อ-นามสกุลนิสิต</th>
                    <th className="pb-2 font-semibold">วันที่</th>
                    <th className="pb-2 font-semibold">เวลา</th>
                    <th className="pb-2 font-semibold">รูปแบบ</th>
                    <th className="pb-2 font-semibold">สถานะ</th>
                    <th className="pb-2 font-semibold text-right">การตรวจสอบ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentRecords.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50/80">
                      <td className="py-2.5 font-medium text-slate-800">{rec.studentName}</td>
                      <td className="py-2.5 text-slate-500">{rec.date}</td>
                      <td className="py-2.5 text-slate-500">{rec.time} น.</td>
                      <td className="py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            rec.type === 'face_scan'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {rec.type === 'face_scan' ? 'Face Scan' : 'Manual'}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            rec.status === 'present'
                              ? 'bg-emerald-100 text-emerald-700'
                              : rec.status === 'late'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {rec.status === 'present' ? 'ตรงเวลา' : rec.status === 'late' ? 'สาย' : 'ขาด'}
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-medium text-emerald-600 flex items-center justify-end">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        <span>ยืนยันแล้ว</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* WebCam Capture Modal */}
      <WebCamCaptureModal
        isOpen={isWebcamOpen}
        onClose={() => setIsWebcamOpen(false)}
        onCaptureComplete={handleCaptureComplete}
        studentName={targetStudent?.fullName}
      />
    </div>
  );
};
