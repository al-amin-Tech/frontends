import { useQuery } from "@tanstack/react-query";

import airtimeKeys from "../api/airtimeKeys";
import { getPlans } from "../api/airtimeApi";

export default function useAirtimePlans({
  network,
  planType,
}) {
  return useQuery({
    queryKey: airtimeKeys.plans(
      network,
      planType
    ),

    enabled: !!network && !!planType,

    queryFn: async () => {
      const { data } = await getPlans({
        network,
        planType,
      });

      return data.data;
    },
  });
}





