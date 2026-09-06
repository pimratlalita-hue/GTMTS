# Graduate Thesis Management and Tracking System (GTMTS)
## ระบบบริหารจัดการกระบวนการวิทยานิพนธ์และระบบจองห้องประชุมคณะ

ระบบเว็บแอปพลิเคชัน Single Page Application (SPA) พัฒนาด้วย React 18, TypeScript, Tailwind CSS, และ Google GenAI SDK สำหรับการบริหารจัดการกระบวนการวิทยานิพนธ์ระดับบัณฑิตศึกษา และระบบจองห้องประชุมและห้องสอบประจำคณะ

---

## ฟังก์ชันเด่นของระบบ (Key Features)

1. **ระบบจองห้องประชุมและห้องสอบประจำคณะ (Faculty Room & Exam Scheduling):**
   * ตรวจจับช่วงเวลาทับซ้อน/ชนกันแบบอัตโนมัติ (Automated Conflict Detection: $Start_A < End_B \land End_A > Start_B$)
   * แสดงผังตารางความว่างรายชั่วโมง (Interactive Hourly Gantt Timeline 08:00 - 18:00 น.)
   * รองรับทั้งห้องสอบทางกายภาพ (On-site) และห้องประชุมออนไลน์ (Zoom / MS Teams / Google Meet)
   * ระบุรูปแบบการจัดโต๊ะ (U-Shape, Classroom, Theater, Boardroom) และบริการอาหารว่าง/โสตทัศนูปกรณ์
   * ส่งออกนัดหมายปฏิทิน `.ics` (Outlook / Google Calendar) ใน 1 คลิก
   * พิมพ์เอกสารรายงานผลการสอบและอนุมัติเล่มทางการ (Official Printable Approval Sheet)

2. **ระบบชีวมิติและการเช็คชื่อตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA Biometrics):**
   * กล้องเว็บแคมสกัดลักษณะใบหน้าเป็นรหัสข้อความ **SHA-256 Text Signature Hash**
   * ปลอดภัยตามกฎหมาย PDPA: **ไม่มีการจัดเก็บภาพถ่ายใบหน้าจริงลงในหน่วยความจำ**
   * เช็คชื่อ 2 รูปแบบ (สแกนใบหน้า และแบบเลือกรายชื่อปกติ)

3. **กระบวนการวิทยานิพนธ์ครบวงจร (Thesis Lifecycle):**
   * ยื่นเสนอหัวข้อ 2 ภาษา (ไทย-อังกฤษ) พร้อมตรวจสอบโควตานักศึกษาของอาจารย์ที่ปรึกษาแบบเรียลไทม์
   * สายงานการอนุมัติ 4 ชั้น (นิสิต $\rightarrow$ ที่ปรึกษา $\rightarrow$ ประธานหลักสูตร $\rightarrow$ บัณฑิตวิทยาลัย)
   * สมุดบันทึกการพบอาจารย์ที่ปรึกษา (Advisory Meeting Logs) พร้อมปุ่มลงนามรับรอง
   * ตรวจสอบคุณสมบัติก่อนขอสอบจบอัตโนมัติ (Pre-requisites: CU-TEP/TOEFL + เปเปอร์ตีพิมพ์)
   * ตรวจรับเล่มสมบูรณ์ (Turnitin Similarity %) และส่งออกคลังปัญญาสถาบัน (Institutional Repository)

4. **Gemini AI Integration (@google/genai):**
   * ขัดเกลาและวิเคราะห์ชื่อวิทยานิพนธ์ 2 ภาษา และเสนอแนะคำสำคัญ (Keywords)
   * สรุปสาระสำคัญของบทคัดย่อ (Abstract Summarizer)

5. **State Management & Portability:**
   * บันทึกสถานะลง LocalStorage อัตโนมัติ ข้อมูลคงอยู่แม้รีเฟรช
   * สำรอง/กู้คืนข้อมูลทั้งระบบผ่านไฟล์ `gtmts_backup.json`
   * ปุ่มล้างข้อมูลทั้งระบบ (One-Click Factory Reset)

6. **UI/UX Design System:**
   * Light Mode สะอาดตา โทนชมพู-เทา คอนเทนต์จำกัดที่ `max-w-5xl`
   * ปุ่มเปิดโหมดจอโปรเจกเตอร์ (High-Contrast Projector Mode)
   * สลับดูมุมมอง 5 บทบาท (นิสิต, ที่ปรึกษา, กรรมการ, เจ้าหน้าที่, ผู้ดูแลระบบ)

---

## วิธีการติดตั้งและเริ่มใช้งาน (Getting Started)

### ความต้องการของระบบ (Prerequisites)
* [Node.js](https://nodejs.org/) เวอร์ชัน 18 ขึ้นไป

### คำสั่งเริ่มใช้งาน
```bash
# ติดตั้ง Dependencies
npm install

# รัน Development Server
npm run dev

# บิวด์สำหรับ Production
npm run build
```

เปิดเว็บเบราว์เซอร์ไปที่: `http://localhost:3000`
