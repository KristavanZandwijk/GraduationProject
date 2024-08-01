import Team from "../models/Team.js";
import Project from "../models/Project.js";

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find(); // Fetch all teams

    if (!teams.length) {
      return res.status(404).json({ message: "No teams found." });
    }

    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserTeams = async (req, res) => {
  try {
    const personID = req.userData.personID;

    // Fetch all projects where the user is an employee
    const projects = await Project.find({ 'employees.personID': personID });

    if (!projects.length) {
      return res.status(404).json({ message: "No projects found for this user." });
    }

    // Extract project IDs from the projects array
    const projectIDs = projects.map(project => project._id);

    // Fetch teams that have these project IDs
    const teams = await Team.find({ 'projects': { $in: projectIDs } });

    if (!teams.length) {
      return res.status(404).json({ message: "No teams found for this user." });
    }

    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
