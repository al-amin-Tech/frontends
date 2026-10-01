import api from '../../../shared/api/axios';
import ENDPOINTS from '../../../shared/api/endpoints';
import REQUEST_CONFIG from "../../../shared/api/requestConfig";


export function getPlanTypes(network) {
  return api.get(ENDPOINTS.PRODUCTS.AIRTIME_PURCHASE, {
    params: {
      network,
    },
  });
}

export function getPlans({
  network,
  planType,
}) {
  return api.get(ENDPOINTS.PRODUCTS.AIRTIME_PURCHASE, {
    params: {
      network,
      airtime_type: planType,
    },
  });
}

export function validateNumber({
  network,
  phoneNumber,
  amount,
  planType,
}) {
  return api.get(ENDPOINTS.VALIDATION.AIRTIME_PURCHASE, {
    params: {
      network,
      phoneNumber,
      amount,
      airtime_type: planType,
    },
  });
}

export function purchase(data) {
  const { plan_type, ...rest } = data;

  return api.post(
    ENDPOINTS.PURCHASE.AIRTIME_PURCHASE,
    {
      ...rest,
      airtime_type: plan_type,
    },
    REQUEST_CONFIG.IDEMPOTENT
  );
}
