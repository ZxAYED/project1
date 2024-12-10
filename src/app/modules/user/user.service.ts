import mongoose from "mongoose"
import config from "../../config"
import { IAcademicSemester } from "../academicSemester/academicSemester.interface"
import { academicSemesterModel } from "../academicSemester/academicSemester.model"
import { IStudent } from "../student/student.interface"
import { StudentModel } from "../student/student.model"
import { TUser } from "./user.interface"
import { userModel } from "./user.model"
import { generateStudentId } from "./user.utils"
import AppError from "../../errors/appError"






const createStudentIntoDB = async (password: string, studentData: IStudent) => {

    // create a user object 
    let userData: Partial<TUser> = {}
    userData.password = password || config.default_pass as string
    userData.role = 'student'

    userData.email = studentData.email

    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const admissionSemester = await academicSemesterModel.findById(studentData.academicSemester)

        userData.id = await generateStudentId(admissionSemester)


        // creating user 
        const newUser = await userModel.create([userData], { session })
        if (!newUser.length) {
            throw new AppError(400, "Failed to Create an user")
        }

        // set id ,_id as user
        studentData.id = newUser[0].id
        studentData.user = newUser[0]._id // reference id


        //  student creation transection 2
        const newStudent = await StudentModel.create([studentData], { session })
        if (!newStudent.length) {

            throw new AppError(400, "Failed to Create an user")
        }
        await session.commitTransaction()
        session.endSession()
        return newStudent
    }
    catch (err) {
        await session.abortTransaction()
        session.endSession()
    }

}
export const userService = {
    createStudentIntoDB
}

