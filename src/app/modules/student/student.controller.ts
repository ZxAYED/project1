import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from './student.service';
import catchAsyncError from "../../utils/catchAsync";





const getAllStudents = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const result = await StudentServices.getAllStudentsFromDb()
    res.status(200).json({
        success: true,
        message: "student are retrieved successfully",
        data: result
    })
})



const getSingleStudent = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    const studentId = req.params.studentId

    const result = await StudentServices.getSingleStudentsFromDb(studentId)

    res.status(200).json({
        success: true,
        message: "student  retrieved successfully",
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


export const StundentControllers = {
    getAllStudents, getSingleStudent, deleteStudent
}