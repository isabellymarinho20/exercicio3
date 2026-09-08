import { Router } from "express";

import {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense
} from "./expenses.controller.js";

const router = Router();

router.post(
  "/expenses",
  createExpense
);

router.get(
  "/expenses",
  getExpenses
);

router.get(
  "/expenses/:id",
  getExpense
);

router.put(
  "/expenses/:id",
  updateExpense
);

router.delete(
  "/expenses/:id",
  deleteExpense
);

export default router;