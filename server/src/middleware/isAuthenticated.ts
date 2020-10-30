import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Request, Response } from "express";

export interface MyContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
}

export const isAuthenticated: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers.authorization; // e.g. 'Bearer 102930ajslkdaoq01'

  if (!authorization) {
    throw new Error("You are not authenticated!");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, "SUPER_SECRET");
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("You are not authenticated!");
  }

  return next();
};
