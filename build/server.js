"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const products_1 = __importDefault(require("./handlers/products"));
const users_1 = __importDefault(require("./handlers/users"));
const orders_1 = __importDefault(require("./handlers/orders"));
const app = (0, express_1.default)();
const address = "127.0.0.1:3000";
// express V 4.16+ comes with it's own body-parser implementation.
app.use(express_1.default.json());
dotenv_1.default.config();
const { PORT } = process.env;
app.get("/", function (_req, res) {
    res.send("Hello World!");
});
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, orders_1.default)(app);
app.listen(PORT || 3000, function () {
    console.log(`starting app on: http://${address}`);
});
