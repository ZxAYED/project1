import { NextFunction, Request, Response } from "express";
import { status } from 'http-status';


const notFound = (req: Request, res: Response, next: NextFunction) => {

    return res.status(status.INTERNAL_SERVER_ERROR)
}
export default notFound 