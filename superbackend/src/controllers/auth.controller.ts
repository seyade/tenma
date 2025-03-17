import { z } from "zod";
import { createAccount } from "../services/auth.service";
import handleErrors from "../utils/handleErrors";
import {
  setAccessTokenCookieOptions,
  setRefreshTokenCookieOptions,
} from "../utils/manageCookies";

const registerSchema = z
  .object({
    username: z.string().min(3).max(255),
    email: z.string().email().min(3),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
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
