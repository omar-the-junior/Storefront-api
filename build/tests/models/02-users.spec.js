"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../models/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
describe("Model tests for users", () => {
    const store = new users_1.UserStore();
    describe("Check if all users methods work", () => {
        beforeAll(async function () {
            this.credentials = [
                await store.create("Mohammed", "Junior", "password123"),
                await store.create("Mostafa", "Goda", "password123"),
                await store.create("Mike", "Tyson", "password123"),
            ];
            this.usersInfo = this.credentials.map((data) => data.user);
        });
        it("Should create a new user and hash the password correctly", async function () {
            const { PEPPER } = process.env;
            expect([
                this.credentials[0].user.firstname,
                this.credentials[0].user.lastname,
                true,
            ]).toEqual([
                "Mohammed",
                "Junior",
                await bcrypt_1.default.compare("password123" + PEPPER, this.credentials[0].user.password),
            ]);
        });
        it("Should index all users", async function () {
            const allUsers = await store.index();
            expect(allUsers).toEqual(this.usersInfo);
        });
        it("Should show a specific user", async function () {
            const user = await store.show(1);
            expect(user).toEqual(this.usersInfo[0]);
        });
    });
});
