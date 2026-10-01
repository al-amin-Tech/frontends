// src/features/admin/user-management/hooks/useGlobalSearch.js
// TODO: Adjust path
import { useMutation } from '@tanstack/react-query';
import { adminUserApi } from '../api/adminUserApi';

export const useGlobalSearch = () => {
  return useMutation({
    mutationFn: (reference) => adminUserApi.globalSearch(reference),
  });
};
