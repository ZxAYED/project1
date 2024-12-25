import { NextFunction, Request, RequestHandler, Response } from "express"

const catchAsyncError = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
}
export default catchAsyncError