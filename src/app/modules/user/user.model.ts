import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser>({
    id: {
        type: String,
        requied: true
    },
    password: {
        type: String,
        required: true,
        default: config.default_pass
    },
    needPasswordChange: {
        type: Boolean,

    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty'],
        required: true
    },
    status: {
        type: String,
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


userSchema.pre('save', async function (next) {

    try {
        const bcrypt = await import('bcrypt-ts');
        const salt = bcrypt.genSaltSync(Number(config.bcrypt_salt));
        this.password = await bcrypt.hashSync(this.password, salt);
        next();
    }
    catch (error) {
        console.log(error)
    };

})



userSchema.post('save', async function (doc, next) {
    doc.password = ''
    next()
})



export const userModel = model<TUser>('User', userSchema)