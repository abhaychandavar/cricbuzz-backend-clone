"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminAuth_1 = __importDefault(require("./adminAuth"));
const indexRouter = (0, express_1.Router)();
indexRouter.get('/', (_req, res, _next) => {
    res.send('Welcome to Cricbuzz clone!');
});
indexRouter.use('/api/admin', adminAuth_1.default);
exports.default = indexRouter;
//# sourceMappingURL=index.js.map