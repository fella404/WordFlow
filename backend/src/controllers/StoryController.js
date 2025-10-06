import Story from "../models/Story.js";

class StoryController {
  async create(req, res) {
    try {
      const story = new Story(req.body);
      await story.save();
      res.status(201).json(story);
    } catch (error) {
      return res.status(error.code || 500).json({
        message: error.message || "Internal server error",
      });
    }
  }
}

export default new StoryController();
