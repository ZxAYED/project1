import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

import { FacultyServices } from './faculty.service';
import { RequestHandler } from 'express';
import catchAsyncError from '../../utils/catchAsync';



const createCourse = catchAsyncError(async (req, res) => {

    const result = await FacultyServices.createFacultyIntoDb(req.body)
    res.status(200).json({
        message: 'Faculty Creation has been completed',
        success: true,
        data: result
    })
})





const getSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(id);

    res.status(200).json({
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is retrieved succesfully',
        data: result,
    });
});

const getAllFaculties = catchAsync(async (req, res) => {

    const result = await FacultyServices.getAllFacultiesFromDB(req.query);

    res.status(200).json({
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculties are retrieved succesfully',
        data: result,
    });
});

const updateFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { faculty } = req.body;
    const result = await FacultyServices.updateFacultyIntoDB(id, faculty);

    res.status(200).json({
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is updated succesfully',
        data: result,
    });
});

const deleteFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacultyServices.deleteFacultyFromDB(id);

    res.status(200).json({
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is deleted succesfully',
        data: result,
    });
});

export const FacultyControllers = {
    getAllFaculties,
    getSingleFaculty,
    deleteFaculty,
    updateFaculty, createCourse
};