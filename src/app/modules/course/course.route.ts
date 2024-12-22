import express from 'express';
import validateRequest from '../../utils/validateRequest';


import { courseControllers } from './course.controller';
import { courseValidationSchema } from './course.validation';

const router = express.Router();

router.get('/', courseControllers.getAllCourse);
router.get('/:id', courseControllers.getSingleCourse);

router.post('/', validateRequest(courseValidationSchema.createCourseValidationSchema), courseControllers.createCourse);

router.patch(
    '/:id/assign-faculties',
    validateRequest(courseValidationSchema.updateCourseValidationSchema),
    courseControllers.updateCourse,
);
router.delete(
    '/:id/remove-faculties',
    validateRequest(courseValidationSchema.updateCourseValidationSchema),
    courseControllers.removeFacultiesWithCourse,
);
router.put(
    '/:id',
    validateRequest(courseValidationSchema.updateCourseFacultyValidationSchema),
    courseControllers.assginFacultiesWithCourse,
);

router.delete('/:id', courseControllers.deleteCourse);



export const courseRoutes = router;