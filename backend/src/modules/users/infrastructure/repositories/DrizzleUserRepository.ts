import { eq, sql, and, or, ilike } from "drizzle-orm";
import db from "@core/db/drizzle";
import { users } from "@core/db/drizzle/schemas/users";
import { User } from "../../domain/User";
import { Username } from "../../domain/value-objects/Username";
import { Password } from "../../domain/value-objects/Password";
import { UserRepository } from "../../application/repositories";

export class DrizzleUserRepository implements UserRepository {
  async findOne(criteria: {
    id?: string;
    username?: string;
  }): Promise<User | null> {
    let whereClause = undefined;

    if (criteria.id && criteria.username) {
      whereClause = and(
        eq(users.id, criteria.id),
        eq(users.username, criteria.username),
      );
    } else if (criteria.id) {
      whereClause = eq(users.id, criteria.id);
    } else if (criteria.username) {
      whereClause = eq(users.username, criteria.username);
    } else {
      throw new Error("At least one criterion must be provided");
    }

    const result = await db.select().from(users).where(whereClause).limit(1);
    if (result.length === 0) return null;
    const row = result[0];
    return User.fromPersistence({
      id: row.id,
      username: Username.fromPersistence(row.username).value,
      password: Password.fromPersistence(row.password).value,
    });
  }

  async save(user: User): Promise<User> {
    const result = await db
      .insert(users)
      .values({
        username: user.username.value,
        password: user.password.value,
      })
      .returning();

    const inserted = result[0];
    return User.fromPersistence({
      id: inserted.id,
      username: Username.fromPersistence(inserted.username).value,
      password: Password.fromPersistence(inserted.password).value,
    });
  }
}
