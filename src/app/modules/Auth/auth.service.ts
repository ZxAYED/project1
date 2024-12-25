import config from "../../config";
import AppError from "../../errors/appError";
import { userModel } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import { userModel } from './../user/user.model';

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
    // checking the password 
    const isPasswordMatched = await bcrypt.compare(payload?.password, isUserExists?.password);


    if (!isPasswordMatched) {
        throw new AppError(401, "Wrong password!")
    }



    const secret = config.jwt_access_secret as string

    const jwtPayload = {
        userId: isUserExists.id,
        role: isUserExists.role
    }
    const accessToken = jwt.sign({
        data: jwtPayload
    }, secret, { expiresIn: 60 * 60 });

    console.log(accessToken);


    return {
        accessToken: accessToken,
        isPasswordMatched: isPasswordMatched,
        needPasswordChange: isUserExists?.needPasswordChange,

    }
}
const changePasswordIntoDB = async (user, payload) => {
    console.log('servce', user, payload);
    //    const result =await userModel.findOneAndUpdate({
    //     id:user.userId
    //    })
    return null
}

export const authService = {
    loginUserIntoDb, changePasswordIntoDB
}