
import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { semesterRegistrationValidation } from './semester.validation';
import { semesterController } from './semester.controller';



const router = express.Router()

router.post('/', validateRequest(semesterRegistrationValidation.createSemesterRegistrationValidationSchema), semesterController.createSemesterRegistration)

router.get('/', semesterController.getAllsemesterRegistration)
router.get('/:id', semesterController.getSinglesemesterRegistration)
router.patch('/:id', semesterController.updatesemesterRegistration)




export const semesterRoutes = router