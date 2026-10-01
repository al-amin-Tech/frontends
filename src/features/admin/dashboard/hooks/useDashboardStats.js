// src/features/admin/dashboard/hooks/useDashboardStats.js
// TODO: Adjust path
import { useQuery } from '@tanstack/react-query';
import { adminDashboardApi } from '../api/adminDashboardApi';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['adminDashboardStats'],
    queryFn: adminDashboardApi.getDashboardStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};