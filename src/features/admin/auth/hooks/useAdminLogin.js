// src/features/admin/auth/hooks/useAdminLogin.js
// TODO: Adjust path
import { useMutation } from '@tanstack/react-query';
import { adminAuthApi } from '../api/adminAuthApi';

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: adminAuthApi.login,
    // Errors are automatically normalized by your axios interceptor
  });
};