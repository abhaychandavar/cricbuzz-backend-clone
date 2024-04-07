import { Migration } from '@mikro-orm/migrations';

export class Migration20240407085312 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_role_check";');

    this.addSql('alter table "user" alter column "role" type text using ("role"::text);');
    this.addSql('alter table "user" add constraint "user_role_check" check ("role" in (\'admin\'));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_role_check";');

    this.addSql('alter table "user" alter column "role" type text using ("role"::text);');
    this.addSql('alter table "user" add constraint "user_role_check" check ("role" in (\'admin\', \'guest\'));');
  }

}
