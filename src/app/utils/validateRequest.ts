import express, { NextFunction, RequestHandler, Response, response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await schema.parseAsync({ body: req.body });
            next();

        }
        catch (error) {
            next(error);
        }
    };
}

export default validateRequest