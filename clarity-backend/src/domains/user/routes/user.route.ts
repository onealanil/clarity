/**
 * @file user.route.ts
 * @description This file contains the routes for user.
 * It defines the endpoints for login and logout function.
 */

import express from "express";
import { LoginUser, logoutUser } from "../controllers/user.controller";
import {validate} from "../../../middlewares/validate";
import { loginSchema } from "../validators/login.validator";
import { loginLimiter } from "../services/login.limiter";
import { protect } from "../../../middlewares/protect.middleware";
const router = express.Router();

/**
 * @description User login route with validation with express-validator
 * @route POST /api/v1/user/login
 * @access Public
 */
router.route("/login").post(loginLimiter, validate(loginSchema), LoginUser);

/**
 * @description Logout user route
 * @route GET /api/v1/user/logout
 * @access Private
 */
router.route("/logout").get(protect, logoutUser);

export default router;