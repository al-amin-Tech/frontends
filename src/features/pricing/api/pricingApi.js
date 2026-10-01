// src/features/pricing/api/pricingApi.js
import api from '../../../shared/api/axios';
import ENDPOINTS from '../../../shared/api/endpoints';

const pricingApi = {
  async getFullCatalog() {
    const { data } = await api.get(
      "/products/api-catalog"
    );

    return data.data;
  },
};

export default pricingApi;