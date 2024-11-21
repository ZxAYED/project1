import { Request, Response } from "express";
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
    try {
        const { student: studentData } = req.body

        // calling data from service
        const result = await StudentServices.createStudentIntoDB(studentData)

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
export const StundentControllers = {
    createStudent
}