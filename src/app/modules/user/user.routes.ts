import express from "express";
import { userController } from "./user.controller";

import { studentValidations } from "../student/student.validation";
import validateRequest from "../../utils/validateRequest";
import { createAdminValidationSchema } from "../admin/admin.validation";

const router = express.Router()




router.post('/create-student',
    validateRequest(studentValidations.createStudentValidationSchema),
    userController.createStudent)

// router.post(
//     '/create-faculty',
//     auth(USER_ROLE.admin),
//     validateRequest(createFacultyValidationSchema),
//     UserControllers.createFaculty,
// );

router.post(
    '/create-admin',
    validateRequest(createAdminValidationSchema),
    userController.createAdmin,
);

export const userRouter = router