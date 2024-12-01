import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    id: {
        type: String,
        requied: true
    },
    password: {
        type: String,
        required: true,
        default: true

    },
    needPasswordChange: {
        type: Boolean,
        required: true
    },
    role: {
        enum: ['admin', 'student', 'faculty'],
        required: true
    },
    status: {
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})
export const userModel = model<TUser>('User', userSchema)