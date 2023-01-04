import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { JWT_SECRET } = process.env;

    const [bearer, token] = req.headers.authorization?.split(" ") as string[];
    jwt.verify(token, String(JWT_SECRET));
    next();
  } catch (error) {
    res.status(401).send("You are unauthorized");
  }
};

export default validateToken;
