// src/features/admin/dashboard/hooks/useProfitChart.js
// TODO: Adjust path
import { useQuery } from '@tanstack/react-query';
import { adminDashboardApi } from '../api/adminDashboardApi';

export const useProfitChart = ({ startDate, endDate, groupBy }) => {
  return useQuery({
    queryKey: ['adminProfitChart', startDate, endDate, groupBy],
    queryFn: () => adminDashboardApi.getProfitChart({ startDate, endDate, groupBy }),
    enabled: !!startDate && !!endDate,
  });
};