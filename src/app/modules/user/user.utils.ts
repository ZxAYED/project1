import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { userModel } from './user.model';

const findLastStudentId = async () => {
    const LastStudent = await userModel.findOne({
        role: 'student'
    }, {
        id: 1
    }).sort({
        createdAt: -1
    }).lean();

    const lastId = LastStudent?.id ? LastStudent.id : undefined;


    return lastId;
};

export const generateStudentId = async (payload: IAcademicSemester) => {
    const fullCurrentId = await findLastStudentId();
    let currentId = (0).toString
    const currentIdSemesterCode = fullCurrentId?.substring(4, 6)
    const currentIdYear = fullCurrentId?.substring(0, 4)


    if (fullCurrentId && currentIdSemesterCode === payload.code && currentIdYear === payload.year) {
        currentId = fullCurrentId.substring(6)

    }

    const numericCurrentId = isNaN(Number(currentId)) ? 0 : Number(currentId);


    let incrementId = (numericCurrentId + 1).toString().padStart(4, '0');

    incrementId = `${payload.year}${payload.code}${incrementId}`;

    return incrementId;
};


export const findLastFacultyId = async () => {
    const lastFaculty = await userModel.findOne(
        {
            role: 'faculty',
        },
        {
            id: 1,
            _id: 0,
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
    let currentId = (0).toString();
    const lastFacultyId = await findLastFacultyId();

    if (lastFacultyId) {
        currentId = lastFacultyId.substring(2);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `F-${incrementId}`;

    return incrementId;
};


export const findLastAdminId = async () => {
    const lastAdmin = await userModel.findOne(
        {
            role: 'admin',
        },
        {
            id: 1,
            _id: 0,
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
    let currentId = (0).toString();
    const lastAdminId = await findLastAdminId();

    if (lastAdminId) {
        currentId = lastAdminId.substring(2);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `A-${incrementId}`;
    return incrementId;
};