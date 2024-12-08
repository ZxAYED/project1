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

    const lastId = LastStudent?.id ? LastStudent.id.substring(6) : undefined;


    return lastId;
};

export const generateStudentId = async (payload: IAcademicSemester) => {
    const currentId = await findLastStudentId();
    const numericCurrentId = isNaN(Number(currentId)) ? 0 : Number(currentId);

    let incrementId = (numericCurrentId + 1).toString().padStart(4, '0');

    incrementId = `${payload.year}${payload.code}${incrementId}`;
    console.log(`Increment ID: ${incrementId}`);
    return incrementId;
};
