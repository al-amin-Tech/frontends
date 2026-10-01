// src/shared/schemas/common.schema.js

import { z } from "zod";

import {
  FULL_NAME_REGEX,
  OTP_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
  UUID_REGEX,
} from "./regex";

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Enter a valid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100)
  .regex(
    PASSWORD_REGEX,
    "Password must contain uppercase, lowercase and a number"
  );

export const loginPasswordSchema =
  z.string().min(1, "Password is required");

export const fullNameSchema = z
  .string()
  .trim()
  .min(3)
  .max(100)
  .regex(
    FULL_NAME_REGEX,
    "Enter at least two valid names."
  );

export const phoneSchema = z
  .string()
  .regex(
    PHONE_REGEX,
    "Enter a valid phone number."
  );

export const otpSchema = z
  .string()
  .regex(
    OTP_REGEX,
    "OTP must contain exactly six digits."
  );


export const uuidSchema = z
  .string()
  .regex(
    UUID_REGEX,
    "Invalid UUID."
  );