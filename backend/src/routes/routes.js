import { Router } from "express";

import AuthController from "../controllers/AuthController.js";
import StoryController from "../controllers/StoryController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = Router();

// Auth routes
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh-token", jwtAuth(), AuthController.refreshToken);

// Story routes
router.get("/stories", jwtAuth(), StoryController.index);
router.post("/stories", jwtAuth(), StoryController.create);
router.get("/stories/:id", jwtAuth(), StoryController.getStoryById);
router.put("/stories/:id", jwtAuth(), StoryController.update);
router.delete("/stories/:id", jwtAuth(), StoryController.delete);

export default router;
