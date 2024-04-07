"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20240407064706 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20240407064706 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "first_name" varchar(50) not null, "last_name" varchar(50) not null, "username" varchar(50) not null, "password" varchar(200) not null, "role" text check ("role" in (\'admin\', \'moderator\', \'user\')) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);');
    }
}
exports.Migration20240407064706 = Migration20240407064706;
//# sourceMappingURL=Migration20240407064706.js.map