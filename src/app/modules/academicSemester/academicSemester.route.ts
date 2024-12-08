
import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../utils/validateRequest';
import { academicSemesterValidationSchema } from './academicSemester.validation';

const router = express.Router()

router.post('/create-semester', validateRequest(academicSemesterValidationSchema.createAcademicSemesterValidationSchema), academicSemesterControllers.createAcademicSemester)

router.get('/', academicSemesterControllers.getAllSemester)

router.get('/:id', academicSemesterControllers.getSingleSemester)

router.delete('/:id', academicSemesterControllers.deleteSemester)


router.patch('/:id', validateRequest(academicSemesterValidationSchema.updateAcademicSemesterValidationSchema), academicSemesterControllers.updateSemester)



export const acamedicSemesterRoutes = router
