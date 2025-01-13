import { Request, Response } from "express";

import { sendConfirmationEmail } from "../utils/send-confirmation-email.ts";
import {
  cantCreatePendingUserErrorCode,
  cantSendConfirmationErrorCode,
} from "../shared/error-codes.ts";
import { generateRandomToken } from "../utils/generate-random-token.ts";
import { sendInternalErrorResponse } from "../utils/send-internal-error-response.ts";
import { sendApiError } from "../utils/send-api-error.ts";
import {
  checkIfUserExists,
  createPendingUser,
} from "../services/user-service.ts";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const errors = await checkIfUserExists(username, email);
    if (errors.length > 0) {
      sendApiError(res, 409, ...errors);
      return;
    }

    const confirmationToken = generateRandomToken();

    try {
      await sendConfirmationEmail(email, confirmationToken);
    } catch (err) {
      console.error("Error in sendConfirmationEmail: ", err);
      sendApiError(res, 400, cantSendConfirmationErrorCode); //TODO: add FE handling
      return;
    }

    try {
      await createPendingUser(username, email, password, confirmationToken);
    } catch (err) {
      console.error("Error in createPendingUser: ", err);
      sendApiError(res, 500, cantCreatePendingUserErrorCode); //TODO: add FE handling
      return;
    }

    res.status(201).json({ email });
  } catch (err) {
    console.error("Error in registerController:", err);
    sendInternalErrorResponse(res); //TODO: add FE handling
  }
};
