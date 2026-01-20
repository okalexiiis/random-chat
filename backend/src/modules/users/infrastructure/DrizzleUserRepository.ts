import { eq, sql, and, or, ilike } from "drizzle-orm";
import db from "@core/db/drizzle";
import { users } from "@core/db/drizzle/schemas/users";
import { User } from "../../domain/User";
import { Username } from "../../domain/value-objects/Username";
import { Password } from "../../domain/value-objects/Password";
import { UserRepository, PaginationOptions, PaginatedUsers } from "../../application/user.repository";

export class DrizzleUserRepository implements UserRepository {
  async findOne(criteria: { id?: string; username?: string }): Promise<User | null> {
    let whereClause = undefined;

    if (criteria.id && criteria.username) {
      whereClause = and(eq(users.id, criteria.id), eq(users.username, criteria.username));
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
    return User.fromPersistence(
      row.id,
      Username.fromPersistence(row.username),
      Password.fromPersistence(row.password)
    );
  }

  async findAll(options: PaginationOptions): Promise<PaginatedUsers> {
    const { page, limit, filters } = options;
    const offset = (page - 1) * limit;

    let whereClause = undefined;
    if (filters?.username) {
      whereClause = ilike(users.username, `%${filters.username}%`);
    }

    const [usersResult, totalResult] = await Promise.all([
      db.select().from(users).where(whereClause).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(users).where(whereClause)
    ]);

    const total = totalResult[0].count;

    const usersMapped = usersResult.map(row =>
      User.fromPersistence(
        row.id,
        Username.fromPersistence(row.username),
        Password.fromPersistence(row.password)
      )
    );

    return {
      users: usersMapped,
      total,
      page,
      limit,
    };
  }

  async save(user: User): Promise<User> {
    const result = await db.insert(users).values({
      username: user.username.value,
      password: user.password.value,
    }).returning();

    const inserted = result[0];
    return User.fromPersistence(
      inserted.id,
      Username.fromPersistence(inserted.username),
      Password.fromPersistence(inserted.password)
    );
  }

  async update(user: User): Promise<User> {
    const result = await db.update(users).set({
      username: user.username.value,
      password: user.password.value,
    }).where(eq(users.id, user.id)).returning();

    if (result.length === 0) throw new Error("User not found for update");

    const updated = result[0];
    return User.fromPersistence(
      updated.id,
      Username.fromPersistence(updated.username),
      Password.fromPersistence(updated.password)
    );
  }

  async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }
}