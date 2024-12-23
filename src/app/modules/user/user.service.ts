import config from "../../config"
import { academicSemesterModel } from "../academicSemester/academicSemester.model"
import { IStudent } from "../student/student.interface"
import { StudentModel } from "../student/student.model"
import { TUser } from "./user.interface"
import { userModel } from "./user.model"
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils"
import AppError from "../../errors/appError"
import mongoose from "mongoose"
import { academicDepartmentModel } from "../academicDepartment/academicDepartment.model"
import { TFaculty } from "../faculty/faculty.interface"
import { facultyModel } from "../faculty/faculty.model"
import { TAdmin } from "../admin/admin.interface"
import { Admin } from "../admin/admin.model"


const createStudentIntoDB = async (password: string, studentData: IStudent) => {

    // create a user object 
    let userData: Partial<TUser> = {}
    userData.password = password || config.default_pass as string
    userData.role = 'student'

    userData.email = studentData.email

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        const academicSemester = await academicSemesterModel.findById(studentData.academicSemester)

        userData.id = await generateStudentId(academicSemester)



        const newUser = await userModel.create([userData], { session })

        if (!newUser.length) {
            throw new AppError(400, "Failed to Create an user")
        }

        // set id ,_id as user
        studentData.id = newUser[0].id
        studentData.user = newUser[0]._id // reference id


        //  student creation transection 2
        const newStudent = await StudentModel.create([studentData], { session })

        if (!newStudent.length) {

            throw new AppError(400, "Failed to Create an user")
        }
        await session.commitTransaction()
        session.endSession()
        return newStudent

    }
    catch (err) {
        await session.abortTransaction()
        session.endSession()
        throw new AppError(500, "Creation failed at user service")
    }

}

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {

    const userData: Partial<TUser> = {};


    userData.password = password || (config.default_pass as string);


    userData.role = 'faculty';

    const academicDepartment = await academicDepartmentModel.findById(
        payload.academicDepartment,
    );

    if (!academicDepartment) {
        throw new AppError(400, 'Academic department not found');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        userData.id = await generateFacultyId();

        // create a user (transaction-1)
        const newUser = await userModel.create([userData], { session }); // array


        if (!newUser.length) {
            throw new AppError(400, 'Failed to create user');
        }

        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;



        const newFaculty = await facultyModel.create([payload], { session });

        if (!newFaculty.length) {
            throw new AppError(400, 'Failed to create faculty');
        }

        await session.commitTransaction();
        await session.endSession();

        return newFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {

    const userData: Partial<TUser> = {};


    userData.password = password || (config.default_pass as string);

    //set user role
    userData.role = 'admin';

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateAdminId();

        // create a user (transaction-1)
        const newUser = await userModel.create([userData], { session });

        //create a admin
        if (!newUser.length) {
            throw new AppError(400, 'Failed to create admin');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a admin (transaction-2)
        const newAdmin = await Admin.create([payload], { session });

        if (!newAdmin.length) {
            throw new AppError(400, 'Failed to create admin');
        }

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};
export const userService = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB,
}

