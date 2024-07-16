// controllers/building.js
import Project from "../models/Project.js";

/* READ */
export const getCompanyProjects = async (req, res) => {
  try {
    const companyID = req.userData.companyID;  // user data is attached by verifyToken middleware
    const projects = await Project.find({ 'companies.companyID': companyID });

    if (!projects.length) {
      return res.status(404).json({ message: "No projects found for this company." });
    }

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};