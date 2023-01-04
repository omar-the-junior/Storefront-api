"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request = (0, supertest_1.default)(server_1.default);
describe("Endpoint test for /users", () => {
    beforeAll(function () {
        const plainToken = jsonwebtoken_1.default.sign({
            fullName: "Omar masoud",
            id: 1,
        }, process.env.JWT_SECRET);
        this.token = plainToken;
    });
    it("should return a response 200 (Ok) when accessing /users ", async function () {
        const response = await request
            .get("/users/")
            .auth(this.token, { type: "bearer" });
        expect(response.status).toBe(200);
    });
    it("should return a response 200 (ok) when creating a user through /users/create", async function () {
        const response = await request
            .post("/users/create")
            .auth(this.token, { type: "bearer" });
        expect(response.status).toBe(200);
    });
    it("should return 200 when accessing a specific user through user/:userId", async function () {
        const response = await request
            .get("/users/show/1")
            .auth(this.token, { type: "bearer" });
        expect(response.status).toBe(200);
    });
});
