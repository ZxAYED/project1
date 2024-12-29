import express, { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"
import config from "../config"

import handeleMongooseError from "../errors/mongooseValidationError"
import handleZodError from './../errors/zodError';
import handleCastError from "../errors/CastError";
import handleDuplicateError from "../errors/DuplicateError";
import AppError from "../errors/appError";






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
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message,
            ErrorSource = simplifiedError.errorSource


    }
    else if (err?.name === 'ValidationError') {
        const simplifiedError = handeleMongooseError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message,
            ErrorSource = simplifiedError.errorSource
    }
    else if (err?.name === 'CastError') {
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message,
            ErrorSource = simplifiedError.errorSource
    }
    else if (err?.name === 11000) {
        const simplifiedError = handleDuplicateError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message,
            ErrorSource = simplifiedError.errorSource
    }
    else if (err instanceof AppError) {

        statusCode = err.statusCode
        message = err.message
        ErrorSource = [{
            path: 'No path found',
            message: err?.message
        }]
    }




    return res.status(statusCode).json({
        success: false,
        message,
        ErrorSource,
        stack: config.NODE_ENV === 'development' ? err?.stack : null
    })

}
export default GlobalErrorHandler as unknown as express.ErrorRequestHandler