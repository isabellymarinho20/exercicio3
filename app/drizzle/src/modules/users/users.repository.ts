import { eq } from "drizzle-orm";

import {
  db
} from "../../db/index.js";

import {
  users,
  type User
} from "../../db/schema.js";

export interface UserRepository {
  create(name: string): Promise<User>;

  findAll(): Promise<User[]>;

  findById(
    id: number
  ): Promise<User | null>;

  update(
    id: number,
    name: string
  ): Promise<User | null>;

  delete(
    id: number
  ): Promise<boolean>;
}

export class DrizzleUserRepository
  implements UserRepository {

  async create(
    name: string
  ): Promise<User> {

    const [user] = await db
      .insert(users)
      .values({ name })
      .returning();

    return user;
  }

  async findAll(): Promise<User[]> {

    return db
      .select()
      .from(users);
  }

  async findById(
    id: number
  ): Promise<User | null> {

    const [user] = await db
      .select()
      .from(users)
      .where(
        eq(users.idUser, id)
      );

    return user ?? null;
  }

  async update(
    id: number,
    name: string
  ): Promise<User | null> {

    const [user] = await db
      .update(users)
      .set({ name })
      .where(
        eq(users.idUser, id)
      )
      .returning();

    return user ?? null;
  }

  async delete(
    id: number
  ): Promise<boolean> {

    const result = await db
      .delete(users)
      .where(
        eq(users.idUser, id)
      );

    return result.rowCount > 0;
  }
}