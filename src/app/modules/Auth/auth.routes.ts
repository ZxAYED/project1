
import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import auth from './../../utils/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router()


router.post('/login', validateRequest(authValidation.loginValidation), authController.loginUser)

router.post('/change-password', auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), validateRequest(authValidation.changePasswordValidation), authController.changePassword)

export const authRoutes = router