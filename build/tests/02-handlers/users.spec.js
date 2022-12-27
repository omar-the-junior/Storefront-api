"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe("Endpoint test for /users", () => {
    it("should return 401 unauthorized error due to the missing token", function () {
        request.get("/users/").expect(401);
    });
    it("should require post request to access /users/create route", function () {
        request.get("/users/create").expect(404);
    });
    it("should return 401 unauthorized error due to the missing token in the user/:userId", function () {
        request.get("/users/show/1").expect(401);
    });
});
