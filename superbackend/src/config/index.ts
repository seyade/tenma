import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 4001,
  prisma: new PrismaClient(),
  API_PATH: process.env.API_PATH,
};

export default config;
