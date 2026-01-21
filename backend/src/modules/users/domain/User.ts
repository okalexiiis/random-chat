import { Password } from "./value-objects/Password";
import { Username } from "./value-objects/Username";

/**
 * Interface that represents an User from Persistence (DB)
 */
interface UserPersistence {
  id: string;
  username: string;
  password: string;
}

/**
 * User Domain Entity Class
 * @readonly id
 * @readonly username
 * @readonly password
 */
export class User {
  readonly id: string;
  readonly username: Username;
  readonly password: Password;

  private constructor(id: string, username: Username, password: Password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  /**
   *
   * @param raw UserPersistence Interface
   * @returns An User entity that is in the DB
   */
  static fromPersistence(raw: UserPersistence) {
    return new User(
      raw.id,
      Username.fromPersistence(raw.username),
      Password.fromPersistence(raw.password),
    );
  }

  /**
   *
   * @param username : Username
   * @param password : Password
   * @returns A New User Instance
   */
  static create(username: Username, password: Password) {
    return new User("", username, password);
  }
}
