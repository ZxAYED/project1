import { Model, Types } from 'mongoose';
import { Schema } from 'mongoose';

export type TGender = 'Male' | 'Female' | 'Other';
export type TBloodGroup =
    | 'A+'
    | 'A-'
    | 'B+'
    | 'B-'
    | 'AB+'
    | 'AB-'
    | 'O+'
    | 'O-';

export type TUserName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type TFaculty = {
    payload: Types.ObjectId;

    id: string;
    user: Schema.Types.ObjectId;
    designation: string;
    name: TUserName;
    gender: TGender;
    dateOfBirth?: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup?: TBloodGroup;
    presentAddress: string;
    permanentAddress: string;
    profileImg?: string;
    academicDepartment: Schema.Types.ObjectId;
    isDeleted: boolean;
};

export interface FacultyModel extends Model<TFaculty> {
    isUserExists(id: string): Promise<TFaculty | null>;
}