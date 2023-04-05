import express, { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyAuthToken: RequestHandler = (req: Request, res: Response, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(403).json({ error: "No credentials sent!" });
    }
    const token = authorizationHeader.split(" ")[1] as string;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (error) {
    res.status(401);
  }
};

const verifyAuthorToken: RequestHandler = (req: Request, res: Response, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(403).json({ error: "No credentials sent!" });
    }
    const token = authorizationHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET as string);
    
    if (!decoded.user || decoded.user.id !== parseInt(req.params.id)) {
      return res.status(400).json({ error: "User id does not match!" });
    }
    next();
  } catch (error) {
    res.status(401);
  }
};

export default { verifyAuthToken, verifyAuthorToken };
