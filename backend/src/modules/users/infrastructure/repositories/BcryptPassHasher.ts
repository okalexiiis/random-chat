import { hash, compare } from "bcrypt";
import { PasswordHasher } from "@modules/users/application/interfaces";

export class BcryptPassHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    const saltRounds = 12; // Increased for security
    return hash(password, saltRounds);
  }

  async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return compare(plainPassword, hashedPassword);
  }
}
