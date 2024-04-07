"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20240407112540 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20240407112540 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" add column "email" text not null;');
        this.addSql('alter table "user" alter column "first_name" type text using ("first_name"::text);');
        this.addSql('alter table "user" alter column "first_name" drop not null;');
        this.addSql('alter table "user" alter column "last_name" type text using ("last_name"::text);');
        this.addSql('alter table "user" alter column "last_name" drop not null;');
        this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    }
    async down() {
        this.addSql('alter table "user" drop constraint "user_username_unique";');
        this.addSql('alter table "user" drop column "email";');
        this.addSql('alter table "user" alter column "first_name" type text using ("first_name"::text);');
        this.addSql('alter table "user" alter column "first_name" set not null;');
        this.addSql('alter table "user" alter column "last_name" type text using ("last_name"::text);');
        this.addSql('alter table "user" alter column "last_name" set not null;');
    }
}
exports.Migration20240407112540 = Migration20240407112540;
//# sourceMappingURL=Migration20240407112540.js.map