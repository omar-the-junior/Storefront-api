"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe("Endpoint test for /orders", () => {
    it("Should return 401 due to unauthorized token for /orders/current route", () => {
        request.get("/orders/current").expect(401);
    });
    it("Should return 401 due to unauthorized token for /orders/complete route", () => {
        request.get("/orders/complete").expect(401);
    });
});
