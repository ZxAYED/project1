import { model, Schema } from "mongoose";
import { IAcademicSemester, ICode, IMonth, IName } from "./academicSemester.interface";
import AppError from "../../errors/appError";

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
export const nameEnum: IName[] = ['Autumn', 'Summer', 'Fall']
export const codeEnum: ICode[] = ['01', '02', '03']

const academicSemesterSchema = new Schema<IAcademicSemester>(
    {
        name: {
            type: String,
            requied: true,
            enum: nameEnum

        },
        year: {
            type: String,
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

academicSemesterSchema.pre('save', async function (next) {
    const isSemesterExits = await academicSemesterModel.findOne({
        name: this.name,
        year: this.year
    })
    if (isSemesterExits) {
        throw new AppError(409, 'Semester already exits')
    }

    next()

})







export const academicSemesterModel = model<IAcademicSemester>('Academic-Semester', academicSemesterSchema)