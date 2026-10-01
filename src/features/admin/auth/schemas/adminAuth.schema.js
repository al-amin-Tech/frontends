// src/features/auth/schemas/auth.schema.js

import { z } from "zod";

import {
  emailSchema,
  passwordSchema,
  loginPasswordSchema,
  fullNameSchema,
  phoneSchema,
  otpSchema,
} from "../../../../shared/schemas";

/**
 * POST /auth/register
 */
export const registerSchema = z.object({
  full_name: fullNameSchema,

  email: emailSchema,

  phone: phoneSchema,

  password: passwordSchema,

  referral: phoneSchema.optional(),
});

/**
 * POST /auth/login
 */
export const loginSchema = z.object({
  email: emailSchema,

  password: loginPasswordSchema,
});

/**
 * POST /auth/email/verify-otp
 *
 * verification_token is automatically extracted
 * from the HttpOnly cookie by the backend middleware.
 */
export const verifyEmailOtpSchema = z.object({
  otp_code: otpSchema,
});

/**
 * POST /auth/email/complete-verification
 *
 * No request body.
 * Backend middleware extracts the verification token
 * from the HttpOnly cookie.
 */
export const completeEmailVerificationSchema =
  z.object({});

/**
 * POST /auth/password/request-reset
 */
export const requestPasswordResetSchema =
  z.object({
    email: emailSchema,
  });

/**
 * POST /auth/password/verify-otp
 *
 * reset_token comes from the HttpOnly cookie.
 */
export const verifyPasswordResetOtpSchema =
  z.object({
    otp_code: otpSchema,
  });

/**
 * POST /auth/password/complete-reset
 *
 * reset_token comes from the HttpOnly cookie.
 */
export const completePasswordResetSchema = z
  .object({
    new_password: passwordSchema,
    confirm_password: passwordSchema,
  })
  .refine(
    (data) => data.new_password === data.confirm_password,
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    }
  );

