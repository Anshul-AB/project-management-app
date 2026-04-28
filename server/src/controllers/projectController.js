import Project from "../models/projectModels.js";

export const createProject = async (req, res) => {
  try {
    let { title, description } = req.body;

    title = title?.trim();
    description = description?.trim();

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and Description are required" });
    }

    const newProject = await Project.create({
      title,
      description,
      userId: req.user.id,
    });

    return res.status(201).json({
      project: newProject,
      message: "Project Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      projects,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedProject) {
      return res.status(404).json({
        message: "Project not found or not authorized",
      });
    }

    return res.status(200).json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// export const updateProject = async (req, res) => {
//   try {
//     const { id } = req.params;
//     let { title, description } = req.body || {};

//     const project = await Project.findOne({
//       _id: id,
//       userId: req.user.id,
//     });

//     if (!project) {
//       return res.status(404).json({
//         message: "Project not found or not authorized",
//       });
//     }

//     if (title) project.title = title.trim();
//     if (description) project.description = description.trim();

//     await project.save();

//     return res.status(200).json({
//       project,
//       message: "Project updated successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };