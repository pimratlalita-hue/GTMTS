import React, { useRef, useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Camera, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { generateFaceSignatureHash } from '../../services/storageService';

interface WebCamCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCaptureComplete: (faceSignatureHash: string) => void;
  studentName?: string;
}

export const WebCamCaptureModal: React.FC<WebCamCaptureModalProps> = ({
  isOpen,
  onClose,
  onCaptureComplete,
  studentName
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [pdpaConsent, setPdpaConsent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedHash, setCapturedHash] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && pdpaConsent) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, pdpaConsent]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setCameraActive(true);
      } else {
        setCameraError('เบราว์เซอร์นี้ไม่รองรับการเข้าถึงกล้องเว็บแคม หรือไม่มีอุปกรณ์กล้อง');
      }
    } catch (err: any) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError('ไม่สามารถเปิดกล้องได้ (กรุณาอนุญาต Camera Permission หรือใช้งานโหมดจำลอง)');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const handleCapture = async () => {
    if (!pdpaConsent) return;
    setIsProcessing(true);

    let landmarkMetric = 'simulated-facial-landmark-vector-pts-128';

    if (videoRef.current && canvasRef.current && cameraActive) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 240;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Extract low-res pixel density distribution for deterministic hash
        const imgData = ctx.getImageData(0, 0, Math.min(32, canvas.width), Math.min(32, canvas.height));
        landmarkMetric = Array.from(imgData.data.slice(0, 100)).join('-');
      }
    }

    // Generate SHA-256 Hash string (NO raw image stored!)
    const hash = await generateFaceSignatureHash(landmarkMetric);
    setCapturedHash(hash);
    setIsProcessing(false);
  };

  const handleConfirm = () => {
    if (capturedHash) {
      onCaptureComplete(capturedHash);
      stopCamera();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        stopCamera();
        onClose();
      }}
      title="สแกนใบหน้าสร้าง Text Signature Hash (PDPA Compliant)"
      subtitle={`ผู้รับการสแกน: ${studentName || 'นิสิต'}`}
      maxWidth="md"
    >
      <div className="space-y-4">
        {/* PDPA Consent Agreement Box */}
        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs space-y-2">
          <div className="flex items-center text-slate-800 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5 flex-shrink-0" />
            <span>คำยินยอมตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            ระบบนี้จะประมวลผลภาพเพื่อสกัดเป็น <strong>รหัสข้อความตัวแทน (Text Signature Hash)</strong> เท่านั้น
            <span className="text-rose-600 font-semibold"> ระบบจะไม่มีการบันทึกไฟล์ภาพถ่ายใบหน้าจริงลงในหน่วยความจำหรือฐานข้อมูล</span>
          </p>
          <label className="flex items-center space-x-2 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={pdpaConsent}
              onChange={(e) => setPdpaConsent(e.target.checked)}
              className="w-4 h-4 rounded text-pink-600 focus:ring-pink-500 border-slate-300"
            />
            <span className="text-xs font-semibold text-slate-800">
              ข้าพเจ้ายินยอมให้ประมวลผลข้อมูลชีวมิติตามข้อกำหนดนี้
            </span>
          </label>
        </div>

        {/* Video / Camera Box */}
        <div className="relative bg-slate-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center border border-slate-800">
          {!pdpaConsent ? (
            <div className="text-center p-6 text-slate-400">
              <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">กรุณากดยินยอม PDPA ด้านบนเพื่อเปิดกล้องสแกน</p>
            </div>
          ) : cameraError ? (
            <div className="text-center p-6 text-amber-400 space-y-2">
              <AlertTriangle className="w-8 h-8 mx-auto" />
              <p className="text-xs">{cameraError}</p>
              <p className="text-[11px] text-slate-400">
                คุณสามารถกดปุ่ม "จำลองการสแกนใบหน้า" ด้านล่างเพื่อทดสอบต่อได้
              </p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Face Target Overlay Frame */}
              <div className="absolute inset-0 border-2 border-pink-500/60 rounded-full w-44 h-56 m-auto pointer-events-none animate-pulse" />
            </>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Hash Output Display */}
        {capturedHash && (
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
            <div className="flex items-center text-xs font-bold text-emerald-800 mb-1">
              <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
              สกัด Text Signature Hash สำเร็จ:
            </div>
            <div className="font-mono text-[11px] text-slate-700 break-all bg-white p-2 rounded border border-emerald-100">
              {capturedHash}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            disabled={!pdpaConsent || isProcessing}
            onClick={handleCapture}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-200 text-white disabled:text-slate-400 text-xs font-semibold rounded-lg transition-colors"
          >
            {isProcessing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Camera className="w-3.5 h-3.5" />
            )}
            <span>{cameraActive ? 'ถ่ายภาพสกัดรหัส Hash' : 'จำลองสแกนสกัดรหัส Hash'}</span>
          </button>

          <button
            type="button"
            disabled={!capturedHash}
            onClick={handleConfirm}
            className="px-5 py-2 bg-pink-600 hover:bg-pink-700 disabled:bg-slate-200 text-white disabled:text-slate-400 text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            ยืนยันบันทึกผล
          </button>
        </div>
      </div>
    </Modal>
  );
};
