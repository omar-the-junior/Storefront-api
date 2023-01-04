"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request = (0, supertest_1.default)(server_1.default);
describe("Endpoint test for /orders", () => {
    beforeAll(function () {
        const plainToken = jsonwebtoken_1.default.sign({
            fullName: "Omar masoud",
            id: 1,
        }, process.env.JWT_SECRET);
        this.token = plainToken;
    });
    it("Should return 401 due to unauthorized token for /orders/current route", async function () {
        const response = await request
            .get("/orders/current")
            .auth(this.token, { type: "bearer" })
            .query({ user_id: 1 });
        expect(response.status).toBe(200);
    });
    it("Should return 401 due to unauthorized token for /orders/complete route", async function () {
        const response = await request
            .get("/orders/complete")
            .auth(this.token, { type: "bearer" })
            .query({ user_id: 1 });
        expect(response.status).toBe(200);
    });
});
