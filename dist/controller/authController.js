"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../services/auth"));
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const zod_1 = require("zod");
const signupAdminBodyType = zod_1.z.object({
    username: zod_1.z.string(),
    firstName: zod_1.z.optional(zod_1.z.string()),
    lastName: zod_1.z.optional(zod_1.z.string()),
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
const loginAdminBodyType = zod_1.z.object({
    username: zod_1.z.optional(zod_1.z.string()),
    email: zod_1.z.optional(zod_1.z.string()),
    password: zod_1.z.string()
});
class AuthController {
    constructor() {
        this.signupAdmin = async (req, res) => {
            try {
                signupAdminBodyType.parse(req.body);
                const { username, firstName, lastName, email, password } = req.body;
                const user = await auth_1.default.signupAdmin({ username, firstName, lastName, email, password });
                return responseHandler_1.default.sendSuccessResponse({
                    data: user,
                    message: 'Admin Account successfully created',
                }, res);
            }
            catch (error) {
                console.log(error);
                return responseHandler_1.default.sendErrorResponse(error, res);
            }
        };
        this.loginAdmin = async (req, res) => {
            try {
                loginAdminBodyType.parse(req.body);
                const { username, email, password } = req.body;
                const user = await auth_1.default.loginAdmin({ username, email, password });
                return responseHandler_1.default.sendSuccessResponse({
                    data: user,
                    message: 'Login successful',
                }, res);
            }
            catch (error) {
                console.log(error);
                return responseHandler_1.default.sendErrorResponse(error, res);
            }
        };
    }
}
const authController = new AuthController();
exports.default = authController;
//# sourceMappingURL=authController.js.map