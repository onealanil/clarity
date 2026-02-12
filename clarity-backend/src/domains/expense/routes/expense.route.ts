/**
 * @file expense.route.ts
 * @description This file contains the routes for expense.
 * It defines endpoints for creating, fetching and deleting expenses.
 */

import express from "express";
import {
    createExpense,
    getUserExpenses,
    deleteExpense,
} from "../controllers/expense.controller";

import { protect } from "../../../middlewares/protect.middleware";
import { validate } from "../../../middlewares/validate";
import { createExpenseSchema } from "../validators/create-expense.validator";

const router = express.Router();

/**
 * @description Create a new expense
 * @route POST /api/v1/expense
 * @access Private
 */
router
    .route("/")
    .post(protect, validate(createExpenseSchema), createExpense)
    .get(protect, getUserExpenses);

/**
 * @description Delete an expense
 * @route DELETE /api/v1/expense/:id
 * @access Private
 */
router
    .route("/:id")
    .delete(protect, deleteExpense)

export default router;
