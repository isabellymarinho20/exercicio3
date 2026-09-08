import {
    integer,
    pgTable,
    serial,
    varchar,
    decimal,
    timestamp
  } from "drizzle-orm/pg-core";
  
  import { relations } from "drizzle-orm";
  
  export const users = pgTable("users", {
    idUser: serial("id_user").primaryKey(),
  
    name: varchar("name", {
      length: 50
    }).notNull()
  });
  
  export const expenses = pgTable("expenses", {
    idExpense: serial("id_expense").primaryKey(),
  
    idUser: integer("id_user")
      .notNull()
      .references(() => users.idUser, {
        onDelete: "no action",
        onUpdate: "cascade"
      }),
  
    amount: decimal("amount")
      .notNull(),
  
    occurredAt: timestamp("occurred_at")
      .defaultNow()
      .notNull()
  });
  
  export const usersRelations =
    relations(users, ({ many }) => ({
      expenses: many(expenses)
    }));
  
  export const expensesRelations =
    relations(expenses, ({ one }) => ({
      user: one(users, {
        fields: [expenses.idUser],
        references: [users.idUser]
      })
    }));
  
  export type User =
    typeof users.$inferSelect;
  
  export type NewUser =
    typeof users.$inferInsert;
  
  export type Expense =
    typeof expenses.$inferSelect;
  
  export type NewExpense =
    typeof expenses.$inferInsert;