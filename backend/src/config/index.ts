import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

export const config = {
  PORT: Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET,
  tokenSecret: process.env.ACCESS_TOKEN_SECRET,
  prisma: new PrismaClient(),
};

export const prisma = new PrismaClient();
// export const prisma = new PrismaClient({ log: ["query"] });
