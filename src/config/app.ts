import { Algorithm } from 'jsonwebtoken';

const jwtSecretSignAlgorithm: Algorithm = 'HS256';
const appConfig = {
    port: Number(String(process.env.PORT)) || 3000,
    env: process.env.ENVIRONMENT || 'DEV',
    db: {
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DATABASE || 'postgres',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        port: Number(String(process.env.DB_PORT)) || 5433
    },
    jwt: {
        secret: process.env.AUTH_TOKEN_JWT_SECRET || '123w%^$^%$ewartygf',
        algorithm: jwtSecretSignAlgorithm
    },
    cipher: {
        saltRounds: 10
    }
}

export default appConfig;