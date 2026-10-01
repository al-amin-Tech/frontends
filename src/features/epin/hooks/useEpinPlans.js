import { useQuery } from "@tanstack/react-query";
import { getEpinPlans } from "../api/epinApi";

export default function useEpinPlans(network) {
  return useQuery({
    queryKey: ["epin-plans", network],
    queryFn: () => getEpinPlans(network),
    enabled: Boolean(network),
  });
}