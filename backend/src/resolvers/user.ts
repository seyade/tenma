import bycrypt from "bcryptjs";
import { prisma } from "../config";

export type User = {
  id: number;
  userId: string;
  username: string;
};

const userResolver = {
  User: {
    id: (parent: any) => parent.id,
  },
  Query: {
    users: async () => {
      try {
        const users = await prisma.user.findMany();
        return users;
      } catch (error: any) {
        throw Error(`ERROR_IN_USERS: ${error}`);
      }
    },
    user: async (_: any, { id, userId, username }: User) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id, userId, username },
        });
        return user;
      } catch (error) {
        throw new Error(`ERROR_IN_USER: ${error}`);
      }
    },
  },
  Mutation: {},
};

export default userResolver;
