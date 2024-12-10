import { Router } from "express";
import { userRouter } from './../modules/user/user.router';
import { studentRoutes } from './../modules/student/student.route';
import { acamedicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { acamedicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.router";
import { acamedicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.router";

const router = Router()

const AllRoutes = [
    {
        path: '/students',
        route: studentRoutes
    },
    {
        path: '/users',
        route: userRouter
    },
    {
        path: '/academic-semesters',
        route: acamedicSemesterRoutes
    },
    {
        path: '/academic-faculties',
        route: acamedicFacultyRoutes
    },
    {
        path: '/academic-department',
        route: acamedicDepartmentRoutes
    },
]

AllRoutes.forEach((route) => router.use(route.path, route.route))

export default router;