import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product.model";
import auth from "./middlewares/auth";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const product = await store.index();
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const productData = await store.create(product);
    res.json(productData);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", auth.verifyAuthToken, create);
};

export default product_routes;
