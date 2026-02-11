/**
 * @file login.limiter.ts
 * @description Rate limiter middleware for login requests.
 */
import rateLimit from "express-rate-limit";
import { StatusCodes } from "http-status-codes";

/**
 * @function loginLimiter
 * @description Rate limiter middleware for login requests.
 */
export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  statusCode: StatusCodes.TOO_MANY_REQUESTS,
  handler: (req, res) => {
    res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      success: false,
      message: "Too many login attempts.",
    });
  },
});

