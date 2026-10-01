// src/features/auth/hooks/useLogout.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminAuthApi } from '../api/adminAuthApi';
import { authKeys } from '../api/authKeys';
import { storage } from '../../../shared/lib/storage';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminAuthApi.logout,

    onSuccess: () => {
      // Clear local auth state
      storage.clearAuth();

      // Remove cached auth/user data
      queryClient.removeQueries({
        queryKey: authKeys.all,
      });

      // Notify AuthContext
      window.dispatchEvent(new Event('auth:logout'));
    },

    onError: () => {
      // Even if backend logout fails, force local logout
      storage.clearAuth();

      queryClient.removeQueries({
        queryKey: authKeys.all,
      });

      window.dispatchEvent(new Event('auth:logout'));
    },
  });
};