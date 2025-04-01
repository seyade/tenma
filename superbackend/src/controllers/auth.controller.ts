import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import dotenv from "dotenv";

import {
  createAccount,
  getSessions,
  getSessionById,
  getSessionsByUserId,
  refreshUserAccessToken,
  signInUser,
  signOutUser,
} from "../services/auth.service";
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

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const request = registerSchema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    });

    const { user, accessToken, refreshToken } = await createAccount(request);

    res
      .cookie("accessToken", accessToken, setAccessTokenCookieOptions())
      .cookie("refreshToken", refreshToken, setRefreshTokenCookieOptions());

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const signInController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const refreshController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const refreshToken = req.cookies.refreshToken as string;

  try {
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
  } catch (error) {
    next(error);
  }
};

export const signOutController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const accessToken = req.cookies.accessToken;
    const { payload } = verifyToken(accessToken);

    await signOutUser(payload);

    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken", {
        path: `${process.env.API_PATH}/auth/refresh`,
      })
      .status(200)
      .json({ message: "Signed out successfully." });
  } catch (error) {
    next(error);
  }
};

export const sessionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const sessions = await getSessions();
    return res.status(200).json({ sessions });
  } catch (error) {
    next(error);
  }
};

export const sessionByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.log("PARAMS:ID:: ", req.params.id);

  try {
    const session = await getSessionById(parseInt(req.params.id));
    return res.status(200).json(session);
  } catch (error) {
    next(error);
  }
};

export const sessionsByUserIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userSessions = await getSessionsByUserId(req.params.userId);
    return res.status(200).json(userSessions);
  } catch (error) {
    next(error);
  }
};
