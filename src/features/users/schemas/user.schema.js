// src/features/users/schemas/user.schema.js
import { z } from "zod";

import {
  FULL_NAME_REGEX,
  PHONE_REGEX,
} from "../../../shared/schemas/regex";

export const userProfileSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters.")
    .max(100, "Full name is too long.")
    .regex(
      FULL_NAME_REGEX,
      "Enter at least two valid names."
    ),

  email: z
    .string()
    .email(),

  phone: z
    .string()
    .regex(
      PHONE_REGEX,
      "Enter a valid phone number."
    ),

  role: z.string(),

  kyc_status: z.string(),

  fcm_token: z.string().nullable().optional(),
 notifications_enabled: z.boolean(),

});

export default userProfileSchema;



