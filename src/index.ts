import express from "express";
import "dotenv/config";
import cors from "cors";

import { db } from "./db/index.ts";
import { userTable } from "./db/schema.ts";

const app = express();

app.use(express.json());

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions)); //TODO: should use????

app.get("/", async (req, res) => {
  console.log(`accessed /`);
  const users = await db.select().from(userTable);
  res.status(200).json(users);
});

app.post("/", async (req, res) => {
  console.log(req);
  res.status(200).send(req.body);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
