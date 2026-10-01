import { useQuery } from "@tanstack/react-query";

import {
  notificationApi,
} from "../api/notificationApi";

import {
  notificationKeys,
} from "../api/notificationKeys";

export function useNotifications({
  page = 1,
  limit = 20,
} = {}) {
  return useQuery({
    queryKey:
      notificationKeys.list(
        page,
        limit
      ),

    queryFn: () =>
      notificationApi.getNotifications({
        page,
        limit,
      }),

    staleTime: 30 * 1000,

    retry: false,
  });
}

export default useNotifications;