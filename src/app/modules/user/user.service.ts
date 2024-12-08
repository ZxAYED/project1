import config from "../../config"
import { IAcademicSemester } from "../academicSemester/academicSemester.interface"
import { academicSemesterModel } from "../academicSemester/academicSemester.model"
import { IStudent } from "../student/student.interface"
import { StudentModel } from "../student/student.model"
import { TUser } from "./user.interface"
import { userModel } from "./user.model"
import { generateStudentId } from "./user.utils"






const createStudentIntoDB = async (password: string, studentData: IStudent) => {

    // create a user object 
    let userData: Partial<TUser> = {}
    userData.password = password || config.default_pass as string
    userData.role = 'student'

    userData.email = studentData.email

    // generating id

    const admissionSemester = await academicSemesterModel.findById(studentData.admissionSemester)

    userData.id = await generateStudentId(admissionSemester)


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