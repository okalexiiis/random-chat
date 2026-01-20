import type { Result } from "@core/types/Result";
import { ValidationError } from "@core/types/Errors";

export class Username {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Result<Username> {
    const errors: Record<string, string> = {};

    if (!value || value.length < 3) {
      errors.length = "Must be at least 3 characters";
    }
    if (value.length > 20) {
      errors.maxLength = "Must be at most 20 characters";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      errors.characters = "Can only contain letters, numbers, and underscores";
    }

    if (Object.keys(errors).length > 0) {
      return {
        isOk: false,
        error: new ValidationError("Invalid Username", errors),
      };
    }
    return { isOk: true, value: new Username(value) };
  }

  static fromPersistence(value: string): Username {
    return new Username(value);
  }
}
