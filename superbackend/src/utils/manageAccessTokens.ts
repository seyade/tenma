import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

export type RefreshToken = {
  sessionId: string;
};

export type AccesToken = {
  userId: string;
  sessionId: string;
};

export type VerifyToken = {
  token: string;
  options?: VerifyOptions & { secret: string };
};

const defaultSignOpts: SignOptions = {
  audience: ["user"],
};

export const accessTokenOptions: SignOptions & { secret: string } = {
  expiresIn: "30m",
  secret: process.env.JWT_TOKEN_SECRET as string,
};

export const refreshTokenOptions: SignOptions & { secret: string } = {
  expiresIn: "30d",
  secret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
};

/**
 * 
 * @param payload 
 * @param options 
 * @returns 
 * 
 * @example:
 * const accessToken = jwt.sign(
    { userId: user.userId, sessionId: session.id },
    process.env.JWT_TOKEN_SECRET as string,
    { expiresIn: "30m", audience: ["user"] }
  );

  const refreshToken = jwt.sign(
    { sessionId: session.id },
    process.env.JWT_REFRESH_TOKEN_SECRET as string,
    { expiresIn: "30d", audience: ["user"] }
  );
 */
export const authToken = (
  payload: AccesToken | RefreshToken,
  options?: SignOptions & { secret: string }
) => {
  const { secret, ...signOpts } = options || accessTokenOptions;
  return jwt.sign(payload, secret, { ...defaultSignOpts, ...signOpts });
};

export const verifyToken = <T extends object = AccesToken>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  const { secret = process.env.JWT_TOKEN_SECRET as string, ...veryfyOpts } =
    options || {};

  try {
    const payload = jwt.verify(token, secret, {
      ...defaultSignOpts,
      ...veryfyOpts,
    }) as T;

    return { payload };
  } catch (error: any) {
    return { error: error.message };
  }
};
