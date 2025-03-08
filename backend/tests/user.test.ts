import dotenv from "dotenv";
import request from "supertest";

dotenv.config();

jest.mock("../src/config", () => ({
  __esModule: true,
  config: {
    PORT: 4000,
    prisma: {
      user: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
    },
  },
}));

import { app } from "../src/express";
import { config } from "../src/config";

type MockUser = {
  id: number;
  userId: string;
  username: string;
  password: string;
  email: string;
};

describe("GET /users", () => {
  const mockedUsers: MockUser[] = [
    {
      id: 1,
      userId: "291d15fd-00bd-4528",
      username: "Youneet Testeen",
      password: "myunreadablepasssword",
      email: "youneet@testeen.ai",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should list all users", async () => {
    (config.prisma.user.findMany as jest.Mock).mockResolvedValue(mockedUsers);
    const response = await request(app).get(`${process.env.API_URL}/users`);

    expect(response.statusCode).toBe(200);
    expect(response.body.users).toEqual(mockedUsers);
  });

  it("should get a single users", async () => {
    const mockUser = mockedUsers[0];

    (config.prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).get(
      `${process.env.API_URL}/users/${mockUser.userId}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual(mockUser);
  });
});
