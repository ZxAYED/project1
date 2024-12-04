
import { StudentModel } from "./student.model";



const getAllStudentsFromDb = async () => {
    const result = await StudentModel.find()
    return result
}
const getSingleStudentsFromDb = async (id: string) => {
    const result = await StudentModel.findOne({ id })
    return result
}
const deleteStudentsFromDb = async (id: string) => {
    const result = await StudentModel.updateOne({ id }, { isDeleted: true })
    return result
}




export const StudentServices = {

    getAllStudentsFromDb,
    getSingleStudentsFromDb, deleteStudentsFromDb
}