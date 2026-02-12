/**
 * @file login.validator.ts
 * @description this helps to validate the data when logging in
 */

import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type SignupInput = z.infer<typeof signupSchema>;