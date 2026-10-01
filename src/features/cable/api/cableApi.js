import api from '../../../shared/api/axios';
import ENDPOINTS from '../../../shared/api/endpoints';
import REQUEST_CONFIG from "../../../shared/api/requestConfig";

export async function getCablePlans(provider) {
  const { data } = await api.get(
    ENDPOINTS.PRODUCTS.CABLE_PURCHASE,
    {
      params: {
        provider,
      },
    }
  );

  return data;
}

export async function validateIuc({
    cablename,
    cableplan,
    smart_card_number,
}) {
  const { data } = await api.get(
    ENDPOINTS.VALIDATION.CABLE_PURCHASE,
    {
      params: {
        cablename,
        cableplan,
        smart_card_number,
      },
    }
  );

  return data?.data ?? data;
}

export async function purchaseCable(
  payload
) {
  const { data } = await api.post(
    ENDPOINTS.PURCHASE.CABLE_PURCHASE,
    payload,
    REQUEST_CONFIG.IDEMPOTENT,
  );

  return data;
}