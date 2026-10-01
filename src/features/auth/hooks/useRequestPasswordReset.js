// src/features/auth/hooks/useRequestPasswordReset.js
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (email) => authApi.requestPasswordReset(email),
  });
};