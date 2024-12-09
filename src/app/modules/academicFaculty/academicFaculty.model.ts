
import { IAcademicFaculty } from "./academicFaculty.interface";
import { model, Schema } from 'mongoose';




const academicFacultySchema = new Schema<IAcademicFaculty>(
    {
        name: {
            required: true,
            type: String,
            unique: true
        }
    },
    { timestamps: true }
)

export const academicFacultyModel = model<IAcademicFaculty>('Academic-Faculty', academicFacultySchema)