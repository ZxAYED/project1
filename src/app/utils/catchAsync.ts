import { NextFunction, Request, RequestHandler, Response } from "express"

const catchAsyncError = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(error => next(error))
    }
}
export default catchAsyncError