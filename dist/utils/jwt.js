"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = __importDefault(require("../config/app"));
class JWT {
    constructor() {
        this.generateAuthToken = (data) => {
            const token = jsonwebtoken_1.default.sign(data, app_1.default.jwt.secret, {
                algorithm: app_1.default.jwt.algorithm,
                expiresIn: '2h'
            });
            return token;
        };
        this.verifyAuthToken = (token) => {
            const tokenData = jsonwebtoken_1.default.verify(token, app_1.default.jwt.secret);
            return typeof tokenData === 'string' ? JSON.parse(tokenData) : tokenData;
        };
    }
}
const jwtHandler = new JWT();
exports.default = jwtHandler;
//# sourceMappingURL=jwt.js.map