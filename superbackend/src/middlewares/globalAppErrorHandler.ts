import { ErrorRequestHandler, Response } from "express";
import { z } from "zod";
import AppError from "../utils/AppError";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
  return res.status(400).json({ message: error.message, errors });
};

const handleAppError = (res: Response, error: AppError) =>
  res
    .status(error.statusCode)
    .json({ message: error.message, errorCode: error.errorCode });

const globalAppErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  console.log(`PATH: ${req.path}`, error);

  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  if (error instanceof AppError) {
    return handleAppError(res, error);
  }

  return res.status(500).send("INTERNAL_SERVER_ERROR");
};

export default globalAppErrorHandler;
