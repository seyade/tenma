import { ErrorRequestHandler, Response } from "express";
import { z } from "zod";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
  return res.status(400).json({ message: error.message, errors });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next): any => {
  console.log(`PATH: ${req.path}`, error);

  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  return res.status(500).send("INTERNAL_SERVER_ERROR");
};

export default errorHandler;
