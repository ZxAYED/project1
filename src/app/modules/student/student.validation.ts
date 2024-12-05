import { z } from "zod";

const userNameValidationSchema = z.object({
    firstName: z.string().max(20, 'First name character must be in 20 letters').trim(),
    middleName: z.string().max(20, 'Middle name character must be in 20 letters').trim(),
    lastName: z.string().max(20, 'Last name character must be in 20 letters').trim()
});

const gurdianValidationSchema = z.object({
    fatherContactNo: z.string(),
    fatherName: z.string(),
    fatherOccupation: z.string(),
    motherContactNo: z.string(),
    motherName: z.string(),
    motherOccupation: z.string()
});

const localGurdianValidationSchema = z.object({
    name: z.string(), occupation: z.string(),
    address: z.string(),
    contactNo: z.string()
});

const createStudentValidationSchema = z.object({
    body: z.object({
        // id: z.string(),
        password: z.string().max(20),
        student: z.object({
            name: userNameValidationSchema,
            gender: z.enum(["male", "female", "others"],
                { message: '{VALUE} is not a valid gender' }),
            dateOfBirth: z.string().optional(),
            email: z.string().email('Email is not a valid format'),
            contactNo: z.string().refine((v) => /^\d+$/.test(v),
                { message: 'Contact number must be numeric' }),
            emergencryContactNo: z.string().refine((v) => /^\d+$/.test(v),
                { message: 'Emergency contact number must be numeric' }),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
                { message: '{VALUE} is not a valid blood group' }).optional(),
            presendAddress: z.string(),
            permanentAddress: z.string(),
            gurdian: gurdianValidationSchema,
            localGurdian: localGurdianValidationSchema,
            profileImg: z.string().optional(),
        })
        // isActive: z.enum(['active', 'blocked'],
        //     { message: '{VALUE} is not a valid status' }).default('active'),
        // isDeleted: z.boolean()
    })
});





export const studentValidations = {
    createStudentValidationSchema
}