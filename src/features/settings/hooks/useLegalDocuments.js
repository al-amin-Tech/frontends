// src/features/settings/hooks/useLegalDocuments.js

import { useQuery } from "@tanstack/react-query";

import { getAppSettings } from "../api/settingsApi";
import { settingsKeys } from "../api/settingsKeys";

export function useLegalDocuments() {
  return useQuery({
    queryKey: settingsKeys.legal(),

    queryFn: async () => {
      const settings =
        await getAppSettings();

      return (
        settings?.legal ?? {}
      );
    },

    staleTime: 1000 * 60 * 10,
  });
}

export default useLegalDocuments;