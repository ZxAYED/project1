
import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import auth from './../../utils/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router()


router.post('/login', validateRequest(authValidation.loginValidation), authController.loginUser)

router.post('/change-password', auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), validateRequest(authValidation.changePasswordValidation), authController.changePassword)

router.post('/refresh-token', validateRequest(authValidation.refreshTokenValidation), authController.refreshToken)

router.post('/forget-password', validateRequest(authValidation.forgotPasswordValidation), authController.forgotPassword)

export const authRoutes = router