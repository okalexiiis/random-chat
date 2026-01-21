//src/modules/users/application/interfaces.ts
export interface PasswordHasher {
  hash(plainPassword: string): Promise<string>;
}
