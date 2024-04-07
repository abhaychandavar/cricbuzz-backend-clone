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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.Player = void 0;
const core_1 = require("@mikro-orm/core");
let Player = class Player {
    constructor() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }
};
exports.Player = Player;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Player.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, type: 'text' }),
    __metadata("design:type", String)
], Player.prototype, "first_name", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, type: 'text' }),
    __metadata("design:type", String)
], Player.prototype, "last_name", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Object)
], Player.prototype, "created_at", void 0);
__decorate([
    (0, core_1.Property)({ onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], Player.prototype, "updated_at", void 0);
exports.Player = Player = __decorate([
    (0, core_1.Entity)()
], Player);
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["GUEST"] = "guest";
})(UserRole || (exports.UserRole = UserRole = {}));
//# sourceMappingURL=players.js.map