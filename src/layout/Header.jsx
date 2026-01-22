// src/components/layout/Header.jsx

import React from 'react';
import { LogOut, Wallet, BarChart3, Send, CreditCard, PieChart, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { formatCurrency } from '../utils/dummyData';

const Header = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <div className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Transaksiku</h1>
            <p className="text-sm text-gray-600">Selamat datang, {user.name}</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Navigation Links */}
            <nav className="flex gap-2">
              <Link
                to="/admin/dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  location.pathname === '/admin/dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BarChart3 size={18} />
                Dashboard
              </Link>
              <Link
                to="/transfer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  location.pathname === '/transfer'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Send size={18} />
                Transfer
              </Link>
              <Link
                to="/admin/rekening"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  location.pathname === '/admin/rekening'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <CreditCard size={18} />
                Rekening
              </Link>
              <Link
                to="/admin/laporan"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  location.pathname === '/admin/laporan'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <PieChart size={18} />
                Laporan
              </Link>
              <Link
                to="/admin/settings"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  location.pathname === '/admin/settings'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Settings size={18} />
                Settings
              </Link>
            </nav>

            {/* Saldo */}
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Wallet size={18} className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Saldo</p>
                  <p className="font-bold text-blue-600">{formatCurrency(user.saldo)}</p>
                </div>
              </div>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;