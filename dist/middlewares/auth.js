"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../services/user"));
const appError_1 = __importDefault(require("../utils/appError"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const zod_1 = __importDefault(require("zod"));
const errors_1 = __importDefault(require("../utils/errors"));
const AdminReqType = zod_1.default.object({
    headers: zod_1.default.object({
        authorization: zod_1.default.string(),
    })
});
class Auth {
    constructor() {
        this.validateAdminUser = async (req, res, next) => {
            try {
                AdminReqType.parse(req);
                const bearerToken = req.headers.authorization;
                const tokenSplits = bearerToken.split('Bearer ');
                const verifiedUserData = jwt_1.default.verifyAuthToken(tokenSplits[1]);
                const { userId } = verifiedUserData;
                if (!userId)
                    throw new appError_1.default(errors_1.default.ERR_UNAUTHORIZED);
                const user = await user_1.default.getUserById(userId);
                if (user.role !== 'admin')
                    throw new appError_1.default(errors_1.default.ERR_UNAUTHORIZED);
                req.user = verifiedUserData;
                return next();
            }
            catch (error) {
                console.log('ERROR', error);
                if (error instanceof appError_1.default)
                    return responseHandler_1.default.sendErrorResponse({ error, res });
                const appError = new appError_1.default(errors_1.default.ERR_INTERNAL_SERVER_ERROR);
                return responseHandler_1.default.sendErrorResponse({
                    error: appError,
                    res
                });
            }
        };
    }
}
const authMiddleware = new Auth();
exports.default = authMiddleware;
//# sourceMappingURL=auth.js.map