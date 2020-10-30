import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Request, Response } from "express";

export interface MyContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
}

export const isAuthenticated: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorized = context.req.headers["authorized"]; // e.g. 'Bearer 102930ajslkdaoq01'
  const authorizedString = Array.isArray(authorized)
    ? authorized[0]
    : authorized;

  if (!authorizedString) {
    throw new Error("You are not authenticated!");
  }

  try {
    const token = authorizedString.split(" ")[1];
    const payload = verify(token, "SUPER_SECRET");
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("You are not authenticated!");
  }

  return next();
};
