import { RequestHandler } from "express";
import config from "../config";
import appAssert from "../utils/appAssert";

export const getUsersController: RequestHandler = async (
  req,
  res,
  next
): Promise<any> => {
  try {
    const users = await config.prisma.user.findMany({
      omit: { password: true },
    });
    appAssert(users, 404, "No users found.");
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserByIdController: RequestHandler = async (
  req,
  res,
  next
): Promise<any> => {
  try {
    const user = await config.prisma.user.findUnique({
      where: { userId: req.userId },
      omit: {
        password: true,
      },
    });

    appAssert(user, 404, "User not found.");
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
