
import { AnyZodObject } from "zod";
import catchAsyncError from "./catchAsync";
import { NextFunction, Request, RequestHandler, Response } from "express";

const validateRequest = (schema: AnyZodObject): RequestHandler => {
    return catchAsyncError(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await schema.parseAsync({
            body: req.body

        });

        next()
    })
}
export default validateRequest