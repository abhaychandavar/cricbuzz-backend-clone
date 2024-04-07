import { Entity, PrimaryKey, Property, Enum, ManyToOne } from "@mikro-orm/core";
import { Team } from "./teams";

@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @Property({ length: 50, type: 'text' })
  venue: string;

  @ManyToOne(() => Team)
  team_1_id!: Team;

  @ManyToOne(() => Team)
  team_2_id!: Team;

  @Enum(() => MatchStatus)
  status!: MatchStatus;

  @Property()
  date!: Date;

  @Property()
  created_at = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at = new Date();
}

export enum MatchStatus {
    UPCOMING = 'upcoming',
    ONGOING = 'ongoing',
    COMPLETED = 'completed',
  }