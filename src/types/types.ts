import { NextFunction, Request, Response } from "express";

export interface Config {
  MONGO_URL: string;
  PORT: number;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  CLIENT_HOST: string;
  SERVER_HOST: string;
  COOKIE_CORS_DOMAIN: string;
}
export type ErrorMiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
  err: Error
) => void;

export interface MiddlewareFunction {
  (req: Request, res: Response, next: NextFunction): void;
}

export interface CreateBlog {
  title: string;
  brief: string;
  content: string[];
  creator: string;
  createdAt: string;
}
export interface IBlog {
  title: string;
  brief: string;
  content: string[];
  creator: string;
  createdAt: string;
}
export interface UpdateBlog {
  id: number;
  title: string;
  brief: string;
  content: string[];
  creator: string;
  createdAt: string;
}

export interface BlogRequestQuery {
  currentPage?: number;
  size?: number;
}
