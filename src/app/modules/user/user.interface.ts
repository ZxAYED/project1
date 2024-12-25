import { Model } from "mongoose"
import { USER_ROLE } from "./user.constant"


export interface TUser {
    id: string,
    password: string,
    needPasswordChange?: boolean,
    role: 'admin' | 'student' | 'faculty'
    status: 'in-progress' | 'blocked',
    isDeleted: boolean,
    email?: string

}
export interface IUserModel extends Model<TUser> {
    // myStaticMethod(): number
    isUserExistByCustomId(id: string): Promise<TUser>
    isPasswordMatched(id: string): Promise<TUser>
}

export type TUseRole = keyof typeof USER_ROLE