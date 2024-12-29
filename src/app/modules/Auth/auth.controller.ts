import config from "../../config";
import catchAsyncError from "../../utils/catchAsync";
import { authService } from "./auth.service";

const loginUser = catchAsyncError(async (req, res) => {
    const result = await authService.loginUserIntoDb(req.body)
    const { refreshToken, accessToken, needPasswordChange } = result

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        messsage: "User logged in successfully",
        data: {
            accessToken, needPasswordChange
        }
    })
})

const changePassword = catchAsyncError(async (req, res) => {

    const result = await authService.changePasswordIntoDB(req.user, req.body);

    res.status(200).json({
        success: true,
        message: 'Password has been changed succesfully',
        data: result
    })

});
const refreshToken = catchAsyncError(async (req, res) => {
    const { refreshToken } = req.cookies
    const result = await authService.refreshToken(refreshToken)


    res.status(200).json({
        success: true,
        messsage: "Refresh Token created successfully",
        data: result
    })

});
const forgotPassword = catchAsyncError(async (req, res) => {

    const result = await authService.changePasswordIntoDB(req.user, req.body);

    res.status(200).json({
        success: true,
        message: 'Password has been changed succesfully',
        data: result
    })

});
export const authController = {
    loginUser, changePassword, forgotPassword, refreshToken
}