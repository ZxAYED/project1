import catchAsyncError from "../../utils/catchAsync";
import { authService } from "./auth.service";

const loginUser = catchAsyncError(async (req, res) => {
    const result = await authService.loginUserIntoDb(req.body)

    res.status(200).json({
        success: true,
        messsage: "User logged in successfully",
        data: result
    })
})

export const authController = {
    loginUser
}