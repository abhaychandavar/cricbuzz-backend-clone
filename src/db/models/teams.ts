import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Team {
  @PrimaryKey()
  id!: number;

  @Property({ length: 50, type: 'text', unique: true })
  name!: string;

  @Property()
  created_at = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at = new Date();
}