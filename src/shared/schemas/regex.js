// src/shared/schemas/regex.js

/**
 * Shared Regular Expressions
 * Used throughout the application.
 */

/**
 * Full name
 * Example:
 * John James
 * Mary Jane Smith
 * John O'Connor
 * Mary-Anne Smith
 */
export const FULL_NAME_REGEX =
  /^[A-Za-z]+([-'][A-Za-z]+)?(\s+[A-Za-z]+([-'][A-Za-z]+)?)+$/;

/**
 * International phone number (E.164)
 * Examples:
 * +2348012345678
 * +14155552671
 */
export const PHONE_REGEX =
  /^\+?[1-9]\d{1,14}$/;

/**
 * Six digit OTP
 */
export const OTP_REGEX =
  /^[0-9]{6}$/;

/**
 * SHA256 Hex Token
 * Used for password/email verification tokens.
 */
export const TOKEN_REGEX =
  /^[a-fA-F0-9]{64}$/;

/**
 * UUID v4
 */
export const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Password
 *
 * Minimum:
 * - 8 characters
 * - lowercase
 * - uppercase
 * - number
 *
 * Special characters are optional.
 */
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,100}$/;