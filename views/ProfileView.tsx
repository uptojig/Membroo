
import React from 'react';
import { Member } from '../types';
import { ChevronRight, ShieldCheck, Link2, XCircle, Hexagon } from 'lucide-react';

interface ProfileViewProps {
  member: Member;
}

const ProfileView: React.FC<ProfileViewProps> = ({ member }) => {
  const spendingRemaining = (member.spendingGoal || 0) - (member.spendingAmount || 0);
  const progressPercent = Math.min(100, Math.max(0, ((member.spendingAmount || 0) / (member.spendingGoal || 1)) * 100));

  const tiers = ['MANAGER', 'DIRECTOR', 'CEO'];

  return (
    <div className="px-5 pt-6 pb-24 space-y-6 animate-in slide-in-from-top-4 duration-500 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold text-slate-800">ข้อมูลส่วนตัว</h1>

      {/* Member Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 flex items-center justify-center">
                <Hexagon size={40} className="text-orange-300 fill-orange-300" />
                <div className="absolute text-[8px] font-bold text-white">LV.1</div>
             </div>
             <div>
               <h2 className="text-lg font-bold text-slate-800 leading-tight">{member.name}</h2>
               <p className="text-[10px] text-slate-400 mt-1">
                 ระดับเลเวล: {member.tier} | {member.phone}
               </p>
             </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400">คะแนนคงเหลือ</p>
            <p className="text-xl font-bold text-[#003C71]">{member.points.toLocaleString()} คะแนน</p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <p className="text-[10px] text-slate-400">
            สะสมยอดใช้จ่ายมากกว่า {spendingRemaining.toLocaleString()} บาท จะขึ้นระดับ {member.nextTier}
          </p>
          <div className="relative h-2 bg-gray-100 rounded-full w-full overflow-hidden">
             <div 
               className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-1000"
               style={{ width: `${progressPercent}%` }}
             ></div>
          </div>
          <div className="flex justify-between items-center">
             <p className="text-xs font-bold text-slate-500">
               ยอดใช้จ่าย {member.spendingAmount?.toLocaleString()}/{member.spendingGoal?.toLocaleString()} บาท
             </p>
             <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-[8px] text-white font-bold">UP</span>
             </div>
          </div>
        </div>
      </div>

      {/* Tier Selector */}
      <div className="flex space-x-3 overflow-x-auto no-scrollbar py-1">
        {tiers.map((tier) => (
          <button 
            key={tier}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-xs font-bold transition-all whitespace-nowrap ${
              member.tier === tier
              ? 'bg-white border-orange-200 text-slate-800 shadow-sm ring-1 ring-orange-100'
              : 'bg-white border-gray-200 text-slate-400'
            }`}
          >
            <Hexagon size={14} className={member.tier === tier ? "text-orange-400 fill-orange-400" : "text-slate-300"} />
            <span>{tier}</span>
          </button>
        ))}
      </div>

      {/* Details */}
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-1">รายละเอียด</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            ขณะนี้คุณเป็นสมาชิกระดับ {member.tier} สะสมคะแนนให้ครบ {member.spendingGoal?.toLocaleString()} บาท เพื่อเพิ่มระดับสมาชิก
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-1">เงื่อนไข</h3>
          <ul className="text-xs text-slate-500 space-y-1">
            <li><strong className="text-slate-700">เริ่มต้นสะสม :</strong> {member.joinDate}</li>
            <li><strong className="text-slate-700">ตั้งค่าระดับสมาชิก :</strong> Advance ใช้คะแนนของรอบก่อนหน้ามาเป็นเงื่อนไข สมาชิกจะถูกปรับระดับโดยดูจากคะแนนสะสมในรอบก่อนหน้า แต่ในรอบนั้นๆ หากคะแนนถึง ก็สามารถถูกปรับในระดับได้ทันทีในรอบปัจจุบัน</li>
          </ul>
        </div>
      </section>

      {/* Integrations */}
      <section>
        <h3 className="text-sm font-bold text-slate-800 mb-1">Anywhere you can get point</h3>
        <p className="text-xs text-slate-400 mb-4">Connect merchant profile with e-commerce platform</p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-50 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#ee4d2d] flex items-center justify-center text-white font-bold text-[10px]">S</div>
              <span className="text-sm font-medium text-slate-700">Shopee</span>
            </div>
            <div className="flex items-center space-x-1 text-red-500">
              <Link2 size={12} className="rotate-45" />
              <span className="text-[10px] font-bold">ไม่ได้เชื่อมต่อ</span>
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-50 shadow-sm">
            <div className="flex items-center space-x-3">
               <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-bold text-[10px]">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
               </div>
              <span className="text-sm font-medium text-slate-700">Tiktok</span>
            </div>
            <button className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-slate-500">
              Connect
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileView;
