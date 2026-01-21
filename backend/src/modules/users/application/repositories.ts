//src/modules/users/application/repositories.ts
import { User } from "../domain/User";

export interface UserReader {
  findOne(criteria: { id?: string; username?: string }): Promise<User | null>;
}

export interface UserWriter {
  save(user: User): Promise<User>;
}

export interface UserRepository extends UserReader, UserWriter {}
