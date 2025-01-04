import express from "express";
import "dotenv/config";
import cors, { CorsOptions } from "cors";
import { eq } from "drizzle-orm";

import { db } from "./db/index.ts";
import { pendingUsersTable, usersTable } from "./db/schema.ts";
import {
  emailOccupiedErrorCode,
  nameOccupiedErrorCode,
} from "./shared/error-codes.ts";

const musicatorAppUrl = "https://musicator.vercel.app";

const app = express();

app.use(express.json());

// const whitelist = ["http://localhost:3000"];
// const corsOptions: CorsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions)); //TODO: should use????

app.options("*", (req, res, next) => {
  console.log(`accessed OPTIONS`);

  console.log(`req.baseUrl: `, req.baseUrl);
  console.log(`-------------------------------------------------`);

  console.log(`req.body: `, req.body);
  console.log(`-------------------------------------------------`);

  console.log(`req.fresh: `, req.fresh);
  console.log(`-------------------------------------------------`);

  console.log(`req.headers: `, req.headers);
  console.log(`-------------------------------------------------`);

  console.log(`req.hostname: `, req.hostname);
  console.log(`-------------------------------------------------`);

  console.log(`req.httpVersion: `, req.httpVersion);
  console.log(`-------------------------------------------------`);

  console.log(`req.ip: `, req.ip);
  console.log(`-------------------------------------------------`);

  console.log(`req.method: `, req.method);
  console.log(`-------------------------------------------------`);

  console.log(`req.originalUrl: `, req.originalUrl);
  console.log(`-------------------------------------------------`);

  console.log(`req.params: `, req.params);
  console.log(`-------------------------------------------------`);

  console.log(`req.path: `, req.path);
  console.log(`-------------------------------------------------`);

  console.log(`req.protocol: `, req.protocol);
  console.log(`-------------------------------------------------`);

  console.log(`req.route: `, req.route);
  console.log(`-------------------------------------------------`);

  console.log(`req.secure: `, req.secure);
  console.log(`-------------------------------------------------`);

  console.log(`req.subdomains: `, req.subdomains);
  console.log(`-------------------------------------------------`);

  console.log(`req.url: `, req.url);
  console.log(`-------------------------------------------------`);

  next();
});

app.use(
  cors({
    // origin: [musicatorAppUrl, "http://localhost:3000"],
    origin: "*",
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
