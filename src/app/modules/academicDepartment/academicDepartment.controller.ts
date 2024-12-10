import catchAsyncError from "../../utils/catchAsync";
import { academicDepartmentServices } from "./academicDepartment.service";


const createAcademicDepartment = catchAsyncError(async (req, res) => {


    const result = await academicDepartmentServices.createAcademicDepartmentIntoDb(req.body)
    res.status(200).json({
        message: 'Academic Department Creation has been completed',
        success: true,
        data: result
    })
})

const getAllDepartment = catchAsyncError(async (req, res) => {
    const result = await academicDepartmentServices.getAllDepartmentsIntoDb()
    res.status(200).json({
        success: true,
        message: 'All Departments has been retrieved',
        data: result
    })
})

const getSingleDepartment = catchAsyncError(async (req, res) => {
    const result = await academicDepartmentServices.getSingleDepartmentFromDb(req.params.id)
    res.status(200).json({
        success: true,
        message: 'Department has been retrieved ',
        data: result
    })
})

const deleteDepartment = catchAsyncError(async (req, res) => {
    const result = academicDepartmentServices.deleteDepartmentFromDb(req.params.id)
    res.status(200).json({
        message: 'Department has been deleted',
        success: true,
        data: result
    })

})
const updateDepartment = catchAsyncError(async (req, res) => {
    const result = academicDepartmentServices.updateDepartmentFromDb(req.params.id, req.body)
    if (!result) {
        return res.status(404).json({
            success: false,
            message: 'Department not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Department has been updated successfully',
        data: result
    });

})



export const academicDepartmentControllers = {
    createAcademicDepartment, getAllDepartment, getSingleDepartment, deleteDepartment, updateDepartment
}