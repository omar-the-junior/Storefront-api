import Client from "../database";
import bcrypt from "bcrypt";
export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

export type Credentials = {
  user: User;
  token: string;
};

import jwt from "jsonwebtoken";

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(`An unexpected error occurred: ${error}`);
      }
    }
  }

  async show(id: number): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM users WHERE id = $1";
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(`An unexpected error occurred: ${error}`);
      }
    }
  }

  async create(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<Credentials> {
    try {
      const connection = await Client.connect();

      const { SALT_ROUNDS, PEPPER, JWT_SECRET } = process.env;
      const hashedPassword = await bcrypt.hash(
        password + PEPPER,
        Number(SALT_ROUNDS)
      );

      const sql =
        "INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *;";
      const queryResults = await connection.query(sql, [
        firstName,
        lastName,
        hashedPassword,
      ]);

      const user: User = queryResults.rows[0];
      const token = jwt.sign(
        {
          fullName: user.firstname + user.lastname,
          id: user.id,
        },
        String(JWT_SECRET)
      );
      connection.release();

      return { user, token };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(`An unexpected error occurred: ${error}`);
      }
    }
  }
}
