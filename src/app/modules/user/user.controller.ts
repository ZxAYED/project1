import { userService } from "./user.service";



const createStudent = async (req: Request, res: Response) => {
    try {
        const { password: string, student: studentData } = req.body

        // const zodParsedData = studentValidationSchema.parse(studentData)


        // calling data from service
        const result = await userService.createStudentIntoDB(password, studentData)

        res.status(200).json({
            success: true,
            message: "student is created successfully",
            data: result
        })
    }
    catch (error) {
        console.log(error);
    }
}