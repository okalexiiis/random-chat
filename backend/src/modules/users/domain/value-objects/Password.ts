import { Result } from "@types/Result";

export class Password {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Result<Password> {
    if (!value || value.length < 3) {
      return { isOk: false, error: new Error("Password inválido") };
    }
    return { isOk: true, value: new Password(value) };
  }
  static fromPersistence(value: string): Password {
    return new Password(value);
  }
}
