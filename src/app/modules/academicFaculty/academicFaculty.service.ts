


import { IAcademicFaculty } from "./academicFaculty.interface";
import { academicFacultyModel } from "./academicFaculty.model";




const createAcademicFacultyIntoDb = async (payload: IAcademicFaculty) => {

    const result = await academicFacultyModel.create(payload)
    return result
}

const getAllFacultiesIntoDb = (async () => {

    const result = await academicFacultyModel.find()
    return result

})

const getSingleFacultyFromDb = async (id: string) => {
    const result = await academicFacultyModel.findById({ _id: id })
    return result
}

const deleteFacultyFromDb = async (id: string) => {
    const result = await academicFacultyModel.findByIdAndDelete({ id })
    return result
}
const updateFacultyFromDb = async (id: string, payload: Partial<IAcademicFaculty>) => {


    const result = await academicFacultyModel.findByIdAndUpdate({ _id: id }, payload, { new: true })
    return result
}

export const academicFacultyServices = {
    createAcademicFacultyIntoDb, getAllFacultiesIntoDb, getSingleFacultyFromDb, deleteFacultyFromDb,
    updateFacultyFromDb
}