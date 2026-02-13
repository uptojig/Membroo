
import React from 'react';
import { Member, Page } from '../types';
import MemberCard from '../components/MemberCard';
import { MOCK_HISTORY, BRAND_COLOR } from '../constants';
import { ChevronRight, Zap, TrendingUp, Gift, Users } from 'lucide-react';

interface CustomerHomeProps {
  member: Member;
  onNavigate: (page: Page) => void;
  onOpenQr: () => void;
}

const CustomerHome: React.FC<CustomerHomeProps> = ({ member, onNavigate, onOpenQr }) => {
  return (
    <div className="px-5 pt-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-gray-400 text-sm font-medium">Welcome back,</h1>
          <p className="text-xl font-bold text-slate-800">Hello, {member.name.split(' ')[0]} 👋</p>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-sky-100">
          <img src={member.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </header>

      <MemberCard member={member} onShowQr={onOpenQr} />

      {/* Quick Actions */}
      <section className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => onNavigate(Page.RECEIPT)}
          className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-sky-200 hover:bg-sky-50 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mb-2">
            <Zap className="text-orange-600" size={20} />
          </div>
          <span className="text-xs font-semibold text-slate-700">Earn Points</span>
        </button>
        <button 
          onClick={() => onNavigate(Page.REWARDS)}
          className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-sky-200 hover:bg-sky-50 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-2">
            <Gift className="text-purple-600" size={20} />
          </div>
          <span className="text-xs font-semibold text-slate-700">Redeem</span>
        </button>
      </section>

      {/* Invite Banner */}
      <section>
        <div 
          onClick={() => onNavigate(Page.INVITE)}
          className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-indigo-100 cursor-pointer active:scale-95 transition-transform"
        >
           {/* Decorative circles */}
           <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 blur-xl"></div>
           <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8 blur-xl"></div>

           <div className="relative z-10 text-white">
              <h3 className="font-bold text-lg">Invite Friends</h3>
              <p className="text-xs text-indigo-100">Get 50 points for each friend!</p>
           </div>
           <div className="relative z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <Users className="text-white" size={20} />
           </div>
        </div>
      </section>

      {/* Transactions History Summary */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Recent Activity</h3>
          <button className="text-sky-600 text-xs font-semibold flex items-center">
            See all <ChevronRight size={14} />
          </button>
        </div>
        
        <div className="space-y-3">
          {MOCK_HISTORY.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white border border-gray-50 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.type === 'EARN' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {item.type === 'EARN' ? <TrendingUp size={18} /> : <Gift size={18} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 leading-none mb-1">{item.description}</p>
                  <p className="text-[10px] text-slate-400">{item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${item.type === 'EARN' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {item.type === 'EARN' ? '+' : ''}{item.amount}
                </p>
                <p className={`text-[9px] uppercase font-bold tracking-tighter ${
                  item.status === 'PENDING' ? 'text-amber-500' : 'text-slate-300'
                }`}>
                  {item.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CustomerHome;
