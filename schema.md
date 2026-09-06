# Data Schema & Type Definitions (schema.md)
## Graduate Thesis Management and Tracking System (GTMTS)

เอกสารนี้ระบุโครงสร้างข้อมูล (Data Models), TypeScript Interfaces, และ JSON Schema สำหรับการจัดเก็บข้อมูลบน Client-side Storage และการส่งออก/นำเข้าไฟล์ (Export/Import Backup)

---

## 1. Core Enumerations (Enums)

```typescript
// บทบาทผู้ใช้งาน 5 กลุ่ม
export type UserRole = 
  | 'student'          // นิสิต
  | 'advisor'          // อาจารย์ที่ปรึกษา
  | 'committee'        // คณะกรรมการสอบ / ผู้ทรงคุณวุฒิ
  | 'officer'          // เจ้าหน้าที่หลักสูตร / บัณฑิตวิทยาลัย
  | 'admin';           // ผู้ดูแลระบบ

// ระดับการศึกษา
export type DegreeLevel = 'master' | 'doctoral';

// สถานะการอนุมัติหัวข้อตามลำดับขั้น
export type TopicApprovalStatus = 
  | 'draft'                  // ร่างเอกสาร
  | 'pending_advisor'        // รออาจารย์ที่ปรึกษาตอบรับ
  | 'pending_chair'          // รอประธานหลักสูตรเห็นชอบ
  | 'pending_grad_school'    // รอตั๋วบัณฑิตวิทยาลัยอนุมัติ
  | 'approved'               // อนุมัติเรียบร้อย
  | 'rejected';              // ไม่อนุมัติ / ส่งกลับแก้ไข

// สถานะความก้าวหน้าของวิทยานิพนธ์
export type ThesisProgressStage =
  | 'topic_proposal'         // เสนอหัวข้อ
  | 'proposal_defense'       // สอบเค้าโครง
  | 'research_in_progress'   // ดำเนินการวิจัย / เก็บข้อมูล
  | 'final_defense'          // สอบปากเปล่าขั้นสุดท้าย
  | 'revision_plagiarism'    // แก้ไขเล่ม & ตรวจคัดลอก
  | 'completed';             // เล่มสมบูรณ์ & เผยแพร่

// ผลการประเมินการสอบ
export type ExamResultType = 
  | 'pending'                // ยังไม่สอบ / รอผล
  | 'passed'                 // ผ่าน
  | 'passed_with_conditions' // ผ่านแบบมีเงื่อนไข (ต้องแก้ไขตามระยะเวลาที่กำหนด)
  | 'failed';                // ไม่ผ่าน

// ผลการประเมินความก้าวหน้ารายเทอม
export type ProgressGrade = 'S' | 'U' | 'pending'; // S = Satisfactory, U = Unsatisfactory

// รูปแบบห้องสอบ
export type RoomType = 'on-site' | 'online' | 'hybrid';
```

---

## 2. User & Profile Models

```typescript
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
  faceSignature?: string; // รหัสข้อความ Hash ใบหน้าตามเกณฑ์ PDPA (ไม่เก็บรูป)
}

export interface AdvisorProfile extends User {
  academicTitle: string; // ดร., รศ.ดร., ศ.
  faculty: string;
  maxStudentQuota: number;      // โควตานักศึกษาที่รับได้สูงสุดตามเกณฑ์
  currentStudentCount: number;  // จำนวนนักศึกษาในความดูแลปัจจุบัน
  specializations: string[];
}
```

---

## 3. Thesis Proposal & Lifecycle Models

```typescript
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
  titleTh: string;              // ชื่อวิทยานิพนธ์ภาษาไทย
  titleEn: string;              // ชื่อวิทยานิพนธ์ภาษาอังกฤษ
  abstract: string;             // สาระสังเขป / Concept Note
  keywords: string[];
  majorAdvisorId: string;
  coAdvisorIds?: string[];
  status: TopicApprovalStatus;
  approvalChain: ApprovalStep[];
  submittedAt: string;
  approvedAt?: string;
}
```

---

## 4. Exam Scheduling & Room Booking Models

```typescript
export interface ExamRoom {
  id: string;
  name: string;
  building: string;
  capacity: number;
  facilities: string[]; // ['Projector', 'Webcam System', 'Audio System']
  isAvailable: boolean;
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
  thesisId: string;
  studentId: string;
  examType: 'proposal' | 'final_defense';
  scheduledDate: string;        // YYYY-MM-DD
  startTime: string;            // HH:mm
  endTime: string;              // HH:mm
  roomType: RoomType;
  roomId?: string;              // อ้างอิง ExamRoom ถ้าเป็น On-site
  roomName?: string;
  onlineMeetingUrl?: string;    // ลิงก์ Zoom / MS Teams / Google Meet
  committee: CommitteeMember[];
  result: ExamResultType;
  resultConditions?: string;    // เงื่อนไขที่ต้องแก้ไขกรณี passed_with_conditions
  revisionDeadline?: string;
  evaluatedAt?: string;
}
```

---

## 5. Progress Tracking & Advisory Models

```typescript
export interface AdvisoryMeetingLog {
  id: string;
  thesisId: string;
  studentId: string;
  meetingDate: string;
  durationMinutes: number;
  topicDiscussed: string;       // วาระและหัวข้อที่ปรึกษา
  studentSummary: string;       // บันทึกสรุปจากนิสิต
  actionItemsNextMeeting: string; // แผนงานที่ต้องส่งในครั้งถัดไป
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
  progressPercentage: number;   // 0 - 100%
  completedWorkSummary: string;
  submittedAt: string;
  evaluation: ProgressGrade;    // S, U, pending
  advisorRemarks?: string;
  evaluatedAt?: string;
}
```

---

## 6. Final Defense Prerequisites & Archiving Models

```typescript
export interface DefensePrerequisites {
  studentId: string;
  englishProficiencyPassed: boolean;
  englishTestName?: string;     // เช่น CU-TEP, TOEFL, IELTS
  englishScore?: number;
  proposalExamPassed: boolean;
  publicationPassed: boolean;
  publicationDetails?: {
    journalName: string;
    paperTitle: string;
    tier: string;              // TCI 1, Scopus Q1/Q2
    publishedDate: string;
    doiOrUrl?: string;
  };
  isEligibleForDefense: boolean;
}

export interface PlagiarismReport {
  tool: 'Turnitin' | 'Akarawisut' | 'Other';
  similarityPercentage: number;  // เช่น 12%
  maxAllowedPercentage: number;  // ค่าเกณฑ์มาตรฐาน เช่น ไม่เกิน 20%
  checkedDate: string;
  reportFileUrl?: string;
  isPassed: boolean;
}

export interface DigitalSignatureRecord {
  signerId: string;
  signerName: string;
  role: string;
  signedAt: string;
  signatureChecksum: string;     // Hash แสดงความถูกต้องของลายเซ็น
}

export interface FinalThesisArchive {
  id: string;
  thesisId: string;
  finalDocumentFile: string;     // ชื่อไฟล์ / Data URI
  plagiarism: PlagiarismReport;
  approvalSheetSignatures: DigitalSignatureRecord[];
  institutionalRepositoryId?: string;
  archivedAt: string;
}
```

---

## 7. Attendance & Biometric Models

```typescript
export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;                  // YYYY-MM-DD
  time: string;                  // HH:mm:ss
  type: 'face_scan' | 'manual';
  status: 'present' | 'late' | 'absent';
  verificationHashMatch: boolean;
}
```

---

## 8. Complete System Backup Schema (Export / Import JSON)

```typescript
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
```
