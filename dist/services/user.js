"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const users_1 = require("../db/models/users");
class UserService {
    constructor() {
        this.getUserById = async (userId) => {
            const user = await __1.db.findOne(users_1.User, {
                id: userId
            });
            if (!user) {
                throw new Error('Could not find user');
            }
            return user;
        };
    }
}
const userService = new UserService();
exports.default = userService;
//# sourceMappingURL=user.js.map