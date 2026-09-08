import type {
    Request,
    Response
  } from "express";
  
  import {
    DrizzleExpenseRepository
  } from "./expenses.repository.js";
  
  import {
    ExpenseService
  } from "./expenses.service.js";
  
  import {
    DrizzleUserRepository
  } from "../users/users.repository.js";
  
  const expenseRepository =
    new DrizzleExpenseRepository();
  
  const userRepository =
    new DrizzleUserRepository();
  
  const service =
    new ExpenseService(
      expenseRepository,
      userRepository
    );
  
  function getId(
    req: Request
  ): number | null {
  
    const id =
      Number(req.params.id);
  
    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      return null;
    }
  
    return id;
  }
  
  export async function createExpense(
    req: Request,
    res: Response
  ) {
    try {
  
      const {
        idUser,
        amount
      } = req.body;
  
      if (
        !Number.isInteger(idUser) ||
        typeof amount !== "string"
      ) {
        return res.status(400).json({
          message: "Dados inválidos."
        });
      }
  
      try {
  
        const expense =
          await service.create(
            idUser,
            amount
          );
  
        return res
          .status(201)
          .json(expense);
  
      } catch (error) {
  
        if (
          error instanceof Error &&
          error.message ===
            "Usuário não encontrado."
        ) {
          return res.status(404).json({
            message: error.message
          });
        }
  
        throw error;
      }
  
    } catch {
  
      return res.status(500).json({
        message:
          "Erro interno do servidor."
      });
    }
  }
  
  export async function getExpenses(
    _req: Request,
    res: Response
  ) {
    try {
  
      const expenses =
        await service.findAll();
  
      return res
        .status(200)
        .json(expenses);
  
    } catch {
  
      return res.status(500).json({
        message:
          "Erro interno do servidor."
      });
    }
  }
  
  export async function getExpense(
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
  
      const expense =
        await service.findById(id);
  
      if (!expense) {
        return res.status(404).json({
          message:
            "Despesa não encontrada."
        });
      }
  
      return res
        .status(200)
        .json(expense);
  
    } catch {
  
      return res.status(500).json({
        message:
          "Erro interno do servidor."
      });
    }
  }
  
  export async function updateExpense(
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
  
      const { amount } =
        req.body;
  
      if (
        typeof amount !== "string"
      ) {
        return res.status(400).json({
          message:
            "Valor inválido."
        });
      }
  
      const expense =
        await service.update(
          id,
          amount
        );
  
      if (!expense) {
        return res.status(404).json({
          message:
            "Despesa não encontrada."
        });
      }
  
      return res
        .status(200)
        .json(expense);
  
    } catch {
  
      return res.status(500).json({
        message:
          "Erro interno do servidor."
      });
    }
  }
  
  export async function deleteExpense(
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
          message:
            "Despesa não encontrada."
        });
      }
  
      return res
        .status(204)
        .send();
  
    } catch {
  
      return res.status(500).json({
        message:
          "Erro interno do servidor."
      });
    }
  }