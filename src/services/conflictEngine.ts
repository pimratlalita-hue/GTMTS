import { ExamSchedule } from '../types';

/**
 * Checks if two time intervals overlap on the same day:
 * Overlap exists iff (Start_A < End_B) AND (End_A > Start_B)
 *
 * @param startA - e.g. "09:00"
 * @param endA   - e.g. "12:00"
 * @param startB - e.g. "11:30"
 * @param endB   - e.g. "13:00"
 */
export function isTimeIntervalOverlapping(
  startA: string,
  endA: string,
  startB: string,
  endB: string
): boolean {
  // Convert "HH:mm" to total minutes from midnight for safe comparisons
  const toMinutes = (timeStr: string): number => {
    const [h, m] = timeStr.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  };

  const aStartMin = toMinutes(startA);
  const aEndMin = toMinutes(endA);
  const bStartMin = toMinutes(startB);
  const bEndMin = toMinutes(endB);

  return aStartMin < bEndMin && aEndMin > bStartMin;
}

export interface ConflictCheckResult {
  hasConflict: boolean;
  conflictingSchedules: ExamSchedule[];
  message?: string;
}

/**
 * Validates whether a new or updated booking request conflicts with existing room bookings.
 */
export function checkRoomBookingConflict(
  roomId: string,
  scheduledDate: string,
  startTime: string,
  endTime: string,
  existingSchedules: ExamSchedule[],
  ignoreScheduleId?: string
): ConflictCheckResult {
  // Filter schedules on the same room and same date
  const roomSchedulesOnDate = existingSchedules.filter((sch) => {
    if (ignoreScheduleId && sch.id === ignoreScheduleId) return false;
    if (sch.status === 'cancelled') return false;
    // For online rooms, conflicts might only occur if specifically reserved or limited
    return sch.roomId === roomId && sch.scheduledDate === scheduledDate;
  });

  const conflicts: ExamSchedule[] = [];

  for (const item of roomSchedulesOnDate) {
    if (isTimeIntervalOverlapping(startTime, endTime, item.startTime, item.endTime)) {
      conflicts.push(item);
    }
  }

  if (conflicts.length > 0) {
    const first = conflicts[0];
    return {
      hasConflict: true,
      conflictingSchedules: conflicts,
      message: `ห้องนี้มีการจองแล้วในช่วงเวลาดังกล่าว: "${first.title || first.purposeType}" เวลา ${first.startTime} - ${first.endTime} น. (ผู้จอง: ${first.bookedBy})`
    };
  }

  return {
    hasConflict: false,
    conflictingSchedules: []
  };
}
