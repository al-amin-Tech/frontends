import api from "../../../shared/api/axios";
import ENDPOINTS from "../../../shared/api/endpoints";
import REQUEST_CONFIG from "../../../shared/api/requestConfig";

export const membershipApi = Object.freeze({
  async getVendorPrice() {
    const { data } = await api.get(ENDPOINTS.USER.GET_VENDOR_PRICE);
    return data;
  },

  async getApiUserPrice() {
    const { data } = await api.get(ENDPOINTS.USER.GET_API_PRICE);
    return data;
  },

  async getAgentPrice() {
    const { data } = await api.get(ENDPOINTS.USER.GET_AGENT_PRICE);
    return data;
  },

  async upgradeVendor(payload) {
    const { data } = await api.post(
      ENDPOINTS.USER.UPGRADE_VENDOR,
      payload,
      REQUEST_CONFIG.IDEMPOTENT
    );
    return data;
  },

  async upgradeApiUser(payload) {
    const { data } = await api.post(
      ENDPOINTS.USER.UPGRADE_API,
      payload,
      REQUEST_CONFIG.IDEMPOTENT
    );
    return data;
  },

  async upgradeAgent(payload) {
    const { data } = await api.post(
      ENDPOINTS.USER.UPGRADE_AGENT,
      payload,
      REQUEST_CONFIG.IDEMPOTENT
    );
    return data;
  },

});
