import express from "express";
import { userController } from "./user.controller";

import { studentValidations } from "../student/student.validation";
import validateRequest from "../../utils/validateRequest";
import { createAdminValidationSchema } from "../admin/admin.validation";
import auth from "../../utils/auth";
import { USER_ROLE } from "./user.constant";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";

const router = express.Router()




router.post('/create-student', auth(USER_ROLE.admin),
    validateRequest(studentValidations.createStudentValidationSchema),
    userController.createStudent)

router.post(
    '/create-faculty', auth(USER_ROLE.admin),
    auth(USER_ROLE.admin),
    validateRequest(createFacultyValidationSchema),
    userController.createFaculty,
);

router.post(
    '/create-admin',
    //  auth(USER_ROLE.admin),
    validateRequest(createAdminValidationSchema),
    userController.createAdmin,
);

export const userRouter = router