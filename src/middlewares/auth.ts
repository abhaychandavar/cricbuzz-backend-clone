import { Request, Response, NextFunction } from 'express';
import userService from '../services/user';
import AppError from '../utils/appError';
import jwtHandler from '../utils/jwt';
import responseHandler from '../utils/responseHandler';
import zod from 'zod';
import errors from '../utils/errors';

export interface AppReq extends Request {
    user?: {
        userId: number,
        role: string
    }
}

const AdminReqType = zod.object({
    headers: zod.object({
        authorization: zod.string(),
    })
})
class Auth {
    validateAdminUser = async (req: AppReq, res: Response, next: NextFunction) => {
        try {
            AdminReqType.parse(req);
            const bearerToken = req.headers.authorization;
            const tokenSplits = bearerToken!.split('Bearer ');
    
            const verifiedUserData = jwtHandler.verifyAuthToken(tokenSplits[1]);
            const {userId} = verifiedUserData;
            if (!userId) throw new AppError(errors.ERR_UNAUTHORIZED);
            const user = await userService.getUserById(userId);
            if (user.role !== 'admin') throw new AppError(errors.ERR_UNAUTHORIZED);
            req.user = verifiedUserData;
            return next();
        }
        catch (error) {
            console.log('ERROR', error);
            if (error instanceof AppError) return responseHandler.sendErrorResponse({ error, res });
            const appError = new AppError(errors.ERR_INTERNAL_SERVER_ERROR);
            return responseHandler.sendErrorResponse({
                error: appError,
                res
            });
        }
    }
}

const authMiddleware = new Auth();
export default authMiddleware;