import { Router } from "express";
import { sendContactEmail } from "../controllers/contact.controller";

const router = Router();

router.post("/", sendContactEmail);

export default router;