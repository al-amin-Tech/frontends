// src/features/data/api/dataApi.js

import api from '../../../shared/api/axios';
import ENDPOINTS from '../../../shared/api/endpoints';
import REQUEST_CONFIG from "../../../shared/api/requestConfig";

const dataApi = {
  /**
   * Fetch available plan types
   */
  async getPlanTypes(network) {
    const { data } = await api.get(ENDPOINTS.PRODUCTS.DATA_PURCHASE,
      {
        params: {
          network,
        },
      }
    );

    return data?.data;
  },

  /**
   * Fetch plans
   */
  async getPlans({
    network,
    planType,
  }) {
    const { data } = await api.get(
    ENDPOINTS.PRODUCTS.DATA_PURCHASE,
      {
        params: {
          network,
          plan_type: planType,
        },
      }
    );

    return data?.data;
  },

  /**
   * Validate number
   */
  async validateNumber({
    network,
    phoneNumber,
  }) {
    const { data } = await api.get(
      ENDPOINTS.VALIDATION.DATA_PURCHASE,
      {
        params: {
          network,
          phoneNumber,
        },
      }
    );

    return data?.data ?? data;
  },

  /**
   * Purchase
   */
  async purchase(payload) {
    const { data } = await api.post(
        ENDPOINTS.PURCHASE.DATA_PURCHASE,
      payload,
      REQUEST_CONFIG.IDEMPOTENT
    );

    return data?.data;
  },
};

export default dataApi;