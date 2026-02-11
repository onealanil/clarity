import { z } from "zod";

export const updateUserSchema = z.object({
  monthly_income: z
    .number()
    .min(0, "Monthly income cannot be negative")
    .optional(),

  goal: z
    .enum(["Awareness", "Control", "Peace"] as const, {
      message: "Invalid goal selected",
    })
    .optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
