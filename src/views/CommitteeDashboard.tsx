import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExamSchedule, ExamResultType } from '../types';
import { Award, Calendar, CheckCircle2, Clock, MapPin, Video, FileText, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const CommitteeDashboard: React.FC = () => {
  const { examSchedules, currentUser, bookRoom } = useApp();
  const { showToast } = useToast();

  const [scoringScheduleId, setScoringScheduleId] = useState<string | null>(null);
  const [score, setScore] = useState<number>(90);
  const [result, setResult] = useState<ExamResultType>('passed');
  const [conditions, setConditions] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('2026-04-15');

  // Filter schedules that are exams
  const examItems = examSchedules.filter(
    (s) => s.purposeType === 'thesis_proposal' || s.purposeType === 'thesis_defense'
  );

  const handleOpenScore = (sch: ExamSchedule) => {
    setScoringScheduleId(sch.id);
    setScore(sch.committee?.[0]?.score || 90);
    setResult(sch.result || 'passed');
    setConditions(sch.resultConditions || '');
    setDeadline(sch.revisionDeadline || '2026-04-15');
  };

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scoringScheduleId) return;

    const target = examSchedules.find((s) => s.id === scoringScheduleId);
    if (!target) return;

    const updatedSchedule: ExamSchedule = {
      ...target,
      result,
      resultConditions: result === 'passed_with_conditions' ? conditions : undefined,
      revisionDeadline: result === 'passed_with_conditions' ? deadline : undefined,
      evaluatedAt: new Date().toISOString()
    };

    bookRoom(updatedSchedule, target.id);
    showToast('success', 'บันทึกคะแนนและมติผลการสอบเรียบร้อยแล้ว');
    setScoringScheduleId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
            EC
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">
              คณะกรรมการสอบวิทยานิพนธ์ (Exam Committee Dashboard)
            </h2>
            <p className="text-xs text-slate-500">
              ตรวจสอบเอกสารข้อเสนอวิทยานิพนธ์, เข้าร่วมห้องสอบ (On-site / Online), และลงคะแนนมติผลการสอบ
            </p>
          </div>
        </div>
      </div>

      {/* Exam Schedules List */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center">
          <Calendar className="w-4 h-4 text-pink-600 mr-1.5" />
          รายการสอบที่ได้รับมอบหมาย ({examItems.length} รายการ)
        </h3>

        <div className="divide-y divide-slate-100">
          {examItems.map((sch) => (
            <div
              key={sch.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      sch.purposeType === 'thesis_defense'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-pink-100 text-pink-800'
                    }`}
                  >
                    {sch.purposeType === 'thesis_defense' ? 'สอบปากเปล่าขั้นสุดท้าย' : 'สอบเค้าโครง'}
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm">{sch.title}</h4>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 text-xs text-slate-500">
                  <span className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-pink-600" />
                    {sch.scheduledDate} ({sch.startTime} - {sch.endTime} น.)
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {sch.roomName}
                  </span>
                  {sch.onlineMeetingUrl && (
                    <a
                      href={sch.onlineMeetingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <Video className="w-3.5 h-3.5 mr-1" /> ลิงก์ห้องสอบออนไลน์
                    </a>
                  )}
                </div>

                {sch.result && (
                  <div className="pt-1 flex items-center space-x-2">
                    <span className="text-[11px] text-slate-500">ผลการสอบ:</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        sch.result === 'passed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : sch.result === 'passed_with_conditions'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {sch.result === 'passed'
                        ? 'ผ่าน (Passed)'
                        : sch.result === 'passed_with_conditions'
                        ? 'ผ่านแบบมีเงื่อนไข (Passed with Conditions)'
                        : 'ไม่ผ่าน'}
                    </span>
                    {sch.resultConditions && (
                      <span className="text-[11px] text-slate-600 italic">
                        เงื่อนไข: {sch.resultConditions} (กำหนดส่ง: {sch.revisionDeadline})
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 self-end md:self-center">
                <button
                  onClick={() => handleOpenScore(sch)}
                  className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  {sch.result ? 'แก้ไขผลการสอบ' : 'ลงคะแนน & บันทึกมติ'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scoring Modal / Drawer */}
      {scoringScheduleId && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 border border-slate-100">
            <h3 className="text-base font-bold text-slate-800 mb-1">
              แบบบันทึกผลการสอบและลงคะแนน (Exam Deliberation Sheet)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              บันทึกคะแนนรวมและมติคณะกรรมการสอบวิทยานิพนธ์
            </p>

            <form onSubmit={handleSaveScore} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">คะแนนประเมิน (เต็ม 100)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  required
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">มติผลการสอบ</label>
                <select
                  value={result}
                  onChange={(e) => setResult(e.target.value as ExamResultType)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                >
                  <option value="passed">ผ่าน (Passed)</option>
                  <option value="passed_with_conditions">ผ่านแบบมีเงื่อนไข (Passed with Conditions)</option>
                  <option value="failed">ไม่ผ่าน (Failed)</option>
                </select>
              </div>

              {result === 'passed_with_conditions' && (
                <div className="space-y-3 bg-amber-50 p-3.5 rounded-xl border border-amber-200">
                  <div>
                    <label className="block font-bold text-amber-900 mb-1">
                      เงื่อนไขที่ต้องแก้ไขตามมติคณะกรรมการ
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={conditions}
                      onChange={(e) => setConditions(e.target.value)}
                      placeholder="ระบุจุดที่ต้องปรับแก้ เช่น บทที่ 4 เพิ่มการเปรียบเทียบ..."
                      className="w-full p-2 bg-white border border-amber-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-amber-900 mb-1">
                      กำหนดส่งเล่มฉบับแก้ไข (Revision Deadline)
                    </label>
                    <input
                      type="date"
                      required
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full p-2 bg-white border border-amber-200 rounded-lg"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setScoringScheduleId(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg shadow-sm"
                >
                  บันทึกมติผลการสอบ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
