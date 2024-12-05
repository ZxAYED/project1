import { Response } from "express";
interface TResponse<T> {
    statusCode: number,
    success: boolean,
    message?: string,
    data: T
}

const sendResponseResult = <T>(res: Response, data: TResponse<T>) => {
    res.status(data.statusCode).json({
        success: true,
        message: data.message,
        data: data,
    })

}