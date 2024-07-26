// controllers/team.js
import Team from "../models/Team.js";

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
