// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/Login/LoginPage';
import TransferPage from './pages/Transfer/TransferPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import RekeningPage from './pages/Rekening/RekeningPage';
import LaporanPage from './pages/Laporan/LaporanPage';
import SettingsPage from './pages/Settings/SettingsPage';
import { PreferencesProvider, usePreferences } from './contexts/PreferencesContext';
import Sidebar from './layout/Sidebar';

// Setup React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  const [user, setUser] = useState(null);

  // Check localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const Shell = ({ children }) => {
    const { theme } = usePreferences();
    return (
      <div className="h-screen flex overflow-hidden bg-slate-50">
        <Sidebar user={user} onLogout={handleLogout} theme={theme} />
        <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden px-4 md:px-8 py-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 scrollbar-hide">
          <style dangerouslySetInnerHTML={{ __html: `.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }` }} />
          {children}
        </main>
      </div>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PreferencesProvider>
        <Router>
          {!user ? (
            <LoginPage onLogin={handleLogin} />
          ) : (
            <Shell>
              <Routes>
                <Route path="/transfer" element={<TransferPage user={user} onLogout={handleLogout} />} />
                <Route path="/admin/dashboard" element={<DashboardPage user={user} />} />
                <Route path="/admin/rekening" element={<RekeningPage />} />
                <Route path="/admin/laporan" element={<LaporanPage />} />
                <Route path="/admin/settings" element={<SettingsPage user={user} />} />
                <Route path="/" element={<Navigate to="/transfer" replace />} />
              </Routes>
            </Shell>
          )}
        </Router>
      </PreferencesProvider>
    </QueryClientProvider>
  );
}

export default App;