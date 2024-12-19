import { Router } from "express";
import { userRouter } from './../modules/user/user.router';
import { studentRoutes } from './../modules/student/student.route';
import { acamedicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { acamedicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.router";
import { acamedicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.router";
import { courseRoutes } from "../modules/course/course.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";

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
    {
        path: '/course',
        route: courseRoutes,
    },
    {
        path: '/faculties',
        route: FacultyRoutes,
    },
]

AllRoutes.forEach((route) => router.use(route.path, route.route))

export default router;