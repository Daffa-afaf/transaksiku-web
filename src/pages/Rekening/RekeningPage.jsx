// src/pages/Rekening/RekeningPage.jsx

import React, { useEffect, useMemo, useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  SortAsc,
  SortDesc,
  Loader2,
} from 'lucide-react';
import Toast from '../../components/common/Toast';
import Modal from '../../components/common/Modal';
import {
  rekeningQueryKeys,
  fetchSavedAccounts,
  createSavedAccount,
  updateSavedAccount,
  deleteSavedAccount,
  bulkDeleteSavedAccounts,
  getBankOptions,
} from '../../services/rekeningService';
import { formatDateShort } from '../../utils/dummyData';

const AccountFormModal = ({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
  isSubmitting,
}) => {
  const [form, setForm] = useState({ nama: '', noRekening: '', bank: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm({
        nama: initialData?.nama || '',
        noRekening: initialData?.noRekening || '',
        bank: initialData?.bank || '',
      });
      setErrors({});
    }
  }, [open, initialData]);

  const validate = () => {
    const next = {};
    if (!form.nama.trim()) next.nama = 'Nama wajib diisi';
    if (!/^\d{6,20}$/.test(form.noRekening.trim())) {
      next.noRekening = 'Nomor rekening 6-20 digit angka';
    }
    if (!form.bank.trim()) next.bank = 'Bank wajib diisi';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {mode === 'edit' ? 'Edit Rekening' : 'Tambah Rekening' }
            </h3>
            <p className="text-sm text-gray-500">Isi data rekening favorit</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nama</label>
            <input
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.nama ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Contoh: Budi Santoso"
            />
            {errors.nama && <p className="text-xs text-red-500 mt-1">{errors.nama}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor Rekening</label>
            <input
              value={form.noRekening}
              onChange={(e) => setForm({ ...form, noRekening: e.target.value })}
              className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.noRekening ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Hanya angka 6-20 digit"
            />
            {errors.noRekening && <p className="text-xs text-red-500 mt-1">{errors.noRekening}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Bank</label>
            <input
              value={form.bank}
              onChange={(e) => setForm({ ...form, bank: e.target.value })}
              className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.bank ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Contoh: BCA"
            />
            {errors.bank && <p className="text-xs text-red-500 mt-1">{errors.bank}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-70 flex items-center gap-2"
            >
              {isSubmitting && <Loader2 size={18} className="animate-spin" />}
              {mode === 'edit' ? 'Simpan Perubahan' : 'Tambah Rekening'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RekeningPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [bankFilter, setBankFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [selectedIds, setSelectedIds] = useState([]);
  const [modalState, setModalState] = useState({ open: false, mode: 'create', data: null });
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmBulk, setConfirmBulk] = useState(false);

  const queryClient = useQueryClient();
  const params = useMemo(() => ({
    page,
    pageSize: 6,
    search: debouncedSearch,
    bank: bankFilter,
    sortBy,
    sortDir,
  }), [page, debouncedSearch, bankFilter, sortBy, sortDir]);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(handle);
  }, [search]);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: rekeningQueryKeys.list(params),
    queryFn: () => fetchSavedAccounts(params),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!data) return;
    setSelectedIds((prev) => prev.filter((id) => data.data.some((acc) => acc.id === id)));
  }, [data]);

  const bankOptions = useMemo(() => ['all', ...getBankOptions()], [data]);

  const setListCache = (updater, keyParams) => {
    const key = rekeningQueryKeys.list(keyParams || params);
    const previous = queryClient.getQueryData(key);
    if (!previous) return null;
    const next = updater(previous);
    queryClient.setQueryData(key, next);
    return previous;
  };

  const createMutation = useMutation({
    mutationFn: createSavedAccount,
    onMutate: async (payload) => {
      const keyParams = { ...params, page: 1 };
      await queryClient.cancelQueries({ queryKey: rekeningQueryKeys.list(keyParams) });
      const previous = setListCache((prev) => {
        const optimistic = {
          id: `OPT-${Date.now()}`,
          nama: payload.nama.trim(),
          noRekening: payload.noRekening.trim(),
          bank: payload.bank.trim(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastUsed: new Date().toISOString(),
        };
        const nextData = [optimistic, ...prev.data].slice(0, prev.pageSize);
        return {
          ...prev,
          data: nextData,
          total: prev.total + 1,
          totalPages: Math.max(1, Math.ceil((prev.total + 1) / prev.pageSize)),
          page: 1,
        };
      }, keyParams);
      setPage(1);
      return { previous, keyParams };
    },
    onError: (err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(rekeningQueryKeys.list(context.keyParams), context.previous);
      }
      setToast({ message: err.message, type: 'error' });
    },
    onSuccess: (result, _payload, context) => {
      if (context?.keyParams) {
        setListCache((prev) => {
          if (!prev) return prev;
          const withoutOptimistic = prev.data.filter((item) => !String(item.id).startsWith('OPT-'));
          const nextData = [result, ...withoutOptimistic];
          return {
            ...prev,
            data: nextData.slice(0, prev.pageSize),
            total: prev.total,
          };
        }, context.keyParams);
      }
      setToast({ message: 'Rekening berhasil ditambahkan', type: 'success' });
      setModalState({ open: false, mode: 'create', data: null });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: rekeningQueryKeys.all });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSavedAccount,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: rekeningQueryKeys.list(params) });
      const previous = setListCache((prev) => ({
        ...prev,
        data: prev.data.map((acc) =>
          acc.id === payload.id
            ? { ...acc, ...payload, updatedAt: new Date().toISOString() }
            : acc,
        ),
      }));
      return { previous };
    },
    onError: (err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(rekeningQueryKeys.list(params), context.previous);
      }
      setToast({ message: err.message, type: 'error' });
    },
    onSuccess: () => {
      setToast({ message: 'Rekening berhasil diperbarui', type: 'success' });
      setModalState({ open: false, mode: 'create', data: null });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: rekeningQueryKeys.all });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSavedAccount,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: rekeningQueryKeys.list(params) });
      const previous = setListCache((prev) => {
        const nextTotal = Math.max(0, prev.total - 1);
        const nextPages = Math.max(1, Math.ceil(nextTotal / prev.pageSize));
        return {
          ...prev,
          data: prev.data.filter((acc) => acc.id !== id),
          total: nextTotal,
          totalPages: nextPages,
        };
      });
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      return { previous };
    },
    onError: (err, _id, context) => {
      if (context?.previous) queryClient.setQueryData(rekeningQueryKeys.list(params), context.previous);
      setToast({ message: err.message, type: 'error' });
    },
    onSuccess: () => {
      setToast({ message: 'Rekening dihapus', type: 'success' });
    },
    onSettled: () => {
      setConfirmDelete(null);
      queryClient.invalidateQueries({ queryKey: rekeningQueryKeys.all });
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: bulkDeleteSavedAccounts,
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: rekeningQueryKeys.list(params) });
      const previous = setListCache((prev) => {
        const nextTotal = Math.max(0, prev.total - ids.length);
        const nextPages = Math.max(1, Math.ceil(nextTotal / prev.pageSize));
        return {
          ...prev,
          data: prev.data.filter((acc) => !ids.includes(acc.id)),
          total: nextTotal,
          totalPages: nextPages,
        };
      });
      setSelectedIds([]);
      return { previous };
    },
    onError: (err, _payload, context) => {
      if (context?.previous) queryClient.setQueryData(rekeningQueryKeys.list(params), context.previous);
      setToast({ message: err.message, type: 'error' });
    },
    onSuccess: (res) => {
      setToast({ message: `${res.removed || 0} rekening dihapus`, type: 'success' });
    },
    onSettled: () => {
      setConfirmBulk(false);
      queryClient.invalidateQueries({ queryKey: rekeningQueryKeys.all });
    },
  });

  const currentData = data?.data || [];

  const toggleSelectAll = (checked) => {
    if (!data) return;
    setSelectedIds(checked ? currentData.map((acc) => acc.id) : []);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSubmitForm = (formData) => {
    if (modalState.mode === 'edit' && modalState.data) {
      updateMutation.mutate({ id: modalState.data.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 mb-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Manajemen Rekening</h1>
            <p className="text-sm text-gray-600 mt-1">Kelola rekening tersimpan dengan mudah</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setConfirmBulk(true)}
              disabled={!selectedIds.length || bulkDeleteMutation.isLoading}
              className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 disabled:opacity-60 transition-all shadow-sm"
            >
              <Trash2 size={16} /> Hapus
            </button>
            <button
              onClick={() => setModalState({ open: true, mode: 'create', data: null })}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all shadow-md"
            >
              <Plus size={16} /> Tambah
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-4 border border-gray-100">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search size={18} className="text-gray-400 absolute left-3 top-3" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama / bank / nomor"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={bankFilter}
            onChange={(e) => {
              setBankFilter(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {bankOptions.map((bank) => (
              <option key={bank} value={bank}>
                {bank === 'all' ? 'Semua Bank' : bank}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="createdAt">Sort: Tanggal Ditambahkan</option>
              <option value="nama">Sort: Nama</option>
              <option value="bank">Sort: Bank</option>
              <option value="lastUsed">Sort: Terakhir Dipakai</option>
            </select>
            <button
              onClick={() => setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              {sortDir === 'asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
            </button>
          </div>
        </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide mt-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === currentData.length && currentData.length > 0}
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="px-3 py-2">Nama</th>
                <th className="px-3 py-2">Nomor Rekening</th>
                <th className="px-3 py-2">Bank</th>
                <th className="px-3 py-2">Ditambahkan</th>
                <th className="px-3 py-2 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading && (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-500">
                    Memuat data rekening...
                  </td>
                </tr>
              )}
              {!isLoading && !currentData.length && (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-500">
                    Tidak ada rekening yang tersimpan.
                  </td>
                </tr>
              )}
              {currentData.map((acc) => (
                <tr key={acc.id} className="text-sm text-gray-800">
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(acc.id)}
                      onChange={() => toggleSelect(acc.id)}
                    />
                  </td>
                  <td className="px-3 py-3 font-semibold">{acc.nama}</td>
                  <td className="px-3 py-3 text-gray-700">{acc.noRekening}</td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                      {acc.bank}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-gray-600">{formatDateShort(acc.createdAt)}</td>
                  <td className="px-3 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setModalState({ open: true, mode: 'edit', data: acc })}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(acc)}
                        className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isFetching && !isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
            <Loader2 size={16} className="animate-spin" />
            Menyegarkan data...
          </div>
        )}
        </div>
      </div>

      {data && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-gray-600">
            Menampilkan {currentData.length} dari {data.total} rekening
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-60"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600">
              Halaman {page} / {data.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              disabled={page === data.totalPages}
              className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-60 transition-all font-medium"
            >
              Next
            </button>
          </div>
        </div>
      )}
      </div>

      <AccountFormModal
        open={modalState.open}
        mode={modalState.mode}
        initialData={modalState.data}
        onClose={() => setModalState({ open: false, mode: 'create', data: null })}
        onSubmit={handleSubmitForm}
        isSubmitting={createMutation.isLoading || updateMutation.isLoading}
      />

      {confirmDelete && (
        <Modal
          title="Hapus Rekening"
          message={`Anda yakin ingin menghapus ${confirmDelete.nama}?`}
          onConfirm={() => deleteMutation.mutate(confirmDelete.id)}
          onCancel={() => setConfirmDelete(null)}
          type="confirm"
        />
      )}

      {confirmBulk && (
        <Modal
          title="Hapus Rekening Terpilih"
          message={`Hapus ${selectedIds.length} rekening terpilih? Tindakan ini tidak dapat dibatalkan.`}
          onConfirm={() => bulkDeleteMutation.mutate(selectedIds)}
          onCancel={() => setConfirmBulk(false)}
          type="confirm"
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default RekeningPage;
