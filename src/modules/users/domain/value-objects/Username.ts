import { Result } from "@types/Result";

export class Username {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Result<Username> {
    if (!value || value.length < 3) {
      return { isOk: false, error: new Error("Username inválido") };
    }
    return { isOk: true, value: new Username(value) };
  }

  static fromPersistence(value: string): Username {
    return new Username(value);
  }
}
