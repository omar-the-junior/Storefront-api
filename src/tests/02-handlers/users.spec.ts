import app from "../../server";
import supertest from "supertest";

const request = supertest(app);
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
