import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import config from "../config";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import jwt from "jsonwebtoken";

type CreateAccount = {
  userId?: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccount) => {
  const { email, username, password, isVerified, userAgent } = data;

  // check user doesn't exist
  const userExist = await config.prisma.user.findUnique({
    where: { username },
  });

  if (userExist) {
    throw new Error("User already exist");
  }

  // create user
  const userId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await config.prisma.user.create({
    data: {
      userId,
      username,
      email,
      password: hashedPassword,
      isVerified,
    },
  });

  // create verification code
  const verificationCode = generateVerificationCode();

  // send verification email
  // create session?
  const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const session = await config.prisma.session.create({
    data: {
      userId,
      userAgent,
      createdAt: new Date(Date.now()),
      expiredAt: expiryDate,
    },
  });

  // jwt: sign access token and refresh token
  const refreshToken = jwt.sign(
    { sessionId: session.id },
    process.env.JWT_REFRESH_TOKEN_SECRET as string,
    { expiresIn: "30d", audience: ["user"] }
  );

  const accessToken = jwt.sign(
    { userId, sessionId: session.id },
    process.env.JWT_TOKEN_SECRET as string,
    { expiresIn: "30m", audience: ["user"] }
  );

  // return user and access tokens
  return { user, refreshToken, accessToken };
};
