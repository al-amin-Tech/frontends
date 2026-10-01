// src/features/wallet/api/walletApi.js

import api from "../../../shared/api/axios";
import ENDPOINTS from '../../../shared/api/endpoints';

export const walletApi = {
  async getHistory({
    page = 1,
    limit = 20,
  } = {}) {
    const response = await api.get(ENDPOINTS.WALLET.WALLET_TRANSACTIONS,
      {
        params: {
          page,
          limit,
        },
      }
    );

    return response.data.data;
  },
};

export default walletApi;