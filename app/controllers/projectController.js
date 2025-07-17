const Project = require("../models/projectModel");
const { ObjectId } = require("mongodb");
exports.getProjects = async (req, res) => {
  try {
    const user_id = req.user._id;
    console.log(user_id, "jhiuji");
    const projects = await Project.find().limit(1000);
    if (projects.length == 0) {
      return res.status(404).json({
        status: false,
        message: "No projects found",
        data: [],
      });
    }
    return res.status(200).json({
      status: true,
      message: "All projects fetched successfully",
      data: projects,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      data: [],
      error: err.message,
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    const id = new ObjectId(String(req.params.id));
    const project = await Project.findOne({ _id: id });
    if (!project) {
      return res.status(404).json({
        status: false,
        message: "No project found",
        data: [],
      });
    }
    return res.status(200).json({
      status: true,
      message: "Project fetched successfully",
      data: project,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.createProject = async (req, res) => {
  try {
    const user_id = req.user._id;
    const projectData = {
      ...req.body,
      project_user_id: user_id,
    };
    const project = await Project.create(projectData);

    res.status(200).json({
      status: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const id = new ObjectId(String(req.params.id));
    const project = await Project.updateOne({ _id: id }, { $set: req.body });
    if (!project) {
      return res.status(404).json({
        status: false,
        message: "No project found",
        data: [],
      });
    }
    res.status(200).json({
      status: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const id = new ObjectId(String(req.params.id));
    const existing_project = await Project.findOne({ _id: id });
    if (!existing_project) {
      return res.status(404).json({
        status: false,
        message: "Project not found",
      });
    }
    await Project.deleteOne({ _id: id });
    return res.status(200).json({
      status: true,
      message: "Project deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
