import { apis } from './util/api';
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { getConfigs } from "./configs/configs";
import { blogRouter } from './routes/blog-routes';
import { InternalServer } from './util/http-request';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./configs/swagger.json";
const app = express();
const PORT = process.env.PORT || 3000;
const {head} = apis
const { MONGO_URL, CLIENT_HOST } = getConfigs();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", CLIENT_HOST);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, application/json"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(head, blogRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new InternalServer("Could not find this route!");
    return next(res.status(error.code).json(error));
  });

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
