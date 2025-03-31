import { Request, Response, NextFunction } from "express";
import {
  refreshController,
  registerController,
  sessionByIdController,
  sessionsByUserIdController,
  sessionsController,
  signInController,
  signOutController,
} from "../src/controllers/auth.controller";
import * as authServices from "../src/services/auth.service";
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
    session: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Auth Controllers", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  const REFRESH_API_PATH = "/api/auth/refresh";

  const mockCookiesService = {
    user: { id: "112233-4455", email: "uneet@testeen.ai", username: "uneet" },
    accessToken: "encrypted-access-token",
    refreshToken: "encrypted-refresh-token",
  };

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

  describe("Create Account", () => {
    const mockedUserData = {
      username: "monkeydluffy",
      email: "monkey.d@luffy.co",
      password: "password",
      isVerified: false,
      userAgent: "Mozilla/5.0",
    };

    const mockCookiesService = {
      user: { id: "112233-4455", email: "uneet@testeen.ai", username: "uneet" },
      accessToken: "encrypted-access-token",
      refreshToken: "encrypted-refresh-token",
    };

    beforeEach(() => {
      mockReq.body = {
        ...mockedUserData,
        confirmPassword: "password",
      };
      mockReq.headers = { "user-agent": "Mozilla/5.0" };

      (authServices.createAccount as jest.Mock).mockResolvedValue(
        mockCookiesService
      );
    });

    it("should create a new account", async () => {
      await registerController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(authServices.createAccount).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.cookie).toHaveBeenCalledWith(
        "accessToken",
        mockCookiesService.accessToken,
        expect.any(Object)
      );

      expect(mockRes.cookie).toHaveBeenCalledWith(
        "refreshToken",
        mockCookiesService.refreshToken,
        expect.any(Object)
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    it("should not create an account when invalid data", async () => {
      mockReq.body = {
        ...mockedUserData,
        email: "wrong-email",
        password: "pas",
        username: "u",
      };

      await registerController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });

    it("should throw an error when Create Account service fails", async () => {
      (authServices.createAccount as jest.Mock).mockRejectedValue(
        expect.any(Object)
      );
      await registerController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe("Sign In", () => {
    beforeEach(() => {
      mockReq.body = {
        email: "monkey.d@luffy.co",
        password: "password",
      };

      (authServices.signInUser as jest.Mock).mockResolvedValue(
        mockCookiesService
      );
    });

    it("should sign in successfully", async () => {
      await signInController(mockReq as Request, mockRes as Response, mockNext);

      expect(authServices.signInUser).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.cookie).toHaveBeenCalledWith(
        "accessToken",
        mockCookiesService.accessToken,
        expect.any(Object)
      );
      expect(mockRes.cookie).toHaveBeenCalledWith(
        "refreshToken",
        mockCookiesService.refreshToken,
        expect.any(Object)
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Signed in successfully.",
      });
    });

    it("should not sign in when validation fails", async () => {
      mockReq.body = {
        email: "monkey.d@luffy.co",
      };

      await signInController(mockReq as Request, mockRes as Response, mockNext);

      expect(authServices.signInUser).not.toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalledWith(200);
      expect(mockNext).toHaveBeenCalled();
    });

    it("should throw an error when Sign In User service fails", async () => {
      (authServices.signInUser as jest.Mock).mockRejectedValue(
        expect.any(Object)
      );
      await signOutController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe("Sign Out", () => {
    const mockAccessToken = "existing-access-token";
    const mockPayload = { sessionId: "5544-332211" };

    beforeEach(() => {
      mockReq.cookies = {
        accessToken: mockAccessToken,
      };

      (manageTokens.verifyToken as jest.Mock).mockReturnValue({
        payload: mockPayload,
      });

      (config.prisma.session.delete as jest.Mock).mockResolvedValue({});

      process.env.API_PATH = "/api";
    });

    it("should sign out", async () => {
      await signOutController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(authServices.signOutUser).toHaveBeenCalled();
      expect(manageTokens.verifyToken).toHaveBeenCalledWith(mockAccessToken);
      expect(mockRes.clearCookie).toHaveBeenCalledWith("accessToken");
      expect(mockRes.clearCookie).toHaveBeenCalledWith("refreshToken", {
        path: REFRESH_API_PATH,
      });
    });

    it("should sign out when no session found", async () => {
      (manageTokens.verifyToken as jest.Mock).mockReturnValue({
        payload: null,
      });

      await signOutController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(config.prisma.session.delete).not.toHaveBeenCalled();
      expect(authServices.signOutUser).toHaveBeenCalled();
      expect(manageTokens.verifyToken).toHaveBeenCalledWith(mockAccessToken);
      expect(mockRes.clearCookie).toHaveBeenCalledWith("accessToken");
      expect(mockRes.clearCookie).toHaveBeenCalledWith("refreshToken", {
        path: REFRESH_API_PATH,
      });
    });
  });

  describe("Refresh Access", () => {
    const mockRefreshToken = "existing-refresh-token";
    const mockServiceRes = {
      accessToken: "new-access-token",
      newRefreshToken: "new-refresh-token",
    };

    beforeEach(() => {
      mockReq.cookies = {
        refreshToken: mockRefreshToken,
      };
      (authServices.refreshUserAccessToken as jest.Mock).mockResolvedValue(
        mockServiceRes
      );
    });

    it("should refresh access token successfully", async () => {
      await refreshController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(authServices.refreshUserAccessToken).toHaveBeenCalledWith(
        mockRefreshToken
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);

      expect(mockRes.cookie).toHaveBeenCalledWith(
        "refreshToken",
        mockServiceRes.newRefreshToken,
        expect.any(Object)
      );
      expect(mockRes.cookie).toHaveBeenCalledWith(
        "accessToken",
        mockServiceRes.accessToken,
        expect.any(Object)
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Access token refreshed.",
      });
    });

    it("should fail when refresh token is missing", async () => {
      mockReq.cookies = {};

      (appAssert as jest.Mock).mockImplementation(() => {
        throw new Error("Unauthorized - Missing refresh token.");
      });

      await refreshController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).not.toHaveBeenCalledWith(200);
      expect(mockNext).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should throw an error when Refresh Access service fails", async () => {
      const serviceError = new Error("Unauthorized - Missing refresh token.");
      (authServices.refreshUserAccessToken as jest.Mock).mockRejectedValue(
        serviceError
      );

      await refreshController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(serviceError);
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });
  });

  describe("User Sessions", () => {
    const mockSessions = [
      {
        id: 1,
        userId: "1",
        userAgent: "PostmanRuntime/7.43.2",
        createdAt: new Date(),
        expiresAt: new Date(),
      },
      {
        id: 2,
        userId: "2",
        userAgent: "PostmanRuntime/7.43.2",
        createdAt: new Date(),
        expiresAt: new Date(),
      },
    ];

    beforeEach(() => {
      jest.clearAllMocks();

      mockReq = {
        params: {
          id: "1",
          userId: "112233-4455",
        },
      };
    });

    it("should fetch all existing sessions", async () => {
      (authServices.getSessions as jest.Mock).mockResolvedValue(mockSessions);

      await sessionsController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(authServices.getSessions).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ sessions: mockSessions });
    });

    it("should fetch a session by ID", async () => {
      (authServices.getSessionById as jest.Mock).mockResolvedValue(
        mockSessions
      );

      await sessionByIdController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(authServices.getSessionById).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockSessions);
    });

    // left for now. Need to work on the controller first
    it("should fetch all existing sessions by user ID", async () => {
      (authServices.getSessionsByUserId as jest.Mock).mockResolvedValue(
        mockSessions
      );

      await sessionsByUserIdController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );
      expect(authServices.getSessionsByUserId).toHaveBeenCalledWith(
        "112233-4455"
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockSessions);
    });

    describe("Sessions Services Failures", () => {
      it("should throw an error when fetching all sessions fails", async () => {
        (authServices.getSessions as jest.Mock).mockRejectedValue(
          expect.any(Object)
        );

        await sessionsController(
          mockReq as Request,
          mockRes as Response,
          mockNext
        );

        expect(mockRes.status).not.toHaveBeenCalledWith(200);
        expect(mockRes.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(expect.any(Object));
      });

      it("should throw an error when fetching a session by ID fails", async () => {
        (authServices.getSessionById as jest.Mock).mockRejectedValue(
          expect.any(Object)
        );

        await sessionByIdController(
          mockReq as Request,
          mockRes as Response,
          mockNext
        );

        expect(mockRes.status).not.toHaveBeenCalledWith(200);
        expect(mockRes.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(expect.any(Object));
      });

      it("should throw an error when fetching all sessions by user ID fails", async () => {
        (authServices.getSessionsByUserId as jest.Mock).mockRejectedValue(
          expect.any(Object)
        );

        await sessionsByUserIdController(
          mockReq as Request,
          mockRes as Response,
          mockNext
        );

        expect(mockRes.status).not.toHaveBeenCalledWith(200);
        expect(mockRes.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(expect.any(Object));
      });
    });
  });
});
