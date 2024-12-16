export interface IErrorSource {
    path: string,
    message: string
}

export interface IErrorResponse {
    message: string,
    statusCode: number,
    errorSource: IErrorSource[]
}
