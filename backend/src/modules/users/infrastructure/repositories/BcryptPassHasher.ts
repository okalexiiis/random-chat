import { hash, compare } from "bcrypt";
import { PasswordHasher } from "@modules/users/application/interfaces/passwordHasher";

export class BcryptPassHasher implements PasswordHasher {
  async compare(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }

  async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return hash(password, saltRounds);
  }
}
