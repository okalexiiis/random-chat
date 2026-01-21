//src/modules/users/application/interfaces.ts
export interface PasswordHasher {
  hash(plainPassword: string): Promise<string>;
  compare(plainPassword: string, hashedPassword: string): Promise<boolean>;
}

export interface TokenService {
  generate(payload: { userId: string; username: string }): Promise<string>;
  verify(token: string): Promise<{ userId: string; username: string }>;
}
