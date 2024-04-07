"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
const __1 = require("../");
const users_1 = require("../db/models/users");
const errors_1 = __importDefault(require("../utils/errors"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const cipher_1 = __importDefault(require("../utils/cipher"));
class AuthService {
    constructor() {
        this.signupAdmin = async ({ username, password, email, firstName, lastName }) => {
            const query = __1.db.create(users_1.User, {
                username,
                password,
                email,
                role: users_1.UserRole.ADMIN,
                first_name: firstName,
                last_name: lastName
            });
            const res = await __1.db.persistAndFlush(query);
            console.log('RES', res);
            return {
                user_id: query.id
            };
        };
        this.loginAdmin = async ({ username, email, password }) => {
            if (!email && !username)
                throw new appError_1.default(Object.assign(Object.assign({}, errors_1.default.ERR_INVALID_REQUEST_DATA), { message: 'Please provide email or username' }));
            const where = {};
            if (username)
                where.username = username;
            if (email)
                where.email = email;
            const user = await __1.db.findOne(users_1.User, where);
            if (!user)
                throw new appError_1.default(Object.assign(Object.assign({}, errors_1.default.ERR_INTERNAL_SERVER_ERROR), { message: 'User not found' }));
            if (user.role !== users_1.UserRole.ADMIN)
                throw new appError_1.default(errors_1.default.ERR_UNAUTHORIZED);
            const isAuthorizedUser = cipher_1.default.verifyHash(password, user.password);
            if (!isAuthorizedUser)
                throw new appError_1.default(Object.assign(Object.assign({}, errors_1.default.ERR_UNAUTHORIZED), { message: `Incorrect ${username ? 'username' : 'email'}/password provided. Please retry` }));
            const token = jwt_1.default.generateAuthToken({
                userId: user.id,
                role: user.role
            });
            return {
                user_id: user.id,
                access_token: token,
            };
        };
    }
}
const authService = new AuthService();
exports.default = authService;
//# sourceMappingURL=auth.js.map