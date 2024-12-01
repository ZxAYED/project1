import config from "../../config"
import { IStudent } from "../student/student.interface"
import { INewUser } from "./user.interface"
import { userModel } from "./user.model"

const createStudentIntoDB = async (password: string, studentData: IStudent) => {

    // create a user object 


    let user: INewUser = {}
    user.password = password || config.default_pass as string
    user.role = 'student'

    // manually generating id
    user.id = '203010001'



    // creating user 
    const result = await userModel.create(user)
    //  student creation
    if (result.keys(result).length) {
        // set id ,_id as user
        studentData.id = result.id
        studentData.user = result._id

    }




    return result
}
export const userService = {
    createStudentIntoDB
}