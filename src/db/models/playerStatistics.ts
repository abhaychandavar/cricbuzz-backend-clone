import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Player } from "./players";

@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @OneToOne(() => Player)
  player_id!: Player;

  @Property({ default: 0 })
  matches_played!: number;

  @Property({ default: 0 })
  runs!: number;

  @Property({ default: 0.0, type: 'float' })
  average!: number;

  @Property({ default: 0.0, type: 'float' })
  strike_rate!: number;

  @Property()
  created_at = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at = new Date();
}

export enum UserRole {
    ADMIN = 'admin',
    GUEST = 'guest',
  }