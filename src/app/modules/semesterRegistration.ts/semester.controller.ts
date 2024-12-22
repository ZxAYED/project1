import catchAsyncError from "../../utils/catchAsync";
import { semesterService } from "./semester.service";

const createSemesterRegistration = catchAsyncError(async (req, res) => {
    console.log(req.body);
    const result = await semesterService.createSemesterIntoDb(req.body)

    res.status(200).json({
        message: "Semester Registration has been completed",
        success: true,
        data: result

    })
})


const getAllsemesterRegistration = catchAsyncError(async (req, res) => {

    const result = await semesterService.getAllsemesterRegistrationFromDb(req.query)
    res.status(200).json({
        message: "All Semester Registration fetched Successfully",
        success: true,
        data: result

    })

})
const getSinglesemesterRegistration = catchAsyncError(async (req, res) => {

    const result = await semesterService.getSingelSemesterRegistrationFromDb(req.params.id)
    res.status(200).json({
        message: " Semester Registration fetched Successfully",
        success: true,
        data: result

    })

})
const updatesemesterRegistration = catchAsyncError(async (req, res) => {

    const result = await semesterService.updaeSemesterRegistrationFromDb(req.params.id, req.body)
    res.status(200).json({
        message: " Semester Registration updated Successfully",
        success: true,
        data: result

    })

})

export const semesterController = {
    createSemesterRegistration,
    getSinglesemesterRegistration,
    getAllsemesterRegistration,
    updatesemesterRegistration
}