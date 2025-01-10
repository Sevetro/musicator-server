import { Response } from "express";

import { internalServerErrorErrorCode } from "../shared/error-codes.ts";
import { sendApiError } from "./send-api-error.ts";

export function sendInternalErrorResponse(res: Response) {
  sendApiError(res, 500, internalServerErrorErrorCode);
}
