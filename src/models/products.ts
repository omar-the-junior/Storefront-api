import Client from "../database";

export type Product = {
  id?: Number;
  name: string;
  price: number;
  category: string;
};
export class ProductStore {
  async create(
    name: string,
    price: number,
    category: string
  ): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *;";

      const result = await connection.query(sql, [name, price, category]);
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

  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM products";
      connection.release();
      const result = await connection.query(sql);
      return result.rows;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(`An unexpected error occurred: ${error}`);
      }
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM products WHERE id = $1";
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
  async showProductsByCategory(category: string) {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM products WHERE category = $1";
      const result = await connection.query(sql, [category]);
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
}
