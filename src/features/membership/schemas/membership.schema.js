// src/features/membership/schemas/membership.schema.js

import { z } from "zod";

export const upgradeAccountSchema = z.object({
  targetRole: z.enum(
    [
      "vendor",
      "api_user",
      "agent",
    ],
    {
      required_error:
        "Please select an account type.",
    }
  ),

  transactionPin: z
    .string()
    .regex(
      /^\d{4}$/,
      "Transaction PIN must be exactly 4 digits."
    ),
});