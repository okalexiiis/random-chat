//src/modules/users/infrastructure/services/JwtTokenService.ts

import { SignJWT, jwtVerify } from "jose";
import { TokenService } from "../../application/interfaces";

export class JwtTokenService implements TokenService {
  private secret: Uint8Array;

  constructor(secret: string) {
    this.secret = new TextEncoder().encode(secret);
  }

  async generate(payload: { userId: string; username: string }): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(this.secret);
  }

  async verify(token: string): Promise<{ userId: string; username: string }> {
    const { payload } = await jwtVerify(token, this.secret);
    return payload as { userId: string; username: string };
  }
}