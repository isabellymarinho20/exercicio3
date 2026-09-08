import { eq } from "drizzle-orm";

import { db } from "../../db/index.js";

import {
  expenses,
  type Expense
} from "../../db/schema.js";

export interface ExpenseRepository {

  create(
    idUser: number,
    amount: string
  ): Promise<Expense>;

  findAll(): Promise<Expense[]>;

  findById(
    id: number
  ): Promise<Expense | null>;

  update(
    id: number,
    amount: string
  ): Promise<Expense | null>;

  delete(
    id: number
  ): Promise<boolean>;
}

export class DrizzleExpenseRepository
  implements ExpenseRepository {

  async create(
    idUser: number,
    amount: string
  ): Promise<Expense> {

    const [expense] =
      await db
        .insert(expenses)
        .values({
          idUser,
          amount
        })
        .returning();

    return expense;
  }

  async findAll(): Promise<Expense[]> {

    return db
      .select()
      .from(expenses);
  }

  async findById(
    id: number
  ): Promise<Expense | null> {

    const [expense] =
      await db
        .select()
        .from(expenses)
        .where(
          eq(expenses.idExpense, id)
        );

    return expense ?? null;
  }

  async update(
    id: number,
    amount: string
  ): Promise<Expense | null> {

    const [expense] =
      await db
        .update(expenses)
        .set({ amount })
        .where(
          eq(expenses.idExpense, id)
        )
        .returning();

    return expense ?? null;
  }

  async delete(
    id: number
  ): Promise<boolean> {

    const result =
      await db
        .delete(expenses)
        .where(
          eq(expenses.idExpense, id)
        );

    return result.rowCount > 0;
  }
}