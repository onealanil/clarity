/**
 * @file Expense.model.ts
 * @description This file contains the schema for the Expense model.
 * It defines the structure of the Expense document in the MongoDB database.
 */

import mongoose, { Schema, Model, Document } from "mongoose";
import { IExpense } from "interface/expense/IExpense";

interface IExpenseDoc extends Document, IExpense {}

const ExpenseSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    mood: {
      type: String,
      enum: ["Worth It", "Neutral", "Regret"],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

interface IExpenseModel extends Model<IExpenseDoc> {}

const Expense: IExpenseModel = mongoose.model<IExpenseDoc, IExpenseModel>(
  "Expense",
  ExpenseSchema
);

export default Expense;
