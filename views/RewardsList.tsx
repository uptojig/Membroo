
import React, { useState } from 'react';
import { Member, Reward, Branch } from '../types';
import { MOCK_REWARDS, MOCK_BRANCHES, BRAND_COLOR } from '../constants';
import { Search, Filter, ChevronLeft, MapPin, Phone, ArrowRight, CheckCircle2, QrCode } from 'lucide-react';

interface RewardsListProps {
  member: Member;
}

type RewardStep = 'catalog' | 'branch' | 'success';

const RewardsList: React.FC<RewardsListProps> = ({ member }) => {
  const [step, setStep] = useState<RewardStep>('catalog');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const handleSelectReward = (reward: Reward) => {
    setSelectedReward(reward);
    setStep('branch');
  };

  const handleSelectBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setStep('success');
  };

  const resetFlow = () => {
    setStep('catalog');
    setSelectedReward(null);
    setSelectedBranch(null);
  };

  if (step === 'branch' && selectedReward) {
    return (
      <div className="px-5 pt-8 space-y-6 animate-in slide-in-from-right-4 duration-300">
        <header className="flex items-center space-x-2">
          <button onClick={() => setStep('catalog')} className="p-2 -ml-2 text-slate-400 hover:text-slate-800 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Select Branch</h2>
            <p className="text-xs text-slate-500">Where would you like to use this reward?</p>
          </div>
        </header>

        {/* Selected Reward Summary Card */}
        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 flex items-center space-x-4">
          <img src={selectedReward.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover shadow-sm" />
          <div>
            <h4 className="font-bold text-sky-900 text-sm leading-tight">{selectedReward.name}</h4>
            <p className="text-xs text-sky-600 font-medium mt-1">{selectedReward.pointsRequired} pts</p>
          </div>
        </div>

        <div className="space-y-3">
          {MOCK_BRANCHES.map((branch) => (
            <button
              key={branch.id}
              onClick={() => handleSelectBranch(branch)}
              className="w-full text-left bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-sky-300 hover:shadow-md transition-all group flex items-center justify-between"
            >
              <div className="space-y-2 max-w-[85%]">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                    <MapPin size={18} />
                  </div>
                  <span className="font-bold text-slate-800">{branch.name}</span>
                  {branch.distance && (
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">
                      {branch.distance}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{branch.address}</p>
                <div className="flex items-center space-x-1 text-[10px] text-slate-400 font-medium">
                  <Phone size={12} />
                  <span>{branch.phone}</span>
                </div>
              </div>
              <ArrowRight size={18} className="text-slate-300 group-hover:text-sky-500 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'success' && selectedReward && selectedBranch) {
    return (
      <div className="px-5 pt-8 flex flex-col items-center justify-center min-h-[80vh] text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-50">
          <CheckCircle2 size={40} />
        </div>
        
        <h2 className="text-2xl font-black text-slate-800 mb-2">Redemption Ready!</h2>
        <p className="text-sm text-slate-500 mb-8 max-w-[280px]">
          Show this QR code to the staff at <b>{selectedBranch.name}</b> to claim your <b>{selectedReward.name}</b>.
        </p>

        <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-xl mb-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-sky-500 text-white text-[10px] font-black uppercase px-4 py-1 rounded-full tracking-widest">
            Scan to Claim
          </div>
          <div className="w-48 h-48 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
            <QrCode size={120} className="text-slate-800" strokeWidth={1.5} />
          </div>
          <div className="mt-4 font-mono text-sm font-bold text-slate-400 tracking-widest">
            RD-7722-1094
          </div>
        </div>

        <button 
          onClick={resetFlow}
          className="w-full max-w-[240px] py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl active:scale-95 transition-all"
        >
          Back to Store
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 pt-8 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Reward Store</h2>
          <p className="text-sm text-slate-500">You have {member.points.toLocaleString()} pts to spend</p>
        </div>
        
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search rewards..." 
              className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-sky-500 outline-none transition-all"
            />
          </div>
          <button className="p-2.5 bg-slate-100 rounded-xl text-slate-500">
            <Filter size={18} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_REWARDS.map((reward) => (
          <div key={reward.id} className="flex bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="w-32 h-32 flex-shrink-0">
              <img src={reward.imageUrl} alt={reward.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-between p-4 flex-grow">
              <div>
                <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {reward.category}
                </span>
                <h3 className="font-bold text-slate-800 mt-1">{reward.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{reward.description}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-baseline space-x-0.5">
                  <span className="text-sm font-bold text-slate-800">{reward.pointsRequired}</span>
                  <span className="text-[10px] font-medium text-slate-400">pts</span>
                </div>
                <button 
                  onClick={() => handleSelectReward(reward)}
                  disabled={member.points < reward.pointsRequired}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    member.points >= reward.pointsRequired 
                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-200 active:scale-95' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsList;
