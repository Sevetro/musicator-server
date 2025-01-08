import { Router } from "express";
import { registerController } from "../../controllers/auth/register-controller.ts";

const router = Router();

router.post("/", registerController);

export default router;
