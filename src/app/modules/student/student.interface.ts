import { Schema, model, connect, ObjectId, Types } from 'mongoose';

export interface UserName {
    firstName: string
    middleName?: string
    lastName: string
}

export interface Gurdian {
    fatherName: string
    fatherOccupation: string
    fatherContactNo: string
    motherName: string
    motherOccupation: string
    motherContactNo: string
}
export type LocalGurdian = {
    name: string
    occupation: string
    contactNo: string
    address: string
}
export interface IStudent {
    id: string,
    user: Types.ObjectId,
    password: string,
    name: UserName
    email: string;
    avatar?: string;
    gender: 'male' | 'female' | 'others'
    dateOfBirth?: string
    contactNo: string
    emergencryContactNo: string
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-',
    presendAddress: string
    permanentAddress: string
    gurdian: Gurdian
    profileImg?: string,
    academicSemester: ObjectId,
    academicDepartment: ObjectId,
    // isActive: 'active' | 'blocked'
    localGurdian: LocalGurdian
}
type studentMethod = {
    isUserExists(id: string): Promise<IStudent>
}