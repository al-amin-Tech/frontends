// src/features/users/schemas/security.schema.js

import { z } from "zod";

import { passwordSchema } from "../../../shared/schemas/common.schema";

/*
|--------------------------------------------------------------------------
| Change Password
|--------------------------------------------------------------------------
*/

export const changePasswordSchema = z
  .object({
    old_password: z
      .string()
      .min(1, "Current password is required."),

    new_password: passwordSchema,

    confirm_password: z
      .string()
      .min(1, "Please confirm your password."),
  })
  .refine(
    (data) =>
      data.new_password === data.confirm_password,
    {
      path: ["confirm_password"],
      message: "Passwords do not match.",
    }
  );

/*
|--------------------------------------------------------------------------
| Set Transaction PIN
|--------------------------------------------------------------------------
*/

export const setTransactionPinSchema = z
  .object({
    password: z
      .string()
      .min(1, "Account password is required."),

    pin: z
      .string()
      .regex(
        /^\d{4}$/,
        "PIN must be exactly 4 digits."
      ),

    confirm_pin: z
      .string()
      .regex(
        /^\d{4}$/,
        "PIN must be exactly 4 digits."
      ),
  })
  .refine(
    (data) => data.pin === data.confirm_pin,
    {
      path: ["confirm_pin"],
      message: "PINs do not match.",
    }
  );


/*
|--------------------------------------------------------------------------
| Transaction PIN
|--------------------------------------------------------------------------
*/

export const transactionPinSchema = z
  .object({
    current_pin: z
      .string()
      .regex(
        /^\d{4}$/,
        "PIN must be exactly 4 digits."
      ),

    new_pin: z
      .string()
      .regex(
        /^\d{4}$/,
        "PIN must be exactly 4 digits."
      ),

    confirm_pin: z
      .string()
      .regex(
        /^\d{4}$/,
        "PIN must be exactly 4 digits."
      ),
  })
  .refine(
    (data) => data.new_pin === data.confirm_pin,
    {
      path: ["confirm_pin"],
      message: "PINs do not match.",
    }
  );
  
  
  /*
|--------------------------------------------------------------------------
| Confirm Reset Transaction PIN
|--------------------------------------------------------------------------
*/

export const confirmResetTransactionPinSchema = z
  .object({
    otp_code: z
      .string()
      .regex(
        /^\d{6}$/,
        "OTP must be exactly 6 digits."
      ),

    new_pin: z
      .string()
      .regex(
        /^\d{4}$/,
        "PIN must be exactly 4 digits."
      ),

    confirm_pin: z
      .string()
      .regex(
        /^\d{4}$/,
        "PIN must be exactly 4 digits."
      ),
  })
  .refine(
    (data) =>
      data.new_pin === data.confirm_pin,
    {
      path: ["confirm_pin"],
      message: "PINs do not match.",
    }
  );