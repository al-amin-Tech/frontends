// src/features/users/api/userApi.js
import api from '../../../shared/api/axios';
import ENDPOINTS from '../../../shared/api/endpoints';

export const userApi = Object.freeze({
  async getProfile() {
    return (await api.get(ENDPOINTS.USER.PROFILE)).data;
  },

  async updateProfile(payload) {
    return (
      await api.patch(ENDPOINTS.USER.UPDATE_PROFILE, payload)
    ).data;
  },
  
  async changePassword(payload) {
    return (
      await api.post(ENDPOINTS.USER.UPDATE_PASSWORD, payload)
    ).data;
  },

  async setTransactionPin(payload) {
    return (
      await api.post(ENDPOINTS.USER.TRANSACTION_PIN, payload)
    ).data;
  },
  
  async requestResetTransactionPin(payload) {
    return (
      await api.post(ENDPOINTS.USER.REQUEST_RESET_TRANSACTION_PIN, payload)
    ).data;
  },
  
  async confirmResetTransactionPin(payload) {
    return (
      await api.post(ENDPOINTS.USER.CONFIRM_RESET_TRANSACTION_PIN, payload)
    ).data;
  },
});



