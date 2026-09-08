import type {
    Expense
  } from "../../db/schema.js";
  
  import type {
    ExpenseRepository
  } from "./expenses.repository.js";
  
  import type {
    UserRepository
  } from "../users/users.repository.js";
  
  export class ExpenseService {
  
    constructor(
      private readonly expenseRepository:
        ExpenseRepository,
  
      private readonly userRepository:
        UserRepository
    ) {}
  
    async create(
      idUser: number,
      amount: string
    ): Promise<Expense> {
  
      if (!Number.isInteger(idUser)) {
        throw new Error(
          "Usuário inválido."
        );
      }
  
      if (
        !amount ||
        Number(amount) <= 0
      ) {
        throw new Error(
          "Valor da despesa deve ser maior que zero."
        );
      }
  
      const user =
        await this.userRepository
          .findById(idUser);
  
      if (!user) {
        throw new Error(
          "Usuário não encontrado."
        );
      }
  
      return this.expenseRepository
        .create(idUser, amount);
    }
  
    async findAll(): Promise<Expense[]> {
      return this.expenseRepository
        .findAll();
    }
  
    async findById(
      id: number
    ): Promise<Expense | null> {
      return this.expenseRepository
        .findById(id);
    }
  
    async update(
      id: number,
      amount: string
    ): Promise<Expense | null> {
  
      if (
        !amount ||
        Number(amount) <= 0
      ) {
        throw new Error(
          "Valor inválido."
        );
      }
  
      return this.expenseRepository
        .update(id, amount);
    }
  
    async delete(
      id: number
    ): Promise<boolean> {
  
      return this.expenseRepository
        .delete(id);
    }
  }