
import mongoose from "mongoose";
import { StudentModel } from "./student.model";
import AppError from "../../errors/appError";
import { userModel } from "../user/user.model";
import { IStudent } from "./student.interface";



const getAllStudentsFromDb = async () => {
    const result = await StudentModel.find().populate('academicSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    })
    return result
}
const getSingleStudentsFromDb = async (id: string) => {
    const result = await StudentModel.findById({ _id: id }).populate('academicSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    })
    return result
}
const updateStudentsIntoDb = async (id: string, payload: Partial<IStudent>) => {

    const { name, localGurdian, gurdian, ...remainingStudentData } = payload
    const modifiedData: Record<string, unknown> = { remainingStudentData }
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedData[`name.${key}`] = value
        }
    }
    if (gurdian && Object.keys(gurdian).length) {
        for (const [key, value] of Object.entries(gurdian)) {
            modifiedData[`gurdian.${key}`] = value
        }
    }
    if (localGurdian && Object.keys(localGurdian).length) {
        for (const [key, value] of Object.entries(localGurdian)) {
            modifiedData[`localGurdian.${key}`] = value
        }
    }




    const result = await StudentModel.findByIdAndUpdate({ _id: id }, modifiedData, { new: true, runValidators: true })
    return result
}
const deleteStudentsFromDb = async (id: string) => {

    const session = await mongoose.startSession()
    try {
        session.startTransaction()

        const result = await StudentModel.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true, session })
        if (!result) {
            throw new AppError(400, "Failed to Create an user")
        }

        const deletedUser = await userModel.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true, session })
        if (!deletedUser) {
            throw new AppError(400, "Failed to Create an user")
        }

        await session.commitTransaction()
        await session.endSession()
        return result
    }
    catch (err) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(500, "Student creation failed")
    }
}




export const StudentServices = {

    getAllStudentsFromDb,
    getSingleStudentsFromDb, deleteStudentsFromDb,
    updateStudentsIntoDb
}