
import React, { useState } from 'react';
import { Member } from '../types';
import { ChevronLeft, Copy, Share2, Users, Gift, Check, Sparkles } from 'lucide-react';

interface InviteFriendProps {
  member: Member;
  onBack: () => void;
}

const InviteFriend: React.FC<InviteFriendProps> = ({ member, onBack }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = `REF-${member.memberId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
     if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Membroo!',
          text: `Use my code ${referralCode} to get free points!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopy();
    }
  };

  const referrals = [
    { name: 'Sarah W.', date: '2 days ago', status: 'Completed', points: 50 },
    { name: 'Mike T.', date: '1 week ago', status: 'Pending', points: 0 },
  ];

  return (
    <div className="px-5 pt-8 space-y-6 animate-in slide-in-from-right-4 duration-300 min-h-screen bg-gray-50 pb-24">
       {/* Header */}
       <header className="flex items-center space-x-2">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-800 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-slate-800">Invite Friends</h2>
        </header>

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-indigo-200">
           <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
           <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
           
           <div className="relative z-10 text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 border border-white/30">
                 <Gift size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Refer & Earn</h3>
                <p className="text-indigo-100 text-sm mt-1">Get <span className="font-bold text-white">50 points</span> for every friend who joins!</p>
              </div>
           </div>
        </div>

        {/* Code Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
           <p className="text-sm text-slate-500 font-medium text-center">Your Referral Code</p>
           <div 
             onClick={handleCopy}
             className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-indigo-300 transition-colors group"
            >
              <span className="text-xl font-mono font-bold text-slate-800 tracking-wider">{referralCode}</span>
              <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-105 transition-transform">
                 {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} className="text-slate-400" />}
              </div>
           </div>
           <button 
             onClick={handleShare}
             className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg active:scale-95 transition-all"
           >
             <Share2 size={18} />
             <span>Share Link</span>
           </button>
        </div>

        {/* Referrals List */}
        <div>
           <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800">Your Referrals</h3>
              <span className="text-xs text-slate-400 font-medium">Total: 2</span>
           </div>
           <div className="space-y-3">
              {referrals.map((ref, idx) => (
                 <div key={idx} className="bg-white p-4 rounded-xl border border-gray-50 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                          {ref.name.charAt(0)}
                       </div>
                       <div>
                          <p className="font-bold text-slate-800 text-sm">{ref.name}</p>
                          <p className="text-[10px] text-slate-400">{ref.date}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       {ref.status === 'Completed' ? (
                          <>
                             <p className="text-emerald-600 font-bold text-sm">+{ref.points} pts</p>
                             <p className="text-[10px] text-emerald-500 font-bold">Completed</p>
                          </>
                       ) : (
                          <>
                             <p className="text-slate-300 font-bold text-sm">0 pts</p>
                             <p className="text-[10px] text-amber-500 font-bold">Pending</p>
                          </>
                       )}
                    </div>
                 </div>
              ))}
           </div>
        </div>
    </div>
  );
};
export default InviteFriend;
