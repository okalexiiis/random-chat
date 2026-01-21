//src/modules/users/domain/errors/InvalidCredentials.ts

export class InvalidCredentials extends Error {
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentials";
  }
}