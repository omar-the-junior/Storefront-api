import { Application, NextFunction, Request, Response } from "express";
import validateToken from "../middleware/authentication";
import { OrderStore } from "../models/orders";

const store = new OrderStore();
const currentOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await store.currentOrder(Number(req.query.user_id));
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const completedOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await store.completedOrders(Number(req.query.user_id));
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
const ordersRoutes = (app: Application) => {
  app.get("/orders/current", validateToken, currentOrders);
  app.get("/orders/complete", validateToken, completedOrders);
};
export default ordersRoutes;
