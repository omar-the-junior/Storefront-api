import app from "../../server";
import supertest from "supertest";
import jwt from "jsonwebtoken";

const request = supertest(app);
describe("Endpoint test for /users", () => {
  type AccessToken = {
    token: string;
  };

  beforeAll(function (this: AccessToken) {
    const plainToken = jwt.sign(
      {
        fullName: "Omar masoud",
        id: 1,
      },
      process.env.JWT_SECRET as string
    );
    this.token = plainToken;
  });

  it("should return a response 200 (Ok) when accessing /users ", async function (this: AccessToken) {
    const response = await request
      .get("/users/")
      .auth(this.token, { type: "bearer" });

    expect(response.status).toBe(200);
  });

  it("should return a response 200 (ok) when creating a user through /users/create", async function (this: AccessToken) {
    const response = await request
      .post("/users/create")
      .auth(this.token, { type: "bearer" });
    expect(response.status).toBe(200);
  });
  it("should return 200 when accessing a specific user through user/:userId", async function (this: AccessToken) {
    const response = await request
      .get("/users/show/1")
      .auth(this.token, { type: "bearer" });
    expect(response.status).toBe(200);
  });
});
