//src/modules/users/domain/errors/UserNotFound.ts
import { NotFoundError } from "@core/types/Errors";

export class UserNotFound extends NotFoundError {
  constructor() {
    super("User not found");
    this.name = "UserNotFound";
  }
}