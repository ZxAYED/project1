import { NextFunction, Request, Response } from "express"

const GlobalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500

    let message = err.message || 'Something went wrong'
    return res.status(statusCode).json({
        success: false,
        message,
        error: err
    })
    next()
}
export default GlobalErrorHandler