
import React, { useState } from 'react';
import { 
  Scan, 
  Search, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Filter, 
  LayoutGrid, 
  ChevronRight,
  TrendingUp,
  Users
} from 'lucide-react';
import { BRAND_COLOR } from '../constants';

const StaffDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');

  const stats = [
    { label: 'Pending Receipts', value: '12', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Today Scans', value: '45', icon: Scan, color: 'text-sky-500', bg: 'bg-sky-50' },
  ];

  const pendingReceipts = [
    { id: '1', name: 'Jirayu W.', amount: 450, date: '10m ago', points: 18 },
    { id: '2', name: 'Nattapat K.', amount: 1200, date: '25m ago', points: 48 },
    { id: '3', name: 'Pichit S.', amount: 320, date: '1h ago', points: 12 },
  ];

  return (
    <div className="px-5 pt-8 space-y-6 animate-in fade-in duration-500 pb-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Staff Portal</h2>
          <p className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded inline-block mt-1">MAIN BRANCH</p>
        </div>
        <button className="p-3 bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-200 active:scale-95 transition-all">
          <Scan size={24} />
        </button>
      </header>

      <section className="grid grid-cols-2 gap-3">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`${stat.bg} p-4 rounded-3xl border border-white/50 shadow-sm`}>
              <div className={`${stat.color} mb-2`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-black text-slate-800 leading-none">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">{stat.label}</p>
            </div>
          );
        })}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Verification Queue</h3>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('pending')}
              className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${activeTab === 'pending' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}
            >
              PENDING
            </button>
            <button 
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${activeTab === 'completed' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}
            >
              HISTORY
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {pendingReceipts.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm hover:border-sky-200 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{item.name}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Requested {item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-800">฿{item.amount.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-emerald-500">+{item.points} pts</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center space-x-2 py-2 bg-rose-50 text-rose-500 rounded-xl text-xs font-bold border border-rose-100 active:bg-rose-100 transition-colors">
                  <XCircle size={14} />
                  <span>Reject</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold border border-emerald-100 active:bg-emerald-100 transition-colors">
                  <CheckCircle size={14} />
                  <span>Approve</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 -mr-4 -mb-4">
          <TrendingUp size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <Users size={18} className="text-sky-400" />
            <h3 className="font-bold text-sm uppercase tracking-widest text-sky-400">Total Reach</h3>
          </div>
          <p className="text-4xl font-black">12,540</p>
          <p className="text-xs text-slate-400 font-medium mt-1 mb-4">Registered members this month</p>
          <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors border border-white/20">
            View Analytics Report
          </button>
        </div>
      </section>
    </div>
  );
};

export default StaffDashboard;
