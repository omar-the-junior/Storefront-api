"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DEV_DB, POSTGRES_TEST_DB, POSTGRES_PROD_DB, ENV, } = process.env;
const pg_1 = require("pg");
let Client;
if (ENV === "prod") {
    Client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_PROD_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
else if (ENV === "dev") {
    Client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DEV_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
else {
    Client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
exports.default = Client;
