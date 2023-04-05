// @ts-ignore
import Client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export class UserStore {
  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *";

      const hash = bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );

      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      const user = result.rows[0];

      conn.release();
      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.firstname + u.lastname}): ${err}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get users ${id}. Error: ${err}`);
    }
  }
}
