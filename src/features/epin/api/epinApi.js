import api from '../../../shared/api/axios';
import ENDPOINTS from '../../../shared/api/endpoints';
import REQUEST_CONFIG from "../../../shared/api/requestConfig";

export async function getEpinPlans(network) {
  const response = await api.get(ENDPOINTS.PRODUCTS.RECHAGE_PIN_PURCHASE, {
    params: {
      network,
    },
  });

  return response.data?.data ?? [];
}

export async function purchaseEpin(payload) {
  const response = await api.post(
    ENDPOINTS.PURCHASE.RECHAGE_PIN_PURCHASE,
    payload,
    REQUEST_CONFIG.IDEMPOTENT
  );

  return response.data;
}