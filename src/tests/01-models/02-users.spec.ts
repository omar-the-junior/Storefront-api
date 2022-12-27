import { Credentials, User, UserStore } from "../../models/users";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
describe("Model tests for users", () => {
  const store = new UserStore();

  describe("Check if all users methods work", () => {
    type CreatedUser = {
      credentials: Credentials[];
      usersInfo: User[];
    };

    beforeAll(async function (this: CreatedUser) {
      this.credentials = [
        await store.create("Mohammed", "Junior", "password123"),
        await store.create("Mostafa", "Goda", "password123"),
        await store.create("Mike", "Tyson", "password123"),
      ];
      this.usersInfo = this.credentials.map((data) => data.user);
    });

    it("Should create a new user and hash the password correctly", async function (this: CreatedUser) {
      const { PEPPER } = process.env;

      expect([
        this.credentials[0].user.firstname,
        this.credentials[0].user.lastname,
        true,
      ]).toEqual([
        "Mohammed",
        "Junior",
        await bcrypt.compare(
          "password123" + PEPPER,
          this.credentials[0].user.password
        ),
      ]);
    });

    it("Should index all users", async function (this: CreatedUser) {
      const allUsers = await store.index();

      expect(allUsers).toEqual(this.usersInfo);
    });

    it("Should show a specific user", async function (this: CreatedUser) {
      const user = await store.show(1);
      expect(user).toEqual(this.usersInfo[0]);
    });
  });
});
