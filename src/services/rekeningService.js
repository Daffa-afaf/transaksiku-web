// src/services/rekeningService.js

import { savedAccounts as seedSavedAccounts } from '../utils/dummyData';

const STORAGE_KEY = 'transaksiku_saved_accounts';
const DEFAULT_PAGE_SIZE = 6;

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

const ensureStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  return window.localStorage;
};

const normalizeAccount = (account, index = 0) => {
  const timestamp = new Date(Date.now() - index * 3600000).toISOString();
  return {
    id: account.id,
    nama: account.nama.trim(),
    noRekening: account.noRekening.trim(),
    bank: account.bank,
    favorite: Boolean(account.favorite),
    createdAt: account.createdAt || account.lastUsed || timestamp,
    updatedAt: account.updatedAt || account.createdAt || account.lastUsed || timestamp,
    lastUsed: account.lastUsed || account.createdAt || timestamp,
  };
};

const loadSavedAccounts = () => {
  const storage = ensureStorage();
  const seeded = seedSavedAccounts.map((acc, idx) => normalizeAccount(acc, idx));

  if (!storage) return seeded;

  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    storage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed.map((acc, idx) => normalizeAccount(acc, idx));
  } catch (error) {
    storage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
};

const persistSavedAccounts = (list) => {
  const storage = ensureStorage();
  if (storage) {
    storage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
};

const validateAccount = (payload, existing, currentId = null) => {
  if (!payload.nama?.trim()) throw new Error('Nama penerima wajib diisi.');
  if (!payload.noRekening?.trim()) throw new Error('Nomor rekening wajib diisi.');
  if (!/^\d{6,20}$/.test(payload.noRekening.trim())) {
    throw new Error('Nomor rekening harus 6-20 digit dan hanya angka.');
  }
  if (!payload.bank?.trim()) throw new Error('Bank wajib diisi.');

  const duplicate = existing.find(
    (acc) => acc.noRekening === payload.noRekening.trim() && acc.id !== currentId,
  );

  if (duplicate) {
    throw new Error('Nomor rekening sudah tersimpan, gunakan nomor lain.');
  }
};

const sorters = {
  createdAt: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  nama: (a, b) => a.nama.localeCompare(b.nama),
  bank: (a, b) => a.bank.localeCompare(b.bank),
  lastUsed: (a, b) => new Date(a.lastUsed) - new Date(b.lastUsed),
};

const applySort = (list, sortBy, sortDir) => {
  const sorter = sorters[sortBy] || sorters.createdAt;
  const sorted = [...list].sort(sorter);
  return sortDir === 'desc' ? sorted.reverse() : sorted;
};

const applyFilter = (list, search, bank) => {
  const term = search.toLowerCase();
  const filtered = list.filter((acc) => {
    const inSearch = term
      ? acc.nama.toLowerCase().includes(term) ||
        acc.noRekening.toLowerCase().includes(term) ||
        acc.bank.toLowerCase().includes(term)
      : true;

    const bankMatch = bank === 'all' ? true : acc.bank.toLowerCase() === bank.toLowerCase();

    return inSearch && bankMatch;
  });

  return filtered;
};

export const rekeningQueryKeys = {
  all: ['rekening'],
  list: (params) => ['rekening', 'list', params],
  detail: (id) => ['rekening', 'detail', id],
};

export const fetchSavedAccounts = async ({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search = '',
  bank = 'all',
  sortBy = 'createdAt',
  sortDir = 'desc',
} = {}) => {
  await delay(350);
  const store = loadSavedAccounts();

  const filtered = applyFilter(store, search, bank);
  const sorted = applySort(filtered, sortBy, sortDir);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const data = sorted.slice(start, start + pageSize);

  return {
    data,
    total,
    totalPages,
    page,
    pageSize,
  };
};

export const createSavedAccount = async (payload) => {
  await delay(450);
  const store = loadSavedAccounts();
  validateAccount(payload, store);

  const newAccount = normalizeAccount({
    ...payload,
    id: `ACC${Date.now()}`,
    favorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastUsed: new Date().toISOString(),
  });

  const nextStore = [newAccount, ...store];
  persistSavedAccounts(nextStore);

  return newAccount;
};

export const updateSavedAccount = async ({ id, ...payload }) => {
  await delay(450);
  const store = loadSavedAccounts();
  validateAccount(payload, store, id);

  const nextStore = store.map((acc) =>
    acc.id === id
      ? {
          ...acc,
          ...payload,
          updatedAt: new Date().toISOString(),
        }
      : acc,
  );

  persistSavedAccounts(nextStore);

  const updated = nextStore.find((acc) => acc.id === id);
  if (!updated) throw new Error('Rekening tidak ditemukan.');
  return updated;
};

export const deleteSavedAccount = async (id) => {
  await delay(350);
  const store = loadSavedAccounts();
  const nextStore = store.filter((acc) => acc.id !== id);
  persistSavedAccounts(nextStore);
  return { id };
};

export const bulkDeleteSavedAccounts = async (ids) => {
  await delay(350);
  const store = loadSavedAccounts();
  const nextStore = store.filter((acc) => !ids.includes(acc.id));
  persistSavedAccounts(nextStore);
  return { ids, removed: store.length - nextStore.length };
};

export const getBankOptions = () => {
  const store = loadSavedAccounts();
  return Array.from(new Set(store.map((acc) => acc.bank))).sort();
};
