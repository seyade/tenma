import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import userResolver from "../src/resolvers/user";

jest.mock("@prisma/client", () => {
  const PrismaClientMock = jest.fn(() => ({
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  }));

  return { PrismaClient: PrismaClientMock };
});

jest.mock("bcryptjs", () => ({
  hash: jest.fn(() => Promise.resolve("hashedPassword")),
}));

const prismaMock = mockDeep<PrismaClient>();

describe("User Resolver", () => {
  const mockUser = {
    id: 1,
    userId: "c642aec5-3011-47e5-9174-54c574c4c12a",
    email: "bulma.brief@capsule.co",
    username: "bulma",
    password: "password",
    profileSummary: "Engineer and QA at Capsule Tests",
    name: "Bulma",
    title: "Lead QA",
    appTenure: "2 years",
    skills: ["C++", "Typescript"],
    clients: ["Amazon", "Netflix"],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Query", () => {
    it("should return all users", async () => {
      const mockUsers = [mockUser];
      prismaMock.user.findMany.mockResolvedValue(mockUsers);
      const result = await userResolver.Query.users();
      expect(result).toEqual(mockUsers);
    });
  });
});
