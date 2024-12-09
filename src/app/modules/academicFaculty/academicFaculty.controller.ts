import catchAsyncError from "../../utils/catchAsync";
import { academicFacultyServices } from "./academicFaculty.service";


const createAcademicFaculty = catchAsyncError(async (req, res) => {

    const result = await academicFacultyServices.createAcademicFacultyIntoDb(req.body)
    res.status(200).json({
        message: 'Academic Faculty Creation has been completed',
        success: true,
        data: result
    })
})

const getAllFaculty = catchAsyncError(async (req, res) => {
    const result = await academicFacultyServices.getAllFacultiesIntoDb()
    res.status(200).json({
        success: true,
        message: 'All Faculties has been retrieved',
        data: result
    })
})

const getSingleFaculty = catchAsyncError(async (req, res) => {
    const result = await academicFacultyServices.getSingleFacultyFromDb(req.params.id)
    res.status(200).json({
        success: true,
        message: 'Faculty has been retrieved ',
        data: result
    })
})

const deleteFaculty = catchAsyncError(async (req, res) => {
    const result = academicFacultyServices.deleteFacultyFromDb(req.params.id)
    res.status(200).json({
        message: 'Faculty has been deleted',
        success: true,
        data: result
    })

})
const updateFaculty = catchAsyncError(async (req, res) => {
    const result = academicFacultyServices.updateFacultyFromDb(req.params.id, req.body)
    if (!result) {
        return res.status(404).json({
            success: false,
            message: 'Faculty not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Faculty has been updated successfully',
        data: result
    });

})



export const academicFacultyControllers = {
    createAcademicFaculty, getAllFaculty, getSingleFaculty, deleteFaculty, updateFaculty
}