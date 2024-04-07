import { Request, Response, NextFunction } from 'express';
import userService from '../services/user';
import AppError from '../utils/appError';
import jwtHandler from '../utils/jwt';
import responseHandler from '../utils/responseHandler';
import errors from '../utils/errors';

export interface AppReq extends Request {
    user?: {
        userId: number,
        role: string
    }
}

class Auth {
    validateAdminUser = async (req: AppReq, res: Response, next: NextFunction) => {
        try {
            if (!req.headers.authorization) throw new AppError({ ...errors.ERR_UNAUTHORIZED, message: 'Invalid access token' });
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
            return responseHandler.sendErrorResponse(error, res);
        }
    }
}

const authMiddleware = new Auth();
export default authMiddleware;