"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = __importDefault(require("../config/app"));
class Cipher {
    constructor() {
        this.hashString = (str) => {
            const hashedString = bcrypt_1.default.hashSync(str, app_1.default.cipher.saltRounds);
            return hashedString;
        };
        this.verifyHash = (str, hash) => {
            const hashedString = bcrypt_1.default.compareSync(str, hash);
            return hashedString;
        };
    }
}
const cipher = new Cipher();
exports.default = cipher;
//# sourceMappingURL=cipher.js.map