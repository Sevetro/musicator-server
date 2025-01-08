import { Router } from "express";
import { confirmEmailController } from "../../controllers/auth/confirm-email-controller.ts";

const router = Router();

router.get("/:token", confirmEmailController);

export default router;
