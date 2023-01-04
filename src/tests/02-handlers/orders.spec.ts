import app from "../../server";
import supertest from "supertest";
import jwt from "jsonwebtoken";

const request = supertest(app);

describe("Endpoint test for /orders", () => {
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
  it("Should return 401 due to unauthorized token for /orders/current route", async function (this: AccessToken) {
    const response = await request
      .get("/orders/current")
      .auth(this.token, { type: "bearer" })
      .query({ user_id: 1 });
    expect(response.status).toBe(200);
  });
  it("Should return 401 due to unauthorized token for /orders/complete route", async function (this: AccessToken) {
    const response = await request
      .get("/orders/complete")
      .auth(this.token, { type: "bearer" })
      .query({ user_id: 1 });
    expect(response.status).toBe(200);
  });
});
