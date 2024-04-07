import jwt from 'jsonwebtoken';
import appConfig from '../config/app';

class JWT {
    generateAuthToken = (data: {
        userId: number,
        role: string
    }): string => {
        const token = jwt.sign(data, appConfig.jwt.secret, {
            algorithm: appConfig.jwt.algorithm,
            expiresIn: '2h'
        });

        return token;
    }

    verifyAuthToken = (token: string): {
        userId: number,
        role: string
    } => {
        const tokenData = jwt.verify(token, appConfig.jwt.secret);

        return typeof tokenData === 'string' ? JSON.parse(tokenData) : tokenData;
    }
}

const jwtHandler = new JWT();
export default jwtHandler;