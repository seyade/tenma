import { CookieOptions } from "express";
import dotenv from "dotenv";
import config from "../config";
import { period } from "../config/constant";

dotenv.config();

const secure = process.env.NODE_ENV !== "development";

const defaultOptions: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure,
};

export const setAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaultOptions,
  expires: period.FIFTEEN_DAYS,
});

export const setRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaultOptions,
  expires: period.THIRTY_DAYS,
  path: `${config.API_PATH}/auth/refresh`,
});
