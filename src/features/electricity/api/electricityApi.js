import api from '../../../shared/api/axios';
import ENDPOINTS from '../../../shared/api/endpoints';
import REQUEST_CONFIG from "../../../shared/api/requestConfig";


export function getPlans() {
  return api.get(ENDPOINTS.PRODUCTS.ELECTRICITY_PURCHASE);
}

export function validateMeter({
     meterNumber,
     discoName,
     type,
     amount,

}) {
  return api.get(
    ENDPOINTS.VALIDATION.ELECTRICITY_PURCHASE,
    {
      params: {
        meterNumber,
        discoName,
        type,
       amount,

      },
    }
  );
}

export function purchase(data) {
  return api.post(
   ENDPOINTS.PURCHASE.ELECTRICITY_PURCHASE,
    data,
    REQUEST_CONFIG.IDEMPOTENT,
  );
}