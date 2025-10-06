import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

import User from "../models/User.js";
import isEmailExist from "../libraries/isEmailExist.js";

dotenv.config({ quiet: true });

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (password.length < 8) {
        throw {
          code: 400,
          message: "Password must be at least 8 characters long",
        };
      }

      const emailExist = await isEmailExist(email);
      if (emailExist) throw { code: 409, message: "Email already exists" };

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      if (!user) throw { code: 500, message: "Failed to register user" };

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      return res.status(error.code || 500).json({
        message: error.message || "Internal server error",
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw res.status(400).json({ message: "All fields are required" });
      }

      const user = await User.findOne({ email });
      if (!user) throw { code: 404, message: "User not found" };

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw { code: 401, message: "Invalid password" };

      const accessToken = jsonwebtoken.sign(
        { id: user._id },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jsonwebtoken.sign(
        { id: user._id },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "User successfully login",
        username: user.name,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(error.code || 500).json({
        message: error.message || "Internal server error",
      });
    }
  }
}

export default new AuthController();
