import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

function jwtAuth() {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw { code: 428, message: "No token provided" };
      }

      const token = authorization.split(" ")[1];
      const verified = jsonwebtoken.verify(
        token,
        process.env.JWT_REFRESH_TOKEN_SECRET
      );
      req.jwt = verified;
      next();
    } catch (error) {
      const errorMessages = [
        "invalid signature",
        "jwt malformed",
        "jwt must be provided",
        "invalid token",
      ];

      if (error.message === "jwt expired")
        error.message = "Access token expired, please login again";
      else if (errorMessages.includes(error.message))
        err.message = "Invalid access token";

      return res.status(error.code || 500).json({
        message: error.message || "Internal server error",
      });
    }
  };
}

export default jwtAuth;
