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
        name
    }: {
        username: string,
        password: string,
        email: string,
        name?: string
    }): Promise<{
        user_id: number
    }> => {
        const query = db.create(User, {
            username: username.trim().toLocaleLowerCase(),
            password,
            email: email.trim().toLocaleLowerCase(),
            role: UserRole.ADMIN,
            name: name ? name.trim() : name
        });
        await db.persistAndFlush(query);
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
        
        if (username) where.username = username.trim().toLowerCase();
        if (email) where.email = email.trim().toLowerCase();

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