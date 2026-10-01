// src/features/admin/dashboard/api/adminDashboardApi.js
import adminApi from "../../../../shared/api/adminAxios";

const BASE_PATH = "/usermanagement";

export const adminDashboardApi = {
  async getDashboardStats() {
    const response = await adminApi.get(`${BASE_PATH}/dashboard-stats`);
    return response?.data;
  },

  async getTodayProfit(params) {
    const response = await adminApi.get(`${BASE_PATH}/profit`, {
      params,
    });
    return response?.data;
  },

  async getProfitChart(params) {
    const response = await adminApi.get(`${BASE_PATH}/profit-chart`, {
      params,
    });
    return response?.data;
  },
};


//alert(JSON.stringify(detailModalState), null, 0);
