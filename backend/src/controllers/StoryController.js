import Story from "../models/Story.js";

class StoryController {
  async index(_, res) {
    try {
      const story = await Story.find();
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

  async update(req, res) {
    
  }
}

export default new StoryController();
