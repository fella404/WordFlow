import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const verifyAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized - No token provided",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decoded) => {
    if (err) {
      console.log("err");
      return res.status(403).json({
        message: "Unauthorized - Token expired",
      });
    }

    req.userId = decoded.userId;
    next();
  });
};

export default verifyAuth;
