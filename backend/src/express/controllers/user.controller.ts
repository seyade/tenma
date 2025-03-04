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
    console.log(`ERROR_GETTING_USERS: ${error}`);
  }
};

export const createUsers = async (req: Request, res: Response) => {
  const { userId, name, password } = req.body;
  const newUser: User = {
    userId,
    name,
    password: await bcrypt.hash(password, 10),
  };
  users.push(newUser);
  res.status(201).json({ message: "New user created successfully", newUser });
};

export const updateUsers = async () => {};

export const deleteUsers = async () => {};
