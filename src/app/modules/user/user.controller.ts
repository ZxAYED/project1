import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import catchAsyncError from "../../utils/catchAsync";
import AppError from "../../errors/appError";






const createStudent = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    console.log('user controller');
    const { password, student: studentData } = req.body

    // const zodParsedData = studentValidationSchema.parse({ password, ...studentData })
    if (!password) {
        throw new AppError(400, "Password is required");
    }
    if (!studentData.email) {
        throw new AppError(400, "Email is required and cannot be null");
    }
    // console.log("Creating student with data:", studentData, password);

    const result = await userService.createStudentIntoDB(password, studentData)

    res.status(200).json({
        success: true,
        message: "student is created successfully",
        data: result
    })
}
)


export const userController = {
    createStudent
}