import app from "../../server";
import supertest from "supertest";

const request = supertest(app);
describe("Endpoint test for /products", () => {
  it("Should successfully get all products", () => {
    request.get("/products").expect(200);
  });
  it("should successfully return a certain product", () => {
    request.get("/products/1").expect(200);
  });
  it("Should not allow creating of a new product without a valid token", () => {
    request.post("/products/create/").expect(401);
  });
});
