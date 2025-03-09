import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { config } from "../config";

dotenv.config();

import projectRoutes from "./routes/project.route";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(`${process.env.API_URL}/projects`, projectRoutes);
app.use(`${process.env.API_URL}/users`, userRoutes);
app.use(`${process.env.API_URL}/auth`, authRoutes);

export const startServer = () => {
  return app.listen(config.PORT, "0.0.0.0", () => {
    console.log(`Serving on port http://localhost:${config.PORT}`);
  });
};
