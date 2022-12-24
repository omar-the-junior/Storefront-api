import { Application, NextFunction, Request, Response } from "express";
import validateToken from "../middleware/authentication";
import { ProductStore } from "../models/products";

const store = new ProductStore();
const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    next(error);
  }
};
const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const createdProduct = await store.show(Number(productId));
    res.json(createdProduct);
  } catch (error) {
    next(error);
  }
};
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price, category } = req.query;
    const createdProduct = await store.create(
      String(name),
      Number(price),
      String(category)
    );
    res.json(createdProduct);
  } catch (error) {
    next(error);
  }
};
const productsRoutes = (app: Application) => {
  app.get("/products", index);
  app.get("/products/:productId", show);
  app.post("/products/create", validateToken, create);
};
export default productsRoutes;
