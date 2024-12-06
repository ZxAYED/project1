
import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../utils/validateRequest';
import academicSemesterValidationSchema from './academicSemester.validation';

const router = express.Router()

router.post('/create-semester', validateRequest(academicSemesterValidationSchema), academicSemesterControllers.createAcademicSemester)


export const acamedicSemesterRouter = router
