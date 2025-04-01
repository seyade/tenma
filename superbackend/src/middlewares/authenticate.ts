import { RequestHandler } from "express";
import dotenv from "dotenv";
import appAssert from "../utils/appAssert";
import { verifyToken } from "../utils/manageAccessTokens";

dotenv.config();

const authenticate: RequestHandler = (req, res, next): any => {
  const accessToken = req.cookies.accessToken as string;
  appAssert(accessToken, 401, "Unauthorised - No valid access token.");

  const { payload, error } = verifyToken(accessToken);
  appAssert(
    payload,
    403,
    `Aunithorised - ${
      error === "jwt expired" ? "Token is expired." : "Invalid token."
    }`
  );

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;

  next();
};

export default authenticate;
