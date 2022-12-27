import { Application, NextFunction, Request, Response } from "express";

import validateToken from "../middleware/authentication";
import { UserStore } from "../models/users";

const store = new UserStore();
const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await store.show(Number(userId));
    res.json(user);
  } catch (error) {
    next(error);
  }
};
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { first_name, last_name, password } = req.query;
    const userCredentials = await store.create(
      String(first_name),
      String(last_name),
      String(password)
    );
    res.send(userCredentials);
  } catch (error) {
    next(error);
  }
};
const usersRoutes = (app: Application) => {
  app.get("/users", validateToken, index);
  app.get("/users/show/:userId", validateToken, show);
  app.post("/users/create", create);
};
export default usersRoutes;
