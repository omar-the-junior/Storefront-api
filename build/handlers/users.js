"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = __importDefault(require("../middleware/authentication"));
const users_1 = require("../models/users");
const store = new users_1.UserStore();
const index = async (_req, res, next) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
};
const show = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await store.show(Number(userId));
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
const create = async (req, res, next) => {
    try {
        const { first_name, last_name, password } = req.query;
        const userCredentials = await store.create(String(first_name), String(last_name), String(password));
        res.send(userCredentials);
    }
    catch (error) {
        next(error);
    }
};
const usersRoutes = (app) => {
    app.get("/users", authentication_1.default, index);
    app.get("/users/:userId", authentication_1.default, show);
    app.post("/users/create", authentication_1.default, create);
};
exports.default = usersRoutes;
