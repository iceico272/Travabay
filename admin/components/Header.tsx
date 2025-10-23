import React from 'react';
import { FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

interface HeaderProps {
  userName: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-6 sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-gray-800">Travabay Admin Panel</h1>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-blue-600 transition-colors">
          <FaBell size={20} />
        </button>
        
        <div className="flex items-center space-x-2 text-gray-700">
          <FaUserCircle size={24} className="text-blue-500" />
          <span className="font-medium hidden sm:inline">{userName}</span>
        </div>
        
        <button
          onClick={onLogout}
          className="text-red-500 hover:text-red-700 transition-colors flex items-center space-x-1 p-2 rounded-lg hover:bg-red-50"
        >
          <FaSignOutAlt size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
