// src/pages/Transfer/TransferPage.jsx

import React, { useState, useEffect } from 'react';
import Toast from '../../components/common/Toast';
import Modal from '../../components/common/Modal';
import Loading from '../../components/common/Loading';
import TransferForm from './components/TransferForm';
import TransactionList from './components/TransactionList';
import { savedAccounts, transferTemplates, transactions as allTransactions, formatCurrency } from '../../utils/dummyData';

const TransferPage = ({ user, onLogout }) => {
  const [transactions, setTransactions] = useState([]);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [confirmTransfer, setConfirmTransfer] = useState(null);
  const [receipt, setReceipt] = useState(null);

  // Load transaksi dummy saat pertama kali mount
  useEffect(() => {
    // Simulasi fetch data dengan delay
    setTimeout(() => {
      const formattedTransaksi = allTransactions.slice(0, 10).map(t => ({
        ...t,
        date: new Date(t.tanggal).toISOString(),
      }));
      setTransactions(formattedTransaksi);
    }, 500);
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleTransfer = (formData) => {
    if (!formData.accountNumber || !formData.accountName || !formData.bank || !formData.amount) {
      showToast('Mohon lengkapi nama, bank, nomor rekening, dan nominal.', 'error');
      return;
    }
    if (parseInt(formData.amount, 10) < 1000) {
      showToast('Nominal transfer minimal Rp 1.000!', 'error');
      return;
    }
    setConfirmTransfer(formData);
  };

  const executeTransfer = () => {
    if (!confirmTransfer) return;
    setIsLoading(true);
    setReceipt(null);

    setTimeout(() => {
      const newId = `TRX${String(transactions.length + 1).padStart(3, '0')}`;
      const now = new Date();
      const nominal = parseInt(confirmTransfer.amount, 10);

      const newTransaction = {
        id: newId,
        date: now.toISOString(),
        tanggal: now.toISOString().split('T')[0],
        accountNumber: confirmTransfer.accountNumber,
        accountName: confirmTransfer.accountName,
        tujuan: confirmTransfer.accountName,
        bank: confirmTransfer.bank,
        amount: nominal,
        nominal,
        message: confirmTransfer.message,
        catatan: confirmTransfer.message,
        status: 'Berhasil',
      };

      setTransactions((prev) => [newTransaction, ...prev]);
      setIsLoading(false);
      setToast({ message: 'Transfer berhasil dilakukan!', type: 'success' });
      setConfirmTransfer(null);
      setReceipt({ ...newTransaction, createdAt: now.toISOString() });
    }, 1600);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('user');
    onLogout();
  };

  const favoriteAccounts = savedAccounts.filter((acc) => acc.favorite);
  const scheduledTransfers = transferTemplates.filter((tpl) => tpl.frequency !== 'once');

  const stats = {
    total: transactions.length,
    totalNominal: transactions.reduce((sum, tx) => sum + (tx.nominal || 0), 0),
    last: transactions[0],
  };

  return (
    <>
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white rounded-2xl p-6 mb-5 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-blue-100">Transfer Cepat & Aman</p>
              <h1 className="text-2xl font-bold">Kelola Transfer tanpa Scroll Panjang</h1>
              <p className="text-sm text-blue-100">Gunakan favorit, template, dan lihat riwayat terpaginasikan.</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="bg-white/15 rounded-lg px-3 py-2">
                <p className="text-blue-100">Total Transaksi</p>
                <p className="font-bold">{stats.total}</p>
              </div>
              <div className="bg-white/15 rounded-lg px-3 py-2">
                <p className="text-blue-100">Nominal</p>
                <p className="font-bold">{formatCurrency(stats.totalNominal)}</p>
              </div>
              <div className="bg-white/15 rounded-lg px-3 py-2">
                <p className="text-blue-100">Terakhir</p>
                <p className="font-bold truncate max-w-[140px]">{stats.last?.tujuan || stats.last?.accountName || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 flex-1 overflow-hidden">
          <div className="flex flex-col overflow-y-auto scrollbar-hide">
            <TransferForm
              onSubmit={handleTransfer}
              favorites={favoriteAccounts}
              templates={transferTemplates}
              scheduled={scheduledTransfers}
            />

            {receipt && (
              <details className="bg-white rounded-lg shadow-md p-4 mt-3 border border-blue-100" open>
                <summary className="cursor-pointer text-sm font-semibold text-gray-800">Bukti Transfer Digital</summary>
                <p className="text-xs text-gray-500 mb-3">Tersimpan di perangkat Anda (simulasi).</p>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div>
                    <p className="text-gray-500 text-xs">ID Transaksi</p>
                    <p className="font-semibold">{receipt.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Tanggal</p>
                    <p className="font-semibold">{new Date(receipt.createdAt).toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Tujuan</p>
                    <p className="font-semibold">{receipt.accountName} ({receipt.bank})</p>
                    <p className="text-xs">{receipt.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Nominal</p>
                    <p className="font-semibold">Rp {receipt.nominal.toLocaleString('id-ID')}</p>
                  </div>
                  {receipt.message && (
                    <div className="md:col-span-2">
                      <p className="text-gray-500 text-xs">Catatan</p>
                      <p className="font-semibold">{receipt.message}</p>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>

          <div className="flex flex-col overflow-y-auto scrollbar-hide">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Riwayat Transaksi
              </h2>
              <TransactionList transactions={transactions} pageSize={6} />
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Confirmation Modal */}
      {confirmTransfer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Konfirmasi Transfer</h3>
            <p className="text-sm text-gray-500 mb-4">Periksa kembali detail sebelum melanjutkan.</p>
            <div className="space-y-3 text-sm text-gray-800">
              <div className="flex justify-between">
                <span className="text-gray-500">Penerima</span>
                <span className="font-semibold">{confirmTransfer.accountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bank</span>
                <span className="font-semibold">{confirmTransfer.bank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">No. Rekening</span>
                <span className="font-semibold">{confirmTransfer.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Nominal</span>
                <span className="font-semibold">Rp {parseInt(confirmTransfer.amount, 10).toLocaleString('id-ID')}</span>
              </div>
              {confirmTransfer.message && (
                <div>
                  <p className="text-gray-500">Catatan</p>
                  <p className="font-semibold">{confirmTransfer.message}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setConfirmTransfer(null)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={executeTransfer}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Konfirmasi & Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Loading Modal */}
      {isLoading && <Loading />}

      {/* Logout Confirmation Modal (SweetAlert replacement) */}
      {showLogoutModal && (
        <Modal
          title="Konfirmasi Logout"
          message="Apakah Anda yakin ingin keluar dari aplikasi?"
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutModal(false)}
          type="confirm"
        />
      )}
    </>
  );
};

export default TransferPage;