import { Knex } from "knex";
import { User } from "../utils/models";
import { hashPassword } from "../utils/hash";

export class AuthService {
  constructor(private knex: Knex) {}

  public async register(
    name: string,
    email: string,
    password: string,
    icon: string,
    phone: string
  ) {
    let hashedPassword = await hashPassword(password);

    const userResult = await this.knex("users").returning("id").insert({
      name,
      email,
      password: hashedPassword,
      icon,
      phone,
    });
    const user_id = userResult[0]["id"];
    return user_id;
  }
  async getUserById(id: number) {
    const user = await this.knex<User>("users")
      .select("*")
      .where({ id })
      .first();
    return user;
  }

  async getUserByEmail(email: string) {
    let foundUser = await this.knex("users")
      .select("*")
      .where("email", email)
      .first();
    return foundUser;
  }

  async getUserByPhone(phone: string) {
    let foundUser = await this.knex("users")
      .select("id")
      .where("phone", phone)
      .first();
    return foundUser;
  }
}
