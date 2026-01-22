// src/hooks/useSettingsLogic.js

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  settingsQueryKeys,
  fetchProfile,
  updateProfile,
  fetchAppSettings,
  updateAppSettings,
  fetchSecuritySettings,
  updateSecuritySettings,
  changePassword,
  fetchSessions,
  revokeSession,
} from '../services/settingsService';

export const useSettingsLogic = () => {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({ queryKey: settingsQueryKeys.profile, queryFn: fetchProfile });
  const appQuery = useQuery({ queryKey: settingsQueryKeys.app, queryFn: fetchAppSettings });
  const securityQuery = useQuery({ queryKey: settingsQueryKeys.security, queryFn: fetchSecuritySettings });
  const sessionsQuery = useQuery({ queryKey: settingsQueryKeys.sessions, queryFn: fetchSessions });

  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: settingsQueryKeys.profile });
      const previous = queryClient.getQueryData(settingsQueryKeys.profile);
      queryClient.setQueryData(settingsQueryKeys.profile, { ...previous, ...payload });
      return { previous };
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) queryClient.setQueryData(settingsQueryKeys.profile, context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: settingsQueryKeys.profile }),
  });

  const appMutation = useMutation({
    mutationFn: updateAppSettings,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: settingsQueryKeys.app });
      const previous = queryClient.getQueryData(settingsQueryKeys.app);
      queryClient.setQueryData(settingsQueryKeys.app, { ...previous, ...payload });
      return { previous };
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) queryClient.setQueryData(settingsQueryKeys.app, context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: settingsQueryKeys.app }),
  });

  const securityMutation = useMutation({
    mutationFn: updateSecuritySettings,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: settingsQueryKeys.security });
      const previous = queryClient.getQueryData(settingsQueryKeys.security);
      queryClient.setQueryData(settingsQueryKeys.security, { ...previous, ...payload });
      return { previous };
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) queryClient.setQueryData(settingsQueryKeys.security, context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: settingsQueryKeys.security }),
  });

  const passwordMutation = useMutation({ mutationFn: changePassword });

  const revokeSessionMutation = useMutation({
    mutationFn: revokeSession,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: settingsQueryKeys.sessions });
      const previous = queryClient.getQueryData(settingsQueryKeys.sessions);
      if (previous) {
        queryClient.setQueryData(settingsQueryKeys.sessions, previous.filter((s) => s.id !== id));
      }
      return { previous };
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) queryClient.setQueryData(settingsQueryKeys.sessions, context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: settingsQueryKeys.sessions }),
  });

  return {
    profileQuery,
    appQuery,
    securityQuery,
    sessionsQuery,
    profileMutation,
    appMutation,
    securityMutation,
    passwordMutation,
    revokeSessionMutation,
  };
};
