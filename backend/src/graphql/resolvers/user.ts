import bcrypt from "bcryptjs";
import { config } from "../../config";

export type User = {
  id: number;
  userId: string;
  username: string;
  password: string;
};

export type UserInput = Omit<User, "id"> & {
  email: string;
  verificationCode: string;
  isVerified: boolean;
  profileSummary: String;
  name: String;
  title: string;
  appTenure: String;
  skills: string[];
  clients: any[];
};

const userResolver = {
  User: {
    id: (parent: any) => parent.id,
  },
  Query: {
    users: async () => {
      try {
        const users = await config.prisma.user.findMany();
        return users;
      } catch (error: any) {
        throw Error(`ERROR_IN_USERS: ${error}`);
      }
    },
    user: async (_: any, { id, userId, username }: User) => {
      try {
        const user = await config.prisma.user.findUnique({
          where: { id, userId, username },
        });
        return user;
      } catch (error) {
        throw new Error(`ERROR_GETTING_USER: ${error}`);
      }
    },
  },
  Mutation: {
    createUser: async (_: any, { user }: { user: UserInput }) => {
      try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await config.prisma.user.create({
          data: {
            userId: user.userId,
            username: user.username,
            name: user.username,
            email: user.email,
            title: user.title,
            isVerified: false,
            password: hashedPassword,
          },
        });
        return newUser;
      } catch (error) {
        throw new Error(`ERROR_CREATING_USER: ${error}`);
      }
    },
  },
};

export default userResolver;
