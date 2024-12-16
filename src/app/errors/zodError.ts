import { ZodError, ZodIssue } from "zod"
import { IErrorResponse, IErrorSource } from "../interfaces"


const handleZodError = (err: ZodError): IErrorResponse => {
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
export default handleZodError