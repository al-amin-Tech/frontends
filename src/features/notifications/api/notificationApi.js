// src/features/notifications/api/notificationApi.js

import api from "../../../shared/api/axios";
import ENDPOINTS from "../../../shared/api/endpoints";

export const NotificationSettingsApi = Object.freeze({
  /**
   * Get notification preference.
   *
   * Uses the existing profile endpoint because
   * notifications_enabled belongs to the user profile.
   */
  async getNotificationSettings() {
    const { data } = await api.get(ENDPOINTS.USER.PROFILE);
    // alert(data?.data?.user?.notifications_enabled);
    return data?.data?.user;
    
  },

  /**
   * Update notification preference.
   *
   * PATCH /users/profile
   */
  async updateNotificationSettings(notificationsEnabled) {
    const { data } = await api.patch(
      ENDPOINTS.USER.UPDATE_PROFILE,
      {
        notifications_enabled: notificationsEnabled,
      }
    );

    return data;
  },

  /**
   * Future backend endpoint.
   *
   * Placeholder so the UI can already be built.
   */
  async sendSupportMessage() {
    throw new Error(
      "Support messaging is not available yet."
    );
  },
});
