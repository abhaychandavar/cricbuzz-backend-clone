import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Player {

  @PrimaryKey()
  id!: number;

  @Property({ length: 50, type: 'text' })
  first_name!: string;

  @Property({ length: 50, type: 'text' })
  last_name: string;

  @Property()
  created_at = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at = new Date();
}

export enum UserRole {
    ADMIN = 'admin',
    GUEST = 'guest',
  }