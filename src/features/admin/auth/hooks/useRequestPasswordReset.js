// src/features/auth/hooks/useRequestPasswordReset.js
import { useMutation } from '@tanstack/react-query';
import { adminAuthApi } from '../api/adminAuthApi';

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (email) => adminAuthApi.requestPasswordReset(email),
  });
};