import express from "express";
import "dotenv/config";
import cors from "cors";
import { eq } from "drizzle-orm";

import { db } from "./db/index.ts";
import { pendingUsersTable, usersTable } from "./db/schema.ts";
import {
  emailOccupiedErrorCode,
  usernameOccupiedErrorCode,
} from "./shared/error-codes.ts";
import { logMiddleware } from "./middleware/log-middleware.ts";

const musicatorAppUrl = "https://musicator.vercel.app";
const myPrivateIp = process.env.MY_PRIVATE_IP as string;

const app = express();

app.use(express.json());

app.set("trust proxy", true);
app.use("*", logMiddleware);

app.use(
  cors({
    origin: [musicatorAppUrl, "http://localhost:3000", myPrivateIp],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  console.log(`username`, username);
  console.log(`email`, email);

  const usernameSearchResult = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username));
  const userEmailSearchResult = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  const pendingUsernameSearchResult = await db
    .select()
    .from(pendingUsersTable)
    .where(eq(pendingUsersTable.username, username));
  const pendingUserEmailSearchResult = await db
    .select()
    .from(pendingUsersTable)
    .where(eq(pendingUsersTable.email, email));

  const errors: string[] = [];
  if (
    usernameSearchResult.length > 0 ||
    pendingUsernameSearchResult.length > 0
  ) {
    errors.push(usernameOccupiedErrorCode);
  }
  if (
    userEmailSearchResult.length > 0 ||
    pendingUserEmailSearchResult.length > 0
  ) {
    errors.push(emailOccupiedErrorCode);
  }

  //TODO: validation

  if (errors.length > 0) {
    res.status(409).send({ errors });
  } else {
    res.sendStatus(201);
  }
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
