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
exports.UserRole = exports.User = void 0;
const core_1 = require("@mikro-orm/core");
const players_1 = require("./players");
let User = class User {
    constructor() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }
};
exports.User = User;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, core_1.OneToOne)(() => players_1.Player),
    __metadata("design:type", players_1.Player)
], User.prototype, "player_id", void 0);
__decorate([
    (0, core_1.Property)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "matches_played", void 0);
__decorate([
    (0, core_1.Property)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "runs", void 0);
__decorate([
    (0, core_1.Property)({ default: 0.0, type: 'float' }),
    __metadata("design:type", Number)
], User.prototype, "average", void 0);
__decorate([
    (0, core_1.Property)({ default: 0.0, type: 'float' }),
    __metadata("design:type", Number)
], User.prototype, "strike_rate", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Object)
], User.prototype, "created_at", void 0);
__decorate([
    (0, core_1.Property)({ onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], User.prototype, "updated_at", void 0);
exports.User = User = __decorate([
    (0, core_1.Entity)()
], User);
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["GUEST"] = "guest";
})(UserRole || (exports.UserRole = UserRole = {}));
//# sourceMappingURL=playerStatistics.js.map