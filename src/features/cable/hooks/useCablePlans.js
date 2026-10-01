import { useQuery } from "@tanstack/react-query";

import cableKeys from "../api/cableKeys";
import { getCablePlans } from "../api/cableApi";

export default function useCablePlans(
  provider
) {
  return useQuery({
    queryKey:
      cableKeys.plans(provider),

    enabled: !!provider,

    queryFn: () =>
      getCablePlans(provider).then(
        (response) => response.data
      ),
  });
}