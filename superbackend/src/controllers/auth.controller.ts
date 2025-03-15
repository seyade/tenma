import catchErrors from "../utils/catchErrors";
import { z } from "zod";

const registerSchema = z
  .object({
    username: z.string().min(3).max(255),
    email: z.string().email().min(3),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password do not match.",
    path: ["confirmPassword"],
  });

export const registerController = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
});
