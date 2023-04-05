import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order.model";
import auth from "./middlewares/auth";

const store = new OrderStore();

const addProduct = async (_req: Request, res: Response) => {
  const orderId: number = parseInt(_req.params.order_id);
  const productId: number = parseInt(_req.body.productId);
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getCurrentOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const order = await store.getCurrentOrdersByUserId(parseInt(req.params.user_id));
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getCompleteOrdersByUserId  = async (req: Request, res: Response) => {
  try {
    const order = await store.getCompleteOrdersByUserId(parseInt(req.params.user_id));
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createOrder = async (req: Request, res: Response) => {
  const order: Order = {
    user_id: parseInt(req.params.user_id),
    status: req.body.status,
  };
  try {
    const ordertData = await store.createOrder(order);
    res.json(ordertData);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const ordertData = await store.deleteOrder(parseInt(req.params.order_id));
    res.json(ordertData);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const order_routes = (app: express.Application) => {
  app.get("/users/:user_id/orders/current", auth.verifyAuthToken, getCurrentOrdersByUserId);
  app.get("/users/:user_id/orders/complete", auth.verifyAuthToken, getCompleteOrdersByUserId);
  app.post("/users/:user_id/orders", auth.verifyAuthToken, createOrder);
  app.delete("/users/:user_id/orders/:order_id", auth.verifyAuthToken, deleteOrder);
  app.post("/users/:user_id/orders/:order_id/products", auth.verifyAuthToken, addProduct);
};

export default order_routes;
