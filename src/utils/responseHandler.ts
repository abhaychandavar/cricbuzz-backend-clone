
import { Response } from 'express';
import AppError from "./appError";
import errors from '../utils/errors';

class ResponseHandler {
    sendSuccessResponse = ({ data, message }: {
        data: any,
        message?: string,
    }, res: Response) => {
        return res.status(200).json({...data, status: message, status_code: 200});
    }

    sendErrorResponse = (error: AppError | Error, res: Response, errorList?: Array<Object>) => {
        if (!(error instanceof AppError)) return res.status(errors.ERR_INTERNAL_SERVER_ERROR.code).json({ status: errors.ERR_INTERNAL_SERVER_ERROR.message, status_code: errors.ERR_INTERNAL_SERVER_ERROR.code})
        return res.status(error.code).json({
            status: error.message,
            status_code: error.code,
            errors: errorList
        })
    }
}

const responseHandler = new ResponseHandler();
export default responseHandler;