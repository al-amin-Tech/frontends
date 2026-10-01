// src/features/auth/hooks/useCompletePasswordReset.js
import { useMutation } from '@tanstack/react-query';
import { adminAuthApi } from '../api/adminAuthApi';

export const useCompletePasswordReset = () => {
  return useMutation({
    mutationFn: (new_password) =>
      adminAuthApi.completePasswordReset(new_password),
  });
};