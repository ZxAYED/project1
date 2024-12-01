import { z } from "zod";

export const userValidationSchema = z.object({

    password: z.string({
        invalid_type_error: 'Password must be string'
    }).max(20, { message: 'Password cant be more then 20 characters' }).optional(),
    needPasswordChange: z.boolean().optional()



})