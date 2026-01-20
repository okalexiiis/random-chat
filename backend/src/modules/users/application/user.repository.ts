import { User } from "../domain/User";

export interface PaginationOptions {
  page: number;
  limit: number;
  filters?: {
    username?: string;
  };
}

export interface PaginatedUsers {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface UserRepository {
  findOne(criteria: { id?: string; username?: string }): Promise<User | null>;
  findAll(options: PaginationOptions): Promise<PaginatedUsers>;
  save(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
