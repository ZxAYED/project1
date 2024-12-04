import { NextFunction, Request, Response } from "express";
import { StudentServices } from './student.service';





const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await StudentServices.getAllStudentsFromDb()

        res.status(200).json({
            success: true,
            message: "student are retrieved successfully",
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}
const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.params.studentId

        const result = await StudentServices.getSingleStudentsFromDb(studentId)

        res.status(200).json({
            success: true,
            message: "student  retrieved successfully",
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}
const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.params.studentId

        const result = await StudentServices.deleteStudentsFromDb(studentId)

        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}


export const StundentControllers = {
    getAllStudents, getSingleStudent, deleteStudent
}