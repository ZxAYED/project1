import { Schema, model, connect } from 'mongoose';
import { Gurdian, LocalGurdian, Student, UserName } from './student.interface';
const userNameSchema = new Schema<UserName>({

    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }

})
const gurdianSchema = new Schema<Gurdian>({
    fatherContactNo: { type: String, required: true },
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
},)
const localGurdianSchema = new Schema<LocalGurdian>({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    address: { type: String, required: true },
    contactNo: { type: String, required: true },
})
const studentSchema = new Schema<Student>({
    id: { type: String },
    name: userNameSchema,
    gender: ["male" | 'female'],
    dateOfBirth: String,
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencryContactNo: { type: String, required: true },
    bloodGroup: ['A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'],
    presendAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    gurdian: gurdianSchema,
    localGurdian: localGurdianSchema,
    profileImg: { type: String },
    isActive: ['active', 'blocked']
})

export const StudentModel = model<Student>('User', studentSchema)