import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Expense from "../models/Expense.model";
import catchAsync from "../../../utils/catchAsync";
import createError from "../../../utils/createError";
import logger from "../../../utils/logger";

/**
 * @desc Create new expense
 * @route POST /api/v1/expenses
 * @access Private
 */
export const createExpense = catchAsync(async (req: any, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw createError(StatusCodes.UNAUTHORIZED, "Unauthorized");
  }

  const { amount, category, description, mood } = req.body;

  const expense = await Expense.create({
    userId,
    amount,
    category,
    description,
    mood,
  });

  logger.info(`Expense created for user ${userId}`);

  res.status(StatusCodes.CREATED).json({
    status: "success",
    expense,
  });
});


/**
 * @desc Get all expenses for logged-in user
 * @route GET /api/v1/expenses
 * @access Private
 */
export const getUserExpenses = catchAsync(async (req: any, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw createError(StatusCodes.UNAUTHORIZED, "Unauthorized");
  }

  const expenses = await Expense.find({ userId })
    .sort({ date: -1 })
    .lean();

  res.status(StatusCodes.OK).json({
    status: "success",
    expenses,
  });
});


/**
 * @desc Delete expense
 * @route DELETE /api/v1/expenses/:id
 * @access Private
 */
export const deleteExpense = catchAsync(async (req: any, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  const expense = await Expense.findOneAndDelete({ _id: id, userId });

  if (!expense) {
    throw createError(StatusCodes.NOT_FOUND, "Expense not found");
  }

  logger.info(`Expense deleted: ${id}`);

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Expense deleted successfully",
  });
});
