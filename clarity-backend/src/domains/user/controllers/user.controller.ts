import catchAsync from "../../../utils/catchAsync";
import { Request, Response } from "express";
import User from "../models/User.model";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { LoginInput } from "../validators/login.validator";
import { StatusCodes } from "http-status-codes";
import logger from "../../../utils/logger";
import jwt, { JwtPayload } from "jsonwebtoken";
import createError from "../../../utils/createError";
import { hashPassword } from "../../../utils/bcryptHash";
import { SignupInput } from "../validators/signup.validator";
import { UpdateUserInput } from "../validators/income-goal.validator";

/**
 * @function LoginUser
 * @param req - The request object containing user login data.
 * @param res - The response object to send the response back to the client.
 * @description - This function handles user login by validating the input data, checking for existing users, comparing passwords, and generating a JWT token.
 * @returns - A JSON response containing the login status, token, and user data.
 * @throws - If an error occurs during the process, it throws an error with a message.
 */
export const LoginUser = catchAsync(async (req: Request<{}, {}, LoginInput>, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw createError(StatusCodes.UNPROCESSABLE_ENTITY, "Email and password are required.");
    }

    const user = await User.findOne({ email });
    if (!user) {
        logger.warn(`Failed login attempt for email: ${req.body.email}`);
        throw createError(StatusCodes.UNAUTHORIZED, "Invalid credentials.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        logger.warn(`Invalid login attempt for email: ${req.body.email}`);
        throw createError(StatusCodes.UNAUTHORIZED, "Invalid credentials.");
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    user.refresh_token = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/api/v1/refresh-token",
    });

    const userInfo = {
        id: user._id,
        email: user.email,
        username: user.username,
        monthly_income: user.monthly_income,
        goal: user.goal,
    };

    res.status(StatusCodes.OK).json({
        status: "success",
        message: "Logged in successfully.",
        accessToken,
        user: userInfo,
    });
    logger.info(`User logged in successfully: ${user.email}`);

});


export const signupUser = catchAsync(async (req: Request<{}, {}, SignupInput>, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw createError(StatusCodes.UNPROCESSABLE_ENTITY, "Username, email, and password are required.");
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        logger.warn(`Signup attempt failed: Email or username already exists: ${email}`);
        throw createError(StatusCodes.CONFLICT, "Email or username already exists.");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    logger.info(`New user signed up: ${user.email}`);

    return res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "Account created successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    });
});


/**
 * @function logoutUser
 * @description Logs out a user by verifying refresh token from DB and clearing it.
 */
export const logoutUser = catchAsync(async (req: any, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        logger.warn(`Failed logout attempt: User ID not found`);
        throw createError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }

    const user = await User.findById(userId);
    if (!user || !user.refresh_token) {
        throw createError(StatusCodes.NOT_FOUND, "User not found or not logged in");
    }

    try {
        jwt.verify(user.refresh_token, process.env.REFRESH_TOKEN_SECRET!);

        user.refresh_token = null;
        await user.save();

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        logger.info(`User logged out: ${user.email}`);
        return res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
    } catch (err) {
        logger.warn(`Invalid refresh token on logout for user: ${user.email}`);
        throw createError(StatusCodes.FORBIDDEN, "Invalid refresh token");
    }
});

/**
 * @function refreshToken
 * @description Refreshes access token using the refresh token stored in httpOnly cookie.
 * @param req - Express request object
 * @param res - Express response object
 */
export const refreshToken = catchAsync(async (req: any, res: Response) => {
    const token = req.cookies.refreshToken as string | undefined;

    if (!token) {
        logger.warn("Refresh token attempt failed - no token found", {
            requestId: req.requestId,
        });
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No token found" });
    }

    try {
        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;

        if (!payload.userId) {
            logger.warn("Refresh token attempt failed - invalid payload", {
                requestId: req.requestId,
            });
            return res.status(StatusCodes.FORBIDDEN).json({ message: "Invalid token" });
        }


        logger.info("Token refreshed successfully", {
            userId: payload.userId,
            requestId: req.requestId,
        });

        const user = await User.findById(payload.userId).select("-password -refresh_token");
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }

        const newAccessToken = generateAccessToken(user._id.toString());

        res.status(StatusCodes.OK).json({
            accessToken: newAccessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                monthly_income: user.monthly_income,
                goal: user.goal,
            }
        });

    } catch (err: any) {
        logger.warn("Refresh token attempt failed - invalid token", {
            error: err.message,
            requestId: req.requestId,
        });
        return res.status(StatusCodes.FORBIDDEN).json({ message: "Invalid token" });
    }
});


export const updateUserIncomeGoal = catchAsync(
    async (req: any, res: Response) => {
        const userId = req.user?.id;

        if (!userId) {
            throw createError(StatusCodes.UNAUTHORIZED, "Unauthorized");
        }

        const { monthly_income, goal } = req.body as UpdateUserInput;

        const user = await User.findById(userId);
        if (!user) {
            throw createError(StatusCodes.NOT_FOUND, "User not found");
        }

        if (monthly_income !== undefined) {
            user.monthly_income = monthly_income;
        }

        if (goal !== undefined) {
            user.goal = goal;
        }

        await user.save();

        logger.info(`User profile updated: ${user.email}`);

        return res.status(StatusCodes.OK).json({
            status: "success",
            message: "Profile updated successfully.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                monthly_income: user.monthly_income,
                goal: user.goal,
            },
        });
    }
);
