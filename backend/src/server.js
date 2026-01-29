import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import adminRoutes from "./routes/adminRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import connection from "./config/db.js";

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:5173",
  }),
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
  app.listen(process.env.APP_PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.APP_PORT || 3000}`);
  });
});
