
import { ObjectId } from "mongoose";
import { IAcademicSemester, TAcademicSemesterNameCodeMapper } from "./academicSemester.interface";
import { academicSemesterModel } from "./academicSemester.model";


const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03'
}
const createAcademicSemesterIntoDb = async (payload: IAcademicSemester) => {


    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid semester Name / Code')
    }

    const result = await academicSemesterModel.create(payload)
    return result
}

const getAllSemesterIntoDb = (async () => {

    const result = await academicSemesterModel.find()
    return result

})

const getSingleSemesterFromDb = async (id: string) => {
    const result = await academicSemesterModel.findOne({ _id: id })
    return result
}

const deleteSemesterFromDb = async (id: string) => {
    const result = await academicSemesterModel.findByIdAndDelete({ id })
    return result
}
const updateSemesterFromDb = async (id: string, payload: Partial<IAcademicSemester>) => {
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {

        throw new Error('Invalid semester Name / Code')
    }

    const result = await academicSemesterModel.findByIdAndUpdate({ _id: id }, payload, { new: true })
    return result
}

export const academicSemesterServices = {
    createAcademicSemesterIntoDb, getAllSemesterIntoDb, getSingleSemesterFromDb, deleteSemesterFromDb,
    updateSemesterFromDb
}