import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 4001,
  prisma: new PrismaClient(),
};

export default config;
