import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdvisoryMeetingLog as IAdvisoryLog } from '../../types';
import { BookOpen, CheckCircle2, Clock, Plus, Sparkles, User, MessageSquare } from 'lucide-react';
import { generateAdvisoryAdvice } from '../../services/geminiService';

export const AdvisoryMeetingLogView: React.FC = () => {
  const { advisoryLogs, addAdvisoryMeetingLog, confirmAdvisoryMeetingLog, currentUser, students } = useApp();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [meetingDate, setMeetingDate] = useState(new Date().toISOString().slice(0, 10));
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [topicDiscussed, setTopicDiscussed] = useState('');
  const [studentSummary, setStudentSummary] = useState('');
  const [actionItems, setActionItems] = useState('');
  const [confirmComment, setConfirmComment] = useState<{ [id: string]: string }>({});

  const isStudent = currentUser.role === 'student';
  const isAdvisor = currentUser.role === 'advisor' || currentUser.role === 'admin';

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicDiscussed.trim()) return;

    addAdvisoryMeetingLog({
      thesisId: 'the-01',
      studentId: currentUser.id,
      meetingDate,
      durationMinutes,
      topicDiscussed,
      studentSummary,
      actionItemsNextMeeting: actionItems
    });

    setTopicDiscussed('');
    setStudentSummary('');
    setActionItems('');
    setIsFormOpen(false);
  };

  const handleAiSuggestActionItems = async () => {
    if (!topicDiscussed) return;
    const advice = await generateAdvisoryAdvice(studentSummary, topicDiscussed);
    setActionItems(advice.suggestedActionItems.join('\n'));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center">
            <BookOpen className="w-4 h-4 text-pink-600 mr-1.5" />
            สมุดบันทึกการเข้าพบอาจารย์ที่ปรึกษา (Advisory Meeting Logs)
          </h3>
          <p className="text-xs text-slate-500">
            บันทึกการรับคำปรึกษาและแผนงานต่อเนื่อง พร้อมการลงนามรับรองจากอาจารย์ที่ปรึกษา
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isFormOpen ? 'ปิดฟอร์ม' : 'บันทึกการพบอาจารย์ใหม่'}</span>
        </button>
      </div>

      {/* Form Drawer */}
      {isFormOpen && (
        <form
          onSubmit={handleCreateLog}
          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 animate-in fade-in"
        >
          <h4 className="text-xs font-bold text-slate-700 border-b border-slate-100 pb-2">
            กรอกบันทึกการเข้าพบอาจารย์ที่ปรึกษา
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">วันที่เข้าพบ</label>
              <input
                type="date"
                required
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ระยะเวลา (นาที)</label>
              <input
                type="number"
                min={15}
                max={360}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">วาระ / หัวข้อที่ขอคำปรึกษา</label>
            <input
              type="text"
              required
              value={topicDiscussed}
              onChange={(e) => setTopicDiscussed(e.target.value)}
              placeholder="เช่น การเลือกโมเดล Baseline และการรับมือปัญหา Overfitting"
              className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">สาระสำคัญ / ข้อเสนอแนะที่ได้รับจากอาจารย์</label>
            <textarea
              rows={2}
              value={studentSummary}
              onChange={(e) => setStudentSummary(e.target.value)}
              placeholder="สรุปแนวทางที่อาจารย์ให้คำแนะนำ..."
              className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">
                งานที่ต้องส่งในการเข้าพบครั้งถัดไป (Action Items)
              </label>
              <button
                type="button"
                onClick={handleAiSuggestActionItems}
                className="text-[11px] text-purple-600 hover:text-purple-700 font-semibold flex items-center"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                ให้ AI ช่วยร่าง Action Items
              </button>
            </div>
            <textarea
              rows={2}
              value={actionItems}
              onChange={(e) => setActionItems(e.target.value)}
              placeholder="ระบุสิ่งที่ต้องดำเนินการก่อนพบอาจารย์ครั้งต่อไป..."
              className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm"
            >
              บันทึกการพบ
            </button>
          </div>
        </form>
      )}

      {/* List of logs */}
      <div className="space-y-3">
        {advisoryLogs.map((log) => {
          const student = students.find((s) => s.id === log.studentId);
          return (
            <div
              key={log.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm text-slate-800">{log.topicDiscussed}</span>
                  {log.isAdvisorConfirmed ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> ที่ปรึกษารับรองแล้ว
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      <Clock className="w-3 h-3 mr-1" /> รออาจารย์รับรอง
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-500 flex items-center space-x-3">
                  <span>นิสิต: {student?.fullName || log.studentId}</span>
                  <span>วันที่: {log.meetingDate}</span>
                  <span>({log.durationMinutes} นาที)</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1.5 pt-1">
                <p>
                  <strong>สรุปผลการพบ: </strong>
                  {log.studentSummary}
                </p>
                {log.actionItemsNextMeeting && (
                  <p className="text-pink-700 bg-pink-50/70 p-2 rounded-lg font-medium">
                    🎯 <strong>แผนงานงวดถัดไป:</strong> {log.actionItemsNextMeeting}
                  </p>
                )}

                {log.isAdvisorConfirmed && log.advisorComment && (
                  <p className="text-emerald-800 bg-emerald-50/70 p-2 rounded-lg italic">
                    💬 <strong>ความเห็นอาจารย์:</strong> "{log.advisorComment}"
                  </p>
                )}
              </div>

              {/* Advisor Confirmation Section */}
              {!log.isAdvisorConfirmed && isAdvisor && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <input
                    type="text"
                    value={confirmComment[log.id] || ''}
                    onChange={(e) => setConfirmComment({ ...confirmComment, [log.id]: e.target.value })}
                    placeholder="กรอกข้อเสนอแนะเพิ่มเติมให้อาจารย์..."
                    className="w-full sm:flex-1 text-xs p-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                  <button
                    onClick={() =>
                      confirmAdvisoryMeetingLog(
                        log.id,
                        confirmComment[log.id] || 'รับรองบันทึกการเข้าพบตามรายละเอียด'
                      )
                    }
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap"
                  >
                    กดรับรองบันทึกนี้
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
