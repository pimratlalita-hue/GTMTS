// TypeScript Definitions for GTMTS & Faculty Meeting Room System

export type UserRole = 'student' | 'advisor' | 'committee' | 'officer' | 'admin';
export type DegreeLevel = 'master' | 'doctoral';
export type ThesisStatus = 
  | 'draft'
  | 'topic_proposed'
  | 'proposal_scheduled'
  | 'proposal_approved'
  | 'proposal_revision'
  | 'in_progress'
  | 'defense_scheduled'
  | 'passed'
  | 'passed_with_conditions'
  | 'failed'
  | 'archived';

export type TopicApprovalStatus = 'draft' | 'pending_advisor' | 'pending_chair' | 'pending_grad_school' | 'approved' | 'rejected';
export type RoomType = 'onsite' | 'online' | 'hybrid';
export type ExamResultType = 'passed' | 'passed_with_conditions' | 'failed' | 'pending';
export type ProgressGrade = 'S' | 'U' | 'pending';
export type BookingPurposeType = 'thesis_proposal' | 'thesis_defense' | 'faculty_meeting' | 'department_meeting' | 'academic_seminar' | 'other';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  fullName: string;
  email: string;
  department: string;
  avatarUrl?: string;
  pdpaConsent: boolean;
  pdpaConsentDate?: string;
}

export interface StudentProfile extends User {
  studentId: string;
  degreeLevel: DegreeLevel;
  major: string;
  entryYear: number;
  expectedGraduationYear: number;
  advisorId?: string;
  coAdvisorIds?: string[];
  thesisId?: string;
  faceSignature?: string; // SHA-256 Text Hash of facial landmarks (No raw image stored)
}

export interface AdvisorProfile extends User {
  academicTitle: string; // ดร., รศ.ดร., ศ.
  faculty: string;
  maxStudentQuota: number;
  currentStudentCount: number;
  specializations: string[];
}

export interface ApprovalStep {
  role: 'advisor' | 'chair' | 'grad_school';
  approverName?: string;
  approverId?: string;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
  updatedAt?: string;
}

export interface TopicProposal {
  id: string;
  thesisId: string;
  studentId: string;
  studentName?: string;
  titleTh: string;
  titleEn: string;
  abstract: string;
  keywords: string[];
  majorAdvisorId: string;
  majorAdvisorName?: string;
  coAdvisorIds?: string[];
  status: TopicApprovalStatus;
  approvalChain: ApprovalStep[];
  submittedAt: string;
  approvedAt?: string;
}

export interface ExamRoom {
  id: string;
  name: string;
  building: string;
  floor?: string;
  capacity: number;
  facilities: string[]; // ['Projector', 'Webcam System', 'Audio System', 'Smart Screen']
  isAvailable: boolean;
  type: RoomType;
  defaultOnlineUrl?: string;
}

export interface CommitteeMember {
  id: string;
  fullName: string;
  role: 'chair' | 'committee' | 'external_expert';
  institution?: string;
  hasConfirmed: boolean;
  score?: number;
  comments?: string;
}

export interface ExamSchedule {
  id: string;
  thesisId?: string;
  studentId?: string;
  studentName?: string;
  title?: string;
  purposeType: BookingPurposeType; // รองรับทั้ง สอบวิทยานิพนธ์ และ ประชุมคณะ
  scheduledDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm (e.g. "09:00")
  endTime: string; // HH:mm (e.g. "12:00")
  roomType: RoomType;
  roomId?: string;
  roomName?: string;
  building?: string;
  onlineMeetingUrl?: string; // Zoom / Teams / Meet
  bookedBy: string; // User ID / Name
  contactPhone?: string;
  attendeeCount?: number;
  roomLayout?: 'u_shape' | 'classroom' | 'theater' | 'boardroom';
  catering?: string[];
  needTechnician?: boolean;
  notes?: string;
  committee?: CommitteeMember[];
  result?: ExamResultType;
  resultConditions?: string;
  revisionDeadline?: string;
  evaluatedAt?: string;
  status: 'confirmed' | 'pending_approval' | 'cancelled';
}

export interface AdvisoryMeetingLog {
  id: string;
  thesisId: string;
  studentId: string;
  meetingDate: string;
  durationMinutes: number;
  topicDiscussed: string;
  studentSummary: string;
  actionItemsNextMeeting: string;
  isAdvisorConfirmed: boolean;
  advisorComment?: string;
  confirmedAt?: string;
}

export interface SemesterProgressReport {
  id: string;
  thesisId: string;
  studentId: string;
  academicYear: number;
  semester: 1 | 2 | 3;
  progressPercentage: number;
  completedWorkSummary: string;
  submittedAt: string;
  evaluation: ProgressGrade;
  advisorRemarks?: string;
  evaluatedAt?: string;
}

export interface DefensePrerequisites {
  studentId: string;
  englishProficiencyPassed: boolean;
  englishTestName?: string;
  englishScore?: number;
  proposalExamPassed: boolean;
  publicationPassed: boolean;
  publicationDetails?: {
    journalName: string;
    paperTitle: string;
    tier: string; // TCI 1, Scopus Q1/Q2
    publishedDate: string;
    doiOrUrl?: string;
  };
  isEligibleForDefense: boolean;
}

export interface PlagiarismReport {
  tool: 'Turnitin' | 'Akarawisut' | 'Other';
  similarityPercentage: number;
  maxAllowedPercentage: number;
  checkedDate: string;
  reportFileUrl?: string;
  isPassed: boolean;
}

export interface DigitalSignatureRecord {
  signerId: string;
  signerName: string;
  role: string;
  signedAt: string;
  signatureChecksum: string;
}

export interface FinalThesisArchive {
  id: string;
  thesisId: string;
  finalDocumentFile: string;
  plagiarism: PlagiarismReport;
  approvalSheetSignatures: DigitalSignatureRecord[];
  institutionalRepositoryId?: string;
  archivedAt: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  type: 'face_scan' | 'manual';
  status: 'present' | 'late' | 'absent';
  verificationHashMatch: boolean;
}

export interface GTMTS_BackupData {
  version: '1.0.0';
  exportedAt: string;
  appTitle: 'Graduate Thesis Management and Tracking System (GTMTS)';
  data: {
    users: (StudentProfile | AdvisorProfile | User)[];
    rooms: ExamRoom[];
    topicProposals: TopicProposal[];
    examSchedules: ExamSchedule[];
    advisoryLogs: AdvisoryMeetingLog[];
    progressReports: SemesterProgressReport[];
    prerequisites: DefensePrerequisites[];
    finalArchives: FinalThesisArchive[];
    attendanceRecords: AttendanceRecord[];
  };
}
