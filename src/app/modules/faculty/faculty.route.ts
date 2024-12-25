import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { facultyValidations } from './faculty.validation';
import auth from '../../utils/auth';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.post('/', validateRequest(facultyValidations.createFacultyValidationSchema), FacultyControllers.createCourse);

router.patch(
    '/:id',
    validateRequest(facultyValidations.updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', auth(), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;