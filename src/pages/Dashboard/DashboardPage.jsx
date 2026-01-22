// src/pages/Dashboard/DashboardPage.jsx

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Wallet, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import StatCard from '../../components/dashboard/StatCard';
import Loading from '../../components/common/Loading';
import { fetchDashboardData } from '../../services/dashboardService';
import { formatCurrency } from '../../utils/dummyData';

const DashboardPage = ({ user }) => {
  const [tab, setTab] = useState('overview');
  
  // Fetch data menggunakan React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full px-4 py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-semibold">Error memuat data dashboard</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  const { stats, transaksi7Hari, top5Rekening, kategoriTransaksi } = data;
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const Tabs = (
    <div className="inline-flex bg-white border border-gray-200 rounded-xl p-1 shadow-lg">
      {[
        { id: 'overview', label: 'Ringkasan' },
        { id: 'charts', label: 'Chart' },
        { id: 'top', label: 'Top Rekening' },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setTab(item.id)}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            tab === item.id ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col px-4">
      <div className="flex items-center justify-between gap-3 mb-5 bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Dashboard Analytics</h1>
          <p className="text-sm text-gray-600 mt-1">Visualisasi data real-time tanpa scroll</p>
        </div>
        {Tabs}
      </div>

      {tab === 'overview' && (
        <div className="space-y-4 flex-1 overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Saldo" value={formatCurrency(stats.totalSaldo)} subtitle="Saldo saat ini" icon={Wallet} bgColor="bg-blue-50" iconColor="text-blue-600" />
            <StatCard title="Transaksi Hari Ini" value={stats.transaksiHariIni} subtitle="Total transaksi" icon={Activity} bgColor="bg-green-50" iconColor="text-green-600" />
            <StatCard title="Uang Masuk" value={stats.incomingCount} subtitle={formatCurrency(stats.incomingTotal)} icon={TrendingUp} bgColor="bg-emerald-50" iconColor="text-emerald-600" trend={{ type: 'up', value: formatCurrency(stats.incomingTotal) }} />
            <StatCard title="Uang Keluar" value={stats.outgoingCount} subtitle={formatCurrency(stats.outgoingTotal)} icon={TrendingDown} bgColor="bg-red-50" iconColor="text-red-600" trend={{ type: 'down', value: formatCurrency(stats.outgoingTotal) }} />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity size={18} className="text-blue-600" />
              Transaksi 7 Hari (Line)
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={transaksi7Hari}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="tanggal" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip formatter={(value) => `Rp ${value.toFixed(2)}Jt`} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                <Legend />
                <Line type="monotone" dataKey="incoming" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="outgoing" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === 'charts' && (
        <div className="grid lg:grid-cols-2 gap-4 flex-1 overflow-y-auto scrollbar-hide">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pie - Kategori</h2>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie data={kategoriTransaksi} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={100} dataKey="value">
                  {kategoriTransaksi.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `Rp ${value.toFixed(2)}Jt`} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Bar - Top Rekening</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={top5Rekening} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis type="category" dataKey="nama" tick={{ fontSize: 12 }} stroke="#9ca3af" width={120} />
                <Tooltip formatter={(value) => `Rp ${value.toFixed(2)}Jt`} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                <Bar dataKey="total" fill="#3B82F6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === 'top' && (
        <div className="grid lg:grid-cols-3 gap-4 flex-1 overflow-y-auto scrollbar-hide">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top 5 Rekening</h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={top5Rekening} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis type="category" dataKey="nama" tick={{ fontSize: 12 }} stroke="#9ca3af" width={140} />
                <Tooltip formatter={(value) => `Rp ${value.toFixed(2)}Jt`} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                <Bar dataKey="total" fill="#3B82F6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <p className="text-sm text-gray-700 font-semibold mb-4">Ringkasan Kategori</p>
            <ul className="space-y-3 text-gray-800 text-sm">
              {kategoriTransaksi.map((item) => (
                <li key={item.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold text-blue-600">{item.count} trx</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
