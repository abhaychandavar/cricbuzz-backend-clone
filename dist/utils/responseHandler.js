"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("./appError"));
const errors_1 = __importDefault(require("../utils/errors"));
class ResponseHandler {
    constructor() {
        this.sendSuccessResponse = ({ data, message }, res) => {
            return res.status(200).json(Object.assign(Object.assign({}, data), { status: message, status_code: 200 }));
        };
        this.sendErrorResponse = (error, res) => {
            if (!(error instanceof appError_1.default))
                return res.status(errors_1.default.ERR_INTERNAL_SERVER_ERROR.code).json({ status: errors_1.default.ERR_INTERNAL_SERVER_ERROR.message, status_code: errors_1.default.ERR_INTERNAL_SERVER_ERROR.code });
            return res.status(error.code).json({
                status: error.message,
                status_code: error.code
            });
        };
    }
}
const responseHandler = new ResponseHandler();
exports.default = responseHandler;
//# sourceMappingURL=responseHandler.js.map