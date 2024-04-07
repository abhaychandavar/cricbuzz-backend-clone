"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20240407065349 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20240407065349 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" alter column "first_name" type text using ("first_name"::text);');
        this.addSql('alter table "user" alter column "last_name" type text using ("last_name"::text);');
        this.addSql('alter table "user" alter column "username" type text using ("username"::text);');
        this.addSql('alter table "user" alter column "password" type text using ("password"::text);');
    }
    async down() {
        this.addSql('alter table "user" alter column "first_name" type varchar(50) using ("first_name"::varchar(50));');
        this.addSql('alter table "user" alter column "last_name" type varchar(50) using ("last_name"::varchar(50));');
        this.addSql('alter table "user" alter column "username" type varchar(50) using ("username"::varchar(50));');
        this.addSql('alter table "user" alter column "password" type varchar(200) using ("password"::varchar(200));');
    }
}
exports.Migration20240407065349 = Migration20240407065349;
//# sourceMappingURL=Migration20240407065349.js.map