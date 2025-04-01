import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import config from "./config";
import globalAppErrorHandler from "./middlewares/globalAppErrorHandler";
import authenticate from "./middlewares/authenticate";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";

dotenv.config();

const app = express();

app.use(morgan("dev"));
// TODO: uncomment when code is ready: app.use(helmet());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_ORIGIN,
  })
);
app.use(cookieParser());

app.get("/", (req, res, next): any => {
  return res.status(200).json({ message: "Healthy ✅" });
});

// routes
app.use(`${config.API_PATH}/auth`, authRoutes);
app.use(`${process.env.API_PATH}/user`, authenticate, userRoutes);
app.use(`${process.env.API_PATH}/session`, authenticate, sessionRoutes);

app.use(globalAppErrorHandler);

export default app;
