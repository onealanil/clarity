/**
 * @file errorHandler.ts
 * @description: This file contains the error handling middleware for the Express application.
 * It catches errors thrown in the application and sends a JSON response with the error message and status code.
 */

import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from './logger';

/**
 * Middleware to handle errors in the application.
 * @param err - The error object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    logger.error(`[${req.method}] ${req.originalUrl} - ${err.stack || err.message}`);
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
};