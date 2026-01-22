// src/pages/Settings/SettingsPage.jsx

import React, { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Shield,
  User,
  Moon,
  Sun,
  Activity,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import Card from '../../components/molecules/Card';
import FormField from '../../components/molecules/FormField';
import InputField from '../../components/atoms/InputField';
import ToggleSwitch from '../../components/atoms/ToggleSwitch';
import AvatarUploader from '../../components/atoms/AvatarUploader';
import PrimaryButton from '../../components/atoms/PrimaryButton';
import { Table } from '../../components/molecules/Table';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import withCardShell from '../../components/hoc/withCardShell';
import Loading from '../../components/common/Loading';
import Toast from '../../components/common/Toast';
import { usePreferences } from '../../contexts/PreferencesContext';
import { useSettingsLogic } from '../../hooks/useSettingsLogic';
import { formatDateShort } from '../../utils/dummyData';

const ProfileSectionBase = ({ profileQuery, profileMutation }) => {
  const [profile, setProfile] = useState({ name: '', email: '', avatar: '' });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Bersihkan cache profil lama dengan avatar GitHub
    const cachedProfile = localStorage.getItem('transaksiku_profile');
    if (cachedProfile) {
      try {
        const parsed = JSON.parse(cachedProfile);
        if (parsed.avatar && parsed.avatar.includes('avatars.githubusercontent.com')) {
          localStorage.removeItem('transaksiku_profile');
          window.location.reload();
        }
      } catch (err) {
        // abaikan error
      }
    }
  }, []);

  useEffect(() => {
    if (profileQuery.data) setProfile(profileQuery.data);
  }, [profileQuery.data]);

  const handleSave = () => {
    profileMutation.mutate(profile, {
      onSuccess: () => setToast({ message: 'Profil diperbarui', type: 'success' }),
      onError: (err) => setToast({ message: err.message, type: 'error' }),
    });
  };

  if (profileQuery.isLoading) return <div className="text-sm text-gray-500">Memuat profil...</div>;

  return (
    <div className="space-y-4">
      <AvatarUploader value={profile.avatar} onChange={(v) => setProfile((p) => ({ ...p, avatar: v }))} />
      <FormField label="Nama" description="Nama lengkap">
        <InputField value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
      </FormField>
      <FormField label="Email" description="Email login">
        <InputField type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
      </FormField>
      <div className="flex justify-end">
        <PrimaryButton onClick={handleSave} disabled={profileMutation.isLoading}>Simpan Profil</PrimaryButton>
      </div>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
};

const ProfileSection = withCardShell(ProfileSectionBase, 'Profil Pengguna');

const AppSettingsSection = ({ appQuery, appMutation, theme, setThemeValue }) => {
  const [settings, setSettings] = useState({ theme: 'light', notifications: true });

  useEffect(() => {
    if (appQuery.data) setSettings(appQuery.data);
  }, [appQuery.data]);

  useEffect(() => {
    if (settings.theme) setThemeValue(settings.theme);
  }, [settings.theme, setThemeValue]);

  const handleSave = () => {
    appMutation.mutate(settings);
  };

  return (
    <Card
      title="Pengaturan Aplikasi"
      action={<span className="text-xs text-gray-500">Mode saat ini: {theme}</span>}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-800 font-semibold">
            {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
            <span>Dark/Light Mode</span>
          </div>
          <ToggleSwitch
            checked={settings.theme === 'dark'}
            onChange={(checked) => setSettings((prev) => ({ ...prev, theme: checked ? 'dark' : 'light' }))}
            label={settings.theme === 'dark' ? 'Dark' : 'Light'}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-800 font-semibold">Notifikasi</span>
          <ToggleSwitch
            checked={settings.notifications}
            onChange={(checked) => setSettings((prev) => ({ ...prev, notifications: checked }))}
            label={settings.notifications ? 'On' : 'Off'}
          />
        </div>
        <div className="flex justify-end">
          <PrimaryButton onClick={handleSave} disabled={appMutation.isLoading}>Simpan Pengaturan</PrimaryButton>
        </div>
      </div>
    </Card>
  );
};

const SecuritySection = ({ securityQuery, securityMutation, passwordMutation }) => {
  const [twoFA, setTwoFA] = useState(false);
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (securityQuery.data) setTwoFA(securityQuery.data.twoFactorEnabled);
  }, [securityQuery.data]);

  const handleToggle2FA = (value) => {
    setTwoFA(value);
    securityMutation.mutate({ twoFactorEnabled: value });
  };

  const handleChangePassword = () => {
    passwordMutation.mutate(passwords, {
      onSuccess: () => {
        setToast({ message: 'Password diperbarui', type: 'success' });
        setPasswords({ currentPassword: '', newPassword: '' });
      },
      onError: (err) => setToast({ message: err.message, type: 'error' }),
    });
  };

  return (
    <Card title="Keamanan">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-800 font-semibold">
            <Shield size={18} /> Two-factor Authentication
          </div>
          <ToggleSwitch checked={twoFA} onChange={handleToggle2FA} label={twoFA ? 'Aktif' : 'Nonaktif'} />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <FormField label="Password Saat Ini">
            <InputField
              type="password"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              placeholder="••••••"
            />
          </FormField>
          <FormField label="Password Baru" description="Minimal 6 karakter">
            <InputField
              type="password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              placeholder="••••••"
            />
          </FormField>
        </div>
        <div className="flex justify-end">
          <PrimaryButton onClick={handleChangePassword} disabled={passwordMutation.isLoading}>Ubah Password</PrimaryButton>
        </div>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </Card>
  );
};

const SessionsSection = ({ sessionsQuery, revokeSessionMutation }) => {
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const sessions = sessionsQuery.data || [];
  const totalPages = Math.max(1, Math.ceil(sessions.length / pageSize));
  const paged = useMemo(() => sessions.slice((page - 1) * pageSize, page * pageSize), [sessions, page]);

  return (
    <Card title="Sesi Aktif" action={<span className="text-xs text-gray-500">Dummy data</span>}>
      <div className="overflow-x-auto">
        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.Cell header>Perangkat</Table.Cell>
              <Table.Cell header>IP</Table.Cell>
              <Table.Cell header>Lokasi</Table.Cell>
              <Table.Cell header>Aktif Terakhir</Table.Cell>
              <Table.Cell header align="right">Aksi</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {paged.map((session) => (
              <Table.Row key={session.id}>
                <Table.Cell>{session.device}</Table.Cell>
                <Table.Cell>{session.ip}</Table.Cell>
                <Table.Cell>{session.location}</Table.Cell>
                <Table.Cell>{formatDateShort(session.lastActive)}</Table.Cell>
                <Table.Cell align="right">
                  <button
                    onClick={() => revokeSessionMutation.mutate(session.id)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Revoke
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
            {!paged.length && (
              <Table.Row>
                <Table.Cell colSpan={5} className="text-center text-gray-500">
                  Tidak ada sesi aktif.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>
      <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
        <span>Halaman {page} / {totalPages}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
};

const SettingsPage = ({ user }) => {
  const queryClient = useQueryClient();
  const {
    profileQuery,
    appQuery,
    securityQuery,
    sessionsQuery,
    profileMutation,
    appMutation,
    securityMutation,
    passwordMutation,
    revokeSessionMutation,
  } = useSettingsLogic();
  const { theme, setThemeValue } = usePreferences();

  const isGlobalLoading =
    profileQuery.isLoading || appQuery.isLoading || securityQuery.isLoading || sessionsQuery.isLoading;

  useEffect(() => {
    return () => queryClient.removeQueries({ queryKey: ['settings'] });
  }, [queryClient]);

  if (isGlobalLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Settings & Profile</h1>
            <p className="text-sm text-gray-600 mt-1">Kelola profil, preferensi, keamanan, dan analitik</p>
          </div>
          <div className="flex items-center gap-2 text-gray-600 font-medium">
            <User size={18} className="text-blue-600" />
            <span>{user?.name}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <ErrorBoundary>
        <div className="grid lg:grid-cols-3 gap-5 mb-6">
          <div className="lg:col-span-2 space-y-5">
            <ProfileSection profileQuery={profileQuery} profileMutation={profileMutation} />
            <SecuritySection
              securityQuery={securityQuery}
              securityMutation={securityMutation}
              passwordMutation={passwordMutation}
            />
          </div>
          <div className="space-y-5">
            <AppSettingsSection
              appQuery={appQuery}
              appMutation={appMutation}
              theme={theme}
              setThemeValue={setThemeValue}
            />
            <Card title="Status Cepat">
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-green-600" /> Password aman</div>
                <div className="flex items-center gap-2"><Activity size={16} className="text-blue-600" /> {sessionsQuery.data?.length || 0} sesi aktif</div>
                <div className="flex items-center gap-2"><Smartphone size={16} className="text-purple-600" /> 2FA {securityQuery.data?.twoFactorEnabled ? 'Aktif' : 'Nonaktif'}</div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-1 gap-5 mb-6">
          <div>
            <SessionsSection sessionsQuery={sessionsQuery} revokeSessionMutation={revokeSessionMutation} />
          </div>
        </div>
      </ErrorBoundary>
      </div>
    </div>
  );
};

export default SettingsPage;
