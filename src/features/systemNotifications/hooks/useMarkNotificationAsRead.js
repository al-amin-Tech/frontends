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

export function useMarkNotificationAsRead() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (notificationId) =>
      notificationApi.markAsRead(
        notificationId
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          notificationKeys.all,
      });
    },
  });
}

export default useMarkNotificationAsRead;