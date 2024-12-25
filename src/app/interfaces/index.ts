import { JwtPayload } from "jsonwebtoken"

export interface IErrorSource {
    path: string,
    message: string
}

export interface IErrorResponse {
    message: string,
    statusCode: number,
    errorSource: IErrorSource[]
}
declare global {
    namespace Express {
        interface Request {
            user: JwtPayload
        }
    }
}