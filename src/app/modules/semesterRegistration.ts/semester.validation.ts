
import { z } from "zod";
import { SemesterRegistrationStatus } from './semester.constant';



const createSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string(),
        status: z.enum([...SemesterRegistrationStatus as [string, ...string[]]]).optional(),
        startDate: z.string(),
        endDate: z.string(),
        minCredit: z.number().min(1, "Min credit must be at least 1").default(3),
        maxCredit: z.number().min(1, "Max credit must be at least 1").default(3),
    })

})
const updateSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string().optional(),
        status: z.enum([...SemesterRegistrationStatus as [string, ...string[]]]).optional(),
        startDate: z.string().optional(), endDate: z.string().optional(), minCredit: z.number().min(1, "Min credit must be at least 1").optional(), maxCredit: z.number().min(1, "Max credit must be at least 1").optional(),
    })
})
export const semesterRegistrationValidation = { createSemesterRegistrationValidationSchema, updateSemesterRegistrationValidationSchema };
