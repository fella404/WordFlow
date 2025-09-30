import express from "express";
import dotenv from "dotenv";

import connection from "./config/db.js";

const env = dotenv.config({ quiet: true }).parsed;

const app = express();

connection().then(() => {
  app.listen(env.APP_PORT || 3000, () => {
    console.log(`Server is running on port ${env.APP_PORT || 3000}`);
  });
});
