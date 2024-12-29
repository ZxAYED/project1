import config from "../../config";
import AppError from "../../errors/appError";
import { userModel } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from "jsonwebtoken"
import createToken from "./auth.uitils";


const loginUserIntoDb = async (payload: ILoginUser) => {
    const isUserExists = await userModel.findOne({ id: payload?.id }).select('+password')
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
    // checking the pNassword 
    const isPasswordMatched = await bcrypt.compare(payload?.password, isUserExists?.password);


    if (!isPasswordMatched) {
        throw new AppError(401, "Wrong password!")
    }

    const jwtPayload = {
        userId: isUserExists.id,
        role: isUserExists.role
    }

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.JWT_ACCESS_EXPIRES_IN as string)


    const refreshToken = createToken(jwtPayload, config.JWT_REFRESH_SECRET as string, config.JWT_REFRESH_EXPIRES_IN as string)

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        isPasswordMatched,
        needPasswordChange: isUserExists?.needPasswordChange,

    }
}
const changePasswordIntoDB = async (user: JwtPayload, payload: any) => {
    const isUserExists = await userModel.findOne({ id: user?.data?.userId }).select('+password')
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
    // checking the password 
    const isPasswordMatched = await bcrypt.compare(payload?.oldPassword, isUserExists?.password)
    if (!isPasswordMatched) {
        throw new AppError(401, "Wrong password!")
    }
    const newHasedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt))



    const result = await userModel.findOneAndUpdate({
        id: user.data?.userId,
        role: user.data?.role,
    }, {
        password: newHasedPassword,
        needPasswordChange: false,
        passwordChangedAt: new Date()
    })
    return result
}
const refreshToken = async (token: string) => {

    if (!token) {
        throw new AppError(401, "You are not authorized")
    }
    const decoded = jwt.verify(token, config.JWT_REFRESH_SECRET as string);

    const { userId, iat } = (decoded as JwtPayload)?.data


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
    const jwtPayload = {
        userId: isUserExists.id,
        role: isUserExists.role
    }

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.JWT_ACCESS_EXPIRES_IN as string)


    const refreshToken = createToken(jwtPayload, config.JWT_REFRESH_SECRET as string, config.JWT_REFRESH_EXPIRES_IN as string)

    return {
        accessToken, refreshToken
    }


}

export const authService = {
    loginUserIntoDb, changePasswordIntoDB,
    refreshToken
}