"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20240407064818 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20240407064818 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" drop constraint if exists "user_role_check";');
        this.addSql('alter table "user" alter column "role" type text using ("role"::text);');
        this.addSql('alter table "user" add constraint "user_role_check" check ("role" in (\'admin\', \'guest\'));');
    }
    async down() {
        this.addSql('alter table "user" drop constraint if exists "user_role_check";');
        this.addSql('alter table "user" alter column "role" type text using ("role"::text);');
        this.addSql('alter table "user" add constraint "user_role_check" check ("role" in (\'admin\', \'moderator\', \'user\'));');
    }
}
exports.Migration20240407064818 = Migration20240407064818;
//# sourceMappingURL=Migration20240407064818.js.map