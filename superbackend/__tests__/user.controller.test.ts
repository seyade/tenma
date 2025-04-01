import { Request, Response, NextFunction } from "express";
import {
  getUsersController,
  getUserByIdController,
} from "../src/controllers/user.controller";
import * as manageCookies from "../src/utils/manageCookies";
import * as manageTokens from "../src/utils/manageAccessTokens";
import appAssert from "../src/utils/appAssert";
import config from "../src/config";

jest.mock("../src/services/auth.service");
jest.mock("../src/utils/manageCookies");
jest.mock("../src/utils/manageAccessTokens");
jest.mock("../src/utils/appAssert");
jest.mock("../src/config", () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe("User Controllers", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  const mockCookiesService = {
    user: { id: "112233-4455", email: "uneet@testeen.ai", username: "uneet" },
    accessToken: "encrypted-access-token",
    refreshToken: "encrypted-refresh-token",
  };

  const mockUsers = [
    {
      username: "monkeydluffy",
      email: "monkey.d@luffy.co",
      password: "password",
      isVerified: false,
      userAgent: "Mozilla/5.0",
    },
    {
      username: "zoro",
      email: "roronoa@zoro.co",
      password: "password",
      isVerified: false,
      userAgent: "Mozilla/5.0",
    },
  ];

  const REFRESH_API_PATH = "/api/auth/refresh";

  beforeEach(() => {
    mockReq = {
      body: {},
      headers: {},
      cookies: {},
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();

    jest.clearAllMocks();

    (manageCookies.setAccessTokenCookieOptions as jest.Mock).mockReturnValue({
      httpOnly: true,
    });
    (manageCookies.setRefreshTokenCookieOptions as jest.Mock).mockReturnValue({
      httpOnly: true,
      path: REFRESH_API_PATH,
    });
  });

  it("should fetch all users", async () => {
    (config.prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    await getUsersController(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockUsers);
  });

  it("should fetch user by ID", async () => {
    (config.prisma.user.findUnique as jest.Mock).mockResolvedValue(
      mockUsers[0]
    );

    await getUserByIdController(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockUsers[0]);
  });
});
