import { Request, Response } from "express";
import {
  checkIfUserExists,
  createPendingUser,
} from "../../services/auth/user-service.ts";
import { sendConfirmationEmail } from "../../utils/send-confirmation-email.ts";

export const registerController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const errors = await checkIfUserExists(username, email);

    if (errors.length > 0) {
      res.status(409).json({ errors });
      return;
    }

    const confirmationToken = await createPendingUser(
      username,
      email,
      password
    );

    await sendConfirmationEmail(email, confirmationToken);

    res
      .status(201)
      .json(
        "Register successful! Check your inbox to finish the registration."
      );
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
