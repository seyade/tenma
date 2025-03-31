import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import config from "../config";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import appAssert from "../utils/appAssert";
import {
  AccesToken,
  authToken,
  RefreshToken,
  refreshTokenOptions,
  verifyToken,
} from "../utils/manageAccessTokens";
import { period } from "../config/constant";
period;

type CreateAccount = {
  userId?: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  userAgent?: string;
};

type SignInUser = {
  userId?: string;
  email: string;
  password: string;
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
    select: {
      userId: true,
      username: true,
      email: true,
      isVerified: true,
    },
  });

  // TODO: create verification code and send it via email
  const verificationCode = generateVerificationCode();

  // TODO: send verification email

  const expiryDate = period.THIRTY_DAYS;
  const session = await config.prisma.session.create({
    data: {
      userId,
      userAgent,
      createdAt: new Date(Date.now()),
      expiresAt: expiryDate,
    },
  });

  const accessToken = authToken({
    userId,
    sessionId: session.id.toString(),
  });

  const refreshToken = authToken(
    { sessionId: session.id.toString() },
    refreshTokenOptions
  );

  return { user, refreshToken, accessToken };
};

export const signInUser = async (data: SignInUser) => {
  const { email, password, userAgent } = data;

  const user = await config.prisma.user.findFirst({ where: { email } });
  appAssert(user, 401, "Unauthorised - Invalid email or password.");

  const isValid = await bcrypt.compare(password, user.password);
  appAssert(isValid, 401, "Unauthorised - Invalid email or password.");

  const expiryDate = period.THIRTY_DAYS;

  const session = await config.prisma.session.create({
    data: {
      userId: user.userId,
      expiresAt: expiryDate,
      userAgent,
    },
  });

  const accessToken = authToken({
    userId: user.userId,
    sessionId: session.id.toString(),
  });

  const refreshToken = authToken(
    { sessionId: session.id.toString() },
    refreshTokenOptions
  );

  return { user, accessToken, refreshToken };
};

export const signOutUser = async (payload: AccesToken | undefined) => {
  if (payload && payload.sessionId) {
    try {
      await config.prisma.session.delete({
        where: { id: parseInt(payload.sessionId) },
      });
    } catch (error) {
      throw new Error(`Failed to delete session:: ${error}`);
    }
  }
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshToken>(refreshToken, {
    secret: refreshTokenOptions.secret,
  });
  appAssert(payload, 401, "Unauthorised - Invalid refresh token.");

  const session = await config.prisma.session.findUnique({
    where: {
      id: parseInt(payload.sessionId),
    },
  });

  if (session?.expiresAt?.getTime()) {
    appAssert(
      session.expiresAt?.getTime() > Date.now(),
      401,
      "Unauthorised - Session has expired"
    );

    // refresh session if it expires in the next 24h
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    const sessionNeedsRefresh =
      session.expiresAt?.getTime() - Date.now() <= TWENTY_FOUR_HOURS;

    if (sessionNeedsRefresh) {
      try {
        const expiryDate = period.THIRTY_DAYS;
        await config.prisma.session.update({
          where: { id: session.id },
          data: {
            expiresAt: expiryDate,
          },
        });
      } catch (error) {
        throw new Error(`Failed to update to a new session:: ${error}`);
      }
    }

    const newRefreshToken = sessionNeedsRefresh
      ? authToken(
          {
            sessionId: session.id.toString(),
          },
          refreshTokenOptions
        )
      : undefined;

    const accessToken = authToken({
      userId: session.userId,
      sessionId: session.id.toString(),
    });

    return {
      accessToken,
      newRefreshToken,
    };
  }
};

export const getSessions = async () => {
  try {
    const sessions = await config.prisma.session.findMany();
    return sessions;
  } catch (error) {
    throw new Error(`Failed to fetch sessions: ${error}`);
  }
};

export const getSessionById = async (id: number) => {
  try {
    const session = await config.prisma.session.findFirst({
      where: { id },
    });
    return session;
  } catch (error) {
    throw new Error(`Failed to fetch session: ${error}`);
  }
};

export const getSessionsByUserId = async (userId: string) => {
  try {
    const userSessions = await config.prisma.session.findMany({
      where: { userId },
    });

    return userSessions;
  } catch (error) {
    throw new Error(`Failed to fetch user sessions: ${error}`);
  }
};
