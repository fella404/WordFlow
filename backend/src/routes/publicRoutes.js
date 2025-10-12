import { Router } from "express";

import StoryController from "../controllers/StoryController.js";

const router = Router();

router.get("/stories", StoryController.getPublishedStories);
router.get("/stories/:id", StoryController.getPublishedStoryById);

export default router;
