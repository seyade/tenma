import { Request, Response, NextFunction, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { config } from "../../config";
import { generateVerificationCode } from "../../utils/generateVerificationCode";

export interface AuthRequest extends Request {
  userId?: string | number;
}

export const checkAuth: RequestHandler = async (
  req,
  res
): Promise<Response | any> => {
  try {
    const user = await config.prisma.user.findUnique({
      where: { userId: req.userId as string },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: true, message: "User not found." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: `ERR_SERVER_USER_AUTH:: ${error}` });
  }
};

export const signUp = async (req: Request, res: Response): Promise<any> => {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      throw new Error("All fields are required.");
    }

    const isExist = await config.prisma.user.findUnique({
      where: { email, username },
    });

    if (isExist)
      return res.status(400).json({ message: "User already exist." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateVerificationCode();
    const newUserId = uuidv4();

    const newUser = await config.prisma.user.create({
      data: {
        userId: newUserId,
        email,
        username,
        password: hashedPassword,
        verificationCode,
        isVerified: false,
      },
    });

    const token = jwt.sign(
      { userId: newUserId },
      config.tokenSecret as string,
      { expiresIn: "7d" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      succeess: true,
      message: "Account created successfully.",
      user: {
        ...newUser,
        password: undefined,
      },
    });
  } catch (error: any) {
    console.log(`ERR_CREATING_USER: ${error}`);
    res.status(500).json({
      succeess: false,
      message: `ERR_CREATING_USER: ${error?.message}`,
    });
  }
};

export const signIn = async (req: Request, res: Response): Promise<any> => {};

export const signOut = async (req: Request, res: Response): Promise<any> => {};
