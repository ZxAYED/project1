import mongoose from "mongoose";
import { IErrorSource } from "../interfaces";

const handeleMongooseError = (err: mongoose.Error.ValidationError) => {

    const errorSource: IErrorSource[] = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val?.path,
            message: val?.message
        }
    })
    const statusCodes = 400
    return {
        statusCodes,
        message: 'Mongoose Validation Error',
        errorSource
    }
}
export default handeleMongooseError