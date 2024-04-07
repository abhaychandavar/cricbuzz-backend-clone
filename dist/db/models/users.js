"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.User = void 0;
const core_1 = require("@mikro-orm/core");
const cipher_1 = __importDefault(require("../../utils/cipher"));
let User = class User {
    constructor() {
        this.created_at = new Date();
        this.updated_at = new Date();
        this.beforeCreateUpdateAndUpsert = () => {
            modifyFields(this);
        };
    }
};
exports.User = User;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, type: 'text', nullable: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, type: 'text', nullable: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, type: 'text', unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, core_1.Property)({ length: 200, type: 'text' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, type: 'text' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, core_1.Enum)(() => UserRole),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Object)
], User.prototype, "created_at", void 0);
__decorate([
    (0, core_1.Property)({ onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], User.prototype, "updated_at", void 0);
__decorate([
    (0, core_1.BeforeCreate)(),
    (0, core_1.BeforeUpdate)(),
    (0, core_1.BeforeUpsert)(),
    __metadata("design:type", Object)
], User.prototype, "beforeCreateUpdateAndUpsert", void 0);
exports.User = User = __decorate([
    (0, core_1.Entity)()
], User);
const modifyFields = (ctx) => {
    if (ctx.password) {
        ctx.password = cipher_1.default.hashString(ctx.password);
    }
};
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
//# sourceMappingURL=users.js.map