import { z } from "zod";

export const apiAuthModeSchema = z.object({
  authMode: z.enum([
    "key",
    "key_secret",
    "signature",
  ]),
});

export const API_AUTH_MODES = [
  {
    value: "key",
    title: "API Key",
    description:
      "Authenticate your API requests using an API key.",
  },
  {
    value: "key_secret",
    title: "API Key + Secret",
    description:
      "Use an API key together with your API secret.",
  },
  {
    value: "signature",
    title: "Signature",
    description:
      "Authenticate requests using signed API requests.",
  },
];