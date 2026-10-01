// src/features/notifications/hooks/useNotificationSettings.js

import { useQuery } from "@tanstack/react-query";
import {
  NotificationSettingsApi,
} from "../api/notificationApi";

import notificationKeys
  from "../api/notificationKeys";

export function useNotificationSettings() {
  return useQuery({
    queryKey: notificationKeys.settings(),

    queryFn: async () => {
       const data = await NotificationSettingsApi.getNotificationSettings();

       return data;
    },
  });
}

export default useNotificationSettings;
