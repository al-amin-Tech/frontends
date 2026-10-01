// src/features/auth/hooks/useCompleteEmailVerification.js
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';

export const useCompleteEmailVerification = () => {
  return useMutation({
    mutationFn: authApi.completeEmailVerification,
  });
};