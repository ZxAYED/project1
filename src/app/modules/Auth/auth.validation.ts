import { z } from 'zod'

const loginValidation = z.object({
    body: z.object({
        id: z.string({ required_error: 'Id is required' }),
        password: z.string({ required_error: 'Password is required' })
    })
})
const changePasswordValidation = z.object({
    body: z.object({
        oldPassword: z.string({ required_error: 'Old password is required' }),

        newPassword: z.string({ required_error: 'Password is required' })
    })
})
const forgotPasswordValidation = z.object({
    body: z.object({
        id: z.string({ required_error: 'User Id is required' })
    })
})
const refreshTokenValidation = z.object({
    cookies: z.object({
        refreshToken: z.string({ required_error: 'Refresh Token  is required' })
    })
})


export const authValidation = {
    loginValidation, changePasswordValidation,
    forgotPasswordValidation,
    refreshTokenValidation
}