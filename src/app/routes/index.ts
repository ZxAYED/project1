import { Router } from "express";
import { userRouter } from './../modules/user/user.router';
import { studentRoutes } from './../modules/student/student.route';
import { acamedicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";

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
]

AllRoutes.forEach((route) => router.use(route.path, route.route))

export default router;