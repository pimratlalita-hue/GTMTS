import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Send, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface TopicProposalFormProps {
  onOpenAiHelper?: (initialTh: string, initialEn: string, initialAbstract: string) => void;
}

export const TopicProposalForm: React.FC<TopicProposalFormProps> = ({ onOpenAiHelper }) => {
  const { advisors, students, currentUser, createTopicProposal } = useApp();

  const [studentId, setStudentId] = useState(
    currentUser.role === 'student' ? currentUser.id : (students[0]?.id || '')
  );
  const [titleTh, setTitleTh] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [abstract, setAbstract] = useState('');
  const [keywordsStr, setKeywordsStr] = useState('');
  const [majorAdvisorId, setMajorAdvisorId] = useState(advisors[0]?.id || '');

  const selectedAdvisor = advisors.find((a) => a.id === majorAdvisorId);
  const isQuotaFull = selectedAdvisor ? selectedAdvisor.currentStudentCount >= selectedAdvisor.maxStudentQuota : false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleTh.trim() || !titleEn.trim() || isQuotaFull) return;

    const keywords = keywordsStr
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    const res = createTopicProposal({
      studentId,
      titleTh,
      titleEn,
      abstract,
      keywords,
      majorAdvisorId
    });

    if (res.success) {
      setTitleTh('');
      setTitleEn('');
      setAbstract('');
      setKeywordsStr('');
    }
  };

  const handleTriggerAi = () => {
    if (onOpenAiHelper) {
      onOpenAiHelper(titleTh, titleEn, abstract);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            แบบฟอร์มยื่นเสนอหัวข้อวิทยานิพนธ์ (Topic & Advisor Proposal)
          </h3>
          <p className="text-xs text-slate-500">
            กรอกข้อมูลหัวข้อทั้ง 2 ภาษา พร้อมระบบตรวจสอบโควตาอาจารย์ที่ปรึกษาแบบเรียลไทม์
          </p>
        </div>

        <button
          type="button"
          onClick={handleTriggerAi}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold rounded-lg border border-purple-200 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>ใช้ Gemini AI ช่วยขัดเกลาหัวข้อ</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Student Selector (for testing or if officer/admin) */}
        {currentUser.role !== 'student' && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              เลือกนิสิตผู้ยื่นคำร้อง:
            </label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.fullName} ({s.studentId}) - {s.major}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Thai Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            ชื่อวิทยานิพนธ์ภาษาไทย <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={titleTh}
            onChange={(e) => setTitleTh(e.target.value)}
            placeholder="เช่น การพัฒนาระบบตรวจจับความผิดปกติในภาพถ่ายทางการแพทย์ด้วยการเรียนรู้เชิงลึกแบบไฮบริด"
            className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>

        {/* English Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            ชื่อวิทยานิพนธ์ภาษาอังกฤษ (English Title in Title Case) <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            placeholder="e.g. Development of Medical Image Anomaly Detection System Using Hybrid Deep Learning"
            className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>

        {/* Advisor Selector with Live Quota indicator */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            อาจารย์ที่ปรึกษาหลัก (Advisor Selection) <span className="text-rose-500">*</span>
          </label>
          <select
            value={majorAdvisorId}
            onChange={(e) => setMajorAdvisorId(e.target.value)}
            className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
          >
            {advisors.map((adv) => {
              const full = adv.currentStudentCount >= adv.maxStudentQuota;
              return (
                <option key={adv.id} value={adv.id} disabled={full}>
                  {adv.fullName} — โควตา: {adv.currentStudentCount}/{adv.maxStudentQuota} คน {full ? '(เต็มโควตา - ไม่สามารถรับเพิ่ม)' : '(ว่าง)'}
                </option>
              );
            })}
          </select>

          {isQuotaFull && (
            <div className="mt-1.5 p-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>อาจารย์ท่านนี้มีนิสิตเต็มโควตาแล้ว กรุณาเลือกอาจารย์ท่านอื่นที่มีโควตาว่าง</span>
            </div>
          )}
        </div>

        {/* Abstract / Concept Note */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            สาระสังเขป / บทคัดย่อย่อ (Concept Note / Abstract)
          </label>
          <textarea
            rows={3}
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            placeholder="สรุปที่มา ความสำคัญ วัตถุประสงค์ และระเบียบวิธีวิจัยโดยสังเขป..."
            className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            คำสำคัญ (Keywords - คั่นด้วยเครื่องหมายจุลภาค ,)
          </label>
          <input
            type="text"
            value={keywordsStr}
            onChange={(e) => setKeywordsStr(e.target.value)}
            placeholder="e.g. Deep Learning, Transformer, Anomaly Detection"
            className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isQuotaFull}
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow transition-all transform active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>ยื่นเสนอหัวข้อวิทยานิพนธ์</span>
          </button>
        </div>
      </form>
    </div>
  );
};
