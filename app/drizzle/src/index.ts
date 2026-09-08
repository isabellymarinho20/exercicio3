import "dotenv/config";

import express from "express";

import usersRoutes
  from "./modules/users/users.routes.js";

import expensesRoutes
  from "./modules/expenses/expenses.routes.js";

import { pool } from "./db/index.js";

const app = express();

app.use(express.json());

app.use(usersRoutes);
app.use(expensesRoutes);

const port =
  Number(process.env.PORT) || 3000;

app.listen(
  port,
  () => {
    console.log(
      `Servidor executando na porta ${port}`
    );
  }
);

process.on(
  "SIGINT",
  async () => {
    await pool.end();
    process.exit(0);
  }
);