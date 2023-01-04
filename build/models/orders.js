"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async create(products, userId, status) {
        const connection = await database_1.default.connect();
        const orderInsertQuery = `INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *;`;
        const createdOrders = await connection.query(orderInsertQuery, [
            userId,
            status,
        ]);
        const order = createdOrders.rows[0];
        let productOrderQuery = `INSERT INTO order_products(order_id, product_id, product_quantity) VALUES`;
        let n = 1;
        for (let index = 0; index < products.length; index++) {
            if (index > 0) {
                productOrderQuery += ",";
            }
            productOrderQuery += ` ($${n++},$${n++},$${n++})`;
            if (index === products.length - 1)
                productOrderQuery += ` RETURNING *;`;
        }
        const productOrders = products.flatMap((productsObject) => [
            order.id,
            ...Object.values(productsObject),
        ]);
        const createdOrder = await connection.query(productOrderQuery, productOrders);
        order.products = createdOrder.rows;
        connection.release();
        return order;
    }
    async currentOrder(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE user_id = $1 AND status = $2`;
            const result = await connection.query(sql, [id, "active"]);
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
    async completedOrders(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE user_id = $1 AND status = $2";
            const result = await connection.query(sql, [id, "complete"]);
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
exports.OrderStore = OrderStore;
