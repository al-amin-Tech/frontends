import { useQuery } from "@tanstack/react-query";
import { apiKeysApi } from "../api/apiKeysApi.js";
import { apiKeysKeys } from "../api/apiKeys.keys.js";

export function useApiCredentials(uuid) {
  
  return useQuery({
    queryKey: apiKeysKeys.credentials(uuid),

    queryFn: () =>
      apiKeysApi.getCredentials(uuid),

    enabled: Boolean(uuid),

    staleTime: 30 * 1000,
  });
}