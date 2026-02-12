/**
 * @file user.route.ts
 * @description This file contains the routes for user.
 * It defines the endpoints for login and logout function.
 */

import express from "express";
import { LoginUser, logoutUser, refreshToken, signupUser, updateUserIncomeGoal } from "../controllers/user.controller";
import { validate } from "../../../middlewares/validate";
import { loginSchema } from "../validators/login.validator";
import { loginLimiter } from "../services/login.limiter";
import { protect } from "../../../middlewares/protect.middleware";
import { signupSchema } from "../validators/signup.validator";
import { updateUserSchema } from "../validators/income-goal.validator";
const router = express.Router();

/**
 * @description User login route with validation with express-validator
 * @route POST /api/v1/user/login
 * @access Public
 */
router.route("/login").post(loginLimiter, validate(loginSchema), LoginUser);

/**
 * @description create user
 * @route POST /api/v1/user/signup
 * @access Public
 */
router.route("/signup").post(validate(signupSchema), signupUser);



/**
 * @description Logout user route
 * @route GET /api/v1/user/logout
 * @access Private
 */
router.route("/logout").get(protect, logoutUser);

/**
 * @description update user route
 * @route PATCH /api/v1/user/update
 * @access Private
 */
router.patch(
    "/update-income-goal",
    protect,
    validate(updateUserSchema),
    updateUserIncomeGoal
);

/**
 * @description refresh token route
 * @route GET /api/v1/user/refresh-token
 * @access Private
 */
router.get("/refresh-token", refreshToken);


export default router;