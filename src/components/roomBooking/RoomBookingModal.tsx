import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { ExamRoom, ExamSchedule, BookingPurposeType, RoomType } from '../../types';
import { useApp } from '../../context/AppContext';
import { checkRoomBookingConflict } from '../../services/conflictEngine';
import { AlertCircle, Calendar, Clock, MapPin, Users, Video } from 'lucide-react';

interface RoomBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoom?: ExamRoom | null;
  editingSchedule?: ExamSchedule | null;
}

export const RoomBookingModal: React.FC<RoomBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedRoom,
  editingSchedule
}) => {
  const { rooms, examSchedules, currentUser, bookRoom } = useApp();

  const [purposeType, setPurposeType] = useState<BookingPurposeType>(
    editingSchedule?.purposeType || 'faculty_meeting'
  );
  const [title, setTitle] = useState(
    editingSchedule?.title || (preselectedRoom ? `การประชุม ณ ${preselectedRoom.name}` : '')
  );
  const [roomId, setRoomId] = useState(
    editingSchedule?.roomId || preselectedRoom?.id || (rooms[0]?.id || '')
  );
  const [scheduledDate, setScheduledDate] = useState(
    editingSchedule?.scheduledDate || new Date().toISOString().slice(0, 10)
  );
  const [startTime, setStartTime] = useState(editingSchedule?.startTime || '09:00');
  const [endTime, setEndTime] = useState(editingSchedule?.endTime || '12:00');
  const [bookedBy, setBookedBy] = useState(editingSchedule?.bookedBy || currentUser.fullName);
  const [contactPhone, setContactPhone] = useState(editingSchedule?.contactPhone || '02-218-6000');
  const [attendeeCount, setAttendeeCount] = useState<number>(
    editingSchedule?.attendeeCount || 10
  );
  const [onlineMeetingUrl, setOnlineMeetingUrl] = useState(
    editingSchedule?.onlineMeetingUrl || preselectedRoom?.defaultOnlineUrl || ''
  );
  const [notes, setNotes] = useState(editingSchedule?.notes || '');
  const [roomLayout, setRoomLayout] = useState<'u_shape' | 'classroom' | 'theater' | 'boardroom'>(
    editingSchedule?.roomLayout || 'u_shape'
  );
  const [morningCatering, setMorningCatering] = useState(
    editingSchedule?.catering?.includes('morning') || false
  );
  const [afternoonCatering, setAfternoonCatering] = useState(
    editingSchedule?.catering?.includes('afternoon') || false
  );
  const [needTechnician, setNeedTechnician] = useState(
    editingSchedule?.needTechnician || false
  );
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  // Sync when preselectedRoom or editingSchedule changes
  useEffect(() => {
    if (editingSchedule) {
      setPurposeType(editingSchedule.purposeType);
      setTitle(editingSchedule.title || '');
      setRoomId(editingSchedule.roomId || (rooms[0]?.id || ''));
      setScheduledDate(editingSchedule.scheduledDate);
      setStartTime(editingSchedule.startTime);
      setEndTime(editingSchedule.endTime);
      setBookedBy(editingSchedule.bookedBy);
      setContactPhone(editingSchedule.contactPhone || '');
      setAttendeeCount(editingSchedule.attendeeCount || 10);
      setOnlineMeetingUrl(editingSchedule.onlineMeetingUrl || '');
      setNotes(editingSchedule.notes || '');
    } else if (preselectedRoom) {
      setRoomId(preselectedRoom.id);
      setTitle(`การประชุม/สัมมนา ณ ${preselectedRoom.name}`);
      setOnlineMeetingUrl(preselectedRoom.defaultOnlineUrl || '');
    }
  }, [editingSchedule, preselectedRoom, rooms]);

  // Real-time Conflict Engine check
  useEffect(() => {
    if (roomId && scheduledDate && startTime && endTime) {
      if (startTime >= endTime) {
        setConflictWarning('เวลาเริ่มต้นต้องน้อยกว่าเวลาสิ้นสุดการประชุม');
        return;
      }
      const check = checkRoomBookingConflict(
        roomId,
        scheduledDate,
        startTime,
        endTime,
        examSchedules,
        editingSchedule?.id
      );
      if (check.hasConflict) {
        setConflictWarning(check.message || 'ช่วงเวลานี้มีผู้จองห้องแล้ว');
      } else {
        setConflictWarning(null);
      }
    }
  }, [roomId, scheduledDate, startTime, endTime, examSchedules, editingSchedule]);

  const selectedRoomObj = rooms.find((r) => r.id === roomId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const roomType: RoomType = selectedRoomObj ? selectedRoomObj.type : 'onsite';

    const bookingPayload: Omit<ExamSchedule, 'id'> = {
      purposeType,
      title,
      roomId,
      roomName: selectedRoomObj?.name,
      building: selectedRoomObj?.building,
      roomType,
      scheduledDate,
      startTime,
      endTime,
      bookedBy,
      contactPhone,
      attendeeCount,
      roomLayout,
      catering: [morningCatering && 'morning', afternoonCatering && 'afternoon'].filter(Boolean) as string[],
      needTechnician,
      onlineMeetingUrl: onlineMeetingUrl || selectedRoomObj?.defaultOnlineUrl,
      notes,
      status: 'confirmed'
    };

    const res = bookRoom(bookingPayload, editingSchedule?.id);
    if (res.success) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingSchedule ? 'แก้ไขการจองห้อง' : 'แบบฟอร์มจองห้องประชุมและห้องสอบคณะ'}
      subtitle="ระบบตรวจสอบเวลาชนกันแบบอัตโนมัติ (Automated Conflict Detection)"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Real-time Conflict Alert Banner */}
        {conflictWarning && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold">คำเตือนช่วงเวลาชนกัน: </span>
              {conflictWarning}
            </div>
          </div>
        )}

        {/* Purpose Type */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            วัตถุประสงค์การใช้ห้อง <span className="text-rose-500">*</span>
          </label>
          <select
            value={purposeType}
            onChange={(e) => setPurposeType(e.target.value as BookingPurposeType)}
            className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
          >
            <option value="faculty_meeting">ประชุมคณะกรรมการบริหารคณะ (Faculty Board)</option>
            <option value="department_meeting">ประชุมภาควิชา / หลักสูตร (Department Meeting)</option>
            <option value="academic_seminar">สัมมนาวิชาการ / บรรยายพิเศษ (Seminar)</option>
            <option value="thesis_proposal">สอบเค้าโครงวิทยานิพนธ์ (Thesis Proposal Exam)</option>
            <option value="thesis_defense">สอบปากเปล่าขั้นสุดท้าย (Final Thesis Defense)</option>
            <option value="other">การประชุมหรือกิจกรรมอื่นๆ (General Meeting)</option>
          </select>
        </div>

        {/* Meeting Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            ชื่องาน / วาระการประชุม <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="เช่น ประชุมวางแผนพัฒนาหลักสูตร หรือ สอบเค้าโครง นศ. ธนพล"
            className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>

        {/* Room Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            เลือกห้องประชุม / ห้องสอบ <span className="text-rose-500">*</span>
          </label>
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
          >
            {rooms.map((r) => (
              <option key={r.id} value={r.id} disabled={!r.isAvailable}>
                {r.name} ({r.building} - ความจุ {r.capacity} คน) {!r.isAvailable ? '[ปิดปรับปรุง]' : ''}
              </option>
            ))}
          </select>
          {selectedRoomObj && (
            <div className="mt-1.5 p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 flex items-center justify-between">
              <span className="flex items-center">
                <MapPin className="w-3 h-3 text-slate-400 mr-1" />
                {selectedRoomObj.building} (ความจุ {selectedRoomObj.capacity} ที่นั่ง)
              </span>
              <span className="text-pink-600 font-medium">
                {selectedRoomObj.facilities.slice(0, 2).join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Date and Time Slots */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              วันที่จอง <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              เวลาเริ่ม <span className="text-rose-500">*</span>
            </label>
            <input
              type="time"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              เวลาสิ้นสุด <span className="text-rose-500">*</span>
            </label>
            <input
              type="time"
              required
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Contact info & Attendees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ผู้จอง / ผู้ประสานงาน <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={bookedBy}
              onChange={(e) => setBookedBy(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">เบอร์โทรติดต่อ</label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">จำนวนผู้เข้าร่วม (คน)</label>
            <input
              type="number"
              min={1}
              max={selectedRoomObj?.capacity || 100}
              value={attendeeCount}
              onChange={(e) => setAttendeeCount(Number(e.target.value))}
              className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Online URL (for Hybrid or Online) */}
        {(selectedRoomObj?.type === 'hybrid' || selectedRoomObj?.type === 'online') && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ลิงก์การประชุมออนไลน์ (Zoom / MS Teams / Google Meet)
            </label>
            <div className="flex items-center space-x-2">
              <Video className="w-4 h-4 text-slate-400" />
              <input
                type="url"
                value={onlineMeetingUrl}
                onChange={(e) => setOnlineMeetingUrl(e.target.value)}
                placeholder="https://chula.zoom.us/j/..."
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Room Layout & Logistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              รูปแบบการจัดโต๊ะห้องประชุม
            </label>
            <select
              value={roomLayout}
              onChange={(e) => setRoomLayout(e.target.value as any)}
              className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
            >
              <option value="u_shape">รูปตัว U (U-Shape - ประชุม/สอบ)</option>
              <option value="boardroom">โต๊ะประชุมยาว (Boardroom - ผู้บริหาร)</option>
              <option value="classroom">ชั้นเรียน (Classroom - อบรม/บรรยาย)</option>
              <option value="theater">เธียเตอร์ (Theater - ผู้ฟังจำนวนมาก)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              บริการเสริมและโสตทัศนูปกรณ์
            </label>
            <div className="space-y-1.5 pt-0.5 text-[11px] text-slate-700">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={morningCatering}
                  onChange={(e) => setMorningCatering(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-pink-500"
                />
                <span>อาหารว่างช่วงเช้า (Morning Break 10:30 น.)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={afternoonCatering}
                  onChange={(e) => setAfternoonCatering(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-pink-500"
                />
                <span>อาหารว่างช่วงบ่าย (Afternoon Break 14:30 น.)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needTechnician}
                  onChange={(e) => setNeedTechnician(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-pink-500"
                />
                <span className="font-semibold text-pink-700">ต้องการเจ้าหน้าที่โสตฯ ดูแลระบบ</span>
              </label>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            หมายเหตุ / สิ่งที่ต้องการให้จัดเตรียมเพิ่มเติม
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="เช่น ขอไมค์ลอยเพิ่ม 2 ตัว, ทดสอบสัญญาณ Zoom ล่วงหน้า 15 นาที"
            className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            disabled={!!conflictWarning}
            className="px-5 py-2 text-xs font-semibold bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 text-white rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-pink-500 focus:outline-none"
          >
            {editingSchedule ? 'บันทึกการแก้ไข' : 'ยืนยันการจองห้อง'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
