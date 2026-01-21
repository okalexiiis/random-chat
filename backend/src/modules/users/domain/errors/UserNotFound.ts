//src/modules/users/domain/errors/UserNotFound.ts

export class UserNotFound extends Error {
  constructor() {
    super("User not found");
    this.name = "UserNotFound";
  }
}