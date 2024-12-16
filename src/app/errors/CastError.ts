import mongoose from "mongoose";
import { IErrorResponse, IErrorSource } from "../interfaces";

const handleCastError = (err: mongoose.Error.CastError): IErrorResponse => {

    const errorSource: IErrorSource[] = [{
        path: err.path,
        message: err.message
    }]

    const statusCode = 400
    return {
        statusCode,
        message: 'Mongoose Validation Error',
        errorSource
    }
}
export default handleCastError