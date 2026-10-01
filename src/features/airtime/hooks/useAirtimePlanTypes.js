import { useQuery } from "@tanstack/react-query";

import airtimeKeys from "../api/airtimeKeys";
import { getPlanTypes } from "../api/airtimeApi";

export default function useAirtimePlanTypes(network) {
  return useQuery({
    queryKey: airtimeKeys.planTypes(network),

    enabled: !!network,

    queryFn: async () => {
      const { data } = await getPlanTypes(network);

      return data.data;
    },
  });
}

