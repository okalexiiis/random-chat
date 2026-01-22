//src/modules/users/domain/errors/InvalidCredentials.ts
import { UnauthorizedError } from "@core/types/Errors";

export class InvalidCredentials extends UnauthorizedError {
  constructor() {
    super("Invalid password");
    this.name = "InvalidCredentials";
  }
}