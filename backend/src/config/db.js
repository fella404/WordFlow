import mongoose from "mongoose";
import dotenv from "dotenv";

const env = dotenv.config({ quiet: true }).parsed;

const connection = async () => {
  // mongoose.connect(env.MONGO_URI);

  // const conn = mongoose.connection;

  // conn.on("error", console.error.bind(console, "Connection error: "));
  // conn.once("open", () => {
  //   console.log("Connected to MongoDB");
  // });

  try {
    const connection = await mongoose.connect(env.MONGO_URI, {
      dbName: env.dbName,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB failed connected");
    process.exit(1);
  }
};

export default connection;
