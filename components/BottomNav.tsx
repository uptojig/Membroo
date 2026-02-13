
import React from 'react';
import { Page } from '../types';
import { NAV_ITEMS, BRAND_COLOR } from '../constants';

interface BottomNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-6 py-2 flex justify-between items-center z-40 h-16 shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex flex-col items-center space-y-1 transition-all group"
          >
            <div className={`p-1 rounded-xl transition-colors ${isActive ? 'bg-sky-50' : 'group-hover:bg-gray-50'}`}>
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 2} 
                color={isActive ? BRAND_COLOR : '#94a3b8'} 
              />
            </div>
            <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-sky-600' : 'text-slate-400'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
