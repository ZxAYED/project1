import { z } from "zod";

const academicFacultyValidaiton = z.object({
    name: z.string({
        invalid_type_error: 'Academic faculty must  be string'
    })
})
export default academicFacultyValidaiton