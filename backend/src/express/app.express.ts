import express, { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = Router();

app.use("/");

router.get("/", async (req, res) => {
  res.json({ message: "test backend of tenma" });
});

export default app;
