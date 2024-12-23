
import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { offeredCourseValidation } from './offeredCourse.validation';
import { offeredCourseControllers } from './offeredCourse.controller';



const router = express.Router()

router.post('/', validateRequest(offeredCourseValidation.createOfferedCourseValidationSchema), offeredCourseControllers.createOfferedCourse)

router.get('/', offeredCourseControllers.getAllOfferedCourse)
router.get('/:id', offeredCourseControllers.getSingleOfferedCourse)

router.patch('/:id', validateRequest(offeredCourseValidation.updateOfferedCourseValidationSchema), offeredCourseControllers.updateOfferedCourse)
router.delete('/:id', offeredCourseControllers.deleteOfferedCourse)



export const offeredCourseRoutes = router