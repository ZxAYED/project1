
import { RequestHandler } from "express";
import catchAsyncError from "../../utils/catchAsync";
import { courseService } from "./course.service";


const createCourse = catchAsyncError(async (req, res) => {

    const result = await courseService.createCourseIntoDb(req.body)
    res.status(200).json({
        message: 'Course Creation has been completed',
        success: true,
        data: result
    })
})

const getAllCourse = catchAsyncError(async (req, res) => {
    const result = await courseService.getAllCoursesFromDb(req.query)
    res.status(200).json({
        success: true,
        message: 'All course has been retrieved',
        data: result
    })
})

const getSingleCourse = catchAsyncError(async (req, res) => {
    const result = await courseService.getSingleCourseFromDb(req.params.id)
    res.status(200).json({
        success: true,
        message: 'Course has been retrieved ',
        data: result
    })
})

const deleteCourse = catchAsyncError(async (req, res) => {
    const result = courseService.deleteCoursefromDb(req.params.id)
    res.status(200).json({
        message: 'Course has been deleted',
        success: true,
        data: result
    })

})
const assginFacultiesWithCourse = catchAsyncError(async (req, res) => {
    console.log(req.body, req.params.id);
    const result = courseService.assignFacultiesWithCourseIntoDb(req.params.id, req.body.faculties)
    res.status(200).json({
        message: 'Course has been deleted',
        success: true,
        data: result
    })

})
const removeFacultiesWithCourse = catchAsyncError(async (req, res) => {
    console.log(req.body, req.params.id);
    const result = courseService.removeFacultiesWithCourseIntoDb(req.params.id, req.body.faculties)
    res.status(200).json({
        message: 'Course has been deleted',
        success: true,
        data: result
    })

})
const updateCourse = catchAsyncError(async (req, res): Promise<void> => {
    const result = courseService.updateCourseFromDd(req.params.id, req.body)
    if (!result) {
        res.status(404).json({
            success: false,
            message: 'Course not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Course has been updated successfully',
        data: result
    });

})



export const courseControllers = {
    createCourse, getAllCourse, getSingleCourse, deleteCourse, updateCourse, assginFacultiesWithCourse, removeFacultiesWithCourse
}