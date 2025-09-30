import mongoose from "mongoose";
import dotenv from "dotenv";

const env = dotenv.config({ quiet: true }).parsed;

const connection = async () => {
  mongoose.connect(env.MONGO_URI, {
    dbName: env.DB_NAME,
  });

  const conn = mongoose.connection;

  conn.on("error", console.error.bind(console, "Connection error: "));
  conn.once("open", () => {
    console.log("Connected to MongoDB");
  });
};

export default connection;
