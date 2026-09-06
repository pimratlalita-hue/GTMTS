import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExamRoom, ExamSchedule, BookingPurposeType } from '../../types';
import { RoomListCard } from './RoomListCard';
import { RoomBookingModal } from './RoomBookingModal';
import { EmptyState } from '../common/EmptyState';
import { PrintableApprovalSheetModal } from '../common/PrintableApprovalSheetModal';
import { downloadCalendarInvite } from '../../services/calendarExport';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  Plus,
  Filter,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit3,
  Download,
  Printer,
  Search,
  Grid,
  List,
  Coffee,
  Wrench
} from 'lucide-react';

export const RoomCalendarView: React.FC = () => {
  const { rooms, examSchedules, cancelBooking, currentUser } = useApp();

  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<ExamRoom | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<ExamSchedule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [printSchedule, setPrintSchedule] = useState<ExamSchedule | null>(null);

  // View Mode: 'list' or 'grid' (Gantt timeline)
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('timeline');

  // Filters
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [filterRoomId, setFilterRoomId] = useState<string>('all');
  const [filterPurpose, setFilterPurpose] = useState<string>('all');

  const filteredSchedules = examSchedules.filter((sch) => {
    if (sch.status === 'cancelled') return false;
    if (filterDate && sch.scheduledDate !== filterDate) return false;
    if (filterRoomId !== 'all' && sch.roomId !== filterRoomId) return false;
    if (filterPurpose !== 'all' && sch.purposeType !== filterPurpose) return false;
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchTitle = sch.title?.toLowerCase().includes(q);
      const matchRoom = sch.roomName?.toLowerCase().includes(q);
      const matchBooker = sch.bookedBy?.toLowerCase().includes(q);
      if (!matchTitle && !matchRoom && !matchBooker) return false;
    }
    return true;
  });

  const getPurposeBadge = (purpose: BookingPurposeType) => {
    switch (purpose) {
      case 'faculty_meeting':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">ประชุมคณะ</span>;
      case 'department_meeting':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">ประชุมภาควิชา</span>;
      case 'academic_seminar':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">สัมมนาวิชาการ</span>;
      case 'thesis_proposal':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-100 text-pink-800">สอบเค้าโครง</span>;
      case 'thesis_defense':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">สอบปากเปล่า</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">การประชุมทั่วไป</span>;
    }
  };

  const handleOpenNewBooking = (prefillRoom?: ExamRoom, prefillTime?: string) => {
    setSelectedRoomForBooking(prefillRoom || null);
    setEditingSchedule(null);
    setIsModalOpen(true);
  };

  const handleEditSchedule = (sch: ExamSchedule) => {
    setEditingSchedule(sch);
    setSelectedRoomForBooking(null);
    setIsModalOpen(true);
  };

  // Hours for timeline: 08:00 to 18:00
  const timeHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-700 to-rose-600 rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Conflict Detection Engine Active</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">ระบบจองห้องประชุมและห้องสอบคณะ</h2>
            <p className="text-xs text-pink-100 mt-1 max-w-xl">
              จองห้องประชุมทางกายภาพ (On-site) และห้องออนไลน์ (Zoom / MS Teams) พร้อมระบบป้องกันเวลาชนกันอัตโนมัติ รองรับทั้งงานสอบวิทยานิพนธ์และการประชุมภายในคณะ
            </p>
          </div>
          <button
            onClick={() => handleOpenNewBooking()}
            className="flex-shrink-0 inline-flex items-center space-x-2 px-4 py-2.5 bg-white text-pink-700 hover:bg-pink-50 font-bold text-xs rounded-xl shadow transition-all transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>จองห้องประชุมใหม่</span>
          </button>
        </div>
      </div>

      {/* Available Rooms Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-800 flex items-center">
            <MapPin className="w-4 h-4 text-pink-600 mr-1.5" />
            ห้องประชุมและห้องสอบประจำคณะ ({rooms.length} ห้อง)
          </h3>
          <span className="text-xs text-slate-500">คลิก "จองห้องนี้" เพื่อระบุห้องทันที</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <RoomListCard
              key={room.id}
              room={room}
              onBook={(r) => handleOpenNewBooking(r)}
            />
          ))}
        </div>
      </div>

      {/* Booking Calendar & Timeline Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center">
              <Calendar className="w-4 h-4 text-pink-600 mr-1.5" />
              ตารางความว่างและการใช้ห้องประชุม
            </h3>
            <p className="text-xs text-slate-500">
              วันที่ {filterDate} • พบ {filteredSchedules.length} รายการจอง
            </p>
          </div>

          {/* Toggle View: Timeline Grid vs List */}
          <div className="flex items-center space-x-2">
            <div className="bg-slate-100 p-0.5 rounded-lg flex items-center text-xs">
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 rounded-md flex items-center space-x-1 transition-all ${
                  viewMode === 'timeline'
                    ? 'bg-white text-pink-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>ไทม์ไลน์รายชั่วโมง (Gantt Grid)</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md flex items-center space-x-1 transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-pink-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>รายการ (List View)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {/* Keyword search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="ค้นหาชื่อการประชุม/ผู้จอง..."
              className="w-full text-xs pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>

          {/* Date Picker */}
          <div>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
            />
          </div>

          {/* Room Selector */}
          <div>
            <select
              value={filterRoomId}
              onChange={(e) => setFilterRoomId(e.target.value)}
              className="w-full text-xs px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
            >
              <option value="all">ทุกห้องประชุม/สอบ</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Purpose Filter */}
          <div>
            <select
              value={filterPurpose}
              onChange={(e) => setFilterPurpose(e.target.value)}
              className="w-full text-xs px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
            >
              <option value="all">ทุกประเภทการประชุม</option>
              <option value="faculty_meeting">ประชุมคณะ</option>
              <option value="department_meeting">ประชุมภาควิชา</option>
              <option value="academic_seminar">สัมมนาวิชาการ</option>
              <option value="thesis_proposal">สอบเค้าโครง</option>
              <option value="thesis_defense">สอบปากเปล่า</option>
            </select>
          </div>
        </div>

        {/* 1. VISUAL GANTT TIMELINE GRID VIEW */}
        {viewMode === 'timeline' && (
          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-slate-50/50 p-2">
            <div className="min-w-[700px]">
              {/* Timeline Header (Hours) */}
              <div className="grid grid-cols-12 gap-1 pb-2 border-b border-slate-200 text-[11px] font-bold text-slate-500 text-center">
                <div className="col-span-2 text-left pl-2">ห้องประชุม</div>
                {timeHours.map((h) => (
                  <div key={h} className="col-span-1 border-l border-slate-200/80">
                    {String(h).padStart(2, '0')}:00
                  </div>
                ))}
              </div>

              {/* Rows for each room */}
              <div className="divide-y divide-slate-200/80">
                {rooms.map((room) => {
                  const roomBookings = examSchedules.filter(
                    (s) => s.roomId === room.id && s.scheduledDate === filterDate && s.status !== 'cancelled'
                  );

                  return (
                    <div key={room.id} className="grid grid-cols-12 gap-1 py-2.5 items-center hover:bg-white transition-colors">
                      <div className="col-span-2 pl-2">
                        <div className="font-bold text-xs text-slate-800 truncate" title={room.name}>
                          {room.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">{room.building}</div>
                      </div>

                      {/* Hour slots */}
                      {timeHours.map((h) => {
                        const hStart = `${String(h).padStart(2, '0')}:00`;
                        const hEnd = `${String(h + 1).padStart(2, '0')}:00`;

                        // Find if booked in this hour
                        const booking = roomBookings.find((b) => {
                          return b.startTime < hEnd && b.endTime > hStart;
                        });

                        return (
                          <div
                            key={h}
                            className="col-span-1 h-9 rounded border border-dashed border-slate-200 flex items-center justify-center p-0.5 relative group"
                          >
                            {booking ? (
                              <div
                                onClick={() => handleEditSchedule(booking)}
                                className={`w-full h-full rounded flex items-center justify-center text-[9px] font-bold text-white cursor-pointer shadow-xs p-1 text-center truncate ${
                                  booking.purposeType === 'faculty_meeting'
                                    ? 'bg-blue-600'
                                    : booking.purposeType === 'academic_seminar'
                                    ? 'bg-amber-600'
                                    : booking.purposeType === 'thesis_proposal'
                                    ? 'bg-pink-600'
                                    : booking.purposeType === 'thesis_defense'
                                    ? 'bg-purple-600'
                                    : 'bg-indigo-600'
                                }`}
                                title={`${booking.title} (${booking.startTime} - ${booking.endTime} น.) โดย ${booking.bookedBy}`}
                              >
                                {booking.startTime.slice(0, 2)}h
                              </div>
                            ) : (
                              <button
                                onClick={() => handleOpenNewBooking(room, hStart)}
                                className="w-full h-full text-[10px] text-slate-300 hover:text-pink-600 hover:bg-pink-50 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                title={`คลิกเพื่อจอง ${room.name} เวลา ${hStart} น.`}
                              >
                                +
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 2. LIST VIEW */}
        {viewMode === 'list' && (
          <div>
            {filteredSchedules.length === 0 ? (
              <EmptyState
                title="ยังไม่มีรายการจองห้องตามเงื่อนไขที่เลือก"
                description="คุณสามารถคลิกปุ่มด้านล่างเพื่อเริ่มสร้างการจองห้องประชุมใหม่ได้ทันที"
                actionLabel="จองห้องประชุมใหม่"
                onAction={() => handleOpenNewBooking()}
              />
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredSchedules.map((sch) => (
                  <div
                    key={sch.id}
                    className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50/70 p-3 rounded-xl transition-colors"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        {getPurposeBadge(sch.purposeType)}
                        <h4 className="text-sm font-bold text-slate-800">{sch.title || 'การประชุม'}</h4>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-0.5">
                        <span className="flex items-center font-medium text-slate-700">
                          <Calendar className="w-3.5 h-3.5 mr-1 text-pink-600" />
                          {sch.scheduledDate}
                        </span>
                        <span className="flex items-center font-semibold text-pink-700 bg-pink-50 px-1.5 py-0.5 rounded">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          {sch.startTime} - {sch.endTime} น.
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                          {sch.roomName || 'ไม่ระบุห้อง'}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-3.5 h-3.5 mr-1 text-slate-400" />
                          {sch.attendeeCount || 0} คน (ผู้จอง: {sch.bookedBy})
                        </span>
                        {sch.onlineMeetingUrl && (
                          <a
                            href={sch.onlineMeetingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center text-blue-600 hover:underline"
                          >
                            <Video className="w-3.5 h-3.5 mr-1" />
                            ลิงก์ห้องประชุม
                          </a>
                        )}
                      </div>

                      {/* Extra Logistics Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        {sch.roomLayout && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                            จัดโต๊ะ: {sch.roomLayout === 'u_shape' ? 'รูปตัว U' : sch.roomLayout === 'boardroom' ? 'โต๊ะยาว' : 'เธียเตอร์'}
                          </span>
                        )}
                        {sch.catering && sch.catering.length > 0 && (
                          <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-medium flex items-center">
                            <Coffee className="w-3 h-3 mr-1" />
                            มีบริการอาหารว่าง ({sch.catering.join(', ')})
                          </span>
                        )}
                        {sch.needTechnician && (
                          <span className="text-[10px] bg-pink-50 text-pink-700 border border-pink-200 px-2 py-0.5 rounded font-medium flex items-center">
                            <Wrench className="w-3 h-3 mr-1" />
                            มีเจ้าหน้าที่โสตฯ ดูแล
                          </span>
                        )}
                      </div>

                      {sch.notes && (
                        <p className="text-[11px] text-slate-500 italic">
                          หมายเหตุ: {sch.notes}
                        </p>
                      )}
                    </div>

                    {/* Action buttons: Download ICS, Print, Edit, Delete */}
                    <div className="flex items-center space-x-1.5 self-end md:self-center">
                      <button
                        onClick={() => downloadCalendarInvite(sch)}
                        className="p-1.5 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="ดาวน์โหลดนัดหมายลง Outlook/Google Calendar (.ics)"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setPrintSchedule(sch)}
                        className="p-1.5 text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                        title="พิมพ์เอกสารราชการ"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditSchedule(sch)}
                        className="p-1.5 text-slate-500 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                        title="แก้ไขการจอง"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => cancelBooking(sch.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="ยกเลิกการจอง"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <RoomBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedRoom={selectedRoomForBooking}
        editingSchedule={editingSchedule}
      />

      {/* Printable Approval Sheet Modal */}
      {printSchedule && (
        <PrintableApprovalSheetModal
          isOpen={!!printSchedule}
          onClose={() => setPrintSchedule(null)}
          schedule={printSchedule}
        />
      )}
    </div>
  );
};
