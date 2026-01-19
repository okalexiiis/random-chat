export class Password {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Password {
    if (!value || value.length < 3) throw new Error("Username inválido");
    return new Password(value);
  }

  static fromPersistence(value: string): Password {
    return new Password(value);
  }
}
