import { Migration } from '@mikro-orm/migrations';

export class Migration20240407201151 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "match" drop column "status";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "match" add column "status" varchar(255) not null default \'upcoming\';');
  }

}
