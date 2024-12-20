import express from "express";
import { userController } from "./user.controller";

import { studentValidations } from "../student/student.validation";
import validateRequest from "../../utils/validateRequest";

const router = express.Router()




router.post('/create-student',
    validateRequest(studentValidations.createStudentValidationSchema),
    userController.createStudent)

export const userRouter = router