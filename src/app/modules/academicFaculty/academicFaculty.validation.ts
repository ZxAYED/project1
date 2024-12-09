import { z } from "zod";

const createAcademicFacultyValidaiton = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic faculty must  be string'
        })
    })
})
const updateAcademicFacultyValidaiton = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic faculty must  be string'
        })
    })
})
export const academicFacultyValidaiton = {
    createAcademicFacultyValidaiton, updateAcademicFacultyValidaiton
}