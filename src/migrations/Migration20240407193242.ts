import { Migration } from '@mikro-orm/migrations';

export class Migration20240407193242 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "squad" add constraint "squad_player_id_team_id_unique" unique ("player_id", "team_id");');
    this.addSql('alter table "squad" add constraint "squad_player_id_role_team_id_unique" unique ("player_id", "role", "team_id");');

    this.addSql('alter table "match" add constraint "match_team_2_id_date_unique" unique ("team_2_id", "date");');
    this.addSql('alter table "match" add constraint "match_team_1_id_date_unique" unique ("team_1_id", "date");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "squad" drop constraint "squad_player_id_team_id_unique";');
    this.addSql('alter table "squad" drop constraint "squad_player_id_role_team_id_unique";');

    this.addSql('alter table "match" drop constraint "match_team_2_id_date_unique";');
    this.addSql('alter table "match" drop constraint "match_team_1_id_date_unique";');
  }

}
