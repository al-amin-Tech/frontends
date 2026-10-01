import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { apiKeysApi } from "../api/apiKeysApi.js";
import { apiKeysKeys } from "../api/apiKeys.keys.js";

export function useGenerateApiCredentials(uuid) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (authMode) =>
      apiKeysApi.generateCredentials(authMode),

    onSuccess: () => {
      if (!uuid) return;

      queryClient.invalidateQueries({
        queryKey: apiKeysKeys.credentials(uuid),
      });
    },
  });
}