// src/features/auth/hooks/useRefreshToken.js
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { storage } from '../../../shared/lib/storage';

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: authApi.refreshToken,

    onSuccess: (response) => {
      const accessToken = response?.data?.access_token;

      if (accessToken) {
        storage.setAccessToken(accessToken);

        // Notify listeners (AuthContext / interceptors if needed)
        window.dispatchEvent(
          new CustomEvent('auth:token-refreshed', {
            detail: { accessToken },
          })
        );
      }
    },

    onError: () => {
      storage.clearAuth();

      // Session expired — force logout everywhere
      window.dispatchEvent(new Event('auth:logout'));
    },
  });
};