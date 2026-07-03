import Workspace from "../models/workspace.model.js";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";

export const getDashboardStats = async (req, res) => {
  try {

    const totalWorkspaces = await Workspace.countDocuments({
  $or: [
    { owner: req.user._id },
    { members: req.user._id },
  ],
});

    const totalProjects = await Project.countDocuments({
      owner: req.user._id,
    });

    const totalTasks = await Task.countDocuments({
      createdBy: req.user._id,
    });

    const completedTasks = await Task.countDocuments({
      createdBy: req.user._id,
      status: "Done",
    });

    const pendingTasks = await Task.countDocuments({
      createdBy: req.user._id,
      status: "Todo",
    });

    const inProgressTasks = await Task.countDocuments({
      createdBy: req.user._id,
      status: "In Progress",
    });

    const highPriorityTasks = await Task.countDocuments({
      createdBy: req.user._id,
      priority: "High",
    });
    const recentTasks = await Task.find({
  createdBy: req.user._id,
})
  .sort({ createdAt: -1 })
  .limit(5)
  .populate("project", "name");

const recentProjects = await Project.find({
  owner: req.user._id,
})
  .sort({ createdAt: -1 })
  .limit(5);

   res.status(200).json({
  success: true,

  data: {

    stats: {
      totalWorkspaces,
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      highPriorityTasks,
    },

    recentTasks,

    recentProjects,

  },

});

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};