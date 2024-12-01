import { Request, Response } from "express";
import { StudentServices } from './student.service';
import studentValidationSchema from "./student.validation";





const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDb()

        res.status(200).json({
            success: true,
            message: "student are retrieved successfully",
            data: result
        })
    }
    catch (error) {
        console.log(error);
    }
}
const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const studentId = req.params.studentId

        const result = await StudentServices.getSingleStudentsFromDb(studentId)

        res.status(200).json({
            success: true,
            message: "student are retrieved successfully",
            data: result
        })
    }
    catch (error) {
        console.log(error);
    }
}


export const StundentControllers = {
    getAllStudents, getSingleStudent
}