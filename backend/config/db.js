import mongoose from "mongoose";

const connection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB failed connected");
    process.exit(1);
  }
};

export default connection;
