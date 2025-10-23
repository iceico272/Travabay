import React from 'react';
import { FaUsers, FaBoxOpen, FaClipboardList, FaMoneyBillWave } from 'react-icons/fa';

// Mock data for the dashboard cards
const mockStats = [
  { title: 'Total Users', value: '1,200', icon: FaUsers, color: 'bg-blue-500' },
  { title: 'Active Packages', value: '75', icon: FaBoxOpen, color: 'bg-green-500' },
  { title: 'Pending Bookings', value: '14', icon: FaClipboardList, color: 'bg-yellow-500' },
  { title: 'Revenue (Last 30 Days)', value: '₹ 5.5 Lakh', icon: FaMoneyBillWave, color: 'bg-indigo-500' },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat) => (
          <div key={stat.title} className={`p-6 rounded-xl shadow-lg text-white ${stat.color}`}>
            <div className="flex items-center justify-between">
              <stat.icon size={36} />
              <div className="text-right">
                <p className="text-sm font-light uppercase">{stat.title}</p>
                <h3 className="text-3xl font-extrabold">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity/Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Recent Bookings</h3>
          <ul className="space-y-3">
            <li className="flex justify-between border-b pb-2 text-gray-600">
              <span>John Doe (Europe Tour)</span>
              <span className="text-sm font-medium text-green-600">Completed</span>
            </li>
            <li className="flex justify-between border-b pb-2 text-gray-600">
              <span>Jane Smith (Weekend Hills)</span>
              <span className="text-sm font-medium text-yellow-600">Pending</span>
            </li>
            <li className="flex justify-between border-b pb-2 text-gray-600">
              <span>Travabay Corp (India)</span>
              <span className="text-sm font-medium text-blue-600">Confirmed</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Admin Tasks</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-blue-500 cursor-pointer transition-colors">Review 3 new users.</li>
            <li className="hover:text-blue-500 cursor-pointer transition-colors">Update Europe package price.</li>
            <li className="hover:text-blue-500 cursor-pointer transition-colors">Process pending booking #908.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
