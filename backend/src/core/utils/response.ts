// src/core/utils/response.ts
import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

interface IResponse {
  success: boolean;
  data: any | null;
  error: any | null;
}

export const apiResponse = (
  ctx: Context,
  statusCode: ContentfulStatusCode,
  data: any,
): Response => {
  const response: IResponse = {
    success: true,
    data,
    error: null,
  };
  return ctx.json(response, statusCode);
};

export const apiErrorResponse = (
  ctx: Context,
  statusCode: ContentfulStatusCode,
  error: any,
  requestId: string,
): Response => {
  const response: IResponse = {
    success: false,
    data: null,
    error: {
      ...error,
      requestId,
    },
  };
  return ctx.json(response, statusCode);
};
