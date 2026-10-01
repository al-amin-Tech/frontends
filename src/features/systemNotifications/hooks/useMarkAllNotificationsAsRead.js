import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  notificationApi,
} from "../api/notificationApi";

import {
  notificationKeys,
} from "../api/notificationKeys";

export function useMarkAllNotificationsAsRead() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: () =>
      notificationApi.markAllAsRead(),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          notificationKeys.all,
      });
    },
  });
}

export default useMarkAllNotificationsAsRead;