import AppError from "../utils/appError";
import { db } from "../";
import { User, UserRole } from "../db/models/users";
import errors from "../utils/errors";
import jwtHandler from "../utils/jwt";
import cipher from "../utils/cipher";

class AuthService {
    signupAdmin = async ({
        username,
        password,
        email,
        firstName,
        lastName
    }: {
        username: string,
        password: string,
        email: string,
        firstName?: string,
        lastName?: string
    }): Promise<{
        user_id: number
    }> => {
        const query = db.create(User, {
            username,
            password,
            email,
            role: UserRole.ADMIN,
            first_name: firstName,
            last_name: lastName
        });
        const res = await db.persistAndFlush(query);
        console.log('RES', res);
        return {
            user_id: query.id
        };
    }

    loginAdmin = async ({
        username,
        email,
        password
    }: {
        username?: string,
        email?: string,
        password: string
    }) => {
        if (!email && !username) throw new AppError({ ...errors.ERR_INVALID_REQUEST_DATA, message: 'Please provide email or username' });
        const where: {
            username?: string,
            email?: string,
        } = {};
        
        if (username) where.username = username;
        if (email) where.email = email;

        const user = await db.findOne(User, where);
        if (!user) throw new AppError({ ...errors.ERR_INTERNAL_SERVER_ERROR, message: 'User not found' });
        if (user.role !== UserRole.ADMIN) throw new AppError(errors.ERR_UNAUTHORIZED);
        const isAuthorizedUser = cipher.verifyHash(password, user.password);
        if (!isAuthorizedUser) throw new AppError({ ...errors.ERR_UNAUTHORIZED, message: `Incorrect ${username ? 'username' : 'email'}/password provided. Please retry` })
        const token = jwtHandler.generateAuthToken({
            userId: user.id,
            role: user.role
        });
        return {
            user_id: user.id,
            access_token: token,
        }
    }
}

const authService = new AuthService();
export default authService;