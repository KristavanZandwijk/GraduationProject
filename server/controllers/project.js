
import Project from "../models/Project.js";
import File from "../models/File.js";

/* READ */
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ });

    if (!projects.length) {
      return res.status(404).json({ message: "No projects found at all" });
    }

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};