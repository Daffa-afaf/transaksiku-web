// src/layout/Sidebar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Send,
  BarChart3,
  CreditCard,
  PieChart,
  Settings,
  LogOut,
  Sun,
} from 'lucide-react';
import { formatCurrency } from '../utils/dummyData';

const navItems = [
  { to: '/transfer', label: 'Transfer', icon: Send },
  { to: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/admin/rekening', label: 'Rekening', icon: CreditCard },
  { to: '/admin/laporan', label: 'Laporan', icon: PieChart },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ user, onLogout, theme = 'light' }) => {
  const location = useLocation();
  return (
    <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-white to-slate-50 border-r border-gray-200 h-screen shadow-xl">
      <div className="px-5 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">T</div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Transaksiku</p>
            <p className="text-lg font-bold text-gray-900 tracking-tight">Control</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl px-4 py-3 shadow-md">
          <p className="text-xs text-blue-100 font-medium">Saldo Tersedia</p>
          <p className="text-xl font-bold mt-1">{formatCurrency(user?.saldo || 0)}</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-semibold ${
                active
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm hover:scale-102'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="leading-tight flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 justify-center px-3 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all font-semibold shadow-sm hover:shadow"
        >
          <LogOut size={16} /> Keluar
        </button>
        <p className="text-[11px] text-gray-400 mt-3 flex items-center gap-1">
          <Sun size={12} /> {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
