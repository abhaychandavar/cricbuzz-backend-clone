import { Migration } from '@mikro-orm/migrations';

export class Migration20240407065349 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" alter column "first_name" type text using ("first_name"::text);');
    this.addSql('alter table "user" alter column "last_name" type text using ("last_name"::text);');
    this.addSql('alter table "user" alter column "username" type text using ("username"::text);');
    this.addSql('alter table "user" alter column "password" type text using ("password"::text);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" alter column "first_name" type varchar(50) using ("first_name"::varchar(50));');
    this.addSql('alter table "user" alter column "last_name" type varchar(50) using ("last_name"::varchar(50));');
    this.addSql('alter table "user" alter column "username" type varchar(50) using ("username"::varchar(50));');
    this.addSql('alter table "user" alter column "password" type varchar(200) using ("password"::varchar(200));');
  }

}
