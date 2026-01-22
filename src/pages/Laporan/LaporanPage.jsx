// src/pages/Laporan/LaporanPage.jsx

import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { Filter, TrendingUp, Wallet, Activity, PieChart as PieIcon, Calendar } from 'lucide-react';
import Loading from '../../components/common/Loading';
import { laporanQueryKeys, fetchLaporan } from '../../services/laporanService';
import { formatCurrency, formatDateShort } from '../../utils/dummyData';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const SummaryCard = ({ title, value, icon: Icon, subtext }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
    <div className="p-3 rounded-full bg-blue-50 text-blue-600">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
    </div>
  </div>
);

const LaporanPage = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: '',
    status: 'all',
    tujuan: 'all',
  });

  const params = useMemo(() => ({ ...filters }), [filters]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: laporanQueryKeys.list(params),
    queryFn: () => fetchLaporan(params),
    keepPreviousData: true,
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredList = data?.list || [];

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Laporan Transaksi</h1>
            <p className="text-sm text-gray-600 mt-1">Analisis dan visualisasi data transaksi</p>
          </div>
          {isFetching && !isLoading && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Activity size={16} className="animate-spin" />
              Menyegarkan data...
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4">
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
          <div className="flex items-center gap-2 text-gray-900 font-semibold mb-4">
            <Filter size={18} className="text-blue-600" /> Filter Lanjutan
          </div>
          <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Mulai</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Selesai</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nominal Min</label>
              <input
                type="number"
                value={filters.minAmount}
                onChange={(e) => handleChange('minAmount', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nominal Max</label>
              <input
                type="number"
                value={filters.maxAmount}
                onChange={(e) => handleChange('maxAmount', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua</option>
              <option value="Berhasil">Berhasil</option>
              <option value="Pending">Pending</option>
              <option value="Gagal">Gagal</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Rekening Tujuan</label>
            <select
              value={filters.tujuan}
              onChange={(e) => handleChange('tujuan', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua</option>
              {data?.recipients?.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-10">
          <Loading />
        </div>
      )}

      {data && !isLoading && (
        <>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <SummaryCard
              title="Total Transaksi"
              value={data.summary.totalTransaksi}
              icon={Activity}
              subtext="Jumlah transaksi dalam filter"
            />
            <SummaryCard
              title="Total Nominal"
              value={formatCurrency(data.summary.totalNominal)}
              icon={Wallet}
              subtext="Akumulasi nominal"
            />
            <SummaryCard
              title="Rata-rata/Transaksi"
              value={formatCurrency(Math.round(data.summary.rataRata))}
              icon={TrendingUp}
              subtext="Nilai rata-rata"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3 text-gray-800 font-semibold">
                <Calendar size={18} /> Tren Transaksi per Hari
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data.trendData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="tanggal" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}J`} stroke="#9ca3af" />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    labelFormatter={(label) => formatDateShort(label)}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3 text-gray-800 font-semibold">
                <PieIcon size={18} /> Distribusi Status
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={data.statusDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {data.statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center gap-2 mb-3 text-gray-800 font-semibold">
              <TrendingUp size={18} /> Top Penerima Transfer
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={data.topRecipients} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tickFormatter={(v) => `${(v / 1000000).toFixed(1)}J`} stroke="#9ca3af" />
                <YAxis type="category" dataKey="nama" width={140} stroke="#9ca3af" />
                <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                <Bar dataKey="total" fill="#10B981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3 text-gray-800 font-semibold">
              <Activity size={18} /> Detail Transaksi Terfilter
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-sm text-gray-600">
                  <tr>
                    <th className="px-3 py-2 text-left">Tanggal</th>
                    <th className="px-3 py-2 text-left">Tujuan</th>
                    <th className="px-3 py-2 text-left">Bank</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
                  {!filteredList.length && (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-500">
                        Tidak ada transaksi pada filter ini.
                      </td>
                    </tr>
                  )}
                  {filteredList.slice(0, 30).map((tx) => (
                    <tr key={tx.id}>
                      <td className="px-3 py-2">{formatDateShort(tx.tanggal)}</td>
                      <td className="px-3 py-2 font-semibold">{tx.tujuan}</td>
                      <td className="px-3 py-2">{tx.bank}</td>
                      <td className="px-3 py-2">
                        <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">{tx.status}</span>
                      </td>
                      <td className="px-3 py-2 text-right">{formatCurrency(tx.nominal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredList.length > 30 && (
              <p className="text-xs text-gray-500 mt-2">Menampilkan 30 transaksi pertama dari {filteredList.length} hasil.</p>
            )}
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default LaporanPage;
