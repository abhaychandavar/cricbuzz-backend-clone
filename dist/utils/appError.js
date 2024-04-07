"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(error) {
        super(error.message);
        this.code = error.code;
    }
}
exports.default = AppError;
//# sourceMappingURL=appError.js.map