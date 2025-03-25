import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import config from "../src/config";
import { createAccount } from "../src/services/auth.service";
import { authToken, verifyToken } from "../src/utils/manageAccessTokens";

// dotenv.config();

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

jest.mock("../src/config", () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    session: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("../src/utils/manageAccessTokens", () => ({
  authToken: jest.fn(),
  verifyToken: jest.fn(),
}));

describe("Auth Services", () => {
  const mockedUserData = {
    username: "monkeydluffy",
    email: "monkey.d@luffy.co",
    password: "password",
    isVerified: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Create Account", () => {
    it("should create a user", async () => {
      (uuidv4 as jest.Mock).mockReturnValue("112233-4455");
      (config.prisma.user.findUnique as jest.Mock).mockReturnValue(null);
      (bcrypt.hash as jest.Mock).mockReturnValue("hashedpassword");
      (config.prisma.user.create as jest.Mock).mockReturnValue({
        userId: "112233-4455",
        ...mockedUserData,
      });
      (config.prisma.session.create as jest.Mock).mockReturnValue({
        id: 1,
        userId: "112233-4455",
        userAgent: "Chrome/5.0",
        createAt: new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
      (authToken as jest.Mock)
        .mockReturnValueOnce("access-token")
        .mockReturnValueOnce("refresh-token");

      const result = await createAccount(mockedUserData);

      expect(config.prisma.user.create).toHaveBeenCalledWith({
        data: {
          ...mockedUserData,
          userId: "112233-4455",
          password: "hashedpassword",
        },
        select: {
          userId: true,
          username: true,
          email: true,
          isVerified: true,
        },
      });

      expect(config.prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: mockedUserData.email, username: "monkeydluffy" },
      });

      expect(result).toEqual({
        refreshToken: "refresh-token",
        accessToken: "access-token",
        user: {
          userId: "112233-4455",
          username: "monkeydluffy",
          email: "monkey.d@luffy.co",
          password: "password",
          isVerified: false,
        },
      });
    });
  });
});
