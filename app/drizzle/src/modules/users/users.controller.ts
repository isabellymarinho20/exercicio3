import type { Request, Response } from "express";

import { UserService } from "./users.service.js";
import {
  DrizzleUserRepository
} from "./users.repository.js";

const repository =
  new DrizzleUserRepository();

const service =
  new UserService(repository);

function getId(
  req: Request
): number | null {

  const id = Number(req.params.id);

  if (
    !Number.isInteger(id) ||
    id <= 0
  ) {
    return null;
  }

  return id;
}

export async function createUser(
  req: Request,
  res: Response
) {
  try {

    const { name } = req.body;

    if (typeof name !== "string") {
      return res.status(400).json({
        message: "Nome inválido."
      });
    }

    const user =
      await service.create(name);

    return res
      .status(201)
      .json(user);

  } catch (error) {

    return res.status(500).json({
      message: "Erro interno do servidor."
    });
  }
}

export async function getUsers(
  _req: Request,
  res: Response
) {
  try {

    const users =
      await service.findAll();

    return res
      .status(200)
      .json(users);

  } catch {

    return res.status(500).json({
      message: "Erro interno do servidor."
    });
  }
}

export async function getUser(
  req: Request,
  res: Response
) {
  try {

    const id = getId(req);

    if (id === null) {
      return res.status(400).json({
        message: "ID inválido."
      });
    }

    const user =
      await service.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado."
      });
    }

    return res
      .status(200)
      .json(user);

  } catch {

    return res.status(500).json({
      message: "Erro interno do servidor."
    });
  }
}

export async function updateUser(
  req: Request,
  res: Response
) {
  try {

    const id = getId(req);

    if (id === null) {
      return res.status(400).json({
        message: "ID inválido."
      });
    }

    const { name } = req.body;

    if (typeof name !== "string") {
      return res.status(400).json({
        message: "Nome inválido."
      });
    }

    const user =
      await service.update(id, name);

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado."
      });
    }

    return res
      .status(200)
      .json(user);

  } catch {

    return res.status(500).json({
      message: "Erro interno do servidor."
    });
  }
}

export async function deleteUser(
  req: Request,
  res: Response
) {
  try {

    const id = getId(req);

    if (id === null) {
      return res.status(400).json({
        message: "ID inválido."
      });
    }

    const deleted =
      await service.delete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Usuário não encontrado."
      });
    }

    return res
      .status(204)
      .send();

  } catch {

    return res.status(500).json({
      message: "Erro interno do servidor."
    });
  }
}