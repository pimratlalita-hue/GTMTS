import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DefensePrerequisites } from '../../types';
import { CheckCircle2, XCircle, AlertTriangle, FileText, Award, BookOpen } from 'lucide-react';

interface FinalDefenseModalProps {
  onScheduleDefenseClick: () => void;
}

export const FinalDefenseSection: React.FC<FinalDefenseModalProps> = ({ onScheduleDefenseClick }) => {
  const { prerequisites, updatePrerequisites, currentUser, students } = useApp();

  const activeStudentId = currentUser.role === 'student' ? currentUser.id : (students[0]?.id || 'std-01');
  const activeStudent = students.find((s) => s.id === activeStudentId);

  const currentPrereq = prerequisites.find((p) => p.studentId === activeStudentId) || {
    studentId: activeStudentId,
    englishProficiencyPassed: false,
    englishTestName: 'CU-TEP',
    englishScore: 0,
    proposalExamPassed: true,
    publicationPassed: false,
    isEligibleForDefense: false
  };

  const [englishPassed, setEnglishPassed] = useState(currentPrereq.englishProficiencyPassed);
  const [englishTest, setEnglishTest] = useState(currentPrereq.englishTestName || 'CU-TEP');
  const [englishScore, setEnglishScore] = useState(currentPrereq.englishScore || 75);
  const [publicationPassed, setPublicationPassed] = useState(currentPrereq.publicationPassed);
  const [journalName, setJournalName] = useState(currentPrereq.publicationDetails?.journalName || 'IEEE Access');
  const [paperTitle, setPaperTitle] = useState(currentPrereq.publicationDetails?.paperTitle || 'Novel AI Approach');

  const isEligible = englishPassed && currentPrereq.proposalExamPassed && publicationPassed;

  const handleSavePrereq = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: DefensePrerequisites = {
      studentId: activeStudentId,
      englishProficiencyPassed: englishPassed,
      englishTestName: englishTest,
      englishScore,
      proposalExamPassed: currentPrereq.proposalExamPassed,
      publicationPassed,
      publicationDetails: {
        journalName,
        paperTitle,
        tier: 'Scopus Q1',
        publishedDate: new Date().toISOString().slice(0, 10),
        doiOrUrl: '10.1109/ACCESS.2026.xxxx'
      },
      isEligibleForDefense: isEligible
    };
    updatePrerequisites(updated);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center">
            <Award className="w-4 h-4 text-pink-600 mr-1.5" />
            การตรวจสอบเงื่อนไขก่อนขอสอบปากเปล่าขั้นสุดท้าย (Pre-requisite Check)
          </h3>
          <p className="text-xs text-slate-500">
            ระบบตรวจสอบความถูกต้องตามระเบียบบัณฑิตวิทยาลัยแบบอัตโนมัติสำหรับ {activeStudent?.fullName}
          </p>
        </div>

        <div>
          {isEligible ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> ผ่านเกณฑ์ขอสอบจบครบถ้วน
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" /> ยังไม่ผ่านเกณฑ์บางรายการ
            </span>
          )}
        </div>
      </div>

      {/* 3 Prerequisite Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Requirement 1: English Proficiency */}
        <div
          className={`p-4 rounded-xl border flex flex-col justify-between ${
            englishPassed ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700">1. เกณฑ์ภาษาอังกฤษ</span>
              {englishPassed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-600" />
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              แบบทดสอบ {englishTest} (คะแนน: {englishScore})
            </p>
            <p className="text-[11px] font-semibold text-slate-700 mt-1">
              {englishPassed ? 'ผ่านเกณฑ์มาตรฐานบัณฑิตศึกษา' : 'ยังไม่ผ่านเกณฑ์ขั้นต่ำ'}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200/60 text-right">
            <label className="text-[10px] text-slate-500 cursor-pointer inline-flex items-center">
              <input
                type="checkbox"
                checked={englishPassed}
                onChange={(e) => setEnglishPassed(e.target.checked)}
                className="w-3.5 h-3.5 text-pink-600 rounded mr-1"
              />
              ปรับสถานะผ่านเกณฑ์
            </label>
          </div>
        </div>

        {/* Requirement 2: Proposal Exam Passed */}
        <div
          className={`p-4 rounded-xl border flex flex-col justify-between ${
            currentPrereq.proposalExamPassed
              ? 'bg-emerald-50/40 border-emerald-200'
              : 'bg-rose-50/40 border-rose-200'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700">2. ผ่านการสอบเค้าโครง</span>
              {currentPrereq.proposalExamPassed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-600" />
              )}
            </div>
            <p className="text-[11px] text-slate-500">ผ่านการอนุมัติเค้าโครงวิทยานิพนธ์เรียบร้อย</p>
            <p className="text-[11px] font-semibold text-emerald-700 mt-1">
              ผลการประเมิน: ผ่าน (Passed)
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200/60 text-right">
            <span className="text-[10px] text-slate-400">บันทึกอัตโนมัติจากระบบ</span>
          </div>
        </div>

        {/* Requirement 3: Academic Publication */}
        <div
          className={`p-4 rounded-xl border flex flex-col justify-between ${
            publicationPassed ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700">3. ตีพิมพ์บทความวิจัย</span>
              {publicationPassed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-600" />
              )}
            </div>
            <p className="text-[11px] text-slate-500 truncate">{journalName}</p>
            <p className="text-[11px] font-semibold text-slate-700 mt-1">
              {publicationPassed ? 'มีหนังสือตอบรับตีพิมพ์ (Accepted)' : 'ยังไม่มีบทความตีพิมพ์'}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200/60 text-right">
            <label className="text-[10px] text-slate-500 cursor-pointer inline-flex items-center">
              <input
                type="checkbox"
                checked={publicationPassed}
                onChange={(e) => setPublicationPassed(e.target.checked)}
                className="w-3.5 h-3.5 text-pink-600 rounded mr-1"
              />
              ปรับสถานะมีเปเปอร์
            </label>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-slate-100 gap-3">
        <button
          onClick={handleSavePrereq}
          className="text-xs text-slate-600 hover:text-pink-700 font-semibold underline"
        >
          บันทึกการปรับปรุงข้อมูลคุณสมบัติ
        </button>

        <button
          onClick={onScheduleDefenseClick}
          disabled={!isEligible}
          className="w-full sm:w-auto px-5 py-2.5 bg-pink-600 hover:bg-pink-700 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold text-xs rounded-xl shadow transition-all transform active:scale-95 flex items-center justify-center space-x-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>ยื่นคำร้อง & จองห้องสอบปากเปล่าขั้นสุดท้าย</span>
        </button>
      </div>
    </div>
  );
};
