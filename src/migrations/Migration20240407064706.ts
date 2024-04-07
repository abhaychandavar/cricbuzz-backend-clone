import { Migration } from '@mikro-orm/migrations';

export class Migration20240407064706 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "first_name" varchar(50) not null, "last_name" varchar(50) not null, "username" varchar(50) not null, "password" varchar(200) not null, "role" text check ("role" in (\'admin\', \'moderator\', \'user\')) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);');
  }

}
