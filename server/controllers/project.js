// controllers/building.js
import Project from "../models/Project.js";

/* READ */
export const getCompanyProjects = async (req, res) => {
  try {
    const { projectID } = req.params;
    const projects = await Project.find(projectID);
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};