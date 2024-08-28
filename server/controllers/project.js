
import Project from "../models/Project.js";

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

export const getUserProjects = async (req, res) => {
  try {
    const personID = req.userData.personID; 
    const projects = await Project.find({ "employees.personID": personID });

    if (!projects.length) {
      return res.status(404).json({ message: "No projects found for this user." });
    }

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//Update Projects
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

