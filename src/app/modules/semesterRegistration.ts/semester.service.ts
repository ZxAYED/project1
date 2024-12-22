import QueryBuilder from "../../builder/QueryBuilder"
import AppError from "../../errors/appError"
import { academicSemesterModel } from "../academicSemester/academicSemester.model"
import { status } from "./semester.constant"
import { ISemesterRegistration } from "./semester.interface"
import { semesterRegistrationModel } from "./semester.model"

const createSemesterIntoDb = async (payload: ISemesterRegistration) => {

    const academicSemester = payload?.academicSemester

    const isAcademicSemesterExist = await academicSemesterModel.findById(academicSemester)

    if (!isAcademicSemesterExist) {
        throw new AppError(400, 'Academic Semester Not found')
    }

    const isSemesterRegistrationExists = await semesterRegistrationModel.findOne({ academicSemester })
    if (isSemesterRegistrationExists) {
        throw new AppError(400, "This semester is already registered!")
    }
    // ongoing /upcoming semester thake taile new sem reg deya jabena
    const isRunningSemester = await semesterRegistrationModel.findOne({
        $or: [
            { status: status.UPCOMING },
            { status: status.ONGOING },
        ]
    })
    if (isRunningSemester) {
        if (isSemesterRegistrationExists) {
            throw new AppError(400, `This is already an ${isRunningSemester?.status} regestered semester`)
        }
    }

    const result = await semesterRegistrationModel.create(payload)
    return result
}

const getAllsemesterRegistrationFromDb = async (payload: Record<string, unknown>) => {

    const semesterQuery = new QueryBuilder(semesterRegistrationModel.find().populate('academicSemester'), payload)
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await semesterQuery.QueryModel
    return result

}
const getSingelSemesterRegistrationFromDb = async (id: string) => {
    const result = await semesterRegistrationModel.findById(id)
    return result
}
const updaeSemesterRegistrationFromDb = async (id: string, payload: Partial<ISemesterRegistration>) => {


    const isSemesterExist = await semesterRegistrationModel.findById(id)

    if (!isSemesterExist) {
        throw new AppError(400, 'This semester not found')
    }

    // if requested semester is ended then update wont happen

    if (isSemesterExist?.status == status.ENDED) {
        throw new AppError(400, `This is already  ${isSemesterExist?.status} `)
    }
    if (isSemesterExist?.status == status.UPCOMING && payload?.status == status.ENDED) {
        throw new AppError(400, `You cant directly update status from  ${isSemesterExist?.status} to ${payload?.status}`)
    }
    if (isSemesterExist?.status == status.ONGOING && payload?.status == status.UPCOMING) {
        throw new AppError(400, `You cant directly update status from  ${isSemesterExist?.status} to ${payload?.status}`)
    }
    const result = await semesterRegistrationModel.findByIdAndUpdate(id, { payload }, { new: true, runValidators: true })
    return result
}
export const semesterService = {
    createSemesterIntoDb,
    getAllsemesterRegistrationFromDb,
    getSingelSemesterRegistrationFromDb,
    updaeSemesterRegistrationFromDb
}