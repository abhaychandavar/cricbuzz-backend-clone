import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Squad } from "./squads";

@Entity()
export class Team {
  @PrimaryKey()
  id!: number;

  @Property({ length: 50, type: 'text', unique: true })
  name!: string;

  @OneToMany(() => Squad, Squad => Squad.team)
  squads?: Squad;

  @Property()
  created_at?= new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at?= new Date();
}