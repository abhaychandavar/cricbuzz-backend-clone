class AppError extends Error {
    code: number;
    constructor (error: {
        message: string,
        code: number
    }) {
        super(error.message)
        this.code = error.code;
    }
}

export default AppError;