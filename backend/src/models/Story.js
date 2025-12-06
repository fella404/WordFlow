import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String, maxLength: 300, required: true },
    thumbnail: { type: String },
    author: { type: String },
    vocabs: [
      {
        word: { type: String, required: true },
        meaning: { type: String, required: true },
        example: [String],
      },
    ],
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

storySchema.plugin(paginate);
export default mongoose.model("Story", storySchema);
