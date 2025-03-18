import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import config from "../config";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import appAssert from "../utils/appAssert";

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

  const userExist = await config.prisma.user.findUnique({
    where: { email, username },
  });

  /**
   * appAssert() is the same as: if (userExist) throw new Error("User already exist");
   */
  appAssert(
    !userExist,
    409,
    "Username or email already in use by another user."
  );

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

  // TODO: create verification code and send it via email
  const verificationCode = generateVerificationCode();

  // TODO: send verification email

  const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const session = await config.prisma.session.create({
    data: {
      userId,
      userAgent,
      createdAt: new Date(Date.now()),
      expiredAt: expiryDate,
    },
  });

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

  return { user, refreshToken, accessToken };
};
