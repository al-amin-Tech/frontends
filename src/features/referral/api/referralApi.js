// src/features/referral/api/referralApi.js

import api from "../../../shared/api/axios";
import ENDPOINTS from "../../../shared/api/endpoints";
import REQUEST_CONFIG from "../../../shared/api/requestConfig";

export const referralApi = Object.freeze({
  /**
   * ---------------------------------------
   * Referral Dashboard
   * GET /referral/dashboard
   * ---------------------------------------
   */
 async getDashboard() {
    const { data } = await api.get(ENDPOINTS.REFERRAL.REFERRAL_DASHBOARD);
    
    return data;
  },

  /**
   * ---------------------------------------
   * Withdraw Referral Commission
   * POST /referral/withdraw
   * ---------------------------------------
   *
   * Financial operation.
   * Uses idempotency protection.
   */
 async withdraw() {
    const { data } = await api.post(ENDPOINTS.REFERRAL.WITHDRAW_REFERRAL,
      {},
      REQUEST_CONFIG.IDEMPOTENT
    );
    return data;
  },
});
export default referralApi;