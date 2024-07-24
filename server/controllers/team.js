// controllers/team.js
import Team from "../models/Team.js";
import Project from "../models/Project.js";

export const getUserTeam = async (req, res) => {
  try {
    const personID = req.userData.personID; // user data is attached by verifyToken middleware

    // Fetch projects where the user is an employee
    const userProjects = await Project.find({ "employees.personID": personID });

    // Extract project IDs
    const userProjectIDs = userProjects.map(project => project.projectID);

    // Fetch teams that contain any of these projects
    const teams = await Team.find({ "projects.projectID": { $in: userProjectIDs } });

    if (!teams.length) {
      return res.status(404).json({ message: "No teams found for this user." });
    }

    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
