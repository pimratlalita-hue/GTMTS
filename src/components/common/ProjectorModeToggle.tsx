import React from 'react';
import { Projector } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProjectorModeToggle: React.FC = () => {
  const { isProjectorMode, toggleProjectorMode } = useApp();

  return (
    <button
      onClick={toggleProjectorMode}
      title={isProjectorMode ? 'ปิดโหมดฉายจอโปรเจกเตอร์' : 'เปิดโหมดฉายจอโปรเจกเตอร์ (High-Contrast)'}
      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
        isProjectorMode
          ? 'bg-black text-white border-black shadow-md'
          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Projector className="w-3.5 h-3.5" />
      <span>{isProjectorMode ? 'Projector: ON' : 'Projector Mode'}</span>
    </button>
  );
};
