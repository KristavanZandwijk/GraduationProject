import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const {projectID, projectDescription, projectName} = req.body;

    const newProject = new Project({
      projectID,
      projectName,
      projectDescription,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
