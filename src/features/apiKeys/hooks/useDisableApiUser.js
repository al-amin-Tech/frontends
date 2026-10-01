import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { apiKeysApi } from "../api/apiKeysApi.js";
import { apiKeysKeys } from "../api/apiKeys.keys.js";

export function useDisableApiUser(uuid) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiKeysApi.disable(uuid),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apiKeysKeys.credentials(uuid),
      });
    },
  });
}