
import express from 'express';

import { academicDepartmentControllers } from './academicDepartment.controller';
import validateRequest from '../../utils/validateRequest';
import { academicDepartmentValidaiton } from './academicDepartment.validation';


const router = express.Router()

// validateRequest(academicDepartmentValidationSchema.createAcademicDepartmentValidationSchema), 

router.post('/create-department', validateRequest(academicDepartmentValidaiton.createAcademicDepartmentValidaiton), academicDepartmentControllers.createAcademicDepartment)

router.get('/', academicDepartmentControllers.getAllDepartment)

router.get('/:id', academicDepartmentControllers.getSingleDepartment)

router.delete('/:id', academicDepartmentControllers.deleteDepartment)


router.patch('/:id', validateRequest(academicDepartmentValidaiton.updateAcademicDepartmentValidaiton), academicDepartmentControllers.updateDepartment)



export const acamedicDepartmentRoutes = router