// src/features/data/hooks/usePlans.js

import { useQuery } from "@tanstack/react-query";

import dataApi from "../api/dataApi";
import dataKeys from "../api/dataKeys";

export default function usePlans({
  network,
  planType,
}) {
  return useQuery({
    queryKey: dataKeys.plans(
      network,
      planType
    ),

    queryFn: () =>
      dataApi.getPlans({
        network,
        planType,
      }),

    enabled:
      !!network &&
      !!planType,

    staleTime:
      1000 * 60 * 30,
  });
}