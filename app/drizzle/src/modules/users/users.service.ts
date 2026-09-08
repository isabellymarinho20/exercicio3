import type { User } from "../../db/schema.js";

import type {
  UserRepository
} from "./users.repository.js";

export class UserService {

  constructor(
    private readonly repository:
      UserRepository
  ) {}

  async create(
    name: string
  ): Promise<User> {

    if (
      !name ||
      name.trim().length === 0
    ) {
      throw new Error(
        "Nome é obrigatório."
      );
    }

    if (name.length > 50) {
      throw new Error(
        "Nome deve possuir no máximo 50 caracteres."
      );
    }

    return this.repository.create(
      name.trim()
    );
  }

  async findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async findById(
    id: number
  ): Promise<User | null> {
    return this.repository.findById(id);
  }

  async update(
    id: number,
    name: string
  ): Promise<User | null> {

    if (
      !name ||
      name.trim().length === 0
    ) {
      throw new Error(
        "Nome é obrigatório."
      );
    }

    return this.repository.update(
      id,
      name.trim()
    );
  }

  async delete(
    id: number
  ): Promise<boolean> {

    return this.repository.delete(id);
  }
}