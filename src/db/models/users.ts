import { Entity, PrimaryKey, Property, Enum, BeforeCreate, BeforeUpdate, BeforeUpsert } from "@mikro-orm/core";
import cipher from "../../utils/cipher";

@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @Property({ length: 50, type: 'text', nullable: true, default: null })
  first_name?: string;

  @Property({ length: 50, type: 'text', nullable: true, default: null })
  last_name?: string;

  @Property({ length: 50, type: 'text', unique: true })
  username!: string;

  @Property({ length: 200, type: 'text' })
  password!: string;

  @Property({ length: 100, type: 'text' })
  email!: string;

  @Enum(() => UserRole)
  role!: UserRole;

  @Property()
  created_at? = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at? = new Date();

  @BeforeCreate()
  @BeforeUpdate()
  @BeforeUpsert()
  beforeCreateUpdateAndUpsert = () => {
    modifyFields(this);
  }
}

const modifyFields = (ctx: User) => {
    if (ctx.password) {
        ctx.password = cipher.hashString(ctx.password);
    }
}
// Enum for extensibility, If generic user needed then we can extend this enum to ad more user roles
export enum UserRole {
    ADMIN = 'admin',
}