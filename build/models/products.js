"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async create(name, price, category) {
        try {
            const connection = await database_1.default.connect();
            const sql = "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *;";
            const result = await connection.query(sql, [name, price, category]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error(`An unexpected error occurred: ${error}`);
            }
        }
    }
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * FROM products";
            connection.release();
            const result = await connection.query(sql);
            return result.rows;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error(`An unexpected error occurred: ${error}`);
            }
        }
    }
    async show(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * FROM products WHERE id = $1";
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error(`An unexpected error occurred: ${error}`);
            }
        }
    }
    async showProductsByCategory(category) {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * FROM products WHERE category = $1";
            const result = await connection.query(sql, [category]);
            connection.release();
            return result.rows;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error(`An unexpected error occurred: ${error}`);
            }
        }
    }
}
exports.ProductStore = ProductStore;
