
import { IAcademicFaculty } from "./academicFaculty.interface";
import { model, Schema } from 'mongoose';




const academicFacultySchema = new Schema<IAcademicFaculty>(
    {
        name: {
            required: true,
            type: String
        }
    },
    { timestamps: true }
)

export const academicFacultyModel = model<IAcademicFaculty>('AcademicFaculty', academicFacultySchema)