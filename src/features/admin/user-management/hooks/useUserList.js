// src/features/admin/user-management/hooks/useUserList.js
// TODO: Adjust path
import { useQuery } from '@tanstack/react-query';
import { adminUserApi } from '../api/adminUserApi';

export const useUserList = (params) => {

  return useQuery({
    queryKey: ['adminUsers', params],
    queryFn: () => adminUserApi.getUsers(params),
    keepPreviousData: true,
  });
};


