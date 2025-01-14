import express from "express";
import cors from "cors";

import { logMiddleware } from "./middleware/log-middleware.ts";
import { localhostAppUrl, musicatorAppUrl } from "./constants/urls.ts";
import { MY_PRIVATE_IP, SERVER_PORT } from "./constants/envs.ts";
import { registerController } from "./controllers/register-controller.ts";
import { confirmEmailController } from "./controllers/confirm-email-controller.ts";
import { loginController } from "./controllers/login-controller.ts";

const app = express();
app.use(express.json());

app.set("trust proxy", true);
app.use("*", logMiddleware);

app.use(
  cors({
    // origin: [musicatorAppUrl, localhostAppUrl, MY_PRIVATE_IP],
    // origin: [musicatorAppUrl, localhostAppUrl],

    // origin: "*",

    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, //TODO: to delete?
  })
);

app.post("/register", registerController);
app.get("/confirm_email/:token", confirmEmailController);
app.post("/login", loginController);

app.listen(SERVER_PORT, () =>
  console.log(`Listening on port ${SERVER_PORT}...`)
);
