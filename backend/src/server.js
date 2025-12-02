import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import adminRoutes from "./routes/adminRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import connection from "./config/db.js";

const env = dotenv.config({ quiet: true }).parsed;

const app = express();

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

connection().then(() => {
  app.listen(env.APP_PORT || 3000, () => {
    console.log(`Server is running on port ${env.APP_PORT || 3000}`);
  });
});
