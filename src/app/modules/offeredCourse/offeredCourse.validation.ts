import { z } from "zod";
import { Days } from "./offeredCourse.constant";



const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;


const createOfferedCourseValidationSchema = z.object({
    body: z.object({
        semesterRegistration: z.string(),

        academicDepartment: z.string(),
        academicFaculty: z.string(),
        course: z.string(),
        faculty: z.string(),
        days: z.array(z.enum(Days as [string, ...string[]])),
        startTime: z.string().refine(time => timePattern.test(time), {
            message: "Invalid time format. Expected HH:MM",
        }),
        endTime: z.string().refine(time => timePattern.test(time), {
            message: "Invalid time format. Expected HH:MM",
        }),
        maxCapacity: z.number().min(1, "Max capacity must be at least 1"),
        section: z.number().min(1, "Section must be at least 1")
    }).refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`)
        return end > start
    }, {
        message: ' Start time should be before End time'
    })
});

const updateOfferedCourseValidationSchema = z.object({
    body: z.object({

        faculty: z.string(),
        days: z.array(z.enum(Days as [string, ...string[]])),
        startTime: z.string().refine(time => timePattern.test(time), {
            message: "Invalid time format. Expected HH:MM",
        }),
        endTime: z.string().refine(time => timePattern.test(time), {
            message: "Invalid time format. Expected HH:MM",
        }),
        maxCapacity: z.number().min(1, "Max capacity must be at least 1"),
        section: z.number().min(1, "Section must be at least 1").optional()
    }).refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`)
        return end > start
    }, {
        message: ' Start time should be before End time'
    })
});


export const offeredCourseValidation = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
};
