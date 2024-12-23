import { Types } from "mongoose"

export type Days = 'Sat' | 'Sun' | 'Mon' | 'Tues' | 'Wed' | "Thu" | "Fri"

export interface IOfferCourse {
    semesterRegistration: Types.ObjectId,
    academicSemester?: Types.ObjectId,
    academicFaculty: Types.ObjectId,
    academicDepartment: Types.ObjectId,
    course: Types.ObjectId,
    faculty: Types.ObjectId,
    maxCapacity: number,
    section: number,
    days: Days[],
    startTime: string,
    endTime: string
}