import api from '../../../shared/api/axios';
import ENDPOINTS from '../../../shared/api/endpoints';
import REQUEST_CONFIG from "../../../shared/api/requestConfig";

export async function getEdupinPlans(provider) {
  const { data } = await api.get(ENDPOINTS.PRODUCTS.EDUCATION_PURCHASE, {
    params: {
      provider,
    },
  });

  return data.data;
}

export async function purchaseEdupin(payload) {
  const { data } = await api.post(
    ENDPOINTS.PURCHASE.EDUCATION_PURCHASE,
    payload,
    REQUEST_CONFIG.IDEMPOTENT,
  );

  return data;
}