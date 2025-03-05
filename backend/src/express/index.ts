import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { config } from "../config";

dotenv.config();

import projectRoutes from "./routes/project.route";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/tenma/projects", projectRoutes);
app.use("/api/tenma/users", userRoutes);

/**
 * routes:
 * - /api/tenma/auth/signup
 * - /api/tenma/auth/signin
 * - /api/tenma/auth/signout
 */
app.use("/api/tenma/auth", authRoutes);

export const startServer = () => {
  app.listen(config.PORT, "0.0.0.0", () => {
    console.log(`Ten.Ma serving on port http://localhost:${config.PORT}`);
  });
};
