import express from "express";
import "dotenv/config";
import cors from "cors";

import { logMiddleware } from "./middleware/log-middleware.ts";
import registerRoute from "./routes/auth/register-route.ts";
import confirmEmailRoute from "./routes/auth/confirm-email-route.ts";
import { localhostAppUrl, musicatorAppUrl } from "./constants/urls.ts";

const myPrivateIp = process.env.MY_PRIVATE_IP as string;

const app = express();

app.use(express.json());

app.set("trust proxy", true);
// app.use("*", logMiddleware);

app.use(
  cors({
    origin: [musicatorAppUrl, localhostAppUrl, myPrivateIp],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/register", registerRoute);
app.use("/confirmEmail", confirmEmailRoute);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
