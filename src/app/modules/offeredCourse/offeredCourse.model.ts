import { model, Schema } from "mongoose";
import { IOfferCourse } from "./offeredCourse.interface";

const offeredCourseSchema = new Schema<IOfferCourse>({
    semesterRegistration: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'semesterRegistration'
    },

    academicDepartment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Academic-Department'
    },
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'Academic-Department',

    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Academic-Faculty'
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    faculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Faculty'
    },
    days: [{
        type: String,
        required: true,

    }],
    startTime: {
        type: String,
        required: true,

    },
    endTime: {
        type: String,
        required: true,

    },
    maxCapacity: {
        type: Number,
        required: true,

    },
    section: {
        type: Number,
        required: true,

    },
})


export const offeredCourseModel = model<IOfferCourse>('offeredCourse', offeredCourseSchema)