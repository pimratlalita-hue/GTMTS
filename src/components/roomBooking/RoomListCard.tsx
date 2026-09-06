import React from 'react';
import { ExamRoom } from '../../types';
import { Users, Video, MapPin, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

interface RoomListCardProps {
  room: ExamRoom;
  onBook: (room: ExamRoom) => void;
}

export const RoomListCard: React.FC<RoomListCardProps> = ({ room, onBook }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-2">
          <div>
            <span
              className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold mb-1.5 ${
                room.type === 'hybrid'
                  ? 'bg-purple-100 text-purple-700'
                  : room.type === 'online'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {room.type === 'hybrid' ? 'Hybrid (On-site + Online)' : room.type === 'online' ? 'Online Only' : 'On-site'}
            </span>
            <h4 className="font-bold text-slate-800 text-sm leading-snug">{room.name}</h4>
          </div>
          {room.isAvailable ? (
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              เปิดใช้งาน
            </span>
          ) : (
            <span className="flex items-center text-xs font-semibold text-rose-500">
              <ShieldAlert className="w-3.5 h-3.5 mr-1" />
              ปิดปรับปรุง
            </span>
          )}
        </div>

        <div className="text-xs text-slate-500 space-y-1 my-2">
          <div className="flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400 flex-shrink-0" />
            <span>{room.building}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-3.5 h-3.5 mr-1.5 text-slate-400 flex-shrink-0" />
            <span>ความจุรองรับ: {room.capacity} ที่นั่ง</span>
          </div>
          {room.defaultOnlineUrl && (
            <div className="flex items-center text-blue-600 truncate">
              <Video className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
              <span className="truncate">{room.defaultOnlineUrl}</span>
            </div>
          )}
        </div>

        {/* Facilities tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {room.facilities.map((f, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <button
          onClick={() => onBook(room)}
          disabled={!room.isAvailable}
          className="w-full py-2 bg-pink-600 hover:bg-pink-700 disabled:bg-slate-200 text-white disabled:text-slate-400 font-semibold text-xs rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          จองห้องนี้
        </button>
      </div>
    </div>
  );
};
