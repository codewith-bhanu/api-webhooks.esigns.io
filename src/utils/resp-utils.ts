import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import type { SuccessResp } from "../types/app-types";

export const successResp = (
  c: Context,
  status: StatusCode,
  message: string,
  data?: any
) => {
  c.status(status);
  let resp: SuccessResp = {
    status,
    success: true,
    message,
  };

  if (data) {
    resp.data = data;
  }
  return c.json(resp);
};
