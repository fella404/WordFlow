import mongoose from "mongoose";
import Story from "../models/Story.js";

export const getAllStories = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const stories = await Story.paginate({}, { limit, page });
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPublishedStories = async (req, res) => {
  console.log("tes");
  try {
    const limit = Number(req.query.limit) || 9;
    const page = Number(req.query.page) || 1;
    const stories = await Story.paginate({ published: true }, { limit, page });
    console.log(stories);
    res.status(200).json(stories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createStory = async (req, res) => {
  try {
    const story = new Story(req.body);
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPublishedStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findOne({
      _id: new mongoose.Types.ObjectId(id),
      published: true,
    });
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByIdAndUpdate(id, req.body, { new: true });
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByIdAndDelete(id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchStories = async (req, res) => {
  try {
    const { search } = req.query;
    let filter = { published: true };

    if (search && search.trim()) {
      filter.title = { $regex: search, $options: "i" };
    }

    const stories = await Story.find(filter).sort({ createdAt: -1 });
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
