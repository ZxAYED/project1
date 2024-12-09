
import { StudentModel } from "./student.model";



const getAllStudentsFromDb = async () => {
    const result = await StudentModel.find()
    return result
}
const getSingleStudentsFromDb = async (id: string) => {
    const result = await StudentModel.findById({ _id: id })
    return result
}
const deleteStudentsFromDb = async (id: string) => {
    const result = await StudentModel.updateOne({ _id: id }, { isDeleted: true })
    return result
}




export const StudentServices = {

    getAllStudentsFromDb,
    getSingleStudentsFromDb, deleteStudentsFromDb
}