import mongoose from "mongoose";
import Story from "../models/Story.js";

class StoryController {
  async getAllStories(req, res) {
    try {
      const limit = Number(req.query.limit) || 10;
      const page = Number(req.query.page) || 1;
      const story = await Story.paginate({}, { limit, page });
      return res.status(200).json(story);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getPublishedStories(req, res) {
    try {
      const limit = Number(req.query.limit) || 9;
      const page = Number(req.query.page) || 1;
      const story = await Story.paginate({ published: true }, { limit, page });
      return res.status(200).json(story);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      const story = new Story(req.body);
      await story.save();
      res.status(201).json(story);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getStoryById(req, res) {
    try {
      const { id } = req.params;
      const story = await Story.findById(id);
      if (!story) throw { code: 404, message: "Story not found" };
      return res.status(200).json(story);
    } catch (error) {
      return res
        .status(error.code || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  async getPublishedStoryById(req, res) {
    try {
      const { id } = req.params;
      const story = await Story.findOne({
        _id: new mongoose.Types.ObjectId(id),
        published: true,
      });
      if (!story) throw { code: 404, message: "Story not found" };
      return res.status(200).json(story);
    } catch (error) {
      return res
        .status(error.code || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const story = await Story.findByIdAndUpdate(id, req.body, { new: true });
      if (!story) throw { code: 404, message: "Story not found" };
      return res.status(200).json(story);
    } catch (error) {
      return res.status(error.code || 500).json({
        message: error.message || "Internal server error",
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const story = await Story.findByIdAndDelete(id);
      if (!story) throw { code: 404, message: "Story not found" };
      return res.sendStatus(200);
    } catch (error) {
      return res.status(error.code || 500).json({
        message: error.message || "Internal server error",
      });
    }
  }

  async searchStories(req, res) {
    try {
      const { search } = req.query;
      console.log(search);
      let filter = { published: true };

      if (search && search.trim()) {
        filter.title = { $regex: search, $options: "i" };
      }

      const story = await Story.find(filter).sort({ createdAt: -1 });
      return res.status(200).json(story);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new StoryController();
