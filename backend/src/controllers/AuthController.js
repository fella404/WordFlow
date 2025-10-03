import bcrypt from "bcrypt";

import User from "../models/User.js";
import isEmailExist from "../libraries/isEmailExist.js";

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
}

export default new AuthController();
