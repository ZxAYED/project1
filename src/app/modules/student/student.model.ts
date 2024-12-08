import { Schema, Types, model } from 'mongoose';
import { Gurdian, LocalGurdian, IStudent, UserName } from './student.interface';

import config from '../../config';
import { ObjectId } from 'mongoose';

const userNameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        required: true,
        maxlength: [20, 'First name character must be in 20 letters'],
        trim: true
    },
    middleName: {
        type: String,
        required: true,
        maxlength: [20, 'Middle name character must be in 20 letters'],
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        maxlength: [20, 'Last name character must be in 20 letters'],
        trim: true
    }
});

const gurdianSchema = new Schema<Gurdian>({
    fatherContactNo: { type: String, required: true },
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
});

const localGurdianSchema = new Schema<LocalGurdian>({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    address: { type: String, required: true },
    contactNo: { type: String, required: true },
});

const studentSchema = new Schema<IStudent>({
    id: { type: String, unique: true, required: true },
    name: {
        type: userNameSchema,
        required: [true, 'Name is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id required'],
        unique: true,
        ref: 'User'
    },
    admissionSemester: {
        type: Types.ObjectId,
        ref: 'academicSemester'
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "others"],
            message: '{VALUE} is not a valid gender'
        },
        required: [true, 'Gender is required']
    },
    dateOfBirth: { type: Date },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function (v: string) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: 'Email is not a valid format'
        }, unique: true
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required'],
        validate: {
            validator: function (v: string) {
                return /^\d+$/.test(v);
            },
            message: 'Contact number must be numeric'
        }
    },
    emergencryContactNo: {
        type: String,
        required: [true, 'Emergency contact number is required'],
        validate: {
            validator: function (v: string) {
                return /^\d+$/.test(v);
            },
            message: 'Emergency contact number must be numeric'
        }
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: '{VALUE} is not a valid blood group'
        }
    },
    presendAddress: {
        type: String,
        required: [true, 'Present address is required']
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required']
    },
    gurdian: {
        type: gurdianSchema,
        required: [true, 'Guardian information is required']
    },
    localGurdian: {
        type: localGurdianSchema,
        required: [true, 'Local guardian information is required']
    },
    profileImg: { type: String }
    // isActive: {
    //     type: String,
    //     enum: {
    //         values: ['active', 'blocked'],
    //         message: '{VALUE} is not a valid status'
    //     },
    //     required: [true, 'Status is required'],
    //     default: 'active'
    // }
}, {
    timestamps: true
});


studentSchema.pre('find', async function (next) {
    this.find({ isDeleted: { $ne: true } })

    next()
})
studentSchema.pre('findOne', async function (next) {
    this.findOne({ isDeleted: { $ne: true } })

    next()
})
studentSchema.pre('aggregate', async function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })

    next()
})



export const StudentModel = model<IStudent>('Student', studentSchema);
