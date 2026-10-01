import { useQuery } from "@tanstack/react-query";

import { educationKeys } from "../api/educationKeys";
import { getEdupinPlans } from "../api/educationApi";

export default function useEdupinPlans(
  provider
) {
  return useQuery({
    queryKey:
      educationKeys.plans(provider),

    enabled: !!provider,

    queryFn: () =>
      getEdupinPlans(provider),
  });
}