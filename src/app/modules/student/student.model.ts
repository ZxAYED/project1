import { Schema, model } from 'mongoose';
import { Gurdian, LocalGurdian, IStudent, UserName } from './student.interface';
import AppError from '../../errors/appError';




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
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'Academic-Semester'
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'Academic-Department'
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
    isDeleted: {
        type: Boolean,
        optional: true,
        default: false
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: '{VALUE} is not a valid blood group'
        }
    },
    presentAddress: {
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
    timestamps: true,
    strict: true
});


studentSchema.pre('find', async function (next) {
    this.find({ isDeleted: { $ne: true } })

    next()
})
studentSchema.pre('findOne', async function (next) {
    this.findOne({ isDeleted: { $ne: true } })

    next()
})
studentSchema.pre('findOne', async function (next) {
    const query = this.getQuery()
    this.findOne({ _id: query })
    if (!query) {
        throw new AppError(400, "Id not found")
    }
    next()
})
studentSchema.pre('aggregate', async function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })

    next()
})



export const StudentModel = model<IStudent>('Student', studentSchema);
