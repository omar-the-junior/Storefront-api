"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = __importDefault(require("../middleware/authentication"));
const products_1 = require("../models/products");
const store = new products_1.ProductStore();
const index = async (_req, res, next) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (error) {
        next(error);
    }
};
const show = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const createdProduct = await store.show(Number(productId));
        res.json(createdProduct);
    }
    catch (error) {
        next(error);
    }
};
const create = async (req, res, next) => {
    try {
        const { name, price, category } = req.query;
        const createdProduct = await store.create(String(name), Number(price), String(category));
        res.json(createdProduct);
    }
    catch (error) {
        next(error);
    }
};
const productsRoutes = (app) => {
    app.get("/products", index);
    app.get("/products/:productId", show);
    app.post("/products/create", authentication_1.default, create);
};
exports.default = productsRoutes;
