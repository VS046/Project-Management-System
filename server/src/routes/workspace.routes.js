import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  createWorkspace,
  getAllWorkspaces,
  updateWorkspace,
  deleteWorkspace,
} from "../controllers/workspace.controller.js";

const router = express.Router();

router.post("/", protect, createWorkspace);
router.get("/", protect, getAllWorkspaces);
router.put("/:id", protect, updateWorkspace);
router.delete("/:id", protect, deleteWorkspace);

export default router;
