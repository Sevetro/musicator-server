import { Response } from "express";

export function sendApiError(
  res: Response,
  statusCode: number,
  ...errors: string[]
) {
  res.status(statusCode).json({ errors });
}
