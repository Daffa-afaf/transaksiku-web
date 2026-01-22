// src/services/dashboardService.js

/**
 * Layanan Dashboard
 * Service layer untuk menangani pengambilan data dashboard analytics
 * Menggunakan React Query untuk caching dan state management
 */

import {
  getDashboardStats,
  getTransaksi7Hari,
  getTop5Rekening,
  getKategoriTransaksi,
} from '../utils/dummyData';

/**
 * Simulasi API fetch dengan delay
 * Pada production, ini akan diganti dengan actual API call
 * 
 * @returns {Promise} Objek data dashboard
 */
export const fetchDashboardData = async () => {
  // Simulasi network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // Ambil semua data (dalam production, ini akan jadi API calls)
    const stats = getDashboardStats();
    const transaksi7Hari = getTransaksi7Hari();
    const top5Rekening = getTop5Rekening();
    const kategoriTransaksi = getKategoriTransaksi();
    
    return {
      stats,
      transaksi7Hari,
      top5Rekening,
      kategoriTransaksi,
    };
  } catch (error) {
    throw new Error('Gagal memuat data dashboard: ' + error.message);
  }
};

/**
 * Query Keys untuk React Query
 * Digunakan untuk caching dan invalidation
 */
export const dashboardQueryKeys = {
  all: ['dashboard'],
  stats: ['dashboard', 'stats'],
  transactions: ['dashboard', 'transactions'],
  charts: ['dashboard', 'charts'],
};

/**
 * Ambil hanya statistik overview
 * Untuk use case yang hanya butuh stats tanpa charts
 */
export const fetchDashboardStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return getDashboardStats();
};

/**
 * Ambil transaksi 7 hari untuk line chart
 */
export const fetchTransaksi7Hari = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return getTransaksi7Hari();
};

/**
 * Ambil top 5 rekening untuk bar chart
 */
export const fetchTop5Rekening = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return getTop5Rekening();
};

/**
 * Ambil kategori transaksi untuk pie chart
 */
export const fetchKategoriTransaksi = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return getKategoriTransaksi();
};
