import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"
import config from "../config"

import handeleMongooseError from "../errors/mongooseValidationError"
import handleZodEror from "../errors/ZodError"





const GlobalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let ErrorSource = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ]
    let statusCode = err.statusCode || 500

    let message = err.message || 'Something went wrong'




    if (err instanceof ZodError) {
        const simplifiedError = handleZodEror(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message,
            ErrorSource = simplifiedError.errorSource


    }
    else if (err?.name === 'ValidationError') {
        const simplifiedError = handeleMongooseError(err)
        statusCode = simplifiedError.statusCodes
        message = simplifiedError.message,
            ErrorSource = simplifiedError.errorSource
    }


    return res.status(statusCode).json({
        success: false,
        message,
        ErrorSource,
        stack: config.NODE_ENV === 'development' ? err?.stack : null
    })

}
export default GlobalErrorHandler