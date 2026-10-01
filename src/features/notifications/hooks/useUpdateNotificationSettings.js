// src/features/notifications/hooks/useUpdateNotificationSettings.js

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  NotificationSettingsApi,
} from "../api/notificationApi";

import notificationKeys
  from "../api/notificationKeys";

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: notificationKeys.updateSettings(),

    mutationFn:
      NotificationSettingsApi.updateNotificationSettings,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.settings(),
      });

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}

export default useUpdateNotificationSettings;
