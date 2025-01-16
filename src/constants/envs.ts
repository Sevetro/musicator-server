import "dotenv/config";

export const MUSICATOR_EMAIL = process.env.EMAIL_LOGIN;
export const MUSICATOR_EMAIL_PASS = process.env.EMAIL_PASS;

export const DB_URL = process.env.DB_URL as string;
export const SERVER_PORT = process.env.PORT;

export const NODE_ENV = process.env.NODE_ENV as "prod" | "dev";
