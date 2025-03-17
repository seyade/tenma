import { CookieOptions } from "express";

const secure = process.env.NODE_ENV !== "development";

const defaultOptions: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure,
};

export const setAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaultOptions,
  expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
});

export const setRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaultOptions,
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  path: "/auth/refresh",
});
