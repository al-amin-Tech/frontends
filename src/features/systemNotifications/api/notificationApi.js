import api from "../../../shared/api/axios";
import ENDPOINTS from '../../../shared/api/endpoints';


export const notificationApi = {
  getNotifications: async ({
    page = 1,
    limit = 20,
  } = {}) => {
    const response = await api.get(
      ENDPOINTS.NOTIFICATION.GET_NOTIFICATION,
      {
        params: {
          page,
          limit,
        },
      }
    );

   return response.data;
  },

  markAsRead: async (notificationId) => {
    const response = await api.patch(
      `/notifications/${notificationId}/read`
    );

    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.patch(
    ENDPOINTS.NOTIFICATION.MARK_READ_NOTIFICATION
    );

    return response.data;
  },
};

export default notificationApi;