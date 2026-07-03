import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getAllProjects);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
