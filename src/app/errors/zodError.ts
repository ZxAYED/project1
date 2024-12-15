import { ZodError, ZodIssue } from "zod"
import { IErrorSource } from "../interfaces"


const handleZodEror = (err: ZodError) => {
    const errorSource: IErrorSource[] = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message

        }

    })
    const statusCode = 400
    return {
        statusCode,
        message: "Zod Validation Error",
        errorSource,
    }

}
export default handleZodEror