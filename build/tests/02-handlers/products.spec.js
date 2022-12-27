"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe("Endpoint test for /products", () => {
    it("Should successfully get all products", () => {
        request.get("/products").expect(200);
    });
    it("should successfully return a certain product", () => {
        request.get("/products/1").expect(200);
    });
    it("Should not allow creating of a new product without a valid token", () => {
        request.post("/products/create/").expect(401);
    });
});
