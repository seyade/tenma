import express from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string | number;
      user?: string | number | any;
    }
  }
}

export {};
