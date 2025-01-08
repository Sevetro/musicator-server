import { eq } from "drizzle-orm";

import { Request, Response } from "express";
import { db } from "../../db/index.ts";
import { pendingUsersTable, usersTable } from "../../db/schema.ts";
import { localhostAppUrl } from "../../constants/urls.ts";

export const confirmEmailController = async (req: Request, res: Response) => {
  console.log("inside confirmEmailController");
  try {
    const { token } = req.params;

    const pendingUser = await db
      .select()
      .from(pendingUsersTable)
      .where(eq(pendingUsersTable.confirmationToken, token))
      .limit(1);

    if (pendingUser.length === 0) {
      res.status(404).json({ message: "Invalid or expired token." });
    }

    const user = pendingUser[0];
    const now = new Date();
    if (user.tokenExpiresAt < now) {
      res.status(410).json({ message: "Token has expired." });
    }

    await db.delete(pendingUsersTable).where(eq(pendingUsersTable.id, user.id));

    await db.insert(usersTable).values({
      username: user.username,
      email: user.email,
      hashedPassword: user.hashedPassword,
    });
    return res.redirect(`${localhostAppUrl}/login`);
  } catch (error) {
    console.error("Error in confirmEmailController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
