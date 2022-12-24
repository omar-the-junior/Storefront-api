"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = __importDefault(require("../middleware/authentication"));
const orders_1 = require("../models/orders");
const store = new orders_1.OrderStore();
const currentOrders = async (req, res, next) => {
    try {
        const orders = await store.currentOrder(Number(req.query.user_id));
        res.json(orders);
    }
    catch (error) {
        next(error);
    }
};
const completedOrders = async (req, res, next) => {
    try {
        const orders = await store.completedOrders(Number(req.query.user_id));
        res.json(orders);
    }
    catch (error) {
        next(error);
    }
};
const ordersRoutes = (app) => {
    app.get("/orders/current", authentication_1.default, currentOrders);
    app.get("/orders/complete", authentication_1.default, completedOrders);
};
exports.default = ordersRoutes;
