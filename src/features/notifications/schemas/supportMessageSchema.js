import { z } from "zod";

export const supportMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(1000, "Message cannot exceed 1000 characters."),
});