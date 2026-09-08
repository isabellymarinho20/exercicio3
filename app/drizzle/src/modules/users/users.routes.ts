import { Router } from "express";

import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from "./users.controller.js";

const router = Router();

router.post(
  "/users",
  createUser
);

router.get(
  "/users",
  getUsers
);

router.get(
  "/users/:id",
  getUser
);

router.put(
  "/users/:id",
  updateUser
);

router.delete(
  "/users/:id",
  deleteUser
);

export default router;