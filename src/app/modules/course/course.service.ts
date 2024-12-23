import mongoose from "mongoose"
import QueryBuilder from "../../builder/QueryBuilder"
import { CourseSearchableFields } from "./course.constant"
import { ICourse, ICourseFaculty } from "./course.interface"
import { courseFacultyModel, courseModel } from "./course.model"
import AppError from "../../errors/appError"


const createCourseIntoDb = async (payload: ICourse) => {
    const result = await courseModel.create(payload)
    return result
}
const getAllCoursesFromDb = async (query: Record<string, unknown>) => {

    const courseQuery = new QueryBuilder(courseModel.find().populate('preRequisiteCourses.course'), query)
        .search(CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await courseQuery.QueryModel
    // const result = await courseModel.find()

    return result
}
const getSingleCourseFromDb = async (id: string) => {
    console.log(id, 'id ta asche');
    const result = await courseModel.findById(id).populate('preRequisiteCourses.course')
    return result
}


const deleteCoursefromDb = async (id: string) => {
    const result = await courseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    return result
}

const assignFacultiesWithCourseIntoDb = async (id: string, payload: Partial<ICourseFaculty>) => {

    const result = await courseFacultyModel.findByIdAndUpdate(id, {
        course: id,
        $addToSet: {

            faculties: { $each: payload }
        }
    }, { upsert: true, new: true, runValidators: true })
    return result
}
const removeFacultiesWithCourseIntoDb = async (id: string, payload: Partial<ICourseFaculty>) => {

    const result = await courseFacultyModel.findByIdAndUpdate(id, {
        $pull: {
            faculties: { $in: payload }
        }
    }, { upsert: true, new: true, runValidators: true })
    return result
}



const updateCourseFromDd = async (id: string, payload: Partial<ICourse>) => {

    const { preRequisiteCourses, ...remainingData } = payload
    const session = await mongoose.startSession()
    session.startTransaction()

    try {

        if (preRequisiteCourses && preRequisiteCourses.length > 1) {
            const deletedPreRequisites = preRequisiteCourses.filter(el => el.course && el.isDeleted).map(el => el.course)

            const deletedPreRequisiteCourses = await courseModel.findById(id, {
                $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } }
            }, { new: true, runValidators: true, session })

            if (!deletedPreRequisiteCourses) {

                await session.abortTransaction()
                await session.endSession()
                throw new AppError(400, "Failed To update the course , transaction dismissed")
            }

            const newPreRequisites = preRequisiteCourses?.filter(el => el.course && !el.isDeleted)

            const newPreRequisitesCourses = await courseModel.findByIdAndUpdate(id, {
                $addToSet: {
                    preRequisiteCourses: { $each: newPreRequisites }
                }
            }, { new: true, runValidators: true, session })
            if (!newPreRequisitesCourses) {
                await session.abortTransaction()
                await session.endSession()
                throw new AppError(400, "Failed To update the course , transaction dismissed")


            }
        }


        await session.commitTransaction()
        await session.endSession()

        const result = await courseModel.findByIdAndUpdate(id, remainingData, { new: true, runValidators: true, session }).populate('preRequisiteCourses.course')
        if (!result) {
            await session.abortTransaction()
            await session.endSession()
            throw new AppError(400, "Failed To update the course , transaction dismissed")

        }
        return result

    }
    catch (err) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(400, "Failed To update the course , transaction dismissed")

    }

}


export const courseService = {
    createCourseIntoDb, getAllCoursesFromDb, getSingleCourseFromDb, deleteCoursefromDb, updateCourseFromDd, assignFacultiesWithCourseIntoDb, removeFacultiesWithCourseIntoDb
}