import { model, Schema } from "mongoose";
import { SemesterRegistrationStatus } from "./semester.constant";
import { ISemesterRegistration } from "./semester.interface";



const semesterRegistrationSchema = new Schema<ISemesterRegistration>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Academic-Semester',
        unique: true
    },
    status: {
        type: String,
        enum: SemesterRegistrationStatus,
        default: "UPCOMING"
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    minCredit: {
        type: Number,
        default: 3
    },
    maxCredit: {
        type: Number,
        default: 3
    }
}, {
    timestamps: true
})

export const semesterRegistrationModel = model<ISemesterRegistration>('semesterRegistration', semesterRegistrationSchema)
