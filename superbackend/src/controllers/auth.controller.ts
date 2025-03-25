import { z } from "zod";
import dotenv from "dotenv";

import {
  createAccount,
  refreshUserAccessToken,
  signInUser,
} from "../services/auth.service";
import handleErrors from "../utils/handleErrors";
import {
  setAccessTokenCookieOptions,
  setRefreshTokenCookieOptions,
} from "../utils/manageCookies";
import { verifyToken } from "../utils/manageAccessTokens";
import config from "../config";
import appAssert from "../utils/appAssert";

dotenv.config();

const signInSchema = z.object({
  userId: z.string().optional(),
  email: z.string().email().min(3),
  password: z.string().min(6).max(255),
  userAgent: z.string().optional(),
});

const registerSchema = signInSchema
  .extend({
    username: z.string().min(3).max(255),
    confirmPassword: z.string().min(6).max(255),
    isVerified: z.boolean().default(false),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password do not match.",
    path: ["confirmPassword"],
  });

export const registerController = handleErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await createAccount(request);

  res
    .cookie("accessToken", accessToken, setAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, setRefreshTokenCookieOptions());

  return res.status(201).json(user);
});

export const signInController = handleErrors(async (req, res) => {
  const request = signInSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { accessToken, refreshToken } = await signInUser(request);

  res
    .cookie("accessToken", accessToken, setAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, setRefreshTokenCookieOptions())
    .status(200)
    .json({ message: "Signed in successfully." });
});

export const refreshController = handleErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string;

  appAssert(refreshToken, 401, "Unauthorized - Missing refresh token.");

  const newUserAcessToken = await refreshUserAccessToken(refreshToken);

  if (refreshToken) {
    res.cookie(
      "refreshToken",
      newUserAcessToken?.newRefreshToken,
      setRefreshTokenCookieOptions()
    );
  }

  return res
    .status(200)
    .cookie(
      "accessToken",
      newUserAcessToken?.accessToken,
      setAccessTokenCookieOptions()
    )
    .json({ message: "Access token refreshed." });
});

export const signOutController = handleErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { payload } = verifyToken(accessToken);

  console.log(payload);

  if (payload && payload.sessionId) {
    try {
      await config.prisma.session.delete({
        where: { id: parseInt(payload.sessionId) },
      });
    } catch (error) {
      throw new Error(`Failed to delete session:: ${error}`);
    }
  }

  return res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", {
      path: `${process.env.API_PATH}/auth/refresh`,
    })
    .status(200)
    .json({ message: "Signed out successfully" });
});

export const sessionController = handleErrors(async (req, res) => {
  try {
    const sessions = await config.prisma.session.findMany();
    return res.status(200).json({ sessions });
  } catch (error) {
    throw new Error(`Failed to get sessions:: ${error}`);
  }
});
