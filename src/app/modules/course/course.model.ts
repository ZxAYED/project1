import { model, Schema, Types } from "mongoose";
import { ICourse, ICourseFaculty, TpreRequisiteCourses } from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TpreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    isDeleted: {
        type: Boolean,
        default: false,

    }
})
const courseSchema = new Schema<ICourse>({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    prefix: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: Number,
        required: true,
        trim: true
    },
    credits: {
        type: Number,
        required: true,
        trim: true
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
        type: Boolean,
        default: false,

    }
})

const courseFacultySchema = new Schema({

    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        unique: true
    },
    faculties: {
        type: [Schema.Types.ObjectId],
        ref: "Faculty"
    }
})

export const courseModel = model<ICourse>('Course', courseSchema)

export const courseFacultyModel = model<ICourseFaculty>('CourseFaculty', courseFacultySchema)