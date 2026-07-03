import express from "express";
import protect from "../middlewares/auth.middleware.js";

import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
  assignTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getAllTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.patch("/:id/status", protect, updateTaskStatus);
router.patch("/:id/assign", protect, assignTask);

export default router;