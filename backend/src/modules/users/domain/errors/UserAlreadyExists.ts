import { ConflictError } from "@core/types/Errors";

export class UserAlreadyExists extends ConflictError {
  constructor(message = "The User Already exists with that username") {
    super(message);
    this.name = "UserAlreadyExists";
  }
}
