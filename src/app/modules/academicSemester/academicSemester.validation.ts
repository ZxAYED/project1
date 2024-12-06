import { z } from "zod";
import { codeEnum, monthEnum, nameEnum } from "./academicSemester.model";



const academicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...nameEnum] as [string, ...string[]]),
        code: z.enum([...codeEnum] as [string, ...string[]]),
        year: z.date(),
        startMonth: z.enum([...monthEnum] as [string, ...string[]]),
        endMonth: z.enum([...monthEnum] as [string, ...string[]]),
    })
});

export default academicSemesterValidationSchema