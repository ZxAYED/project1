
import express from 'express';

import { academicFacultyControllers } from './academicFaculty.controller';
import validateRequest from '../../utils/validateRequest';
import { academicFacultyValidaiton } from './academicFaculty.validation';


const router = express.Router()

// validateRequest(academicFacultyValidationSchema.createAcademicFacultyValidationSchema), 

router.post('/create-faculty', validateRequest(academicFacultyValidaiton.createAcademicFacultyValidaiton), academicFacultyControllers.createAcademicFaculty)

router.get('/', academicFacultyControllers.getAllFaculty)

router.get('/:id', academicFacultyControllers.getSingleFaculty)

router.delete('/:id', academicFacultyControllers.deleteFaculty)


router.patch('/:id', validateRequest(academicFacultyValidaiton.updateAcademicFacultyValidaiton), academicFacultyControllers.updateFaculty)



export const acamedicFacultyRoutes = router