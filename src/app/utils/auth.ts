import { NextFunction, Request, Response } from "express";
import catchAsyncError from "./catchAsync"
import AppError from "../errors/appError";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { TUseRole } from "../modules/user/user.interface";
import { userModel } from "../modules/user/user.model";

const auth = (...requiredRoles: TUseRole[]) => {
    return catchAsyncError(
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {

            const token = req.headers.authorization
            if (!token) {
                throw new AppError(401, "You are not authorized")
            }
            const decoded = jwt.verify(token, config.jwt_access_secret as string);

            const { role, userId, iat } = (decoded as JwtPayload)?.data


            const isUserExists = await userModel.findOne({ id: userId }).select('+password')
            // if (!userModel.isUserExistsByCustomId(payload.id))

            if (!isUserExists) {
                throw new AppError(404, "This user doesnt exist")
            }
            if (isUserExists?.isDeleted) {
                throw new AppError(404, "This user doesnt exist")
            }
            if (isUserExists?.status === 'blocked') {
                throw new AppError(404, "This user doesnt exist")
            }

            const passwordChangedAt = new Date(isUserExists.passwordChangedAt).getTime() / 1000

            if (passwordChangedAt > iat) {
                throw new AppError(401, "You are not authorized")
            }

            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(401, "You are not authorized")
            }
            req.user = decoded as JwtPayload

            next();
        })
}
export default auth