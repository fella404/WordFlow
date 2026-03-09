import { Router } from "express";
import verifyAuth from "../middlewares/jwtAuth.js";
import {
  createStory,
  deleteStory,
  getAllStories,
  getPublishedStories,
  getPublishedStoryById,
  getStoryById,
  searchStories,
  updateStory,
} from "../controllers/StoryController.js";

const storiesRoutes = Router();

// public
storiesRoutes.get("/published", getPublishedStories);
storiesRoutes.get("/published/:id", getPublishedStoryById);
storiesRoutes.get("/search", searchStories);

// admin
storiesRoutes.get("/", verifyAuth, getAllStories);
storiesRoutes.post("/", verifyAuth, createStory);
storiesRoutes.get("/:id", verifyAuth, getStoryById);
storiesRoutes.put("/:id", verifyAuth, updateStory);
storiesRoutes.delete("/:id", verifyAuth, deleteStory);

export default storiesRoutes;
