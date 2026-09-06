import {
  StudentProfile,
  AdvisorProfile,
  User,
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

export const INITIAL_ADVISORS: AdvisorProfile[] = [
  {
    id: 'adv-01',
    username: 'somchai.p',
    fullName: 'รศ.ดร.สมชาย ประเสริฐวิทย์',
    academicTitle: 'รศ.ดร.',
    role: 'advisor',
    email: 'somchai.p@eng.chula.ac.th',
    department: 'วิศวกรรมคอมพิวเตอร์และปัญญาประดิษฐ์',
    faculty: 'วิศวกรรมศาสตร์',
    maxStudentQuota: 5,
    currentStudentCount: 4,
    specializations: ['Artificial Intelligence', 'Data Science', 'Machine Learning'],
    pdpaConsent: true,
    pdpaConsentDate: '2026-01-10T09:00:00Z'
  },
  {
    id: 'adv-02',
    username: 'kanokwan.s',
    fullName: 'ศ.ดร.กนกวรรณ ศรีสวัสดิ์',
    academicTitle: 'ศ.ดร.',
    role: 'advisor',
    email: 'kanokwan.s@eng.chula.ac.th',
    department: 'วิศวกรรมสารสนเทศและการสื่อสาร',
    faculty: 'วิศวกรรมศาสตร์',
    maxStudentQuota: 6,
    currentStudentCount: 3,
    specializations: ['Cybersecurity', 'Cloud Computing', 'Distributed Systems'],
    pdpaConsent: true,
    pdpaConsentDate: '2026-01-11T10:30:00Z'
  },
  {
    id: 'adv-03',
    username: 'pattara.c',
    fullName: 'ผศ.ดร.ภัทระ ชัยประดิษฐ์',
    academicTitle: 'ผศ.ดร.',
    role: 'advisor',
    email: 'pattara.c@eng.chula.ac.th',
    department: 'วิศวกรรมคอมพิวเตอร์และปัญญาประดิษฐ์',
    faculty: 'วิศวกรรมศาสตร์',
    maxStudentQuota: 4,
    currentStudentCount: 4, // เต็มโควตา! เพื่อทดสอบ Quota Check
    specializations: ['Internet of Things (IoT)', 'Embedded Systems', 'Robotics'],
    pdpaConsent: true,
    pdpaConsentDate: '2026-01-12T08:15:00Z'
  },
  {
    id: 'adv-04',
    username: 'wirat.t',
    fullName: 'รศ.ดร.วิรัช ตระกูลทอง',
    academicTitle: 'รศ.ดร.',
    role: 'advisor',
    email: 'wirat.t@eng.chula.ac.th',
    department: 'วิศวกรรมสารสนเทศและการสื่อสาร',
    faculty: 'วิศวกรรมศาสตร์',
    maxStudentQuota: 5,
    currentStudentCount: 2,
    specializations: ['Natural Language Processing (NLP)', 'Information Retrieval'],
    pdpaConsent: true,
    pdpaConsentDate: '2026-01-15T14:00:00Z'
  },
  {
    id: 'adv-05',
    username: 'anchalee.m',
    fullName: 'อ.ดร.อัญชลี มิ่งขวัญ',
    academicTitle: 'อ.ดร.',
    role: 'advisor',
    email: 'anchalee.m@eng.chula.ac.th',
    department: 'วิศวกรรมคอมพิวเตอร์และปัญญาประดิษฐ์',
    faculty: 'วิศวกรรมศาสตร์',
    maxStudentQuota: 3,
    currentStudentCount: 1,
    specializations: ['Human-Computer Interaction (HCI)', 'EdTech', 'UX/UI Systems'],
    pdpaConsent: true,
    pdpaConsentDate: '2026-01-18T11:20:00Z'
  }
];

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'std-01',
    studentId: '6670012321',
    username: 'thanaphon.s',
    fullName: 'นายธนพล สุขสวัสดิ์',
    role: 'student',
    email: 'thanaphon.s@student.chula.ac.th',
    department: 'วิศวกรรมคอมพิวเตอร์และปัญญาประดิษฐ์',
    degreeLevel: 'master',
    major: 'Computer Engineering',
    entryYear: 2024,
    expectedGraduationYear: 2026,
    advisorId: 'adv-01',
    thesisId: 'the-01',
    faceSignature: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    pdpaConsent: true,
    pdpaConsentDate: '2026-01-15T09:30:00Z'
  },
  {
    id: 'std-02',
    studentId: '6670014521',
    username: 'siriporn.k',
    fullName: 'น.ส.ศิริพร เกียรติสกุล',
    role: 'student',
    email: 'siriporn.k@student.chula.ac.th',
    department: 'วิศวกรรมสารสนเทศและการสื่อสาร',
    degreeLevel: 'master',
    major: 'Information Engineering',
    entryYear: 2024,
    expectedGraduationYear: 2026,
    advisorId: 'adv-02',
    thesisId: 'the-02',
    faceSignature: 'SHA256:9f8e6c21e0573e89a5e4b2d3c4b5a6f708192a3b4c5d6e7f8091a2b3c4d5e6f7',
    pdpaConsent: true,
    pdpaConsentDate: '2026-01-16T10:00:00Z'
  },
  {
    id: 'std-03',
    studentId: '6570089221',
    username: 'kittisak.w',
    fullName: 'นายกิตติศักดิ์ วงศ์สวรรค์',
    role: 'student',
    email: 'kittisak.w@student.chula.ac.th',
    department: 'วิศวกรรมคอมพิวเตอร์และปัญญาประดิษฐ์',
    degreeLevel: 'doctoral',
    major: 'Computer Engineering (Ph.D.)',
    entryYear: 2023,
    expectedGraduationYear: 2026,
    advisorId: 'adv-01',
    thesisId: 'the-03',
    faceSignature: 'SHA256:4a5b6c7d8e9f0123456789abcdef0123456789abcdef0123456789abcdef0123',
    pdpaConsent: true,
    pdpaConsentDate: '2025-08-20T13:45:00Z'
  },
  {
    id: 'std-04',
    studentId: '6670023421',
    username: 'naritsara.p',
    fullName: 'น.ส.นริศรา ประภากร',
    role: 'student',
    email: 'naritsara.p@student.chula.ac.th',
    department: 'วิศวกรรมสารสนเทศและการสื่อสาร',
    degreeLevel: 'master',
    major: 'Information Engineering',
    entryYear: 2024,
    expectedGraduationYear: 2026,
    advisorId: 'adv-04',
    thesisId: 'the-04',
    faceSignature: 'SHA256:5b6c7d8e9f0123456789abcdef0123456789abcdef0123456789abcdef01234a',
    pdpaConsent: true,
    pdpaConsentDate: '2026-01-22T14:10:00Z'
  },
  {
    id: 'std-05',
    studentId: '6570034121',
    username: 'woramet.t',
    fullName: 'นายวรเมธ ทินกร',
    role: 'student',
    email: 'woramet.t@student.chula.ac.th',
    department: 'วิศวกรรมคอมพิวเตอร์และปัญญาประดิษฐ์',
    degreeLevel: 'master',
    major: 'Computer Engineering',
    entryYear: 2023,
    expectedGraduationYear: 2025,
    advisorId: 'adv-03',
    thesisId: 'the-05',
    faceSignature: 'SHA256:6c7d8e9f0123456789abcdef0123456789abcdef0123456789abcdef01234a5b',
    pdpaConsent: true,
    pdpaConsentDate: '2025-09-01T11:00:00Z'
  },
  {
    id: 'std-06',
    studentId: '6670056721',
    username: 'peeraya.b',
    fullName: 'น.ส.พีรญา บุญญานุรักษ์',
    role: 'student',
    email: 'peeraya.b@student.chula.ac.th',
    department: 'วิศวกรรมคอมพิวเตอร์และปัญญาประดิษฐ์',
    degreeLevel: 'master',
    major: 'Computer Engineering',
    entryYear: 2024,
    expectedGraduationYear: 2026,
    advisorId: 'adv-05',
    thesisId: 'the-06',
    faceSignature: 'SHA256:7d8e9f0123456789abcdef0123456789abcdef0123456789abcdef01234a5b6c',
    pdpaConsent: true,
    pdpaConsentDate: '2026-02-05T09:15:00Z'
  },
  {
    id: 'std-07',
    studentId: '6670098121',
    username: 'supawit.c',
    fullName: 'นายศุภวิชญ์ จิตภักดี',
    role: 'student',
    email: 'supawit.c@student.chula.ac.th',
    department: 'วิศวกรรมสารสนเทศและการสื่อสาร',
    degreeLevel: 'master',
    major: 'Information Engineering',
    entryYear: 2024,
    expectedGraduationYear: 2026,
    advisorId: 'adv-02',
    thesisId: 'the-07',
    faceSignature: 'SHA256:8e9f0123456789abcdef0123456789abcdef0123456789abcdef01234a5b6c7d',
    pdpaConsent: true,
    pdpaConsentDate: '2026-02-10T16:20:00Z'
  },
  {
    id: 'std-08',
    studentId: '6570077221',
    username: 'thiti.r',
    fullName: 'นายฐิติ รุ่งเรืองกิจ',
    role: 'student',
    email: 'thiti.r@student.chula.ac.th',
    department: 'วิศวกรรมคอมพิวเตอร์และปัญญาประดิษฐ์',
    degreeLevel: 'doctoral',
    major: 'Computer Engineering (Ph.D.)',
    entryYear: 2023,
    expectedGraduationYear: 2026,
    advisorId: 'adv-01',
    thesisId: 'the-08',
    faceSignature: 'SHA256:9f0123456789abcdef0123456789abcdef0123456789abcdef01234a5b6c7d8e',
    pdpaConsent: true,
    pdpaConsentDate: '2025-07-12T13:30:00Z'
  },
  {
    id: 'std-09',
    studentId: '6670061221',
    username: 'pattarawarin.l',
    fullName: 'น.ส.ภัทรวรินทร์ ลิขิตพงศ์',
    role: 'student',
    email: 'pattarawarin.l@student.chula.ac.th',
    department: 'วิศวกรรมสารสนเทศและการสื่อสาร',
    degreeLevel: 'master',
    major: 'Information Engineering',
    entryYear: 2024,
    expectedGraduationYear: 2026,
    advisorId: 'adv-04',
    thesisId: 'the-09',
    faceSignature: 'SHA256:0123456789abcdef0123456789abcdef0123456789abcdef01234a5b6c7d8e9f',
    pdpaConsent: true,
    pdpaConsentDate: '2026-02-18T10:45:00Z'
  },
  {
    id: 'std-10',
    studentId: '6570011921',
    username: 'chatchai.a',
    fullName: 'นายฉัตรชัย อริยวงศ์',
    role: 'student',
    email: 'chatchai.a@student.chula.ac.th',
    department: 'วิศวกรรมคอมพิวเตอร์และปัญญาประดิษฐ์',
    degreeLevel: 'master',
    major: 'Computer Engineering',
    entryYear: 2023,
    expectedGraduationYear: 2025,
    advisorId: 'adv-03',
    thesisId: 'the-10',
    faceSignature: 'SHA256:123456789abcdef0123456789abcdef0123456789abcdef01234a5b6c7d8e9f0',
    pdpaConsent: true,
    pdpaConsentDate: '2025-06-15T09:00:00Z'
  }
];

export const INITIAL_OFFICER: User = {
  id: 'off-01',
  username: 'officer.grad',
  fullName: 'นางสาวรัชนี เจริญผล (เจ้าหน้าที่บัณฑิตศึกษา)',
  role: 'officer',
  email: 'grad.officer@eng.chula.ac.th',
  department: 'สำนักงานบริการวิชาการและบัณฑิตศึกษา',
  pdpaConsent: true,
  pdpaConsentDate: '2026-01-05T08:00:00Z'
};

export const INITIAL_ADMIN: User = {
  id: 'adm-01',
  username: 'admin.sys',
  fullName: 'นายเอกชัย เทคโนโลยี (ผู้ดูแลระบบกลาง)',
  role: 'admin',
  email: 'sysadmin@eng.chula.ac.th',
  department: 'ศูนย์สารสนเทศและเครือข่ายคณะ',
  pdpaConsent: true,
  pdpaConsentDate: '2026-01-01T08:00:00Z'
};

export const INITIAL_COMMITTEE_USER: User = {
  id: 'com-01',
  username: 'committee.chair',
  fullName: 'ศ.ดร.วิโรจน์ พิริยะกุล (ประธานกรรมการสอบ)',
  role: 'committee',
  email: 'wirote.p@external.ac.th',
  department: 'คณะกรรมการผู้ทรงคุณวุฒิ',
  pdpaConsent: true,
  pdpaConsentDate: '2026-01-10T08:00:00Z'
};

// Exam Rooms & Meeting Rooms in Faculty
export const INITIAL_ROOMS: ExamRoom[] = [
  {
    id: 'room-101',
    name: 'ห้องประชุมวิศวกรรม 1 (ห้องประชุมใหญ่คณะ)',
    building: 'อาคารวิศวฯ 100 ปี (ชั้น 3)',
    floor: '3',
    capacity: 40,
    facilities: ['Projector 4K', 'Webcam Conferencing PTZ', 'Boundary Microphone System', 'Smart Whiteboard'],
    isAvailable: true,
    type: 'hybrid',
    defaultOnlineUrl: 'https://chula.zoom.us/j/9871234567'
  },
  {
    id: 'room-102',
    name: 'ห้องประชุมสัมมนาวิชาการ (Seminar Room A)',
    building: 'อาคารวิศวฯ 100 ปี (ชั้น 4)',
    floor: '4',
    capacity: 25,
    facilities: ['Laser Projector', 'Ceiling Mic System', 'Video Tracking Camera'],
    isAvailable: true,
    type: 'onsite'
  },
  {
    id: 'room-201',
    name: 'ห้องสอบวิทยานิพนธ์และห้องรับรอง 1',
    building: 'อาคารเจริญวิศวกรรม (ชั้น 2)',
    floor: '2',
    capacity: 15,
    facilities: ['Projector', 'Dual-display System', 'Document Camera', 'Audio System'],
    isAvailable: true,
    type: 'onsite'
  },
  {
    id: 'room-202',
    name: 'ห้องสอบวิทยานิพนธ์และประชุมกลุ่มย่อย 2',
    building: 'อาคารเจริญวิศวกรรม (ชั้น 2)',
    floor: '2',
    capacity: 12,
    facilities: ['Interactive Touch Screen 75"', 'Conference Mic', 'High-res Webcam'],
    isAvailable: true,
    type: 'onsite'
  },
  {
    id: 'room-board',
    name: 'ห้องประชุมผู้บริหารและกรรมการประจำคณะ (Executive Boardroom)',
    building: 'อาคารวิศวฯ 100 ปี (ชั้น 5)',
    floor: '5',
    capacity: 30,
    facilities: ['Dual Laser Projector', 'Individual Gooseneck Mic', 'AI Auto-tracking PTZ', 'Wireless Presentation Bar'],
    isAvailable: true,
    type: 'hybrid',
    defaultOnlineUrl: 'https://teams.microsoft.com/l/meetup-join/boardroom-eng'
  },
  {
    id: 'room-virtual',
    name: 'ห้องประชุมเสมือนออนไลน์บัณฑิตวิทยาลัย (Virtual Defense Room)',
    building: 'ระบบออนไลน์ส่วนกลาง',
    floor: '-',
    capacity: 100,
    facilities: ['Zoom Cloud Meeting Pro', 'Cloud Recording', 'Breakout Rooms', 'AI Live Transcription'],
    isAvailable: true,
    type: 'online',
    defaultOnlineUrl: 'https://chula.zoom.us/j/8899001122'
  }
];

export const INITIAL_TOPIC_PROPOSALS: TopicProposal[] = [
  {
    id: 'prop-01',
    thesisId: 'the-01',
    studentId: 'std-01',
    studentName: 'นายธนพล สุขสวัสดิ์',
    titleTh: 'การพัฒนาระบบตรวจจับความผิดปกติในภาพถ่ายทางการแพทย์ด้วยการเรียนรู้เชิงลึกแบบไฮบริด',
    titleEn: 'Development of Medical Image Anomaly Detection System Using Hybrid Deep Learning',
    abstract: 'งานวิจัยนี้นำเสนอโมเดลสถาปัตยกรรมโครงข่ายประสาทเทียมแบบ Transformer ผสมผสานกับ Convolutional Neural Networks เพื่อตรวจจับความผิดปกติในภาพ CT-scan และ X-ray ปอดอย่างมีประสิทธิภาพสูงและประหยัดเวลาประมวลผล',
    keywords: ['Deep Learning', 'Medical Imaging', 'Anomaly Detection', 'Vision Transformer'],
    majorAdvisorId: 'adv-01',
    majorAdvisorName: 'รศ.ดร.สมชาย ประเสริฐวิทย์',
    status: 'approved',
    approvalChain: [
      { role: 'advisor', approverName: 'รศ.ดร.สมชาย ประเสริฐวิทย์', approverId: 'adv-01', status: 'approved', comment: 'หัวข้อมีความน่าสนใจและมีแนวทางระเบียบวิธีวิจัยที่ชัดเจน', updatedAt: '2026-01-20T10:00:00Z' },
      { role: 'chair', approverName: 'ผศ.ดร.ภัทระ ชัยประดิษฐ์', approverId: 'adv-03', status: 'approved', comment: 'เห็นชอบตามที่ปรึกษาเสนอ', updatedAt: '2026-01-22T14:30:00Z' },
      { role: 'grad_school', approverName: 'นางสาวรัชนี เจริญผล', approverId: 'off-01', status: 'approved', comment: 'อนุมัติหัวข้ออย่างเป็นทางการ', updatedAt: '2026-01-25T11:00:00Z' }
    ],
    submittedAt: '2026-01-18T09:00:00Z',
    approvedAt: '2026-01-25T11:00:00Z'
  },
  {
    id: 'prop-02',
    thesisId: 'the-02',
    studentId: 'std-02',
    studentName: 'น.ส.ศิริพร เกียรติสกุล',
    titleTh: 'กรอบการทำงานการตรวจจับภัยคุกคามในระบบคลาวด์แบบกระจายตัวด้วยกราฟความรู้',
    titleEn: 'Threat Detection Framework for Distributed Cloud Systems Using Knowledge Graphs',
    abstract: 'การวิจัยเพื่อสร้างโมเดลความสัมพันธ์ของพฤติกรรมผู้ใช้งานและระบบเน็ตเวิร์กบน Multi-Cloud ด้วย Knowledge Graph เพื่อระบุการโจมตีทางไซเบอร์แบบ Advanced Persistent Threats (APT)',
    keywords: ['Cybersecurity', 'Cloud Security', 'Knowledge Graph', 'Threat Detection'],
    majorAdvisorId: 'adv-02',
    majorAdvisorName: 'ศ.ดร.กนกวรรณ ศรีสวัสดิ์',
    status: 'approved',
    approvalChain: [
      { role: 'advisor', approverName: 'ศ.ดร.กนกวรรณ ศรีสวัสดิ์', approverId: 'adv-02', status: 'approved', comment: 'โครงร่างมีความพร้อม ผ่านการตรวจเบื้องต้นแล้ว', updatedAt: '2026-01-25T15:00:00Z' },
      { role: 'chair', approverName: 'ผศ.ดร.ภัทระ ชัยประดิษฐ์', approverId: 'adv-03', status: 'approved', comment: 'เห็นชอบ', updatedAt: '2026-01-26T09:00:00Z' },
      { role: 'grad_school', approverName: 'นางสาวรัชนี เจริญผล', approverId: 'off-01', status: 'approved', comment: 'อนุมัติผ่านระบบ', updatedAt: '2026-01-28T16:00:00Z' }
    ],
    submittedAt: '2026-01-23T10:00:00Z',
    approvedAt: '2026-01-28T16:00:00Z'
  },
  {
    id: 'prop-03',
    thesisId: 'the-03',
    studentId: 'std-03',
    studentName: 'นายกิตติศักดิ์ วงศ์สวรรค์',
    titleTh: 'การเพิ่มประสิทธิภาพการเรียนรู้ของเครื่องแบบกระจายศูนย์ผ่านบล็อกเชนประหยัดพลังงาน',
    titleEn: 'Optimizing Federated Learning via Energy-Efficient Consensus in Blockchain Networks',
    abstract: 'วิทยานิพนธ์ระดับปริญญาเอกมุ่งเน้นการแก้ปัญหาคอขวดด้านพลังงานและความเป็นส่วนตัวในการเทรนโมเดล Federated Learning ในอุปกรณ์เอดจ์ด้วย PoS Consensus ปรับปรุงใหม่',
    keywords: ['Federated Learning', 'Blockchain', 'Privacy Preservation', 'Edge AI'],
    majorAdvisorId: 'adv-01',
    majorAdvisorName: 'รศ.ดร.สมชาย ประเสริฐวิทย์',
    status: 'approved',
    approvalChain: [
      { role: 'advisor', approverName: 'รศ.ดร.สมชาย ประเสริฐวิทย์', approverId: 'adv-01', status: 'approved', comment: 'งานวิจัยมีคุณค่าระดับสากล เหมาะกับระดับปริญญาเอก', updatedAt: '2025-09-10T11:00:00Z' },
      { role: 'chair', approverName: 'ผศ.ดร.ภัทระ ชัยประดิษฐ์', approverId: 'adv-03', status: 'approved', comment: 'เห็นชอบ', updatedAt: '2025-09-12T14:00:00Z' },
      { role: 'grad_school', approverName: 'นางสาวรัชนี เจริญผล', approverId: 'off-01', status: 'approved', comment: 'อนุมัติเรียบร้อย', updatedAt: '2025-09-15T10:00:00Z' }
    ],
    submittedAt: '2025-09-05T08:30:00Z',
    approvedAt: '2025-09-15T10:00:00Z'
  },
  {
    id: 'prop-04',
    thesisId: 'the-04',
    studentId: 'std-04',
    studentName: 'น.ส.นริศรา ประภากร',
    titleTh: 'การสกัดและวิเคราะห์ความรู้สึกในบทวิจารณ์ภาษาไทยด้วยโมเดลภาษาขนาดใหญ่เฉพาะทาง',
    titleEn: 'Aspect-Based Sentiment Analysis in Thai Reviews Using Domain-Specific Large Language Models',
    abstract: 'ศึกษาการ Fine-tuning โมเดลภาษาไทยเพื่อเข้าใจบริบทภาษาแสลงและสำนวนในโซเชียลมีเดียสำหรับการจำแนกความรู้สึกของผู้บริโภค',
    keywords: ['NLP', 'Large Language Models', 'Thai Sentiment Analysis', 'Fine-tuning'],
    majorAdvisorId: 'adv-04',
    majorAdvisorName: 'รศ.ดร.วิรัช ตระกูลทอง',
    status: 'pending_chair',
    approvalChain: [
      { role: 'advisor', approverName: 'รศ.ดร.วิรัช ตระกูลทอง', approverId: 'adv-04', status: 'approved', comment: 'ขอบเขตเหมาะสม ส่งต่อไปยังประธานหลักสูตร', updatedAt: '2026-03-01T10:00:00Z' },
      { role: 'chair', status: 'pending' },
      { role: 'grad_school', status: 'pending' }
    ],
    submittedAt: '2026-02-28T09:00:00Z'
  },
  {
    id: 'prop-06',
    thesisId: 'the-06',
    studentId: 'std-06',
    studentName: 'น.ส.พีรญา บุญญานุรักษ์',
    titleTh: 'การออกแบบส่วนต่อประสานผู้ใช้เพื่อส่งเสริมการเข้าถึงสำหรับผู้มีความบกพร่องทางการมองเห็น',
    titleEn: 'Accessible User Interface Design for Visually Impaired Users on Mobile Platforms',
    abstract: 'การวิจัยการจัดวางองค์ประกอบแบบ Haptic Feedback และเสียงสังเคราะห์อัจฉริยะบนแอปพลิเคชันมือถือเพื่อความเท่าเทียมทางดิจิทัล',
    keywords: ['Accessibility', 'HCI', 'User Experience', 'Assistive Technology'],
    majorAdvisorId: 'adv-05',
    majorAdvisorName: 'อ.ดร.อัญชลี มิ่งขวัญ',
    status: 'pending_advisor',
    approvalChain: [
      { role: 'advisor', status: 'pending' },
      { role: 'chair', status: 'pending' },
      { role: 'grad_school', status: 'pending' }
    ],
    submittedAt: '2026-03-04T11:00:00Z'
  }
];

// Meeting & Exam Bookings (including Faculty Internal Meetings)
export const INITIAL_EXAM_SCHEDULES: ExamSchedule[] = [
  {
    id: 'sch-01',
    thesisId: 'the-01',
    studentId: 'std-01',
    studentName: 'นายธนพล สุขสวัสดิ์',
    title: 'สอบเค้าโครงวิทยานิพนธ์ (Proposal Exam) - นายธนพล สุขสวัสดิ์',
    purposeType: 'thesis_proposal',
    scheduledDate: '2026-03-15',
    startTime: '09:00',
    endTime: '12:00',
    roomType: 'onsite',
    roomId: 'room-201',
    roomName: 'ห้องสอบวิทยานิพนธ์และห้องรับรอง 1',
    building: 'อาคารเจริญวิศวกรรม (ชั้น 2)',
    bookedBy: 'เจ้าหน้าที่บัณฑิตศึกษา',
    contactPhone: '02-218-6900',
    attendeeCount: 8,
    notes: 'เตรียมโปรเจกเตอร์และระบบบันทึกเสียง',
    status: 'confirmed',
    committee: [
      { id: 'com-01', fullName: 'ศ.ดร.วิโรจน์ พิริยะกุล', role: 'chair', institution: 'มหาวิทยาลัยเกษตรศาสตร์', hasConfirmed: true },
      { id: 'adv-01', fullName: 'รศ.ดร.สมชาย ประเสริฐวิทย์', role: 'committee', institution: 'จุฬาลงกรณ์มหาวิทยาลัย', hasConfirmed: true },
      { id: 'adv-03', fullName: 'ผศ.ดร.ภัทระ ชัยประดิษฐ์', role: 'committee', institution: 'จุฬาลงกรณ์มหาวิทยาลัย', hasConfirmed: true }
    ],
    result: 'passed'
  },
  {
    id: 'sch-02',
    purposeType: 'faculty_meeting',
    title: 'ประชุมคณะกรรมการบริหารคณะวิศวกรรมศาสตร์ ประจำเดือนมีนาคม',
    scheduledDate: '2026-03-15',
    startTime: '13:30',
    endTime: '16:30',
    roomType: 'hybrid',
    roomId: 'room-board',
    roomName: 'ห้องประชุมผู้บริหารและกรรมการประจำคณะ (Executive Boardroom)',
    building: 'อาคารวิศวฯ 100 ปี (ชั้น 5)',
    onlineMeetingUrl: 'https://teams.microsoft.com/l/meetup-join/boardroom-eng',
    bookedBy: 'สำนักงานคณบดี',
    contactPhone: '02-218-6300',
    attendeeCount: 25,
    notes: 'วาระพิจารณาแผนงบประมาณและอัตรากำลังอาจารย์ใหม่ มีจัดอาหารว่างช่วง 14:45 น.',
    status: 'confirmed'
  },
  {
    id: 'sch-03',
    thesisId: 'the-03',
    studentId: 'std-03',
    studentName: 'นายกิตติศักดิ์ วงศ์สวรรค์',
    title: 'สอบปากเปล่าขั้นสุดท้าย (Final Defense Exam) - นายกิตติศักดิ์ วงศ์สวรรค์ (Ph.D.)',
    purposeType: 'thesis_defense',
    scheduledDate: '2026-03-18',
    startTime: '09:00',
    endTime: '12:00',
    roomType: 'hybrid',
    roomId: 'room-101',
    roomName: 'ห้องประชุมวิศวกรรม 1 (ห้องประชุมใหญ่คณะ)',
    building: 'อาคารวิศวฯ 100 ปี (ชั้น 3)',
    onlineMeetingUrl: 'https://chula.zoom.us/j/9871234567',
    bookedBy: 'เจ้าหน้าที่บัณฑิตศึกษา',
    contactPhone: '02-218-6900',
    attendeeCount: 15,
    notes: 'มีผู้ทรงคุณวุฒิภายนอกเข้าร่วมผ่าน Zoom 1 ท่าน',
    status: 'confirmed',
    committee: [
      { id: 'com-01', fullName: 'ศ.ดร.วิโรจน์ พิริยะกุล', role: 'chair', institution: 'มหาวิทยาลัยเกษตรศาสตร์', hasConfirmed: true, score: 95 },
      { id: 'adv-01', fullName: 'รศ.ดร.สมชาย ประเสริฐวิทย์', role: 'committee', institution: 'จุฬาลงกรณ์มหาวิทยาลัย', hasConfirmed: true, score: 92 },
      { id: 'adv-02', fullName: 'ศ.ดร.กนกวรรณ ศรีสวัสดิ์', role: 'committee', institution: 'จุฬาลงกรณ์มหาวิทยาลัย', hasConfirmed: true, score: 94 }
    ],
    result: 'passed_with_conditions',
    resultConditions: 'แก้ไขเพิ่มเติมการวิเคราะห์ความซับซ้อนของอัลกอริทึมในบทที่ 4 หน้า 85-92',
    revisionDeadline: '2026-04-18'
  },
  {
    id: 'sch-04',
    purposeType: 'department_meeting',
    title: 'ประชุมภาควิชาวิศวกรรมคอมพิวเตอร์ เรื่องปรับปรุงหลักสูตร OBE/AUN-QA',
    scheduledDate: '2026-03-20',
    startTime: '10:00',
    endTime: '12:00',
    roomType: 'onsite',
    roomId: 'room-102',
    roomName: 'ห้องประชุมสัมมนาวิชาการ (Seminar Room A)',
    building: 'อาคารวิศวฯ 100 ปี (ชั้น 4)',
    bookedBy: 'ผศ.ดร.ภัทระ ชัยประดิษฐ์',
    contactPhone: '02-218-6950',
    attendeeCount: 18,
    notes: 'เตรียมเอกสาร มคอ.3 และแบบประเมินผลลัพธ์การเรียนรู้ CLO',
    status: 'confirmed'
  },
  {
    id: 'sch-05',
    purposeType: 'academic_seminar',
    title: 'สัมมนาวิจัยระดับบัณฑิตศึกษา: Next-Gen AI & Generative Workflows',
    scheduledDate: '2026-03-22',
    startTime: '13:00',
    endTime: '16:00',
    roomType: 'hybrid',
    roomId: 'room-101',
    roomName: 'ห้องประชุมวิศวกรรม 1 (ห้องประชุมใหญ่คณะ)',
    building: 'อาคารวิศวฯ 100 ปี (ชั้น 3)',
    onlineMeetingUrl: 'https://chula.zoom.us/j/9871234567',
    bookedBy: 'รศ.ดร.สมชาย ประเสริฐวิทย์',
    contactPhone: '02-218-6922',
    attendeeCount: 35,
    notes: 'เปิดให้นิสิต ป.โท-เอก และคณาจารย์เข้ารับฟัง',
    status: 'confirmed'
  }
];

export const INITIAL_ADVISORY_LOGS: AdvisoryMeetingLog[] = [
  {
    id: 'advlog-01',
    thesisId: 'the-01',
    studentId: 'std-01',
    meetingDate: '2026-02-15',
    durationMinutes: 60,
    topicDiscussed: 'ทบทวนวรรณกรรมที่เกี่ยวข้องและกำหนด Baseline Models สำหรับเปรียบเทียบผล',
    studentSummary: 'ได้เลือกโมเดล ResNet-50 และ ViT-Base เป็นเกณฑ์เปรียบเทียบ อาจารย์แนะนำให้เพิ่มการทดสอบบนชุดข้อมูล NIH Chest X-Ray ด้วย',
    actionItemsNextMeeting: 'เทรนโมเดลเบื้องต้นบน GPU Cluster และทำ Confusion Matrix มานำเสนอ',
    isAdvisorConfirmed: true,
    advisorComment: 'ดำเนินการได้ตามแผนงาน ขอให้นำเสนอผลการวัดค่า F1-Score ในสัปดาห์หน้า',
    confirmedAt: '2026-02-16T14:00:00Z'
  },
  {
    id: 'advlog-02',
    thesisId: 'the-01',
    studentId: 'std-01',
    meetingDate: '2026-03-01',
    durationMinutes: 45,
    topicDiscussed: 'รายงานความคืบหน้าผลการจำแนกภาพและการปรับจูน Hyperparameters',
    studentSummary: 'ค่าความแม่นยำ (Accuracy) เพิ่มขึ้นเป็น 94.2% พบปัญหา Overfitting เล็กน้อยในภาพที่มีสัญญาณรบกวน',
    actionItemsNextMeeting: 'เพิ่มเทคนิค Data Augmentation และเตรียมโครงร่างบทความเพื่อส่งประชุมวิชาการ',
    isAdvisorConfirmed: true,
    advisorComment: 'ผลน่าพอใจมาก ให้เริ่มร่างบทที่ 4 ได้เลย',
    confirmedAt: '2026-03-02T11:30:00Z'
  },
  {
    id: 'advlog-03',
    thesisId: 'the-05',
    studentId: 'std-05',
    meetingDate: '2025-12-10',
    durationMinutes: 30,
    topicDiscussed: 'การออกแบบฮาร์ดแวร์ IoT Sensor Hub',
    studentSummary: 'ติดปัญหาการสื่อสารผ่านโปรโตคอล LoRaWAN เมื่ออยู่ในพื้นที่อับสัญญาณ',
    actionItemsNextMeeting: 'แก้ไขเสาอากาศและทดสอบใหม่',
    isAdvisorConfirmed: false // ขาดการติดต่อเกิน 60 วัน! เข้าเกณฑ์ At-risk Alert
  }
];

export const INITIAL_PROGRESS_REPORTS: SemesterProgressReport[] = [
  {
    id: 'rep-01',
    thesisId: 'the-01',
    studentId: 'std-01',
    academicYear: 2568,
    semester: 2,
    progressPercentage: 75,
    completedWorkSummary: 'ดำเนินการทดลองเสร็จสิ้น 80% เขียนร่างวิทยานิพนธ์บทที่ 1-3 สมบูรณ์ และร่างบทที่ 4 ไปแล้วครึ่งหนึ่ง',
    submittedAt: '2026-02-20T17:00:00Z',
    evaluation: 'S',
    advisorRemarks: 'มีความก้าวหน้าตามแผนงานวิจัยที่วางไว้เป็นอย่างดี',
    evaluatedAt: '2026-02-25T10:00:00Z'
  },
  {
    id: 'rep-03',
    thesisId: 'the-03',
    studentId: 'std-03',
    academicYear: 2568,
    semester: 2,
    progressPercentage: 95,
    completedWorkSummary: 'เขียนเล่มวิทยานิพนธ์ฉบับสมบูรณ์ครบทั้ง 5 บท และได้รับการตีพิมพ์บทความวิชาการในวารสาร Scopus Q1 เรียบร้อย',
    submittedAt: '2026-02-15T15:00:00Z',
    evaluation: 'S',
    advisorRemarks: 'พร้อมสอบปากเปล่าขั้นสุดท้าย',
    evaluatedAt: '2026-02-18T09:00:00Z'
  },
  {
    id: 'rep-05',
    thesisId: 'the-05',
    studentId: 'std-05',
    academicYear: 2568,
    semester: 1,
    progressPercentage: 30,
    completedWorkSummary: 'ยังไม่สามารถดำเนินการเก็บข้อมูลภาคสนามได้ครบตามแผน',
    submittedAt: '2025-11-20T18:00:00Z',
    evaluation: 'U',
    advisorRemarks: 'ขาดการติดต่อและไม่ส่งงานตามกำหนด ขอให้นิสิตเข้าพบด่วน',
    evaluatedAt: '2025-11-28T14:00:00Z'
  }
];

export const INITIAL_PREREQUISITES: DefensePrerequisites[] = [
  {
    studentId: 'std-01',
    englishProficiencyPassed: true,
    englishTestName: 'CU-TEP',
    englishScore: 82,
    proposalExamPassed: true,
    publicationPassed: true,
    publicationDetails: {
      journalName: 'IEEE Access (Open Access Journal)',
      paperTitle: 'Hybrid Vision Transformers for Pulmonary Abnormality Classification',
      tier: 'Scopus Q1 / Web of Science',
      publishedDate: '2026-02-10',
      doiOrUrl: '10.1109/ACCESS.2026.3129841'
    },
    isEligibleForDefense: true
  },
  {
    studentId: 'std-02',
    englishProficiencyPassed: true,
    englishTestName: 'TOEFL iBT',
    englishScore: 92,
    proposalExamPassed: true,
    publicationPassed: false, // ยังไม่มีเปเปอร์ จึงยังไม่ eligible
    isEligibleForDefense: false
  },
  {
    studentId: 'std-03',
    englishProficiencyPassed: true,
    englishTestName: 'IELTS Academic',
    englishScore: 7.5,
    proposalExamPassed: true,
    publicationPassed: true,
    publicationDetails: {
      journalName: 'ACM Transactions on Cyber-Physical Systems',
      paperTitle: 'Energy-Centric Federated Consensus on Decentralized Edge Networks',
      tier: 'Scopus Q1',
      publishedDate: '2025-11-15',
      doiOrUrl: '10.1145/3498120'
    },
    isEligibleForDefense: true
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-01',
    studentId: 'std-01',
    studentName: 'นายธนพล สุขสวัสดิ์',
    date: '2026-03-05',
    time: '08:55:12',
    type: 'face_scan',
    status: 'present',
    verificationHashMatch: true
  },
  {
    id: 'att-02',
    studentId: 'std-02',
    studentName: 'น.ส.ศิริพร เกียรติสกุล',
    date: '2026-03-05',
    time: '08:58:34',
    type: 'face_scan',
    status: 'present',
    verificationHashMatch: true
  },
  {
    id: 'att-03',
    studentId: 'std-04',
    studentName: 'น.ส.นริศรา ประภากร',
    date: '2026-03-05',
    time: '09:12:45',
    type: 'face_scan',
    status: 'late',
    verificationHashMatch: true
  },
  {
    id: 'att-04',
    studentId: 'std-06',
    studentName: 'น.ส.พีรญา บุญญานุรักษ์',
    date: '2026-03-05',
    time: '09:02:10',
    type: 'manual',
    status: 'present',
    verificationHashMatch: true
  },
  {
    id: 'att-05',
    studentId: 'std-07',
    studentName: 'นายศุภวิชญ์ จิตภักดี',
    date: '2026-03-05',
    time: '09:05:00',
    type: 'face_scan',
    status: 'present',
    verificationHashMatch: true
  }
];

export const INITIAL_FINAL_ARCHIVE: FinalThesisArchive[] = [
  {
    id: 'arc-01',
    thesisId: 'the-03',
    finalDocumentFile: '6570089221_Kittisak_Final_Thesis_Complete.pdf',
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
  }
];

export function getInitialBackupData(): GTMTS_BackupData {
  return {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    appTitle: 'Graduate Thesis Management and Tracking System (GTMTS)',
    data: {
      users: [...INITIAL_STUDENTS, ...INITIAL_ADVISORS, INITIAL_OFFICER, INITIAL_ADMIN, INITIAL_COMMITTEE_USER],
      rooms: INITIAL_ROOMS,
      topicProposals: INITIAL_TOPIC_PROPOSALS,
      examSchedules: INITIAL_EXAM_SCHEDULES,
      advisoryLogs: INITIAL_ADVISORY_LOGS,
      progressReports: INITIAL_PROGRESS_REPORTS,
      prerequisites: INITIAL_PREREQUISITES,
      finalArchives: INITIAL_FINAL_ARCHIVE,
      attendanceRecords: INITIAL_ATTENDANCE
    }
  };
}
