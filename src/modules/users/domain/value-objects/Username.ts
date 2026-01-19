export class Username {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Username {
    if (!value || value.length < 3) throw new Error("Username inválido");
    return new Username(value);
  }

  static fromPersistence(value: string): Username {
    return new Username(value);
  }
}
