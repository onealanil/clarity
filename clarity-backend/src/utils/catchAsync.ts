/**
 * @file catchAsync.ts
 * @description This function is used to catch errors in async functions and pass them to the next middleware.
 * 
 */
import { Request, Response, NextFunction } from "express";


/**
 * @description This function is used to catch errors in async functions and pass them to the next middleware.
 * @param fn The async function to be executed
 * @returns A function that takes req, res, and next as parameters
 */
export default (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction): Promise<void> => {
        return fn(req, res, next).catch(next);
    };
};