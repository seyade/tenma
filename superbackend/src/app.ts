import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import globalAppErrorHandler from "./middlewares/globalAppErrorHandler";
import handleErrors from "./utils/handleErrors";
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
  handleErrors((req, res, next): any => {
    return res.status(200).json({ message: "All good over here." });
  })
);

app.use(`${process.env.API_PATH}/auth`, authRoutes);

app.use(globalAppErrorHandler);

export default app;
