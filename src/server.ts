import express, { Request, Response } from "express";
import dotenv from "dotenv";
import productsRoutes from "./handlers/products";
import usersRoutes from "./handlers/users";
import ordersRoutes from "./handlers/orders";
import request from "supertest";
const app: express.Application = express();
const address: string = "127.0.0.1:3000";

// express V 4.16+ comes with it's own body-parser implementation.
app.use(express.json());

dotenv.config();

const { PORT } = process.env;

app.get("/", function (_req: Request, res: Response) {
  res.send("Hello World!");
});

productsRoutes(app);
usersRoutes(app);
ordersRoutes(app);

// (async function () {
//   const createdUser = await request(app)
//     .post("/users/create")
//     .query({ first_name: "Mike", last_name: "Tyson", password: "Champ123" })
//     .expect(200);
//   const token = createdUser.body.token;
//   const userInfo = createdUser.body.user;
//   console.log(token, userInfo);
// })();
app.listen(PORT || 3000, function () {
  console.log(`starting app on: http://${address}`);
});

export default app;
