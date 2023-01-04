"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserStore {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * FROM users";
            const result = await connection.query(sql);
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
    async show(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * FROM users WHERE id = $1";
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
    async create(firstName, lastName, password) {
        try {
            const connection = await database_1.default.connect();
            const { SALT_ROUNDS, PEPPER, JWT_SECRET } = process.env;
            const hashedPassword = await bcrypt_1.default.hash(password + PEPPER, Number(SALT_ROUNDS));
            const sql = "INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *;";
            const queryResults = await connection.query(sql, [
                firstName,
                lastName,
                hashedPassword,
            ]);
            const user = queryResults.rows[0];
            const token = jsonwebtoken_1.default.sign({
                fullName: user.firstname + user.lastname,
                id: user.id,
            }, String(JWT_SECRET));
            connection.release();
            return { user, token };
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
exports.UserStore = UserStore;
