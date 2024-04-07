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
exports.MatchStatus = exports.User = void 0;
const core_1 = require("@mikro-orm/core");
const teams_1 = require("./teams");
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
    (0, core_1.Property)({ length: 50, type: 'text' }),
    __metadata("design:type", String)
], User.prototype, "venue", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => teams_1.Team),
    __metadata("design:type", teams_1.Team)
], User.prototype, "team_1_id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => teams_1.Team),
    __metadata("design:type", teams_1.Team)
], User.prototype, "team_2_id", void 0);
__decorate([
    (0, core_1.Enum)(() => MatchStatus),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], User.prototype, "date", void 0);
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
var MatchStatus;
(function (MatchStatus) {
    MatchStatus["UPCOMING"] = "upcoming";
    MatchStatus["ONGOING"] = "ongoing";
    MatchStatus["COMPLETED"] = "completed";
})(MatchStatus || (exports.MatchStatus = MatchStatus = {}));
//# sourceMappingURL=matches.js.map