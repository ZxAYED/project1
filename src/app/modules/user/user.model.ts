import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcryptjs'
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


userSchema.pre('save', function (next) {
    const user = this;

    bcrypt.genSalt(Number(config.bcrypt_salt), (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});


userSchema.post('save', async function (doc, next) {
    doc.password = ''
    next()
})



export const userModel = model<TUser>('User', userSchema)