import assert from "node:assert";
import AppError from "./AppError";

type AppAssert = (
  condition: any,
  httpStatusCode: number,
  message: string,
  appErrorCode?: any
) => asserts condition;

/**
 *
 * @description asserts a condition and throws AppError if condition is falsy
 * @param condition
 * @param httpStatusCode
 * @param message
 * @param appErrorCode
 * @returns
 */
const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;
