import Project from "../models/projectModels.js";
import Task from "../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    let { title, dueDate, projectId } = req.body;
    title = title?.trim();

    if (!title || !dueDate) {
      return res.status(400).json({
        message: "Title and Due date are required",
      });
    }

    const project = await Project.findOne({
      _id: projectId,
      userId: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found or not authorized",
      });
    }

    const addTask = await Task.create({
      title,
      dueDate,
      projectId,
      userId: req.user.id, // recommended
    });

    return res.status(201).json({
      message: "Task created successfully",
      task: addTask,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({
      _id: projectId,
      userId: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found or not authorized",
      });
    }

    const tasks = await Task.find({ projectId })
      .sort({ createdAt: -1 });

    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const toggleTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const project = await Project.findOne({
      _id: task.projectId,
      userId: req.user.id,
    });

    if (!project) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    task.status = !task.status;

    await task.save();

    return res.status(200).json({
      task,
      message: "Task status updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const project = await Project.findOne({
      _id: task.projectId,
      userId: req.user.id,
    });

    if (!project) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await Task.deleteOne({ _id: id });

    return res.status(200).json({
      message: "Task deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};