import { z } from "zod";

const createAcademicDepartmentValidaiton = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic Department must  be string'
        }),
        academicFaculty: z.string({
            invalid_type_error: 'Academic Department must  be string'
        }),

    })
})
const updateAcademicDepartmentValidaiton = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic Department must  be string'
        }),
        academicFaculty: z.string({
            invalid_type_error: 'Academic Department must  be string'
        }).optional(),


    }),

})
export const academicDepartmentValidaiton = {
    createAcademicDepartmentValidaiton, updateAcademicDepartmentValidaiton
}