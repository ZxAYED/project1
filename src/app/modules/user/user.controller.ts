import studentValidationSchema from "../student/student.validation";
import { userService } from "./user.service";



const createStudent = async (req: Request, res: Response) => {
    try {
        const { password, student: studentData } = req.body

        const zodParsedData = studentValidationSchema.parse(studentData)


        // calling data from service
        const result = await userService.createStudentIntoDB(password, studentData)

        res.status(200).json({
            success: true,
            message: "student is created successfully",
            data: result
        })
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: "Error  while creating  a student ",
            data: error
        })
    }
}
export const userController = {
    createStudent
}