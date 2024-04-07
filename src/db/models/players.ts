import { Entity, OneToMany, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Squad } from "./squads";

@Entity()
export class Player {

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ length: 50, type: 'text', unique: true })
  name!: string;

  @Property()
  created_at?= new Date();

  @OneToMany(() => Squad, Squad => Squad.player)
  squads?: Squad;

  @Property({ onUpdate: () => new Date() })
  updated_at?= new Date();
}