import express, { NextFunction, Request, Response } from "express";

import { getReasonPhrase, getStatusCode, StatusCodes } from "http-status-codes";


const notFound = (req: Request, res: Response, next: NextFunction) => {

    return res.status(getStatusCode('Internal Server Error'))
        .send({

            error: 'Resource not found'
        });
}
export default notFound as unknown as express.ErrorRequestHandler