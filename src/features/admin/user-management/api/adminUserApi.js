
// src/features/admin/user-management/api/adminUserApi.js
import adminApi from "../../../../shared/api/adminAxios";

const BASE_URL = "/usermanagement";

export const adminUserApi = {
  // Global Transaction Search
  async globalSearch(reference) {
    const response = await adminApi.get(`${BASE_URL}/search`, {
      params: { reference },
    });
    
    return response?.data;
  },

  // Dashboard Stats
  async getOverviewStats() {
    const response = await adminApi.get(
      `${BASE_URL}/general-dashboard`
    );

    return response?.data;
  },

  async getGlobalStats() {
    const response = await adminApi.get(
      `${BASE_URL}/dashboard-stats`
    );

    return response?.data;
  },

  async getProfit(params) {
    const response = await adminApi.get(
      `${BASE_URL}/profit`,
      { params }
    );
     
    return response?.data;
  },

  // User Management
  async getUsers(params) {
    const response = await adminApi.get(
      `${BASE_URL}/list`,
      { params }
    );
     
    return response?.data;
  },

  async getUserDetails(uuid) {
    
    const response = await adminApi.get(
      `${BASE_URL}/user/${uuid}`
    );

    return response?.data;
  },

  // User History
  async getPurchases(uuid, params) {
    const response = await adminApi.get(
      `${BASE_URL}/user/${uuid}/purchases`,
      { params }
    );
    return response?.data;
  },

  async getDeposits(uuid, params) {
    const response = await adminApi.get(
      `${BASE_URL}/user/${uuid}/deposits`,
      { params }
    );

    return response?.data;
  },

  // Transaction Details
  async getPurchaseDetail(reference) {
    const response = await adminApi.get(
      `${BASE_URL}/purchase-detail/${reference}`
    );
    
    return response?.data;
  },

  async getDepositDetail(internalRef) {
    const response = await adminApi.get(
      `${BASE_URL}/deposit-detail/${internalRef}`
    );
    
    return response?.data;
  },

  // User Actions
  async blockUser(uuid, data) {
    const response = await adminApi.patch(
      `${BASE_URL}/user/${uuid}/block`,
      data
    );

    return response?.data;
  },

  async unblockUser(uuid, data) {
    const response = await adminApi.patch(
      `${BASE_URL}/user/${uuid}/unblock`,
      data
    );

    return response?.data;
  },

  async restoreUser(data) {
    const { uuid, reason } = data;
    
    const response = await adminApi.patch(
      `${BASE_URL}/user/restore-user`,
      reason,
      {
      params: { uuid },
      }
    );

    return response?.data;
  },
  
  
  async  getUserTransactions(userId, { limit = 20, offset = 0 } = {}){
   const response = await adminApi.get(`/usermanagement/user/${userId}/transactions`, 
   {
      params: { limit, offset },
   }
      );
      return response?.data;
    },


 async getTransactionDetail(uuid){
    const response = await adminApi.get(`/usermanagement/transaction-detail/${uuid}`)

   return response?.data;
  },
};

export default adminUserApi;


//alert(JSON.stringify(detailModalState), null, 0);
