import { z } from "zod";

const preRequisiteCoursesvalidationSchema = z.object({
    course: z.string().min(1, "Course id cannot be empty").optional(),
    isDeleted: z.boolean().optional()
});

const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title cannot exceed 100 characters"),
        prefix: z.string().regex(/^[A-Z]{2,10}$/, "Prefix must be 2-10 uppercase letters"),
        code: z.number().int().min(100, "Code must be at least 100").max(9999, "Code cannot exceed 9999"),
        credits: z.number().min(1, "Credits must be at least 1").max(6, "Credits cannot exceed 6"),
        preRequisiteCourses: z.array(preRequisiteCoursesvalidationSchema).optional(),
        isDelete: z.boolean().optional()


    })
});





const updateCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title cannot exceed 100 characters").optional(),
        prefix: z.string().regex(/^[A-Z]{2,10}$/, "Prefix must be 2-10 uppercase letters").optional(),
        code: z.number().int().min(100, "Code must be at least 100").max(9999, "Code cannot exceed 9999").optional(),
        credits: z.number().min(1, "Credits must be at least 1").max(6, "Credits cannot exceed 6").optional(),
        preRequisiteCourses: z.array(preRequisiteCoursesvalidationSchema).optional(),
        isDelete: z.boolean().optional()
    })
})


const updateCourseFacultyValidationSchema = z.object({
    body: z.object({
        course: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId").optional(),
        faculties: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")).optional()
    })
});




export const courseValidationSchema = {
    createCourseValidationSchema, updateCourseValidationSchema,
    updateCourseFacultyValidationSchema
}