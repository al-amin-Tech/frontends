// src/features/auth/hooks/useCompleteEmailVerification.js
import { useMutation } from '@tanstack/react-query';
import { adminAuthApi } from '../api/adminAuthApi';

export const useCompleteEmailVerification = () => {
  return useMutation({
    mutationFn: adminAuthApi.completeEmailVerification,
  });
};