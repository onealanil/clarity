/**
 * @file protect.middleware.ts
 * @description Middleware to protect routes
 */
import createError from "../utils/createError";
import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../domains/user/models/User.model";
import logger from "../utils/logger";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../interface/user/IUser";

declare global {
    namespace Express {
        interface Request {
            user?: {
                _id?: string;
                username?: string;
                email?: string;
                createdAt?: Date;
                updatedAt?: Date;
            };
        }
    }
}

/**
 * Middleware to protect routes
 */
export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader && authHeader.toLowerCase().startsWith("bearer"))) {
        logger.warn("No token provided");
        throw createError(
            StatusCodes.UNAUTHORIZED,
            "You are not logged in. Please login to get access."
        );
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        let userId: string | undefined;
        if (typeof decoded === "object" && "userId" in decoded) {
            userId = (decoded as jwt.JwtPayload).userId as string;
        }
        if (!userId) {
            logger.warn("Invalid token payload.");
            throw createError(StatusCodes.FORBIDDEN, "Invalid token payload.");
        }
        const userInfo = await User.findById(userId).select("-password -refresh_token") as IUser;
        req.user = userInfo;
        next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            logger.warn("Token expired.");
            throw createError(StatusCodes.UNAUTHORIZED, "Your session has expired. Please log in again.");
        } else {
            logger.error("Invalid token.");
            throw createError(StatusCodes.UNAUTHORIZED, "Invalid token.");
        }
    }
});