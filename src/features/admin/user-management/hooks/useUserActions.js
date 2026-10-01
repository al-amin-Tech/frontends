// src/features/admin/user-management/hooks/useUserActions.js
// TODO: Adjust path
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminUserApi } from '../api/adminUserApi';

export const useBlockUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uuid, data }) => adminUserApi.blockUser(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminUsers']);
      queryClient.invalidateQueries(['adminUserDetails']);
    },
  });
};

export const useUnBlockUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uuid, data }) => adminUserApi.unblockUser(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminUsers']);
      queryClient.invalidateQueries(['adminUserDetails']);
    },
  });
};

export const useRestoreUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => adminUserApi.restoreUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminUsers']);
    },
  });
};