import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User, UserStore } from "../models/user.model";
import auth from "./middlewares/auth";

dotenv.config();
const store = new UserStore();

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);

    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const index = async (_req: Request, res: Response) => {
  try {
    const users: User[] = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user: User = await store.show(parseInt(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const user_routes = (app: express.Application) => {
  app.get("/users", auth.verifyAuthToken, index);
  app.post("/users", create);
  app.get("/users/:id", auth.verifyAuthToken, show);
};

export default user_routes;
