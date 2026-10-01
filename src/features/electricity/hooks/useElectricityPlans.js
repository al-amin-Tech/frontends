import { useQuery } from "@tanstack/react-query";

import electricityKeys from "../api/electricityKeys";
import { getPlans } from "../api/electricityApi";

export default function useElectricityPlans() {
  return useQuery({
    queryKey: electricityKeys.plans(),

    queryFn: async () => {
      const { data } =
        await getPlans();

      return data.data;
    },
  });
}