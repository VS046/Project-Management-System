import Project from "../models/project.model.js";
import Workspace from "../models/workspace.model.js";

export const createProject = async (req, res) => {
  try {
    const { name, description, workspaceId } = req.body;

    if (!name || !workspaceId) {
      return res.status(400).json({
        success: false,
        message: "Project name and Workspace ID are required",
      });
    }

    // Check workspace exists
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    const project = await Project.create({
      name,
      description,
      workspace: workspaceId,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user._id,
    }).populate("workspace", "name");

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    project.name = req.body.name || project.name;
    project.description =
      req.body.description || project.description;
    project.status = req.body.status || project.status;

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};