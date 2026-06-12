import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({
      success: false,
      message: "Not authorized or token missing",
    });
  }
  const token = authHeader.split(" ")[1];

  // to verify token
  try {
    console.log(token);
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not found",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification failed", err);
    return res.status(401).json({
      success: false,
      message: "Token Invalid or expired",
    });
  }
}
