"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateToken = async (req, res, next) => {
    try {
        const { JWT_SECRET } = process.env;
        const [bearer, token] = req.headers.authorization?.split(" ");
        const tokenIsValid = jsonwebtoken_1.default.verify(token, String(JWT_SECRET));
        next();
    }
    catch (error) {
        res.status(401).send("You are unauthorized");
    }
};
exports.default = validateToken;
