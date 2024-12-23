import { z } from 'zod';
import { BloodGroup, Gender } from './faculty.constant';

const createUserNameValidationSchema = z.object({
    firstName: z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
            message: 'First Name must start with a capital letter',
        }),
    middleName: z.string(),
    lastName: z.string(),
});

export const createFacultyValidationSchema = z.object({
    body: z.object({
        // password
        id: z.string(),
        user: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
        designation: z.string(),
        name: createUserNameValidationSchema,
        gender: z.enum(Gender),
        dateOfBirth: z.string(),
        email: z.string().email("Invalid email address"),
        contactNo: z.string(),
        emergencyContactNo: z.string(),
        bloogGroup: z.enum(BloodGroup),
        presentAddress: z.string(),
        permanentAddress: z.string(),
        profileImg: z.string(),
        // .url("Invalid URL"),
        academicDepartment: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
        isDeleted: z.boolean()


    }),
});

const updateUserNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20).optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
});

export const updateFacultyValidationSchema = z.object({
    body: z.object({
        // faculty: z.object({
        designation: z.string().optional(),
        name: updateUserNameValidationSchema,
        gender: z.enum([...Gender] as [string, ...string[]]).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        profileImg: z.string().optional(),
        academicDepartment: z.string().optional(),
        // }),
    }),
});

export const facultyValidations = {
    createFacultyValidationSchema,
    updateFacultyValidationSchema,
};