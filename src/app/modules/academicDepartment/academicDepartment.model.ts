
import { model, Schema } from "mongoose";
import { IAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/appError";



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




academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExist = await academicDepartmentModel.findOne({
        name: this.name
    })
    if (isDepartmentExist) {
        throw new AppError(404, 'Department already exits!')
    }
    next()
})


academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery()
    const isDepartmentExist = await academicDepartmentModel.findOne({
        query
    })
    if (!isDepartmentExist) {
        throw new AppError(404, 'This department does not exits!')
    }
    next()
})



export const academicDepartmentModel = model<IAcademicDepartment>('Academic-Department', academicDepartmentSchema)