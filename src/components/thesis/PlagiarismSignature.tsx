import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ShieldCheck, FileCheck, Upload, ExternalLink, Download } from 'lucide-react';
import { FinalThesisArchive } from '../../types';

export const PlagiarismSignatureView: React.FC = () => {
  const { finalArchives, archiveFinalThesis, currentUser } = useApp();
  const [similarity, setSimilarity] = useState<number>(8);
  const [tool, setTool] = useState<'Turnitin' | 'Akarawisut'>('Turnitin');
  const [isArchived, setIsArchived] = useState<boolean>(finalArchives.length > 0);

  const activeArchive: FinalThesisArchive = finalArchives[0] || {
    id: 'arc-01',
    thesisId: 'the-01',
    finalDocumentFile: '6670012321_Thanaphon_Complete_Thesis.pdf',
    plagiarism: {
      tool: 'Turnitin',
      similarityPercentage: 8,
      maxAllowedPercentage: 20,
      checkedDate: '2026-03-01',
      isPassed: true
    },
    approvalSheetSignatures: [
      { signerId: 'com-01', signerName: 'ศ.ดร.วิโรจน์ พิริยะกุล', role: 'ประธานกรรมการสอบ', signedAt: '2026-03-02T10:00:00Z', signatureChecksum: 'SIG-VERIFIED-7FA9C1' },
      { signerId: 'adv-01', signerName: 'รศ.ดร.สมชาย ประเสริฐวิทย์', role: 'อาจารย์ที่ปรึกษาหลัก', signedAt: '2026-03-02T11:15:00Z', signatureChecksum: 'SIG-VERIFIED-8BB2D4' },
      { signerId: 'off-01', signerName: 'นางสาวรัชนี เจริญผล', role: 'นายทะเบียนบัณฑิตศึกษา', signedAt: '2026-03-03T15:30:00Z', signatureChecksum: 'SIG-VERIFIED-9EE3F5' }
    ],
    institutionalRepositoryId: 'CHULA-IR-THESIS-2026-0042',
    archivedAt: '2026-03-03T16:00:00Z'
  };

  const handleSimulateArchive = () => {
    const newArc: FinalThesisArchive = {
      id: `arc-${Date.now().toString().slice(-6)}`,
      thesisId: 'the-01',
      finalDocumentFile: `${currentUser.username || 'student'}_Final_Complete.pdf`,
      plagiarism: {
        tool,
        similarityPercentage: similarity,
        maxAllowedPercentage: 20,
        checkedDate: new Date().toISOString().slice(0, 10),
        isPassed: similarity <= 20
      },
      approvalSheetSignatures: [
        { signerId: 'adv-01', signerName: 'รศ.ดร.สมชาย ประเสริฐวิทย์', role: 'อาจารย์ที่ปรึกษา', signedAt: new Date().toISOString(), signatureChecksum: 'SIG-VERIFIED-E91B22' },
        { signerId: 'com-01', signerName: 'ศ.ดร.วิโรจน์ พิริยะกุล', role: 'ประธานกรรมการสอบ', signedAt: new Date().toISOString(), signatureChecksum: 'SIG-VERIFIED-FA44C9' }
      ],
      institutionalRepositoryId: `ENG-CU-IR-${Date.now().toString().slice(-4)}`,
      archivedAt: new Date().toISOString()
    };
    archiveFinalThesis(newArc);
    setIsArchived(true);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-800 flex items-center">
          <FileCheck className="w-4 h-4 text-pink-600 mr-1.5" />
          การตรวจรับเล่มสมบูรณ์ คัดลอกวรรณกรรม และคลังปัญญา (Archiving)
        </h3>
        <p className="text-xs text-slate-500">
          ตรวจสอบค่าความซ้ำซ้อนของเนื้อหา (Similarity Index), หน้าลงนาม Approval Sheet, และส่งออกคลังปัญญาสถาบัน
        </p>
      </div>

      {/* Grid of 2 columns: Plagiarism check & Digital Signatures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left: Plagiarism Check */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              ผลการตรวจสอบการคัดลอก (Plagiarism Report)
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              ผ่านเกณฑ์ (เกณฑ์ไม่เกิน 20%)
            </span>
          </div>

          <div className="flex items-center space-x-4 bg-white p-3 rounded-lg border border-slate-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-500 flex flex-col items-center justify-center">
              <span className="text-lg font-black text-emerald-700 leading-none">
                {activeArchive.plagiarism.similarityPercentage}%
              </span>
              <span className="text-[9px] text-slate-400">Similarity</span>
            </div>
            <div className="text-xs space-y-1 flex-1">
              <div>
                <strong>เครื่องมือตรวจ: </strong>
                {activeArchive.plagiarism.tool}
              </div>
              <div className="text-slate-500 text-[11px]">
                วันที่ตรวจสอบ: {activeArchive.plagiarism.checkedDate}
              </div>
              <div className="text-emerald-600 font-semibold text-[11px] flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1" /> ไม่พบการคัดลอกที่ผิดมาตรฐาน
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center space-x-2">
            <button
              onClick={handleSimulateArchive}
              className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center justify-center space-x-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>อัปโหลดเล่มฉบับสมบูรณ์ & รันผล Plagiarism</span>
            </button>
          </div>
        </div>

        {/* Right: Digital Signature Approval Sheet */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              หน้าลงนามอนุมัติเล่ม (Approval Sheet Signatures)
            </span>
            <span className="text-[11px] text-slate-400">Digital Signatures</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2 text-xs">
            {activeArchive.approvalSheetSignatures.map((sig, idx) => (
              <div key={idx} className="flex items-center justify-between pb-2 border-b border-slate-100 last:border-none last:pb-0">
                <div>
                  <div className="font-bold text-slate-800">{sig.signerName}</div>
                  <div className="text-[10px] text-slate-500">{sig.role}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold block">
                    {sig.signatureChecksum}
                  </span>
                  <span className="text-[9px] text-slate-400">
                    {new Date(sig.signedAt).toLocaleDateString('th-TH')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Repository Badge */}
          {activeArchive.institutionalRepositoryId && (
            <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-lg text-xs flex items-center justify-between">
              <div>
                <div className="font-bold text-purple-900">รหัสคลังปัญญาสถาบัน (Institutional Repository)</div>
                <div className="font-mono text-[11px] text-purple-700">{activeArchive.institutionalRepositoryId}</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-200 text-purple-800">
                Archived
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
