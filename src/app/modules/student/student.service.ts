
import mongoose from "mongoose";
import { StudentModel } from "./student.model";
import AppError from "../../errors/appError";
import { userModel } from "../user/user.model";
import { IStudent } from "./student.interface";
import QueryBuilder from "../../builder/QueryBuilder";



const getAllStudentsFromDb = async (query: Record<string, unknown>) => {

    //     //  const { searchTerm = '', email = '' } = query as { searchTerm?: string; email?: string}
    //     //  const queryCondition: any = { ...(searchTerm && { $or: ['email', 'id', 'name.firstName', 'contactNo', 'presentAddress'].map((field) => ({ [field]: { $regex: searchTerm, $options: 'i' } })) }), ...(email && { email })


    // let searchTerm = ''
    // if (query?.searchTerm) {
    //     searchTerm = query.searchTerm as string
    // }
    // const queryObject = { ...query }

    const studentSearchableField = ['name.firstName', 'name.middleName', 'name.lastName', 'email', 'presentAddress', 'contactNo', 'id']

    // // cant use await  so that eitar load er jonne boshe thaka lagbe jeta dorkar nai eita poreo call hoitese

    // const queryFinder = StudentModel.find(searchTerm ? {
    //     $or: studentSearchableField.map((field) => ({
    //         [field]: { $regex: searchTerm, $options: 'i' }
    //     }))
    // } : {})

    // //  i have done the work of searchTerm in queryFinder thats y i removed the searchTerm and i will do sorting later i will do only email search r8 now thats y i query with email removed sort also .

    // const excludeFields = ['searchTerm', 'sort', 'limit', 'page',]
    // excludeFields.forEach(i => delete queryObject[i])

    // const populateQuery = queryFinder.find(queryObject).populate('academicSemester').populate({
    //     path: 'academicDepartment',
    //     populate: {
    //         path: 'academicFaculty'
    //     }
    // })



    // let sort = '-createdAt'
    // if (query.sort) {
    //     sort = query.sort as string
    // }
    // const sortedQuery = populateQuery.sort(sort)



    // let page = 1
    // let limit = 1
    // let skip = 0
    // if (query.limit) {
    //     limit = Number(query.limit)
    // }
    // if (query.page) {
    //     page = Number(query.page)
    //     skip = (page - 1) * limit
    // }
    // const paginateQuery = sortedQuery.skip(skip)



    // let field = '-__V'
    // if (query.field) {
    //     field = (query.field as string).split(',').join(' ')
    // }
    // const fieldQuery = paginateQuery.select(field)


    // const result = await fieldQuery.limit(limit)

    // return result


    const studentQuery = new QueryBuilder(StudentModel.find().populate('academicSemester').populate('user').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    })
        , query).search(studentSearchableField).filter().sort().paginate().fields()

    const result = await studentQuery.QueryModel
    return result

}
const getSingleStudentsFromDb = async (studentId: string) => {
    const result = await StudentModel.findById(studentId).populate('academicSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    })
    return result
}

const updateStudentsIntoDb = async (id: string, payload: Partial<IStudent>) => {

    const { name, localGurdian, gurdian, ...remainingStudentData } = payload

    const modifiedData: Record<string, unknown> = { remainingStudentData }

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedData[`name.${key}`] = value
        }
    }
    if (gurdian && Object.keys(gurdian).length) {
        for (const [key, value] of Object.entries(gurdian)) {
            modifiedData[`gurdian.${key}`] = value
        }
    }
    if (localGurdian && Object.keys(localGurdian).length) {
        for (const [key, value] of Object.entries(localGurdian)) {
            modifiedData[`localGurdian.${key}`] = value
        }
    }




    const result = await StudentModel.findByIdAndUpdate({ _id: id }, modifiedData, { new: true, runValidators: true })
    return result
}
const deleteStudentsFromDb = async (id: string) => {

    const session = await mongoose.startSession()
    try {
        session.startTransaction()

        const result = await StudentModel.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true, session })
        if (!result) {
            throw new AppError(400, "Failed to Create an user")
        }

        const deletedUser = await userModel.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true, session })
        if (!deletedUser) {
            throw new AppError(400, "Failed to Create an user")
        }

        await session.commitTransaction()
        await session.endSession()
        return result
    }
    catch (err) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(500, "Student creation failed")
    }
}




export const StudentServices = {

    getAllStudentsFromDb,
    getSingleStudentsFromDb, deleteStudentsFromDb,
    updateStudentsIntoDb
}