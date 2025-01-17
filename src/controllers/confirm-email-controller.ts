import { eq } from "drizzle-orm";

import { Request, Response } from "express";
import { db } from "../db/index.ts";
import { pendingUsersTable, usersTable } from "../db/schema.ts";
import { sendInternalErrorResponse } from "../utils/send-internal-error-response.ts";
import {
  expiredTokenErrorCode,
  invalidOrExpiredTokenErrorCode,
} from "../shared/error-codes.ts";
import { sendApiError } from "../utils/send-api-error.ts";

export const confirmEmailController = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const pendingUser = await db.query.pendingUsersTable.findFirst({
      where: eq(pendingUsersTable.confirmationToken, token),
    });

    if (pendingUser === undefined) {
      sendApiError(res, 404, invalidOrExpiredTokenErrorCode);
      return;
    }

    const now = new Date();
    if (pendingUser.tokenExpiresAt < now) {
      sendApiError(res, 410, expiredTokenErrorCode);
      return;
    }

    await db
      .delete(pendingUsersTable)
      .where(eq(pendingUsersTable.id, pendingUser.id));

    await db.insert(usersTable).values({
      username: pendingUser.username,
      email: pendingUser.email,
      hashedPassword: pendingUser.hashedPassword,
    });

    res.sendStatus(201);
  } catch (error) {
    console.error("Error in confirmEmailController:", error);
    sendInternalErrorResponse(res);
  }
};
