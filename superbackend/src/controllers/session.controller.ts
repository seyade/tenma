import { Request, Response, NextFunction } from "express";
import {
  getSessions,
  getSessionById,
  getSessionsByUserId,
  getCurrentUserSession,
  deleteSession,
} from "../services/session.service";
import appAssert from "../utils/appAssert";

export const getSessionsController = async (
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

export const getSessionByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const session = await getSessionById(parseInt(req.params.id));
    return res.status(200).json(session);
  } catch (error) {
    next(error);
  }
};

export const getSessionsByUserIdController = async (
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

export const getCurrentUserSessionController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const currentSession = await getCurrentUserSession(req.params.userId);
    return res.status(200).json(currentSession);
  } catch (error) {
    next(error);
  }
};

export const deleteSessionController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const session = await deleteSession(parseInt(req.params.id), req.userId);
    appAssert(session, 404, "Session not found.");
    return res.status(200).json({ message: "Session is removed." });
  } catch (error) {
    next(error);
  }
};
