import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { config } from "../../config";
import { users } from "../../utils/mocks/users";

type User = {
  userId: string;
  name: string;
  password: string;
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await config.prisma.user.findMany();
    res.status(200).json({ users });
  } catch (error) {
    console.log(`ERR_LISTING_USERS: ${error}`);
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  const {
    email = "final@boss.ai",
    userId = "2e08746e-6b11-4f02-90bf-2bf91f0325ad",
  } = req.body;

  try {
    const user = await config.prisma.user.findUnique({
      where: {
        email,
        userId,
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    console.log(`ERR_FINDING_USER: ${error}`);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.body;
  console.log({ message: `User ${userId} is removed` });
  // res.status(204).json({ message: `User ${userId} is removed` });

  try {
    const removedUser = await config.prisma.user.delete({
      where: { userId },
    });
    return res
      .status(204)
      .json({ message: `User ${userId} is removed`, removedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `ERR_SERVER_REMOVE_USER:: ${error}` });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { userId, name, password } = req.body;

  try {
    const newUser: User = {
      userId,
      name,
      password: await bcrypt.hash(password, 10),
    };
    users.push(newUser);
    res.status(201).json({ message: "New user created successfully", newUser });
  } catch (error) {
    throw new Error(`ERR_CREATING_USER:: ${error}`);
  }
};

export const updateUser = async (req: Request, res: Response) => {};
