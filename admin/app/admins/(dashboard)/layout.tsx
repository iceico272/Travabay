'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
// import Footer from '../components/Footer'; 

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [userName, setUserName] = useState('Admin User'); 
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Clear any other auth data (like cookies if used)
    router.replace('/admins/login');
  };

  if (loading) {
    // This state is now rarely, if ever, seen because loading is false initially.
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl font-medium text-blue-600">Loading Dashboard...</div>
      </div>
    );
  }

  // Main Dashboard Structure
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar - Fixed width, sticky top */}
      <Sidebar />

      {/* Main Content Area - Flex grow, scrollable */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        
        {/* Header */}
        <Header userName={userName} onLogout={handleLogout} />

        {/* Page Content - Padding applied here */}
        <main className="p-6 flex-1">
          {children}
        </main>
        
        {/* Footer (Optional) 
        <Footer /> */}
      </div>
    </div>
  );
};

export default DashboardLayout;