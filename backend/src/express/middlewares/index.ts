import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized." });

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) return res.status(403).json({ message: "Token not valid." });

      req.user = user;
      next();
    }
  );
};

export const verifyToken: RequestHandler = (
  req,
  res,
  next
): Response<{ message?: string }> | any => {
  const authToken = req.cookies.authToken;

  if (!authToken) {
    return res.status(401).json({ message: "Unauthorised: no token found." });
  }

  try {
    const decoded = jwt.verify(authToken, config.tokenSecret!) as {
      userId: string;
    };

    if (!decoded)
      return res
        .status(401)
        .json({ message: "Unauthorised: token is not valid." });
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(500).json({ message: `ERR_SERVER_AUTH:: ${error}` });
  }
};
