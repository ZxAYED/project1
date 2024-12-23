


import { IOfferCourse } from "./offeredCourse.interface"
import { offeredCourseModel } from "./offeredCourse.model"
import { semesterRegistrationModel } from './../semesterRegistration.ts/semester.model';
import AppError from './../../errors/appError';
import { academicFacultyModel } from "../academicFaculty/academicFaculty.model"
import { academicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { courseModel } from "../course/course.model";
import { facultyModel } from "../faculty/faculty.model";
import QueryBuilder from "../../builder/QueryBuilder";




const createofferedCourseIntoDb = async (payload: IOfferCourse) => {

    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, section, days, startTime, endTime } = payload

    const isSemesterRegistrationExists = await semesterRegistrationModel.findById(semesterRegistration)

    if (!isSemesterRegistrationExists) {
        throw new AppError(404, 'Semestar registration not found')
    }
    const isAcademicFacultyExists = await academicFacultyModel.findById(academicFaculty)

    if (!isAcademicFacultyExists) {
        throw new AppError(404, 'Academic Faculty not found')
    }

    const isAcademicDepartentExists = await academicDepartmentModel.findById(academicDepartment)

    if (!isAcademicDepartentExists) {
        throw new AppError(404, 'Academic Department not found')
    }
    const isCourseExists = await courseModel.findById(course)

    if (!isCourseExists) {
        throw new AppError(404, 'Course not found')
    }
    // if the dept belongs to the r8 faculty

    const isDepartmentBelongsToFaculty = await academicDepartmentModel.findOne({
        academicFaculty,
        _id: academicDepartment
    })
    if (!isDepartmentBelongsToFaculty) {
        throw new AppError(404, `This department ${isAcademicDepartentExists.name} is not belongs to this faculty ${isAcademicFacultyExists.name}`)
    }

    const isFacultyExists = await facultyModel.findById(faculty)

    if (!isFacultyExists) {
        throw new AppError(404, 'Faculty not found')
    }

    const sameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = await offeredCourseModel.findOne({
        semesterRegistration, course, section
    })

    if (sameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
        throw new AppError(400, 'Offered Course with the same registration and section already exits')
    }

    // get the schedules of the faculties so that hes free or not at that time period

    const assignSchedules = await offeredCourseModel.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select('days startTime endTime')

    const newSchedule = {
        days, startTime, endTime
    }

    for (const el of assignSchedules) {
        const exitstingStartTime = new Date(`1970-01-01T${el.startTime}`)
        const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`)
        const exitstingEndtime = new Date(`1970-01-01T${el.endTime}`)
        const newEndtime = new Date(`1970-01-01T${newSchedule.endTime}`)
        if (newStartTime < exitstingEndtime && newEndtime > exitstingStartTime) {
            throw new AppError(400, 'This faculty is not available at that time ! Change the time ')
        }

    }




    const academicSemester = isSemesterRegistrationExists.academicSemester

    const result = await offeredCourseModel.create({ ...payload, academicSemester })

    return result
}
const getAllofferedCourseFromDb = async (query: Record<string, unknown>) => {

    const courseQuery = new QueryBuilder(offeredCourseModel.find()
        .populate('semesterRegistration')
        .populate('academicDepartment')
        .populate('academicSemester')
        .populate('academicFaculty')
        .populate('course')
        .populate('faculty'), query)

        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await courseQuery.QueryModel


    return result
}
const getSingleCourseFromDb = async (id: string) => {
    const result = await offeredCourseModel.findById(id)
        .populate('semesterRegistration')
        .populate('academicDepartment')
        .populate('academicSemester')
        .populate('academicFaculty')
        .populate('course')
        .populate('faculty')
    return result
}


const deleteOfferedCoursefromDb = async (id: string) => {


    const isOfferedCourseExits = await offeredCourseModel.findById(id)

    if (!isOfferedCourseExits) {
        throw new AppError(400, 'Offered Course not found')
    }

    const semesterRegistration = isOfferedCourseExits.semesterRegistration

    const semesterRegistrationStatus = await semesterRegistrationModel.findById(semesterRegistration)
    if (semesterRegistrationStatus?.status !== "UPCOMING") {
        throw new AppError(400, `You cant delete an ${semesterRegistrationStatus?.status}  semester `)
    }

    const result = await offeredCourseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    return result
}


const updateOfferedCourseFromDd = async (id: string, payload: Partial<IOfferCourse>) => {

    const { faculty, days, startTime, endTime } = payload
    const isOfferedCourseExits = await offeredCourseModel.findById(id)

    if (!isOfferedCourseExits) {
        throw new AppError(400, 'Offered Course not found')
    }


    const isFacultyExits = await facultyModel.findById(faculty)


    if (!isFacultyExits) {
        throw new AppError(400, 'Faculty not found')
    }


    const semesterRegistration = isOfferedCourseExits.semesterRegistration

    const assignSchedules = await offeredCourseModel.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select('days startTime endTime')

    const newSchedule = {
        days, startTime, endTime
    }

    for (const el of assignSchedules) {

        const exitstingStartTime = new Date(`1970-01-01T${el.startTime}`)

        const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`)

        const exitstingEndtime = new Date(`1970-01-01T${el.endTime}`)

        const newEndtime = new Date(`1970-01-01T${newSchedule.endTime}`)

        if (newStartTime < exitstingEndtime && newEndtime > exitstingStartTime) {
            throw new AppError(400, 'This faculty is not available at that time ! Change the time ')
        }

    }


    const semesterRegistrationStatus = await semesterRegistrationModel.findById(semesterRegistration)
    if (semesterRegistrationStatus?.status !== "UPCOMING") {
        throw new AppError(400, `You cant update an ${semesterRegistrationStatus?.status}  semester `)
    }

    const result = await offeredCourseModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return result


}


export const offeredCourseService = {
    createofferedCourseIntoDb, getAllofferedCourseFromDb, getSingleCourseFromDb, deleteOfferedCoursefromDb, updateOfferedCourseFromDd,
}