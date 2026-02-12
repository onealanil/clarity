/**
 * @file create-expense.validator.ts
 * @description This helps to validate the data when creating an expense
 */

import { z } from "zod";

export const createExpenseSchema = z.object({
  amount: z
    .number({ error: "Amount must be a number" })
    .positive({ message: "Amount must be greater than 0" }),
  category: z
    .string({ error: "Category is required" })
    .min(1, { message: "Category cannot be empty" }),
  mood: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, { message: "Mood cannot be empty" }),
  note: z.string().optional(),
});

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
