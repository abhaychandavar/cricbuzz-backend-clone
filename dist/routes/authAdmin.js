"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const auth_2 = __importDefault(require("../services/auth"));
const authAdminRouter = (0, express_1.Router)();
authAdminRouter.post('/signup', auth_1.default.validateAdminUser, auth_2.default.signupAdmin);
exports.default = authAdminRouter;
//# sourceMappingURL=authAdmin.js.map