import { model, Schema } from "mongoose";
import { IAcademicSemester, ICode, IMonth, IName } from "./academicSemester.interface";

export const monthEnum: IMonth[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
export const nameEnum: IName[] = ['Autumn', 'Summer ', 'Fall']
export const codeEnum: ICode[] = ['01', '02', '03']

const academicSemesterSchema = new Schema<IAcademicSemester>(
    {
        name: {
            type: String,
            requied: true,
            enum: nameEnum

        },
        year: {
            type: Date,
            required: true,

        },
        code: {
            type: String,
            required: true,
            enum: codeEnum
        },
        startMonth: {
            type: String,
            enum: Object.values(monthEnum),
            required: true
        },
        endMonth: {
            type: String,
            enum: Object.values(monthEnum),
            required: true
        },
    }, {
    timestamps: true
})

export const academicSemesterModel = model<IAcademicSemester>('academicSemester', academicSemesterSchema)