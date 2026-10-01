import api from "../../../shared/api/axios.js";

const BASE_URL = "/api-keys";

const unwrapResponse = (response) => {
  return response?.data?.data ?? response?.data ?? response;
};

export const apiKeysApi = {
  async getCredentials(uuid) {
    const response = await api.get(
      `${BASE_URL}/credentials/${uuid}`
    );

    return unwrapResponse(response);
  },

  async generateCredentials(authMode) {
    const response = await api.post(
      `${BASE_URL}/credentials/generate/${authMode}`
    );

    return unwrapResponse(response);
  },

  async disable(uuid) {
    const response = await api.patch(
      `${BASE_URL}/credentials/${uuid}/disable`
    );

    return unwrapResponse(response);
  },

  async enable(uuid) {
    const response = await api.patch(
      `${BASE_URL}/credentials/${uuid}/enable`
    );

    return unwrapResponse(response);
  },
};