import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Player } from "./players";
import { Team } from "./teams";

@Entity()
export class Squad {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ManyToOne(() => Team)
  team_id!: Team;

  @ManyToOne(() => Player)
  player_id!: Player;

  @Property({ type: 'enumArray' })
  role!: SquadRole;

  @Property()
  created_at = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at = new Date();
}

export enum SquadRole {
  WICKET_KEEPER = 'wicket_keeper',
  BATTER = 'batter',
  BOWLER = 'bowler',
  CAPTIAN = 'captian',
  VICE_CAPTIAN = 'vice_captain',
  EXTRA_PLAYER = 'extra_player'
}