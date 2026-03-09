import { Router } from "express";
import {
  fetchUser,
  login,
  logout,
  register,
} from "../controllers/AuthController.js";
import verifyAuth from "../middlewares/jwtAuth.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/fetch-user", verifyAuth, fetchUser);

export default authRoutes;
