import { eq, or } from "drizzle-orm";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { db } from "../db/index.ts";
import { usersTable } from "../db/schema.ts";
import { sendInternalErrorResponse } from "../utils/send-internal-error-response.ts";
import { sendApiError } from "../utils/send-api-error.ts";
import {
  invalidCredentialsErrorCode,
  userNotFoundErrorCode,
} from "../shared/error-codes.ts";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await db.query.usersTable.findFirst({
      where: or(
        eq(usersTable.username, usernameOrEmail),
        eq(usersTable.email, usernameOrEmail)
      ),
    });

    if (user === undefined) {
      sendApiError(res, 404, userNotFoundErrorCode);
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      sendApiError(res, 401, invalidCredentialsErrorCode);
      return;
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error in loginController:", error);
    sendInternalErrorResponse(res);
  }
};
