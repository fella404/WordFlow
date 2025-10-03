import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const router = Router();

router.post("/login", AuthController.register);

export default router;
