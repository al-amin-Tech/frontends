// src/features/admin/dashboard/hooks/useTodayProfit.js
// TODO: Adjust path
import { useQuery } from '@tanstack/react-query';
import { adminDashboardApi } from '../api/adminDashboardApi';

export const useTodayProfit = () => {
  return useQuery({
    queryKey: ['adminTodayProfit'],
    queryFn: () => adminDashboardApi.getTodayProfit({}), // Defaults to today on backend
    staleTime: 1000 * 60 * 2, // 2 minutes (profit updates more frequently)
  });
};