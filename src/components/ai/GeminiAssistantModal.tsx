import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import {
  refineThesisTitleWithGemini,
  summarizeAbstractWithGemini,
  GeminiRefineTitleResult,
  GeminiSummarizeAbstractResult
} from '../../services/geminiService';
import { Sparkles, Key, CheckCircle2, RefreshCw, Copy, BookOpen } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface GeminiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialThTitle?: string;
  initialEnTitle?: string;
  initialAbstract?: string;
}

export const GeminiAssistantModal: React.FC<GeminiAssistantModalProps> = ({
  isOpen,
  onClose,
  initialThTitle = '',
  initialEnTitle = '',
  initialAbstract = ''
}) => {
  const { geminiApiKey, setGeminiApiKey } = useApp();
  const { showToast } = useToast();

  const [activeAiTab, setActiveAiTab] = useState<'title' | 'summary' | 'key'>('title');

  // Title refinement state
  const [thTitle, setThTitle] = useState(initialThTitle || 'การพัฒนาระบบตรวจจับความผิดปกติในภาพถ่ายทางการแพทย์');
  const [enTitle, setEnTitle] = useState(initialEnTitle || 'medical image anomaly detection system development');
  const [titleAbstract, setTitleAbstract] = useState(initialAbstract || '');
  const [titleResult, setTitleResult] = useState<GeminiRefineTitleResult | null>(null);
  const [isRefining, setIsRefining] = useState(false);

  // Abstract summary state
  const [abstractText, setAbstractText] = useState(
    initialAbstract ||
      'งานวิจัยนี้นำเสนอโมเดลสถาปัตยกรรมโครงข่ายประสาทเทียมแบบ Transformer ผสมผสานกับ Convolutional Neural Networks เพื่อตรวจจับความผิดปกติในภาพ CT-scan และ X-ray ปอดอย่างมีประสิทธิภาพสูงและประหยัดเวลาประมวลผล โดยมุ่งเน้นการแก้ปัญหาความไม่สมดุลของข้อมูลด้วยการเรียนรู้เชิงลึกแบบไฮบริด'
  );
  const [summaryResult, setSummaryResult] = useState<GeminiSummarizeAbstractResult | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Key state
  const [tempApiKey, setTempApiKey] = useState(geminiApiKey);

  const handleRefineTitle = async () => {
    setIsRefining(true);
    try {
      const result = await refineThesisTitleWithGemini(thTitle, enTitle, titleAbstract, geminiApiKey);
      setTitleResult(result);
    } catch (err) {
      showToast('error', 'การประมวลผลล้มเหลว');
    } finally {
      setIsRefining(false);
    }
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    try {
      const result = await summarizeAbstractWithGemini(abstractText, geminiApiKey);
      setSummaryResult(result);
    } catch (err) {
      showToast('error', 'การประมวลผลล้มเหลว');
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    setGeminiApiKey(tempApiKey.trim());
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast('success', `คัดลอก ${label} เรียบร้อยแล้ว`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Gemini AI Academic Assistant"
      subtitle="ระบบผู้ช่วยวิชาการอัจฉริยะสำหรับวิทยานิพนธ์และงานวิจัย"
      maxWidth="2xl"
    >
      <div className="space-y-4">
        {/* Navigation Sub-tabs */}
        <div className="flex border-b border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveAiTab('title')}
            className={`px-4 py-2 border-b-2 flex items-center space-x-1.5 transition-colors ${
              activeAiTab === 'title'
                ? 'border-pink-600 text-pink-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ขัดเกลาชื่อวิทยานิพนธ์</span>
          </button>
          <button
            onClick={() => setActiveAiTab('summary')}
            className={`px-4 py-2 border-b-2 flex items-center space-x-1.5 transition-colors ${
              activeAiTab === 'summary'
                ? 'border-pink-600 text-pink-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>สรุปบทคัดย่อ (Abstract)</span>
          </button>
          <button
            onClick={() => setActiveAiTab('key')}
            className={`px-4 py-2 border-b-2 flex items-center space-x-1.5 transition-colors ${
              activeAiTab === 'key'
                ? 'border-pink-600 text-pink-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>ตั้งค่า Gemini API Key</span>
          </button>
        </div>

        {/* Tab 1: Refine Titles */}
        {activeAiTab === 'title' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ชื่อวิทยานิพนธ์ภาษาไทย (ร่างตั้งต้น)
              </label>
              <input
                type="text"
                value={thTitle}
                onChange={(e) => setThTitle(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ชื่อวิทยานิพนธ์ภาษาอังกฤษ (ร่างตั้งต้น)
              </label>
              <input
                type="text"
                value={enTitle}
                onChange={(e) => setEnTitle(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                disabled={isRefining}
                onClick={handleRefineTitle}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 text-white font-semibold text-xs rounded-lg shadow transition-colors"
              >
                {isRefining ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{isRefining ? 'กำลังวิเคราะห์ด้วย AI...' : 'วิเคราะห์และปรับปรุงชื่อด้วย Gemini'}</span>
              </button>
            </div>

            {titleResult && (
              <div className="mt-4 p-4 bg-purple-50/60 border border-purple-200 rounded-xl space-y-3 text-xs">
                <div className="font-bold text-purple-900 flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 mr-1.5" />
                  ผลการปรับปรุงจาก Gemini AI:
                </div>

                <div className="bg-white p-3 rounded-lg border border-purple-100 space-y-1">
                  <div className="text-slate-400 text-[10px] font-bold">ชื่อภาษาไทยที่แนะนำ:</div>
                  <div className="font-bold text-slate-800 text-sm">{titleResult.improvedTitleTh}</div>
                  <button
                    onClick={() => handleCopy(titleResult.improvedTitleTh, 'ชื่อภาษาไทย')}
                    className="text-[10px] text-pink-600 hover:underline flex items-center pt-0.5"
                  >
                    <Copy className="w-3 h-3 mr-1" /> คัดลอก
                  </button>
                </div>

                <div className="bg-white p-3 rounded-lg border border-purple-100 space-y-1">
                  <div className="text-slate-400 text-[10px] font-bold">ชื่อภาษาอังกฤษที่แนะนำ (Title Case):</div>
                  <div className="font-bold text-slate-800 text-sm">{titleResult.improvedTitleEn}</div>
                  <button
                    onClick={() => handleCopy(titleResult.improvedTitleEn, 'ชื่อภาษาอังกฤษ')}
                    className="text-[10px] text-pink-600 hover:underline flex items-center pt-0.5"
                  >
                    <Copy className="w-3 h-3 mr-1" /> คัดลอก
                  </button>
                </div>

                <div className="text-slate-600 text-[11px] leading-relaxed">
                  <strong>บทวิจารณ์และข้อเสนอแนะ:</strong> {titleResult.critique}
                </div>

                {titleResult.suggestedKeywords && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {titleResult.suggestedKeywords.map((k, idx) => (
                      <span key={idx} className="bg-white text-purple-700 px-2 py-0.5 rounded text-[10px] border border-purple-200 font-medium">
                        {k}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Summarize Abstract */}
        {activeAiTab === 'summary' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                เนื้อหาบทคัดย่อ / สาระสังเขป (Abstract Text)
              </label>
              <textarea
                rows={4}
                value={abstractText}
                onChange={(e) => setAbstractText(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={isSummarizing}
                onClick={handleSummarize}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 text-white font-semibold text-xs rounded-lg shadow transition-colors"
              >
                {isSummarizing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{isSummarizing ? 'กำลังสรุปสาระสำคัญ...' : 'สรุปใจความด้วย Gemini'}</span>
              </button>
            </div>

            {summaryResult && (
              <div className="mt-4 p-4 bg-purple-50/60 border border-purple-200 rounded-xl space-y-3 text-xs">
                <div className="font-bold text-purple-900 flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 mr-1.5" />
                  สรุปสาระสำคัญโดยย่อ:
                </div>

                <div className="bg-white p-3 rounded-lg border border-purple-100 text-slate-700 leading-relaxed text-xs">
                  {summaryResult.summary}
                </div>

                <div>
                  <div className="font-bold text-slate-700 mb-1">ประเด็นหลักของงานวิจัย:</div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
                    {summaryResult.bulletPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-purple-100 text-[11px] text-purple-900 font-medium">
                  🌟 <strong>จุดเด่นและคุณูปการหลัก:</strong> {summaryResult.keyContribution}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: API Key */}
        {activeAiTab === 'key' && (
          <form onSubmit={handleSaveApiKey} className="space-y-4 text-xs">
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1.5">
              <div className="font-bold text-slate-800 flex items-center">
                <Key className="w-4 h-4 text-pink-600 mr-1.5" />
                <span>การเชื่อมต่อ Gemini API (@google/genai)</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                กรอก Gemini API Key จาก Google AI Studio เพื่อใช้งานโมเดล Gemini 1.5 Flash/Pro โดยตรง (หากไม่กรอก ระบบจะสลับไปใช้โหมด AI Heuristic จำลองโดยอัตโนมัติ ไม่กระทบต่อการทำงานของระบบ)
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Gemini API Key</label>
              <input
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg font-mono focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setTempApiKey('');
                  setGeminiApiKey('');
                  showToast('info', 'ล้าง API Key แล้ว (เข้าสู่โหมดออฟไลน์)');
                }}
                className="text-slate-400 hover:text-slate-600 underline"
              >
                ล้างคีย์ที่บันทึก
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg shadow-sm"
              >
                บันทึก API Key
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
