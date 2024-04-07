import { Migration } from '@mikro-orm/migrations';

export class Migration20240407205251 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "match" add column "status" varchar(255) not null default \'upcoming\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "match" drop column "status";');
  }

}
