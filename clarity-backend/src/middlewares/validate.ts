/**
 * @file validate.ts
 * @description Middleware for validating request data using Zod schemas.
 */
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';

/**
 * @function validate
 * @param schema - Zod schema to validate the request body
 * @returns the middleware function that validates the request body against the provided schema
 */
export function validate(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
      const errorMessages = error.issues.map((issue: any) => ({
            message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      }
    }
  };
}