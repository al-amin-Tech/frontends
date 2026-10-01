// src/features/admin/auth/hooks/useAdminVerifyTotp.js
// TODO: Adjust path
import { useMutation } from '@tanstack/react-query';
import { adminAuthApi } from '../api/adminAuthApi';

export const useAdminVerifyTotp = () => {
  return useMutation({
    mutationFn: adminAuthApi.verifyTotp,
  });
};