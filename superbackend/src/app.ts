import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import config from "./config";
import globalAppErrorHandler from "./middlewares/globalAppErrorHandler";
import handleErrors from "./utils/handleErrors";
import authRoutes from "./routes/auth.route";

dotenv.config();

const app = express();

app.use(morgan("dev"));
// TODO: uncomment when code is ready: app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_ORIGIN,
  })
);
app.use(cookieParser());

app.get(
  "/",
  handleErrors((req, res, next): any => {
    return res.status(200).json({ message: "All good over here." });
  })
);

// routes
app.use(`${config.API_PATH}/auth`, authRoutes);

app.use(globalAppErrorHandler);

export default app;
