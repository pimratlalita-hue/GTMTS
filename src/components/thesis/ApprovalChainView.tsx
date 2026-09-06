import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TopicProposal } from '../../types';
import { CheckCircle2, Clock, XCircle, ArrowRight, UserCheck, ShieldAlert, MessageSquare } from 'lucide-react';

export const ApprovalChainView: React.FC = () => {
  const { topicProposals, approveTopicStep, currentRole } = useApp();
  const [commentInput, setCommentInput] = useState<{ [id: string]: string }>({});

  const handleApprove = (proposalId: string, roleToApprove: 'advisor' | 'chair' | 'grad_school') => {
    const comment = commentInput[proposalId] || 'เห็นชอบและอนุมัติตามระเบียบ';
    approveTopicStep(proposalId, roleToApprove, 'approved', comment);
  };

  const handleReject = (proposalId: string, roleToApprove: 'advisor' | 'chair' | 'grad_school') => {
    const comment = commentInput[proposalId] || 'ส่งกลับเพื่อแก้ไขข้อมูล';
    approveTopicStep(proposalId, roleToApprove, 'rejected', comment);
  };

  const getStepIcon = (status: 'pending' | 'approved' | 'rejected') => {
    if (status === 'approved') return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    if (status === 'rejected') return <XCircle className="w-4 h-4 text-rose-600" />;
    return <Clock className="w-4 h-4 text-amber-500 animate-pulse" />;
  };

  const getRoleLabel = (r: 'advisor' | 'chair' | 'grad_school') => {
    if (r === 'advisor') return 'อาจารย์ที่ปรึกษา';
    if (r === 'chair') return 'ประธานหลักสูตร';
    return 'บัณฑิตวิทยาลัย';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-800 flex items-center">
          <UserCheck className="w-4 h-4 text-pink-600 mr-1.5" />
          สายงานการพิจารณาอนุมัติหัวข้อ (Hierarchical Approval Flow)
        </h3>
        <span className="text-xs text-slate-500 font-medium">
          นิสิต ➔ ที่ปรึกษา ➔ ประธานหลักสูตร ➔ บัณฑิตวิทยาลัย
        </span>
      </div>

      <div className="space-y-4">
        {topicProposals.map((prop) => {
          // Can current user approve?
          const canAdvisorApprove =
            (currentRole === 'advisor' || currentRole === 'admin') &&
            prop.status === 'pending_advisor';
          const canChairApprove =
            (currentRole === 'advisor' || currentRole === 'officer' || currentRole === 'admin') &&
            prop.status === 'pending_chair';
          const canGradSchoolApprove =
            (currentRole === 'officer' || currentRole === 'admin') &&
            prop.status === 'pending_grad_school';

          return (
            <div
              key={prop.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
                <div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-1 ${
                      prop.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : prop.status === 'rejected'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {prop.status === 'approved'
                      ? 'อนุมัติเรียบร้อยแล้ว'
                      : prop.status === 'rejected'
                      ? 'ส่งกลับแก้ไข'
                      : 'อยู่ระหว่างการพิจารณา'}
                  </span>
                  <h4 className="text-sm font-bold text-slate-800">{prop.titleTh}</h4>
                  <div className="text-xs text-slate-500 italic">{prop.titleEn}</div>
                </div>

                <div className="text-right text-xs text-slate-500">
                  <div className="font-semibold text-slate-700">{prop.studentName}</div>
                  <div className="text-[11px]">ที่ปรึกษา: {prop.majorAdvisorName}</div>
                </div>
              </div>

              {/* Approval Pipeline Stepper */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                {prop.approvalChain.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex flex-col justify-between ${
                      step.status === 'approved'
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : step.status === 'rejected'
                        ? 'bg-rose-50/50 border-rose-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-700">
                        {idx + 1}. {getRoleLabel(step.role)}
                      </span>
                      {getStepIcon(step.status)}
                    </div>

                    <div className="text-[11px] text-slate-500 space-y-0.5">
                      <div>ผู้พิจารณา: {step.approverName || '-'}</div>
                      {step.comment && (
                        <div className="italic text-slate-600 bg-white/70 p-1.5 rounded mt-1 border border-slate-100">
                          "{step.comment}"
                        </div>
                      )}
                      {step.updatedAt && (
                        <div className="text-[10px] text-slate-400">
                          {new Date(step.updatedAt).toLocaleDateString('th-TH')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Toolbar for Approvers */}
              {(canAdvisorApprove || canChairApprove || canGradSchoolApprove) && (
                <div className="mt-3 pt-3 border-t border-slate-100 bg-pink-50/50 -mx-5 -mb-5 p-4 rounded-b-2xl">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="w-full sm:flex-1">
                      <input
                        type="text"
                        value={commentInput[prop.id] || ''}
                        onChange={(e) =>
                          setCommentInput({ ...commentInput, [prop.id]: e.target.value })
                        }
                        placeholder="กรอกความเห็นประกอบการพิจารณา..."
                        className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {canAdvisorApprove && (
                        <>
                          <button
                            onClick={() => handleReject(prop.id, 'advisor')}
                            className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-semibold rounded-lg transition-colors"
                          >
                            ส่งกลับแก้ไข
                          </button>
                          <button
                            onClick={() => handleApprove(prop.id, 'advisor')}
                            className="px-4 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                          >
                            อนุมัติ (ที่ปรึกษา)
                          </button>
                        </>
                      )}

                      {canChairApprove && (
                        <>
                          <button
                            onClick={() => handleReject(prop.id, 'chair')}
                            className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-semibold rounded-lg transition-colors"
                          >
                            ส่งกลับแก้ไข
                          </button>
                          <button
                            onClick={() => handleApprove(prop.id, 'chair')}
                            className="px-4 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                          >
                            เห็นชอบ (ประธานหลักสูตร)
                          </button>
                        </>
                      )}

                      {canGradSchoolApprove && (
                        <>
                          <button
                            onClick={() => handleReject(prop.id, 'grad_school')}
                            className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-semibold rounded-lg transition-colors"
                          >
                            ส่งกลับแก้ไข
                          </button>
                          <button
                            onClick={() => handleApprove(prop.id, 'grad_school')}
                            className="px-4 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                          >
                            อนุมัติเป็นทางการ (บัณฑิตวิทยาลัย)
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
