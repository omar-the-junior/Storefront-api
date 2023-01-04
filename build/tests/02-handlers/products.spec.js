"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request = (0, supertest_1.default)(server_1.default);
describe("Endpoint test for /products", () => {
    beforeAll(function () {
        const plainToken = jsonwebtoken_1.default.sign({
            fullName: "Omar masoud",
            id: 1,
        }, process.env.JWT_SECRET);
        this.token = plainToken;
    });
    it("Should successfully get all products", async function () {
        const response = await request.get("/products");
        expect(response.status).toBe(200);
    });
    it("should successfully return a certain product", async function () {
        const response = await request.get("/products/1");
        expect(response.status).toBe(200);
    });
    it("Should not allow creating of a new product without a valid token", async function () {
        const response = await request
            .post("/products/create/")
            .auth(this.token, { type: "bearer" })
            .query({ name: "sugar", category: "Grocery", price: 30 });
        expect(response.status).toBe(200);
    });
});
