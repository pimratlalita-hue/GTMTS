import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserRole,
  User,
  StudentProfile,
  AdvisorProfile,
  ExamRoom,
  TopicProposal,
  ExamSchedule,
  AdvisoryMeetingLog,
  SemesterProgressReport,
  DefensePrerequisites,
  FinalThesisArchive,
  AttendanceRecord,
  GTMTS_BackupData
} from '../types';
import {
  loadStoredData,
  saveStoredData,
  exportBackupJSON,
  validateBackupSchema,
  resetToFactoryDefault
} from '../services/storageService';
import { checkRoomBookingConflict } from '../services/conflictEngine';
import { useToast } from './ToastContext';

interface AppContextType {
  currentRole: UserRole;
  currentUser: User;
  switchRole: (role: UserRole, specificUserId?: string) => void;
  isProjectorMode: boolean;
  toggleProjectorMode: () => void;
  
  // Data entities
  students: StudentProfile[];
  advisors: AdvisorProfile[];
  rooms: ExamRoom[];
  topicProposals: TopicProposal[];
  examSchedules: ExamSchedule[];
  advisoryLogs: AdvisoryMeetingLog[];
  progressReports: SemesterProgressReport[];
  prerequisites: DefensePrerequisites[];
  finalArchives: FinalThesisArchive[];
  attendanceRecords: AttendanceRecord[];

  // Room Booking & Conflict
  bookRoom: (booking: Omit<ExamSchedule, 'id'>, idToEdit?: string) => { success: boolean; message?: string };
  cancelBooking: (id: string) => void;

  // Thesis Lifecycle & Quota
  createTopicProposal: (data: {
    studentId: string;
    titleTh: string;
    titleEn: string;
    abstract: string;
    keywords: string[];
    majorAdvisorId: string;
  }) => { success: boolean; message?: string };
  approveTopicStep: (proposalId: string, role: 'advisor' | 'chair' | 'grad_school', status: 'approved' | 'rejected', comment?: string) => void;

  // Advisory & Progress
  addAdvisoryMeetingLog: (log: Omit<AdvisoryMeetingLog, 'id' | 'isAdvisorConfirmed'>) => void;
  confirmAdvisoryMeetingLog: (logId: string, comment?: string) => void;
  submitProgressReport: (report: Omit<SemesterProgressReport, 'id' | 'evaluation' | 'submittedAt'>) => void;
  evaluateProgressReport: (reportId: string, evaluation: 'S' | 'U', remarks?: string) => void;

  // Attendance & PDPA Biometrics
  checkInAttendance: (studentId: string, type: 'face_scan' | 'manual', isMatch: boolean) => void;
  registerFaceSignature: (studentId: string, faceHash: string) => void;

  // Final Archiving & Prerequisites
  updatePrerequisites: (data: DefensePrerequisites) => void;
  archiveFinalThesis: (archive: FinalThesisArchive) => void;

  // System Data Ops
  exportDataJSON: () => void;
  importDataJSON: (jsonStr: string) => boolean;
  factoryReset: () => void;

  // Gemini API Key
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [data, setData] = useState<GTMTS_BackupData>(() => loadStoredData());
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [activeUserId, setActiveUserId] = useState<string>('std-01');
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);
  const [geminiApiKey, setGeminiApiKey] = useState<string>(() => localStorage.getItem('GTMTS_GEMINI_KEY') || '');

  // Persist state changes
  useEffect(() => {
    saveStoredData(data);
  }, [data]);

  // Projector mode class on body
  useEffect(() => {
    if (isProjectorMode) {
      document.body.classList.add('projector-mode');
    } else {
      document.body.classList.remove('projector-mode');
    }
  }, [isProjectorMode]);

  const toggleProjectorMode = () => {
    setIsProjectorMode(prev => {
      const next = !prev;
      showToast('info', next ? 'เปิดโหมดจอโปรเจกเตอร์ (High Contrast)' : 'ปิดโหมดจอโปรเจกเตอร์', 'ปรับโทนสีให้คมชัดเหมาะสมกับการนำเสนอ');
      return next;
    });
  };

  const handleSetApiKey = (key: string) => {
    setGeminiApiKey(key);
    localStorage.setItem('GTMTS_GEMINI_KEY', key);
    showToast('success', 'บันทึก Gemini API Key สำเร็จ');
  };

  // Extract profiles
  const allUsers = data.data.users;
  const students = allUsers.filter(u => u.role === 'student') as StudentProfile[];
  const advisors = allUsers.filter(u => u.role === 'advisor') as AdvisorProfile[];

  // Find active user
  const currentUser: User = allUsers.find(u => u.id === activeUserId) || students[0] || {
    id: 'guest',
    username: 'guest',
    role: currentRole,
    fullName: 'ผู้ใช้งานระบบ',
    email: 'guest@chula.ac.th',
    department: 'คณะวิศวกรรมศาสตร์',
    pdpaConsent: true
  };

  // Switch role and update default user for that role
  const switchRole = (newRole: UserRole, specificUserId?: string) => {
    setCurrentRole(newRole);
    if (specificUserId) {
      setActiveUserId(specificUserId);
    } else {
      if (newRole === 'student') setActiveUserId('std-01');
      else if (newRole === 'advisor') setActiveUserId('adv-01');
      else if (newRole === 'committee') setActiveUserId('com-01');
      else if (newRole === 'officer') setActiveUserId('off-01');
      else if (newRole === 'admin') setActiveUserId('adm-01');
    }
    showToast('info', `สลับบทบาทเป็น: ${getRoleTitle(newRole)}`, 'เปลี่ยนมุมมองการใช้งานตามสิทธิ์');
  };

  function getRoleTitle(role: UserRole): string {
    switch (role) {
      case 'student': return 'นิสิต (Student)';
      case 'advisor': return 'อาจารย์ที่ปรึกษา (Advisor)';
      case 'committee': return 'คณะกรรมการสอบ (Committee)';
      case 'officer': return 'เจ้าหน้าที่บัณฑิตวิทยาลัย (Officer)';
      case 'admin': return 'ผู้ดูแลระบบ (Admin)';
      default: return role;
    }
  }

  // ==================== ROOM BOOKING & CONFLICT ENGINE ====================
  const bookRoom = (booking: Omit<ExamSchedule, 'id'>, idToEdit?: string) => {
    // Run conflict detection
    if (booking.roomId) {
      const check = checkRoomBookingConflict(
        booking.roomId,
        booking.scheduledDate,
        booking.startTime,
        booking.endTime,
        data.data.examSchedules,
        idToEdit
      );

      if (check.hasConflict) {
        showToast('error', 'ไม่สามารถจองห้องได้ เนื่องจากเวลาชนกัน!', check.message);
        return { success: false, message: check.message };
      }
    }

    const newId = idToEdit || `sch-${Date.now().toString().slice(-6)}`;
    const newSchedule: ExamSchedule = {
      ...booking,
      id: newId
    };

    setData(prev => {
      const existing = prev.data.examSchedules;
      const updated = idToEdit
        ? existing.map(item => (item.id === idToEdit ? newSchedule : item))
        : [newSchedule, ...existing];
      return {
        ...prev,
        data: { ...prev.data, examSchedules: updated }
      };
    });

    showToast('success', 'บันทึกการจองห้องสำเร็จ', `${booking.title || 'การจองห้อง'} วันที่ ${booking.scheduledDate} เวลา ${booking.startTime} - ${booking.endTime} น.`);
    return { success: true };
  };

  const cancelBooking = (id: string) => {
    setData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        examSchedules: prev.data.examSchedules.map(sch =>
          sch.id === id ? { ...sch, status: 'cancelled' } : sch
        )
      }
    }));
    showToast('warning', 'ยกเลิกการจองห้องแล้ว');
  };

  // ==================== TOPIC PROPOSAL & ADVISOR QUOTA ====================
  const createTopicProposal = (proposalData: {
    studentId: string;
    titleTh: string;
    titleEn: string;
    abstract: string;
    keywords: string[];
    majorAdvisorId: string;
  }) => {
    const advisor = advisors.find(a => a.id === proposalData.majorAdvisorId);
    if (!advisor) {
      showToast('error', 'ไม่พบข้อมูลอาจารย์ที่ปรึกษาที่เลือก');
      return { success: false, message: 'ไม่พบข้อมูลอาจารย์ที่ปรึกษา' };
    }

    // Quota verification rule
    if (advisor.currentStudentCount >= advisor.maxStudentQuota) {
      const errMsg = `อาจารย์ ${advisor.fullName} มีนักศึกษาในความดูแลเต็มโควตาแล้ว (${advisor.currentStudentCount}/${advisor.maxStudentQuota} คน) ไม่สามารถรับเพิ่มได้ตามเกณฑ์มหาวิทยาลัย`;
      showToast('error', 'โควตาอาจารย์ที่ปรึกษาเต็ม', errMsg);
      return { success: false, message: errMsg };
    }

    const student = students.find(s => s.id === proposalData.studentId);
    const newProposal: TopicProposal = {
      id: `prop-${Date.now().toString().slice(-6)}`,
      thesisId: `the-${Date.now().toString().slice(-6)}`,
      studentId: proposalData.studentId,
      studentName: student?.fullName || 'นิสิต',
      titleTh: proposalData.titleTh,
      titleEn: proposalData.titleEn,
      abstract: proposalData.abstract,
      keywords: proposalData.keywords,
      majorAdvisorId: proposalData.majorAdvisorId,
      majorAdvisorName: advisor.fullName,
      status: 'pending_advisor',
      submittedAt: new Date().toISOString(),
      approvalChain: [
        { role: 'advisor', status: 'pending' },
        { role: 'chair', status: 'pending' },
        { role: 'grad_school', status: 'pending' }
      ]
    };

    setData(prev => {
      // Also update student profile thesisId and advisor quota count
      const updatedUsers = prev.data.users.map(u => {
        if (u.id === proposalData.studentId) {
          return { ...(u as StudentProfile), advisorId: proposalData.majorAdvisorId, thesisId: newProposal.thesisId };
        }
        if (u.id === proposalData.majorAdvisorId) {
          return { ...(u as AdvisorProfile), currentStudentCount: (u as AdvisorProfile).currentStudentCount + 1 };
        }
        return u;
      });

      return {
        ...prev,
        data: {
          ...prev.data,
          users: updatedUsers,
          topicProposals: [newProposal, ...prev.data.topicProposals]
        }
      };
    });

    showToast('success', 'ยื่นเสนอหัวข้อวิทยานิพนธ์เรียบร้อย', 'ส่งคำร้องไปยังอาจารย์ที่ปรึกษาเพื่อพิจารณาเป็นลำดับที่ 1');
    return { success: true };
  };

  const approveTopicStep = (
    proposalId: string,
    role: 'advisor' | 'chair' | 'grad_school',
    status: 'approved' | 'rejected',
    comment?: string
  ) => {
    setData(prev => {
      const updatedProposals = prev.data.topicProposals.map(prop => {
        if (prop.id !== proposalId) return prop;

        const chain = [...prop.approvalChain];
        const stepIndex = chain.findIndex(s => s.role === role);
        if (stepIndex >= 0) {
          chain[stepIndex] = {
            ...chain[stepIndex],
            status,
            approverName: currentUser.fullName,
            approverId: currentUser.id,
            comment,
            updatedAt: new Date().toISOString()
          };
        }

        // Determine overall proposal status
        let newStatus = prop.status;
        if (status === 'rejected') {
          newStatus = 'rejected';
        } else if (role === 'advisor') {
          newStatus = 'pending_chair';
        } else if (role === 'chair') {
          newStatus = 'pending_grad_school';
        } else if (role === 'grad_school') {
          newStatus = 'approved';
        }

        return {
          ...prop,
          status: newStatus,
          approvalChain: chain,
          approvedAt: newStatus === 'approved' ? new Date().toISOString() : prop.approvedAt
        };
      });

      return {
        ...prev,
        data: { ...prev.data, topicProposals: updatedProposals }
      };
    });

    showToast(status === 'approved' ? 'success' : 'warning', `บันทึกการ${status === 'approved' ? 'อนุมัติ' : 'ไม่อนุมัติ'}เรียบร้อย`);
  };

  // ==================== ADVISORY LOGS & PROGRESS ====================
  const addAdvisoryMeetingLog = (log: Omit<AdvisoryMeetingLog, 'id' | 'isAdvisorConfirmed'>) => {
    const newLog: AdvisoryMeetingLog = {
      ...log,
      id: `advlog-${Date.now().toString().slice(-6)}`,
      isAdvisorConfirmed: false
    };

    setData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        advisoryLogs: [newLog, ...prev.data.advisoryLogs]
      }
    }));
    showToast('success', 'บันทึกการเข้าพบอาจารย์ที่ปรึกษาสำเร็จ', 'ส่งให้อาจารย์ที่ปรึกษากดยืนยัน');
  };

  const confirmAdvisoryMeetingLog = (logId: string, comment?: string) => {
    setData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        advisoryLogs: prev.data.advisoryLogs.map(l =>
          l.id === logId
            ? { ...l, isAdvisorConfirmed: true, advisorComment: comment, confirmedAt: new Date().toISOString() }
            : l
        )
      }
    }));
    showToast('success', 'อาจารย์ยืนยันบันทึกการให้คำปรึกษาแล้ว');
  };

  const submitProgressReport = (report: Omit<SemesterProgressReport, 'id' | 'evaluation' | 'submittedAt'>) => {
    const newReport: SemesterProgressReport = {
      ...report,
      id: `rep-${Date.now().toString().slice(-6)}`,
      evaluation: 'pending',
      submittedAt: new Date().toISOString()
    };
    setData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        progressReports: [newReport, ...prev.data.progressReports]
      }
    }));
    showToast('success', 'ส่งรายงานความก้าวหน้าเรียบร้อย');
  };

  const evaluateProgressReport = (reportId: string, evaluation: 'S' | 'U', remarks?: string) => {
    setData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        progressReports: prev.data.progressReports.map(r =>
          r.id === reportId
            ? { ...r, evaluation, advisorRemarks: remarks, evaluatedAt: new Date().toISOString() }
            : r
        )
      }
    }));
    showToast('success', `ประเมินผลความก้าวหน้าสำเร็จ: เกรด ${evaluation}`);
  };

  // ==================== ATTENDANCE & PDPA BIOMETRICS ====================
  const checkInAttendance = (studentId: string, type: 'face_scan' | 'manual', isMatch: boolean) => {
    const student = students.find(s => s.id === studentId);
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const dateStr = now.toISOString().slice(0, 10);

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now().toString().slice(-6)}`,
      studentId,
      studentName: student?.fullName || 'ไม่ระบุนาม',
      date: dateStr,
      time: timeStr,
      type,
      status: 'present',
      verificationHashMatch: isMatch
    };

    setData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        attendanceRecords: [newRecord, ...prev.data.attendanceRecords]
      }
    }));

    showToast('success', 'เช็คชื่อเข้าใช้งานสำเร็จ', `${student?.fullName} (${type === 'face_scan' ? 'สแกนลายเซ็นใบหน้า' : 'เช็คชื่อธรรมดา'})`);
  };

  const registerFaceSignature = (studentId: string, faceHash: string) => {
    setData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        users: prev.data.users.map(u =>
          u.id === studentId ? { ...(u as StudentProfile), faceSignature: faceHash, pdpaConsent: true, pdpaConsentDate: new Date().toISOString() } : u
        )
      }
    }));
    showToast('success', 'ลงทะเบียนลายเซ็นชีวมิติสำเร็จ', 'บันทึกค่า Text Signature Hash ตามมาตรฐาน PDPA');
  };

  // ==================== PREREQUISITES & ARCHIVING ====================
  const updatePrerequisites = (prereqData: DefensePrerequisites) => {
    setData(prev => {
      const existing = prev.data.prerequisites;
      const index = existing.findIndex(p => p.studentId === prereqData.studentId);
      const updated = index >= 0
        ? existing.map(p => (p.studentId === prereqData.studentId ? prereqData : p))
        : [...existing, prereqData];
      return {
        ...prev,
        data: { ...prev.data, prerequisites: updated }
      };
    });
    showToast('success', 'บันทึกคุณสมบัติก่อนสอบจบ (Prerequisites) เรียบร้อย');
  };

  const archiveFinalThesis = (archive: FinalThesisArchive) => {
    setData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        finalArchives: [archive, ...prev.data.finalArchives]
      }
    }));
    showToast('success', 'ส่งเล่มสมบูรณ์เข้าสู่คลังปัญญาสถาบัน (Repository) สำเร็จ');
  };

  // ==================== DATA MANAGEMENT ====================
  const exportDataJSON = () => {
    exportBackupJSON(data);
    showToast('success', 'ดาวน์โหลดไฟล์สำรองข้อมูล (JSON Backup) เรียบร้อย');
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!validateBackupSchema(parsed)) {
        showToast('error', 'โครงสร้างไฟล์ JSON ไม่ถูกต้องตาม Schema มาตรฐาน');
        return false;
      }
      setData(parsed as GTMTS_BackupData);
      showToast('success', 'นำเข้าข้อมูล JSON สำเร็จ ระบบอัปเดตข้อมูลเรียบร้อย');
      return true;
    } catch {
      showToast('error', 'ไม่สามารถอ่านไฟล์ JSON ได้ กรุณาตรวจสอบไฟล์');
      return false;
    }
  };

  const factoryReset = () => {
    const fresh = resetToFactoryDefault();
    setData(fresh);
    showToast('warning', 'คืนค่าโรงงานสำเร็จ (Factory Reset)', 'ล้างข้อมูลทั้งหมดและคืนสู่ชุดข้อมูลเริ่มต้น');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentUser,
        switchRole,
        isProjectorMode,
        toggleProjectorMode,
        students,
        advisors,
        rooms: data?.data?.rooms || [],
        topicProposals: data?.data?.topicProposals || [],
        examSchedules: data?.data?.examSchedules || [],
        advisoryLogs: data?.data?.advisoryLogs || [],
        progressReports: data?.data?.progressReports || [],
        prerequisites: data?.data?.prerequisites || [],
        finalArchives: data?.data?.finalArchives || [],
        attendanceRecords: data?.data?.attendanceRecords || [],
        bookRoom,
        cancelBooking,
        createTopicProposal,
        approveTopicStep,
        addAdvisoryMeetingLog,
        confirmAdvisoryMeetingLog,
        submitProgressReport,
        evaluateProgressReport,
        checkInAttendance,
        registerFaceSignature,
        updatePrerequisites,
        archiveFinalThesis,
        exportDataJSON,
        importDataJSON,
        factoryReset,
        geminiApiKey,
        setGeminiApiKey: handleSetApiKey
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
