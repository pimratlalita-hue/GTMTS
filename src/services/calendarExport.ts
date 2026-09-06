import { ExamSchedule } from '../types';

/**
 * Generates an iCalendar (.ics) formatted string and triggers file download
 */
export function downloadCalendarInvite(schedule: ExamSchedule): void {
  const dateParts = schedule.scheduledDate.split('-'); // [YYYY, MM, DD]
  const [startH, startM] = schedule.startTime.split(':');
  const [endH, endM] = schedule.endTime.split(':');

  const pad = (n: string | number) => String(n).padStart(2, '0');

  const dtStart = `${dateParts[0]}${pad(dateParts[1])}${pad(dateParts[2])}T${pad(startH)}${pad(startM)}00`;
  const dtEnd = `${dateParts[0]}${pad(dateParts[1])}${pad(dateParts[2])}T${pad(endH)}${pad(endM)}00`;
  const nowStr = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';

  const description = [
    `วัตถุประสงค์: ${schedule.purposeType}`,
    `ผู้จอง: ${schedule.bookedBy}`,
    schedule.contactPhone ? `เบอร์ติดต่อ: ${schedule.contactPhone}` : '',
    schedule.onlineMeetingUrl ? `ลิงก์การประชุม: ${schedule.onlineMeetingUrl}` : '',
    schedule.roomLayout ? `รูปแบบจัดโต๊ะ: ${schedule.roomLayout}` : '',
    schedule.notes ? `หมายเหตุ: ${schedule.notes}` : ''
  ]
    .filter(Boolean)
    .join('\\n');

  const location = schedule.roomName
    ? `${schedule.roomName} (${schedule.building || 'คณะวิศวกรรมศาสตร์'})`
    : 'ระบบออนไลน์';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Chulalongkorn University//GTMTS Room System//TH',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:gtmts-booking-${schedule.id}@chula.ac.th`,
    `DTSTAMP:${nowStr}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${schedule.title || 'นัดหมายการใช้ห้องประชุมคณะ'}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `meeting_${schedule.scheduledDate}_${schedule.id}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
