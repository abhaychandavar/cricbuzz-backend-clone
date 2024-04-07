"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors = {
    ERR_UNAUTHORIZED: {
        message: 'Operation unquthorized for this user',
        code: 401
    },
    ERR_INVALID_REQUEST_DATA: {
        message: 'Invalid request data',
        code: 400
    },
    ERR_INTERNAL_SERVER_ERROR: {
        message: 'Something went wrong, our team will look into it',
        code: 500
    }
};
exports.default = errors;
//# sourceMappingURL=errors.js.map