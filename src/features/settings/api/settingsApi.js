// src/features/settings/api/settingsApi.js
import api from '../../../shared/api/axios';
import ENDPOINTS from '../../../shared/api/endpoints';

export async function getAppSettings() {
  const response = await api.get(
      ENDPOINTS.SETTINGS.CONTACT
  );

  return response.data.data;
}

export default {
  getAppSettings,
};