import { NextFunction, Request, Response } from "express";
import catchAsyncError from "./catchAsync"
import AppError from "../errors/appError";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { TUseRole } from "../modules/user/user.interface";

const auth = (...requiredRoles: TUseRole[]) => {
    return catchAsyncError(
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {

            const token = req.headers.authorization
            if (!token) {
                throw new AppError(401, "You are not authorized")
            }
            try {
                const decoded = jwt.verify(token, config.jwt_access_secret as string);
                // const { userId as string, role as string } = decoded
                const role =
                    (decoded as JwtPayload)?.data?.role
                if (requiredRoles && !requiredRoles.includes(role)) {
                    throw new AppError(401, "You are not authorized")
                }
                req.user = decoded as JwtPayload
            }
            catch (err: any) {
                if (err) {
                    throw new AppError(401, "You are not authorized")
                }
            }
            next();
        })
}
export default auth