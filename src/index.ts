import express from "express";
import "dotenv/config";
import cors from "cors";
import { eq } from "drizzle-orm";

import { db } from "./db/index.ts";
import { pendingUsersTable, usersTable } from "./db/schema.ts";
import {
  emailOccupiedErrorCode,
  nameOccupiedErrorCode,
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
    allowedHeaders: ["Content-Type", "content-type", "Authorization"],
  })
);

app.get("/", async (req, res) => {
  console.log(`accessed /`);
  const users = await db.select().from(usersTable);
  res.status(200).json(users);
});

app.post("/", async (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  console.log(`name`, name);
  console.log(`email`, email);

  const userNameSearchResult = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.name, name));
  const userEmailSearchResult = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  const pendingUserNameSearchResult = await db
    .select()
    .from(pendingUsersTable)
    .where(eq(pendingUsersTable.name, name));
  const pendingUserEmailSearchResult = await db
    .select()
    .from(pendingUsersTable)
    .where(eq(pendingUsersTable.email, email));

  const errors: string[] = [];
  if (
    userNameSearchResult.length > 0 ||
    pendingUserNameSearchResult.length > 0
  ) {
    errors.push(nameOccupiedErrorCode);
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
