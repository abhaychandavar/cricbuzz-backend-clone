"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controller/authController"));
const authAdminRouter = (0, express_1.Router)();
authAdminRouter.post('/signup', authController_1.default.signupAdmin);
exports.default = authAdminRouter;
//# sourceMappingURL=auth.js.map