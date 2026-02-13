
import React, { useState } from 'react';
import { Member } from '../types';
import { QrCode, Copy, Check } from 'lucide-react';

interface MemberCardProps {
  member: Member;
  onShowQr?: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onShowQr }) => {
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(member.memberId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-500 to-indigo-600 rounded-3xl p-6 text-white shadow-2xl shadow-sky-200">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-400/20 rounded-full -ml-12 -mb-12 blur-xl"></div>
      
      <div className="relative flex justify-between items-start mb-10">
        <div>
          <p className="text-sky-100 text-xs font-semibold tracking-wider uppercase mb-1">Loyalty Member</p>
          <h2 className="text-2xl font-bold tracking-tight">{member.name}</h2>
          <div className="flex items-center mt-2 space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            <span className="text-[11px] font-medium text-white/90">{member.tier}</span>
          </div>
        </div>
        <button 
          onClick={onShowQr}
          className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors active:scale-95"
        >
          <QrCode size={24} />
        </button>
      </div>

      <div className="relative flex justify-between items-end">
        <div>
          <p className="text-sky-100 text-[10px] font-medium mb-1">POINT BALANCE</p>
          <div className="flex items-baseline space-x-1">
            <span className="text-4xl font-bold leading-none">{member.points.toLocaleString()}</span>
            <span className="text-sm font-medium text-sky-100">pts</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <p className="text-sky-100 text-[10px] font-medium mb-1">MEMBER ID</p>
          <button 
            onClick={copyId}
            className="flex items-center space-x-1.5 bg-black/10 hover:bg-black/20 px-2 py-1 rounded-lg transition-colors group"
          >
            <span className="text-xs font-mono tracking-wider font-semibold">{member.memberId}</span>
            {copied ? <Check size={12} className="text-green-300" /> : <Copy size={12} className="text-white/60 group-hover:text-white" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
