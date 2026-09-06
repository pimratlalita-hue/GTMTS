import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { StudentDashboard } from './views/StudentDashboard';
import { AdvisorDashboard } from './views/AdvisorDashboard';
import { CommitteeDashboard } from './views/CommitteeDashboard';
import { OfficerDashboard } from './views/OfficerDashboard';
import { AdminDashboard } from './views/AdminDashboard';
import { RoomCalendarView } from './components/roomBooking/RoomCalendarView';
import { AttendanceCheckIn } from './components/biometrics/AttendanceCheckIn';
import { ThesisWorkflowView } from './views/ThesisWorkflowView';
import { GeminiAssistantModal } from './components/ai/GeminiAssistantModal';
import { ShieldCheck, Heart } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentRole } = useApp();
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Gemini AI Assistant Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiInitialTh, setAiInitialTh] = useState('');
  const [aiInitialEn, setAiInitialEn] = useState('');
  const [aiInitialAbs, setAiInitialAbs] = useState('');

  const handleOpenAiAssistant = (th = '', en = '', abs = '') => {
    setAiInitialTh(th);
    setAiInitialEn(en);
    setAiInitialAbs(abs);
    setIsAiModalOpen(true);
  };

  const renderDashboardByRole = () => {
    switch (currentRole) {
      case 'student':
        return <StudentDashboard onNavigateTab={setActiveTab} />;
      case 'advisor':
        return <AdvisorDashboard onNavigateTab={setActiveTab} />;
      case 'committee':
        return <CommitteeDashboard />;
      case 'officer':
        return <OfficerDashboard onNavigateTab={setActiveTab} />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <StudentDashboard onNavigateTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navbar with Role Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiAssistant={() => handleOpenAiAssistant()}
      />

      {/* Main Content Container: strictly constrained to max-w-5xl mx-auto px-4 */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && renderDashboardByRole()}

        {activeTab === 'rooms' && <RoomCalendarView />}

        {activeTab === 'biometrics' && <AttendanceCheckIn />}

        {activeTab === 'thesis-workflow' && (
          <ThesisWorkflowView
            onOpenAiHelper={(th, en, abs) => handleOpenAiAssistant(th, en, abs)}
            onNavigateToRooms={() => setActiveTab('rooms')}
          />
        )}

        {activeTab === 'system-admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">GTMTS v1.0.0</span>
            <span>•</span>
            <span>Graduate Thesis Management & Faculty Room Booking System</span>
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>PDPA Compliant (Zero-Image Text Hash Storage)</span>
          </div>
        </div>
      </footer>

      {/* Gemini AI Assistant Modal */}
      <GeminiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        initialThTitle={aiInitialTh}
        initialEnTitle={aiInitialEn}
        initialAbstract={aiInitialAbs}
      />
    </div>
  );
};

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('UI Render Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    localStorage.removeItem('GTMTS_DATA_STORE_V1');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md w-full text-center shadow-lg space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h2 className="text-lg font-bold text-slate-800">พบข้อผิดพลาดในการโหลดหน้าจอ</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              อาจเกิดจากข้อมูลใน LocalStorage เก่าไม่สอดคล้อง คุณสามารถกดปุ่มด้านล่างเพื่อคืนค่าเริ่มต้นและโหลดใหม่อัตโนมัติ
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs rounded-xl transition-colors shadow"
            >
              ล้างแคชและโหลดข้อมูลเริ่มต้นใหม่ (Reset & Reload)
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AppProvider>
          <MainLayout />
        </AppProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
