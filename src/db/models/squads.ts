import { Entity, ManyToOne, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Player } from "./players";
import { Team } from "./teams";

@Entity()
@Unique({ properties: ['player', 'role', 'team'] })
@Unique({ properties: ['player', 'team'] })
export class Squad {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ManyToOne(() => Team)
  team!: Team;

  @ManyToOne(() => Player)
  player!: Player;

  @Property({ type: 'enumArray' })
  role!: SquadRole[];

  @Property()
  created_at?= new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at?= new Date();
}

export enum SquadRole {
  WICKET_KEEPER = 'wicket_keeper',
  BATSMAN = 'batsman',
  BOWLER = 'bowler',
  CAPTIAN = 'captian',
  VICE_CAPTIAN = 'vice_captain',
  EXTRA_PLAYER = 'extra_player'
}