import type { Result } from "@core/types/Result";
import { ValidationError } from "@core/types/Errors";

export class Password {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Result<Password> {
    const errors: Record<string, string> = {};

    if (!value || value.length < 8) {
      errors.length = "Must be at least 8 characters";
    }
    if (!/[a-zA-Z]/.test(value)) {
      errors.letters = "Must contain at least one letter";
    }
    if (!/\d/.test(value)) {
      errors.numbers = "Must contain at least one number";
    }

    if (Object.keys(errors).length > 0) {
      return {
        isOk: false,
        error: new ValidationError("Invalid Password", errors),
      };
    }
    return { isOk: true, value: new Password(value) };
  }

  static fromPersistence(value: string): Password {
    return new Password(value);
  }
}
