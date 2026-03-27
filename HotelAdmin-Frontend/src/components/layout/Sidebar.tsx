import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '■' },
    { path: '/hotel', label: 'Hotel Data', icon: '◆' },
    { path: '/rooms', label: 'Rooms', icon: '▢' },
    { path: '/employees', label: 'Employees', icon: '▲' },
    { path: '/bookings', label: 'Bookings', icon: '▣' },
    { path: '/earnings', label: 'Earnings', icon: '◀' },
    { path: '/reviews', label: 'Reviews', icon: '✦' },
    { path: '/chat', label: 'Chat', icon: '◎' },
  ];

  return (
    <div className={`bg-slate-900 dark:bg-slate-950 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} min-h-screen border-r border-slate-800`}>
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        {isOpen && <h1 className="font-bold text-lg">GH Admin</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ☰
        </button>
      </div>

      <nav className="mt-8">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <div
              className={`px-4 py-3 mx-2 rounded-lg flex items-center gap-3 transition-colors ${
                isActive(item.path)
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-800'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span className="text-sm">{item.label}</span>}
            </div>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button
          onClick={logout}
          className="w-full py-2 px-3 bg-red-900 hover:bg-red-800 transition-colors rounded-lg text-sm text-red-200"
        >
          {isOpen ? 'Logout' : 'Out'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
