// src/features/auth/hooks/useCompletePasswordReset.js
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';

export const useCompletePasswordReset = () => {
  return useMutation({
    mutationFn: (new_password) =>
      authApi.completePasswordReset(new_password),
  });
};