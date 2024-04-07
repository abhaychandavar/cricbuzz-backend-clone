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
exports.SquadRole = exports.Squad = void 0;
const core_1 = require("@mikro-orm/core");
const players_1 = require("./players");
const teams_1 = require("./teams");
let Squad = class Squad {
    constructor() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }
};
exports.Squad = Squad;
__decorate([
    (0, core_1.PrimaryKey)({ autoincrement: true }),
    __metadata("design:type", Number)
], Squad.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => teams_1.Team),
    __metadata("design:type", teams_1.Team)
], Squad.prototype, "team_id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => players_1.Player),
    __metadata("design:type", players_1.Player)
], Squad.prototype, "player_id", void 0);
__decorate([
    (0, core_1.Property)({ type: 'enumArray' }),
    __metadata("design:type", String)
], Squad.prototype, "role", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Object)
], Squad.prototype, "created_at", void 0);
__decorate([
    (0, core_1.Property)({ onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], Squad.prototype, "updated_at", void 0);
exports.Squad = Squad = __decorate([
    (0, core_1.Entity)()
], Squad);
var SquadRole;
(function (SquadRole) {
    SquadRole["WICKET_KEEPER"] = "wicket_keeper";
    SquadRole["BATTER"] = "batter";
    SquadRole["BOWLER"] = "bowler";
    SquadRole["CAPTIAN"] = "captian";
    SquadRole["VICE_CAPTIAN"] = "vice_captain";
    SquadRole["EXTRA_PLAYER"] = "extra_player";
})(SquadRole || (exports.SquadRole = SquadRole = {}));
//# sourceMappingURL=squads.js.map