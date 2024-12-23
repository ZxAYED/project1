

import catchAsyncError from "../../utils/catchAsync";
import { offeredCourseService } from "./offeredCourse.service";


const createOfferedCourse = catchAsyncError(async (req, res) => {

    const result = await offeredCourseService.createofferedCourseIntoDb(req.body)
    res.status(200).json({
        message: 'Offered Course Creation has been completed',
        success: true,
        data: result
    })
})

const getAllOfferedCourse = catchAsyncError(async (req, res) => {
    const result = await offeredCourseService.getAllofferedCourseFromDb(req.query)
    res.status(200).json({
        success: true,
        message: 'All Offered Course has been retrieved',
        data: result
    })
})

const getSingleOfferedCourse = catchAsyncError(async (req, res) => {
    const result = await offeredCourseService.getSingleCourseFromDb(req.params.id)
    res.status(200).json({
        success: true,
        message: 'Offered Course has been retrieved ',
        data: result
    })
})

const deleteOfferedCourse = catchAsyncError(async (req, res) => {
    const result = offeredCourseService.deleteOfferedCoursefromDb(req.params.id)
    res.status(200).json({
        message: 'Offered Course has been deleted',
        success: true,
        data: result
    })

})

const updateOfferedCourse = catchAsyncError(async (req, res): Promise<void> => {
    const result = offeredCourseService.updateOfferedCourseFromDd(req.params.id, req.body)

    res.status(200).json({
        success: true,
        message: 'Offered Course has been updated successfully',
        data: result
    });

})



export const offeredCourseControllers = {
    createOfferedCourse, getAllOfferedCourse, getSingleOfferedCourse, deleteOfferedCourse, updateOfferedCourse,
}