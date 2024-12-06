import catchAsyncError from "../../utils/catchAsync";
import { academicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsyncError(async (req, res) => {

    const result = await academicSemesterServices.createAcademicSemesterIntoDb(req.body)
    res.status(200).json({
        message: 'Academic Semester Creation has been completed',
        success: true,
        data: result
    })
})

const getAllSemester = catchAsyncError(async (req, res) => {
    const result = await academicSemesterServices.getAllSemesterIntoDb()
    res.status(200).json({
        success: true,
        message: 'All semester has been retrieved',
        data: result
    })
})

const getSingleSemester = catchAsyncError(async (req, res) => {
    const result = await academicSemesterServices.getSingleSemesterFromDb(req.params.id)
    res.status(200).json({
        success: true,
        message: 'Semester has been retrieved ',
        data: result
    })
})

const deleteSemester = catchAsyncError(async (req, res) => {
    const result = academicSemesterServices.deleteSemesterFromDb(req.params.id)
    res.status(200).json({
        message: 'Semester has been deleted',
        success: true,
        data: result
    })

})
const updateSemester = catchAsyncError(async (req, res) => {
    const result = academicSemesterServices.updateSemesterFromDb(req.params.id, req.body)
    if (!result) {
        return res.status(404).json({
            success: false,
            message: 'Semester not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Semester updated successfully',
        data: result
    });

})



export const academicSemesterControllers = {
    createAcademicSemester, getAllSemester, getSingleSemester, deleteSemester, updateSemester
}