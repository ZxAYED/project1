import { z } from "zod";
import { codeEnum, monthEnum, nameEnum } from "./academicSemester.model";



const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...nameEnum] as [string, ...string[]]),
        code: z.enum([...codeEnum] as [string, ...string[]]),
        year: z.string(),
        startMonth: z.enum([...monthEnum] as [string, ...string[]]),
        endMonth: z.enum([...monthEnum] as [string, ...string[]]),
    })
});
const updateAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...nameEnum] as [string, ...string[]]).optional(),
        code: z.enum([...codeEnum] as [string, ...string[]]).optional(),
        year: z.string().optional(),
        startMonth: z.enum([...monthEnum] as [string, ...string[]]).optional(),
        endMonth: z.enum([...monthEnum] as [string, ...string[]]).optional(),
    })
});

export const academicSemesterValidationSchema = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema
}