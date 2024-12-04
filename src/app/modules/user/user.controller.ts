import { NextFunction, Request, Response } from "express";
import studentValidationSchema from "../student/student.validation";
import { userService } from "./user.service";



const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, student: studentData } = req.body

        // const zodParsedData = studentValidationSchema.parse({ password, ...studentData })
        if (!password) {
            throw new Error("Password is required");
        }
        if (!studentData.email) {
            throw new Error("Email is required and cannot be null");
        }
        // console.log("Creating student with data:", studentData, password);

        const result = await userService.createStudentIntoDB(password, studentData)

        res.status(200).json({
            success: true,
            message: "student is created successfully",
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}
export const userController = {
    createStudent
}