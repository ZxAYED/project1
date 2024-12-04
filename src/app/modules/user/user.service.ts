import config from "../../config"
import { IStudent } from "../student/student.interface"
import { StudentModel } from "../student/student.model"
import { TUser } from "./user.interface"

import { userModel } from "./user.model"

const createStudentIntoDB = async (password: string, studentData: IStudent) => {

    // create a user object 


    let userData: Partial<TUser> = {}
    userData.password = password || config.default_pass as string
    userData.role = 'student'
    userData.id = studentData.id
    userData.email = studentData.email
    // manually generating id




    // creating user 
    const newUser = await userModel.create(userData)
    if (Object.keys(newUser).length) {
        // set id ,_id as user
        studentData.id = newUser.id
        studentData.user = newUser._id // reference id

    }
    //  student creation
    const newStudent = await StudentModel.create(studentData)
    return newStudent

}
export const userService = {
    createStudentIntoDB
}