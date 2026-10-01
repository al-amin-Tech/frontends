import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import electricityKeys from "../api/electricityKeys";
import { purchase } from "../api/electricityApi";

export default function usePurchaseElectricity(
  options = {}
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await purchase(payload);

      return data;
    },

    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: electricityKeys.all,
      });

      options.onSuccess?.(
        data,
        variables,
        context
      );
    },

    onError(error, variables, context) {
      return options.onError?.(
        error,
        variables,
        context
      );
    },
  });
}
















/*


import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import electricityKeys from "../api/electricityKeys";
import { purchase } from "../api/electricityApi";

export default function usePurchaseElectricity(
  options = {}
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } =
        await purchase(payload);

      return data;
    },

    onSuccess(
      data,
      variables,
      context
    ) {
      queryClient.invalidateQueries({
        queryKey:
          electricityKeys.all,
      });

      options.onSuccess?.(
        data,
        variables,
        context
      );
    },

    onError(
      error,
      variables,
      context
    ) {
      options.onError?.(
        error,
        variables,
        context
      );
    },
  });
}

*/