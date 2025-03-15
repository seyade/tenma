import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";
import catchErrors from "./utils/catchErrors";

import authRoutes from "./routes/auth.route";

dotenv.config();

const app = express();

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
  catchErrors((req, res, next): any => {
    return res.status(200).json({ message: "All good over here." });
  })
);

app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
