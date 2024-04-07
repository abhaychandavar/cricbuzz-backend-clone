import { Migration } from '@mikro-orm/migrations';

export class Migration20240407210707 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "player" ("id" serial primary key, "name" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);');
    this.addSql('alter table "player" add constraint "player_name_unique" unique ("name");');

    this.addSql('create table "team" ("id" serial primary key, "name" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);');
    this.addSql('alter table "team" add constraint "team_name_unique" unique ("name");');

    this.addSql('create table "squad" ("id" serial primary key, "team_id" int not null, "player_id" int not null, "role" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);');
    this.addSql('alter table "squad" add constraint "squad_player_id_team_id_unique" unique ("player_id", "team_id");');
    this.addSql('alter table "squad" add constraint "squad_player_id_role_team_id_unique" unique ("player_id", "role", "team_id");');

    this.addSql('create table "match" ("id" serial primary key, "venue" text not null, "team_1_id" int not null, "team_2_id" int not null, "status" varchar(255) not null default \'upcoming\', "date" timestamptz not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);');
    this.addSql('alter table "match" add constraint "match_team_2_id_date_unique" unique ("team_2_id", "date");');
    this.addSql('alter table "match" add constraint "match_team_1_id_date_unique" unique ("team_1_id", "date");');

    this.addSql('create table "user" ("id" serial primary key, "name" text null, "username" text not null, "password" text not null, "email" text not null, "role" text check ("role" in (\'admin\')) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('alter table "squad" add constraint "squad_team_id_foreign" foreign key ("team_id") references "team" ("id") on update cascade;');
    this.addSql('alter table "squad" add constraint "squad_player_id_foreign" foreign key ("player_id") references "player" ("id") on update cascade;');

    this.addSql('alter table "match" add constraint "match_team_1_id_foreign" foreign key ("team_1_id") references "team" ("id") on update cascade;');
    this.addSql('alter table "match" add constraint "match_team_2_id_foreign" foreign key ("team_2_id") references "team" ("id") on update cascade;');
  }

}
