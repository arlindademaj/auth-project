import express from "express";
import {
  getProfile,
  updateProfile,
  register,
  login,
} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/profile", protectRoute, getProfile);
authRouter.put("/profile", protectRoute, updateProfile);

export default authRouter;
