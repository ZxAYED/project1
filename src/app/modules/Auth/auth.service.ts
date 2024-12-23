import AppError from "../../errors/appError";
import { userModel } from "../user/user.model";
import { ILoginUser } from "./auth.interface";

const loginUserIntoDb = async (payload: ILoginUser) => {
    const isUserExists = await userModel.findOne({ id: payload?.id })
    if (!isUserExists) {
        throw new AppError(404, "This user doesnt exist")
    }
    if (isUserExists?.isDeleted) {
        throw new AppError(404, "This user doesnt exist")
    }


    return [{ "shei": "asd" }]
}

export const authService = {
    loginUserIntoDb
}