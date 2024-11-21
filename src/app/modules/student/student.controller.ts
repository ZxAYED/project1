import { Request, Response } from "express";
import { StudentServices, getAllStudentsFromDb, getSingleStudentsFromDb } from './student.service';

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
    createStudent, getAllStudents, getSingleStudent
}