// src/services/laporanService.js

import { transactions } from '../utils/dummyData';

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const laporanQueryKeys = {
  list: (params) => ['laporan', 'list', params],
};

const normalizeDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

const toEndOfDay = (value) => {
  if (!value) return null;
  const date = new Date(value);
  date.setHours(23, 59, 59, 999);
  return date;
};

const getRecipients = () => Array.from(new Set(transactions.map((t) => t.tujuan)));

export const fetchLaporan = async ({
  startDate,
  endDate,
  minAmount,
  maxAmount,
  status = 'all',
  tujuan = 'all',
} = {}) => {
  await delay();

  const start = normalizeDate(startDate);
  const end = toEndOfDay(endDate);
  const min = Number(minAmount) || 0;
  const max = Number(maxAmount) || 0;

  const filtered = transactions.filter((tx) => {
    const txDate = new Date(tx.tanggal);
    const matchStart = start ? txDate >= start : true;
    const matchEnd = end ? txDate <= end : true;
    const matchMin = min ? tx.nominal >= min : true;
    const matchMax = max ? tx.nominal <= max : true;
    const matchStatus = status === 'all' ? true : tx.status === status;
    const matchTujuan = tujuan === 'all' ? true : tx.tujuan === tujuan;
    return matchStart && matchEnd && matchMin && matchMax && matchStatus && matchTujuan;
  });

  const totalNominal = filtered.reduce((sum, tx) => sum + tx.nominal, 0);
  const summary = {
    totalTransaksi: filtered.length,
    totalNominal,
    rataRata: filtered.length ? totalNominal / filtered.length : 0,
  };

  const trendMap = filtered.reduce((acc, tx) => {
    const dateKey = new Date(tx.tanggal).toISOString().split('T')[0];
    if (!acc[dateKey]) {
      acc[dateKey] = { tanggal: dateKey, total: 0, count: 0 };
    }
    acc[dateKey].total += tx.nominal;
    acc[dateKey].count += 1;
    return acc;
  }, {});
  const trendData = Object.values(trendMap)
    .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

  const statusMap = filtered.reduce(
    (acc, tx) => {
      acc[tx.status] = (acc[tx.status] || 0) + 1;
      return acc;
    },
    { Berhasil: 0, Pending: 0, Gagal: 0, Dibatalkan: 0 },
  );
  const statusDistribution = Object.entries(statusMap)
    .filter(([, count]) => count > 0)
    .map(([name, value]) => ({ name, value }));

  const recipientMap = filtered.reduce((acc, tx) => {
    const key = tx.tujuan;
    if (!acc[key]) acc[key] = { nama: key, total: 0, count: 0, bank: tx.bank };
    acc[key].total += tx.nominal;
    acc[key].count += 1;
    return acc;
  }, {});
  const topRecipients = Object.values(recipientMap)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return {
    filters: { startDate, endDate, minAmount, maxAmount, status, tujuan },
    summary,
    trendData,
    statusDistribution,
    topRecipients,
    list: filtered,
    recipients: getRecipients(),
  };
};
