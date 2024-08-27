import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const {projectID, projectDescription, projectName, companies, employees, clients, relatesTo, projectleader} = req.body;

    const newProject = new Project({
      projectID,
      projectName,
      projectDescription,
      companies,
      employees,
      clients,
      relatesTo,
      projectleader,

    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
 