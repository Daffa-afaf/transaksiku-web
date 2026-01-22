// src/services/settingsService.js

import {
  dummyUser,
  transactions,
  getTransaksi7Hari,
  getTop5Rekening,
} from '../utils/dummyData';

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

const PROFILE_KEY = 'transaksiku_profile';
const APP_KEY = 'transaksiku_app_settings';
const SECURITY_KEY = 'transaksiku_security';
const SESSIONS_KEY = 'transaksiku_sessions';

const defaultProfile = {
  name: dummyUser.name,
  email: dummyUser.email,
  avatar: '/profile.jpeg',
  phone: '+62 812-3456-7890',
  role: 'Administrator',
};

const defaultAppSettings = {
  theme: 'light',
  language: 'id',
  notifications: true,
};

const defaultSecurity = {
  twoFactorEnabled: false,
};

const defaultSessions = [
  { id: 'sess-1', device: 'Chrome on Windows', ip: '36.79.120.11', lastActive: new Date().toISOString(), location: 'Jakarta' },
  { id: 'sess-2', device: 'Safari on iPhone', ip: '103.122.44.21', lastActive: new Date(Date.now() - 3600_000).toISOString(), location: 'Bandung' },
  { id: 'sess-3', device: 'Edge on Windows', ip: '140.213.22.5', lastActive: new Date(Date.now() - 7200_000).toISOString(), location: 'Semarang' },
];

const load = (key, fallback) => {
  if (typeof window === 'undefined' || !window.localStorage) return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) {
    window.localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    window.localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
};

const save = (key, value) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const settingsQueryKeys = {
  profile: ['settings', 'profile'],
  app: ['settings', 'app'],
  security: ['settings', 'security'],
  sessions: ['settings', 'sessions'],
  charts: ['settings', 'charts'],
};

export const fetchProfile = async () => {
  await delay();
  return load(PROFILE_KEY, defaultProfile);
};

export const updateProfile = async (payload) => {
  await delay(400);
  const next = { ...load(PROFILE_KEY, defaultProfile), ...payload };
  save(PROFILE_KEY, next);
  return next;
};

export const fetchAppSettings = async () => {
  await delay(300);
  return load(APP_KEY, defaultAppSettings);
};

export const updateAppSettings = async (payload) => {
  await delay(300);
  const next = { ...load(APP_KEY, defaultAppSettings), ...payload };
  save(APP_KEY, next);
  return next;
};

export const fetchSecuritySettings = async () => {
  await delay(300);
  return load(SECURITY_KEY, defaultSecurity);
};

export const updateSecuritySettings = async (payload) => {
  await delay(400);
  const next = { ...load(SECURITY_KEY, defaultSecurity), ...payload };
  save(SECURITY_KEY, next);
  return next;
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  await delay(500);
  if (!newPassword || newPassword.length < 6) {
    throw new Error('Password baru minimal 6 karakter.');
  }
  // Simulasi: selalu berhasil
  return { success: true };
};

export const fetchSessions = async () => {
  await delay(300);
  return load(SESSIONS_KEY, defaultSessions);
};

export const revokeSession = async (id) => {
  await delay(300);
  const sessions = load(SESSIONS_KEY, defaultSessions);
  const filtered = sessions.filter((s) => s.id !== id);
  save(SESSIONS_KEY, filtered);
  return { id };
};
