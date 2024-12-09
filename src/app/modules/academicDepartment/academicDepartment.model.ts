
import { model, Schema, Types } from "mongoose";
import { IAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<IAcademicDepartment>({

    name: {
        type: String,
        required: true,
        unique: true
    },

    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Academic-Faculty'
    },

}, {
    timestamps: true
})

export const academicDepartmentModel = model<IAcademicDepartment>('Academic-Department', academicDepartmentSchema)