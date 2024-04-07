import { Entity, PrimaryKey, Property, Enum, ManyToOne, Unique } from "@mikro-orm/core";
import { Team } from "./teams";

export enum MatchStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
}

@Entity()
@Unique({ properties: ['team_1', 'date'] })
@Unique({ properties: ['team_2', 'date'] })
export class Match {

  @PrimaryKey()
  id!: number;

  @Property({ length: 50, type: 'text' })
  venue: string;

  @ManyToOne(() => Team)
  team_1!: Team;

  @ManyToOne(() => Team)
  team_2!: Team;

  @Property({default: MatchStatus.UPCOMING})
  @Enum(() => MatchStatus)
  status?: MatchStatus;

  @Property()
  date!: Date;

  @Property()
  created_at?= new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at?= new Date();
}