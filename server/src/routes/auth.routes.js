import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  registerUser,
  loginUser,
  getMe,
  changePassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/change-password", protect, changePassword);

export default router;
