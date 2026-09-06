import React from 'react';
import { Modal } from './Modal';
import { TopicProposal, ExamSchedule } from '../../types';
import { Printer, Download, Award, CheckCircle2 } from 'lucide-react';

interface PrintableApprovalSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal?: TopicProposal | null;
  schedule?: ExamSchedule | null;
}

export const PrintableApprovalSheetModal: React.FC<PrintableApprovalSheetModalProps> = ({
  isOpen,
  onClose,
  proposal,
  schedule
}) => {
  const handlePrint = () => {
    window.print();
  };

  const titleTh = proposal?.titleTh || schedule?.title || 'การพัฒนาระบบตรวจจับความผิดปกติในภาพถ่ายทางการแพทย์ด้วยการเรียนรู้เชิงลึกแบบไฮบริด';
  const titleEn = proposal?.titleEn || 'Development of Medical Image Anomaly Detection System Using Hybrid Deep Learning';
  const studentName = proposal?.studentName || schedule?.studentName || 'นายธนพล สุขสวัสดิ์';
  const advisorName = proposal?.majorAdvisorName || 'รศ.ดร.สมชาย ประเสริฐวิทย์';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="พิมพ์เอกสารราชการ: หน้าอนุมัติผลการสอบวิทยานิพนธ์ (Official Approval Sheet)"
      subtitle="แบบฟอร์มทางการระดับบัณฑิตศึกษา คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย"
      maxWidth="2xl"
    >
      <div className="space-y-4">
        {/* Action bar */}
        <div className="flex justify-end space-x-2 pb-2 border-b border-slate-100">
          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs rounded-xl shadow transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>สั่งพิมพ์เอกสาร (Print / Save as PDF)</span>
          </button>
        </div>

        {/* Printable Paper Canvas (A4 Aspect Ratio with Traditional Border) */}
        <div className="bg-white border-2 border-slate-300 p-8 rounded-xl shadow-inner text-slate-900 font-serif leading-relaxed text-xs space-y-6">
          {/* Header */}
          <div className="text-center space-y-1 pb-4 border-b-2 border-slate-800">
            <div className="w-12 h-12 mx-auto mb-1 bg-pink-700 rounded-full flex items-center justify-center text-white font-black text-xl font-sans">
              CU
            </div>
            <h1 className="text-base font-bold tracking-tight uppercase">
              จุฬาลงกรณ์มหาวิทยาลัย (Chulalongkorn University)
            </h1>
            <h2 className="text-sm font-semibold text-slate-700">
              คณะวิศวกรรมศาสตร์ — สำนักงานบริการวิชาการและบัณฑิตศึกษา
            </h2>
            <p className="text-[11px] text-slate-500 font-sans">
              ใบรายงานผลการสอบและการอนุมัติเล่มวิทยานิพนธ์ (Thesis Approval Sheet)
            </p>
          </div>

          {/* Body Content */}
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2">
              <span className="font-bold">ชื่อวิทยานิพนธ์ (ภาษาไทย):</span>
              <span className="col-span-3 font-sans font-medium text-slate-800">{titleTh}</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <span className="font-bold">Title (English):</span>
              <span className="col-span-3 font-sans italic text-slate-800">{titleEn}</span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-200">
              <span className="font-bold">โดย (By):</span>
              <span className="col-span-3 font-sans">{studentName} (หลักสูตรวิศวกรรมศาสตรมหาบัณฑิต)</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <span className="font-bold">อาจารย์ที่ปรึกษาหลัก:</span>
              <span className="col-span-3 font-sans">{advisorName}</span>
            </div>

            {schedule && (
              <div className="grid grid-cols-4 gap-2">
                <span className="font-bold">วัน-เวลาที่จัดสอบ:</span>
                <span className="col-span-3 font-sans">
                  {schedule.scheduledDate} เวลา {schedule.startTime} - {schedule.endTime} น. ({schedule.roomName})
                </span>
              </div>
            )}
          </div>

          {/* Deliberation Result */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-center space-y-1 font-sans">
            <div className="font-bold text-xs">มติคณะกรรมการสอบ (Committee Deliberation Result)</div>
            <div className="text-emerald-700 font-black text-sm flex items-center justify-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>ผ่านการสอบตามเกณฑ์มาตรฐาน (PASSED WITH HONORS)</span>
            </div>
          </div>

          {/* Signatures Grid */}
          <div className="pt-6 grid grid-cols-2 gap-8 text-center text-[11px] font-sans">
            <div className="space-y-8">
              <div className="font-mono text-[10px] text-slate-400">
                [Digital Signature: SIG-VERIFIED-7FA9C1]
              </div>
              <div className="border-t border-slate-400 pt-1">
                (ศ.ดร.วิโรจน์ พิริยะกุล)
                <div className="text-slate-500 text-[10px]">ประธานคณะกรรมการสอบ</div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="font-mono text-[10px] text-slate-400">
                [Digital Signature: SIG-VERIFIED-8BB2D4]
              </div>
              <div className="border-t border-slate-400 pt-1">
                ({advisorName})
                <div className="text-slate-500 text-[10px]">อาจารย์ที่ปรึกษาวิทยานิพนธ์หลัก</div>
              </div>
            </div>
          </div>

          {/* Official Stamp Footer */}
          <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 font-sans">
            เอกสารนี้ได้รับการรับรองผ่านระบบ Graduate Thesis Management and Tracking System (GTMTS)
            <br />
            วันที่รับรอง: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
    </Modal>
  );
};
