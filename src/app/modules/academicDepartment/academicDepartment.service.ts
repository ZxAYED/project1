


import { IAcademicDepartment } from "./academicDepartment.interface";
import { academicDepartmentModel } from "./academicDepartment.model";




const createAcademicDepartmentIntoDb = async (payload: IAcademicDepartment) => {


    const result = await academicDepartmentModel.create(payload)
    return result
}

const getAllDepartmentsIntoDb = (async () => {

    const result = await academicDepartmentModel.find().populate('academicFaculty')
    return result

})

const getSingleDepartmentFromDb = async (id: string) => {
    const result = await academicDepartmentModel.findById({ _id: id }).populate('academicFaculty')
    return result
}

const deleteDepartmentFromDb = async (id: string) => {
    const result = await academicDepartmentModel.findByIdAndDelete({ id })
    return result
}
const updateDepartmentFromDb = async (id: string, payload: Partial<IAcademicDepartment>) => {


    const result = await academicDepartmentModel.findByIdAndUpdate({ _id: id }, payload, { new: true })
    return result
}

export const academicDepartmentServices = {
    createAcademicDepartmentIntoDb, getAllDepartmentsIntoDb, getSingleDepartmentFromDb, deleteDepartmentFromDb,
    updateDepartmentFromDb
}