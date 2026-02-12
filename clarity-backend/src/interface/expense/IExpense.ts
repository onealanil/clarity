/**
 * @file IExpense.ts
 * @description This file contains the interface for the Expense model.
 */

import { Types } from "mongoose";

export type ExpenseMood = "Worth It" | "Neutral" | "Regret";

export interface IExpense {
    userId: Types.ObjectId;
    amount: number;
    category: string;
    description?: string;
    mood: ExpenseMood;
    date?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
