import app from "../../server";
import supertest from "supertest";
import jwt from "jsonwebtoken";

const request = supertest(app);
describe("Endpoint test for /products", () => {
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

  it("Should successfully get all products", async function (this: AccessToken) {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });
  it("should successfully return a certain product", async function (this: AccessToken) {
    const response = await request.get("/products/1");
    expect(response.status).toBe(200);
  });
  it("Should not allow creating of a new product without a valid token", async function (this: AccessToken) {
    const response = await request
      .post("/products/create/")
      .auth(this.token, { type: "bearer" })
      .query({ name: "sugar", category: "Grocery", price: 30 });
    expect(response.status).toBe(200);
  });
});
