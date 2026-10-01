import api from "../../../shared/api/axios";

const BASE_URL = "/purchase";

export const purchaseApi = {
  async getHistory({
    category,
    page = 1,
    limit = 20,
  }) {
    const response = await api.get(
      `${BASE_URL}/${category}`,
      {
        params: {
          page,
          limit,
        },
      }
    );

    return response.data.data;
  },

  async getDetails(reference) {
    const response = await api.get(
      `${BASE_URL}/cheack/${reference}`
    );

    return response.data.data;
  },
};

export default purchaseApi;