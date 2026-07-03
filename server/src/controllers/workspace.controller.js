import Workspace from "../models/workspace.model.js";

export const createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Workspace name is required",
      });
    }

    const workspace = await Workspace.create({
      name,
      description,
      owner: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      members: req.user._id,
    }).populate("owner", "name email");

    res.status(200).json({
      success: true,
      count: workspaces.length,
      workspaces,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateWorkspace = async (req, res) => {
  try {
    const { id } = req.params;

    const workspace = await Workspace.findById(id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    if (workspace.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this workspace",
      });
    }

    workspace.name = req.body.name || workspace.name;
    workspace.description =
      req.body.description || workspace.description;

    await workspace.save();

    res.status(200).json({
      success: true,
      message: "Workspace updated successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteWorkspace = async (req, res) => {
  try {
    const { id } = req.params;

    const workspace = await Workspace.findById(id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    if (workspace.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this workspace",
      });
    }

    await workspace.deleteOne();

    res.status(200).json({
      success: true,
      message: "Workspace deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};