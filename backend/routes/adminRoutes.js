import { Router } from "express";

import {
  register,
  login,
  logout,
  fetchUser,
} from "../controllers/AuthController.js";
import StoryController from "../controllers/StoryController.js";
import verifyAuth from "../middlewares/jwtAuth.js";

const router = Router();

// Auth routes

// Story routes
router.get("/stories", verifyAuth, StoryController.getAllStories);
router.post("/stories", verifyAuth, StoryController.create);
router.get("/stories/:id", verifyAuth, StoryController.getStoryById);
router.put("/stories/:id", verifyAuth, StoryController.update);
router.delete("/stories/:id", verifyAuth, StoryController.delete);

export default router;
