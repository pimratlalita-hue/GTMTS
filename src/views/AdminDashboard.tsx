import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Download,
  Upload,
  RefreshCcw,
  Users,
  AlertTriangle,
  CheckCircle2,
  FileCode,
  Database
} from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const AdminDashboard: React.FC = () => {
  const {
    exportDataJSON,
    importDataJSON,
    factoryReset,
    advisors,
    students,
    rooms,
    topicProposals,
    examSchedules
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importDataJSON(content);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTriggerImport = () => {
    fileInputRef.current?.click();
  };

  const handleConfirmReset = () => {
    factoryReset();
    setResetModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Admin Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">
              ผู้ดูแลระบบเทคโนโลยีสารสนเทศ (System Administrator & Data Ops)
            </h2>
            <p className="text-xs text-slate-500">
              จัดการข้อมูลทั้งระบบ, สำรองและกู้คืนข้อมูล JSON, ตรวจสอบความถูกต้องของ Schema, และคืนค่ามาตรฐานโรงงาน
            </p>
          </div>
        </div>
      </div>

      {/* Backup & Restore Action Station */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Export JSON */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-3">
              <Download className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">ส่งออกข้อมูลทั้งระบบ (JSON Export)</h4>
            <p className="text-xs text-slate-500 mt-1">
              ดาวน์โหลดไฟล์ `gtmts_backup.json` เพื่อสำรองสถานะปัจจุบันทั้งหมด (พกพาข้อมูลได้ 100%)
            </p>
          </div>

          <button
            onClick={exportDataJSON}
            className="w-full py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>ดาวน์โหลด Backup JSON</span>
          </button>
        </div>

        {/* Import JSON */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Upload className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">นำเข้าข้อมูลสำรอง (JSON Import)</h4>
            <p className="text-xs text-slate-500 mt-1">
              กู้คืนสถานะของระบบจากไฟล์ JSON พร้อมการตรวจสอบความถูกต้องของ Schema
            </p>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,application/json"
            className="hidden"
          />

          <button
            onClick={handleTriggerImport}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>เลือกไฟล์ JSON เพื่อนำเข้า</span>
          </button>
        </div>

        {/* Factory Reset */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <RefreshCcw className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-rose-800">ล้างข้อมูลทั้งระบบ (One-Click Factory Reset)</h4>
            <p className="text-xs text-slate-500 mt-1">
              ล้างข้อมูลใน LocalStorage ทั้งหมด และคืนสถานะสู่ชุดข้อมูลตั้งต้น (Seed Data)
            </p>
          </div>

          <button
            onClick={() => setResetModalOpen(true)}
            className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>รีเซ็ตข้อมูลทั้งระบบ</span>
          </button>
        </div>
      </div>

      {/* Database Entity Status Summary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center">
          <Database className="w-4 h-4 text-pink-600 mr-1.5" />
          สรุปจำนวนระเบียนข้อมูลในหน่วยความจำ (Client Data Entities)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xl font-black text-slate-800">{students.length}</div>
            <div className="text-[11px] text-slate-500">นักศึกษา (Students)</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xl font-black text-slate-800">{advisors.length}</div>
            <div className="text-[11px] text-slate-500">อาจารย์ที่ปรึกษา</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xl font-black text-slate-800">{rooms.length}</div>
            <div className="text-[11px] text-slate-500">ห้องประชุม/สอบ</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xl font-black text-slate-800">{topicProposals.length}</div>
            <div className="text-[11px] text-slate-500">คำร้องเสนอหัวข้อ</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xl font-black text-slate-800">{examSchedules.length}</div>
            <div className="text-[11px] text-slate-500">นัดหมายการจองห้อง</div>
          </div>
        </div>
      </div>

      {/* Advisor Quota Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center">
          <Users className="w-4 h-4 text-pink-600 mr-1.5" />
          การตรวจสอบและกำกับดูแลโควตาอาจารย์ที่ปรึกษา (Advisor Quotas)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100">
                <th className="pb-2 font-semibold">ชื่ออาจารย์ที่ปรึกษา</th>
                <th className="pb-2 font-semibold">ภาควิชา</th>
                <th className="pb-2 font-semibold text-center">นักศึกษาในความดูแล</th>
                <th className="pb-2 font-semibold text-center">โควตาสูงสุด</th>
                <th className="pb-2 font-semibold text-right">สถานะโควตา</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {advisors.map((adv) => {
                const isFull = adv.currentStudentCount >= adv.maxStudentQuota;
                return (
                  <tr key={adv.id} className="hover:bg-slate-50">
                    <td className="py-2.5 font-bold text-slate-800">{adv.fullName}</td>
                    <td className="py-2.5 text-slate-500">{adv.department}</td>
                    <td className="py-2.5 text-center font-semibold text-slate-700">
                      {adv.currentStudentCount} คน
                    </td>
                    <td className="py-2.5 text-center font-bold text-slate-700">
                      {adv.maxStudentQuota} คน
                    </td>
                    <td className="py-2.5 text-right">
                      {isFull ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                          เต็มโควตา
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          ว่าง (รับได้อีก {adv.maxStudentQuota - adv.currentStudentCount} คน)
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal for Reset */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="ยืนยันการล้างข้อมูลทั้งระบบ (Factory Reset)"
        subtitle="คำเตือน: การกระทำนี้ไม่สามารถย้อนคืนได้"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              ข้อมูลการจองห้อง, หัวข้อวิทยานิพนธ์, บันทึกการเข้าพบ, และประวัติการเช็คชื่อทั้งหมดที่ถูกสร้างขึ้นจะถูกลบ และแทนที่ด้วยชุดข้อมูลเริ่มต้นของระบบ (Seed Data)
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setResetModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleConfirmReset}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg shadow-sm"
            >
              ยืนยันล้างข้อมูล
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
