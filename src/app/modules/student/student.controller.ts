import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from './student.service';
import catchAsyncError from "../../utils/catchAsync";





const getAllStudents =
    catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {


        const result = await StudentServices.getAllStudentsFromDb(req.query)
        res.status(200).json({
            success: true,
            message: "Students info are being retrieved successfully",
            data: result
        })
    })



const getSingleStudent = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    const studentId = req.params.studentId

    const result = await StudentServices.getSingleStudentsFromDb(studentId)

    res.status(200).json({
        success: true,
        message: "Student info retrieved successfully",
        data: result
    })

})


const deleteStudent = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    const studentId = req.params.studentId

    const result = await StudentServices.deleteStudentsFromDb(studentId)

    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        data: result
    })

})

const updateStudent = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {



    const result = await StudentServices.updateStudentsIntoDb(req.params.studentId, req.body.student)

    res.status(200).json({
        success: true,
        message: "student  retrieved successfully",
        data: result
    })

})
export const StudentControllers = {
    getAllStudents, getSingleStudent, deleteStudent, updateStudent
}