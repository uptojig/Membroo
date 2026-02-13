
import React, { useState, useEffect } from 'react';
import { ViewMode, Page, Member } from './types';
import { MOCK_MEMBER, BRAND_COLOR } from './constants';
import BottomNav from './components/BottomNav';
import CustomerHome from './views/CustomerHome';
import RewardsList from './views/RewardsList';
import ReceiptUpload from './views/ReceiptUpload';
import ProfileView from './views/ProfileView';
import InviteFriend from './views/InviteFriend';
import StaffDashboard from './views/StaffDashboard';
import QrModal from './components/QrModal';
import { SwitchCamera } from 'lucide-react';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.CUSTOMER);
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [member, setMember] = useState<Member>(MOCK_MEMBER);
  const [isQrOpen, setIsQrOpen] = useState(false);

  // Simulate view mode toggle for demo purposes
  const toggleViewMode = () => {
    setViewMode(prev => prev === ViewMode.CUSTOMER ? ViewMode.STAFF : ViewMode.CUSTOMER);
    setCurrentPage(Page.HOME);
  };

  const renderPage = () => {
    if (viewMode === ViewMode.STAFF) {
      return <StaffDashboard />;
    }

    switch (currentPage) {
      case Page.HOME:
        return <CustomerHome member={member} onNavigate={setCurrentPage} onOpenQr={() => setIsQrOpen(true)} />;
      case Page.REWARDS:
        return <RewardsList member={member} />;
      case Page.RECEIPT:
        return <ReceiptUpload />;
      case Page.PROFILE:
        return <ProfileView member={member} />;
      case Page.INVITE:
        return <InviteFriend member={member} onBack={() => setCurrentPage(Page.HOME)} />;
      default:
        return <CustomerHome member={member} onNavigate={setCurrentPage} onOpenQr={() => setIsQrOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative bg-white shadow-xl">
      {/* View Switcher (Demo Only) */}
      <button 
        onClick={toggleViewMode}
        className="fixed top-4 right-4 z-50 p-2 bg-white border border-gray-200 rounded-full shadow-lg text-gray-500 hover:text-sky-500 transition-colors"
        title="Toggle Staff/Customer View"
      >
        <SwitchCamera size={20} />
      </button>

      <main className="flex-grow pb-20 overflow-y-auto bg-gray-50 no-scrollbar">
        {renderPage()}
      </main>

      {viewMode === ViewMode.CUSTOMER && currentPage !== Page.INVITE && (
        <BottomNav activePage={currentPage} onNavigate={setCurrentPage} />
      )}

      <QrModal 
        isOpen={isQrOpen} 
        onClose={() => setIsQrOpen(false)} 
        memberId={member.memberId} 
      />
    </div>
  );
};

export default App;
