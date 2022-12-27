import app from "../../server";
import supertest from "supertest";

const request = supertest(app);

describe("Endpoint test for /orders", () => {
  it("Should return 401 due to unauthorized token for /orders/current route", () => {
    request.get("/orders/current").expect(401);
  });
  it("Should return 401 due to unauthorized token for /orders/complete route", () => {
    request.get("/orders/complete").expect(401);
  });
});
