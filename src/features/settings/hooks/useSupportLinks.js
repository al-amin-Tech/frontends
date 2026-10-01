// src/features/settings/hooks/useSupportLinks.js

import { useQuery } from "@tanstack/react-query";

import { getAppSettings } from "../api/settingsApi";
import { settingsKeys } from "../api/settingsKeys";

export function useSupportLinks() {
  return useQuery({
    queryKey: settingsKeys.support(),

    queryFn: async () => {
      const settings =
        await getAppSettings();

      return {
        support:
          settings?.support ?? {},

        developer:
          settings?.developer ?? {},
      };
    },

    staleTime: 1000 * 60 * 10,
  });
}

export default useSupportLinks;