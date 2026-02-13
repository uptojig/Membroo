
import React, { useState, useEffect } from 'react';
import { X, Clock, RefreshCw } from 'lucide-react';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: string;
}

const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose, memberId }) => {
  const [activeTab, setActiveTab] = useState<'qrcode' | 'barcode' | 'code'>('qrcode');
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 1 hour in seconds

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="pt-8 pb-4 px-6 text-center">
          {/* Brand Header */}
          <div className="mb-2 relative">
             <div className="inline-flex items-center justify-center bg-white border border-gray-100 rounded-full px-6 py-2 shadow-sm mb-4 relative z-10">
                <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase">AIMER</span>
             </div>
             {/* Decorative arc behind logo if needed, simplified here */}
          </div>

          <p className="text-xs text-slate-500 mb-6 font-medium">
            กรุณาแสดงรหัสนี้ที่พนักงานร้านค้าเพื่อรับคะแนน
          </p>

          {/* Tabs */}
          <div className="flex p-1 border border-slate-200 rounded-full mb-8 max-w-[280px] mx-auto">
            <button 
              onClick={() => setActiveTab('qrcode')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all ${
                activeTab === 'qrcode' 
                ? 'bg-[#003C71] text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              QR Code
            </button>
            <button 
              onClick={() => setActiveTab('barcode')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all ${
                activeTab === 'barcode' 
                ? 'bg-[#003C71] text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Barcode
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all ${
                activeTab === 'code' 
                ? 'bg-[#003C71] text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Code
            </button>
          </div>

          {/* QR Display Area */}
          <div className="flex flex-col items-center justify-center min-h-[220px] mb-2">
            {activeTab === 'qrcode' && (
              <div className="p-0 bg-white rounded-xl">
                 <img 
                   src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${memberId}`} 
                   alt="QR Code" 
                   className="w-48 h-48 object-contain mix-blend-multiply"
                 />
              </div>
            )}
            {activeTab === 'barcode' && (
              <div className="h-32 flex flex-col items-center justify-center w-full px-4">
                 {/* Simulated Barcode */}
                 <div className="w-full h-16 bg-slate-800 mask-image:repeating-linear-gradient(90deg, black, black 2px, transparent 2px, transparent 4px)"></div>
              </div>
            )}
            {activeTab === 'code' && (
               <div className="h-32 flex items-center justify-center w-full rounded-xl">
                <p className="text-4xl font-mono font-bold text-slate-800 tracking-widest">{memberId}</p>
              </div>
            )}
            
            <p className="mt-4 font-sans text-xl font-bold text-slate-900 tracking-wider">
              {memberId}
            </p>
          </div>

          {/* Timer */}
          <div className="flex items-center justify-center space-x-2 text-red-500 mb-8 mt-2">
            <RefreshCw size={14} className="animate-spin-slow" style={{ animationDuration: '3s' }} />
            <span className="text-xs font-bold">เวลาหมดอายุ {formatTime(timeLeft)}</span>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 pt-4 flex items-center justify-center text-slate-400 space-x-1">
            <span className="text-[10px] font-bold text-slate-400">Powered by</span>
            <div className="flex items-center">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-tight">BUZZEBEES</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrModal;
